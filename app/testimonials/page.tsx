"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight, Home, Key, TrendingUp, Building2 } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

type Category = "All" | "Buyer" | "Seller" | "Investor" | "Pre-Construction";

interface Testimonial {
  name: string;
  location: string;
  category: "Buyer" | "Seller" | "Investor" | "Pre-Construction";
  text: string;
  rating: number;
  tag: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya & Rohan M.",
    location: "Pickering, ON",
    category: "Buyer",
    text: "Reema and Pirasha made finding our first home in Pickering completely stress-free. As first-time buyers, we had so many questions, but their step-by-step guidance, patience, and local market insight gave us total confidence.",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "Michael & Elena K.",
    location: "Markham, ON",
    category: "Seller",
    text: "Their valuation and strategy call were spot-on. From pricing advice to staging guidance and multi-channel marketing, we received clean offers and sold above our target price in under a week. Outstanding negotiation!",
    rating: 5,
    tag: "Home Seller"
  },
  {
    name: "David T.",
    location: "Oshawa, ON",
    category: "Investor",
    text: "Working with RealtHer Group on our investment property was seamless. Reema ran real numbers on actual properties, evaluated rental yields, and helped us secure a high-performing property with long-term equity potential.",
    rating: 5,
    tag: "Property Investor"
  },
  {
    name: "Anita & Marcus B.",
    location: "Vaughan, ON",
    category: "Pre-Construction",
    text: "Navigating pre-construction allocations can be overwhelming, but Pirasha guided us through builder contracts, deposit structures, and floor plan selection effortlessly. We secured the exact allocation we wanted.",
    rating: 5,
    tag: "Pre-Construction"
  },
  {
    name: "Kevin & Sarah L.",
    location: "Toronto to Whitby, ON",
    category: "Seller",
    text: "Reema managed both our sale in Toronto and our purchase in Whitby perfectly. Managing simultaneous closings is usually stressful, but their team kept everything synchronized and transparent throughout.",
    rating: 5,
    tag: "Seller & Buyer"
  },
  {
    name: "Vanessa C.",
    location: "Stouffville, ON",
    category: "Buyer",
    text: "They took the time to explain every single detail in the offer contract. Having two experienced brokers in my corner who truly understand the GTA market made all the difference during negotiations.",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "Alex R.",
    location: "Richmond Hill, ON",
    category: "Investor",
    text: "Strategic advice at its finest. Reema and Pirasha know the York Region market inside out. They helped us identify strong growth corridors and ran thorough financial projections before we made an offer.",
    rating: 5,
    tag: "Portfolio Investor"
  },
  {
    name: "Daniela & Mark S.",
    location: "Ajax, ON",
    category: "Buyer",
    text: "Pirasha's home matchmaking skills are real! She listened to everything our family needed, showed us properties that actually fit our budget, and negotiated a fantastic deal for us in Ajax.",
    rating: 5,
    tag: "Suburban Buyer"
  },
  {
    name: "Jason & Chloe W.",
    location: "Toronto, ON",
    category: "Pre-Construction",
    text: "The pre-construction insight Reema and Pirasha provided was invaluable. They pointed out potential builder fee traps and guided us to a project along a major transit corridor with high rental demand.",
    rating: 5,
    tag: "Pre-Con Portfolio"
  }
];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Buyer", "Seller", "Investor", "Pre-Construction"];

  const filteredTestimonials = activeCategory === "All" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case "Buyer": return <Home size={13} />;
      case "Seller": return <Key size={13} />;
      case "Investor": return <TrendingUp size={13} />;
      case "Pre-Construction": return <Building2 size={13} />;
      default: return null;
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[420px] lg:h-[480px] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80" 
            alt="RealtHer Client Experiences"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            Client Experiences & Reviews
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase mb-4 leading-tight">
            Client Stories
          </h1>
          <p className="max-w-xl mx-auto text-[#F9F6F0]/85 text-sm md:text-base leading-relaxed font-light">
            Read real stories from GTA homebuyers, sellers, and investors who partnered with Reema and Pirasha for strategic real estate moves.
          </p>
        </div>
      </section>

      {/* 2. REVIEWS & CATEGORY FILTER SECTION */}
      <section className="py-16 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-sans ${
                activeCategory === cat
                  ? "bg-slate-900 text-[#F9F6F0] shadow-md"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Responsive Masonry / Multicolumn Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {filteredTestimonials.map((review, index) => (
            <div 
              key={index} 
              className="break-inside-avoid bg-white border border-stone-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              <Quote className="absolute right-6 top-6 text-stone-200/60 w-10 h-10 pointer-events-none group-hover:text-[#4D71A3]/20 transition-colors duration-300" />

              {/* Tag & Rating */}
              <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-800 bg-[#F9F6F0] border border-stone-200/80 px-3 py-1 rounded-full">
                  {review.tag}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-stone-800 fill-stone-800" />
                  ))}
                </div>
              </div>

              {/* Review Quote Text */}
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal mb-6 relative z-10 text-left">
                "{review.text}"
              </p>

              {/* Reviewer Meta Footer */}
              <div className="flex items-center gap-3 mt-auto border-t border-stone-100 pt-5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-[#F9F6F0] flex items-center justify-center font-semibold text-xs shrink-0 tracking-wider">
                  {review.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-slate-900 text-xs tracking-wide">{review.name}</h4>
                  <p className="text-stone-500 text-[11px] font-normal mt-0.5">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. CALL TO ACTION BANNER */}
      <section className="bg-slate-950 py-20 text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 w-fit mx-auto shadow-sm">
            Start Your Real Estate Journey
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-6 leading-tight">
            Ready to Plan Your Next Move?
          </h2>
          <p className="text-[#F9F6F0]/85 text-sm md:text-base font-light mb-8 max-w-xl mx-auto">
            Partner with Reema Shahzad and Pirasha Vygunthavasa for strategic advice, local GTA knowledge, and tenacious negotiation advocacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 font-sans"
            >
              Let's Talk About Your Next Move <ArrowRight size={14} />
            </Link>
            <Link 
              href="/all-homes" 
              className="border border-white/30 text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white hover:text-slate-900 transition-all font-sans"
            >
              Browse GTA Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";