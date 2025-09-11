const LoanRequest = require("../models/Loan_Request");
const User = require("../models/User");

// Submit a new loan request
exports.submitRequest = async (req, res) => {
  try {
    const { farmerId, input_type, package_size, repayment_date, amount } =
      req.body;

    if (!farmerId || !input_type || !package_size || !repayment_date) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const farmer = await User.findById(farmerId);
    if (!farmer || farmer.role !== "farmer") {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    const newRequest = new LoanRequest({
      farmer: farmer._id,
      input_type,
      package_size,
      repayment_date,
      amount: amount || 0,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
      request: newRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all requests of a farmer
exports.getFarmerRequests = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const requests = await LoanRequest.find({ farmer: farmerId }).sort({
      created_date: -1,
    });

    res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin: Update status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updated = await LoanRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate("farmer", "phone_number");

    if (!updated) {
      return res.status(404).json({ message: "Loan request not found" });
    }

    res.json({ success: true, request: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: add notes
exports.updateRequestNotes = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { admin_notes } = req.body;

    const updated = await LoanRequest.findByIdAndUpdate(
      requestId,
      { admin_notes },
      { new: true }
    ).populate("farmer", "phone_number");

    if (!updated) {
      return res.status(404).json({ message: "Loan request not found" });
    }

    res.json({ success: true, request: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Admin: Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await LoanRequest.find().populate("farmer");
    res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
