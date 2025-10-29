import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assests/tiger-eyes-looking-from-the-bushes-free-image.webp"
export default function AdminHomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Avail credit card against Fixed Deposit",
            subtitle: "Book FD via UPI payment",
            btnText: "Apply Now",
            img: banner1, // change to your image path
        },
        {
            id: 2,
            title: "Get Instant Credit Card",
            subtitle: "Zero Income Proof Required",
            btnText: "Get Started",
            img: banner1, // change to your image path
        },
    ];





    useEffect(() => {
        const interval = setInterval(
            () => setCurrentIndex((prev) => (prev + 1) % slides.length),
            4000
        );
        return () => clearInterval(interval);

    }, [slides.length]);

    const goToSlide = (index) => setCurrentIndex(index);

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex flex-col items-center justify-center mt-[80px] text-black">

                <div className="w-full h-[350px] md:h-[250px] bg-white flex items-center justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slides[currentIndex].id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeInOut"
                            }}
                            className="w-full flex flex-col md:flex-row items-center justify-center px-10"
                        >
                            {/* Text Section */}
                            <div className="flex-1 space-y-3 text-left">
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-4xl font-semibold text-gray-800"
                                >
                                    {slides[currentIndex].title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="text-lg text-gray-600"
                                >
                                    {slides[currentIndex].subtitle}
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                    className="mt-4 bg-pink-700 hover:bg-pink-800 text-white px-5 py-2 rounded-md transition"
                                >
                                    {slides[currentIndex].btnText}
                                </motion.button>
                            </div>

                            {/* Image Section */}
                            <motion.img
                                src={slides[currentIndex].img}
                                alt="banner"
                                className="flex-1 h-20 md:h-80 object-contain"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots */}
                    <div className="absolute bottom-6 flex space-x-3">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`cursor-pointer w-3 h-3 rounded-full transition ${currentIndex === index ? "bg-pink-700" : "bg-gray-400"
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
