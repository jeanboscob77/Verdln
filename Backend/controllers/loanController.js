const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// ================== Submit a new loan request ==================
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

    // Check if farmer exists and is a farmer
    const [farmer] = await pool.query("SELECT * FROM users WHERE id = ?", [
      farmerId,
    ]);

    if (farmer.length === 0 || farmer[0].role !== "farmer") {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    const requestId = uuidv4();

    await pool.query(
      `INSERT INTO loan_requests 
      (id, farmer_id, input_type, package_size, repayment_date, amount) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        requestId,
        farmerId,
        input_type,
        package_size,
        repayment_date,
        amount || 0,
      ]
    );

    const [newRequest] = await pool.query(
      "SELECT * FROM loan_requests WHERE id = ?",
      [requestId]
    );

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
      request: newRequest[0],
    });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== Get all requests of a farmer ==================
exports.getFarmerRequests = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const [requests] = await pool.query(
      "SELECT * FROM loan_requests WHERE farmer_id = ? ORDER BY created_at DESC",
      [farmerId]
    );

    res.json({ success: true, requests });
  } catch (err) {
    console.error("Get farmer requests error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== Admin: Update status ==================
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    await pool.query("UPDATE loan_requests SET status = ? WHERE id = ?", [
      status,
      requestId,
    ]);

    const [updated] = await pool.query(
      `SELECT lr.*, u.phone_number 
       FROM loan_requests lr 
       JOIN users u ON lr.farmer_id = u.id 
       WHERE lr.id = ?`,
      [requestId]
    );

    if (updated.length === 0) {
      return res.status(404).json({ message: "Loan request not found" });
    }

    res.json({ success: true, request: updated[0] });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================== Admin: Add notes ==================
exports.updateRequestNotes = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { admin_notes } = req.body;

    await pool.query("UPDATE loan_requests SET admin_notes = ? WHERE id = ?", [
      admin_notes,
      requestId,
    ]);

    const [updated] = await pool.query(
      `SELECT lr.*, u.phone_number 
       FROM loan_requests lr 
       JOIN users u ON lr.farmer_id = u.id 
       WHERE lr.id = ?`,
      [requestId]
    );

    if (updated.length === 0) {
      return res.status(404).json({ message: "Loan request not found" });
    }

    res.json({ success: true, request: updated[0] });
  } catch (err) {
    console.error("Update notes error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================== Admin: Get all requests ==================
exports.getAllRequests = async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT lr.*, u.national_id, u.phone_number, u.role 
       FROM loan_requests lr 
       JOIN users u ON lr.farmer_id = u.id 
       ORDER BY lr.created_at DESC`
    );

    res.json({ success: true, requests });
  } catch (err) {
    console.error("Get all requests error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
