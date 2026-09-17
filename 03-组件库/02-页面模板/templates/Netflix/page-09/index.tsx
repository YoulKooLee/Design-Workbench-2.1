import React from 'react';
import { ChevronLeft, Pencil, Home, Search, Download, Menu, Check } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Downloads - Detailed Episode Content View (Page 09)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20 bg-[#121212]">
        <div className="flex items-center gap-1">
          <span>3:04</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-90">
          <div className="flex gap-[3px] items-end h-[12px]">
             <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[9px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[12px] bg-white rounded-sm"></div>
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

      {/* 2. Top Header Navigation */}
      <div className="flex items-center justify-between px-3 h-14 relative z-20 bg-[#121212]">
        <button className="p-2 text-white opacity-90 hover:opacity-100 absolute left-3">
          <ChevronLeft size={30} strokeWidth={2} />
        </button>
        
        <span className="text-[#EBEBEB] font-semibold text-[17px] absolute left-1/2 -translate-x-1/2">
          Bodyguard
        </span>

        <button className="p-2 text-white opacity-90 hover:opacity-100 absolute right-4">
          <Pencil size={20} strokeWidth={2} />
        </button>
      </div>

      {/* 3. Main List Content */}
      <div className="flex-1 overflow-y-auto pb-24">
          
          {/* Season Header Bar */}
          <div className="bg-[#181818] border-b border-[#262626] px-4 py-[14px]">
              <span className="text-white font-bold text-[16px] tracking-wide">Season 1</span>
          </div>

          {/* Episode List (Expanded with Summary) */}
          <div className="flex flex-col">
              
              {/* Episode Item: Bodyguard Ep 2 */}
              <div className="flex flex-col w-full px-4 pt-4 pb-5 active:bg-white/5 cursor-pointer transition-colors border-b border-[#1A1A1A]">
                  
                  {/* Top Row: Thumbnail + Meta + Icon */}
                  <div className="flex w-full mb-3">
                      
                      {/* Aspect 16:9 Thumbnail (w-135 h-76) */}
                      <div className="w-[140px] h-[78px] rounded-[2px] overflow-hidden bg-[#222933] shrink-0 relative">
                          {/* Procedural SVG: Briefing Room Simulation */}
                          <svg viewBox="0 0 160 90" className="w-full h-full opacity-80">
                              {/* Room Background / Lights */}
                              <rect width="160" height="90" fill="#3D4B59" />
                              <rect x="10" y="10" width="40" height="30" fill="#2D3843" rx="2" />
                              <rect x="60" y="10" width="40" height="30" fill="#2D3843" rx="2" />
                              
                              {/* Abstract Characters (Suits and Shirts) */}
                              <path d="M10,90 L20,45 L40,45 L50,90 Z" fill="#EAEAEA" /> {/* Light shirt */}
                              <circle cx="30" cy="35" r="9" fill="#D3A588" />
                              <path d="M10,90 L25,60 L25,90 Z" fill="#1C2126" /> {/* Suit jacket */}

                              <path d="M50,90 L65,50 L85,50 L100,90 Z" fill="#1C2126" /> {/* Dark Suit center */}
                              <circle cx="75" cy="40" r="10" fill="#E2B196" />
                              
                              <path d="M100,90 L115,45 L145,45 L155,90 Z" fill="#181D21" /> {/* Dark suit right */}
                              <circle cx="130" cy="35" r="9" fill="#C49272" />

                              {/* Film Grain */}
                              <rect width="160" height="90" fill="#000000" fillOpacity="0.1" />
                          </svg>

                          {/* Center Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-[42px] h-[42px] rounded-full border-[2px] border-white bg-black/40 flex items-center justify-center pl-1 backdrop-blur-sm">
                                  <svg width="18" height="20" viewBox="0 0 18 20" className="fill-white drop-shadow-md">
                                      <path d="M2.5 1.5 L16.5 10 L2.5 18.5 Z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                                  </svg>
                              </div>
                          </div>
                      </div>

                      {/* Metadata Line */}
                      <div className="flex flex-col justify-center flex-1 pl-4 h-[78px]">
                          <span className="text-white font-bold text-[15.5px] mb-[4px]">2. Episode 2</span>
                          <span className="text-[#8C8C8C] text-[13.5px]">58m | 177.6 MB</span>
                      </div>

                      {/* Right Action: Downloaded Device Checkbox */}
                      <div className="pl-4 pr-1 shrink-0 flex items-center justify-center h-[78px]">
                          <div className="w-[20px] h-[20px] rounded-[2px] border-[1.5px] border-[#4686EB] flex items-center justify-center">
                              <Check size={14} className="text-[#4686EB]" strokeWidth={3.5} />
                          </div>
                      </div>

                  </div>

                  {/* Bottom Row: Episode Synopsis */}
                  <div className="w-full">
                      <p className="text-[#A3A3A3] text-[14px] leading-[1.4] tracking-[-0.1px]">
                          After an attempted attack on the school Budd's kids attend, Montague worries about leaks in the department. But she may be in the line of fire herself.
                      </p>
                  </div>

              </div>
              
          </div>

          {/* Action Button: View More Episodes */}
          <div className="flex justify-center mt-20 px-4 w-full">
              <button className="border border-white/30 bg-transparent text-[#EBEBEB] font-bold text-[14px] py-[13px] px-[20px] active:bg-white/10 transition-colors w-max tracking-[1px]">
                  VIEW MORE EPISODES
              </button>
          </div>

      </div>

      {/* 4. Bottom Tab Bar (Netflix Standard Native) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-30">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Home size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Search size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Search</span>
          </button>

          {/* ACTIVE STATE: Downloads (CLEAN STATE, NO BADGES) */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <Download size={24} strokeWidth={2.5} className="text-white" />
              <span className="text-[10px] text-white font-bold">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">More</span>
          </button>

      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-40 pointer-events-none"></div>

    </div>
  );
}
