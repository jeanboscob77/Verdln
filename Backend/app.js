const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db"); // MongoDB connection

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//loan request routes
const loanRoutes = require("./routes/loanRoutes");
app.use("/api/loans", loanRoutes);

//repayment routes
const repaymentRoutes = require("./routes/repaymentRoutes");
app.use("/api/repayment", repaymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("VerdIn API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
