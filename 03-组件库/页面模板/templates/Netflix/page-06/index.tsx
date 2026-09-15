import React from 'react';
import { ChevronLeft, Pencil, Home, Search, Download, Menu, Square } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Downloads - Series Episode View (Page 06)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20 bg-[#121212]">
        <div className="flex items-center gap-1">
          <span>3:05</span>
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
          Black Mirror
        </span>

        <button className="p-2 text-white opacity-90 hover:opacity-100 absolute right-4">
          <Pencil size={20} strokeWidth={2} />
        </button>
      </div>

      {/* 3. Main List Content */}
      <div className="flex-1 overflow-y-auto pb-24">
          
          {/* Season Header Bar */}
          <div className="bg-[#181818] border-b border-[#262626] px-4 py-[14px]">
              <span className="text-white font-bold text-[16px] tracking-wide">Season 4</span>
          </div>

          {/* Episode List */}
          <div className="flex flex-col">
              
              {/* Episode Item: USS Callister */}
              <div className="flex items-center w-full px-4 py-3 hover:bg-white/5 cursor-pointer">
                  
                  {/* Aspect 16:9 Thumbnail (w-135 h-76) */}
                  <div className="w-[140px] h-[78px] rounded-[2px] overflow-hidden bg-[#2B1B15] shrink-0 relative">
                      {/* Procedural SVG: USS Callister Abstract Simulation */}
                      <svg viewBox="0 0 160 90" className="w-full h-full opacity-90">
                          {/* Mars-like Background */}
                          <linearGradient id="mars" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8C4A3A" />
                              <stop offset="100%" stopColor="#4A1B12" />
                          </linearGradient>
                          <rect width="160" height="90" fill="url(#mars)" />
                          
                          {/* Abstract Characters */}
                          {/* Red Uniform Left */}
                          <path d="M10,90 L20,40 L40,40 L50,90 Z" fill="#D32F2F" />
                          <circle cx="30" cy="30" r="8" fill="#FFB74D" />
                          
                          {/* Blue Uniform Center-ish */}
                          <path d="M60,90 L70,35 L90,35 L100,90 Z" fill="#1976D2" />
                          <circle cx="80" cy="25" r="7" fill="#FFE0B2" />
                          
                          {/* Gold Uniform Main Foreground right */}
                          <path d="M100,90 L115,30 L155,30 L160,90 Z" fill="#FFA000" />
                          <circle cx="135" cy="25" r="14" fill="#FFCC80" />
                          
                          {/* Red Uniform background far right */}
                          <path d="M140,90 L145,45 L155,45 L160,90 Z" fill="#D32F2F" />

                          {/* Optical noise overlay */}
                          <rect width="160" height="90" fill="#000000" fillOpacity="0.15" />
                      </svg>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col justify-center flex-1 pl-4 h-full">
                      <span className="text-white font-bold text-[15.5px] mb-[3px]">USS Callister</span>
                      <span className="text-[#8C8C8C] text-[13.5px]">1h 16m</span>
                  </div>

                  {/* Right Action: Download Status (Blue Stop/Downloaded ring) */}
                  <div className="pl-4 pr-1 shrink-0 flex items-center justify-center">
                      <div className="w-[30px] h-[30px] rounded-full border-[2.5px] border-[#4686EB] flex items-center justify-center">
                          <div className="w-[9px] h-[9px] bg-[#4686EB] rounded-[1px]"></div>
                      </div>
                  </div>

              </div>
              
          </div>

          {/* Action Button: View More Episodes */}
          <div className="flex justify-center mt-12 px-4 w-full">
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

          {/* ACTIVE STATE: Downloads with Notification / Progress Badge */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 relative">
              <div className="relative">
                  <Download size={24} strokeWidth={2.5} className="text-white" />
                  
                  {/* Pie/Progress Badge */}
                  <div className="absolute -top-[5px] -right-[7px] w-[14px] h-[14px] rounded-full bg-[#121212] flex items-center justify-center z-10">
                      {/* CSS Pie Chart simulation for active download progress */}
                      <div 
                          className="w-[11px] h-[11px] rounded-full" 
                          style={{
                              background: 'conic-gradient(#4686EB 60%, transparent 0)',
                              transform: 'rotate(-45deg)'
                          }}
                      ></div>
                  </div>
              </div>
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
