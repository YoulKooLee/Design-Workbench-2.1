import '../style.css';
import React from 'react';

const ZhipuAIEraserPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-black overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* Safe Area Top Spacer */}
      <div className="h-[54px] w-full shrink-0" />

      {/* Header Actions */}
      <div className="flex items-center px-[22px] h-[44px] shrink-0">
        <button className="p-[4px] -ml-2 active:opacity-60 transition-opacity">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Central Canvas Workspace */}
      <div className="flex-1 mx-[18px] mt-[10px] mb-[22px] bg-gradient-to-br from-[#12162C] to-[#1A1B29] rounded-[24px] flex flex-col items-center justify-center relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)]">
         
         <div className="flex flex-col items-center justify-center mt-[-30px]">
            {/* Upload Icon Group */}
            <div className="relative mb-[16px]">
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#7186F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="#7186F2" />
                  <path d="M21 15l-5-5L5 21" />
               </svg>
               {/* Plus Overlay Badge */}
               <div className="absolute right-[-6px] bottom-[-6px] w-[26px] h-[26px] bg-[#161828] rounded-full flex items-center justify-center border-2 border-[#161828]">
                  <div className="w-[18px] h-[18px] bg-[#7186F2] rounded-full flex items-center justify-center">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#161828" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
               </div>
            </div>
            
            {/* Action Text */}
            <span className="text-[14.5px] font-[400] text-[#5C72ED] tracking-wider pl-[4px]">请先上传图片</span>
         </div>

      </div>

      {/* Bottom Tool Rack Area */}
      <div className="w-full flex flex-col pb-[32px] shrink-0">
          
          {/* Row 1: Config sliders */}
          <div className="flex justify-between items-center px-[22px] mb-[28px]">
            {/* Tool Mode Pill Toggle */}
            <div className="w-[88px] h-[36px] bg-[#222222] rounded-full p-[4px] flex cursor-pointer">
               <div className="flex-1 bg-[#C8C8C8] rounded-full flex items-center justify-center shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M4 12c2-4 6-4 8 0s6 4 8 0" />
                  </svg>
               </div>
               <div className="flex-1 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
               </div>
            </div>

            {/* Range Slider Track */}
            <div className="w-[190px] h-[6px] bg-[#303030] rounded-full relative mx-[14px]">
               {/* Progress Fill */}
               <div className="absolute left-0 top-0 h-full w-[30%] bg-[#818181] rounded-l-full" />
               {/* Thumb Anchor */}
               <div className="absolute top-1/2 transform -translate-y-1/2 left-[28%] w-[12px] h-[12px] rounded-full bg-[#111] border-[2.5px] border-[#A3A3A3] shadow-md" />
            </div>

            {/* Undo Trigger */}
            <div className="flex flex-col items-center justify-center mr-[4px] cursor-pointer">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
               </svg>
               <span className="text-[10px] text-[#444] font-[500] mt-[5px] tracking-widest pl-[1px]">重做</span>
            </div>
          </div>

          {/* Row 2: Submit Action */}
          <div className="px-5 mb-[34px]">
            <button className="w-full h-[52px] bg-gradient-to-r from-[#2135A1] via-[#2F2CAA] to-[#4527A1] rounded-full flex items-center justify-center font-[400] text-[15px] text-[#7888DC] active:opacity-80 transition-opacity tracking-widest">
              开始消除
            </button>
          </div>

          {/* Row 3: Tab Selector Context */}
          <div className="flex justify-center items-center w-full relative mb-[6px]">
            <div className="flex items-center space-x-[80px]">
              
              {/* Active Mode: AI Erase */}
              <div className="relative flex flex-col items-center cursor-pointer">
                <div className="flex items-start">
                  <span className="text-[14px] font-[500] text-[#FFFFFF] tracking-widest">AI消除</span>
                  {/* Quota Badge */}
                  <div className="ml-[1px] mt-[-3px] bg-[#FFDE81] rounded-[4px] px-[4px] py-[2px] flex items-center justify-center">
                     <span className="text-[9px] font-[600] text-[#331100] transform scale-90 tracking-tighter leading-none relative top-[0.5px]">10次</span>
                  </div>
                </div>
                {/* Active Indicator Underline */}
                <div className="absolute bottom-[-10px] w-[18px] h-[3px] bg-white rounded-full" />
              </div>

              {/* Inactive Mode: Local Repaint */}
              <div className="flex flex-col items-center cursor-pointer">
                <span className="text-[14px] font-[400] text-[#868686] tracking-widest">局部重绘</span>
              </div>
              
            </div>
          </div>

      </div>

      {/* OS Navigation Line Spacer */}
      <div className="absolute bottom-[8px] w-full flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-[#FFFFFF] rounded-full opacity-90" />
      </div>

    </div>
  );
};

export default ZhipuAIEraserPage;
