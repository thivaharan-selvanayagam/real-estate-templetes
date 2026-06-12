"use client";

import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ListingImageGalleryProps {
  images: string[];
  address: string;
}

export default function ListingImageGallery({ images, address }: ListingImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* IMAGE GALLERY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden">
        {/* Main Large Image */}
        <div className="md:col-span-2 relative h-full bg-gray-100 cursor-pointer" onClick={() => openLightbox(0)}>
          {images[0] && <img src={images[0]} alt={`${address} Photo 1`} className="w-full h-full object-cover" />}
        </div>
        
        {/* Middle Column (2 Images) */}
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <div className="relative bg-gray-100 cursor-pointer" onClick={() => openLightbox(1)}>
            {images[1] && <img src={images[1]} alt={`${address} Photo 2`} className="w-full h-full object-cover" />}
          </div>
          <div className="relative bg-gray-100 cursor-pointer" onClick={() => openLightbox(2)}>
            {images[2] && <img src={images[2]} alt={`${address} Photo 3`} className="w-full h-full object-cover" />}
          </div>
        </div>

        {/* Right Column (2 Images + Overlay) */}
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <div className="relative bg-gray-100 cursor-pointer" onClick={() => openLightbox(3)}>
            {images[3] && <img src={images[3]} alt={`${address} Photo 4`} className="w-full h-full object-cover" />}
          </div>
          <div className="relative bg-gray-100 group cursor-pointer" onClick={() => openLightbox(4)}>
            {images[4] && <img src={images[4]} alt={`${address} Photo 5`} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
              <span className="text-white font-bold text-sm flex items-center gap-2">
                <Camera size={18} /> + {Math.max(0, images.length - 4)} photos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button className="absolute left-6 text-white/70 hover:text-white transition-colors p-4" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>

          <img 
            src={images[currentIndex]} 
            alt={`${address} - ${currentIndex + 1}`} 
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing lightbox
          />

          <button className="absolute right-6 text-white/70 hover:text-white transition-colors p-4" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}