const { handleLogin } = require("./handleLogin");
const { saveStep } = require("../handlers/sessions");

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
  return {
    type: "CON",
    message: `${lang === "en" ? "Invalid choice." : "Wahisemo nabi"}`,
  };
}

module.exports = { handleAuth };
