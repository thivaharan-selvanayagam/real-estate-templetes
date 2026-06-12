"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// 🔑 FIXED: Changed '?search=' to '?city=' to enforce strict city-level filtering
const neighborhoods = [
  { name: "Toronto", href: "/buy?city=Toronto", img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1200" },
  { name: "Markham", href: "/buy?city=Markham", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200" },
  { name: "Stouffville", href: "/buy?city=Stouffville", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200" },
  { name: "Pickering", href: "/buy?city=Pickering", img: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1200" },
  { name: "Ajax", href: "/buy?city=Ajax", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { name: "Oshawa", href: "/buy?city=Oshawa", img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200" },
  { name: "Mississauga", href: "/buy?city=Mississauga", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200" },
  { name: "Brampton", href: "/buy?city=Brampton", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200" },
  { name: "Vaughan", href: "/buy?city=Vaughan", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200" },
];
export default function OurNeighborhoods() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="relative bg-white min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden py-16 lg:py-0">
      
      {/* BACKGROUND IMAGE CANVAS LAYOUT */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {neighborhoods.map((item, idx) => (
          <img
            key={item.name}
            src={item.img}
            alt=""
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
              hoveredIndex === idx ? "opacity-35 lg:opacity-40" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/80 md:via-white/90 to-white/10" />
      </div>

      {/* FOREGROUND CONTENT AREA */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Side Content Block */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-navy tracking-tight leading-tight">
              Our Neighborhoods
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Discover the home you've been waiting for in Canada's most desirable communities.
            </p>
          </div>

          {/* Right Side Neighborhoods Dynamic Grid Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
            {neighborhoods.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`flex items-center justify-between px-5 py-4 border font-bold tracking-wide text-sm transition-all duration-300 rounded-sm shadow-sm ${
                    isHovered
                      ? "bg-navy border-navy text-white shadow-md lg:scale-[1.02]"
                      : "bg-white/90 backdrop-blur-sm border-gray-200 text-navy hover:border-navy"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${isHovered ? "text-gold translate-x-1" : "text-gray-400"}`} 
                  />
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}