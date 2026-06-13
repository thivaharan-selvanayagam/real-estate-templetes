"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const heroReviews = [
  {
    name: "Sarah Chen",
    role: "CTO at Acme",
    text: "Reduced our development time by 60%. An absolute game-changer for our team.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    name: "Marcus Johnson",
    role: "Lead Designer",
    text: "The best tool I've used in my 10 years of design. Intuitive and incredibly powerful.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "Emily Park",
    role: "Product Manager",
    text: "Seamless collaboration between design and engineering. Exactly what we needed.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  }
];

export default function HeroVariant4() {
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  const starColor = cleanAccentText.includes('gold') 
    ? 'text-gold fill-gold' 
    : `text-${cleanAccentText.replace('text-', '')} fill-${cleanAccentText.replace('text-', '')}`;

  return (
    // 🔑 FIXED: Removed space-between restrictions. Section scales organically across both viewport sections
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
        <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-slate-950" />
      </div>

      {/* 2. FIRST VIEWPORT VIEW (ABOVE THE FOLD - UPDATED FOR MORE TOP SPACING) */}
<div className="relative z-10 w-full h-screen flex flex-col items-center justify-start pt-36 md:pt-44 lg:pt-52 text-center px-6 lg:px-12">
  <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto w-full">
    
    {/* Serving Location Badge */}
    <div className="bg-white text-gray-900 text-[10px] md:text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-xl animate-fade-up">
      Serving Greater Toronto Area
    </div>

    {/* Headline Layout parameters */}
    <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase max-w-5xl leading-[1.2] mb-6 drop-shadow-md animate-fade-up">
      Expert Guidance. Local Insight.<br className="hidden md:inline" />Confident Moves.
    </h1>

    {/* Subtitle Description */}
    <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium tracking-wide max-w-2xl mb-10 drop-shadow-sm">
      Proudly serving the Greater Toronto and Surrounding Areas
    </p>

    {/* Double Button Row Action Deck */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
      <Link 
        href="/buyers-guide" 
        className="w-full sm:w-auto text-center bg-white text-gray-900 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-all shadow-xl font-sans"
      >
        Your Guide to Buying
      </Link>
      <Link 
        href="/home-evaluation" 
        className="w-full sm:w-auto text-center bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/20 transition-all shadow-xl font-sans"
      >
        Your Guide to Selling
      </Link>
    </div>
    
  </div>
</div>

      {/* 3. SECOND VIEWPORT VIEW (BELOW THE FOLD - REVEALED ON FIRST SCROLL) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32 -mt-12 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {heroReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-neutral-950/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* 5 Stars Profile Indicator */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={starColor} />
                  ))}
                </div>
                {/* Feedback Content Text block */}
                <p className="text-white/90 text-xs lg:text-sm leading-relaxed font-medium mb-5">
                  "{review.text}"
                </p>
              </div>

              {/* User Identity Footnote Summary */}
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                <img 
                  src={review.avatar} 
                  alt={`${review.name} avatar snapshot`} 
                  className="w-9 h-9 rounded-full object-cover shadow-inner border border-white/20" 
                />
                <div>
                  <h4 className="text-white font-bold text-xs tracking-wide">{review.name}</h4>
                  <p className="text-white/40 text-[10px] font-semibold mt-0.5">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}