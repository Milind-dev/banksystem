import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ✅ Dynamic Breadcrumb Component
export default function Breadcrumb() {
    const location = useLocation();

    // Split path: "/admin-homepage-dashboard/profile" → ["admin-homepage-dashboard", "profile"]
    const pathParts = location.pathname.split("/").filter((part) => part !== "");

    // Optional: Friendly labels for certain routes
    const labelMap = {
        "admin-homepage-dashboard": "Admin Dashboard",
        "user-about": "About",
        "profile": "Profile",
    };

    // Format labels — first check custom names, then title-case fallback
    const formatLabel = (text) =>
        labelMap[text] ||
        text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-[#F9FAFB] shadow-sm  py-0 px-6 text-xs text-gray-600"
        >
            <ul className="flex items-center space-x-1 ">
                {/* Home link always first */}
                <li className="flex items-center">
                    <Link
                        to="/"
                        className="hover:text-[#A40046] transition-colors duration-200 "
                    >
                        Home
                    </Link>
                    {pathParts.length > 0 && (
                        <ChevronRightIcon className="text-gray-400 mx-1 text-sm" />
                    )}
                </li>

                {/* Generate breadcrumbs for each segment */}
                {pathParts.map((part, index) => {
                    const pathTo = "/" + pathParts.slice(0, index + 1).join("/");
                    const isLast = index === pathParts.length - 1;

                    return (
                        <li key={pathTo} className="flex items-center">
                            {isLast ? (
                                // ✅ ACTIVE (last breadcrumb) — underline stays visible
                                <span className="font-semibold text-gray-800 relative pb-[2px]">
                                    {formatLabel(part)}
                                    <motion.div
                                        layoutId="breadcrumb-underline"
                                        className="absolute left-0 bottom-0 h-[2px] bg-[#9B1246] w-full rounded-full"
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                    />
                                </span>
                            ) : (
                                // ✅ CLICKABLE LINKS — underline animates on hover and moves smoothly
                                <Link to={pathTo} className="relative pb-[2px] text-gray-600 hover:text-[#9B1246] transition-colors duration-200">
                                    {formatLabel(part)}
                                    <motion.div
                                        layoutId="breadcrumb-underline"
                                        className="absolute left-0 bottom-0 h-[2px] bg-[#9B1246] w-0 rounded-full"
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                    />
                                </Link>
                            )}
                            {!isLast && (
                                <ChevronRightIcon className="text-gray-400 mx-1 text-sm" />
                            )}
                        </li>
                    );
                })}
            </ul>
        </motion.nav>
    );
}
