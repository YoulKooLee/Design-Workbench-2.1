/**
 * @name 产品详情主页 (Product Details Main Profile)
 */
import React from 'react';
import './style.css';

export default function JDProductDetails() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f9] flex flex-col font-sans select-none overflow-x-hidden relative pb-[130px]">
      
      {/* 
        ========================================================================
         HERO HEADER (RED GRADIENT)
        ========================================================================
      */}
      <div className="w-full hero-bg hero-circles flex flex-col pb-[32px] shadow-sm z-0">
         
         {/* Top Action Bar */}
         <div className="w-full pt-[52px] pb-[10px] px-4 flex items-center justify-between text-white relative z-10">
             {/* Back Button */}
             <div className="w-8 flex items-center cursor-pointer active:opacity-50">
                <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
             </div>
             
             {/* Title */}
             <span className="text-[17px] font-bold tracking-widest pl-6">产品详情</span>

             {/* Right Actions */}
             <div className="flex items-center space-x-3">
                 <div className="flex border-[1.5px] border-white/90 rounded-[3px] p-[2px] opacity-90 pb-[1px] shrink-0 font-scale-icon">
                     <span className="text-[13px] font-bold font-serif leading-none">F</span>
                     <span className="text-[9px] font-bold font-serif leading-none ml-px relative top-[3px]">A</span>
                     <div className="absolute right-[-4px] bottom-[-4px] w-0 h-0 border-l-[6px] border-b-[6px] border-l-transparent border-b-white/90"></div>
                 </div>
                 <div className="flex space-x-[4px] opacity-100 cursor-pointer">
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                 </div>
             </div>
         </div>

         {/* Product Core Tags */}
         <div className="px-4 mt-2 flex items-center text-white/70 text-[13px] tracking-widest font-medium relative z-10">
             <span>009033</span>
             <span className="mx-2">|</span>
             <span>商品型</span>
             <span className="mx-2">|</span>
             <span>中高风险</span>
         </div>

         {/* Massive Product Title */}
         <div className="px-4 mt-2 text-white font-bold text-[24px] tracking-wide relative z-10 drop-shadow-sm">
             建信上海金ETF联接A
         </div>

         {/* Achievement Rank Tag */}
         <div className="mx-4 mt-3 flex w-auto self-start bg-gradient-to-r from-[#ffe4cd] to-[#f8cdab] rounded-[4px] overflow-hidden drop-shadow-sm cursor-pointer relative z-10">
             <div className="bg-white/40 flex items-center px-1.5 py-1">
                 {/* Tiny SVG Crown */}
                 <svg className="w-[12px] h-[12px] text-[#8a4e15]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
                 </svg>
                 <span className="text-[10px] font-bold text-[#8a4e15] ml-0.5 tracking-widest mb-0.5">榜单</span>
             </div>
             <div className="flex items-center px-1.5 py-1 text-[#8a4e15]">
                 <span className="text-[11px] font-medium tracking-widest mb-0.5">贵金属 · 第1名</span>
                 <svg className="w-[10px] h-[10px] ml-0.5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                 </svg>
             </div>
         </div>

      </div>

      {/* 
        ========================================================================
         OVERLAPPING WHITE MAIN METRICS CARD
        ========================================================================
      */}
      <div className="mx-4 -mt-[14px] bg-white rounded-t-2xl rounded-b-[14px] shadow-[0_4px_15px_rgba(0,0,0,0.04)] px-4 py-[18px] relative z-20 flex justify-between items-end">
          
          <div className="flex flex-col">
              <span className="text-[28px] font-bold font-sans text-[#f44b4c] leading-none mb-1 tracking-tight">+41.83%</span>
              <span className="text-[12px] text-gray-500 tracking-widest">近1年涨跌幅</span>
          </div>

          <div className="flex flex-col items-center">
              <span className="text-[16px] font-bold font-sans text-[#f44b4c] leading-none mb-[11px] tracking-tight">+0.06%</span>
              <span className="text-[12px] text-gray-500 tracking-widest">日涨跌幅</span>
          </div>

          <div className="flex flex-col items-end">
              <span className="text-[16px] font-bold font-sans text-[#111] leading-none mb-[11px] tracking-wide">1.8561</span>
              <span className="text-[12px] text-gray-500 tracking-widest">净值(06-18)</span>
          </div>

      </div>

      {/* 
        ========================================================================
         SCROLLABLE CONTENT CARDS
        ========================================================================
      */}
      <div className="px-4 flex flex-col space-y-3 relative w-full pt-3">

          {/* 
            ========================================================================
             Card 1: Yield Trend Chart (收益走势)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-[16px] pb-4 flex flex-col">
              
              {/* Header Tab Scroller */}
              <div className="px-4 flex items-center justify-between mb-[22px]">
                  <div className="flex space-x-5">
                      <div className="relative">
                          <span className="text-[17px] font-bold text-[#111] tracking-widest">收益走势</span>
                      </div>
                      <span className="text-[16px] font-medium text-gray-400 tracking-widest mt-[1px]">回撤修复</span>
                      <span className="text-[16px] font-medium text-gray-400 tracking-widest mt-[1px]">单位净值</span>
                  </div>
                  {/* Fullscreen Tool Icon */}
                  <div className="text-[#ccc] mt-px border border-[#ccc] rounded-md px-1 py-0.5">
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                  </div>
              </div>

              {/* Legend Matrix */}
              <div className="w-full px-4 flex justify-between items-start mb-4">
                  <div className="flex flex-col items-center">
                      <div className="flex items-center mb-1">
                          <div className="w-[6px] h-[6px] rounded-full bg-[#f44b4c] mr-1.5"></div>
                          <span className="text-[13px] text-[#333] font-medium tracking-wide">本产品</span>
                      </div>
                      <span className="text-[13px] font-bold font-sans text-[#f44b4c]">+41.83%</span>
                  </div>

                  <div className="flex flex-col items-center pl-2">
                      <div className="flex items-center mb-1">
                          <div className="w-[6px] h-[6px] rounded-full bg-[#fbd455] mr-1.5"></div>
                          <span className="text-[13px] text-[#333] font-medium tracking-wide">同类均值</span>
                          <div className="w-[11px] h-[11px] border border-gray-300 rounded-full flex items-center justify-center ml-[3px] opacity-80 mt-[-1px]">
                              <span className="text-[8px] font-bold font-serif scale-75 pt-[1px] leading-none">i</span>
                          </div>
                      </div>
                      <span className="text-[13px] font-bold font-sans text-[#111]">--</span>
                  </div>

                  <div className="flex flex-col items-center pl-4">
                      <div className="flex items-center mb-1">
                          <div className="w-[6px] h-[6px] rounded-full bg-[#c7c7c7] mr-1.5"></div>
                          <span className="text-[13px] text-[#333] font-medium tracking-wide">沪深300</span>
                          <svg className="w-[10px] h-[10px] ml-0.5 text-gray-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                      </div>
                      <span className="text-[13px] font-bold font-sans text-[#f44b4c]">+9.29%</span>
                  </div>
              </div>

              {/* Alert Notification Pill */}
              <div className="mx-4 bg-[#fcfcfd] border border-gray-100 rounded-md px-3 py-[6px] flex items-center justify-between mb-4">
                  <div className="flex items-center">
                      <div className="flex items-end space-x-[2px] h-[12px] mr-2 mb-0.5">
                          <div className="w-[2px] h-[40%] bg-[#f44b4c] rounded-full"></div>
                          <div className="w-[2px] h-[70%] bg-[#f44b4c] rounded-full"></div>
                          <div className="w-[2px] h-[100%] bg-[#f44b4c] rounded-full"></div>
                      </div>
                      <span className="text-[12px] text-[#111] font-medium tracking-wide">投资性价比高，近1年夏普优于98%同类基金</span>
                  </div>
                  <svg className="w-[12px] h-[12px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>

              {/* The Line Chart Container */}
              <div className="w-full px-4 mb-2">
                  <div className="w-full h-[180px] chart-grid-bg relative border-b border-gray-200">
                      
                      {/* Y-Axis Labels Overlay */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 text-[10px] text-gray-400 font-sans tracking-wide z-10 pointer-events-none pb-[12px]">
                          <span>60.00%</span>
                          <span>40.00%</span>
                          <span>20.00%</span>
                          <span>0.00%</span>
                          <span>-20.00%</span>
                      </div>

                      {/* Line Chart Graphics (SVG Data Line mapping) */}
                      <svg className="absolute inset-0 w-full h-full pb-[12px] ml-4" preserveAspectRatio="none" viewBox="0 0 100 100">
                          {/* Faint secondary benchmark line */}
                          <path d="M0,80 Q5,80 10,75 T20,80 T30,70 T40,85 T50,75 T60,80 T70,70 T80,80 T90,75 T100,75" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
                          
                          {/* Active Red Fund Line jumping violently upwards */}
                          <path d="M0,80 L5,78 L10,75 L12,71 L15,77 L18,75 L20,78 L25,72 L28,73 L30,72 L35,70 L38,55 L40,60 L45,52 L50,58 L55,59 L60,54 L65,48 L70,45 L73,46 L75,41 L80,30 L85,45 L88,38 L90,32 L95,40 L100,35" fill="none" stroke="#f44b4c" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                  </div>
                  
                  {/* X-Axis Dates */}
                  <div className="flex justify-between w-full mt-2 text-[10px] text-gray-400 font-sans tracking-wide">
                      <span>2024-06-18</span>
                      <span>2025-06-18</span>
                  </div>
              </div>

              {/* Horizontal Filter Pill Tags */}
              <div className="w-full px-4 mt-6 flex justify-between items-center pb-2">
                  <div className="flex-[0.22] h-[28px] border border-gray-200 rounded-full flex justify-center items-center text-[13px] text-gray-600 tracking-wide font-medium">近1月</div>
                  <div className="flex-[0.22] h-[28px] border border-gray-200 rounded-full flex justify-center items-center text-[13px] text-gray-600 tracking-wide font-medium">近3月</div>
                  <div className="flex-[0.22] h-[28px] border border-gray-200 rounded-full flex justify-center items-center text-[13px] text-gray-600 tracking-wide font-medium">近6月</div>
                  {/* Active Filter Pill */}
                  <div className="flex-[0.22] h-[30px] bg-[#feeeec] text-[#fa3b3b] rounded-full flex justify-center items-center text-[13px] tracking-wide font-bold shadow-sm">近1年</div>
                  
                  {/* Dropdown Chevron Tab */}
                  <div className="flex-[0.1] flex justify-end">
                      <svg className="w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                  </div>
              </div>
          </div>

          {/* 
            ========================================================================
             Card 2: Historical Performance Snippet (历史业绩 - from page-36)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-[4px] flex flex-col pb-[30px]">
              
              {/* Internal Scrolling Tabs Frame */}
              <div className="w-full flex items-end border-b border-[#f4f5f8] fade-mask-right overflow-hidden relative">
                  <div className="bg-[#fcfdfd] border-t border-l border-r border-[#f4f5f8] rounded-t-[10px] px-4 py-3 flex items-center justify-center shrink-0 relative mt-[4px] shadow-[2px_0_4px_rgba(0,0,0,0.01)] z-10">
                      <span className="text-[16px] font-bold text-[#111] tracking-widest leading-none">历史业绩</span>
                      <div className="absolute right-[-2px] bottom-0 w-[2px] h-[80%] bg-gradient-to-r from-gray-100 to-transparent"></div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">年度业绩</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">历史净值</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">定投业</span>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none mt-[2px]">
                      <svg className="w-[12px] h-[12px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Data Table Wrapper */}
              <div className="w-full px-4 pt-4 pb-2">
                  <div className="w-full flex mb-2 pb-1">
                      <div className="flex-[0.2] text-[12px] text-gray-400 tracking-widest">日期</div>
                      <div className="flex-[0.25] text-[12px] text-gray-400 tracking-widest text-center">涨跌幅</div>
                      <div className="flex-[0.25] text-[12px] text-gray-400 tracking-widest text-center">同类均值</div>
                      <div className="flex-[0.3] flex items-center justify-end text-[12px] text-gray-400 tracking-widest">
                          同类排名
                          <div className="w-[11px] h-[11px] border border-gray-300 rounded-full flex items-center justify-center ml-[3px] opacity-80 mt-[-1px]">
                              <span className="text-[8px] font-bold font-serif scale-75 pt-[1px] leading-none">i</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         FLOATING SURVEY TAB (Right Edge)
        ========================================================================
      */}
      <div className="fixed right-0 top-[60%] transform -translate-y-1/2 bg-black/50 text-white rounded-l-[10px] pl-[6px] pr-[5px] py-3 flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-md z-40 backdrop-blur-md">
          <svg className="w-[12px] h-[12px] text-white/80 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
             <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[11px] survey-badge tracking-widest">调研问卷</span>
          <div className="w-[14px] h-[14px] bg-white/20 rounded-full flex items-center justify-center mt-3 mb-1">
             <span className="text-[9px] font-bold scale-[0.8]">X</span>
          </div>
      </div>

      {/* 
        ========================================================================
         FIXED BOTTOM ACTION BAR WITH FLOATING PLUS BADGE
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full z-50 flex flex-col items-center">
          
          {/* Floating PLUS Badge Tag */}
          <div className="px-3 py-1 bg-white border border-[#faccc9] text-[#111] text-[12px] font-medium tracking-widest rounded-full shadow-lg relative top-[16px] z-50 flex items-center">
              <div className="bg-[#4d3a29] text-[#eac088] pt-[2px] pb-[1px] px-1.5 rounded-sm mr-2 flex items-center shadow-inner">
                  <svg className="w-[10px] h-[10px] mr-1 mb-px" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                  </svg>
                  <span className="text-[9px] font-bold font-serif scale-95 origin-center leading-none">PLUS</span>
              </div>
              买入费率 <span className="line-through text-gray-400 ml-1 decoration-[#888] font-sans">1.50%</span> <span className="text-[#f63b3b] font-bold font-sans ml-1 text-[13px]">0%</span>
          </div>

          {/* Nav Container */}
          <div className="w-full bg-white h-[64px] border-t border-gray-100 flex items-center justify-between px-2 pt-2 shadow-[0_-2px_15px_rgba(0,0,0,0.03)] pb-[4px]">
              
              {/* Left Toolbox Icons (4 items) */}
              <div className="flex items-center space-x-1 pl-2">
                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px] relative top-[2px]">
                      <div className="w-[22px] h-[22px] bg-[#f8f9fb] rounded-full border border-gray-200 flex flex-col items-center justify-center shadow-sm relative mb-0.5 overflow-hidden">
                          <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-white opacity-40 rounded-bl-full"></div>
                          <div className="w-[12px] h-[8px] bg-[#111] rounded-[2px] relative flex justify-around items-center px-[1px]">
                               <div className="w-[2px] h-[2px] bg-[#ffd54f] rounded-full"></div>
                               <div className="w-[2px] h-[2px] bg-[#ffd54f] rounded-full"></div>
                          </div>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top whitespace-nowrap">理财助手</span>
                  </div>

                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px]">
                      <div className="w-[20px] h-[20px] border-[1.5px] border-gray-600 rounded-[4px] flex justify-center items-center mb-[4px] relative bg-white disabled mt-px">
                          <span className="text-gray-600 font-bold text-[14px] leading-none mb-px">+</span>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top">加自选</span>
                  </div>

                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px]">
                      <div className="w-[22px] h-[22px] border-[1.5px] border-gray-600 rounded-b-lg rounded-t-[3px] flex justify-center items-center mb-[2px] relative mt-[1px]">
                          <span className="text-gray-600 font-bold text-[9px] font-sans scale-90 mb-px transform -skew-x-[15deg]">PK</span>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top">对比</span>
                  </div>

                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px]">
                      <div className="w-[20px] h-[18px] border-[1.5px] border-gray-600 rounded-[5px] flex justify-center items-center mb-[5px] relative mt-[2px]">
                          <div className="flex space-x-[2px] pb-[2px]">
                              <div className="w-[2px] h-[2px] bg-gray-600 rounded-full"></div>
                              <div className="w-[2px] h-[2px] bg-gray-600 rounded-full"></div>
                              <div className="w-[2px] h-[2px] bg-gray-600 rounded-full"></div>
                          </div>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top">圈子</span>
                  </div>
              </div>

              {/* Right Dual Massive Action Buttons */}
              <div className="flex items-center space-x-[6px] pr-2 ml-auto">
                  <div className="w-[85px] h-[44px] bg-[#fcf2f1] text-[#f44b4c] rounded-full flex justify-center items-center text-[16px] font-bold tracking-widest shadow-sm active:scale-95 transition-transform cursor-pointer">
                      定投
                  </div>
                  <div className="w-[85px] h-[44px] bg-[#fc4b4d] text-white rounded-[22px] rounded-bl-[4px] flex justify-center items-center text-[16px] font-bold tracking-widest shadow-[0_4px_10px_rgba(250,50,50,0.2)] active:scale-95 transition-transform cursor-pointer relative -left-[8px]">
                      买入
                  </div>
              </div>

          </div>
      </div>

    </div>
  );
}
