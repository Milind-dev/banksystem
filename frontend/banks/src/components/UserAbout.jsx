import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";

export default function AxisStyleSearch() {
    const [displayedText, setDisplayedText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const placeholderText = "Search user information...";
    const typingSpeed = 80; // ms per letter

    // Typing animation for placeholder
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(placeholderText.slice(0, index));
            index++;
            if (index > placeholderText.length) clearInterval(interval);
        }, typingSpeed);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex flex-col items-center mt-[8%] min-h-screen bg-gray-50 overflow-hidden">

            {/* Semi-transparent gray animation background */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-gray-200/60 backdrop-blur-[1px] z-10"
                    />
                )}
            </AnimatePresence>

            {/* Search Box */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl z-20"
            >
                <div
                    className={`flex items-center bg-white rounded-[12px] shadow-md border 
                    ${isFocused ? "border-[#A40046] shadow-lg" : "border-gray-200"} 
                    transition-all duration-300`}
                >
                    <SearchIcon className="text-[#A40046] ml-4" />

                    <input
                        type="text"
                        placeholder={displayedText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                    />

                    {isFocused ? (
                        <CloseIcon
                            className="text-[#A40046] mr-4 cursor-pointer"
                            onClick={() => setIsFocused(false)}
                        />
                    ) : (
                        <MicIcon className="text-[#A40046] mr-4" />
                    )}
                </div>

                {/* Trending searches dropdown */}
                <AnimatePresence>
                    {isFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-full bg-white rounded-lg shadow-md mt-2 border border-gray-100 p-4"
                        >
                            <h3 className="text-[#A40046] font-semibold mb-2">
                                Trending searches
                            </h3>
                            <ul className="space-y-1 text-gray-700">
                                <li className="cursor-pointer hover:text-[#A40046]">Account balance</li>
                                <li className="cursor-pointer hover:text-[#A40046]">Loan details</li>
                                <li className="cursor-pointer hover:text-[#A40046]">Credit card offers</li>
                                <li className="cursor-pointer hover:text-[#A40046]">Branch locator</li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
