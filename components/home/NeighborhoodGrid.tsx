"use client";

import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

interface Neighborhood {
  name: string;
  desc: string;
  image: string;
  gridClass: string;
}

const neighborhoodData: Neighborhood[] = [
  {
    name: "Pickering",
    desc: "Vibrant waterfront community featuring GO Transit access, expanding pre-construction projects, and strong equity growth potential.",
    image: "/images/neighborhood/pickering.jpg",
    gridClass: "col-span-12 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Ajax",
    desc: "Family-friendly suburban enclave offering spacious floor plans, expansive parklands, and accessible lakeside living.",
    image: "/images/neighborhood/ajax.jpg",
    gridClass: "col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Whitby",
    desc: "Picturesque historic downtown paired with modern residential subdivisions, top-rated schools, and dynamic green spaces.",
    image: "/images/neighborhood/whitby.jpg",
    gridClass: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[320px]"
  },
  {
    name: "Oshawa",
    desc: "One of Durham Region's top investment hubs, delivering accessible homeownership options and high long-term rental demand.",
    image: "/images/neighborhood/oshawa.jpeg",
    gridClass: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[320px]"
  },
  {
    name: "Stouffville",
    desc: "Charming small-town feel offering scenic countryside views, modern family homes, and a peaceful pace of life.",
    image: "/images/neighborhood/stouffville.jpg",
    gridClass: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[320px]"
  },
  {
    name: "Markham",
    desc: "Dynamic technology and business hub known for master-planned communities, excellent school districts, and high resale demand.",
    image: "/images/neighborhood/markham.jpg",
    gridClass: "col-span-12 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Vaughan",
    desc: "Rapidly expanding urban center anchored by subway connectivity, major civic infrastructure, and spacious detached homes.",
    image: "/images/neighborhood/vaughan.jpg",
    gridClass: "col-span-12 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Richmond Hill",
    desc: "High-demand York Region enclave with top-ranking schools, scenic trail networks, and enduring real estate value.",
    image: "/images/neighborhood/richmond-hill.jpg",
    gridClass: "col-span-12 md:col-span-6 aspect-[16/10] md:aspect-auto md:h-[340px]"
  },
  {
    name: "Toronto",
    desc: "Canada's economic epicenter, featuring high-density transit corridor condos, historic tree-lined streets, and high investment utility.",
    image: "/images/neighborhood/toronto.avif",
    gridClass: "col-span-12 md:col-span-6 aspect-[16/10] md:aspect-auto md:h-[340px]"
  }
];

export default function NeighborhoodGrid() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 shadow-sm border border-stone-300/40">
            Greater Toronto Area Communities
          </div>
          
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
            Where Every Neighborhood Tells Its Own Story
          </h2>
          
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
            Finding the right property starts with finding the right community. Explore our GTA neighborhood guides for real insights on local living, market trends, and property potential.
          </p>
        </div>

        {/* BENTO GRID SYSTEM */}
        <div className="grid grid-cols-12 gap-6 w-full">
          {neighborhoodData.map((city, idx) => {
            const citySlug = city.name.toLowerCase().replace(/\s+/g, "-");
            
            return (
              <Link 
                key={idx}
                href={`/neighbourhoods/${citySlug}`}
                className={`relative block rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 ${city.gridClass}`}
              >
                
                {/* Core Thumbnail Graphic */}
                <img 
                  src={city.image} 
                  alt={`${city.name} GTA neighborhood panorama`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Layer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col items-start text-left max-w-xl">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-2 transition-colors group-hover:text-[#F9F6F0]">
                    {city.name}
                  </h3>
                  <p className="text-[#F9F6F0]/80 text-xs sm:text-sm font-light leading-relaxed drop-shadow-sm">
                    {city.desc}
                  </p>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}