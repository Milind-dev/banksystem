import express from "express";
import {
    register,
    login,
    verifyOtp,
    uploadProfilePic,
    getSuperadminData,
    otpLimiter,
    checksession,
    logout,
    postCreateUser,
    postUserLogin
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

import MongoClient from "mongodb";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", otpLimiter, verifyOtp);
// router.post("/upload-profile-pic", protect(["superadmin", "user"]), upload.single("profilePic"));
router.post("/upload-profile-pic", upload.single("profilePic"), uploadProfilePic);


router.get("/superadmins", protect(["superadmin"]), getSuperadminData);
// router.post("/createuser", protect(["user"]), getCreateUser);
router.post("/createuser", postCreateUser);
router.post("/loginuser", postUserLogin);

router.get("/checksession", checksession);
router.post("/logout", logout);


export default router;
