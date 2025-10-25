import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assests/axis.png";
import barula from "../assests/barula.png";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react"; // lightweight icon library


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);


    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between bg-[#F0F5F3] shadow-md px-1 py-4 fixed top-0 w-[83%] z-50"
        >
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
                <img src={logo} alt="Logo" className="w-[20%]" />
            </motion.div>

            {/* Navigation Links */}
            {/* <nav className="hidden md:flex space-x-6">
                {["Features", "Pricing", "About", "Blog", "Contact"].map((link) => (
                    <motion.a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        whileHover={{ scale: 1.1, color: "#2563EB" }} // Tailwind blue-600
                        className="text-gray-700 transition-colors"
                    >
                        {link}
                    </motion.a>
                ))}
            </nav> */}
            {/* Logo */}


            {/* Profile Avatar + Dropdown */}
            <div className="relative">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMenu}
                    src={barula}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 shadow-sm"
                />

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/profile");
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/login");
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </motion.header>
    );
}
