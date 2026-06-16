import Link from "next/link";
import { Bed, Bath, Maximize, ArrowLeft, ChevronDown } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { notFound } from "next/navigation";
import { BRAND_CONFIG } from "@/config/brand";

const neighborhoodsData = [
  { slug: "toronto", name: "Toronto", description: "Canada's largest city offering vibrant urban living, diverse neighborhoods, and endless cultural hotspots.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop" },
  { slug: "oakville", name: "Oakville", description: "Prestigious lakeside town renowned for its historic downtown, upscale lifestyle, and top-ranked schools.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop" },
  { slug: "mississauga", name: "Mississauga", description: "A booming urban center with a beautiful waterfront, diverse communities, and excellent transit hubs.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop" },
  { slug: "burlington", name: "Burlington", description: "Highly rated lakeside city perfectly balancing scenic nature, great schools, and modern family living.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop" },
  { slug: "markham", name: "Markham", description: "Canada's high-tech capital featuring highly sought-after schools, modern developments, and rich heritage.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop" },
  { slug: "vaughan", name: "Vaughan", description: "Rapidly growing city famous for premium master-planned communities, luxury homes, and fantastic amenities.", image: "https://images.unsplash.com/photo-160066752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop" },
  { slug: "richmond-hill", name: "Richmond Hill", description: "An upscale, green-filled municipality known for its excellent schools, pristine parks, and estate homes.", image: "https://images.unsplash.com/photo-160066753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop" },
  { slug: "hamilton", name: "Hamilton", description: "A vibrant, historic city blending a booming arts culture with stunning Niagara Escarpment nature.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop" },
  { slug: "brampton", name: "Brampton", description: "One of Canada's fastest-growing, family-centric cities featuring diverse neighborhoods and great recreation.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop" },
  { slug: "pickering", name: "Pickering", description: "A beautiful coastal community offering scenic waterfront trails and quick, easy transit access to Toronto.", image: "https://images.unsplash.com/photo-1600607687126-8a3414349a51?q=80&w=1600&auto=format&fit=crop" },
  { slug: "barrie", name: "Barrie", description: "A scenic lakeside city serving as the perfect gateway to outdoor recreation and cottage country.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop" },
  { slug: "stoufville", name: "Stoufville", description: "One of Canada's fastest-growing, family-centric cities featuring diverse neighborhoods and great recreation.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop" },
  { slug: "ajax", name: "Ajax", description: "A beautiful coastal community offering scenic waterfront trails and quick, easy transit access to Toronto.", image: "https://images.unsplash.com/photo-1600607687126-8a3414349a51?q=80&w=1600&auto=format&fit=crop" },
  { slug: "whitby", name: "Whitby", description: "A scenic lakeside city serving as the perfect gateway to outdoor recreation and cottage country.", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop" }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
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
    <div className="bg-[#F8F7F4] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] lg:h-[60vh] flex flex-col items-center justify-center bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={city.image} alt={city.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-slate-950/50" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/50">/</span>
            <Link href="/neighbourhoods" className="hover:text-white transition-colors">Neighborhoods</Link>
            <span className="text-white/50">/</span>
            <span className="text-white">{city.name}</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight">
            {city.name}
          </h1>
          <p className="mt-6 text-white/90 text-sm md:text-lg font-medium tracking-wide max-w-2xl mx-auto">
            {city.description}
          </p>
        </div>
      </section>

      {/* 2. LISTINGS SECTION */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-gray-200 pb-6 gap-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-800">
              Homes for Sale in <span className="text-amber-600">{city.name}</span> 
              <span className="text-xs font-semibold text-gray-400 block sm:inline sm:ml-3">
                (Showing {totalResults.toLocaleString()} active profiles matched)
              </span>
            </h2>
            <Link href="/neighbourhoods" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-800 hover:text-amber-600 transition-colors">
              <ArrowLeft size={16} /> Back to Neighborhoods
            </Link>
          </div>

          {listings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {listings.map((listing: any) => {
                  const img = listing.images?.[0];
                  const beds = listing.details?.numBedrooms || 0;
                  const baths = listing.details?.numBathrooms || 0;
                  
                  // 🔑 FIXED: Parse the sqft data safely into a plain integer block to ensure numeric compatibility
                  const sqftRawValue = listing.details?.sqft || listing.details?.squareFootage || "";
                  const parsedSqftNum = parseInt(String(sqftRawValue).replace(/[^0-9]/g, ""), 10);
                  const isSqftValid = !isNaN(parsedSqftNum) && parsedSqftNum > 0;

                  const streetAddress = `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''}`.trim();
                  const fullAddressString = `${streetAddress}, ${listing.address?.city || city.name}, ${listing.address?.state || 'ON'}`.trim().replace(/,\s*$/, "");

                  return (
                    <Link href={`/listings/${listing.mlsNumber}`} key={listing.mlsNumber} className="flex flex-col group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100">
                        {img ? <img src={`https://cdn.repliers.io/${img}?w=500`} alt={fullAddressString} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-wider bg-neutral-900">No Image</div>}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-slate-800 shadow-sm">{listing.status === "A" ? "Active" : listing.status}</div>
                      </div>
                      <div className="p-6 text-left">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">{formatPrice(listing.listPrice)}</h3>
                        <p className="text-xs font-semibold text-gray-500 mb-4 truncate" title={fullAddressString}>{fullAddressString}</p>
                        
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-600 border-t border-gray-100 pt-4 mt-auto">
                          <span className="flex items-center gap-1.5"><Bed size={16} className="text-amber-600"/> {beds} Bd</span>
                          <span className="flex items-center gap-1.5"><Bath size={16} className="text-amber-600"/> {baths} Ba</span>
                          
                          {/* 🔑 FIXED: Use the validated number layout to print nicely formatted values */}
                          {isSqftValid && (
                            <span className="flex items-center gap-1.5 ml-auto">
                              <Maximize size={14} className="text-amber-600"/> 
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
                    href={`/neighborhoods/${slug}?page=${activePage - 1}`}
                    className={`w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:bg-neutral-50 text-slate-700 transition-colors ${activePage === 1 ? "pointer-events-none opacity-30" : ""}`}
                  >
                    <ChevronDown size={18} className="rotate-90" />
                  </Link>

                  {visiblePages.map(p => (
                    <Link
                      key={p}
                      href={`/neighborhoods/${slug}?page=${p}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all shadow-sm ${p === activePage ? `${BRAND_CONFIG.theme.primaryBg} text-white scale-105` : "border border-gray-200 bg-white hover:bg-neutral-50 text-slate-700"}`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link 
                    href={`/neighborhoods/${slug}?page=${activePage + 1}`}
                    className={`w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:bg-neutral-50 text-slate-700 transition-colors ${activePage === totalPages ? "pointer-events-none opacity-30" : ""}`}
                  >
                    <ChevronDown size={18} className="-rotate-90" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Listings</h3>
              <p className="text-gray-500">There are currently no active properties available in {city.name}.</p>
            </div>
          )}

        </div>
      </section>

      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";