const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../config/db"); // adjust path to your pool
const { v4: uuidv4 } = require("uuid");
/**
 * GET /repayments/loans/delivered
 * Fetch all delivered loans with payment summary
 */
const fs = require("fs");
const path = require("path");

// Custom storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = "uploads/payments/";

    // Create folder if missing
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep original extension
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + ext);
  },
});

// Replace old upload
const upload = multer({ storage });

router.get("/loans/delivered", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        lr.id,
        lr.farmer_id,
        lr.supplier_id,
        lr.loan_amount,
        lr.interest_amount,
        lr.delivered_date,
        lr.document_url,
        f.full_name AS farmer_name,
        s.full_name AS supplier_name,
        IFNULL(SUM(r.amount), 0) AS paid_amount,
        (lr.loan_amount + IFNULL(lr.interest_amount, 0)) - IFNULL(SUM(r.amount), 0) AS remaining_amount,
        CASE 
          WHEN IFNULL(SUM(r.amount), 0) = 0 THEN 'Unpaid'
          WHEN IFNULL(SUM(r.amount), 0) < (lr.loan_amount + IFNULL(lr.interest_amount, 0)) THEN 'Partial'
          ELSE 'Paid'
        END AS payment_status,
        (lr.loan_amount + IFNULL(lr.interest_amount, 0)) AS total_loan_amount
      FROM loan_requests lr
      LEFT JOIN users f ON lr.farmer_id = f.id
      LEFT JOIN users s ON lr.supplier_id = s.id
      LEFT JOIN repayments r ON lr.id = r.loan_request_id
      WHERE lr.delivered = 1
      GROUP BY lr.id
      ORDER BY lr.delivered_date DESC`
    );

    res.json({ success: true, requests: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch delivered loans" });
  }
});

/**
 * POST /repayments/pay
 * Record a new payment
 * Body: { loan_request_id, farmer_id, amount, method }
 *
 */

function formatMySQLDate(date) {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
}

router.post("/pay", upload.single("document"), async (req, res) => {
  try {
    const { loan_request_id, farmer_id, amount, method } = req.body;

    if (!loan_request_id || !farmer_id || !amount || !method) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let document_url = null;

    if (req.file) {
      document_url = `/uploads/payments/${req.file.filename}`;
    }

    // Check if loan is delivered
    const [loanRows] = await pool.query(
      `SELECT delivered FROM loan_requests WHERE id = ?`,
      [loan_request_id]
    );
    if (!loanRows.length || loanRows[0].delivered !== 1) {
      return res
        .status(400)
        .json({ error: "Payment can only be made for delivered loans" });
    }

    const paymentDate = formatMySQLDate(new Date());

    // Insert payment
    await pool.query(
      `INSERT INTO repayments (id, loan_request_id, farmer_id, amount, method, payment_date, document_url) 
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        uuidv4(),
        loan_request_id,
        farmer_id,
        amount,
        method,
        paymentDate,
        document_url,
      ]
    );

    res.json({ success: true, message: "Payment recorded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record payment" });
  }
});

/**
 * GET /repayments/:loanId/history
 * Fetch payment history for a loan
 */
router.get("/:loanId/history", async (req, res) => {
  try {
    const { loanId } = req.params;

    const [rows] = await pool.query(
      `SELECT id, amount, method, payment_date
       FROM repayments
       WHERE loan_request_id = ?
       ORDER BY payment_date DESC`,
      [loanId]
    );

    res.json({ success: true, history: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

// GET /farmer/loans/delivered/:farmerId
router.get("/loans/delivered/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params; // URL parameter
    if (!farmerId)
      return res.status(400).json({ error: "farmerId is required" });

    // Fetch delivered loans
    const [loans] = await pool.query(
      `SELECT 
        lr.id,
        lr.farmer_id,
        lr.supplier_id,
        lr.loan_amount,
        lr.interest_amount,
        lr.package_size,
        lr.interest_rate,
        lr.repayment_date,
        lr.status,
        it.type AS input_type,
        isub.name AS input_subtype,
        isub.price,
        lr.delivered_date,
        lr.document_url,
        f.full_name AS farmer_name,
        s.full_name AS supplier_name,
        IFNULL(SUM(r.amount), 0) AS paid_amount,
        (lr.loan_amount + IFNULL(lr.interest_amount, 0)) - IFNULL(SUM(r.amount), 0) AS remaining_amount,
        CASE 
          WHEN IFNULL(SUM(r.amount), 0) = 0 THEN 'Unpaid'
          WHEN IFNULL(SUM(r.amount), 0) < (lr.loan_amount + IFNULL(lr.interest_amount, 0)) THEN 'Partial'
          ELSE 'Paid'
        END AS payment_status
      FROM loan_requests lr
      LEFT JOIN users f ON lr.farmer_id = f.id
      LEFT JOIN users s ON lr.supplier_id = s.id
      LEFT JOIN repayments r ON lr.id = r.loan_request_id
      LEFT JOIN input_subtypes isub ON lr.input_subtype_id = isub.id
      LEFT JOIN input_types it ON isub.input_type_id = it.id
      WHERE lr.delivered = 1 AND lr.farmer_id = ?
      GROUP BY lr.id
      ORDER BY lr.delivered_date DESC`,
      [farmerId]
    );

    // Fetch repayment history for all loans
    const loanIds = loans.map((loan) => loan.id);
    let histories = {};
    if (loanIds.length) {
      const [payments] = await pool.query(
        `SELECT 
          id,
          loan_request_id,
          amount,
          method,
          payment_date,
          document_url
        FROM repayments
        WHERE loan_request_id IN (?)`,
        [loanIds]
      );

      // Group payments by loan_request_id
      histories = payments.reduce((acc, p) => {
        if (!acc[p.loan_request_id]) acc[p.loan_request_id] = [];
        acc[p.loan_request_id].push(p);
        return acc;
      }, {});
    }

    // Attach histories to loans
    const result = loans.map((loan) => ({
      ...loan,
      history: histories[loan.id] || [],
    }));

    res.json({ success: true, requests: result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch delivered loans for farmer" });
  }
});

module.exports = router;
