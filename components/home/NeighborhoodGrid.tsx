"use client";

import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

// Symmetrical data arrays structured to mirror the layout aspect ratios of image_c3bd5f.jpg exactly
const neighborhoodData = [
  {
    name: "Toronto",
    desc: "Explore a premier global hub known for modern luxury towers, multicultural districts, and rapid capital appreciation potential.",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    gridClass: "col-span-12 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Markham",
    desc: "Discover premium master-planned corporate environments with exceptional school districts and multi-generational residential estates.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    gridClass: "col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Stoufville",
    desc: "Experience high-end scenic country estates balanced with cozy, tranquil residential neighborhoods outside the fast inner-city cores.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    gridClass: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[300px]"
  },
  {
    name: "Pickering",
    desc: "Premium waterfront luxury residential living spaces with exceptional transportation infrastructure and master developments.",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    gridClass: "col-span-12 md:col-span-8 aspect-[16/10] md:aspect-auto md:h-[300px]"
  },
  {
    name: "Ajax",
    desc: "Modern, thriving coastal suburban communities featuring massive square-footage floor plans, parks, and high utility growth avenues.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    gridClass: "col-span-12 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Whitby",
    desc: "Beautifully preserved historic luxury town centers integrated directly alongside rapidly developing modern residential sub-divisions.",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80",
    gridClass: "col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[340px]"
  }
];

export default function NeighborhoodGrid() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* 1. TOP MARGIN TITLE HEADER SECTION */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="bg-[#E2F0EC] text-[#1E463C] text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm">
            Toronto and nearby Cities
          </div>
          
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
            Where every neighborhood tells its own story.
          </h2>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            Finding the right home starts with finding the right community. That's why finding areas guides like {BRAND_CONFIG.agent.name.split(" ")[0]} give you an inside look at real estate, lifestyle and local living.
          </p>
        </div>

        {/* 2. Bento-Grid Layout System (Matches image_c3ab14.jpg layout precisely) */}
        <div className="grid grid-cols-12 gap-6 w-full">
          {neighborhoodData.map((city, idx) => (
            // 🔑 CLICKABLE CITY ELEMENT: Dynamically attaches search queries to your all-homes target route
            <Link 
              key={idx}
              href={`/neighbourhoods/${encodeURIComponent(city.name.toLowerCase())}`}
              className={`relative block rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 ${city.gridClass}`}
            >
              
              {/* Core Thumbnail Graphic */}
              <img 
                src={city.image} 
                alt={`${city.name} community panorama`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                loading="lazy"
              />

              {/* Protective dark gradient layer overlay for flawless typographic layout visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content text bounds aligned at lower left corner bounds */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col items-start text-left max-w-xl">
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide mb-2 transition-colors group-hover:text-gold">
                  {city.name}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm">
                  {city.desc}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}