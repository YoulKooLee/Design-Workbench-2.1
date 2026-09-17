import React from 'react';
import { 
  Signal, Navigation, X, User, 
  Link2Off, AtSign, Star, Layers,
  Contact, UserPlus, SlidersHorizontal
} from 'lucide-react';
import './style.css';
import vikingAvatar from '../page-14/viking_avatar.png';

/**
 * @name Slack Account Options Drawer Navigation
 */
export default function SlackApp() {

  // Reusable component representing the iOS list structure
  const ListItem = ({ icon, title, rightElement, borderType = "inset", customIcon = null }: any) => {
    return (
      <div className={`flex flex-col w-full ${borderType === 'full' ? 'border-b ios-border' : ''}`}>
         <div className="flex items-center w-full min-h-[50px]">
            <div className="w-[66px] flex items-center justify-center">
               {customIcon ? customIcon : React.cloneElement(icon, { size: 24, className: "text-[#3E3E41]", strokeWidth: 1.5 })}
            </div>
            <div className={`flex items-center justify-between flex-1 py-3 pr-4 ${borderType === 'inset' ? 'border-b ios-border' : ''}`}>
               <span className="text-[17px] text-black tracking-tight">{title}</span>
               {rightElement}
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-md h-screen mx-auto bg-white font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Underlying App (Left side offset display exposed) */}
      <div className="absolute inset-0 z-0 bg-[#FAFAFA] flex flex-col pt-[55px] overflow-hidden pr-[82%] border-r border-[#E5E5EA]">
         
         <div className="flex items-center gap-2 pl-[18px] py-1 w-full mb-2">
            <div className="w-[28px] h-[28px] flex flex-wrap relative -ml-1">
                <div className="w-[6px] h-[15px] bg-[#E01E5A] absolute top-0 left-[7px] rounded-full"></div>
                <div className="w-[6px] h-[15px] bg-[#36C5F0] absolute bottom-0 right-[7px] rounded-full"></div>
                <div className="w-[15px] h-[6px] bg-[#2EB67D] absolute top-[7px] right-0 rounded-full"></div>
                <div className="w-[15px] h-[6px] bg-[#ECB22E] absolute bottom-[7px] left-0 rounded-full"></div>
            </div>
            <span className="font-[900] text-[24px] tracking-tight text-black">Sl</span>
         </div>

         <div className="pl-4 w-full space-y-[2px] mb-[22px]">
           <div className="text-[16px] text-[#4A4A4D] leading-[1.3] truncate">Feel fre</div>
           <div className="text-[16px] text-[#4A4A4D] leading-[1.3] truncate">How do</div>
         </div>
         
         <div className="pl-4 w-full space-y-[2px] mb-[26px]">
           <div className="text-[16px] text-[#4A4A4D] leading-[1.3] truncate">By the w</div>
           <div className="text-[16px] text-[#4A4A4D] leading-[1.3] truncate">with! Her</div>
         </div>

         <div className="pl-[16px] flex flex-col gap-[22px] w-full mb-6">
            <div className="flex items-center gap-3">
                <User className="text-[#0E8A63]" size={18} strokeWidth={2}/>
                <span className="text-[16px] text-gray-700">Ed</span>
            </div>
            <div className="flex items-center gap-3">
                <Link2Off className="text-[#E02636]" size={18} strokeWidth={2}/> 
                <span className="text-[16px] text-gray-700">Ad</span>
            </div>
         </div>

         <div className="w-full border-t border-[#E5E5EA] mb-5"></div>

         <div className="pl-[14px] flex flex-col gap-[20px]">
            <div className="flex items-center gap-3">
               <img src={vikingAvatar} className="w-8 h-8 rounded-[6px]" />
               <div className="flex flex-col">
                  <span className="text-[15px] font-bold leading-none mb-0.5">hu</span>
                  <span className="text-[15px] text-gray-500 leading-none">he</span>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-[6px] bg-[#CD2A47] relative overflow-hidden flex items-end justify-center">
                   <div className="w-5 h-5 bg-[#E9566E] rounded-full -mb-2.5 relative left-1"></div>
                   <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-[8px] right-[4px]"></div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[15px] font-bold leading-none mb-0.5 mt-px">Sl</span>
                  <span className="text-[15px] text-gray-500 leading-none">It'</span>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-[6px] bg-[#CD2A47] relative overflow-hidden flex items-end justify-center">
                   <div className="w-5 h-5 bg-[#E9566E] rounded-full -mb-2.5 relative left-1"></div>
                   <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-[8px] right-[4px]"></div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[15px] font-bold leading-none mb-0.5 mt-px">Sla</span>
                  <span className="text-[15px] text-gray-500 leading-none">He</span>
               </div>
            </div>
         </div>

      </div>

      {/* Dim Overlay mapping directly onto Underlying Base Layer */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* 2. Slide-out Drawer Panel (Account Settings sliding from Right) */}
      <div className="absolute top-0 right-0 w-[82%] h-[100%] bg-white drawer-left-shadow z-20 flex flex-col pt-0">
        
        {/* Profile Card Header */}
        <div className="w-full px-5 pb-[22px] pt-[85px] border-b border-[#E5E5EA]">
           <div className="flex gap-[18px] items-center">
              <div className="w-[62px] h-[62px] rounded-[14px] overflow-hidden border border-[#E5E5EA]">
                 {/* Importing the viking identity previously verified locally */}
                 <img src={vikingAvatar} className="w-full h-full object-cover scale-[1.14]" />
              </div>
              <div className="flex flex-col mb-1.5 justify-center mt-1">
                 <span className="font-[800] text-[20px] text-black tracking-tight leading-none mb-1">huang</span>
                 <span className="text-[16px] text-[#A1A1A5] tracking-tight leading-none">Jensen</span>
              </div>
           </div>
        </div>

        {/* Scrollable Navigation Nodes */}
        <div className="flex-1 w-full bg-white overflow-y-auto">
           
           {/* Section 1: User Status State Configurations */}
           <div className="flex flex-col w-full pt-2">
              <ListItem 
                title="Vacationing" 
                customIcon={<span className="text-[20px]">🌴</span>}
                rightElement={
                   <div className="w-[18px] h-[18px] bg-[#9A9A9E] rounded-full flex items-center justify-center cursor-pointer relative top-px" onClick={() => window.history.back()}>
<X size={12} strokeWidth={3} className="text-white relative top-[0.5px]" />
                   </div>
                }
              />
              <ListItem 
                title="Do Not Disturb" 
                borderType="full"
                rightElement={<span className="text-[17px] text-[#A1A1A5] font-normal tracking-tight">On</span>}
                customIcon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#48484B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    {/* Simulated Snooze 'Z' indicators stacked on the Bell */}
                    <path d="M10 5 L12 5 L10 7 L12 7" strokeWidth="1.2" />
                    <path d="M14 3 L15.5 3 L14 5 L15.5 5" strokeWidth="1.2" />
                  </svg>
                }
              />
           </div>

           {/* Section 2: Data Index Navigations */}
           <div className="flex flex-col w-full pt-1">
              <ListItem title="Activity" icon={<AtSign />} />
              <ListItem title="Starred Items" icon={<Star />} />
              <ListItem title="Your Files" icon={<Layers />} />
              <ListItem title="Directory" borderType="full" icon={<Contact />} />
           </div>

           {/* Section 3: App Mechanics & Invites */}
           <div className="flex flex-col w-full pt-1">
              <ListItem title="Invite People" icon={<UserPlus />} />
              <ListItem title="Edit Profile" icon={<User />} />
              <ListItem title="Settings" borderType="full" icon={<SlidersHorizontal />} />
           </div>

        </div>

      </div>

      {/* 3. Global iOS Status Bar - Must remain pure black text across entire hierarchy */}
      <div className="absolute top-0 w-full flex justify-between items-center px-5 pt-3 pb-2 text-[13px] font-medium tracking-tight text-black z-40 pointer-events-none">
        <div className="flex items-center gap-1 drop-shadow-sm">
          <span>7:46</span>
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

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-40 pointer-events-none drop-shadow-md"></div>

    </div>
  );
}
