"use strict";

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const router = express.Router();

// ------------------- SESSION HANDLING -------------------
const sessions = {};
function getSession(sessionId) {
  if (!sessions[sessionId])
    sessions[sessionId] = { step: "welcome", history: [] };
  return sessions[sessionId];
}
function goBack(session) {
  if (session.history.length > 0) {
    session.step = session.history.pop();
  }
}

function saveStep(session, step) {
  session.history.push(session.step);
  session.step = step;
}
function deleteSession(sessionId) {
  delete sessions[sessionId];
}

// ------------------- PHONE HELPERS -------------------
function normalizePhone(input) {
  let phone = input.trim().replace(/\s+/g, "");
  if (phone.startsWith("+250")) return "0" + phone.slice(4);
  if (phone.startsWith("250")) return "0" + phone.slice(3);
  if (phone.startsWith("7")) return "0" + phone;
  return phone;
}
function normalizeForDB(input) {
  return normalizePhone(input);
}

// ------------------- DB HELPERS -------------------
async function getInputTypes() {
  const [rows] = await pool.query("SELECT * FROM input_types");
  return rows;
}
async function getInputSubtypes(typeId) {
  const [rows] = await pool.query(
    "SELECT * FROM input_subtypes WHERE input_type_id=?",
    [typeId]
  );
  return rows;
}
async function getLocations(level, parent = null) {
  const map = {
    province: "SELECT * FROM provinces",
    district: "SELECT * FROM districts WHERE province_id=?",
    sector: "SELECT * FROM sectors WHERE district_id=?",
    cell: "SELECT * FROM cells WHERE sector_id=?",
    supplier: "SELECT * FROM users WHERE cell_id=?",
  };
  const query = map[level];
  const params = parent ? [parent] : [];
  const [rows] = await pool.query(query, params);
  return rows;
}

// ------------------- LANGUAGE & MAIN -------------------
async function handleWelcome(session, input) {
  if (!input)
    return {
      type: "CON",
      message: "Welcome to VerdIn!\n1. English\n2. Kinyarwanda",
    };

  if (input === "1") session.lang = "en";
  else if (input === "2") session.lang = "rw";
  else
    return {
      type: "CON",
      message: "Invalid choice.\n1. English\n2. Kinyarwanda",
    };

  saveStep(session, "authMenu");
  const menu =
    session.lang === "en"
      ? "1. Login\n2. Register"
      : "1. Kwinjira\n2. Kwiyandikisha";
  return { type: "CON", message: menu };
}

// ------------------- AUTH -------------------
async function handleAuth(session, input) {
  const lang = session.lang || "en";
  if (!input)
    return {
      type: "CON",
      message:
        lang === "en"
          ? "1. Login\n2. Register"
          : "1. Kwinjira\n2. Kwiyandikisha",
    };
  if (input === "1") {
    return await handleLogin(session, session.phone, null);
  } else if (input === "2") {
    saveStep(session, "register_name");
    return {
      type: "CON",
      message: lang === "en" ? "Enter full name:" : "Shyiramo amazina yose:",
    };
  }
  return { type: "CON", message: "Invalid choice." };
}

// ------------------- REGISTRATION -------------------
async function handleRegistration(session, input) {
  const lang = session.lang || "en";

  if (session.step === "register_name") {
    if (!input)
      return {
        type: "CON",
        message: lang === "en" ? "Enter full name:" : "Shyiramo amazina yose:",
      };
    session.full_name = input;
    saveStep(session, "register_national");
    return {
      type: "CON",
      message: lang === "en" ? "Enter National ID:" : "Shyiramo indangamuntu:",
    };
  }

  if (session.step === "register_national") {
    if (!input)
      return {
        type: "CON",
        message:
          lang === "en" ? "Enter National ID:" : "Shyiramo indangamuntu:",
      };
    session.national_id = input;
    saveStep(session, "register_phone");
    return {
      type: "CON",
      message:
        lang === "en"
          ? "Enter your phone number (07...):"
          : "Shyiramo numero ya telefone (07...):",
    };
  }

  if (session.step === "register_phone") {
    if (!input)
      return {
        type: "CON",
        message: lang === "en" ? "Enter phone number:" : "Shyiramo numero:",
      };
    const phone = normalizePhone(input);

    const [exists] = await pool.query(
      "SELECT id FROM users WHERE phone_number=? LIMIT 1",
      [phone]
    );
    if (exists.length)
      return {
        type: "END",
        message:
          lang === "en"
            ? "This phone number is already registered."
            : "Iyi numero isanzwe yanditse.",
      };

    const id = uuidv4();
    await pool.query(
      "INSERT INTO users (id, full_name, national_id, phone_number, role, language) VALUES (?,?,?,?,?,?)",
      [id, session.full_name, session.national_id, phone, "farmer", lang]
    );
    deleteSession(session.sessionId);
    return {
      type: "END",
      message:
        lang === "en"
          ? "Registration successful!"
          : "Kwiyandikisha byagenze neza!",
    };
  }

  return { type: "END", message: "Unexpected step." };
}

// ------------------- LOGIN -------------------
async function handleLogin(session, phoneNumber, input = null) {
  const lang = session.lang || "en";
  const phone = normalizeForDB(phoneNumber);

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE phone_number=? LIMIT 1",
    [phone]
  );

  if (!rows.length) {
    session.step = "mainMenu";
    return {
      type: "END",
      message:
        lang === "en"
          ? "Your number is not registered. Please register first."
          : "Numero yawe ntabwo yanditswe. Nyamuneka wiyandikishe mbere.",
    };
  }

  session.userId = rows[0].id;
  session.role = rows[0].role;
  session.lang = rows[0].language || lang;
  session.step = "roleMenu";

  if (session.role === "farmer") {
    if (!input) {
      return {
        type: "CON",
        message:
          lang === "en"
            ? "1. Request Loan\n2. Repayment\n3. View Loan Requests\n0. Back"
            : "1. Saba Inguzanyo\n2. Kishyura\n3. Reba Inguzanyo\n0. Subira inyuma",
      };
    }
    if (input === "1") {
      saveStep(session, "loan_inputType");
      return await handleLoanRequest(session, null);
    } else if (input === "2") {
      saveStep(session, "repayment");
      return {
        type: "CON",
        message:
          lang === "en"
            ? "Enter repayment amount:"
            : "Injiza amafaranga yo kwishyura:",
      };
    } else if (input === "3") {
      const [loans] = await pool.query(
        `SELECT lr.id, it.type AS input_type, st.name AS input_subtype,
                lr.package_size, lr.repayment_date, lr.loan_amount, lr.total_amount
         FROM loan_requests lr
         JOIN input_types it ON lr.input_type_id = it.id
         JOIN input_subtypes st ON lr.input_subtype_id = st.id
         WHERE lr.farmer_id=? ORDER BY lr.created_at DESC LIMIT 5`,
        [session.userId]
      );
      let msg = "";
      if (loans.length) {
        msg =
          lang === "en"
            ? "Your recent loan requests:\n"
            : "Inguzanyo zawe ziheruka:\n";
        loans.forEach((l, i) => {
          msg += `${i + 1}. ${l.input_type} - ${l.input_subtype} - ${
            l.package_size
          } units - Due: ${
            l.repayment_date.toISOString().split("T")[0]
          } - Loan: ${l.loan_amount} - Total: ${l.total_amount}\n`;
        });
      } else {
        msg =
          lang === "en"
            ? "No loan requests yet."
            : "Nta nguzanyo wasabye kugeza ubu.";
      }
      msg += lang === "en" ? "\n0. Back" : "\n0. Subira inyuma";
      saveStep(session, "roleMenu");
      return { type: "CON", message: msg };
    } else if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
  }

  if (session.role === "admin") {
    return {
      type: "CON",
      message:
        lang === "en"
          ? "Welcome Admin!\n1. Approve Loans\n2. View Reports"
          : "Murakaza neza Admin!\n1. Emeza Inguzanyo\n2. Reba Raporo",
    };
  }

  return { type: "END", message: "Unknown role." };
}

// ------------------- ROLE MENU -------------------
async function handleRoleMenu(session, input) {
  const lang = session.lang || "en";
  if (session.role === "farmer") {
    if (!input) {
      return {
        type: "CON",
        message:
          lang === "en"
            ? "1. Request Loan\n2. Repayment\n3. View Loan Requests\n0. Back"
            : "1. Saba Inguzanyo\n2. Kishyura\n3. Reba Inguzanyo\n0. Subira inyuma",
      };
    }
    if (input === "1") {
      saveStep(session, "loan_inputType");
      return await handleLoanRequest(session, null);
    } else if (input === "2") {
      saveStep(session, "repayment");
      return {
        type: "CON",
        message:
          lang === "en"
            ? "Enter repayment amount:"
            : "Injiza amafaranga yo kwishyura:",
      };
    } else if (input === "3") {
      const [loans] = await pool.query(
        `SELECT lr.id, it.type AS input_type, st.name AS input_subtype, lr.status,
                lr.package_size, lr.repayment_date, lr.loan_amount, lr.total_amount
         FROM loan_requests lr
         JOIN input_types it ON lr.input_type_id = it.id
         JOIN input_subtypes st ON lr.input_subtype_id = st.id
         WHERE lr.farmer_id=? ORDER BY lr.created_at DESC LIMIT 5`,
        [session.userId]
      );
      let msg = "";
      if (loans.length) {
        msg =
          lang === "en"
            ? "Your recent loan requests:\n"
            : "Inguzanyo zawe ziheruka:\n";
        loans.forEach((l, i) => {
          msg += `${i + 1}. ${l.input_type} - ${l.input_subtype} - ${
            l.package_size
          } units - Due: ${
            l.repayment_date.toISOString().split("T")[0]
          } - Loan: ${l.loan_amount} - Total: ${l.total_amount} status: ${
            l.status
          }\n`;
        });
      } else {
        msg =
          lang === "en"
            ? "No loan requests yet."
            : "Nta nguzanyo wasabye kugeza ubu.";
      }
      msg += lang === "en" ? "\n0. Back" : "\n0. Subira inyuma";
      saveStep(session, "roleMenu");
      return { type: "CON", message: msg };
    } else if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
  }

  if (session.role === "admin") {
    return { type: "CON", message: "1. Approve Loans\n2. Reports" };
  }
  if (session.role === "supplier") {
    return { type: "CON", message: "1. View Orders\n2. Update Status" };
  }

  return { type: "END", message: "Unknown role." };
}

// ------------------- LOAN REQUEST -------------------
async function handleLoanRequest(session, input) {
  const lang = session.lang || "en";

  // Step 1: Input Type
  if (session.step === "loan_inputType") {
    const types = await getInputTypes();
    if (!input) {
      let msg =
        lang === "en"
          ? "Select input type:\n"
          : "Hitamo ubwoko bw'ibikoresho:\n";
      types.forEach((t, i) => (msg += `${i + 1}. ${t.type}\n`));
      return { type: "CON", message: msg + "0. Back" };
    }
    if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
    const idx = parseInt(input) - 1;
    if (idx < 0 || idx >= types.length)
      return { type: "CON", message: "Invalid choice. Try again:" };
    session.input_type_id = types[idx].id;
    saveStep(session, "loan_inputSubtype");
    return await handleLoanRequest(session, null);
  }

  // Step 2: Input Subtype
  if (session.step === "loan_inputSubtype") {
    const subs = await getInputSubtypes(session.input_type_id);
    if (!input) {
      let msg = lang === "en" ? "Select subtype:\n" : "Hitamo ubwoko:\n";
      subs.forEach((s, i) => (msg += `${i + 1}. ${s.name}\n`));
      return { type: "CON", message: msg + "0. Back" };
    }
    if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
    const idx = parseInt(input) - 1;
    if (idx < 0 || idx >= subs.length)
      return { type: "CON", message: "Invalid choice. Try again:" };
    session.input_subtype_id = subs[idx].id;
    saveStep(session, "loan_packageSize");
    return { type: "CON", message: "Enter package size:" };
  }

  // Step 3: Package Size
  if (session.step === "loan_packageSize") {
    if (!input) return { type: "CON", message: "Enter package size:" };
    if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
    const size = parseFloat(input);
    if (isNaN(size))
      return { type: "CON", message: "Invalid number. Enter again:" };
    session.package_size = size;
    saveStep(session, "loan_province");
    return await handleLoanRequest(session, null);
  }

  // Step 4–7: Location & Supplier
  const locSteps = ["province", "district", "sector", "cell", "supplier"];
  for (let step of locSteps) {
    if (session.step === `loan_${step}`) {
      const parent = {
        district: session.province_id,
        sector: session.district_id,
        cell: session.sector_id,
        supplier: session.cell_id,
      }[step];
      const list = await getLocations(step, parent);
      if (!input) {
        let msg = `Select ${step}:\n`;
        list.forEach((l, i) => {
          const displayName = step === "supplier" ? l.full_name : l.name;
          msg += `${i + 1}. ${displayName}\n`;
        });
      }
      if (input === "0") {
        goBack(session);
        // dynamically call the handler for the current step
        switch (session.step) {
          case "welcome":
            return await handleWelcome(session, null);
          case "authMenu":
            return await handleAuth(session, null);
          case "roleMenu":
            return await handleRoleMenu(session, null);
          case "loan_inputType":
          case "loan_inputSubtype":
          case "loan_packageSize":
          case "loan_province":
          case "loan_district":
          case "loan_sector":
          case "loan_cell":
          case "loan_supplier":
          case "loan_repaymentDate":
          case "loan_confirm":
            return await handleLoanRequest(session, null);
          default:
            return { type: "END", message: "Unexpected step." };
        }
      }
      const idx = parseInt(input) - 1;
      if (idx < 0 || idx >= list.length)
        return { type: "CON", message: `Invalid choice. Try again:` };
      session[`${step}_id`] = list[idx].id;
      const next = locSteps[locSteps.indexOf(step) + 1];
      if (next) {
        saveStep(session, `loan_${next}`);
        return await handleLoanRequest(session, null);
      } else {
        saveStep(session, "loan_repaymentDate");
        return { type: "CON", message: "Enter repayment date (YYYY-MM-DD):" };
      }
    }
  }

  // Step 8: Repayment Date
  if (session.step === "loan_repaymentDate") {
    if (!input)
      return { type: "CON", message: "Enter repayment date (YYYY-MM-DD):" };
    if (input === "0") {
      goBack(session);
      // dynamically call the handler for the current step
      switch (session.step) {
        case "welcome":
          return await handleWelcome(session, null);
        case "authMenu":
          return await handleAuth(session, null);
        case "roleMenu":
          return await handleRoleMenu(session, null);
        case "loan_inputType":
        case "loan_inputSubtype":
        case "loan_packageSize":
        case "loan_province":
        case "loan_district":
        case "loan_sector":
        case "loan_cell":
        case "loan_supplier":
        case "loan_repaymentDate":
        case "loan_confirm":
          return await handleLoanRequest(session, null);
        default:
          return { type: "END", message: "Unexpected step." };
      }
    }
    session.repayment_date = input;
    saveStep(session, "loan_confirm");
    return { type: "CON", message: `Confirm loan request?\n1. Yes\n2. No` };
  }

  // Step 9: Confirm & Save
  if (session.step === "loan_confirm") {
    if (input === "1") {
      const id = uuidv4();

      // --- Calculate loan amounts ---
      const [subtypeRows] = await pool.query(
        "SELECT price FROM input_subtypes WHERE id = ?",
        [session.input_subtype_id]
      );
      const price = parseFloat(subtypeRows[0].price);
      const loan_amount = session.package_size * price;
      const interest_rate = 10; // default 10%
      const interest_amount = (loan_amount * interest_rate) / 100;
      const total_amount = loan_amount + interest_amount;

      await pool.query(
        `INSERT INTO loan_requests
          (id, farmer_id, input_type_id, input_subtype_id, package_size, repayment_date,
           province_id, district_id, sector_id, cell_id, supplier_id,
           loan_amount, interest_rate, interest_amount, total_amount)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          id,
          session.userId,
          session.input_type_id,
          session.input_subtype_id,
          session.package_size,
          session.repayment_date,
          session.province_id,
          session.district_id,
          session.sector_id,
          session.cell_id,
          session.supplier_id,
          loan_amount,
          interest_rate,
          interest_amount,
          total_amount,
        ]
      );
      deleteSession(session.sessionId);
      return { type: "END", message: "Loan request submitted successfully!" };
    } else {
      deleteSession(session.sessionId);
      return { type: "END", message: "Request canceled." };
    }
  }

  return { type: "END", message: "Unexpected step." };
}

// ------------------- MAIN ROUTE -------------------
router.post("/ussd", async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  const session = getSession(sessionId);
  session.sessionId = sessionId;
  session.phone = phoneNumber;
  const input = text.split("*").pop().trim();

  try {
    let r;
    switch (session.step) {
      case "welcome":
        r = await handleWelcome(session, input);
        break;
      case "authMenu":
        r = await handleAuth(session, input, phoneNumber);
        break;
      case "register_name":
      case "register_national":
      case "register_phone":
        r = await handleRegistration(session, input);
        break;
      case "login":
        r = await handleLogin(session, input);
        break;
      case "roleMenu":
        r = await handleRoleMenu(session, input);
        break;
      case "loan_inputType":
      case "loan_inputSubtype":
      case "loan_packageSize":
      case "loan_province":
      case "loan_district":
      case "loan_sector":
      case "loan_cell":
      case "loan_supplier":
      case "loan_repaymentDate":
      case "loan_confirm":
        r = await handleLoanRequest(session, input);
        break;
      default:
        r = { type: "END", message: "Network error. Try again later." };
    }
    res.send(`${r.type} ${r.message}`);
  } catch (err) {
    console.error(err);
    res.send("END Network error. Try again later.");
  }
});

module.exports = router;
