import { getListings } from "@/lib/repliers";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import ListingsGrid from "@/components/ListingsGrid";
import { BRAND_CONFIG } from "@/config/brand";
import { Sparkles, CheckCircle2, Table, HelpCircle } from "lucide-react";

export const metadata = { 
  title: `GTA Homes & Properties | ${BRAND_CONFIG.meta.siteName}`,
  description: `Browse verified active MLS® homes for sale and lease across Toronto, Mississauga, Brampton, Vaughan, Markham, and Durham Region with RealtHer Group.`,
};

export default async function AllHomesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let combinedListings: any[] = [];
  let totalResultsCount = 0;
  
  const resolvedParams = await searchParams;

  const searchString = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const propClass = typeof resolvedParams.class === "string" && resolvedParams.class !== "all" 
    ? resolvedParams.class 
    : "Residential"; 

  const trxType = typeof resolvedParams.type === "string" ? resolvedParams.type : "buy"; 
  const minPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : undefined;
  const beds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : undefined;
  const baths = typeof resolvedParams.baths === "string" ? resolvedParams.baths : undefined;
  
  const urlPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const activePage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const reqBeds = beds && beds !== "Any" ? parseInt(beds, 10) : undefined;
  const reqBaths = baths && baths !== "Any" ? parseInt(baths, 10) : undefined;

  // Ignore high sale-scale minPrice when querying lease properties
  const parsedMinPrice = minPrice && !isNaN(Number(minPrice)) ? Number(minPrice) : undefined;
  const effectiveMinPrice = (trxType === "lease" && parsedMinPrice && parsedMinPrice >= 50000) 
    ? undefined 
    : minPrice;

  try { 
    // Repliers API Payload
    const baseQueryPayload: any = {
      pageSize: 24,
      pageNum: activePage,
      search: searchString || undefined,
      minPrice: effectiveMinPrice || undefined,
      maxPrice: maxPrice || undefined,
      minBedrooms: reqBeds,
      minBeds: reqBeds,
      minBaths: reqBaths,
      minBathrooms: reqBaths,
      class: propClass
    };

    // Explicit transaction mapping (Buy vs Lease vs Sold)
    if (trxType === "sold") {
      baseQueryPayload.status = "U";
      baseQueryPayload.lastStatus = "Sld";
    } else if (trxType === "lease") {
      baseQueryPayload.status = "A";
      baseQueryPayload.type = "lease";
    } else { // "buy" / "sale"
      baseQueryPayload.status = "A";
      baseQueryPayload.type = "sale";
    }

    const data = await getListings(baseQueryPayload);
    let rawListings = data?.listings || [];

    // IN-MEMORY POST-FILTER GUARANTEE
    // 1. Bedroom Filter Pass
    if (reqBeds) {
      rawListings = rawListings.filter((l: any) => {
        const numBeds = Number(l.details?.numBedrooms || l.numBedrooms || l.bedrooms || 0);
        return numBeds >= reqBeds;
      });
    }

    // 2. Bathroom Filter Pass
    if (reqBaths) {
      rawListings = rawListings.filter((l: any) => {
        const numBaths = Number(l.details?.numBathrooms || l.numBathrooms || l.bathrooms || l.details?.numBaths || 0);
        return numBaths >= reqBaths;
      });
    }

    // 3. Transaction Type Filter Pass
    if (trxType === "sold") {
      rawListings = rawListings.filter((l: any) => {
        const lastSt = (l.lastStatus || "").toLowerCase();
        const st = (l.status || "").toLowerCase();
        const stdSt = (l.standardStatus || "").toLowerCase();
        return lastSt === "sld" || st === "u" || stdSt === "closed";
      });
    } else if (trxType === "lease") {
      rawListings = rawListings.filter((l: any) => {
        const listingType = (l.type || l.details?.type || "").toLowerCase();
        const st = (l.status || "").toLowerCase();
        const lastSt = (l.lastStatus || "").toLowerCase();
        return (listingType === "lease" || listingType === "rent" || st === "lsd") && lastSt !== "sld" && st !== "u";
      });
    } else if (trxType === "buy" || trxType === "sale") {
      rawListings = rawListings.filter((l: any) => {
        const listingType = (l.type || l.details?.type || "").toLowerCase();
        const st = (l.status || "").toLowerCase();
        const lastSt = (l.lastStatus || "").toLowerCase();
        return listingType !== "lease" && listingType !== "rent" && lastSt !== "sld" && st !== "u";
      });
    }

    combinedListings = rawListings;
    
    const genericData = data as any;
    totalResultsCount = Number(genericData?.numResults || genericData?.count || genericData?.metadata?.numResults || combinedListings.length);

  } catch (e) {
    console.error("Repliers database aggregation failure:", e);
  }

  if (totalResultsCount <= 0 && combinedListings.length > 0) {
    totalResultsCount = combinedListings.length; 
  }

  // FAQ Items for Structured Schema & Visual Accordion
  const allHomesFaqs = [
    {
      question: "How frequently are active GTA listings refreshed on this portal?",
      answer: "Listings are synchronized in real time with direct feeds from the Toronto Regional Real Estate Board (TRREB) MLS® system, ensuring new properties, price updates, and conditional statuses appear within minutes."
    },
    {
      question: "Can I filter properties for both purchase and executive lease?",
      answer: "Yes, our search controls allow you to switch seamlessly between properties available for purchase and rental/lease across all covered Greater Toronto Area municipalities."
    },
    {
      question: "What types of residential properties are represented in this index?",
      answer: "Our catalog includes single-family detached homes, semi-detached properties, modern freehold townhouses, stacked row homes, and luxury condominiums throughout Toronto, York, Peel, and Durham regions."
    }
  ];

  // Schema for CollectionPage & FAQPage
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://realthergroup.com/all-homes/#webpage",
        url: "https://realthergroup.com/all-homes",
        name: `GTA Homes & Properties | ${BRAND_CONFIG.meta.siteName}`,
        description: "Browse verified active MLS® homes for sale and lease across Toronto, Peel, York, and Durham Region.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://realthergroup.com/#website",
          name: BRAND_CONFIG.meta.siteName,
          url: "https://realthergroup.com"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://realthergroup.com/all-homes/#faq",
        mainEntity: allHomesFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };
  
  return (
    <>
      {/* 🔑 INJECT FAQ & COLLECTION JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="bg-[#FDFBF7] min-h-[90vh] relative z-20 w-full pt-28 lg:pt-36 pb-8">
        
        {/* 🔑 STEP 6 AUDIT FIX: ANSWER-FIRST SUMMARY, H1/H2 HIERARCHY, LISTS & TABLES */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-10 text-left">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 text-xs font-bold text-[#2b4b46] bg-emerald-50/80 tracking-wide uppercase">
              <Sparkles size={12} />
              Real-Time MLS® Property Index
            </span>
          </div>

          {/* Exactly one primary H1 */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight max-w-4xl">
            Active GTA Real Estate & MLS® Property Listings
          </h1>

          {/* Answer-First Executive Summary: 58 words directly beneath H1 */}
          <p className="text-stone-600 text-sm sm:text-base font-normal max-w-3xl mt-4 leading-relaxed">
            Browse verified active MLS® homes for sale and lease across the Greater Toronto Area with RealtHer Group. 
            Our real-time registry provides up-to-date residential property data across Toronto, Peel, York, and Durham 
            regions, including single-family detached houses, townhomes, and modern condominiums. Filter by municipality, 
            price bracket, and bedroom count to discover current market opportunities.
          </p>

          {/* Scannable Overview Modules: Semantic List & Structured Data Table */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl">
            
            {/* H2 #1 with semantic List */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#2b4b46]" /> GTA Property Categories & Regional Scope
              </h2>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b4b46] mt-1.5 shrink-0" />
                  <span><strong>Freehold Single-Family:</strong> Detached, link, and semi-detached homes in prime school districts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b4b46] mt-1.5 shrink-0" />
                  <span><strong>Condos & Lofts:</strong> Waterfront, transit-oriented, and boutique condominium residences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b4b46] mt-1.5 shrink-0" />
                  <span><strong>Modern Townhomes:</strong> Multi-story freehold and condominium-managed townhome developments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b4b46] mt-1.5 shrink-0" />
                  <span><strong>Regional Coverage:</strong> Toronto, Mississauga, Brampton, Vaughan, Markham, and Durham Region.</span>
                </li>
              </ul>
            </div>

            {/* H2 #2 with semantic Table */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <Table size={14} className="text-[#2b4b46]" /> Live MLS® Property Search Specifications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-600 border-collapse">
                  <tbody>
                    <tr className="border-b border-stone-100">
                      <td className="py-2 font-bold text-slate-900 w-1/2">MLS® Feed Source</td>
                      <td className="py-2 text-stone-600">Direct TRREB MLS® Real-Time Feed</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-2 font-bold text-slate-900">Active Results Count</td>
                      <td className="py-2 text-stone-600">{totalResultsCount.toLocaleString()} Properties Indexed</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-2 font-bold text-slate-900">Transaction Classification</td>
                      <td className="py-2 text-stone-600 uppercase font-semibold text-[#2b4b46]">
                        {trxType === "lease" ? "Lease / Rental" : "Residential Sale"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Synchronized Cadence</td>
                      <td className="py-2 text-stone-600">Daily Multi-Hourly Board Sync</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive Property Grid */}
        <ListingsGrid 
          type={trxType} 
          propertyClass={propClass}
          initialListings={combinedListings} 
          initialTotal={totalResultsCount} 
          initialSearch={searchString || ""} 
          currentPage={activePage}
          currentMinPrice={minPrice || ""}
          currentMaxPrice={maxPrice || ""}
          currentBeds={beds || "Any"}
          currentBaths={baths || "Any"}
        />

        {/* H2 #3: FAQ Section for Search Engines & Buyers */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-16 text-left">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2b4b46] bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-2">
              Buyer & Tenant Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle size={22} className="text-[#2b4b46]" /> Frequently Asked Questions About GTA Properties
            </h2>
          </div>

          <div className="divide-y divide-stone-200/80 max-w-4xl bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            {allHomesFaqs.map((item, idx) => (
              <details key={idx} className="group py-4 text-left cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#2b4b46] transition-colors list-none">
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

      <OurRegions />
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";