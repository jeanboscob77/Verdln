"use strict";
const twilio = require("twilio");
const pool = require("./config/db");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const messages = require("./translations");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const loanRoutes = require("./routes/loanRoutes");
app.use("/api/loans", loanRoutes);

const repaymentRoutes = require("./routes/repaymentRoutes");
app.use("/api/repayment", repaymentRoutes);

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log("✅ SMS sent to:", to);
  } catch (err) {
    console.error("❌ SMS error:", err);
  }
};

const formatPhoneNumber = (phone) => {
  if (phone.startsWith("0")) return "+250" + phone.slice(1);
  if (phone.startsWith("+")) return phone;
  return phone;
};

// Sessions memory
const sessions = {};

app.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  if (!sessionId || !phoneNumber || text === undefined) {
    return res.send("END Invalid request");
  }

  if (!sessions[sessionId])
    sessions[sessionId] = { step: "language", history: [] };
  const session = sessions[sessionId];

  const textArray = text.split("*");
  const input = textArray[textArray.length - 1];
  let response = "";
  session.lastInput = input;

  function goBack() {
    if (session.history.length > 0) {
      session.step = session.history.pop();
      return true;
    }
    return false;
  }

  async function showLoanRequests() {
    const inputTrimmed = input.trim().toUpperCase();
    if (inputTrimmed === "0") {
      session.step = "menu";
      return res.send(
        `CON ${messages[session.lang].welcome}\n${
          messages[session.lang].mainMenu
        }`
      );
    }

    const [requests] = await pool.query(
      "SELECT * FROM loan_requests WHERE farmer_id = ? ORDER BY created_at DESC",
      [session.userId]
    );

    if (!requests.length)
      return res.send(`END ${messages[session.lang].noRequests}`);

    const pageSize = 5;
    if (!session.page) session.page = 0;

    let page = session.page;
    if (input.toUpperCase() === "N") page += 1;
    else if (input.toUpperCase() === "B") page = Math.max(0, page - 1);
    session.page = page;

    const start = page * pageSize;
    const paged = requests.slice(start, start + pageSize);

    let resp = `CON ${messages[session.lang].yourRequests}\n`;
    paged.forEach((req, i) => {
      const statusKey = (req.status || "").toLowerCase();
      const statusLabel =
        messages[session.lang].status?.[statusKey] || req.status || "";
      const inputTypeKey = (req.input_type || "").toLowerCase();
      const inputTypeLabel =
        messages[session.lang].inputTypes?.[inputTypeKey] ||
        req.input_type ||
        "";
      resp += `${start + i + 1}. ${inputTypeLabel} (${req.package_size}) - ${
        req.amount
      } - ${statusLabel}\n`;
    });

    if (start + pageSize < requests.length) resp += `N. Next\n`;
    if (page > 0) resp += `B. Back\n`;
    resp += `0. Main Menu`;

    return res.send(resp);
  }
  async function showRepayments() {
    const inputTrimmed = input.trim().toUpperCase();
    if (inputTrimmed === "0") {
      session.step = "menu";
      return res.send(
        `CON ${messages[session.lang].welcome}\n${
          messages[session.lang].mainMenu
        }`
      );
    }

    const [repayments] = await pool.query(
      "SELECT * FROM repayments WHERE farmer_id = ? ORDER BY created_at DESC",
      [session.userId]
    );

    if (!repayments.length)
      return res.send(`END ${messages[session.lang].noRepayments}`);

    const pageSize = 5;
    if (!session.page) session.page = 0;

    let page = session.page;
    if (input.toUpperCase() === "N") page += 1;
    else if (input.toUpperCase() === "B") page = Math.max(0, page - 1);
    session.page = page;

    const start = page * pageSize;
    const [paged] = await pool.query(
      "SELECT * FROM repayments WHERE farmer_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [session.userId, pageSize, page * pageSize]
    );

    let resp = `CON ${messages[session.lang].repaymentHistory}\n`;
    paged.forEach((r, i) => {
      resp += `${start + i + 1}. ${r.amount} via ${r.method} on ${
        r.created_at.toISOString().split("T")[0]
      }\n`;
    });

    if (start + pageSize < repayments.length) resp += `N. Next\n`;
    if (page > 0) resp += `B. Back\n`;
    resp += `0. Main Menu`;

    return res.send(resp);
  }

  try {
    // LANGUAGE
    if (session.step === "language") {
      if (!text || text === "") {
        response = `CON Welcome to VerdIn!\nSelect language:\n1. English\n2. Kinyarwanda`;
        return res.send(response);
      }

      if (input === "1" || input === "2") {
        session.lang = input === "1" ? "en" : "rw";
        session.preferred_language = session.lang;
        session.history.push("language");
        session.step = "mainMenu";
        response = `CON ${messages[session.lang].welcome}\n${
          messages[session.lang].entryMenu
        }`;
        return res.send(response);
      } else {
        response = `CON Invalid choice.\n1. English\n2. Kinyarwanda`;
        return res.send(response);
      }
    }

    // MAIN MENU
    if (session.step === "mainMenu") {
      const lang = session.lang;
      if (input === "1") {
        session.history.push("mainMenu");
        session.step = "nationalId";
        return res.send(`CON ${messages[lang].enterNationalId}\n0. Back`);
      } else if (input === "2") {
        const [rows] = await pool.query(
          "SELECT * FROM users WHERE phone_number = ? LIMIT 1",
          [phoneNumber]
        );

        const user = rows[0]; // undefined if not found

        if (!user) return res.send(`END ${messages[lang].notRegistered}`);
        session.step = "menu";
        session.userId = user.id;
        session.role = user.role || "farmer";
        return res.send(
          `CON ${messages[lang].welcome}\n${
            session.role === "admin"
              ? messages[lang].adminMenu
              : messages[lang].mainMenu
          }`
        );
      } else if (input === "0" && goBack()) {
        session.step = "language";
        return res.send(
          `CON Welcome to VerdIn!\nSelect language:\n1. English\n2. Kinyarwanda`
        );
      } else return res.send(`END ${messages[lang].invalidChoice}`);
    }

    // USER MENU
    if (session.step === "menu") {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        session.userId,
      ]);
      const user = rows[0]; // first row is the user
      const lang = session.lang;

      if (user.role === "farmer") {
        switch (input) {
          case "1":
            session.history.push("menu");
            session.step = "loan_inputType";
            // Build menu dynamically from translations
            const menuText = Object.entries(messages[lang].inputTypes)
              .map(([key, value], index) => `${index + 1}. ${value}`)
              .join("\n");
            return res.send(
              `CON ${messages[lang].selectInputType}\n${menuText}\n0. ${messages[lang].back}`
            );
          case "2":
            session.history.push("menu");
            session.step = "loanPage";
            session.page = 0;
            return showLoanRequests();
          case "3":
            session.history.push("menu");
            session.step = "repaymentPage";
            session.page = 0;
            return showRepayments();
          case "4":
            delete sessions[sessionId];
            return res.send(`END ${messages[lang].thankYou}`);
          default:
            return res.send(`END ${messages[lang].invalidChoice}`);
        }
      }

      if (user.role === "admin") {
        switch (input) {
          case "1":
            const [pendingLoans] = await pool.query(
              "SELECT * FROM loan_requests WHERE status = ? ORDER BY created_at DESC",
              ["pending"]
            );
            if (!pendingLoans.length)
              return res.send(`END ${messages[lang].noPendingLoans}`);
            let resp = `END Pending Loans:\n`;
            pendingLoans.forEach((loan, i) => {
              resp += `${i + 1}. ${loan.input_type} - ${loan.amount} (${
                loan.status
              })\n`;
            });
            return res.send(resp);
          case "2":
            const [rows] = await pool.query(
              "SELECT * FROM users WHERE role = ?",
              ["farmer"]
            );

            const allFarmers = rows; // array of farmer objects

            let farmerResp = `END ${messages[lang].farmerList}\n`;
            allFarmers.forEach((f, i) => {
              farmerResp += `${i + 1}. ${f.national_id} - ${f.phone_number}\n`;
            });
            return res.send(farmerResp);
          case "3":
            delete sessions[sessionId];
            return res.send(`END ${messages[lang].thankYou}`);
          default:
            return res.send(`END ${messages[lang].invalidChoice}`);
        }
      }
    }

    // LOAN / REPAYMENT PAGINATION
    if (session.step === "loanPage") return showLoanRequests();
    if (session.step === "repaymentPage") return showRepayments();

    // --- REGISTRATION & LOAN INPUT FLOW ---
    if (session.step === "nationalId") {
      const lang = session.lang;
      if (input === "0" && goBack())
        return res.send(`CON ${messages[lang].entryMenu}`);
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE national_id = ? LIMIT 1",
        [input]
      );

      const existingID = rows[0]; // undefined if not found
      if (existingID)
        return res.send(`END ${messages[lang].alreadyRegistered}`);
      session.national_id = input;
      session.history.push("nationalId");
      session.step = "phone";
      return res.send(`CON ${messages[lang].enterPhone}\n0. Back`);
    }

    if (session.step === "phone") {
      const lang = session.lang;
      if (input === "0" && goBack())
        return res.send(`CON ${messages[lang].enterNationalId}\n0. Back`);
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE phone_number = ? LIMIT 1",
        [phoneNumber]
      );

      const existingPhone = rows[0]; // undefined if no user found

      if (existingPhone)
        return res.send(`END ${messages[lang].phoneAlreadyRegistered}`);
      const newUserId = uuidv4();

      await pool.query(
        `INSERT INTO users (id, national_id, phone_number, preferred_language, role)
   VALUES (?, ?, ?, ?, ?)`,
        [
          newUserId,
          session.national_id,
          phoneNumber,
          session.preferred_language,
          "farmer",
        ]
      );
      session.userId = newUserId;
      session.role = "farmer";
      await sendSMS(
        formatPhoneNumber(phoneNumber),
        session.preferred_language === "en"
          ? "🎉 Welcome to VerdIn! Your registration was successful."
          : "🎉 Murakaza neza kuri VerdIn! Kwiyandikisha kwawe byagenze neza."
      );
      delete sessions[sessionId];
      return res.send(`END ${messages[lang].registrationSuccess}`);
    }

    // LOAN REQUEST FLOW (farmer)
    if (session.step === "loan_inputType") {
      const lang = session.lang;
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [session.userId]
      );

      const user = rows[0]; // undefined if no user found

      if (!user || user.role !== "farmer")
        return res.send(`END ${messages[lang].notAllowed}`);

      const dbOptions = ["seeds", "fertilizer", "pesticides"];
      if (input === "0" && goBack())
        return res.send(`CON ${messages[lang].mainMenu}`);

      const index = parseInt(input) - 1;
      if (index < 0 || index >= dbOptions.length)
        return res.send(
          `CON Select input type:\n1. Seeds\n2. Fertilizer\n3. Pesticides\n0. Back`
        );

      session.input_type = dbOptions[index];
      session.history.push("loan_inputType");
      session.step = "loan_packageSize";
      return res.send(`CON ${messages[lang].enterPackageSize}\n0. Back`);
    }

    if (session.step === "loan_packageSize") {
      const lang = session.lang;
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [session.userId]
      );

      const user = rows[0]; // this is your user object, or undefined if not found

      if (!user || user.role !== "farmer")
        return res.send(`END ${messages[lang].notAllowed}`);

      if (input === "0" && goBack())
        return res.send(`CON ${messages[lang].selectInputType}`);
      session.package_size = input;
      session.history.push("loan_packageSize");
      session.step = "loan_amount";
      return res.send(`CON ${messages[lang].enterAmount}\n0. Back`);
    }

    if (session.step === "loan_amount") {
      const lang = session.lang;
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [session.userId]
      );

      const user = rows[0]; // this is your user object, or undefined if not found

      if (!user || user.role !== "farmer")
        return res.send(`END ${messages[lang].notAllowed}`);

      if (input === "0" && goBack())
        return res.send(`CON ${messages[lang].enterPackageSize}\n0. Back`);
      session.loan_amount = parseFloat(input);
      if (isNaN(session.loan_amount))
        return res.send(`CON ${messages[lang].invalidAmount}\n0. Back`);
      const loanRequestId = uuidv4();
      await pool.query(
        `INSERT INTO loan_requests (id, farmer_id, input_type, package_size, amount, status, repayment_date)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          loanRequestId,
          session.userId,
          session.input_type,
          session.package_size,
          session.loan_amount,
          "pending",
          new Date(new Date().setMonth(new Date().getMonth() + 1)),
        ]
      );

      delete sessions[sessionId];
      return res.send(`END ${messages[lang].requestSuccess}`);
    }
  } catch (err) {
    console.error(err);
    return res.send(`END ${messages["en"].error}`);
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
