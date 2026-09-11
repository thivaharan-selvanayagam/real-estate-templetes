"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const heroReviews = [
  {
    name: "Sarah & David C.",
    role: "First-Time Buyers in Pickering",
    text: "Reema and Pirasha guided us through every step. Their strategic advice made buying our first home stress-free.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    name: "Marcus J.",
    role: "Seller in Markham",
    text: "The valuation was spot-on. Their local GTA expertise and negotiation skills helped us sell above our goal.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "Emily P.",
    role: "Pre-Construction Investor",
    text: "Unmatched market knowledge and strategic advice. They secured us the exact allocation we were targeting.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  }
];

export default function HeroVariant4() {
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  const starColor = cleanAccentText.includes('gold') 
    ? 'text-gold fill-gold' 
    : `text-${cleanAccentText.replace('text-', '')} fill-${cleanAccentText.replace('text-', '')}`;

  return (
    <section className="relative w-full flex flex-col bg-slate-950 z-10">
      
      {/* GLOBAL CINEMATIC FIXED BACKGROUND VIDEO CONTAINER */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-950" />
      </div>

      {/* FIRST VIEWPORT VIEW (ABOVE THE FOLD) */}
      <div className="relative z-10 w-full min-h-[85vh] lg:min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 lg:pt-48 text-center px-6 lg:px-12">
        <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto w-full">
          
          {/* Serving Location Badge */}
          <div className="bg-[#F9F6F0] text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-xl animate-fade-up">
            Serving Greater Toronto Area
          </div>

          {/* Headline Layout */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase max-w-5xl leading-[1.15] mb-6 drop-shadow-md animate-fade-up">
            REAL ESTATE, DONE DIFFERENTLY.
          </h1>

          {/* Subtitle Description */}
          <p className="text-[#F9F6F0]/90 text-base md:text-lg lg:text-xl font-light tracking-wide max-w-2xl mb-10 drop-shadow-sm">
            Strategic guidance. Local expertise. A smarter move.
          </p>

          {/* 4-BUTTON ACTION DECK (FIXED LAYOUT & UNIFORM HEIGHTS) */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full max-w-5xl mx-auto">
            <Link 
              href="/all-homes" 
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto lg:flex-1 min-w-[210px] max-w-[270px] min-h-[54px] flex items-center justify-center px-5 py-3 rounded-full bg-[#F9F6F0] text-stone-900 text-xs font-semibold tracking-wider uppercase hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-xl font-sans text-center leading-tight"
            >
              Buy With Us
            </Link>
            
            <Link 
              href="/sellers-guide" 
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto lg:flex-1 min-w-[210px] max-w-[270px] min-h-[54px] flex items-center justify-center px-5 py-3 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/35 text-xs font-semibold tracking-wider uppercase hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xl font-sans text-center leading-tight"
            >
              Sell With Us
            </Link>

            <Link 
              href="/contact?intent=Explore%20Pre-Construction" 
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto lg:flex-1 min-w-[210px] max-w-[270px] min-h-[54px] flex items-center justify-center px-5 py-3 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/35 text-xs font-semibold tracking-wider uppercase hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xl font-sans text-center leading-tight"
            >
              Explore Pre-Construction
            </Link>

            <Link 
              href="/home-evaluation" 
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto lg:flex-1 min-w-[210px] max-w-[270px] min-h-[54px] flex items-center justify-center px-5 py-3 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/35 text-xs font-semibold tracking-wider uppercase hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 shadow-xl font-sans text-center leading-tight"
            >
              Get Your Home Evaluation
            </Link>
          </div>
          
        </div>
      </div>

      {/* SECOND VIEWPORT VIEW (BELOW THE FOLD) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {heroReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-neutral-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl flex flex-col justify-between hover:border-white/25 transition-all duration-300"
            >
              <div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={starColor} />
                  ))}
                </div>
                <p className="text-white/90 text-xs lg:text-sm leading-relaxed font-normal mb-5">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/10">
                <img 
                  src={review.avatar} 
                  alt={`${review.name}`} 
                  className="w-9 h-9 rounded-full object-cover shadow-inner border border-white/20" 
                />
                <div>
                  <h4 className="text-white font-semibold text-xs tracking-wide">{review.name}</h4>
                  <p className="text-white/50 text-[10px] font-medium mt-0.5">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}