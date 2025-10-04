const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// -------------------------------------------
// Get all input types
// -------------------------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM input_types ORDER BY type");
    res.json({ success: true, inputTypes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch input types" });
  }
});

// -------------------------------------------
// Get subtypes/packages by input type
// -------------------------------------------
router.get("/:inputTypeId/subtypes", async (req, res) => {
  try {
    const { inputTypeId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM input_subtypes WHERE input_type_id = ? ORDER BY name",
      [inputTypeId]
    );
    res.json({ success: true, subtypes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch input subtypes" });
  }
});

// -------------------------------------------
// Admin: Add input type
// -------------------------------------------
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const id = uuidv4();
    await pool.query("INSERT INTO input_types (id, type) VALUES (?, ?)", [
      id,
      name,
    ]);
    res.json({ success: true, inputTypeId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add input type" });
  }
});

// -------------------------------------------
// Admin: Add subtype/package for input type
// -------------------------------------------
router.post("/:inputTypeId/add-subtype", async (req, res) => {
  try {
    const { inputTypeId } = req.params;
    const { name } = req.body;
    const id = uuidv4();

    await pool.query(
      "INSERT INTO input_subtypes (id, input_type_id, name) VALUES (?, ?, ?)",
      [id, inputTypeId, name]
    );

    res.json({ success: true, subtypeId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add subtype" });
  }
});

module.exports = router;
