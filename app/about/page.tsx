import Link from "next/link";
import { ArrowDown, ShieldCheck, Map, Handshake, Heart } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export const metadata = { 
  title: `Meet ${BRAND_CONFIG.agent.name.split(" ")[0]} | ${BRAND_CONFIG.meta.siteName}` 
};

export default function AboutPage() {
  // Setup standard fallback strings for clients with alternative or more general backgrounds
  const firstName = BRAND_CONFIG.agent.name.split(" ")[0];
  
  // Dynamic design token wrappers based on config color styles
  const hoverAccentText = `hover:${BRAND_CONFIG.theme.accentText}`;
  const hoverPrimaryBg = `hover:${BRAND_CONFIG.theme.primaryBg}`;
  const hoverPrimaryText = `hover:${BRAND_CONFIG.theme.primaryText}`;

  return (
    <>
      {/* 1. DYNAMIC THEMED HERO SECTION */}
      <section className={`relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center ${BRAND_CONFIG.theme.primaryBg} overflow-hidden pt-20`}>
        <div className="absolute inset-0 z-0">
          <img 
            src={BRAND_CONFIG.meta.coverImage}
            alt={`${BRAND_CONFIG.agent.name} Professional Background`}
            className="w-full h-full object-cover opacity-30"
          />
          {/* Dynamic alpha gradient layer matching your client theme settings */}
          <div className={`absolute inset-0 bg-gradient-to-b from-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}/80 via-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}/60 to-${BRAND_CONFIG.theme.primaryBg.replace('bg-', '')}`} />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-fade-up">
            Meet {firstName}
          </h1>
          <div className="mt-12 animate-fade-up delay-200">
            <Link 
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white ${hoverPrimaryText} transition-colors`} 
              href="#story"
            >
              <ArrowDown size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MAIN STORY & VALUES (Two-Column Editorial Layout) */}
      <section id="story" className="py-20 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Sticky Portrait & Hook */}
            <div className="w-full lg:w-[40%] lg:sticky lg:top-32 flex flex-col gap-8">
              <h2 className={`font-display text-3xl lg:text-4xl font-bold ${BRAND_CONFIG.theme.primaryText} leading-snug tracking-tight max-w-sm`}>
                Your trusted realtor and seasoned market advocate.
              </h2>
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
                <img 
                  src={BRAND_CONFIG.agent.headshot} 
                  alt={BRAND_CONFIG.agent.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right Column: Scrolling Content */}
            <div className="w-full lg:w-[60%] flex flex-col gap-20">
              
              {/* Bio Section */}
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                <h3 className={`font-display text-3xl font-bold ${BRAND_CONFIG.theme.primaryText} mb-6 tracking-tight`}>Our Story</h3>
                <p>
                  At The <b>RealtHer Group</b>, we believe finding the right property is about more than buying a house — it’s about finding a place to call home and making real estate decisions that support your future.
                </p>
                <p>
                  Led by experienced real estate professionals <b>Pirasha Vygunthavasa</b> and <b>Reema Shahzad</b>, our team brings together years of industry knowledge, market expertise, and a genuine passion for helping people achieve their real estate goals. With Pirasha’s experience as an award-winning RE/MAX Real Estate Broker and a professional home matchmaker since 2004, combined with Reema’s expertise as a Real Estate Broker and investor, clients benefit from a well-rounded perspective on today’s market.
                </p>
                <p>
                  The RealtHer Group specializes in <b>pre-construction and residential sales</b>, helping buyers, sellers, homeowners, and investors navigate the Greater Toronto Area real estate market with confidence
                </p>
                <p>
                  Whether you’re searching for your dream home, selling a property, exploring pre-construction opportunities, or looking to build your real estate portfolio, we’re here to make the process seamless, strategic, and personalized.
                </p>
                <p>
                  <b>Your goals are our priority. Your next move starts with The RealtHer Group.</b>
                </p>
               
              </div>

              {/* The Difference / Values Grid */}
              <div>
                <h3 className={`font-display text-3xl font-bold ${BRAND_CONFIG.theme.primaryText} mb-10 tracking-tight`}>The Difference</h3>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
                  
                  {/* Value 1 */}
                  <div>
                    <ShieldCheck size={24} strokeWidth={1.5} className={`${BRAND_CONFIG.theme.accentText} mb-4`} />
                    <h4 className={`font-bold ${BRAND_CONFIG.theme.primaryText} text-lg mb-2`}>Bespoke Strategy</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Combining extensive transactional background with custom technological workflows to offer a complete, end-to-end perspective on your investment.
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div>
                    <Map size={24} strokeWidth={1.5} className={`${BRAND_CONFIG.theme.accentText} mb-4`} />
                    <h4 className={`font-bold ${BRAND_CONFIG.theme.primaryText} text-lg mb-2`}>Local Market Mastery</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Leveraging specialized local market knowledge to uncover hidden gems for buyers and price properties perfectly for sellers.
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div>
                    <Handshake size={24} strokeWidth={1.5} className={`${BRAND_CONFIG.theme.accentText} mb-4`} />
                    <h4 className={`font-bold ${BRAND_CONFIG.theme.primaryText} text-lg mb-2`}>Masterful Negotiation</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Securing optimal financial provisions through strategic, experienced negotiation tactics that consistently put your interests first.
                    </p>
                  </div>

                  {/* Value 4 */}
                  <div>
                    <Heart size={24} strokeWidth={1.5} className={`${BRAND_CONFIG.theme.accentText} mb-4`} />
                    <h4 className={`font-bold ${BRAND_CONFIG.theme.primaryText} text-lg mb-2`}>Personalized Service</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Transparent communication and an unwavering commitment to treating your family's residential real estate journey as if it were my own.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. MIDDLE HERO BREAK */}
      <section className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" 
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${BRAND_CONFIG.theme.primaryBg}/60`} />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8">
            Why {firstName}.
          </h2>
          <Link 
            className={`inline-flex items-center gap-2 ${BRAND_CONFIG.theme.accentBg} text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white ${hoverPrimaryText} transition-colors shadow-xl`} 
            href="/contact"
          >
            Work With Me
          </Link>
        </div>
      </section>

      {/* 4. ALTERNATING FEATURE BLOCKS (Z-Pattern) */}
      <section className="py-20 lg:py-32 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 space-y-24 lg:space-y-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-2 md:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800" alt="Consultation" className="object-cover w-full h-full" />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">First-Time Buyers & Newcomers</p>
              <h2 className={`font-display text-3xl lg:text-5xl font-bold ${BRAND_CONFIG.theme.primaryText} leading-[1.1] mb-6`}>Guiding You Home</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Entering the market for the first time or moving to a new area can be overwhelming. I specialize in breaking down the complexities of purchasing and financing, providing a seamless, stress-free path to your first front door.
              </p>
              <Link 
                className={`${BRAND_CONFIG.theme.primaryBg} text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase ${hoverAccentText} transition-colors inline-block`} 
                href="/all-homes"
              >
                Start Searching &rarr;
              </Link>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-1 md:order-1 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Sellers & Resale</p>
              <h2 className={`font-display text-3xl lg:text-5xl font-bold ${BRAND_CONFIG.theme.primaryText} leading-[1.1] mb-6`}>Maximizing Your Return</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                When it's time to sell, you need more than just a sign on the lawn. You need a targeted pricing strategy, deep market insights, and relentless negotiation. I go the extra mile to ensure your property commands the value it deserves.
              </p>
              <Link 
                className={`${BRAND_CONFIG.theme.primaryBg} text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase ${hoverAccentText} transition-colors inline-block`} 
                href="/home-evaluation"
              >
                Valuate Home &rarr;
              </Link>
            </div>
            <div className="order-2 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" alt="Resale Property" className="object-cover w-full h-full" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. GET IN TOUCH FOOTER */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";