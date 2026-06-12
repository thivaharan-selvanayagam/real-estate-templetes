"use client";
import { useState, useEffect, useRef } from "react";

export default function InteractiveGlobe() {
  const [rotation, setRotation] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const currentRotation = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // AUTOMATIC SLOW ROTATION ENGINE
  useEffect(() => {
    const updateAutoRotation = () => {
      if (!isDragging.current) {
        // Continuous, smooth automatic panning across the X-axis
        setRotation((prev) => (prev - 0.3) % 4000); 
      }
      animationFrameRef.current = requestAnimationFrame(updateAutoRotation);
    };

    animationFrameRef.current = requestAnimationFrame(updateAutoRotation);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Unlocks custom mouse dragging by disabling browser ghost-image selection
    isDragging.current = true;
    startX.current = e.clientX;
    currentRotation.current = rotation;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    // Multiplier handles the manual hand-spinning tracking sensitivity
    setRotation(currentRotation.current + deltaX * 1.2); 
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center mx-auto select-none">
      
      {/* Outer 3D Spherical Window Container Frame */}
      <div 
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="relative w-full h-full rounded-full overflow-hidden shadow-[0_30px_70px_-15px_rgba(10,15,46,0.5)] border border-white/10 bg-[#040814] cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:shadow-[0_45px_80px_-10px_rgba(10,15,46,0.6)] shrink-0 z-10"
      >
        {/* 🔑 FIXED: Swapped out the hidden dot layer for a high-contrast, beautiful golden-ambient line vector world map */}
        <div 
          className="absolute inset-0 w-full h-full opacity-90 transition-transform duration-700 bg-center"
          style={{ 
            backgroundImage: `url("https://i.postimg.cc/0N3xrRPM/worldmap.jpg")`, 
            backgroundSize: "auto 100%",
            backgroundPositionX: `${rotation}px`,
            backgroundRepeat: "repeat-x"
          }}
        />

        {/* 🔑 FIXED: Adjusted the overlay shading mask to wrap the map into a 3D ball without turning the continents black */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-multiply z-20" 
          style={{ 
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,1) 0%, rgba(200,210,230,0.6) 45%, rgba(4,8,20,0.92) 90%, rgba(2,4,10,1) 100%)' 
          }} 
        />

        {/* 🔑 FIXED: Premium inner atmosphere lighting layer to give the borders of the world map a curved, spherical depth wrap */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen z-25" 
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(212,175,55,0.15) 85%, rgba(212,175,55,0.4) 100%)' 
          }} 
        />

        {/* Glossy High-End Luxury Lighting Reflection Accent */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none z-30" 
          style={{ 
            background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.22) 0%, transparent 45%)' 
          }} 
        />
      </div>

      {/* Luxury Gold/Blue Ambient Shadow Backing Glow */}
      <div className="absolute inset-6 bg-gradient-to-tr from-amber-500/5 to-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />
    </div>
  );
}