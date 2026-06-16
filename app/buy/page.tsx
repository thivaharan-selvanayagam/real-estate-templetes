import { getListings } from "@/lib/repliers";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import ListingsGrid from "@/components/ListingsGrid";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { title: `Buy a Home | ${BRAND_CONFIG.meta.siteName}` };

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let combinedListings: any[] = [];
  let totalResultsCount = 0;
  
  const resolvedParams = await searchParams;

  // 1. 🔑 FIXED: Read all search parameters on the /buy page directly from the URL query matrix
  const searchString = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const propClass = typeof resolvedParams.class === "string" ? resolvedParams.class : "all"; 
  const minPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : "";
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : "";
  const beds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : "Any";
  const baths = typeof resolvedParams.baths === "string" ? resolvedParams.baths : "Any";
  const cityString = typeof resolvedParams.initialCity === "string" ? resolvedParams.initialCity : "";
  
  const urlPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const activePage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  try { 
    // 2. Build the query parameters payload for Repliers (forcing type: "sale" for the buy page)
    const baseQueryPayload: any = {
      type: "sale", // Hardcoded "sale" for this specific /buy path route context
      pageSize: 24,
      pageNum: activePage,
      search: searchString || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      beds: beds === "Any" ? undefined : beds,
      baths: baths === "Any" ? undefined : baths,
      city: cityString || undefined
    };

    if (propClass === "all") {
      const [residentialData, commercialData] = await Promise.all([
        getListings({ ...baseQueryPayload, class: "Residential" }).catch(() => ({ listings: [], numResults: 0 })),
        getListings({ ...baseQueryPayload, class: "Commercial", pageSize: 12 }).catch(() => ({ listings: [], numResults: 0 }))
      ]);
      
      combinedListings = [...(residentialData?.listings || []), ...(commercialData?.listings || [])];
      
      const resData = residentialData as any;
      const commData = commercialData as any;
      const resCount = Number(resData?.numResults || resData?.count || resData?.metadata?.numResults || 0);
      const commCount = Number(commData?.numResults || commData?.count || commData?.metadata?.numResults || 0);
      
      totalResultsCount = resCount + commCount;
    } else {
      const data = await getListings({ ...baseQueryPayload, class: propClass });
      combinedListings = data?.listings || [];
      
      const genericData = data as any;
      totalResultsCount = Number(genericData?.numResults || genericData?.count || genericData?.metadata?.numResults || combinedListings.length);
    }

  } catch (e) {
    console.error("Buy page aggregation database engine error:", e);
  }

  if (totalResultsCount <= 0 && combinedListings.length > 0) {
    totalResultsCount = combinedListings.length; 
  }
  
  return (
    <>
      <section className={`relative pt-36 pb-20 lg:pt-40 lg:pb-24 ${BRAND_CONFIG.theme.primaryBg} overflow-hidden flex flex-col items-center justify-center`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center relative z-10 w-full">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Buy a Home
          </h1>
          <p className="text-white/70 mt-2 max-w-lg mx-auto text-xs md:text-sm font-medium">
            Explore premium houses and commercial listings currently available for sale
          </p>
        </div>
      </section>

      <section className="bg-white min-h-[90vh] relative z-20 w-full">
        {/* 3. 🔑 FIXED: All properties mapped perfectly to satisfy ListingsGridProps interface types */}
        <ListingsGrid 
          type="sale" 
          propertyClass={propClass}
          initialListings={combinedListings} 
          initialTotal={totalResultsCount} 
          initialSearch={searchString || ""} 
          currentPage={activePage}
          currentMinPrice={minPrice}
          currentMaxPrice={maxPrice}
          currentBeds={beds}
          currentBaths={baths}
          initialCity={cityString}
        />
      </section>

      <OurRegions />
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";