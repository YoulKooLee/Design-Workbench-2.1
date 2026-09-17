/**
 * @name 京东黄金 - 新手引导页 (JD Gold Hub - Onboarding Guide)
 */
import React from 'react';
import './style.css';

export default function JDGoldHubGuide() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[80px]">
      
      {/* ----------------- BACKGROUND (PAGE-15 CONTENT) ----------------- */}
   
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gold-hub-header gold-hub-waves z-0 pointer-events-none"></div>

      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-3 pb-2 flex items-center justify-between sticky top-0 bg-transparent z-50">
         
         {/* Left: Back & Title */}
         <div className="flex items-end flex-1">
            <div className="w-6 mr-1">
               <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
               </svg>
            </div>
            <span className="text-[19px] font-bold text-black tracking-wide leading-none">京东黄金</span>
            <span className="text-[11px] text-gray-500 font-medium ml-2 mb-[2px] tracking-widest whitespace-nowrap">简单·快捷·安全</span>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center justify-end space-x-3 text-black">
            {/* Headset Customer Service Icon */}
            <svg className="w-[22px] h-[22px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
               <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
               <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <svg className="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
         </div>
      </div>

      {/* 2. Top Navigation Grid */}
      <div className="w-full px-2 mt-4 mb-2 grid grid-cols-5 z-10 relative">
         
         {/* Icon 1: 积存金 */}
         <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[42px] h-[42px] bg-gradient-to-br from-[#fcdeb4] to-[#fcebde] rounded-full flex items-center justify-center shadow-sm">
               <div className="w-6 h-6 flex flex-col items-center justify-center">
                  <div className="w-5 h-2 bg-gradient-to-r from-[#e1804c] to-[#ed9d65] rounded-t-sm mb-[1px]"></div>
                  <div className="flex space-x-[2px]">
                     <div className="w-1 h-3 bg-[#e1804c]"></div>
                     <div className="w-1 h-3 bg-[#ea8d56]"></div>
                     <div className="w-1 h-3 bg-[#ed9d65]"></div>
                  </div>
                  <div className="w-6 h-1.5 bg-gradient-to-r from-[#e1804c] to-[#ed9d65] rounded-b-sm mt-[1px]"></div>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">积存金</span>
         </div>

         {/* Icon 2: 实物黄金 */}
         <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[42px] h-[42px] flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-b from-[#ffbe8d] to-[#fa874c] rounded-b-[10px] rounded-t-[5px] scale-90 mb-1 mask-bottom"></div>
               <svg className="w-6 h-6 text-white absolute mt-[-2px] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
               </svg>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">实物黄金</span>
         </div>

         {/* Icon 3: 黄金期货 */}
         <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[42px] h-[42px] bg-gradient-to-br from-[#ffcd9e] to-[#ffdbb9] rounded-xl flex items-center justify-center shadow-sm p-[2px]">
               <div className="w-full h-full bg-gradient-to-b from-[#feab5f] to-[#f9823f] rounded-[9px] flex items-center justify-center flex-col relative overflow-hidden">
                  <div className="absolute top-0 w-full h-2 bg-[#ffcc9e]"></div>
                  <svg className="w-5 h-5 text-white z-10 mb-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">黄金期货</span>
         </div>

         {/* Icon 4: 黄金回收 */}
         <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[42px] h-[42px] flex items-center justify-center">
               <div className="w-10 h-10 bg-gradient-to-b from-[#ffb976] to-[#fa833e] rounded-full flex items-center justify-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">黄金回收</span>
         </div>

         {/* Icon 5: 黄金ETF */}
         <div className="flex flex-col items-center cursor-pointer">
            <div className="w-[42px] h-[42px] flex items-center justify-center">
               <div className="w-10 h-10 bg-gradient-to-b from-[#ffbe8d] to-[#fa874c] rounded-[10px] flex items-center justify-center shadow-sm overflow-hidden relative">
                  <div className="absolute bottom-0 w-full h-[18px] bg-white/20"></div>
                  <svg className="w-6 h-6 text-white mb-2 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L12 10L16 13L21 6" />
                  </svg>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">黄金ETF</span>
         </div>
      </div>
      
      {/* Pagination dots under icons */}
      <div className="flex justify-center items-center space-x-[2px] mb-4 z-10 relative">
         <div className="w-3 h-[3px] bg-gray-400 rounded-full"></div>
         <div className="w-1 h-3px bg-gray-200 rounded-full"></div>
      </div>

      {/* 3. Market Rates & News Card (今日关注) */}
      <div className="mx-4 bg-white/90 backdrop-blur-sm rounded-xl mb-3 relative z-10 shadow-[0_4px_10px_rgba(0,0,0,0.01)] py-4 flex flex-col border border-white">
         
         {/* Top: News Header */}
         <div className="flex items-center px-4 mb-4">
            {/* Logo "今日关注" */}
            <div className="flex-shrink-0 flex flex-col justify-center font-black text-black text-[18px] leading-tight pr-3 mr-1 border-r border-[#ececec] border-dashed">
               <span className="whitespace-nowrap">今日</span>
               <span className="whitespace-nowrap">关注</span>
            </div>
            {/* News Lists */}
            <div className="flex flex-col flex-1 pl-3 space-y-2 justify-center overflow-hidden">
               <div className="flex items-center">
                  <span className="text-[10px] text-[#ea3e30] border border-[#ea3e30] rounded px-[3px] py-[0px] mr-1 flex-shrink-0 scale-90 origin-left">资讯</span>
                  <span className="text-[13px] text-gray-800 truncate font-semibold">铂金市场探究——从供需角度剖析本轮铂...</span>
               </div>
               <div className="flex items-center">
                  <span className="text-[10px] text-[#ea3e30] border border-[#ea3e30] rounded px-[3px] py-[0px] mr-1 flex-shrink-0 scale-90 origin-left">资讯</span>
                  <span className="text-[13px] text-gray-800 truncate font-semibold">中信银行：6月28日起调整个人积存金...</span>
               </div>
            </div>
         </div>

         <div className="w-[calc(100%-2rem)] mx-auto h-[1px] bg-gray-100 mb-3"></div>

         {/* Bottom: Rates Grid */}
         <div className="flex justify-between items-center px-4 w-full text-center">
            
            {/* Target 1 */}
            <div className="flex flex-col flex-1 items-center">
               <span className="text-[13px] font-medium text-gray-800 mb-0.5">黄金9999</span>
               <span className="text-[18px] font-bold text-[#eb3d30] font-sans tracking-tight leading-none mb-0.5">782.00</span>
               <div className="flex space-x-1 text-[11px] font-sans text-[#eb3d30]">
                  <span>+0.15</span><span>+0.02%</span>
               </div>
            </div>

            {/* Target 2 */}
            <div className="flex flex-col flex-1 items-center">
               <span className="text-[13px] font-medium text-gray-800 mb-0.5">伦敦金</span>
               <span className="text-[18px] font-bold text-[#eb3d30] font-sans tracking-tight leading-none mb-0.5">3392.01</span>
               <div className="flex space-x-1 text-[11px] font-sans text-[#eb3d30]">
                  <span>+3.22</span><span>+0.10%</span>
               </div>
            </div>

            {/* Target 3 */}
            <div className="flex flex-col flex-1 items-center">
               <span className="text-[13px] font-medium text-gray-800 mb-0.5">黄金T+D</span>
               <span className="text-[18px] font-bold text-[#eb3d30] font-sans tracking-tight leading-none mb-0.5">785.22</span>
               <div className="flex space-x-1 text-[11px] font-sans text-[#eb3d30]">
                  <span>+3.06</span><span>+0.39%</span>
               </div>
            </div>
         </div>

         {/* Embedded pagination */}
         <div className="flex justify-center items-center space-x-[2px] mt-4 z-10 relative">
            <div className="w-4 h-[4px] bg-gray-400 rounded-full"></div>
            <div className="w-1.5 h-[4px] bg-gray-200 rounded-full"></div>
         </div>
      </div>

      {/* 4. Promotional Coupons Row */}
      <div className="mx-4 grid grid-cols-2 gap-[10px] mb-3 z-10 relative">
         
         {/* Promo Card Left */}
         <div className="bg-white rounded-xl p-[14px] flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.015)] border border-white">
            <div className="text-[15px] font-bold text-gray-800 tracking-tight leading-snug break-words pr-4">
               领手续费<span className="text-[#ea6c31]">8.5</span>折券
            </div>
            <div className="text-[12px] text-gray-400 font-medium mt-1">
               体验黄金ETF
            </div>
            <div className="flex items-center justify-between mt-3">
               <div className="flex items-center text-[12px] text-black font-semibold">
                  去体验
                  <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
               </div>
               {/* Jagged Seal Graphic Emoji/CSS mock */}
               <div className="w-10 h-10 bg-gradient-to-br from-[#ffdcbe] to-[#ffcba5] rounded-[5px] flex items-center justify-center transform rotate-[15deg] mt-[-10px] mr-[-4px] drop-shadow-sm opacity-90" style={{clipPath: "polygon(50% 0%, 61% 10%, 75% 6%, 83% 18%, 97% 20%, 97% 35%, 100% 50%, 93% 62%, 97% 76%, 85% 85%, 75% 95%, 60% 90%, 50% 100%, 38% 89%, 23% 96%, 14% 82%, 2% 76%, 6% 62%, 0% 50%, 8% 38%, 3% 24%, 17% 17%, 21% 5%, 35% 9%)"}}>
                  <span className="text-[#e27d35] font-black text-[20px]">%</span>
               </div>
            </div>
         </div>

         {/* Promo Card Right */}
         <div className="bg-white rounded-xl p-[14px] flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.015)] border border-white">
            <div className="text-[15px] font-bold text-gray-800 tracking-tight leading-snug break-words">
               99元<span className="text-[#ea6c31]">工费减免券</span>
            </div>
            <div className="text-[12px] text-gray-400 font-medium mt-1">
               攒钱即兑
            </div>
            <div className="flex items-center justify-between mt-3">
               <div className="flex items-center text-[12px] text-black font-semibold">
                  去兑换
                  <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
               </div>
               {/* Stacked Cards Mock */}
               <div className="w-9 h-[28px] relative mt-[-6px] mr-0 drop-shadow-sm opacity-90">
                  <div className="absolute top-0 right-0 w-[20px] h-[30px] bg-gradient-to-tr from-[#fcd971] to-[#fee18c] rounded-[2px] transform rotate-[15deg] shadow-sm"></div>
                  <div className="absolute top-1 left-1 w-[20px] h-[30px] bg-gradient-to-tr from-[#fad258] to-[#fdde7c] rounded-[2px] transform -rotate-[5deg] shadow-md border border-[#fdd866]/50">
                      {/* Fake chip on card */}
                      <div className="absolute top-2 left-1 w-[6px] h-[4px] bg-[#dfab22] rounded-[1px] opacity-70"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 5. Accumulation Gold Core Block (积存金) */}
      <div className="mx-4 bg-white rounded-xl mb-4 z-10 relative overflow-hidden flex flex-col pt-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
         
         <div className="px-4 flex items-baseline space-x-2 mb-2">
            <span className="text-[16px] font-black text-black tracking-tight">积存金</span>
            <span className="text-[12px] text-gray-400 font-medium tracking-tight">实时金价(元/克)</span>
         </div>

         {/* Inter-card container */}
         <div className="mx-4 gold-product-card rounded-xl p-[14px] flex flex-col justify-between mb-4 border border-[#f8ede6] shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)] relative overflow-hidden">
            {/* Background pattern mask mock */}
            <div className="absolute -right-8 -top-8 w-32 h-32 border-[1px] border-[#eed7c4]/40 rounded-full"></div>
            <div className="absolute -right-12 -top-12 w-40 h-40 border-[1px] border-[#eed7c4]/40 rounded-full"></div>
            <div className="absolute -right-4 -top-4 w-20 h-20 border-[1px] border-[#eed7c4]/40 rounded-full"></div>

            <div className="flex items-center space-x-1.5 relative z-10">
               {/* Minsheng Bank Logo Mock */}
               <div className="w-[18px] h-[18px] rounded-sm flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-[18px] h-[18px]">
                     <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#2b6bba" strokeWidth="12" strokeLinecap="round" />
                     <path d="M10,70 Q30,30 50,70 T90,70" fill="none" stroke="#2ca8df" strokeWidth="12" strokeLinecap="round" />
                  </svg>
               </div>
               <span className="text-[14px] text-black font-semibold tracking-tight">民生积存金</span>
            </div>

            <div className="flex items-end justify-between mt-3 relative z-10 w-full pr-[80px]">
               <div className="flex items-baseline space-x-2">
                  <span className="text-[20px] font-bold font-sans text-[#05a068] tracking-tight leading-none">784.83</span>
                  <div className="flex space-x-1 text-[12px] font-sans text-[#05a068]">
                     <span>-0.12</span><span>-0.02%</span>
                  </div>
               </div>
            </div>

            {/* Absolute CTA button to allow the price to take space without pushing */}
            <div className="absolute right-[14px] top-[26px] bg-gradient-to-r from-[#eb9965] to-[#e48348] text-white text-[13px] font-bold rounded-full px-5 py-[6px] shadow-[0_2px_6px_rgba(235,153,100,0.3)] z-50">
               去买入
            </div>

         </div>

         <div className="w-full flex justify-center items-center py-[10px] pb-3 border-t border-gray-100 text-[12px] text-gray-500 cursor-pointer text-center group">
            <span className="mr-0.5">查看更多</span>
            <svg className="w-3.5 h-3.5 mt-0.5 group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
         </div>

      </div>

      {/* 6. Physical Gold (实物黄金) */}
      <div className="mx-4 bg-white rounded-xl mb-4 z-10 relative pt-4 pb-4">
         
         <div className="px-4 flex justify-between items-end mb-3">
            <div className="flex items-baseline space-x-2">
               <span className="text-[16px] font-black text-black tracking-tight leading-none">实物黄金</span>
               <span className="text-[12px] text-gray-400 tracking-tight leading-none">真金避险 积存金直兑</span>
            </div>
            <div className="flex items-center text-[12px] text-gray-400 cursor-pointer mb-[-1px]">
               <span>更多</span>
               <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
               </svg>
            </div>
         </div>

         {/* Filter Tabs */}
         <div className="w-full px-4 flex space-x-[10px] overflow-hidden mb-4">
            <div className="bg-[#fce9dd] text-[#df793c] text-[13px] font-bold rounded-[6px] px-5 py-1 text-center whitespace-nowrap">推荐</div>
            <div className="bg-[#f5f6f8] text-gray-600 text-[13px] rounded-[6px] px-5 py-1 text-center whitespace-nowrap">金饰</div>
            <div className="bg-[#f5f6f8] text-gray-600 text-[13px] rounded-[6px] px-5 py-1 text-center whitespace-nowrap">古法金</div>
            <div className="bg-[#f5f6f8] text-gray-600 text-[13px] rounded-[6px] px-5 py-1 text-center whitespace-nowrap">1克金</div>
         </div>

         {/* Product Item Row */}
         <div className="w-full px-4 flex items-start space-x-3">
             {/* Thumbnail mockup */}
             <div className="w-[100px] h-[75px] bg-[#a81418] rounded-md flex items-center justify-center relative overflow-hidden flex-shrink-0">
                 {/* Decorative mock background */}
                 <div className="absolute top-0 right-0 w-[50px] h-full border-l-[30px] border-[#7d0f11] rotate-12 origin-top"></div>
                 <div className="absolute top-0 right-[-10px] w-[30px] h-full border-l-[20px] border-[#590a0c] rotate-12 origin-top"></div>
                 {/* Gold bar mock */}
                 <div className="w-[20px] h-[34px] bg-gradient-to-tr from-[#ebad4f] to-[#f9d682] rounded-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-10 border-[0.5px] border-[#8a5d1b]/40">
                     {/* Dragon pattern engraving mock */}
                     <div className="w-full h-full flex flex-col justify-center items-center opacity-80">
                         <div className="w-[12px] h-[6px] border-[1px] border-[#ca8922] rounded-[2px] transform rotate-45 mb-[1px]"></div>
                         <div className="w-[8px] h-[4px] bg-[#ca8922] rounded-[1px] transform -rotate-45"></div>
                     </div>
                 </div>
             </div>
             {/* Info */}
             <div className="flex flex-col flex-1 h-[75px] justify-between py-1">
                 <span className="text-[14px] text-black font-semibold tracking-tight leading-snug line-clamp-2">浙商银行 财富金3号 富贵灵蛇10克...</span>
                 <div className="flex flex-wrap gap-1">
                     <span className="text-[10px] text-[#df793c] border border-[#f0d6c8] px-[4px] rounded-[2px] scale-95 transform origin-left whitespace-nowrap bg-[#faf3ef]">新品</span>
                     <span className="text-[10px] text-[#df793c] border border-[#f0d6c8] px-[4px] rounded-[2px] scale-95 transform origin-left whitespace-nowrap">包邮</span>
                     <span className="text-[10px] text-[#df793c] border border-[#f0d6c8] px-[4px] rounded-[2px] scale-95 transform origin-left whitespace-nowrap">运费险</span>
                 </div>
             </div>
         </div>
      </div>

      {/* 8. Global Bottom App Navigation (Gold Section) */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#fcfcfc] border-t border-[#f0f0f0] flex items-center justify-around z-50 pt-[4px] pb-3 px-2">
         
         {/* Home Tab (Active) */}
         <div className="flex flex-col items-center">
            {/* The specific geometric Home icon */}
            <div className="w-6 h-6 flex flex-col items-center justify-end relative pb-0.5">
               <div className="w-[8px] h-[6px] bg-black rounded-t-[2px]"></div>
               <div className="w-[18px] h-[8px] bg-black rounded-b-[2px] rounded-t-[1px]"></div>
               <div className="flex space-x-[2px] mt-[1px]">
                   <div className="w-[8px] h-[4px] bg-black rounded-sm"></div>
                   <div className="w-[8px] h-[4px] bg-black rounded-sm"></div>
               </div>
            </div>
            <span className="text-[11px] font-bold text-black mt-1">首页</span>
         </div>

         {/* Accumulation Gold (积存金) */}
         <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <div className="w-6 h-6 flex flex-col items-center justify-end pb-0.5 relative">
               <div className="w-[16px] h-1.5 border-2 border-current rounded-sm"></div>
               <div className="w-[18px] h-[2px] bg-current mt-[1px]"></div>
               <div className="w-[14px] flex justify-between px-1 mt-[1px]">
                  <div className="w-[2px] h-[6px] bg-current"></div>
                  <div className="w-[2px] h-[6px] bg-current"></div>
               </div>
               <div className="w-[20px] h-1.5 border-2 border-current rounded-sm mt-[1px]"></div>
            </div>
            <span className="text-[11px] font-medium mt-1">积存金</span>
         </div>

         {/* Gold Circle/Community (金友圈) */}
         <div className="flex flex-col items-center text-gray-500 relative cursor-pointer">
            <div className="w-6 h-6 relative flex items-center justify-center mt-[-2px]">
               <svg className="w-5 h-5 absolute bottom-1 left-0 z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
               <svg className="w-5 h-5 absolute top-1 right-[-4px] bg-[#fcfcfc] rounded-full z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
            </div>
            {/* Hovering Red Badge "看牛人" */}
            <div className="absolute -top-[5px] -right-[16px] bg-[#ea3d33] text-white text-[9px] font-bold rounded-t-[6px] rounded-br-[6px] rounded-bl-[2px] px-[3px] py-[1px] transform scale-90 border-[1px] border-white z-20 whitespace-nowrap shadow-sm">
               看牛人
            </div>
            <span className="text-[11px] font-medium mt-1">金友圈</span>
         </div>

         {/* Holdings (持仓) */}
         <div className="flex flex-col items-center text-gray-500 cursor-pointer">
            <svg className="w-[24px] h-[24px] mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-medium mt-[3px]">持仓</span>
         </div>
      </div>


      {/* ----------------- FULL SCREEN ONBOARDING OVERLAY ----------------- */}
      
      {/* 1. The SVG Mask Layer (Punches a hole over the home tab) */}
      <svg width="100%" height="100%" className="fixed inset-0 z-[60] pointer-events-none">
         <defs>
            <mask id="guideMask">
               {/* Filled white region defines what to keep (the dark overlay) */}
               <rect width="100%" height="100%" fill="white" />
               {/* Black region defines what to punch out (the light hole) */}
               {/* The first bottom nav item "首页" is roughly at X: 12.5%, Y: bottom 30px */}
               {/* Standard phone width ~375, home icon center ~48px from left */}
               <circle cx="12.5%" cy="calc(100% - 28px)" r="32" fill="black" />
            </mask>
         </defs>
         <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#guideMask)" className="pointer-events-auto" />
      </svg>

      {/* 2. Top Right "Skip" Button */}
      <div className="fixed top-[52px] right-3 z-[70] border border-white/60 rounded-full px-4 py-1.5 flex items-center justify-center cursor-pointer active:bg-white/10 backdrop-blur-sm">
         <span className="text-[13px] text-white opacity-90 tracking-wide font-medium">跳过</span>
      </div>

      {/* 3. The Highlighted Home Tab (Replicated identically, but bright over the mask) */}
      <div className="fixed bottom-2 left-[12.5%] transform -translate-x-[50%] z-[70] w-[60px] h-[60px] rounded-full bg-white flex flex-col items-center justify-center pb-1">
         {/* The specific geometric Home icon */}
         <div className="w-6 h-6 flex flex-col items-center justify-end relative pb-0.5">
            <div className="w-[8px] h-[6px] bg-black rounded-t-[2px]"></div>
            <div className="w-[18px] h-[8px] bg-black rounded-b-[2px] rounded-t-[1px]"></div>
            <div className="flex space-x-[2px] mt-[1px]">
               <div className="w-[8px] h-[4px] bg-black rounded-sm"></div>
               <div className="w-[8px] h-[4px] bg-black rounded-sm"></div>
            </div>
         </div>
         <span className="text-[11px] font-bold text-black mt-0.5">首页</span>
      </div>

      {/* 4. Guide Tooltip & Pointing Line */}
      <div className="fixed z-[70] bottom-[90px] left-6">
         
         {/* Pointing Vertical Line to the hole */}
         <svg className="absolute -bottom-[36px] left-[32px] w-[2px] h-[40px] overflow-visible">
            {/* Soft white line */}
            <line x1="1" y1="0" x2="1" y2="40" stroke="white" strokeWidth="1" strokeOpacity="0.8"/>
            {/* Top Dot */}
            <circle cx="1" cy="0" r="2.5" fill="white" />
         </svg>

         {/* Tooltip Title & Stars */}
         <div className="relative mb-[14px]">
            {/* Left Top Sparkle */}
            <svg className="absolute -top-[16px] -left-[14px] w-6 h-6 text-[#fbe1a1] overflow-visible drop-shadow-[0_0_4px_rgba(251,225,161,0.8)]" viewBox="0 0 24 24" fill="currentColor">
               <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
            </svg>
            {/* Right Top Small Sparkle */}
            <svg className="absolute top-[2px] right-[-14px] w-4 h-4 text-[#e0cfab] overflow-visible drop-shadow-[0_0_2px_rgba(251,225,161,0.5)]" viewBox="0 0 24 24" fill="currentColor">
               <polygon points="12,2 13.5,10.5 22,12 13.5,13.5 12,22 10.5,13.5 2,12 10.5,10.5" />
            </svg>

            <span className="text-[23px] text-white font-bold tracking-widest drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] inline-block pb-1 whitespace-nowrap">
               黄金全部功能入口都在这
            </span>
         </div>

         {/* "下一步" Action Button */}
         <div className="w-[100px] border border-white/60 bg-[#2b2520]/80 rounded-full flex justify-center items-center py-2 relative backdrop-blur-sm shadow-lg active:scale-95 cursor-pointer text-center group">
             <span className="text-[13px] text-white font-medium tracking-tight group-hover:opacity-90 transition-opacity">下一步(1/4)</span>
             {/* Small active red-orange bottom highlight mock */}
             <div className="absolute -bottom-[1px] w-[24px] h-[2px] bg-[#d35338] shadow-[0_0_4px_#d35338]"></div>
         </div>
      </div>

    </div>
  );
}
