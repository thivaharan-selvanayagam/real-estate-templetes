import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Agents | Premier Real Estate" };

export default function AgentsPage() {
  return (
    <>
      {/* 🔑 FIXED: Hero - Added pt-40 / lg:pt-48 for header clearance, flex-col for centering, and minimum heights */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] bg-navy flex flex-col items-center justify-center overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-32 text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 w-full flex flex-col items-center">
          <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-up">
            Join The Team
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-3xl animate-fade-up delay-100">
            Our People<br />Make Us Great
          </h1>
          <button className="mt-8 btn-gold animate-fade-up delay-200">
            Get to Know Us
          </button>
        </div>
      </section>

      {/* 🔑 FIXED: Intro - Replaced generic class with explicit py-20 lg:py-28 for guaranteed spacing */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">The Premier Agent</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy leading-snug tracking-tight">
                A PREMIER agent combines market expertise with entrepreneurial innovation.
              </h2>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              We are passionate, creative, data-driven, and understanding. Most importantly, we know that trust is earned through delivering results and that our success is defined by yours. We see opportunity and promise where others do not and we wake up with a simple imperative: Be Limitless, and Move Forward.
            </p>
          </div>
        </div>
      </section>

      {/* 🔑 FIXED: Demand More - Added bg-navy fallback, improved layout spacing, and polished the form inputs */}
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        {/* Subtle background pattern to match Hero */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Careers</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Demand More From Your Brokerage
              </h2>
              <p className="text-white/70 mt-6 text-sm md:text-base leading-relaxed max-w-lg">
                Don't just join another brokerage, become part of a revolution. The PREMIER Difference is an ecosystem designed for the ambitious, driven, and forward-thinking luxury real estate agent. The future of real estate is here — don't miss your opportunity to be a part of it.
              </p>
            </div>
            
            <div className="bg-white p-8 lg:p-12 shadow-2xl rounded-sm">
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="text" placeholder="First Name *" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all" />
                  <input type="text" placeholder="Last Name *" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all" />
                </div>
                <input type="email" placeholder="Email Address *" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all" />
                <input type="tel" placeholder="Phone Number *" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all" />
                <textarea placeholder="Tell us about your real estate experience..." rows={4} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all resize-none" />
                
                <button type="button" className="w-full bg-navy text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors mt-2">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 🔑 FIXED: Actually rendered the GetInTouch component that was imported at the top! */}
      <GetInTouch dark={false} />
    </>
  );
}

export const dynamic = "force-dynamic";