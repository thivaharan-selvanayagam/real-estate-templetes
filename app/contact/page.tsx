"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Building2, Send } from "lucide-react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Dynamic style mappings to cleanly mix hover states and inputs
  const hoverAccentText = `hover:${BRAND_CONFIG.theme.accentText}`;
  const hoverPrimaryBg = `hover:${BRAND_CONFIG.theme.primaryBg}`;
  const focusBorderPrimary = `focus:border-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}`;
  const focusLabelPrimary = `peer-focus:text-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}`;

  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      
      {/* 1. DYNAMIC THEMED HEADER AREA */}
      <section className={`${BRAND_CONFIG.theme.primaryBg} relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden`}>
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" 
            alt="Office Building"
            className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
          />
          {/* Dynamic alpha gradient masking matched to the primary theme variable background */}
          <div className={`absolute inset-0 ${BRAND_CONFIG.theme.primaryBg} via-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}/90 to-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}/80 opacity-95`} />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          {/* Breadcrumb row */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/50 mb-6 animate-fade-up">
            <Link href="/" className={`transition-colors ${hoverAccentText}`}>Home</Link>
            <span className={BRAND_CONFIG.theme.accentText}>/</span>
            <span className="text-white">Contact</span>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase mb-4 animate-fade-up delay-100">
              Get In Touch
            </h1>
            {/* 🔑 DYNAMIC: Pulls target first name automatically */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed animate-fade-up delay-200">
              Have questions about property metrics, structural evaluations, or local listings? Connect with {BRAND_CONFIG.agent.name.split(" ")[0]} for unparalleled real estate counsel.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT CONTACT CARD (Pulled up over the header) */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-20 -mt-20 lg:-mt-24 pb-24">
        
        {/* Luxury Seamless Split Card Wrapper */}
        <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          
          {/* LEFT SIDE: Dynamic Themed Credentials Panel */}
          <div className={`w-full lg:w-5/12 ${BRAND_CONFIG.theme.primaryBg} text-white p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between`}>
            {/* Subtle background branding flair */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23ffffff'/%3E%3C/svg%3E")` }} />
            
            <div className="relative z-10">
              {/* 🔑 DYNAMIC: Brand Sub-label color matching */}
              <span className={`${BRAND_CONFIG.theme.accentText} text-[10px] font-bold tracking-[0.3em] uppercase block mb-4`}>
                {BRAND_CONFIG.meta.siteName}
              </span>
              {/* 🔑 DYNAMIC: Full Agent Name Header */}
              <h2 className="font-display text-3xl font-bold tracking-wide mb-6 uppercase leading-snug">
                {BRAND_CONFIG.agent.name}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-12">
                Providing sophisticated advisory services and elite tactical representation across local markets and surrounding municipalities.
              </p>

              {/* Direct Info Channels */}
              <div className="flex flex-col gap-8">
                {/* 🔑 DYNAMIC: Automated Phone links and accent highlights */}
                <a href={`tel:${BRAND_CONFIG.agent.phoneRaw}`} className="flex items-center gap-5 group w-fit">
                  <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${BRAND_CONFIG.theme.accentText} group-hover:bg-amber-500 group-hover:text-slate-900 transition-all shrink-0`}>
                    <Phone size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block mb-0.5">Call / Text</span>
                    <span className={`text-sm font-semibold tracking-wider transition-colors ${hoverAccentText}`}>{BRAND_CONFIG.agent.phone}</span>
                  </div>
                </a>

                {/* 🔑 DYNAMIC: Automated Mail links and accent highlights */}
                <a href={`mailto:${BRAND_CONFIG.agent.email}`} className="flex items-center gap-5 group w-fit">
                  <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${BRAND_CONFIG.theme.accentText} group-hover:bg-amber-500 group-hover:text-slate-900 transition-all shrink-0`}>
                    <Mail size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block mb-0.5">Email</span>
                    <span className={`text-sm font-semibold tracking-wider transition-colors ${hoverAccentText}`}>{BRAND_CONFIG.agent.email}</span>
                  </div>
                </a>

                {/* 🔑 DYNAMIC: Map Address Strings */}
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${BRAND_CONFIG.theme.accentText} shrink-0`}>
                    <MapPin size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block mb-0.5">Office</span>
                    <span className="text-sm text-white/90 font-medium leading-relaxed max-w-[240px] block">
                      {BRAND_CONFIG.brokerage.address.split(",")[0]},<br/>
                      {BRAND_CONFIG.brokerage.address.split(",").slice(1).join(",").trim()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Brokerage Validation Stamp */}
            <div className="mt-16 pt-8 border-t border-white/10 relative z-10 flex items-center gap-4">
              <Building2 className={BRAND_CONFIG.theme.accentText} size={24} strokeWidth={1.5} />
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 block mb-0.5">Brokerage Affiliation</span>
                <span className="text-xs font-bold tracking-widest text-white/90">{BRAND_CONFIG.brokerage.name}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Crisp White Form Panel */}
          <div className="w-full lg:w-7/12 bg-white p-10 lg:p-16 flex flex-col justify-center">
            {submitted ? (
              <div className="bg-[#F8F7F4] border border-gray-100 rounded-2xl p-10 text-center mx-auto w-full animate-fade-in">
                <div className={`w-16 h-16 bg-amber-500/10 ${BRAND_CONFIG.theme.accentText} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Send size={28} />
                </div>
                <h3 className={`font-display text-2xl font-bold ${BRAND_CONFIG.theme.primaryText} uppercase tracking-wide mb-3`}>Message Sent</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Thank you for reaching out. {BRAND_CONFIG.agent.name.split(" ")[0]} will personally review your request and connect with you shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className={`${BRAND_CONFIG.theme.primaryBg} text-white text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-full ${hoverAccentText} transition-colors`}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                <div>
                  <h2 className={`font-display text-2xl lg:text-3xl font-bold ${BRAND_CONFIG.theme.primaryText} uppercase tracking-wide mb-2`}>
                    Direct Inquiry
                  </h2>
                  <p className="text-gray-400 text-xs font-medium">Fields marked with * are required to secure an official response.</p>
                </div>

                {/* Input Fields Stack with Dynamic Form Highlighting variables */}
                <div className="flex flex-col gap-6">
                  <div className="relative">
                    <input 
                      type="text" required placeholder=" " 
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm text-slate-900 outline-none ${focusBorderPrimary} transition-colors placeholder-shown:border-gray-200`}
                    />
                    <label className={`absolute left-0 top-3 text-xs uppercase font-bold tracking-widest text-gray-400 pointer-events-none transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-[10px] ${focusLabelPrimary} -top-5 text-[10px]`}>
                      Full Name *
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div className="relative">
                      <input 
                        type="email" required placeholder=" " 
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm text-slate-900 outline-none ${focusBorderPrimary} transition-colors`}
                      />
                      <label className={`absolute left-0 top-3 text-xs uppercase font-bold tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-5 peer-focus:text-[10px] ${focusLabelPrimary} -top-5 text-[10px]`}>
                        Email Address *
                      </label>
                    </div>

                    <div className="relative">
                      <input 
                        type="tel" required placeholder=" " 
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm text-slate-900 outline-none ${focusBorderPrimary} transition-colors`}
                      />
                      <label className={`absolute left-0 top-3 text-xs uppercase font-bold tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-5 peer-focus:text-[10px] ${focusLabelPrimary} -top-5 text-[10px]`}>
                        Phone Number *
                      </label>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <textarea 
                      rows={4} required placeholder=" " 
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-sm text-slate-900 outline-none ${focusBorderPrimary} transition-colors resize-none`}
                    />
                    <label className={`absolute left-0 top-3 text-xs uppercase font-bold tracking-widest text-gray-400 pointer-events-none transition-all peer-focus:-top-5 peer-focus:text-[10px] ${focusLabelPrimary} -top-5 text-[10px]`}>
                      How Can I Help You? *
                    </label>
                  </div>
                </div>

                {/* Submit Action configured with core client branding styles */}
                <button 
                  type="submit" 
                  className={`${BRAND_CONFIG.theme.accentBg} text-white text-xs font-bold tracking-widest uppercase px-10 py-4 rounded-full ${hoverPrimaryBg} transition-colors self-start mt-4 shadow-md hover:shadow-lg`}
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}