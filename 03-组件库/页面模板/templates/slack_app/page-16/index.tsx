import React from 'react';
import { 
  Signal, Navigation, ArrowUp, X, Globe, Mic,
  AtSign, Paperclip, Image
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Composer with iOS Keyboard
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#1C1C1E] text-black font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar Container */}
      <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-white z-20">
        <div className="flex items-center gap-1 drop-shadow-md">
          <span>7:49</span>
          <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
        </div>
        <div className="flex items-center gap-1.5 drop-shadow-md">
          <Signal size={14} fill="currentColor" strokeWidth={1} />
          <span className="text-[12px] font-bold">4G</span>
          <div className="relative">
            <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1.5]">
              <rect x="1" y="2" width="20" height="8" rx="2" />
              <path d="M23 4 V8" strokeLinecap="round" />
            </svg>
            <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-white rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* 2. Main White Overlay Modal (Slide-up effect) */}
      <div className="flex flex-col bg-white w-full flex-1 mt-[48px] rounded-t-[14px] shadow-lg relative overflow-hidden">
        
        {/* Collapse (Minimize) Icon - Right Corner */}
        <div className="absolute top-[14px] right-[10px] cursor-pointer p-2">
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="4 14 10 14 10 20" />
               <polyline points="20 10 14 10 14 4" />
               <line x1="14" y1="10" x2="21" y2="3" />
               <line x1="3" y1="21" x2="10" y2="14" />
           </svg>
        </div>

        {/* Text Input Area */}
        <div className="px-[16px] pt-[45px] pb-4 flex-1 overflow-y-auto">
           <p className="text-[17px] text-black leading-[1.35] font-normal tracking-tight relative pr-2">
             John Cusack is rolling his eyes at critics, many of whom are apparent Trump supporters, who called him unpatriotic for seemingly staying seated during a military salute.<span className="inline-block w-[2px] h-[19px] bg-[#007AFF] translate-y-1 ml-0.5"></span>
           </p>
        </div>

        {/* Toolbar Container */}
        <div className="flex items-center justify-between px-3 py-[9px] bg-white w-full border-t border-transparent z-10">
           {/* Left Controls */}
           <div className="flex items-center gap-[18px] pl-1">
              <AtSign size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              
              {/* Box with diagonal slash for shortcuts formatting */}
              <div className="relative w-[21px] h-[21px] rounded-[4px] border-[1.5px] border-[#9B9B9E] flex items-center justify-center overflow-hidden">
                 <div className="w-[1.5px] h-[26px] bg-[#9B9B9E] rotate-[32deg]"></div>
              </div>
              
              <Paperclip size={21} className="text-[#9B9B9E] transform -rotate-45 relative top-0.5" strokeWidth={1.5} />
           </div>

           {/* Right Payload Controls */}
           <div className="flex items-center gap-[16px]">
              <Image size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              <div className="bg-[#2498F5] rounded-[5px] px-[12px] py-[6px] flex items-center justify-center cursor-pointer shadow-sm">
                 <span className="text-white text-[15px] font-bold tracking-tight">Send</span>
              </div>
           </div>
        </div>

      </div>

      {/* 3. iOS T9 Keyboard System Native Area */}
      <div className="w-full bg-[#D1D3D9] flex flex-col pb-4">
        
        {/* Autocomplete / Suggestions Bar */}
        <div className="flex h-[42px] items-center border-b border-[#A1A1AA]/50 bg-[#CCD0D6]">
          <div className="flex-1 text-center text-[16px] text-black border-r border-[#A1A1AA]/50 h-[60%] flex items-center justify-center font-[400] tracking-tight">Hello</div>
          <div className="flex-1 text-center text-[16px] text-black border-r border-[#A1A1AA]/50 h-[60%] flex items-center justify-center font-[400] tracking-tight">The</div>
          <div className="flex-1 text-center text-[16px] text-black h-[60%] flex items-center justify-center"></div>
        </div>
        
        {/* Keys Container */}
        <div className="px-1.5 pt-[10px] pb-2 flex flex-col gap-[11px]">
          
          {/* Row 1 */}
          <div className="flex justify-center gap-[5px]">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
              <div key={k} className="w-[32px] h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#999BA0] flex items-center justify-center font-normal text-[22px] pb-[3px]">{k}</div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-center gap-[5px]">
            <div className="w-[16px]"></div> {/* spacer for indentation */}
            {['a','s','d','f','g','h','j','k','l'].map(k => (
              <div key={k} className="w-[32px] h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#999BA0] flex items-center justify-center font-normal text-[22px] pb-[3px]">{k}</div>
            ))}
            <div className="w-[16px]"></div>
          </div>
          
          {/* Row 3 */}
          <div className="flex justify-between gap-[5px] px-0.5">
            <div className="w-[42px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_#999BA0] flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="0">
                 <path d="M2 13L12 3L22 13H16.5V20.5H7.5V13H2Z" fill="none" strokeWidth="1.8" strokeLinejoin="round"/>
               </svg>
            </div>
            {['z','x','c','v','b','n','m'].map(k => (
              <div key={k} className="w-[32px] h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#999BA0] flex items-center justify-center font-normal text-[22px] pb-[3px]">{k}</div>
            ))}
            <div className="w-[42px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_#999BA0] flex items-center justify-center">
               <svg width="22" height="18" viewBox="0 0 26 20" fill="none" stroke="black" strokeWidth="1.6">
                 <path d="M9 2 L24 2 A2 2 0 0 1 26 4 L26 16 A2 2 0 0 1 24 18 L9 18 L2 10 Z" strokeLinejoin="round" />
                 <path d="M13 7 L19 13 M19 7 L13 13" strokeLinecap="round" strokeWidth="1.4"/>
               </svg>
            </div>
          </div>

          {/* Row 4 (Space) */}
          <div className="flex justify-between gap-[5px] px-0.5">
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#999BA0] text-[16px] text-black pb-0.5 font-[400] tracking-tight">123</div>
            <div className="flex-1 h-[42px] bg-[#FFFFFF] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#999BA0] text-[16px] text-black pb-0.5 font-[400] tracking-tight">space</div>
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#999BA0] text-[16px] text-black tracking-tight pb-0.5 font-[400]">return</div>
          </div>
        </div>

        {/* Bottom Globe and Mic Layer */}
        <div className="flex justify-between items-center px-[22px] pt-2 pb-6">
           <Globe size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
           <Mic size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
        </div>

      </div>

      {/* Primary iOS Home Indicator Overlayed softly matching exact margin */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
