"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState('/images/screenshot1.png');

    const images = [
        '/images/screenshot1.png',
        '/images/screenshot2.png',
        '/images/screenshot3.png'
    ];

    return (
        <div className="bg-gray-100 text-black min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center md:w-1/2">
                    <div className="relative w-full h-80 bg-gray-200 mb-4 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={selectedImage}
                            alt="Selected Screenshot"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="flex gap-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`relative w-20 h-20 bg-gray-200 cursor-pointer rounded-lg overflow-hidden shadow-md ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image}
                                    alt={`Screenshot ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2">
                    <p className="text-sm text-blue-800 mb-4">Games catalog &gt; Між Нами: &gt; про любов 2.0</p>
                    <h1 className="text-4xl font-bold mb-6">Між Нами: про любов 2.0</h1>
                    <p className="text-lg bg-red-400 px-3 py-1 rounded inline-block mb-4">Гра для пар</p>
                    <p className="text-gray-700 mb-8">
                        Це настільна гра, яка допоможе вам краще пізнати один одного, зміцнити ваші стосунки та провести незабутній час разом.
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-green-400 px-4 py-2 text-sm font-medium rounded-lg shadow-md border border-green-500">123333</span>
                        <div className="flex gap-2 flex-wrap">
                            <span className="bg-blue-200 px-3 py-1 text-sm rounded-lg shadow-md border border-blue-300">150 нових запитань, які розкриють глибину ваших почуттів та зміцнять емоційний зв'язок у парі</span>
                            <span className="bg-blue-200 px-3 py-1 text-sm rounded-lg shadow-md border border-blue-300">Ідеально підійде для людей, які довго у стосунках</span>
                            <span className="bg-blue-200 px-3 py-1 text-sm rounded-lg shadow-md border border-blue-300">Інвестиція у ваше спільне майбутнє, побудоване на довірі та розумінні</span>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-8">Інструмент для побудови міцних стосунків у парі</p>
                    {/* Player Rating */}
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-yellow-400">
                            <span className="text-2xl font-bold">5.0</span>
                            <span>★</span>
                        </span>
                        <span className="text-gray-500">8 Відгуків</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
