import React from 'react';
import { 
  Signal, Navigation, Camera 
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Edit Profile
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
        <div className="flex justify-between items-center px-4 h-[44px] border-b ios-border">
          <span className="text-[#007AFF] text-[17px] font-normal tracking-wide cursor-pointer">Cancel</span>
          <span className="font-semibold text-[17px] tracking-wide text-black">Edit Profile</span>
          <span className="text-[#007AFF] text-[17px] font-semibold tracking-wide cursor-pointer">Save</span>
        </div>
      </div>

      {/* 2. Main Form Content */}
      <div className="flex flex-col w-full pb-10">
        
        {/* Top Section (Avatar, Full name) */}
        <div className="flex bg-white border-b ios-border">
          {/* Avatar side */}
          <div className="py-2.5 pl-4 pr-3 relative z-10">
            <div className="w-[100px] h-[100px] rounded-[14px] overflow-hidden bg-white shadow-sm border border-gray-100/50 relative flex-shrink-0">
               {/* Viking Avatar */}
               <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                 <rect width="100" height="100" fill="#ffffff" />
                 <path d="M50 20 C 30 20, 20 40, 20 60 C 20 80, 40 90, 50 90 C 60 90, 80 80, 80 60 C 80 40, 70 20, 50 20" fill="none" stroke="currentColor" strokeWidth="4"/>
                 <circle cx="35" cy="45" r="5" fill="currentColor"/>
                 <circle cx="65" cy="45" r="5" fill="currentColor"/>
                 <path d="M40 70 Q 50 75 60 70" fill="none" stroke="currentColor" strokeWidth="3"/>
                 <path d="M25 40 Q 15 20 5 10 M75 40 Q 85 20 95 10" fill="none" stroke="currentColor" strokeWidth="4"/>
               </svg>

               {/* Camera Icon Overlay */}
               <div className="absolute top-[6px] left-[6px] text-gray-500 bg-[#F2F2F7]/80 p-0.5 rounded-[4px] border border-white/40">
                  <Camera size={18} strokeWidth={1.5} />
               </div>
            </div>
          </div>
          
          {/* Inputs side */}
          <div className="flex-1 flex flex-col pt-1">
             <div className="flex-1 flex items-center pr-4">
                <span className="text-[#8E8E93] text-[16px] font-normal">Full name</span>
             </div>
             <div className="h-[0.5px] bg-[#E5E5EA]"></div>
             <div className="flex-1 flex items-center pr-4">
                <span className="text-black text-[17px]">Jensen</span>
             </div>
          </div>
        </div>

        {/* Display Name Section */}
        <div className="px-4 pt-[22px] pb-[6px]">
          <span className="text-[14px] text-[#8E8E93]">Display name</span>
        </div>
        <div className="bg-white border-y ios-border px-4 py-[11px]">
          <span className="text-[17px] text-black">huang</span>
        </div>
        <div className="px-4 pt-2 pb-6">
          <span className="text-[13px] text-[#8E8E93] leading-snug block pr-2">
            This could be your first name, or a nickname — however you'd like people to refer to you in Slack.
          </span>
        </div>

        {/* Role Section */}
        <div className="px-4 pb-[6px]">
          <span className="text-[14px] text-[#8E8E93]">Role</span>
        </div>
        <div className="bg-white border-y ios-border px-4 py-[11px]">
          <span className="text-[17px] text-[#C7C7CC]">What I do</span>
        </div>

        {/* Contact Section */}
        <div className="px-4 pt-[22px] pb-[6px]">
          <span className="text-[14px] text-[#8E8E93]">Contact</span>
        </div>
        <div className="bg-white border-y ios-border px-4 py-[11px] flex gap-[18px]">
          <span className="text-[17px] text-[#8E8E93]">Phone</span>
          <span className="text-[17px] text-[#C7C7CC]">Phone number</span>
        </div>

      </div>

      {/* iOS Home Indicator */}
      <div className="sticky bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 mt-auto shadow-sm"></div>

    </div>
  );
}
