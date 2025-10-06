// ------------------- DB HELPERS -------------------
const pool = require("../../config/db");

async function getInputTypes() {
  const [rows] = await pool.query("SELECT * FROM input_types");
  return rows;
}
async function getInputSubtypes(typeId) {
  const [rows] = await pool.query(
    "SELECT * FROM input_subtypes WHERE input_type_id=?",
    [typeId]
  );
  return rows;
}

async function getLocations(level, parent = null) {
  const map = {
    province: "SELECT * FROM provinces",
    district: "SELECT * FROM districts WHERE province_id=?",
    sector: "SELECT * FROM sectors WHERE district_id=?",
    cell: "SELECT * FROM cells WHERE sector_id=?",
    supplier: "SELECT * FROM users WHERE cell_id=?",
  };
  const query = map[level];
  if (!query) {
    console.error("Invalid location level:", level);
    return [];
  }
  const params = parent ? [parent] : [];
  const [rows] = await pool.query(query, params);
  return rows;
}
module.exports = { getInputTypes, getInputSubtypes, getLocations };
