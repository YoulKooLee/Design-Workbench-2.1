import React from 'react';
import { 
  Signal, Navigation, X, Layers, ChevronDown, FileText, Mail, Image as ImageIcon, Book
} from 'lucide-react';
import './style.css';

/**
 * @name Slack File Filter Menu
 */
export default function SlackApp() {

  const SnippetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1D1C1D]">
       <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
       <path d="M8 9h8"></path><path d="M12 9v6"></path>
    </svg>
  );

  const GoogleDriveIcon = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" className="text-[#1D1C1D]">
       <path d="M12 2L2 19h20L12 2zm0 4.5l4.8 8.5h-9.6L12 6.5z" />
    </svg>
  );

  const menuItems = [
    { label: 'All Files', icon: <Layers size={20} className="text-[#1D1C1D]" strokeWidth={1.5} /> },
    { label: 'Posts', icon: <FileText size={20} className="text-[#1D1C1D]" strokeWidth={1.5} /> },
    { label: 'Snippets', icon: <SnippetIcon /> },
    { label: 'Emails', icon: <Mail size={20} className="text-[#1D1C1D]" strokeWidth={1.5} /> },
    { label: 'Images', icon: <ImageIcon size={20} className="text-[#1D1C1D]" strokeWidth={1.5} /> },
    { label: 'PDF Files', icon: <Book size={20} className="text-[#1D1C1D]" strokeWidth={1.5} /> },
    { label: 'Google Docs', icon: <GoogleDriveIcon /> },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white text-gray-900 font-sans shadow-2xl overflow-hidden relative select-none">
      
      {/* 1. iOS Status Bar & App Header Container */}
      <div className="bg-white sticky top-0 z-30">
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
        <div className="flex items-center justify-between px-4 h-[44px] relative border-b ios-border">
          <X size={26} className="text-[#8E8E93] cursor-pointer -ml-1 z-10" strokeWidth={1.5} />
          
          <div className="absolute inset-0 flex items-center justify-center z-0">
             <div className="flex items-center gap-1.5 ml-2 mt-[2px]">
               <Layers size={18} strokeWidth={2} className="text-black" />
               <span className="font-bold text-[17px] tracking-wide text-black pb-0.5">All Files</span>
               <ChevronDown size={14} className="text-gray-300 mt-1 -ml-0.5" strokeWidth={2.5} />
             </div>
          </div>
        </div>
      </div>

      {/* 2. Dropdown Menu Array */}
      <div className="flex flex-col bg-[#F9F9F9] py-1 z-20">
        {menuItems.map((item, index) => (
           <div key={index} className="flex items-center gap-[22px] px-[22px] h-[48px]">
              <div className="flex items-center justify-center w-[20px]">
                 {item.icon}
              </div>
              <span className="text-[17px] text-[#1D1C1D] leading-none mb-px">{item.label}</span>
           </div>
        ))}
      </div>

      {/* 3. Base Content Container (Visible beneath the modal overlay) */}
      <div className="flex flex-col flex-1 relative bg-white overflow-hidden pointer-events-none">
        
        {/* Actual Under-Content */}
        <div className="flex flex-col w-full h-full">
           
           {/* Previous Tabs from Page-08 */}
           <div className="flex w-full h-[46px] border-b ios-border">
              <div className="flex-1 bg-[#1878F3] text-white flex items-center justify-center text-[16px]">Everyone</div>
              <div className="flex-1 bg-[#F4F4F4] text-[#333333] flex items-center justify-center text-[16px]">Just You</div>
           </div>

           {/* Empty State Instructions */}
           <div className="flex flex-col px-5 pt-8 gap-7 w-full h-full bg-white text-left">
              <p className="text-[17px] text-[#A1A1AA] leading-[1.3] w-[95%]">
                Files live in channels, but you can search and sort them here.
              </p>
              <p className="text-[17px] text-[#A1A1AA] leading-[1.3] w-[100%] pr-2">
                To add a file, head back to a channel and tap the file button below the message input.
              </p>
           </div>
        </div>
        
        {/* Dark Modal Overlay */}
        <div className="absolute inset-0 bg-[#000000] opacity-[0.55] z-10 transition-opacity"></div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/60 rounded-full z-30 pointer-events-none"></div>

    </div>
  );
}
