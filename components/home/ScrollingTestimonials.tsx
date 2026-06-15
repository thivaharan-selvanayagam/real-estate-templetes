"use client";

import React from "react";
import { MessageSquare, UserCheck, Camera } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

const row1Testimonials = [
  {
    name: "Marcus Rodriguez",
    role: "Project Director",
    company: "Urban Development Co.",
    text: "Working with this team was seamless from concept to completion. Their sustainable design solutions reduced our environmental impact by 40% while creating stunning spaces.",
    icon: <MessageSquare size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  },
  {
    name: "Elena Kowalski",
    role: "Interior Design Director",
    company: "Luxe Living Spaces",
    text: "The residential project they designed for us became a showpiece. Every space flows naturally, combining functionality with breathtaking aesthetic appeal.",
    icon: <Camera size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    name: "James Thompson",
    role: "Facilities Manager",
    company: "Metropolitan Hospital",
    text: "Their healthcare facility design prioritized both patient comfort and operational efficiency. The healing environment they created has significantly improved patient satisfaction scores.",
    icon: <UserCheck size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "Amira Hassan",
    role: "Cultural Center Director",
    company: "Heritage Arts Foundation",
    text: "They understood our vision for honoring cultural heritage through modern sustainable architecture. The result is a space that honors tradition while embracing contemporary design.",
    icon: <UserCheck size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  }
];

const row2Testimonials = [
  {
    name: "David Park",
    role: "Head of Operations",
    company: "EcoTech Industries",
    text: "The office complex they designed has become a model for sustainable corporate architecture. Energy efficiency, natural lighting, and employee wellness were perfectly balanced.",
    icon: <UserCheck size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
  },
  {
    name: "Lucia Moretti",
    role: "Museum Curator",
    company: "Contemporary Art Museum",
    text: "Their gallery design creates the perfect backdrop for our exhibitions. The interplay of natural and artificial light enhances every artwork while maintaining conservation standards.",
    icon: <MessageSquare size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
  },
  {
    name: "Robert Williams",
    role: "Principal",
    company: "Riverside Academy",
    text: "The learning environments they created inspire both students and teachers. Flexible spaces, abundant natural light, and thoughtful acoustics have transformed our educational experience.",
    icon: <UserCheck size={15} className="text-gray-400" />,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80"
  }
];

export default function ScrollingTestimonials() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  // 🔑 FIXED: Changed 'idx: number' to 'idx: string | number' to accept custom composite string keys safely
  const renderCard = (card: any, idx: string | number) => (
    <div 
      key={idx}
      className="w-[380px] sm:w-[420px] bg-[#F1F3F7] rounded-[28px] p-6 text-left flex flex-col justify-between shrink-0 mx-3 border border-gray-100 shadow-sm"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-5 w-full">
          <div className="flex items-center gap-3">
            <img 
              src={card.avatar} 
              alt={card.name} 
              className="w-11 h-11 rounded-full object-cover shadow-sm border border-white"
            />
            <div className="flex flex-col">
              <h4 className={`text-sm font-bold ${cleanPrimaryText} tracking-wide`}>{card.name}</h4>
              <p className="text-gray-500 text-[11px] font-semibold">{card.role}</p>
              <p className="text-gray-400 text-[10px] font-medium mt-0.5">{card.company}</p>
            </div>
          </div>
          <div className="p-1.5 bg-white/50 rounded-full flex items-center justify-center">
            {card.icon}
          </div>
        </div>
        
        <p className="text-gray-600 font-medium text-xs sm:text-sm leading-relaxed text-justify">
          {card.text}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-24 bg-white overflow-hidden relative z-20 w-full">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mb-16">
        <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm">
          Client Testimonials
        </div>
        
        <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-5`}>
          What Our Clients Say
        </h2>
        
        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl">
          Discover how our architectural expertise has transformed spaces and exceeded expectations across diverse projects.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 relative">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* ROW 1 */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-ticker-left">
            {row1Testimonials.map((card, i) => renderCard(card, i))}
            {row1Testimonials.map((card, i) => renderCard(card, `dup1-${i}`))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="w-full overflow-hidden flex select-none">
          <div className="animate-ticker-right">
            {row2Testimonials.map((card, i) => renderCard(card, i))}
            {row2Testimonials.map((card, i) => renderCard(card, `dup2-${i}`))}
          </div>
        </div>
      </div>
    </section>
  );
}