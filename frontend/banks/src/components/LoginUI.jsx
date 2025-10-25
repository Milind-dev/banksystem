// // import React, { useState } from "react";
// // import { LoginUser } from "../api/auth/ApiServices";
// // import { useNavigate } from "react-router-dom";
// // import { useAppDispatch } from "../store/store";
// // import { setLoginUser } from "../store/slice/authSlice";

// // export default function LoginUI() {
// //     const navigate = useNavigate();
// //     const dispatch = useAppDispatch();
// //     const [form, setForm] = useState({ username: "", password: "" });
// //     const [error, setError] = useState(null);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setForm((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleLogin = async () => {
// //         if (!form.username || !form.password) {
// //             setError("Please enter both username and password");
// //             return;
// //         }
// //         const payload = {
// //             username: form.username,
// //             password: form.password,
// //         };

// //         const logindata = await LoginUser(payload);
// //         if (logindata.error) {
// //             setError(logindata.error);
// //         } else {
// //             // Handle successful login
// //             console.log("Login successful:", logindata);
// //             dispatch(setLoginUser(logindata));
// //             setTimeout(() => navigate("/verify-otp"), 1500);

// //         }
// //         console.log("Logging in with:", form);
// //         setError(null);
// //     };

// //     return (
// //         <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //             <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
// //                 <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
// //                     Login
// //                 </h2>

// //                 <input
// //                     name="username"
// //                     type="text"
// //                     placeholder="Username"
// //                     value={form.username}
// //                     onChange={handleChange}
// //                     className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />

// //                 <input
// //                     name="password"
// //                     type="password"
// //                     placeholder="Password"
// //                     value={form.password}
// //                     onChange={handleChange}
// //                     className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />

// //                 <button
// //                     onClick={handleLogin}
// //                     className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
// //                 >
// //                     Login
// //                 </button>

// //                 {error && (
// //                     <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { LoginUser } from "../api/auth/ApiServices";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../store/store";
// import { setLoginUser } from "../store/slice/authSlice";
// import toast, { Toaster } from "react-hot-toast";

// export default function LoginUI() {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const [form, setForm] = useState({ username: "", password: "" });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleLogin = async () => {
//         if (!form.username || !form.password) {
//             toast.error("Please enter both username and password");
//             return;
//         }

//         setLoading(true);
//         try {
//             const payload = { username: form.username, password: form.password };
//             const logindata = await LoginUser(payload);

//             if (logindata.error) {
//                 toast.error(logindata.error);
//             } else {
//                 dispatch(setLoginUser(logindata));
//                 toast.success("Login successful!");
//                 setTimeout(() => navigate("/verify-otp"), 1000);
//             }
//         } catch (err) {
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="flex justify-center items-center min-h-screen bg-gray-100"
//         >
//             {/* Toast container */}
//             <Toaster position="top-right" reverseOrder={false} />

//             <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.35, ease: "easeOut" }}
//                 className="w-full max-w-sm bg-white rounded-lg shadow-md p-6"
//             >
//                 <motion.h2
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="text-2xl font-semibold text-center mb-6 text-gray-800"
//                 >
//                     Login
//                 </motion.h2>

//                 {/* Username */}
//                 <motion.input
//                     whileFocus={{ scale: 1.015, borderColor: "#2563eb" }}
//                     transition={{ type: "spring", stiffness: 500, damping: 15 }}
//                     name="username"
//                     type="text"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={handleChange}
//                     className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//                 {/* Password */}
//                 <motion.input
//                     whileFocus={{ scale: 1.015, borderColor: "#2563eb" }}
//                     transition={{ type: "spring", stiffness: 500, damping: 15 }}
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//                 {/* Button */}
//                 <motion.button
//                     whileTap={{ scale: 0.96 }}
//                     onClick={handleLogin}
//                     disabled={loading}
//                     transition={{ duration: 0.1 }}
//                     className={`w-full py-2 text-white rounded-md font-semibold transition-all ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//                         }`}
//                 >
//                     {loading ? "Logging in..." : "Login"}
//                 </motion.button>
//             </motion.div>
//         </motion.div>
//     );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setLoginUser } from "../store/slice/authSlice";
import { LoginUser } from "../api/auth/ApiServices";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginUI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (!form.username || !form.password) {
            toast.error("Please enter both username and password");
            return;
        }

        // setLoading(true);
        try {
            const payload = { username: form.username, password: form.password };
            const logindata = await LoginUser(payload);

            if (logindata.error) {
                toast.error(logindata.error);
            } else {
                dispatch(setLoginUser(logindata));
                localStorage.setItem("token", logindata.data.token);
                toast.success("Login successful!");
                setTimeout(() => navigate("/verify-otp"), 1000);
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            // setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center min-h-screen bg-gray-50 px-4"
        >
            <Toaster position="top-right" />

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-md p-8"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Log in to your account
                </h2>

                {/* Email */}
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                </label>
                <input
                    name="username"
                    type="email"
                    placeholder="Enter your email"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Password */}
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Password
                </label>
                <div className="relative mb-4">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex justify-between items-center mb-5">
                    <label className="flex items-center text-sm text-gray-600">
                        <input type="checkbox" className="mr-2 accent-black" /> Remember me
                    </label>
                    <a href="#" className="text-sm text-gray-700 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Sign in button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full py-2 font-semibold rounded-md text-white transition-all ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                        }`}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                {/* <div className="flex items-center my-5">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-all">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Continue with Google
                    </button>

                    <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-all">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            alt="Apple"
                            className="w-5 h-5 mr-2"
                        />
                        Continue with Apple
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-black font-medium hover:underline">
                        Sign up now
                    </a>
                </p> */}
            </motion.div>
        </motion.div>
    );
}
