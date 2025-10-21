// // import React, { useState, useRef } from "react";
// // import { useAppSelector } from "../store/store";
// // import { useNavigate } from "react-router-dom";

// // export default function VerifyOtp() {
// //     const navigate = useNavigate();

// //     const storedOtp = useAppSelector((state) => state.auth.login?.data?.otp);
// //     const [otp, setOtp] = useState(new Array(6).fill(""));
// //     const inputRefs = useRef([]);

// //     const handleChange = (element, index) => {
// //         const value = element.value.replace(/\D/, ""); // Only digits
// //         if (!value) return;

// //         const newOtp = [...otp];
// //         newOtp[index] = value;
// //         setOtp(newOtp);

// //         // Auto move to next input
// //         if (index < otp.length - 1) inputRefs.current[index + 1].focus();
// //     };

// //     const handleKeyDown = (e, index) => {
// //         if (e.key === "Backspace" && !otp[index] && index > 0) {
// //             const newOtp = [...otp];
// //             newOtp[index - 1] = "";
// //             setOtp(newOtp);
// //             inputRefs.current[index - 1].focus();
// //         }
// //     };

// //     const handlePaste = (e) => {
// //         e.preventDefault();
// //         const pasteData = e.clipboardData.getData("text").slice(0, 6);
// //         if (/^\d+$/.test(pasteData)) {
// //             setOtp(pasteData.split(""));
// //         }
// //     };

// //     const handleSubmit = () => {
// //         const enteredOtp = otp.join("");
// //         console.log("Entered OTP:", enteredOtp);
// //         console.log("Stored OTP:", storedOtp);

// //         if (enteredOtp === storedOtp) {
// //             alert("✅ OTP Verified Successfully!");
// //             navigate("/admin-home-dashboard");
// //         } else {
// //             alert("❌ Invalid OTP");
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col items-center justify-center h-screen space-y-5">
// //             <h2 className="text-2xl font-semibold text-gray-700">Verify OTP</h2>

// //             <div className="flex space-x-3" onPaste={handlePaste}>
// //                 {otp.map((digit, index) => (
// //                     <input
// //                         key={index}
// //                         type="text"
// //                         maxLength="1"
// //                         value={digit}
// //                         onChange={(e) => handleChange(e.target, index)}
// //                         onKeyDown={(e) => handleKeyDown(e, index)}
// //                         ref={(el) => (inputRefs.current[index] = el)}
// //                         className="w-10 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
// //                     />
// //                 ))}
// //             </div>

// //             <button
// //                 onClick={handleSubmit}
// //                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
// //             >
// //                 Verify
// //             </button>
// //         </div>
// //     );
// // }


// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { useAppSelector } from "../store/store";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function VerifyOtp() {
//     const navigate = useNavigate();
//     const storedOtp = useAppSelector((state) => state.auth.login?.data?.otp);
//     const [otp, setOtp] = useState(new Array(6).fill(""));
//     const inputRefs = useRef([]);

//     const handleChange = (element, index) => {
//         const value = element.value.replace(/\D/, ""); // Only digits
//         if (!value) return;

//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         if (index < otp.length - 1) inputRefs.current[index + 1].focus();
//     };

//     const handleKeyDown = (e, index) => {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             const newOtp = [...otp];
//             newOtp[index - 1] = "";
//             setOtp(newOtp);
//             inputRefs.current[index - 1].focus();
//         }
//     };

//     const handlePaste = (e) => {
//         e.preventDefault();
//         const pasteData = e.clipboardData.getData("text").slice(0, 6);
//         if (/^\d+$/.test(pasteData)) {
//             setOtp(pasteData.split(""));
//         }
//     };

//     const handleSubmit = () => {
//         const enteredOtp = otp.join("");
//         if (enteredOtp === storedOtp) {
//             toast.success("✅ OTP Verified Successfully!");
//             setTimeout(() => navigate("/admin-home-dashboard"), 1000);
//         } else {
//             toast.error("❌ Invalid OTP");
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35, ease: "easeOut" }}
//             className="flex flex-col items-center justify-center h-screen space-y-5 bg-gray-50"
//         >
//             {/* Toaster container */}
//             <Toaster position="top-right" reverseOrder={false} />

//             <motion.h2
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-2xl font-semibold text-gray-700"
//             >
//                 Verify OTP
//             </motion.h2>

//             <div className="flex space-x-3" onPaste={handlePaste}>
//                 {otp.map((digit, index) => (
//                     <motion.input
//                         key={index}
//                         type="text"
//                         maxLength="1"
//                         value={digit}
//                         onChange={(e) => handleChange(e.target, index)}
//                         onKeyDown={(e) => handleKeyDown(e, index)}
//                         ref={(el) => (inputRefs.current[index] = el)}
//                         whileFocus={{ scale: 1.1, borderColor: "#2563eb" }}
//                         transition={{ type: "spring", stiffness: 500, damping: 15 }}
//                         className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//                     />
//                 ))}
//             </div>

//             <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSubmit}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
//             >
//                 Verify
//             </motion.button>
//         </motion.div>
//     );
// }

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const storedOtp = useAppSelector((state) => state.auth.login?.data?.otp);
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

    const handleSubmit = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        if (enteredOtp === storedOtp) {
            toast.success("✅ OTP Verified Successfully!");
            setTimeout(() => navigate("/admin-home-dashboard"), 1000);
        } else {
            toast.error("❌ Invalid OTP");
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
        </motion.div>
    );
}
