"use client";

import { useState } from "react";
import Link from "next/link";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

export default function HomeEvaluationPage() {
  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeframe: "",
    consent: false,
  });

  // Handlers
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length > 5) {
      setStep(2);
    } else {
      alert("Please enter a valid property address.");
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the communication terms to proceed.");
      return;
    }
    setStep(3);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-slate-900">
      
      {/* 1. HERO SECTION WITH 3-STEP FORM */}
      <section className="relative min-h-[680px] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80" 
            alt="GTA Property Assessment"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center mt-6">
          
          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${step >= 1 ? 'bg-[#F9F6F0] text-slate-900 border-[#F9F6F0]' : 'border-white/40 text-white/50'}`}>1</div>
            <div className={`w-12 sm:w-16 h-px ${step >= 2 ? 'bg-[#F9F6F0]' : 'bg-white/20'}`} />
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${step >= 2 ? 'bg-[#F9F6F0] text-slate-900 border-[#F9F6F0]' : 'border-white/40 text-white/50'}`}>2</div>
            <div className={`w-12 sm:w-16 h-px ${step >= 3 ? 'bg-[#F9F6F0]' : 'bg-white/20'}`} />
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${step === 3 ? 'bg-[#F9F6F0] text-slate-900 border-[#F9F6F0]' : 'border-white/40 text-white/50'}`}>3</div>
          </div>

          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            Professional GTA Market Assessment
          </div>

          {/* REQUIRED HEADLINE */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase mb-4 text-center leading-tight">
            WHAT COULD YOUR HOME SELL FOR?
          </h1>

          <p className="text-[#F9F6F0]/85 text-sm md:text-base font-light text-center max-w-xl mb-10">
            Get an accurate, personalized valuation from experienced GTA real estate brokers—not an automated computer algorithm.
          </p>

          {/* FORM CONTAINER */}
          <div className="w-full max-w-2xl bg-stone-900/60 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl">
            
            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[#F9F6F0] text-xs font-semibold tracking-wider uppercase ml-1">
                    Property Address
                  </label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your street address, city, or postal code..." 
                    className="w-full bg-[#FDFBF7] border border-stone-200 outline-none text-slate-900 placeholder:text-stone-400 px-6 py-4 rounded-full text-sm focus:ring-2 focus:ring-[#4D71A3] transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-[#F9F6F0] text-slate-900 px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all self-center mt-2 shadow-md font-sans"
                >
                  Continue
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="flex flex-col gap-5 animate-fade-in text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Full Name *" 
                    required
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#FDFBF7] outline-none text-slate-900 placeholder:text-stone-400 px-5 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#4D71A3]"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    required
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#FDFBF7] outline-none text-slate-900 placeholder:text-stone-400 px-5 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#4D71A3]"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    required
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#FDFBF7] outline-none text-slate-900 placeholder:text-stone-400 px-5 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#4D71A3]"
                  />
                  <select 
                    value={formData.timeframe} 
                    onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                    className="w-full bg-[#FDFBF7] outline-none text-slate-900 px-5 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#4D71A3]"
                  >
                    <option value="" disabled>Select Timeframe (Optional)</option>
                    <option value="now">Immediately</option>
                    <option value="1_3_months">1–3 months</option>
                    <option value="3_6_months">3–6 months</option>
                    <option value="researching">Just researching</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    required
                    checked={formData.consent} 
                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    className="mt-1 w-4 h-4 rounded border-stone-300 text-[#4D71A3] focus:ring-[#4D71A3]"
                  />
                  <label htmlFor="consent" className="text-[11px] leading-relaxed text-stone-300 font-light">
                    I agree to be contacted by RealtHer Group (Reema Shahzad & Pirasha Vygunthavasa) via call, email, or text regarding my GTA home evaluation inquiry.
                  </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-stone-300 text-xs uppercase tracking-wider hover:text-white font-semibold"
                  >
                    &larr; Back
                  </button>
                  {/* REQUIRED CTA */}
                  <button 
                    type="submit" 
                    className="bg-[#4D71A3] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#3B5B88] transition-all shadow-md font-sans"
                  >
                    Get My Home Evaluation
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="text-center text-white py-6 animate-fade-in">
                <div className="w-14 h-14 bg-[#4D71A3] rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Evaluation Request Received</h3>
                <p className="text-[#F9F6F0]/90 text-sm leading-relaxed max-w-md mx-auto font-light">
                  Reema and Pirasha are analyzing recent local sales, neighborhood trends, and active inventory for <strong className="text-white">{address}</strong>. We will deliver your custom analysis shortly.
                </p>
                <button 
                  onClick={() => { setStep(1); setAddress(""); }} 
                  className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#4D71A3] hover:text-white transition-colors"
                >
                  Evaluate Another Property
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. REAL HUMAN EXPERTISE VS ALGORITHM */}
      <section className="py-20 lg:py-28 max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 w-fit border border-stone-300/40">
              Expert GTA Assessment
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-snug">
              Why Real Broker Expertise Outperforms Automated Algorithms
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
              Online valuation portals use generic algorithms that miss what makes your property unique—such as recent high-end upgrades, micro-neighborhood demand, school catchments, and specific floor plan layouts.
            </p>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
              As active Greater Toronto Area brokers and investors, Reema Shahzad and Pirasha Vygunthavasa combine real-time local MLS market data with hands-on GTA experience to give you a true, actionable assessment of what your home could sell for in today’s market.
            </p>
          </div>
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/80">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" 
              alt="GTA Residential Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. INFO CARDS */}
      <section className="pb-20 max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-stone-200/80 p-8 rounded-3xl text-left shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4 tracking-tight">
              What Is a Professional Valuation?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
              A professional home valuation evaluates your property's actual market worth based on recent neighborhood transactions, property condition, and current buyer demand across the GTA.
            </p>
          </div>

          <div className="bg-white border border-stone-200/80 p-8 rounded-3xl text-left shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4 tracking-tight">
              How Is It Calculated?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
              We conduct a detailed Comparative Market Analysis (CMA), weighing recent nearby sales, property size, lot dimensions, renovations, interest rate environments, and micro-market trends.
            </p>
          </div>

          <div className="bg-white border border-stone-200/80 p-8 rounded-3xl text-left shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-4 tracking-tight">
              Why Avoid Automated Tools?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
              Automated algorithms cannot evaluate unique interior finishes, localized street appeal, or buyer sentiment. Direct broker expertise ensures you don't leave money on the table.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="bg-slate-950 py-16 border-y border-white/10">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
              Explore Current GTA Listings
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-light">
              See what similar homes in your community are asking right now.
            </p>
          </div>
          <Link 
            href="/all-homes" 
            className="bg-[#F9F6F0] text-slate-900 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg font-sans shrink-0"
          >
            Search GTA Homes
          </Link>
        </div>
      </section>

      {/* 5. PROCESS: HOW A VALUATION IS PERFORMED */}
      <section className="py-20 lg:py-28 max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
        <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 w-fit mx-auto shadow-sm border border-stone-300/40">
          Professional Methodology
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          How We Evaluate Your Home
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-widest mb-16 font-medium">
          Two Proven Approaches to Establishing True Market Value
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="bg-[#4D71A3] text-white px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-block mb-4">
                Comparative Market Analysis (CMA)
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-3">
                Broker-Led Market Analysis
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                Reema and Pirasha analyze comparable properties recently sold in your specific GTA neighborhood. We adjust for floor plan variations, lot size, interior condition, and current buyer competition to establish an optimal list price.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-block mb-4">
                In-Person Appraisal & Consultation
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-3">
                On-Site Property Inspection
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                For complete precision, we conduct a walkthrough to inspect custom upgrades, architectural details, structural health, and lot positioning. This yields the most accurate evaluation before launching to market.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}