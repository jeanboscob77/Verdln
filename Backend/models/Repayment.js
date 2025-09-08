const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema(
  {
    loan_request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanRequest",
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["cash", "mobile_money"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repayment", repaymentSchema);
