import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // 1. Grab frontend variables
  const type = searchParams.get("type") || "sale";
  const propertyClass = searchParams.get("class") || ""; 
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "9";
  const city = searchParams.get("city") || "";
  const minBeds = searchParams.get("minBeds") || "";
  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  
  const rawSortBy = searchParams.get("sortBy") || "createdOnDesc";

  // 2. Map Sorting
  let sortBy = rawSortBy;
  if (rawSortBy === "listDate:desc" || rawSortBy === "listDateDesc") sortBy = "createdOnDesc";
  if (rawSortBy === "price:asc" || rawSortBy === "priceAsc") sortBy = "listPriceAsc";
  if (rawSortBy === "price:desc" || rawSortBy === "priceDesc") sortBy = "listPriceDesc";

  // 3. 🔑 FIXED: Do NOT include 'type' in this initial creation block!
  const repliersParams = new URLSearchParams({
    pageNum: page,            
    resultsPerPage: pageSize, 
    sortBy: sortBy,
    status: "A"               
  });

  // 4. 🔑 FIXED: Only append the type parameter if it is strictly "sale" or "lease".
  // If it is "all", this skips it entirely, which tells Repliers to fetch both!
  if (type === "sale" || type === "lease") {
    repliersParams.append("type", type);
  }

  // 5. Append all other filters
  if (propertyClass) repliersParams.append("class", propertyClass);
  if (city) repliersParams.append("city", city);
  if (minBeds) repliersParams.append("minBeds", minBeds);
  if (minPrice) repliersParams.append("minPrice", minPrice);
  if (maxPrice) repliersParams.append("maxPrice", maxPrice);

  // 6. Smart Search Routing
  if (search) {
    const query = search.trim();
    const isMls = /^[a-zA-Z]\d{6,9}$/.test(query);
    
    if (isMls) {
      repliersParams.append("mlsNumber", query.toUpperCase());
      // Drop the type restriction if looking for an exact MLS
      repliersParams.delete("type");
    } else {
      repliersParams.append("search", query);
      repliersParams.append("searchFields", "address.streetNumber,address.streetName,address.city,address.neighborhood");
    }
  }

  try {
    // 7. Fetch directly from the source API
    const response = await fetch(`https://api.repliers.io/listings?${repliersParams.toString()}`, {
      method: "GET",
      headers: {
        "REPLIERS-API-KEY": process.env.REPLIERS_API_KEY as string,
        "Content-Type": "application/json",
      },
      cache: "no-store" 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Repliers API responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (e: any) {
    console.error("Live Listings API Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}