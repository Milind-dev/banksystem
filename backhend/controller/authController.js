import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import User from "../models/Usermodel.js";
import { generateToken } from "../utils/generateToken.js";
import SuperAdmin from "../models/SuperAdmin.js";
import userdb from "../models/userdb.js"
import jwt from "jsonwebtoken";
import OTP from "../models/OTP.js";
import { MongoClient, ObjectId } from "mongodb";
import session from "express-session";






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

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("username", username, password);

        // Find existing SuperAdmin
        let admin = await SuperAdmin.findOne({ username });
        if (!admin)
            return res.status(404).json({ message: "Superadmin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        // Create a temporary JWT for OTP verification
        const tempToken = jwt.sign(
            { username, role: "superadmin", id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "10m" } // short-lived temp token
        );

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        // **Check if OTP record exists for this user**
        let otpRecord = await OTP.findOne({ username }).sort({ createdAt: -1 });
        if (otpRecord) {
            // Update OTP if exists
            otpRecord.otp = otpCode;
            otpRecord.expiresAt = otpExpiry;
            await otpRecord.save();
        } else {
            // Create OTP if it doesn't exist
            await OTP.create({
                username,
                otp: otpCode,
                expiresAt: otpExpiry,
            });
        }

        return res.json({
            message: "Login successful, please verify OTP",
            otp: otpCode, // remove in production, send via email/SMS
            token: tempToken,
            isVerified: admin.isVerified, // true if already verified before
            success: true,
            otpExpiry
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


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

        // console.log("dfksfljsd", req.session)
        // Save session
        // or req.cookies["connect.sid"]
        req.session.userId = admin._id;
        req.session.role = admin.role;
        // req.session.sessionID = req.sessionId
        // console.log("sessionId1", req.session.sessionID);


        res.json({
            message: "OTP verified successfully",
            token: finalToken,
            role: admin.role,
            isVerified: true,
            sessionuserid: req.session.userId,
            sessionId: req.sessionID,
            isVerified: admin.isVerified,
            profilePic: admin.profilePic // send to frontend

        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


async function getUserIdFromSession(req) {
    console.log("sessionId11111", req.sessionID);

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db(); // default DB from URI
    const sessions = db.collection("sessions");

    const allSessions = await sessions.find().toArray();

    // Extract userIds from all session documents
    const userIds = allSessions.map((doc) => {
        const data = JSON.parse(doc.session);
        return data.userId;
    });

    await client.close();

    return userIds;
}

// Example usage

export const uploadProfilePic = async (req, res) => {

    try {
        console.log("fsdfdsfds", req.session);

        // const sessionId = req.sessionID; // or req.cookies["connect.sid"]
        // console.log("sessionId1", sessionId);

        // req.session.userId = admin.userId


        // const userId = await getUserIdFromSession(sessionId);

        const userId = await getUserIdFromSession(req);

        console.log("upload userId:", userId);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const admin = await SuperAdmin.findById(userId);
        if (!admin) return res.status(404).json({ message: "SuperAdmin not found" });

        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        admin.profilePic = `/uploads/${req.file.filename}`;
        await admin.save();

        res.json({
            message: "Profile picture uploaded successfully",
            profilePic: admin.profilePic,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const checksession = (req, res) => {
    console.log("Checking session:", req.session.userId);

    if (req.session.userId) {
        return res.json({
            loggedIn: true,
            userId: req.session.userId,
            role: req.session.role,
        });
    } else {
        return res.status(401).json({ loggedIn: false });
    }
}


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
export const postCreateUser = async (req, res) => {
    try {
        const { username, password, mobilenumber } = req.body;
        if (!username || !password || !mobilenumber) {
            return res.status(404).json({
                error: "username  password mobilenumber are required"
            })
        }

        //validate number 
        if (!/^\d{10}$/.test(mobilenumber)) {
            return res.status(400).json({ error: "Invalid phone number format" });

        }

        const userexists = await userdb.findOne({ username });
        if (userexists) return res.status(409).json({ error: "username are exist" })
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userdb({
            username,
            password: hashedPassword,
            mobilenumber: mobilenumber,
            role: "user",
            isVerified: true
        })
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                // id: newUser._id,
                username: newUser.username,
                mobilenumber: newUser.mobilenumber,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error("CREATE USER ERROR:", err);
        return res.status(500).json({ error: "Internal server error" });
    }

};



export const postUserLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "username and password required" });
        }

        const user = await userdb.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                mobilenumber: user.mobilenumber
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};




export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
}
