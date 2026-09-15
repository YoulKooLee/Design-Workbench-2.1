import React from 'react';
import './style.css';

const genresSegment = [
  "Available for Download",
  "Action & Adventure",
  "American",
  "Anime",
  "Asian",
  "British",
  "Comedies",
  "Crime",
  "Documentaries",
  "Dramas",
  "Horror"
];

/**
 * @name Netflix "All Genres" Dropdown State (Page 26)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. Underlying Volumetric Blur Array (Mesh Gradient Engine) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]">
          {/* Virtual Film Poster Blooms */}
          {/* Top Left Warm Red/Brown */}
          <div className="absolute top-[10%] left-[-15%] w-[65%] h-[40%] bg-[#3D201A] rounded-full blur-[85px] opacity-[0.85]"></div>
          
          {/* Mid Right Deep Navy/Protocol Blue */}
          <div className="absolute top-[25%] right-[-20%] w-[70%] h-[50%] bg-[#1A2E48] rounded-full blur-[90px] opacity-[0.9]"></div>
          
          {/* Center Light/Grey hotspot */}
          <div className="absolute top-[50%] left-[10%] w-[55%] h-[35%] bg-[#25282F] rounded-full blur-[75px] opacity-[0.85]"></div>
          
          {/* Bottom Left Depths (Murky Greenish/Grey) */}
          <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[40%] bg-[#1A1E1A] rounded-full blur-[80px] opacity-[0.75]"></div>
          
          {/* Primary Lens Blur Processor */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[64px] saturate-[140%]"></div>
          
          {/* Sub-Multiply Contrast Hardener */}
          <div className="absolute inset-0 bg-[#000000]/30 mix-blend-multiply"></div>
      </div>

      {/* 2. Top Edge Overlay & Hardware Integrity */}
      <div className="absolute top-0 w-full z-40 pointer-events-none">
          <div className="flex justify-between items-center px-6 pt-3 pb-2 relative">
              {/* iOS Status Time Clock */}
              <span className="text-[14px] font-bold tracking-tight opacity-95 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">3:01</span>
              
              {/* iOS Hardware System Icons */}
              <div className="flex justify-end items-center gap-1.5 opacity-95 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                  {/* RF Sync Bars */}
                  <div className="flex gap-[3px] items-end h-[12px]">
                     <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
                  </div>
                  {/* Energy Storage Matrix */}
                  <div className="relative transform scale-90 -mr-1">
                    <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                      <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                      <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                    </svg>
                    <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
                  </div>
              </div>
          </div>
          
          {/* Edge Matrix Deflector (Top Scroll Fade) */}
          <div className="w-full h-[90px] bg-gradient-to-b from-black/90 via-black/45 to-transparent"></div>
      </div>

      {/* 3. Central Scrolling Architecture (The Menu Data Array) */}
      {/* Scrollbar hidden natively via style overrides in global stylesheet */}
      <div className="flex-1 w-full z-20 overflow-y-scroll pb-[220px] pt-[85px] relative custom-hide-scrollbar">
          <div className="flex flex-col items-center w-full gap-[38px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-['Helvetica_Neue',sans-serif] mt-[30px]">
              
              {/* Active Route Identifier */}
              <span className="text-white font-[700] text-[23.5px] tracking-[0.2px] cursor-pointer mix-blend-screen scale-[1.02] active:scale-95 transition-transform">
                  All Genres
              </span>
              
              {/* Sub-Route Navigation Segment */}
              {genresSegment.map((genre, idx) => (
                  <span 
                      key={idx} 
                      className="text-[#9E9E9E] font-[500] text-[20px] tracking-[0.2px] cursor-pointer transition-all duration-300 hover:text-white hover:scale-105 active:scale-95 active:text-white mix-blend-screen"
                  >
                      {genre}
                  </span>
              ))}
          </div>
      </div>

      {/* Edge Matrix Deflector (Bottom Scroll Fade Engine) */}
      {/* Placed at z-30 to cast deep shadows over the lower rolling list elements like 'Horror' */}
      <div className="absolute bottom-0 w-full h-[240px] bg-gradient-to-t from-black via-black/85 to-transparent z-30 pointer-events-none"></div>

      {/* 4. Overlap Floating Interaction (Close Action / X) */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-50">
          <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.7)] transform active:scale-90 transition-transform">
              <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[#111111] stroke-[1.5px] fill-none ml-[0.5px]">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </div>
      </div>

      {/* 5. Safe Area / Hardware Home Constraints */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 opacity-95 pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]"></div>

    </div>
  );
}
