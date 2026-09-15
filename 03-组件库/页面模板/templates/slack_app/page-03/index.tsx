import React from 'react';
import { 
  Signal, BatteryMedium, ChevronDown, Bell, Search, 
  MoreVertical, AtSign, Paperclip, Image as ImageIcon, 
  Maximize2, Navigation 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Channel System Messages
 */
export default function SlackApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden text-gray-900 font-sans shadow-2xl relative select-none">
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
        <div className="flex items-center gap-1">
          <span>7:53</span>
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

      {/* 2. Top App Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 mt-1">
        <div className="flex items-center gap-2">
          {/* Slack Hash Logo */}
          <div className="relative w-5 h-5 opacity-90">
            <div className="absolute top-[2px] left-[6px] w-[3px] h-[16px] bg-[#E01E5A] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[2px] right-[6px] w-[3px] h-[16px] bg-[#36C5F0] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[6px] left-[2px] w-[16px] h-[3px] bg-[#2EB67D] rounded-full -rotate-[15deg]"></div>
            <div className="absolute bottom-[6px] left-[2px] w-[16px] h-[3px] bg-[#ECB22E] rounded-full -rotate-[15deg]"></div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 font-medium text-[17px] mr-0.5">#</span>
            <span className="font-bold text-[17px] mr-1">designtools</span>
            <ChevronDown size={14} className="text-gray-500 ml-0.5" strokeWidth={2.5}/>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="relative">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute -top-1 -right-1.5 text-[9px] font-bold bg-white text-gray-600 px-[2px]">zZ</span>
          </div>
          <Search size={22} strokeWidth={2} />
          <MoreVertical size={22} strokeWidth={2} className="-mr-1" />
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-white flex flex-col pb-4">
        
        {/* Date: May 16th */}
        <div className="flex items-center mt-3 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">May 16th</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 1 */}
        <div className="flex px-4 mb-1">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-white rounded overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <rect x="0" y="0" width="20" height="20" fill="#E01E5A"/>
              <rect x="20" y="0" width="20" height="40" fill="white"/>
              <rect x="0" y="26" width="40" height="14" fill="#36C5F0"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Benoy Joseph</span>
              <span className="text-xs text-gray-400 font-medium">2:27 PM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-tight">
              joined #designtools along with <span className="mention">@domophysics</span> and <span className="mention">@Marcelo Ranieri</span>.
            </div>
          </div>
        </div>

        {/* Date: May 19th */}
        <div className="flex items-center mt-6 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">May 19th</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 2 */}
        <div className="flex px-4 mb-1">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-white rounded overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <rect x="0" y="0" width="15" height="40" fill="#ECB22E"/>
              <rect x="22" y="0" width="18" height="18" fill="#E01E5A" rx="9" stroke="white" strokeWidth="0" className="rounded-bl-none rounded-tr-none rounded-br-none rounded-tl-full"/>
              <path d="M 22 22 L 40 22 L 40 40 L 22 40 Z" fill="#E01E5A" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Abhay Raghuvanshi</span>
              <span className="text-xs text-gray-400 font-medium">12:33 AM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-tight">
              joined #designtools
            </div>
          </div>
        </div>

        {/* Date: May 20th */}
        <div className="flex items-center mt-6 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">May 20th</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 3 */}
        <div className="flex px-4 mb-1">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-white rounded overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-full h-full">
               <path d="M 0 0 L 15 0 L 15 15 L 0 15 Z" fill="#ECB22E" />
               <path d="M 0 22 C 0 32 15 32 15 40 L 0 40 Z" fill="#ECB22E" />
               <rect x="23" y="0" width="17" height="35" fill="#E01E5A" rx="4"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Andy Le</span>
              <span className="text-xs text-gray-400 font-medium">10:48 AM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-[1.3] pr-2">
              joined #designtools along with <span className="mention">@Jonathan</span> <span className="mention mt-0.5 inline-block">Godbout</span>.
            </div>
          </div>
        </div>

        {/* Date: May 21st */}
        <div className="flex items-center mt-6 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">May 21st</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 4 */}
        <div className="flex px-4 mb-1">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
            {/* Photo Avatar Placeholder matching context */}
            <img src="https://images.unsplash.com/photo-1549471013-3364d7220b75?auto=format&fit=crop&q=80&w=100" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Juno</span>
              <span className="text-xs text-gray-400 font-medium">4:25 AM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-tight">
              joined #designtools along with <span className="mention">@Ryan Robinson</span> and <span className="mention">@Diego Gonçalves</span>.
            </div>
          </div>
        </div>

        {/* Date: Yesterday */}
        <div className="flex items-center mt-6 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">Yesterday</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 5 */}
        <div className="flex px-4 mb-1">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-white rounded overflow-hidden">
             <svg viewBox="0 0 40 40" className="w-full h-full">
               <path d="M 0 0 C 20 0 40 0 40 12 L 0 12 Z" fill="#2EB67D" />
               <rect x="0" y="16" width="16" height="15" fill="#ECB22E" />
               <path d="M 24 16 L 40 16 L 40 30 C 30 30 24 24 24 16 Z" fill="#ECB22E" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Szu</span>
              <span className="text-xs text-gray-400 font-medium">7:38 AM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-[1.3] pr-[5px]">
              joined #designtools along with <span className="mention">@Kaustav Das</span> <span className="mention mt-0.5 inline-block">Biswas</span>.
            </div>
          </div>
        </div>

        {/* Date: Today */}
        <div className="flex items-center mt-6 mb-4">
          <span className="font-bold text-[15px] text-black pl-4 pr-3 tracking-wide">Today</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Message 6 */}
        <div className="flex px-4 mb-2">
          <div className="w-10 h-10 mr-3 flex-shrink-0 bg-white rounded overflow-hidden">
             <svg viewBox="0 0 40 40" className="w-full h-full">
               <path d="M 0 0 C 15 0 15 15 15 15 L 0 15 Z" fill="#36C5F0" />
               <rect x="22" y="0" width="12" height="35" fill="#E01E5A" rx="2" />
               <path d="M 15 22 C 15 35 0 35 0 35 L 0 22 Z" fill="#36C5F0" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-[15px] text-black">Onur Kuru</span>
              <span className="text-xs text-gray-400 font-medium">12:02 AM</span>
            </div>
            <div className="text-[15px] text-[#616061] leading-tight">
              joined #designtools
            </div>
          </div>
        </div>

      </div>

      {/* 4. Toolbar & Input Area */}
      <div className="border-t border-gray-200 bg-white pb-6 pt-1">
        <div className="px-4 py-[10px] flex items-center justify-between">
          <span className="text-[16px] text-gray-400 font-medium">Message #designtools</span>
          <Maximize2 size={16} className="text-gray-400" />
        </div>
        
        <div className="px-4 pt-0.5 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-[22px] text-gray-500">
            <AtSign size={20} strokeWidth={1.5} />
            
            {/* Custom "/" icon */}
            <div className="border border-gray-500 rounded flex items-center justify-center w-5 h-5 text-xs font-medium">
              /
            </div>
            
            <Paperclip size={19} strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-[18px]">
            <ImageIcon size={22} strokeWidth={1.5} className="text-gray-500" />
            <button onClick={() => window.location.hash = 'page=page-04'} className="px-[14px] py-[6px] bg-white border border-gray-300 rounded-[4px] font-bold text-gray-400 text-[14px] tracking-wide">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full"></div>

    </div>
  );
}
