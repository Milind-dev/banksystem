import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const appVersion = process.env.REACT_APP_VERSION;
    console.log("App Version:", appVersion)

    const menuItems = [
        { name: "Home", path: "/admin-homepage-dashboard" },
        { name: "Transaction", path: "/transaction" },
        { name: "Settlement", path: "/Settlement" },
        { name: "Logout", path: "/login" }
    ];

    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-64 bg-[#F0F5F3] text-[#353330] flex flex-col p-6 space-y-6 h-screen"
        >
            {/* Logo */}
            <div className="text-2xl font-bold mb-8 cursor-pointer" onClick={() => navigate("/admin-homepage-dashboard")}>
                Axis-Bank
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                    <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer px-4 py-2 rounded hover:bg-white-900"
                        onClick={() => navigate(item.path)}
                    >
                        {item.name}
                    </motion.div>
                ))}

                {/* Bottom Section (Version Info) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500 text-left border border-gray-300 rounded p-2  "
                >
                    <motion.p>Version:{" "}
                        <span className="font-medium text-gray-700">{appVersion}</span></motion.p>
                </motion.div>
            </nav>
        </motion.div>
    );
}
