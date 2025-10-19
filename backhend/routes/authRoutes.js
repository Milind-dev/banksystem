const express = require("express");
const router = express.Router();
const { register, login, verifyOtp, superadmindata, protect, getUsers, createUser } = require("../controller/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);      // generates OTP
router.post("/verify-otp", verifyOtp); // verifies OTP and returns JWT

// Protected route
// router.get("/all", protect(["superadmin"]), superadmindata);
router.post("/all", protect(["superadmin"]), getUsers);
router.post("/create-user", protect(["superadmin"]), createUser);


module.exports = router;
