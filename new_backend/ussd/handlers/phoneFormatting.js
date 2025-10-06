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

module.exports = { normalizePhone, normalizeForDB };
