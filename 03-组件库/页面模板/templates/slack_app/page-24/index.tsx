import React from 'react';
import { 
  Signal, Navigation, 
  Search, Globe, Mic,
  Smile, Keyboard, ChevronDown
} from 'lucide-react';
import './style.css';


const ModifierRow = ({ term, desc }: { term: string, desc: string }) => (
  <div className="flex items-center justify-between h-[46px] pl-[14px] pr-4 bg-white w-full border-b border-[#E5E5EA]">
    <div className="flex items-center gap-[10px]">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A1A1A5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-px">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span className="text-[17px] text-[#1D1C1D] font-[600] tracking-tight">{term}</span>
    </div>
    <span className="text-[16px] text-[#A1A1A5] font-normal tracking-tight">{desc}</span>
  </div>
);

const KeyAction = ({ children, extraClass = "" }: any) => (
  <div className={`flex-[1] bg-[#BCC1CB] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#999BA0] active:bg-[#A9AEB8] ${extraClass}`}>
    {children}
  </div>
);

const KeyT9 = ({ num, chars, extraClass = "" }: any) => (
  <div className={`bg-white rounded-[5px] flex flex-col items-center justify-center shadow-[0_1px_0_#999BA0] active:bg-[#E5E5EA] overflow-hidden ${extraClass}`}>
    <span className="text-[11px] text-[#8E8E93] font-[500] tracking-tighter leading-none mt-[6px]">{num}</span>
    <span className="text-[21px] text-black font-[400] leading-none mt-[4px]">{chars}</span>
  </div>
);


/**
 * @name Slack Global Search Third-Party Keyboard View
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Universal Top Controls Assembly */}
      <div className="flex flex-col w-full z-30 bg-white">
        
        {/* Global iOS Status Bar Layer */}
        <div className="w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black z-40 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-1 drop-shadow-sm">
            <span>7:44</span>
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

        {/* Global Search Header Layer - EMPTY STATE Search Bar */}
        <div className="w-full flex items-center px-[10px] mt-[4px]">
           <div className="flex-1 h-[36px] bg-[#FFFFFF] border border-[#D1D1D6] rounded-[4px] flex items-center px-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
              <Search size={16} className="text-[#A1A1A5] shrink-0" strokeWidth={2.2} />
              
              <div className="ml-[6px] flex items-center text-[17px] leading-none h-full flex-1 pt-[2px] overflow-hidden tracking-tight">
                 <span className="whitespace-nowrap text-[#C7C7CC] pt-px">Search</span>
              </div>
           </div>
           
           <span className="text-[17px] text-[#8E8E93] ml-3 mr-[6px] pb-[1px] tracking-tight cursor-pointer active:opacity-70 transition-opacity">
              Cancel
           </span>
        </div>

        {/* Filter Tab Array (Messages vs Files) */}
        {/* Messages is Active in this view variant */}
        <div className="w-[calc(100%-20px)] mx-auto mt-4 h-[32px] flex rounded-[4px] border border-[#D1D1D6] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-3 bg-[#D1D1D6]">
           {/* Active Tab Overlapping Fill */}
           <div className="flex-1 bg-[#37A783] text-white text-[15px] font-[600] flex items-center justify-center cursor-pointer z-10 scale-[1.01]">
              Messages
           </div>
           {/* Inactive Tab Providing Natural Right Divider via Background */}
           <div className="flex-1 bg-white text-[#1D1C1D] text-[15px] font-[600] flex items-center justify-center cursor-pointer border-l border-[#D1D1D6] -ml-[1px]">
              Files
           </div>
        </div>
      </div>

      {/* 2. Modifiers Listing Viewport */}
      {/* Takes remaining height, background light grey spilling naturally to keyboard */}
      <div className="flex-1 w-full bg-[#F9F9F9] flex flex-col overflow-y-auto overflow-x-hidden border-t border-[#E5E5EA]">
         
         {/* Modifiers List Header */}
         <div className="w-full px-[14px] pt-[10px] pb-[7px] border-b border-[#E5E5EA]">
           <span className="text-[14px] text-[#8E8E93] font-medium tracking-tight">Search modifiers</span>
         </div>
         
         {/* Interactive Modifier Nodes Array */}
         <div className="w-full flex flex-col bg-white">
           <ModifierRow term="from:me" desc="My messages / files" />
           <ModifierRow term="has:star" desc="Starred items" />
           <ModifierRow term="in:Slackbot" desc="Current conversation" />
           <ModifierRow term="from:Slackbot" desc="Latest person" />
           <ModifierRow term="after:2019-04-24" desc="Last 30 Days" />
         </div>

      </div>

      {/* 3. Third-Party Chinese T9 Keyboard Module (Sogou Simulator) */}
      <div className="w-full bg-[#D1D3D9] flex flex-col z-40 shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] pb-6 relative">
        
        {/* Top Control Toolbar Array */}
        <div className="w-full h-[40px] bg-[#FFFFFF] flex items-center justify-between border-b border-[#D1D1D6]/60 pr-1 pl-[14px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)] z-10 box-border">
           <div className="flex items-center gap-[34px] pl-[6px]">
              
              {/* Sogou Brand Icon Node */}
              <div className="relative flex items-center justify-center w-[22px] h-[22px]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#48484B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8C16 5.5 14 4 12 4C9 4 8 6 8 8C8 11.5 16 11.5 16 15C16 18 14 20 12 20C9 20 8 18.5 8 16" />
                </svg>
                {/* Notification Pip */}
                <div className="absolute -top-[1.5px] -right-[5px] w-[11px] h-[11px] bg-[#E01E5A] rounded-full border-[1.5px] border-white flex items-center justify-center">
                   <span className="text-white text-[6px] font-bold leading-none -mt-px scale-90">1</span>
                </div>
              </div>
              
              {/* Accessory Tools */}
              <Smile size={23} className="text-[#8E8E93]" strokeWidth={1.8} />
              
              <Keyboard size={23} className="text-[#8E8E93]" strokeWidth={1.8} />
              
              <Search size={22} className="text-[#8E8E93]" strokeWidth={2} />

           </div>
           
           {/* Collapse Arrow Sector */}
           <div className="border-l border-[#E5E5EA] h-[28px] w-[46px] flex items-center justify-center active:opacity-60 cursor-pointer">
              <ChevronDown size={22} className="text-[#8E8E93]" strokeWidth={1.5} />
           </div>
        </div>
        
        {/* Keyboard Input Grid Matrix */}
        <div className="w-full flex flex-col gap-1.5 px-1.5 pt-1.5 pb-2 border-t border-black/5 bg-[#D1D3D9]">
           
           {/* Upper 3/4 Blocks View */}
           <div className="flex gap-1.5 w-full h-[184px]">
              
              {/* Left Column Data (Punctuation) */}
              <div className="w-[12.5%] flex flex-col gap-1.5 h-full">
                 <KeyAction extraClass="text-[20px] font-medium text-black">，</KeyAction>
                 <KeyAction extraClass="text-[16px] font-bold text-black pt-1 px-1"><span className="border-[1.8px] border-black rounded-full w-[8px] h-[8px]"></span></KeyAction>
                 <KeyAction extraClass="text-[19px] font-medium text-black">？</KeyAction>
                 <KeyAction extraClass="text-[20px] font-medium text-black">！</KeyAction>
              </div>

              {/* Center 3x3 T9 Layout Cluster */}
              <div className="flex-1 flex flex-col gap-1.5 h-full">
                 {/* C.Row 1 */}
                 <div className="flex-1 flex gap-1.5">
                   <KeyT9 num="1" chars="@/." extraClass="flex-1" />
                   <KeyT9 num="2" chars="ABC" extraClass="flex-1 pt-px" />
                   <KeyT9 num="3" chars="DEF" extraClass="flex-1 pt-px" />
                 </div>
                 {/* C.Row 2 */}
                 <div className="flex-1 flex gap-1.5">
                   <KeyT9 num="4" chars="GHI" extraClass="flex-1" />
                   <KeyT9 num="5" chars="JKL" extraClass="flex-1" />
                   <KeyT9 num="6" chars="MNO" extraClass="flex-1" />
                 </div>
                 {/* C.Row 3 */}
                 <div className="flex-1 flex gap-1.5">
                   <KeyT9 num="7" chars="PQRS" extraClass="flex-1 pt-px pb-1" />
                   <KeyT9 num="8" chars="TUV" extraClass="flex-1" />
                   <KeyT9 num="9" chars="WXYZ" extraClass="flex-1" />
                 </div>
              </div>
              
              {/* Right Column Action Sets */}
              <div className="w-[18%] flex flex-col gap-1.5 h-[184px]">
                 {/* Delete Sector */}
                 <div className="h-[calc(33.333%-4px)] bg-[#BCC1CB] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#999BA0] pr-0.5 relative active:bg-[#A9AEB8]">
                   <svg width="24" height="20" viewBox="0 0 26 20" fill="none" stroke="black" strokeWidth="1.6" className="scale-90">
                     <path d="M9 2 L24 2 A2 2 0 0 1 26 4 L26 16 A2 2 0 0 1 24 18 L9 18 L2 10 Z" strokeLinejoin="round" />
                     <path d="M13 7 L19 13 M19 7 L13 13" strokeLinecap="round" strokeWidth="1.4"/>
                   </svg>
                 </div>
                 {/* Retype Modifiers */}
                 <div className="h-[calc(33.333%-4px)] bg-[#BCC1CB] rounded-[5px] flex items-center justify-center text-[17px] text-black shadow-[0_1px_0_#999BA0] font-[400] active:bg-[#A9AEB8]">
                    重输
                 </div>
                 {/* Zero Key Alignment Override */}
                 <div className="h-[calc(33.333%-4px)] bg-[#BCC1CB] rounded-[5px] flex items-center justify-center text-[22px] text-black shadow-[0_1px_0_#999BA0] active:bg-[#A9AEB8]">
                    0
                 </div>
              </div>
           </div>

           {/* Bottom Row - Full Grid Width Distribution Array */}
           <div className="w-full flex gap-1.5 h-[48px]">
              <KeyAction extraClass="w-[12.5%]"><span className="text-[19px] font-[400] text-black">符</span></KeyAction>
              <KeyAction extraClass="w-[12%]"><Mic size={22} className="text-black scale-90" strokeWidth={1.5} /></KeyAction>
              <KeyAction extraClass="w-[14%]"><span className="text-[19px] text-black font-[400]">123</span></KeyAction>
              
              {/* Native Spacebar */}
              <div className="flex-1 bg-[#FFFFFF] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#999BA0] active:bg-[#E5E5EA]">
                 <div className="w-[30px] h-[1.8px] bg-black/80 rounded-full mt-1.5"></div>
              </div>
              
              {/* Complex Language Toggle */}
              <KeyAction extraClass="w-[13.5%] relative">
                 <div className="relative flex flex-col items-center justify-center leading-none mt-0.5">
                    <span className="text-[15px] text-black font-[500] leading-none mb-[2px]">中</span>
                    <span className="text-[10px] text-black font-[400] -mt-0.5 scale-[0.85] origin-top">/英</span>
                    <Globe size={10} className="absolute -top-[3px] -right-[11px] text-black" strokeWidth={2}/>
                 </div>
              </KeyAction>

              {/* Aggressive Action Button Submission */}
              <div className="w-[18%] bg-[#FB5B1B] rounded-[5px] flex items-center justify-center text-white text-[19px] font-[500] shadow-[0_1px_0_#D13E06] active:bg-[#DF450B]">
                 搜索
              </div>
           </div>

        </div>

        {/* Global Keyboards Apple Underlay Array (Globe & Voice input hooks) */}
        <div className="flex justify-between items-center px-[22px] pt-[3px] pb-[1px] bg-[#D1D3D9] z-40 relative">
           <Globe size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
           <Mic size={26} className="text-[#4A4A4D]" strokeWidth={1.5} />
        </div>

      </div>

      {/* Global iOS Home Indicator overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-50 pointer-events-none opacity-80"></div>

    </div>
  );
}
