/**
 * @name 基金档案详情页 (Fund Archive Profile)
 */
import React from 'react';
import './style.css';

export default function JDFundArchive() {
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
          
          {/* Card 1: Fund Company */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex flex-col cursor-pointer active:bg-gray-50 transition">
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
                      {/* Logo Graphic */}
                      <svg className="w-[20px] h-[20px] text-[#1c55a5] mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12,2 22,12 12,22 2,12" opacity="0.2"/>
                          <polygon points="12,6 18,12 12,18 6,12" />
                          <circle cx="12" cy="12" r="2" fill="white"/>
                      </svg>
                      {/* Logo Text */}
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

          {/* Card 2: Trading Rules (Timeline) */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-4 pb-5 px-4 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-[18px] cursor-pointer">
                  <span className="text-[17px] font-bold text-[#111] tracking-wide">交易规则</span>
                  <div className="flex items-center text-[#ccc]">
                      <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Sub-tabs Pills */}
              <div className="flex space-x-[14px] mb-8">
                  <div className="bg-[#feeeec] text-[#f24747] text-[13px] font-bold px-[18px] py-[6px] rounded-full active:scale-95 transition tracking-widest cursor-pointer">买入</div>
                  <div className="bg-[#f5f6f8] text-[#333] text-[13px] font-medium px-[18px] py-[6px] rounded-full active:scale-95 transition tracking-widest cursor-pointer">卖出</div>
                  <div className="bg-[#f5f6f8] text-[#333] text-[13px] font-medium px-[18px] py-[6px] rounded-full active:scale-95 transition tracking-widest cursor-pointer">费率</div>
              </div>

              {/* Graphical Timeline Step Map */}
              <div className="w-full relative px-2">
                  {/* The Background Grey Track Line */}
                  <div className="absolute top-[6px] left-[16px] right-[24px] h-[2px] bg-[#e3e6ec] z-0"></div>
                  
                  {/* Nodes Flex Row */}
                  <div className="flex justify-between w-full relative z-10">
                      
                      {/* Step 1: Buy */}
                      <div className="flex flex-col items-start w-[80px]">
                          <div className="timeline-node mb-3 ml-[4px]"></div>
                          <span className="text-[15px] font-bold text-black tracking-widest mb-1 leading-none drop-shadow-sm">买入</span>
                          <span className="text-[11px] text-gray-400 tracking-wider">06-19 15:00前</span>
                      </div>

                      {/* Step 2: Confirm */}
                      <div className="flex flex-col items-center flex-1">
                          <div className="timeline-node mb-3"></div>
                          <span className="text-[15px] font-bold text-black tracking-widest mb-1 leading-none drop-shadow-sm">确认份额</span>
                          <span className="text-[11px] text-gray-400 tracking-wider">06-20</span>
                      </div>

                      {/* Step 3: P&L */}
                      <div className="flex flex-col items-end w-[130px]">
                          <div className="timeline-node mb-3 mr-[12px]"></div>
                          <span className="text-[15px] font-bold text-black tracking-widest mb-1 leading-none drop-shadow-sm">查看盈亏</span>
                          <span className="text-[11px] text-gray-400 tracking-wider">06-20净值更新后</span>
                      </div>

                  </div>
              </div>
          </div>

          {/* Card 3: Latest Announcements */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-center w-full mb-4 cursor-pointer align-baseline">
                  <span className="text-[17px] font-bold text-[#111] tracking-wide">最新公告</span>
                  <div className="flex items-center text-[#ccc]">
                      <svg className="w-[14px] h-[14px] mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
              </div>

              {/* Announcement List */}
              <div className="flex flex-col space-y-5 px-1 mt-1">
                  {/* Item 1 */}
                  <div className="flex flex-col cursor-pointer group active:opacity-60 transition">
                      <div className="text-[15px] text-[#111] leading-snug tracking-wide line-clamp-2 mb-2 font-medium">
                          建信基金管理有限责任公司关于新增青岛银行为公司旗下部分开放式基金代销机构的公告
                      </div>
                      <span className="text-[13px] text-gray-400 tracking-wider">2025-06-13</span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col cursor-pointer group active:opacity-60 transition">
                      <div className="text-[15px] text-[#111] leading-snug tracking-wide line-clamp-2 mb-2 font-medium">
                          建信基金管理有限责任公司关于新增民生银行为公司旗下部分开放式基金代销机构的公告
                      </div>
                      <span className="text-[13px] text-gray-400 tracking-wider">2025-05-20</span>
                  </div>
              </div>
          </div>

          {/* Card 4: FAQ Header Snippet */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex justify-between items-center cursor-pointer active:bg-gray-50 transition border border-transparent">
              <span className="text-[17px] font-bold text-[#111] tracking-wide">常见问题</span>
              <div className="flex items-center text-gray-400">
                  <span className="text-[13px] tracking-widest">京东PLUS专属客服</span>
                  <svg className="w-[13px] h-[13px] ml-[2px] mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      <div className="fixed right-0 top-[60%] transform -translate-y-1/2 bg-black/50 backdrop-blur-md text-white rounded-l-[10px] pl-[6px] pr-[5px] py-3 flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-md z-40">
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
                  {/* Tool 1: Assistant */}
                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px] relative top-[2px]">
                      {/* Mini Mascot Head */}
                      <div className="w-[22px] h-[22px] bg-[#f8f9fb] rounded-full border border-gray-200 flex flex-col items-center justify-center shadow-sm relative mb-0.5 overflow-hidden">
                          <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-white opacity-40 rounded-bl-full"></div>
                          <div className="w-[12px] h-[8px] bg-[#111] rounded-[2px] relative flex justify-around items-center px-[1px]">
                               <div className="w-[2px] h-[2px] bg-[#ffd54f] rounded-full"></div>
                               <div className="w-[2px] h-[2px] bg-[#ffd54f] rounded-full"></div>
                          </div>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top whitespace-nowrap">理财助手</span>
                  </div>

                  {/* Tool 2: Add Watchlist */}
                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px]">
                      <div className="w-[20px] h-[20px] border-[1.5px] border-gray-600 rounded-[4px] flex justify-center items-center mb-[4px] relative bg-white disabled mt-px">
                          <span className="text-gray-600 font-bold text-[14px] leading-none mb-px">+</span>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top">加自选</span>
                  </div>

                  {/* Tool 3: Compare (PK) */}
                  <div className="flex flex-col items-center justify-center cursor-pointer opacity-80 hover:opacity-100 active:scale-95 w-[42px]">
                      <div className="w-[22px] h-[22px] border-[1.5px] border-gray-600 rounded-b-lg rounded-t-[3px] flex justify-center items-center mb-[2px] relative mt-[1px]">
                          <span className="text-gray-600 font-bold text-[9px] font-sans scale-90 mb-px transform -skew-x-[15deg]">PK</span>
                      </div>
                      <span className="text-[10px] text-gray-500 tracking-widest scale-[0.9] origin-top">对比</span>
                  </div>

                  {/* Tool 4: Community */}
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
