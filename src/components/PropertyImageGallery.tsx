"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { PropertyImageModal } from "./PropertyImageModal";
import { useTranslation } from "@/hooks/useTranslation";
import type { AIStyledImage } from "./AIDecorationTab";

interface PropertyImageGalleryProps {
  images: string[];
  propertyId?: string;
  propertyAddress?: string;
  originalImage?: string;
  aiStyledImages?: AIStyledImage[];
}

export function PropertyImageGallery({ 
  images, 
  propertyId = '', 
  propertyAddress = '',
  originalImage,
  aiStyledImages = [] 
}: PropertyImageGalleryProps) {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Large Image */}
        <div 
          className="relative w-full h-[600px] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={images[selectedIndex]}
            alt={`Property image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full shadow-md flex items-center gap-2">
              <Images className="h-4 w-4" />
              <span className="text-sm font-medium">
                {images.length} {images.length === 1 ? t("property.photo") : t("property.photos")}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-full h-24 rounded-md overflow-hidden border-2 transition-all ${
                  index === selectedIndex
                    ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* New Full-Screen Modal */}
      <PropertyImageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        propertyId={propertyId}
        propertyAddress={propertyAddress}
        galleryImages={images}
        originalImage={originalImage}
        aiStyledImages={aiStyledImages}
      />
    </>
  );
}

