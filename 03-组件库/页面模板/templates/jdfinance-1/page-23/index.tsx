/**
 * @name 农户借款 (Farmer's Loan Interface)
 */
import React from 'react';
import './style.css';

export default function JDFarmersLoan() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[80px]">
      
      {/* 
        ========================================================================
         HERO BACKGROUND 
        ========================================================================
      */}
      <div className="absolute top-0 left-0 w-full h-[400px] farmer-hero-bg z-0 overflow-hidden">
          {/* Subtle wheat watermark abstract elements */}
          <div className="absolute top-[-50px] right-[-100px] w-[300px] h-[300px] border-[2px] border-white/5 rounded-full transform rotate-45 scale-y-50"></div>
          <div className="absolute top-[50px] right-[-50px] w-[200px] h-[200px] border-[2px] border-white/5 rounded-full transform rotate-[60deg] scale-y-50"></div>
      </div>

      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full pt-[52px] px-4 flex items-center justify-between sticky top-0 bg-transparent z-50">
         <div className="flex items-center">
            {/* Back Arrow */}
            <div className="w-8 flex items-center cursor-pointer">
               <svg className="w-[24px] h-[24px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
               </svg>
            </div>
            <div className="flex items-baseline ml-[-6px]">
               <span className="text-[20px] font-bold text-white tracking-wide drop-shadow-sm">农户借款</span>
               <span className="text-[11px] text-white/90 ml-2 font-medium tracking-wide">简单 · 快捷 · 安全</span>
            </div>
         </div>

         {/* Actions */}
         <div className="flex space-x-4 items-center">
             <div className="flex flex-col items-center cursor-pointer">
                 <svg className="w-[20px] h-[20px] text-white mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243-2.829a4 4 0 115.656 0l-2.828 2.829a4 4 0 01-5.656 0z" />
                     {/* Headphone curve mock */}
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 14v4h4v-4H4zm12 0v4h4v-4h-4z" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 14a8 8 0 0116 0" />
                 </svg>
                 <span className="text-[9px] text-white">客服</span>
             </div>
             <div className="flex flex-col items-center cursor-pointer relative top-[1px]">
                 <div className="w-[20px] h-[20px] flex items-center justify-center space-x-[3px] mb-[2px]">
                     <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                     <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                     <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                 </div>
                 <span className="text-[9px] text-white">更多</span>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         TRUST BADGES (Checkmarks) 
        ========================================================================
      */}
      <div className="w-full flex justify-between px-6 mt-4 relative z-10 mb-[-10px]">
          <div className="flex items-center space-x-1">
              <svg className="w-[14px] h-[14px] text-white/90" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 5-5" />
              </svg>
              <span className="text-[12px] text-white/90 tracking-wide">随时可还款</span>
          </div>
          <div className="flex items-center space-x-1">
              <svg className="w-[14px] h-[14px] text-white/90" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 5-5" />
              </svg>
              <span className="text-[12px] text-white/90 tracking-wide">极速秒到账</span>
          </div>
          <div className="flex items-center space-x-1 mb-[22px]">
              <svg className="w-[14px] h-[14px] text-white/90" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 5-5" />
              </svg>
              <span className="text-[12px] text-white/90 tracking-wide">京东自营平台</span>
          </div>
      </div>

      {/* 
        ========================================================================
         MAIN LOAN CARD 
        ========================================================================
      */}
      <div className="mx-4 bg-gradient-to-b from-[#fbfdf8] to-white rounded-t-xl rounded-b-xl relative z-20 shadow-[0_4px_25px_rgba(0,0,0,0.06)] overflow-hidden">
          
          {/* Card Bg Watermark (Wheat Pattern Mock) */}
          <div className="absolute top-0 right-0 w-full h-[120px] pointer-events-none opacity-20">
             <div className="absolute -top-[20px] right-[-40px] w-[140px] h-[140px] border-[2px] border-dotted border-[#cbdcbd] rounded-full transform rotate-45 scale-y-50"></div>
          </div>

          <div className="w-full flex flex-col items-center pt-8 px-5">
              
              {/* Title & Badge */}
              <div className="flex items-center justify-center space-x-2 mb-2 relative z-10">
                  <span className="text-[15px] text-black font-medium tracking-wide">最高可借现金(元)</span>
                  <div className="flex items-center bg-[#fdf3e9] border border-[#fbdcb9] rounded-sm px-[4px] py-[1.5px]">
                      <svg className="w-[10px] h-[10px] text-[#e07f30]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[9px] text-[#e07f30] font-bold ml-[2px] transform scale-95 origin-left tracking-wider">保障中</span>
                  </div>
              </div>

              {/* Big Number */}
              <div className="text-[64px] font-sans font-normal text-black leading-none mb-6 tracking-tight relative z-10">
                 208,000
              </div>

              {/* Orange Callout box */}
              <div className="bg-[#fef4ea] px-[16px] py-[8px] rounded-[6px] mb-6 relative z-10">
                  <span className="text-[14px] text-[#dd8e5b]">
                      含临时额度<span className="font-bold">28000元</span>，部分于<span className="font-bold">06月19日过期</span>
                  </span>
              </div>

              {/* Interest Rate String */}
              <div className="text-[13.5px] text-gray-500 font-sans tracking-wide mb-6 relative z-10 text-center w-full">
                  年利率16.1% <span className="line-through text-gray-400">18.3%</span>，1千借1天，利息0.44元
              </div>

              {/* Main CTA Button */}
              <div className="w-full h-[52px] bg-[#e19a62] rounded-full flex items-center justify-center text-white text-[18px] font-bold tracking-widest cursor-pointer active:scale-95 shadow-md relative z-10 mb-7">
                  我要借款
              </div>

              {/* Footer text */}
              <div className="flex items-center justify-center text-gray-300 text-[11px] font-sans tracking-widest mb-7 relative z-10">
                  贷款服务由承德银行提供
                  <div className="flex items-center justify-center w-3 h-3 rounded-full border border-gray-300 ml-1 opacity-80">
                      <span className="text-[9px] leading-none pb-[1px]">?</span>
                  </div>
              </div>
          </div>

          {/* Bottom Alert Marquee */}
          <div className="w-full flex items-center bg-[#fafafa] border-t border-gray-100 py-[10px] px-4 relative z-10">
              <svg className="w-[14px] h-[14px] text-gray-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] text-gray-400 flex-1 overflow-hidden whitespace-nowrap text-ellipsis tracking-widest">
                  请注意！官方来电不会提到：“共享屏幕”、“注销账户”
              </span>
              <svg className="w-3.5 h-3.5 text-gray-400 ml-2 flex-shrink-0 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         PROMO BANNER CARD (618 降息)
        ========================================================================
      */}
      <div className="mx-4 mt-3 rounded-lg promo-ticket-border p-4 relative shadow-[0_2px_10px_rgba(200,100,50,0.05)] mb-3 group cursor-pointer z-20 bg-[#fefafe]">
          {/* Helper corner borders created via extra CSS classes */}
          <div className="promo-corner-tr"></div>
          <div className="promo-corner-bl"></div>

          <div className="w-full flex justify-between items-center relative">
              
              {/* Left Content */}
              <div className="flex flex-col relative z-20">
                  <div className="bg-gradient-to-r from-[#ffe4d2] to-[#ffebd9] text-[#c96f2a] text-[9px] font-bold px-1.5 py-[2px] rounded-[2px] mb-2 self-start transform scale-95 origin-left">
                      618限时专享
                  </div>
                  <div className="text-[16px] text-black font-bold tracking-wide mb-1 flex items-baseline">
                      <span>你有一个</span><span className="text-[#e27329] text-[17px] mx-0.5">降息机会</span><span>待使用</span>
                  </div>
                  <div className="flex items-center text-[10px] text-gray-400 tracking-wider">
                      <span className="text-[#c9a68a] bg-[#fbf3ec] px-1 rounded-sm mr-1">100%可降</span>
                      <span>借款后抽清空购物车机会</span>
                  </div>
              </div>

              {/* Right Button */}
              <div className="bg-gradient-to-r from-[#ec9e60] to-[#e47e38] rounded-full px-5 py-[7px] text-white text-[13px] font-bold shadow-md relative z-20 mt-2">
                  立即领取
              </div>

              {/* Close target corner */}
              <div className="absolute -top-2 -right-3 p-2 z-50 text-gray-400 hover:text-gray-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         ABOUT US (关于我们)
        ========================================================================
      */}
      <div className="mx-4 rounded-xl bg-gradient-to-br from-[#124933] to-[#0d3423] p-5 relative overflow-hidden shadow-md mb-[20px] z-20">
          
          {/* Fake background watermark '京东' */}
          <div className="absolute right-[-10px] top-[10px] text-[80px] font-black text-white opacity-[0.02] transform skew-x-[-15deg] pointer-events-none select-none">
              京东
          </div>
          
          <div className="w-full flex justify-between items-start relative z-10">
              <div className="flex flex-col">
                  <span className="text-[16px] text-white font-bold tracking-widest mb-4 drop-shadow-sm">关于我们</span>
                  
                  {/* Timeline structure */}
                  <div className="flex flex-col relative pl-2">
                      <div className="absolute left-[3px] top-[7px] bottom-[5px] w-px bg-white/30"></div>
                      
                      {/* Item 1 */}
                      <div className="flex items-center relative mb-4">
                          <div className="absolute -left-2 w-[4px] h-[4px] bg-white rounded-full"></div>
                          <span className="text-white/90 text-[13px] tracking-wide pl-2">2014年成立·京东金融</span>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center relative">
                          <div className="absolute -left-2 w-[4px] h-[4px] bg-white rounded-full"></div>
                          <span className="text-white/90 text-[13px] tracking-wide pl-2">2018年更名·京东科技</span>
                      </div>
                  </div>
              </div>

              {/* Right Action */}
              <div className="border border-white/40 text-white/90 text-[11px] rounded-full px-3 py-[4px] bg-white/5 active:bg-white/20 tracking-wider mt-1 cursor-pointer">
                  了解品牌 &gt;
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         STATIC BOTTOM TAB BAR 
        ========================================================================
      */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fdfdfd] border-t border-gray-100 flex items-center justify-around pb-6 pt-2 z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.02)]">
          {/* Tab 1: 借款 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-100">
             <div className="w-[24px] h-[24px] bg-black rounded-full flex items-center justify-center mb-1">
                 <span className="text-white font-bold text-[14px]">¥</span>
             </div>
             <span className="text-[10px] text-black font-medium">借款</span>
          </div>

          {/* Tab 2: 还款 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 mt-[-2px]">
             <svg className="w-[26px] h-[26px] text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
             </svg>
             <span className="text-[10px] text-gray-700">还款</span>
          </div>

          {/* Tab 3: 我的 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-80">
             <svg className="w-[24px] h-[24px] text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <circle cx="12" cy="12" r="10" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 2 4 2 4-2 4-2" />
             </svg>
             <span className="text-[10px] text-gray-700">我的</span>
          </div>
      </div>

    </div>
  );
}
