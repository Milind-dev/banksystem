import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);
