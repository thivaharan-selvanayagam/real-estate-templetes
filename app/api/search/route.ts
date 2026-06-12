import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  // Return empty immediately if the query is too short
  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const apiKey = process.env.REPLIERS_API_KEY;
    if (!apiKey) {
      console.error("Missing REPLIERS_API_KEY in environment variables.");
      return NextResponse.json({ results: [] }, { status: 500 });
    }

    // Smart Detection: Check if the user is searching for an MLS number (e.g., W9847214)
    const isMls = /^[a-zA-Z]\d{6,7}$/.test(query);
    
    // Build the dynamic Repliers API endpoint (Active listings only, max 6 results for the dropdown)
    let endpoint = `https://api.repliers.io/listings?resultsPerPage=6&status=A`;
    
    if (isMls) {
      endpoint += `&mlsNumber=${query}`;
    } else {
      // 🔑 FIXED: Use 'search' and limit 'searchFields' to address components.
      // This forces Repliers to strictly autocomplete based on street names and numbers
      // instead of returning random properties or searching through descriptions.
      endpoint += `&search=${encodeURIComponent(query)}&searchFields=address.streetNumber,address.streetName,address.city,address.neighborhood`;
    }

    // Fetch live data from Repliers
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "REPLIERS-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      // Do not cache these highly dynamic keystroke searches
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error(`Repliers API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Map the raw live API data into the exact format our frontend Dropdown expects
    const results = data.listings?.map((listing: any) => {
      const streetNumber = listing.address?.streetNumber || "";
      const streetName = listing.address?.streetName || "";
      const streetSuffix = listing.address?.streetSuffix || "";
      const city = listing.address?.city || "";
      
      const fullAddress = `${streetNumber} ${streetName} ${streetSuffix}`.trim();
      
      return {
        type: "mls",
        label: `${fullAddress}, ${city}`,
        category: "Live Listings",
        queryParam: listing.mlsNumber // Clicking passes the real MLS number to the URL
      };
    }) || [];

    // Inject a dynamic "Search all locations" shortcut if they aren't typing an MLS number
    if (!isMls && query.length > 2) {
      results.unshift({
        type: "location",
        label: `View all properties in "${query}"`,
        category: "Locations",
        queryParam: query
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Live Search API Error:", error);
    // Return an empty array on error so the frontend UI doesn't crash
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}