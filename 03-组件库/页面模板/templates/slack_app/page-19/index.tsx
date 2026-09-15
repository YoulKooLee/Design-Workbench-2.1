import React from 'react';
import { 
  Signal, Navigation, Camera,
  MoreVertical, Search, AtSign, Paperclip, Image as ImageIcon
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Media Upload Drawer View
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Global iOS Status Bar Layer */}
      <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black z-40 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-1 drop-shadow-sm">
          <span>7:45</span>
          <Navigation size={12} className="ml-1 -rotate-45" fill="black" stroke="black" />
        </div>
        <div className="flex items-center gap-1.5 drop-shadow-sm">
          <Signal size={14} fill="currentColor" strokeWidth={1} />
          <span className="text-[12px] font-bold">4G</span>
          <div className="relative">
            <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1.5]">
              <rect x="1" y="2" width="20" height="8" rx="2" stroke="currentColor"/>
              <path d="M23 4 V8" strokeLinecap="round" stroke="currentColor"/>
            </svg>
            <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-black rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* 2. Top Header Layer */}
      <div className="w-full flex items-center justify-between px-4 mt-[40px] pb-3 border-b border-[#E5E5EA] bg-white z-30">
         <div className="flex items-center gap-[12px]">
            {/* Hash Logo built with pure CSS */}
            <div className="w-[20px] h-[20px] flex flex-wrap relative ml-1">
                <div className="w-[5.5px] h-[13px] bg-[#E01E5A] absolute top-[-1px] left-[4px] rounded-full"></div>
                <div className="w-[5.5px] h-[13px] bg-[#36C5F0] absolute bottom-[-1px] right-[4px] rounded-full"></div>
                <div className="w-[13px] h-[5.5px] bg-[#2EB67D] absolute top-[4px] right-[-1px] rounded-full"></div>
                <div className="w-[13px] h-[5.5px] bg-[#ECB22E] absolute bottom-[4px] left-[-1px] rounded-full"></div>
            </div>
            
            <div className="flex items-center gap-[5px]">
               <span className="font-[800] text-[19px] text-[#1D1C1D] tracking-tight">Slackbot</span>
               <span className="text-[#2BAC76] text-[13px] relative -top-px ml-0.5">❤</span>
               <svg width="10" height="6" viewBox="0 0 24 24" fill="none" stroke="#8A8A8E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <polyline points="6 9 12 15 18 9"></polyline>
               </svg>
            </div>
         </div>

         <div className="flex items-center gap-[18px]">
            {/* Custom Snooze Bell SVG mapping exactly to Slack UI */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#48484B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              <path d="M10 5 L12 5 L10 7 L12 7" strokeWidth="1.2" />
              <path d="M14 3 L15.5 3 L14 5 L15.5 5" strokeWidth="1.2" />
            </svg>
            <Search size={22} className="text-[#48484B]" strokeWidth={1.8} />
            <MoreVertical size={22} className="text-[#48484B] -mr-1" strokeWidth={2.5} />
         </div>
      </div>

      {/* 3. Conversation Viewport */}
      <div className="flex-1 w-full bg-white overflow-y-auto px-[16px] pt-1 pb-4 flex flex-col gap-4">
        
        <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
          Slack channel or conversation, ask me about how to <span className="font-bold">upload files</span>.
        </p>

        <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
          I love when messages are all gussied up! Here are some shortcuts for making your messages a bit fancier:
        </p>

        {/* Block 1: Bold Format */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] text-[#1D1C1D] font-bold leading-[1.3] tracking-tight">
            Surround a word or phrase with asterisks to make it bold:
          </p>
          <div>
            <span className="bg-[#F8F9F9] border border-[#E5E5EA] rounded-[3px] px-1.5 py-[2px] text-[14.5px] font-mono tracking-tighter text-[#DF1A55]">
              *this text will appear bold*
            </span>
          </div>
        </div>

        {/* Block 2: Italic Format */}
        <div className="flex flex-col gap-0.5 mt-0.5">
          <p className="text-[17px] text-[#1D1C1D] italic leading-[1.3] tracking-tight pr-2">
            And surround a word or phrase with underscores to italicize it:
          </p>
          <div>
            <span className="bg-[#F8F9F9] border border-[#E5E5EA] rounded-[3px] px-1.5 py-[2px] text-[14.5px] font-mono tracking-tighter text-[#DF1A55]">
              _this text will appear in italics_
            </span>
          </div>
        </div>

        {/* Block 3: Blockquote Format */}
        <div className="flex flex-col border-l-4 border-[#E5E5EA] pl-[12px] mt-1 mb-1 gap-1">
          <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
            Or turn a line of text into an indented quote by adding an angled bracket at the start of the line:
          </p>
          <div>
            <span className="bg-[#F8F9F9] border border-[#E5E5EA] rounded-[3px] px-1.5 py-[2px] text-[14.5px] font-mono tracking-tighter text-[#DF1A55]">
              &gt; This will be a line of quoted text.
            </span>
          </div>
        </div>

        <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
          Want even more tips? Visit our <span className="text-[#0B82E5]">Help Center</span>!
        </p>

      </div>

      {/* 4. Compose Toolbar & Formatting Controls */}
      <div className="w-full bg-white flex flex-col border-t border-[#E5E5EA] z-20">
        
        {/* Active Typing Input Area */}
        <div className="flex items-center justify-between px-[14px] pt-[10px] pb-[8px] relative bg-white">
           <div className="flex-1 text-[17px] text-[#1D1C1D] font-normal leading-none h-[22px]">@</div>
           {/* Expand icon mimicking text input expansion in early UI frames */}
           <div className="absolute right-4 top-3 cursor-pointer">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="15 3 21 3 21 9" />
                 <polyline points="9 21 3 21 3 15" />
                 <line x1="21" y1="3" x2="14" y2="10" />
                 <line x1="3" y1="21" x2="10" y2="14" />
             </svg>
           </div>
        </div>
        
        {/* Media Toolbar Row */}
        <div className="flex items-center justify-between px-3 py-[9px] bg-white w-full z-10 border-t border-transparent">
           {/* Left Attach Controls */}
           <div className="flex items-center gap-[18px] pl-1">
              <AtSign size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              <div className="relative w-[21px] h-[21px] rounded-[4px] border-[1.5px] border-[#E8E8EB] flex items-center justify-center overflow-hidden">
                 <div className="w-[1.5px] h-[26px] bg-[#E8E8EB] rotate-[32deg]"></div>
              </div>
              <Paperclip size={21} className="text-[#9B9B9E] transform -rotate-45 relative top-0.5" strokeWidth={1.5} />
           </div>

           {/* Right Send Controls */}
           <div className="flex items-center gap-[16px]">
              <ImageIcon size={23} className="text-[#0B82E5]" strokeWidth={1.8} />
              <div className="bg-[#18A0FB] rounded-[4px] px-[12px] py-[6px] flex items-center justify-center cursor-pointer shadow-sm">
                 <span className="text-white text-[15px] font-bold tracking-tight">Send</span>
              </div>
           </div>
        </div>
      </div>

      {/* 5. Access Permission Drawer Extruding from Bottom */}
      <div className="w-full flex h-[260px] z-20">
         
         {/* Left Side: Photo Source Modes */}
         <div className="w-[78px] bg-[#222222] flex flex-col h-full items-center pt-2 pb-6 border-r border-[#1D1C1D]">
            <div className="flex-1 w-full flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100">
               <Camera size={26} className="text-white relative top-2" fill="white" />
            </div>
            <div className="flex-1 w-full flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100">
               {/* Synthetically generating a perfectly spaced 3x3 layout square array imitating LayoutGrid filled */}
               <div className="grid grid-cols-3 gap-[2px] relative bottom-3">
                 {[...Array(9)].map((_,i) => <div key={i} className="w-[6px] h-[6px] bg-white rounded-[1px]"></div>)}
               </div>
            </div>
         </div>
         
         {/* Right Side: Photo Auth Interface */}
         <div className="flex-1 bg-[#FAFAFA] flex flex-col items-center justify-center pb-6 px-4">
            
            {/* Custom crafted SVG imitating the generic "Gallery Empty State" art frame by frame */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="mb-[6px] -ml-2 drop-shadow-sm">
              <rect x="25" y="32" width="62" height="42" rx="3" fill="#2E2442" transform="rotate(-6 57 53)" />
              <g transform="rotate(-15 65 38)">
                <rect x="30" y="15" width="70" height="48" rx="4" fill="white" />
                <mask id="innerPic">
                  <rect x="34" y="19" width="62" height="40" rx="3" fill="white" />
                </mask>
                <g mask="url(#innerPic)">
                  <rect x="30" y="15" width="70" height="48" fill="#4198DF" />
                  <circle cx="75" cy="30" r="7" fill="#FECE3C" />
                  <path d="M 20 65 L 50 40 L 70 52 L 85 38 L 120 58 L 120 80 L 20 80 Z" fill="#61C3A5" />
                </g>
              </g>
            </svg>

            <h2 className="text-[14.5px] text-[#1D1C1D] font-bold tracking-tight mb-[2px]">Share photos with just a tap</h2>
            <p className="text-[13.5px] text-[#A1A1A5] text-center leading-[1.3] mb-[18px] tracking-tight px-2">To get started, allow Slack to access your photos.</p>
            
            <button onClick={() => window.location.hash = 'page=page-20'} className="w-auto px-[18px] h-[36px] bg-white border border-[#C7C7CC] rounded-[4px] text-[15px] font-bold text-[#48484B] shadow-[0_1px_2px_rgba(0,0,0,0.05)] active:bg-gray-50 flex items-center justify-center tracking-tight">
              Allow Access
            </button>

         </div>
      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-40 pointer-events-none opacity-80"></div>

    </div>
  );
}
