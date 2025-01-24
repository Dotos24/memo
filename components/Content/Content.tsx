"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const Content = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Carousel */}
        <div className="h-[700px] lg:h-[700px] rounded-[2rem] overflow-hidden relative bg-black/5 backdrop-blur-sm border border-white/10">
          <div ref={emblaRef} className="h-full">
            <div className="flex h-full">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image
                    src={`/carousel/Frame-${index === 0 ? '65' : index === 1 ? '98' : '116'}-e1726148065935.webp`}
                    alt={`Carousel image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      Між Нами {index + 1}.0
                    </h3>
                    <p className="text-white/80">
                      Ігри для особливих моментів
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <FiChevronLeft size={24} className="text-white" />
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <FiChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          {/* Hero Section */}
          <div className="h-[340px] rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black p-7 text-white flex flex-col justify-between overflow-hidden relative group border border-white/10">
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-medium">
                  Новинка
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                  В наявності
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                Настільні ігри для незабутніх моментів
              </h1>
              <p className="text-zinc-400 text-sm lg:text-base mb-6">
                Виробник цікавих та незвичних настільних ігор в Україні
              </p>
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-all group-hover:gap-3"
              >
                Розпочати пошук
                <FiArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="absolute -top-10 -right-10 w-[450px] h-[450px] opacity-60 rotate-6 group-hover:rotate-3 transition-transform duration-700">
              <Image
                src="/між_нами_про_любов_2-1-1024x1024.webp"
                alt="Hero image"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>
          </div>

          {/* Featured Section */}
          <div className="h-[340px] rounded-[2rem] bg-gradient-to-br from-purple-50 to-white p-7 flex flex-col justify-between overflow-hidden relative group border border-black/5">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium">
                  Спеціальна пропозиція
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Колекційна серія
              </h2>
              <p className="text-gray-600 text-sm max-w-sm">
                Обмежений тираж особливої серії ігор із унікальним дизайном
              </p>
            </div>
            <div className="relative z-10">
              <Link 
                href="/special-offer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-all group-hover:gap-4"
              >
                Дізнатись більше
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-100 blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rotate-12 group-hover:rotate-6 transition-transform duration-700">
              <Image
                src="/між_нами_про_любов_1-1-300x300.webp"
                alt="Special offer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
