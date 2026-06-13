"use client";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";

export default function NavbarV3({ scrolled, isHome, logoColorClass, navLinkColorClass, navItems }: any) {
  // 🔑 Design Alternative: High-contrast compact view with a gold background block when scrolled
  const stickyStyles = `${BRAND_CONFIG.theme.accentBg} text-slate-900 py-2 shadow-lg`;
  const defaultStyles = isHome ? "bg-transparent text-white py-6" : `bg-white ${BRAND_CONFIG.theme.primaryText} py-6`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? stickyStyles : defaultStyles}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between h-12 items-center">
        <span className="font-bold uppercase tracking-widest">{BRAND_CONFIG.meta.siteName} (Variant 3)</span>
      </div>
    </header>
  );
}