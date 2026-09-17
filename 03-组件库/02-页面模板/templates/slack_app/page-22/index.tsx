import React from 'react';
import { 
  Signal, Navigation, 
  Search, Globe, Mic
} from 'lucide-react';
import './style.css';


/**
 * @name Slack Global Search Empty State
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Universal Top Controls Assembly (Status + Search Box + Tabs) */}
      <div className="flex flex-col w-full z-30 bg-white">
        
        {/* Global iOS Status Bar Layer */}
        <div className="w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black z-40 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-1 drop-shadow-sm">
            <span>7:45</span>
            <Navigation size={12} className="ml-1 -rotate-45" fill="black" stroke="black" />
          </div>
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <Signal size={14} fill="currentColor" strokeWidth={1} />
            <span className="text-[12px] font-bold">4G</span>
            <div className="relative">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1.5]">
                <rect x="1" y="2" width="20" height="8" rx="2" stroke="currentColor"/>
                <path d="M23 4 V8" strokeLinecap="round" stroke="currentColor"/>
              </svg>
              <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-black rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Global Search Header Layer */}
        <div className="w-full flex items-center px-[10px] mt-[4px]">
           <div className="flex-1 h-[36px] bg-[#FFFFFF] border border-[#D1D1D6] rounded-[4px] flex items-center px-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
              <Search size={16} className="text-[#A1A1A5] shrink-0" strokeWidth={2.2} />
              
              <div className="ml-2 flex items-center text-[17px] text-[#1D1C1D] leading-none h-full flex-1 pt-[2px] overflow-hidden tracking-tight">
                 <span className="whitespace-nowrap">today from:me has:star</span>
                 <div className="w-[1.5px] h-[21px] bg-[#0B82E5] shadow-[0_0_1px_rgba(11,130,229,0.3)] ml-[0px]"></div>
              </div>

              {/* Native Clear Button Mockup */}
              <div className="shrink-0 ml-1 pb-px cursor-pointer opacity-90 hover:opacity-100">
                 <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#8E8E93] fill-current">
                   <circle cx="12" cy="12" r="10" />
                   <path d="M15 9l-6 6 M9 9l6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                 </svg>
              </div>
           </div>
           
           <span className="text-[17px] text-[#8E8E93] ml-3 mr-[6px] pb-[1px] tracking-tight cursor-pointer active:opacity-70 transition-opacity">
              Cancel
           </span>
        </div>

        {/* Filter Tab Array (Messages vs Files) */}
        {/* Intentionally crafting the boundary cut logic as seen in Slack iOS: Left stroke overlaps Right green mass */}
        <div className="w-[calc(100%-20px)] mx-auto mt-4 h-[32px] flex rounded-[4px] border border-[#D1D1D6] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-3">
           <div className="flex-1 bg-white text-[#1D1C1D] text-[15px] font-[600] flex items-center justify-center border-r border-[#D1D1D6] cursor-pointer">
              Messages (0)
           </div>
           <div className="flex-1 bg-[#37A783] text-white text-[15px] font-[600] flex items-center justify-center cursor-pointer -ml-[1px]">
              Files (0)
           </div>
        </div>

        <div className="w-full h-px bg-[#E5E5EA]"></div>
      </div>

      {/* 2. Empty Search Resolution Content Viewport */}
      {/* Absolute positioning mapping relative to parent boundaries minus fixed spaces avoids heavy flex distortion below */}
      <div className="flex-1 w-full bg-white flex flex-col items-center pt-[15vh]">
         {/* Confused / Empty Indicator Face */}
         <span className="text-[48px] leading-none mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">🙁</span>
         
         <p className="text-[#C7C7CC] text-[19px] tracking-tight px-10 text-center leading-[1.3]">
            No results for “today from:me has:star ”
         </p>
         
         <button onClick={() => window.location.hash = 'page=page-23'} className="mt-7 min-w-[260px] px-8 h-[44px] bg-white border border-[#C7C7CC] rounded-[4px] text-[16px] font-[500] text-[#8E8E93] tracking-tight active:bg-gray-50 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer">
            Start a New Search
         </button>
      </div>

      {/* 3. Native iOS T9 Keyboard Module (Occupying Absolute Bottom height space) */}
      <div className="w-full bg-[#D1D3D9] flex flex-col pb-6 relative z-40 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        
        {/* Autocomplete Bar - Voided state during inline token search */}
        <div className="flex h-[42px] items-center border-[0.5px] border-black/10 bg-[#D1D3D9]">
          <div className="flex-1 h-[60%] border-r border-[#8E8E93]/40"></div>
          <div className="flex-1 h-[60%] border-r border-[#8E8E93]/40"></div>
          <div className="flex-1 h-[60%]"></div>
        </div>
        
        {/* Key Roster Maps - Enforced Lowercase strictly on Search */}
        <div className="px-1.5 pt-[10px] pb-2 flex flex-col gap-[12px]">
          
          {/* Row 1 */}
          <div className="flex justify-center gap-[6px]">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black">{k}</div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-center gap-[6px] px-[18px]">
            {['a','s','d','f','g','h','j','k','l'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black">{k}</div>
            ))}
          </div>
          
          {/* Row 3 - Contains Functional Modifiers */}
          <div className="flex justify-between gap-[6px] px-0.5">
            {/* Shift Key INACTIVE State (Grey Background with Outline Arrow) */}
            <div className="w-[42px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8">
                 <path d="M2 13L12 3L22 13H16.5V20.5H7.5V13H2Z" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <div className="flex flex-1 justify-center gap-[6px]">
              {['z','x','c','v','b','n','m'].map(k => (
                <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black max-w-[32px]">{k}</div>
              ))}
            </div>

            {/* Backspace Key */}
            <div className="w-[42px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center pr-0.5">
               <svg width="22" height="18" viewBox="0 0 26 20" fill="none" stroke="black" strokeWidth="1.6">
                 <path d="M9 2 L24 2 A2 2 0 0 1 26 4 L26 16 A2 2 0 0 1 24 18 L9 18 L2 10 Z" strokeLinejoin="round" />
                 <path d="M13 7 L19 13 M19 7 L13 13" strokeLinecap="round" strokeWidth="1.4"/>
               </svg>
            </div>
          </div>

          {/* Row 4 - Search Return Key Swap */}
          <div className="flex justify-between gap-[6px] px-0.5">
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#8E8E93] text-[16px] text-black pb-0.5 font-[400] tracking-tight">123</div>
            <div className="flex-1 h-[42px] bg-[#FFFFFF] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#8E8E93] text-[16px] text-black pb-0.5 font-[400] tracking-tight">space</div>
            {/* Search Key overriding Return Key logic natively */}
            <div className="w-[88px] h-[42px] bg-[#188CF5] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#0D6BAE] text-[16px] text-white tracking-tight pb-0.5 font-[400]">
               Search
            </div>
          </div>
        </div>

        {/* Global Keyboards Exts (Globe & Voice input) */}
        <div className="flex justify-between items-center px-[22px] pt-1 pb-0">
           <Globe size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
           <Mic size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
        </div>

      </div>

      {/* Global iOS Home Indicator overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-50 pointer-events-none opacity-80"></div>

    </div>
  );
}
