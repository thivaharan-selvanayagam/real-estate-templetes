import Link from "next/link";
import { Bed, Bath, Maximize, ArrowLeft, ChevronDown } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { notFound } from "next/navigation";
import { BRAND_CONFIG } from "@/config/brand";

const neighborhoodsData = [
  { 
    slug: "pickering", 
    name: "Pickering", 
    description: "Vibrant waterfront community offering direct GO Transit access to downtown Toronto, expanding pre-construction projects, and strong long-term equity potential.", 
    image: "/images/neighborhood/pickering.jpg" 
  },
  { 
    slug: "ajax", 
    name: "Ajax", 
    description: "Family-centric Durham Region community featuring spacious residential floor plans, scenic lakeside parks, and accessible commuter routes.", 
    image: "/images/neighborhood/ajax.jpg" 
  },
  { 
    slug: "whitby", 
    name: "Whitby", 
    description: "Picturesque historic downtown combined with modern family subdivisions, highly rated schools, and excellent access to Highway 401 and 407.", 
    image: "/images/neighborhood/whitby.jpg" 
  },
  { 
    slug: "oshawa", 
    name: "Oshawa", 
    description: "One of Durham's top investment hubs, delivering accessible entry prices for first-time buyers and strong rental demand near post-secondary institutions.", 
    image: "/images/neighborhood/oshawa.jpg" 
  },
  { 
    slug: "stouffville", 
    name: "Stouffville", 
    description: "Charming small-town atmosphere surrounded by scenic country landscapes, newer master-planned developments, and a quiet pace of life.", 
    image: "/images/neighborhood/stouffville.jpg" 
  },
  { 
    slug: "markham", 
    name: "Markham", 
    description: "Dynamic technology and corporate hub renowned for top-tier school catchments, established neighborhoods, and high resale stability.", 
    image: "/images/neighborhood/markham.jpg" 
  },
  { 
    slug: "vaughan", 
    name: "Vaughan", 
    description: "Rapidly expanding urban center anchored by subway line connectivity, major commercial developments, and versatile family properties.", 
    image: "/images/neighborhood/vaughan.jpg" 
  },
  { 
    slug: "richmond-hill", 
    name: "Richmond Hill", 
    description: "Sought-after York Region enclave featuring pristine greenbelt trails, highly ranked educational options, and enduring real estate value.", 
    image: "/images/neighborhood/richmond-hill.jpg" 
  },
  { 
    slug: "toronto", 
    name: "Toronto", 
    description: "Canada's economic heart, featuring diverse downtown condo developments, historic tree-lined neighborhoods, and high-demand investment corridors.", 
    image: "/images/neighborhood/toronto.avif" 
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
};

async function getCityListings(cityName: string, pageNum: number) {
  try {
    const res = await fetch(
      `${process.env.REPLIERS_BASE_URL}/listings?city=${encodeURIComponent(cityName)}&status=A&resultsPerPage=24&pageNum=${pageNum}`,
      {
        headers: {
          "REPLIERS-API-KEY": process.env.REPLIERS_API_KEY || "", 
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return { listings: [], numResults: 0 };
    return res.json();
  } catch (error) {
    console.error("Error fetching city listings:", error);
    return { listings: [], numResults: 0 };
  }
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CityPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedQueries = await searchParams;
  const { slug } = resolvedParams;

  const city = neighborhoodsData.find((n) => n.slug === slug);
  if (!city) notFound();

  const pageQuery = typeof resolvedQueries.page === "string" ? parseInt(resolvedQueries.page, 10) : 1;
  const activePage = isNaN(pageQuery) || pageQuery < 1 ? 1 : pageQuery;

  const data = await getCityListings(city.name, activePage);
  const listings = data.listings || [];
  
  const totalResults = Number(data.numResults || data.count || listings.length);
  const listingsPerPage = 24;
  const totalPages = Math.ceil(totalResults / listingsPerPage);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, activePage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[480px] lg:h-[540px] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={city.image} alt={`${city.name} community panorama`} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4 text-stone-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-stone-500">/</span>
            <Link href="/neighbourhoods" className="hover:text-white transition-colors">Neighbourhoods</Link>
            <span className="text-stone-500">/</span>
            <span className="text-white">{city.name}</span>
          </div>

          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            GTA Community Spotlight
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-tight">
            {city.name}
          </h1>
          <p className="mt-4 text-[#F9F6F0]/85 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            {city.description}
          </p>
        </div>
      </section>

      {/* 2. LISTINGS SECTION */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-stone-200/80 pb-6 gap-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 text-left">
              Homes for Sale in <span className="text-[#4D71A3]">{city.name}</span> 
              <span className="text-xs font-normal text-stone-500 block sm:inline sm:ml-3">
                ({totalResults.toLocaleString()} active listings)
              </span>
            </h2>
            <Link 
              href="/neighbourhoods" 
              className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-900 hover:text-[#4D71A3] transition-colors font-sans"
            >
              <ArrowLeft size={16} /> All Neighbourhoods
            </Link>
          </div>

          {listings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing: any) => {
                  const img = listing.images?.[0];
                  const beds = listing.details?.numBedrooms || 0;
                  const baths = listing.details?.numBathrooms || 0;
                  
                  const sqftRawValue = listing.details?.sqft || listing.details?.squareFootage || "";
                  const parsedSqftNum = parseInt(String(sqftRawValue).replace(/[^0-9]/g, ""), 10);
                  const isSqftValid = !isNaN(parsedSqftNum) && parsedSqftNum > 0;

                  const streetAddress = `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''}`.trim();
                  const fullAddressString = `${streetAddress}, ${listing.address?.city || city.name}, ${listing.address?.state || 'ON'}`.trim().replace(/,\s*$/, "");

                  return (
                    <Link 
                      href={`/listings/${listing.mlsNumber}`} 
                      key={listing.mlsNumber} 
                      className="flex flex-col group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80"
                    >
                      <div className="w-full aspect-[4/3] relative overflow-hidden bg-stone-100">
                        {img ? (
                          <img 
                            src={`https://cdn.repliers.io/${img}?w=500`} 
                            alt={fullAddressString} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs font-semibold uppercase tracking-wider bg-slate-950">
                            No Image Available
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-sm">
                          {listing.status === "A" ? "Active" : listing.status}
                        </div>
                      </div>

                      <div className="p-6 text-left flex flex-col flex-grow">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                          {formatPrice(listing.listPrice)}
                        </h3>
                        <p className="text-xs font-normal text-stone-500 mb-4 truncate" title={fullAddressString}>
                          {fullAddressString}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs font-medium text-stone-700 border-t border-stone-100 pt-4 mt-auto">
                          <span className="flex items-center gap-1.5"><Bed size={15} className="text-[#4D71A3]"/> {beds} Bd</span>
                          <span className="flex items-center gap-1.5"><Bath size={15} className="text-[#4D71A3]"/> {baths} Ba</span>
                          
                          {isSqftValid && (
                            <span className="flex items-center gap-1.5 ml-auto">
                              <Maximize size={13} className="text-[#4D71A3]"/> 
                              {parsedSqftNum.toLocaleString()} sqft
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <Link 
                    href={`/neighbourhoods/${slug}?page=${activePage - 1}`}
                    className={`w-10 h-10 rounded-full border border-stone-200/80 flex items-center justify-center bg-white shadow-sm hover:bg-stone-100 text-slate-900 transition-colors ${activePage === 1 ? "pointer-events-none opacity-30" : ""}`}
                  >
                    <ChevronDown size={18} className="rotate-90" />
                  </Link>

                  {visiblePages.map(p => (
                    <Link
                      key={p}
                      href={`/neighbourhoods/${slug}?page=${p}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all shadow-sm ${p === activePage ? "bg-slate-900 text-[#F9F6F0]" : "border border-stone-200/80 bg-white hover:bg-stone-100 text-slate-900"}`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link 
                    href={`/neighbourhoods/${slug}?page=${activePage + 1}`}
                    className={`w-10 h-10 rounded-full border border-stone-200/80 flex items-center justify-center bg-white shadow-sm hover:bg-stone-100 text-slate-900 transition-colors ${activePage === totalPages ? "pointer-events-none opacity-30" : ""}`}
                  >
                    <ChevronDown size={18} className="-rotate-90" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Listings</h3>
              <p className="text-stone-500 text-sm font-normal">There are currently no active properties available in {city.name}.</p>
            </div>
          )}

        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";