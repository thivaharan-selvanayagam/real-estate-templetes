"use client";

import Link from "next/link";
// 🔑 FIXED: Removed non-existent brand modules to eliminate the Turbopack build error
import { BRAND_CONFIG } from "@/config/brand";

export default function Footer() {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Features", href: "/all-homes" },
    { label: "Pricing", href: "/home-evaluation" },
    { label: "API", href: "/my-listings" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-service" },
    { label: "Cookies", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100 relative z-20 w-full">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* TOP LAYOUT GRID PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 items-start">
          
          {/* LEFT SIDE BLOCK: Branding, CTA Box Headlines */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-md">
            
            {/* Dynamic Brand Logo Asset */}
            <div className="mb-6">
              {BRAND_CONFIG.meta.logoSvgPath ? (
                <img 
                  src={BRAND_CONFIG.meta.logoSvgPath} 
                  alt={`${BRAND_CONFIG.meta.siteName} Branding`} 
                  className="h-9 w-auto object-contain"
                />
              ) : (
                <span className={`text-lg font-bold tracking-[0.15em] font-display ${cleanPrimaryText}`}>
                  {BRAND_CONFIG.meta.siteName.replace(".", "")}
                </span>
              )}
            </div>

            {/* Main Action Call Headline */}
            <h3 className={`font-display text-2xl md:text-3xl font-extrabold ${cleanPrimaryText} tracking-tight mb-3`}>
              Start building today
            </h3>
            
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              Get started with a free account. No credit card required.
            </p>

            {/* Twin Secondary CTA Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="px-5 py-2.5 text-xs font-bold text-white tracking-wide rounded-full shadow-md bg-[#527CAE] hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <Link 
                href="/about" 
                className="px-5 py-2.5 text-xs font-bold text-gray-700 tracking-wide rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE BLOCK: Multi-Column Nav Index Directives */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-6 sm:gap-8 lg:justify-items-end w-full">
            
            {/* Column 1: Product */}
            <div className="flex flex-col items-start text-left">
              <h4 className={`font-display text-sm font-extrabold ${cleanPrimaryText} tracking-wide mb-4`}>
                Product
              </h4>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col items-start text-left">
              <h4 className={`font-display text-sm font-extrabold ${cleanPrimaryText} tracking-wide mb-4`}>
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col items-start text-left">
              <h4 className={`font-display text-sm font-extrabold ${cleanPrimaryText} tracking-wide mb-4`}>
                Legal
              </h4>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-900 text-xs sm:text-sm font-semibold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM METADATA BAR SECTION */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p className="text-gray-400 text-xs font-semibold">
            &copy; {currentYear} {BRAND_CONFIG.meta.siteName.split('.')[0] || "Your Company"}. All rights reserved.
          </p>
          
          {/* 🔑 FIXED: Inline raw vectors for Facebook and Instagram guarantee absolute compilation success */}
          <div className="flex items-center gap-5 text-gray-400">
            
            {/* Instagram Vector Icon */}
            <a 
              href="https://instagram.com/bettercall.kal" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-600 transition-colors duration-200" 
              aria-label="Instagram Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* Facebook Vector Icon */}
            <a 
              href="https://www.facebook.com/kal.kanagarajah/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors duration-200" 
              aria-label="Facebook Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}