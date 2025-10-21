import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/store";
import { RegisterUser } from "../api/auth/ApiServices";
import { setRegister } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import chartImg from "../assests/tiger-eyes-looking-from-the-bushes-free-image.webp"; // background image

export default function RegisterAdmin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.password) {
            toast.error("Please enter username and password");
            return;
        }

        setLoading(true);
        const payload = {
            username: form.username,
            password: form.password,
            role: "superadmin",
        };

        try {
            const response = await RegisterUser(payload);
            dispatch(setRegister(response));
            toast.success(response.message || "SuperAdmin registered successfully!");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white relative">
            <Toaster position="top-right" reverseOrder={false} />

            {/* === Left Sign Up Section === */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-16 z-10"
            >
                <div className="max-w-md mx-auto w-full">
                    {/* Logo */}
                    <div className="flex items-center mb-10">
                        <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-md mr-2"></div>
                        <h1 className="text-xl font-semibold">Credly</h1>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-3">Sign up</h2>
                    <p className="text-gray-400 mb-8">Register as SuperAdmin.</p>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm mb-2">Username*</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Password*</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-indigo-500"
                            />
                            <p className="text-gray-500 text-xs mt-1">
                                Must be at least 8 characters.
                            </p>
                        </div>

                        {/* Button */}
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            type="submit"
                            disabled={loading}
                            transition={{ duration: 0.1 }}
                            className={`w-full py-3 rounded-md font-medium text-black bg-gradient-to-r from-orange-500 to-green-400 transition duration-150 ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                                }`}
                        >
                            {loading ? "Registering..." : "Get started"}
                        </motion.button>
                    </form>
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* === Right Illustration === */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 relative hidden lg:flex justify-center items-center bg-gradient-to-br from-indigo-900 via-blue-900 to-black overflow-hidden"
            >
                <img
                    src={chartImg}
                    alt="dashboard preview"
                    className="w-[90%] max-w-lg rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm">
                    Portfolio Value: <span className="text-green-400">$5,837.45</span>
                </div>
            </motion.div>
        </div>
    );
}
