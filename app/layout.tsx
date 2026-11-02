import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

// Ensure absolute URL resolution for canonical tags and social cards
const domainUrl = BRAND_CONFIG.meta.domain.startsWith("http")
  ? BRAND_CONFIG.meta.domain
  : `https://${BRAND_CONFIG.meta.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(domainUrl),
  title: {
    default: BRAND_CONFIG.meta.title,
    template: `%s | ${BRAND_CONFIG.meta.siteName}`,
  },
  description: BRAND_CONFIG.meta.description,
  
  // 🔑 Fix: Canonical URL mapping so crawlers index the primary authority domain
  alternates: {
    canonical: domainUrl,
  },

  // 🔑 Fix: Explicit crawler permissions for search and LLM indexing bots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: BRAND_CONFIG.meta.title,
    description: BRAND_CONFIG.meta.description,
    url: domainUrl,
    siteName: BRAND_CONFIG.meta.siteName,
    images: [
      {
        url: BRAND_CONFIG.meta.coverImage,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.agent?.name || BRAND_CONFIG.meta.siteName} Real Estate Cover`,
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: BRAND_CONFIG.meta.title,
    description: BRAND_CONFIG.meta.description,
    images: [BRAND_CONFIG.meta.coverImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 🔑 Fix: Organization, RealEstateAgent, and WebSite JSON-LD Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${domainUrl}/#organization`,
        name: BRAND_CONFIG.meta.siteName || "RealtHer Group",
        url: domainUrl,
        logo: `${domainUrl}/logo.png`,
        image: BRAND_CONFIG.meta.coverImage?.startsWith("http")
          ? BRAND_CONFIG.meta.coverImage
          : `${domainUrl}${BRAND_CONFIG.meta.coverImage || "/og-image.jpg"}`,
        description: BRAND_CONFIG.meta.description,
        telephone: BRAND_CONFIG.agent?.phone || "+1-416-555-0199",
        priceRange: "$$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toronto",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        areaServed: [
          { "@type": "City", name: "Toronto" },
          { "@type": "City", name: "Etobicoke" },
          { "@type": "City", name: "North York" },
          { "@type": "City", name: "Scarborough" },
          { "@type": "City", name: "East York" },
          { "@type": "City", name: "York" },
          { "@type": "City", name: "Mississauga" },
          { "@type": "City", name: "Brampton" },
          { "@type": "City", name: "Vaughan" },
          { "@type": "City", name: "Markham" },
          { "@type": "City", name: "Richmond Hill" },
          { "@type": "City", name: "Whitchurch-Stouffville" },
          { "@type": "City", name: "Pickering" },
          { "@type": "City", name: "Ajax" },
          { "@type": "City", name: "Oshawa" },
        ],
        // 🔑 Resolves Entity Clarity: Connects brand to verified regulatory/social profiles
        sameAs: [
          "https://www.instagram.com/realthergroup",
          "https://www.facebook.com/realthergroup",
          "https://www.linkedin.com/company/realthergroup",
          "https://www.reco.on.ca",
          "https://trreb.ca",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${domainUrl}/#website`,
        url: domainUrl,
        name: BRAND_CONFIG.meta.siteName,
        publisher: {
          "@id": `${domainUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${domainUrl}/all-homes?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Injects verified RealEstateAgent & WebSite Schema on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}