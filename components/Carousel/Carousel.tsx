"use client"
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const images = [
    {
        id: 1,
        url: "/carousel/1.png",
        alt: "Між нами фото 1"
    },
    {
        id: 2,
        url: "/carousel/2.png",
        alt: "Між нами фото 2"
    },
    {
        id: 3,
        url: "/carousel/3.png",
        alt: "Між нами фото 3"
    },
];

const products = [
    {
        id: 1,
        title: "Між Нами: Kids",
        description: "Покращіть спілкування з вашою дитиною",
        price: 749,
        image: "/між_нами_про_любов_2-1-1024x1024.webp",
        badge: ""
    }
];

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        
        // Автопрокрутка
        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => {
            emblaApi.off('select', onSelect);
            clearInterval(autoplay);
        };
    }, [emblaApi, onSelect]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-10 pb-16"
        >
            <div className="container mx-auto px-4">
                <div className="flex gap-4">
                    {/* Main Carousel - Increased width */}
                    <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative flex-[2]"
                    >
                        <div className="overflow-hidden h-[700px] rounded-2xl" ref={emblaRef}>
                            <div className="flex h-full">
                                {images.map((image) => (
                                    <div 
                                        key={image.id} 
                                        className="flex-[0_0_100%] min-w-0 relative h-full"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.alt}
                                            fill
                                            priority
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={scrollPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
                        >
                            <FiChevronLeft size={24} className="text-white" />
                        </button>

                        <button
                            onClick={scrollNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
                        >
                            <FiChevronRight size={24} className="text-white" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        selectedIndex === index 
                                            ? 'bg-white w-4' 
                                            : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Modified Product Card */}
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex-1"
                    >
                        <div className="h-[700px]">
                            {products.map((product) => (
                                <div 
                                    key={product.id}
                                    className="relative h-full overflow-hidden rounded-2xl bg-black group"
                                >
                                    {product.badge && (
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 top-0 p-8 z-20">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-3 text-white">{product.title}</h3>
                                            <p className="text-xl text-gray-300">{product.description}</p>
                                            <div className="mt-4">
                                                <span className="text-3xl font-bold text-white">{product.price} ₴</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-[85%] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black z-10" />
                                        {/* Размытая копия для свечения */}
                                        <div className="absolute inset-0 scale-[2] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-[1]">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        {/* Основное изображение */}
                                        <div className="absolute inset-0 scale-[1.7] origin-top transition-all duration-500 ease-out group-hover:scale-[1.1] rotate-[0.1rad] group-hover:rotate-[0.0rad] z-[2]">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Carousel;
