import React from 'react';
import { Info, ChevronRight, Home, Search, Download, Menu, X } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Downloads - Edit Mode (Page 05)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar (Transparent) */}
      <div className="absolute top-0 w-full z-20">
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight">
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
      </div>

      {/* 2. Top Header Area */}
      <div className="pt-12 pb-4 px-4 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-[6px]">
              <Info size={16} strokeWidth={2} className="text-[#B3B3B3]" />
              <span className="text-[#D1D1D1] font-bold tracking-tight text-[15px]">Smart Downloads</span>
              <span className="text-[#4686EB] font-bold tracking-tight text-[15px]">ON</span>
          </div>
          <button className="text-white font-semibold text-[17px] tracking-tight">
              Done
          </button>
      </div>

      {/* 3. Main List Content */}
      <div className="flex-1 overflow-y-auto pb-24 flex flex-col">
          
          {/* Active Profile Filter Bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] border-y border-[#262626]">
              <div className="w-7 h-7 rounded-[3px] overflow-hidden">
                  {/* Procedural SVG Avatar: Red/Yellow Angry Character */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="#FFC80A" />
                      <rect width="100" height="52" fill="#E50914" />
                      <path d="M10,38 L45,46 L45,55 L10,47 Z" fill="#FFFFFF" />
                      <path d="M90,38 L55,46 L55,55 L90,47 Z" fill="#FFFFFF" />
                      <circle cx="34" cy="49" r="4.5" fill="#000000" />
                      <circle cx="66" cy="49" r="4.5" fill="#000000" />
                      <path d="M35,76 Q50,70 65,76" fill="none" stroke="#000000" strokeWidth="6" />
                  </svg>
              </div>
              <span className="text-[17px] font-medium tracking-tight text-[#EBEBEB]">Jiho</span>
          </div>

          {/* Downloaded Items List (Edit Mode Active) */}
          <div className="flex flex-col mt-3 gap-3">

              {/* Item 1: Black Mirror */}
              <div className="h-[96px] bg-[#1A1A1A] flex items-center w-full transform transition-transform relative group">
                  
                  {/* Poster Thumbnail */}
                  <div className="h-[72px] w-[128px] rounded-r-[6px] relative overflow-hidden bg-[#2B3D50] shrink-0">
                      {/* Fake Black Mirror Poster Graphic */}
                      <svg viewBox="0 0 160 90" className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-overlay">
                          <linearGradient id="bm" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4A6A8C" />
                              <stop offset="100%" stopColor="#0B0B0C" />
                          </linearGradient>
                          <rect width="160" height="90" fill="url(#bm)" />
                          {/* Face outline simulation */}
                          <circle cx="80" cy="40" r="30" fill="#FFFFFF" fillOpacity="0.1" />
                          <circle cx="70" cy="35" r="8" fill="#000000" fillOpacity="0.5" />
                          <circle cx="90" cy="35" r="8" fill="#000000" fillOpacity="0.5" />
                          <path d="M70,55 Q80,70 90,55" fill="#000000" fillOpacity="0.7" stroke="#ffffff" strokeWidth="2" />
                          {/* Glitch lines */}
                          <line x1="0" y1="20" x2="160" y2="20" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="2" />
                          <line x1="0" y1="60" x2="160" y2="60" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
                      </svg>
                      {/* Text Watermark */}
                      <div className="absolute left-[3px] bottom-3 select-none">
                          <span className="text-white font-[900] text-[18px] tracking-widest uppercase opacity-80" style={{ letterSpacing: '4px' }}>
                              MIRROR
                          </span>
                      </div>
                  </div>

                  {/* Metadata Area */}
                  <div className="flex flex-col justify-center flex-1 px-4 h-full pointer-events-none min-w-0">
                      <span className="text-[16px] text-[#EBEBEB] mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-tight tracking-wide">Black Mirror</span>
                      <span className="text-[13px] text-[#8C8C8C] whitespace-nowrap overflow-hidden text-ellipsis">1 Episode | 345.7 MB</span>
                  </div>

                  {/* Right Action Icons */}
                  <div className="flex items-center pr-3 pb-2 h-full shrink-0">
                      <ChevronRight size={24} className="text-[#8C8C8C]" strokeWidth={1.5} />
                  </div>

                  {/* Active Swipe-to-Delete Action Box */}
                  <div className="h-full w-[85px] bg-[#E50914] flex items-center justify-center cursor-pointer active:bg-[#B20710] shrink-0">
                      <X size={32} className="text-white" strokeWidth={1.5} />
                  </div>
              </div>

              {/* Item 2: Bodyguard */}
              <div className="h-[96px] bg-[#1A1A1A] flex items-center w-full transform transition-transform relative group">
                  
                  {/* Poster Thumbnail */}
                  <div className="h-[72px] w-[128px] rounded-r-[6px] relative overflow-hidden bg-[#18262C] shrink-0">
                      {/* Fake Bodyguard Poster Graphic */}
                      <svg viewBox="0 0 160 90" className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-overlay">
                          <linearGradient id="bgd" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#2E4A56" />
                              <stop offset="100%" stopColor="#05080A" />
                          </linearGradient>
                          <rect width="160" height="90" fill="url(#bgd)" />
                          {/* Face outline simulation */}
                          <path d="M70,20 Q100,20 110,60 Q90,90 60,70 Z" fill="#FFFFFF" fillOpacity="0.1" />
                          <circle cx="85" cy="40" r="4" fill="#000000" fillOpacity="0.7" />
                          {/* Blood scuffs */}
                          <path d="M100,30 L105,45 M95,25 L100,35" stroke="#E50914" strokeOpacity="0.4" strokeWidth="2" />
                      </svg>
                      {/* Text Watermark */}
                      <div className="absolute left-[3px] top-6 select-none flex flex-col uppercase font-bold text-white/80">
                         <span className="text-[14px] tracking-widest leading-none">RD</span>
                      </div>
                  </div>

                  {/* Metadata Area */}
                  <div className="flex flex-col justify-center flex-1 px-4 h-full pointer-events-none min-w-0">
                      <span className="text-[16px] text-[#EBEBEB] mb-1 whitespace-nowrap overflow-hidden text-ellipsis leading-tight tracking-wide">Bodyguard</span>
                      <span className="text-[13px] text-[#8C8C8C] whitespace-nowrap overflow-hidden text-ellipsis">1 Episode | 177.6 MB</span>
                  </div>

                  {/* Right Action Icons */}
                  <div className="flex items-center pr-3 pb-2 h-full shrink-0">
                      <ChevronRight size={24} className="text-[#8C8C8C]" strokeWidth={1.5} />
                  </div>

                  {/* Active Swipe-to-Delete Action Box */}
                  <div className="h-full w-[85px] bg-[#E50914] flex items-center justify-center cursor-pointer active:bg-[#B20710] shrink-0">
                      <X size={32} className="text-white" strokeWidth={1.5} />
                  </div>
              </div>

          </div>

          {/* Action Button: Find More */}
          <div className="flex justify-center mt-32 px-4 w-full">
              <button className="border border-white/30 bg-transparent text-[#EBEBEB] font-bold text-[14px] py-[15px] px-[20px] active:bg-white/10 transition-colors w-max tracking-wide">
                  FIND MORE TO DOWNLOAD
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

          {/* ACTIVE STATE: Downloads */}
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
