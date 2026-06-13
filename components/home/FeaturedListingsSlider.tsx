"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice, formatAddress } from "@/lib/repliers"; // 🔑 IMPORT: Hooks directly into your existing Repliers parsing utilities

interface FeaturedListingsSliderProps {
  listings: any[]; // 🔑 CONNECTED: Pulls live data array down from your async page component payload
}

export default function FeaturedListingsSlider({ listings = [] }: FeaturedListingsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  // 🔑 CLICKABLE ARROWS ENGINE: Calculates the clientWidth viewport step size to shift the horizontal scrollbar
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75; 
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  // Safe fallback if the Repliers API returns an empty array during network downtime
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 bg-white">
        <p className="text-lg">No premium listings found matching this criteria.</p>
      </div>
    );
  }

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* 1. TOP HEADER NAVIGATION BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 w-full">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight mb-4`}>
              Featured Listings
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
              Discover premium properties handpicked by our experts for exceptional living and investment potential.
            </p>
            
            {/* View All Pill Action Trigger */}
            <Link 
              href="/all-homes" 
              className="mt-6 inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 bg-white px-6 py-2.5 rounded-full text-xs font-semibold text-gray-700 transition-colors shadow-sm"
            >
              View All Listings
            </Link>
          </div>

          {/* 🔑 CLICKABLE ARROWS: Standardized Event Listeners tied into the ref hook engine */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white text-gray-600 hover:bg-neutral-50 flex items-center justify-center transition-all shadow-sm active:scale-95"
              aria-label="Scroll listings left"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gray-100 bg-white text-gray-600 hover:bg-neutral-50 flex items-center justify-center transition-all shadow-sm active:scale-95"
              aria-label="Scroll listings right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 2. PROPERTIES HORIZONTAL TRACK SLIDER CONTAINER */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory lg:overflow-x-hidden w-full scrollbar-none"
        >
          {listings.map((l: any) => {
            // 🔑 REPLIERS API NORMALIZATION LAYER: Parses payload metrics safely
            const img = l.images?.[0];
            const price = formatPrice(l.listPrice);
            const isLease = l.type === "lease" || l.status === "Lsd";
            const priceLabel = isLease ? `${price}/mo` : price;

            const streetAddress = formatAddress(l.address);
            const city = l.address?.city || "";
            const state = l.address?.state || "";
            const completeAddress = `${streetAddress}, ${city}, ${state}`.trim().replace(/,\s*$/, "");

            const beds = l.details?.numBedrooms || 0;
            const bedsPlus = l.details?.numBedroomsPlus ? `+${l.details.numBedroomsPlus}` : "";
            const baths = l.details?.numBathrooms || 0;
            const sqft = l.details?.sqft;

            // Generate conditional contextual display tags dynamically based on property metadata
            const statusTag = isLease ? "For Lease" : (l.class === "Commercial" ? "Commercial" : "For Sale");

            return (
              // 🔑 CLICKABLE CARDS: Enclosed in Next Link referencing your dynamic route parameters safely
              <Link 
                key={l.mlsNumber} 
                href={`/listings/${l.mlsNumber}`} 
                className="w-[280px] sm:w-[340px] md:w-[360px] lg:w-[calc(25%-18px)] shrink-0 snap-start group flex flex-col cursor-pointer"
              >
                {/* Card Thumbnail Image Wrapper */}
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-neutral-100 shadow-sm mb-5">
                  {img ? (
                    <img 
                      src={`https://cdn.repliers.io/${img}`} 
                      alt={streetAddress}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                      <span className="text-white/20 font-display text-base font-bold tracking-widest uppercase">{BRAND_CONFIG.meta.siteName}</span>
                    </div>
                  )}
                  
                  {/* Floating Status Indicator Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-white text-gray-800 text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full shadow-md">
                      {statusTag}
                    </span>
                  </div>
                </div>

                {/* Property Details Matrix Metadata block */}
                <div className="flex flex-col items-start text-left w-full px-1">
                  <h3 className={`font-display text-lg font-bold ${cleanPrimaryText} tracking-tight mb-1 truncate w-full group-hover:text-gold transition-colors`}>
                    {streetAddress || "Premium Property Asset"}
                  </h3>
                  
                  <p className={`text-xl font-extrabold ${cleanPrimaryText} mb-3 tracking-tight`}>
                    {priceLabel}
                  </p>

                  {/* Location Element Row */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-4 w-full truncate">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span>{completeAddress}</span>
                  </div>

                  {/* Core Parameters Specifications Bar */}
                  <div className="flex items-center gap-4 text-gray-500 text-[11px] sm:text-xs font-bold tracking-wide uppercase mt-auto w-full pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={15} className="text-gray-400 shrink-0" />
                      <span>{beds}{bedsPlus} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={15} className="text-gray-400 shrink-0" />
                      <span>{baths} Baths</span>
                    </div>
                    {sqft && (
                      <div className="flex items-center gap-1.5 ml-auto">
                        <Ruler size={14} className="text-gray-400 shrink-0" />
                        <span>{Number(sqft).toLocaleString()} Sq.Ft.</span>
                      </div>
                    )}
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}