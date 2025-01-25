"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiPackage, FiCreditCard, FiHelpCircle, FiThumbsUp, FiThumbsDown, FiMessageSquare } from 'react-icons/fi';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: 'delivery' | 'payment' | 'product' | 'general';
    helpful?: {
        yes: number;
        no: number;
    };
}

const faqCategories = {
    delivery: { name: 'Доставка', icon: FiPackage },
    payment: { name: 'Оплата', icon: FiCreditCard },
    product: { name: 'Про продукт', icon: FiHelpCircle },
    general: { name: 'Загальні питання', icon: FiHelpCircle }
};

const faqData: FAQItem[] = [
    {
        id: 1,
        category: 'delivery',
        question: "Скільки часу займає доставка?",
        answer: "Доставка зазвичай займає 1-3 робочі дні по Україні. При замовленні від 1800 грн доставка безкоштовна. Ми відправляємо замовлення Новою Поштою та Укрпоштою. Після відправки ви отримаєте SMS з номером відстеження.",
        helpful: { yes: 124, no: 2 }
    },
    {
        id: 2,
        category: 'product',
        question: "Як правильно грати в 'Між Нами: Kids'?",
        answer: "Гра проста: виберіть картку, прочитайте запитання та почніть відверту розмову. Немає правильних чи неправильних відповідей - головне щира комунікація. Рекомендований час гри: 15-30 хвилин за один сеанс.",
        helpful: { yes: 89, no: 1 }
    },
    {
        id: 3,
        category: 'product',
        question: "Для якого віку підходить гра?",
        answer: "Гра 'Між Нами: Kids' розроблена для дітей від 5 до 14 років. Питання адаптовані під різні вікові групи та можуть використовуватися відповідно до розвитку дитини."
    },
    {
        id: 4,
        category: 'general',
        question: "Чи можна повернути товар?",
        answer: "Так, ми надаємо 30 днів гарантії на повернення. Товар має бути в оригінальній упаковці та не мати слідів використання."
    },
    {
        id: 5,
        category: 'general',
        question: "Чи можна грати всією сім'єю?",
        answer: "Звичайно! Гра чудово підходить для сімейного дозвілля та допомагає створити більш глибокий зв'язок між усіма членами родини."
    }
];

const FAQWidget = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [helpfulResponses, setHelpfulResponses] = useState<Record<number, boolean | null>>({});

    const filteredFAQs = useMemo(() => {
        return faqData.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || faq.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleHelpfulResponse = (faqId: number, isHelpful: boolean) => {
        setHelpfulResponses(prev => ({
            ...prev,
            [faqId]: isHelpful
        }));
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
                        Часті запитання
                    </h2>

                    {/* Search and Categories */}
                    <div className="mb-8 space-y-4">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Пошук відповідей..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                    !selectedCategory
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                                }`}
                            >
                                Всі питання
                            </button>
                            {Object.entries(faqCategories).map(([key, { name, icon: Icon }]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedCategory(key)}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                                        selectedCategory === key
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {filteredFAQs.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={false}
                                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === item.id ? null : item.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        {faqCategories[item.category].icon({ className: "w-5 h-5 text-gray-400" })}
                                        <span className="font-medium dark:text-white">{item.question}</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: activeIndex === item.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-4">
                                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                    {item.answer}
                                                </p>
                                                {/* Helpful buttons */}
                                                <div className="flex items-center gap-6 pt-2 border-t border-gray-100 dark:border-gray-700">
                                                    <span className="text-sm text-gray-500">
                                                        Чи була корисною відповідь?
                                                    </span>
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => handleHelpfulResponse(item.id, true)}
                                                            className={`flex items-center gap-2 text-sm ${
                                                                helpfulResponses[item.id] === true
                                                                    ? 'text-green-500'
                                                                    : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                        >
                                                            <FiThumbsUp className="w-4 h-4" />
                                                            <span>{item.helpful?.yes || 0}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleHelpfulResponse(item.id, false)}
                                                            className={`flex items-center gap-2 text-sm ${
                                                                helpfulResponses[item.id] === false
                                                                    ? 'text-red-500'
                                                                    : 'text-gray-500 hover:text-gray-700'
                                                            }`}
                                                        >
                                                            <FiThumbsDown className="w-4 h-4" />
                                                            <span>{item.helpful?.no || 0}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <FiHelpCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">Не знайдено відповідей на ваш запит</p>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default FAQWidget;
