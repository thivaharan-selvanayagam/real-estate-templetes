import Link from "next/link";
import { ArrowRight, Home, Calculator, BarChart3 } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Seller's Guide | PREMIER. Real Estate" };

const sellerSteps = [
  { 
    title: 'Understand Why You Are Selling', 
    text: `Before you list your home, it's crucial to understand your motivations. Are you upgrading, downsizing, relocating for work, or cashing in on equity? Your reasons will dictate your timeline, pricing strategy, and how much you are willing to negotiate. A clear understanding of your goals ensures a focused and successful selling process.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
  },
  { 
    title: 'Determine Selling Price', 
    text: `Pricing your home correctly from the start is the most important factor in a successful sale. Overpricing can lead to your property sitting on the market, while underpricing leaves money on the table. We will conduct a comprehensive Comparative Market Analysis (CMA) to determine the sweet spot that attracts buyers and maximizes your return.`,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  },
  { 
    title: 'Start Preparations', 
    text: `First impressions are everything. Preparing your home for sale involves decluttering, depersonalizing, deep cleaning, and making necessary repairs. We may also recommend professional staging to highlight your home's best features and help potential buyers envision themselves living in the space.`,
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80'
  },
  { 
    title: 'Develop A Marketing Strategy', 
    text: `A sign in the yard is no longer enough. We employ a multi-channel marketing approach including professional photography, cinematic video tours, targeted digital advertising, and exposure on top real estate networks to ensure your property reaches the highest number of qualified buyers.`,
    img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&q=80'
  },
  { 
    title: 'Evaluate Offers', 
    text: `When offers start coming in, we will review them together. It's not just about the highest price; we must also evaluate the buyer's financing, contingencies, requested closing date, and overall terms. I will expertly guide you through the pros and cons of each offer to help you make an informed decision.`,
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'
  },
  { 
    title: 'Accept An Offer', 
    text: `Once we find the right offer, we will negotiate any final terms and officially accept. At this stage, the buyer will typically submit an earnest money deposit, and the property will officially go under contract. The countdown to closing begins.`,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
  },
  { 
    title: 'Get Ready To Close', 
    text: `During the escrow period, the buyer will conduct inspections and their lender will order an appraisal. We will navigate any repair requests and ensure all title work and necessary documentation are in order. As the seller, you will prepare for your move and leave the home in broom-clean condition.`,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80'
  },
  { 
    title: 'Close', 
    text: `Closing day is the final step! You will sign the official transfer documents, the buyer's funds will be distributed, and the deed will be recorded. Once the transaction is complete, you will hand over the keys to the new owners and celebrate the successful sale of your home.`,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
  }
];

export default function SellersGuidePage() {
  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] lg:h-[60vh] flex flex-col items-center justify-center bg-navy overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" 
            alt="Seller's Guide"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-navy/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-widest uppercase animate-fade-up shadow-sm">
            Seller's Guide
          </h1>
        </div>
      </section>

      {/* 2. INTRO BANNER */}
      <section className="bg-navy py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-widest uppercase mb-6">
            A Step-By-Step First-Time Seller's Guide
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto">
            Selling a home can seem like a daunting process, but with the right preparation and expert guidance, it becomes a seamless journey. 
            Follow this comprehensive step-by-step roadmap designed to help you navigate the market, maximize your home's value, and achieve a successful sale.
          </p>
        </div>
      </section>

      {/* 3. STEPS MATRIX (Alternating Z-Pattern Layout Edge-to-Edge) */}
      <section className="w-full flex flex-col">
        {sellerSteps.map((step, index) => {
          const isEven = index % 2 === 0; 
          // isEven (0, 2, 4) -> Cream Background, Image Left, Text Right
          // !isEven (1, 3, 5) -> Navy Background, Text Left, Image Right

          return (
            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 min-h-[500px] lg:min-h-[600px] ${isEven ? 'bg-[#F8F7F4]' : 'bg-navy'}`}>
              
              {/* IMAGE HALF */}
              <div className={`relative w-full h-[400px] md:h-full order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* TEXT HALF */}
              <div className={`flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 xl:px-32 order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-4 ${isEven ? 'text-gold' : 'text-gold'}`}>
                  Step {index + 1}
                </span>
                <h3 className={`font-display text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-snug mb-6 ${isEven ? 'text-navy' : 'text-white'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm lg:text-[15px] leading-loose font-medium ${isEven ? 'text-gray-600' : 'text-white/80'}`}>
                  {step.text}
                </p>
              </div>

            </div>
          );
        })}
      </section>

      {/* 4. CONGRATULATIONS BANNER */}
      <section className="bg-navy py-20 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-widest uppercase mb-6">
            Congratulations!
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            You have successfully navigated the home selling process. Whether you are moving across town or across the country, 
            Rajivan Varatharajah is here to assist you with your next real estate endeavor.
          </p>
        </div>
      </section>

      {/* 5. GET AN ESTIMATE (Home Valuation CTA) */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1600&q=80" 
            alt="Neighborhood aerial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase mb-6">
            Get An Estimate
          </h2>
          <p className="text-white/90 text-sm leading-loose mb-10">
            Curious about what your home is worth in today's market? Get a comprehensive, professional valuation to help you make informed decisions about your real estate future.
          </p>
          <Link href="/home-evaluation" className="inline-block bg-[#E6D5B8] text-navy px-10 py-4 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
            Free Valuation
          </Link>
        </div>
      </section>

      {/* 6. QUICK LINKS GRID */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Link Card 1 */}
            <Link href="/all-homes" className="group relative h-[400px] overflow-hidden flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
                alt="Search Homes" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="relative z-10 p-8 w-full text-center">
                <h3 className="text-white font-display text-xl tracking-widest uppercase">Search Homes</h3>
              </div>
            </Link>

            {/* Link Card 2 */}
            <Link href="/home-evaluation" className="group relative h-[400px] overflow-hidden flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" 
                alt="Home Valuation" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="relative z-10 p-8 w-full text-center">
                <h3 className="text-white font-display text-xl tracking-widest uppercase">Home Valuation</h3>
              </div>
            </Link>

            {/* Link Card 3 */}
            <Link href="/contact" className="group relative h-[400px] overflow-hidden flex items-end">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
                alt="Market Stats" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
              <div className="relative z-10 p-8 w-full text-center">
                <h3 className="text-white font-display text-xl tracking-widest uppercase">Market Stats</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 7. FINAL CTA HERO */}
      <section className="relative h-[400px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" 
            alt="Work with us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase mb-6">
            Work With Us Today
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            Experience unparalleled service, expert negotiation, and a commitment to achieving your real estate goals.
          </p>
          <Link href="/contact" className="inline-block bg-[#E6D5B8] text-navy px-10 py-4 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";