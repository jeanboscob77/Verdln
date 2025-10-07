const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
const { saveStep, deleteSession } = require("../handlers/sessions");
const { normalizePhone } = require("../handlers/phoneFormatting");

// ------------------- REGISTRATION -------------------
async function handleRegistration(session, input) {
  if (session.step === "register_name") {
    if (!input)
      return {
        type: "CON",
        message: "Shyiramo amazina yose:",
      };
    session.full_name = input;

    // Move to national_id step
    saveStep(session, "register_national");
    return {
      type: "CON",
      message: "Shyiramo indangamuntu:",
    };
  }

  if (session.step === "register_national") {
    if (!input)
      return {
        type: "CON",
        message: "Shyiramo indangamuntu:",
      };
    session.national_id = input;

    // Use telecom number directly
    const phone = normalizePhone(session.phone);

    const [exists] = await pool.query(
      "SELECT id FROM users WHERE phone_number=? OR national_id=? LIMIT 1",
      [phone, session.national_id]
    );
    if (exists.length)
      return {
        type: "END",
        message: "Iyi numero cyangwa indangamuntu byamaze kwandikwa.",
      };

    const id = uuidv4();
    await pool.query(
      "INSERT INTO users (id, full_name, national_id, phone_number, role, language) VALUES (?,?,?,?,?,?)",
      [id, session.full_name, session.national_id, phone, "farmer", lang]
    );
    deleteSession(session.sessionId);
    return {
      type: "END",
      message: "Kwiyandikisha byagenze neza!",
    };
  }

  return { type: "END", message: "Unexpected step." };
}

module.exports = { handleRegistration };
