import React from 'react';
import { 
  Search, Plus, Hash, MessageCircle, MoreVertical
} from 'lucide-react';
import './style.css';

/**
 * @name Slack Main Workspace Navigation Sidebar
 */
export default function SlackApp() {

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Underlying App Mask (Right side 12% offset display) */}
      <div className="absolute inset-y-0 right-0 w-[12%] z-0 bg-white shadow-[-5px_0_20px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="absolute top-0 right-0 w-[375px] h-full bg-white flex flex-col box-border">
             {/* Fake right edge of underlying Page 27 */}
             <div className="w-full h-[88px] border-b border-[#E5E5EA] flex justify-end items-end pb-[11px] px-[16px]">
                <div className="flex items-center gap-[22px] text-[#1D1C1D]">
                    <Search size={22} className="opacity-90" strokeWidth={2} />
                    <MoreVertical size={24} className="-ml-1 opacity-90" strokeWidth={2} />
                </div>
             </div>
             <div className="w-full flex-1 pt-[22px] px-4 flex flex-col text-right">
                <h1 className="text-[25px] font-[800] text-[#1D1C1D] mb-4 tracking-tight leading-none mt-2">Hi, Slackbot here!</h1>
                <p className="text-[17px] text-[#616061] mb-[26px] tracking-tight">How do I add a profile photo?</p>
                <p className="text-[17px] text-[#616061] tracking-tight">Here's a handy link or two:</p>
                <div className="w-[74px] h-[74px] bg-[#F2F2F7] rounded-[16px] absolute left-4 top-[24px]"></div>
                
                <div className="w-full flex justify-end items-center gap-3 mt-[150px]">
                   <span className="text-[#1D1C1D] font-[800] text-[16px]">huang 🌴</span>
                   <span className="text-[#8E8E93] text-[12px] font-normal">7:46 PM</span>
                </div>
             </div>
             {/* Fake Composer Input Right Edge */}
             <div className="w-full h-[90px] border-t border-[#E5E5EA] absolute bottom-0 right-0 flex justify-end pt-[16px] px-3">
                 <div className="h-[28px] px-[12px] border-2 border-[#D1D1D6] rounded-[6px] opacity-70 flex">
                     <span className="text-[14px] font-[700] text-[#AEAEB2] pt-0.5">Send</span>
                 </div>
             </div>
          </div>
      </div>

      {/* 2. Slide-out Navigation Drawer Shell (88% width) */}
      <div className="absolute top-0 left-0 w-[88%] h-[100%] bg-[#503A51] z-20 flex flex-col">
          
          {/* Header area (Status bar padding + Workspace & Search row) */}
          <div className="w-full h-[88px] flex items-end px-[16px] pb-[10px]">
             <div className="w-full flex items-center justify-between pb-1 gap-3">
                 
                 {/* Workspace App Icon Hexagon */}
                 <div className="relative w-[40px] h-[40px] rounded-[8px] bg-white/10 flex items-center justify-center shrink-0 cursor-pointer active:opacity-70 transition-opacity">
                    <div 
                       className="w-[24px] h-[26px] bg-white flex items-center justify-center font-[800] text-[#503A51] text-[11px] tracking-tighter shadow-sm" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    >
                       UI
                    </div>
                    {/* Notification Badge Complex */}
                    <div className="absolute -top-[5px] -right-[5px] flex flex-col items-center">
                       {/* Floating Backdrop Cutout */}
                       <div className="absolute -top-[1.5px] -right-[1.5px] w-[15px] h-[15px] bg-[#503A51] rounded-full z-10"></div>
                       {/* Blue Mentions Badge */}
                       <div className="absolute top-[2px] right-[1.5px] px-1 min-w-[18px] h-[18px] bg-[#007AFF] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-[2px] border-[#503A51] z-20">
                         8
                       </div>
                    </div>
                 </div>

                 {/* Jump to... Global Search Bar */}
                 <div className="flex-1 h-[36px] bg-black/20 rounded-[6px] flex items-center px-[10px] border border-white/5 cursor-pointer active:bg-black/30 transition-colors">
                    <Search size={16} className="text-[#A99FA9]" strokeWidth={2.2} />
                    <span className="text-[#A99FA9] text-[15px] ml-[8px] font-normal leading-none pt-px">Jump to...</span>
                 </div>
             </div>
          </div>

          {/* Drawer Inner Border (Below Header) */}
          <div className="w-full h-[1px] bg-black/10"></div>

          {/* Scrollable Nav Tree */}
          <div className="flex-1 w-full overflow-y-auto pb-[100px] custom-scrollbar">
             
             {/* Master Toggles */}
             <div className="flex items-center px-[16px] mb-[26px] mt-4 cursor-pointer hover:bg-white/5 py-1 transition-colors">
                 <MessageCircle size={17} className="text-[#B1A6B3]" strokeWidth={2.5} />
                 <span className="text-white text-[16px] ml-[12px] font-normal leading-none tracking-tight">All Threads</span>
             </div>

             {/* ----------------- UNREADS GROUP ----------------- */}
             <div className="px-[16px] mb-[12px]">
                 <span className="text-[#B1A6B3] text-[12px] font-[600] tracking-wider uppercase">Unreads</span>
             </div>
             
             <div className="flex flex-col mb-[22px]">
                {['designtools', 'general', 'jobs', 'productfeedback', 'random', 'reading', 'requests', 'showoff'].map(name => (
                   <div key={name} className="flex items-center px-[16px] py-[6px] hover:bg-white/5 cursor-pointer transition-colors group">
                       <Hash size={18} className="text-white opacity-80 group-hover:opacity-100" strokeWidth={2.5} />
                       <span className="text-white text-[16px] ml-[10px] font-bold leading-none tracking-tight">{name}</span>
                   </div>
                ))}
             </div>

             {/* ----------------- CHANNELS GROUP ----------------- */}
             <div className="flex items-center justify-between px-[16px] mb-[12px] group cursor-pointer">
                 <span className="text-[#B1A6B3] text-[12px] font-[600] tracking-wider uppercase group-hover:text-white transition-colors">Channels</span>
                 <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#B1A6B3] group-hover:border-white transition-colors flex items-center justify-center opacity-80">
                     <Plus size={14} className="text-[#B1A6B3] group-hover:text-white" strokeWidth={3} />
                 </div>
             </div>

             <div className="flex flex-col mb-[22px]">
                {['pricechange', 'updates'].map(name => (
                   <div key={name} className="flex items-center px-[16px] py-[6.5px] hover:bg-white/5 cursor-pointer transition-colors group">
                       <Hash size={18} className="text-[#A99FA9] group-hover:text-white" strokeWidth={2} />
                       <span className="text-[#A99FA9] group-hover:text-white transition-colors text-[16px] ml-[10px] font-normal leading-none tracking-tight">{name}</span>
                   </div>
                ))}
             </div>

             {/* ----------------- DIRECT MESSAGES GROUP ----------------- */}
             <div className="flex items-center justify-between px-[16px] mb-[10px] group cursor-pointer">
                 <span className="text-[#B1A6B3] text-[12px] font-[600] tracking-wider uppercase group-hover:text-white transition-colors">Direct Messages</span>
                 <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#B1A6B3] group-hover:border-white transition-colors flex items-center justify-center opacity-80">
                     <Plus size={14} className="text-[#B1A6B3] group-hover:text-white" strokeWidth={3} />
                 </div>
             </div>

             <div className="flex flex-col mb-[22px]">
                {/* Active Highlighted Context (Slackbot) */}
                <div className="flex items-center px-[10px] py-[7.5px] bg-[#3B8F70] mx-2.5 rounded-[6px] cursor-pointer">
                    <span className="text-[#FFFFFF] text-[13px] leading-none ml-1">❤</span>
                    <span className="text-[#FFFFFF] text-[16px] ml-[8px] font-[500] leading-none tracking-tight pb-[0.5px]">Slackbot</span>
                </div>
                
                {/* Inactive Read User */}
                <div className="flex items-center px-[10px] py-[8px] mt-0.5 mx-2.5 hover:bg-white/5 cursor-pointer rounded-[6px] transition-colors group">
                    <div className="ml-[2px] mt-0.5 relative">
                       {/* Hollow Green status (offline/snooze equivalent representation) */}
                       <div className="w-[11px] h-[11px] rounded-full border-[2.2px] border-[#A99FA9] group-hover:border-white transition-colors"></div>
                       {/* Floating Zz mock shape - stylized line */}
                       <div className="absolute -top-[2px] -right-[4px] bg-[#503A51]">
                         <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#A99FA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
                           <polyline points="4 8 16 8 4 16 16 16" />
                         </svg>
                       </div>
                    </div>
                    <span className="text-[#A99FA9] group-hover:text-white transition-colors text-[16px] ml-[10px] font-normal leading-none tracking-tight pb-[0.5px]">huang 🌴 (you)</span>
                </div>
             </div>

          </div>

          {/* Bottom Pagination Dots Pill Overlay */}
          <div className="absolute bottom-[36px] left-[50%] -translate-x-[50%] flex items-center gap-[6px] bg-black/20 px-[14px] py-[7px] rounded-full z-30 shadow-sm backdrop-blur-md">
             <div className="w-[5px] h-[5px] rounded-full bg-white/40"></div>
             <div className="w-[5px] h-[5px] rounded-full bg-white"></div>
             <div className="w-[5px] h-[5px] rounded-full bg-white/40"></div>
          </div>

      </div>

      {/* Global iOS Status Bar Layer (white texts for dark background) */}
      <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-white z-40 pointer-events-none drop-shadow-sm">
        <div className="flex items-center">
          <span className="font-semibold text-[14px] tracking-wider -ml-[3px] mt-px">7:44</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1 -mt-px opacity-90" stroke="currentColor" strokeWidth="2.5">
              <path d="M 22 2 L 2 22 L 22 22 Z" stroke="none" fill="white" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 -mr-[3px]">
          <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1" className="opacity-90">
              <rect x="1" y="16" width="3" height="4" rx="1" />
              <rect x="6" y="12" width="3" height="8" rx="1" />
              <rect x="11" y="8" width="3" height="12" rx="1" />
              <rect x="16" y="4" width="3" height="16" rx="1" />
          </svg>
          <span className="text-[12px] font-bold tracking-tight">4G</span>
          <div className="relative transform scale-90 -mr-1 opacity-90">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-white stroke-[1.2px]">
                <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                <path d="M22.5 4 V8" strokeLinecap="round" strokeWidth={1.5} />
              </svg>
              <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
          </div>
        </div>
      </div>

      {/* Standard iOS Home Indicator Line */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/90 rounded-full z-40 pointer-events-none shadow-sm"></div>

    </div>
  );
}
