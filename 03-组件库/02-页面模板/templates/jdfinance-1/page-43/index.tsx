/**
 * @name 数据详情大盘 (Yield & Asset Details)
 */
import React from 'react';
import './style.css';

export default function JDYieldDetails() {
  return (
    <div className="w-full min-h-screen yield-bg flex flex-col font-sans select-none overflow-x-hidden pb-[80px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[46px] pb-2 z-50">
         <div className="w-8 flex items-center cursor-pointer active:opacity-50 mt-1">
            <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         {/* No Title Text Here */}
         <div className="flex items-center space-x-[3px] py-1 px-1 cursor-pointer">
            <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
            <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
            <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
         </div>
      </div>

      {/* 
        ========================================================================
         CARD 1: TOTAL ASSET SUMMARY
        ========================================================================
      */}
      <div className="mx-3 mt-1 bg-white rounded-[12px] p-5 pb-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col relative z-20">
          <span className="text-[13px] text-gray-500 tracking-wide font-medium">总金额(元)</span>
          
          {/* Main Huge Number */}
          <div className="font-sans font-black text-[42px] text-[#111] tracking-tighter leading-none mt-2 mb-8">
              0.00
          </div>
          
          <div className="flex items-center">
              {/* Daily Yield */}
              <div className="flex items-center w-1/2">
                  <span className="text-[12px] text-gray-400 tracking-widest font-medium">最新收益</span>
                  <span className="text-[16px] font-bold text-[#059669] ml-2 font-sans">0.00</span>
              </div>
              {/* Cumalative Yield */}
              <div className="flex items-center w-1/2">
                  <span className="text-[12px] text-gray-400 tracking-widest font-medium">累计收益</span>
                  <span className="text-[16px] font-bold text-[#059669] ml-2 font-sans">0.00</span>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 2: THREE-PILLAR ASSET CATEGORIES
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-[12px] px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] grid grid-cols-3 relative z-20">
          
          {/* Col 1 */}
          <div className="flex flex-col">
              <span className="text-[14px] text-[#111] font-bold tracking-widest">灵活取用</span>
              <div className="w-[14px] h-[3px] bg-[#d97706] rounded-full opacity-60 mt-[6px] mb-[10px]"></div>
              <span className="text-[15px] text-[#111] font-medium font-sans mb-[2px]">0.00</span>
              <span className="text-[14px] text-gray-700 font-sans">0.00</span>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
              <span className="text-[14px] text-[#111] font-bold tracking-widest">稳健增值</span>
              <div className="w-[14px] h-[3px] bg-[#ea580c] rounded-full opacity-70 mt-[6px] mb-[10px]"></div>
              <span className="text-[15px] text-[#111] font-medium font-sans mb-[2px]">0.00</span>
              <span className="text-[14px] text-gray-700 font-sans">0.00</span>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col border-none">
              <span className="text-[14px] text-[#111] font-bold tracking-widest">稳中多赚</span>
              <div className="w-[14px] h-[3px] bg-[#ef4444] rounded-full opacity-80 mt-[6px] mb-[10px]"></div>
              <span className="text-[15px] text-[#111] font-medium font-sans mb-[2px]">0.00</span>
              <span className="text-[14px] text-gray-700 font-sans">0.00</span>
          </div>

      </div>

      {/* 
        ========================================================================
         CARD 3: YIELD TREND SVG CHART
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-[12px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col relative z-20">
          
          {/* Header */}
          <div className="flex justify-between items-center w-full">
              <span className="text-[16px] font-bold text-[#111] tracking-widest">收益走势</span>
              <div className="flex items-center text-gray-500 cursor-pointer">
                  <span className="text-[13px] tracking-widest mr-1">全部</span>
                  <svg className="w-[14px] h-[14px] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Core Chart Area */}
          <div className="w-full mt-[18px] relative flex flex-col">
              
              {/* Y-Axis Label and Grid Row 1 */}
              <div className="flex items-center absolute w-full top-0">
                  <span className="text-[11px] text-gray-400 font-sans w-[28px] text-right mr-2">10.00</span>
                  <div className="flex-1 h-px bg-[#f4f4f5]"></div>
              </div>

              {/* Y-Axis Label and Grid Row 2 */}
              <div className="flex items-center absolute w-full top-[35px]">
                  <span className="text-[11px] text-gray-400 font-sans w-[28px] text-right mr-2">5.25</span>
                  <div className="flex-1 h-px bg-[#f4f4f5]"></div>
              </div>

              {/* Y-Axis Label and Grid Row 3 (Contains the static line Data marker) */}
              <div className="flex items-center absolute w-full top-[70px]">
                  <span className="text-[11px] text-gray-400 font-sans w-[28px] text-right mr-2">0.50</span>
                  <div className="flex-1 h-px bg-[#f4f4f5] relative">
                      {/* SVG Plottings Container */}
                      <div className="absolute top-0 right-0 w-full h-[65px] z-10 pointer-events-none">
                          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                              <defs>
                                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
                                  </linearGradient>
                              </defs>
                              {/* Filled Gradient Area under line */}
                              <path d="M 0,0 L 100,0 L 100,100 L 0,100 Z" fill="url(#chartGradient)" />
                              {/* Thin Orange Target Line overlapping the grid line exactly */}
                              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#d97706" strokeWidth="0.8" opacity="0.8"/>
                          </svg>
                      </div>

                      {/* Right-edge tooltip marker box */}
                      <div className="absolute right-0 top-[-26px] bg-[#d08f51] text-white text-[12px] font-sans font-bold px-[6px] py-[2px] rounded-sm z-20 shadow-sm flex items-center justify-center">
                          0
                          <div className="absolute bottom-[-3px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-[#d08f51] rotate-45"></div>
                      </div>
                      <div className="absolute right-0 top-[-2.5px] w-[5px] h-[5px] bg-[#d97706] rounded-full z-20 shadow-sm"></div>
                  </div>
              </div>

              {/* Y-Axis Label and Grid Row 4 */}
              <div className="flex items-center absolute w-full top-[105px]">
                  <span className="text-[11px] text-gray-400 font-sans w-[28px] text-right mr-2">-4.25</span>
                  <div className="flex-1 h-px bg-[#f4f4f5]"></div>
              </div>

              {/* Y-Axis Label and Grid Row 5 */}
              <div className="flex items-center absolute w-full top-[140px]">
                  <span className="text-[11px] text-gray-400 font-sans w-[28px] text-right mr-2">-9.00</span>
                  <div className="flex-1 h-px bg-[#ebebeb]"></div>
              </div>
              
              {/* Spacer blocks to set the actual physical height of absolute container */}
              <div className="h-[148px] w-full"></div>

              {/* X-Axis Date Labels Row */}
              <div className="w-full flex justify-between px-6 pt-2">
                  <span className="text-[10px] text-gray-400 font-sans">05-20</span>
                  <span className="text-[10px] text-gray-400 font-sans pl-6">06-04</span>
                  <span className="text-[10px] text-gray-400 font-sans">06-18</span>
              </div>
          </div>

          {/* Timeframe Toggle Buttons */}
          <div className="mt-4 mb-1 flex w-full h-[36px]">
              {/* Left Active Native Border Tab */}
              <div className="flex-1 flex justify-center items-center cursor-pointer overflow-visible relative mr-0.5 z-10 bg-white">
                  {/* Outer rect border specifically drawing orange ring */}
                  <div className="absolute inset-0 border border-[#deaa7f] pointer-events-none rounded-[2px] z-10 shadow-[0_0_8px_rgba(222,170,127,0.15)] ring-1 ring-[#deaa7f] ring-inset"></div>
                  <span className="text-[12px] font-medium text-[#c58547] tracking-widest relative z-20">一个月</span>
              </div>
              {/* Right Inactive Native Border Tab */}
              <div className="flex-1 flex justify-center items-center cursor-pointer relative bg-white border border-[#e5e7eb] rounded-[2px]">
                  <span className="text-[12px] font-medium text-gray-400 tracking-widest z-20">三个月</span>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         CARD 4: YIELD DETAILS TABLE (收益明细)
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-t-[12px] p-4 flex flex-col relative overflow-hidden flex-1 z-20 h-[300px] shadow-[0_-2px_12px_rgba(0,0,0,0.015)]">
          <span className="text-[16px] font-bold text-[#111] tracking-widest mb-6">收益明细</span>
          
          {/* Pure CSS Empty State Representation */}
          <div className="empty-state-card">
             <div className="floating-diamond"></div>
          </div>
      </div>

    </div>
  );
}
