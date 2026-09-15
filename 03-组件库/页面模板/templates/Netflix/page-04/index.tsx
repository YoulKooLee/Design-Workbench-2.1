import React from 'react';
import { Pencil, Check, ChevronRight, Plus, Home, Search, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * @name Netflix More / Profile Menu (Page 04)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar (Transparent over black header background) */}
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

      {/* 2. Top Profile Selection Area (Black Background) */}
      <div className="bg-black pt-20 pb-6 flex flex-col items-center">
          
          <div className="flex items-start justify-center gap-6 px-4">
              
              {/* Profile 1: Jiho (Active) */}
              <div className="flex flex-col items-center gap-[6px] cursor-pointer">
                  <div className="w-[72px] h-[72px] rounded-[4px] border-[2px] border-white overflow-hidden opacity-100 transition-opacity">
                      {/* Procedural SVG Avatar: Red/Yellow Angry Character */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                         <rect width="100" height="100" fill="#FFC80A" />
                         <rect width="100" height="52" fill="#E50914" />
                         {/* Angry Eyes */}
                         <path d="M10,38 L45,46 L45,55 L10,47 Z" fill="#FFFFFF" />
                         <path d="M90,38 L55,46 L55,55 L90,47 Z" fill="#FFFFFF" />
                         <circle cx="34" cy="49" r="4.5" fill="#000000" />
                         <circle cx="66" cy="49" r="4.5" fill="#000000" />
                         {/* Mouth */}
                         <path d="M35,76 Q50,70 65,76" fill="none" stroke="#000000" strokeWidth="3" />
                         <rect x="42" y="52" width="16" height="5" fill="#C30811" />
                      </svg>
                  </div>
                  <span className="text-white font-bold text-[13px] tracking-wide mt-1">Jiho</span>
              </div>

              {/* Profile 2: Mobbin (Inactive) */}
              <div className="flex flex-col items-center gap-[6px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity mt-[2px]">
                  <div className="w-[68px] h-[68px] rounded-[4px] overflow-hidden">
                      {/* Procedural SVG Avatar: Green Ninja/Mummy */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                         <rect width="100" height="100" fill="#EBEBEB" />
                         {/* Bandages */}
                         <path d="M0,22 L100,28 M0,38 L100,48 M0,70 L100,64 M0,88 L100,82" stroke="#D1D1D1" strokeWidth="5" />
                         {/* Green Eye Slit */}
                         <rect x="0" y="44" width="100" height="23" fill="#2BAC76" />
                         {/* Eyes */}
                         <path d="M22,54 Q35,50 45,60" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                         <path d="M78,54 Q65,50 55,60" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                  </div>
                  <span className="text-[#8C8C8C] font-semibold text-[13px] tracking-wide mt-1">Mobbin</span>
              </div>

              {/* Profile 3: Add Profile */}
              <div className="flex flex-col items-center gap-[6px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity mt-[2px]">
                  <div className="w-[68px] h-[68px] rounded-full border border-[#2B2B2B] flex items-center justify-center">
                       <Plus size={36} strokeWidth={1} className="text-[#8C8C8C]" />
                  </div>
                  <span className="text-[#8C8C8C] font-semibold text-[13px] tracking-wide mt-1">Add Profile</span>
              </div>

          </div>

          <button className="flex items-center gap-2 mt-8 text-[#8C8C8C] hover:text-white transition-colors">
              <Pencil size={15} fill="currentColor" className="text-[#8C8C8C]" />
              <span className="text-[14px] font-bold tracking-wide">Manage Profiles</span>
          </button>
      </div>

      {/* 3. Main Menu List */}
      <div className="flex-1 overflow-y-auto">
         
         {/* My List (Highlighted Menu Item) */}
         <div className="bg-[#181818] border-t border-[#262626] border-b-[5px] border-black pb-0.5">
             <div className="flex items-center justify-between px-4 py-[14px] cursor-pointer hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                     <Check size={22} className="text-[#B3B3B3]" strokeWidth={2.5} />
                     <span className="text-[#D1D1D1] text-[16.5px] font-semibold tracking-[-0.3px]">My List</span>
                 </div>
                 <ChevronRight size={20} className="text-[#B3B3B3]" strokeWidth={1.5} />
             </div>
         </div>

         {/* Standard Menu Items */}
         <div className="flex flex-col pt-1 bg-[#121212]">
             
             <div className="px-4 py-[13px] cursor-pointer hover:bg-white/5 transition-colors">
                 <span className="text-[#B3B3B3] text-[16.5px] font-semibold tracking-[-0.3px]">App Settings</span>
             </div>

             <div className="px-4 py-[13px] cursor-pointer hover:bg-white/5 transition-colors">
                 <span className="text-[#B3B3B3] text-[16.5px] font-semibold tracking-[-0.3px]">Privacy</span>
             </div>

             <div className="px-4 py-[13px] cursor-pointer hover:bg-white/5 transition-colors">
                 <span className="text-[#B3B3B3] text-[16.5px] font-semibold tracking-[-0.3px]">Help</span>
             </div>

             <div className="px-4 py-[13px] cursor-pointer hover:bg-white/5 transition-colors">
                 <span className="text-[#B3B3B3] text-[16.5px] font-semibold tracking-[-0.3px]">Sign Out</span>
             </div>

         </div>

         {/* Version Footer */}
         <div className="px-4 mt-1">
             <span className="text-[#4D4D4D] text-[14.5px] tracking-tight">
                 Version: 11.22.0 (2540) 5.0.1-001
             </span>
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
