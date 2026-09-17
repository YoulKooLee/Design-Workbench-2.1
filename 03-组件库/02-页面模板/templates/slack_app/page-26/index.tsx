import React from 'react';
import { 
  X, Star, ChevronRight, Pin 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Direct Message Settings Modal
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F2F2F7] font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Global iOS Status Bar & Header Container */}
      <div className="bg-white sticky top-0 z-20 shadow-[0_0.5px_0_#E5E5EA]">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-4 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black">
          <div className="flex items-center">
            <span className="font-semibold text-[14px] leading-none ml-1 tracking-wider">7:44</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1 -mt-0.5" stroke="currentColor" strokeWidth="2">
              <path d="M 22 2 L 2 22 L 22 22 Z" stroke="none" fill="black" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1">
                <rect x="1" y="16" width="3" height="4" rx="1" />
                <rect x="6" y="12" width="3" height="8" rx="1" />
                <rect x="11" y="8" width="3" height="12" rx="1" />
                <rect x="16" y="4" width="3" height="16" rx="1" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight -ml-0.5">4G</span>
            <div className="relative transform scale-90 -mr-1">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1px]">
                <rect x="1" y="1" width="20" height="10" rx="3" fill="none" strokeWidth={1} />
                <path d="M22.5 4 V8" strokeLinecap="round" strokeWidth={1.5} />
              </svg>
              <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-black rounded-[1.5px]"></div>
            </div>
          </div>
        </div>

        {/* Top App Header */}
        <div className="flex justify-between items-center px-4 h-[44px]">
          <X size={26} className="text-[#1D1C1D] cursor-pointer -ml-1 opacity-80" strokeWidth={1.5} />
          
          <span className="font-bold text-[17px] tracking-wide text-black relative left-px pb-px">Direct Message</span>
          
          <Star size={24} className="text-[#1D1C1D] cursor-pointer -mr-1 opacity-80" strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
         
         {/* Group 1: Profile Main Plate */}
         <div className="w-full bg-white border-y ios-border mt-[32px] flex items-center pr-4 transition-colors cursor-pointer active:bg-gray-50">
            {/* Custom Slackbot Avatar Replication */}
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] rounded-[10px] ml-4 mr-[14px] my-3 ml-3 overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" xmlns="http://www.w3.org/2000/svg">
               {/* 4 Quadrants Background */}
               <path d="M0 0 h50 v50 h-50 z" fill="#36C5F0" />
               <path d="M50 0 h50 v50 h-50 z" fill="#2EB67D" />
               <path d="M0 50 h50 v50 h-50 z" fill="#E01E5A" />
               <path d="M50 50 h50 v50 h-50 z" fill="#ECB22E" />
               
               {/* Center Mask Shape representing Slackbot's face/body */}
               <path d="M 12 50 C 12 85, 30 100, 50 100 C 70 100, 88 85, 88 50 C 88 20, 65 15, 50 25 C 35 15, 12 20, 12 50 Z" fill="white" />
               
               {/* Eyes */}
               <circle cx="34" cy="45" r="8" fill="#52392E" />
               <circle cx="37" cy="42" r="2.5" fill="white" />
               <circle cx="66" cy="45" r="8" fill="#52392E" />
               <circle cx="69" cy="42" r="2.5" fill="white" />
               
               {/* Smile */}
               <path d="M 40 60 C 45 68, 55 68, 60 60" fill="none" stroke="#52392E" strokeWidth="5.5" strokeLinecap="round" />
            </svg>
            
            {/* Details & Arrow */}
            <div className="flex-1 flex justify-between items-center py-2.5">
               <div className="flex flex-col pt-0.5">
                  <div className="flex items-center gap-[6px] mb-[3px]">
                     <span className="text-[17px] font-[700] text-[#1D1C1D] tracking-tight leading-none mt-[1px]">Slackbot</span>
                     <span className="text-[#2BAC76] text-[12px] leading-none mt-[2px] opacity-90">❤</span>
                  </div>
                  <span className="text-[15px] text-[#8E8E93] font-normal tracking-tight leading-none">Slackbot</span>
               </div>
               <ChevronRight size={20} className="text-[#C7C7CC] opacity-80" strokeWidth={2} />
            </div>
         </div>

         {/* Group 2: Action Row (Close DM) */}
         <div className="w-full bg-white border-y ios-border mt-[32px] flex items-center pr-4 pl-4 h-[44px] transition-colors cursor-pointer active:bg-gray-50">
            {/* Log Out Custom Icon replication */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#48484A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
               <path d="M 11 20 H 7 a 2 2 0 0 1 -2 -2 V 6 a 2 2 0 0 1 2 -2 h 4" />
               <polyline points="15 16 20 12 15 8" />
               <line x1="20" y1="12" x2="8" y2="12" />
            </svg>
            <div className="flex-1 ml-[14px] flex justify-between items-center h-full">
                <span className="text-[17px] text-[#1D1C1D] tracking-tight font-normal pb-px">Close DM</span>
            </div>
         </div>

         {/* Group 3: Action Row (Pinned) */}
         <div className="w-full bg-white border-y ios-border mt-[32px] flex items-center pr-4 pl-4 h-[44px] transition-colors cursor-pointer active:bg-gray-50">
            <Pin size={21} className="text-[#E8732A] rotate-45 transform ml-0.5 opacity-90" strokeWidth={1.8} />
            <div className="flex-1 ml-[14px] flex justify-between items-center h-full">
                <span className="text-[17px] text-[#1D1C1D] tracking-tight font-normal pb-px">Pinned</span>
                <ChevronRight size={20} className="text-[#C7C7CC] opacity-80" strokeWidth={2} />
            </div>
         </div>

      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#111] rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
