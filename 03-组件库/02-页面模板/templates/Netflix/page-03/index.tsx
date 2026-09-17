import React from 'react';
import { ChevronLeft, ChevronRight, Trash2, Home, Search, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * @name Netflix App Settings (Page 03)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20 bg-black/90 backdrop-blur-md">
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
      <div className="flex items-center justify-between px-3 h-14 relative z-20 bg-black/90 backdrop-blur-md">
        <button className="p-2 text-white opacity-90 hover:opacity-100 absolute left-3">
          <ChevronLeft size={28} strokeWidth={2} />
        </button>
        
        <span className="text-white font-medium text-[19px] absolute left-1/2 -translate-x-1/2">
          App Settings
        </span>
      </div>

      {/* 3. Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
         
         {/* SECTION: VIDEO PLAYBACK */}
         <div className="mt-6 mb-2 px-4">
             <span className="text-[#8C8C8C] text-[13px] font-medium tracking-wide">VIDEO PLAYBACK</span>
         </div>
         
         <div className="bg-[#121212] border-t border-b border-[#2B2B2B]">
             <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex flex-col">
                    <span className="text-[17px] font-medium tracking-tight text-white mb-0.5">Cellular Data Usage</span>
                    <span className="text-[14px] text-[#8C8C8C]">Automatic</span>
                </div>
                <ChevronRight size={20} className="text-[#8C8C8C]" strokeWidth={1.5} />
             </div>
         </div>

         {/* SECTION: DOWNLOADS */}
         <div className="mt-8 mb-2 px-4">
             <span className="text-[#8C8C8C] text-[13px] font-medium tracking-wide">DOWNLOADS</span>
         </div>
         
         <div className="bg-[#121212] border-t border-[#2B2B2B] flex flex-col">
             
             {/* Item: Wi-Fi Only */}
             <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2B2B2B]">
                <span className="text-[17px] font-medium tracking-tight text-white">Wi-Fi Only</span>
                {/* Native iOS active toggle simulation */}
                <div className="w-[50px] h-[30px] rounded-full bg-[#4686EB] relative cursor-pointer px-[2px] flex items-center shadow-inner">
                    <div className="w-[26px] h-[26px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15)] absolute right-[2px] transition-all"></div>
                </div>
             </div>

             {/* Item: Smart Downloads */}
             <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2B2B2B]">
                <div className="flex flex-col pr-8">
                    <span className="text-[17px] font-medium tracking-tight text-white mb-[5px]">Smart Downloads</span>
                    <span className="text-[13px] text-[#8C8C8C] leading-[1.3]">
                        Completed episodes will be deleted and replaced with the next episodes, only on Wi-Fi.
                    </span>
                </div>
                {/* Native iOS active toggle simulation */}
                <div className="w-[50px] h-[30px] rounded-full bg-[#4686EB] relative cursor-pointer px-[2px] flex items-center shrink-0 shadow-inner">
                    <div className="w-[26px] h-[26px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15)] absolute right-[2px] transition-all"></div>
                </div>
             </div>

             {/* Item: Video Quality */}
             <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2B2B2B] cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex flex-col">
                    <span className="text-[17px] font-medium tracking-tight text-white mb-[3px]">Video Quality</span>
                    <span className="text-[14px] text-[#8C8C8C]">Standard</span>
                </div>
                <ChevronRight size={20} className="text-[#8C8C8C]" strokeWidth={1.5} />
             </div>

             {/* Item: Delete All Downloads */}
             <div className="flex items-center justify-between px-4 py-[14px] border-b border-[#2B2B2B] cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-[17px] font-medium tracking-tight text-white">Delete All Downloads</span>
                <Trash2 size={22} className="text-[#B3B3B3]" strokeWidth={1.5} />
             </div>

         </div>

         {/* Storage Usage Graph */}
         <div className="px-4 mt-6">
             <div className="text-[14px] text-[#8C8C8C] mb-[9px]">iPhone XS</div>
             
             {/* Progress Bar Container */}
             <div className="w-full h-[6px] bg-[#EAEAEA] flex overflow-hidden">
                 <div className="h-full bg-[#404040]" style={{ width: '77%' }}></div>
                 <div className="h-full bg-[#4686EB]" style={{ width: '1.5%' }}></div>
                 {/* Remaining transparent to show background #EAEAEA (Free) */}
             </div>
             
             {/* Legend */}
             <div className="flex items-center gap-6 mt-[10px] text-[13px] text-[#8C8C8C]">
                 <div className="flex items-center gap-[6px]">
                     <div className="w-[10px] h-[10px] bg-[#404040]"></div>
                     <span>Used</span>
                 </div>
                 <div className="flex items-center gap-[6px] ml-[20px]">
                     <div className="w-[10px] h-[10px] bg-[#4686EB]"></div>
                     <span>Netflix</span>
                 </div>
                 <div className="flex items-center gap-[6px] ml-auto">
                     <div className="w-[10px] h-[10px] bg-[#EAEAEA]"></div>
                     <span>Free</span>
                 </div>
             </div>
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

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px]">
              <Menu size={24} strokeWidth={2.5} className="text-white" />
              <span className="text-[10px] text-white font-bold">More</span>
          </button>

      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-40 pointer-events-none"></div>

    </div>
  );
}
