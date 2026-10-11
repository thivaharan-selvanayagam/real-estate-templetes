"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

interface ListingsMapProps {
  listings: any[];
  center: { lat: number; lng: number };
  activeListing?: string | null;
  setActiveListing?: (id: string | null) => void;
  hoveredListing?: string | null;
  setHoveredListing?: (id: string | null) => void;
}

// 🔑 Formats map pin price badges (e.g., $1.15M, $850K, $2.5K/mo)
const formatMapPrice = (price?: number | string, isLease?: boolean) => {
  if (!price) return "$N/A";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "$N/A";

  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `$${Math.round(num / 1000)}K${isLease ? "/mo" : ""}`;
  }
  return `$${num.toLocaleString()}`;
};

// 🔑 Custom Leaflet HTML Pin Icon displaying the exact price amount
const createPricePinIcon = (priceText: string, isHovered: boolean) => {
  const badgeStyle = isHovered
    ? "bg-[#2b4b46] text-white scale-110 ring-2 ring-emerald-400 z-50 shadow-2xl"
    : "bg-slate-900 text-white border border-stone-600 shadow-md hover:scale-105";

  return L.divIcon({
    className: "custom-price-pin",
    html: `
      <div class="px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap flex items-center justify-center ${badgeStyle}">
        ${priceText}
      </div>
    `,
    iconSize: [64, 26],
    iconAnchor: [32, 13],
    popupAnchor: [0, -14],
  });
};

// 🔑 MAP CONTROLLER: Smooth-pans to exact location & opens popup on hover
function MapController({
  center,
  hoveredListing,
  listings,
  markerRefs,
}: {
  center: { lat: number; lng: number };
  hoveredListing?: string | null;
  listings: any[];
  markerRefs: React.MutableRefObject<{ [key: string]: L.Marker | null }>;
}) {
  const map = useMap();

  // Initial load or search center pan
  useEffect(() => {
    if (center && typeof center.lat === "number" && typeof center.lng === "number" && !hoveredListing) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);

  // Smooth-pan to hovered listing & open popup
  useEffect(() => {
    if (!hoveredListing) return;

    const target = listings.find((l) => l.mlsNumber === hoveredListing);
    if (target?.map?.latitude && target?.map?.longitude) {
      const lat = Number(target.map.latitude);
      const lng = Number(target.map.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        map.panTo([lat, lng], { animate: true, duration: 0.4 });

        const marker = markerRefs.current[hoveredListing];
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [hoveredListing, listings, map, markerRefs]);

  return null;
}

const formatFullPrice = (price: number) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ListingsMap({
  listings = [],
  center,
  activeListing,
  setActiveListing,
  hoveredListing,
  setHoveredListing,
}: ListingsMapProps) {
  const [mounted, setMounted] = useState(false);
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
        Loading Map Layer...
      </div>
    );
  }

  const validCenter =
    center && typeof center.lat === "number" && typeof center.lng === "number"
      ? center
      : { lat: 43.6532, lng: -79.3832 };

  const validListings = listings.filter(
    (l) => l?.map?.latitude && l?.map?.longitude && !isNaN(Number(l.map.latitude)) && !isNaN(Number(l.map.longitude))
  );

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[validCenter.lat, validCenter.lng]}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          center={validCenter}
          hoveredListing={hoveredListing}
          listings={validListings}
          markerRefs={markerRefs}
        />

        {validListings.map((listing) => {
          const lat = Number(listing.map.latitude);
          const lng = Number(listing.map.longitude);
          const isSelected = activeListing === listing.mlsNumber || hoveredListing === listing.mlsNumber;
          const img = listing.images?.[0];
          const isLease = listing.type === "lease" || listing.status === "Lsd";
          const displayPrice = listing.listPrice || listing.soldPrice || 0;

          return (
            <Marker
              key={listing.mlsNumber}
              ref={(ref) => {
                if (ref) markerRefs.current[listing.mlsNumber] = ref;
              }}
              position={[lat, lng]}
              icon={createPricePinIcon(formatMapPrice(displayPrice, isLease), isSelected)}
              zIndexOffset={isSelected ? 1000 : 0}
              eventHandlers={{
                click: () => {
                  if (setActiveListing) setActiveListing(listing.mlsNumber);
                },
                mouseover: () => {
                  if (setHoveredListing) setHoveredListing(listing.mlsNumber);
                },
                mouseout: () => {
                  if (setHoveredListing) setHoveredListing(null);
                },
              }}
            >
              <Popup className="rounded-2xl overflow-hidden">
                <div className="p-1 max-w-[210px] text-left">
                  {img && (
                    <img
                      src={img.startsWith("http") ? img : `https://cdn.repliers.io/${img}?w=300`}
                      alt={listing.address?.streetName || "Property"}
                      className="w-full h-24 object-cover rounded-xl mb-2"
                    />
                  )}
                  <p className="font-black text-slate-900 text-sm tracking-tight">
                    {formatFullPrice(displayPrice)}
                  </p>
                  <p className="text-xs text-stone-500 truncate mt-0.5 font-medium">
                    {listing.address?.streetNumber} {listing.address?.streetName}, {listing.address?.city}
                  </p>
                  <Link
                    href={`/listings/${listing.mlsNumber}`}
                    className="inline-block mt-2 text-[10px] font-extrabold text-[#2b4b46] hover:underline uppercase tracking-wider"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}