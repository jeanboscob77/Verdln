const Repayment = require("../models/Repayment");
const LoanRequest = require("../models/Loan_Request");

// Record repayment
exports.recordRepayment = async (req, res) => {
  try {
    const { loan_request_id, amount, method } = req.body;

    if (!loan_request_id || !amount || !method) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const loanRequest = await LoanRequest.findById(loan_request_id);
    if (!loanRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Loan request not found" });
    }

    const repayment = new Repayment({
      loan_request: loanRequest._id,
      farmer: loanRequest.farmer,
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
