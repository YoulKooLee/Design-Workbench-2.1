import '../style.css';
import React from 'react';

const ZhipuAIAuthLoginPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#FFFFFF] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. NATIVE STATUS BAR (Z-50)                               */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-50">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:52</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. GLOBAL EXIT ANCHOR                                     */}
      {/* ========================================================= */}
      <div className="absolute right-[22px] top-[60px] p-[6px] cursor-pointer active:scale-90 transition-transform z-40">
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18 M6 6l12 12" />
         </svg>
      </div>

      {/* ========================================================= */}
      {/* 3. PRIMARY AUTHENTICATION VIEWPORT                        */}
      {/* ========================================================= */}
      <div className="w-full flex-1 flex flex-col items-center pt-[15vh]">
          
          {/* Brand Lockup Sequence */}
          <div className="flex items-center space-x-[12px] mb-[16px]">
             
             {/* Zhipu Ring Logo Vector Construction */}
             <div className="w-[42px] h-[42px] relative flex justify-center items-center scale-95">
               <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8ZM50 78C34.5 78 22 65.5 22 50C22 34.5 34.5 22 50 22C65.5 22 78 34.5 78 50C78 65.5 65.5 78 50 78Z" fill="#3B53FF"/>
                  <path d="M72 40C72 40 68 28 50 28C32 28 28 40 28 40" stroke="#3B53FF" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M28 60C28 60 32 72 50 72C68 72 72 60 72 60" stroke="#3B53FF" strokeWidth="6" strokeLinecap="round"/>
                  <circle cx="50" cy="50" r="18" stroke="#3B53FF" strokeWidth="8"/>
               </svg>
             </div>
             
             <span className="text-[26px] font-[600] tracking-widest text-[#111111] relative top-[1px]">智谱清言</span>
          </div>

          <span className="text-[14px] font-[450] text-[#111111] tracking-wide">
             嗨👋 我是清言，你的全能AI助手
          </span>

          {/* Target Payload Masked String */}
          <div className="mt-[56px] flex flex-col items-center">
             <span className="text-[32px] font-[500] tracking-widest text-[#111111] mb-[4px]">
                186****3352
             </span>
             <span className="text-[10px] font-[450] text-[#A0A4B0] opacity-80 tracking-wide">
                中国联通提供认证服务
             </span>
          </div>

          {/* Action Route Vectors */}
          <div className="w-[calc(100%-64px)] h-[52px] bg-[#3153FF] rounded-full flex justify-center items-center mt-[36px] shadow-[0_6px_20px_rgba(49,83,255,0.25)] cursor-pointer active:bg-[#2541DB] transition-colors">
             <span className="text-[#FFFFFF] text-[14.5px] font-[500] tracking-widest">本机号码一键登录</span>
          </div>

          <div className="mt-[28px] flex items-center justify-center space-x-[2px] cursor-pointer active:opacity-60 transition-opacity">
             <span className="text-[#3153FF] text-[12.5px] font-[400] tracking-wide relative top-[0.5px]">短信验证码登录</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3153FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative top-[1px]">
                <path d="M9 18l6-6-6-6" />
             </svg>
          </div>

      </div>

      {/* ========================================================= */}
      {/* 4. COMPLIANCE & LEGAL SAFETY TERMINAL                     */}
      {/* ========================================================= */}
      <div className="absolute bottom-[36px] left-0 w-full px-[32px] flex items-start space-x-[8px] z-40">
         
         <div className="pt-[2px]">
            <div className="w-[14px] h-[14px] bg-[#3153FF] rounded-[2px] flex justify-center items-center cursor-pointer">
               <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
               </svg>
            </div>
         </div>

         <div className="flex-1 text-[10.5px] leading-[1.65] font-[450]">
            <span className="text-[#A0A4B0]">未注册号码将自动注册。勾选即代表您阅读并同意</span>
            <span className="text-[#3153FF] cursor-pointer active:underline">《联通统一认证服务条款》</span>
            <span className="text-[#A0A4B0]">、</span>
            <span className="text-[#3153FF] cursor-pointer active:underline">《用户协议》</span>
            <span className="text-[#A0A4B0]">、</span>
            <span className="text-[#3153FF] cursor-pointer active:underline">《隐私政策》</span>
         </div>
      </div>

      {/* Hardware Base Line Mask */}
      <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-[#111111] rounded-full z-50 pointer-events-none" />

    </div>
  );
};

export default ZhipuAIAuthLoginPage;
