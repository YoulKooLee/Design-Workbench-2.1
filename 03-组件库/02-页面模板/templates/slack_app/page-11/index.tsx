import React from 'react';
import { 
  Signal, Navigation, X
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Activity Empty State
 */
export default function SlackApp() {

  const Sparkle = ({ top, left, opacity=0.5, size=8 }: any) => (
    <div className="absolute text-[#D1D1D6]" style={{ top, left, opacity }}>
       <svg width={size} height={size} viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
         <line x1="4" y1="0" x2="4" y2="8" strokeLinecap="round" />
         <line x1="0" y1="4" x2="8" y2="4" strokeLinecap="round" />
       </svg>
    </div>
  );

  const GreenAvatar = () => (
    <svg viewBox="0 0 32 32" className="w-full h-full rounded-full bg-[#7DC6B2]">
      {/* Shirt */}
      <path d="M10 32 Q16 26 22 32" fill="#5F88A0" />
      {/* Hair base */}
      <path d="M9 16 Q16 4 23 16 V24 Q16 28 9 24 Z" fill="#F2DF8E" />
      {/* Face */}
      <ellipse cx="16" cy="18" rx="6.5" ry="7.5" fill="#FDE1CB" />
      {/* Eyes (smiling closed eyes) */}
      <path d="M13 18 Q14 17 15 18" stroke="#1D1C1D" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M17 18 Q18 17 19 18" stroke="#1D1C1D" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Mouth */}
      <path d="M15 22 Q16 23 17 22" stroke="#1D1C1D" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );

  const Smiley = () => (
    <svg viewBox="0 0 32 32" className="w-full h-full rounded-full bg-[#FFD13B]">
      {/* Eyes */}
      <circle cx="11" cy="12" r="2.5" fill="#1D1C1D" />
      <circle cx="21" cy="12" r="2.5" fill="#1D1C1D" />
      {/* Mouth */}
      <path d="M10 19 Q16 25 22 19" stroke="#1D1C1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );

  const OrangeAvatar = () => (
    <svg viewBox="0 0 40 40" className="w-full h-full rounded-full bg-[#F0AC88]">
      {/* Shirt */}
      <path d="M8 40 Q20 28 32 40" fill="#FFFFFF" />
      {/* Face & Head */}
      <ellipse cx="20" cy="22" rx="9" ry="10" fill="#B47A5A" />
      {/* Hair */}
      <path d="M11 20 Q20 10 29 20 L28 16 Q20 5 12 16 Z" fill="#3D291F" />
      {/* Glasses */}
      <circle cx="16" cy="21" r="3.2" fill="none" stroke="#1D1C1D" strokeWidth="1.5" />
      <circle cx="24" cy="21" r="3.2" fill="none" stroke="#1D1C1D" strokeWidth="1.5" />
      <line x1="19.2" y1="21" x2="20.8" y2="21" stroke="#1D1C1D" strokeWidth="1.5" />
      {/* Smile */}
      <path d="M18 26 Q20 28 22 26" fill="#FFFFFF" stroke="#1D1C1D" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white text-gray-900 font-sans shadow-2xl relative select-none">
      
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
          <div className="absolute left-4">
             <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1" strokeWidth={1.5} />
          </div>
          <div className="w-full flex justify-center mt-0.5">
             <span className="font-bold text-[17px] tracking-[0.01em] text-black">Activity</span>
          </div>
        </div>
      </div>

      {/* 2. Empty State Content Area */}
      <div className="flex flex-col flex-1 items-center justify-center -mt-10">
        
        {/* Abstract Illustration Graphic */}
        <div className="relative w-[180px] h-[130px] mx-auto mb-[22px]">
          
          {/* Sparkles / Plus signs */}
          <Sparkle top="2%" left="50%" opacity={0.6} />
          <Sparkle top="35%" left="96%" opacity={0.4} />
          <Sparkle top="60%" left="100%" opacity={0.5} size={10} />
          <Sparkle top="55%" left="0%" opacity={0.5} size={10} />
          <Sparkle top="90%" left="60%" opacity={0.5} />
          
          {/* Green Avatar (Top Left) */}
          <div className="absolute top-[20px] left-[18px] w-[28px] h-[28px] shadow-sm rounded-full">
            <GreenAvatar />
          </div>
          
          {/* Yellow Smiley (Top Right) */}
          <div className="absolute top-[12px] left-[90px] w-[28px] h-[28px] shadow-sm rounded-full">
            <Smiley />
          </div>

          {/* Large Slack @ Circle (Center Overlap) */}
          <div className="absolute top-[40px] left-[40px] w-[50px] h-[50px] rounded-full bg-[#D1105A] flex items-center justify-center shadow-sm z-10">
            <span className="text-white text-[32px] font-bold leading-none mt-1 tracking-tight">@</span>
          </div>

          {/* Orange Avatar (Bottom Right) */}
          <div className="absolute top-[48px] left-[108px] w-[40px] h-[40px] shadow-sm rounded-full">
            <OrangeAvatar />
          </div>

        </div>

        {/* Messaging Text */}
        <p className="text-[17px] text-[#A1A1AA] text-center px-10 leading-[1.3] font-normal tracking-tight">
          One day, this will be filled with mentions and reactions<br />just for you.
        </p>

      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
