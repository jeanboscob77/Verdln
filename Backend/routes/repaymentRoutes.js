const express = require("express");
const router = express.Router();
const {
  recordRepayment,
  getRepaymentsForFarmer,
} = require("../controllers/repaymentController");

// Record a repayment (Admin)
router.post("/record", recordRepayment);

// Get all repayments for a specific farmer
router.get("/farmer/:farmerId", getRepaymentsForFarmer);

module.exports = router;
