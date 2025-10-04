const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET suppliers by location
router.get("/", async (req, res) => {
  try {
    const { province, district, sector, cell } = req.query;

    // Build conditions dynamically
    const conditions = [];
    const params = [];

    if (province) {
      conditions.push("province_id = ?");
      params.push(province);
    }
    if (district) {
      conditions.push("district_id = ?");
      params.push(district);
    }
    if (sector) {
      conditions.push("sector_id = ?");
      params.push(sector);
    }
    if (cell) {
      conditions.push("cell_id = ?");
      params.push(cell);
    }

    let query = `SELECT id, full_name, phone_number, province_id, district_id, sector_id, cell_id 
                 FROM users 
                 WHERE role = 'supplier'`;

    if (conditions.length > 0) {
      query += " AND " + conditions.join(" AND ");
    }

    const [rows] = await pool.query(query, params);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
});

module.exports = router;
