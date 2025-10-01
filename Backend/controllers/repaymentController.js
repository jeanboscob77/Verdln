const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// ================== Record Repayment ==================
exports.recordRepayment = async (req, res) => {
  try {
    const { loan_request_id, farmer_id, amount, method } = req.body;

    if (!loan_request_id || !farmer_id || !amount || !method) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check loan request exists
    const [loanRequest] = await pool.query(
      "SELECT * FROM loan_requests WHERE id = ?",
      [loan_request_id]
    );
    if (loanRequest.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Loan request not found" });
    }

    // Check farmer exists
    const [farmerRow] = await pool.query("SELECT * FROM users WHERE id = ?", [
      farmer_id,
    ]);
    if (farmerRow.length === 0 || farmerRow[0].role !== "farmer") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid farmer ID" });
    }

    // Create repayment
    const repaymentId = uuidv4();
    if (!loan_request_id || !farmer_id || !amount || !method) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    await pool.query(
      `INSERT INTO repayments (id, loan_request_id, farmer_id, amount, method)
       VALUES (?, ?, ?, ?, ?)`,
      [repaymentId, loan_request_id, farmer_id, amount, method]
    );

    const [rows] = await pool.query("SELECT * FROM repayments WHERE id = ?", [
      repaymentId,
    ]);

    res.json({
      success: true,
      message: "Repayment recorded",
      repayment: rows[0], // first row is your repayment
    });
  } catch (err) {
    console.error("Record repayment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== Get all repayments for a farmer ==================
exports.getRepaymentsForFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const [repayments] = await pool.query(
      `SELECT r.*, lr.input_type, lr.package_size, lr.repayment_date
       FROM repayments r
       JOIN loan_requests lr ON r.loan_request_id = lr.id
       WHERE r.farmer_id = ?
       ORDER BY r.created_at DESC`,
      [farmerId]
    );

    res.json({ success: true, repayments });
  } catch (err) {
    console.error("Get farmer repayments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== Get all repayments (admin) ==================
exports.getAllRepayments = async (req, res) => {
  try {
    const [repayments] = await pool.query(
      `SELECT r.*, 
              lr.input_type, lr.package_size, lr.repayment_date, 
              u.national_id, u.phone_number
       FROM repayments r
       JOIN loan_requests lr ON r.loan_request_id = lr.id
       JOIN users u ON r.farmer_id = u.id
       ORDER BY r.created_at DESC`
    );

    res.json({ success: true, repayments });
  } catch (err) {
    console.error("Get all repayments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
