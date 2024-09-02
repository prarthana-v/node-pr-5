const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pdvaghani:pdvaghani@cluster0.quhpv.mongodb.net/"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return false;
  }
};

module.exports = connectDB;
