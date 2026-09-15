import React from 'react';
import { 
  Signal, Navigation, X, Star
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Starred Items Empty State
 */
export default function SlackApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white text-gray-900 font-sans shadow-2xl relative select-none">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-20">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
          <div className="flex items-center gap-1">
            <span>7:51</span>
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
          <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1 z-10" strokeWidth={1.5} />
          
          <div className="absolute inset-0 flex items-center justify-center z-0 pt-0.5">
             <span className="font-bold text-[17px] tracking-[0.01em] text-black">Starred Items</span>
          </div>
        </div>
      </div>

      {/* 2. Empty State Content */}
      <div className="flex flex-col flex-1 items-center justify-center -mt-20">
         <Star 
           size={100} 
           strokeWidth={2} 
           className="text-[#D1D1D6] mb-[22px] stroke-[2px] opacity-80" 
           strokeLinecap="round" 
           strokeLinejoin="round" 
         />
         <h2 className="text-[22px] font-bold text-[#C7C7CC] mb-[12px] tracking-tight">
           No starred items
         </h2>
         <p className="text-[17px] text-[#C7C7CC] text-center px-8 leading-[1.35] tracking-tight font-normal">
           Here you’ll find a continuously updated list of<br />items you have starred in Slack.
         </p>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
