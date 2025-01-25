"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
        image: "/між_нами_kids-1-1024x1024.png",
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
        title: "Між Нами: Для пар",
        price: 849,
        oldPrice: 949,
        image: "/не_пяні_кохані-1-1024x1024.webp",
        rating: 5,
        reviews: 96,
        category: ['new', 'all']
    }
];

const TopProduct = () => {
    const [activeCategory, setActiveCategory] = useState<ProductCategory>('hits');
    const router = useRouter();

    const categories = [
        { id: 'hits', label: 'Хіти Продажу' },
        { id: 'new', label: 'Новинки' },
        { id: 'all', label: 'Всі' },
    ];

    const filteredProducts = products.filter(product =>
        product.category.includes(activeCategory)
    );

    return (
        <div className="container mx-auto px-4 py-12 ">
            <div className="mb-8">
                <div className='flex justify-between items-center'>
                    <div className="flex justify-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id as ProductCategory)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === category.id
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
                        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all"
                    >
                        Перейти до всіх
                    </button>   
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                                <button className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors">
                                    <FiHeart className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="font-medium text-base dark:text-white">{product.title}</h3>

                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <FiStar key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {product.reviews} відгуків
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-base font-bold dark:text-white">
                                            {product.price} ₴
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-xs text-gray-500 line-through">
                                                {product.oldPrice} ₴
                                            </span>
                                        )}
                                    </div>
                                    <button className="p-1.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors dark:bg-white dark:text-black">
                                        <FiShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TopProduct;
