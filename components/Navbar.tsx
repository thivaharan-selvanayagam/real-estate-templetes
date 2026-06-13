"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BRAND_CONFIG } from "@/config/brand"; 

// 🔑 IMPORT YOUR VARIANTS
import NavbarV1 from "./navbar/NavbarV1";
import NavbarV2 from "./navbar/NavbarV2";
import NavbarV3 from "./navbar/NavbarV3";

const navItems = [
  { label: "Home", href: "/" },
  { label: `Meet ${BRAND_CONFIG.agent.name.split(" ")[0]}`, href: "/about" }, 
  { 
    label: "Buyer", 
    subItems: [
      { label: "Home Search", href: "/all-homes" },
      { label: "My Listings", href: "/my-listings" },
    ] 
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isDarkBackground = scrolled || (isHome && !scrolled);
  const logoColorClass = isDarkBackground ? "text-white" : BRAND_CONFIG.theme.primaryText;
  const navLinkColorClass = isDarkBackground ? "text-white/90" : "text-gray-800";

  // Package all state and style parameters up as shared props
  const sharedProps = {
    scrolled,
    isHome,
    logoColorClass,
    navLinkColorClass,
    navItems,
  };

  // 🔑 THE SWITCHBOARD: Evaluates the configuration token selection instantly
  switch (BRAND_CONFIG.theme.navbarVariant) {
    case "v1":
      return <NavbarV1 {...sharedProps} />;
    case "v2":
      return <NavbarV2 {...sharedProps} />;
    case "v3":
      return <NavbarV3 {...sharedProps} />;
    default:
      return <NavbarV1 {...sharedProps} />;
  }
}