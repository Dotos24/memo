"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiCheckCircle, FiTruck, FiPackage, FiShield, FiMessageSquare, FiVideo, FiThumbsUp } from 'react-icons/fi';

const ProductPage = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [reviewType, setReviewType] = useState<'text' | 'video'>('text');
    
    // Add variants data and state
    const variants = [
        {
            id: 1,
            name: "Стандартна версія",
            price: 749,
            oldPrice: 849,
        },
        {
            id: 2,
            name: "Подарунковий набір",
            price: 949,
            oldPrice: 1099,
            features: [
                "Преміум упаковка",
                "Додаткові картки",
                "Паперовий блокнот"
            ]
        },
        {
            id: 3,
            name: "Колекційне видання",
            price: 1249,
            features: [
                "Лімітована версія",
                "Нумерований екземпляр",
                "Металева коробка",
                "Додаткові матеріали"
            ]
        }
    ];

    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const productInfo = {
        title: "Між Нами: Kids",
        reviews: 2158,
        mainImage: "/між_нами_kids-1-1024x1024.png",
        price: 749,
        oldPrice: 849,
        description: "Інструмент для глибоких розмов та покращення стосунків з дітьми",
        features: [
            { icon: FiCheckCircle, text: "Гра розроблена з метою викликати вдумливі та веселі розмови" },
            { icon: FiCheckCircle, text: "Передавайте цінні життєві уроки та зрозумійте, як Ваша дитина мислить" },
            { icon: FiCheckCircle, text: "150 особливих запитань, складених разом із психологами" },
            { icon: FiCheckCircle, text: "Ідеально для гри з дітьми 5-14 років" },
        ],
        bundles: [
            {
                id: 1,
                title: "Між Нами: Kids + Між Нами: про любов",
                originalPrice: 1598,
                discountedPrice: 1423.1,
                saving: 174.9,
                items: [
                    {
                        name: "Між Нами: Kids",
                        price: 749,
                        oldPrice: 849,
                        image: "/не_пяні_кохані-1-1024x1024.webp"
                    },
                    {
                        name: "Між Нами: про любов",
                        price: 674.1,
                        oldPrice: 749,
                        discount: 10,
                        image: "/між_нами_про_любов_1-1-300x300.webp"
                    }
                ]
            },
        ],
        benefits: [
            { 
                icon: FiTruck, 
                title: "Доставка", 
                text: "1-3 робочі дні" 
            },
            {
                icon: FiPackage,
                title: "Безкоштовна доставка",
                text: "від 1800 грн"
            },
            {
                icon: FiShield,
                title: "Легкий обмін/повернення",
                text: "30 днів гарантії"
            }
        ],
    };

    const productImages = [
        { url: "/між_нами_про_любов_1-1-300x300.webp", alt: "Між Нами 1" },
        { url: "/між_нами_про_любов_2-1-1024x1024.webp", alt: "Між Нами 2" },
    ];

    const [selectedImage, setSelectedImage] = useState(productImages[0].url);

    const textReviews = [
        {
            id: 1,
            author: "Олена К.",
            rating: 5,
            date: "15.03.2024",
            content: "Чудова гра для спілкування з дитиною! Допомагає краще зрозуміти її внутрішній світ та переживання.",
            likes: 12,
            avatar: "/avatars/user1.jpg"
        },
        {
            id: 2,
            author: "Михайло В.",
            rating: 5,
            date: "12.03.2024",
            content: "Граємо з донькою вже місяць. Кожного разу відкриваємо щось нове про одне одного. Дуже якісні матеріали та продумані питання.",
            likes: 8,
            avatar: "/avatars/user2.jpg"
        }
    ];

    const videoReviews = [
        {
            id: 1,
            author: "Родина Петренків",
            thumbnail: "https://img.youtube.com/vi/DEMO_VIDEO_1/maxresdefault.jpg",
            videoUrl: "https://youtube.com/watch?v=DEMO_VIDEO_1",
            rating: 5,
            views: 1200
        },
        {
            id: 2,
            author: "Світлана з донькою",
            thumbnail: "https://img.youtube.com/vi/DEMO_VIDEO_2/maxresdefault.jpg",
            videoUrl: "https://youtube.com/watch?v=DEMO_VIDEO_2",
            rating: 5,
            views: 890
        }
    ];

    interface BundleItem {
        name: string;
        price: number;
        oldPrice?: number;
        discount?: number;
        image: string;
    }

    interface Bundle {
        id: number;
        title: string;
        originalPrice: number;
        discountedPrice: number;
        saving: number;
        items: BundleItem[];
    }

    const BundleOffer = ({ bundle }: { bundle: Bundle }) => (
        <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
                {bundle.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {index < bundle.items.length - 1 && (
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">
                                <span className="text-gray-400">+</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{bundle.discountedPrice} ₴</span>
                        <span className="text-gray-400 line-through">{bundle.originalPrice} ₴</span>
                    </div>
                    <div className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        Економія {bundle.saving} ₴
                    </div>
                </div>
                <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors">
                    Додати комплект
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm mb-8 text-gray-500">
                    <span>Головна</span>
                    <span>/</span>
                    <span>Каталог</span>
                    <span>/</span>
                    <span className="text-black dark:text-white">{productInfo.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column - Product Information */}
                    <div className="lg:w-[60%] space-y-6">
                        {/* Image Gallery */}
                        <div className="space-y-2">
                            <motion.div 
                                className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Image
                                    src={selectedImage}
                                    alt="Product image"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            {/* Thumbnails */}
                            <div className="grid grid-cols-6 gap-2">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image.url)}
                                        className={`relative aspect-[16/10] rounded-lg overflow-hidden ${
                                            selectedImage === image.url 
                                                ? 'ring-2 ring-black dark:ring-white' 
                                                : 'hover:opacity-75'
                                        }`}
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="prose dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Опис продукту</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {productInfo.description}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {productInfo.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                                    <feature.icon className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium dark:text-white">{feature.text}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-12">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Відгуки покупців</h2>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                                    <button
                                        onClick={() => setReviewType('text')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            reviewType === 'text' 
                                                ? 'bg-white dark:bg.gray-700 shadow-sm' 
                                                : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <FiMessageSquare />
                                        <span>Текстові</span>
                                    </button>
                                    <button
                                        onClick={() => setReviewType('video')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            reviewType === 'video' 
                                                ? 'bg-white dark:bg.gray-700 shadow-sm' 
                                                : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <FiVideo />
                                        <span>Відео</span>
                                    </button>
                                </div>
                            </div>

                            {reviewType === 'text' ? (
                                <div className="space-y-6">
                                    {textReviews.map((review) => (
                                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                        <Image
                                                            src={review.avatar}
                                                            alt={review.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{review.author}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                                ))}
                                                            </div>
                                                            <span>•</span>
                                                            <span>{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                                                    <FiThumbsUp />
                                                    <span>{review.likes}</span>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-6">
                                    {videoReviews.map((review) => (
                                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                                            <div className="relative aspect-video">
                                                <Image
                                                    src={review.thumbnail}
                                                    alt={review.author}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 shadow-lg">
                                                        <FiVideo className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-medium mb-2">{review.author}</h4>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                        ))}
                                                    </div>
                                                    <span>{review.views} переглядів</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Purchase Information - Updated */}
                    <div className="lg:w-[35%] lg:border-l lg:pl-8"> {/* Changed width and padding */}
                        <div className={`space-y-6 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}> {/* Reduced spacing */}
                            <div>
                                <h1 className="text-2xl font-bold mb-3 dark:text-white"> {/* Reduced text size */}
                                    {productInfo.title}
                                </h1>
                                <div className="flex items-center gap-3 mb-4"> {/* Reduced spacing */}
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {productInfo.reviews} відгуків
                                    </span>
                                </div>
                                <span className="text-4xl font-bold">{selectedVariant.price} ₴</span>
                            </div>

                            {/* Комплект Section - Replaced Variants */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Комплект включає:</span>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm">
                                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                        <span>150 унікальних карток</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                        <span>Інструкція з правилами</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm">
                                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                        <span>Подарункова упаковка</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                {productInfo.bundles.map((bundle) => (
                                    <BundleOffer key={bundle.id} bundle={bundle} />
                                ))}
                            </div>

                            {/* Purchase Buttons */}
                            <div className="flex gap-3"> {/* Reduced gap */}
                                <button className="flex-1 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                                    <FiShoppingCart className="w-5 h-5" />
                                    Додати в кошик
                                </button>
                                <button className="p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600">
                                    <FiHeart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Benefits - More Compact */}
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                {productInfo.benefits.map((benefit, i) => (
                                    <div key={i} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                        <benefit.icon className="w-5 h-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                                        <h3 className="text-sm font-medium mb-1 dark:text-white">{benefit.title}</h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{benefit.text}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
