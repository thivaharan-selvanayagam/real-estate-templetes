import Link from "next/link";
import { ArrowDown, ShieldCheck, MapPin, Handshake, TrendingUp, Building2, Key } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `Meet RealtHer Group | Reema Shahzad & Pirasha Vygunthavasa` 
};

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] lg:h-[75vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={BRAND_CONFIG.meta.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"}
            alt="RealtHer Group GTA Real Estate Background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
            Greater Toronto Area Real Estate Brokers
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-up uppercase leading-[1.1]">
            Meet RealtHer Group
          </h1>
          <p className="mt-4 text-[#F9F6F0]/90 text-base md:text-xl font-light max-w-2xl mx-auto">
            Strategic guidance. Local GTA expertise. A smarter move.
          </p>
          <div className="mt-10 animate-fade-up delay-200">
            <Link 
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg" 
              href="#story"
            >
              <ArrowDown size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY (Official Copy Block) */}
      <section id="story" className="py-20 lg:py-32 bg-[#FDFBF7]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Sticky Header */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-start text-left">
              <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-sm border border-stone-300/40">
                Our Foundation
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
                Real Estate, Done Differently.
              </h2>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal mb-8">
                At The RealtHer Group, we believe finding the right property is about more than buying a house — it’s about finding a place to call home and making real estate decisions that support your future.
              </p>
              
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200/80">
                <img 
                  src={BRAND_CONFIG.agent.fullphoto || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"} 
                  alt="Reema Shahzad and Pirasha Vygunthavasa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Content Story Body */}
            <div className="lg:col-span-7 flex flex-col gap-10 text-stone-700 text-sm md:text-base leading-relaxed font-normal">
              
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
                <h3 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
                  Two Experienced Brokers. One Vision.
                </h3>
                
                <p>
                  Led by experienced real estate professionals <strong>Pirasha Vygunthavasa</strong> and <strong>Reema Shahzad</strong>, our team brings together years of industry knowledge, market expertise, and a genuine passion for helping people achieve their real estate goals.
                </p>
                
                <p>
                  With Pirasha’s experience as an award-winning RE/MAX Real Estate Broker and a professional home matchmaker since 2004, combined with Reema’s expertise as a Real Estate Broker and investor, clients benefit from a well-rounded perspective on today’s market.
                </p>

                <p>
                  The RealtHer Group specializes in <strong>pre-construction and residential sales</strong>, helping buyers, sellers, homeowners, and investors navigate the Greater Toronto Area real estate market with confidence.
                </p>

                <p>
                  Whether you’re searching for your dream home, selling a property, exploring pre-construction opportunities, or looking to build your real estate portfolio, we’re here to make the process seamless, strategic, and personalized.
                </p>

                <p className="pt-2 text-slate-900 font-semibold text-base sm:text-lg border-t border-stone-100">
                  Your goals are our priority. Your next move starts with The RealtHer Group.
                </p>
              </div>

              {/* SIX CORE HIGHLIGHT PILLARS */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                  What Sets Us Apart
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <MapPin size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">GTA Expertise</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Deep hyper-local insights spanning Toronto, Durham, York, and Peel regions.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <Building2 size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">Pre-Construction Specialization</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      VIP access, builder allocation guidance, and floor plan analysis.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <Key size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">Resale Strategy</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Targeted pricing, property presentation, and seamless transaction management.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <TrendingUp size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">Investment Advisory</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Evaluating real numbers, cash flow potential, and long-term equity growth.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <Handshake size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">Tenacious Negotiation</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Client-first advocacy designed to maximize value and protect your bottom line.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                    <ShieldCheck size={22} className="text-[#4D71A3] mb-3" />
                    <h4 className="font-bold text-slate-900 text-base mb-1">Matchmaking Precision</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Two decades of connecting buyers with properties that fit their lifestyle perfectly.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. INDIVIDUAL BIOS: PIRASHA & REEMA */}
      <section className="py-20 lg:py-28 bg-white border-y border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm">
              Founding Leadership
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Meet the Brokers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* BIO 1: PIRASHA VYGUNTHAVASA */}
            <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-[#F9F6F0] font-bold text-xl flex items-center justify-center shrink-0">
                    PV
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">Pirasha Vygunthavasa</h3>
                    <p className="text-[#4D71A3] text-xs font-semibold uppercase tracking-wider mt-1">
                      Award-Winning RE/MAX Real Estate Broker
                    </p>
                  </div>
                </div>
                
                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-normal">
                  A professional home matchmaker since 2004, Pirasha brings over two decades of hands-on GTA market excellence. Her deep understanding of residential sales, pre-construction opportunities, and client relationship management ensures that every transaction is smooth and tailored to your needs.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Since 2004</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Pre-Construction</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Matchmaking</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">GTA Resale</span>
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-slate-900 text-[#F9F6F0] hover:bg-slate-800 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors w-fit"
              >
                Connect with Pirasha
              </Link>
            </div>

            {/* BIO 2: REEMA SHAHZAD */}
            <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-[#F9F6F0] font-bold text-xl flex items-center justify-center shrink-0">
                    RS
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">Reema Shahzad</h3>
                    <p className="text-[#4D71A3] text-xs font-semibold uppercase tracking-wider mt-1">
                      Real Estate Broker & Active Investor
                    </p>
                  </div>
                </div>
                
                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-normal">
                  Combining her background as a Real Estate Broker and active investor, Reema offers clients a sharp, analytical perspective on property values, market trends, and long-term equity growth. She works closely with buyers, sellers, and investors to build solid real estate strategies.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Investment Specialist</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Market Analytics</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Seller Strategy</span>
                  <span className="px-3 py-1 bg-white border border-stone-200 text-stone-700 text-xs rounded-full font-medium">Negotiation</span>
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-slate-900 text-[#F9F6F0] hover:bg-slate-800 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors w-fit"
              >
                Connect with Reema
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION BREAK */}
      <section className="relative h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" 
            alt="GTA Property Overview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 uppercase">
            Ready to Start Your Next Move?
          </h2>
          <p className="text-[#F9F6F0]/90 text-sm md:text-base font-light mb-8 max-w-xl mx-auto">
            Get in touch with Reema and Pirasha today for personalized guidance tailored to your real estate goals.
          </p>
          <Link 
            className="inline-flex items-center gap-2 bg-[#4D71A3] text-white hover:bg-[#3B5B88] px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xl font-sans" 
            href="/contact"
          >
            Work With RealtHer Group
          </Link>
        </div>
      </section>

      {/* 5. LEAD QUALIFICATION FORM FOOTER */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";