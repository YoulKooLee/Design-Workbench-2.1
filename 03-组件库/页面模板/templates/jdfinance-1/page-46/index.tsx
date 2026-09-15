/**
 * @name 新客专属理财 (New User Exclusive Wealth)
 */
import React from 'react';
import './style.css';

export default function JDNewUserPromo() {
  return (
    <div className="w-full min-h-screen new-user-hero-bg flex flex-col font-sans select-none overflow-x-hidden pb-[60px]">
      
      {/* 
        ========================================================================
         NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[52px] pb-[10px] z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <span className="text-[17px] font-bold tracking-widest text-[#111]">新客专属理财</span>
          
          <div className="w-8"></div> {/* Spacer for perfect center alignment */}
      </div>

      {/* 
        ========================================================================
         CARD 1: MAIN EXCLUSIVE HIGH-YIELD OFFER
        ========================================================================
      */}
      <div className="mx-[14px] mt-1 bg-white rounded-[16px] pt-7 pb-6 relative shadow-[0_8px_20px_rgba(0,0,0,0.03)] z-20">
          
          {/* Overlapping Ribbon Flag */}
          <div className="ribbon-flag">权益1</div>

          {/* Heading */}
          <div className="w-full text-center mb-2">
             <h2 className="text-[18px] font-bold text-[#111] tracking-widest">固收理财新选择</h2>
          </div>

          {/* Spec Tags Row */}
          <div className="flex justify-center items-center space-x-1.5 mb-[6px]">
              <div className="border border-gray-200 bg-[#f9fafb] px-[4px] py-[1px] rounded-[2px] flex items-center justify-center">
                  <span className="text-[10px] text-gray-500 scale-90">低风险</span>
              </div>
              <div className="border border-gray-200 bg-[#f9fafb] px-[4px] py-[1px] rounded-[2px] flex items-center justify-center">
                  <span className="text-[10px] text-gray-500 scale-90">上限5万</span>
              </div>
              <div className="border border-gray-200 bg-[#f9fafb] px-[4px] py-[1px] rounded-[2px] flex items-center justify-center">
                  <span className="text-[10px] text-gray-500 scale-90">按约定收益率支付收益</span>
              </div>
          </div>

          {/* Huge Data Split Block (Yield & Period) */}
          <div className="grid-data-divider flex items-center mb-2">
              <div className="w-1/2 flex flex-col items-center justify-center pl-4 bg-white relative z-10 border-r border-[#f4f4f5]">
                  <div className="flex items-baseline text-[#f04a4b] font-sans font-bold">
                      <span className="text-[44px] tracking-tighter leading-none mb-1">8.18</span>
                      <span className="text-[26px] ml-[2px]">%</span>
                  </div>
                  <span className="text-[12px] text-gray-500 tracking-wider">约定到期年化收益率</span>
              </div>
              
              <div className="w-1/2 flex flex-col items-center justify-center pr-4 bg-white relative z-10">
                  <div className="flex items-baseline text-[#111] font-sans font-black">
                      <span className="text-[42px] tracking-tighter leading-none mb-1">20</span>
                      <span className="text-[20px] font-bold ml-[2px]">天</span>
                  </div>
                  <span className="text-[12px] text-gray-500 tracking-wider">产品期限</span>
              </div>
          </div>

          {/* 3 Icon Feature List */}
          <div className="flex justify-between px-[20px] mt-8 mb-[28px]">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                  <div className="icon-hex mb-2 shadow-sm shadow-red-50">
                      <span className="font-sans font-bold text-[16px] mb-px">¥</span>
                  </div>
                  <span className="text-[12px] text-gray-500 tracking-widest">1000元起购</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center">
                  <div className="icon-circle mb-2 shadow-sm shadow-red-50">
                      <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM10 14a4 4 0 100-8 4 4 0 000 8zm2.707-5.707a1 1 0 00-1.414-1.414L9 9.172 7.707 7.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <span className="text-[12px] text-gray-500 tracking-widest">锁定收益率</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                  <div className="icon-circle mb-2 shadow-sm shadow-red-50">
                      <svg className="w-[18px] h-[18px] text-[#f45b5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                  </div>
                  <span className="text-[12px] text-gray-500 tracking-widest">本金收益自动到账</span>
              </div>
          </div>

          {/* Core Call To Action */}
          <div className="w-[85%] mx-auto bg-[#f04a4b] text-white text-[18px] font-bold tracking-widest text-center py-[14px] rounded-full shadow-[0_5px_15px_rgba(240,74,75,0.3)] cursor-pointer active:scale-[0.98] transition">
              立即购买
          </div>

      </div>

      {/* 
        ========================================================================
         CARD 2: PROCESSING STEPS PROGRESS TRACK
        ========================================================================
      */}
      <div className="mx-[14px] mt-4 bg-white rounded-[12px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] z-20">
          <div className="flex flex-col mb-6">
              <span className="text-[16px] font-bold text-[#111] tracking-widest">走完3步，轻松赚收益</span>
              <span className="text-[12px] font-medium text-gray-400 mt-1 tracking-wider">如需购买需开通证券账户</span>
          </div>

          {/* Stepper Engine */}
          <div className="w-full relative h-[40px] flex items-center mb-1">
              {/* Physical Line */}
              <div className="step-progress-track"></div>

              {/* Flex Grid for Nodes */}
              <div className="w-full flex justify-between absolute z-10 px-[8px]">
                  
                  {/* Step 1 (Active) */}
                  <div className="flex flex-col items-center transform -translate-x-[50%] ml-[6%]">
                      <div className="step-node-active mb-3 shadow-[0_0_0_1.5px_white]">
                          <svg className="w-[12px] h-[12px] text-white overflow-visible" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                      </div>
                      <span className="text-[12px] font-bold text-[#111] tracking-widest whitespace-nowrap">开户申请</span>
                  </div>

                  {/* Step 2 (Inactive) */}
                  <div className="flex flex-col items-center">
                      <div className="step-node-inactive mb-3 flex items-center justify-center">
                         <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                      </div>
                      <span className="text-[12px] font-medium text-gray-400 tracking-widest whitespace-nowrap">开户审核</span>
                  </div>

                  {/* Step 3 (Inactive) */}
                  <div className="flex flex-col items-center transform translate-x-[50%] mr-[6%]">
                      <div className="step-node-inactive mb-3 flex items-center justify-center">
                         <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                      </div>
                      <span className="text-[12px] font-medium text-gray-400 tracking-widest whitespace-nowrap">购买赚收益</span>
                  </div>

              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 3: VIDEO LEARNING CENTER (POP-ART THUMBNAIL)
        ========================================================================
      */}
      <div className="mx-[14px] mt-4 mb-4 bg-white rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] z-20 flex flex-col">
          
          {/* Card Header */}
          <div className="flex items-center mb-4">
              <div className="bg-[#f04a4b] text-white text-[11px] font-bold py-[1px] px-[5px] rounded-[3px] border border-[#f04a4b] mr-2">
                  权益2
              </div>
              <span className="text-[15px] font-bold text-[#111] tracking-widest">财富小课堂</span>
          </div>

          {/* Procedurally Generated Illustration replacing video thumb */}
          <div className="css-pop-art-video cursor-pointer">
              
              {/* Background Halftone Generation */}
              <div className="pop-art-bg-texture"></div>

              {/* Graphic Elements */}
              <div className="pop-cloud"></div>
              <div className="pop-sunburst"></div>
              <div className="pop-checker-box flex items-center justify-center">
                  {/* Arrow inside checker box */}
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[15px] border-t-black transform rotate-[130deg]"></div>
              </div>

              {/* Text Layout Overlays */}
              <div className="absolute top-[50%] left-[10%] z-20 transform -translate-y-4 -rotate-6">
                  {/* Yellow Dialog Box */}
                  <div className="inline-block bg-[#facc15] text-[#111] font-black text-[12px] tracking-widest px-3 py-1 mb-2 border-2 border-black rounded-lg shadow-[2px_2px_0_rgba(0,0,0,1)]">
                      Let's go! 出发!
                      {/* Tail of dialog */}
                      <div className="absolute bottom-[-6px] left-[15px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-[#facc15] z-10"></div>
                      <div className="absolute bottom-[-10px] left-[13px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[12px] border-t-black z-0"></div>
                  </div>
                  
                  {/* Huge Block Text */}
                  <div className="font-sans font-black text-[28px] tracking-tight text-[#facc15] leading-none" 
                       style={{ textShadow: '2px 2px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111, 4px 4px 0 #111, 0 8px 0 rgba(0,0,0,0.5)' }}>
                      证券漫游记
                  </div>
              </div>

              <div className="absolute top-[25px] left-[35px] text-white">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
              </div>

              {/* Massive center play button overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[55px] h-[55px] bg-[#111]/60 backdrop-blur-sm rounded-full flex items-center justify-center z-50 border border-white/20 hover:scale-105 transition shadow-lg">
                  <svg className="w-[28px] h-[28px] text-white ml-[4px]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
              </div>

          </div>

      </div>

    </div>
  );
}
