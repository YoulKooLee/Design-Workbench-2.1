import React from 'react';
import { 
  Signal, Navigation, HelpCircle, Plus,
  User, Link2Off, BellOff 
} from 'lucide-react';
import './style.css';
import vikingAvatar from '../page-14/viking_avatar.png';

/**
 * @name Slack Workspaces Drawer Navigation
 */
export default function SlackApp() {

  return (
    <div className="flex w-full max-w-md h-screen mx-auto bg-black font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Underlying App (Right side offset display) */}
      <div className="absolute inset-0 z-0 bg-[#FAFAFA] flex flex-col">
        {/* Underlying Header (Dark) */}
        <div className="w-full h-[88px] bg-[#353538] flex items-end justify-end px-3 pb-3"></div>
        {/* Underlying UI Feed & Avatars */}
        <div className="w-full h-[calc(100vh-88px)] flex flex-col pl-[83%] pt-[10px]">
           <div className="border-b border-[#E5E5EA] w-full pb-[18px]">
              <p className="text-[14px] text-[#A1A1A5] font-sans tracking-tight leading-[1.3] pt-1">Fee...<br/>Ho...</p>
           </div>
           <div className="border-b border-[#E5E5EA] w-full pt-[14px] pb-[16px]">
              <p className="text-[14px] text-[#A1A1A5] font-sans tracking-tight leading-[1.3]">By ...<br/>wit...</p>
           </div>
           
           <div className="w-full pt-[22px] pb-[22px] flex flex-col gap-[20px] items-center pr-3 border-b border-[#E5E5EA]">
              <User size={18} className="text-[#0E8A63]" strokeWidth={2} />
              <Link2Off size={18} className="text-[#E02636]" strokeWidth={2} />
              
              {/* Viking Artifact locally imported to maintain the 1:1 image rules */}
              <img src={vikingAvatar} className="w-[30px] h-[30px] rounded-[5px] object-cover" />
              
              {/* Fake generic Avatars to fill out the channel list */}
              <div className="w-[30px] h-[30px] rounded-[5px] bg-[#CD2A47] relative overflow-hidden flex items-end justify-center">
                  <div className="w-[20px] h-[20px] bg-[#E9566E] rounded-full -mb-3 relative left-1.5"></div>
                  <div className="w-[6px] h-[6px] bg-black rounded-full absolute top-[6px] right-[4px]"></div>
              </div>
              <div className="w-[30px] h-[30px] rounded-[5px] bg-[#CD2A47] relative overflow-hidden flex items-end justify-center">
                  <div className="w-[20px] h-[20px] bg-[#E9566E] rounded-full -mb-3 relative left-1.5"></div>
                  <div className="w-[6px] h-[6px] bg-black rounded-full absolute top-[6px] right-[4px]"></div>
              </div>
           </div>

           <div className="w-full py-[22px] flex flex-col gap-[18px] items-center pr-3">
              <span className="font-bold text-[18px] text-black">@</span>
              <span className="font-normal text-[18px] text-[#A1A1A5]">@</span>
           </div>
        </div>
      </div>

      {/* 2. Slide-out Drawer Panel (Takes 83% width logic) */}
      <div className="absolute top-0 left-0 w-[83%] h-[100%] bg-[#483949] drawer-shadow z-20 flex flex-col">
        
        {/* Drawer Header Region (Tints into the status bar area) */}
        <div className="w-full h-[88px] bg-[#3F2E40] flex items-end px-[18px] pb-[10px] box-border border-b border-black/10">
           <div className="w-full flex items-center justify-between pb-1">
              <HelpCircle size={22} className="text-[#A99FA9]" strokeWidth={1.5} />
              <h1 className="text-white font-bold text-[17px] tracking-tight ml-[14px]">Workspaces</h1>
              <span className="text-[16.5px] text-[#B1A6B3] tracking-tight font-normal">Edit</span>
           </div>
        </div>

        {/* Drawer Workspaces Item List */}
        <div className="flex-1 w-full pt-1">
           
           {/* Item 1: Active Workspace "UI8" */}
           <div className="w-full flex items-center py-[17px] relative">
              <div className="absolute left-0 w-[5px] h-[46px] bg-white rounded-r-[3px]"></div>
              
              <div className="pl-[16px] pr-[14px]">
                 <div className="relative w-[52px] h-[52px] rounded-[10px] bg-[#2E2430] flex items-center justify-center">
                    
                    {/* Simulated "UI" Hexagon Logo Shape */}
                    <div 
                       className="w-[30px] h-[34px] bg-white flex items-center justify-center font-[800] text-black text-[13px] tracking-tighter" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    >
                       UI
                    </div>

                    {/* Unread / Notification Complex */}
                    <div className="absolute -top-[5px] -right-[5px] flex flex-col items-center">
                       {/* Floating White Dot Overlay */}
                       <div className="absolute -top-1 -right-0 w-[14px] h-[14px] bg-white rounded-full border-[2.5px] border-[#483949] z-10"></div>
                       {/* Blue Mentions Badge */}
                       <div className="absolute top-[3px] -right-1 px-1 min-w-[20px] h-[20px] bg-[#007AFF] text-white text-[12px] font-bold rounded-full flex items-center justify-center border-[2.5px] border-[#483949] shadow-sm z-0">
                         8
                       </div>
                    </div>

                 </div>
              </div>

              <div className="flex flex-col justify-center translate-y-[-1px]">
                 <span className="text-white text-[16px] font-bold tracking-tight mb-[2px]">UI8</span>
                 <span className="text-[#A99FA9] text-[13.5px] tracking-tight leading-none">ui8.slack.com</span>
              </div>
           </div>

           {/* Item 2: Add Workspaces Command */}
           <div className="w-full flex items-center py-[6px] relative">
              <div className="pl-[16px] pr-[14px]">
                 <div className="w-[52px] h-[52px] rounded-[10px] bg-[#3B2D3C] flex items-center justify-center border border-transparent">
                    <Plus size={28} className="text-white" strokeWidth={1.2} />
                 </div>
              </div>
              
              <div className="flex flex-col justify-center">
                 <span className="text-white text-[16px] font-medium tracking-tight">Add Workspaces</span>
              </div>
           </div>

        </div>

        {/* Pagination Dots Pill (Bottom anchored) */}
        <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 flex items-center gap-[7px] bg-black/15 px-[14px] py-[6px] rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
        </div>

      </div>

      {/* 3. Global iOS Status Bar - absolute top, spans full width z-40 */}
      <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-white z-40 pointer-events-none">
        <div className="flex items-center gap-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <span>7:46</span>
          <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
        </div>
        <div className="flex items-center gap-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
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

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-40 pointer-events-none drop-shadow-md"></div>

    </div>
  );
}
