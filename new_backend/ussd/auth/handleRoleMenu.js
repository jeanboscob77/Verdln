const { saveStep } = require("../handlers/sessions");
const { handleAdminLoans } = require("../admin/handleAdminLoans");

// ------------------- ROLE MENU -------------------
async function handleRoleMenu(session, input) {
  const { handleLogin } = require("../auth/handleLogin");
  if (session.role === "farmer") {
    saveStep(session, "roleMenu");
    return await handleLogin(session, session.phone, input);
  }
  if (session.role === "admin") {
    saveStep(session, "adminMenu");
    session.loanPage = 0;
    return await handleAdminLoans(session, input);
  }
  return { type: "END", message: "Unknown role." };
}

module.exports = { handleRoleMenu };
