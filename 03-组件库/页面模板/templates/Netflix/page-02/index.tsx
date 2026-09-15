import React from 'react';
import { ChevronLeft } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Sign In - Empty State (Page 02)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20">
        <div className="flex items-center gap-1">
          <span>2:54</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-90">
          <div className="flex gap-[3px] items-end h-[12px]">
             <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[9px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[12px] bg-white rounded-sm"></div>
          </div>
          <span className="text-[12px] font-black tracking-tight ml-0.5">4G</span>
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
      <div className="flex items-center justify-between px-3 h-14 relative z-20">
        <button className="p-2 text-white opacity-90 hover:opacity-100">
          <ChevronLeft size={30} strokeWidth={2} />
        </button>
        {/* Netflix Text Logo Approximation */}
        <span 
          className="text-[#E50914] font-[900] text-[28px] tracking-[-1px] transform scale-y-[1.1] absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          NETFLIX
        </span>
        <button className="font-bold text-[15px] px-2 opacity-95">
          Help
        </button>
      </div>

      {/* 3. Main Form Area (Centered in viewport) */}
      <div className="flex-1 flex flex-col justify-center px-[5%] z-10 pb-[10vh]">
        
        {/* Email Input - Empty State */}
        <div className="bg-[#333333] rounded-[5px] h-[64px] flex items-center px-4 mb-4 relative overflow-hidden">
          <span className="text-[#8C8C8C] font-semibold text-[16px]">
             Email or phone number
          </span>
        </div>

        {/* Password Input - Empty State */}
        <div className="bg-[#333333] rounded-[5px] h-[64px] flex items-center justify-between px-4 mb-6 relative overflow-hidden">
          <span className="text-[#8C8C8C] font-semibold text-[16px]">
             Password
          </span>
          <button className="text-[#B3B3B3] font-semibold text-[14px] uppercase tracking-wide">
             SHOW
          </button>
        </div>

        {/* Sign In Button - Disabled / Empty State */}
        <button className="bg-transparent border border-white/20 text-white/90 font-bold text-[16px] py-[15px] rounded-[5px] w-full transition-colors mb-7">
          Sign In
        </button>
        
        {/* Recover Password Link */}
        <div className="flex justify-center w-full">
            <button className="text-[#B3B3B3] font-bold text-[14px] hover:text-white transition-colors">
                Recover Password
            </button>
        </div>

      </div>

      {/* 4. Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-40"></div>

    </div>
  );
}
