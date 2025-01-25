"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
    {
        id: 1,
        name: "Між нами: про любов 2.0",
        type: "Для пар",
        price: 999,
        oldPrice: 1299,
        image: "/між_нами_про_любов_2-1-1024x1024.webp",
        rating: 4.8,
        reviews: 124,
        description: "Гра для покращення стосунків та розуміння одне одного",
        inStock: true,
        isNew: true
    },
    {
        id: 2,
        name: "Між нами: Kids",
        type: "Для сім'ї",
        price: 899,
        image: "/між_нами_kids-1-300x300.webp",
        rating: 4.9,
        reviews: 89,
        description: "Сімейна гра для веселого проведення часу",
        inStock: true,
        isNew: false
    },
    {
        id: 3,
        name: "Між нами: про відносини",
        type: "Для пар",
        price: 799,
        oldPrice: 999,
        image: "/між_нами_про_любов_1-1-300x300.webp",
        rating: 4.7,
        reviews: 156,
        description: "Гра для зміцнення відносин",
        inStock: true,
        isNew: false
    },
    {
        id: 4,
        name: "Між нами: Дружба",
        type: "Для компанії",
        price: 849,
        image: "/carousel/Frame-65-e1726148065935.webp",
        rating: 4.6,
        reviews: 78,
        description: "Гра для веселої компанії друзів",
        inStock: true,
        isNew: true
    },
    {
        id: 5,
        name: "Між нами: Сімейний вечір",
        type: "Для сім'ї",
        price: 749,
        oldPrice: 899,
        image: "/carousel/Frame-98-e1726148037282.webp",
        rating: 4.8,
        reviews: 92,
        description: "Гра для всієї родини",
        inStock: true,
        isNew: false
    },
    {
        id: 6,
        name: "Між нами: Романтика",
        type: "Для пар",
        price: 899,
        image: "/carousel/Frame-116-e1726148010329.webp",
        rating: 4.9,
        reviews: 67,
        description: "Романтична гра для закоханих",
        inStock: false,
        isNew: true
    }
];

export default function CatalogPage() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(true);

    const categories = [
        { id: 'couples', name: 'Для пар', count: 12 },
        { id: 'company', name: 'Для компанії', count: 8 },
        { id: 'family', name: 'Для сім\'ї', count: 6 },
        { id: 'development', name: 'Розвиваючі', count: 4 },
    ];

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) 
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="text-sm text-gray-500 mb-4 hover:text-gray-700 transition-colors">
                        Головна / Каталог
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent">
                            Каталог ігор
                        </h1>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                <button 
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <FiGrid />
                                </button>
                                <button 
                                    onClick={() => setViewType('list')}
                                    className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <FiList />
                                </button>
                            </div>
                            <div className="relative">
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white px-4 py-2 pr-8 rounded-xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                >
                                    <option value="popular">Популярні</option>
                                    <option value="new">Нові</option>
                                    <option value="price-asc">Ціна: від низької до високої</option>
                                    <option value="price-desc">Ціна: від високої до низької</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex items-start gap-8 relative">
                    {/* Dividing Line */}
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute left-80 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"
                    />

                    {/* Enhanced Filters */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-80 flex-shrink-0 pr-8"
                    >
                        <div className="sticky top-24">
                            <motion.div 
                                className="rounded-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Filter Header */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FiFilter className="text-gray-700" />
                                            <h2 className="font-semibold text-gray-900">Фільтри</h2>
                                        </div>
                                        <button 
                                            onClick={() => setShowFilters(!showFilters)}
                                            className="text-sm text-gray-500 hover:text-gray-900"
                                        >
                                            {showFilters ? 'Згорнути' : 'Розгорнути'}
                                        </button>
                                    </div>
                                    <AnimatePresence>
                                        {selectedCategories.length > 0 && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mt-4 flex flex-wrap gap-2"
                                            >
                                                {selectedCategories.map((categoryId, index) => {
                                                    const category = categories.find(c => c.id === categoryId);
                                                    return (
                                                        <motion.button
                                                            key={categoryId}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            onClick={() => toggleCategory(categoryId)}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            {category?.name}
                                                            <motion.span
                                                                whileHover={{ rotate: 90 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <FiX size={14} />
                                                            </motion.span>
                                                        </motion.button>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="space-y-8"
                                        >
                                            {/* Price Range */}
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="border-t border-gray-100 pt-6 px-6"
                                            >
                                                <h3 className="font-medium text-gray-900 mb-4">Ціна</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span>{priceRange.min} ₴</span>
                                                        <span>{priceRange.max} ₴</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="0"
                                                        max="2000"
                                                        value={priceRange.max}
                                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                                    />
                                                    <div className="flex gap-4">
                                                        <div className="relative flex-1">
                                                            <input 
                                                                type="number" 
                                                                value={priceRange.min}
                                                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm"
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₴</span>
                                                        </div>
                                                        <div className="relative flex-1">
                                                            <input 
                                                                type="number"
                                                                value={priceRange.max}
                                                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm"
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₴</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Categories */}
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="border-t border-gray-100 pt-6 px-6"
                                            >
                                                <h3 className="font-medium text-gray-900 mb-4">Категорії</h3>
                                                <div className="space-y-2">
                                                    {categories.map((category, index) => (
                                                        <motion.label 
                                                            key={category.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + index * 0.05 }}
                                                            className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-gray-50/50 transition-all duration-200"
                                                            whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input 
                                                                    type="checkbox"
                                                                    checked={selectedCategories.includes(category.id)}
                                                                    onChange={() => toggleCategory(category.id)}
                                                                    className="w-5 h-5 border-2 border-gray-300 rounded accent-black"
                                                                />
                                                                <span className="text-gray-700">{category.name}</span>
                                                            </div>
                                                            <span className="text-sm text-gray-400">{category.count}</span>
                                                        </motion.label>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* Apply Filters Button */}
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="px-6 pb-6"
                                            >
                                                <motion.button 
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
                                                >
                                                    Застосувати фільтри
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 pl-8"
                    >
                        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                            {products.map((product, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={product.id}
                                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative">
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        {/* Enhanced Badges */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {product.isNew && (
                                                <motion.span 
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                                                >
                                                    Новинка
                                                </motion.span>
                                            )}
                                            {product.oldPrice && (
                                                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                                </span>
                                            )}
                                        </div>
                                        {/* Enhanced Quick actions */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                                                <FiHeart size={18} className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            <span className="text-sm text-gray-500">
                                                {product.inStock ? 'В наявності' : 'Немає в наявності'}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-lg">{product.price} ₴</span>
                                                {product.oldPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {product.oldPrice} ₴
                                                    </span>
                                                )}
                                            </div>
                                            <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors">
                                                <FiShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
