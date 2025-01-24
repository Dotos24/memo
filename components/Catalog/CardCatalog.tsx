"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CardCatalogProps {
  slug: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  isAvailable?: boolean;
}

const CardCatalog = ({
  slug,
  title = "Між Нами: про любов 2.0",
  price = 849,
  oldPrice,
  image = "/між_нами_про_любов_1-1-300x300.webp",
  isNew = true,
  isAvailable = true,
}: CardCatalogProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/50 backdrop-blur-sm rounded-3xl border border-black/5 overflow-hidden transition-all hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        {/* Status Indicators */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <span className="px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs tracking-wide uppercase rounded-full">
              New
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-end opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="space-y-1">
            <h3 className="font-medium text-lg text-white drop-shadow-sm line-clamp-1">
              {title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-white">{price} ₴</span>
              {oldPrice && (
                <span className="text-sm text-white/70 line-through">
                  {oldPrice} ₴
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-medium text-lg leading-tight line-clamp-2">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold">{price} ₴</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {oldPrice} ₴
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/products/${slug}`}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors group-hover:bg-black group-hover:text-white"
      >
        Перейти
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};

export default CardCatalog;
