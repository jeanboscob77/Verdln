const { handleLogin } = require("./handleLogin");
const { saveStep } = require("../handlers/sessions");

// ------------------- AUTH -------------------
async function handleAuth(session, input) {
  if (!input)
    return {
      type: "CON",
      message: "Murakaza neza kuri Verdln\n1. Kwinjira\n2. Kwiyandikisha",
    };
  if (input === "1") {
    return await handleLogin(session, session.phone, null);
  } else if (input === "2") {
    saveStep(session, "register_name");
    return {
      type: "CON",
      message: "Shyiramo amazina yose:",
    };
  }
  return {
    type: "CON",
    message: "Wahisemo nabi",
  };
}

module.exports = { handleAuth };
