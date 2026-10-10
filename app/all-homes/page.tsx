import { getListings } from "@/lib/repliers";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import ListingsGrid from "@/components/ListingsGrid";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `GTA Homes & Properties | ${BRAND_CONFIG.meta.siteName}` 
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
  // Default directly to Residential instead of "all"
  const propClass = typeof resolvedParams.class === "string" && resolvedParams.class !== "all" 
    ? resolvedParams.class 
    : "Residential"; 

  const trxType = typeof resolvedParams.type === "string" ? resolvedParams.type : "sale"; 
  const minPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : undefined;
  const beds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : undefined;
  const baths = typeof resolvedParams.baths === "string" ? resolvedParams.baths : undefined;
  
  const urlPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const activePage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  try { 
    const baseQueryPayload: any = {
      type: trxType === "buy" ? "sale" : trxType,
      status: trxType === "sold" ? "A" : undefined, // Handles sold status queries when selected
      pageSize: 24,
      pageNum: activePage,
      search: searchString,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      beds: beds || undefined,
      baths: baths || undefined,
      class: propClass
    };

    const data = await getListings(baseQueryPayload);
    combinedListings = data?.listings || [];
    
    const genericData = data as any;
    totalResultsCount = Number(genericData?.numResults || genericData?.count || genericData?.metadata?.numResults || combinedListings.length);

  } catch (e) {
    console.error("Repliers database aggregation failure:", e);
  }

  if (totalResultsCount <= 0 && combinedListings.length > 0) {
    totalResultsCount = 120; 
  }
  
  return (
    <>
      {/* MAIN LISTINGS CONTAINER (Top padding clears fixed Navbar) */}
      <section className="bg-[#FDFBF7] min-h-[90vh] relative z-20 w-full pt-28 lg:pt-36 pb-8">
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
      </section>

      <OurRegions />
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";