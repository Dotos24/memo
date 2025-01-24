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
      {/* Изменяем пропорции сетки с помощью grid-cols и col-span */}
      <div className="grid grid-cols-12 gap-5">
        {/* Left side - теперь занимает 8 колонок из 12 */}
        <div className="col-span-8 h-[700px] lg:h-[700px] rounded-[2rem] overflow-hidden relative bg-black/5 backdrop-blur-sm border border-white/10">
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

        {/* Right side - занимает оставшиеся 4 колонки */}
        <div className="col-span-4 flex flex-col gap-5">
          <div className="h-full rounded-[2rem] bg-black p-7 text-white flex flex-col justify-between overflow-hidden relative group">
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
            <div className="absolute -bottom-50 -right-[230px] w-[1024px] h-[1024px] opacity-60 rotate-6 group-hover:rotate-3 transition-transform duration-700">
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

        </div>
      </div>
    </div>
  );
};

export default Content;
