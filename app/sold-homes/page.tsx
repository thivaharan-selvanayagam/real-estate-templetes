import { cookies } from "next/headers";
import Link from "next/link";
import SoldPropertyCard from "@/components/SoldPropertyCard";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

export const metadata = {
  title: `Recently Sold Properties | ${BRAND_CONFIG.meta.siteName}`,
  description: `Explore recently sold homes and closed transactions across the Greater Toronto Area.`,
};

async function getSoldListings(page: number) {
  const apiKey = process.env.REPLIERS_API_KEY;
  const itemsPerPage = 24;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("❌ Repliers API key is missing.");
    return { listings: [], numPages: 1 };
  }

  try {
    const response = await fetch(
      `https://api.repliers.io/listings?status=U&lastStatus=Sld&type=sale&resultsPerPage=${itemsPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          "REPLIERS-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.listings && data.listings.length > 0) {
        return {
          listings: data.listings,
          numPages: Number(data.numPages) || Math.ceil(Number(data.numResults || 0) / itemsPerPage) || 1,
        };
      }
    }

    // Fallback query
    const fallbackResponse = await fetch(
      `https://api.repliers.io/listings?status=U&resultsPerPage=${itemsPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          "REPLIERS-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      return {
        listings: fallbackData.listings || [],
        numPages: Number(fallbackData.numPages) || Math.ceil(Number(fallbackData.numResults || 0) / itemsPerPage) || 1,
      };
    }

    return { listings: [], numPages: 1 };
  } catch (error) {
    console.error("❌ Error fetching sold properties:", error);
    return { listings: [], numPages: 1 };
  }
}

export default async function SoldHomesPage({ searchParams }: PageProps) {
  // 🔑 SAFE RESOLUTION: Prevents undefined searchParams error
  const resolvedParams = searchParams ? await searchParams : {};
  const currentPage = Math.max(1, parseInt(resolvedParams?.page || "1", 10));

  // 🔑 STRICT SESSION CHECK: Ensures the session cookie exists AND contains a valid non-empty value
  const cookieStore = await cookies();
  const sessionToken = 
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("session")?.value ||
    cookieStore.get("auth-token")?.value;

  const isLoggedIn = Boolean(
    sessionToken && 
    sessionToken !== "" && 
    sessionToken !== "false" && 
    sessionToken !== "undefined"
  );

  const { listings: soldListings, numPages } = await getSoldListings(currentPage);
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-slate-900 pt-28 lg:pt-36 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* PAGE HEADER */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-block bg-[#2b4b46] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-sm">
            Proven Market Track Record
          </div>
          <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold ${cleanPrimaryText} tracking-tight uppercase`}>
            Recently Sold Properties
          </h1>
          <p className="text-stone-600 text-sm md:text-base mt-3 leading-relaxed font-normal">
            {isLoggedIn
              ? "Showing verified historical sold prices and market data."
              : "Due to local real estate board policies, sign in with Google to reveal full sold values and property details."}
          </p>
        </div>

        {/* PROPERTY CARD GRID WITH GATED ACCESS */}
        {soldListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {soldListings.map((listing: any) => (
              <SoldPropertyCard 
                key={listing.mlsNumber || listing.id} 
                listing={listing} 
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-stone-200 rounded-3xl bg-white my-8 max-w-xl mx-auto p-8 shadow-sm">
            <Layers className="mx-auto w-10 h-10 text-stone-300 mb-3" strokeWidth={1.5} />
            <p className="text-base font-semibold text-slate-800">No Sold Properties Found</p>
            <p className="text-xs text-stone-500 mt-1">There are currently no sold listing records returned from the API feed.</p>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {numPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">
            {currentPage > 1 ? (
              <Link
                href={`/sold-homes?page=${currentPage - 1}`}
                className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-full border border-stone-100 bg-stone-50 flex items-center justify-center text-stone-300 opacity-50 cursor-not-allowed">
                <ChevronLeft size={18} />
              </div>
            )}

            <span className="text-xs font-bold tracking-wider text-stone-600 px-4 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
              Page {currentPage} of {numPages}
            </span>

            {currentPage < numPages ? (
              <Link
                href={`/sold-homes?page=${currentPage + 1}`}
                className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-full border border-stone-100 bg-stone-50 flex items-center justify-center text-stone-300 opacity-50 cursor-not-allowed">
                <ChevronRight size={18} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-20">
        <OurRegions />
      </div>
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";