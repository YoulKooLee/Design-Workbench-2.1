import '../style.css';
import React from 'react';

const ZhipuAIHistoryEmptyStatePage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND APP CONTEXT (VISUALLY DIMMED BY OVERLAY)   */}
      {/* ========================================================= */}
      
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 shrink-0 pointer-events-none">
        <div className="flex items-center">
          <div className="mr-[14px] p-[2px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </div>
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0DFFBA] via-[#0D78FF] to-[#0D1FFF]" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 shadow-sm"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <div className="flex flex-col ml-[10px]">
            <span className="text-[14.5px] font-[600] text-[#1D2129] leading-[1.2] tracking-widest">AI搜索</span>
            <span className="text-[10.5px] font-[400] text-[#A6ABB5] tracking-widest relative top-[1px]">来自: 智谱清言</span>
          </div>
        </div>
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M22 9l-6 6 M16 9l6 6" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-10">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal opacity-90">17:52</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111] opacity-90">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MODAL OVERLAY (DIMMING SHIELD)                         */}
      {/* ========================================================= */}
      <div className="absolute inset-0 bg-[#000000] opacity-30 z-40 transition-opacity" />

      {/* ========================================================= */}
      {/* 3. FULL HEIGHT HISTORY MODAL DRAWER (历史记录)            */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] rounded-t-[20px] z-50 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.15)] h-[calc(100vh-106px)]">
         
         {/* History Drawer Header Control Matrix */}
         <div className="flex justify-between items-center px-[22px] pt-[22px] pb-[10px]">
             <span className="text-[16px] font-[500] text-[#111111] tracking-wide">历史记录</span>
             <div className="p-[4px] cursor-pointer active:scale-90 transition-transform">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18 M6 6l12 12" />
                 </svg>
             </div>
         </div>

         {/* Empty State Presentation Anchor */}
         <div className="flex-1 w-full flex flex-col justify-center items-center pb-[20vh]">
             
             {/* Complex Native CSS Vector Composition for Empty Bubble Graphic */}
             <div className="relative w-[110px] h-[90px] flex justify-center items-center mb-[20px]">
                
                {/* Main Speech Bubble Node (Light Grey) */}
                <div className="absolute left-[14px] top-[14px] w-[58px] h-[48px] bg-[#EEF0F5] rounded-[22px] rounded-bl-[4px] shadow-sm flex pt-[12px] justify-center transform -rotate-6">
                   <div className="flex space-x-[4px] relative right-[-1px]">
                       <div className="w-[5px] h-[9px] bg-[#222222] rounded-full opacity-80" />
                       <div className="w-[5px] h-[9px] bg-[#222222] rounded-full opacity-80" />
                   </div>
                </div>
                
                {/* Overlapping Secondary Bubble Node (Slate Blue) */}
                <div className="absolute right-[14px] bottom-[12px] w-[52px] h-[42px] bg-[#AEC2DF] rounded-[18px] rounded-br-[4px] border-[2.5px] border-[#FFFFFF] flex pt-[12px] justify-center shadow-[0_2px_8px_rgba(174,194,223,0.3)] transform rotate-3">
                   <div className="flex space-x-[4px]">
                       <div className="w-[4px] h-[7px] bg-[#FFFFFF] rounded-full" />
                       <div className="w-[4px] h-[7px] bg-[#FFFFFF] rounded-full" />
                   </div>
                </div>

             </div>

             <span className="text-[12.5px] font-[450] text-[#A6ABB5] tracking-widest mt-[4px]">暂无记录</span>
         </div>

         {/* Base Anchor / Home Bar Inject */}
         <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-[#111111] opacity-90 rounded-full" />

      </div>

    </div>
  );
};

export default ZhipuAIHistoryEmptyStatePage;
