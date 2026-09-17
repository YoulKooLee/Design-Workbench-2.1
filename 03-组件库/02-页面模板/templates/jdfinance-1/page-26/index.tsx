/**
 * @name 家庭应急金 - 保自己 (Family Emergency Fund - Self Allocation)
 */
import React from 'react';
import './style.css';

export default function JDFamilyEmergencySelf() {
  return (
    <div className="w-full min-h-screen bg-[#f8f8fb] flex flex-col font-sans select-none overflow-x-hidden relative pb-[160px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full h-[52px] bg-[#f8f8fb] flex items-center justify-between sticky top-0 z-50 px-4 pt-1">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="flex items-center">
            <span className="text-[17px] font-bold text-black tracking-wide">家庭应急金</span>
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
         GLOBAL TABS SUB-NAVIGATION
        ========================================================================
      */}
      <div className="w-full flex space-x-6 px-4 pt-3 pb-4 bg-[#f8f8fb] sticky top-[52px] z-40 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0 relative top-hx">
              <span className="text-[18px] font-bold text-black tracking-widest">保自己</span>
              <div className="w-5 h-[3px] bg-[#f94e4e] rounded-full mt-1.5 absolute bottom-[-5px]"></div>
          </div>
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0 pt-0.5">
              <span className="text-[16px] font-medium text-gray-500 tracking-widest">保父母</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0 pt-0.5">
              <span className="text-[16px] font-medium text-gray-500 tracking-widest">保子女</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0 pt-0.5">
              <span className="text-[16px] font-medium text-gray-500 tracking-widest">医疗险</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer flex-shrink-0 pt-0.5">
              <span className="text-[16px] font-medium text-gray-500 tracking-widest">重疾险</span>
          </div>
      </div>

      {/* 
        ========================================================================
         SECTION 1: 推荐 (Recommendations)
        ========================================================================
      */}
      <div className="flex items-center px-4 mt-2 mb-2">
          {/* Shield check inline SVG */}
          <svg className="w-[18px] h-[18px] text-[#fc4a4f]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.65 2 6.32 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zm-2.293 8.763a1 1 0 011.414 0L10 11.586l2.879-2.879a1 1 0 111.414 1.414l-3.586 3.586a1 1 0 01-1.414 0L6.293 12.12a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-[17px] font-bold text-black ml-1.5 tracking-wide">推荐</span>
      </div>

      <div className="px-4 text-[12px] text-[#999] leading-snug mb-4 tracking-wide text-justify pr-6">
          30天-65周岁内可投保，200万报销社保不报的住院费及特药费
      </div>

      <div className="mx-4 bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.015)] mb-6 flex flex-col pt-1 pb-1">
          {/* Item 1 - Doctor */}
          <div className="flex px-4 py-4 relative group cursor-pointer active:bg-gray-50/50 transition">
              
              {/* Photo Mock with Corner Tag */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-doc flex items-end justify-center relative flex-shrink-0">
                  <div className="absolute top-0 left-0 bg-[#f65a58] text-white text-[9px] font-medium px-[5px] py-[1.5px] rounded-br-[6px] rounded-tl-lg z-10 scale-[0.9] origin-top-left tracking-widest shadow-sm">
                      健告宽松
                  </div>
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/5 to-transparent bottom-0"></div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4 mt-0.5">200万保额·惠民保普惠医...</span>
                  <span className="text-[12px] text-[#999] tracking-wide">报销范围：社保内住院费及特药费</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">5.50</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">65周岁内</div>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         SECTION 2: 优先配置医疗险 (Priority Allocation)
        ========================================================================
      */}
      <div className="flex items-center px-4 mt-6 mb-2">
          <svg className="w-[18px] h-[18px] text-[#fc4a4f]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.65 2 6.32 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zm-2.293 8.763a1 1 0 011.414 0L10 11.586l2.879-2.879a1 1 0 111.414 1.414l-3.586 3.586a1 1 0 01-1.414 0L6.293 12.12a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-[17px] font-bold text-black ml-1.5 tracking-wide">优先配置医疗险</span>
      </div>

      <div className="px-4 text-[12px] text-[#999] leading-[1.4] mb-4 tracking-wide text-justify pr-6">
          投保门槛低，带病体均可购买，社保的黄金搭档，报销社保不报的医疗费
      </div>

      <div className="mx-4 bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col pt-1 pb-1">
          
          {/* Item 1 */}
          <div className="flex px-4 py-4 border-b border-gray-50 relative group cursor-pointer active:bg-gray-50/50 transition">
              <div className="w-[74px] h-[74px] rounded-lg mr-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-1 flex items-end justify-center relative flex-shrink-0">
                  <div className="absolute top-0 left-0 bg-[#e66c5a] text-white text-[9px] font-medium px-[5px] py-[1.5px] rounded-br-[6px] rounded-tl-lg z-10 scale-[0.9] origin-top-left tracking-widest shadow-sm">
                      带病可投
                  </div>
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4 mt-0.5">400万保额·惠民保升级版</span>
                  <span className="text-[12px] text-[#999] tracking-wide">报销范围：社保内外住院及药品费</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">22.50</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">赠CAR-T抗癌针</div>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>

          {/* Item 2 */}
          <div className="flex px-4 py-4 border-b border-gray-50 relative group cursor-pointer active:bg-gray-50/50 transition">
              <div className="w-[74px] h-[74px] rounded-lg mr-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-2 flex items-end justify-center relative flex-shrink-0 overflow-hidden">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4 mt-0.5">200万保额·防癌医疗险</span>
                  <span className="text-[12px] text-[#999] tracking-wide">不限社保用药，责任内100%赔</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">7.00</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">80周岁内</div>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>

          {/* Item 3 (Cut off in view but fully formed) */}
          <div className="flex px-4 py-4 border-none relative group cursor-pointer active:bg-gray-50/50 transition">
              <div className="w-[74px] h-[74px] rounded-lg mr-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-3 flex items-end justify-center relative flex-shrink-0 overflow-hidden">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4 mt-0.5">600万保额·住院医疗（三...）</span>
                  <span className="text-[12px] text-[#999] tracking-wide">报销范围：社保内外均可赔</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">16.00</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         FLOATING ACTION BAR (CTA)
        ========================================================================
      */}
      <div className="fixed bottom-[54px] w-full action-bar-gradient pb-[18px] pt-6 px-4 flex items-center z-40 rounded-t-[20px]">
          {/* Share Action */}
          <div className="flex flex-col items-center pl-3 pr-5 cursor-pointer active:opacity-60 transition group">
              <svg className="w-[20px] h-[20px] text-gray-800 mb-[3px] group-hover:-translate-y-[2px] transition transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-[10px] text-gray-600 font-medium tracking-wide">分享家人</span>
          </div>

          {/* Primary Button */}
          <div className="flex-1 h-[48px] bg-[#fb4a4f] rounded-full text-white font-bold text-[17px] tracking-wide flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(250,50,50,0.35)] active:scale-95 transition-transform mr-1">
              0元先体验一次
          </div>
      </div>

      {/* 
        ========================================================================
         GLOBAL BOTTOM TAB BAR 
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full h-[54px] bg-[#fbfbfb] border-t border-gray-100 flex items-center justify-around px-2 z-50">
          
          {/* Active Tab */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-100 transform active:scale-95 transition pb-1">
             <div className="w-[22px] h-[22px] bg-black text-white rounded-b-full rounded-t-[4px] relative flex items-center justify-center mb-1">
                 <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
             </div>
             <span className="text-[10px] text-black font-bold tracking-wide">应急金</span>
          </div>

          {/* Inactive Tab 2 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1">
             <svg className="w-[24px] h-[24px] text-black mb-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <circle cx="12" cy="12" r="9" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9h9" />
             </svg>
             <span className="text-[10px] text-black tracking-wide">缺口分析</span>
          </div>

          {/* Inactive Tab 3 */}
          <div className="flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition pb-1 relative left-2">
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
