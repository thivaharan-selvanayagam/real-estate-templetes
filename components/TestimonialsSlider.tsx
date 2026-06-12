"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🔑 FIXED: Updated all testimonial locations to Canadian cities
const testimonials = [
  {
    quote: "The level of service and global reach is simply unmatched. They didn't just sell our home; they elevated its entire narrative to the world.",
    name: "Sarah Jenkins",
    title: "Seller, Toronto"
  },
  {
    quote: "Finding our dream estate was seamless. The PREMIER team anticipated our needs before we even articulated them. True professionals.",
    name: "David & Elena Rossi",
    title: "Buyers, Vancouver"
  },
  {
    quote: "A masterclass in modern real estate. Their marketing, media production, and negotiation skills are simply in a league of their own.",
    name: "Marcus Thorne",
    title: "Investor, Montreal"
  },
  {
    quote: "The attention to detail and market knowledge is extraordinary. They negotiated a deal that completely exceeded our highest expectations.",
    name: "James & Clara Vance",
    title: "Sellers, Calgary"
  },
  {
    quote: "I've worked with many brokerages, but PREMIER brings a fresh, innovative approach to luxury real estate. Their in-house media team is brilliant.",
    name: "Sophia Lin",
    title: "Developer, Ottawa"
  },
  {
    quote: "Discreet, professional, and incredibly effective. They handled our estate transition with the utmost respect, care, and speed.",
    name: "Arthur Pendelton",
    title: "Buyer, Halifax"
  }
];

export default function TestimonialsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Arrow Click Logic
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      // Scrolls exactly one "card" width at a time
      const scrollAmount = sliderRef.current.clientWidth > 1024 
        ? sliderRef.current.clientWidth / 3 
        : sliderRef.current.clientWidth > 640 
          ? sliderRef.current.clientWidth / 2 
          : sliderRef.current.clientWidth;
          
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12">
      
      {/* Header and Controls Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
        <div>
          <p className="text-[11px] font-bold tracking-[0.45em] uppercase text-gold mb-4">
            Client Experiences
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white">
            Words From Our Clients
          </h2>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all shadow-sm"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} className="mr-0.5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all shadow-sm"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} className="ml-0.5" />
          </button>
        </div>
      </div>

      {/* Draggable Slider Container */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-6 lg:gap-8 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {testimonials.map((testimonial, idx) => (
          <div 
            key={idx} 
            className="bg-white/5 border border-white/10 backdrop-blur-md p-8 lg:p-10 rounded-2xl flex flex-col justify-between shadow-2xl shrink-0 snap-start select-none text-left transition-transform duration-300 hover:bg-white/10 hover:-translate-y-1 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21px)]"
          >
            <div>
              <p className="text-gold text-5xl font-serif leading-none mb-4 opacity-80 pointer-events-none">"</p>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed font-medium mb-8 pointer-events-none">
                {testimonial.quote}
              </p>
            </div>
            <div className="pointer-events-none">
              <p className="text-white font-bold tracking-wide text-sm">{testimonial.name}</p>
              <p className="text-white/50 text-[10px] lg:text-xs font-bold tracking-widest uppercase mt-1.5">
                {testimonial.title}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}