import Link from "next/link";
import { ArrowRight, Calculator, Calendar } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `Buyer's Guide | ${BRAND_CONFIG.meta.siteName}` 
};

const buyerSteps = [
  { 
    title: 'Explore & Define Your Goals', 
    text: `Buying in the Greater Toronto Area begins with understanding your core needs. Are you looking for a condo, townhouse, or detached home? Do you prioritize transit access, top school districts, or future capital growth? Starting with a clear list of non-negotiables and researching local neighborhood trends gives you a distinct advantage before entering the market.`,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'
  },
  { 
    title: 'Establish Your Comfortable Budget', 
    text: `Lenders may pre-approve you for a maximum loan amount, but your target budget should reflect what you are comfortable paying each month. Take into account total carrying costs—including property taxes, maintenance fees, utilities, and emergency reserves—to ensure your real estate decision supports your long-term financial health.`,
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80'
  },
  { 
    title: 'Secure Mortgage Pre-Approval', 
    text: `A formal pre-approval locks in an interest rate and confirms your actual buying power. In a competitive GTA market, sellers favor buyers who have their financing verified. Reema and Pirasha can connect you with trusted GTA mortgage specialists to help streamline this process.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80'
  },
  { 
    title: 'Partner with Experienced GTA Brokers', 
    text: `Navigating GTA real estate requires sharp local insights, proactive communication, and tenacious negotiation. Having RealtHer Group in your corner costs you nothing as a buyer, but provides you with full market representation, off-market insight, and strategic protection at every turn.`,
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80'
  },
  { 
    title: 'Tour Targeted Properties', 
    text: `We curate property viewings that fit your criteria and schedule. During showings, we evaluate layout utility, structural condition, neighborhood dynamics, parking, and proximity to key amenities across Toronto, Durham, York, and Peel regions.`,
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80'
  },
  { 
    title: 'Craft a Strategic Offer', 
    text: `When you find the right property, we analyze recent comparable sales and local demand drivers to structure a fair, competitive offer. Whether navigating multiple offers or negotiating directly with a seller, we advocate aggressively to secure the best price and favorable terms.`,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80'
  },
  { 
    title: 'Complete Due Diligence & Inspection', 
    text: `Once your offer is accepted, we ensure all protective conditions—such as home inspections, status certificate reviews (for condos), and financing verification—are satisfied so you move forward with complete peace of mind.`,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&q=80'
  },
  { 
    title: 'Finalize Lender Paperwork & Legal Closing', 
    text: `Your lender finalizes mortgage documents while your real estate lawyer completes title searches, property transfer tax filings, and legal adjustments. We work closely with your legal team to ensure a smooth transition to closing day.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80'
  }
];

export default function BuyersGuidePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80" 
            alt="GTA Homebuyer Guidance"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
            First-Time Buyers & Investors
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-up uppercase leading-[1.1]">
            Buyer's Guide
          </h1>
          <p className="mt-4 text-[#F9F6F0]/90 text-base md:text-xl font-light max-w-2xl mx-auto">
            A practical, step-by-step roadmap to purchasing real estate in the Greater Toronto Area.
          </p>
          <div className="mt-8">
            <Link 
              href="/contact?intent=Book%20a%20Buyer%20Consultation"
              className="inline-flex items-center gap-2 bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl"
            >
              <Calendar size={15} /> Book a Buyer Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm border border-stone-300/40">
            Navigating the GTA
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Clear Guidance at Every Step
          </h2>
          <div className="w-12 h-[2px] bg-[#4D71A3] mx-auto my-6"></div>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
            Purchasing property is one of the most important decisions you will make. Whether buying your first home or expanding an investment portfolio, Reema and Pirasha deliver a straightforward, strategic framework so you move forward with absolute confidence.
          </p>
        </div>
      </section>

      {/* 3. EDITORIAL MATRIX (Alternating Z-Pattern Layout) */}
      <section className="w-full">
        {buyerSteps.map((step, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? 'bg-[#F9F6F0]' : 'bg-white'}`}>
              
              {/* Media Frame Container */}
              <div className={`relative min-h-[380px] lg:min-h-[520px] group overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Text Panel Container */}
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

      {/* 4. ACTIONS FOOTER WITH CORE BUYER CTA */}
      <section className="py-20 bg-white border-t border-stone-200/80 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight uppercase mb-8">
            Ready to Take the Next Step?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact?intent=Book%20a%20Buyer%20Consultation" 
              className="inline-flex items-center justify-center gap-2 bg-[#4D71A3] text-white hover:bg-[#3B5B88] px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md font-sans"
            >
              <Calendar size={16} /> Book a Buyer Consultation
            </Link>
            <Link 
              href="/all-homes" 
              className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm font-sans"
            >
              Browse GTA Listings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CALCULATOR CTA SECTION */}
      <section className="py-20 bg-slate-950 text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#4D71A3] mb-4">Financial Planning</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
            Want to Estimate Your Carrying Costs?
          </h2>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Use our calculator to estimate monthly mortgage payments, down payments, and closing expenses for GTA properties.
          </p>
          <Link 
            href="/calculator" 
            className="inline-flex items-center gap-3 bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-xl"
          >
            <Calculator size={16} /> Launch Mortgage Calculator
          </Link>
        </div>
      </section>

      {/* 6. FOUNDER ADVOCATE CALLOUT HERO */}
      <section className="relative h-[480px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1400&q=80" 
            alt="Work with RealtHer Group"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <div className="bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-5 w-fit mx-auto shadow-sm">
            Personalized Guidance
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Partner with RealtHer Group
          </h2>
          <p className="text-[#F9F6F0]/90 text-sm md:text-base leading-relaxed mb-8 font-light">
            With decades of combined GTA expertise, Reema Shahzad and Pirasha Vygunthavasa protect your interests, negotiate strongly, and guide you to a property that supports your long-term goals.
          </p>
          <Link 
            href="/contact?intent=Book%20a%20Buyer%20Consultation" 
            className="bg-[#F9F6F0] text-slate-900 hover:bg-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all inline-block shadow-xl"
          >
            Book a Buyer Consultation
          </Link>
        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";