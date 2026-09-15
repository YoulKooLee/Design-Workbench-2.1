/**
 * @name 基金行情页 (Fund Market Data Profile)
 */
import React from 'react';
import './style.css';

export default function JDFundMarketData() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f9] flex flex-col font-sans select-none overflow-x-hidden relative pb-[130px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER (RED)
        ========================================================================
      */}
      <div className="w-full bg-[#fa4c4b] sticky top-0 z-50 flex flex-col shadow-sm">
         
         {/* Top Action Bar */}
         <div className="w-full pt-[52px] pb-[10px] px-4 flex items-center justify-between text-white">
             {/* Back Button */}
             <div className="w-8 flex items-center cursor-pointer active:opacity-50">
                <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
             </div>
             
             {/* Title */}
             <div className="flex items-center space-x-2 truncate px-2">
                 <span className="text-[18px] font-bold tracking-wide truncate max-w-[200px]">建信上海金ETF联接A(00...</span>
                 <div className="flex border-[1.5px] border-white/90 rounded-[3px] p-[2px] opacity-90 pb-[1px] shrink-0 font-scale-icon">
                     <span className="text-[13px] font-bold font-serif leading-none">F</span>
                     <span className="text-[9px] font-bold font-serif leading-none ml-px relative top-[3px]">A</span>
                     <div className="absolute right-[-4px] bottom-[-4px] w-0 h-0 border-l-[6px] border-b-[6px] border-l-transparent border-b-white/90"></div>
                 </div>
             </div>

             {/* More Menu */}
             <div className="w-8 flex items-center justify-end cursor-pointer">
                 <div className="flex space-x-[4px] opacity-100">
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
                 </div>
             </div>
         </div>

         {/* Sub-Tabs Row */}
         <div className="w-full px-5 flex items-center justify-between mt-1 text-white/80 pb-2">
             {/* Active Tab */}
             <div className="relative py-2 flex flex-col items-center">
                 <span className="text-[17px] font-bold text-white tracking-widest">行情</span>
                 <div className="absolute bottom-1 w-[20px] h-[3px] bg-white rounded-full"></div>
             </div>
             <span className="text-[16px] tracking-widest py-2">持仓</span>
             <span className="text-[16px] tracking-widest py-2">档案</span>
             <span className="text-[16px] tracking-widest py-2">交易</span>
             <span className="text-[16px] tracking-widest py-2">公告</span>
         </div>
      </div>

      {/* 
        ========================================================================
         SCROLLABLE CONTENT CARDS
        ========================================================================
      */}
      <div className="px-4 mt-4 flex flex-col space-y-3 relative z-10 w-full mb-10">

          {/* 
            ========================================================================
             Card 1: Historical Performance (历史业绩)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-[4px] flex flex-col">
              
              {/* Internal Scrolling Tabs Frame */}
              <div className="w-full flex items-end border-b border-[#f4f5f8] fade-mask-right overflow-hidden relative">
                  
                  {/* Active Tab Shape */}
                  <div className="bg-[#fcfdfd] border-t border-l border-r border-[#f4f5f8] rounded-t-[10px] px-4 py-3 flex items-center justify-center shrink-0 relative mt-[4px] shadow-[2px_0_4px_rgba(0,0,0,0.01)] z-10">
                      <span className="text-[16px] font-bold text-[#111] tracking-widest leading-none">历史业绩</span>
                      {/* Subdued shadow on right edge to imply depth */}
                      <div className="absolute right-[-2px] bottom-0 w-[2px] h-[80%] bg-gradient-to-r from-gray-100 to-transparent"></div>
                  </div>

                  {/* Inactive Tabs */}
                  <div className="px-4 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">年度业绩</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">历史净值</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center shrink-0 border-b border-transparent cursor-pointer">
                      <span className="text-[15px] text-gray-500 tracking-widest font-medium leading-none">定投业</span>
                  </div>

                  {/* Absolute right overlay chevron */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none mt-[2px]">
                      <svg className="w-[12px] h-[12px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Data Table Wrapper */}
              <div className="w-full px-4 pt-4 pb-2">
                  
                  {/* Pseudo Table Headers */}
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

                  {/* Matrix Rows */}
                  {[
                    { period: '近1周', val1: '+0.98%', val2: '+1.17%', pos: '28', total: '54', rating: '一般', rType: 'blue' },
                    { period: '近1月', val1: '+4.46%', val2: '+4.69%', pos: '31', total: '54', rating: '一般', rType: 'blue' },
                    { period: '近3月', val1: '+11.74%', val2: '+11.81%', pos: '17', total: '53', rating: '良好', rType: 'orange' },
                    { period: '近6月', val1: '+26.45%', val2: '+25.04%', pos: '11', total: '53', rating: '优秀', rType: 'red' },
                    { period: '近1年', val1: '+41.83%', val2: '+39.06%', pos: '13', total: '48', rating: '优秀', rType: 'red' },
                    { period: '今年以来', val1: '+26.58%', val2: '+25.36%', pos: '21', total: '54', rating: '良好', rType: 'orange' }
                  ].map((row, idx) => (
                    <div key={idx} className="w-full flex items-center border-b border-[#f8f9fb] hover:bg-gray-50 active:scale-[0.99] transition py-3">
                        {/* Col 1: Period */}
                        <div className="flex-[0.2] text-[15px] font-medium text-[#111] tracking-wide">{row.period}</div>
                        {/* Col 2: Change % */}
                        <div className="flex-[0.25] text-[15px] font-bold text-[#f04a4b] text-center font-sans tracking-tight">{row.val1}</div>
                        {/* Col 3: Peer Avg % */}
                        <div className="flex-[0.25] text-[15px] font-bold text-[#f04a4b] text-center font-sans tracking-tight">{row.val2}</div>
                        
                        {/* Col 4: Rank & Pill */}
                        <div className="flex-[0.3] flex items-center justify-end pr-0.5">
                            <span className="text-[15px] font-bold text-[#111] font-sans mr-0.5">{row.pos}</span>
                            <span className="text-[12px] text-gray-400 font-sans mr-1.5 mt-0.5">/{row.total}</span>
                            
                            {/* Dynamic Rating Pill */}
                            {row.rType === 'blue' && (
                               <div className="px-1 py-[2px] bg-[#f4f7fc] border border-[#adc1f7] text-[#427dfa] text-[10px] font-medium rounded-[3px] scale-[0.85] origin-right tracking-widest whitespace-nowrap shadow-[0_1px_2px_rgba(66,125,250,0.05)]">
                                   {row.rating}
                               </div>
                            )}
                            {row.rType === 'orange' && (
                               <div className="px-1 py-[2px] bg-[#fcf6f2] border border-[#f8cbb0] text-[#e8702c] text-[10px] font-medium rounded-[3px] scale-[0.85] origin-right tracking-widest whitespace-nowrap shadow-[0_1px_2px_rgba(232,112,44,0.05)]">
                                   {row.rating}
                               </div>
                            )}
                            {row.rType === 'red' && (
                               <div className="px-1 py-[2px] bg-[#fdf2f4] border border-[#fab0bd] text-[#fa4c4b] text-[10px] font-medium rounded-[3px] scale-[0.85] origin-right tracking-widest whitespace-nowrap shadow-[0_1px_2px_rgba(250,76,75,0.05)]">
                                   {row.rating}
                               </div>
                            )}

                            {/* Chevron */}
                            <svg className="w-[10px] h-[10px] text-[#ccc] ml-0.5 mt-px opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                  ))}
              </div>
          </div>

          {/* 
            ========================================================================
             Card 2: Fund Holdings Overview (基金持仓 - Peeking heavily from bottom)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col cursor-pointer pb-2">
              
              {/* Main Card Header */}
              <div className="flex items-center w-full px-4 pt-5 pb-4">
                  <span className="text-[18px] font-bold text-[#111] tracking-widest mr-3">基金持仓</span>
                  <div className="flex items-center text-gray-400 mt-0.5">
                      <span className="text-[13px] tracking-widest font-medium">2025年Q1</span>
                      <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-400 ml-1 mt-[2px]"></div>
                  </div>
              </div>

              {/* Top Divider */}
              <div className="w-full h-px bg-[#f4f5f8]"></div>

              {/* Section A: Asset Allocation & Donut Chart */}
              <div className="w-full px-4 pt-4 pb-6 border-transparent">
                  {/* Section Head */}
                  <div className="flex justify-between items-center w-full mb-6">
                      <div className="flex items-center">
                          <span className="text-[14px] font-bold text-gray-600 tracking-widest mr-1">资产分类</span>
                          <svg className="w-[12px] h-[12px] text-gray-400 mt-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                      </div>
                      <span className="text-[12px] text-gray-400 tracking-wider">更新于2025-03-31</span>
                  </div>

                  {/* Chart and Legend Layout */}
                  <div className="flex items-center w-full justify-between pr-4 pb-[30px]">
                      {/* Left: Native CSS Full Donut Chart */}
                      <div className="relative w-[140px] h-[140px] flex items-center justify-center shrink-0">
                          <div className="full-donut-container">
                              <div className="full-donut-cutout flex flex-col items-center justify-center pt-1 drop-shadow-sm">
                                  <span className="text-[11px] text-gray-500 tracking-widest mb-0.5">净资产</span>
                                  <span className="text-[16px] font-black text-[#111] tracking-tight">12.26亿元</span>
                              </div>
                          </div>
                      </div>

                      {/* Right: Legend Array */}
                      <div className="flex flex-col space-y-3.5 pl-6 flex-1 max-w-[150px]">
                          <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                  <div className="w-[6px] h-[6px] bg-[#ff3a48] rounded-full mr-2"></div>
                                  <span className="text-[13px] text-gray-600 tracking-widest font-medium">基金</span>
                              </div>
                              <span className="text-[15px] font-bold text-[#111] font-sans">88.44%</span>
                          </div>
                          <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                  <div className="w-[6px] h-[6px] bg-[#ffa24b] rounded-full mr-2"></div>
                                  <span className="text-[13px] text-gray-600 tracking-widest font-medium">现金</span>
                              </div>
                              <span className="text-[15px] font-bold text-[#111] font-sans">7.45%</span>
                          </div>
                          <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                  <div className="w-[6px] h-[6px] bg-[#ffcd50] rounded-full mr-2"></div>
                                  <span className="text-[13px] text-gray-600 tracking-widest font-medium">其他</span>
                              </div>
                              <span className="text-[15px] font-bold text-[#111] font-sans">4.12%</span>
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

              {/* Right Dual Action Buttons */}
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
