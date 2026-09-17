import React from 'react';
import { 
  Signal, Navigation, X, Layers, ChevronDown, Image as ImageIcon
} from 'lucide-react';
import './style.css';

/**
 * @name Slack All Files Browser
 */
export default function SlackApp() {

  const files = [
    { name: "Group 36.png", size: "281 KB PNG file", date: "Apr 23rd at 12:39 AM" },
    { name: "Screen Shot 2019-04-22 at 12.36.42 PM.png", size: "468 KB PNG file", date: "Apr 23rd at 12:39 AM" },
    { name: "Image from iOS", size: "10 KB PNG file", date: "Apr 8th at 5:47 AM in #general" },
    { name: "Image from iOS", size: "9 KB PNG file", date: "Apr 8th at 5:47 AM in #general" },
    { name: "Image from iOS", size: "13 KB PNG file", date: "Apr 8th at 5:47 AM in #general" },
    { name: "Diamond-webpage.png", size: "512 KB PNG file", date: "Apr 4th at 6:52 PM in #productfeedback" },
    { name: "Diamond-webpage.png", size: "512 KB PNG file", date: "Apr 4th at 6:51 PM in #showoff" },
    { name: "03_board.jpg", size: "175 KB JPG file", date: "Feb 26th at 7:16 PM in #showoff" },
    { name: "Artboard 3 Copy 2.png", size: "1.7 MB PNG file", date: "Feb 15th at 9:40 PM in #productfeedback" },
    { name: "service.png", size: "234 KB PNG file", date: "Feb 15th at 12:38 PM" }
  ];

  const FileIcon = () => (
    <div className="w-[34px] h-[42px] bg-[#5CA3E6] rounded-sm relative flex items-center justify-center flex-shrink-0 mt-0.5">
      {/* Folder fold simulation (using a pseudo-element shape with borders to fake the fold) */}
      <div className="absolute top-0 right-0 w-0 h-0 
        border-t-[10px] border-t-white 
        border-l-[10px] border-l-[#8ABEF2] 
        border-b-[0px] border-b-transparent 
        border-r-[0px] border-r-transparent 
        rounded-bl-[1px]"></div>
      {/* Inner Image icon */}
      <ImageIcon size={18} className="text-white mt-1 -mr-1" strokeWidth={2} />
    </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white text-gray-900 font-sans shadow-2xl relative select-none">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-20">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight">
          <div className="flex items-center gap-1">
            <span>7:51</span>
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
        <div className="flex items-center justify-between px-4 h-[44px] relative">
          <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1 z-10" strokeWidth={1.5} />
          
          <div className="absolute inset-0 flex items-center justify-center z-0">
             <div className="flex items-center gap-1.5 ml-2 mt-[2px]">
               <Layers size={18} strokeWidth={2} className="text-black" />
               <span className="font-bold text-[17px] tracking-wide text-black pb-0.5">All Files</span>
               <ChevronDown size={14} className="text-gray-300 mt-1 -ml-0.5" strokeWidth={2.5} />
             </div>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex w-full h-[46px] border-b ios-border border-t border-t-[#E5E5EA]/50">
          <div className="flex-1 bg-[#1878F3] text-white flex items-center justify-center text-[16px]">
            Everyone
          </div>
          <div className="flex-1 bg-[#F4F4F4] text-[#333333] flex items-center justify-center text-[16px]">
            Just You
          </div>
        </div>
      </div>

      {/* 2. Main Content Area (File List) */}
      <div className="flex flex-col w-full flex-1 overflow-y-auto pb-[34px]">
        {files.map((file, index) => (
          <div key={index} className="flex gap-[14px] px-4 py-3 border-b ios-border items-start bg-white">
            <FileIcon />
            <div className="flex flex-col min-w-0 pt-0.5 w-full">
              <span className="font-bold text-[16px] text-black leading-[1.2] mb-0.5 truncate tracking-tight">{file.name}</span>
              <span className="text-[14px] text-[#A1A1AA] leading-snug truncate font-normal tracking-tight">{file.size}</span>
              <span className="text-[14px] text-[#C7C7CE] leading-snug truncate font-normal tracking-tight">{file.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
