import React from 'react';
import { 
  Signal, Navigation, 
  MoreVertical, Search, AtSign, Image as ImageIcon
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Files Management Empty State
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
      <div className="w-full bg-white flex flex-col border-t border-[#E5E5EA] z-20 shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
        
        {/* Active Typing Input Area */}
        <div className="flex items-center justify-between px-[14px] pt-[10px] pb-[8px] relative bg-white">
           <div className="flex-1 text-[17px] text-[#1D1C1D] font-normal leading-none h-[22px]">@</div>
           {/* Expand icon */}
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
        <div className="flex items-center justify-between px-3 py-[9px] bg-white w-full z-10 border-t border-transparent relative">
           {/* Left Attach Controls */}
           <div className="flex items-center gap-[18px] pl-1 relative">
              <AtSign size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              
              <div className="relative w-[21px] h-[21px] rounded-[4px] border-[1.5px] border-[#E8E8EB] flex items-center justify-center overflow-hidden">
                 <div className="w-[1.5px] h-[26px] bg-[#E8E8EB] rotate-[32deg]"></div>
              </div>
              
              {/* Specialized Application Document Attachment Icon - ACTIVE STATE */}
              {/* Handcrafted to perfectly match Slack's proprietary 'Document with Paperclip' icon */}
              <div className="relative w-[24px] h-[24px] ml-0.5">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   {/* Filled blue Document body */}
                   <path d="M6 3C5.447 3 5 3.447 5 4V20C5 20.553 5.447 21 6 21H18C18.553 21 19 20.553 19 20V9L13 3H6Z" fill="#0B82E5" />
                   {/* Fold */}
                   <path d="M13 3V8.5C13 8.776 13.224 9 13.5 9H19" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                   {/* Clamped White Paperclip */}
                   <path d="M7.5 12V16.5C7.5 17.88 8.62 19 10 19C11.38 19 12.5 17.88 12.5 16.5V11C12.5 10.448 12.052 10 11.5 10C10.948 10 10.5 10.448 10.5 11V16C10.5 16.276 10.276 16.5 10 16.5C9.724 16.5 9.5 16.276 9.5 16V12H7.5Z" fill="white" />
                 </svg>
              </div>
           </div>

           {/* Right Send Controls */}
           <div className="flex items-center gap-[16px]">
              {/* INACTIVE Image Gallery Icon */}
              <ImageIcon size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              
              <div className="bg-[#18A0FB] rounded-[4px] px-[12px] py-[6px] flex items-center justify-center cursor-pointer shadow-sm">
                 <span className="text-white text-[15px] font-bold tracking-tight">Send</span>
              </div>
           </div>
        </div>
      </div>

      {/* 5. Files Empty State Drawer Extruding from Bottom */}
      <div className="w-full flex justify-center h-[280px] z-20 bg-[#F9F9F9]">
         
         <div className="flex flex-col items-center pt-[30px] px-4 w-full">
            
            {/* Custom crafted SVG imitating the "Empty Files" art */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="mb-[18px]">
              {/* Back Document Shape */}
              <g transform="rotate(-15 45 40)">
                <rect x="15" y="25" width="55" height="42" rx="2" fill="#E6E7E8" stroke="#FFFFFF" strokeWidth="3" />
              </g>
              {/* Front Document Shape heavily accented with white border against off-white bg */}
              <g transform="rotate(6 60 45)">
                <rect x="35" y="15" width="60" height="46" rx="2" fill="#E6E7E8" stroke="#FFFFFF" strokeWidth="4.5" />
                
                {/* Exclamation Warning Sign */}
                <circle cx="65" cy="38" r="8" stroke="#AEAEB2" strokeWidth="2" />
                <line x1="65" y1="34" x2="65" y2="39" stroke="#A9A9A9" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="65" cy="43.5" r="1.3" fill="#A9A9A9" />
              </g>
            </svg>

            <h2 className="text-[14.5px] text-[#48484B] font-medium tracking-tight mb-[16px] ml-1">You have no files in Slack</h2>
            
            <button onClick={() => window.location.hash = 'page=page-21'} className="w-[145px] h-[36px] bg-transparent border border-[#C7C7CC] rounded-[4px] text-[14.5px] font-[600] text-[#4A4A4D] ml-1 flex items-center justify-center tracking-tight active:bg-gray-100 transition-colors">
              Add a File
            </button>

         </div>

      </div>

      {/* Global iOS Home Indicator overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-40 pointer-events-none opacity-80"></div>

    </div>
  );
}
