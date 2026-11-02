import { BRAND_CONFIG } from "@/config/brand";

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://realthergroup.com/#organization",
        name: BRAND_CONFIG.meta.siteName || "RealtHer Group",
        url: "https://realthergroup.com",
        logo: "https://realthergroup.com/logo.png",
        image: "https://realthergroup.com/og-image.jpg",
        description: "Premier Greater Toronto Area real estate advisory specializing in residential transactions, neighborhood valuation, and historical MLS sold intelligence.",
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
          { "@type": "City", name: "Markham" },
          { "@type": "City", name: "Vaughan" },
          { "@type": "City", name: "Mississauga" },
          { "@type": "City", name: "Brampton" },
          { "@type": "City", name: "Richmond Hill" },
          { "@type": "City", name: "Oakville" },
          { "@type": "City", name: "Pickering" },
          { "@type": "City", name: "Ajax" },
          { "@type": "City", name: "Oshawa" }
        ],
        // 🔑 Crucial for Entity Clarity score: connects your brand to trusted web entities
        sameAs: [
          "https://www.instagram.com/realthergroup",
          "https://www.facebook.com/realthergroup",
          "https://www.linkedin.com/company/realthergroup",
          "https://www.reco.on.ca",
          "https://trreb.ca"
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://realthergroup.com/#website",
        url: "https://realthergroup.com",
        name: BRAND_CONFIG.meta.siteName || "RealtHer Group",
        publisher: {
          "@id": "https://realthergroup.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://realthergroup.com/all-homes?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}