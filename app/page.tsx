import { getFeaturedListings } from "@/lib/repliers";
import { HelpCircle, CheckCircle2, Building2 } from "lucide-react";

// 🔑 CORE COMPONENTS: Modular component layers
import HeroSearchSection from "@/components/HeroSearchSection";
import OurNeighborhoods from "@/components/OurNeighborhoods";
import BrandInnovationSection from "@/components/BrandInnovationSection";
import GetInTouch from "@/components/GetInTouch";

// 🔑 LOCAL SECTION LAYOUTS: Abstracted section blocks imported cleanly
import FeaturedProperties from "@/components/home/FeaturedProperties";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import PremiumCollection from "@/components/home/PremiumCollection";
import NewDevelopments from "@/components/home/NewDevelopments";
import GlobalReferralNetwork from "@/components/home/GlobalReferralNetwork";
import BecomeAnAgent from "@/components/home/BecomeAnAgent";
import HeroVariant4 from "@/components/home/HeroVariant4";
import AgentValueSection from "@/components/home/AgentValueSection";
import FeaturedListingsSlider from "@/components/home/FeaturedListingsSlider";
import NeighborhoodGrid from "@/components/home/NeighborhoodGrid";
import GuidesSection from "@/components/home/GuidesSection";
import ScrollingTestimonials from "@/components/home/ScrollingTestimonials";
import VideoCTASection from "@/components/home/VideoCTASection";

export default async function HomePage() {
  let featured = { listings: [] as any[], numResults: 0 };
  let rentals = { listings: [] as any[], numResults: 0 };
  
  try {
    // Fetches 36 listings so FeaturedProperties receives enough data to render 6 cards
    [featured, rentals] = await Promise.all([
      getFeaturedListings({ type: "sale", pageSize: 36 }),
      getFeaturedListings({ type: "lease", pageSize: 36 }),
    ]);
  } catch (e) { 
    console.error("Failed to compile master home page payloads:", e); 
  }

  // 🔑 FAQ Content for Schema & Visual Accordion
  const faqItems = [
    {
      question: "What areas of the Greater Toronto Area (GTA) do you serve?",
      answer: "RealtHer Group provides comprehensive real estate services across the Greater Toronto Area, including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Pickering, Ajax, and Oshawa."
    },
    {
      question: "Do you offer property valuation and comparative market analysis?",
      answer: "Yes. We offer data-backed Comparative Market Analysis (CMA) for sellers to determine accurate property values based on real-time TRREB MLS® sold data and active market competition."
    },
    {
      question: "Can you assist with pre-construction real estate investments?",
      answer: "Absolutely. We specialize in VIP pre-construction allocations, offering our clients early access to builder floor plans, competitive pricing, and developer incentives before public launch."
    }
  ];

  // 🔑 JSON-LD Schema (WebPage + FAQPage) for AI Crawlers
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://realthergroup.com/#webpage",
        url: "https://realthergroup.com/",
        name: "RealtHer Group | GTA Real Estate Advisory",
        description: "RealtHer Group is a premier residential real estate advisory serving buyers, sellers, and investors across the Greater Toronto Area."
      },
      {
        "@type": "FAQPage",
        "@id": "https://realthergroup.com/#faq",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      {/* 🔑 INJECT JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* 1. Hero Section Engine Layer (UNTouched / Fully Preserved) */}
      <HeroVariant4 />

      {/* 🔑 STEP 6 AUDIT FIX: ANSWER-FIRST SUMMARY, LISTS & TABLES */}
      {/* Inserted seamlessly below the Hero to preserve your finalized design */}
      <section className="bg-white py-16 lg:py-24 border-b border-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="max-w-4xl mb-12 text-left">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#4D71A3] mb-4">
              Greater Toronto Area Real Estate Advisory
            </h2>
            {/* Answer-First Executive Summary (53 words) */}
            <p className="text-stone-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              RealtHer Group is a premier residential real estate advisory serving buyers, sellers, and investors across the Greater Toronto Area. Specializing in freehold properties, condominiums, and luxury estates in Toronto, Mississauga, Brampton, Vaughan, Markham, and Durham Region, our team provides data-backed property valuation, VIP pre-construction access, and white-glove transaction guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Scannable Structure 1: Semantic List */}
            <div className="bg-[#FDFBF7] p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <CheckCircle2 size={24} className="text-[#4D71A3]" /> Core Advisory Capabilities
              </h3>
              <ul className="space-y-4 text-sm sm:text-base text-stone-600">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D71A3] mt-2.5 shrink-0" />
                  <span><strong>MLS® Property Access:</strong> Full real-time search for GTA active listings and historical sold data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D71A3] mt-2.5 shrink-0" />
                  <span><strong>Seller Representation:</strong> Targeted comparative market analysis (CMA) and strategic property pricing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D71A3] mt-2.5 shrink-0" />
                  <span><strong>Buyer Representation:</strong> First-time buyer guidance, relocation, and high-stakes negotiation advocacy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D71A3] mt-2.5 shrink-0" />
                  <span><strong>Investment Portfolios:</strong> High-ROI pre-construction VIP allocations and cash-flow analysis.</span>
                </li>
              </ul>
            </div>

            {/* Scannable Structure 2: Semantic Table */}
            <div className="bg-[#FDFBF7] p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <Building2 size={24} className="text-[#4D71A3]" /> Firm Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-base text-stone-600 border-collapse">
                  <tbody>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3.5 font-bold text-slate-900 w-1/2">Governing Body</td>
                      <td className="py-3.5 text-stone-600">Real Estate Council of Ontario (RECO)</td>
                    </tr>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3.5 font-bold text-slate-900">Real Estate Board</td>
                      <td className="py-3.5 text-stone-600">Toronto Regional Real Estate Board (TRREB)</td>
                    </tr>
                    <tr className="border-b border-stone-200/60">
                      <td className="py-3.5 font-bold text-slate-900">Primary Markets</td>
                      <td className="py-3.5 text-stone-600">Toronto, Peel, York, and Durham Regions</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 font-bold text-slate-900">Broker Leadership</td>
                      <td className="py-3.5 text-stone-600">Pirasha Vygunthavasan & Reema Shahzad</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      <AgentValueSection />
      {/* <FeaturedListingsSlider listings={featured.listings} /> */}
      <NeighborhoodGrid />

      {/* 2. Neighborhood Map Geographies Directory */}
      {/* <OurNeighborhoods /> */}

      {/* 3. Featured Sub-Market Property Layout */}
      <FeaturedProperties listings={featured.listings} />
      <GuidesSection />
      <ScrollingTestimonials />
      <VideoCTASection />
      
      {/* 4. Multimedia Client Story Module */}
      {/* <VideoTestimonials /> */}

      {/* 5. Contrast Grid Showcase Collection */}
      {/* <PremiumCollection listings={featured.listings} /> */}

      {/* 6. High-Density Asset Development Slider */}
      {/* <NewDevelopments /> */}

      {/* 7. Corporate Brand Optimization Block */}
      {/* <BrandInnovationSection /> */}

      {/* 8. Geolocation Network Web Engine */}
      {/* <GlobalReferralNetwork /> */}

      {/* 9. Internal Recruitment Callout Vector */}
      {/* <BecomeAnAgent /> */}

      {/* 🔑 STEP 6 AUDIT FIX: REQUIRED FAQ COMPONENT */}
      <section className="py-20 bg-[#FDFBF7] border-t border-stone-200/80 text-left">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4D71A3] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-blue-100">
              Client Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle size={22} className="text-[#4D71A3]" /> Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Learn more about our team, operating standards, and how we advocate for real estate clients in Ontario.
            </p>
          </div>

          <div className="divide-y divide-stone-200/80 max-w-4xl bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            {faqItems.map((item, idx) => (
              <details key={idx} className="group py-4 text-left cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#4D71A3] transition-colors list-none">
                  <span>{item.question}</span>
                  <span className="text-xl font-light text-stone-400 group-open:rotate-45 transition-transform ml-2">
                    +
                  </span>
                </summary>
                <p className="mt-2.5 text-stone-600 text-xs sm:text-sm leading-relaxed pr-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Global Footer Contact Submission Block */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";