"use client"
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiHeart, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface FavoriteItem {
    id: number;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    rating: number;
    reviews: number;
}

export default function FavoritesDropdown({ isOpen, onClose }) {
    const favorites: FavoriteItem[] = [
        {
            id: 1,
            name: "Між нами: про любов 2.0",
            price: 999,
            image: "/між_нами_про_любов_2-1-1024x1024.webp",
            inStock: true,
            rating: 4.8,
            reviews: 124
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-gray-50 to-white shadow-xl z-50"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                        <FiHeart size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">Вподобане</h2>
                                        <p className="text-sm text-gray-500">{favorites.length} товарів</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* Favorites Items */}
                            <div className="flex-1 overflow-y-auto py-6">
                                {favorites.length > 0 ? (
                                    <div className="space-y-6 px-6">
                                        {favorites.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="group bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link href={`/products/${item.id}`}>
                                                            <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                                                                {item.name}
                                                            </h3>
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex items-center">
                                                                {Array(5).fill(null).map((_, i) => (
                                                                    <FiHeart 
                                                                        key={i}
                                                                        size={12} 
                                                                        className={`${i < Math.floor(item.rating) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                ({item.reviews})
                                                            </span>
                                                        </div>
                                                        <p className="text-lg font-semibold mt-2">{item.price} ₴</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <button className="p-2 hover:bg-red-50 rounded-xl transition-colors group">
                                                            <FiX size={16} className="text-gray-400 group-hover:text-red-500" />
                                                        </button>
                                                        {item.inStock && (
                                                            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                                                <FiShoppingCart size={16} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center px-6">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                            <FiHeart size={24} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Список вподобаного порожній
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Додайте товари, які вам сподобались
                                        </p>
                                        <Link 
                                            href="/catalog"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            Перейти до каталогу
                                            <FiArrowRight size={16} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
