"use strict";

const express = require("express");
const router = express.Router();
const { getSession } = require("./handlers/sessions");
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

    // ------------------- ADMIN MENU HANDLING -------------------
    if (session.step === "roleMenu" && session.role === "admin" && !input) {
      session.step = "adminMenu";
      session.stepDetail = false;
      r = {
        type: "CON",
        message: "1. Inguzanyo zose\n2. Izitegereje\n0. Subira inyuma",
      };
    } else if (session.step === "adminMenu" && session.role === "admin") {
      if (input === "0") {
        r = await handleRoleMenu(session, null);
      } else {
        // set mode based on choice
        const mode = input === "1" ? "view" : input === "2" ? "approve" : null;
        if (!mode) {
          r = { type: "CON", message: "Wahisemo nabi." };
        } else {
          session.step = "adminLoan";
          session.loanPage = 0;
          session.stepDetail = false;
          session.mode = mode; // store mode in session
          r = await handleAdminLoans(session, null, mode);
        }
      }
    } else {
      // ------------------- SWITCH ON SESSION STEP -------------------
      switch (session.step) {
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
        case "adminLoan":
          r = await handleAdminLoans(session, input, session.mode || "view");
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
    }

    res.send(`${r.type} ${r.message}`);
  } catch (err) {
    console.error(err);
    res.send("END Network error. Try again later.");
  }
});

module.exports = router;
