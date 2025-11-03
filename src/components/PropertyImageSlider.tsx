"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSliderImage, getPlaceholder } from "@/lib/cloudinary";
import Image from "next/image";

interface PropertyImageSliderProps {
  images: string[];
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function PropertyImageSlider({
  images,
  className = "",
  showControls = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: PropertyImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, images.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold) {
      handlePrevious();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={`relative bg-gray-200 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div 
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={getSliderImage(images[currentIndex])}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder="blur"
              blurDataURL={getPlaceholder(images[currentIndex])}
              draggable={false}
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Only visible on hover */}
      {showControls && images.length > 1 && isHovered && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-800/80 text-white shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/60 hover:bg-gray-800/80 text-white shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter (Bottom Left) - Only visible from second image onwards */}
      {images.length > 1 && currentIndex > 0 && (
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded bg-gray-900/80 text-white text-sm font-medium">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
}
