import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import User from "../models/Usermodel.js";
import { generateToken } from "../utils/generateToken.js";
import SuperAdmin from "../models/SuperAdmin.js";
import jwt from "jsonwebtoken";
import OTP from "../models/OTP.js";

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 10);

export const otpLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many OTP requests, please wait a minute."
});

// ===== REGISTER =====
export const register = async (req, res) => {
    try {
        const { username, password, role = "user", name } = req.body;
        if (!username || !password || !name)
            return res.status(400).json({ error: "username, password, name required" });

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        const user = new User({
            username,
            password: hashed,
            role,
            name,
            otp,
            otpExpiry,
            isVerified: false
        });
        await user.save();

        res.status(201).json({ message: "Registered successfully", otp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// ===== LOGIN =====
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("username", username, password);

        const admin = await SuperAdmin.findOne({ username });
        console.log("admin", admin);
        if (!admin)
            return res.status(404).json({ message: "Superadmin not found" });

        // const isMatch = await bcrypt.compare(password, admin.password);
        const isMatch = await bcrypt.compare(password, admin.password);

        console.log("isMatch", isMatch, password, admin.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        // console.log("isMatch", isMatch);

        const tempToken = jwt.sign(
            { username, role: "superadmin", id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OTP.create({
            username,
            otp: otpCode,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins  
        });

        return res.json({
            message: "Login successful, please verify OTP",
            otp: otpCode, // ❌ remove in production, send via email/SMS
            expiresAt,
            // token: token,
            token: tempToken,
            isVerified: false,
            success: true,
            otpExpiry
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// ===== VERIFY OTP =====
// export const verifyOtp = async (req, res) => {
//     try {
//         const { username, otp } = req.body;
//         if (!username || !otp)
//             return res.status(400).json({ error: "username and otp required" });

//         const user = await User.findOne({ username });
//         if (!user) return res.status(400).json({ error: "User not found" });
//         if (!user.otp || !user.otpExpiry)
//             return res.status(400).json({ error: "No OTP requested" });
//         if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
//         if (new Date() > user.otpExpiry) return res.status(400).json({ error: "OTP expired" });

//         user.isVerified = true;
//         user.otp = undefined;
//         user.otpExpiry = undefined;
//         await user.save();

//         const token = generateToken(user);
//         req.session.role = user.role; // store role in session
//         req.session.userId = user._id;

//         res.json({ message: "OTP verified", token, role: user.role });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// ===== VERIFY OTP =====
export const verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;

        // Check if JWT is provided in header
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Make sure token username matches request
        if (decoded.username !== username)
            return res.status(401).json({ message: "Token does not match user" });

        // Get latest OTP for this user
        const otpRecord = await OTP.findOne({ username }).sort({ createdAt: -1 });
        if (!otpRecord) return res.status(400).json({ message: "No OTP requested" });

        // Check OTP and expiry
        if (otpRecord.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
        if (new Date() > otpRecord.expiresAt) return res.status(400).json({ message: "OTP expired" });

        // Mark SuperAdmin as verified
        const admin = await SuperAdmin.findOne({ username });
        if (!admin) return res.status(404).json({ message: "SuperAdmin not found" });
        admin.isVerified = true;
        await admin.save();

        // Generate FINAL JWT after OTP verification
        const finalToken = generateToken(admin);

        // Save session
        req.session.userId = admin._id;
        req.session.role = admin.role;

        res.json({
            message: "OTP verified successfully",
            token: finalToken,
            role: admin.role,
            isVerified: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ===== GET SUPERADMIN DATA =====
export const getSuperadminData = async (req, res) => {
    try {
        const users = await User.find({}, "-password -otp -otpExpiry");
        res.json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// ===== CREATE USER (BY SUPERADMIN) =====
export const createUser = async (req, res) => {
    try {
        const { username, password, name } = req.body;
        if (!username || !password || !name)
            return res.status(400).json({ error: "username, password, name required" });

        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashed,
            name,
            role: "user",
            isVerified: true
        });
        await user.save();

        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
