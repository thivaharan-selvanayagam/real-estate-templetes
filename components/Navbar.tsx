"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

// 🔑 FIXED: Made hierarchical links dynamic using template literals from your config engine
const navItems = [
  { label: "Home", href: "/" },
  { label: `Meet ${BRAND_CONFIG.agent.name.split(" ")[0]}`, href: "/about" }, // Automatically adapts to first name
  { 
    label: "Buyer", 
    subItems: [
      { label: "Home Search", href: "/all-homes" },
      { label: "My Listings", href: "/my-listings" },
      { label: "Buyer's Guide", href: "/buyers-guide" },
    ] 
  },
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
      { label: "Neighbourhoods", href: "/neighbourhoods" },
      { label: "Calculator", href: "/calculator" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Real Estate News", href: "/news" },
    ] 
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State to track which mobile dropdowns are open
  const [openMobileMenus, setOpenMobileMenus] = useState<{ [key: string]: boolean }>({});
  
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-homes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const toggleMobileSubMenu = (label: string) => {
    setOpenMobileMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Determine header wrapper styles dynamically based on scroll position
  const getHeaderStyles = () => {
    if (scrolled) {
      return "bg-navy/80 backdrop-blur-md text-white rounded-[32px] md:rounded-[48px] shadow-xl border-b border-white/5 py-1 lg:py-2 mt-2 max-w-[calc(100%-2rem)] mx-auto left-4 right-4";
    }
    if (isHome) {
      return "bg-transparent text-white py-4 lg:py-6 left-0 right-0";
    }
    return "bg-white text-navy border-b border-gray-100 py-4 lg:py-6 left-0 right-0";
  };

  const isDarkBackground = scrolled || (isHome && !scrolled);
  const logoColorClass = isDarkBackground ? "text-white" : "text-navy";
  const navLinkColorClass = isDarkBackground ? "text-white/90" : "text-gray-800";

  return (
    <header className={`fixed top-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20 transition-all duration-300">
          
           {/* Logo Layer Linked to Whitelabel Brain */}
			<Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
			{BRAND_CONFIG.meta.logoSvgPath ? (
				/* 🔑 OPTION A: Renders Custom Logo Graphic if path is provided */
				<div className="relative h-8 w-32 md:h-10 md:w-40 transition-opacity duration-300 group-hover:opacity-80">
				<img 
					src={BRAND_CONFIG.meta.logoSvgPath} 
					alt={`${BRAND_CONFIG.meta.siteName} Logo`}
					className={`h-full w-auto object-contain ${
					isDarkBackground ? "invert brightness-0" : ""
					}`} 
				/>
				</div>
			) : (
				/* 🔑 OPTION B: Elegant Text Fallback if no file is uploaded */
				<span className={`text-xl md:text-2xl font-bold tracking-[0.15em] font-display transition-colors duration-300 ${logoColorClass}`}>
				{BRAND_CONFIG.meta.siteName.replace(".", "")}<span className="text-gold">.</span>
				</span>
			)}
			</Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              item.subItems ? (
                // Dropdown Menu Item
                <div key={item.label} className="relative group">
                  <button className={`flex items-center gap-1 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-gold ${navLinkColorClass}`}>
                    {item.label}
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
                  </button>
                  
                  {/* Invisible padding area to keep hover state active while moving mouse down */}
                  <div className="absolute left-0 top-full pt-6 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] flex flex-col gap-1">
                      {item.subItems.map((sub) => (
                        <Link 
                          key={sub.label} 
                          href={sub.href} 
                          className="text-navy hover:bg-neutral-50 hover:text-gold px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Standard Menu Item
                <Link 
                  key={item.label} 
                  href={item.href!}
                  className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-gold ${navLinkColorClass} ${pathname === item.href ? "text-gold" : ""}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Search Bar Form */}
          <form 
            onSubmit={handleSearch}
            className={`hidden xl:flex items-center border rounded-full px-4 py-2 text-xs max-w-[240px] w-full gap-2 transition-all duration-300 focus-within:ring-1 focus-within:ring-gold ${
              isDarkBackground 
                ? "bg-white/10 border-white/10 text-white hover:bg-white/15" 
                : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200/60"
            }`}
          >
            <button type="submit" aria-label="Search" className="shrink-0 flex items-center justify-center">
              <Search size={14} className={isDarkBackground ? "text-white/70" : "text-gray-400"} />
            </button>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Area, City, Postal Code..."
              className={`bg-transparent outline-none w-full ${
                isDarkBackground ? "placeholder:text-white/50 text-white" : "placeholder:text-gray-400 text-gray-800"
              }`}
            />
          </form>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/contact" 
              className={`text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 border ${
                isDarkBackground 
                  ? "border-white/20 text-white hover:bg-white hover:text-navy" 
                  : "bg-navy border-navy text-white hover:bg-navy-light"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className={`lg:hidden p-2 transition-colors duration-300 ${isDarkBackground ? "text-white" : "text-gray-800"}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Container */}
      {mobileOpen && (
        <div className={`lg:hidden rounded-b-[32px] px-6 py-6 border-t animate-fade-in shadow-2xl transition-colors duration-300 max-h-[85vh] overflow-y-auto ${
          isDarkBackground ? "bg-navy-light/95 backdrop-blur-md border-white/5 text-white" : "bg-white border-gray-100 text-gray-800"
        }`}>
          <nav className="flex flex-col gap-2">
            
            {/* Mobile Search Bar */}
            <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className={`flex items-center border rounded-full px-4 py-3 mb-4 text-sm gap-2 ${
              isDarkBackground ? "bg-white/10 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-800"
            }`}>
               <Search size={16} className={isDarkBackground ? "text-white/70" : "text-gray-400"} />
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search homes..."
                 className={`bg-transparent outline-none w-full ${isDarkBackground ? "placeholder:text-white/50" : "placeholder:text-gray-400"}`}
               />
            </form>

            {/* Mobile Nav Links & Accordions */}
            {navItems.map((item) => (
              <div key={item.label} className={`border-b ${isDarkBackground ? "border-white/5" : "border-gray-100"}`}>
                {item.subItems ? (
                  <>
                    <button 
                      onClick={() => toggleMobileSubMenu(item.label)} 
                      className="flex items-center justify-between w-full font-bold text-sm py-4"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform duration-300 ${openMobileMenus[item.label] ? "-rotate-180" : ""}`} />
                    </button>
                    {/* Expandable Sub-items */}
                    <div className={`overflow-hidden transition-all duration-300 ${openMobileMenus[item.label] ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
                      <div className={`flex flex-col gap-3 pl-4 border-l-2 ${isDarkBackground ? "border-white/10" : "border-gray-100"} ml-2`}>
                        {item.subItems.map((sub) => (
                          <Link 
                            key={sub.label} 
                            href={sub.href} 
                            className={`text-sm font-medium ${isDarkBackground ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-navy"}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href!} 
                    className="block font-bold text-sm py-4"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Link href="/contact" className="bg-gold text-white text-xs font-bold uppercase tracking-wider text-center py-4 rounded-full mt-6 shadow-md" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}