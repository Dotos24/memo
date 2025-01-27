"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiImage, FiVideo } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import ReviewModal from '../Reviews/ReviewModal';

interface Review {
    id: number;
    author: string;
    rating: number;
    date: string;
    content: string;
    likes: number;
    avatar: string;
    images?: string[];
    verified?: boolean;
}

interface ReviewData {
    rating: number;
    review: string;
    name: string;
    email: string;
    selectedFile: File | null;
}

interface ReviewsProps {
    showAll?: boolean;
}

export const Reviews = ({ showAll = false }: ReviewsProps) => {
    const [selectedTab, setSelectedTab] = useState<'all' | 'photo' | 'video'>('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReviewSubmit = (reviewData: ReviewData) => {
        console.log('Review submitted:', reviewData);
        // Здесь будет логика отправки отзыва на сервер
        setIsModalOpen(false);
    };

    const reviews: Review[] = [
        {
            id: 1,
            author: "Олена К.",
            rating: 5,
            date: "15.03.2024",
            content: "Чудова гра для спілкування з дитиною! Допомагає краще зрозуміти її внутрішній світ та переживання.",
            likes: 12,
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            verified: true,
            images: ["/coments/5413741302798999720-376x500.jpg"]
        },
        {
            id: 2,
            author: "Михайло В.",
            rating: 5,
            date: "12.03.2024",
            content: "Граємо з донькою вже місяць. Дуже якісні матеріали та продумані питання.",
            likes: 8,
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            verified: true,
        },
        {
            id: 3,
            author: "Анна П.",
            rating: 4,
            date: "10.03.2024",
            content: "Відмінний спосіб провести час з користю. Діти в захваті!",
            likes: 15,
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            images: ["/coments/5269247264247900117-500x375.jpg"]
        },
        {
            id: 4,
            author: "Ірина М.",
            rating: 5,
            date: "05.03.2024",
            content: "Рекомендую всім батькам. Дуже цікаві питання, які справді зближують.",
            likes: 21,
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            verified: true
        },
        {
            id: 5,
            author: "Дмитро С.",
            rating: 5,
            date: "01.03.2024",
            content: "Використовуємо під час сімейних вечорів. Чудовий формат для спілкування.",
            likes: 9,
            avatar: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        {
            id: 6,
            author: "Марія К.",
            rating: 4,
            date: "28.02.2024",
            content: "Якісне виконання, гарна упаковка. Донька дуже задоволена.",
            likes: 11,
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            images: ["/coments/5249005972440083017-334x500.jpg"]
        }
    ];

    const router = useRouter();
    const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-8 sm:py-16"
        >
            <div className="container mx-auto px-4">
                {/* Header - показываем только на странице продукта */}
                {!showAll && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Відгуки покупців</h2>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <span className="text-base sm:text-lg font-medium">4.9</span>
                                <span className="text-sm sm:text-base text-gray-500">(123 відгуки)</span>
                            </div>
                        </div>
                            <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-5'>
                                <button 
                                    onClick={() => router.push('/reviews')}
                                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all text-sm sm:text-base"
                                >
                                    Перейти до всіх
                                </button>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="w-full sm:w-auto px-6 py-3 bg-[#A7AA2E] text-white rounded-xl hover:bg-gray-900 transition-all text-sm sm:text-base"
                            >
                                Написати відгук
                            </button>
                            </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide pb-2">
                    <button
                        onClick={() => setSelectedTab('all')}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                            selectedTab === 'all' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        Всі відгуки
                    </button>
                    <button
                        onClick={() => setSelectedTab('photo')}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                            selectedTab === 'photo' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        <FiImage className="w-4 sm:w-5 h-4 sm:h-5" />
                        З фото
                    </button>
                    <button
                        onClick={() => setSelectedTab('video')}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                            selectedTab === 'video' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        <FiVideo className="w-4 sm:w-5 h-4 sm:h-5" />
                        З відео
                    </button>
                </div>

                {/* Updated Reviews Grid для горизонтального отображения */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {displayedReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-xl p-4 sm:p-6 border border-gray-100 h-full"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                                        <Image
                                            src={review.avatar}
                                            alt={review.author}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                        {review.verified && (
                                            <div className="absolute -right-1 -bottom-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                                <svg className="w-1.5 sm:w-2 h-1.5 sm:h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-xs sm:text-sm">{review.author}</h4>
                                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <FiStar key={i} className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <span>•</span>
                                            <span>{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                                {review.content}
                            </p>

                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                    {review.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(image)}
                                            className="relative w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={image}
                                                alt={`Review image ${index + 1}`}
                                                fill
                                                className="object-cover hover:opacity-90 transition-opacity"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <button className="hover:text-gray-700">
                                        <FiStar className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                                    </button>
                                    <span>{review.likes}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleReviewSubmit}
                />
            </div>
            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    >
                        <div className="relative max-w-4xl max-h-[90vh]">
                            <Image
                                src={selectedImage}
                                alt="Review image"
                                width={800}
                                height={600}
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Reviews;
