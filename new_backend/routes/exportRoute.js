const express = require("express");
const ExcelJS = require("exceljs");
const fs = require("fs");
const pool = require("../config/db");
const path = require("path");
const router = express.Router();

const exportDir = path.join(__dirname, "../exports");
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

const filePath = path.join(exportDir, "users.xlsx");

let ioInstance; // 🔹 store the active Socket.IO instance

// 🔹 Allow server.js to inject io
function setIO(io) {
  ioInstance = io;
}

// ✅ Function to export only data changed in the last hour
async function exportRecentData() {
  try {
    // Get rows updated or created in the last hour
    const [rows] = await pool.query(`
      SELECT * FROM users 
      WHERE (updated_at >= NOW() - INTERVAL 1 HOUR)
         OR (created_at >= NOW() - INTERVAL 1 HOUR)
    `);

    if (rows.length === 0) {
      console.log("⚠️ No recent changes in the last hour.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Recent Changes");

    worksheet.columns = Object.keys(rows[0]).map((key) => ({
      header: key.toUpperCase(),
      key,
      width: 20,
    }));

    rows.forEach((row) => worksheet.addRow(row));

    await workbook.xlsx.writeFile(filePath);
    console.log(`✅ Recent Excel export saved: ${filePath}`);

    // 🔥 Emit update to all connected clients
    if (ioInstance) {
      ioInstance.emit("export-update", {
        message: "New data exported",
        count: rows.length,
        timestamp: new Date(),
      });
      console.log("📡 Real-time export event emitted.");
    }
  } catch (error) {
    console.error("❌ Error exporting data:", error.message);
  }
}

// ✅ Route to manually download the latest export file
router.get("/download", (req, res) => {
  if (fs.existsSync(filePath)) {
    res.download(filePath, "users.xlsx");
  } else {
    res.status(404).json({ message: "No exported file available yet." });
  }
});

module.exports = { router, exportRecentData, setIO };
