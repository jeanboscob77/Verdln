const express = require("express");
const router = express.Router();
const {
  recordRepayment,
  getRepaymentsForFarmer,
  getAllRepayments,
} = require("../controllers/repaymentController");

// Record a repayment (Admin)
router.post("/record", recordRepayment);

// Get all repayments for a specific farmer
router.get("/farmer/:farmerId", getRepaymentsForFarmer);
//get all repayments
router.get("/all", getAllRepayments);

module.exports = router;
