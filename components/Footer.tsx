"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10 pt-16 pb-12 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* COL 1: BRAND & FOUNDERS */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="mb-6 block group">
              {BRAND_CONFIG.meta.logoSvgPath ? (
                <img 
                  src={BRAND_CONFIG.meta.logoSvgPath} 
                  alt={BRAND_CONFIG.meta.siteName} 
                  className="h-20 w-auto object-contain brightness-0 invert transition-opacity group-hover:opacity-85" 
                />
              ) : (
                <span className="text-2xl font-bold tracking-widest font-display text-white transition-opacity group-hover:opacity-85">
                  REALTHER<span className="text-[#4D71A3]">.</span>
                </span>
              )}
            </Link>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-light mb-6">
              Strategic real estate guidance across the Greater Toronto Area. Founded by Reema Shahzad and Pirasha Vygunthavasa to deliver personalized, expert advocacy for buyers, sellers, and investors.
            </p>

            {/* INLINE SVG SOCIAL ICONS */}
            <div className="flex items-center gap-3">
              <a 
                href={BRAND_CONFIG.socials.instagram} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#4D71A3] transition-all"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={BRAND_CONFIG.socials.facebook} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#4D71A3] transition-all"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={BRAND_CONFIG.socials.tiktok} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#4D71A3] transition-all"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.52-1.36 2.52-.01 1.02.48 2.02 1.3 2.61.88.62 2.06.72 3.03.27.84-.38 1.47-1.18 1.63-2.08.08-.42.08-.85.08-1.27.02-5.22.01-10.45.02-15.67z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COL 2: NAVIGATION */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4D71A3] mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs font-medium text-stone-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Meet RealtHer</Link></li>
              <li><Link href="/all-homes" className="hover:text-white transition-colors">GTA Home Search</Link></li>
              <li><Link href="/buyers-guide" className="hover:text-white transition-colors">Buyer's Guide</Link></li>
              <li><Link href="/sellers-guide" className="hover:text-white transition-colors">Seller's Guide</Link></li>
              <li><Link href="/home-evaluation" className="hover:text-white transition-colors">Home Evaluation</Link></li>
            </ul>
          </div>

          {/* COL 3: RESOURCES */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4D71A3] mb-6">
              Resources
            </h4>
            <ul className="space-y-3 text-xs font-medium text-stone-300">
              <li><Link href="/calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Client Testimonials</Link></li>
              <li><Link href="/neighbourhoods" className="hover:text-white transition-colors">GTA Neighbourhoods</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* COL 4: CONTACT & BROKERAGE INFO */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#4D71A3] mb-6">
              Contact & Brokerage
            </h4>
            
            <div className="space-y-4 text-xs text-stone-300 font-light">
              <a href={`tel:${BRAND_CONFIG.agent.phoneRaw}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={15} className="text-[#4D71A3] shrink-0" />
                <span>{BRAND_CONFIG.agent.phone}</span>
              </a>

              <a href={`mailto:${BRAND_CONFIG.agent.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={15} className="text-[#4D71A3] shrink-0" />
                <span>{BRAND_CONFIG.agent.email}</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#4D71A3] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.brokerage.address}</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-start gap-3">
                <Building2 size={15} className="text-[#4D71A3] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block tracking-wide">
                    {BRAND_CONFIG.brokerage.name}
                  </span>
                  <span className="text-[11px] text-stone-400 block mt-0.5">
                    Independently Owned & Operated
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-light text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.meta.siteName}. All rights reserved.
          </p>
          <p className="max-w-xl text-stone-500 text-[10px] leading-relaxed">
            {BRAND_CONFIG.brokerage.licenseDisclaimer}
          </p>
        </div>

      </div>
    </footer>
  );
}