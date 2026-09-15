import '../style.css';
import React from 'react';

// Reusable watermark component overlaid on each generated image proxy
const WatermarkOverlay = () => (
  <div className="absolute bottom-[6px] right-[8px] flex items-center space-x-[4px] opacity-90 z-20 mix-blend-normal">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="15" r="2.5" fill="white" stroke="none"/>
    </svg>
    <span className="text-white text-[9.5px] font-[500] tracking-wider drop-shadow-md">清言·AI生成</span>
  </div>
);

const ZhipuAIDrawChatPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F4F5F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- STICKY HEADER BOUNDARY ---------------- */}
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-white sticky top-0 z-50 shrink-0">
        <div className="flex items-center">
          <button className="mr-[14px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-[#120D54] via-[#352EB9] to-[#E55288]" />
            <svg viewBox="0 0 100 100" className="w-[18px] h-[18px] relative z-10" fill="none">
              <path d="M20 80 L80 20" stroke="#FFD854" strokeWidth="12" strokeLinecap="round" />
              <path d="M20 20 L80 80" stroke="#1CE4FF" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="flex flex-col ml-[10px]">
            <span className="text-[14.5px] font-[600] text-[#111111] leading-[1.2] tracking-wide">AI画图</span>
            <span className="text-[10px] font-[400] text-[#A6ABB5] tracking-wide relative top-[2px]">来自: 智谱清言</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="9" />
             <path d="M12 7v5l3 3" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M11 5L6 9H2v6h4l5 4V5z" />
             <path d="M22 9l-6 6 M16 9l6 6" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
             <circle cx="5" cy="12" r="2" />
             <circle cx="12" cy="12" r="2" />
             <circle cx="19" cy="12" r="2" />
          </svg>
        </div>
      </div>

      {/* ---------------- SCROLLABLE CHAT CANVAS ---------------- */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-[180px] bg-[#F4F5F7] [&::-webkit-scrollbar]:hidden relative">
        
        {/* Full Text Prompt Echo Bubble */}
        <div className="w-full bg-[#EBEEF6] rounded-[18px] rounded-tl-[4px] p-4 pr-[22px] text-[#1D2129] text-[14.5px] font-[450] leading-[1.7] tracking-[0.03em] shadow-sm mb-[14px]">
          一幅高清摄影作品，一对情侣拟人的仓鼠在躺椅上戴着墨镜，左边的仓鼠穿着海滩衬衫和短裤，右边的仓鼠穿着吊带裙，两只小仓鼠分别拿着饮料躺在沙滩椅上在晒太阳，躺椅边有个小桌子上面摆着饮料零食，背景是壮阔的大海，明亮阳光，颜色绚丽，色彩明快，愉悦的气氛，对称构图，中远景，整体画面以写实的摄影风格呈现，具备高清画质，细节丰富。
        </div>

        {/* Dynamic Image Output Grid Framework */}
        <div className="w-full flex flex-col space-y-[4px]">
          
          {/* Row 1 / Top Pair */}
          <div className="flex w-full space-x-[4px] h-[240px]">
             {/* Left Output */}
             <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#55BEDA] via-[#E2B771] to-[#E8677B] shadow-inner rounded-tl-[10px]">
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-20 bg-white" />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-[#FFCD74] rounded-full blur-[20px] opacity-70" />
                <WatermarkOverlay />
             </div>
             {/* Right Output */}
             <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1995DD] via-[#CE9B50] to-[#BC4F50] shadow-inner rounded-tr-[10px]">
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-20 bg-white" />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-[#FFCD74] rounded-full blur-[20px] opacity-70" />
                <WatermarkOverlay />
             </div>
          </div>
          
          {/* Row 2 / Cutoff Lower Pair */}
          <div className="flex w-full space-x-[4px] h-[95px] overflow-hidden">
             {/* Left Output Lower */}
             <div className="flex-1 relative bg-gradient-to-b from-[#6CC5DF] to-[#9CD5E6] shadow-inner rounded-bl-[10px] flex justify-center items-end pb-[10px]">
                <div className="w-full h-full absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:10px_10px]" />
             </div>
             {/* Right Output Lower */}
             <div className="flex-1 relative bg-gradient-to-b from-[#6CC5DF] to-[#8BCFE3] shadow-inner rounded-br-[10px] flex justify-center items-end pb-[10px]">
                <div className="w-[40px] h-[40px] bg-white rounded-full opacity-60 filter blur-xl relative top-[20px]" />
             </div>
          </div>

        </div>

        {/* Floating Down-Arrow Grid Intersect Node */}
        <div className="absolute right-[24px] bottom-[146px] w-[36px] h-[36px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer active:bg-gray-100 z-10 transition-transform hover:scale-105">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

      </div>

      {/* ---------------- FIXED BOTTOM ANCHOR BLOCK (ACTIONS / TERMINAL) ---------------- */}
      <div className="absolute bottom-0 w-full left-0 bg-gradient-to-t from-[rgba(252,254,255,1)] to-[#F4F5F7] z-40 flex flex-col pt-[8px] pb-[8px]">
        
        {/* Row 1: Horizontal Actions Carousel Menu */}
        <div className="flex px-4 space-x-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden w-full pb-[12px] snap-x">
          
          <div className="relative shrink-0 flex items-center h-[34px] bg-white rounded-[10px] px-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer snap-start">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[4px]"><path d="M21 4l-4 4 M16 4l4 4 M5 19L19 5 M5 16v3h3"/></svg>
             <span className="text-[12px] font-[500] text-[#111111]">AI特效</span>
             <div className="absolute top-[-5px] right-[-4px] bg-[#0CD782] text-white text-[8px] font-[600] px-[3px] py-[1px] rounded-tl-[6px] rounded-br-[6px] shadow-sm tracking-widest z-10">新</div>
          </div>

          <div className="shrink-0 flex items-center h-[34px] bg-white rounded-[10px] px-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer snap-start">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[4px]"><path d="M12 20h9 M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"/></svg>
             <span className="text-[12px] font-[500] text-[#111111]">AI编辑</span>
          </div>

          <div className="shrink-0 flex items-center h-[34px] bg-white rounded-[10px] px-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer snap-start">
             <span className="text-[12px] font-[400] text-[#111111] tracking-wide">风格</span>
          </div>

          {/* Active Highlight Node */}
          <div className="shrink-0 flex items-center h-[34px] bg-[#EDF0FF] rounded-[10px] px-[14px] cursor-pointer snap-start">
             <span className="text-[12px] font-[500] text-[#3A4CF3] tracking-wide">比例3:4</span>
          </div>

          <div className="shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-white rounded-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer snap-start">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>

          <div className="shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-white rounded-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer snap-start">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"/></svg>
          </div>
        </div>

        {/* Row 2: Deep Input Terminal */}
        <div className="px-4 pb-[10px]">
          <div className="w-full h-[48px] bg-white rounded-[24px] flex items-center px-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.04)] border-[1.5px] border-[#EBEEF5]">
            
            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 cursor-pointer active:opacity-60">
              <div className="relative">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="16" height="16" rx="4" />
                 </svg>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[3px] left-[7px] bg-white">
                    <path d="M12 5v14M5 12h14"/>
                 </svg>
              </div>
            </div>

            <input 
               type="text" 
               placeholder="有什么问题尽管问我！" 
               className="flex-1 bg-transparent border-none outline-none text-[#111] text-[13.5px] px-[8px] placeholder:text-[#A0A4B0] font-[400] tracking-wide" 
               readOnly
            />

            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 cursor-pointer active:bg-gray-100 rounded-full">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 10v4 M12 8v8 M15 10v4" />
               </svg>
            </div>
          </div>
        </div>

        {/* Global Footer Subtext Context */}
        <div className="flex justify-center pb-[16px] pt-[2px]">
           <span className="text-[10.5px] font-[400] text-[#C1C4CC]">内容由AI生成，仅供参考和借鉴</span>
        </div>

        {/* Native IOS Spacer Line */}
        <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mb-[6px]" />

      </div>

      {/* ---------------- NATIVE STATUS BAR (Z-50 FLUID) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">
          18:10
        </div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor">
             <rect x="0" y="7" width="3" height="4" rx="1" />
             <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
             <rect x="9" y="2" width="3" height="9" rx="1" />
             <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
             <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
             <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
             <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
             <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
             <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default ZhipuAIDrawChatPage;
