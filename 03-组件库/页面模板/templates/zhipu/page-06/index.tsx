import '../style.css';
import React from 'react';

const ConfigBackgroundForm = () => (
  <div className="flex items-col flex-col h-full bg-[#FFFFFF]">
    
    {/* Nav Header */}
    <div className="flex justify-between items-center px-[22px] py-2 shrink-0">
      {/* Left Close Button */}
      <button className="w-[34px] h-[34px] bg-[#EEF0F2] rounded-full flex items-center justify-center -ml-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Center Title */}
      <h1 className="text-[16px] font-[600] text-[#111111] tracking-wide ml-4">
        配置智能体
      </h1>

      {/* Right AI Sparkle CTA */}
      <button className="flex items-center text-[#3B4CF3] font-[600] text-[13px] tracking-wide -mr-1">
         <svg className="w-[14px] h-[14px] mr-[3px] -mt-[1px]" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
           <path d="M18.5 15.5L19.5 18.5L22.5 19.5L19.5 20.5L18.5 23.5L17.5 20.5L14.5 19.5L17.5 18.5Z" opacity="0.8" />
         </svg>
         AI生成
      </button>
    </div>

    {/* Avatar Frame with Edit Badge */}
    <div className="flex justify-center mt-5 mb-[18px] relative">
      <div className="w-[90px] h-[90px] rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#E2F0EC]/90 via-[#DEEBE5]/90 to-[#B6C7BE] relative flex items-end justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="absolute bottom-0 left-[-20%] w-[140%] h-[48%] bg-[#6EA392] rounded-t-[100%] opacity-80 border-t border-[#8ABAAC]/30" />
        <div className="absolute top-[18%] right-[10%] w-[34px] h-[34px] bg-gradient-to-br from-[#FFEA91] to-[#FCCD43] rounded-full opacity-90 shadow-[0_0_8px_rgba(255,234,145,0.4)]" />
        <div className="relative w-[22px] h-[50px] bg-gradient-to-br from-[#1C2C40] to-[#122033] rounded-t-[10px] flex flex-col items-center">
           <div className="absolute -top-[16px] w-[18px] h-[18px] bg-[#FCD3B3] rounded-full shadow-sm" />
           <div className="absolute -top-[16px] w-[20px] h-[8px] bg-[#0E121B] rounded-t-[10px]" />
           <div className="absolute top-[6px] w-full h-[30px] border-r border-[#1C2C40]/50" />
        </div>
        <div className="absolute top-[18%] left-[8%] opacity-[0.28] flex flex-col items-center transform -rotate-2">
            <span className="text-[6px] font-[600] text-white tracking-[0.1em] leading-none mb-[2px]">天气搭配师</span>
            <span className="text-[5px] font-[600] text-white tracking-[0.1em] leading-none">STYLIST</span>
        </div>
      </div>
      
      {/* Absolute Edge Badge Pencil */}
      <div className="absolute bottom-[-1px] left-1/2 ml-[16px] w-[28px] h-[28px] rounded-[14px] border-[1.5px] border-white bg-[#3B4CF3] flex items-center justify-center shadow-md">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-[10deg] translate-x-[-0.5px]">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      </div>
    </div>

    {/* Form Fieldset Lists px-5 */}
    <div className="px-[22px] mt-6 flex flex-col">
      
      {/* 1. Name Field */}
      <div className="flex flex-col">
        <div className="text-[14px] font-[600] text-[#111] mb-[12px] flex items-start tracking-wide">
          名称 <span className="text-[#DF4D38] ml-[4px] mt-[2px]">*</span>
        </div>
        <div className="w-full bg-[#F5F6F8] rounded-[14px] h-[52px] flex items-center px-4">
          <span className="text-[14px] font-[400] text-[#111] tracking-wide">天气搭配师</span>
        </div>
      </div>

      {/* 2. Intro Field */}
      <div className="flex flex-col mt-[28px]">
        <div className="text-[14px] font-[600] text-[#111] mb-[12px] flex items-start tracking-wide">
          简介 <span className="text-[#DF4D38] ml-[4px] mt-[2px]">*</span>
        </div>
        <div className="w-full bg-[#F5F6F8] rounded-[14px] py-[15px] px-4 min-h-[56px] flex items-center">
          <span className="text-[14px] font-[400] text-[#111] tracking-wide leading-tight">
            一键获取天气与穿搭建议，让你每天正能量满满！
          </span>
        </div>
      </div>

      {/* 3. Config Setup */}
      <div className="flex flex-col mt-[28px]">
        <div className="text-[14px] font-[600] text-[#111] flex items-start tracking-wide mb-[10px]">
          配置信息 <span className="text-[#DF4D38] ml-[4px] mt-[2px]">*</span>
        </div>
        <p className="text-[#999FA9] text-[12.5px] leading-[1.65] font-[450] tracking-wide mb-4">
          描述你想创建的智能体，包括它的作用和特点，以及对它生成结果的预期。(最多4096个字)
        </p>
        
        {/* Sample Tag Row */}
        <div className="flex items-center space-x-[12px] w-full overflow-hidden whitespace-nowrap">
          <span className="text-[12.5px] font-[600] text-[#222]">示例</span>
          <div className="flex space-x-[10px]">
             {['角色', '游戏', '画图', '工具'].map(tag => (
               <div key={tag} className="flex items-center bg-[#F5F6F8] px-[12px] py-[6px] rounded-full text-[12px] text-[#444] font-[500] tracking-wide">
                  {tag} 
                  <svg className="w-[12px] h-[12px] ml-[4px] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M9 18l6-6-6-6" />
                  </svg>
               </div>
             ))}
          </div>
        </div>
      </div>

    </div>

  </div>
);


const ComponentLayoutPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- HARD STATUS BAR (Z-50 FRONT) ---------------- */}
      <div className="absolute top-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
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

      {/* ---------------- BACKGROUND FORM WITH DIM ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[48px] bg-white w-full h-full">
         <ConfigBackgroundForm />
      </div>

      {/* The Active Dim Mask */}
      <div className="absolute inset-0 z-30 bg-[#1D1E22]/45 pointer-events-none transition-opacity" />

      {/* ---------------- BOTTOM SHEET MODAL ---------------- */}
      <div className="absolute bottom-0 left-0 w-full bg-white z-40 rounded-t-[22px] pt-[26px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 mb-5">
          <h2 className="text-[16px] font-[600] text-[#111] tracking-wide">设置权限</h2>
          <button className="flex items-center justify-center p-[4px] -mr-2 active:bg-gray-100 rounded-full transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Option 1: Private */}
        <div className="flex items-center justify-between px-6 py-[18px] border-b border-[#F5F6F8] active:bg-[#F9FAFB] cursor-pointer transition-colors">
           <div className="flex items-center">
              <div className="w-[40px] h-[40px] bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="#222">
                    <path d="M12 2C9.2 2 7 4.2 7 7v3H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-2V7c0-2.8-2.2-5-5-5zm-3 8V7c0-1.7 1.3-3 3-3s3 1.3 3 3v3H9zm3 6.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                 </svg>
              </div>
              <span className="ml-[14px] text-[14px] font-[600] text-[#111] tracking-wide mt-[1px]">私密 · 仅自己可用</span>
           </div>
           {/* Empty Radio */}
           <div className="w-[22px] h-[22px] border-[1.5px] border-[#CCC] rounded-full m-[1px]" />
        </div>

        {/* Option 2: Shared */}
        <div className="flex items-center justify-between px-6 py-[18px] border-b border-[#F5F6F8] active:bg-[#F9FAFB] cursor-pointer transition-colors">
           <div className="flex items-center">
              <div className="w-[40px] h-[40px] bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="#222">
                    <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/>
                 </svg>
              </div>
              <span className="ml-[14px] text-[14px] font-[600] text-[#111] tracking-wide mt-[1px]">分享 · 通过链接打开可对话</span>
           </div>
           {/* Empty Radio */}
           <div className="w-[22px] h-[22px] border-[1.5px] border-[#CCC] rounded-full m-[1px]" />
        </div>

        {/* Option 3: Public (Selected state) */}
        <div className="flex items-center justify-between px-6 py-[18px] active:bg-[#F9FAFB] cursor-pointer transition-colors">
           <div className="flex items-center">
              <div className="w-[40px] h-[40px] bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="#222">
                    <path d="M12 4.5C7 4.5 2.7 8.3 1 12c1.7 3.7 6 7.5 11 7.5s9.3-3.8 11-7.5c-1.7-3.7-6-7.5-11-7.5zm0 12c-2.5 0-4.5-2-4.5-4.5S9.5 7.5 12 7.5 16.5 9.5 16.5 12 14.5 16.5 12 16.5zM12 9c-1.6 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.4-3-3-3z"/>
                 </svg>
              </div>
              <span className="ml-[14px] text-[14px] font-[600] text-[#111] tracking-wide mt-[1px]">公开 · 提交到智能体中心</span>
           </div>
           {/* Solid Radio */}
           <div className="w-[23px] h-[23px] rounded-full border-[6.5px] border-[#3B4CF3] bg-white ring-1 ring-inset ring-transparent shadow-[0_0_1px_rgba(0,0,0,0.1)]" />
        </div>

        {/* Bottom CTA Publisher Tool */}
        <div className="px-5 mt-[26px] mb-[12px]">
          <button className="w-full h-[52px] bg-[#3B4CF3] text-white rounded-full font-[600] text-[14.5px] tracking-widest active:scale-[0.99] transition-transform shadow-[0_4px_16px_rgba(59,76,243,0.3)]">
            确认发布
          </button>
        </div>
        
        {/* iOS Spacing Footer */}
        <div className="w-full flex justify-center pb-2 pt-[14px]">
          <div className="w-[134px] h-[5px] bg-[#111] rounded-full" />
        </div>

      </div>

    </div>
  );
};

export default ComponentLayoutPage;
