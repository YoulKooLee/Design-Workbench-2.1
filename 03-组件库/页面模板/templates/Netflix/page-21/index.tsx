import React from 'react';
import './style.css';

/**
 * @name Netflix Fullscreen Navigation Menu Overlay (Page 21)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#0E1012] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. Synthetic Backdrop Blur Engine (Mesh Gradients) */}
      <div className="absolute inset-0 z-0 bg-[#0E1012] overflow-hidden">
          {/* Top-Left Red Netflix 'N' Bleed */}
          <div className="absolute top-[4%] left-[4%] w-[120px] h-[120px] bg-[#D4101A] rounded-full filter blur-[70px] opacity-[0.25]"></div>
          
          {/* Main Cinematic Teal/Blue Dominance (Bird Box Water Scene) */}
          <div className="absolute top-[5%] right-[-10%] w-[380px] h-[380px] bg-[#1A4557] rounded-full filter blur-[100px] opacity-[0.7]"></div>
          <div className="absolute top-[25%] left-[5%] w-[280px] h-[280px] bg-[#143B4A] rounded-full filter blur-[90px] opacity-[0.6]"></div>
          
          {/* Mid/Lower Cinematic Skin/Earth Blend (Sandra/Child face tones) */}
          <div className="absolute top-[45%] left-[10%] w-[280px] h-[250px] bg-[#3B2A1C] rounded-[100px] filter blur-[90px] opacity-[0.65]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-[#2E2018] rounded-full filter blur-[80px] opacity-[0.5]"></div>

          {/* Core shadow gradient mapping the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#0A0806] via-[#0D0B0A]/80 to-transparent z-10"></div>
          
          {/* Physical "Glass" Layer locking everything tightly */}
          <div className="absolute inset-0 backdrop-blur-[55px] bg-black/10 z-10"></div>
          
          {/* Subtle noise to prevent banding in intense gradients */}
          <div className="absolute inset-0 z-20 mix-blend-overlay opacity-[0.15] pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <filter id="noise21">
                      <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" stitchTiles="stitch"/>
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise21)" />
              </svg>
          </div>
      </div>

      {/* 2. iOS Status Bar Container (Hovering over the glass) */}
      <div className="absolute top-0 w-full z-40 pt-3 pb-8 pointer-events-none">
          <div className="flex justify-between items-center px-6 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:01</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              {/* Cellular */}
              <div className="flex gap-[3px] items-end h-[12px]">
                 <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
              </div>
              {/* Battery */}
              <div className="relative transform scale-90 -mr-1">
                <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                  <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                  <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                </svg>
                <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
              </div>
            </div>
          </div>
      </div>

      {/* 3. Navigation List (Centered Wheel) */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full w-full pb-[40px]">
          <div className="flex flex-col items-center space-y-[46px]">
              
              {/* Unselected Node */}
              <span className="text-[#98A3A8] text-[20px] font-[500] tracking-wide cursor-pointer hover:text-white transition-colors duration-300">
                  Home
              </span>
              
              {/* Active Selection Node */}
              <span className="text-white text-[28px] font-[800] tracking-wide cursor-pointer drop-shadow-md">
                  Series
              </span>
              
              {/* Unselected Node */}
              <span className="text-[#98A3A8] text-[20px] font-[500] tracking-wide cursor-pointer hover:text-white transition-colors duration-300">
                  Films
              </span>
              
              {/* Unselected Node */}
              <span className="text-[#98A3A8] text-[20px] font-[500] tracking-wide cursor-pointer hover:text-white transition-colors duration-300">
                  My List
              </span>

          </div>
      </div>

      {/* 4. Overlay Close Action */}
      <div className="absolute bottom-[108px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-200 z-40 transform hover:rotate-90">
          <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] stroke-black" fill="none" strokeWidth={1.2}>
               <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90"></div>

    </div>
  );
}
