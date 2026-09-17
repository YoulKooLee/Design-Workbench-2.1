import React from 'react';
import { 
  Signal, Navigation, 
  MoreVertical, Search, AtSign, Image as ImageIcon,
  Paperclip, Globe, Mic, User
} from 'lucide-react';
import './style.css';
import vikingAvatar from '../page-14/viking_avatar.png';


const DropdownRow = ({ statusNode, avatarNode, boldText, greyText, extraNode }: any) => (
   <div className="w-full flex items-center h-[42px] pl-[14px] pr-2 bg-white border-t border-[#E5E5EA]">
      <div className="w-[14px] flex items-center justify-center mr-[12px]">
         {statusNode}
      </div>
      <div className="w-[24px] h-[24px] rounded-[4px] overflow-hidden mr-[10px]">
         {avatarNode}
      </div>
      <div className="flex items-baseline flex-1 truncate pb-[1.5px]">
         <span className="text-[16px] text-black font-[600] tracking-tight mr-[5px]">{boldText}</span>
         {greyText && <span className="text-[16px] text-[#8E8E93] font-normal tracking-tight">{greyText}</span>}
         {extraNode}
      </div>
   </div>
);


/**
 * @name Slack Compose Mention Autocomplete
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-[#F9F9F9] font-sans shadow-2xl relative select-none overflow-hidden">
      
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
               <svg width="10" height="6" viewBox="0 0 24 24" fill="none" stroke="#8A8A8E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 relative left-px">
                  <polyline points="6 9 12 15 18 9"></polyline>
               </svg>
            </div>
         </div>

         <div className="flex items-center gap-[18px]">
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

      {/* 3. Conversation Viewport Background Container (Truncated by subsequent fixed flow) */}
      <div className="flex-1 w-full bg-white overflow-hidden px-[16px] pt-1 pb-0 flex flex-col gap-4">
        
        <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
          Slack channel or conversation, ask me about how to <span className="font-bold">upload files</span>.
        </p>

        <p className="text-[17px] text-[#1D1C1D] leading-[1.3] tracking-tight">
          I love when messages are all gussied up! Here are some shortcuts for making your messages a bit fancier:
        </p>

        {/* Block 1: Bold Format */}
        <div className="flex flex-col gap-0.5 mb-2">
          <p className="text-[17px] text-[#1D1C1D] font-bold leading-[1.3] tracking-tight">
            Surround a word or phrase with asterisks to make it bold:
          </p>
          <div>
            <span className="bg-[#F8F9F9] border border-[#E5E5EA] rounded-[3px] px-1.5 py-[2px] text-[14.5px] font-mono tracking-tighter text-[#DF1A55]">
              *this text will appear bold*
            </span>
          </div>
        </div>
      </div>

      {/* 4. Typeahead Mentions Dropdown Overlap (`z-20` layer masking Chat) */}
      <div className="w-full bg-white flex flex-col z-20 shrink-0">
          
         <DropdownRow 
            statusNode={
              <div className="relative flex items-center justify-center">
                 <div className="w-[11px] h-[11px] border-[1.5px] border-[#2BAC76] rounded-full"></div>
                 <span className="absolute -top-[4px] -right-[6px] text-[#2BAC76] text-[8px] font-bold">z</span>
              </div>
            }
            avatarNode={<img src={vikingAvatar} className="w-full h-full object-cover scale-110" />}
            boldText="huang"
            greyText="Jensen"
            extraNode={
              <div className="flex items-center ml-2 border-l border-[#C7C7CC] pl-[9px] h-[16px] overflow-hidden transform translate-y-[0px]">
                 <span className="mr-[6px] text-[15px] leading-none mb-[2px]">🌴</span> 
                 <span className="text-[#8E8E93] text-[15.5px] tracking-tight font-normal leading-none pt-px">Vacationing</span>
              </div>
            }
         />

         <DropdownRow 
            statusNode={<span className="text-[#2BAC76] text-[12px] leading-none">❤</span>}
            avatarNode={
              <div className="w-full h-full bg-[#FAFAFA] flex flex-wrap gap-[1px] p-[1.5px] border border-[#E8E8EB]">
                <div className="w-[8px] h-[8px] bg-[#E01E5A] rounded-tl-[3px] rounded-br-[3px]"></div>
                <div className="w-[8px] h-[8px] bg-[#36C5F0] rounded-tr-[3px] rounded-bl-[3px]"></div>
                <div className="w-[8px] h-[8px] bg-[#ECB22E] rounded-bl-[3px] rounded-tr-[3px]"></div>
                <div className="w-[8px] h-[8px] bg-[#2EB67D] rounded-br-[3px] rounded-tl-[3px]"></div>
              </div>
            }
            boldText="Slackbot"
            greyText="Slackbot"
         />

         <DropdownRow 
            statusNode={<div className="w-[11px] h-[11px] border-[1.5px] border-[#8E8E93] rounded-full"></div>}
            avatarNode={
              <div className="w-full h-full bg-[#EFB236] relative flex overflow-hidden rounded-[4px]">
                <div className="w-[10px] h-[16px] bg-[#D62E55] rounded-r-full absolute left-0 top-[4px]"></div>
                <div className="w-[6px] h-[16px] bg-[#D62E55] absolute right-[2px] top-[4px] rounded-[1px]"></div>
              </div>
            }
            boldText="360 Mockups"
            greyText="360 Mockups"
         />

         <DropdownRow 
            statusNode={<div className="w-[11px] h-[11px] border-[1.5px] border-[#8E8E93] rounded-full"></div>}
            avatarNode={
              <div className="w-full h-full bg-[#FFFFFF] border border-[#E5E5EA] flex overflow-hidden rounded-[4px]">
                <div className="w-1/2 h-full bg-[#E01E5A]"></div>
                <div className="w-1/2 h-full bg-[#36C5F0] rounded-none"></div>
              </div>
            }
            boldText="Aakriti"
            greyText="Aakriti Shroff"
         />

         <DropdownRow 
            statusNode={<div className="w-[11px] h-[11px] border-[1.5px] border-[#8E8E93] rounded-full"></div>}
            avatarNode={
              <div className="w-full h-full bg-[#E5E5EA] flex items-center justify-center overflow-hidden rounded-[4px] border border-[#D1D1D6]">
                <User size={16} fill="white" className="text-white mt-1" />
              </div>
            }
            boldText="aali"
            greyText="Ahmed Ramadan"
         />

         <DropdownRow 
            statusNode={<div className="w-[11px] h-[11px] border-[1.5px] border-[#8E8E93] rounded-full"></div>}
            avatarNode={
              <div className="w-full h-full bg-[#2BAC76] relative overflow-hidden rounded-[4px]">
                <div className="absolute right-0 bottom-0 w-[14px] h-[14px] bg-[#ECB22E] rounded-tl-[6px]"></div>
              </div>
            }
            boldText="aaron"
            greyText="Aaron Amir"
         />

      </div>

      {/* 5. Compose Text Input & Bottom Media Toolbar (Sitting directly on Keyboard) */}
      <div className="w-full bg-white flex flex-col border-t border-[#E5E5EA] z-20 shrink-0">
        
        {/* Active Typing Input Area */}
        <div className="flex items-center justify-between px-[14px] pt-[7px] pb-[7px] relative bg-white">
           <div className="flex-1 flex items-center text-[19px] text-[#1D1C1D] font-normal leading-none h-[22px]">
              @
              {/* Blinking blue cursor marker */ }
              <div className="w-[2px] h-[21px] bg-[#0B82E5] shadow-[0_0_1px_rgba(11,130,229,0.3)] ml-[0.5px]"></div>
           </div>
           
           {/* Expand text-area icon */}
           <div className="absolute right-4 top-[10px] cursor-pointer">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="15 3 21 3 21 9" />
                 <polyline points="9 21 3 21 3 15" />
                 <line x1="21" y1="3" x2="14" y2="10" />
                 <line x1="3" y1="21" x2="10" y2="14" />
             </svg>
           </div>
        </div>
        
        {/* Media Toolbar Row */}
        <div className="flex items-center gap-[18px] pl-4 pr-3 py-[9px] bg-white w-full z-10 border-t border-transparent relative shrink-0">
          
          <AtSign size={23} className="text-[#0B82E5]" strokeWidth={1.8} />
          
          <div className="relative w-[21px] h-[21px] rounded-[4px] border-[1.5px] border-[#E8E8EB] flex items-center justify-center overflow-hidden">
             <div className="w-[1.5px] h-[26px] bg-[#E8E8EB] rotate-[32deg]"></div>
          </div>
          
          <Paperclip size={21} className="text-[#9B9B9E] transform -rotate-[40deg] relative top-0.5" strokeWidth={1.5} />

          {/* Right aligned Send Controls payload */}
          <div className="flex flex-1 justify-end items-center gap-[16px]">
              <ImageIcon size={23} className="text-[#9B9B9E]" strokeWidth={1.5} />
              <div className="bg-[#18A0FB] rounded-[4px] px-[12px] h-[30px] flex items-center justify-center cursor-pointer shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                 <span className="text-white text-[15px] font-bold tracking-tight">Send</span>
              </div>
          </div>
        </div>
      </div>

      {/* 6. Native iOS T9 Keyboard Module (Occupying Absolute Bottom height space) */}
      <div className="w-full bg-[#D1D3D9] flex flex-col pb-6 relative z-40 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        
        {/* Autocomplete Bar */}
        <div className="flex h-[42px] items-center border-[0.5px] border-black/10 bg-[#D1D3D9]">
          <div className="flex-1 text-center text-[16px] text-black h-[60%] flex items-center justify-center font-[400] tracking-tight relative">
             The
             <div className="absolute right-0 top-[10%] h-[80%] w-[1px] bg-[#8E8E93]/40"></div>
          </div>
          <div className="flex-1 text-center text-[16px] text-black h-[60%] flex items-center justify-center font-[400] tracking-tight relative">
             Hello
             <div className="absolute right-0 top-[10%] h-[80%] w-[1px] bg-[#8E8E93]/40"></div>
          </div>
          <div className="flex-1 text-center text-[16px] text-black h-[60%] flex items-center justify-center font-[400] tracking-tight">You</div>
        </div>
        
        {/* Key Roster Maps */}
        <div className="px-1.5 pt-[10px] pb-2 flex flex-col gap-[12px]">
          
          {/* Row 1 */}
          <div className="flex justify-center gap-[6px]">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black">{k}</div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-center gap-[6px] px-[18px]">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black">{k}</div>
            ))}
          </div>
          
          {/* Row 3 - Contains Functional Modifiers */}
          <div className="flex justify-between gap-[6px] px-0.5">
            {/* Shift Key Active State (White Background with Black Arrow) */}
            <div className="w-[42px] h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="0">
                 <path d="M2 13L12 3L22 13H16.5V20.5H7.5V13H2Z" fill="black" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <div className="flex flex-1 justify-center gap-[6px]">
              {['Z','X','C','V','B','N','M'].map(k => (
                <div key={k} className="flex-1 h-[42px] bg-[#FFFFFF] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center font-[400] text-[24px] pb-[3px] text-black max-w-[32px]">{k}</div>
              ))}
            </div>

            {/* Backspace Key */}
            <div className="w-[42px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_#8E8E93] flex items-center justify-center pr-0.5">
               <svg width="22" height="18" viewBox="0 0 26 20" fill="none" stroke="black" strokeWidth="1.6">
                 <path d="M9 2 L24 2 A2 2 0 0 1 26 4 L26 16 A2 2 0 0 1 24 18 L9 18 L2 10 Z" strokeLinejoin="round" />
                 <path d="M13 7 L19 13 M19 7 L13 13" strokeLinecap="round" strokeWidth="1.4"/>
               </svg>
            </div>
          </div>

          {/* Row 4 - Standard Space bar assembly */}
          <div className="flex justify-between gap-[6px] px-0.5">
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#8E8E93] text-[16px] text-black pb-0.5 font-[400] tracking-tight">123</div>
            <div className="flex-1 h-[42px] bg-[#FFFFFF] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#8E8E93] text-[16px] text-black pb-0.5 font-[400] tracking-tight">space</div>
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] flex items-center justify-center rounded-[5px] shadow-[0_1px_0_#8E8E93] text-[16px] text-black tracking-tight pb-0.5 font-[400]">return</div>
          </div>
        </div>

        {/* Global Keyboards Exts (Globe & Voice input) */}
        <div className="flex justify-between items-center px-[22px] pt-1 pb-0">
           <Globe size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
           <Mic size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
        </div>

      </div>

      {/* Global iOS Home Indicator overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-50 pointer-events-none opacity-80"></div>

    </div>
  );
}
