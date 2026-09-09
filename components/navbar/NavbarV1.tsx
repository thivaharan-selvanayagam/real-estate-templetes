"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

// 🔑 DEFINED: Exactly 8 dynamic menu blocks (4 on Left / 4 on Right)
const navItems = [
  // --- LEFT WING MENUS ---
  { label: "Home", href: "/" },
  { label: `Meet ${BRAND_CONFIG.agent.name.split(" ")[0]}`, href: "/about" },
  // { label: "Neighbourhoods", href: "/neighbourhoods" },
  { 
    label: "Buyer", 
    subItems: [
      { label: "Home Search", href: "/all-homes" },
      { label: "My Listings", href: "/my-listings" },
      { label: "Buyer's Guide", href: "/buyers-guide" },
    ] 
  },
  
  // --- RIGHT WING MENUS ---
  { 
    label: "Seller", 
    subItems: [
      { label: "Home Evaluation", href: "/home-evaluation" },
      { label: "Seller's Guide", href: "/sellers-guide" },
    ] 
  },
  { 
    label: "More", 
    subItems: [
      { label: "Calculator", href: "/calculator" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Neighbourhoods", href: "/neighbourhoods" },
    ] 
  },
];

export default function NavbarV1({ scrolled, isHome, logoColorClass, navLinkColorClass }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();

  // 🔑 AUTOMATED BREAKPOINT: Slices exactly at index 4 (4 left, 4 right)
  const leftLinks = navItems.slice(0, 3);
  const rightLinks = navItems.slice(3, 7);

  const textHoverAccent = `hover:${BRAND_CONFIG.theme.accentText}`;
  const textActiveAccent = BRAND_CONFIG.theme.accentText;
  const isDarkBackground = scrolled || (isHome && !scrolled);

  // 🔑 FIXED: Sticky header gets mt-5 (20px) top margin, rounded-full pill shape curves, and drops edge-anchors
  const stickyStyles = `${BRAND_CONFIG.theme.headerStickyBg} bg-opacity-90 backdrop-blur-md rounded-full shadow-md py-2 mt-3 max-w-[calc(100%-2rem)] mx-auto left-4 right-4 border border-white/10 text-white`;
  const defaultStyles = isHome 
    ? "bg-transparent text-white py-5 left-0 right-0" 
    : `bg-white ${BRAND_CONFIG.theme.primaryText} border-b border-gray-100 py-5 left-0 right-0`;

  const toggleMobileSubMenu = (label: string) => {
    setOpenMobileMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header className={`fixed top-0 z-50 transition-all duration-300 ${scrolled ? stickyStyles : defaultStyles}`}>
      <div className="max-w-[1536px] mx-auto px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20 relative">
          
          {/* DESKTOP SPLIT GRID (Symmetrical 4-Logo-4 Layout Framework) */}
          <div className="hidden lg:grid grid-cols-12 w-full items-center">
            
            {/* LEFT WING: 4 Items */}
            <nav className="col-span-5 flex items-center gap-5 xl:gap-7 justify-end pr-4 xl:pr-8">
              {leftLinks.map((item) => (
                item.subItems ? (
                  <div key={item.label} className="relative group">
                    <button className={`flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 ${textHoverAccent} ${navLinkColorClass}`}>
                      {item.label} <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
                    </button>
                    <div className="absolute left-0 top-full pt-6 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] flex flex-col gap-1">
                        {item.subItems.map((sub) => (
                          <Link key={sub.label} href={sub.href} className={`hover:bg-neutral-50 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${BRAND_CONFIG.theme.primaryText} ${textHoverAccent}`}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={item.label} href={item.href!} className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 ${textHoverAccent} ${navLinkColorClass} ${pathname === item.href ? textActiveAccent : ""}`}>
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* LOGO: Center Node */}
            <div className="col-span-2 flex justify-center z-10">
              <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                {BRAND_CONFIG.meta.logoSvgPath ? (
                  <div className="relative h-30 w-36 md:h-32 md:w-44 transition-opacity duration-300 group-hover:opacity-80">
                    <img 
                      src={BRAND_CONFIG.meta.logoSvgPath} 
                      alt={`${BRAND_CONFIG.meta.siteName} Logo`}
                      className={`h-full w-auto object-contain mx-auto ${isDarkBackground ? "invert brightness-0" : ""}`} 
                    />
                  </div>
                ) : (
                  <span className={`text-xl md:text-2xl font-bold tracking-[0.15em] font-display transition-colors duration-300 ${logoColorClass}`}>
                    {BRAND_CONFIG.meta.siteName.replace(".", "")}<span className={BRAND_CONFIG.theme.accentText}>.</span>
                  </span>
                )}
              </Link>
            </div>

            {/* RIGHT WING: 4 Items + Action Callout Button */}
            <nav className="col-span-5 flex items-center pl-4 xl:pl-8 justify-between w-full">
              <div className="flex items-center gap-5 xl:gap-7">
                {rightLinks.map((item) => (
                  item.subItems ? (
                    <div key={item.label} className="relative group">
                      <button className={`flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 ${textHoverAccent} ${navLinkColorClass}`}>
                        {item.label} <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
                      </button>
                      <div className="absolute left-0 top-full pt-6 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] flex flex-col gap-1">
                          {item.subItems.map((sub) => (
                            <Link key={sub.label} href={sub.href} className={`hover:bg-neutral-50 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${BRAND_CONFIG.theme.primaryText} ${textHoverAccent}`}>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link key={item.label} href={item.href!} className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 ${textHoverAccent} ${navLinkColorClass} ${pathname === item.href ? textActiveAccent : ""}`}>
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Action Pill Action Element */}
              <Link 
                href="/contact" 
                className={`text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full transition-all duration-300 border shadow-sm whitespace-nowrap ${
                  isDarkBackground 
                    ? "border-white/20 text-white hover:bg-white hover:text-gray-900" 
                    : `text-white ${BRAND_CONFIG.theme.primaryBg} ${BRAND_CONFIG.theme.primaryBorder} hover:opacity-90`
                }`}
              >
                Let's Connect
              </Link>
            </nav>

          </div>

          {/* MOBILE RESPONSIVE WRAPPER BAR */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* 🔑 FIXED: Replaced standard string title with full SVG/Image configuration fallback matching desktop */}
            <Link href="/" className="flex items-center group">
              {BRAND_CONFIG.meta.logoSvgPath ? (
                <div className="relative h-8 w-28 transition-opacity duration-300 group-hover:opacity-80">
                  <img 
                    src={BRAND_CONFIG.meta.logoSvgPath} 
                    alt={`${BRAND_CONFIG.meta.siteName} Mobile Logo`}
                    className={`h-full w-auto object-contain ${isDarkBackground ? "invert brightness-0" : ""}`} 
                  />
                </div>
              ) : (
                <span className={`text-xl font-bold tracking-[0.15em] font-display transition-colors duration-300 ${logoColorClass}`}>
                  {BRAND_CONFIG.meta.siteName.replace(".", "")}<span className={BRAND_CONFIG.theme.accentText}>.</span>
                </span>
              )}
            </Link>
            
            <button className={`p-2 ${isDarkBackground ? "text-white" : "text-gray-800"}`} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE ACCORDION DRAWER OVERLAY */}
      {mobileOpen && (
        <div className={`lg:hidden px-6 py-6 border-t shadow-2xl overflow-y-auto max-h-[85vh] ${isDarkBackground ? `${BRAND_CONFIG.theme.headerStickyBg} text-white border-white/5` : "bg-white border-gray-100 text-gray-800"}`}>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label} className={`border-b ${isDarkBackground ? "border-white/5" : "border-gray-100"}`}>
                {item.subItems ? (
                  <>
                    <button onClick={() => toggleMobileSubMenu(item.label)} className="flex items-center justify-between w-full font-bold text-sm py-4">
                      {item.label} <ChevronDown size={16} className={`transition-transform ${openMobileMenus[item.label] ? "-rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openMobileMenus[item.label] ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                      <div className="flex flex-col gap-3 pl-4 border-l-2 ml-2">
                        {item.subItems.map((sub) => (
                          <Link key={sub.label} href={sub.href} className={`text-sm font-medium ${textHoverAccent}`} onClick={() => setMobileOpen(false)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href!} className="block font-bold text-sm py-4" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link href="/contact" className={`text-white text-xs font-bold uppercase tracking-wider text-center py-4 rounded-full mt-6 ${BRAND_CONFIG.theme.accentBg}`} onClick={() => setMobileOpen(false)}>
              Let's Connect
            </Link>
          </nav>
        </div>
      )} 
    </header>
  );
}