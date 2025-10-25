
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { VerifyOtps } from "../api/auth/ApiServices.jsx";
import { setVerifyotp } from "../store/slice/authSlice.js";
import { decodeToken } from "../tokenExtract/tokenextract.js";
// const storedtoken = useAppSelector((state) => state.auth.login?.data?.token);
// console.log("storedtoken", storedOtp, isVerified, adminrole, data)

export default function VerifyOtp() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const data = useAppSelector((state) => state.auth.login?.data);
    const storedOtp = useAppSelector((state) => state.auth.login?.data?.otp);
    const isVerified = useAppSelector((state) => state.auth.login?.data?.isVerified);
    const adminrole = useAppSelector((state) => state.auth.login?.data?.token);
    const admindecodedToken = decodeToken(adminrole);
    console.log("decodetoken", admindecodedToken);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ""); // Only digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (!otp[index] && index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            } else {
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pasteData)) {
            setOtp(pasteData.split(""));
        }
    };


    // var token = localStorage.getItem("token");
    // console.log("tokensss:", token, token?.length);

    const handleSubmit = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length < 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }
        // console.log({
        //     Authorization: token ? `Bearer ${token}` : "No token",
        // });

        const payload = {
            username: "superadmin",
            otp: enteredOtp,
        };
        try {
            const verifydata = await VerifyOtps(payload);
            console.log("verifydata", verifydata.data); // <-- check actual data
            if (isVerified || admindecodedToken?.role === "superadmin") {
                console.log(isVerified, admindecodedToken?.role);

                dispatch(setVerifyotp(verifydata));
                navigate("/admin-homepage-dashboard");
                toast.success("OTP verified successfully!");
            }
            else {
                console.log(isVerified, admindecodedToken?.role);
                console.log("otp mismatch");
            }
        }
        catch (err) {
            // console.log("error", err.response?.data || err.message);
            toast.error("Something went wrong");
            console.log(isVerified, admindecodedToken?.role);
            console.log("otp mismatch");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
        >
            <Toaster position="top-right" />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Verify OTP
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Enter the 6-digit code sent to your registered email or mobile.
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <motion.input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            whileFocus={{ scale: 1.1, borderColor: "#2563eb" }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50"
                        />
                    ))}
                </div>

                {/* Verify button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
                >
                    Verify
                </motion.button>

                {/* Resend OTP */}
                <p className="text-sm text-gray-500 mt-4">
                    Didn’t receive the code?{" "}
                    <button
                        className="text-blue-600 font-medium hover:underline"
                        onClick={() => toast.success("OTP resent!")}
                    >
                        Resend OTP
                    </button>
                </p>
            </motion.div>
            <div>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md" onClick={() => {
                    sessionStorage.removeItem("session");
                    window.location.href = "/";
                }}>Logout</button>
            </div>
        </motion.div>
    );
}
