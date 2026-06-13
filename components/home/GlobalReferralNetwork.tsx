import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import { BRAND_CONFIG } from "@/config/brand";

export default function GlobalReferralNetwork() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left">
            <p className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase">
              Referral Network & Community
            </p>
            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${cleanPrimaryText} tracking-tight mt-4 leading-tight`}>
              Because People Love Shopping<br />With Expert Friends...
            </h2>
            <p className="text-gray-500 text-sm mt-6 leading-relaxed max-w-xl">
              We leverage an expansive global real estate network to afford our clients unparalleled reach. Buy and sell homes internationally with absolute market representation and complete tactical security.
            </p>

            {/* Styled Branding Node */}
            <div className="flex items-center gap-2 text-blue-600 font-sans font-black text-3xl tracking-tight mt-8 select-none">
              <span>GlobalConnect</span>
              <span className="text-2xl">➔</span>
            </div>

            {/* Data Metrics Parameters Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-10 w-full max-w-md">
              <div>
                <p className={`text-4xl lg:text-5xl font-black ${cleanPrimaryText} tracking-tight`}>37</p>
                <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">avg deals per day</p>
              </div>
              <div>
                <p className={`text-4xl lg:text-5xl font-black ${cleanPrimaryText} tracking-tight`}>133</p>
                <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">countries</p>
              </div>
              <div>
                <p className={`text-4xl lg:text-5xl font-black ${cleanPrimaryText} tracking-tight`}>47K+</p>
                <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">agents</p>
              </div>
              <div>
                <p className={`text-4xl lg:text-5xl font-black ${cleanPrimaryText} tracking-tight`}>10M+</p>
                <p className="text-xs font-medium text-gray-400 mt-1.5 lowercase">social followers</p>
              </div>
            </div>

            {/* Action Link Pill */}
            <Link href="/contact" className={`mt-10 inline-flex items-center gap-3 ${cleanPrimaryBg} text-white text-xs font-bold tracking-widest uppercase px-10 py-4 rounded-full hover:opacity-90 transition-colors shadow-md group`}>
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
  );
}