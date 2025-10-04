const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// -------------------------------------------
// Get all provinces
// -------------------------------------------
router.get("/provinces", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM provinces ORDER BY name");
    res.json({ success: true, provinces: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
});

// -------------------------------------------
// Get districts by province
// -------------------------------------------
router.get("/districts/:provinceId", async (req, res) => {
  try {
    const { provinceId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM districts WHERE province_id = ? ORDER BY name",
      [provinceId]
    );
    res.json({ success: true, districts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch districts" });
  }
});

// -------------------------------------------
// Get sectors by district
// -------------------------------------------
router.get("/sectors/:districtId", async (req, res) => {
  try {
    const { districtId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM sectors WHERE district_id = ? ORDER BY name",
      [districtId]
    );
    res.json({ success: true, sectors: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sectors" });
  }
});

// -------------------------------------------
// Get cells by sector
// -------------------------------------------
router.get("/cells/:sectorId", async (req, res) => {
  try {
    const { sectorId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM cells WHERE sector_id = ? ORDER BY name",
      [sectorId]
    );
    res.json({ success: true, cells: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cells" });
  }
});

module.exports = router;
