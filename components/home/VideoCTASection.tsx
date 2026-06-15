"use client";

import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

export default function VideoCTASection() {
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  return (
    // 🔑 FIXED: Bounded container configuration matching the screenshot dimensions perfectly with rounded-3xl corners
    <section className="relative max-w-[1440px] mx-auto w-full min-h-[50vh] md:min-h-[60vh] rounded-[32px] md:rounded-[40px] overflow-hidden bg-slate-950 z-20 px-6 sm:px-12 py-16 md:py-24 my-12">
      
      {/* 1. CINEMATIC CONTAINER VIDEO FRAME */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Balanced backdrop layer overlay to capture rich natural colors while stabilizing contrast */}
        <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/40 to-neutral-950/60" />
      </div>

      {/* 2. CENTRAL FROSTED GLASS CONTAINER */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-12 md:p-14 text-center shadow-2xl flex flex-col items-center justify-center my-auto">
        
        {/* Mini Section Tag Badge */}
        <div className="bg-white text-gray-900 text-[10px] md:text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
          Contact
        </div>

        {/* Core Headline Matrix Copy */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6 max-w-xl">
          Ready to Take the Next Step?
        </h2>

        {/* Subtitle Description */}
        <p className="text-white/80 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl mb-8 text-center drop-shadow-sm px-2">
          Not sure if now's the right time to buy or sell? Need a reliable contractor? We would love to get to know more about you and your needs! Feel free to use any of the options here to get in contact with us!
        </p>

        {/* Premium Translucent Action Button Deck */}
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center border border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl active:scale-98"
        >
          Let's Talk About Your Goals!
        </Link>
        
      </div>

    </section>
  );
}