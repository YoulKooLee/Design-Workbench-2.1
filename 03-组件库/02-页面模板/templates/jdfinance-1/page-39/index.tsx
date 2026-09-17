/**
 * @name 基金主页枢纽 (Fund Main Hub)
 */
import React from 'react';
import './style.css';

export default function JDFundHub() {
  return (
    <div className="w-full min-h-screen fund-hub-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[160px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER & SEARCH
        ========================================================================
      */}
      <div className="w-full flex flex-col z-50 pt-[48px]">
         {/* Top Branding Row */}
         <div className="w-full px-4 flex items-center justify-between text-[#111]">
             <div className="flex items-center">
                 {/* Back Button */}
                 <div className="w-7 flex items-center cursor-pointer active:opacity-50 mt-[3px]">
                    <svg className="w-[24px] h-[24px] stroke-black" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                 </div>
                 
                 {/* Title */}
                 <span className="text-[26px] font-black tracking-wide text-[#111] mr-3">基金</span>
                 <span className="text-[13px] text-gray-500 font-medium tracking-widest mt-2">简单 · 快捷 · 安全</span>
             </div>

             {/* Right Action Menu */}
             <div className="flex items-center space-x-4">
                 <svg className="w-[20px] h-[20px] text-[#111] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                 </svg>
                 <svg className="w-[20px] h-[20px] text-[#111] mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                 </svg>
             </div>
         </div>

         {/* Search Bar Input Container */}
         <div className="mx-4 mt-3 mb-2 bg-white border-[1.5px] border-[#fbcece] rounded-full h-[38px] flex items-center justify-between px-1 shadow-[0_2px_8px_rgba(250,50,50,0.05)] cursor-text">
             <div className="flex items-center pl-2 flex-1">
                 <svg className="w-[18px] h-[18px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
                 <div className="w-[1.5px] h-[14px] bg-gray-200 mx-2"></div>
                 <span className="text-[14px] text-gray-500 tracking-wide font-medium">工银新兴制造混合A</span>
             </div>
             
             {/* Search Micro Button */}
             <div className="px-4 py-[6px] bg-[#fff2f2] text-[#f04a4b] text-[13px] font-bold rounded-full tracking-widest cursor-pointer active:scale-95 transition">
                 搜索
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         10-GRID MAIN SERVICES MENU
        ========================================================================
      */}
      <div className="mx-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-2 pt-4 pb-3 mb-[14px] flex flex-col relative z-20">
          <div className="grid grid-cols-5 gap-y-4">
              
              {/* Row 1 */}
              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition">
                  <div className="icon-podium mb-1">
                      <div className="bar-2"></div><div className="bar-1"></div><div className="bar-3"></div>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">基金排行</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition">
                  <div className="icon-shield mb-1">养老</div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">养老金</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition relative">
                  <div className="w-[28px] h-[28px] bg-[#fb7185] rounded-[6px] flex items-center justify-center text-white text-[12px] font-bold mb-1">指
                      <div className="absolute top-0 right-0 w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center">
                          <div className="w-[10px] h-[10px] bg-[#f04a4b] rounded-full flex items-center justify-center text-white text-[8px] transform scale-75">✔</div>
                      </div>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">热门指数</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition">
                  <div className="w-[28px] h-[28px] bg-gradient-to-br from-[#fcd34d] to-[#f59e0b] rounded-full flex items-center justify-center mb-1 relative overflow-hidden">
                      <div className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-white/40 rounded-full"></div>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">黄金豆</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition">
                  <div className="w-[28px] h-[28px] bg-[#f43f5e] rounded-full flex items-center justify-center mb-1 text-white">
                      <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">值得投</span>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition mt-1">
                  <div className="w-[24px] h-[28px] bg-[#ef4444] rounded-[4px] rounded-b-[10px] flex justify-center items-center mb-1 relative">
                      <svg className="w-[14px] h-[14px] text-white mb-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">债基热榜</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition mt-1 relative">
                  <div className="w-[28px] h-[28px] bg-[#fb7185] rounded-[6px] flex flex-col justify-center items-center mb-1 text-white relative overflow-hidden">
                      <div className="absolute top-[-5px] w-[14px] h-[10px] border-2 border-white rounded-t-full"></div>
                      <svg className="w-[14px] h-[14px] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">商品实盘</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition mt-1">
                  <div className="icon-planet mb-1"></div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">全球投资</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition mt-1 relative">
                  {/* Floating Notification */}
                  <div className="absolute top-[-8px] right-[-10px] bg-[#f43f5e] text-white text-[8px] font-bold px-1 py-[1.5px] rounded-t-[4px] rounded-bl-[4px] rounded-br-[0px] z-10 scale-90 whitespace-nowrap shadow-sm">
                      能涨抗跌
                  </div>
                  <div className="w-[28px] h-[28px] flex items-end justify-center mb-1 space-x-[2px] pb-[4px]">
                      <div className="w-[6px] h-[12px] bg-[#fca5a5] rounded-t-sm"></div>
                      <div className="w-[6px] h-[20px] bg-[#f43f5e] rounded-t-sm"></div>
                      <div className="w-[6px] h-[16px] bg-[#fca5a5] rounded-t-sm"></div>
                  </div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">超额收益</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-90 active:opacity-100 active:scale-95 transition mt-1">
                  <div className="icon-piggy mb-1"></div>
                  <span className="text-[11px] text-[#333] font-medium tracking-wide">定投专区</span>
              </div>
          </div>
          
          {/* Active Grid Dot Indicator */}
          <div className="w-full flex justify-center mt-[10px]">
              <div className="w-[14px] h-[3px] bg-[#ccc] rounded-full"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         PROMOTIONAL CAMPAIGN CARD
        ========================================================================
      */}
      <div className="mx-4 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col mb-[14px] overflow-hidden relative z-20">
          
          {/* Top Scrolling Tabs */}
          <div className="w-full flex overflow-x-auto scrollbar-hide fade-mask-right px-4 pt-4 pb-3 space-x-2">
              <div className="px-3 py-[6px] bg-[#fef2f2] text-[#f04a4b] text-[13px] font-bold tracking-widest rounded-full shrink-0">浮动费率新发</div>
              <div className="px-4 py-[6px] bg-[#f5f6f9] text-gray-500 text-[13px] font-medium tracking-widest rounded-full shrink-0">5%专区</div>
              <div className="px-4 py-[6px] bg-[#f5f6f9] text-gray-500 text-[13px] font-medium tracking-widest rounded-full shrink-0">六月值得投</div>
              <div className="px-4 py-[6px] bg-[#f5f6f9] text-gray-500 text-[13px] font-medium tracking-widest rounded-full shrink-0">红利</div>
          </div>

          {/* Main Info */}
          <div className="px-4 flex flex-col">
              <span className="text-[20px] font-black tracking-wide text-[#111] mb-1">首批浮动费率产品重磅发行</span>
              <span className="text-[13px] text-gray-500 tracking-widest mb-4">有浮同享 利益共担新模式</span>

              {/* Three Features Row */}
              <div className="w-full flex space-x-2 mb-4">
                  <div className="flex-1 bg-[#fffcfc] rounded-[4px] py-2 flex flex-col items-center justify-center">
                      <svg className="w-[20px] h-[20px] text-[#f4ba9c] mb-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-[11px] text-[#333] tracking-widest font-medium">双赢机制</span>
                  </div>
                  <div className="flex-1 bg-[#fffcfc] rounded-[4px] py-2 flex flex-col items-center justify-center">
                      <svg className="w-[18px] h-[18px] text-[#f4ba9c] mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-[11px] text-[#333] tracking-widest font-medium">业绩导向</span>
                  </div>
                  <div className="flex-1 bg-[#fffcfc] rounded-[4px] py-2 flex flex-col items-center justify-center">
                      <svg className="w-[20px] h-[20px] text-[#f4ba9c] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <span className="text-[11px] text-[#333] tracking-widest font-medium">挂钩基准</span>
                  </div>
              </div>

              {/* Action Button */}
              <div className="w-full bg-[#fa4c4b] text-white h-[44px] rounded-full flex justify-center items-center text-[16px] font-bold tracking-widest shadow-[0_4px_10px_rgba(250,70,70,0.2)] mb-3 cursor-pointer active:scale-[0.98] transition">
                  立即看看
              </div>
          </div>

          {/* Bottom Context Strip */}
          <div className="w-full bg-[#f9fafc] px-4 py-3 flex items-start mt-2">
              <span className="text-[12px] font-bold text-[#111] tracking-widest mt-[1.5px] mr-3 whitespace-nowrap">推荐<br/>理由</span>
              <div className="w-px h-[24px] bg-gray-200 mr-3 mt-1"></div>
              <span className="text-[12px] text-gray-500 tracking-wider leading-[18px]">行业从“重规模”向“重回报”转型的重要尝试，多位绩优基金经理披挂上阵。</span>
          </div>
      </div>

      {/* 
        ========================================================================
         DATA BOARD (大数据榜单) - Clipped visually by layout mapping
        ========================================================================
      */}
      <div className="mx-4 bg-white rounded-t-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.02)] px-4 pt-[18px] pb-6 flex flex-col relative z-10 mb-10 overflow-hidden">
          <div className="w-full flex items-center justify-between mb-4">
              <span className="text-[18px] font-bold text-[#111] tracking-widest">大数据榜单</span>
              <div className="flex items-center text-gray-400">
                  <span className="text-[13px] tracking-widest mr-0.5">更多</span>
                  <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Data items underneath the overlay in the original screenshot */}
          <div className="w-full flex overflow-x-auto space-x-2 pb-6 pointer-events-none fade-mask-right">
              <div className="bg-[#f5f6f9] px-3 py-1.5 rounded-full font-bold text-[#111] text-[12px]">热基收益</div>
              <div className="bg-[#f5f6f9] px-3 py-1.5 rounded-full text-gray-500 text-[12px]">半导体</div>
              <div className="bg-[#f5f6f9] px-3 py-1.5 rounded-full text-gray-500 text-[12px]">QDII</div>
              <div className="bg-[#f5f6f9] px-3 py-1.5 rounded-full text-gray-500 text-[12px]">机器人概念</div>
          </div>
          <div className="w-full text-[12px] font-bold text-gray-400">近1个月热度较高的北化基金...</div>
      </div>

      {/* 
        ========================================================================
         FLOATING ALERT (有预期差吗)
        ========================================================================
      */}
      <div className="fixed bottom-[115px] left-[15%] right-[15%] max-w-[340px] mx-auto bg-[#403e3c]/95 border border-white/10 backdrop-blur-md rounded-full px-[12px] py-[8px] flex items-center justify-between shadow-2xl z-40 transform hover:scale-105 transition cursor-pointer">
          <div className="flex items-center flex-1 overflow-hidden pr-2">
              <span className="text-[16px] mr-1">🔥</span>
              <span className="text-[12px] text-white font-medium tracking-wide truncate">有预期差吗？——银华投顾每日观点2025.6.18</span>
          </div>
          <div className="w-[18px] h-[18px] bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-[10px] h-[10px] text-white/80 mt-[-1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7 7" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         MARKET TICKER & BOTTOM GLOBAL NAVIGATION
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full flex flex-col z-50">
          
          {/* Stock Ticker Strip */}
          <div className="w-full bg-[#fcfdfd] bg-opacity-95 backdrop-blur-sm border-t border-b border-gray-100 flex items-center justify-between px-4 py-[10px] shadow-[0_-2px_6px_rgba(0,0,0,0.015)]">
              <div className="flex items-center space-x-2">
                  <span className="text-[14px] font-bold text-[#111] tracking-widest">市场行情</span>
                  <span className="text-[14px] font-bold text-[#f04a4b] font-sans">0.04%</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer active:opacity-70 transition">
                  <span className="text-[13px] font-medium text-[#111] tracking-widest">深证成指</span>
                  <span className="text-[14px] font-bold text-[#f04a4b] font-sans">10175.59</span>
                  <span className="text-[14px] font-bold text-[#f04a4b] font-sans mr-0.5">+0.24%</span>
                  <svg className="w-[12px] h-[12px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Master 5-Tab Nav */}
          <div className="w-full bg-white h-[55px] pb-1 flex items-center justify-around shadow-[0_-1px_15px_rgba(0,0,0,0.03)]">
              
              <div className="flex flex-col items-center justify-center cursor-pointer opacity-100 w-[50px]">
                  <div className="w-[20px] h-[20px] bg-[#111] rounded-[4px] flex items-center justify-center mb-1 shadow-sm">
                      <div className="w-[12px] h-[4px] bg-white rounded-[1px] transform -rotate-45"></div>
                  </div>
                  <span className="text-[10px] text-[#111] font-bold tracking-widest">基金</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-60 w-[50px] hover:opacity-100 active:scale-95 transition">
                  <svg className="w-[22px] h-[22px] mb-[3px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <span className="text-[10px] text-[#111] font-medium tracking-widest">指数</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-60 w-[50px] hover:opacity-100 active:scale-95 transition">
                  <div className="w-[22px] h-[22px] rounded-full border-[1.8px] border-[#111] mb-[3px] flex items-center justify-center relative overflow-hidden">
                      <div className="w-[30px] h-[10px] border border-[#111] rounded-full absolute transform -rotate-45 opacity-50"></div>
                  </div>
                  <span className="text-[10px] text-[#111] font-medium tracking-widest">全球投资</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-60 w-[50px] hover:opacity-100 active:scale-95 transition">
                  <div className="w-[20px] h-[20px] border-[1.8px] border-[#111] rounded-[4px] flex justify-center items-center mb-[5px] relative top-px">
                      <span className="text-[#111] font-bold text-[14px] leading-none mb-px">+</span>
                  </div>
                  <span className="text-[10px] text-[#111] font-medium tracking-widest">自选</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer opacity-60 w-[50px] hover:opacity-100 active:scale-95 transition">
                  <div className="w-[22px] h-[22px] border-[1.8px] border-[#111] rounded-full flex justify-center items-center mb-[3px]">
                      <span className="text-[#111] font-sans font-bold text-[14px] leading-none mb-px">¥</span>
                  </div>
                  <span className="text-[10px] text-[#111] font-medium tracking-widest">持仓</span>
              </div>

          </div>
      </div>

    </div>
  );
}
