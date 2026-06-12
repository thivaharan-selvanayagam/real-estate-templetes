import Link from "next/link";
import { ArrowRight, Award, Check } from "lucide-react";
import { getFeaturedListings } from "@/lib/repliers";
import PropertyCard from "@/components/PropertyCard";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Sell | Premier Real Estate" };

export default async function SellPage() {
  let listings = { listings: [] as any[] };
  try { 
    listings = await getFeaturedListings({ type: "sale", pageSize: 6 }); 
  } catch (e) {
    console.error("Failed to load featured listings for sell page", e);
  }

  return (
    <>
      {/* 1. TOP HERO */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col items-center justify-center bg-navy overflow-hidden pt-40 pb-28 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">
          <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6 animate-fade-up">Sell With Us</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight animate-fade-up delay-100">Sell With The Best</h1>
          <p className="text-white/70 mt-6 text-base lg:text-lg animate-fade-up delay-200">Earth's Most Followed and Subscribed to Real Estate Brand</p>
          
          <div className="mt-10 flex flex-col sm:flex-row bg-white shadow-2xl max-w-xl mx-auto rounded-xl sm:rounded-full overflow-hidden animate-fade-up delay-300">
            <input 
              type="text" 
              placeholder="Enter your property address..." 
              className="flex-1 px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none text-center sm:text-left" 
            />
            <button className="bg-navy text-white px-8 py-4 sm:py-0 text-xs font-bold tracking-widest uppercase hover:bg-navy-light transition-colors w-full sm:w-auto shrink-0">
              Continue
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
            <h2 className="font-display text-3xl lg:text-4xl lg:leading-[1.3] font-bold text-navy tracking-tight">
              Put your property in front of more potential buyers worldwide than anyone else.
            </h2>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base font-medium space-y-5">
              <p>
                When you list with a dedicated PREMIER. agent, you are aligning with a team that uses data and media to intelligently position your property to buyers, real estate agents, and brokers at every step of the selling process.
              </p>
              <p>
                We hold ourselves to the highest standard and know that our success is defined by yours. If you're considering selling your home, or just want to get a sense of your home's value, we would love to connect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MASSIVE HERO IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        {/* 🔑 FIXED: Added rounded-3xl and a reliable team/office image */}
        <div className="w-full h-[300px] md:h-[400px] lg:h-[600px] relative overflow-hidden rounded-3xl shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600" 
            alt="Real Estate Professional"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 4. STATS & SOCIAL PROOF */}
      <section className="pb-20 lg:pb-32 bg-white text-center">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex justify-center mb-6">
            <Award size={32} className="text-navy" />
          </div>
          <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
            * The most followed real estate brand in the world.
          </p>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-navy max-w-3xl mx-auto leading-relaxed">
            With the drastic increase in buyers engaging via social media, selling your home most effectively demands working with the brand that pioneered the real estate content genre.
          </h3>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy mt-10 md:mt-12 tracking-widest uppercase">
            Why Everyone is Selling With PREMIER.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { stat: "100M+", label: "Impressions per month" },
              { stat: "10M+", label: "Followers" },
              { stat: "17B+", label: "Total impressions" },
            ].map((s, i) => (
              <div key={i} className="border border-gray-100 bg-white py-12 lg:py-16 px-6 lg:px-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="font-display text-5xl lg:text-6xl font-bold text-navy tracking-tight">{s.stat}</p>
                <p className="text-navy font-bold text-[11px] md:text-xs lg:text-sm tracking-widest mt-4 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALTERNATING FEATURE BLOCKS */}
      <section className="py-10 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 space-y-24 lg:space-y-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* 🔑 FIXED: Added rounded-3xl and reliable studio/photography image */}
            <div className="order-2 md:order-1 relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-100 rounded-3xl shadow-lg">
              <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800" alt="Studios" className="object-cover w-full h-full" />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">PREMIER. STUDIOS</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">Lights, Camera,<br className="hidden md:block" /> Real Estate</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                We are an in-house production studio that creates award-winning, property-centric content reaching daily audiences rivaling with the largest real estate audiences in the world.
              </p>
              <button className="bg-navy text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
                Visit Studios &rarr;
              </button>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-1 md:order-1 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">PREMIER. ADS</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">Tech-Powered<br className="hidden md:block" /> Solutions For All.</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Targeted technology and data-driven solutions to optimize your property for this market.
              </p>
              <button className="bg-navy text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
                Learn More &rarr;
              </button>
            </div>
            {/* 🔑 FIXED: Added rounded-3xl and reliable technology/dashboard image */}
            <div className="order-2 md:order-2 relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-100 rounded-3xl shadow-lg">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" alt="Tech Solutions" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* 🔑 FIXED: Added rounded-3xl and reliable branding/design image */}
            <div className="order-2 md:order-1 relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-gray-100 rounded-3xl shadow-lg">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800" alt="Brand Book" className="object-cover w-full h-full" />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">PREMIER. ID LAB</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">Unleash Your Home's Potential with Bold Ideas</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Give your home an identity, character, and custom collateral designed to set it apart from the commodities.
              </p>
              <button className="bg-navy text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
                View Brand Book &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SELLER'S GUIDE / CTA */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA] mt-16 lg:mt-24 overflow-hidden rounded-t-[3rem]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 tracking-tight">Sell With PREMIER.</h2>
              <ul className="space-y-4 mb-8 text-left inline-block md:block">
                <li className="flex items-center gap-3 text-navy font-semibold text-sm">
                  <Check size={18} className="text-gold shrink-0" /> Learn about the selling process
                </li>
                <li className="flex items-center gap-3 text-navy font-semibold text-sm">
                  <Check size={18} className="text-gold shrink-0" /> Gain valuable tips and advice
                </li>
              </ul>
              <div className="text-center md:text-left">
                <button className="bg-white border border-gray-200 text-navy px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:border-navy transition-colors shadow-sm">
                  Download
                </button>
              </div>
            </div>
            
            {/* Mockup Book Visual */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="w-[240px] h-[320px] lg:w-[280px] lg:h-[360px] bg-navy text-white p-6 lg:p-8 flex flex-col justify-between shadow-2xl rounded-r-lg relative overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute left-4 top-0 bottom-0 w-8 bg-white/10 mix-blend-overlay" />
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">PREMIER.</p>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight">Seller's<br/>Guide</h3>
                </div>
                <div className="text-white/30 text-5xl font-display font-bold -ml-2 select-none">P.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEATURED PROPERTIES */}
      {listings.listings.length > 0 && (
        <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Recent Sales</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy tracking-tight">Featured Properties</h2>
              </div>
              <Link href="/buy" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-navy hover:text-gold transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.listings.map((l: any) => <PropertyCard key={l.mlsNumber} listing={l} />)}
            </div>
          </div>
        </section>
      )}

      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";