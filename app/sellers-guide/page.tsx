import Link from "next/link";
import { ArrowRight, Calendar, Calculator, Home, Key } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `Seller's Guide | ${BRAND_CONFIG.meta.siteName}` 
};

const sellerSteps = [
  { 
    title: 'Clarify Your Strategy & Timeline', 
    text: `Before listing your property, we help you align your move with your overarching lifestyle or investment goals. Whether upgrading, downsizing, relocating, or unlocking equity, your motivation determines our marketing timeline, pricing strategy, and negotiation stance.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
  },
  { 
    title: 'Establish a Strategic Market Price', 
    text: `Pricing correctly from day one is essential to driving buyer competition. Reema and Pirasha conduct a comprehensive Comparative Market Analysis (CMA), evaluating recent comparable GTA sales, active market inventory, and neighborhood demand trends to position your home for maximum return.`,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  },
  { 
    title: 'Prepare & Stage for Maximum Impact', 
    text: `First impressions dictate buyer perception. We guide you through decluttering, targeted repairs, and professional staging strategies that accentuate architectural flow, elevate lighting, and help buyers envision themselves living in your space.`,
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80'
  },
  { 
    title: 'Execute Targeted GTA Marketing', 
    text: `We launch a multi-channel presentation strategy—including professional HDR photography, cinematic video tours, targeted digital campaigns, and direct exposure across local broker networks—to capture active GTA homebuyers and investors.`,
    img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80'
  },
  { 
    title: 'Evaluate & Negotiate Offers', 
    text: `When offers arrive, we break down each contract beyond the price tag. We examine buyer pre-approvals, deposit amounts, closing timelines, and contingency clauses. Reema and Pirasha advocate aggressively on your behalf to secure the strongest possible terms.`,
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'
  },
  { 
    title: 'Manage Escrow & Due Diligence', 
    text: `Once an offer is accepted, the buyer places an earnest deposit into trust. We coordinate home inspection conditions, status certificate reviews (if applicable), and appraisal walkthroughs to ensure the deal proceeds smoothly to firm status.`,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
  },
  { 
    title: 'Seamless Closing Day', 
    text: `On closing day, your real estate lawyer receives the purchase funds, clears remaining balances, and records the title transfer. You hand over the keys and celebrate a successful sale with complete peace of mind.`,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
  }
];

export default function SellersGuidePage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" 
            alt="Seller's Guide Overview"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
            Greater Toronto Area Homeowners
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-up uppercase leading-[1.1]">
            Seller's Guide
          </h1>
          <p className="mt-4 text-[#F9F6F0]/90 text-base md:text-xl font-light max-w-2xl mx-auto">
            A clear, straightforward roadmap to maximizing your home's equity in the GTA market.
          </p>
          <div className="mt-8">
            {/* REQUIRED PRIMARY CTA */}
            <Link 
              href="/contact?intent=Book%20a%20Home%20Selling%20Strategy%20Call"
              className="inline-flex items-center gap-2 bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl font-sans"
            >
              <Calendar size={15} /> Book a Home Selling Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRO BANNER */}
      <section className="py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm border border-stone-300/40">
            Strategic Representation
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            A Straightforward Path to a Successful Sale
          </h2>
          <div className="w-12 h-[2px] bg-[#4D71A3] mx-auto my-6"></div>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
            Selling your home doesn't have to be overwhelming. With strategic preparation, sharp pricing analytics, and dedicated negotiation advocacy from Reema Shahzad and Pirasha Vygunthavasa, we make your selling process seamless and rewarding.
          </p>
        </div>
      </section>

      {/* 3. STEPS MATRIX (Alternating Z-Pattern Layout) */}
      <section className="w-full flex flex-col">
        {sellerSteps.map((step, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? 'bg-[#F9F6F0]' : 'bg-white'}`}>
              
              {/* Image Frame */}
              <div className={`relative min-h-[380px] lg:min-h-[520px] group overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Content Panel */}
              <div className={`flex flex-col justify-center px-8 py-14 lg:px-20 xl:px-24 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#4D71A3]">
                    Step {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-[1px] bg-stone-300 hidden md:block"></div>
                </div>
                
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-snug">
                  {step.title}
                </h3>
                
                <p className="text-stone-600 text-sm lg:text-[15px] leading-relaxed font-normal">
                  {step.text}
                </p>
              </div>

            </div>
          );
        })}
      </section>

      {/* 4. HOME EVALUATION PROMPT */}
      <section className="relative py-24 bg-slate-950 flex items-center justify-center overflow-hidden border-t border-white/10 text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1600&q=80" 
            alt="GTA aerial property overview"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm">
            Professional Market Analysis
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase mb-6">
            WHAT COULD YOUR HOME SELL FOR?
          </h2>
          <p className="text-[#F9F6F0]/90 text-sm md:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Get an accurate, broker-conducted valuation of your property based on real GTA market analytics and localized buyer demand.
          </p>
          <Link 
            href="/home-evaluation" 
            className="inline-flex items-center justify-center bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xl font-sans"
          >
            Get My Home Evaluation
          </Link>
        </div>
      </section>

      {/* 5. QUICK ACTION CARDS */}
      <section className="py-20 bg-white border-t border-stone-200/80">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <Link href="/home-evaluation" className="group relative h-[380px] rounded-3xl overflow-hidden flex items-end shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" 
                alt="Home Valuation" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10 p-8 w-full text-left">
                <span className="text-[10px] font-semibold text-[#4D71A3] uppercase tracking-widest block mb-1">Valuation</span>
                <h3 className="text-white font-display text-xl font-bold tracking-tight">Request Home Evaluation</h3>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/all-homes" className="group relative h-[380px] rounded-3xl overflow-hidden flex items-end shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
                alt="GTA Active Listings" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10 p-8 w-full text-left">
                <span className="text-[10px] font-semibold text-[#4D71A3] uppercase tracking-widest block mb-1">Market Research</span>
                <h3 className="text-white font-display text-xl font-bold tracking-tight">Browse Active GTA Listings</h3>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/contact?intent=Book%20a%20Home%20Selling%20Strategy%20Call" className="group relative h-[380px] rounded-3xl overflow-hidden flex items-end shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
                alt="Strategy Consultation" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="relative z-10 p-8 w-full text-left">
                <span className="text-[10px] font-semibold text-[#4D71A3] uppercase tracking-widest block mb-1">Consultation</span>
                <h3 className="text-white font-display text-xl font-bold tracking-tight">Book a Strategy Call</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 6. FINAL STRATEGY CALL HERO */}
      <section className="relative h-[480px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" 
            alt="Work with RealtHer Group"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm">
            Personalized Strategy
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 uppercase">
            Ready to Sell with Confidence?
          </h2>
          <p className="text-[#F9F6F0]/90 text-sm md:text-base leading-relaxed mb-8 font-light">
            Partner with Reema Shahzad and Pirasha Vygunthavasa for strategic pricing, tailored property marketing, and tenacious negotiation advocacy.
          </p>
          <Link 
            href="/contact?intent=Book%20a%20Home%20Selling%20Strategy%20Call" 
            className="inline-flex items-center justify-center gap-2 bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xl font-sans"
          >
            <Calendar size={16} /> Book a Home Selling Strategy Call
          </Link>
        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";