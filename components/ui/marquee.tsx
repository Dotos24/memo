"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Marquee = ({
  className,
  pauseOnHover = false,
  children,
}: {
  className?: string;
  pauseOnHover?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee items-stretch gap-[--gap]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
