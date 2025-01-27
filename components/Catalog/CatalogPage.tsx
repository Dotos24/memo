"use client"
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiHeart, FiShoppingCart, FiX, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Link from 'next/link';

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
        image: "/між_нами_kids-1-1024x1024.webp",
        rating: 4.9,
        reviews: 89,
        description: "Сімейна гра для веселого проведення часу",
        inStock: true,
        isNew: false
    },
    {
        id: 3,
        name: "Між нами: про любов",
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
        name: "Між нами: Ностальгія",
        type: "Для компанії",
        price: 849,
        image: "/між_нами_ностальгія-2-1024x1024.png",
        rating: 4.6,
        reviews: 78,
        description: "Гра для веселої компанії друзів",
        inStock: true,
        isNew: true
    },
    {
        id: 5,
        name: "(НЕ) пяні кохані",
        type: "Для пар",
        price: 749,
        oldPrice: 899,
        image: "/не_пяні_кохані-1-1024x1024.webp",
        rating: 4.8,
        reviews: 92,
        description: "Гра для всієї родини",
        inStock: true,
        isNew: false
    },
    {
        id: 6,
        name: "Бутерброд",
        type: "Для компанії",
        price: 899,
        image: "/бутерброд-1-1024x1024.png",
        rating: 4.9,
        reviews: 67,
        description: "Романтична гра для закоханих",
        inStock: false,
        isNew: true
    }
];

const categories = [
    { id: 'couples', name: 'Для пар', count: 12 },
    { id: 'company', name: 'Для компанії', count: 8 },
    { id: 'family', name: 'Для сім\'ї', count: 6 },
    { id: 'development', name: 'Розвиваючі', count: 4 },
    { id: 'party', name: 'Для вечірок', count: 5 },
    { id: 'kids', name: 'Дитячі ігри', count: 7 },
    { id: 'bestsellers', name: 'Бестселери', count: 3 },
];

const availability = [
    { id: 'in-stock', name: 'В наявності', count: 42 },
    { id: 'pre-order', name: 'Передзамовлення', count: 3 },
    { id: 'coming-soon', name: 'Скоро у продажу', count: 5 },
];

const playerCount = [
    { id: '2', name: '2 гравці', count: 15 },
    { id: '2-4', name: '2-4 гравці', count: 20 },
    { id: '4-6', name: '4-6 гравців', count: 12 },
    { id: '6+', name: '6+ гравців', count: 8 },
];

interface FilterData {
    categories: Array<{id: string; name: string; count: number}>;
    availability: Array<{id: string; name: string; count: number}>;
    playerCount: Array<{id: string; name: string; count: number}>;
    status: Array<{id: string; name: string; count: number}>;
    priceRange: {
        min: number;
        max: number;
        current: number[];
        ranges: Array<{
            id: string;
            name: string;
            count: number;
        }>;
    };
    type: Array<{id: string; name: string; count: number}>;
    age: Array<{id: string; name: string; count: number}>;
    duration: Array<{id: string; name: string; count: number}>;
}

const filterData: FilterData = {
    categories,
    availability,
    playerCount,
    status: [
        { id: 'in-stock', name: 'В наявності', count: 42 },
        { id: 'out-stock', name: 'Немає в наявності', count: 5 },
        { id: 'pre-order', name: 'Передзамовлення', count: 3 },
    ],
    priceRange: {
        min: 0,
        max: 2000,
        current: [200, 1500],
        ranges: [
            { id: 'under-500', name: 'До 500 ₴', count: 12 },
            { id: '500-1000', name: '500 - 1000 ₴', count: 25 },
            { id: '1000-1500', name: '1000 - 1500 ₴', count: 18 },
            { id: 'over-1500', name: 'Більше 1500 ₴', count: 8 },
        ]
    },
    type: [
        { id: 'family', name: 'Сімейна', count: 15 },
        { id: 'party', name: 'Для вечірок', count: 12 },
        { id: 'card', name: 'Карткова', count: 8 },
        { id: 'strategy', name: 'Стратегія', count: 6 },
    ],
    age: [
        { id: '3-5', name: '3-5 років', count: 5 },
        { id: '6-8', name: '6-8 років', count: 12 },
        { id: '9-12', name: '9-12 років', count: 15 },
        { id: '12+', name: '12+ років', count: 8 },
    ],
    duration: [
        { id: '15', name: 'До 15 хвилин', count: 8 },
        { id: '30', name: '15-30 хвилин', count: 15 },
        { id: '60', name: '30-60 хвилин', count: 12 },
        { id: '60+', name: '60+ хвилин', count: 5 },
    ],
};

interface FilterSection {
    id: string;
    title: string;
    isOpen: boolean;
}

const sortOptions = [
    { value: 'popular', label: 'За популярністю' },
    { value: 'new', label: 'Новинки' },
    { value: 'price-asc', label: 'Від дешевих до дорогих' },
    { value: 'price-desc', label: 'Від дорогих до дешевих' },
    { value: 'rating', label: 'За рейтингом' },
    { value: 'reviews', label: 'За відгуками' },
];

interface MobileFiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    filterSections: FilterSection[];
    setFilterSections: (sections: FilterSection[]) => void;
    selectedFilters: {[key: string]: string[]};
    handleFilterSelect: (type: string, id: string) => void;
    filterData: FilterData;
    clearFilters: () => void;
}

interface PriceRangeFilterProps {
    range: {
        min: number;
        max: number;
        current: number[];
        ranges: Array<{
            id: string;
            name: string;
            count: number;
        }>;
    };
    onChange: (values: number[]) => void;
}

// Перемещаем PriceRangeFilter до его использования
const PriceRangeFilter = ({ range, onChange }: PriceRangeFilterProps) => {
    const [values, setValues] = useState(range.current);

    const handleChange = (newValues: number[]) => {
        setValues(newValues);
        onChange?.(newValues);
    };

    return (
        <div className="space-y-6">
            {/* Range Slider */}
            <div className="px-2 py-3">
                <Slider
                    range
                    min={range.min}
                    max={range.max}
                    value={values}
                    onChange={handleChange}
                    trackStyle={[{ backgroundColor: 'black' }]}
                    handleStyle={[
                        { 
                            borderColor: 'black',
                            backgroundColor: 'white',
                            boxShadow: '0 0 0 2px black',
                            opacity: 1
                        },
                        { 
                            borderColor: 'black',
                            backgroundColor: 'white',
                            boxShadow: '0 0 0 2px black',
                            opacity: 1
                        }
                    ]}
                    railStyle={{ backgroundColor: '#E5E7EB' }}
                />
            </div>

            {/* Price Inputs */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <input 
                        type="number"
                        value={values[0]}
                        onChange={(e) => handleChange([Number(e.target.value), values[1]])}
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₴</span>
                </div>
                <span className="text-gray-400">—</span>
                <div className="relative flex-1">
                    <input 
                        type="number"
                        value={values[1]}
                        onChange={(e) => handleChange([values[0], Number(e.target.value)])}
                        className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₴</span>
                </div>
            </div>

            {/* Predefined Ranges */}
            <div className="space-y-2">
                {range.ranges.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            const [min, max] = item.id === 'under-500' 
                                ? [0, 500] 
                                : item.id === 'over-1500'
                                    ? [1500, range.max]
                                    : item.id.split('-').map(Number);
                            handleChange([min, max]);
                        }}
                        className="w-full px-3 py-2 text-sm text-left rounded-xl transition-colors hover:bg-gray-100 flex items-center justify-between"
                    >
                        <span>{item.name}</span>
                        <span className="text-gray-400 text-xs">{item.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FilterSection = ({ 
    title, 
    isOpen, 
    onToggle, 
    type,
    selectedFilters,
    handleFilterSelect,
    filterData 
}: { 
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    type: string;
    selectedFilters: {[key: string]: string[]};
    handleFilterSelect: (type: string, id: string) => void;
    filterData: FilterData;
}) => {
    const getContent = () => {
        if (type === 'price') {
            return (
                <PriceRangeFilter 
                    range={filterData.priceRange} 
                    onChange={(values) => {
                        console.log('Price range changed:', values);
                    }} 
                />
            );
        }

        // Get the correct data based on type
        let filterItems;
        switch(type) {
            case 'status':
                filterItems = filterData.status;
                break;
            case 'type':
                filterItems = filterData.type;
                break;
            case 'players':
                filterItems = filterData.playerCount;
                break;
            case 'age':
                filterItems = filterData.age;
                break;
            case 'duration':
                filterItems = filterData.duration;
                break;
            default:
                filterItems = [];
        }

        return (
            <div className="flex flex-wrap gap-2">
                {filterItems.map((item) => {
                    const isSelected = selectedFilters[type]?.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleFilterSelect(type, item.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                                flex items-center gap-2 
                                ${isSelected 
                                    ? 'bg-[#A7AA2E] text-white border-transparent shadow-md hover:bg-[#959827]' 
                                    : 'border border-gray-200 hover:border-[#A7AA2E] hover:text-[#A7AA2E]'
                                }`}
                        >
                            <span>{item.name}</span>
                            <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                                ({item.count})
                            </span>
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="group border border-gray-200/60 bg-gray-50/30 rounded-xl">
            <div 
                className="flex items-center justify-between gap-2 p-5 cursor-pointer"
                onClick={onToggle}
            >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    {title}
                    {selectedFilters[type]?.length > 0 && (
                        <span className="bg-[#A7AA2E] text-white text-xs px-2 py-0.5 rounded-full">
                            {selectedFilters[type].length}
                        </span>
                    )}
                </label>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                    {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
            </div>
            <div className="overflow-hidden">
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                                height: "auto", 
                                opacity: 1,
                                transition: {
                                    height: { duration: 0.2 },
                                    opacity: { duration: 0.2, delay: 0.1 }
                                }
                            }}
                            exit={{ 
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: { duration: 0.2 },
                                    opacity: { duration: 0.1 }
                                }
                            }}
                            className="origin-top"
                        >
                            <div className="px-5 pb-5">
                                {getContent()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MobileFiltersModal = ({
    isOpen,
    onClose,
    filterSections,
    setFilterSections,
    selectedFilters,
    handleFilterSelect,
    filterData,
    clearFilters
}: MobileFiltersModalProps) => {
    if (!isOpen) return null;

    const totalFilters = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-white"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-medium">Фільтри</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-180px)] p-4 space-y-4">
                    {filterSections.map((section) => (
                        <FilterSection
                            key={section.id}
                            title={section.title}
                            isOpen={section.isOpen}
                            onToggle={() => {
                                setFilterSections(prev => 
                                    prev.map(s => 
                                        s.id === section.id 
                                            ? { ...s, isOpen: !s.isOpen }
                                            : s
                                    )
                                );
                            }}
                            type={section.id}
                            selectedFilters={selectedFilters}
                            handleFilterSelect={handleFilterSelect}
                            filterData={filterData}
                        />
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                    <div className="flex gap-3">
                        <button
                            onClick={clearFilters}
                            className="flex-1 px-6 py-3 border border-gray-200 rounded-xl"
                        >
                            Очистити
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-black text-white rounded-xl"
                        >
                            Показати {totalFilters > 0 ? `(${totalFilters})` : ''}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function CatalogPage() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [filterSections, setFilterSections] = useState<FilterSection[]>([
        { id: 'status', title: 'Статус', isOpen: true },
        { id: 'price', title: 'Цінова категорія', isOpen: true },
        { id: 'age', title: 'Вік', isOpen: true },
        { id: 'type', title: 'Тип гри', isOpen: false },
        { id: 'players', title: 'Кількість гравців', isOpen: false }
    ]);

    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    const handleViewTypeChange = (type: 'grid' | 'list') => {
        setViewType(type);
    };

    const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
        status: [],
        type: [],
        players: [],
        age: [],
        duration: [],
    });
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    
    // Функция фильтрации
    const applyFilters = useCallback(() => {
        let result = [...products];

        // Фильтрация по статусу (в наличии/нет в наличии)
        if (selectedFilters.status.length > 0) {
            result = result.filter(product => {
                if (selectedFilters.status.includes('in-stock')) return product.inStock;
                if (selectedFilters.status.includes('out-stock')) return !product.inStock;
                return true;
            });
        }

        // Фильтрация по цене
        result = result.filter(product => 
            product.price >= priceRange.min && 
            product.price <= priceRange.max
        );

        // Фильтрация по типу игры
        if (selectedFilters.type.length > 0) {
            result = result.filter(product =>
                selectedFilters.type.some(type => product.type.toLowerCase().includes(type))
            );
        }

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'new':
                result = result.filter(p => p.isNew);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'reviews':
                result.sort((a, b) => b.reviews - a.reviews);
                break;
            default: // 'popular' и другие
                result.sort((a, b) => b.reviews * b.rating - a.reviews * a.rating);
        }

        setFilteredProducts(result);
    }, [selectedFilters, priceRange, sortBy]); // Добавляем зависимости

    // Применяем фильтры при изменении любого из параметров
    useEffect(() => {
        applyFilters();
    }, [selectedFilters, priceRange, sortBy, applyFilters]);

    const handleFilterSelect = (type: string, id: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(id)
                ? prev[type].filter(item => item !== id)
                : [...prev[type], id]
        }));
    };

    const clearFilters = () => {
        setSelectedFilters({
            status: [],
            type: [],
            players: [],
            age: [],
            duration: [],
        });
        setPriceRange({ min: 0, max: 2000 });
        setSortBy('popular');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="text-sm text-gray-500 mb-4">
                        Головна / Каталог
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <h1 className="text-2xl sm:text-4xl font-bold">
                            Каталог ігор
                        </h1>
                        <div className="flex gap-2 sm:gap-4 items-center">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl"
                            >
                                <FiFilter size={20} />
                                <span className="text-sm font-medium">Фільтри</span>
                                {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                                        {Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0)}
                                    </span>
                                )}
                            </button>

                            {/* View Type and Sort Controls */}
                            <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                                <button 
                                    onClick={() => handleViewTypeChange('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <FiGrid />
                                </button>
                                <button 
                                    onClick={() => handleViewTypeChange('list')}
                                    className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <FiList />
                                </button>
                            </div>
                            <div className="relative group">
                                <button 
                                    className="flex items-center gap-2 bg-white px-5 py-2 h-[50px] rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
                                    onClick={() => {
                                        const showSort = document.querySelector('.sort-dropdown');
                                        if (showSort) {
                                            showSort.classList.toggle('hidden');
                                        }
                                    }}
                                >
                                    <span className="text-sm">Сортування</span>
                                    <FiChevronDown className={`transition-transform`} />
                                </button>
                                
                                {/* Dropdown menu */}
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 sort-dropdown hidden">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors
                                                ${sortBy === option.value ? 'font-medium text-black' : 'text-gray-600'}`}
                                            onClick={() => {
                                                handleSortChange(option.value);
                                            }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
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
                        className="hidden lg:block absolute left-[360px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"
                    />

                    {/* Enhanced Filters */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="hidden lg:block w-[340px] flex-shrink-0"
                    >
                        <div className="sticky top-24 space-y-3 pr-8">
                            <div className="space-y-3">
                                {filterSections.map((section) => (
                                    <FilterSection
                                        key={section.id}
                                        title={section.title}
                                        isOpen={section.isOpen}
                                        onToggle={() => {
                                            setFilterSections(prev => 
                                                prev.map(s => 
                                                    s.id === section.id 
                                                        ? { ...s, isOpen: !s.isOpen }
                                                        : s
                                                )
                                            );
                                        }}
                                        type={section.id}
                                        selectedFilters={selectedFilters}
                                        handleFilterSelect={handleFilterSelect}
                                        filterData={filterData}
                                    />
                                ))}
                            </div>
                            
                            <button 
                                onClick={clearFilters}
                                className="w-full mt-4 px-6 py-3.5 bg-black text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                            >
                                <FiX size={20} />
                                Очистити фільтри
                                {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                                    <span className="bg-[#A7AA2E] text-white text-xs px-2 py-0.5 rounded-full ml-2">
                                        {Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 lg:pl-8" // Изменено: pl-8 только для десктопа
                    >
                        <div className={viewType === 'grid' 
                            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 h-full`
                            : 'space-y-4 h-full'
                        }>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <motion.div 
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="h-full"
                                    >
                                        {viewType === 'grid' ? (
                                            <Link href="/product" className="block group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
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
                                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                                                            <FiHeart size={18} className="text-gray-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                                        <span className="text-sm text-gray-500">
                                                            {product.inStock ? 'В наявності' : 'Немає в наявності'}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-lg">{product.price} ₴</span>
                                                            {product.oldPrice && (
                                                                <span className="text-sm text-gray-400 line-through">
                                                                    {product.oldPrice} ₴
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors">
                                                            <FiShoppingCart size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <Link href="/product" className="flex gap-6 p-4 group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                                                <div className="relative w-48 h-48 flex-shrink-0">
                                                    <div className="relative h-full rounded-xl overflow-hidden">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            className="group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    {/* Badges */}
                                                    <div className="absolute top-2 left-2 flex gap-2">
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
                                                </div>
                                                <div className="flex-1 flex flex-col py-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                                        <span className="text-sm text-gray-500">
                                                            {product.inStock ? 'В наявності' : 'Немає в наявності'}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex flex-col">
                                                            <span className="text-2xl font-bold">{product.price} ₴</span>
                                                            {product.oldPrice && (
                                                                <span className="text-sm text-gray-400 line-through">
                                                                    {product.oldPrice} ₴
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                                                                <FiHeart size={20} className="text-gray-600" />
                                                            </button>
                                                            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-2">
                                                                <FiShoppingCart size={20} />
                                                                <span>В кошик</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-12"
                                >
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-medium mb-2">
                                        Товари не знайдено
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Спробуйте змінити параметри фільтрації
                                    </p>
                                    <button 
                                        onClick={clearFilters}
                                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 
                                            rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Скинути фільтри
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Filters Modal */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <MobileFiltersModal
                        isOpen={isMobileFiltersOpen}
                        onClose={() => setIsMobileFiltersOpen(false)}
                        filterSections={filterSections}
                        setFilterSections={setFilterSections}
                        selectedFilters={selectedFilters}
                        handleFilterSelect={handleFilterSelect}
                        filterData={filterData}
                        clearFilters={clearFilters}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
