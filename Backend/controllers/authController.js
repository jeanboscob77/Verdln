const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // put in .env

// Helper: create token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
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

    // Check for existing user
    let user = await User.findOne({
      $or: [{ national_id: national_id }, { phone_number: phone_number }],
    });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create new user
    user = new User({
      national_id,
      phone_number,
      role: role || "farmer",
      preferred_language: preferred_language || "en",
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors gracefully
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res
        .status(400)
        .json({ success: false, message: "Validation failed", errors });
    }
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { national_id, phone_number } = req.body;

    if (!national_id || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "National ID and Phone are required",
      });
    }

    const user = await User.findOne({ national_id, phone_number });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
