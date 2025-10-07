// ------------------- LOGIN -------------------
async function handleLogin(session, phoneNumber, input = null) {
  const pool = require("../../config/db");
  const { normalizeForDB } = require("../handlers/phoneFormatting");
  const { saveStep, goBack } = require("../handlers/sessions");
  const { handleLoanRequest } = require("../loan/handleLoanRequest");
  const { handleFarmerLoans } = require("../farmer/handleFarmerLoans");
  const { handleAdminLoans } = require("../admin/handleAdminLoans");
  const { handleAuth } = require("./handleAuth");
  const { handleRoleMenu } = require("./handleRoleMenu");

  const phone = normalizeForDB(phoneNumber);

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE phone_number=? LIMIT 1",
    [phone]
  );

  if (!rows.length) {
    session.step = "mainMenu";
    return {
      type: "END",
      message: "Numero yawe ntabwo yanditswe. Nyamuneka wiyandikishe mbere.",
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
          "1. Saba Inguzanyo\n2. Kwishyura\n3. Reba Inguzanyo\n0. Subira inyuma",
      };
    }
    if (input === "1") {
      saveStep(session, "loan_inputType");
      return await handleLoanRequest(session, null);
    } else if (input === "2") {
      saveStep(session, "repayment");
      return {
        type: "CON",
        message: "Injiza amafaranga yo kwishyura:",
      };
    } else if (input === "3") {
      saveStep(session, "farmer_viewLoans");
      session.loanPage = 0;
      return await handleFarmerLoans(session, null);
    } else if (input === "0") {
      goBack(session);

      switch (session.step) {
        case "authMenu":
          return await handleAuth(session, null); // correct handler
        case "roleMenu":
          return await handleRoleMenu(session, null); // correct handler
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
          return await handleLoanRequest(session, null); // correct handler
        default:
          return { type: "END", message: "Unknown step." };
      }
    }
  }
  if (session.role === "admin") {
    saveStep(session, "adminMenu");
    session.loanPage = 0;
    session.stepDetail = false;

    if (!input) {
      return {
        type: "CON",
        message: "1. Inguzanyo zose\n2. Izitegereje\n0. Subira inyuma",
      };
    }

    if (input === "0") {
      goBack(session);
      return await handleRoleMenu(session, null);
    }

    // set mode based on choice
    let mode = input === "1" ? "view" : input === "2" ? "approve" : null;
    if (!mode) return { type: "CON", message: "Wahisemo nabi." };

    session.step = "adminLoan";
    session.loanPage = 0;
    session.stepDetail = false;

    return await handleAdminLoans(session, null, mode);
  }

  return { type: "END", message: "Unknown role." };
}

module.exports = { handleLogin };
