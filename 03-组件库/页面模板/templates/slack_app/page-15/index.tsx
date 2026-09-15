import React from 'react';
import { 
  Signal, Navigation, ArrowLeft, X
} from 'lucide-react';
import './style.css';
import vikingAvatar from '../page-14/viking_avatar.png';

/**
 * @name Slack Profile Detail Modal
 */
export default function SlackApp() {

  const ListItem = ({ label, value, valueColor="text-black", rightElement, hasBorder=true }: any) => (
    <div className="pl-4">
      <div className={`pr-4 py-[13.5px] flex flex-col justify-center ${hasBorder ? 'border-b ios-border' : ''}`}>
        <span className="text-[13.5px] text-[#8E8E93] mb-[3px] tracking-tight">{label}</span>
        <div className="flex justify-between items-center">
          <span className={`text-[17px] ${valueColor} tracking-tight font-[400] leading-none`}>{value}</span>
          {rightElement}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white text-gray-900 font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Top Image Banner Area */}
      <div className="relative w-full aspect-square bg-[#E5E5EA]">
        
        {/* We use the locally generated artifact shared from page-14 to replicate the viking image properly */}
        <img 
          src={vikingAvatar} 
          alt="Profile Avatar" 
          className="w-full h-full object-cover grayscale-[30%] contrast-125" 
        />
        
        {/* Soft Gradients for Overlay Readability */}
        <div className="absolute top-0 w-full h-[80px] bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* iOS Status Bar (Absolute Top Over Image) */}
        <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-white z-20">
          <div className="flex items-center gap-1 drop-shadow-md">
            <span>7:49</span>
            <Navigation size={12} className="ml-1 -rotate-45" fill="none" />
          </div>
          <div className="flex items-center gap-1.5 drop-shadow-md">
            <Signal size={14} fill="currentColor" strokeWidth={1} />
            <span className="text-[12px] font-bold">4G</span>
            <div className="relative">
              <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-current stroke-[1.5]">
                <rect x="1" y="2" width="20" height="8" rx="2" />
                <path d="M23 4 V8" strokeLinecap="round" />
              </svg>
              <div className="absolute top-[3px] left-[2px] h-[6px] w-[17px] bg-white rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Back Navigation Arrow */}
        <div className="absolute top-[48px] left-[12px] p-1.5 cursor-pointer z-20 drop-shadow-md" onClick={() => window.history.back()}>
<ArrowLeft size={28} className="text-white" strokeWidth={2} />
        </div>

        {/* User Identity Info Overlay */}
        <div className="absolute bottom-[18px] left-[16px] flex items-center z-20">
           <span className="text-[25px] font-bold text-white tracking-tight drop-shadow-md mr-1.5">Jensen</span>
           
           {/* Slack Green Active Status Icon */}
           <div className="w-[14px] h-[14px] bg-[#2BAC76] rounded-full border-[2px] border-white drop-shadow-sm mt-1.5 flex items-center justify-center">
              <div className="w-[4px] h-[6px] rounded-[1px] border-[1px] border-white border-t-0 border-r-0 transform -rotate-45 -mt-0.5 opacity-90"></div>
           </div>
        </div>
      </div>

      {/* 2. Scrollable Content Area */}
      <div className="flex flex-col flex-1 overflow-y-auto pb-[40px] bg-white">
        
        {/* Action Buttons Row */}
        <div className="flex gap-3 px-4 pt-[18px] pb-5">
          <button onClick={() => window.location.hash = 'page=page-16'} className="flex-1 h-[42px] rounded-[6px] border border-[#C7C7CC] bg-white flex items-center justify-center font-bold text-[16px] text-black tracking-tight active:bg-gray-50 transition-colors">
            Message
          </button>
          <button onClick={() => window.location.hash = 'page=page-19'} className="flex-1 h-[42px] rounded-[6px] border border-[#C7C7CC] bg-white flex items-center justify-center font-bold text-[16px] text-black tracking-tight active:bg-gray-50 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Contact Info List */}
        <div className="flex flex-col w-full">
          
          <ListItem 
            label="Display name" 
            value="huang" 
          />
          
          <ListItem 
            label="Status" 
            value="🌴 Vacationing" 
            rightElement={
              <div className="w-[18px] h-[18px] bg-[#9A9A9E] rounded-full flex items-center justify-center cursor-pointer mt-px" onClick={() => window.history.back()}>
<X size={12} strokeWidth={3} className="text-white relative top-[0.5px]" />
              </div>
            }
          />

          <ListItem 
            label="Timezone" 
            value="7:49 AM local time" 
          />

          <ListItem 
            label="Email" 
            value="huang_hai_tao@yeah.net" 
            valueColor="text-[#007AFF]" 
            hasBorder={false}
          />

        </div>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-20 pointer-events-none"></div>

    </div>
  );
}
