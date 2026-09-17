import React from 'react';
import './style.css';

/**
 * @name Netflix Onboarding (Page 24 - Download feature view)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none">
      
      {/* 1. Global iOS Config & Application Header */}
      <div className="flex flex-col z-40 bg-black pt-3 pb-2 w-full">
          
          {/* Hardware iOS Status Bar Segment */}
          <div className="flex justify-between items-center px-6 text-white pb-3">
              <span className="text-[14px] font-bold tracking-tight">2:53</span>
              <div className="flex justify-end items-center gap-1.5">
                  {/* Cellular Bars */}
                  <div className="flex gap-[3px] items-end h-[12px]">
                     <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                     <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
                  </div>
                  {/* Battery Shell */}
                  <div className="relative transform scale-90 -mr-1">
                    <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                      <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                      <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                    </svg>
                    <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
                  </div>
              </div>
          </div>

          {/* Software Header Segment (Netflix Brand & Action nodes) */}
          <div className="flex justify-between items-center px-5 flex-1 mt-[-6px]">
              {/* Left Placeholder to force center alignment perfectly */}
              <div className="w-[60px]"></div> 
              
              <div className="flex-1 flex justify-center">
                 <span className="text-[#E50914] font-['Arial_Black',sans-serif] font-[900] text-[26px] tracking-[-0.8px] uppercase transform scale-y-[1.1] scale-x-[0.9]">
                     NETFLIX
                 </span>
              </div>
              
              <div className="text-[15px] font-[700] text-white w-[60px] text-right cursor-pointer hover:opacity-80 active:scale-95 transition-all">
                 Help
              </div>
          </div>
      </div>

      {/* 2. Primary Layout Matrix (SVG Vector Construction) */}
      <div className="flex-1 flex flex-col justify-start items-center w-full px-8 mt-[9vh]">
          
          {/* Custom Hardware-to-Rocket Vector Synthetic Graphic */}
          <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] mb-[6vh] ml-[8px]">
              {/* Outer Space Atmosphere Nodes (Particles) */}
              {/* Top Left Yellow Star/Cross */}
              <line x1="62" y1="46" x2="68" y2="46" stroke="#DFA02B" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="43" x2="65" y2="49" stroke="#DFA02B" strokeWidth="2" strokeLinecap="round" />
              
              {/* Left/Mid Yellow Data Bit */}
              <circle cx="72" cy="78" r="1.5" fill="#DFA02B" />
              
              {/* Right Vertical Dash */}
              <line x1="140" y1="65" x2="140" y2="76" stroke="#DFA02B" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Lower Left Vertical Dash */}
              <line x1="72" y1="125" x2="72" y2="133" stroke="#DFA02B" strokeWidth="1.5" strokeLinecap="round" />

              {/* Core Feature Data Representation Matrix (The Phone Display) */}
              <rect x="83.5" y="65.5" width="33" height="45" fill="#E50914" />
              <path d="M91 88 L 98 95 L 109 81" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Device Physical Boundaries */}
              <rect x="78" y="58" width="44" height="62" fill="none" stroke="#FFFFFF" strokeWidth="2" rx="3.5" />
              
              {/* Device Physical Sensors/Nodes */}
              {/* Sub-Bezel Audio Earpiece */}
              <line x1="93" y1="62" x2="107" y2="62" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />
              {/* Mechanical iOS Home Button */}
              <circle cx="100" cy="116.5" r="2" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />

              {/* Satellite Up-link Architecture (Top Antenna) */}
              <line x1="100" y1="58" x2="100" y2="48" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="100" cy="45" r="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Propulsion Fins Geometry (Complex open-looped curves) */}
              {/* Left Thruster Fin */}
              <path d="M 78 92 C 55 92 55 135 62 135 C 67 135 67 125 67 110" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Right Thruster Fin */}
              <path d="M 122 92 C 145 92 145 135 138 135 C 133 135 133 125 133 110" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

              {/* Device Main Exhaust Sub-Assembly Modules */}
              <path d="M90 120 L110 120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M92 123 L108 123" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <rect x="94" y="125" width="12" height="7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" rx="1.5" />
              <path d="M96 135 L104 135" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

              {/* Energy Plasma Signatures (Bottom Trails) */}
              <line x1="97" y1="138" x2="97" y2="155" stroke="#DFA02B" strokeWidth="2" strokeLinecap="round" />
              <line x1="103" y1="138" x2="103" y2="155" stroke="#DFA02B" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Typography Flow Logic */}
          <h1 className="text-white font-[800] text-[28px] text-center tracking-tight drop-shadow-sm mb-[14px]">
              Download and go
          </h1>
          <p className="text-[#E6E6E6] text-[18px] font-[400] text-center leading-[1.3] px-[6px] tracking-tight w-full drop-shadow-sm">
              Save your data, watch offline on a plane, train, or submarine...
          </p>
      </div>

      {/* 3. Global Control Bottom Terminal */}
      <div className="w-full mt-auto flex flex-col pt-0 pb-0 bg-black z-50">
          
          {/* Pagination Array Module */}
          <div className="flex justify-center items-center gap-[10px] pb-[22px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#525252] transition-colors duration-300"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#E50914] shadow-[0_0_8px_rgba(229,9,20,0.5)] transition-colors duration-300 transform scale-110"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#525252] transition-colors duration-300"></div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#525252] transition-colors duration-300"></div>
          </div>
          
          {/* Native Block Level Edge-to-Edge CTA Execution */}
          <button className="w-full h-[52px] bg-[#E50914] text-white font-[500] text-[15px] flex justify-center items-center active:bg-[#B80710] transition-colors tracking-wide z-50">
              SIGN IN
          </button>
      </div>

      {/* Secure Safe-Area iOS Footer Config */}
      <div className="flex justify-center w-full bg-black pb-2 pt-2 z-50">
           <div className="w-[134px] h-[5px] bg-[#FFFFFF] rounded-full pointer-events-none opacity-90"></div>
      </div>

    </div>
  );
}
