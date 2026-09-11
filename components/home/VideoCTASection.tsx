"use client";

import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

export default function VideoCTASection() {
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  return (
    <section className="relative max-w-[1440px] mx-auto w-full min-h-[50vh] md:min-h-[55vh] rounded-[32px] md:rounded-[40px] overflow-hidden bg-slate-950 z-20 px-6 sm:px-12 py-16 md:py-24 my-12">
      
      {/* 1. CINEMATIC BACKGROUND VIDEO FRAME */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Soft dark overlay for contrast */}
        <div className="absolute inset-0 bg-neutral-950/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-neutral-950/50 to-neutral-950/70" />
      </div>

      {/* 2. FROSTED GLASS CONTAINER */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-stone-950/40 backdrop-blur-xl md:backdrop-blur-2xl border border-white/15 rounded-[28px] md:rounded-[36px] p-8 sm:p-12 md:p-16 text-center shadow-2xl flex flex-col items-center justify-center my-auto">
        
        {/* Mini Section Tag Badge */}
        <div className="bg-[#F9F6F0] text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
          Start The Conversation
        </div>

        {/* Core Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6 max-w-xl">
          Ready to Take the Next Step?
        </h2>

        {/* Subtitle Description */}
        <p className="text-[#F9F6F0]/90 text-sm md:text-base font-light leading-relaxed max-w-2xl mb-8 text-center drop-shadow-sm px-2">
          Whether you’re buying your first home, planning your next GTA investment, or exploring pre-construction opportunities, Reema and Pirasha are here to deliver strategic guidance every step of the way.
        </p>

        {/* Primary Action Button */}
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-[#F9F6F0] text-stone-900 hover:bg-white min-h-[52px] px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-98 font-sans"
        >
          Let's Talk About Your Next Move
        </Link>
        
      </div>

    </section>
  );
}