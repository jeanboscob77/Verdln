const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// -------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/documents";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Submit loan request (Farmer)
// -------------------------------------------
router.post("/submit", async (req, res) => {
  try {
    const {
      farmer_id,
      input_type_id,
      input_subtype_id,
      package_size,
      repayment_date,
      province_id,
      district_id,
      sector_id,
      cell_id,
      supplier_id,
      interest_rate = 10, // default 10% if not provided
    } = req.body;

    // Basic validation
    if (
      !farmer_id ||
      !input_type_id ||
      !input_subtype_id ||
      !package_size ||
      !repayment_date ||
      !province_id ||
      !district_id ||
      !sector_id ||
      !cell_id ||
      !supplier_id
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // --- get price from input_subtypes table ---
    const [subtypeRows] = await pool.query(
      "SELECT price FROM input_subtypes WHERE id = ?",
      [input_subtype_id]
    );

    if (!subtypeRows.length) {
      return res.status(400).json({ error: "Invalid input subtype" });
    }

    const price = parseFloat(subtypeRows[0].price);
    const loan_amount = parseFloat(package_size) * price;
    const interest_amount = (loan_amount * interest_rate) / 100;
    const total_amount = loan_amount + interest_amount;

    const id = uuidv4();
    await pool.query(
      `INSERT INTO loan_requests 
      (id, farmer_id, input_type_id, input_subtype_id, package_size, repayment_date,
       province_id, district_id, sector_id, cell_id, supplier_id,
       loan_amount, interest_rate, interest_amount, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        farmer_id,
        input_type_id,
        input_subtype_id,
        package_size,
        repayment_date,
        province_id,
        district_id,
        sector_id,
        cell_id,
        supplier_id,
        loan_amount,
        interest_rate,
        interest_amount,
        total_amount,
      ]
    );

    res.json({
      success: true,
      loanRequestId: id,
      loan_amount,
      interest_rate,
      interest_amount,
      total_amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit loan request" });
  }
});

// -------------------------------------------
// Get loan requests for a farmer
// -------------------------------------------
router.get("/farmer/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;
    const [rows] = await pool.query(
      `SELECT 
      lr.*, 
      it.type AS input_type, 
      st.name AS input_subtype, 
      st.price AS price,
      f.full_name AS farmer_name, 
      f.phone_number AS farmer_phone, 
      f.national_id AS national_id,
      s.full_name AS supplier_name, 
      s.phone_number AS supplier_phone,
      p.name AS province,
      d.name AS district,
      sec.name AS sector,
      c.name AS cell,
      IFNULL(lr.interest_amount,0) + lr.loan_amount AS total_loan_amount,
      IFNULL(SUM(r.amount),0) AS paid_amount,
      (IFNULL(lr.interest_amount,0) + lr.loan_amount) - IFNULL(SUM(r.amount),0) AS remaining_amount,
      CASE
          WHEN IFNULL(SUM(r.amount),0) = 0 THEN 'Unpaid'
          WHEN IFNULL(SUM(r.amount),0) < (lr.loan_amount + IFNULL(lr.interest_amount,0)) THEN 'Partial'
          ELSE 'Paid'
      END AS payment_status
  FROM loan_requests lr
  LEFT JOIN input_types it ON lr.input_type_id = it.id
  LEFT JOIN input_subtypes st ON lr.input_subtype_id = st.id
  LEFT JOIN users f ON lr.farmer_id = f.id
  LEFT JOIN users s ON lr.supplier_id = s.id
  LEFT JOIN provinces p ON lr.province_id = p.id
  LEFT JOIN districts d ON lr.district_id = d.id
  LEFT JOIN sectors sec ON lr.sector_id = sec.id
  LEFT JOIN cells c ON lr.cell_id = c.id
  LEFT JOIN repayments r ON lr.id = r.loan_request_id
  WHERE lr.farmer_id = ?
  GROUP BY lr.id
  ORDER BY lr.created_at DESC`,
      [farmerId]
    );

    res.json({ success: true, requests: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all loan requests" });
  }
});

// -------------------------------------------
// Update loan request status (Admin)
// -------------------------------------------
router.put("/:loanId/status", async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await pool.query(
      `UPDATE loan_requests SET status = ?, notes = ? WHERE id = ?`,
      [status, notes || null, loanId]
    );

    res.json({ success: true, message: "Loan request updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update loan request status" });
  }
});

//supplier get farmer loans assigned to them
// GET /api/loans/supplier/:supplierId
router.get("/supplier/:supplierId", async (req, res) => {
  try {
    const { supplierId } = req.params;
    const [rows] = await pool.query(
      `SELECT 
        lr.*, 
        it.type AS input_type, 
        st.name AS input_subtype, 
        st.price AS price,
        f.full_name AS farmer_name, 
        f.phone_number AS farmer_phone, 
        f.national_id AS national_id,
        lr.delivered, 
        lr.document_url
      FROM loan_requests lr
      LEFT JOIN input_types it ON lr.input_type_id = it.id
      LEFT JOIN input_subtypes st ON lr.input_subtype_id = st.id
      LEFT JOIN users f ON lr.farmer_id = f.id
      WHERE lr.supplier_id = ? AND lr.status = 'Approved'
      ORDER BY lr.created_at DESC`,
      [supplierId]
    );

    res.json({ success: true, requests: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch supplier loans" });
  }
});

//supplier upload delivery document
// ---------------- Mark Loan Delivered ----------------
router.put("/:loanId/deliver", upload.single("document"), async (req, res) => {
  try {
    const { loanId } = req.params;
    const delivered = true;
    let documentUrl = null;

    if (req.file) {
      documentUrl = `/uploads/documents/${req.file.filename}`;
    }

    await pool.query(
      `UPDATE loan_requests 
       SET delivered = ?, document_url = ?, delivered_date = NOW() 
       WHERE id = ?`,
      [delivered, documentUrl, loanId]
    );

    res.json({
      success: true,
      message: "Loan delivery updated",
      documentUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update delivery status" });
  }
});

// get all loans for farmers

router.get("/all", async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT 
      lr.id,
      lr.farmer_id,
      lr.input_type_id,
      lr.input_subtype_id,
      lr.loan_amount,
      lr.created_at,
      lr.status,
      u.national_id,
      u.phone_number,
      u.role,
      u.full_name AS farmer_name,
      it.type AS input_type,
      st.name AS input_subtype
   FROM loan_requests lr
   INNER JOIN users u ON lr.farmer_id = u.id
   LEFT JOIN input_types it ON lr.input_type_id = it.id
   LEFT JOIN input_subtypes st ON lr.input_subtype_id = st.id
   ORDER BY lr.created_at DESC`
    );

    res.json({ success: true, requests });
  } catch (err) {
    console.error("Get all requests error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
