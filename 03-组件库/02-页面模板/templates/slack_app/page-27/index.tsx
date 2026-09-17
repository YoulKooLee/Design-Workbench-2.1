import React from 'react';
import { 
  Search, MoreVertical, ChevronDown, User, Plug, 
  AtSign, Paperclip, Image as ImageIcon
} from 'lucide-react';
import './style.css';
import vikingAvatar from '../page-14/viking_avatar.png';

/**
 * @name Slackbot Direct Message Chat
 */
export default function SlackApp() {

  // Components inline for fast prototypical rendering 1:1
  const SlackBrandLogo = ({className="w-[28px] h-[28px]"}) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
       {/* Red - Top Left */}
       <path d="M10,40 a15,15 0 0 0 15,15 h15 a15,15 0 0 0 0,-30 h-15 a15,15 0 0 0 -15,15 z" fill="#E01E5A" />
       <circle cx="25" cy="25" r="15" fill="#E01E5A" />
  
       {/* Blue - Top Right */}
       <path d="M60,10 a15,15 0 0 0 -15,15 v15 a15,15 0 0 0 30,0 v-15 a15,15 0 0 0 -15,-15 z" fill="#36C5F0" />
       <circle cx="75" cy="25" r="15" fill="#36C5F0" />
  
       {/* Green - Bottom Right */}
       <path d="M90,60 a15,15 0 0 0 -15,-15 h-15 a15,15 0 0 0 0,30 h15 a15,15 0 0 0 15,-15 z" fill="#2EB67D" />
       <circle cx="75" cy="75" r="15" fill="#2EB67D" />
  
       {/* Yellow - Bottom Left */}
       <path d="M40,90 a15,15 0 0 0 15,-15 v-15 a15,15 0 0 0 -30,0 v15 a15,15 0 0 0 15,15 z" fill="#ECB22E" />
       <circle cx="25" cy="75" r="15" fill="#ECB22E" />
    </svg>
  );

  const SlackbotAvatar = ({ className="w-[74px] h-[74px] rounded-[16px]" }) => (
    <svg viewBox="0 0 100 100" className={`overflow-hidden shadow-sm ${className}`} xmlns="http://www.w3.org/2000/svg">
       <path d="M0 0 h50 v50 h-50 z" fill="#36C5F0" />
       <path d="M50 0 h50 v50 h-50 z" fill="#2EB67D" />
       <path d="M0 50 h50 v50 h-50 z" fill="#E01E5A" />
       <path d="M50 50 h50 v50 h-50 z" fill="#ECB22E" />
       <path d="M 12 50 C 12 85, 30 100, 50 100 C 70 100, 88 85, 88 50 C 88 20, 65 15, 50 25 C 35 15, 12 20, 12 50 Z" fill="white" />
       <circle cx="34" cy="45" r="8" fill="#52392E" />
       <circle cx="37" cy="42" r="2.5" fill="white" />
       <circle cx="66" cy="45" r="8" fill="#52392E" />
       <circle cx="69" cy="42" r="2.5" fill="white" />
       <path d="M 40 60 C 45 68, 55 68, 60 60" fill="none" stroke="#52392E" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );

  const BellSnooze = () => (
    <div className="relative mt-px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D1C1D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
         <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      {/* Sleeping overlay cut-out */}
      <div className="absolute -top-1 -right-1 bg-white border border-white rounded-full pl-0.5 pt-0.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1D1C1D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M4 8h8l-8 8h8" />
           <path d="M14 2h6l-6 8h6" className="transform translate-x-2 -translate-y-2 scale-[0.6]" />
        </svg>
      </div>
    </div>
  );

  const PlugIcon = () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E8732A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ml-[1px]">
       <path d="M12 22v-4" />
       <path d="M9 8V2" strokeWidth="1.8" />
       <path d="M15 8V2" strokeWidth="1.8" />
       <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Global iOS Status Bar & Header Container */}
      <div className="bg-white sticky top-0 z-20 shadow-[0_0.5px_0_#E5E5EA]">
        {/* iOS Status Bar */}
        <div className="flex justify-between items-center px-4 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black">
          <div className="flex items-center">
            <span className="font-semibold text-[14px] leading-none ml-1 tracking-wider">7:44</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1 -mt-0.5" stroke="currentColor" strokeWidth="2">
              <path d="M 22 2 L 2 22 L 22 22 Z" stroke="none" fill="black" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1">
                <rect x="1" y="16" width="3" height="4" rx="1" />
                <rect x="6" y="12" width="3" height="8" rx="1" />
                <rect x="11" y="8" width="3" height="12" rx="1" />
                <rect x="16" y="4" width="3" height="16" rx="1" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight -ml-0.5">4G</span>
            <div className="relative transform scale-90 -mr-1">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1px]">
                <rect x="1" y="1" width="20" height="10" rx="3" fill="none" strokeWidth={1} />
                <path d="M22.5 4 V8" strokeLinecap="round" strokeWidth={1.5} />
              </svg>
              <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-black rounded-[1.5px]"></div>
            </div>
          </div>
        </div>

        {/* Top App Header */}
        <div className="flex justify-between items-center px-4 h-[44px]">
          <div className="flex items-center gap-1.5 -ml-0.5">
             <SlackBrandLogo className="w-[28px] h-[28px]" />
             <div className="flex items-center gap-[4px] mt-0.5 ml-1.5">
                 <span className="font-[800] text-[17px] tracking-tight text-[#1D1C1D]">Slackbot</span>
                 <span className="text-[#2BAC76] text-[12px] opacity-90 pb-[1.5px]">❤</span>
                 <ChevronDown size={14} className="text-[#1D1C1D] ml-0.5 opacity-60" strokeWidth={2.5} />
             </div>
          </div>
          
          <div className="flex items-center gap-[22px] text-[#1D1C1D] -mr-0.5 mt-0.5">
              <BellSnooze />
              <Search size={22} strokeWidth={2} className="opacity-90" />
              <MoreVertical size={22} strokeWidth={2} className="-ml-2 opacity-90" />
          </div>
        </div>
      </div>

      {/* 2. Scrollable Chat Content */}
      <div className="flex flex-col flex-1 overflow-y-auto w-full pb-4">
         
         {/* Top Greeting Block */}
         <div className="w-full bg-white px-4 pt-5 pb-2 border-b border-[#E5E5EA]">
             <SlackbotAvatar className="w-[74px] h-[74px] rounded-[16px] shadow-sm mb-[22px]" />
             
             <h1 className="text-[25px] font-[800] text-[#1D1C1D] tracking-tight mb-4 leading-none">
                 Hi, Slackbot here!
             </h1>
             
             <p className="text-[17px] text-[#616061] leading-[1.3] tracking-tight mb-[24px]">
                Feel free to ask me simple questions about Slack, like:<br/>How do I add a profile photo?
             </p>
             
             <p className="text-[17px] text-[#616061] leading-[1.3] tracking-tight mb-[28px]">
                By the way, adding a photo will help everyone you work<br/>with! Here's a handy link or two:
             </p>

             <div className="flex flex-col gap-[22px] mb-5">
                 <div className="flex items-center gap-3">
                     <User size={23} className="text-[#2EB67D]" strokeWidth={1.8} />
                     <span className="text-[17px] text-[#616061] tracking-tight font-normal">Edit Profile</span>
                 </div>
                 <div className="flex items-center gap-3">
                     <PlugIcon />
                     <span className="text-[17px] text-[#616061] tracking-tight font-normal pb-0.5">Add Apps & Bots</span>
                 </div>
             </div>
         </div>

         {/* Chat Feed */}
         <div className="flex flex-col w-full bg-white">
            
            {/* User Message */}
            <div className="flex gap-[14px] px-4 py-2 mt-2 hover:bg-[#F8F8F8] cursor-pointer">
               <div className="w-[36px] h-[36px] rounded-[6px] mt-1 shrink-0 bg-[#E5E5EA] overflow-hidden border border-black/5">
                  <img src={vikingAvatar} className="w-full h-full object-cover scale-[1.1]" alt="" />
               </div>
               <div className="flex flex-col flex-1 pb-1">
                  <div className="flex items-center gap-[6px] mb-0.5">
                     <span className="font-[800] text-[16px] text-[#1D1C1D] leading-none mt-px tracking-tight">huang</span>
                     <span className="text-[14px] leading-none mt-px">🌴</span>
                     <span className="font-normal text-[12px] text-[#8E8E93] leading-none ml-1">7:46 PM</span>
                  </div>
                  <div className="text-[15.5px] text-[#1D1C1D] font-normal leading-[1.46] tracking-tight mt-[3px]">
                     hello
                  </div>
               </div>
            </div>

            {/* Slackbot Response 1 */}
            <div className="flex gap-[14px] px-4 py-[7px] hover:bg-[#F8F8F8] cursor-pointer">
               <div className="w-[36px] h-[36px] mt-1 shrink-0">
                  <SlackbotAvatar className="w-full h-full rounded-[6px]" />
               </div>
               <div className="flex flex-col flex-1 pb-1">
                  <div className="flex items-center gap-[8px] mb-[5px]">
                     <span className="font-[800] text-[16px] text-[#1D1C1D] leading-none mt-px tracking-tight">Slackbot</span>
                     <span className="font-normal text-[12px] text-[#8E8E93] leading-none">7:46 PM</span>
                  </div>
                  <div className="text-[15.5px] text-[#1D1C1D] font-normal leading-[1.46] tracking-tight">
                     It's going to be a great day.
                  </div>
               </div>
            </div>

            {/* Slackbot Response 2 */}
            <div className="flex gap-[14px] px-4 py-[7px] hover:bg-[#F8F8F8] cursor-pointer">
               <div className="w-[36px] h-[36px] mt-1 shrink-0">
                  <SlackbotAvatar className="w-full h-full rounded-[6px]" />
               </div>
               <div className="flex flex-col flex-1 pb-1">
                  <div className="flex items-center gap-[8px] mb-[6px]">
                     <span className="font-[800] text-[16px] text-[#1D1C1D] leading-none mt-px tracking-tight">Slackbot</span>
                     <span className="font-normal text-[12px] text-[#8E8E93] leading-none">7:55 PM</span>
                  </div>
                  <div className="text-[15.5px] text-[#1D1C1D] font-normal leading-[1.42] tracking-tight">
                     Hello, I'm Slackbot. I try to be helpful. (But I'm still just a bot. Sorry!) <span className="font-[700]">Type something</span> and hit Enter to send your message.
                     <br/>
                     If you're not sure how to do something in Slack, <span className="font-[700]">just type your question below.</span>
                     <br/><br/>
                     Or press these buttons to learn about the
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* 3. Bottom Composer Toolbar (Fixed to bottom) */}
      <div className="w-full bg-white border-t ios-border px-3 pt-3 pb-[34px] relative z-20">
         <div className="w-full border border-[#C7C7CC] rounded-[10px] bg-white flex flex-col pt-[5px] pb-[5px]">
            {/* Input Fake Box */}
            <div className="flex h-[36px] w-full items-center px-[14px] justify-between">
               <span className="text-[#8E8E93] text-[16px] tracking-tight font-normal pb-0.5">Message Slackbot</span>
               {/* Expand icon representation */}
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                   <path d="M 14 3 h 7 v 7" />
                   <path d="M 10 21 h -7 v -7" />
                   <path d="M 21 3 L 13 11" />
                   <path d="M 3 21 l 8 -8" />
               </svg>
            </div>
            
            {/* Tool Bar Base */}
            <div className="flex w-full items-center justify-between px-[6px] pt-1 pb-1">
                <div className="flex items-center gap-1">
                   <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[#616061]">
                       <AtSign size={20} strokeWidth={1.8} />
                   </div>
                   <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[#616061]">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" rx="3">
                           <rect x="3" y="3" border="true" width="18" height="18" rx="3" />
                           <line x1="16" y1="6" x2="8" y2="18" strokeWidth="1.8" />
                       </svg>
                   </div>
                   <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[#616061]">
                       <Paperclip size={19} strokeWidth={2} className="rotate-45 ml-px" />
                   </div>
                </div>
                <div className="flex items-center gap-2 pr-1">
                   <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[#616061]">
                      <ImageIcon size={21} strokeWidth={1.8} className="opacity-90" />
                   </div>
                   <div className="h-[30px] px-3.5 bg-white border-2 border-[#D1D1D6] rounded-[6px] flex items-center justify-center opacity-70">
                      <span className="text-[14px] font-[700] text-[#AEAEB2] tracking-wide pb-[1.5px]">Send</span>
                   </div>
                </div>
            </div>
         </div>
         
         {/* iOS Home Indicator */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#111] rounded-full pointer-events-none"></div>
      </div>

    </div>
  );
}
