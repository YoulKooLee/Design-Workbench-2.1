import '../style.css';
import React from 'react';

// Specialized routing button within the central drawer card
const DrawerRoutingNode = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center space-y-[12px] cursor-pointer hover:opacity-80 transition-opacity pb-[14px] pt-[14px]">
     {icon}
     <span className="text-[11.5px] font-[400] text-[#111111] tracking-wide">{label}</span>
  </div>
);

const ZhipuAILeftNavDrawerPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F8] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. MOCK BACKGROUND APP VIEWPORT (Dimmed context)          */}
      {/* ========================================================= */}
      
      {/* Native Status Bar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-10">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:51</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      <div className="absolute right-0 top-[120px] w-full px-[12px] opacity-20 pointer-events-none z-10 flex flex-col items-end">
          {/* Mock app backdrop visible on the right boundary */}
          <div className="w-[140%] h-[180px] bg-blue-100 rounded-lg shrink-0 mb-[20px]" />
          <div className="w-[140%] h-[400px] bg-white rounded-lg shadow-sm" />
      </div>

      {/* Dim Overlay Shield Active */}
      <div className="absolute inset-0 bg-[#000000] opacity-[0.45] z-30 transition-opacity" />

      {/* ========================================================= */}
      {/* 2. LEFT SIDE NAVIGATION DRAWER MODAL                      */}
      {/* ========================================================= */}
      
      <div className="absolute top-0 left-0 w-[84%] bg-[#FFFFFF] h-full z-40 rounded-r-[24px] rounded-br-[0px] flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.15)]">
         
         {/* Top Auth Lockup Deck */}
         <div className="px-[20px] pt-[75px] pb-[20px] flex justify-between items-center relative">
             <div className="flex items-center space-x-[12px] cursor-pointer">
                
                {/* Auth Avatar Node */}
                <div className="w-[42px] h-[42px] bg-[#EEF2FC] rounded-full flex justify-center items-center overflow-hidden">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B4DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                   </svg>
                </div>

                <div className="flex items-center space-x-[4px]">
                   <span className="text-[16px] font-[600] text-[#111111] tracking-wide relative top-[0.5px]">点击登录</span>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M9 18l6-6-6-6" />
                   </svg>
                </div>
             </div>

             <div className="bg-gradient-to-r from-[#FFE5CA] to-[#FFD5B8] rounded-full px-[8px] py-[3px] flex items-center shadow-sm relative right-[-8px] cursor-pointer hover:opacity-90">
                <span className="text-[11.5px] mr-[2px]">🎁</span>
                <span className="text-[10px] font-[600] tracking-wider text-[#CE4B1A]">福利中心</span>
             </div>
         </div>

         {/* Center Dual-Action Routing Card */}
         <div className="px-[20px] mb-[28px] mt-[4px]">
            <div className="w-full bg-[#F5F7FD] rounded-[14px] flex relative shadow-[0_2px_12px_rgba(30,40,60,0.02)]">
                
                <DrawerRoutingNode 
                   label="我的作品" 
                   icon={
                      <div className="relative">
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="#3B53FF">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                         </svg>
                         <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFF" className="absolute top-[8px] left-[7px]">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                         </svg>
                      </div>
                   } 
                />

                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1px] h-[34px] bg-[#E3E8FC]" />

                <DrawerRoutingNode 
                   label="我的智能体" 
                   icon={
                      <div className="w-[22px] h-[22px] bg-[#3B53FF] rounded-full flex justify-center items-center">
                         <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M72 40C72 40 68 28 50 28C32 28 28 40 28 40" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round"/>
                            <path d="M28 60C28 60 32 72 50 72C68 72 72 60 72 60" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round"/>
                            <circle cx="50" cy="50" r="18" stroke="#FFFFFF" strokeWidth="14"/>
                         </svg>
                      </div>
                   } 
                />

            </div>
         </div>

         {/* Navigation Tab Array */}
         <div className="px-[20px] flex space-x-[20px] mb-[12px] border-b border-transparent">
             <div className="relative flex flex-col items-center">
                <span className="text-[15.5px] font-[600] text-[#111111] tracking-wide cursor-pointer">最近对话</span>
                <div className="absolute bottom-[-6px] w-[18px] h-[3.5px] bg-[#111111] rounded-full" />
             </div>
             <div className="relative flex flex-col items-center">
                <span className="text-[15.5px] font-[450] text-[#7A808C] tracking-wide cursor-pointer hover:text-[#4A4B55] transition-colors">最近智能体</span>
             </div>
         </div>

         {/* Empty State History Content Hub */}
         <div className="flex-1 flex flex-col justify-center items-center pb-[100px]">
             
             {/* Native CSS Illustration Composition */}
             <div className="relative w-[110px] h-[70px] flex justify-center items-center mb-[18px]">
                
                 {/* Background Grey Dialogue Bubble */}
                 <div className="absolute right-[30px] top-[-10px] w-[64px] h-[58px] bg-[#F3F4F6] rounded-[24px] rounded-bl-[6px] transform -scale-x-100 opacity-90 shadow-sm border border-[#F2F2F2]">
                     <div className="absolute top-[18px] left-[18px] flex space-x-[6px]">
                         <div className="w-[4px] h-[8px] bg-[#111111] rounded-full"></div>
                         <div className="w-[4px] h-[8px] bg-[#111111] rounded-full"></div>
                     </div>
                 </div>

                 {/* Foreground Active Dialogue Bubble */}
                 <div className="absolute right-[12px] top-[14px] w-[46px] h-[40px] bg-[#9BAED4] rounded-[18px] rounded-br-[6px] shadow-[0_4px_12px_rgba(155,174,212,0.4)] border shadow-sm border-white">
                     <div className="absolute top-[14px] left-[12px] flex space-x-[5px]">
                         <div className="w-[4px] h-[4px] bg-[#FFFFFF] rounded-full"></div>
                         <div className="w-[4px] h-[4px] bg-[#FFFFFF] rounded-full"></div>
                     </div>
                 </div>

             </div>

             <span className="text-[12px] font-[450] text-[#A0A4B0] tracking-wide">
                快去开启新对话吧～
             </span>

         </div>

      </div>

      {/* Hardware Base Line Mask (Outside Drawer layer to match reality usually) */}
      <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-[#111111] rounded-full z-50 pointer-events-none" />

    </div>
  );
};

export default ZhipuAILeftNavDrawerPage;
