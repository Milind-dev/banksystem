
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import {
    Home,
    DollarSign,
    User,
    Info,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Banknote,
} from "lucide-react";

export default function Sidebar() {
    const appVersion = process.env.REACT_APP_VERSION;
    const navigate = useNavigate();

    const adminlayout = useAppSelector((state) => state.auth?.sessions?.data?.isVerified);
    const userlayout = useAppSelector((state) => state.auth?.usersessions?.data?.role);

    const [collapsed, setCollapsed] = useState(false);

    const allMenuItems = useMemo(
        () => [
            { name: "Home", path: "/admin-homepage-dashboard", icon: <Home size={18} /> },
            { name: "Transaction", path: "/transaction", role: "superadmin", icon: <DollarSign size={18} /> },
            { name: "Settlement", path: "/settlement", role: "superadmin", icon: <Banknote size={18} /> },
            { name: "User Profile", path: "/user-profile", role: "user", icon: <User size={18} /> },
            { name: "About", path: "/user-about", role: "superadmin", icon: <Info size={18} /> },
            { name: "Logout", path: "/login", icon: <LogOut size={18} /> },
        ],
        []
    );

    const menuItems = useMemo(
        () =>
            allMenuItems.filter(
                (item) =>
                    !item.role ||
                    (item.role === "superadmin" && adminlayout) ||
                    (item.role === "user" && userlayout === "user")
            ),
        [allMenuItems, adminlayout, userlayout]
    );

    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`bg-[#F0F5F3] text-[#353330] flex flex-col p-4 h-screen shadow-md transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Top Section */}
            <div className="flex items-center justify-between mb-6">
                {!collapsed && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold cursor-pointer"
                        onClick={() => navigate("/admin-homepage-dashboard")}
                    >
                        Axis-Bank
                    </motion.h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-gray-200 transition"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-2 flex-grow">
                {menuItems.map((item) => (
                    <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-white hover:shadow-sm transition"
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </motion.div>
                ))}
            </nav>

            {/* Bottom Section (Version Info) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-xs text-gray-500 border border-gray-300 rounded p-2 mt-auto ${collapsed ? "text-center" : "text-left"}`}
            >
                {!collapsed ? (
                    <p>
                        Version: <span className="font-medium text-gray-700">{appVersion}</span>
                    </p>
                ) : (
                    <span>v{appVersion}</span>
                )}
            </motion.div>
        </motion.div>
    );
}
