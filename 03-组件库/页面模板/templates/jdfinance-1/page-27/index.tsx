/**
 * @name 缺口分析 (Gap Analysis)
 */
import React from 'react';
import './style.css';

export default function JDGapAnalysis() {
  return (
    <div className="w-full min-h-screen gap-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[160px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION BAR (Transparent)
        ========================================================================
      */}
      <div className="w-full pt-[52px] px-4 flex items-center justify-between sticky top-0 z-50">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="w-8 flex items-center justify-end cursor-pointer">
             <div className="flex space-x-[4px]">
                 <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         HERO TITLE & TOGGLE
        ========================================================================
      */}
      <div className="w-full px-5 mt-3 relative z-10 flex justify-between items-start">
          <div className="flex flex-col flex-1 mr-2 min-w-0">
              <div className="text-[28px] font-black text-white leading-tight tracking-wide mb-1.5 drop-shadow-md">
                  大病有保额·应急不借钱
              </div>
              <span className="text-[13px] text-white/90 font-medium tracking-wide truncate">
                  保额应急可取现 <span className="mx-0.5 opacity-60">|</span> 随用随取应急金
              </span>
          </div>

          {/* Subscribe Toggle */}
          <div className="flex items-center flex-shrink-0 whitespace-nowrap bg-black/15 border border-white/20 rounded-full pl-2 pr-1 py-[3px] cursor-pointer mt-1 backdrop-blur-md">
              <span className="text-[11px] text-white font-medium mr-1.5 leading-none mt-px">订阅</span>
              <div className="w-[14px] h-[14px] bg-white rounded-full shadow-sm"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         TOP CALCULATION CARD (The Gap Summary)
        ========================================================================
      */}
      <div className="mx-4 mt-6 rounded-[14px] gap-card-gradient shadow-[0_4px_20px_rgba(200,50,0,0.15)] flex flex-col relative z-20 pt-10 pb-5">
          {/* Top Overlapping Banner */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#fbe7a4] text-[#aa6c19] text-[12px] font-medium px-4 py-1 rounded-b-[10px] whitespace-nowrap shadow-sm">
             根据 <span className="font-bold cursor-pointer">北京市 ▼</span> 医保政策和您已有保单计算
          </div>

          <div className="flex w-full px-5 mt-2">
              {/* Left Column */}
              <div className="flex-1 flex flex-col">
                  <div className="flex items-center mb-1">
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-sm mr-1.5"></div>
                      <span className="text-[13px] text-gray-700 font-bold tracking-wide">应急·保障额度</span>
                      <div className="w-[12px] h-[12px] bg-gray-200 text-white rounded-full flex items-center justify-center ml-1 opacity-80">
                          <span className="text-[9px] font-bold font-serif italic mb-px pt-px">i</span>
                      </div>
                  </div>
                  <div className="flex items-baseline mt-1 cursor-pointer">
                      <span className="text-[34px] font-bold text-gray-800 font-sans tracking-tight leading-none">0.00</span>
                      <span className="text-[14px] text-gray-800 font-bold ml-[1px]">元</span>
                      <svg className="w-[14px] h-[14px] text-gray-400 font-bold relative top-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-[40px] bg-red-100 mt-2 mx-1 opacity-50 border-l border-dashed border-red-300"></div>

              {/* Right Column */}
              <div className="flex-[0.9] flex flex-col pl-2">
                  <div className="flex items-center mb-1 whitespace-nowrap">
                      <div className="w-1.5 h-1.5 bg-[#e44239] rounded-sm mr-1.5"></div>
                      <span className="text-[13px] text-[#e44239] font-bold tracking-wide">应急缺口</span>
                  </div>
                  <div className="flex items-baseline mt-1 cursor-pointer whitespace-nowrap">
                      <span className="text-[34px] font-bold text-[#e44239] font-sans tracking-tight leading-none dropdown-shadow">48.23</span>
                      <span className="text-[14px] text-[#e44239] font-bold ml-[1px]">万元</span>
                      <svg className="w-[14px] h-[14px] text-[#e44239] font-bold relative top-[1px] ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         BANNER CARD (再领保额)
        ========================================================================
      */}
      <div className="mx-4 mt-3 bg-gradient-to-r from-[#fffefe] to-[#feebe7] rounded-[10px] p-3 flex items-center justify-between shadow-[0_2px_10px_rgba(200,50,0,0.08)] relative overflow-hidden z-20 cursor-pointer active:scale-[0.98] transition">
          {/* Abstract car watermark on the right */}
          <svg className="absolute right-0 top-0 h-full w-[120px] text-red-200 opacity-20 transform translate-x-[20%]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 40 L30 20 L70 20 L90 40 Z" />
              <circle cx="25" cy="40" r="8" />
              <circle cx="75" cy="40" r="8" />
          </svg>
          
          <div className="flex flex-col relative z-10">
              <div className="text-[12px] text-gray-500 mb-0.5 tracking-wide">
                  再领保额 <span className="mx-0.5 opacity-50">|</span> 补齐缺口：
              </div>
              <div className="text-[15px] font-bold text-black tracking-wide">
                  <span className="text-[#f13123]">300万应急额度</span>·随用随取不借钱
              </div>
          </div>

          <div className="bg-[#fb4a4f] text-white text-[12px] font-bold px-3 py-[6px] rounded-full relative z-10 shadow-sm whitespace-nowrap">
              30天免费体验
          </div>
      </div>

      {/* 
        ========================================================================
         SECTION TITLE
        ========================================================================
      */}
      <div className="px-5 mt-6 mb-3 text-[18px] font-bold text-white tracking-widest drop-shadow-sm z-20 relative">
          遇到大病，急用钱时不求人
      </div>

      {/* 
        ========================================================================
         MAIN INTERACTIVE CARD (Medical Emergency Hub)
        ========================================================================
      */}
      <div className="mx-4 bg-gradient-to-b from-[#fffcfb] to-[#fcede8] rounded-[16px] shadow-[0_4px_25px_rgba(200,50,0,0.1)] mb-6 z-20 relative pb-5">
          
          {/* Top Header Row (Reference Implementation) */}
          <div className="w-full flex bg-gradient-to-r from-[#fce2d7] to-[#facfbe] rounded-t-[16px] mb-4">
              
              {/* Left Tab (Active) with slanted right edge */}
              <div className="w-[54%] pt-[18px] pb-3 pl-4 bg-gradient-to-b from-[#fffbfa] to-[#fffcfb] relative z-10" style={{ clipPath: 'polygon(0 0, 82% 0, 100% 100%, 0 100%)' }}>
                  <div className="flex flex-col">
                      <span className="text-[17px] font-bold text-[#68230f] tracking-wider mb-1">医疗应急</span>
                      <span className="text-[12px] text-[#934832] tracking-wide">补充医保 <span className="mx-0.5 opacity-70">|</span> 治病不借钱</span>
                  </div>
              </div>

              {/* Right Tab (Inactive) */}
              <div className="flex-1 pt-[18px] pb-3 pl-2 flex flex-col justify-center relative z-0">
                  <div className="flex items-center mb-1 mt-[-2px]">
                      <span className="text-[16px] font-bold text-[#794130] tracking-wider">确诊即赔</span>
                      <div className="bg-gradient-to-r from-[#fb7e53] to-[#fa5233] text-white text-[11px] font-bold px-[6px] py-[1.5px] rounded-full ml-1.5 shadow-[0_2px_4px_rgba(250,80,50,0.3)] leading-none transform scale-95 origin-left">25000元</div>
                  </div>
                  <span className="text-[11px] text-[#b07b68] tracking-wide">重疾先拿钱 <span className="mx-0.5 opacity-70">|</span> 医保仍可报销</span>
              </div>
          </div>

          {/* Family Members Tabs Row */}
          <div className="w-full flex overflow-x-auto scrollbar-hide px-4 space-x-[10px] pb-2 mb-2">
              <div className="bg-[#f04f43] text-white px-3 py-1.5 rounded-full text-[13px] font-bold tracking-widest relative family-active-tag shadow-sm flex-shrink-0 cursor-pointer">
                  本人 黄*涛
              </div>
              <div className="bg-[#fffdfd] border border-[#f5b8a8] text-[#c2513f] px-3 py-1.5 rounded-full text-[13px] font-bold tracking-widest flex items-center shadow-sm flex-shrink-0 cursor-pointer active:bg-red-50">
                  父亲 待补充
                  <svg className="w-3.5 h-3.5 ml-[2px] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
              <div className="bg-[#fffcfc] border border-gray-100 text-[#999] px-3 py-1.5 rounded-full text-[13px] font-bold tracking-widest shadow-sm flex-shrink-0 cursor-pointer active:bg-gray-50">
                  母亲 待补充
              </div>
              <div className="w-[30px] h-[30px] bg-white border border-[#fac2b6] text-[#e04535] rounded-full flex items-center justify-center font-bold text-[18px] flex-shrink-0 cursor-pointer shadow-sm ml-1 leading-none mt-[1px]">
                  +
              </div>
          </div>

          {/* The Diagnosis Gap Box */}
          <div className="mx-4 bg-[#fdf2e8] rounded-[10px] p-4 flex mb-4 relative drop-shadow-sm quote-watermark cursor-pointer group active:bg-[#fcebde] transition-colors">
              {/* CSS Abstract Dad Avatar */}
              <div className="w-[50px] h-[50px] rounded-full dad-avatar-bg flex items-center justify-center overflow-hidden border-2 border-white shadow-sm flex-shrink-0 mr-3 relative">
                  {/* Hair */}
                  <div className="absolute top-0 w-full h-[40%] bg-[#332] z-10 rounded-b-lg"></div>
                  {/* Glasses & eyes */}
                  <div className="absolute top-[40%] w-[80%] flex justify-between px-1 z-20">
                      <div className="w-[14px] h-[14px] border-2 border-[#111] rounded-sm bg-white/50 flex items-center justify-center">
                          <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
                      </div>
                      <div className="w-1.5 h-[2px] bg-[#111] mt-1.5"></div>
                      <div className="w-[14px] h-[14px] border-2 border-[#111] rounded-sm bg-white/50 flex items-center justify-center">
                          <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
                      </div>
                  </div>
                  {/* Mustache */}
                  <div className="absolute top-[70%] w-[16px] h-[4px] bg-[#332] rounded-full z-20"></div>
              </div>

              <div className="flex-1 flex flex-col pt-0.5 relative z-10">
                  <span className="text-[17px] font-bold text-[#222] tracking-tight mb-1">治病缺口32.31万元</span>
                  <span className="text-[12px] text-[#888] tracking-wide">预估大病治疗中，医保不报销的费用</span>
              </div>
          </div>

          {/* Connected Chevron Tabs */}
          <div className="flex px-4 mb-[-8px] relative z-10">
              <div className="chevron-tab-first bg-white border-b-2 border-b-[#f63b2f] text-[#f63b2f] h-[32px] flex items-center justify-center text-[13px] font-bold tracking-widest cursor-pointer shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                  0元体验
              </div>
              <div className="chevron-tab bg-white/60 text-[#888] h-[32px] flex items-center justify-center text-[12px] font-bold tracking-widest cursor-pointer hover:bg-white transition pb-1">
                  惠民医疗
              </div>
              <div className="chevron-tab bg-white/40 text-[#888] h-[32px] flex items-center justify-center text-[12px] font-bold tracking-widest cursor-pointer hover:bg-white transition pb-1">
                  惠民升级
              </div>
              <div className="chevron-tab bg-white/30 text-[#888] h-[32px] flex items-center justify-center text-[12px] font-bold tracking-widest cursor-pointer hover:bg-white transition pb-1">
                  2.5万
              </div>
          </div>

          {/* Final Inner White Card */}
          <div className="mx-4 bg-white rounded-xl shadow-[0_4px_15px_rgba(200,50,0,0.06)] pt-8 pb-5 px-4 flex flex-col items-center relative z-20">
              <span className="text-[20px] font-bold text-[#111] tracking-wide mb-1">300万应急保障额度</span>
              <span className="text-[13px] text-[#666] tracking-widest mb-6">带病也可投保 <span className="mx-1 opacity-50">|</span> 30天0费用不花钱</span>
              
              <div className="w-[85%] h-[48px] bg-[#fb4a4f] rounded-full flex items-center justify-center text-white text-[16px] font-bold tracking-widest cursor-pointer shadow-[0_5px_15px_rgba(250,50,50,0.3)] active:scale-95 transition-transform">
                  0元先体验一次
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         GLOBAL BOTTOM TAB BAR 
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full h-[54px] bg-[#fbfbfb] border-t border-gray-100 flex items-center justify-around px-2 z-50">
          
          {/* Inactive Tab 1 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1">
             <svg className="w-[24px] h-[24px] text-black mb-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
             <span className="text-[10px] text-black tracking-wide">应急金</span>
          </div>

          {/* Active Tab 2 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-100 transform active:scale-95 transition pb-1 relative left-2">
             <svg className="w-[22px] h-[22px] text-black mb-1 drop-shadow-sm mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
             </svg>
             <span className="text-[10px] text-black font-bold tracking-wide">缺口分析</span>
          </div>

          {/* Inactive Tab 3 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 relative left-1">
             <svg className="w-[24px] h-[24px] text-black mb-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 13v4m-2-2h4" />
             </svg>
             <span className="text-[10px] text-black tracking-wide">小病应急</span>
          </div>

          {/* Inactive Tab 4 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 relative right-1">
             <svg className="w-[24px] h-[24px] text-black mb-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 11c0 1.1-.9 2-2 2h-1c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h1c1.1 0 2 .9 2 2zm-5-6h-4M6 14C4.9 14 4 13.1 4 12c0-1.1.9-2 2-2h1c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H6zm14.5 3.5c0 1.93-3.58 3.5-8 3.5s-8-1.57-8-3.5v-3C4.5 10.9 8.08 9.33 12.5 9.33s8 1.57 8 3.5v3z" />
             </svg>
             <span className="text-[10px] text-black tracking-wide">储蓄金</span>
          </div>

      </div>

    </div>
  );
}
