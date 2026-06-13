import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function BecomeAnAgent() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;
  const watermarkLetter = BRAND_CONFIG.meta.siteName.charAt(0).toUpperCase();

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Elegant Cutout Mask Composition Framework */}
          <div className="relative w-full flex items-center justify-center lg:justify-start min-h-[360px] md:min-h-[460px]">
            <div className="relative w-[82%] aspect-square rounded-full overflow-hidden shadow-md border border-gray-100 bg-neutral-50">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800" 
                alt="Luxury sunlit residential architectural layout" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="absolute right-0 md:right-[4%] bottom-[12%] w-[28%] aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white bg-neutral-100 z-10">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400" 
                alt="Minimal architecture details close up" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dynamic abstract watermark derived from the brand config name parameters */}
            <div className="absolute left-[-2rem] top-[-3rem] text-[26rem] font-black text-gray-100/60 leading-none select-none pointer-events-none font-display z-0">
              {watermarkLetter}
            </div>
          </div>

          {/* Right Side: Content Area */}
          <div className="flex flex-col items-start text-left max-w-xl relative z-10">
            <p className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
              BECOME AN ASSOCIATE AGENT
            </p>
            <h2 className={`font-display text-4xl md:text-5xl font-black ${cleanPrimaryText} tracking-tight mt-5 leading-[1.14]`}>
              Move Forward.<br />Demand More From<br />Your Brokerage.
            </h2>
            <p className="text-gray-500 text-sm mt-6 leading-relaxed font-medium">
              Grow your career and personal footprint with a progressive platform built to break standard legacy conventions. Connect below to explore our backend tooling, systems integration, and lead distribution setups.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10 w-full">
              <Link href="/contact" className={`inline-flex items-center justify-center gap-3 ${cleanPrimaryBg} text-white text-xs font-bold tracking-widest uppercase px-9 py-4 rounded-full hover:opacity-95 transition-colors shadow-md min-w-[140px] group`}>
                <span>Join Us</span>
                <ChevronRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-0.5" />
              </Link>
              
              <Link href="/contact" className={`inline-flex items-center justify-center gap-3 bg-white ${cleanPrimaryText} text-xs font-bold tracking-widest uppercase px-9 py-4 rounded-full hover:bg-neutral-50 transition-colors shadow-sm border border-gray-100 min-w-[160px] group`}>
                <span>Inquire Privately</span>
                <ChevronRight size={13} className="stroke-[3px] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}