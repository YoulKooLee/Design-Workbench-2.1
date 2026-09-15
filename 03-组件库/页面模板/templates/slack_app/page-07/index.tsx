import React from 'react';
import { 
  X, MessageSquare, Star, CornerUpRight, MoreHorizontal 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack File Viewer Modal
 */
export default function SlackApp() {

  const MockSlide = () => (
    <div className="flex-1 bg-white flex flex-col p-2 m-0.5 shadow-sm relative pt-4 pb-2">
      <div className="w-full text-center text-[5px] font-bold text-black mb-2 uppercase tracking-wide leading-none">THE PASSION</div>
      <div className="text-[4px] text-blue-600 font-bold mb-[1.5px] uppercase tracking-wide">THE BASIC FOUNDATION</div>
      <div className="text-[3px] text-gray-500 w-[60%] leading-tight mb-2.5">
        Learn how successful companies works step by step to avoid losing your money and time.
      </div>
  
      <div className="w-full h-[0.5px] bg-gray-300 mb-2 mt-0.5"></div>
  
      <div className="flex mb-1 gap-2">
         <div className="w-1/3 pb-1">
            <div className="text-[3px] text-blue-600 font-bold mb-[1px] uppercase border-b-[0.5px] border-blue-600 inline-block pb-0.5 pr-2">Session options</div>
            <div className="text-[2.5px] text-gray-700 font-bold mt-1.5 mb-1 uppercase">BRANDING/MARKETING</div>
            <div className="text-[2px] text-gray-400 leading-tight pr-1">Learn how to develop a unique and memorable brand experience.</div>
         </div>
         <div className="w-1/3 pt-[9.5px]">
            <div className="text-[2.5px] text-gray-700 font-bold mb-1 uppercase">PRODUCT MANAGEMENT</div>
            <div className="text-[2px] text-gray-400 leading-tight pr-1">Learn the secret methodology to be more productive and bring best result.</div>
         </div>
         <div className="w-1/3 pt-[9.5px]">
            <div className="text-[2.5px] text-gray-700 font-bold mb-1 uppercase">PLANNING & STRATEGY</div>
            <div className="text-[2px] text-gray-400 leading-tight pr-1">Learn how to create and bring branded products/services to appeal your customer.</div>
         </div>
      </div>
      
      <div className="w-full border border-blue-500/80 mt-auto h-[16px] mb-1"></div>
      
      {/* Tiny circle indicator in top right */}
      <div className="absolute top-2 right-2 w-[4px] h-[4px] border-[0.5px] border-gray-300 rounded-full flex items-center justify-center">
         <div className="w-[1.5px] h-[1.5px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none">
      
      {/* 1. Header Area with Avatar and Close Button */}
      <div className="flex justify-between items-start px-4 pt-14 pb-4 bg-black/80 z-20">
         <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-[36px] h-[36px] rounded-[4px] overflow-hidden flex-shrink-0 bg-white">
               <svg viewBox="0 0 40 40" className="w-full h-full bg-white">
                  <rect x="0" y="0" width="18" height="20" fill="#2EB67D" />
                  <rect x="0" y="20" width="40" height="20" fill="#36C5F0" />
                  <rect x="18" y="0" width="22" height="20" fill="#000000" />
               </svg>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-col justify-center gap-0.5">
               <div className="flex items-center gap-2 leading-none mt-[3px]">
                  <span className="font-bold text-[16px] text-white tracking-wide">EJ</span>
                  <span className="text-[13px] text-[#A1A1AA] pb-px">12:39 AM</span>
               </div>
               <span className="text-[14px] text-[#A1A1AA] leading-none mt-[3px]">Group 36.png</span>
            </div>
         </div>
         
         <X size={26} className="text-[#FAFAFA] cursor-pointer mt-1 font-light opacity-90" strokeWidth={1} />
      </div>

      {/* 2. Centered Image Viewer Area */}
      <div className="flex-1 flex flex-col justify-center w-full z-10 overflow-hidden">
         {/* Simulated Wide Image Strip */}
         <div className="w-full bg-[#f4f4f4] flex gap-px py-2 px-1 relative">
            <MockSlide />
            <MockSlide />
            <MockSlide />
         </div>
      </div>

      {/* 3. Bottom Actions Toolbar */}
      <div className="flex flex-col pb-8 z-20 bg-black/90">
         {/* Info Text */}
         <div className="px-4 mb-[18px]">
            <span className="text-[15px] text-[#A1A1AA]">This file hasn't been shared.</span>
         </div>
         
         {/* Separator Line */}
         <div className="w-full h-[0.5px] bg-[#333333]"></div>
         
         {/* Action Icons */}
         <div className="flex items-center justify-between px-4 pt-[18px] w-full">
            <MessageSquare size={24} className="text-[#FAFAFA] opacity-90" strokeWidth={1.5} />
            <div className="flex items-center gap-[30px]">
               <Star size={24} className="text-[#FAFAFA] opacity-90" strokeWidth={1.5} />
               <CornerUpRight size={24} className="text-[#FAFAFA] opacity-90" strokeWidth={1.5} />
               <MoreHorizontal size={24} className="text-[#FAFAFA] opacity-90" strokeWidth={1.5} />
            </div>
         </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-20 pointer-events-none opacity-90"></div>

    </div>
  );
}
