const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cron = require("node-cron");
require("dotenv").config();
const path = require("path");
const { Server } = require("socket.io");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/users");
const locationRoutes = require("./routes/locations");
const inputRoutes = require("./routes/inputs");
const loanRoutes = require("./routes/loans");
const supplierRoutes = require("./routes/suppliers");
const repaymentRoutes = require("./routes/repayments");
const ussdRoutes = require("./ussd/ussd");
// Export route and function
const {
  router: exportRouter,
  exportRecentData,
  setIO,
} = require("./routes/exportRoute");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // allow frontend connection
});

setIO(io); // 🔹 inject io instance into exportRoute

app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/inputs", inputRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/suppliers", supplierRoutes);
// Serve uploads folder at /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/repayments", repaymentRoutes);
app.use("/api/api", ussdRoutes);

//this is endpoint for downloading exported files
// ✅ Use export routes
app.use("/api/export", exportRouter);

// ✅ Schedule hourly export
cron.schedule("0 * * * *", () => {
  console.log("🕐 Running hourly export for recent data...");
  exportRecentData();
});

// ✅ Run once when server starts
exportRecentData();
// Function to fetch dashboard data
const getDashboardData = async () => {
  const [summaryRows] = await db.query(`
    SELECT 
      SUM(lr.total_amount) AS total_loan,
      COALESCE(SUM(r.amount), 0) AS total_paid,
      SUM(lr.total_amount) - COALESCE(SUM(r.amount), 0) AS total_remaining
    FROM loan_requests lr
    LEFT JOIN repayments r ON lr.id = r.loan_request_id
  `);

  const [bySupplier] = await db.query(`
    SELECT u.full_name AS supplier, SUM(lr.total_amount) AS total
    FROM loan_requests lr
    JOIN users u ON u.id = lr.supplier_id
    GROUP BY u.full_name
  `);

  const [byInput] = await db.query(`
    SELECT i.type AS input_type, SUM(lr.total_amount) AS total
    FROM loan_requests lr
    JOIN input_types i ON i.id = lr.input_type_id
    GROUP BY i.type
  `);

  return {
    summary: summaryRows[0],
    bySupplier,
    byInput,
  };
};

// Emit dashboard updates every X seconds
setInterval(async () => {
  const data = await getDashboardData();
  io.emit("dashboard-update", data);
}, 3000); // every 5 seconds, adjust as needed

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  // Send initial data on connection
  getDashboardData().then((data) => socket.emit("dashboard-update", data));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
