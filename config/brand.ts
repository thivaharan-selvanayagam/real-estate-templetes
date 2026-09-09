// config/brand.ts

export const BRAND_CONFIG = {
  // Agent Details
  agent: {
    name: "RealtHer Group",
    title: "Real Estate Group",
    phone: "(647) 409-1719",
    phoneRaw: "6744091719", // Used for tel: links
    email: "realthergroup@gmail.com",
    headshot: "/images/pirasha.jpg",
    fullphoto:  "/images/pirasha.jpg",
  },

  // Brokerage & Company Details
  brokerage: {
    name: "RE/MAX Metropolis Realty",
    shortName: "RE/MAX Metropolis Realty",
    address: "8321 Kennedy Rd #21-22, Markham, ON",
  },

  // SEO & Website Meta
  meta: {
    siteName: "RealtHer Group",
    logoSvgPath: "/images/logore.png",
    title: "RealtHer Group | Luxury Homes & Properties",
    description: "Discover exceptional properties across the most sought-after markets. Buy, rent, or sell with the world's most innovative real estate team.",
    coverImage: "/images/pirasha.jpg",
    domain: "https://real-estate-templetes.vercel.app/",
  },

  // 🔑 NEW: Dynamic Whitelabel Color System
  theme: {
    // 🔑 THE MASTER CONTROLLER: Set this to "v1", "v2", or "v3" based on client preference
    navbarVariant: "v1",
    // Primary buttons, backgrounds, and header colors
    primaryBg: "bg-navy",          // Try swapping to "bg-emerald-900" or "bg-slate-900" for a new client!
    primaryText: "text-navy",      // Match theme typography
    primaryBorder: "border-navy",
    headerStickyBg: "bg-navy",

    // Accent styles (Buttons, tracking highlights, micro labels)
    accentText: "text-gold",       // Try swapping to "text-amber-500" or "text-teal-600"
    accentBg: "bg-gold",
    accentBorder: "border-gold",
    accentHover: "hover:bg-gold",
  }
};