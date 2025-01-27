"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Support from '@/components/Support/Support';

export default function CooperationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const sections = [
    {
      title: "Хочете стати нашими партнерами?",
      image: "/2P5A1549-1-1-scaled-e1692195150167-1024x1019.jpg", // Updated image path
      content: (
        <div className="space-y-4 mb-8 text-gray-600">
          <p>
            Надішліть свою пропозицію: <a href="mailto:sales@memogames.com.ua" className="text-blue-600 hover:underline">sales@memogames.com.ua</a>
          </p>
          <p>
            Телеграм (гурт): <a href="https://t.me/memogames_ua" className="text-blue-600 hover:underline">@memogames_ua</a>
          </p>
          <p className="mt-4">
            Ми відкриті до співпраці та нових партнерств. Наші товари представлені у магазинах подарунків, 
            книжкових мережах, бутіках одягу, квіткових крамницях, кав'ярнях, ресторанах...
          </p>
        </div>
      ),
      buttonText: "ОТРИМАТИ ГУРТОВИЙ ПРАЙС",
      imagePosition: "right" // Image on right, text on left
    },
    {
      title: "Корпоративні Подарунки",
      image: "/50.png", // Same image as hero
      content: (
        <div className="space-y-4 mb-8 text-gray-600">
          <p>
            Наша компанія з радістю допоможе підібрати подарунок для Ваших колег чи команди...
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Є можливість додати брендування Вашої компанії (від 100 шт.)</li>
            <li>Корпоративне замовлення від 20 шт</li>
            <li>Терміни узгоджуються індивідуально</li>
          </ul>
        </div>
      ),
      buttonText: "ЗРОБИТИ КОРПОРАТИВНЕ ЗАМОВЛЕННЯ",
      imagePosition: "left" // Image on left, text on right
    }
  ];

  return (
    <>
      <Support />
      <Header />
      {/* Added Top Banner */}
      <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center text-center"
          >
            <p className="text-sm md:text-base">
              Отримайте <span className="font-semibold">знижку 20%</span> на перше корпоративне замовлення! 🎉
            </p>
          </motion.div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          {/* Updated Hero Section with Parallax */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden mb-16"
          >
            <Image
              src="/50.png"
              alt="Cooperation Hero"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain md:object-cover"
              quality={100}
            />
            <div className="absolute inset-0  bg-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-white max-w-3xl px-8 py-6 rounded-2xl "
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                  Звʼяжіться з нами
                </h1>
                <p className="text-lg md:text-xl text-gray-100 drop-shadow-lg">
                  Ми відкриті до співпраці та нових партнерств
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Sections */}
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-none mx-auto mb-16" // Removed container width constraint
            >
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2 items-center">
                  {section.imagePosition === "right" ? (
                    <>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Text content */}
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-3xl font-bold mb-6"
                        >
                          {section.title}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          {section.content}
                        </motion.div>
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors w-fit"
                        >
                          {section.buttonText}
                        </motion.button>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-full min-h-[400px]"
                      >
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-full min-h-[400px]"
                      >
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Text content */}
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-3xl font-bold mb-6"
                        >
                          {section.title}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          {section.content}
                        </motion.div>
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors w-fit"
                        >
                          {section.buttonText}
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.section>
          ))}

          {/* Contact Form Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-none mx-auto" // Changed from max-w-4xl to max-w-none
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Маєте інші пропозиції або ідеї?</h2>
                  <p className="mb-8 text-gray-600">
                    Надішліть свою пропозицію: <a href="mailto:sales@memogames.com.ua" className="text-blue-600 hover:underline">sales@memogames.com.ua</a>
                    <br />Або заповніть анкету
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Ваше ім'я
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Ваше ім'я"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="+380 (99) 999-99-99"
                      />
                    </div>
                  </form>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Який напрям представляєте?
                    </label>
                    <div className="space-y-2">
                      {['інтернет-магазин', 'офлайн-магазин', 'інше'].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="mr-2"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Коментар
                    </label>
                    <textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent"
                      rows={4}
                      placeholder="Коментар"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiSend size={20} />
                    Надіслати анкету
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
