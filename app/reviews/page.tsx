"use client";

import { useState } from 'react';
import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Reviews } from '@/components/Coments/Coments';
import { motion } from 'framer-motion';

const ReviewsPage = () => {
    return (
        <>
        <Support />
        <Header />
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold">Відгуки наших покупців</h1>
                    <p className="text-gray-600 mt-2">Думки та враження клієнтів про нашу продукцію</p>
                </div>
            </div>
            <Reviews showAll={true} />
        </div>
        <Footer/>
        </>
    );
};

export default ReviewsPage;
