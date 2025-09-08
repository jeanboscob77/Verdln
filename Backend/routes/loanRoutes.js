const express = require("express");
const router = express.Router();
const {
  submitRequest,
  getFarmerRequests,
  updateRequestStatus,
  getAllRequests,
} = require("../controllers/loanController");

// Submit a new loan/input request
router.post("/submit", submitRequest);

// Get all requests for a specific farmer
router.get("/farmer/:farmerId", getFarmerRequests);

// Admin: Get all requests
router.get("/", getAllRequests);

// Admin: Update status and add notes
router.put("/:requestId/status", updateRequestStatus);

module.exports = router;
