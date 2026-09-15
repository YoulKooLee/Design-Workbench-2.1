/**
 * @name 基金档案详情页 (Fund Archive Profile - Top Scope)
 */
import React from 'react';
import './style.css';

export default function JDFundArchiveTop() {
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
             <span className="text-[16px] tracking-widest py-2">行情</span>
             <span className="text-[16px] tracking-widest py-2">持仓</span>
             {/* Active Tab */}
             <div className="relative py-2 flex flex-col items-center">
                 <span className="text-[17px] font-bold text-white tracking-widest">档案</span>
                 <div className="absolute bottom-1 w-[20px] h-[3px] bg-white rounded-full"></div>
             </div>
             <span className="text-[16px] tracking-widest py-2">交易</span>
             <span className="text-[16px] tracking-widest py-2">公告</span>
         </div>
      </div>

      {/* 
        ========================================================================
         SCROLLABLE CONTENT CARDS
        ========================================================================
      */}
      <div className="px-4 mt-4 flex flex-col space-y-3 relative z-10 w-full">

          {/* 
            ========================================================================
             Card A: Fund Overview & Charts (基金档案)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-[20px] pb-5 px-4 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-1 cursor-pointer">
                  <span className="text-[17px] font-bold text-[#111] tracking-wide">基金档案</span>
                  <div className="flex items-center text-[#ccc]">
                      <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>
              <span className="text-[13px] text-gray-400 tracking-widest mb-4">已成立4年318天(2020年08月05日)</span>

              {/* Data Visualization Grid */}
              <div className="flex space-x-[10px] w-full mt-1 h-[140px]">
                  
                  {/* Left Box: Scale & Bar Chart */}
                  <div className="flex-1 bg-[#f8f9fb] rounded-[10px] p-3 flex flex-col relative overflow-hidden group">
                      <span className="text-[14px] font-bold text-[#111] tracking-wide mb-1 z-10">基金规模3.77亿</span>
                      <span className="text-[11px] text-gray-400 tracking-widest z-10">较上季度增加2.09亿</span>
                      
                      {/* CSS Bar Chart */}
                      <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end justify-around px-3 pb-3">
                          <div className="w-[15%] h-[15%] bg-[#eaebee] rounded-sm transition-all duration-500 group-hover:h-[20%]"></div>
                          <div className="w-[15%] h-[30%] bg-[#eaebee] rounded-sm transition-all duration-500 group-hover:h-[40%]"></div>
                          <div className="w-[15%] h-[40%] bg-[#eaebee] rounded-sm transition-all duration-500 group-hover:h-[30%]"></div>
                          {/* Active Red Bar */}
                          <div className="w-[20%] h-[95%] bg-gradient-to-t from-[#ffb4b4] to-[#f84a4b] rounded-t-[4px] shadow-[0_-2px_10px_rgba(250,50,50,0.2)]"></div>
                      </div>
                  </div>

                  {/* Right Box: Setup & Half Donut Chart */}
                  <div className="flex-1 bg-[#f8f9fb] rounded-[10px] p-3 flex flex-col relative overflow-hidden">
                      <span className="text-[14px] font-bold text-[#111] tracking-wide mb-1 z-10">机构占比8.79%</span>
                      <span className="text-[11px] text-gray-400 tracking-widest z-10">总份额1.15亿</span>
                      
                      {/* CSS Half Donut Chart */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                          <div className="donut-chart-modern">
                              <div className="donut-chart-cutout"></div>
                          </div>
                      </div>
                      
                      {/* Chart Overlay Labels */}
                      <div className="absolute bottom-[10px] left-[15px] z-20 text-[#f7ac53] text-[10px] font-bold tracking-widest">机构</div>
                      <div className="absolute bottom-[20px] right-[10px] z-20 text-[#aaa] text-[10px] font-bold tracking-widest">个人</div>
                  </div>

              </div>
          </div>

          {/* 
            ========================================================================
             Card B: Fund Manager (基金经理)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-[20px] pb-[16px] px-4 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-4 cursor-pointer">
                  <span className="text-[17px] font-bold text-[#111] tracking-wide">基金经理</span>
                  <div className="flex items-center text-gray-400">
                      <span className="text-[13px] tracking-widest">历任经理</span>
                      <svg className="w-[12px] h-[12px] ml-0.5 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Manager Identity Profile */}
              <div className="flex items-center mb-5 cursor-pointer">
                  {/* Mock Portrait Avatar */}
                  <div className="w-[48px] h-[48px] rounded-full manager-avatar overflow-hidden relative flex justify-center items-end mr-3 shadow-inner">
                      <div className="absolute top-[18px] w-[20px] h-[24px] bg-[#f8d9c5] rounded-t-[10px] z-10 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                      <div className="w-[36px] h-[16px] bg-[#22232a] rounded-t-[20px] z-20"></div>
                  </div>
                  <span className="text-[18px] font-bold text-[#111] tracking-widest">朱金钰</span>
              </div>

              {/* Stats Block Grid */}
              <div className="flex space-x-[10px] w-full">
                  <div className="flex-1 bg-[#f8f9fb] rounded-[8px] p-3 flex flex-col justify-center">
                      <span className="text-[12px] text-gray-400 tracking-widest mb-1.5">从业5年188天</span>
                      <div className="flex items-baseline whitespace-nowrap">
                          <span className="text-[14px] text-black font-bold mr-1 tracking-widest flex-shrink-0">年化回报</span>
                          <span className="text-[16px] font-bold text-[#f04a4b] font-sans tracking-tight leading-none">+5.88%</span>
                      </div>
                  </div>
                  <div className="flex-[1.2] bg-[#f8f9fb] rounded-[8px] p-3 flex flex-col justify-center">
                      <span className="text-[12px] text-gray-400 tracking-widest mb-1.5">本基金任期4年318天</span>
                      <div className="flex items-baseline whitespace-nowrap">
                          <span className="text-[14px] text-black font-bold mr-1 tracking-widest flex-shrink-0">任期回报</span>
                          <span className="text-[16px] font-bold text-[#f04a4b] font-sans tracking-tight leading-none">+85.61%</span>
                      </div>
                  </div>
              </div>
          </div>
          
          {/* 
            ========================================================================
             Card 1: Fund Company (Repeated heavily from below stream)
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex flex-col cursor-pointer active:bg-gray-50 transition border border-transparent">
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-[17px] font-bold text-[#111] tracking-wide">基金公司</span>
                  <div className="flex items-center text-gray-400">
                      <span className="text-[13px] tracking-widest">去关注</span>
                      <svg className="w-[12px] h-[12px] ml-1 mt-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Company Profile Area */}
              <div className="flex items-center w-full">
                  {/* Mock Circular Logo */}
                  <div className="w-[48px] h-[48px] rounded-full border border-gray-100 flex flex-col items-center justify-center shrink-0 mr-3 overflow-hidden shadow-sm shadow-blue-50 relative bg-white">
                      <svg className="w-[20px] h-[20px] text-[#1c55a5] mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12,2 22,12 12,22 2,12" opacity="0.2"/>
                          <polygon points="12,6 18,12 12,18 6,12" />
                          <circle cx="12" cy="12" r="2" fill="white"/>
                      </svg>
                      <span className="text-[8px] font-bold text-[#111] font-sans scale-[0.6] origin-top whitespace-nowrap mt-[-2px] tracking-tighter">建信基金</span>
                  </div>

                  <div className="flex flex-col flex-1 pl-1">
                      <span className="text-[16px] font-bold text-black tracking-wide mb-1 leading-tight w-[200px] truncate">建信基金管理有限责任公司</span>
                      <div className="text-[12px] text-gray-500 tracking-wide font-medium flex items-center space-x-3">
                          <span>管理资产 <span className="text-[#333]">8972.50亿</span></span>
                          <span>管理基金 <span className="text-[#333]">173支</span></span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Card: Trading Rules Header Snippet */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex justify-between items-center cursor-pointer border border-transparent pb-[40px]">
              <span className="text-[17px] font-bold text-[#111] tracking-wide">交易规则</span>
              <div className="flex items-center text-[#ccc]">
                  <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
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
