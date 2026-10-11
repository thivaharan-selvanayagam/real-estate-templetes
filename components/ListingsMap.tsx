"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";

function MapRecenterController({ activeCoordinates }: { activeCoordinates: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (map && activeCoordinates && activeCoordinates[0] && activeCoordinates[1]) {
      map.panTo(activeCoordinates, { animate: true, duration: 0.4 });
    }
  }, [activeCoordinates, map]);
  return null;
}

// 🔑 Compact price formatter: Converts 5,500,000 -> 5.5M, 55,000,000 -> 55M, 850,000 -> 850K
const formatCompactPrice = (price: number) => {
  if (!price || isNaN(price)) return "";
  if (price >= 1000000) {
    const millions = price / 1000000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (price >= 1000) {
    const thousands = price / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(0)}K`;
  }
  return `${price}`;
};

export default function ListingsMap({ 
  listings = [], 
  center, 
  activeListing, 
  setActiveListing, 
  hoveredListing 
}: any) {
  
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const activeHoveredCoords = useMemo<[number, number] | null>(() => {
    const activeTargetId = hoveredListing || activeListing;
    if (!activeTargetId) return null;
    const match = listings.find((l: any) => l.mlsNumber === activeTargetId);
    const lat = Number(match?.map?.latitude);
    const lng = Number(match?.map?.longitude);
    if (lat && lng) return [lat, lng];
    return null;
  }, [hoveredListing, activeListing, listings]);

  const createCustomIcon = (price: number, isHovered: boolean, isActive: boolean) => {
    const formattedPrice = formatCompactPrice(price);
    
    const bgColor = isHovered || isActive ? "#e9b3b0" : "#2b4b46";
    const textColor = isHovered || isActive ? "#2b4b46" : "#FFFFFF";
    const borderColor = isHovered || isActive ? "#e9b3b0" : "#2b4b46";
    const scale = isHovered || isActive ? "scale(1.1); z-index: 9999;" : "scale(1);";

    return L.divIcon({
      className: "bg-transparent border-none",
      html: `
        <div style="transform: ${scale} transition: all 0.2s ease; position: relative;">
          <div style="
            background-color: ${bgColor}; 
            color: ${textColor}; 
            padding: 5px 10px; 
            border-radius: 50px; 
            font-size: 11px; 
            font-weight: 800; 
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); 
            border: 1.5px solid white; 
            white-space: nowrap;
          ">
            ${formattedPrice}
            <div style="
              position: absolute; 
              bottom: -5px; 
              left: 50%; 
              transform: translateX(-50%); 
              width: 0; 
              height: 0; 
              border-left: 5px solid transparent; 
              border-right: 5px solid transparent; 
              border-top: 5px solid ${borderColor};
            "></div>
          </div>
        </div>
      `,
      iconSize: [50, 26],
      iconAnchor: [25, 26], 
    });
  };

  const mapCenterPoint: [number, number] = center?.lat && center?.lng 
    ? [center.lat, center.lng] 
    : [43.6532, -79.3832];

  if (!mounted) {
    return <div className="w-full h-full bg-neutral-100 animate-pulse" />;
  }

  return (
    <div className="w-full h-full relative" id="leaflet-map-root-frame">
      <MapContainer 
        center={mapCenterPoint} 
        zoom={11} 
        className="w-full h-full"
        zoomControl={true}
        ref={mapRef}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapRecenterController activeCoordinates={activeHoveredCoords} />
        
        {listings.map((listing: any) => {
          if (!listing?.map?.latitude || !listing?.map?.longitude) return null;
          
          const isHovered = hoveredListing === listing.mlsNumber;
          const isActive = activeListing === listing.mlsNumber;

          return (
            <Marker
              key={listing.mlsNumber}
              position={[Number(listing.map.latitude), Number(listing.map.longitude)]}
              icon={createCustomIcon(listing.listPrice, isHovered, isActive)}
              eventHandlers={{
                click: () => {
                  if (setActiveListing) {
                    setActiveListing(listing.mlsNumber);
                  }
                  router.push(`/listings/${listing.mlsNumber}`); 
                },
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}