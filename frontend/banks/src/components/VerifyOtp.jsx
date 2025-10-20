import React, { useState, useRef } from "react";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const navigate = useNavigate();

    const storedOtp = useAppSelector((state) => state.auth.login?.data?.otp);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        const value = element.value.replace(/\D/, ""); // Only digits
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto move to next input
        if (index < otp.length - 1) inputRefs.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pasteData)) {
            setOtp(pasteData.split(""));
        }
    };

    const handleSubmit = () => {
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);
        console.log("Stored OTP:", storedOtp);

        if (enteredOtp === storedOtp) {
            alert("✅ OTP Verified Successfully!");
            navigate("/admin-home-dashboard");
        } else {
            alert("❌ Invalid OTP");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-5">
            <h2 className="text-2xl font-semibold text-gray-700">Verify OTP</h2>

            <div className="flex space-x-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-10 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
            >
                Verify
            </button>
        </div>
    );
}
