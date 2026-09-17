import React from 'react';
import { 
  Signal, Navigation, X, Search, ChevronRight, Circle 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Member Search View
 */
export default function SlackApp() {

  const SlackConnectIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 opacity-90 mx-1">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );

  const members = [
    {
      name: "360 Mockups",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 C 18 0 18 18 18 18 L 0 18 Z" fill="#E01E5A"/>
           <rect x="0" y="24" width="18" height="16" fill="#E01E5A"/>
           <rect x="26" y="0" width="14" height="36" fill="#ECB22E" rx="3" />
        </svg>
      ),
      type: "link",
      statusText: "360 Mockups"
    },
    {
      name: "Aakriti",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="14" height="38" fill="#36C5F0" />
           <path d="M22 0 C 40 0 40 18 40 18 L 22 18 Z" fill="#E01E5A" />
           <rect x="22" y="22" width="18" height="16" fill="#E01E5A" />
        </svg>
      ),
      type: "link",
      statusText: "Aakriti Shroff"
    },
    {
      name: "aaron",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 C 18 0 18 18 18 18 L 0 18 Z" fill="#2EB67D" />
           <rect x="22" y="0" width="18" height="18" fill="#2EB67D" />
           <rect x="0" y="24" width="40" height="14" fill="#ECB22E" />
        </svg>
      ),
      type: "link",
      statusText: "Aaron Amir"
    },
    {
      name: "Aaron",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 C 18 0 18 18 18 18 L 0 18 Z" fill="#36C5F0" />
           <path d="M0 24 C 18 24 18 40 18 40 L 0 40 Z" fill="#36C5F0" />
           <rect x="26" y="0" width="14" height="38" fill="#E01E5A" />
        </svg>
      ),
      type: "offline",
      statusText: "Aaron Whitmore"
    },
    {
      name: "ennoman",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 C 18 0 18 18 18 18 L 0 18 Z" fill="#36C5F0" />
           <rect x="22" y="0" width="18" height="18" fill="#36C5F0" />
           <rect x="0" y="24" width="40" height="14" fill="#2EB67D" />
        </svg>
      ),
      type: "link",
      statusText: "abdelbast Ennomany"
    },
    {
      name: "Abdulahi",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="20" height="38" fill="#36C5F0" />
           <path d="M24 0 C 40 0 40 18 40 18 L 24 18 Z" fill="#2EB67D" />
           <rect x="24" y="24" width="16" height="14" fill="#2EB67D" />
        </svg>
      ),
      type: "link",
      statusText: "Abdulahi"
    },
    {
      name: "No Man",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="15" height="38" fill="#E01E5A" />
           <path d="M20 0 C 40 0 40 18 40 18 L 20 18 Z" fill="#36C5F0" />
           <rect x="20" y="22" width="18" height="16" fill="#36C5F0" />
        </svg>
      ),
      type: "link",
      statusText: "Abdullah Al Noman"
    },
    {
      name: "Designer Buddy",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="40" height="12" fill="#36C5F0" />
           <rect x="0" y="16" width="16" height="20" fill="#2EB67D" />
           <path d="M24 16 L 40 16 C 40 36 24 36 24 36 Z" fill="#2EB67D" />
        </svg>
      ),
      type: "link",
      statusText: "Abdulqadir Rampuraw..."
    },
    {
      name: "abdulrahman",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 L 18 0 L 18 18 L 0 18 Z" fill="#E01E5A" />
           <rect x="22" y="0" width="18" height="18" fill="#36C5F0" />
           <rect x="0" y="22" width="40" height="18" fill="#ECB22E" />
        </svg>
      ),
      type: "link",
      statusText: "abdulrahman"
    },
    {
      name: "Abeer",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="15" height="38" fill="#36C5F0" />
           <path d="M20 0 C 40 0 40 18 40 18 L 20 18 Z" fill="#E01E5A" />
           <rect x="20" y="24" width="18" height="16" fill="#E01E5A" />
        </svg>
      ),
      type: "link",
      statusText: null
    },
    {
      name: "Abel Quintero",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <path d="M0 0 L 18 0 L 18 18 L 0 18 Z" fill="#ECB22E" />
           <path d="M0 24 L 18 24 C 18 24 18 38 0 38 Z" fill="#ECB22E" />
           <rect x="26" y="0" width="14" height="38" fill="#2EB67D" />
        </svg>
      ),
      type: "offline",
      statusText: null
    },
    {
      name: "Abhay Raghuvanshi",
      avatar: (
        <svg viewBox="0 0 40 40" className="w-full h-full">
           <rect x="0" y="0" width="15" height="38" fill="#ECB22E" />
           <path d="M20 0 C 40 0 40 18 40 18 L 20 18 Z" fill="#E01E5A" />
           <rect x="20" y="24" width="18" height="16" fill="#E01E5A" />
        </svg>
      ),
      type: "link",
      statusText: null
    }
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden text-gray-900 font-sans shadow-2xl relative select-none">
      
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
        <div className="flex justify-between items-center px-4 h-[44px] border-b ios-border">
          <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1" strokeWidth={1.5} />
          <span className="font-bold text-[17px] tracking-wide text-black pb-0.5 ml-2">UI8</span>
          <span className="text-[#007AFF] text-[17px] font-normal tracking-wide cursor-pointer">Invite</span>
        </div>
        
        {/* Search Bar Block */}
        <div className="bg-[#FCFCFC] pt-[10px] pb-3 px-4 border-b ios-border w-full">
          <div className="flex items-center bg-white border ios-border rounded-[5px] px-[9px] py-[6px] shadow-sm">
            <Search size={16} className="text-[#A1A1AA] mr-2" strokeWidth={2} />
            <span className="text-[#C7C7CC] text-[15px] leading-tight">Search</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area (User List) */}
      <div className="flex flex-col w-full flex-1 overflow-y-auto relative">
        
        {members.map((member, index) => (
          <div key={index} className="flex items-center pl-4 pr-[14px]">
            {/* Avatar */}
            <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden bg-white flex-shrink-0 my-3">
              {member.avatar}
            </div>

            {/* Info Block */}
            <div className="flex-1 flex flex-col ml-3.5 border-b ios-border h-[64px] justify-center relative">
               <div className="flex items-center pr-8">
                  <span className="font-bold text-[16px] text-black mr-0.5">{member.name}</span>
                  {member.statusText && (
                    <div className="flex items-center min-w-0 flex-shrink-1">
                      {member.type === 'link' && <SlackConnectIcon />}
                      {member.type === 'offline' && (
                        <Circle size={10} className="text-[#8E8E93] text-opacity-80 mx-[5px]" strokeWidth={2.5} />
                      )}
                      <span className="text-[16px] text-[#8E8E93] truncate">{member.statusText}</span>
                    </div>
                  )}
               </div>
               {/* Right arrow */}
               <ChevronRight size={20} className="text-[#C7C7CC] absolute right-0 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
            </div>
          </div>
        ))}
        
        {/* iOS Native Scrollbar Imitation */}
        <div className="fixed right-1 top-[200px] w-1 h-32 bg-black/30 rounded-full z-20 pointer-events-none"></div>
      </div>

      {/* iOS Home Indicator */}
      <div className="sticky bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 shadow-sm pointer-events-none"></div>

    </div>
  );
}
