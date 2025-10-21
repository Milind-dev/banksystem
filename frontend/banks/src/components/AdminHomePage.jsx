import React from "react";
import { motion } from "framer-motion";
import chartImg from "../assests/tiger-eyes-looking-from-the-bushes-free-image.webp"; // Replace with your image path

export default function AdminHomePage() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-16"
            >
                <div className="max-w-md mx-auto w-full">
                    {/* Logo */}
                    <div className="flex items-center mb-10">
                        <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-md mr-2"></div>
                        <h1 className="text-xl font-semibold">Credly</h1>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-3">Sign up</h2>
                    <p className="text-gray-400 mb-8">Start your 30-day free trial.</p>

                    {/* Form */}
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm mb-2">Name*</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm mb-2">Email*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-indigo-500"
                            />
                        </div> */}
                        <div>
                            <label className="block text-sm mb-2">Password*</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-indigo-500"
                            />
                            <p className="text-gray-500 text-xs mt-1">
                                Must be at least 8 characters.
                            </p>
                        </div>

                        {/* Buttons */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-md font-medium bg-gradient-to-r from-orange-500 to-green-400 text-black mt-4"
                        >
                            Get started
                        </button>

                        {/* <button
                            type="button"
                            className="w-full py-3 rounded-md font-medium bg-gray-900 border border-gray-700 flex items-center justify-center space-x-2 hover:bg-gray-800 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            <span>Sign up with Google</span>
                        </button> */}
                    </form>

                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </motion.div>

            {/* ===== Right Background Illustration ===== */}
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
