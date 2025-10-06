"use strict";

const express = require("express");
const router = express.Router();
const { getSession } = require("./handlers/sessions");
const { handleWelcome } = require("./handlers/handleWelcome");
const { handleRegistration } = require("./auth/handleRegistration");
const { handleLoanRequest } = require("./loan/handleLoanRequest");
const { handleAuth } = require("./auth/handleAuth");
const { handleLogin } = require("./auth/handleLogin");
const { handleRoleMenu } = require("./auth/handleRoleMenu");
const { handleFarmerLoans } = require("./farmer/handleFarmerLoans");
const { handleAdminLoans } = require("./admin/handleAdminLoans");

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
        r = await handleAuth(session, input);
        break;
      case "register_name":
      case "register_national":
        r = await handleRegistration(session, input);
        break;
      case "login":
        r = await handleLogin(session, input);
        break;
      case "roleMenu":
        r = await handleRoleMenu(session, input);
        break;
      case "farmer_viewLoans":
        r = await handleFarmerLoans(session, input);
        break;
      case "adminMenu":
      case "adminLoan":
        r = await handleAdminLoans(session, input);
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
