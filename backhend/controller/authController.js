const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/SuperAdmin");
const User = require("../models/Usermodel");


// Register SuperAdmin
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user exists
        const existingUser = await SuperAdmin.findOne({ username });
        if (existingUser)
            return res.status(400).json({ error: "SuperAdmin already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create SuperAdmin
        const newUser = new SuperAdmin({ username, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "SuperAdmin created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Login SuperAdmin with OTP generation
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await SuperAdmin.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Here you can send OTP via email/SMS. For now, return in response
        res.json({ message: "OTP sent", otp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware: Protect routes and check role
exports.protect = (roles = []) => {
    return (req, res, next) => {
        try {
            const token = req.session.token || req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ error: "Not authorized" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check roles
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: "Forbidden: insufficient role" });
            }

            next();
        } catch (err) {
            res.status(401).json({ error: "Invalid or expired token" });
        }
    };
};

// Fetch all SuperAdmins (protected route)
exports.superadmindata = async (req, res) => {
    try {
        const users = await SuperAdmin.find({});
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;

        const user = await SuperAdmin.findOne({ username });
        if (!user) return res.status(400).json({ error: "User not found" });

        if (user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // OTP verified, generate JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "OTP verified successfully", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// // Fetch User data (protected route)
// exports.getUsers = async (req, res) => {
//     try {
//         // Fetch only specific fields
//         const users = await User.find({}, { _id: 0, name: 1, address: 1, organization: 1, partners: 1 });
//         res.json({ users });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// Fetch User data (protected route with filters)
exports.getUsers = async (req, res) => {
    try {
        const { name, address, organization, partners } = req.body;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: "i" };
        if (address) filter.address = { $regex: address, $options: "i" };
        if (organization) filter.organization = { $regex: organization, $options: "i" };
        if (partners) filter.partners = Number(partners);

        const users = await User.find(filter, { _id: 0, name: 1, address: 1, organization: 1, partners: 1 });

        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Create a new User (protected route)
exports.createUser = async (req, res) => {
    try {
        const { name, address, organization, partners } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newUser = new User({
            name,
            address,
            organization,
            partners
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
