import React from 'react';
import { 
  Signal, Navigation
} from 'lucide-react';
import './style.css';


const SectionContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-white border-y-[0.5px] border-[#C8C7CC] flex flex-col shrink-0">
    {children}
  </div>
);

const Row = ({ text, isRed = false, hasBorder = false }: { text: string, isRed?: boolean, hasBorder?: boolean }) => (
  <div className="w-full h-[46px] bg-white flex flex-col justify-center relative cursor-pointer active:bg-[#E5E5EA]">
    <div className="w-full flex items-center px-[16px]">
      <span className={`text-[17px] ${isRed ? 'text-[#E01E5A]' : 'text-[#1D1C1D]'} font-normal tracking-tight leading-none`}>
        {text}
      </span>
    </div>
    {/* iOS Standard Inset Divider */}
    {hasBorder && (
      <div className="absolute bottom-0 right-0 left-[16px] h-[0.5px] bg-[#C8C7CC]"></div>
    )}
  </div>
);


/**
 * @name Slack Do Not Disturb Settings Sheet
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-[#F2F2F7] font-sans shadow-2xl relative select-none overflow-hidden text-black">
      
      {/* 1. Global Header Configuration */}
      <div className="flex flex-col w-full z-30 bg-white shrink-0">
        
        {/* Global iOS Status Bar Layer */}
        <div className="w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-[500] tracking-tight text-black z-40 bg-white/95 backdrop-blur-sm">
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

        {/* Modal Controls Top Bar */}
        <div className="w-full h-[44px] bg-white flex items-center justify-between px-[16px] relative z-10 border-b-[0.5px] border-[#C8C7CC]">
          <div className="w-[80px] flex items-center">
            <span className="text-[17px] text-[#0B82E5] font-normal tracking-tight cursor-pointer active:opacity-70 transition-opacity">Cancel</span>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[17px] text-black font-[600] tracking-tight">Do Not Disturb</span>
          </div>
          <div className="w-[80px] flex justify-end items-center">
            <span className="text-[17px] text-[#C7C7CC] font-normal tracking-tight">Save</span>
          </div>
        </div>

      </div>

      {/* 2. Primary Grouped Table View List Content */}
      {/* Native Apple Settings structural simulation over solid grey map */}
      <div className="flex-1 w-full flex flex-col overflow-y-auto overflow-x-hidden relative">
         
         {/* Top Section Padding Buffer */}
         <div className="w-full h-[36px] shrink-0 bg-[#F2F2F7]"></div>
         
         {/* Group 1: Destructive Action Override */}
         <SectionContainer>
            <Row text="Turn Off" isRed={true} />
         </SectionContainer>
         
         {/* Group 1 Footer: Active descriptive constraint text string */}
         <div className="w-full py-[8px] px-[16px] shrink-0 bg-[#F2F2F7]">
            <span className="text-[13.5px] text-[#8A8A8E] font-[400] tracking-tight block leading-[1.3] truncate">
              Notifications paused until 8:00 AM
            </span>
         </div>

         {/* Group 2: Temporal Predefined Settings Enums */}
         <SectionContainer>
            <Row text="30 Minutes" hasBorder />
            <Row text="1 Hour" hasBorder />
            <Row text="2 Hours" hasBorder />
            <Row text="4 Hours" hasBorder />
            <Row text="Until tomorrow" hasBorder />
            <Row text="Until next week" />
         </SectionContainer>

         {/* Inter-Section Block Divider Matrix Gap */}
         <div className="w-full h-[36px] shrink-0 bg-[#F2F2F7]"></div>

         {/* Group 3: Advanced Deep Link Configuration Gateway */}
         <SectionContainer>
            <Row text="Custom" />
         </SectionContainer>

         {/* Bottom Global Padding Avoidance for Over-scroll behavior */}
         <div className="w-full pb-[100px] shrink-0 bg-[#F2F2F7]"></div>
      </div>

      {/* Global iOS Home Indicator overlay locked permanently at viewport base */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#111] rounded-full z-50 pointer-events-none opacity-80"></div>

    </div>
  );
}
