import React from 'react';
import { 
  Signal, Navigation, X, ChevronRight
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Set Status Modal
 */
export default function SlackApp() {

  const presets = [
    { emoji: "🗓️", text: "In a meeting", time: "1 Hour" },
    { emoji: "🚌", text: "Commuting", time: "30 Minutes" },
    { emoji: "🤒", text: "Out sick", time: "Today" },
    { emoji: "🌴", text: "Vacationing", time: "Don’t Clear" },
    { emoji: "🏡", text: "Working remotely", time: "Today" }
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F2F2F7] text-gray-900 font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-20">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
          <div className="flex items-center gap-1">
            <span>7:50</span>
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
        <div className="flex items-center justify-between px-4 h-[44px] relative border-b ios-border">
          <div className="w-full flex justify-center mt-1">
             <span className="font-bold text-[17px] tracking-tight text-black">Set Status</span>
          </div>
          <div className="absolute right-4 mt-0.5">
             <span className="text-[17px] text-[#007AFF] font-bold cursor-pointer">Done</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content (Scrollable Grouped List) */}
      <div className="flex flex-col flex-1 overflow-y-auto pb-[50px]">
        
        {/* Section 1: Active Status */}
        <div className="flex bg-white flex-col border-y ios-border mt-[38px] w-full">
          {/* Status Row */}
          <div className="flex items-center justify-between px-4 h-[52px] border-b ios-border">
            <div className="flex items-center w-full">
              <div className="w-[30px] flex justify-start -ml-1">
                 <span className="text-[22px]">🌴</span>
              </div>
              <span className="text-[17px] text-black pr-2 flex-1">Vacationing</span>
            </div>
            
            <div className="w-[18px] h-[18px] bg-[#9A9A9E] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0" onClick={() => window.history.back()}>
<X size={12} strokeWidth={3} className="text-white relative top-[0.5px]" />
            </div>
          </div>
          
          {/* Options Row */}
          <div className="flex items-center justify-between px-4 h-[52px]">
            <span className="text-[17px] text-black">Clear after...</span>
            <div className="flex items-center gap-[6px]">
              <span className="text-[17px] text-[#8E8E93] tracking-tight">Don’t Clear</span>
              <ChevronRight size={20} className="text-[#C7C7CC] -mr-1.5" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Section 2: Presets */}
        <div className="flex bg-white flex-col border-y ios-border mt-[34px] w-full">
          {presets.map((item, i) => (
             <div key={i} className="flex relative h-[52px]">
                {/* Left icon wrapper */}
                <div className="w-[52px] h-full flex items-center justify-center flex-shrink-0">
                   <span className="text-[22px] -ml-1">{item.emoji}</span>
                </div>
                
                {/* Right content with bottom border */}
                <div className={`flex-1 flex items-center pr-4 ${i !== presets.length - 1 ? 'border-b ios-border' : ''}`}>
                   <span className="text-[17px] text-black mr-[6px] tracking-tight">{item.text}</span>
                   <span className="text-[17px] text-[#8E8E93] tracking-tight">— &nbsp;{item.time}</span>
                </div>
             </div>
          ))}
        </div>

      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
