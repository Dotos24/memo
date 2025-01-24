'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface VelocityScrollTextProps {
  children: React.ReactNode;
}

export function VelocityScrollText({ children }: VelocityScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div ref={containerRef} className="relative whitespace-nowrap">
      <motion.span 
        style={{ x }} 
        className="text-6xl md:text-8xl font-bold inline-block"
      >
        {children}
      </motion.span>
    </div>
  );
}
