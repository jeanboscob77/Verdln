const mongoose = require("mongoose");

const loanRequestSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    input_type: {
      type: String,
      enum: ["seeds", "fertilizer", "pesticides"],
      required: true,
    },
    package_size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    repayment_date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    admin_notes: {
      type: String,
    },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("LoanRequest", loanRequestSchema);
