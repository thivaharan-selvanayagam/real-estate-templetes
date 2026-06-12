"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // 🔑 IMPORTED NEXT ROUTER

// Format price helper for the map markers
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ListingsMap({ 
  listings, 
  center, 
  activeListing, 
  setActiveListing, 
  hoveredListing 
}: any) {
  
  const router = useRouter(); // 🔑 INITIALIZED ROUTER

  // Fix for default leaflet icons not showing properly in Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Custom HTML Marker to perfectly match your design
  const createCustomIcon = (price: number, isHovered: boolean, isActive: boolean) => {
    const formattedPrice = formatPrice(price);
    const bgColor = isHovered || isActive ? "bg-gold" : "bg-navy";
    const borderColor = isHovered || isActive ? "border-t-gold" : "border-t-navy";
    const scale = isHovered || isActive ? "scale-110 z-50" : "z-10";

    return L.divIcon({
      className: "bg-transparent border-none", // Remove default leaflet styles
      html: `
        <div class="relative transition-all duration-300 ${scale}">
          <div class="shadow-lg rounded-full px-3 py-1.5 text-[11px] tracking-wide font-bold border border-white/20 text-white whitespace-nowrap ${bgColor}">
            ${formattedPrice}
            <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent ${borderColor}"></div>
          </div>
        </div>
      `,
      iconSize: [60, 30],
      iconAnchor: [30, 30], // Centers the marker point perfectly
    });
  };

  return (
    <MapContainer 
      center={[center.lat, center.lng]} 
      zoom={11} 
      className="w-full h-full"
      zoomControl={false}
    >
      {/* We use CartoDB Voyager tiles for a clean, premium look */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      {listings.map((listing: any) => {
        if (!listing.map?.latitude || !listing.map?.longitude) return null;
        
        const isHovered = hoveredListing === listing.mlsNumber;
        const isActive = activeListing === listing.mlsNumber;

        return (
          <Marker
            key={listing.mlsNumber}
            position={[Number(listing.map.latitude), Number(listing.map.longitude)]}
            icon={createCustomIcon(listing.listPrice, isHovered, isActive)}
            eventHandlers={{
              click: () => {
                setActiveListing(listing.mlsNumber);
                // 🔑 ADDED: Push user directly to the listing page on click!
                router.push(`/listings/${listing.mlsNumber}`); 
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}