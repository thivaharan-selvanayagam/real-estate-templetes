"use client";

import Link from "next/link";
// 🔑 FIXED: Removed brittle social brand imports and replaced with core UI utility vectors
import { FolderGit, UserCheck, MessageSquare } from "lucide-react";
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
          
          {/* Universal System Utility Icons */}
          <div className="flex items-center gap-4 text-gray-500">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors" aria-label="X Profile">
              <MessageSquare size={16} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors" aria-label="Github Dev Pipeline">
              <FolderGit size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors" aria-label="LinkedIn Network Node">
              <UserCheck size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}