import React from 'react';
import { 
  Signal, Navigation, Volume2, Phone, MicOff
} from 'lucide-react';
import './style.css';
import vikingAvatar from './viking_avatar.png';

/**
 * @name Slack Outgoing Call Screen
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-transparent sticky top-0 z-20">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[13px] font-medium tracking-tight text-white">
          <div className="flex items-center gap-1">
            <span>7:49</span>
            <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
          </div>
          <div className="flex items-center gap-1.5">
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

        {/* Top Floating Target Identity */}
        <div className="flex flex-col items-center justify-center mt-2.5 h-[44px]">
          <span className="font-semibold text-[15px] tracking-tight text-white">huang</span>
          <span className="text-[13.5px] text-[#A1A1AA] mt-0.5 tracking-tight">Calling...</span>
        </div>
      </div>

      {/* 2. Main Center Area (Avatar) */}
      <div className="flex flex-col flex-1 items-center justify-center -mt-[110px]">
        
        {/* Giant Caller Avatar Container */}
        <div className="relative w-[240px] h-[240px] rounded-[38px] overflow-hidden mb-6 bg-[#A1A1AA]">
          {/* We emulate the viking image by sourcing the generated asset */} 
          <img 
            src={vikingAvatar} 
            alt="Huang" 
            className="w-full h-full object-cover scale-105" 
          />
          
          {/* Overlaid iOS style Daisy Wheel Spinner */}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            
            <div className="relative w-[40px] h-[40px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 -ml-[1.5px] w-[3px] h-[11px] bg-white rounded-[2px] spinner-bar"
                  style={{
                    transformOrigin: '50% 20px',
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${(i * 0.1)}s` 
                  }}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Text underneath the avatar */}
        <h1 className="text-[22px] font-bold text-white mb-[5px] tracking-tight">huang</h1>
        <p className="text-[16px] text-[#A1A1AA] tracking-tight">Calling...</p>

      </div>

      {/* 3. Call Controls (Bottom Absolute Area) */}
      <div className="absolute bottom-[75px] w-full px-12 flex items-center justify-between z-30">
         
         {/* Speaker Toggle */}
         <div className="flex flex-col items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full bg-white/5 border-[1.5px] border-white/25 flex items-center justify-center cursor-pointer backdrop-blur-md">
               <Volume2 size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="text-[14px] text-white tracking-tight">Speaker</span>
         </div>

         {/* Leave Call (Hang Up) */}
         <div className="flex flex-col items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full bg-[#E02636] flex items-center justify-center cursor-pointer shadow-md">
               <Phone size={34} className="text-white transform rotate-[135deg]" strokeWidth={1.5} fill="currentColor" />
            </div>
            <span className="text-[14px] text-white tracking-tight">Leave Call</span>
         </div>

         {/* Mute Toggle */}
         <div className="flex flex-col items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full bg-white/5 border-[1.5px] border-white/25 flex items-center justify-center cursor-pointer backdrop-blur-md">
               <MicOff size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <span className="text-[14px] text-white tracking-tight">Mute</span>
         </div>

      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
