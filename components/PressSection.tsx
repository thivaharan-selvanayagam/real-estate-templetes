"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const pressItems = [
  {
    category: "THE REAL DEAL",
    title: '"Can the Hamptons keep its hot streak?"',
    link: "#",
  },
  {
    category: "COMMERCIAL OBSERVER",
    title: '"New York City Housing Development Now Hinges on Certain Trends: Forum"',
    link: "#",
  },
  {
    category: "THE REAL DEAL",
    title: '"\'You’re right!\' So far, AI’s threat to resi real estate is making c..."',
    link: "#",
  },
  {
    category: "NEW YORK POST",
    title: '"Inside Zendaya’s \'Euphoric\' $5M NYC Waterfront Condo"',
    link: "#",
  },
  {
    category: "REAL ESTATE WEEKLY",
    title: '"Quadrum Global and Serhant. New Development Announce the Huron"',
    link: "#",
  },
];

export default function PressSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Drag physics tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag momentum velocity
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-[#F7F7F7] overflow-hidden">
      {/* 🔑 FOOLPROOF FIX: Injects a scoped style block to kill native scrollbars/progress bars on all browsers */}
      <style jsx global>{`
        .hide-scrollbar-engine {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar-engine::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-navy tracking-tight mb-6">
            In the Press
          </h2>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            See what’s got everyone talking. Enjoy featured stories about our dynamic properties, agents, company, and more as the most followed real estate brand in the world.
          </p>
        </div>

        {/* Draggable Track Layer */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 overflow-x-auto select-none hide-scrollbar-engine ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {pressItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[320px] md:min-w-[400px] border-t border-gray-200 pt-8 pb-12 flex flex-col justify-between"
            >
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 mb-6 uppercase">
                  {item.category}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-navy leading-tight mb-8">
                  {item.title}
                </h3>
              </div>
              <Link
                href={item.link}
                className="text-navy text-xs font-bold flex items-center gap-2 group max-w-max"
              >
                <span>Read</span>
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Navigation Controls Row */}
        <div className="mt-16 flex items-center justify-between">
          {/* Slider Circular Target Chevrons */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              type="button"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-white transition-colors bg-transparent shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              type="button"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-white transition-colors bg-transparent shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Solid CTA Action Capsule */}
          <Link
            href="/press"
            className="bg-navy text-white text-[11px] font-black tracking-widest uppercase px-10 py-4 rounded-full hover:bg-navy-light transition-all flex items-center gap-3 shadow-md"
          >
            <span>Read More</span>
            <ChevronRight size={14} className="stroke-[3px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}