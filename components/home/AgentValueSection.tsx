"use client";

import { Compass, Handshake, TrendingUp } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function AgentValueSection() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  // Icon wrapper styled in warm neutral tones
  const iconWrapperStyle = `flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 text-stone-800 shrink-0 border border-stone-200/60 shadow-sm`;

  const pillars = [
    {
      icon: <Compass size={22} className="text-stone-800" />,
      title: "Strategic Local Guidance",
      desc: "Deep neighborhood-level insight across the Greater Toronto Area to ensure first-time buyers and seasoned investors make confident, informed moves."
    },
    {
      icon: <Handshake size={22} className="text-stone-800" />,
      title: "Tenacious Negotiation",
      desc: "Client-first representation focused on protecting your bottom line—whether securing top dollar for your sale or winning in competitive offer scenarios."
    },
    {
      icon: <TrendingUp size={22} className="text-stone-800" />,
      title: "Resale & Pre-Con Mastery",
      desc: "Complete coverage from existing GTA residential homes to premier pre-construction developments, tailored to your long-term wealth goals."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: WHY REALTHER COPY & PILLARS (Spans 6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-xl">
            <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-sm border border-stone-300/40">
              Why Choose RealtHer
            </div>

            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight leading-[1.15] mb-6`}>
              Two GTA Experts. One Strategic Partnership.
            </h2>
            
            <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal mb-10">
              We founded RealtHer Group to replace standard corporate templates with real, personalized expertise. Led by Reema and Pirasha, our approach combines sharp local market knowledge, analytical foresight, and dedicated advocacy for every client.
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
                    <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PORTRAIT SPOTLIGHT WITH FLOATING TESTIMONIAL CARD (Spans 6 cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative w-full pt-6">
            
            {/* Image Container Card */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl bg-stone-200 shadow-xl overflow-visible">
              
              {/* Main Team Portrait */}
              <img 
                src={BRAND_CONFIG.agent.fullphoto} 
                alt="Reema and Pirasha - RealtHer Group Founders"
                className="w-full h-full object-cover rounded-3xl relative z-10"
              />

              {/* Floating Testimonial Overlay Card */}
              <div className="absolute left-[-16px] sm:left-[-28px] bottom-[-20px] bg-[#F9F6F0] rounded-2xl p-6 shadow-2xl max-w-[290px] sm:max-w-[330px] z-20 border border-stone-200/80 animate-fade-up">
                <p className="text-stone-800 font-light italic text-xs sm:text-sm leading-relaxed mb-4 text-left">
                  "Reema and Pirasha made our GTA home buying process smooth and strategic. Their negotiation skills saved us thousands."
                </p>
                
                {/* Reviewer Meta Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-[#F9F6F0] font-semibold flex items-center justify-center text-[10px] tracking-wider">
                    RP
                  </div>
                  <div className="text-left">
                    <h4 className={`font-semibold ${cleanPrimaryText} text-xs tracking-wide`}>R. & P. Sharma</h4>
                    <p className="text-stone-500 text-[10px] font-medium mt-0.5">GTA Homeowners</p>
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