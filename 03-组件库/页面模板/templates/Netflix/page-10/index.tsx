import React from 'react';
import { ChevronLeft, Home, Search, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Smart Downloads Settings & FAQ (Page 10)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20 bg-[#121212]">
        <div className="flex items-center gap-1">
          <span>3:03</span>
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

      {/* 2. Top Header Navigation (with Border & Toggle) */}
      <div className="flex items-center justify-between px-3 h-14 relative z-20 bg-[#121212] border-b border-[#262626]">
        <button className="p-2 text-white opacity-90 hover:opacity-100 absolute left-2">
          <ChevronLeft size={30} strokeWidth={2} />
        </button>
        
        <span className="text-[#EBEBEB] text-[16.5px] font-medium absolute left-1/2 -translate-x-1/2">
          Smart Downloads
        </span>

        {/* Active Toggle Switch */}
        <div className="absolute right-4 w-[50px] h-[30px] rounded-full bg-[#4686EB] cursor-pointer transition-colors shadow-inner flex items-center">
            <div className="w-[26px] h-[26px] bg-white rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.15)] absolute right-[2px] transition-all"></div>
        </div>
      </div>

      {/* 3. Main Textual Content (FAQ) */}
      <div className="flex-1 overflow-y-auto pb-28 px-[18px] pt-7">
          
          {/* Section 1 */}
          <div className="mb-8">
              <h2 className="text-white font-bold text-[17px] mb-2.5 tracking-[-0.2px]">
                  What is Smart Downloads?
              </h2>
              <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                  Spend less time managing downloads and more time watching. Smart Downloads gets the next episodes downloaded for you and deletes those you've already watched. Only on Wi-Fi.
              </p>
          </div>

          {/* Section 2 (List) */}
          <div className="mb-8">
              <h2 className="text-white font-bold text-[17px] mb-3 tracking-[-0.2px]">
                  How does it work?
              </h2>
              <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                      <span className="text-[#999999] text-[14px] font-medium w-4 shrink-0 text-right">1.</span>
                      <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                          You finish watching an episode you've downloaded.
                      </p>
                  </div>
                  <div className="flex gap-3">
                      <span className="text-[#999999] text-[14px] font-medium w-4 shrink-0 text-right">2.</span>
                      <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                          The next time you're on Wi-Fi, the app automatically deletes that episode and downloads the next available one.
                      </p>
                  </div>
                  <div className="flex gap-3">
                      <span className="text-[#999999] text-[14px] font-medium w-4 shrink-0 text-right">3.</span>
                      <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                          Once the download completes, you're ready to watch.
                      </p>
                  </div>
              </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
              <h2 className="text-white font-bold text-[17px] mb-2.5 tracking-[-0.2px]">
                  How does it use space?
              </h2>
              <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                  Smart Downloads deletes an episode for every episode it downloads. It won't take up extra space beyond what you've already downloaded.
              </p>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
              <h2 className="text-white font-bold text-[17px] mb-2.5 tracking-[-0.2px] pr-8 leading-[1.25]">
                  Does Smart Downloads use my cellular data?
              </h2>
              <p className="text-[#999999] text-[14px] leading-[1.4] tracking-tight">
                  Nope. It only works when you're connected to Wi-Fi.
              </p>
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
