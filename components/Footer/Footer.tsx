"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FiPhone, FiClock, FiInstagram, FiSend } from 'react-icons/fi';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
    };

    return (
        <footer className="bg-gray-50 border-t">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-xl">Memo Games</h3>
                        <p className="text-gray-600 text-sm">
                            Виробник нетипових настільних ігор
                        </p>
                        <div className="space-y-4">
                            <a href="tel:+380731171567" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                                <FiPhone className="flex-shrink-0" />
                                <span>+38 (073) 117 15 67</span>
                            </a>
                            <div className="flex items-start gap-2 text-gray-600">
                                <FiClock className="flex-shrink-0 mt-1" />
                                <div className="text-sm">
                                    <p>прийом онлайн-замовлень 24/7,</p>
                                    <p>відправка пн-пт 15:30</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Categories */}
                    <div>
                        <h3 className="font-bold mb-6">Популярні категорії</h3>
                        <ul className="space-y-3">
                            {[
                                'Для друзів та розваг',
                                'Для пар',
                                'Для сім\'ї',
                                'Розмовні ігри',
                                'Для розвитку та навчання',
                                'Для одного'
                            ].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href="#" 
                                        className="text-gray-600 hover:text-black transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Menu */}
                    <div>
                        <h3 className="font-bold mb-6">Меню</h3>
                        <ul className="space-y-3">
                            {[
                                'Офлайн магазини',
                                'Співпраця',
                                'Контакти',
                                'Доставка та оплата',
                                'Блог',
                                'Політика конфіденційності',
                                'Публічна оферта',
                                'Порушення прав інтелектуальної власності'
                            ].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href="#" 
                                        className="text-gray-600 hover:text-black transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold mb-2">Знижка від 100 до 300 грн на перше замовлення ⬇️</h3>
                            <p className="text-gray-600 text-sm">
                                Отримайте персональні знижки та дізнавайтеся першими про наші новинки!
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email:"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiSend />
                                </button>
                            </div>
                        </form>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a 
                                href="#" 
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                            >
                                <FiInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t text-sm text-gray-600">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p> 2019 - 2025, Memo Games</p>
                        <p>Всі права захищено.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
