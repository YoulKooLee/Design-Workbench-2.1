import React from 'react';
import { Signal, BatteryMedium, Edit, Navigation, User, PlugZap, AtSign } from 'lucide-react';
import './style.css';

/**
 * @name Slack Direct Messages Drawer
 */
export default function SlackApp() {
  return (
    <div className="flex w-full h-screen max-w-md mx-auto bg-[#4D394B] overflow-hidden font-sans relative select-none">
      
      {/* --- Main Purple Drawer Level --- */}
      <div className="flex flex-col w-[88%] h-full relative z-0">
        
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium text-white tracking-tight w-screen max-w-md absolute top-0 left-0 z-20">
          <div className="flex items-center gap-1">
            <span>7:46</span>
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
              <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-white rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Purple Header */}
        <div className="mt-11 flex justify-between items-center px-4 h-12 border-b border-[#3E2D3C]">
          <div className="w-6"></div> {/* Spacer for centering */}
          <span className="font-bold text-white text-[17px]">Direct Messages</span>
          <Edit size={22} className="text-white/80" strokeWidth={1.5} />
        </div>

        {/* List Content */}
        <div className="flex-1 pt-3">
          <div className="px-5 mb-2">
            <span className="text-[12px] text-[#A693A6] font-semibold tracking-wider">RECENT</span>
          </div>

          {/* Item 1: Slackbot */}
          <div className="flex px-4 py-2 relative">
            <div className="w-11 h-11 flex-shrink-0 relative">
              {/* Slackbot Avatar */}
              <div className="w-full h-full rounded overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="0" y="0" width="50" height="50" fill="#36C5F0"/>
                  <rect x="50" y="0" width="50" height="50" fill="#2EB67D"/>
                  <rect x="0" y="50" width="50" height="50" fill="#E01E5A"/>
                  <rect x="50" y="50" width="50" height="50" fill="#ECB22E"/>
                  <path d="M20,60 C20,80 80,80 80,60 L80,30 L20,30 Z" fill="white" />
                  <circle cx="35" cy="50" r="7" fill="#1D1C1D"/>
                  <circle cx="65" cy="50" r="7" fill="#1D1C1D"/>
                  <path d="M45,65 Q50,70 55,65" fill="none" stroke="#1D1C1D" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] bg-[#2BAC76] border-2 border-[#4D394B] rounded-full"></div>
            </div>
            
            <div className="flex-1 ml-3 pt-0.5 overflow-hidden">
              <div className="flex items-baseline gap-2 mb-[1px]">
                <span className="font-bold text-white text-[16px]">Slackbot</span>
                <span className="text-[13px] text-[#A693A6]">Dec 17th, 2018</span>
              </div>
              <p className="text-[15px] text-[#A693A6] leading-snug line-clamp-2 pr-2">
                slackbot: I love when messages are all gussied up! Here are some shortcuts for
              </p>
            </div>
          </div>

          {/* Item 2: huang (you) */}
          <div className="flex px-4 py-2 mt-1 relative">
            <div className="w-11 h-11 flex-shrink-0 relative">
              {/* Viking Avatar */}
              <div className="w-full h-full rounded overflow-hidden bg-white">
               <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                 <rect width="100" height="100" fill="#ffffff" />
                 <path d="M50 20 C 30 20, 20 40, 20 60 C 20 80, 40 90, 50 90 C 60 90, 80 80, 80 60 C 80 40, 70 20, 50 20" fill="none" stroke="currentColor" strokeWidth="4"/>
                 <circle cx="35" cy="45" r="5" fill="currentColor"/>
                 <circle cx="65" cy="45" r="5" fill="currentColor"/>
                 <path d="M40,70 Q50,75 60,70" fill="none" stroke="currentColor" strokeWidth="3"/>
                 <path d="M25 40 Q 15 20 5 10 M75 40 Q 85 20 95 10" fill="none" stroke="currentColor" strokeWidth="4"/>
               </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] bg-[#2BAC76] border-2 border-[#4D394B] rounded-full"></div>
            </div>
            
            <div className="flex-1 ml-3 pt-2">
              <div className="flex items-center gap-1">
                <span className="font-medium text-[16px] text-white">huang (you)</span>
                <span className="text-[14px]">🌴</span>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* --- Main Workspace View Peeking from Right --- */}
      <div className="absolute top-11 bottom-0 left-[89%] w-full bg-[#EAEBEA] shadow-[0_0_25px_rgba(0,0,0,0.5)] z-10 flex flex-col pl-3 pt-2">
        
        <div className="relative w-4 h-4 opacity-90 mb-4 ml-1">
            <div className="absolute top-[1px] left-[5px] w-[2px] h-[12px] bg-[#E01E5A] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[1px] right-[5px] w-[2px] h-[12px] bg-[#36C5F0] rounded-full rotate-[15deg]"></div>
            <div className="absolute top-[5px] left-[1px] w-[12px] h-[2px] bg-[#2EB67D] rounded-full -rotate-[15deg]"></div>
            <div className="absolute bottom-[5px] left-[1px] w-[12px] h-[2px] bg-[#ECB22E] rounded-full -rotate-[15deg]"></div>
        </div>
        
        <div className="text-[15px] font-medium text-gray-800 leading-tight mb-4 ml-0.5 whitespace-nowrap">
          Fe<br/>Ho
        </div>

        <div className="text-[15px] font-medium text-gray-800 leading-tight mb-5 ml-0.5 whitespace-nowrap">
          B<br/>w
        </div>

        <User size={18} className="text-[#2BAC76] ml-[5px] mb-4" strokeWidth={2} />
        <PlugZap size={18} className="text-[#E01E5A] ml-[5px] mb-5" strokeWidth={2} />

        <div className="w-[85%] h-[1px] bg-gray-300 mb-5 ml-0.5"></div>

        <div className="flex flex-col gap-3 ml-0.5">
          <div className="w-8 h-8 rounded bg-white overflow-hidden border border-gray-200">
            <svg viewBox="20 0 60 100" className="w-full h-full text-black">
              <path d="M50 20 C 30 20, 20 40, 20 60 C 20 80, 40 90, 50 90 C 60 90, 80 80, 80 60 C 80 40, 70 20, 50 20" fill="none" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </div>
          <div className="w-8 h-8 rounded bg-white overflow-hidden border border-gray-200">
            <svg viewBox="20 0 60 100" className="w-full h-full">
              <rect x="0" y="0" width="50" height="50" fill="#36C5F0"/>
              <rect x="50" y="0" width="50" height="50" fill="#2EB67D"/>
              <rect x="0" y="50" width="50" height="50" fill="#E01E5A"/>
              <rect x="50" y="50" width="50" height="50" fill="#ECB22E"/>
            </svg>
          </div>
          <div className="w-8 h-8 rounded bg-white overflow-hidden border border-gray-200">
             <svg viewBox="20 0 60 100" className="w-full h-full">
              <rect x="0" y="0" width="50" height="50" fill="#36C5F0"/>
              <rect x="50" y="0" width="50" height="50" fill="#2EB67D"/>
              <rect x="0" y="50" width="50" height="50" fill="#E01E5A"/>
              <rect x="50" y="50" width="50" height="50" fill="#ECB22E"/>
            </svg>
          </div>
        </div>

        <div className="mt-auto mb-10 flex flex-col gap-3 ml-1">
          <AtSign size={16} className="text-gray-900" />
          <AtSign size={16} className="text-gray-400" />
        </div>
      </div>

      {/* --- Pagination Dots --- */}
      <div className="absolute bottom-[28px] w-full flex justify-center z-20 pr-[12%]">
        <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[#422D41]/80 rounded-full">
          <div className="w-[6px] h-[6px] rounded-full bg-white/30"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-white/30"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white rounded-full z-20"></div>

    </div>
  );
}
