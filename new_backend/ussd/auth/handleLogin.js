const pool = require("../../config/db");
const { normalizeForDB } = require("../handlers/phoneFormatting");
const { saveStep } = require("../handlers/sessions");
const { handleLoanRequest } = require("../loan/handleLoanRequest");
const { handleWelcome } = require("../handlers/handleWelcome");
const { handleFarmerLoans } = require("../farmer/handleFarmerLoans");
const { handleAdminLoans } = require("../admin/handleAdminLoans");
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
      saveStep(session, "farmer_viewLoans");
      session.loanPage = 0;
      return await handleFarmerLoans(session, null);
    } else if (input === "0") {
      goBack(session);
      return await handleWelcome(session, null);
    }
  }

  if (session.role === "admin") {
    saveStep(session, "adminMenu");
    session.loanPage = 0;
    return await handleAdminLoans(session, null);
  }

  return { type: "END", message: "Unknown role." };
}

module.exports = { handleLogin };
