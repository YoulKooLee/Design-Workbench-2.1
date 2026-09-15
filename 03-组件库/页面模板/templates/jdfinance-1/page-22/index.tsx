/**
 * @name 京东信誉分 (JD Credit Score)
 */
import React from 'react';
import './style.css';

export default function JDCreditScore() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[40px]">
      
      {/* 1. Hero Score Section (Glowing Red Radial Zone) */}
      <div className="w-full h-[360px] score-hero-bg absolute top-0 left-0 z-0"></div>

      {/* Top Nav */}
      <div className="w-full pt-[52px] px-4 flex items-center justify-between sticky top-0 bg-transparent z-50">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="flex items-baseline">
            <span className="text-[18px] font-bold text-white tracking-wide">京东信誉分</span>
            <span className="text-[11px] text-white/80 ml-2 font-medium">简单 · 快捷 · 安全</span>
         </div>
         <div className="w-8"></div>
      </div>

      {/* Main Dial Area */}
      <div className="w-full flex justify-center mt-6 z-10 relative h-[180px]">
          
          {/* SVG Arc Gauge */}
          <div className="absolute top-0 w-[300px] h-[150px] pointer-events-none">
              <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {/* Outer crisp thin line */}
                  <path d="M 5 100 A 95 95 0 0 1 195 100" fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                  
                  {/* Inner fat dotted track */}
                  <path d="M 16 100 A 84 84 0 0 1 184 100" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="6" strokeDasharray="3 5" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Gradients */}
                  <defs>
                      <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                         <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                         <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                      </linearGradient>
                  </defs>
              </svg>
          </div>

          {/* Central Score Content */}
          <div className="absolute top-[26px] flex flex-col items-center">
              <span className="text-[12px] text-white/90 font-medium tracking-wide mb-[-4px]">**涛，你的信誉极好</span>
              <span className="text-[64px] text-white font-bold leading-none font-sans drop-shadow-md tracking-tight">857</span>
              <span className="text-[11px] text-white/80 tracking-wide mt-1">每月9日更新</span>
              
              {/* Action Button */}
              <div className="mt-4 px-6 py-[6px] border border-white/50 text-white text-[14px] rounded-full filter backdrop-blur-sm bg-white/10 active:bg-white/20 transition cursor-pointer flex items-center justify-center font-medium shadow-[0_4px_10px_rgba(200,0,0,0.1)]">
                  去涨分
              </div>
          </div>
      </div>

      {/* Broadcasting Marquee Row */}
      <div className="mx-4 mt-2 z-10 bg-white/20 backdrop-blur-md rounded-md py-[8px] px-3 flex items-center justify-between shadow-[0_4px_12px_rgba(200,0,0,0.15)] mb-3">
          <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          <div className="flex-1 overflow-hidden ml-2 relative h-4">
              <span className="text-[12px] text-white whitespace-nowrap absolute left-0 text-ellipsis overflow-hidden w-[95%]">
                 名不会影响分数评估、权益使用及任务情况。更名后服
              </span>
          </div>
          <svg className="w-3.5 h-3.5 text-white/80 cursor-pointer ml-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
      </div>

      {/* 2. Main Service Hub Content - White Card Base */}
      <div className="mx-4 bg-white rounded-t-xl rounded-b-xl px-4 pt-4 pb-5 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] mb-3 min-h-[200px]">
          
          {/* Tabs Menu */}
          <div className="w-full flex justify-between items-center mb-5 px-1 pr-3">
              <div className="flex flex-col items-center cursor-pointer">
                  <span className="text-[16px] font-bold text-black tracking-wide leading-tight">精选</span>
                  <div className="w-4 h-[3px] bg-[#f8333c] rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-50">
                  <span className="text-[15px] font-medium text-black tracking-wide leading-tight">金融</span>
                  <div className="w-4 h-[3px] bg-transparent rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-50">
                  <span className="text-[15px] font-medium text-black tracking-wide leading-tight">速办</span>
                  <div className="w-4 h-[3px] bg-transparent rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-50">
                  <span className="text-[15px] font-medium text-black tracking-wide leading-tight">先享</span>
                  <div className="w-4 h-[3px] bg-transparent rounded-full mt-1"></div>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-50">
                  <span className="text-[15px] font-medium text-black tracking-wide leading-tight">免押</span>
                  <div className="w-4 h-[3px] bg-transparent rounded-full mt-1"></div>
              </div>
          </div>

          {/* Service Carousel Blocks */}
          <div className="flex space-x-3 w-full">
              
              {/* Block 1: 先享后付 */}
              <div className="flex-1 bg-[#f9f9fb] rounded-xl flex flex-col items-center pt-5 pb-4 px-2">
                  <div className="w-[32px] h-[36px] relative flex flex-col items-center shadow-sm mb-3">
                      {/* handles */}
                      <div className="w-[12px] h-[8px] border-[2.5px] border-[#29b87f] border-b-0 rounded-t-full z-0 relative top-[3px]"></div>
                      {/* bag body */}
                      <div className="w-[28px] h-[26px] bg-[#3dd296] rounded-md z-10 flex items-center justify-center shadow-sm pb-1">
                          {/* smile */}
                          <div className="w-[10px] h-[4px] border-[2px] border-white border-t-0 rounded-b-full mt-1"></div>
                      </div>
                  </div>
                  <span className="text-[14px] font-bold text-black mb-[2px]">先享后付</span>
                  <span className="text-[10px] text-gray-400 font-sans mb-3 scale-90 -mx-2 whitespace-nowrap">300分可享</span>
                  <div className="bg-[#fb4a4f] text-white text-[11px] font-bold rounded-full px-4 py-[3px] active:scale-95 shadow-sm">
                      去查看
                  </div>
              </div>

              {/* Block 2: 免押租机 */}
              <div className="flex-1 bg-[#f9f9fb] rounded-xl flex flex-col items-center pt-5 pb-4 px-2">
                  <div className="w-[30px] h-[30px] bg-[#fc5a5a] rounded-full flex items-center justify-center shadow-sm mb-3 mt-1 relative overflow-hidden">
                      <div className="w-[14px] h-[16px] border border-white rounded-[2px] flex flex-col">
                          <div className="flex-1 border-b border-white flex">
                              <div className="flex-1 border-r border-white bg-white/20"></div>
                              <div className="flex-1 bg-white"></div>
                          </div>
                          <div className="flex-1 flex">
                              <div className="flex-1 border-r border-white bg-white"></div>
                              <div className="flex-1 bg-white/20"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-[14px] font-bold text-black mb-[2px]">免押租机</span>
                  <span className="text-[10px] text-gray-400 font-sans mb-3 scale-90 -mx-2 whitespace-nowrap">200分可享</span>
                  <div className="bg-[#fb4a4f] text-white text-[11px] font-bold rounded-full px-4 py-[3px] active:scale-95 shadow-sm">
                      去查看
                  </div>
              </div>

              {/* Block 3: 灵活还款 */}
              <div className="flex-1 bg-[#f9f9fb] rounded-xl flex flex-col items-center pt-5 pb-4 px-2">
                  <div className="w-[34px] h-[30px] relative flex flex-col items-center mb-3 mt-1">
                      {/* card body */}
                      <div className="w-[28px] h-[18px] bg-gradient-to-r from-[#ffd35c] to-[#fca533] rounded-[3px] z-10 relative flex justify-center shadow-sm top-[6px]">
                          <div className="w-full h-[4px] bg-white opacity-90 absolute top-[3px]"></div>
                      </div>
                      {/* pulling back base */}
                      <div className="absolute top-[2px] w-[20px] h-[10px] bg-[#fbdeb2] rounded-t-sm z-0"></div>
                  </div>
                  <span className="text-[14px] font-bold text-black mb-[2px]">灵活还款</span>
                  <span className="text-[10px] text-gray-400 font-sans mb-3 scale-90 -mx-2 whitespace-nowrap">200分可享</span>
                  <div className="bg-[#fb4a4f] text-white text-[11px] font-bold rounded-full px-4 py-[3px] active:scale-95 shadow-sm">
                      去查看
                  </div>
              </div>

          </div>
      </div>

      {/* 3. 月度权益 Card (Monthly Privileges) */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-4 px-4 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)] relative z-20">
          <div className="text-[15px] font-bold text-black tracking-tight mb-4 flex items-center pt-1">
             月度权益
          </div>

          <div className="w-full flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
              
              {/* Ticket 1 */}
              <div className="min-w-[280px] h-[72px] privilege-ticket bg-[#fffaf9] rounded-lg flex relative">
                  
                  {/* Left Side (Data Limit) */}
                  <div className="w-[84px] privilege-ticket-divider flex flex-col justify-center items-center relative overflow-hidden bg-[#fff5f5] rounded-l-lg object-fill group">
                      
                      {/* Watermark Ribbon Corner */}
                      <div className="absolute top-0 left-0 bg-[#ffeceb] text-[#f75e5b] text-[9px] px-1.5 rounded-br-sm border-r border-b border-t-0 border-l-0 border-[#ffeaeb] z-10 scale-90 origin-top-left font-medium">每日限量</div>
                      
                      <div className="flex items-baseline mt-[8px]">
                          <span className="text-[#fb4a4f] font-sans font-bold text-[28px] italic leading-none mr-[1px]">6</span>
                          <span className="text-[#fb4a4f] text-[13px] font-medium leading-none">期</span>
                      </div>
                  </div>

                  {/* Right Side (Content) */}
                  <div className="flex-1 flex justify-between items-center px-4 pl-4 bg-[#fffaf9] rounded-r-lg z-0">
                      <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-black mb-1 leading-tight tracking-wide">白条分期85折券</span>
                          <span className="text-[11px] text-gray-400">7月8日前可领一张</span>
                      </div>
                      <div className="bg-[#fb4a4f] text-white text-[12px] font-bold rounded-full px-[10px] py-[6px] shadow-sm transform scale-95 origin-right whitespace-nowrap">
                          去领取
                      </div>
                  </div>
              </div>

              {/* Partially cut ticket next door ... */}
              <div className="min-w-[280px] h-[72px] privilege-ticket bg-[#fffaf9] rounded-lg flex relative pointer-events-none opacity-60">
                   <div className="w-[84px] privilege-ticket-divider flex flex-col justify-center items-center relative overflow-hidden bg-[#fff5f5] rounded-l-lg">
                      <div className="absolute top-0 left-0 bg-[#ffeceb] text-[#f75e5b] text-[9px] px-1.5 rounded-br-sm border-r border-[#ffeaeb] z-10 scale-90 origin-top-left font-medium">每日限量</div>
                      <div className="flex items-baseline mt-[10px]">
                          <span className="text-[#fb4a4f] font-sans font-bold text-[28px] italic leading-none mr-[1px]">3</span>
                      </div>
                  </div>
              </div>

          </div>

          {/* Simple subtle pagination dot map */}
          <div className="w-full flex justify-center mt-1">
              <div className="w-[8px] h-[3px] bg-gray-300 rounded-full"></div>
          </div>
      </div>

      {/* 4. 快速涨分 Card (Quick Tips/Tasks) */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-6 px-4 shadow-[0_2px_10px_rgba(0,0,0,0.015)] relative z-20 border border-white">
          <div className="flex justify-between items-center mb-4 pt-1">
             <span className="text-[15px] font-bold text-black tracking-tight">快速涨分</span>
             <div className="flex items-center text-[12px] text-gray-400 cursor-pointer">
                全部任务
                <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
             </div>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between mt-2 pb-2">
              
              {/* Left Group */}
              <div className="flex items-center flex-1">
                  
                  {/* Icon */}
                  <div className="w-[36px] h-[36px] bg-[#fff0ef] rounded-full flex items-center justify-center mr-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#ffeaeb]">
                      <div className="w-[18px] h-[14px] bg-gradient-to-b from-[#fb6a6b] to-[#f44747] rounded-sm relative flex flex-col justify-between pt-[2px] pb-[1px] shadow-sm">
                          <div className="w-[8px] h-[2px] border border-[#f44747] rounded-t-[2px] absolute -top-[2px] left-1/2 transform -translate-x-1/2 bg-[#fb6a6b]"></div>
                          <div className="w-full h-px bg-white/20"></div>
                          <div className="w-[4px] h-[2px] bg-[#ffdbdb] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
                      </div>
                  </div>
                  
                  {/* Text Data */}
                  <div className="flex flex-col">
                      <div className="flex items-center mb-1">
                          <span className="text-[14px] font-bold text-black mr-2 tracking-wide">上传职业证书</span>
                          <span className="text-[#db7826] bg-[#fdf3e8] border border-[#fbd3ad] text-[9px] px-[3px] py-[0.5px] rounded-sm tracking-widest scale-90 origin-left">可享提额</span>
                      </div>
                      <div className="text-[11px] font-sans tracking-wide">
                          <span className="text-gray-400">实时涨分，</span>
                          <span className="text-gray-400">完成可涨</span><span className="text-[#f8333c] font-bold">1分</span>
                      </div>
                  </div>
              </div>

              {/* Right Action */}
              <div className="w-[66px] h-[26px] border border-gray-300 rounded-full flex items-center justify-center text-[11px] text-gray-700 font-bold active:bg-gray-50 shadow-sm mt-1">
                  去完成
              </div>

          </div>
          <div className="w-full h-[1px] bg-gray-100 my-2 ml-[48px]"></div>

      </div>

    </div>
  );
}
