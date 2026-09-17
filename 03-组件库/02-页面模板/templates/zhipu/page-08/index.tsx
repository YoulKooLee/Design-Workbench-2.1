import '../style.css';
import React from 'react';

const AutoGenModalSheet = () => (
  <div className="absolute bottom-0 left-0 w-full bg-white z-40 rounded-t-[22px] pt-[26px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] h-[85%] pb-32 overflow-hidden">
    
    {/* Modal Header Title */}
    <div className="px-6 flex justify-between items-start shrink-0">
       <div className="flex flex-col relative top-[2px]">
         <div className="flex items-center text-[#3B4CF3] font-[600] text-[16.5px] tracking-wide leading-none">
           {/* Decorative Sparkle SVG */}
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-[5px] mb-[1px]">
             <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
             <path d="M18.5 15.5L19.5 18.5L22.5 19.5L19.5 20.5L18.5 23.5L17.5 20.5L14.5 19.5L17.5 18.5Z" opacity="0.8" />
           </svg>
           <div className="relative">
             AI自动生成配置
             {/* Sub underline indicator */}
             <div className="absolute -bottom-[10px] left-[1px] w-full h-[2.5px] bg-gradient-to-r from-[#3B4CF3] to-[#8A9CFF] rounded-full" />
           </div>
         </div>
       </div>
       <button className="flex items-center justify-center p-[4px] mt-[-2px] -mr-2 active:bg-gray-100 rounded-full transition-colors shrink-0">
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round">
           <path d="M18 6L6 18M6 6l12 12"/>
         </svg>
       </button>
    </div>

    {/* Form Segment */}
    <div className="flex-1 overflow-y-auto w-full pt-[38px] pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Sub Title Instruction */}
      <h2 className="px-[22px] text-[15.5px] font-[600] text-[#111] tracking-wide leading-tight">
        一句话描述你的智能体
      </h2>

      {/* Prompts Layout Example Box */}
      <div className="mx-[22px] mt-4 bg-[#F9F9F9] rounded-[16px] px-[18px] py-[16px]">
        <div className="text-[13px] text-[#555A67] leading-[1.7] font-[450] tracking-wide relative">
          <svg className="inline-block relative -top-[1.5px] mr-[4px] text-[#7A8398]" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.69 2 6 4.69 6 8c0 2.22 1.21 4.15 3 5.19V16c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.81c1.79-1.04 3-2.97 3-5.19 0-3.31-2.69-6-6-6zm1 16H11v2h2v-2z" />
          </svg>
          <span className="font-[500] text-[#222]">示例：</span>作为一个天气预报员，可以通过用户提供的城市，查询当天的天气情况，并提示用户可以穿着的衣服搭配，同时给出用户正能量的鼓励。
        </div>
      </div>

      {/* Interactive Input Textarea Area */}
      <div className="mx-[22px] mt-5 border-[1.5px] border-[#EBEEF2] rounded-[16px] px-[16px] py-[16px] min-h-[160px] bg-white">
        <div className="text-[13px] text-[#ABAFBC] font-[400] leading-[1.65] tracking-wide">
          描述你想创建的智能体，包括它的作用和特点，以及对它生成结果的预期
        </div>
      </div>

    </div>

    {/* Fixed Action Bottom Bar inside Modal */}
    <div className="absolute bottom-0 w-full left-0 px-5 pt-4 pb-[10px] bg-white z-50">
      <button className="w-full h-[54px] bg-[#AAB3C8] text-white rounded-full font-[600] text-[14.5px] tracking-widest shadow-[0_4px_10px_rgba(170,179,200,0.3)] transition-colors pointer-events-none">
        生成配置
      </button>
      
      {/* iOS Space */}
      <div className="w-full flex justify-center pb-2 pt-[22px]">
        <div className="w-[134px] h-[5px] bg-[#111] rounded-full" />
      </div>
    </div>

  </div>
);

const ZhipuAutoGenModalPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#EFEFF5] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 shadow-inner">
      
      {/* ---------------- HARD STATUS BAR (Z-50 FRONT) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-black tracking-tight mt-0.5">
          18:14
        </div>
        <div className="flex items-center space-x-[5px]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="black">
             <rect x="0" y="7" width="3" height="4" rx="1" />
             <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
             <rect x="9" y="2" width="3" height="9" rx="1" />
             <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
             <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
             <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
             <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
             <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black" />
             <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="black" />
          </svg>
        </div>
      </div>

      {/* ---------------- BACKGROUND HEADER PREVIEW ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[48px] w-full h-full bg-[#EFEFF5] pointer-events-none">
        {/* Nav Header (Mimicking original background) */}
        <div className="flex justify-between items-center px-[22px] py-1 mt-[4px] shrink-0">
          <button className="w-[34px] h-[34px] bg-[#E3E6EB] rounded-full flex items-center justify-center -ml-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <h1 className="text-[16px] font-[600] text-[#111111] tracking-wide ml-4">
            配置智能体
          </h1>
          <button className="flex items-center text-[#3A4CF3] font-[600] text-[13px] tracking-wide -mr-1">
             <svg className="w-[14px] h-[14px] mr-[3px] -mt-[1px]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
               <path d="M18.5 15.5L19.5 18.5L22.5 19.5L19.5 20.5L18.5 23.5L17.5 20.5L14.5 19.5L17.5 18.5Z" opacity="0.8" />
             </svg>
             AI生成
          </button>
        </div>
      </div>

      {/* Interactive Active Dim Mask Overlaying Background */}
      <div className="absolute inset-0 z-30 bg-[#1D1E22]/40 pointer-events-none transition-opacity" />

      {/* ---------------- MODAL DRAWER SHEET ---------------- */}
      <AutoGenModalSheet />

    </div>
  );
};

export default ZhipuAutoGenModalPage;
