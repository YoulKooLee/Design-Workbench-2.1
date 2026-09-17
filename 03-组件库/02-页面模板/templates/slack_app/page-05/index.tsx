import React from 'react';
import { 
  Signal, Navigation, X, Mail, UserPlus, ChevronRight, Smile, 
  ArrowUp, Delete, Globe 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Invite People
 */
export default function SlackApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F2F2F7] overflow-y-auto text-gray-900 font-sans shadow-2xl relative select-none">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-20">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
          <div className="flex items-center gap-1">
            <span>7:52</span>
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
        <div className="flex justify-between items-center px-4 h-[44px] border-b border-[#E5E5EA]">
          <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1" strokeWidth={1.5} />
          <span className="font-bold text-[17px] tracking-wide text-black pb-0.5">Invite People</span>
          <span className="text-[#C7C7CC] text-[17px] font-semibold tracking-wide cursor-not-allowed">Send</span>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex flex-col w-full flex-1">
        
        {/* Spacer */}
        <div className="h-7 w-full bg-[#F2F2F7]"></div>

        {/* Input Box */}
        <div className="flex items-center px-4 py-3 bg-white border-y border-[#E5E5EA] gap-3">
          <Mail size={22} className="text-[#8E8E93]" strokeWidth={1.5} />
          <div className="flex items-center text-[16px] text-[#A6A6AC] font-normal leading-none mt-0.5 relative">
            <span className="text-[#007AFF] text-lg -mt-1 font-light mr-[1px] -ml-[1px]">|</span>
            Type an email address to invite
          </div>
        </div>

        {/* Spacer */}
        <div className="h-8 w-full bg-[#F2F2F7]"></div>

        {/* Contacts Integration Links */}
        <div className="flex flex-col bg-white border-y border-[#E5E5EA] pl-4">
          
          {/* Row 1: Contacts */}
          <div className="flex items-center px-0 pr-4 py-[11px] gap-3">
             <UserPlus size={22} className="text-[#2BAC76]" strokeWidth={1.5} />
             <span className="text-[17px] text-black flex-1 -mt-0.5">Contacts</span>
             <ChevronRight size={20} className="text-[#C7C7CC]" strokeWidth={1.5} />
          </div>
          
          {/* Divider */}
          <div className="h-[0.5px] bg-[#E5E5EA] ml-[34px]"></div>

          {/* Row 2: Google Contacts */}
          <div className="flex items-center px-0 pr-4 py-[11px] gap-3">
             {/* Custom Google Contact SVG matching screenshot */}
             <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#ECB22E]">
               <rect x="2" y="3" width="20" height="18" rx="3" fill="currentColor" />
               <circle cx="12" cy="11" r="3.5" fill="white" />
               <path d="M6 21 Q6 16.5 12 16.5 Q18 16.5 18 21" fill="white" />
               {/* Small accent lines mapping Google Contacts icon details */}
               <rect x="5" y="6" width="3" height="3" rx="1.5" fill="#F2F2F7" opacity="0.8"/>
               <rect x="16" y="6" width="3" height="3" rx="1.5" fill="#F2F2F7" opacity="0.8"/>
             </svg>
             <span className="text-[17px] text-black flex-1 -mt-0.5">Invite from Google Contacts</span>
             <ChevronRight size={20} className="text-[#C7C7CC]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Hint text */}
        <div className="flex items-center justify-center mt-5 text-[#A1A1AA] text-[14px]">
          <span className="mr-1">Slack is better with others.</span>
          <Smile size={16} strokeWidth={1.5} className="mt-0.5" />
        </div>

      </div>

      {/* 3. iOS Email Keyboard Modal */}
      <div className="w-full bg-[#d1d5db] flex flex-col pt-1 pb-8 shadow-[0_-1px_0_rgba(0,0,0,0.1)] mt-auto z-30 relative">
        <div className="px-[3px] flex flex-col gap-[6px] pt-1">
          {/* Row 1 */}
          <div className="flex justify-center gap-[5px] px-[2px]">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black font-light keyboard-shadow active:bg-gray-200">
                {k}
              </div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-center gap-[5px] px-[18px]">
            {['a','s','d','f','g','h','j','k','l'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black font-light keyboard-shadow active:bg-gray-200">
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
              {['z','x','c','v','b','n','m'].map(k => (
                <div key={k} className="w-[8.7%] flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[22px] text-black font-light keyboard-shadow active:bg-gray-200">
                  {k}
                </div>
              ))}
            </div>
            <div className="w-[42px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center keyboard-shadow active:bg-white text-black">
               <Delete size={20} fill="currentColor" />
            </div>
          </div>
          
          {/* Row 4 (Email Bottom Row) */}
          <div className="flex justify-center gap-[5px]">
            <div className="w-[85px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-white flex-shrink-0">
              123
            </div>
            <div className="flex-1 h-[42px] bg-white rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-gray-200">
              space
            </div>
            <div className="w-[42px] h-[42px] bg-white rounded flex items-center justify-center text-[20px] text-black keyboard-shadow active:bg-gray-200 flex-shrink-0">
              @
            </div>
            <div className="w-[38px] h-[42px] bg-white rounded flex items-center justify-center text-[20px] font-bold text-black keyboard-shadow active:bg-gray-200 flex-shrink-0">
              .
            </div>
            <div className="w-[85px] h-[42px] bg-[#B3B8C2] rounded flex items-center justify-center text-[16px] text-black keyboard-shadow active:bg-white flex-shrink-0">
              Next
            </div>
          </div>
        </div>

        {/* Keyboard bottom tools */}
        <div className="flex justify-between items-center px-4 pt-3 relative">
           <Globe size={22} className="text-gray-600" />
           {/* Home Indicator */}
           <div className="absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-[130px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
      
    </div>
  );
}
