const Repayment = require("../models/Repayment");
const LoanRequest = require("../models/Loan_Request");
const mongoose = require("mongoose");
// Record repayment
exports.recordRepayment = async (req, res) => {
  try {
    const { loan_request_id, farmer, amount, method } = req.body;

    if (!loan_request_id || !farmer || !amount || !method) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(loan_request_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid loan request ID" });
    }

    const loanRequest = await LoanRequest.findById(loan_request_id);
    if (!loanRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Loan request not found" });
    }

    // Ensure farmer exists
    if (
      !loanRequest.farmer ||
      !mongoose.Types.ObjectId.isValid(loanRequest.farmer)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid farmer ID in loan request" });
    }

    const repayment = new Repayment({
      loan_request: loanRequest._id,
      farmer, // safe now
      amount,
      method,
    });

    await repayment.save();

    res.json({ success: true, message: "Repayment recorded", repayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get all repayments for a specific farmer
exports.getRepaymentsForFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const repayments = await Repayment.find({ farmer: farmerId }).populate(
      "loan_request"
    );
    res.json({ success: true, repayments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all repayments
exports.getAllRepayments = async (req, res) => {
  try {
    const repayments = await Repayment.find().populate("loan_request farmer");
    res.json({ success: true, repayments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
