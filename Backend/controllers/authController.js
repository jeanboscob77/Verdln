const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Helper: create token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      national_id: user.national_id,
      role: user.role,
      lang: user.preferred_language,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Register user
exports.register = async (req, res) => {
  try {
    const { national_id, phone_number, role, preferred_language } = req.body;

    if (!national_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "National ID and Phone are required",
      });
    }

    // Check if user exists
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE national_id = ? OR phone_number = ?",
      [national_id, phone_number]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Generate UUID for user
    const userId = uuidv4();

    // Insert new user
    await pool.query(
      "INSERT INTO users (id, national_id, phone_number, role, preferred_language) VALUES (?, ?, ?, ?, ?)",
      [
        userId,
        national_id,
        phone_number,
        role || "farmer",
        preferred_language || "en",
      ]
    );

    // Fetch the newly created user
    const [newUser] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    const token = generateToken(newUser[0]);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser[0],
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user (unchanged except still works with UUID id)
exports.login = async (req, res) => {
  try {
    const { national_id, phone_number } = req.body;

    if (!national_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "National ID and Phone are required",
      });
    }

    const [user] = await pool.query(
      "SELECT * FROM users WHERE national_id = ? AND phone_number = ?",
      [national_id, phone_number]
    );

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
};
