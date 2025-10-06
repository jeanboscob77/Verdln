// ------------------- LANGUAGE & MAIN -------------------
const { saveStep } = require("./sessions");
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

module.exports = { handleWelcome };
