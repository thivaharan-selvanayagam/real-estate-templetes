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
    name: "Mohamed Hagi",
    role: "Condo Buyer",
    location: "Toronto",
    category: "Buyer",
    text: "Reema was an absolute pleasure to work with! She helped me find the condo I wanted very quickly and made the whole process smooth and stress-free. She always had my best interest at heart.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "Leanne Taylor",
    role: "First-Time Buyer",
    location: "GTA",
    category: "Buyer",
    text: "Reema was an absolute joy to work with! She helped me originally with my first rental, and now purchasing my very first home! She walked me through every step and was so supportive.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    name: "Phillip Henriques",
    role: "Income Property Investor",
    location: "GTA",
    category: "Investor",
    text: "I had an incredible experience working with Reema Shahzad. She went above and beyond to help us find the perfect income property, and her expertise was evident throughout the entire process.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
  },
  {
    name: "Rusha Khan",
    role: "First-Time Buyer",
    location: "GTA",
    category: "Buyer",
    text: "Reema has a problem-solving mindset and understands the housing market very well. As a first-time home buyer with very little knowledge, she was helpful, honest, and truly fantastic.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
  },
  {
    name: "Sobia Khatoon",
    role: "Property Landlord",
    location: "GTA",
    category: "Seller",
    text: "We put our brand new home for rent with Reema as our agent. I was very apprehensive, but Reema was patient, kind, empathetic, and understanding towards our feelings.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80"
  },
  {
    name: "Hamza Bin Zubair",
    role: "First-Time Buyer",
    location: "GTA",
    category: "Buyer",
    text: "Reema was the most professional person I have met in the industry. So knowledgeable about interest rates, market rents, comparisons, and got me my dream first home!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  }
];

const row2Testimonials: Testimonial[] = [
  {
    name: "Nabeel Syed",
    role: "Portfolio Investor",
    location: "GTA",
    category: "Investor",
    text: "With Reema’s help I purchased my second investment property. She also helped me lease out 2 of my other properties. I appreciate that she has been a valuable resource for me throughout!",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
  },
  {
    name: "Umna Asim",
    role: "Condo Buyer",
    location: "Mississauga",
    category: "Buyer",
    text: "Reema helped us get a condo in Mississauga in a very competitive market. She went above and beyond and drove us to showings when we didn't have a car! To this day she continues to help.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80"
  },
  {
    name: "Nicole Taylor",
    role: "Relocation Buyer",
    location: "Toronto",
    category: "Buyer",
    text: "I really appreciated the care and dedication Reema brings to her work. She helped me relocate from the eastern suburbs to Toronto to cut down on commuting strain seamlessly.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  },
  {
    name: "Nabeel Rahman",
    role: "Buyer & Landlord",
    location: "GTA",
    category: "Investor",
    text: "Reema has helped me with buying a house and also renting out a house, and both times she was exceptional. Understanding, empathetic, knowledgeable, and presented all options clearly.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80"
  },
  {
    name: "Kiran Sethi",
    role: "Homebuyer",
    location: "GTA",
    category: "Buyer",
    text: "Reema worked with us extensively and was committed to helping us find the perfect home. Her positive attitude and bubbly personality made her a breath of fresh air to be around.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
  },
  {
    name: "Sal",
    role: "Homeowner",
    location: "GTA",
    category: "Seller",
    text: "Reema is very courteous and thoughtful when considering the needs of her clients. She is timely in her follow-up and great at helping understand process nuances and next steps. 10/10!",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80"
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
          Read real Google reviews from homebuyers, sellers, and investors who experienced seamless real estate transactions with Reema.
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