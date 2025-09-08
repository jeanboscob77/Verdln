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

// Admin: Update status and add notes
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, admin_notes } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const request = await LoanRequest.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    request.status = status;
    request.admin_notes = admin_notes || "";
    await request.save();

    res.json({ success: true, message: "Request updated", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
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
