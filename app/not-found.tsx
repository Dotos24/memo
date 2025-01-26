"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function NotFound() {
    return (
        <>
            <Support />
            <Header />
            <div className="min-h-[600px] flex items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-8xl mb-4"
                    >
                        🤔
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                        Упс! Сторінку не знайдено
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600 dark:text-gray-400"
                    >
                        Схоже, ви загубились у грі 🎮 Давайте повернемось на головну сторінку!
                    </motion.p>
                    
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link 
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-black hover:bg-gray-900 transition-colors duration-200"
                        >
                            🏠 Повернутись на головну
                        </Link>
                        <Link
                            href="/catalog"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            🎲 Переглянути каталог
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="pt-8 text-sm text-gray-500 dark:text-gray-400"
                    >
                        Помітили помилку? <a href="/contact" className="text-black dark:text-white underline hover:no-underline">Повідомте нас</a>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}