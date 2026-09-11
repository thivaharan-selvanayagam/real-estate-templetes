"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const guidesData = [
  {
    title: "Buyer's Guide",
    href: "/buyers-guide",
    description: "A practical, step-by-step playbook for first-time homebuyers and investors navigating the competitive GTA market with confidence.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "Seller's Guide",
    href: "/sellers-guide",
    description: "Strategic pricing, tailored home prep, and targeted GTA marketing designed to maximize your return and keep your move seamless.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    title: "GTA Neighbourhood Guides",
    href: "/neighbourhoods",
    description: "In-depth community profiles, local lifestyle insights, transit connections, and growth trends across Toronto and Durham Region.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
  }
];

export default function GuidesSection() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 shadow-sm border border-stone-300/40">
            Client Resources
          </div>
          
          <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
            Strategic Advice for Every Move
          </h2>
          
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
            Whether you are purchasing your first condo, selling a family home, or building a pre-construction portfolio, explore our practical guides designed for the GTA real estate landscape.
          </p>
        </div>

        {/* 3-CARD HOVER INTERACTIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {guidesData.map((guide, idx) => (
            <Link 
              key={idx}
              href={guide.href}
              className="relative block aspect-[3/4] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] w-full rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 bg-stone-950"
            >
              {/* Background Image */}
              <img 
                src={guide.image} 
                alt={`${guide.title} overview background`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 z-10 flex flex-col justify-end items-start text-left">
                
                {/* Card Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-[#F9F6F0] mb-1">
                  {guide.title}
                </h3>

                {/* Slide-Up Description */}
                <div className="max-h-0 opacity-0 transform translate-y-4 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out overflow-hidden">
                  <p className="text-[#F9F6F0]/85 text-xs sm:text-sm font-light leading-relaxed mt-2 text-left">
                    {guide.description}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/90 uppercase tracking-wider opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                  <span>Read Guide</span>
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