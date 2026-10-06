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
    name: "Mohamed Hagi",
    location: "Toronto, ON",
    category: "Buyer",
    text: "Reema was an absolute pleasure to work with! She helped me find the condo I wanted very quickly and made the whole process smooth and stress-free. She always had my best interest at heart, was attentive to my needs, and went above and beyond.",
    rating: 5,
    tag: "Condo Buyer"
  },
  {
    name: "Leanne Taylor",
    location: "GTA, ON",
    category: "Buyer",
    text: "Reema was an absolute joy to work with! She had helped me originally with my first rental, and now purchasing my very first home! She walked me through every step, and was so supportive in the process.",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "Nicole Taylor",
    location: "Toronto, ON",
    category: "Buyer",
    text: "I really appreciated the care and dedication Reema brings to her work. After a lot of thought, I decided it was time for me to relocate from the eastern suburbs to Toronto to help cut down the strain commuting was putting on me. Reema was exceptionally supportive throughout.",
    rating: 5,
    tag: "Relocation Buyer"
  },
  {
    name: "Sobia Khatoon",
    location: "GTA, ON",
    category: "Seller",
    text: "Reema is amazing! We put our brand new home for rent with Reema as our agent. I was very apprehensive about putting our home on the renter's market; it was our baby. Reema was patient, kind, empathetic, and understanding towards our feelings.",
    rating: 5,
    tag: "Home Leasing"
  },
  {
    name: "Rusha Khan",
    location: "GTA, ON",
    category: "Buyer",
    text: "Reema has a problem-solving mindset and understands the housing market very well. As a first-time home buyer with very little knowledge about the market, Reema was helpful, honest, and made the whole experience fantastic.",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "Nabeel Rahman",
    location: "GTA, ON",
    category: "Investor",
    text: "Reema has helped me with buying a house and also renting out a house, and both times she was exceptional. She was understanding, empathetic, and very knowledgeable. She presented us with all options available and was very patient.",
    rating: 5,
    tag: "Buyer & Landlord"
  },
  {
    name: "Phillip Henriques",
    location: "GTA, ON",
    category: "Investor",
    text: "I had an incredible experience working with Reema Shahzad as our realtor. She went above and beyond to help us find the perfect income property, and her expertise was evident throughout the entire process.",
    rating: 5,
    tag: "Income Property"
  },
  {
    name: "Hamza Bin Zubair",
    location: "GTA, ON",
    category: "Buyer",
    text: "Reema was the most professional person I have met in the industry. She was so knowledgeable about everything we had asked her; including interest rates, market rents, comparisons, overall an amazing understanding of the market. And she got me my dream first home!",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "Kiran Sethi",
    location: "GTA, ON",
    category: "Buyer",
    text: "Reema worked with us extensively and was committed to helping us find the perfect home. Her positive attitude and bubbly personality was easy going and a breath of fresh air to be around. Highly recommend her as a realtor.",
    rating: 5,
    tag: "Homebuyer"
  },
  {
    name: "Umna Asim",
    location: "Mississauga, ON",
    category: "Buyer",
    text: "Reema helped us get a condo in Mississauga last year in a very competitive market. She was super helpful and was also driving us to places since we didn’t have a car. She went above and beyond and to this day, we’re in touch and she continues to help.",
    rating: 5,
    tag: "Condo Buyer"
  },
  {
    name: "Sal",
    location: "GTA, ON",
    category: "Seller",
    text: "Reema is very courteous and thoughtful when considering the needs of her real estate clients. She is timely in her follow-up and was great at helping me understand process nuances and next-steps. 10/10 would recommend.",
    rating: 5,
    tag: "Client Success"
  },
  {
    name: "Nabeel Syed",
    location: "GTA, ON",
    category: "Investor",
    text: "With Reema’s help I purchased my second investment property. She also helped me lease out 2 of my other properties. I appreciate that she has been a valuable resource for me throughout these transactions. Would highly recommend her!",
    rating: 5,
    tag: "Portfolio Investor"
  },
  {
    name: "God Holiday",
    location: "GTA, ON",
    category: "Buyer",
    text: "Reema was a pleasure to work with, she went above and beyond to help my wife and I find exactly what we were looking for. Truly happy in our new place. Thank you Reema!",
    rating: 5,
    tag: "Homebuyer"
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
            Verified Google Reviews
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase mb-4 leading-tight">
            Client Stories
          </h1>
          <p className="max-w-xl mx-auto text-[#F9F6F0]/85 text-sm md:text-base leading-relaxed font-light">
            Read authentic Google reviews from GTA homebuyers, sellers, and investors who partnered with Reema and Pirasha for strategic real estate moves.
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