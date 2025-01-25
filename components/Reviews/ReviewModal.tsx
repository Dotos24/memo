"use client";

import { useState } from 'react';
import { FiX, FiStar, FiUpload } from 'react-icons/fi';

interface ReviewData {
    rating: number;
    review: string;
    name: string;
    email: string;
    selectedFile: File | null;
}

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reviewData: ReviewData) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, review, name, email, selectedFile });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Написати відгук</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-gray-500 text-sm mb-6">
                    Ваша e-mail адреса не оприлюднюватиметься. Обов'язкові поля позначені *
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block mb-2 font-medium">Рейтинг</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none"
                                >
                                    <FiStar
                                        className={`w-8 h-8 ${
                                            (hoveredRating || rating) >= star
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Ваш відгук <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Що ви думаєте про цю гру?"
                            className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black transition-all resize-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block mb-2 font-medium">Виберіть фото</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                <FiUpload className="w-5 h-5" />
                                <span>Обрати файл</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                />
                            </label>
                            <span className="text-sm text-gray-500">
                                {selectedFile ? selectedFile.name : "Файл не выбран"}
                            </span>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Ваше ім&apos;я <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black transition-all"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
                        >
                            Відправити відгук
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
