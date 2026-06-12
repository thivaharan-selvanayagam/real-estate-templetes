import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export default function Footer() {
  // Custom helper variables to dynamically stitch hover and selection states
  const textHoverPrimary = `hover:${BRAND_CONFIG.theme.primaryText}`;
  const textHoverAccent = `hover:${BRAND_CONFIG.theme.accentText}`;

  return (
    <footer className="bg-white border-t border-gray-100">
      
      {/* Main Container Wrapper */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-12">

        {/* 3. Bottom Row: Copyright and Social Handles */}
        <div className="mt-10 md:mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo & Copyright (Stacks on mobile, row on tablet/desktop) */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6">
            
            {/* Logo Layer Linked to Whitelabel Brain */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              {BRAND_CONFIG.meta.logoSvgPath ? (
                /* 🔑 OPTION A: Renders Custom Logo Graphic if path is provided */
                <div className="relative h-8 w-32 md:h-10 md:w-40 transition-opacity duration-300 group-hover:opacity-80">
                  <img 
                    src={BRAND_CONFIG.meta.logoSvgPath} 
                    alt={`${BRAND_CONFIG.meta.siteName} Logo`}
                    className="h-full w-auto object-contain" 
                  />
                </div>
              ) : (
                /* 🔑 OPTION B: Elegant Text Fallback using the dynamic text theme color rules */
                <span className={`text-xl md:text-2xl font-bold tracking-[0.15em] font-display transition-colors duration-300 ${BRAND_CONFIG.theme.primaryText}`}>
                  {BRAND_CONFIG.meta.siteName.replace(".", "")}<span className={BRAND_CONFIG.theme.accentText}>.</span>
                </span>
              )}
            </Link>
                
            {/* 🔑 DYNAMIC: Pulls current year and agent name automatically */}
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
              © {new Date().getFullYear()} {BRAND_CONFIG.agent.name}. All Rights Reserved.
            </span>
          </div>
          
          {/* Social Icons Strip Row */}
          {/* 🔑 DYNAMIC: Hover changes dynamically to match client's primary style color */}
          <div className="flex items-center justify-center gap-5">
            {["f", "in", "li", "𝕏", "▶"].map((icon, i) => (
              <Link key={i} href="#" className={`text-gray-400 ${textHoverPrimary} transition-colors text-sm font-bold p-1`}>
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* 4. Legal Disclaimers Section Area */}
        {/* 🔑 DYNAMIC: Hover changes dynamically to match client's primary style color */}
        <div className="mt-8 pt-6 border-t border-gray-50 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-3 text-[10px] font-semibold text-gray-400">
            {["Terms of Use", "Privacy Policy", "DMCA Notice", "Fair Housing Statement", "NY Standard Operating Procedures", "NY Fair Housing Notice"].map((t) => (
              <Link key={t} href="#" className={`transition-colors ${textHoverPrimary}`}>
                {t}
              </Link>
            ))}
          </div>
          {/* 🔑 DYNAMIC: Legal disclosures update company names via configuration layer variables */}
          <p className="text-[10px] text-gray-400/80 mt-5 leading-relaxed font-normal max-w-6xl mx-auto md:mx-0">
            {BRAND_CONFIG.meta.siteName} and various trademarks, logos, designs, and slogans are registered and unregistered trademarks of {BRAND_CONFIG.meta.siteName}, Inc. We are a licensed real estate broker representing properties listed under {BRAND_CONFIG.brokerage.name}. All listing information is deemed reliable but is not guaranteed. All measurements and square footages are approximate. We support the Fair Housing Act and Equal Opportunity Act.
          </p>
        </div>

      </div>
    </footer>
  );
}