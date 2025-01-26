"use client";
import { motion } from "framer-motion";

export default function PageLoader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white dark:bg-gray-900"
        >
            <div className="relative">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-16 h-16 border-4 border-gray-200 rounded-full"
                >
                    <motion.div
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-full h-full border-4 border-black rounded-full border-t-transparent"
                    />
                </motion.div>
                <div className="mt-4 text-center">
                    <motion.span 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-sm font-medium"
                    >
                        Завантаження...
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}
