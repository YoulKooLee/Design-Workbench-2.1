import React from 'react';
import './style.css';

/**
 * A perfectly tiled wavy line for the document graphic
 */
const WavyLine = ({ y }) => (
    <path 
        d={`M 15 ${y} 
            C 20 ${y-10}, 25 ${y-10}, 30 ${y} 
            C 35 ${y+10}, 40 ${y+10}, 45 ${y} 
            C 50 ${y-10}, 55 ${y-10}, 60 ${y} 
            C 65 ${y+10}, 70 ${y+10}, 75 ${y} 
            C 80 ${y-10}, 85 ${y-10}, 90 ${y}
            C 95 ${y+10}, 100 ${y+10}, 105 ${y}`} 
    />
);

/**
 * @name Netflix Onboarding Walkthrough (Page 15)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight">
        <div className="flex items-center gap-1">
          <span>2:53</span>
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

      {/* 2. Top Header (Logo & Help) */}
      <div className="flex justify-center items-center px-5 pt-[10px] relative w-full h-[50px]">
           {/* Netflix Text Logo Approximation (Synced with Page 01) */}
           <span 
               className="text-[#E50914] font-[900] text-[28px] tracking-[-1px] transform scale-y-[1.1]"
               style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
           >
               NETFLIX
           </span>
           <button className="absolute right-5 text-white font-bold text-[15px] pt-1 opacity-95">
               Help
           </button>
      </div>

      {/* 3. Main Center Stage (Graphic + Typography) */}
      {/* Used negative margin top to slightly bias vertical center upwards mimicking original */}
      <div className="flex flex-col flex-1 items-center justify-center -mt-16 w-full">
          
          {/* Vector Graphic: "Pesky Contracts" */}
          <div className="relative w-[200px] h-[220px] mb-4">
              
              {/* Background Stack Paper Element */}
              <div className="absolute top-[18px] left-[32px] border-[2.5px] border-white w-[130px] h-[180px] rotate-[8deg] rounded-[1px] opacity-90 origin-bottom"></div>
              
              {/* Foreground Contract Paper Element */}
              <div className="absolute top-[20px] left-[25px] border-[2.5px] border-white w-[130px] h-[180px] rotate-[-5deg] bg-black rounded-[1px] z-10 
                              flex flex-col justify-center items-center">
                  
                  {/* Internal vector markings */}
                  <svg viewBox="0 0 120 180" className="w-full h-full overflow-visible pointer-events-none">
                      <g stroke="#F2B005" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
                          
                          {/* Accent 'Splash' lines top */}
                          <line x1="30" y1="20" x2="45" y2="35" strokeWidth="2.5" />
                          <line x1="90" y1="20" x2="75" y2="35" strokeWidth="2.5" />
                          
                          {/* Wavy contract text lines */}
                          {/* Rendered using precise cubic Beziers offsets for perfect wave nesting */}
                          <WavyLine y={60} />
                          <WavyLine y={75} />
                          <WavyLine y={90} />
                          
                          <path 
                              d="M 15 105 
                                  C 20 95, 25 95, 30 105 
                                  C 35 115, 40 115, 45 105 
                                  C 50 95, 55 95, 60 105 
                                  C 65 115, 70 115, 75 105 
                                  C 80 95, 85 95, 90 105" 
                          />

                          {/* Signature X */}
                          <path d="M 22 143 L 32 153 M 22 153 L 32 143" strokeWidth="2.5" />
                          
                          {/* Signature Line */}
                          <line x1="22" y1="160" x2="105" y2="152" strokeWidth="3.5" />
                      </g>
                  </svg>
              </div>
          </div>

          {/* Primary & Secondary Copy */}
          <h1 className="text-white font-[800] text-[28px] tracking-[-0.6px] mt-8 mb-3.5">
               No pesky contracts
          </h1>
          <p className="text-white text-[18px] font-medium opacity-[0.9] tracking-[-0.2px] ml-0.5">
               Join today, cancel anytime.
          </p>

      </div>

      {/* 4. Bottom Tab Bar & Controls */}
      <div className="flex flex-col px-4 pb-2 z-20">
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-[9px] mb-7 mt-2">
              <div className="w-[7px] h-[7px] rounded-full bg-[#4A4A4A]"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-[#4A4A4A]"></div>
              {/* Active Step Indicator */}
              <div className="w-[8px] h-[8px] rounded-full bg-[#E50914] -mt-[0.5px]"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-[#4A4A4A]"></div>
          </div>
          
          {/* Global CTA Button */}
          <button className="w-full bg-[#E50914] text-white py-[14px] rounded-[2px] font-[600] tracking-wide text-[14.5px] uppercase active:scale-[0.98] transition-transform">
              SIGN IN
          </button>
      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none"></div>

    </div>
  );
}
