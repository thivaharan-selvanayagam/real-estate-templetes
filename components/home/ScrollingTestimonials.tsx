"use client";

import React from "react";
import { Star, Home, TrendingUp, Key, Building2 } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  category: "Buyer" | "Seller" | "Investor" | "Pre-Construction";
  text: string;
  avatar: string;
}

const row1Testimonials: Testimonial[] = [
  {
    name: "Priya & Rohan M.",
    role: "First-Time Buyers",
    location: "Pickering",
    category: "Buyer",
    text: "Reema and Pirasha made buying our first home in Pickering completely stress-free. Their local knowledge, patience, and step-by-step guidance gave us so much confidence.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    name: "Michael & Elena K.",
    role: "Home Sellers",
    location: "Markham",
    category: "Seller",
    text: "Their valuation and strategy call were spot-on. We sold above our target price in under a week thanks to their proactive staging advice and sharp negotiation skills.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  },
  {
    name: "David T.",
    role: "Real Estate Investor",
    location: "Oshawa",
    category: "Investor",
    text: "Working with RealtHer Group on our investment property was seamless. They ran the numbers on actual properties, verified rental yields, and secured fantastic terms.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "Anita B.",
    role: "Pre-Con Client",
    location: "Vaughan",
    category: "Pre-Construction",
    text: "Navigating pre-construction allocations can be overwhelming, but Pirasha guided us through builder incentives and floor plan selections effortlessly.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  }
];

const row2Testimonials: Testimonial[] = [
  {
    name: "Kevin & Sarah L.",
    role: "Sellers & Buyers",
    location: "Toronto to Whitby",
    category: "Seller",
    text: "Reema managed both our sale in Toronto and our purchase in Whitby without missing a beat. Outstanding strategy, constant communication, and clear advice throughout.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
  },
  {
    name: "Vanessa C.",
    role: "First-Time Buyer",
    location: "Stouffville",
    category: "Buyer",
    text: "They took the time to explain every clause in the offer. As a first-time homebuyer, having two experienced brokers in my corner made all the difference.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
  },
  {
    name: "Alex R.",
    role: "Portfolio Investor",
    location: "Richmond Hill",
    category: "Investor",
    text: "Strategic advice at its finest. Reema and Pirasha know the GTA market inside out and helped us identify strong long-term appreciation corridors.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
  }
];

export default function ScrollingTestimonials() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  const getCategoryIcon = (category: Testimonial["category"]) => {
    switch (category) {
      case "Buyer":
        return <Home size={12} className="text-stone-700" />;
      case "Seller":
        return <Key size={12} className="text-stone-700" />;
      case "Investor":
        return <TrendingUp size={12} className="text-stone-700" />;
      case "Pre-Construction":
        return <Building2 size={12} className="text-stone-700" />;
    }
  };

  const renderCard = (card: Testimonial, idx: string | number) => (
    <div 
      key={idx}
      className="w-[360px] sm:w-[410px] bg-[#F9F6F0] rounded-[24px] p-6 text-left flex flex-col justify-between shrink-0 mx-3 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
    >
      <div>
        {/* Header: User Profile & Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-4 w-full">
          <div className="flex items-center gap-3">
            <img 
              src={card.avatar} 
              alt={card.name} 
              className="w-11 h-11 rounded-full object-cover shadow-sm border border-white"
            />
            <div className="flex flex-col">
              <h4 className={`text-sm font-semibold ${cleanPrimaryText} tracking-wide`}>{card.name}</h4>
              <p className="text-stone-500 text-[11px] font-medium">{card.role} • {card.location}</p>
            </div>
          </div>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/60 border border-stone-300/40 text-[10px] font-semibold text-stone-800 shrink-0">
            {getCategoryIcon(card.category)}
            <span>{card.category}</span>
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className="text-stone-800 fill-stone-800" />
          ))}
        </div>
        
        {/* Testimonial Quote */}
        <p className="text-stone-700 font-normal text-xs sm:text-sm leading-relaxed text-left">
          "{card.text}"
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] overflow-hidden relative z-20 w-full">
      
      {/* SECTION HEADER */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mb-16">
        <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 shadow-sm border border-stone-300/40">
          Client Experiences
        </div>
        
        <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
          Trusted Across the GTA
        </h2>
        
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
          Read real stories from homebuyers, sellers, and investors who partnered with Reema and Pirasha for strategic advice and smooth moves.
        </p>
      </div>

      {/* INFINITE SCROLLING TICKER CONTAINER */}
      <div className="w-full flex flex-col gap-6 relative">
        {/* Gradient Side Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

        {/* ROW 1: Ticker Moving Left */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-ticker-left flex">
            {row1Testimonials.map((card, i) => renderCard(card, i))}
            {row1Testimonials.map((card, i) => renderCard(card, `dup1-${i}`))}
          </div>
        </div>

        {/* ROW 2: Ticker Moving Right */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-ticker-right flex">
            {row2Testimonials.map((card, i) => renderCard(card, i))}
            {row2Testimonials.map((card, i) => renderCard(card, `dup2-${i}`))}
          </div>
        </div>
      </div>

    </section>
  );
}