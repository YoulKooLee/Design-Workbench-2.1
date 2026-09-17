/**
 * @name 京东保 - 首页大盘 (JD Insurance Main Dashboard)
 */
import React from 'react';
import './style.css';

export default function JDInsuranceDashboard() {
  return (
    <div className="w-full min-h-screen bg-[#f4f5f9] home-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[120px]">
      
      {/* 
        ========================================================================
         GLOBAL HEADER & BRANDING
        ========================================================================
      */}
      <div className="w-full pt-[52px] pb-[8px] px-4 flex items-end justify-between sticky top-0 z-50 bg-[#ffeaeb]/90 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
         <div className="flex items-center cursor-pointer mb-0.5">
            <svg className="w-[24px] h-[24px] text-black mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[22px] font-bold tracking-widest text-[#111] leading-none drop-shadow-sm flex items-end">
                京东保
                <span className="text-[11px] font-normal text-gray-500 tracking-[0.1em] ml-2 mb-[2px]">简单·快捷·安全</span>
            </span>
         </div>

         {/* Floating Smart AI Assistant Head Top-Right */}
         <div className="absolute right-4 bottom-[-10px] w-[42px] h-[42px] bg-[#f8f9fb] rounded-full flex flex-col items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex-shrink-0 relative overflow-hidden border-2 border-white/80 cursor-pointer hover:scale-105 transition-transform z-10">
              {/* Mock metal reflection */}
              <div className="absolute top-0 right-0 w-[18px] h-[18px] bg-white opacity-60 rounded-bl-full"></div>
              
              <div className="w-[20px] h-[14px] bg-[#222] rounded-[4px] relative flex justify-around items-center px-[2px] shadow-sm mt-1 z-10">
                   <div className="w-[4px] h-[4px] bg-[#ffd54f] rounded-full animate-pulse blur-[0.2px]"></div>
                   <div className="w-[4px] h-[4px] bg-[#ffd54f] rounded-full animate-pulse blur-[0.2px] delay-100"></div>
              </div>
              <div className="absolute top-[3px] left-1/2 transform -translate-x-1/2 flex space-x-[4px] z-10">
                  <div className="w-[2.5px] h-[4px] bg-[#aaa] rounded-full transform -rotate-45"></div>
                  <div className="w-[2.5px] h-[4px] bg-[#aaa] rounded-full transform rotate-45"></div>
              </div>
         </div>
      </div>

      {/* 
        ========================================================================
         SEARCH BAR
        ========================================================================
      */}
      <div className="px-4 mt-3 z-10 relative">
          <div className="w-full bg-white rounded-full h-[40px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center px-4">
              <svg className="w-[18px] h-[18px] text-gray-400 mr-[6px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="flex-1 text-[15px] text-gray-600 tracking-wide font-medium mr-2">惠民保</div>
              
              <div className="bg-[#feeeec] text-[#fa3f3b] text-[14px] font-bold px-4 py-[5px] rounded-full tracking-widest cursor-pointer active:scale-95 transition-transform shadow-sm ml-auto shrink-0">
                  搜索
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         MY FAMILY POLICIES HERO CARD
        ========================================================================
      */}
      <div className="mx-4 mt-5 rounded-xl shadow-[0_4px_15px_rgba(250,50,50,0.1)] flex flex-col relative z-10">
          
          {/* Top Colored Header */}
          <div className="w-full bg-gradient-to-r from-[#fc584f] to-[#ec2d33] rounded-t-xl px-4 py-2.5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                  <span className="text-[15px] font-bold text-white tracking-widest mr-1">我家保单</span>
                  <div className="w-[12px] h-[12px] bg-white/20 rounded-full text-white flex items-center justify-center font-serif text-[9px] font-bold shrink-0 mt-px">i</div>
              </div>
              <div className="flex items-center text-white/90">
                  <span className="text-[13px] tracking-wide font-medium">5份保障中</span>
                  <svg className="w-[12px] h-[12px] ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Bottom White Split Content */}
          <div className="w-full bg-white rounded-b-xl flex py-[18px] cursor-pointer">
              {/* Left Side */}
              <div className="flex-1 flex flex-col pl-6">
                  <span className="text-[16px] text-[#111] font-bold tracking-wide mb-1 transition group-hover:text-red-500">大病应急金</span>
                  <span className="text-[12px] text-gray-500 tracking-wider">随用随取不借钱</span>
              </div>
              
              <div className="w-[1px] h-[34px] bg-gray-100 mt-1"></div>

              {/* Right Side */}
              <div className="flex-1 flex flex-col pl-6">
                  <span className="text-[16px] text-[#111] font-bold tracking-wide mb-1">储蓄金3%</span>
                  <span className="text-[12px] text-gray-500 tracking-wider">保收益写入合同</span>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         SERVICE TOOLS GRID (5 Icons)
        ========================================================================
      */}
      <div className="mx-4 mt-4 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] pt-[18px] pb-3 flex flex-col cursor-pointer relative z-10">
          <div className="w-full flex items-start justify-around px-2">
              
              {/* Tool 1 */}
              <div className="flex flex-col items-center relative group">
                  <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-[#fc4a4f] text-white text-[9px] px-1.5 py-[1px] rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm whitespace-nowrap shadow-sm z-10 animate-bounce cursor-pointer scale-90 origin-bottom">
                      12期免息
                  </div>
                  <svg className="w-[34px] h-[34px] text-[#4d8df5] mb-2 relative z-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4h11l1.5 4H5z"/>
                  </svg>
                  <span className="text-[12px] text-[#333] tracking-widest font-medium">车险</span>
              </div>

              {/* Tool 2 */}
              <div className="flex flex-col items-center group">
                  <div className="w-[34px] h-[34px] mb-2 bg-[#fc6a6b] rounded-t-lg rounded-b-md flex justify-center items-center shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 w-0 h-0 border-l-[17px] border-r-[17px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#f64c4c]"></div>
                      <span className="text-white text-[12px] font-bold tracking-widest relative z-10 mt-1">带病</span>
                  </div>
                  <span className="text-[12px] text-[#333] tracking-widest font-medium">医疗</span>
              </div>

              {/* Tool 3 */}
              <div className="flex flex-col items-center group">
                  <div className="w-[34px] h-[34px] mb-2 bg-[#fdb252] rounded-full flex justify-center items-center shadow-sm text-white font-black text-[13px] tracking-tighter">
                      3%
                  </div>
                  <span className="text-[12px] text-[#333] tracking-widest font-medium">储蓄险</span>
              </div>

              {/* Tool 4 */}
              <div className="flex flex-col items-center group">
                  <div className="w-[34px] h-[34px] mb-2 bg-[#fc4a4f] rounded-lg shadow-sm flex items-center justify-center transform rotate-6 border border-red-400">
                      <div className="w-[4px] h-[14px] bg-white rounded-full"></div>
                      <div className="w-[4px] h-[4px] bg-white rounded-full absolute bottom-[6px]"></div>
                  </div>
                  <span className="text-[12px] text-[#333] tracking-widest font-medium">意外</span>
              </div>

              {/* Tool 5 */}
              <div className="flex flex-col items-center group">
                  <div className="w-[34px] h-[34px] mb-2 bg-[#fcb252] rounded-t-lg rounded-b-sm flex justify-center items-center shadow-sm relative overflow-hidden">
                      <svg className="w-[20px] h-[20px] text-white mt-1" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                      </svg>
                  </div>
                  <span className="text-[12px] text-[#333] tracking-widest font-medium">车主俱乐部</span>
              </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex w-full justify-center space-x-[4px] mt-[10px]">
              <div className="w-[10px] h-[3px] bg-gray-400 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         MASSIVE PROMOTIONAL BANNER
        ========================================================================
      */}
      <div className="mx-4 mt-4 h-[110px] rounded-xl bg-gradient-to-b from-[#fa3e3b] to-[#fdb924] burst-lines relative flex items-center justify-center overflow-hidden shadow-[0_6px_20px_rgba(250,50,0,0.2)] cursor-pointer active:scale-95 transition-transform group z-10">
          
          <span className="absolute top-2 text-white/90 text-[11px] font-medium tracking-widest drop-shadow-sm">车主限时福利</span>

          {/* Abstract light rays radiating from center */}
          <div className="absolute w-[200px] h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none group-hover:rotate-12 transition duration-1000">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                  {[...Array(12)].map((_, i) => (
                      <polygon key={i} points="50,50 48,0 52,0" fill="white" transform={`rotate(${i * 30} 50 50)`} />
                  ))}
              </svg>
          </div>

          <div className="flex items-center justify-center w-full relative z-10 px-4 mt-2">
              <span className="text-[20px] font-black text-white tracking-widest drop-shadow-md pb-[2px]">抽幸运数字</span>
              
              {/* Massive Golden Central Clasp */}
              <div className="golden-ring-wrapper w-[64px] h-[64px] flex items-center justify-center mx-2 flex-shrink-0 animate-pulse">
                  <div className="golden-ring-inner w-full h-full flex items-center justify-center text-white font-black text-[30px] font-serif tracking-tight drop-shadow-sm pb-[2px] pr-px">
                     领
                  </div>
              </div>

              <span className="text-[20px] font-black text-white tracking-widest drop-shadow-md pb-[2px]"><span className="text-[24px]">7000</span>元现金</span>
          </div>

      </div>

      {/* 
        ========================================================================
         MAIN FEATURED PRODUCT CARD CAROUSEL
        ========================================================================
      */}
      <div className="mx-4 mt-4 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col items-center pt-0 pb-3 relative z-10 border border-transparent hover:border-red-50/50 transition cursor-pointer">
          
          {/* Top Ribbton Tag */}
          <div className="ribbon-tag drop-shadow-sm">医疗险·免健告</div>

          <div className="text-[20px] font-bold text-black tracking-widest mt-5 mb-5 drop-shadow-sm">600万医疗险·免健告</div>

          {/* Flexible Attributes Container */}
          <div className="w-[90%] flex border-b border-gray-100 pb-4 mb-4">
              
              {/* Left Highlight Attrib */}
              <div className="flex-[0.45] flex flex-col justify-center border-r border-gray-50 border-dashed mr-4">
                  <span className="text-[17px] font-bold text-[#f73f3b] tracking-wider mb-2 drop-shadow-[0_1px_1px_rgba(250,50,50,0.2)]">不限健康状况</span>
                  <span className="text-[12px] text-[#aaa] font-medium tracking-wide ml-1">18-80周岁可投</span>
              </div>

              {/* Right Checklist */}
              <div className="flex-[0.6] flex flex-col justify-center space-y-2">
                  <div className="flex items-center">
                     <div className="w-[12px] h-[12px] bg-[#fb4a4f] rounded-full flex items-center justify-center mr-1.5 mt-px text-white font-black shadow-sm flex-shrink-0">
                         <svg className="w-[8px] h-[8px]" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24" fill="none">
                             <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                     </div>
                     <span className="text-[12px] text-[#111] font-medium tracking-widest drop-shadow-[0_1px_0_rgba(255,255,255,1)]">无健康告知，轻松投保</span>
                  </div>
                  <div className="flex items-center">
                     <div className="w-[12px] h-[12px] bg-[#fb4a4f] rounded-full flex items-center justify-center mr-1.5 mt-px text-white font-black shadow-sm flex-shrink-0">
                         <svg className="w-[8px] h-[8px]" stroke="currentColor" strokeWidth={3.5} viewBox="0 0 24 24" fill="none">
                             <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                     </div>
                     <span className="text-[12px] text-[#111] font-medium tracking-widest drop-shadow-[0_1px_0_rgba(255,255,255,1)]">可报销医保内外费用</span>
                  </div>
              </div>
          </div>

          <div className="w-[90%] h-[48px] bg-gradient-to-r from-[#fc5a55] to-[#ed2831] rounded-full flex justify-center items-center text-[16px] font-bold text-white tracking-widest shadow-[0_5px_12px_rgba(250,60,50,0.3)] active:scale-95 transition-transform mb-1">
              30天免费，去领取
          </div>

          {/* Dots */}
          <div className="flex w-full justify-center space-x-[4px] mt-4">
              <div className="w-[12px] h-[3px] bg-gray-700 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
              <div className="w-[4px] h-[3px] bg-gray-200 rounded-full"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         STICKY CATEGORY TABS (Above Bottom Nav)
        ========================================================================
      */}
      <div className="fixed bottom-[54px] w-full bg-[#fdfdfd] border-t border-gray-100 flex items-center overflow-x-auto scrollbar-hide px-4 pt-3 pb-2 z-40">
          <div className="flex flex-col items-center mr-6 cursor-pointer relative category-active-line shrink-0">
              <span className="text-[20px] font-bold text-[#111] tracking-widest leading-none drop-shadow-sm">成人</span>
          </div>
          <div className="flex flex-col items-center mr-6 cursor-pointer shrink-0">
              <span className="text-[16px] font-bold text-gray-500 tracking-widest leading-none">少儿</span>
          </div>
          <div className="flex flex-col items-center mr-6 cursor-pointer shrink-0">
              <span className="text-[16px] font-bold text-gray-500 tracking-widest leading-none">老人</span>
          </div>
          <div className="flex flex-col items-center mr-6 cursor-pointer shrink-0">
              <span className="text-[16px] font-bold text-gray-500 tracking-widest leading-none">0元体验</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer shrink-0">
              <span className="text-[16px] font-bold text-gray-500 tracking-widest leading-none">家财</span>
          </div>
      </div>

      {/* 
        ========================================================================
         GLOBAL BOTTOM NAV BAR
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full h-[54px] bg-[#fbfbfb] border-t border-gray-100 flex items-center justify-around px-2 z-50 pb-[2px]">
          
          {/* Active Tab: Insurance */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-100 transform active:scale-95 transition pb-1.5 relative w-12 pt-0.5">
             {/* Abstract active shield */}
             <div className="w-[20px] h-[22px] bg-black text-white rounded-b-lg rounded-t-sm relative flex items-center justify-center mb-[3px] shadow-sm">
                 <div className="absolute top-[3px] right-[4px] w-[2px] h-[4px] bg-white rounded-sm transform rotate-45"></div>
                 <div className="absolute top-[5px] left-[4px] w-[2px] h-[3px] bg-white rounded-sm transform -rotate-45"></div>
                 <div className="absolute bottom-[3px] w-[4px] h-[4px] bg-white rounded-full"></div>
             </div>
             <span className="text-[10px] text-black font-bold tracking-widest">保险</span>
          </div>

          {/* Inactive Tab: Products */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 w-12">
             <svg className="w-[24px] h-[24px] text-black mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
             </svg>
             <span className="text-[10px] text-black tracking-widest">产品</span>
          </div>

          {/* Inactive Tab: Redeem */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 w-12 relative left-1">
             <div className="relative">
                 <svg className="w-[24px] h-[24px] text-black mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                 </svg>
                 {/* Red dot badge over gift */}
                 <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
             </div>
             <span className="text-[10px] text-black tracking-widest mt-[-1px]">兑换保额</span>
          </div>

          {/* Inactive Tab: Profile */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 w-12 relative right-1">
             <svg className="w-[24px] h-[24px] text-black mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <span className="text-[10px] text-black tracking-widest">我的</span>
          </div>

      </div>

    </div>
  );
}
