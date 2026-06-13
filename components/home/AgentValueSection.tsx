"use client";

import { ShieldCheck, Award, Zap } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function AgentValueSection() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanAccentText = BRAND_CONFIG.theme.accentText;

  // Dynamically assemble icon background bubble and accent states
  const iconWrapperStyle = `flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-700 shrink-0`;

  const pillars = [
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure Transactions",
      desc: "We stand by you with complete representation framework protection from the initial title review process straight down to key delivery."
    },
    {
      icon: <Award size={20} />,
      title: "Premium Portfolio",
      desc: "We strictly curate residential, portfolio, and luxury properties that meet our advanced design standards and offer high foundational investment value."
    },
    {
      icon: <Zap size={20} />,
      title: "Fast Valuation",
      desc: "Discover the true real-time asset market value of your property within 24 hours leveraging advanced localized comparative analytics."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HIGH CONTRAST COPY & VALUE PILLARS (Spans 6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">
            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-6`}>
              Redefining Standards in Real Estate Services
            </h2>
            
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium mb-10">
              Leave old traditional methods behind. We transform your property journey into a stress-free experience driven by deep analytics, completely transparent operations, and personalized high-tier consultancy.
            </p>

            {/* Value Features Vertical Stack */}
            <div className="flex flex-col gap-8 w-full">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className={iconWrapperStyle}>
                    {pillar.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className={`font-display text-base font-bold ${cleanPrimaryText} tracking-wide mb-1.5`}>
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT COMPOSITION WITH OVERLAPPING FLOATING TESTIMONIAL (Spans 6 cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full pt-6">
            
            {/* Visual offset alignment background drop shadow card */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl bg-neutral-100 shadow-xl overflow-visible">
              
              {/* Main Agent Portrait drawn dynamically from BRAND_CONFIG */}
              <img 
                src={BRAND_CONFIG.agent.fullphoto} 
                alt={`${BRAND_CONFIG.agent.name} - ${BRAND_CONFIG.agent.title}`}
                className="w-full h-full object-cover rounded-3xl relative z-10"
              />

              {/* 🔑 FIXED: Floating Card Badge Overlay matching image_c41fb4.jpg precisely */}
              <div className="absolute left-[-24px] sm:left-[-32px] bottom-[-24px] bg-white rounded-2xl p-5 shadow-2xl max-w-[280px] sm:max-w-[320px] z-20 border border-gray-100 animate-fade-up">
                <p className={`text-gray-800 font-medium italic text-xs sm:text-sm leading-relaxed mb-4 text-justify`}>
                  "Working with {BRAND_CONFIG.meta.siteName.split('.')[0]} was the best investment decision of my life."
                </p>
                
                {/* Reviewer Meta Profile */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${BRAND_CONFIG.theme.primaryBg} text-white font-bold flex items-center justify-center text-[10px]`}>
                    JC
                  </div>
                  <div className="text-left">
                    <h4 className={`font-bold ${cleanPrimaryText} text-xs tracking-wide`}>Jane Cooper</h4>
                    <p className="text-gray-400 text-[10px] font-semibold mt-0.5">Architect</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}