"use client"
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { FiHeart, FiUsers, FiSmile, FiGlobe, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const AboutPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    const stats = [
        { icon: FiHeart, value: "50000+", label: "Щасливих клієнтів" },
        { icon: FiUsers, value: "15+", label: "Країн присутності" },
        { icon: FiSmile, value: "98%", label: "Задоволених користувачів" },
        { icon: FiGlobe, value: "5+", label: "Років на ринку" }
    ];

    const teamMembers = [
        {
            image: "/Us/IMG_0455-scaled.jpg",
            role: "Креативний директор",
            quote: "Створюємо ігри, що об'єднують серця"
        },
        {
            image: "/Us/IMG_0456-scaled.jpg",
            role: "Дизайн команда",
            quote: "Кожна деталь має значення"
        },
        {
            image: "/Us/IMG_0510-scaled.jpg",
            role: "Розробка",
            quote: "Інновації у кожному проекті"
        }
    ];

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

    return (
        <div ref={containerRef} className="relative">
            {/* Hero Section with Parallax */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://memogames.com.ua/wp-content/uploads/2024/06/2560%D1%851467-2.jpg"
                        alt="Memo Games Hero"
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>

            </div>

            {/* Harvard Research Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Згідно доcлідження <span className="text-blue-600 font-medium">Гарвардського університету</span>, 
                            яке триває понад <span className="text-blue-600 font-medium">75 років</span>, було виявлено, 
                            що саме <span className="text-blue-600 font-medium">хороші стосунки</span> та 
                            <span className="text-blue-600 font-medium"> спілкування</span> між людьми найбільше впливають 
                            на наше почуття <span className="text-blue-600 font-medium">щастя</span> та дарують секрет 
                            довгого, сповненого сенсу життя.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission, Vision, Slogan Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="space-y-16">
                        {/* Mission */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            <div className="text-2xl font-bold">МІСІЯ</div>
                            <div className="text-xl">
                                ПОКРАЩУВАТИ СТОСУНКИ МІЖ ЛЮДЬМИ ЗА ДОПОМОГОЮ НАШИХ ПРОДУКТІВ.
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            <div className="text-2xl font-bold">ВІЗІЯ</div>
                            <div className="text-xl">
                                НАШІ ІГРИ ЩОДНЯ ПОКРАЩУЮТЬ СТОСУНКИ МІЖ ЛЮДЬМИ У 100 КРАЇНАХ СВІТУ, 
                                РОБЛЯЧИ ЇХ ЩАСЛИВІШИМИ
                            </div>
                        </motion.div>

                        {/* Slogan */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            <div className="text-2xl font-bold">СЛОГАН</div>
                            <div className="text-xl">
                                СПІЛКУВАННЯ – КЛЮЧ ДО УСЬОГО.
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold">Наша місія</h2>
                            <p className="text-xl text-gray-600">
                                Ми віримо, що якісне спілкування - це ключ до щасливого життя. 
                                Наша мета - створювати інструменти, які допомагають людям 
                                краще розуміти одне одного та будувати міцніші стосунки.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="https://memogames.com.ua/wp-content/uploads/2024/06/2560%D1%851467-3.jpg"
                                alt="Our mission"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div className="max-w-2xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold mb-6">НЕ КІЛЬКІСТЬ, А ЯКІСТЬ</h2>
                        <p className="text-gray-600">
                            Так, зараз мова про нашу команду. Кожен з унікальними рішеннями,
                            ідеями та баченнями. Усі різні, але кожен важливий. Без тих, кого ви
                            бачите на фото не було б Memo Games.
                        </p>
                    </motion.div>

                    {/* Original Slider Implementation */}
                    <div className="relative max-w-7xl mx-auto">
                        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                            <div className="flex">
                                {teamMembers.map((member, index) => (
                                    <div 
                                        key={index} 
                                        className="flex-[0_0_33.333%] min-w-0 relative h-[400px] md:h-[500px] px-2"
                                    >
                                        <div 
                                            className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
                                            onClick={() => {
                                                setFullscreenImage(member.image);
                                                setCurrentImageIndex(index);
                                            }}
                                        >
                                            <Image
                                                src={member.image}
                                                alt={member.role}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-white text-lg font-medium">
                                                    {member.quote}
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
            </section>

            {/* Values Section */}
            <section className="py-24 bg-black text-white">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold mb-8">Наші цінності</h2>
                        <p className="text-xl text-gray-300 mb-12">
                            Ми віримо в силу людських зв'язків та прагнемо зробити світ трохи кращим 
                            через meaningful conversations та якісне спілкування.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-colors"
                        >
                            Приєднуйтесь до нас
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {fullscreenImage && (
                    <motion.div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="relative w-full max-w-4xl mx-auto p-4">
                            <button 
                                className="absolute top-4 right-4 text-white text-2xl"
                                onClick={() => setFullscreenImage(null)}
                            >
                                <FiX />
                            </button>
                            <Image
                                src={fullscreenImage}
                                alt="Fullscreen"
                                fill
                                className="object-contain"
                            />
                            <div className="absolute inset-0 flex items-center justify-between p-4">
                                <button 
                                    onClick={() => setCurrentImageIndex((currentImageIndex - 1 + teamMembers.length) % teamMembers.length)}
                                    className="text-white text-2xl"
                                >
                                    <FiChevronLeft />
                                </button>
                                <button 
                                    onClick={() => setCurrentImageIndex((currentImageIndex + 1) % teamMembers.length)}
                                    className="text-white text-2xl"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutPage;