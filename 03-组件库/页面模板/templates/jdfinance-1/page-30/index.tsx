/**
 * @name 个人中心 - 我的 (Personal Dashboard - Top Scope)
 */
import React from 'react';
import './style.css';

export default function JDPersonalDashboardTop() {
  return (
    <div className="w-full min-h-screen bg-[#f8f8fb] profile-hero-bg hexagon-watermark-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[40px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full pt-[52px] pb-[10px] px-4 flex items-center justify-between sticky top-0 z-50 bg-transparent text-black">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="flex items-center">
             <span className="text-[17px] font-bold tracking-wide drop-shadow-sm">我的</span>
         </div>
         <div className="w-8 flex items-center justify-end cursor-pointer">
             <div className="flex space-x-[4px]">
                 <div className="w-[5px] h-[5px] bg-black rounded-full"></div>
                 <div className="w-[5px] h-[5px] bg-black rounded-full"></div>
                 <div className="w-[5px] h-[5px] bg-black rounded-full"></div>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         USER PROFILE HERO
        ========================================================================
      */}
      <div className="w-full px-5 mt-4 mb-5 relative z-10 flex items-center">
          {/* Abstract CSS Mock User Avatar */}
          <div className="w-[58px] h-[58px] rounded-full user-avatar-bg border-2 border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-end justify-center overflow-hidden flex-shrink-0 relative cursor-pointer">
             <div className="absolute top-[25%] right-[25%] w-[8px] h-[8px] bg-black/80 rounded-sm"></div>
             <div className="w-[30px] h-[30px] bg-[#eb8c39] rounded-t-[10px] transform rotate-12 origin-bottom shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2)]"></div>
             <div className="absolute w-[80%] h-[20%] bg-[#32201e] bottom-0 rounded-t-[5px]"></div>
          </div>
          
          <div className="flex flex-col ml-4">
              <span className="text-[22px] font-bold text-black tracking-widest leading-none mb-2 mt-1 drop-shadow-sm">美叶_勒川</span>
              <div className="flex items-center text-[12px] text-gray-500 tracking-widest">
                  <span>家人 <span className="text-gray-700 font-sans font-medium ml-0.5 mr-1.5">1</span></span>
                  <span className="opacity-30 mx-[2px]">|</span>
                  <span className="ml-[6px]">车辆 <span className="text-gray-700 font-sans font-medium ml-0.5">0</span></span>
                  <svg className="w-[12px] h-[12px] ml-1 mt-[1px] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         POLICIES & PREMIUM SUMMARY CARD
        ========================================================================
      */}
      <div className="mx-4 mt-2 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex pt-5 pb-[18px] mb-4 relative z-10">
          {/* Left Block */}
          <div className="flex-1 flex flex-col pl-5 cursor-pointer group active:opacity-60 transition">
              <div className="flex items-center text-[#111] mb-[2px]">
                  <span className="text-[14px] font-bold tracking-wide">我的保单</span>
                  <svg className="w-[12px] h-[12px] ml-0.5 mt-px text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
              <div className="flex items-baseline mt-[2px]">
                  <span className="text-[30px] font-normal text-black font-sans leading-none tracking-tight">0</span>
                  <span className="text-[14px] font-bold text-black ml-[4px]">份</span>
              </div>
          </div>
          
          {/* Divider */}
          <div className="w-[1px] h-[36px] bg-gray-100 self-center"></div>

          {/* Right Block */}
          <div className="flex-1 flex flex-col pl-6 cursor-pointer group active:opacity-60 transition">
              <div className="flex items-center text-[#111] mb-[2px]">
                  <span className="text-[14px] font-bold tracking-wide">保障金</span>
                  <svg className="w-[12px] h-[12px] ml-0.5 mt-px text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
              <div className="flex items-baseline text-[#fb4a4f] mt-[2px]">
                  <span className="text-[30px] font-normal font-sans leading-none tracking-tight">58</span>
                  <span className="text-[14px] font-bold text-[#fb4a4f] ml-[4px]">元</span>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         MAIN INSURANCE CATEGORY HUB
        ========================================================================
      */}
      <div className="mx-4 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] px-4 pt-5 pb-4 mb-4 flex flex-col relative overflow-hidden">
          
          {/* Categories Tab Row */}
          <div className="w-full flex mb-[18px]">
              {/* Active Tab */}
              <div className="flex-1 flex flex-col items-center cursor-pointer relative tab-safety-indicator group">
                  <span className="text-[15px] font-bold text-black tracking-wide mb-[2px]">人身保障</span>
                  <span className="text-[12px] text-[#999] tracking-wide group-hover:text-black transition">未保障</span>
              </div>
              {/* Inactive Tab */}
              <div className="flex-1 flex flex-col items-center cursor-pointer group hover:opacity-80 transition">
                  <span className="text-[15px] font-bold text-black tracking-wide mb-[2px]">家财车宠</span>
                  <span className="text-[12px] text-[#999] tracking-wide group-hover:text-black transition">未保障</span>
              </div>
              {/* Inactive Tab */}
              <div className="flex-1 flex flex-col items-center cursor-pointer group hover:opacity-80 transition">
                  <span className="text-[15px] font-bold text-black tracking-wide mb-[2px]">储蓄 <span className="opacity-30 mx-0.5">|</span> 教育</span>
                  <span className="text-[12px] text-[#999] tracking-wide group-hover:text-black transition">未保障</span>
              </div>
          </div>

          {/* Dynamic Suggestion Promo Card */}
          <div className="w-full abstract-medical-bg rounded-xl pt-[14px] pb-5 px-4 relative overflow-hidden group cursor-pointer drop-shadow-sm border border-blue-50/50">
              
              {/* Abstract Elderly Medical Vector Stand-in */}
              <div className="absolute right-[-10px] bottom-0 w-[45%] h-full opacity-40 mix-blend-multiply flex items-end">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-[90%] transform scale-110">
                      <circle cx="60" cy="30" r="20" fill="#cfdcee"/>
                      <circle cx="30" cy="40" r="15" fill="#dfe7f2"/>
                      <path d="M20 100 C20 70, 80 70, 80 100 Z" fill="#cfdcee"/>
                  </svg>
              </div>

              {/* Tag */}
              <div className="bg-[#e7f0fa] text-[#4d7ca6] text-[10px] px-2 py-[2px] rounded-bl-[8px] rounded-tr-[8px] rounded-br-[2px] rounded-tl-[2px] w-max font-medium tracking-widest mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-blue-100/50 transform scale-[0.95] origin-left">
                  建议投保：百万医疗
              </div>

              {/* Title */}
              <div className="text-[17px] font-bold text-black tracking-wide leading-snug mb-[10px]">
                  300万住院报销金<span className="text-[#fb4a4f] text-[15px] ml-0.5">免费体验30天</span>
              </div>

              {/* Checklist */}
              <div className="flex flex-col space-y-[4px]">
                  <div className="flex items-center">
                     <div className="w-[12px] h-[12px] bg-[#fbd4d3] rounded-full flex items-center justify-center mr-1.5 mt-px text-white shadow-sm font-black flex-shrink-0">
                         <svg className="w-[8px] h-[8px] text-[#fb4a4f]" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24" fill="none">
                             <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                     </div>
                     <span className="text-[12px] text-[#888] tracking-widest">30天内随时取消不扣费</span>
                  </div>
                  <div className="flex items-center">
                     <div className="w-[12px] h-[12px] bg-[#fbd4d3] rounded-full flex items-center justify-center mr-1.5 mt-px text-white shadow-sm font-black flex-shrink-0">
                         <svg className="w-[8px] h-[8px] text-[#fb4a4f]" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24" fill="none">
                             <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                     </div>
                     <span className="text-[12px] text-[#888] tracking-widest">带病可投，住院1元起赔</span>
                  </div>
              </div>

              {/* Subscribe CTA Overlap */}
              <div className="w-[88px] h-[32px] bg-[#fb4a4f] text-white rounded-full flex justify-center items-center text-[12px] font-bold absolute right-4 bottom-4 shadow-[0_3px_10px_rgba(250,50,50,0.3)] group-active:scale-95 transition-transform tracking-widest">
                  免费体验
              </div>

          </div>
      </div>

      {/* 
        ========================================================================
         SERVICE INTERACTION CARDS
        ========================================================================
      */}
      {/* Service 1: My Claims */}
      <div className="mx-4 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] pt-[20px] pb-[18px] px-5 flex items-center justify-between mb-4 cursor-pointer active:bg-gray-50 transition border border-transparent">
          <div className="flex flex-col flex-1 relative">
              <div className="flex items-center mb-[5px] relative z-10 w-full mt-[-2px]">
                  <span className="text-[17px] font-bold text-black tracking-wide leading-none mr-2">我的理赔</span>
                  {/* Inline Tag */}
                  <div className="bg-[#fcedeb] text-[#e8494f] px-[5px] py-[3px] rounded-tl-lg rounded-tr-md rounded-br-lg rounded-bl-sm flex items-center shadow-sm">
                      {/* CSS Heart shape simulation inside svg box */}
                      <svg className="w-[10px] h-[10px] mr-1 mt-px fill-current text-[#fb4a4f]" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[11px] font-bold leading-none transform scale-[0.85] origin-left uppercase tracking-widest mt-[-0.5px]">安心赔</span>
                  </div>
              </div>
              <span className="text-[12px] text-[#999] tracking-widest">专业指导，全程协赔，在线答疑</span>
          </div>
          <div className="flex items-center text-gray-400 pl-4">
              <span className="text-[13px] tracking-widest">在线申请</span>
              <svg className="w-[13px] h-[13px] ml-[2px] mt-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>
      </div>

      {/* Service 2: Smart AI Assistant (JD Mascot) */}
      <div className="mx-4 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] py-4 px-5 flex items-center mb-4 cursor-pointer active:bg-gray-50 transition border border-transparent drop-shadow-sm">
          {/* Mascot AI Head */}
          <div className="w-[48px] h-[48px] bg-[#f8f9fb] rounded-full flex flex-col items-center justify-center mr-[14px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] flex-shrink-0 relative overflow-hidden border border-gray-100">
              {/* Mock metal reflection */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] bg-white opacity-40 rounded-bl-full"></div>
              
              <div className="w-[22px] h-[18px] bg-[#222] rounded-[5px] relative flex justify-around items-center px-[3px] shadow-[0_2px_3px_rgba(0,0,0,0.1)] mt-1">
                   <div className="w-[4px] h-[4px] bg-[#ffd54f] rounded-full animate-pulse blur-[0.3px]"></div>
                   <div className="w-[4px] h-[4px] bg-[#ffd54f] rounded-full animate-pulse blur-[0.3px]"></div>
              </div>
              {/* Tiny antenna mock */}
              <div className="absolute top-[6px] left-1/2 transform -translate-x-1/2 flex space-x-[5px]">
                  <div className="w-[3px] h-[5px] bg-[#bbb] rounded-full transform -rotate-45"></div>
                  <div className="w-[3px] h-[5px] bg-[#bbb] rounded-full transform rotate-45"></div>
              </div>
          </div>

          <div className="flex flex-col flex-1 pr-2 mt-[-2px]">
              <span className="text-[16px] font-bold text-black tracking-wide mb-[5px] leading-tight">保险问题，问小京灵</span>
              <span className="text-[12px] text-[#999] tracking-tight transform scale-[0.95] origin-left whitespace-nowrap">
                  专业咨询 <span className="opacity-30 mx-[2px]">|</span> 产品解读 <span className="opacity-30 mx-[2px]">|</span> 保单查询
              </span>
          </div>

          <div className="bg-[#feeced] text-[#f74f4b] text-[13px] font-bold px-[14px] py-[6px] rounded-full flex-shrink-0 ml-1 shadow-sm tracking-widest active:scale-95 transition">
              我要咨询
          </div>
      </div>

      {/* 
        ========================================================================
         TOOLS SECTION
        ========================================================================
      */}
      <div className="mx-4 bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] pt-5 pb-6 px-5 mb-8 border border-transparent">
          <span className="text-[17px] font-bold text-black tracking-wide block mb-6 drop-shadow-sm">我的工具</span>
          
          <div className="w-full flex items-center">
              {/* Tool 1 */}
              <div className="flex-1 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 transition-transform group">
                  <div className="w-[36px] h-[36px] rounded-full border border-gray-100 group-hover:border-gray-300 transition flex items-center justify-center mb-2 shadow-sm bg-gray-50/50">
                      <svg className="w-[20px] h-[20px] text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                  </div>
                  <span className="text-[13px] text-[#222] tracking-wide font-medium">保障配置</span>
              </div>
              
              {/* Tool 2 */}
              <div className="flex-1 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 transition-transform group">
                  <div className="w-[36px] h-[36px] rounded-full border border-gray-100 group-hover:border-gray-300 transition flex items-center justify-center mb-2 shadow-sm bg-gray-50/50">
                      <svg className="w-[20px] h-[20px] text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          <circle cx="12" cy="14" r="3" />
                      </svg>
                  </div>
                  <span className="text-[13px] text-[#222] tracking-wide font-medium">储蓄方案</span>
              </div>
              
              {/* Tool 3 */}
              <div className="flex-1 flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 transition-transform group">
                  <div className="w-[36px] h-[36px] rounded-full border border-gray-100 group-hover:border-gray-300 transition flex items-center justify-center mb-2 shadow-sm bg-gray-50/50">
                      <svg className="w-[20px] h-[20px] text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-9-4h10m-1-4l-1-4H8 5 5L4 13m15 0v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-4a1 1 0 011-1h14a1 1 0 011 1z" />
                      </svg>
                  </div>
                  <span className="text-[13px] text-[#222] tracking-wide font-medium">车险速算</span>
              </div>

              <div className="flex-1 hidden"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         FOOTER SIGNATURE (Legal & Branding)
        ========================================================================
      */}
      <div className="w-full flex flex-col items-center mt-6 pb-10 px-6 opacity-80 pointer-events-none">
          <div className="flex items-center mb-[10px]">
              <span className="text-[#fb4a4f] text-[18px] font-black italic tracking-tighter mr-1 font-serif drop-shadow-sm">JDA</span>
              <span className="text-[#fb4a4f] text-[15px] font-bold tracking-widest mr-[6px]">京东保</span>
              <div className="w-[3px] h-[3px] bg-gray-300 rounded-full mr-[6px]"></div>
              <span className="text-[11px] text-gray-400 font-medium tracking-widest transform scale-95">京东集团旗下保险经纪平台</span>
          </div>

          <div className="text-[10px] text-gray-300 tracking-widest mb-1.5 transform scale-95 shrink-0 whitespace-nowrap">
              本平台由京东保险经纪（天津）有限公司管理并运营
          </div>
          <div className="text-[10px] text-gray-300 tracking-widest flex items-center transform scale-95 shrink-0">
              信息披露 <span className="mx-1.5 opacity-50">|</span> 津ICP备17001571号-1
          </div>

          <div className="w-full flex justify-center items-center mt-[40px] opacity-40 mix-blend-multiply flex-col gap-1.5">
             <div className="flex text-gray-500 font-bold items-center space-x-1.5">
               <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
               </svg>
               <span className="text-[14px] tracking-widest">京东金融</span>
             </div>
             <div className="flex items-center text-gray-400 text-[10px] space-x-1 font-medium tracking-[0.2em] relative before:content-[''] before:w-[20px] before:border-b before:border-gray-200 before:absolute before:left-[-25px] before:top-1/2 after:content-[''] after:w-[20px] after:border-b after:border-gray-200 after:absolute after:right-[-25px] after:top-1/2">
                <span>简单</span><span>·</span><span>快捷</span><span>·</span><span>安全</span>
             </div>
          </div>
      </div>
      
    </div>
  );
}
