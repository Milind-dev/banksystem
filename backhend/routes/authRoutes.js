import express from "express";
import {
    register,
    login,
    verifyOtp,
    getSuperadminData,
    createUser,
    otpLimiter
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", otpLimiter, verifyOtp);

router.get("/superadmins", protect(["superadmin"]), getSuperadminData);
router.post("/create-user", protect(["superadmin"]), createUser);

export default router;
