import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Search - Initial Unfocused Empty State (Page 16)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-white font-sans relative select-none">
      
      {/* 1. iOS Status Bar & Header Layout */}
      <div className="w-full bg-black z-40 pb-3 border-b border-black">
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:02</span>
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

          {/* Search Input Bar (Unfocused / Centered Placeholder State) */}
          <div className="px-2 pt-1 w-full">
              <div className="bg-[#333333] h-[36px] rounded-[4px] flex items-center justify-center cursor-text transition-colors w-full">
                  <div className="flex items-center space-x-[6px] opacity-70">
                      <SearchIcon size={18} strokeWidth={2} className="text-[#A3A3A3]" />
                      <span className="text-[16px] text-[#A3A3A3] font-medium tracking-wide">Search</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Main Body Content (Empty State) */}
      <div className="flex-1 overflow-y-auto bg-[#181818] relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]">
          {/* Deliberately empty canvas indicating zero search history or loading phase */}
      </div>

      {/* 3. Bottom Tab Bar Navigation */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Home size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Home</span>
          </button>
          
          {/* SEARCH TAB IS ACTIVE */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <SearchIcon size={24} strokeWidth={2.5} className="text-white" />
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
