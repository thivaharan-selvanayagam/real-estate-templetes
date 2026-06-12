"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight, Play } from "lucide-react";

const developments = [
  { name: "The Well Residences", location: "TORONTO", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600", desc: "Sleek architectural design anchoring premium authentic downtown city lifestyles in the heart of Toronto." },
  { name: "M City Towers", location: "MISSISSAUGA", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600", desc: "An elegant, iconic residential tower balancing high-concept community living with clean minimalist geometry." },
  { name: "VMC Centerpiece", location: "VAUGHAN", img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=600", desc: "Experience refined modern design with breathtaking suburban-urban skyline views and premium curated lounge spaces." },
  { name: "Markham Square", location: "MARKHAM", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600", desc: "Sophisticated boutique living refined with historic touchpoints in a premier master-planned community." },
  { name: "Exchange District", location: "MISSISSAUGA", img: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=600", desc: "Welcome to the Exchange District, a transformative architectural development changing the face of luxury living." },
  { name: "Universal City", location: "PICKERING", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600", desc: "Legendary luxury amenities meet timeless modern design profiles right along the developing eastern gateway." },
  { name: "The Towns at Main", location: "STOUFFVILLE", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600", desc: "Exclusive modern townhomes featuring sprawling layouts tucked into a lush, serene residential sanctuary." },
];

export default function DevelopmentsSlider() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); 
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    sliderRef.current.classList.add("active-drag");
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    sliderRef.current?.classList.remove("active-drag");
  };

  const onMouseUp = () => {
    isDragging.current = false;
    sliderRef.current?.classList.remove("active-drag");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollTrack = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const offset = direction === "left" ? -340 : 340;
    sliderRef.current.scrollTo({
      left: sliderRef.current.scrollLeft + offset,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full select-none">
      {/* 🔑 FIXED: Cross-browser style injection blocks native scrollbars/progress indicator tracks */}
      <style jsx global>{`
        .hide-slider-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-slider-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>

      {/* Draggable Track Viewport Wrapper */}
      <div 
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        /* 🔑 FIXED: Appended the custom hide-slider-scrollbar hook helper class */
        className="pl-6 lg:pl-12 flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth pb-2 hide-slider-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {developments.map((dev, idx) => {
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={dev.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="relative shrink-0 h-[480px] md:h-[520px] rounded-2xl overflow-hidden shadow-md group transition-all duration-500 ease-in-out"
              style={{ width: isHovered ? "360px" : "190px" }}
            >
              <img 
                src={dev.img} 
                alt={dev.name} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 text-white flex flex-col justify-end h-full">
                
                {!isHovered && (
                  <div className="animate-fade-in duration-300">
                    <h3 className="text-base font-bold leading-tight tracking-tight text-white line-clamp-2 uppercase">
                      {dev.name.split(",")[0]}
                    </h3>
                    <div className="flex items-center gap-1 text-[9px] font-black tracking-wider text-white/60 uppercase mt-1">
                      <MapPin size={10} className="shrink-0" />
                      <span className="truncate">{dev.location}</span>
                    </div>
                  </div>
                )}

                {isHovered && (
                  <div className="animate-fade-in duration-500 flex flex-col items-start w-[310px]">
                    <h3 className="text-3xl font-bold font-sans tracking-tight leading-none text-white">
                      {dev.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/80 uppercase mt-2.5">
                      <MapPin size={11} className="text-white/60 fill-white/10" />
                      <span>{dev.location}</span>
                    </div>

                    <p className="text-xs text-white/70 mt-4 leading-relaxed line-clamp-3">
                      {dev.desc}
                    </p>

                    <button type="button" className="mt-5 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full pl-5 pr-6 py-2 text-xs font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300">
                      <Play size={10} className="fill-current text-current" />
                      <span>Play</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Control Action Base Layer Toolbar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => scrollTrack("left")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-navy hover:text-navy transition-colors bg-white shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            type="button" 
            onClick={() => scrollTrack("right")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-navy hover:text-navy transition-colors bg-white shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <Link href="/new-development" className="inline-flex items-center gap-3 bg-navy text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-navy-light transition-colors shadow-md">
          <span>View All</span>
          <ChevronRight size={14} className="stroke-[3px]" />
        </Link>
      </div>
    </div>
  );
}