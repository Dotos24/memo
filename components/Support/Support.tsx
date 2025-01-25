"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTruck, FaHeart, FaUsers } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

const Support = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    { text: 'Безкоштовна доставка від 1800 грн', icon: <FaTruck /> },
    { text: 'Частина коштів з кожної гри йде на ЗСУ', icon: <FaHeart /> },
    { text: 'Більше 50 000 щасливих клієнтів', icon: <FaUsers /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-[#A7AA2E] py-5'>
      <div className="container flex justify-between items-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className='text-black flex items-center gap-3 font-medium'
          >
            <span className="text-black text-lg">
              {messages[currentIndex].icon}
            </span>
            {messages[currentIndex].text}
          </motion.p>
        </AnimatePresence>
        
        <div className="flex gap-3">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                currentIndex === index 
                  ? 'bg-black' 
                  : 'bg-black/50 hover:bg-black/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;