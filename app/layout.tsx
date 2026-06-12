import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 Import your new config engine

export const metadata: Metadata = {
  title: BRAND_CONFIG.meta.title,
  description: BRAND_CONFIG.meta.description,
  
  openGraph: {
    title: BRAND_CONFIG.meta.title,
    description: BRAND_CONFIG.meta.description,
    url: BRAND_CONFIG.meta.domain,
    siteName: BRAND_CONFIG.meta.siteName,
    images: [
      {
        url: BRAND_CONFIG.meta.coverImage,
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.agent.name} Real Estate Cover`,
      },
    ],
    locale: "en_US",
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
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}