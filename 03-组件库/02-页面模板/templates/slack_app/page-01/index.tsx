import React from 'react';
import { 
  Signal, Battery, BatteryMedium, ChevronDown, Bell, Search, 
  MoreVertical, AtSign, Paperclip, Image as ImageIcon, 
  Globe, Mic, Delete, Maximize2, Navigation, ArrowUp 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Self Memo App
 */
export default function SlackApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden text-gray-900 font-sans shadow-2xl relative select-none">
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
        <div className="flex items-center gap-1">
          <span>7:49</span>
          <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
        </div>
        <div className="flex items-center gap-1.5">
          <Signal size={14} fill="currentColor" strokeWidth={1} />
          <span className="text-[12px] font-bold">4G</span>
          <BatteryMedium size={18} fill="none" strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. Top App Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200/80 mt-1">
        <div className="flex items-center gap-2">
          {/* Slack Hash Logo */}
          <div className="relative w-5 h-5 opacity-90">
            <div className="absolute top-[2px] left-[6px] w-[3px] h-[16px] bg-[#E01E5A] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[2px] right-[6px] w-[3px] h-[16px] bg-[#36C5F0] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[6px] left-[2px] w-[16px] h-[3px] bg-[#2EB67D] rounded-full -rotate-[15deg]"></div>
            <div className="absolute bottom-[6px] left-[2px] w-[16px] h-[3px] bg-[#ECB22E] rounded-full -rotate-[15deg]"></div>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-[17px] mr-1">huang 🌴</span>
            <div className="flex items-center text-green-600 bg-white ml-0.5">
              <span className="text-[10px] font-bold tracking-tighter">zZ</span>
            </div>
            <ChevronDown size={14} className="text-gray-500 ml-1" />
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
      <div className="flex-1 overflow-y-auto bg-white flex flex-col pt-6">
        
        {/* Intro text */}
        <div className="px-5 mb-5">
          <h1 className="text-[26px] font-extrabold text-black mb-3">Jensen 🌴</h1>
          <p className="text-[15px] text-gray-500 leading-snug">
            This is your space. Draft messages, list your to-dos, or jot down reminders to yourself.
          </p>
        </div>

        <div className="mx-5 border-b border-gray-200 mt-2"></div>

        {/* Messages */}
        <div className="flex flex-col flex-1 px-5 pt-4 bg-white relative pb-4">
          
          {/* Message 1 */}
          <div className="flex mb-[18px]">
            <div className="w-10 h-10 mr-3 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
               {/* Simple SVG placeholder replicating the hand drawn face loosely */}
               <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                 <rect width="100" height="100" fill="#ffffff" />
                 <path d="M50 20 C 30 20, 20 40, 20 60 C 20 80, 40 90, 50 90 C 60 90, 80 80, 80 60 C 80 40, 70 20, 50 20" fill="none" stroke="currentColor" strokeWidth="4"/>
                 <circle cx="35" cy="45" r="5" fill="currentColor"/>
                 <circle cx="65" cy="45" r="5" fill="currentColor"/>
                 <path d="M40 70 Q 50 75 60 70" fill="none" stroke="currentColor" strokeWidth="3"/>
                 {/* Viking helmet horns */}
                 <path d="M25 40 Q 15 20 5 10 M75 40 Q 85 20 95 10" fill="none" stroke="currentColor" strokeWidth="4"/>
               </svg>
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-bold text-[15px] text-black">huang 🌴</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">7:46 AM</span>
              </div>
              <p className="text-[15px] text-gray-900">Hello to you</p>
            </div>
          </div>

          {/* New Message Divider */}
          <div className="relative flex items-center mt-2 mb-6">
            <div className="flex-1 h-[1px] bg-[#f43f5e] opacity-60"></div>
            <span className="text-[#f43f5e] text-[11px] font-bold tracking-widest pl-3 pr-0 py-1">NEW</span>
          </div>

          {/* Message 2 */}
          <div className="flex">
            <div className="w-10 h-10 mr-3 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                 <rect width="100" height="100" fill="#ffffff" />
                 <path d="M50 20 C 30 20, 20 40, 20 60 C 20 80, 40 90, 50 90 C 60 90, 80 80, 80 60 C 80 40, 70 20, 50 20" fill="none" stroke="currentColor" strokeWidth="4"/>
                 <circle cx="35" cy="45" r="5" fill="currentColor"/>
                 <circle cx="65" cy="45" r="5" fill="currentColor"/>
                 <path d="M40 70 Q 50 75 60 70" fill="none" stroke="currentColor" strokeWidth="3"/>
                 <path d="M25 40 Q 15 20 5 10 M75 40 Q 85 20 95 10" fill="none" stroke="currentColor" strokeWidth="4"/>
               </svg>
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-[15px] text-black">huang 🌴</span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">7:47 AM</span>
              </div>
              <div className="text-[15px] text-gray-900 leading-snug">
                <p>Yesterday</p>
                <p className="mt-1 leading-snug">
                  John Cusack is rolling his eyes at critics, many of whom are apparent Trump supporters, who called him unpatriotic for seemingly staying seated during a military salute.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 4. Toolbar & Input Area */}
      <div className="border-t border-gray-200/80 bg-white">
        <div className="px-4 py-2 flex items-center justify-between mt-1">
          <span className="text-[16px] text-gray-400">Jot something down</span>
          <Maximize2 size={16} className="text-gray-400" />
        </div>
        
        <div className="px-4 pt-1 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-5 text-gray-500">
            <AtSign size={20} strokeWidth={1.5} />
            
            {/* Custom "/" icon */}
            <div className="border border-gray-500 rounded flex items-center justify-center w-5 h-5 text-xs font-medium">
              /
            </div>
            
            <Paperclip size={19} strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-4">
            <ImageIcon size={22} strokeWidth={1.5} className="text-gray-500" />
            <button onClick={() => window.location.hash = 'page=page-02'} className="px-3 py-1 bg-white border border-gray-300 rounded font-bold text-gray-300 text-sm tracking-wide">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* 5. iOS Keyboard Modal */}
      <div className="w-full bg-[#d1d5db] flex flex-col pt-1 pb-8 shadow-[0_-1px_0_rgba(0,0,0,0.1)]">
        {/* Predictive Text Bar */}
        <div className="flex items-center px-1 mb-[5px] h-9">
          <div className="flex-1 flex justify-center text-black text-[17px]">Hello</div>
          <div className="h-5 w-[1px] bg-gray-400/40"></div>
          <div className="flex-1 flex justify-center text-black text-[17px]">The</div>
          <div className="h-5 w-[1px] bg-gray-400/40"></div>
          <div className="flex-1 flex justify-center text-black text-[17px]"></div>
        </div>
        
        <div className="px-[3px] flex flex-col gap-[6px]">
          {/* Row 1 */}
          <div className="flex justify-center gap-[5px] px-[2px]">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black keyboard-shadow active:bg-gray-200">
                {k}
              </div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-center gap-[5px] px-[18px]">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black keyboard-shadow active:bg-gray-200">
                {k}
              </div>
            ))}
          </div>
          
          {/* Row 3 */}
          <div className="flex justify-center gap-[5px]">
            <div className="w-[42px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center keyboard-shadow active:bg-white text-black">
              <ArrowUp size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-1 justify-center gap-[5px]">
              {['Z','X','C','V','B','N','M'].map(k => (
                <div key={k} className="w-[8.7%] flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black keyboard-shadow active:bg-gray-200">
                  {k}
                </div>
              ))}
            </div>
            <div className="w-[42px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center keyboard-shadow active:bg-white">
               <Delete size={20} fill="currentColor" className="text-black" />
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="flex justify-center gap-[5px]">
            <div className="w-[90px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-white">
              123
            </div>
            <div className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-gray-200">
              space
            </div>
            <div className="w-[90px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-white">
              return
            </div>
          </div>
        </div>

        {/* Keyboard bottom tools */}
        <div className="flex justify-between items-center px-4 pt-3 relative">
           <Globe size={22} className="text-gray-600" />
           <Mic size={22} className="text-gray-600" />
           {/* Home Indicator */}
           <div className="absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-[130px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>

    </div>
  );
}
