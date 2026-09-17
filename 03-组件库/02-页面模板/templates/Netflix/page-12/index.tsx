import React from 'react';
import { Home, Search, Download, Menu, X } from 'lucide-react';
import './style.css';

/**
 * Procedural Poster component mimicking the visual weight of the original images
 */
const Poster = ({ title, bgGrad, topTitle, textShadow = true, fontClass="text-[14px]", alignment="justify-end" }) => (
    <div className="w-full aspect-[2/3] relative bg-[#1A1A1A] overflow-hidden break-inside-avoid block transform transition-transform hover:scale-[1.02] cursor-pointer">
        {/* Synthetic background vector / gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGrad} mix-blend-normal`} />
        
        {/* Fake ambient texture overlay to make it feel like a real poster */}
        <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100" height="150" filter="url(#noise)" />
        </svg>

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col ${alignment == 'justify-between' ? 'justify-between' : 'justify-end'} items-center text-center p-2`}>
            {topTitle && alignment === 'justify-between' && (
                <span className="text-[#E50914] font-[900] text-[8px] tracking-[1.5px] pt-1">
                    {topTitle}
                </span>
            )}
            {topTitle && alignment !== 'justify-between' && (
                <div className="absolute top-2 left-0 w-full flex justify-center">
                    <span className="text-[#E50914] font-[900] text-[8px] tracking-[1.5px]">
                        {topTitle}
                    </span>
                </div>
            )}
            
            <span 
                className={`text-white font-[900] tracking-[0.5px] uppercase leading-[1.05] opacity-95 ${fontClass} z-10`} 
                style={textShadow ? { textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8)' } : {}}
            >
                {title}
            </span>
        </div>
    </div>
);

/**
 * @name Netflix Search Results - Category Grid (Page 12)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar (Solid Black Header) */}
      <div className="absolute top-0 w-full z-40 bg-black/95 backdrop-blur-sm">
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:03</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="flex gap-[3px] items-end h-[12px]">
                 <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
              </div>
              <div className="relative transform scale-90 -mr-1">
                <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                  <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                  <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                </svg>
                <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
              </div>
            </div>
          </div>

          {/* 2. Header Navigation: Search Category Title */}
          <div className="flex items-center justify-center px-4 h-12 relative w-full border-b border-[#2B2B2B]">
              <span className="text-[#EBEBEB] font-bold text-[16px] tracking-tight">
                  Titles in: The End-of-the-World
              </span>
              
              <button className="absolute right-4 w-[28px] h-[28px] rounded-full bg-[#262626] flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                  <X size={16} strokeWidth={2.5} className="text-[#D1D1D1]" />
              </button>
          </div>
      </div>

      {/* 3. Main Grid Content */}
      {/* Added pt-24 to clear the double header, pb-24 to clear bottom nav */}
      <div className="flex-1 overflow-y-auto pt-[94px] pb-24 px-[6px] bg-black">
          
          <div className="grid grid-cols-3 gap-[6px] w-full">
              
              {/* Row 1 */}
              <Poster 
                  title={<span>HOW IT<br/>ENDS</span>} 
                  topTitle="NETFLIX" 
                  bgGrad="from-[#7A7568] via-[#4A453A] to-[#2B2319]"
                  alignment="justify-center"
                  fontClass="text-[20px]"
              />
              <Poster 
                  title="EXTINCTION" 
                  topTitle="NETFLIX" 
                  bgGrad="from-[#1A2C3D] via-[#0D1824] to-[#0A1017]"
                  alignment="justify-between"
                  fontClass="text-[12px] tracking-[2px]"
              />
              <Poster 
                  title="BOKEH" 
                  bgGrad="from-[#609FB8] to-[#994729]"
                  alignment="justify-center"
                  fontClass="text-[22px] tracking-widest text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
              />

              {/* Row 2 */}
              <Poster 
                  title="SALVATION" 
                  bgGrad="from-[#050505] via-[#0B1521] to-[#122A42]"
                  alignment="justify-center"
                  fontClass="text-[14px] font-medium tracking-[4px] mt-4"
              />
              <Poster 
                  title={<span>THE<br/>DARKEST<br/>DAWN</span>} 
                  bgGrad="from-[#4A3D36] via-[#2D231E] to-[#141A1F]"
                  alignment="justify-end"
                  fontClass="text-[15px] mb-4"
              />
              <Poster 
                  title="2012" 
                  bgGrad="from-[#466070] via-[#2A3A45] to-[#0F141A]"
                  alignment="justify-end"
                  fontClass="text-[34px] font-normal tracking-[-2px] text-white/90"
                  textShadow={false}
              />

              {/* Row 3 */}
              <Poster 
                  title="NOAH" 
                  bgGrad="from-[#262626] via-[#141414] to-[#050505]"
                  alignment="justify-start"
                  fontClass="text-[22px] font-semibold tracking-widest mt-2"
              />
              <Poster 
                  title={<span>DOOMSDAY<br/>BUNKERS</span>} 
                  bgGrad="from-[#8C3A1A] via-[#4A1D0B] to-[#1A0A04]"
                  alignment="justify-start"
                  fontClass="text-[18px] text-[#EBEBEB] mt-2 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
              />
              <Poster 
                  title="TRAVELERS" 
                  topTitle="NETFLIX" 
                  bgGrad="from-[#193D2C] via-[#0E2118] to-[#0B1A12]"
                  alignment="justify-end"
                  fontClass="text-[14px] mb-4"
              />

              {/* Row 4 (Partial cutoff) */}
              <Poster 
                  title="ARMAGEDDON" 
                  bgGrad="from-[#5C4535] via-[#33261C] to-[#140F0B]"
                  alignment="justify-end"
                  fontClass="text-[13px] mb-1 opacity-90"
              />
              <Poster 
                  title={<span>THE<br/>UMBRELLA<br/>ACADEMY</span>} 
                  topTitle="NETFLIX" 
                  bgGrad="from-[#283833] via-[#141C1A] to-[#0A0D0C]"
                  alignment="justify-end"
                  fontClass="text-[12px] mb-1 opacity-90"
              />
              <Poster 
                  title="MUTANT" 
                  bgGrad="from-[#8C6442] via-[#4A3522] to-[#1A1208]"
                  alignment="justify-end"
                  fontClass="text-[18px] tracking-[4px] mb-1 opacity-90"
              />

          </div>
      </div>

      {/* 4. Bottom Tab Bar (Netflix Standard Native) */}
      {/* SEARCH TAB IS ACTIVE HERE */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Home size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Home</span>
          </button>
          
          {/* ACTIVE STATE: Search */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <Search size={24} strokeWidth={2.5} className="text-white" />
              <span className="text-[10px] text-white font-bold">Search</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">More</span>
          </button>

      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none"></div>

    </div>
  );
}
