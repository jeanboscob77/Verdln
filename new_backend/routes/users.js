const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Helper: create token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      full_name: user.full_name,
      national_id: user.national_id,
      role: user.role,
      lang: user.preferred_language,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}
// -------------------------------------------
// Register User
// -------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const {
      full_name,
      national_id,
      phone_number,
      role,
      language,
      province_id,
      district_id,
      sector_id,
      cell_id,
      village_id,
    } = req.body;

    // Validate role
    const validRoles = ["farmer", "supplier", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Supplier must have location assigned
    if (role === "supplier") {
      if (
        !province_id ||
        !district_id ||
        !sector_id ||
        !cell_id ||
        !village_id
      ) {
        return res
          .status(400)
          .json({ error: "Supplier must have full location assigned" });
      }
    }
    //✅ Check if national_id or phone_number already exist
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE national_id = ? OR phone_number = ?",
      [national_id, phone_number]
    );

    if (existing.length > 0) {
      const msg =
        existing[0].national_id === national_id
          ? "National ID already exists"
          : "Phone number already exists";

      return res.status(400).json({ success: false, message: msg });
    }
    // Farmer/admin location optional
    const id = uuidv4();

    await pool.query(
      `INSERT INTO users
  (id, full_name, national_id, phone_number, role, language, province_id, district_id, sector_id, cell_id,village_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
      [
        id,
        full_name,
        national_id,
        phone_number,
        role,
        language,
        province_id || null,
        district_id || null,
        sector_id || null,
        cell_id || null,
        village_id || null,
      ]
    );

    res.json({ success: true, userId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// -------------------------------------------
// Login User
// -------------------------------------------

router.post("/login", async (req, res) => {
  try {
    const { national_id, phone_number } = req.body;

    if (!national_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "National ID and Phone are required",
      });
    }
    // 1️⃣ Check if National ID exists
    const [userById] = await pool.query(
      "SELECT * FROM users WHERE national_id = ?",
      [national_id]
    );

    if (userById.length === 0) {
      return res.status(404).json({
        success: false,
        message: "National ID not found",
      });
    }

    // 2️⃣ Check if phone matches that National ID
    const [user] = await pool.query(
      "SELECT * FROM users WHERE national_id = ? AND phone_number = ?",
      [national_id, phone_number]
    );

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Incorrect phone number for this National ID",
      });
    }
    const token = generateToken(user[0]);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: user[0],
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------------------------------
// Get all users
// -------------------------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json({ success: true, users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
