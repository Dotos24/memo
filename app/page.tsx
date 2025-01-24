"use client";

import Support from "@/components/Support/Support";
import Header from "@/components/Header/Header";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiHeart, FiStar, FiUsers, FiShield, FiPackage } from 'react-icons/fi';
import { useState, useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      <Support />
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={containerRef} 
        className="relative min-h-screen bg-[#f8f8f8] dark:bg-gray-900 pt-20 overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        <div className="container relative">
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center text-center pt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[clamp(2rem,15vw,8rem)] font-black leading-none tracking-tight"
            >
              <span className="block">Картки</span>
              <span className="">
                для спілкування
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
            >
              Унікальні настільні ігри для глибшого спілкування та незабутніх моментів з близькими
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/catalog"
                className="group relative px-12 py-4 bg-black text-white rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  Перейти до каталогу
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  initial={{ left: "-100%" }}
                  whileHover={{ left: "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 support-gradient"
                />
              </Link>
            </motion.div>
          </div>

          {/* Floating Cards */}
          <div className="relative mt-20 mb-40 h-[40vh] mx-auto max-w-5xl">
            <motion.div 
              style={{ scale, y }}
              className="grid grid-cols-3 gap-8 absolute inset-x-0"
            >
              {[
                { image: "/carousel/Frame-65-e1726148065935.webp", rotate: -10 },
                { image: "/між_нами_про_любов_1-1-300x300.webp", rotate: 5 },
                { image: "/не_пяні_кохані-1-1024x1024.webp", rotate: -5 }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  style={{ rotate: useTransform(scrollYProgress, [0, 1], [card.rotate, card.rotate * -1]) }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={card.image}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center"
          >
            {[
              { value: "2000+", label: "Щасливих родин" },
              { value: "4.9", label: "Рейтинг на платформі" },
              { value: "10000+", label: "Продано ігор" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-black">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Популярні ігри</h2>
            <p className="text-gray-600 dark:text-gray-300">Оберіть свій спосіб покращити стосунки</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Між Нами: Kids",
                image: "/між_нами_kids-1-1024x1024.png",
                price: 749,
                rating: 4.9,
                reviews: 158
              },
              {
                title: "Між Нами: Про любов",
                image: "/між_нами_про_любов_1-1-300x300.webp",
                price: 849,
                rating: 4.8,
                reviews: 142
              },
              {
                title: "Між Нами: Батьки",
                image: "/не_пяні_кохані-1-1024x1024.webp",
                price: 799,
                rating: 4.9,
                reviews: 96
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-medium text-lg">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{product.price} ₴</span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{product.rating} ({product.reviews})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiUsers,
                title: "Створено експертами",
                description: "Розроблено спільно з психологами та сімейними консультантами"
              },
              {
                icon: FiShield,
                title: "Гарантія якості",
                description: "Високоякісні матеріали та детальна перевірка кожного екземпляру"
              },
              {
                icon: FiPackage,
                title: "Швидка доставка",
                description: "Відправляємо в день замовлення по всій Україні"
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-[#5090b2]" />
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
