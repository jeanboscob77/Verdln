"use strict";
const twilio = require("twilio");
const User = require("./models/User");
const LoanRequest = require("./models/Loan_Request");
const Repayment = require("./models/Repayment");
const express = require("express");
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

//send sms with twilio

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
  // If number starts with 0, replace with +250
  if (phone.startsWith("0")) {
    return "+250" + phone.slice(1);
  }
  // If already starts with +, return as is
  if (phone.startsWith("+")) {
    return phone;
  }
  return phone; // fallback
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

  function goBack() {
    if (session.history.length > 0) {
      session.step = session.history.pop();
      return true;
    }
    return false;
  }

  try {
    // STEP 1: LANGUAGE SELECTION
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

    // STEP 2: MAIN ENTRY MENU (Register / Login)
    if (session.step === "mainMenu") {
      const lang = session.lang;

      if (input === "1") {
        session.history.push("mainMenu");
        session.step = "nationalId";
        response = `CON ${messages[lang].enterNationalId}\n0. Back`;
        return res.send(response);
      } else if (input === "2") {
        const user = await User.findOne({ phone_number: phoneNumber });
        if (!user) {
          response = `END ${messages[lang].notRegistered}`;
          return res.send(response);
        }
        session.step = "menu";
        session.userId = user._id;
        response = `CON ${messages[lang].welcome}\n${messages[lang].mainMenu}`;
        return res.send(response);
      } else if (input === "0" && goBack()) {
        session.step = "language";
        return res.send(
          `CON Welcome to VerdIn!\nSelect language:\n1. English\n2. Kinyarwanda`
        );
      } else {
        response = `END ${messages[lang].invalidChoice}`;
        return res.send(response);
      }
    }

    // --- REGISTRATION FLOW ---
    if (session.step === "nationalId") {
      const lang = session.lang;
      if (input === "0" && goBack()) {
        response = `CON ${messages[lang].entryMenu}`;
        return res.send(response);
      }
      const existingID = await User.findOne({ national_id: input });
      if (existingID) {
        response = `END ${messages[lang].alreadyRegistered}`;
        delete sessions[sessionId];
        return res.send(response);
      }
      session.national_id = input;
      session.history.push("nationalId");
      session.step = "phone";
      response = `CON ${messages[lang].enterPhone}\n0. Back`;
      return res.send(response);
    }

    if (session.step === "phone") {
      const lang = session.lang;
      if (input === "0" && goBack()) {
        response = `CON ${messages[lang].enterNationalId}\n0. Back`;
        return res.send(response);
      }
      const existingPhone = await User.findOne({ phone_number: phoneNumber });
      if (existingPhone) {
        response = `END ${messages[lang].phoneAlreadyRegistered}`;
        delete sessions[sessionId];
        return res.send(response);
      }
      const newUser = new User({
        national_id: session.national_id,
        phone_number: phoneNumber,
        preferred_language: session.preferred_language,
      });
      await newUser.save();

      // Send SMS
      await sendSMS(
        formatPhoneNumber(phoneNumber),
        session.preferred_language === "en"
          ? "🎉 Welcome to VerdIn! Your registration was successful."
          : "🎉 Murakaza neza kuri VerdIn! Kwiyandikisha kwawe byagenze neza."
      );
      delete sessions[sessionId];
      response = `END ${messages[lang].registrationSuccess}`;
      return res.send(response);
    }
    // --- USER MENU ---
    if (session.step === "menu") {
      const user = await User.findById(session.userId);
      const lang = session.lang;

      switch (input) {
        case "1": // Loan request
          session.history.push("menu");
          session.step = "loan_inputType";
          response = `CON ${messages[lang].selectInputType}\n1. ${
            lang === "en" ? "Seeds" : "Imbuto"
          }\n2. ${lang === "en" ? "Fertilizer" : "Ifumbire"}\n3. ${
            lang === "en" ? "Pesticides" : "Ibinini byica udukoko"
          }\n0. Back`;
          break;

        case "2": // Check requests
          const requests = await LoanRequest.find({ farmer: user._id });
          if (!requests.length) response = `END ${messages[lang].noRequests}`;
          else {
            response = `END ${messages[lang].yourRequests}\n`;
            requests.forEach((r, i) => {
              response += `${i + 1}. ${r.input_type} (${r.package_size}) - ${
                r.amount
              } - ${r.status} - Repay by: ${
                r.repayment_date?.toISOString().split("T")[0]
              }\n`;
            });
          }
          break;

        case "3": // Repayment history
          const repayments = await Repayment.find({ farmer: user._id });
          if (!repayments.length)
            response = `END ${messages[lang].noRepayments}`;
          else {
            response = `END ${messages[lang].repaymentHistory}\n`;
            repayments.forEach((r, i) => {
              response += `${i + 1}. ${r.amount} via ${r.method} on ${
                r.date.toISOString().split("T")[0]
              }\n`;
            });
          }
          break;

        case "4": // Exit
          response = `END ${messages[lang].thankYou}`;
          delete sessions[sessionId];
          break;

        default:
          response = `END ${messages[lang].invalidChoice}`;
          break;
      }
      return res.send(response);
    }

    // --- LOAN REQUEST FLOW ---
    if (session.step === "loan_inputType") {
      const lang = session.lang;
      const displayOptions =
        lang === "en"
          ? ["Seeds", "Fertilizer", "Pesticides"]
          : ["Imbuto", "Ifumbire", "Ibinini byica udukoko"];
      const dbOptions = ["seeds", "fertilizer", "pesticides"];

      if (input === "0" && goBack()) {
        response = `CON ${messages[lang].mainMenu}`;
        return res.send(response);
      }

      const index = parseInt(input) - 1;
      if (index < 0 || index >= dbOptions.length) {
        response = `CON Select input type:\n1. ${displayOptions[0]}\n2. ${displayOptions[1]}\n3. ${displayOptions[2]}\n0. Back`;
        return res.send(response);
      }

      session.input_type = dbOptions[index]; // Save in DB in English
      session.history.push("loan_inputType");
      session.step = "loan_packageSize";
      response = `CON ${messages[lang].enterPackageSize}\n0. Back`;
      return res.send(response);
    }

    if (session.step === "loan_packageSize") {
      const lang = session.lang;
      if (input === "0" && goBack()) {
        response = `CON ${messages[lang].selectInputType}`;
        return res.send(response);
      }
      session.package_size = input;
      session.history.push("loan_packageSize");
      session.step = "loan_amount";
      response = `CON ${messages[lang].enterAmount}\n0. Back`;
      return res.send(response);
    }

    if (session.step === "loan_amount") {
      const lang = session.lang;
      if (input === "0" && goBack()) {
        response = `CON ${messages[lang].enterPackageSize}\n0. Back`;
        return res.send(response);
      }
      session.loan_amount = parseFloat(input);
      if (isNaN(session.loan_amount)) {
        response = `CON ${messages[lang].invalidAmount}\n0. Back`;
        return res.send(response);
      }
      const newRequest = new LoanRequest({
        farmer: session.userId,
        input_type: session.input_type,
        package_size: session.package_size,
        amount: session.loan_amount,
        status: "pending",
        repayment_date: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ), // default repayment date 1 month from now
      });
      await newRequest.save();
      delete sessions[sessionId];
      response = `END ${messages[lang].requestSuccess}`;
      return res.send(response);
    }
  } catch (err) {
    console.error(err);
    response = `END ${messages["en"].error}`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
