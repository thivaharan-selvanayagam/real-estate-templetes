import Link from "next/link";
import { ArrowDown, ShieldCheck, Map, Handshake, Heart } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Meet Rajivan | Premier Real Estate" };

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center bg-navy overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {/* 🔑 FIXED: Corrected path to point to your images folder */}
          <img 
            src="/images/about_rajivan.webp"
            alt="Real Estate Professional Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-fade-up">
            Meet Rajivan
          </h1>
          <div className="mt-12 animate-fade-up delay-200">
            <Link className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-navy transition-colors" href="#story">
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
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy leading-snug tracking-tight max-w-sm">
                Your trusted realtor and seasoned mortgage broker.
              </h2>
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
                {/* 🔑 FIXED: Corrected path here as well to remove the space and point to the images folder */}
                <img 
                  src="/images/about_rajivan.webp" 
                  alt="Rajivan Varatharajah"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right Column: Scrolling Content */}
            <div className="w-full lg:w-[60%] flex flex-col gap-20">
              
              {/* Bio Section */}
              <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                <h3 className="font-display text-3xl font-bold text-navy mb-6 tracking-tight">My Story</h3>
                <p>
                  With over 10 years in the industry, my professional expertise spans over 7 years as a realtor and a decade as a seasoned mortgage broker. This dual expertise allows me to navigate every financial and practical aspect of your real estate journey.
                </p>
                <p>
                  While my career is incredibly fulfilling, my life outside of real estate brings me equal joy. I am a devoted family man, relishing precious moments with my wife and two daughters, and I have a deep, lifelong passion for cars. 
                </p>
                <p>
                  Of course, my heart truly belongs to real estate. My primary focus areas include resale properties, catering to newcomers finding their footing, and expertly guiding first-time buyers through what can be a daunting process.
                </p>
                <p>
                  What sets me apart? It's my unwavering commitment to personalized service. I delve deep into your unique needs and goals. With a proven history of delivering results and a willingness to go the extra mile, I am your trusted partner in the home buying or selling process. Let's make your real estate dreams come true!
                </p>
              </div>

              {/* The Difference / Values Grid */}
              <div>
                <h3 className="font-display text-3xl font-bold text-navy mb-10 tracking-tight">The Difference</h3>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
                  
                  {/* Value 1 */}
                  <div>
                    <ShieldCheck size={24} strokeWidth={1.5} className="text-gold mb-4" />
                    <h4 className="font-bold text-navy text-lg mb-2">Dual Expertise</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Combining 10 years of mortgage brokering with 7 years of real estate sales to offer a complete, end-to-end perspective on your investment.
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div>
                    <Map size={24} strokeWidth={1.5} className="text-gold mb-4" />
                    <h4 className="font-bold text-navy text-lg mb-2">Local Market Mastery</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Leveraging extensive local market knowledge to uncover hidden gems for buyers and price homes perfectly for sellers.
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div>
                    <Handshake size={24} strokeWidth={1.5} className="text-gold mb-4" />
                    <h4 className="font-bold text-navy text-lg mb-2">Masterful Negotiation</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Securing the best possible terms through strategic, experienced negotiation tactics that put your financial interests first.
                    </p>
                  </div>

                  {/* Value 4 */}
                  <div>
                    <Heart size={24} strokeWidth={1.5} className="text-gold mb-4" />
                    <h4 className="font-bold text-navy text-lg mb-2">Personalized Service</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Transparent communication and an unwavering commitment to treating your family's real estate journey as if it were my own.
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
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8">
            Why Rajivan.
          </h2>
          <Link className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-navy transition-colors shadow-xl" href="/contact">
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
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">Guiding You Home</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Entering the market for the first time or moving to a new country can be overwhelming. I specialize in breaking down the complexities of purchasing and financing, providing a seamless, stress-free path to your first front door.
              </p>
              <Link className="bg-navy text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors inline-block" href="/all-homes">
                Start Searching &rarr;
              </Link>
            </div>
          </div>

          {/* Feature 2 (Reversed) */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-1 md:order-1 text-center md:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Sellers & Resale</p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">Maximizing Your Return</h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                When it's time to sell, you need more than just a sign on the lawn. You need a targeted pricing strategy, deep market insights, and relentless negotiation. I go the extra mile to ensure your property commands the value it deserves.
              </p>
              <Link className="bg-navy text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors inline-block" href="/home-evaluation">
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