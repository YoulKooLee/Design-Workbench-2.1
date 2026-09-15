import '../style.css';
import React from 'react';

const ConfigFormPage = () => (
  <div className="flex flex-col h-full bg-[#EFEFF5] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    
    {/* Nav Header */}
    <div className="flex justify-between items-center px-[22px] py-2 shrink-0 mt-[14px]">
      {/* Left Close Button */}
      <button className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center -ml-1 shadow-sm active:scale-95 transition-transform">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Center Title */}
      <h1 className="text-[16px] font-[600] text-[#111111] tracking-wide ml-3">
        配置智能体
      </h1>

      {/* Right AI Sparkle CTA */}
      <button className="flex items-center text-[#3A4CF3] font-[600] text-[13px] tracking-wide -mr-1">
         <svg className="w-[14px] h-[14px] mr-[3px] -mt-[1px]" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
           <path d="M18.5 15.5L19.5 18.5L22.5 19.5L19.5 20.5L18.5 23.5L17.5 20.5L14.5 19.5L17.5 18.5Z" opacity="0.8" />
         </svg>
         AI生成
      </button>
    </div>

    {/* Avatar Frame with Edit Badge */}
    <div className="flex justify-center mt-5 mb-5 relative shrink-0">
      <div className="w-[90px] h-[90px] rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#E2F0EC]/90 via-[#DEEBE5]/90 to-[#B6C7BE] relative flex items-end justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {/* Mountain background slice */}
        <div className="absolute bottom-0 left-[-20%] w-[140%] h-[48%] bg-[#6EA392] rounded-t-[100%] opacity-80 border-t border-[#8ABAAC]/30" />
        {/* Sun */}
        <div className="absolute top-[18%] right-[10%] w-[34px] h-[34px] bg-gradient-to-br from-[#FFEA91] to-[#FCCD43] rounded-full opacity-90 shadow-[0_0_8px_rgba(255,234,145,0.4)]" />
        {/* Character Coat Base */}
        <div className="relative w-[22px] h-[50px] bg-gradient-to-br from-[#1C2C40] to-[#122033] rounded-t-[10px] flex flex-col items-center">
           {/* Face */}
           <div className="absolute -top-[16px] w-[18px] h-[18px] bg-[#FCD3B3] rounded-full shadow-sm" />
           {/* Hair */}
           <div className="absolute -top-[16px] w-[20px] h-[8px] bg-[#0E121B] rounded-t-[10px]" />
           {/* Coat Line */}
           <div className="absolute top-[6px] w-full h-[30px] border-r border-[#1C2C40]/50" />
        </div>
        {/* Stylist Watermark Ghost Text */}
        <div className="absolute top-[18%] left-[8%] opacity-[0.28] flex flex-col items-center transform -rotate-2">
            <span className="text-[6px] font-[600] text-white tracking-[0.1em] leading-none mb-[2px]">天气搭配师</span>
            <span className="text-[5px] font-[600] text-white tracking-[0.1em] leading-none">STYLIST</span>
        </div>
      </div>
      
      {/* Absolute Overlapping Edit Badge Pencil */}
      <div className="absolute bottom-[-1px] left-1/2 ml-[16px] w-[28px] h-[28px] rounded-[14px] border-[1.5px] border-white bg-[#3B4CF3] flex items-center justify-center shadow-md">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-[10deg] translate-x-[-0.5px]">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      </div>
    </div>

    {/* Scrollable Form Fieldset Lists px-5 */}
    <div className="px-[22px] mt-4 flex flex-col shrink-0 pb-[120px]">
      
      {/* 1. Name Field */}
      <div className="flex flex-col">
        <div className="text-[14px] font-[600] text-[#111] mb-[12px] flex items-start tracking-wide">
          名称 <span className="text-[#DE4D38] ml-[4px] mt-[1.5px]">*</span>
        </div>
        <div className="w-full bg-white rounded-[14px] h-[52px] flex items-center px-4 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <span className="text-[14px] font-[400] text-[#111] tracking-wide">天气搭配师</span>
        </div>
      </div>

      {/* 2. Intro Field */}
      <div className="flex flex-col mt-[28px]">
        <div className="text-[14px] font-[600] text-[#111] mb-[12px] flex items-start tracking-wide">
          简介 <span className="text-[#DE4D38] ml-[4px] mt-[1.5px]">*</span>
        </div>
        <div className="w-full bg-white rounded-[14px] py-[15px] px-4 min-h-[56px] flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
          <span className="text-[14px] font-[400] text-[#111] tracking-wide leading-tight">
            一键获取天气与穿搭建议，让你每天正能量满满！
          </span>
        </div>
      </div>

      {/* 3. Config Setup Textarea Array */}
      <div className="flex flex-col mt-[28px]">
        <div className="text-[14px] font-[600] text-[#111] flex items-start tracking-wide mb-[10px]">
          配置信息 <span className="text-[#DE4D38] ml-[4px] mt-[1.5px]">*</span>
        </div>
        <p className="text-[#989FA6] text-[12px] leading-[1.6] font-[400] tracking-wide mb-[6px]">
          描述你想创建的智能体，包括它的作用和特点，以及对它生成结果的预期。(最多4096个字)
        </p>
        
        {/* Sample Layout Tags Scroll */}
        <div className="flex items-center space-x-[12px] w-full overflow-hidden whitespace-nowrap mb-2 mt-2">
          <span className="text-[13px] font-[600] text-[#111] shrink-0">示例</span>
          <div className="flex space-x-[10px] pl-[2px] overflow-x-auto [&::-webkit-scrollbar]:hidden pr-4">
             {['角色', '游戏', '画图', '工具'].map(tag => (
               <div key={tag} className="flex items-center bg-white px-[12px] py-[6px] rounded-full text-[12.5px] text-[#444] font-[600] tracking-wide shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer active:scale-95 transition-transform">
                  {tag} 
                  <svg className="w-[12px] h-[12px] ml-[4px] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M9 18l6-6-6-6" />
                  </svg>
               </div>
             ))}
          </div>
        </div>

        {/* Large Editable Config Prompt Area */}
        <div className="w-full bg-white rounded-[16px] px-[18px] pt-[18px] pb-[40px] mt-[6px] text-[13px] text-[#222] leading-[1.8] shadow-[0_2px_6px_rgba(0,0,0,0.02)] tracking-wide font-[400]">
          <div className="font-[600] mb-1"># 角色</div>
          <div className="mb-[10px] text-[#333]">你是专业的天气搭配师，具备查询天气和搭配衣服的能力。</div>
          
          <div className="font-[600] mb-1"># 工作任务</div>
          <div className="mb-[10px] text-[#333]">根据用户提供的城市，查询当天天气，并给出相应的穿搭建议和正能量鼓励。</div>
          
          <div className="font-[600] mb-1"># 输出示例</div>
          <div className="text-[#333]">
            <div>- 用户输入:北京</div>
            <div className="mb-[2px]">- 输出:今天北京晴朗，气温15-28℃，建议穿着轻便的衬衫和牛仔裤，出门记得带上防晒哦！保持微笑，新的一天加油</div>
            <div>- 用户输入:上海</div>
            <div>- 输出:今日上海多云，气温18-25℃，推荐穿着长袖T恤</div>
          </div>
        </div>

      </div>

    </div>
  </div>
);


const ZhipuConfigEditorPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#EFEFF5] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
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

      {/* ---------------- MAIN SCROLLABLE FORM ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[48px] w-full h-full">
         <ConfigFormPage />
      </div>

      {/* ---------------- FIXED FLOATING CTA LAYER ---------------- */}
      <div className="absolute bottom-0 w-full left-0 pt-10 pb-[10px] flex flex-col items-center z-50 pointer-events-none">
        
        {/* Publish Button */}
        <button className="w-[290px] h-[52px] bg-[#3B4CF3] text-white rounded-full font-[600] text-[14.5px] tracking-widest shadow-[0_6px_20px_rgba(59,76,243,0.35)] active:scale-[0.98] transition-transform pointer-events-auto">
          发布智能体
        </button>
        
        {/* iOS Home Indicator Context Spacer */}
        <div className="w-[134px] h-[5px] bg-[#111] rounded-full mt-[20px] mb-[2px] opacity-90 pointer-events-auto" />
      </div>

    </div>
  );
};

export default ZhipuConfigEditorPage;
