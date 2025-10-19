// db/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
