"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ProductCategory = 'hits' | 'new' | 'all';

interface Product {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    category: ProductCategory[];
}

const products: Product[] = [
    {
        id: 1,
        title: "Між Нами: Kids",
        price: 749,
        oldPrice: 849,
        image: "/між_нами_kids-1-1024x1024.webp",
        rating: 5,
        reviews: 158,
        category: ['hits', 'all']
    },
    {
        id: 2,
        title: "Між Нами: про любов",
        price: 749,
        image: "/між_нами_про_любов_1-1-300x300.webp",
        rating: 5,
        reviews: 142,
        category: ['hits', 'all']
    },
    {
        id: 3,
        title: "(НЕ) пяні кохані",
        price: 849,
        oldPrice: 949,
        image: "/не_пяні_кохані-1-1024x1024.webp",
        rating: 5,
        reviews: 96,
        category: ['new', 'all']
    },
    {
        id: 4,
        title: "Між Нами: про любов 2.0",
        price: 649,
        image: "/між_нами_про_любов_2-1-1024x1024.webp",
        rating: 5,
        reviews: 89,
        category: ['hits', 'all']
    },
    {
        id: 5,
        title: "Між Нами: Ностальгія",
        price: 799,
        oldPrice: 899,
        image: "/між_нами_ностальгія-2-1024x1024.png",
        rating: 5,
        reviews: 75,
        category: ['new', 'all']
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    },
    exit: { opacity: 0 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function TopProduct() {
    const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
    const router = useRouter();

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') {
            return products;
        }
        return products.filter(product => product.category.includes(activeCategory));
    }, [activeCategory]);

    useEffect(() => {
        console.log('Active Category:', activeCategory);
        console.log('Filtered Products:', filteredProducts);
    }, [activeCategory, filteredProducts]);

    const categories = [
        { id: 'all' as ProductCategory, label: 'Всі' },
        { id: 'hits' as ProductCategory, label: 'Хіти Продажу' },
        { id: 'new' as ProductCategory, label: 'Новинки' },
    ];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="container mx-auto py-8 sm:py-16 px-4"
        >
            <motion.h2 
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
            >
                Популярні ігри
            </motion.h2>

            <div className="mb-6 sm:mb-8">
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center'>
                    <div className="flex justify-start sm:justify-center overflow-x-auto sm:overflow-visible space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                    activeCategory === category.id
                                        ? 'bg-white dark:bg-gray-700 shadow-sm'
                                        : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => router.push('/catalog')}
                        className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all text-sm sm:text-base"
                    >
                        Перейти до всіх
                    </button>   
                </div>
            </div>
            <Link href="/product">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                variants={itemVariants}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-2 sm:p-3 transition-all hover:border-[#A7AA2E]"
                            >
                                <div className="relative aspect-square mb-2 sm:mb-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors border border-gray-100">
                                        <FiHeart className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                    </button>
                                </div>

                                <div className="space-y-1 sm:space-y-1.5">
                                    <h3 className="font-medium text-sm sm:text-base dark:text-white line-clamp-2">{product.title}</h3>

                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center">
                                            {[...Array(product.rating)].map((_, i) => (
                                                <FiStar key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                            {product.reviews} відгуків
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-sm sm:text-base font-bold dark:text-white">
                                                {product.price} ₴
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-[10px] sm:text-xs text-gray-500 line-through">
                                                    {product.oldPrice} ₴
                                                </span>
                                            )}
                                        </div>
                                        <button className="p-1.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors dark:bg-white dark:text-black">
                                            <FiShoppingCart className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </Link>
        </motion.div>
    );
}
