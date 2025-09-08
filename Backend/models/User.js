const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    national_id: {
      type: String,
      required: true,
      unique: true,
      minlength: 16,
      maxlength: 16,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["farmer", "admin", "supplier"],
      default: "farmer",
    },
    preferred_language: {
      type: String,
      enum: ["en", "rw"],
      default: "en",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
