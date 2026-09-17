/**
 * @name 家庭应急金 (Family Emergency Fund)
 */
import React from 'react';
import './style.css';

export default function JDFamilyEmergency() {
  return (
    <div className="w-full min-h-screen bg-[#f8f8fa] flex flex-col font-sans select-none overflow-x-hidden relative pb-[160px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full h-[52px] bg-white flex items-center justify-between sticky top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] px-4">
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
         LIST MODULE 1: COMPREHENSIVE INSURANCE OPTIONS
        ========================================================================
      */}
      <div className="mx-4 mt-3 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col">
          
          {/* Item 1 */}
          <div className="flex px-4 py-5 border-b border-gray-50 relative group cursor-pointer active:bg-gray-50/50 transition">
              {/* Photo Mock */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-1 flex items-end justify-center relative flex-shrink-0">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4">600万保额·门诊特药医疗险</span>
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
          <div className="flex px-4 py-5 border-b border-gray-50 relative group cursor-pointer active:bg-gray-50/50 transition">
              {/* Photo Mock */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-2 flex items-end justify-center relative flex-shrink-0">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4">200万保额·防癌医疗险</span>
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

          {/* Item 3 */}
          <div className="flex px-4 py-5 border-b border-gray-50 relative group cursor-pointer active:bg-gray-50/50 transition">
              {/* Photo Mock */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-3 flex items-end justify-center relative flex-shrink-0">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4">600万保额·住院医疗（三...）</span>
                  <span className="text-[12px] text-[#999] tracking-wide">报销范围：社保内外均可赔</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">16.00</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">带病可投</div>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>

          {/* Item 4 */}
          <div className="flex px-4 py-5 border-none relative group cursor-pointer active:bg-gray-50/50 transition">
              {/* Photo Mock */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-4 flex items-end justify-center relative flex-shrink-0">
                  <svg className="absolute w-[100%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4">800万保额·蓝医保长期医疗</span>
                  <span className="text-[12px] text-[#999] tracking-wide">报销范围：医保内外医疗费</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">16.29</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/月起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">20年保证续保</div>
                       <svg className="absolute right-0 bottom-[1px] text-gray-300 w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                       </svg>
                  </div>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         SECTION 2 Header + Card
        ========================================================================
      */}
      <div className="flex items-center px-4 mt-8 mb-2">
          {/* Shield check inline SVG */}
          <svg className="w-[18px] h-[18px] text-[#fc4a4f]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.65 2 6.32 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zm-2.293 8.763a1 1 0 011.414 0L10 11.586l2.879-2.879a1 1 0 111.414 1.414l-3.586 3.586a1 1 0 01-1.414 0L6.293 12.12a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-[17px] font-bold text-black ml-1.5 tracking-wide">第二配置重疾险</span>
      </div>

      <div className="px-4 text-[12px] text-[#999] leading-snug mb-4 tracking-wide text-justify pr-6">
          花小钱避免大病带来的经济危机，也是对家庭的稳固守护，33万一次性赔付，不需发票
      </div>

      {/* List Module 2 */}
      <div className="mx-4 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.015)] mb-6">
          <div className="flex px-4 py-5 group cursor-pointer active:bg-gray-50/50 transition rounded-xl relative">
              
              {/* Photo Mock */}
              <div className="w-[74px] h-[74px] rounded-lg mr-3 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] mock-photo-5 flex items-end justify-center relative flex-shrink-0">
                  <svg className="absolute w-[80%] h-[80%] opacity-20 bottom-[-10%]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute w-full h-[30%] bg-gradient-to-t from-black/10 to-transparent bottom-0"></div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                  <span className="text-[15px] font-bold text-[#111] tracking-wide mb-1 leading-tight line-clamp-1 pr-4">确诊即赔的重疾险</span>
                  <span className="text-[12px] text-[#999] tracking-wide">覆盖100种大病，一次性赔1000元</span>
                  <div className="mt-auto flex items-end relative overflow-visible pt-2">
                       <span className="text-[12px] text-[#fb4a4f] font-bold mb-[1px] mr-[1px] leading-none">¥</span>
                       <span className="text-[20px] text-[#fb4a4f] font-bold leading-none tracking-tight">0.99</span>
                       <span className="text-[11px] text-[#fb4a4f] mb-[1px] font-bold leading-none mr-1.5">/年起</span>
                       <div className="bg-[#fbe8dc] text-[#cc6740] px-1 py-[1.5px] rounded-[2px] text-[10px] transform scale-[0.85] origin-left flex-shrink-0 font-medium mb-px shadow-sm">买多少赔多少</div>
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
                 {/* Internal star/cross cut-out mock */}
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
