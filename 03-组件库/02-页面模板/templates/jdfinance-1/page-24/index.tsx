/**
 * @name 储备金保险 (Reserve Fund & Insurance)
 */
import React from 'react';
import './style.css';

export default function JDReserveFund() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[80px]">
      
      {/* 
        ========================================================================
         HERO PASTEL BACKGROUND 
        ========================================================================
      */}
      <div className="absolute top-0 left-0 w-full h-[320px] wealth-hero-bg z-0 overflow-hidden">
          {/* Abstract House & Heart Watermarks */}
          <div className="absolute top-[-30px] right-[-40px] opacity-20 pointer-events-none">
              <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
                 <path d="M50 10 L90 40 L90 90 L10 90 L10 40 Z" fill="#ffffff" />
                 <path d="M50 50 C50 50 35 40 35 55 C35 70 50 80 50 80 C50 80 65 70 65 55 C65 40 50 50 50 50" fill="#f8b6b6" />
                 <circle cx="75" cy="40" r="4" fill="#ffffff" />
                 <path d="M72 40 L78 40 M75 37 L75 43" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
          </div>
          <div className="absolute top-[80px] right-[100px] opacity-[0.15] pointer-events-none transform scale-75">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                 <path d="M50 20 L80 45 L80 85 L20 85 L20 45 Z" fill="#ffffff" />
                 <circle cx="20" cy="40" r="3" fill="#ffffff" />
                 <circle cx="80" cy="80" r="5" fill="#f8b6b6" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full pt-[52px] px-4 flex items-center justify-between sticky top-0 bg-transparent z-50">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="w-8 flex items-center justify-end cursor-pointer">
             <div className="flex space-x-[3px]">
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         HERO TITLE & TOGGLE
        ========================================================================
      */}
      <div className="w-full px-5 mt-4 relative z-10 flex justify-between items-start">
          <div className="flex flex-col">
              <div className="text-[32px] font-black text-black leading-tight tracking-tight mb-2 flex items-center">
                  储备金保收益<span className="brush-underline tracking-normal mx-1 font-sans">3%+</span>
              </div>
              <span className="text-[14px] text-gray-500 font-medium tracking-wide">
                  养老/教育/储蓄 领取写入合同
              </span>
          </div>

          {/* Subscribe Toggle */}
          <div className="flex items-center bg-[#fcece9] border border-white/60 rounded-full pl-2.5 pr-1 py-[3px] shadow-[0_2px_6px_rgba(250,150,150,0.1)] cursor-pointer mt-1 opacity-90 backdrop-blur-md">
              <span className="text-[11px] text-gray-600 font-medium mr-1.5 leading-none mt-px">订阅</span>
              <div className="w-[14px] h-[14px] bg-white rounded-full shadow-sm"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         ALERT NOTIFICATION (Marquee)
        ========================================================================
      */}
      <div className="mx-4 mt-6 z-10 bg-white/95 rounded-[8px] py-[10px] px-3 flex items-center shadow-[0_4px_12px_rgba(200,0,0,0.05)] border border-white/50 cursor-pointer">
          <svg className="w-[16px] h-[16px] text-[#fb4a4f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
          <div className="flex-1 overflow-hidden ml-2">
              <span className="text-[12px] text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis tracking-wide">
                 预定利率下调至2.0%，利率2.5%产品即将停售？
              </span>
          </div>
          <div className="flex items-center pl-2">
              <div className="w-1.5 h-1.5 bg-[#f8333c] rounded-full mr-1.5"></div>
              <svg className="w-3.5 h-3.5 text-gray-400 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         THREE HUGE TABS 
        ========================================================================
      */}
      <div className="w-full px-4 mt-4 relative z-10 flex space-x-[10px]">
          {/* Active Tab */}
          <div className="flex-1 bg-[#fb5958] rounded-[6px] h-[46px] flex items-center justify-center relative overflow-hidden shadow-sm cursor-pointer shadow-[0_2px_6px_rgba(250,80,80,0.2)]">
              {/* Abstract arrow up watermark */}
              <svg className="absolute bottom-[-5px] right-[-5px] w-[28px] h-[28px] text-white opacity-20 transform rotate-[-10deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-white text-[15px] font-bold tracking-widest relative z-10">招财保</span>
          </div>
          
          {/* Inactive Tabs */}
          <div className="flex-1 bg-white/90 rounded-[6px] h-[46px] flex items-center justify-center cursor-pointer shadow-sm border border-white/60 text-gray-600 active:bg-gray-50">
              <span className="text-[15px] font-medium tracking-widest">养老金</span>
          </div>
          <div className="flex-1 bg-white/90 rounded-[6px] h-[46px] flex items-center justify-center cursor-pointer shadow-sm border border-white/60 text-gray-600 active:bg-gray-50">
              <span className="text-[15px] font-medium tracking-widest">教育金</span>
          </div>
      </div>

      {/* 
        ========================================================================
         MAIN HIGH YIELD CARD 
        ========================================================================
      */}
      <div className="mx-4 mt-[10px] bg-white rounded-2xl pt-6 pb-7 px-5 relative z-20 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col items-center border border-white">
          
          <span className="text-[20px] font-bold text-black tracking-wide mb-3 text-center">
              提前锁定收益·保证领取写入合同
          </span>

          {/* Tags */}
          <div className="flex space-x-[6px] mb-6">
              <div className="border border-gray-200 text-gray-400 text-[10px] px-1.5 py-[2px] rounded-sm transform scale-95 origin-center tracking-wider">太平人寿央企出品</div>
              <div className="border border-gray-200 text-gray-400 text-[10px] px-1.5 py-[2px] rounded-sm transform scale-95 origin-center tracking-wider">不惧市场波动</div>
              <div className="border border-gray-200 text-gray-400 text-[10px] px-1.5 py-[2px] rounded-sm transform scale-95 origin-center tracking-wider">不惧A股大跌</div>
          </div>

          {/* Massive Number with Ruled Lines Background */}
          <div className="w-full ruled-lines-bg flex justify-center items-center py-2 mb-4 relative h-[70px]">
              <div className="flex items-baseline relative z-10">
                  <span className="text-[#fb3a3a] text-[48px] font-bold font-sans tracking-tight leading-none drop-shadow-sm">3.17</span>
                  <span className="text-[#fb3a3a] text-[24px] font-bold font-sans ml-[1px]">%</span>
              </div>
              <div className="w-3.5 h-3.5 bg-gray-200 rounded-full flex items-center justify-center ml-2 relative top-2 opacity-80 shadow-inner">
                  <span className="text-white text-[10px] font-bold leading-none font-serif italic">i</span>
              </div>
          </div>

          <span className="text-[13px] text-gray-600 tracking-widest mb-6">年化增值高于大部分同类产品</span>

          {/* CTA Box wrapper for Tooltip */}
          <div className="w-[85%] relative">
             {/* Floating Callout */}
             <div className="absolute -top-[20px] right-[10px] bg-[#ffeed9] text-[#e06915] text-[10px] font-bold px-[6px] py-[3px] rounded-[4px] bubble-tail shadow-sm z-30 tracking-widest">
                预定利率或将下调
             </div>
             
             {/* Main Big Button */}
             <div className="w-full h-[50px] bg-[#fb4a4f] rounded-full flex items-center justify-center text-white text-[18px] font-bold tracking-widest cursor-pointer active:scale-95 shadow-[0_4px_15px_rgba(250,80,80,0.3)] z-20 relative">
                 抓住机会 立即上车
             </div>
          </div>

      </div>

      {/* 
        ========================================================================
         LIST SECTION (Bottom Module)
        ========================================================================
      */}
      <div className="w-full bg-white flex-1 relative z-20 mt-4 rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] border-t border-gray-50 flex flex-col">
          
          {/* Tabs */}
          <div className="w-full flex space-x-6 px-6 pt-5 pb-3">
              <div className="flex flex-col items-center cursor-pointer">
                  <span className="text-[16px] font-bold text-black tracking-wider">储蓄增值</span>
                  <div className="w-4 h-[3px] bg-[#f8333c] rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                  <span className="text-[16px] font-medium text-gray-400 tracking-wider">养老无忧</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                  <span className="text-[16px] font-medium text-gray-400 tracking-wider">宝贝教育</span>
              </div>
          </div>

          <div className="w-full flex-1 flex flex-col pt-3 px-5">
              
              {/* Product Item 1 */}
              <div className="w-full flex flex-col border-b border-gray-100 pb-5 mb-5 relative">
                  
                  {/* Faint click highlight mock */}
                  <div className="absolute inset-[-10px] bg-gray-50 opacity-0 active:opacity-100 rounded-lg pointer-events-none transition"></div>

                  <div className="flex items-center mb-4">
                      <span className="text-[16px] font-bold text-black tracking-wide mr-2">招财保·年金险灵活版</span>
                      <div className="border border-[#fc817f] text-[#fc6262] bg-[#fff8f8] text-[9px] px-[3px] py-[0.5px] rounded-sm tracking-widest scale-90 origin-left font-medium">保证收益</div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col w-[120px]">
                          <span className="text-[#fb4a4f] text-[20px] font-bold font-sans tracking-tight mb-1">3.17%</span>
                          <span className="text-gray-400 text-[12px] tracking-wide">年化增值率</span>
                      </div>
                      <div className="flex flex-col flex-1 pl-2 border-l border-transparent">
                          <span className="text-black text-[18px] font-bold font-sans tracking-tight mb-1.5 flex items-baseline leading-none">50<span className="text-[14px]">元起</span></span>
                          <span className="text-gray-400 text-[12px] tracking-wide leading-none">低门槛可灵活加保</span>
                      </div>
                      <div className="bg-[#fb4a4f] text-white text-[13px] font-bold rounded-full px-5 py-[6px] shadow-sm active:scale-95 transition-transform ml-2 cursor-pointer">
                          去看看
                      </div>
                  </div>

                  <div className="w-full bg-[#f8f9fa] rounded-md px-3 py-2.5 flex items-center">
                      <span className="text-[11px] text-black tracking-wide">
                          <span className="font-bold mr-1.5">推荐理由</span>央企品牌值得信赖，可长期持有高息储蓄
                      </span>
                  </div>
              </div>

              {/* Product Item 2 (Cut off) */}
              <div className="w-full flex flex-col pb-2 relative">
                  <div className="flex items-center mb-4">
                      <span className="text-[16px] font-bold text-black tracking-wide mr-2">招财保·年金险</span>
                      <div className="border border-[#fc817f] text-[#fc6262] bg-[#fff8f8] text-[9px] px-[3px] py-[0.5px] rounded-sm tracking-widest scale-90 origin-left font-medium">保证收益</div>
                  </div>
              </div>

          </div>

      </div>

      {/* 
        ========================================================================
         STATIC BOTTOM TAB BAR 
        ========================================================================
      */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fdfdfd] border-t border-gray-100 flex items-center justify-around pb-[28px] pt-[8px] z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.02)]">
          {/* Tab 1: 储备金 (Active) */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-100">
             <svg className="w-[24px] h-[24px] text-black mb-1 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M19.5 9.5c0-.83.67-1.5 1.5-1.5v-2h-3v-1c0-1.1-.9-2-2-2S14 3.9 14 5v1h-4V5c0-1.1-.9-2-2-2S6 3.9 6 5v1H3v2c.83 0 1.5.67 1.5 1.5S3.83 11 3 11v2h3v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5h3v-2c-.83 0-1.5-.67-1.5-1.5zM12 15h-2v-2h2v2z" />
             </svg>
             <span className="text-[10px] text-black font-bold">储备金</span>
          </div>

          {/* Tab 2: 持仓 (Inactive) */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 relative left-[-4px]">
             <div className="w-[22px] h-[22px] border-2 border-black rounded-full flex items-center justify-center mb-[5px] mt-[1px]">
                 <span className="text-black font-bold text-[12px] leading-none mb-px font-sans">¥</span>
             </div>
             <span className="text-[10px] text-gray-700 font-medium">持仓</span>
          </div>
      </div>

    </div>
  );
}
