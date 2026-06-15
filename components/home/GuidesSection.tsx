"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const guidesData = [
  {
    title: "Your Guide to Buying",
    href: "/buyers-guide",
    description: "Navigate the marketplace with tailored home search strategies, real-time analytics, and professional negotiation systems.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "Your Guide to Selling",
    href: "/home-evaluation",
    description: "Maximize your property's value using precision home evaluations, targeted digital placement, and elite presentation strategies.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    title: "Guide to Your Community",
    href: "/neighbourhoods",
    description: "Explore neighborhood demographic insights, local school system profiles, lifestyle metrics, and localized market trends.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
  }
];

export default function GuidesSection() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* 1. TOP MARGIN TITLE HEADER SECTION */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="bg-[#E2F0EC] text-[#1E463C] text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm">
            Destinations
          </div>
          
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
            Buy With Us
          </h2>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            Discover premium insights, neighborhood masterplans, and professional advisory designed for your long-term success.
          </p>
        </div>

        {/* 2. THREE-CARD HOVER INTERACTIVE GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {guidesData.map((guide, idx) => (
            <Link 
              key={idx}
              href={guide.href}
              // 🔑 FIXED: Increased height constraints to portrait bounds using aspect-[3/4]
              className="relative block aspect-[3/4] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 bg-neutral-950"
            >
              {/* Card Background Graphic */}
              <img 
                src={guide.image} 
                alt={`${guide.title} overview background`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                loading="lazy"
              />

              {/* Dynamic Overlay Shadow Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Interactive Content Layout Overlay Box */}
              <div className="absolute inset-0 p-6 sm:p-8 z-10 flex flex-col justify-end items-start text-left">
                
                {/* Title */}
                <h3 className={`font-display text-lg sm:text-xl font-bold text-white tracking-wide transition-colors duration-300 group-hover:${cleanAccentText} mb-1`}>
                  {guide.title}
                </h3>

                {/* Smooth Slide-Up Description Block */}
                <div className="max-h-0 opacity-0 transform translate-y-4 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out overflow-hidden">
                  <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed mt-2 text-justify">
                    {guide.description}
                  </p>
                </div>

                {/* Smooth Slide-Up Action Link */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-white/90 uppercase tracking-widest opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}