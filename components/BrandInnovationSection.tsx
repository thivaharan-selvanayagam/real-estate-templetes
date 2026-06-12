"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link"; // 🔑 FIXED: Imported Link for Next.js routing

const platformTabs = [
  {
    id: 0,
    tag: "PREMIER. STUDIOS",
    title: "Home Search",
    desc: "We are a full-service in-house production studio that creates award-winning, unique, specialized content strategically designed to resonate with the largest real estate audience in the world.",
    btnText: "Search Now",
    href: "/all-homes" // 🔑 FIXED: Added routing destination
  },
  {
    id: 1,
    tag: "PREMIER. ADX",
    title: "Home Valuation",
    desc: "Simple innovations and impactful solutions for your home search, property sale, or business goals.",
    btnText: "Valuate Now",
    href: "/sell" // 🔑 FIXED: Added routing destination
  },
  {
    id: 2,
    tag: "PREMIER. ID LAB",
    title: "Let's Connect",
    desc: "A creative brand incubator building powerful identities, luxury presentation decks, and modern market dominance positioning.",
    btnText: "Contact Us",
    href: "/contact" // 🔑 FIXED: Added routing destination
  }
];

export default function BrandInnovationSection() {
  // DEFAULT STATE: Card index 1 (the center card) is maximized on page load
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex items-end pb-12 md:pb-20 overflow-hidden bg-gray-950">
      
      {/* HTML5 Autoplay Loop Video Canvas Layer */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-large-windows-41511-large.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Dark Overlay Layer */}
      <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />

      {/* Interactive Overlaid Card Layout Pipeline */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          {platformTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <div
                key={tab.id}
                onMouseEnter={() => setActiveTab(tab.id)}
                className={`transition-all duration-500 ease-out cursor-pointer select-none ${
                  isActive 
                    ? "bg-white text-black p-6 md:p-8 rounded-2xl shadow-2xl scale-100 opacity-100" 
                    : "border border-white/20 bg-black/25 backdrop-blur-md p-5 md:p-6 rounded-xl text-white hover:bg-white/10 opacity-60 hover:opacity-90 h-auto md:h-[130px] flex flex-col justify-center"
                }`}
              >
                {/* Active Card Expanded Template */}
                {isActive ? (
                  <div className="animate-fade-in">
                    <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                      {tab.tag}
                    </p>
                    <h3 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight mt-2.5 leading-snug">
                      {tab.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-3 leading-relaxed">
                      {tab.desc}
                    </p>
                    
                    {/* 🔑 FIXED: Swapped <button> for <Link> to enable client-side navigation */}
                    <Link href={tab.href} className="mt-6 bg-navy text-white text-[11px] font-black tracking-widest uppercase rounded-full pl-6 pr-5 py-3.5 inline-flex items-center gap-3 hover:bg-navy-light transition-all duration-200 group/btn shadow-md">
                      <span>{tab.btnText}</span>
                      <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                ) : (
                  /* Inactive Outline Card Template */
                  <div className="animate-fade-in">
                    <p className="text-[9px] md:text-[10px] font-extrabold tracking-widest text-white/50 uppercase">
                      {tab.tag}
                    </p>
                    <h3 className="text-base md:text-lg font-bold text-white mt-2 tracking-tight leading-tight line-clamp-2">
                      {tab.title}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}