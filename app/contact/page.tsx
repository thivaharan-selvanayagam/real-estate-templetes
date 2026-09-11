"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, Building2, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

const lookingToOptions = [
  "Buy",
  "Sell",
  "Invest",
  "Explore Pre-Construction",
  "Get a Home Evaluation",
  "Other"
];

const timelineOptions = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "Just researching"
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent") || "";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lookingTo: "",
    timeline: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-select "I'm Looking To" if intent parameter is present in URL
  useEffect(() => {
    if (intentParam) {
      const matched = lookingToOptions.find(
        (opt) => opt.toLowerCase() === intentParam.toLowerCase()
      );
      if (matched) {
        setForm((prev) => ({ ...prev, lookingTo: matched }));
      }
    }
  }, [intentParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80">
      
      {/* LEFT SIDE: REALTHER CREDENTIALS PANEL */}
      <div className="w-full lg:w-5/12 bg-slate-950 text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden flex flex-col justify-between">
        
        <div className="relative z-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Founding Leadership
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2 uppercase">
            RealtHer Group
          </h2>
          <p className="text-[#4D71A3] text-xs font-semibold uppercase tracking-wider mb-6">
            Reema Shahzad & Pirasha Vygunthavasa
          </p>

          <p className="text-[#F9F6F0]/80 text-xs sm:text-sm leading-relaxed mb-10 font-light">
            Strategic guidance, local GTA market expertise, and client-first negotiation advocacy. Connect with us directly to discuss your property plans.
          </p>

          {/* Direct Info Channels */}
          <div className="flex flex-col gap-6">
            <a href={`tel:${BRAND_CONFIG.agent.phoneRaw}`} className="flex items-center gap-4 group w-fit">
              <div className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#4D71A3] group-hover:bg-[#4D71A3] group-hover:text-white transition-all shrink-0">
                <Phone size={18} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block mb-0.5">Call / Text</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-[#4D71A3] transition-colors">
                  {BRAND_CONFIG.agent.phone}
                </span>
              </div>
            </a>

            <a href={`mailto:${BRAND_CONFIG.agent.email}`} className="flex items-center gap-4 group w-fit">
              <div className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#4D71A3] group-hover:bg-[#4D71A3] group-hover:text-white transition-all shrink-0">
                <Mail size={18} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block mb-0.5">Email</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-[#4D71A3] transition-colors">
                  {BRAND_CONFIG.agent.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 text-left">
              <div className="w-11 h-11 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#4D71A3] shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider block mb-0.5">GTA Coverage</span>
                <span className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed block">
                  Toronto, Durham, York & Peel Regions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brokerage Affiliation */}
        <div className="mt-12 pt-6 border-t border-stone-800 relative z-10 flex items-center gap-3 text-left">
          <Building2 className="text-[#4D71A3]" size={22} />
          <div>
            <span className="text-[9px] uppercase font-semibold tracking-widest text-stone-400 block mb-0.5">Brokerage Licensing</span>
            <span className="text-xs font-semibold tracking-wider text-white">{BRAND_CONFIG.brokerage.name}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LEAD QUALIFICATION FORM */}
      <div className="w-full lg:w-7/12 bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center text-left">
        {submitted ? (
          <div className="bg-[#FDFBF7] border border-stone-200/80 rounded-3xl p-10 text-center mx-auto w-full animate-fade-in">
            <div className="w-14 h-14 bg-[#4D71A3]/10 text-[#4D71A3] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#4D71A3]/20">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Message Received</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-8 max-w-md mx-auto font-normal">
              Thank you for reaching out. Reema or Pirasha will personally review your inquiry and connect with you shortly.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setForm({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  lookingTo: "",
                  timeline: "",
                  message: ""
                });
              }}
              className="bg-slate-900 text-[#F9F6F0] hover:bg-slate-800 text-xs font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full transition-colors font-sans"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
                Direct Inquiry
              </h2>
              <p className="text-stone-500 text-xs font-normal">
                Complete the fields below so we can tailor our advice to your specific timeline.
              </p>
            </div>

            {/* FIRST & LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  First Name *
                </label>
                <input 
                  type="text" 
                  required 
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Jane"
                  className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                />
              </div>
            </div>

            {/* EMAIL & PHONE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  required 
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(416) 000-0000"
                  className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                />
              </div>
            </div>

            {/* REQUIRED QUESTION 1: I'M LOOKING TO */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                I'm Looking To *
              </label>
              <select 
                required 
                value={form.lookingTo}
                onChange={(e) => setForm({ ...form, lookingTo: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
              >
                <option value="" disabled>Select an option</option>
                {lookingToOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* REQUIRED QUESTION 2: TIMELINE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Timeline *
              </label>
              <select 
                required 
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
              >
                <option value="" disabled>Select your timeline</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                How Can We Help You? *
              </label>
              <textarea 
                rows={4} 
                required 
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your preferred GTA neighborhood, property criteria, or questions..."
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all resize-none"
              />
            </div>

            <p className="text-[10px] text-stone-400 leading-relaxed">
              By submitting this form, you agree to be contacted by RealtHer Group via email, call, or text regarding your GTA real estate inquiry.
            </p>

            {/* REQUIRED SUBMIT CTA */}
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#4D71A3] text-white hover:bg-[#3B5B88] min-h-[52px] px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg disabled:opacity-60 flex items-center justify-center font-sans self-start w-full sm:w-auto"
            >
              {loading ? "Sending..." : "Let's Talk About Your Next Move"}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-slate-950 relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" 
            alt="RealtHer Contact Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-stone-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-stone-500">/</span>
            <span className="text-white">Contact</span>
          </div>

          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            Greater Toronto Area Real Estate
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight uppercase mb-4 leading-tight">
              Get In Touch
            </h1>
            <p className="text-[#F9F6F0]/85 text-sm md:text-base leading-relaxed font-light">
              Have questions about first-time home buying, pre-construction allocations, or home valuations? Connect directly with Reema Shahzad and Pirasha Vygunthavasa.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT CONTACT CARD */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 relative z-20 -mt-20 lg:-mt-24 pb-24">
        <Suspense fallback={
          <div className="bg-white p-12 rounded-3xl shadow-xl text-center">
            <p className="text-stone-500 text-sm">Loading contact form...</p>
          </div>
        }>
          <ContactFormContent />
        </Suspense>
      </div>

    </div>
  );
}

export const dynamic = "force-dynamic";