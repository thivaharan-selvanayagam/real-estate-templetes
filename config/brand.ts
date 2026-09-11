// config/brand.ts

export const BRAND_CONFIG = {
  // Agent & Team Details
  agent: {
    name: "RealtHer Group",
    founders: ["Reema", "Pirasha"],
    title: "Real Estate Brokers",
    phone: "(647) 409-1719",
    phoneRaw: "6474091719",
    email: "realthergroup@gmail.com",
    headshot: "/images/pirasha.jpg",
    fullphoto: "/images/pirasha.jpg",
  },

  // Brokerage & Company Details
  brokerage: {
    name: "RE/MAX Metropolis Realty",
    shortName: "RE/MAX Metropolis",
    address: "8321 Kennedy Rd #21-22, Markham, ON",
    // 🔑 ADDED: Fixes the TypeScript error in the Footer build
    licenseDisclaimer: "Not intended to solicit buyers or sellers currently under contract with a brokerage. All information provided is deemed reliable but is not guaranteed and should be independently verified.",
  },

  // Social Channels
  socials: {
    instagram: "https://www.instagram.com/realthergroup/",
    facebook: "https://www.facebook.com/SoldByReema/",
    tiktok: "https://www.tiktok.com/@realthergroup",
  },

  // SEO & Website Meta
  meta: {
    siteName: "RealtHer Group",
    tagline: "REAL ESTATE, DONE DIFFERENTLY.",
    subtagline: "Strategic guidance. Local expertise. A smarter move.",
    logoSvgPath: "/images/logore.png",
    title: "RealtHer Group | Greater Toronto Area Real Estate Brokers",
    description: "Strategic guidance and local GTA expertise for first-time buyers, sellers, investors, and pre-construction clients.",
    coverImage: "/images/pirasha.jpg",
    domain: "https://real-estate-templetes.vercel.app/",
  },

  // 🔑 UPDATED: Aligned Theme System to the new Slate Blue & Dark Slate UI
  theme: {
    navbarVariant: "v1",
    
    // Primary Backgrounds & Text
    primaryBg: "bg-slate-950", 
    primaryText: "text-slate-900",
    primaryBorder: "border-slate-800",
    headerStickyBg: "bg-slate-950",

    // Primary Accents (Slate Blue)
    accentText: "text-[#4D71A3]",
    accentBg: "bg-[#4D71A3]",
    accentBorder: "border-[#4D71A3]",
    accentHover: "hover:bg-[#3B5B88]",

    // Soft Warm Palette Classes for Backgrounds
    ivoryBg: "bg-[#FDFBF7]",
    taupeBg: "bg-[#F9F6F0]",
  }
};