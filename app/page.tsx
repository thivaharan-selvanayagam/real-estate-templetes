import Link from "next/link";
import { ChevronDown, ChevronRight, Search, ArrowRight } from "lucide-react";
import { getFeaturedListings, formatPrice, formatAddress } from "@/lib/repliers";
import PropertyCard from "@/components/PropertyCard";
import OurNeighborhoods from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import HeroSearchSection from "@/components/HeroSearchSection";
import DevelopmentsSlider from "@/components/DevelopmentsSlider";
import BrandInnovationSection from "@/components/BrandInnovationSection";
import InteractiveGlobe from "@/components/InteractiveGlobe";
// import BecomeAnAgentSection from "@/components/"
// import BecomeAnAgentSection from "@/components/BecomeAnAgentSection"; // Assume previous section name
import PressSection from "@/components/PressSection"; // 🔑 Import the new section
import TestimonialsSlider from "@/components/TestimonialsSlider";

export default async function HomePage() {
  let featured = { listings: [] as any[], numResults: 0 };
  let rentals = { listings: [] as any[], numResults: 0 };
  try {
    [featured, rentals] = await Promise.all([
      getFeaturedListings({ type: "sale", pageSize: 9 }),
      getFeaturedListings({ type: "lease", pageSize: 9 }),
    ]);
  } catch (e) { 
    console.error("Failed to fetch listings:", e); 
  }

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSearchSection />

      {/* 2. Our Regions Section */}
      <OurNeighborhoods />

      {/* 3. Featured Properties Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy tracking-tight">
              Featured Properties
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Check out some of our most exclusive houses, apartments, townhomes, penthouses, and more.
            </p>
          </div>

          {/* Properties Grid */}
          {featured.listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {featured.listings.slice(0, 9).map((l) => (
                <PropertyCard key={l.mlsNumber} listing={l} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No listings available at the moment.</p>
            </div>
          )}

          <div className="mt-14 flex justify-start">
            <Link href="/buy" className="inline-flex items-center gap-3 bg-navy text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-navy-light transition-colors shadow-md">
              <span>View More</span>
              <ChevronRight size={14} className="stroke-[3px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials Video Background Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-950 py-24">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-at-sunset-41618-large.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75 md:bg-black/70 z-10" />
        
        {/* Foreground Content */}
        <div className="relative z-20 w-full animate-fade-up">
          <TestimonialsSlider />
        </div>
      </section>

      {/* 6. Dark Premium Collection Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {featured.listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {featured.listings.slice(0, 6).map((l: any) => {
                const img = l.images?.[0];
                const price = formatPrice(l.listPrice);
                const isLease = l.type === "lease" || l.status === "Lsd";
                const priceLabel = isLease ? `${price}/mo` : price;

                const streetAddress = formatAddress(l.address);
                const city = l.address?.city || "";
                const state = l.address?.state || "";
                const zip = l.address?.zip || "";
                const completeAddress = `${streetAddress}, ${city}, ${state} ${zip}`.trim().replace(/,\s*$/, "");

                const beds = l.details?.numBedrooms || 0;
                const bedsPlus = l.details?.numBedroomsPlus ? `+${l.details.numBedroomsPlus}` : "";
                const baths = l.details?.numBathrooms || 0;
                const sqft = l.details?.sqft;

                return (
                  <Link key={l.mlsNumber} href={`/listings/${l.mlsNumber}`} className="relative block aspect-[3/4] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-xl transition-all duration-300">
                    {img ? (
                      <img src={`https://cdn.repliers.io/${img}`} alt={streetAddress} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <span className="text-white/20 font-display text-2xl font-bold">PREMIER</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
                    <div className="absolute top-0 left-0 z-20">
                      <span className="inline-block bg-[#DCE2EC] text-[#0A0F2E] text-[10px] font-black tracking-widest uppercase px-5 py-2.5 rounded-br-[22px]">
                        {isLease ? "FOR LEASE" : "FOR SALE"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
                      <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                        {priceLabel}
                      </p>
                      <p className="text-xs md:text-sm font-medium text-white/95 mt-1 truncate">
                        {completeAddress}
                      </p>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-2 text-[10px] md:text-[11px] font-extrabold tracking-wider text-white/80 uppercase">
                        <span>{beds}{bedsPlus} BEDROOMS</span>
                        <span className="text-white/30 font-normal select-none text-xs">•</span>
                        <span>{baths} FULL BATHS</span>
                        {sqft && (
                          <>
                            <span className="text-white/30 font-normal select-none text-xs">•</span>
                            <span>{Number(sqft).toLocaleString()} SQ.FT.</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600">
              <p className="text-lg">No listings available at the moment.</p>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link href="/buy" className="inline-flex items-center bg-white text-black text-xs font-black tracking-widest uppercase px-12 py-4 rounded-full hover:bg-neutral-100 transition-all duration-200 shadow-xl border border-neutral-100">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* 7. The Boldest New Developments Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy tracking-tight">
            The Boldest New Developments
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Explore transformative new buildings that elevate modern luxury living.
          </p>
        </div>

        <DevelopmentsSlider />
      </section>

      {/* 8. Brand Innovation Interactive Section */}
      <BrandInnovationSection />

      {/* 9. Sell It Global Referral Network & Community Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="flex flex-col items-start text-left">
              <p className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase">
                Sell It Referral Network & Community
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mt-4 leading-tight">
                Because People Love Shopping<br />With Expert Friends...
              </h2>
              <p className="text-gray-500 text-sm mt-6 leading-relaxed max-w-xl">
                We built the largest & fastest growing global real estate referral network that gives all agents the key to unlock the world, and gives PREMIER. agents unparalleled reach. Buy and sell homes all over the world and Move Forward with the most elite global referral network.
              </p>

              {/* Styled Branding Node */}
              <div className="flex items-center gap-2 text-blue-600 font-sans font-black text-3xl tracking-tight mt-8 select-none">
                <span>SellIt</span>
                <span className="text-2xl">➔</span>
              </div>

              {/* Data Metrics Parameters Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-10 w-full max-w-md">
                <div>
                  <p className="text-4xl lg:text-5xl font-black text-navy tracking-tight">37</p>
                  <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">avg deals per day</p>
                </div>
                <div>
                  <p className="text-4xl lg:text-5xl font-black text-navy tracking-tight">133</p>
                  <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">countries</p>
                </div>
                <div>
                  <p className="text-4xl lg:text-5xl font-black text-navy tracking-tight">47K+</p>
                  <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">agents</p>
                </div>
                <div>
                  <p className="text-4xl lg:text-5xl font-black text-navy tracking-tight">10M+</p>
                  <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">social followers</p>
                </div>
              </div>

              {/* Action Link Pill */}
              <Link href="/buy" className="mt-10 inline-flex items-center gap-3 bg-navy text-white text-xs font-bold tracking-widest uppercase px-10 py-4 rounded-full hover:bg-navy-light transition-colors shadow-md group">
                <span>Learn More</span>
                <ChevronRight size={14} className="stroke-[3px] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right Column Layout Wrapper */}
            <div className="w-full">
              <InteractiveGlobe />
            </div>

          </div>
        </div>
      </section>

      {/* 🔑 BRAND NEW: Become a Agent Section matching your mockup exactly */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Elegant Cutout Mask Composition Framework */}
            <div className="relative w-full flex items-center justify-center lg:justify-start min-h-[360px] md:min-h-[460px]">
              {/* Dynamic structural background cutout marking the aesthetic curve geometry */}
              <div className="relative w-[82%] aspect-square rounded-full overflow-hidden shadow-md border border-gray-100 bg-neutral-50">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800" 
                  alt="Luxury sunlit residential living room space layout" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              {/* Overlapping separate floating detail context sphere */}
              <div className="absolute right-0 md:right-[4%] bottom-[12%] w-[28%] aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white bg-neutral-100 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400" 
                  alt="Minimal luxury interior close-up details" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Large, transparent luxury watermark emblem shape resting behind context text container layout edges */}
              <div className="absolute left-[-2rem] top-[-3rem] text-[26rem] font-black text-gray-100/60 leading-none select-none pointer-events-none font-display z-0">
                P
              </div>
            </div>

            {/* Right Side: High Contrast Text Copy & Action Elements Group */}
            <div className="flex flex-col items-start text-left max-w-xl relative z-10">
              <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
                BECOME A PREMIER. AGENT
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-navy tracking-tight mt-5 leading-[1.14]">
                Move Forward.<br />Demand More From<br />Your Brokerage.
              </h2>
              <p className="text-gray-500 text-sm mt-6 leading-relaxed font-medium">
                Grow your business and brand with a brokerage that isn't afraid of making the old guard uncomfortable. Click below to learn more about joining us or try the mystery button that has the power to change the way you look at everything in 30 seconds.
              </p>

              {/* Actions Double Pill Buttons Wrapper row */}
              <div className="flex flex-wrap items-center gap-4 mt-10 w-full">
                <Link href="/join" className="inline-flex items-center justify-center gap-3 bg-navy text-white text-xs font-bold tracking-widest uppercase px-9 py-4 rounded-full hover:bg-navy-light transition-colors shadow-md min-w-[140px] group">
                  <span>Join Us</span>
                  <ChevronRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-0.5" />
                </Link>
                
                <Link href="/mystery" className="inline-flex items-center justify-center gap-3 bg-white text-navy text-xs font-bold tracking-widest uppercase px-9 py-4 rounded-full hover:bg-neutral-50 transition-colors shadow-sm border border-gray-100 min-w-[160px] group">
                  <span>Mystery Button</span>
                  <ChevronRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. New Testimonial/Press Section */}
      {/* <PressSection /> */}

      {/* 11. Contact Footer */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";