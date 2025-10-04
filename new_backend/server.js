const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/users");
const locationRoutes = require("./routes/locations");
const inputRoutes = require("./routes/inputs");
const loanRoutes = require("./routes/loans");
const supplierRoutes = require("./routes/suppliers");

const repaymentRoutes = require("./routes/repayments");

app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/inputs", inputRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/suppliers", supplierRoutes);
// Serve uploads folder at /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/repayments", repaymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
