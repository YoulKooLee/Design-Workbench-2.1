import React from 'react';
import './style.css';

const genreSegment = [
  "K-dramas",
  "Kids",
  "Malaysian",
  "Reality & Talk Shows",
  "Romance",
  "Sci-Fi & Fantasy",
  "Science & Nature",
  "Singaporean",
  "Teen",
  "Thriller",
  "Audio Description"
];

/**
 * @name Netflix Genre Dropdown (Scrolled State) - Page 25
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. Next-Gen Realtime Blur Engine (Mesh Gradients) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#111111]">
          {/* Chromatic Blooming Orbs (Simulating high dynamic range background assets) */}
          <div className="absolute top-[2%] left-[-20%] w-[70%] h-[45%] bg-[#1A2840] rounded-full blur-[85px] opacity-70"></div>
          <div className="absolute top-[28%] right-[-10%] w-[55%] h-[55%] bg-[#401815] rounded-full blur-[90px] opacity-[0.65]"></div>
          <div className="absolute top-[60%] left-[-15%] w-[50%] h-[45%] bg-[#1C3225] rounded-full blur-[80px] opacity-60"></div>
          <div className="absolute bottom-[-15%] right-[-15%] w-[65%] h-[40%] bg-[#212E3B] rounded-full blur-[85px] opacity-70"></div>
          
          {/* Photorealistic Diffusion Glass Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[65px] saturate-[140%]"></div>
          <div className="absolute inset-0 bg-[#0A0A0A]/40 mix-blend-multiply"></div>
      </div>

      {/* 2. Top Edge Overlay & Hardware Sensors */}
      <div className="absolute top-0 w-full z-40 pointer-events-none">
          <div className="flex justify-between items-center px-6 pt-3 pb-2 relative">
              <span className="text-[14px] font-bold tracking-tight opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">3:01</span>
              <div className="flex justify-end items-center gap-1.5 opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {/* Cellular Radio Sync */}
                  <div className="flex gap-[3px] items-end h-[12px]">
                     <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
                  </div>
                  {/* Energy Meter Outline */}
                  <div className="relative transform scale-90 -mr-1">
                    <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                      <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                      <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                    </svg>
                    <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
                  </div>
              </div>
          </div>
          
          {/* Scroll Void Fade Matrix (Top) */}
          <div className="w-full h-[80px] bg-gradient-to-b from-black/85 via-black/40 to-transparent"></div>
      </div>

      {/* 4. Primary Kinematic Scroll System (The Categories) */}
      {/* Hide scrollbar using universal hide technique in standard CSS frameworks */}
      <div className="flex-1 w-full z-20 overflow-y-scroll pb-[220px] pt-[55px] relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex flex-col items-center w-full gap-[37px] drop-shadow-md font-['Helvetica_Neue',sans-serif]">
              {genreSegment.map((genre, idx) => (
                  <span 
                      key={idx} 
                      className="text-[#9E9E9E] font-[500] text-[20px] tracking-[0.2px] cursor-pointer transition-all duration-200 hover:text-white hover:scale-105 active:scale-95 active:text-[#E50914] mix-blend-screen"
                  >
                      {genre}
                  </span>
              ))}
          </div>
      </div>

      {/* Edge Void Fade Matrix (Bottom) - Overlays behind button */}
      <div className="absolute bottom-0 w-full h-[220px] bg-gradient-to-t from-black/95 via-black/75 to-transparent z-30 pointer-events-none"></div>

      {/* 5. Terminal Interaction Node (Master Close Button) */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-50">
          <div className="w-[60px] h-[60px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)] transform active:scale-90 transition-transform">
              <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[#111111] stroke-[1.5px] fill-none ml-[0.5px]">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </div>
      </div>

      {/* 6. Base Layer Hardware Constraint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 opacity-95 pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
