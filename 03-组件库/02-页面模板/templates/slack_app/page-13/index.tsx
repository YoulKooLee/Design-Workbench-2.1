import React from 'react';
import { 
  Signal, Navigation, ChevronLeft, Plus, Search
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Apps List Empty State
 */
export default function SlackApp() {

  const RobotIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full rounded-full overflow-hidden shadow-sm border border-black/5 bg-[#FAFAFA]">
      <rect width="100" height="100" fill="#796B9E" />
      
      {/* Antenna Pole */}
      <rect x="49" y="16" width="2" height="22" fill="#75B8D1" />
      {/* Antenna Ball */}
      <circle cx="50" cy="16" r="4.5" fill="#F4CF68" />

      {/* Ears */}
      <rect x="20" y="46" width="8" height="12" rx="2" fill="#9CA0A6" />
      <rect x="72" y="46" width="8" height="12" rx="2" fill="#9CA0A6" />

      {/* Head */}
      <rect x="24.5" y="38" width="51" height="26" rx="2.5" fill="#DDE0E3" />
      
      {/* Eyes */}
      <circle cx="39" cy="48" r="6" fill="#1C1E21" />
      <circle cx="40.5" cy="46.5" r="1.5" fill="#FFFFFF" />
      <circle cx="61" cy="48" r="6" fill="#1C1E21" />
      <circle cx="62.5" cy="46.5" r="1.5" fill="#FFFFFF" />

      {/* Mouth */}
      <path d="M46 55 Q50 59 54 55" fill="none" stroke="#1C1E21" strokeWidth="2.5" strokeLinecap="round" />

      {/* Neck */}
      <rect x="42" y="64" width="16" height="6" fill="#B4B7BC" />

      {/* Body */}
      <circle cx="50" cy="116" r="46" fill="#D1D4D8" />
      
      {/* Buttons */}
      <circle cx="50" cy="78" r="2.5" fill="#EE586D" />
      <circle cx="50" cy="90" r="2.5" fill="#EE586D" />
    </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#FAFAFA] text-gray-900 font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-20 shadow-[0_1px_0_0_#E5E5EA]">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
          <div className="flex items-center gap-1">
            <span>7:49</span>
            <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
          </div>
          <div className="flex items-center gap-1.5">
            <Signal size={14} fill="currentColor" strokeWidth={1} />
            <span className="text-[12px] font-bold">4G</span>
            <div className="relative">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-2">
                <rect x="1" y="2" width="20" height="8" rx="2" />
                <path d="M23 4 V8" strokeLinecap="round" />
              </svg>
              <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-black rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Top App Header */}
        <div className="flex items-center justify-between px-2 h-[44px] relative">
          <div className="absolute left-[8px] flex items-center cursor-pointer pt-0.5" onClick={() => window.history.back()}>
<ChevronLeft size={28} className="text-[#007AFF] -mr-1" strokeWidth={2.5} />
             <span className="text-[17px] text-[#007AFF] tracking-tight">Back</span>
          </div>
          <div className="w-full flex justify-center mt-1">
             <span className="font-bold text-[17px] tracking-tight text-black">Apps in huang</span>
          </div>
          <div className="absolute right-4 mt-0.5 flex items-center gap-[18px]">
             <span className="text-[17px] text-[#8E8E93] cursor-pointer tracking-tight">Edit</span>
             <Plus size={26} className="text-[#007AFF] cursor-pointer" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* 2. Top Search Bar */}
      <div className="px-3 pt-3 pb-3 bg-[#FAFAFA] z-10 w-full">
         <div className="w-full bg-white border border-[#E5E5EA] h-[36px] rounded-[10px] flex items-center px-1.5 shadow-sm">
            <Search size={18} className="text-[#A1A1AA] ml-1" />
            <span className="text-[17px] text-[#A1A1AA] ml-[6px] leading-none mt-px font-normal tracking-tight">Search</span>
         </div>
      </div>

      {/* 3. Main Empty State Content Area */}
      <div className="flex flex-col flex-1 items-center justify-center -mt-24">
        
        {/* Robot Illustration */}
        <div className="w-[100px] h-[100px] mx-auto mb-[22px]">
           <RobotIcon />
        </div>

        {/* Messaging Text */}
        <p className="text-[17px] text-[#8E8E93] text-center px-6 leading-[1.3] font-normal tracking-tight">
          There are no apps in this conversation yet.
        </p>

      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
