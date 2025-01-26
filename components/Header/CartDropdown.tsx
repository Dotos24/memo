"use client"
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
    const cartItems: CartItem[] = [
        {
            id: 1,
            name: "Між нами: про любов 2.0",
            price: 999,
            quantity: 1,
            image: "/між_нами_про_любов_2-1-1024x1024.webp"
        },
        // Add more items as needed
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">🛒</span>
                                    <h2 className="text-lg font-semibold">Кошик</h2>
                                    <span className="bg-black text-white text-sm px-2 py-0.5 rounded-full">
                                        {cartItems.length}
                                    </span>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* Empty Cart State */}
                            {cartItems.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-6xl mb-4">🛍️</span>
                                    <h3 className="text-xl font-medium mb-2">Ваш кошик порожній</h3>
                                    <p className="text-gray-500 mb-6">Час додати щось цікаве! ✨</p>
                                    <button 
                                        onClick={onClose}
                                        className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
                                    >
                                        Перейти до каталогу 🎮
                                    </button>
                                </div>
                            )}

                            {/* Cart Items */}
                            {cartItems.length > 0 && (
                                <div className="flex-1 overflow-y-auto py-6">
                                    <div className="space-y-6 px-6">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex gap-4"
                                            >
                                                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-lg font-semibold mt-1">{item.price} ₴</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                                                            <FiMinus size={16} />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                                                            <FiPlus size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg h-fit transition-colors">
                                                    <FiX size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            {cartItems.length > 0 && (
                                <div className="border-t p-6 space-y-4">
                                    <div className="flex items-center justify-between text-lg font-semibold">
                                        <span>💰 Всього:</span>
                                        <span>{total} ₴</span>
                                    </div>
                                    <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition-colors">
                                        Оформити замовлення ✨
                                    </button>
                                    <p className="text-sm text-gray-500 text-center">
                                        🚚 Безкоштовна доставка від 1800 ₴
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
