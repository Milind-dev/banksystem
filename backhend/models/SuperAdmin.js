// const mongoose = require("mongoose");

// const superAdminSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("SuperAdmin", superAdminSchema);

// const mongoose = require("mongoose");

// const SuperAdminSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: "superadmin" }, // role field
// }, { timestamps: true });

// module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);

const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "superadmin" },
    otp: String,
    otpExpiry: Date,
});

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
