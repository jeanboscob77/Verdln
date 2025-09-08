const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/verdin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);

    // Instead of crashing the app, just log and continue running
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying...");
    });
  }

  // Handle runtime errors without crashing
  mongoose.connection.on("error", (err) => {
    console.error("⚠️ MongoDB Runtime Error:", err.message);
  });
};

module.exports = connectDB();
