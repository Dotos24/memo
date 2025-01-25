"use client"
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const teamImages = [
    { 
        src: '/Us/IMG_0455-scaled.jpg', 
        alt: 'Team member 1',
        caption: 'Розробка нових ігор'
    },
    { 
        src: '/Us/IMG_0456-scaled.jpg', 
        alt: 'Team member 2',
        caption: 'Креативна команда'
    },
    { 
        src: '/Us/IMG_0510-scaled.jpg', 
        alt: 'Team member 3',
        caption: 'Робочий процес'
    },
    { 
        src: '/Us/IMG_0511-scaled.jpg', 
        alt: 'Team member 4',
        caption: 'Наша команда'
    }
];

const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * index,
            duration: 0.5,
            ease: "easeOut"
        }
    }),
    hover: {
        y: -2,
        transition: {
            duration: 0.3
        }
    }
};

const sentenceAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

export default function AboutPage() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        dragFree: true,
        align: "center",
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
    });

    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const handleFullscreenNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        const nextIndex = (currentImageIndex + 1) % teamImages.length;
        setCurrentImageIndex(nextIndex);
        setFullscreenImage(teamImages[nextIndex].src);
    }, [currentImageIndex]);

    const handleFullscreenPrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        const prevIndex = (currentImageIndex - 1 + teamImages.length) % teamImages.length;
        setCurrentImageIndex(prevIndex);
        setFullscreenImage(teamImages[prevIndex].src);
    }, [currentImageIndex]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setFullscreenImage(null);
        } else if (e.key === 'ArrowRight') {
            handleFullscreenNext();
        } else if (e.key === 'ArrowLeft') {
            handleFullscreenPrev();
        }
    }, [handleFullscreenNext, handleFullscreenPrev]);

    useEffect(() => {
        if (fullscreenImage) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [fullscreenImage, handleKeyDown]);

    const text = "Згідно доcлідження Гарвардського університету, яке триває понад 75 років, було виявлено, що саме хороші стосунки та спілкування між людьми найбільше впливають на наше почуття щастя та дарують секрет довгого, сповненого сенсу життя.";
    const words = text.split(" ");

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="container py-24 relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-20" />
                        <div className="absolute top-1/2 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-20" />
                        <div className="absolute bottom-0 left-1/3 w-16 h-16 bg-blue-100 rounded-full opacity-20" />
                    </div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-3xl mx-auto text-center space-y-6 relative"
                    >
                        <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ 
                                    scale: 1,
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }
                                }}
                                className="relative"
                            >
                                <p className="text-gray-700 text-xl leading-relaxed">
                                    {words.map((word, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={sentenceAnimation}
                                            initial="hidden"
                                            animate="visible"
                                            className={`inline-block mx-0.5 ${
                                                word.includes('Гарвардського') || 
                                                word.includes('75') || 
                                                word.includes('стосунки') || 
                                                word.includes('спілкування') || 
                                                word.includes('щастя') 
                                                ? 'text-blue-600 font-medium' 
                                                : ''
                                            }`}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </p>
                            </motion.div>
                            <motion.div 
                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 96, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Mission & Vision Section */}
                <div className="bg-black text-white py-24">
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-16">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">МІСІЯ</h2>
                                <p className="text-gray-300 text-lg">
                                    ПОКРАЩУВАТИ СТОСУНКИ МІЖ ЛЮДЬМИ ЗА ДОПОМОГОЮ НАШИХ ПРОДУКТІВ.
                                </p>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold">ВІЗІЯ</h2>
                                <p className="text-gray-300 text-lg">
                                    НАШІ ІГРИ ЩОДНЯ ПОКРАЩУЮТЬ СТОСУНКИ МІЖ ЛЮДЬМИ У 100 КРАЇНАХ СВІТУ, 
                                    РОБЛЯЧИ ЇХ ЩАСЛИВІШИМИ
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Slogan Section */}
                <div className="container py-24">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                            СПІЛКУВАННЯ – КЛЮЧ ДО УСЬОГО.
                        </h2>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="bg-gray-50 py-24">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">НЕ КІЛЬКІСТЬ, А ЯКІСТЬ</h2>
                            <p className="text-gray-600">
                                Так, зараз мова про нашу команду. Кожен з унікальними рішеннями,
                                ідеями та баченнями. Усі різні, але кожен важливий. Без тих, кого ви
                                бачите на фото не було б Memo Games.
                            </p>
                        </div>

                        {/* Team Slider */}
                        <div className="relative max-w-7xl mx-auto">
                            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                                <div className="flex">
                                    {teamImages.map((image, index) => (
                                        <div 
                                            key={index} 
                                            className="flex-[0_0_33.333%] min-w-0 relative h-[400px] md:h-[500px] px-2"
                                        >
                                            <div 
                                                className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
                                                onClick={() => {
                                                    setFullscreenImage(image.src);
                                                    setCurrentImageIndex(index);
                                                }}
                                            >
                                                <Image
                                                    src={image.src}
                                                    alt={image.alt}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    priority={index === 0}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <p className="text-white text-lg font-medium">
                                                        {image.caption}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slider Controls */}
                            <button 
                                onClick={scrollPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                            >
                                <FiChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={scrollNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                            >
                                <FiChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {fullscreenImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                        onClick={() => setFullscreenImage(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                            onClick={() => setFullscreenImage(null)}
                        >
                            <FiX size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button 
                            onClick={handleFullscreenPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white"
                        >
                            <FiChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={handleFullscreenNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white"
                        >
                            <FiChevronRight size={24} />
                        </button>

                        <div className="relative w-[90vw] h-[90vh]" onClick={e => e.stopPropagation()}>
                            <motion.div
                                key={fullscreenImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={fullscreenImage}
                                    alt={teamImages[currentImageIndex].alt}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}