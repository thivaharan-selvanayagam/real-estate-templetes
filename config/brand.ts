// config/brand.ts

export const BRAND_CONFIG = {
  // Agent Details
  agent: {
    name: "Kal Kanagarajah",
    title: "Real Estate Professional",
    phone: "(905) 409-4771",
    phoneRaw: "9054094771", // Used for tel: links
    email: "kal.kanagarajah@outlook.com",
    headshot: "/images/kal-headshot.webp",
    fullphoto:  "/images/about_kal.webp",
  },

  // Brokerage & Company Details
  brokerage: {
    name: "Royal Lepage Real Estate Associates",
    shortName: "Royal Lepage Associates",
    address: "158 Main Street Markham N, Markham, ON L3P 1Y3",
  },

  // SEO & Website Meta
  meta: {
    siteName: "Kal Kanagarajah",
    logoSvgPath: "/images/kal-logo.svg",
    title: "Kal Kanagarajah | Luxury Homes & Properties",
    description: "Discover exceptional properties across the most sought-after markets. Buy, rent, or sell with the world's most innovative real estate team.",
    coverImage: "/images/about_kal.webp",
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