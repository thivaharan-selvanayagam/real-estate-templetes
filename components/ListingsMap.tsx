"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
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

  useEffect(() => {
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
    const formattedPrice = formatPrice(price);
    
    const bgColor = isHovered || isActive ? "#D4AF37" : "#1E293B";
    const textColor = isHovered || isActive ? "#1E293B" : "#FFFFFF";
    const borderColor = isHovered || isActive ? "#D4AF37" : "#1E293B";
    const scale = isHovered || isActive ? "scale(1.1) z-index: 9999;" : "scale(1);";

    return L.divIcon({
      className: "bg-transparent border-none",
      html: `
        <div style="transform: ${scale} transition: all 0.2s ease; position: relative;">
          <div style="
            background-color: ${bgColor}; 
            color: ${textColor}; 
            padding: 6px 12px; 
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
              bottom: -4px; 
              left: 50%; 
              transform: translateX(-50%); 
              width: 0; 
              height: 0; 
              border-l: 5px solid transparent; 
              border-r: 5px solid transparent; 
              border-t: 5px solid ${borderColor};
            "></div>
          </div>
        </div>
      `,
      iconSize: [60, 30],
      iconAnchor: [30, 30], 
    });
  };

  const mapCenterPoint: [number, number] = center?.lat && center?.lng 
    ? [center.lat, center.lng] 
    : [43.6532, -79.3832];

  if (!center || typeof window === "undefined") {
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
        // 🔑 FIXED: Smoothly distributes marker placement across multiple animation frames 
        // to completely eliminate appendChild race-conditions with the DOM
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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