"use client";

import { useState } from "react";

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

export default function GetInTouch({ dark = false }: { dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className={`py-20 lg:py-28 ${dark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"} relative z-20`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: EDITORIAL HEADING & COPY */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 w-fit shadow-sm">
              Contact RealtHer Group
            </div>

            <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 ${dark ? "text-white" : "text-slate-900"}`}>
              Let's Talk About Your Next Move
            </h2>

            <p className={`text-sm md:text-base leading-relaxed font-normal mb-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>
              Whether you are purchasing your first home, planning your next investment, or exploring pre-construction projects, Reema and Pirasha are here to deliver strategic guidance.
            </p>

            {/* HIGHER CONTRAST CALLOUT BOX */}
            <div className={`p-6 rounded-2xl border ${
              dark 
                ? "bg-slate-900 border-slate-800 text-white" 
                : "bg-white border-slate-200/80 shadow-sm text-slate-900"
            }`}>
              <h4 className={`font-bold text-sm md:text-base mb-2 ${dark ? "text-white" : "text-slate-900"}`}>
                Personalized GTA Expertise
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                Every submission is reviewed personally by our founding brokers. We will connect with you directly to evaluate your specific goals and timeline.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: LEAD QUALIFICATION FORM */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-slate-200/80 shadow-xl text-slate-900">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#4D71A3]/10 flex items-center justify-center mx-auto mb-4 border border-[#4D71A3]/20">
                  <svg className="w-7 h-7 text-[#4D71A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900">Thank You!</h3>
                <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                  We have received your details. Reema or Pirasha will be in touch shortly to discuss your real estate plans.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* FIRST & LAST NAME */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Jane" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                    />
                  </div>
                </div>

                {/* EMAIL & PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="jane@example.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      placeholder="(416) 000-0000" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                    />
                  </div>
                </div>

                {/* LEAD QUALIFICATION: I'M LOOKING TO */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    I'm Looking To *
                  </label>
                  <select 
                    required 
                    defaultValue="" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
                  >
                    <option value="" disabled>Select an option</option>
                    {lookingToOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* LEAD QUALIFICATION: TIMELINE */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Timeline *
                  </label>
                  <select 
                    required 
                    defaultValue="" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all"
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
                    How Can We Help? *
                  </label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Tell us a bit about your property preferences, target neighborhood, or goals..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4D71A3] transition-all resize-none"
                  />
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed">
                  By submitting this form, you agree to be contacted by RealtHer Group via email, call, or text regarding your GTA real estate inquiry.
                </p>

                {/* SUBMIT BUTTON */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#4D71A3] text-white hover:bg-[#3B5B88] min-h-[52px] px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg disabled:opacity-60 flex items-center justify-center font-sans"
                >
                  {loading ? "Sending..." : "Let's Talk About Your Next Move"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}