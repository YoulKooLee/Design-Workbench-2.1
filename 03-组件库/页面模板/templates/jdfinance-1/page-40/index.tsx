/**
 * @name 签到领现金 (Daily Check-In & Cash Withdraw Hub)
 */
import React from 'react';
import './style.css';

export default function JDCheckInHub() {
  return (
    <div className="w-full min-h-screen checkin-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[100px]">
      
      {/* 
        ========================================================================
         TOP BRANDING HEADER (TRANSPARENT / WHITE TEXT)
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-2 pt-[52px] pb-[10px] text-white z-50 whitespace-nowrap">
          
          {/* Left Title & Back Stack */}
          <div className="flex items-center flex-shrink-0">
              <div className="w-6 flex items-center justify-center cursor-pointer active:opacity-50 mt-1 mr-1">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
              </div>
              <span className="text-[15px] font-bold tracking-wide mr-1.5 flex-shrink-0">签到领现金</span>
              
              {/* Consecutive Days Tag */}
              <div className="flex items-center px-[5px] py-[2px] bg-white/20 rounded-full border border-white/30 backdrop-blur-sm mt-1 flex-shrink-0">
                  <svg className="w-[10px] h-[10px] text-[#ffebbd] mr-[2px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span className="text-[9px] font-bold tracking-wide text-[#ffe4b5]">连签1天</span>
              </div>
          </div>

          {/* Right Slogan & Menu */}
          <div className="flex items-center mt-1 flex-shrink-0 min-w-0">
              <span className="text-[10px] font-medium tracking-wide opacity-90 relative top-[1px] truncate">天天签到,步步皆成长</span>
              <div className="flex space-x-[3px] ml-1 pb-1 bg-white/0 px-1 py-1 rounded-full cursor-pointer active:bg-white/20 flex-shrink-0">
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 1: STATUS BANNER (已领金额)
        ========================================================================
      */}
      <div className="mx-3 mt-1 bg-[#fffbf9] rounded-t-xl rounded-b-[10px] shadow-[0_4px_15px_rgba(200,50,50,0.1)] p-3 flex flex-col relative z-20">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3 pl-1 pr-1">
              <div className="flex items-end">
                  <span className="text-[18px] font-bold text-[#111] leading-none mb-px tracking-wide">已领</span>
                  <span className="text-[19px] font-bold text-[#f44b4c] leading-none mx-0.5 tracking-tight font-sans">0.52</span>
                  <span className="text-[16px] font-bold text-[#111] leading-none mb-px tracking-wide mt-1">元，明天可提现</span>
              </div>
              <div className="flex items-center space-x-1 pr-1 relative top-[3px]">
                  <span className="text-[12px] text-gray-400 tracking-widest">订阅提醒</span>
                  <div className="w-[34px] h-[18px] bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] left-[2px] shadow-sm"></div>
                  </div>
              </div>
          </div>

          {/* Dual Dynamic Banners Area */}
          <div className="flex space-x-2 h-[64px]">
              
              {/* Left Money Info Banner */}
              <div className="flex-[0.68] bg-gradient-to-br from-[#fefcee] to-[#feedce] border border-[#fbe0a1] rounded-[8px] flex items-center justify-between px-3 relative overflow-hidden shadow-inner">
                  <div className="flex flex-col z-10 pt-1">
                      <div className="flex items-end leading-none mb-1">
                          <span className="text-[26px] font-bold font-sans text-[#a5681c] tracking-tighter">0.52</span>
                          <span className="text-[14px] text-[#a5681c] font-bold mb-[3px] ml-[2px]">元</span>
                      </div>
                      <span className="text-[12px] text-[#b48039] font-medium tracking-widest relative top-[-4px]">现金</span>
                  </div>
                  {/* Floating Watermark */}
                  <div className="watermark-stamp">待提现</div>
                  {/* Button */}
                  <div className="h-[28px] px-[14px] bg-[#fad8a7] text-[#dc9e5f] text-[13px] font-bold tracking-widest rounded-full flex items-center justify-center z-10 opacity-90 cursor-not-allowed">
                      已领取
                  </div>
              </div>

              {/* Right Calendar Banner */}
              <div className="flex-[0.32] bg-white border border-[#fae5c3] rounded-[8px] flex flex-col items-center justify-start pt-1.5 relative shadow-inner">
                  {/* Calendar top binders */}
                  <div className="absolute top-[-4px] w-full flex justify-center space-x-4">
                      <div className="w-[4px] h-[8px] bg-[#fca5a5] rounded-full"></div>
                      <div className="w-[4px] h-[8px] bg-[#fca5a5] rounded-full"></div>
                  </div>
                  <span className="text-[14px] font-bold text-[#8a4e15] tracking-widest mt-1">提现日</span>
                  <div className="w-[10px] h-[2px] bg-[#fadbb0] rounded-full mt-1 mb-2"></div>
                  {/* Overlapping Red Button */}
                  <div className="absolute bottom-[-10px] w-[95%] h-[26px] bg-[#f04a4b] text-white text-[11px] font-bold tracking-widest rounded-full flex items-center justify-center shadow-md whitespace-nowrap active:scale-95 transition cursor-pointer">
                      提醒明日提现
                  </div>
              </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="w-full flex items-center mt-[18px] mb-2 relative">
              <div className="w-full h-[2px] bg-gradient-to-r from-[#22c55e] via-gray-200 to-gray-200 rounded-full relative">
                  {/* Check dot on left */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center bg-[#fffbf9] pr-1">
                      <div className="w-[16px] h-[16px] bg-[#22c55e] rounded-full flex items-center justify-center mr-1 z-10">
                          <svg className="w-[10px] h-[10px] text-white stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                      </div>
                      <span className="text-[13px] text-gray-700 tracking-wide">已领取</span>
                  </div>
                  {/* End dot on right */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center bg-[#fffbf9] pl-1 h-[20px]">
                      <span className="text-[13px] text-gray-500 tracking-wide mt-[-2px]">明天可提现</span>
                      {/* Sparkle diamond shape */}
                      <div className="w-[6px] h-[6px] bg-[#fcd34d] transform rotate-45 ml-1 relative top-[-1px]"></div>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 2: MASSIVE CENTRAL LOTTERY CARD (每日抽提现)
        ========================================================================
      */}
      <div className="mx-3 mt-[14px] bg-white rounded-[16px] p-4 flex flex-col relative shadow-[0_8px_20px_rgba(200,50,50,0.08)]">
          
          {/* CSS Mascot Dog & Top Right Badge Ribbon */}
          <div className="absolute top-0 right-0 h-[28px] bg-gradient-to-r from-[#fc8773] to-[#f44b4c] text-white text-[11px] font-bold flex items-center px-3 rounded-tr-[16px] rounded-bl-[16px] shadow-sm z-20 overflow-visible">
              今日抽全额提现
              {/* CSS Geometric Dog Rendering */}
              <div className="dog-mascot-hull">
                  <div className="dog-ear-l"></div>
                  <div className="dog-ear-r"></div>
                  <div className="dog-head">
                      <div className="dog-snout"></div>
                      <div className="dog-nose"></div>
                  </div>
              </div>
          </div>

          {/* Title row */}
          <div className="flex items-center pt-1 mb-2">
              <span className="text-[20px] font-black tracking-widest text-[#111] title-highlight-green relative z-10">每日抽提现</span>
          </div>

          {/* My Cash Account text */}
          <div className="flex items-center justify-center space-x-1 mt-4 mb-2">
              <span className="text-[13px] text-[#333] tracking-widest">我的现金账户 <span className="text-gray-300 mx-0.5">|</span> <span className="text-[#059669] font-medium cursor-pointer">去提现</span></span>
              <svg className="w-[12px] h-[12px] text-[#059669] mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>

          {/* Huge Number & Timeline Grid BG */}
          <div className="w-full flex justify-center py-2 relative mb-2">
              <div className="absolute inset-0 grid-lines-bg mx-[40px] opacity-70 pointer-events-none"></div>
              <div className="flex items-end font-sans z-10 pb-2">
                  <span className="text-[48px] font-black tracking-tighter text-[#111] leading-[0.8] relative top-[4px]">9.53</span>
                  <span className="text-[20px] font-bold text-[#111] ml-1">元</span>
              </div>
          </div>

          {/* 
            ========================================================================
             3x2 LOTTERY REWARD ITEM GRID
            ========================================================================
          */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-3 mt-1">
              
              {/* Box 1 (Active Full Amount) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-visible relative lottery-card-inner">
                  {/* Floating Tag */}
                  <div className="absolute top-[-8px] right-[-4px] bg-gradient-to-r from-[#ffe4b5] to-[#f5b357] text-[#a16223] text-[10px] font-bold px-[4px] py-[1px] rounded-[4px] rounded-bl-sm z-10 scale-90 border border-[#fce9c6]">加量</div>
                  <div className="h-[45px] w-full flex items-center justify-center pt-2">
                      <span className="text-[17px] font-black tracking-widest text-[#0cb16b]">全额提现</span>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner">
                      现金打款
                  </div>
              </div>

              {/* Box 2 (Up to 6) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-hidden relative lottery-card-inner">
                  <div className="h-[45px] w-full flex items-center justify-center pt-1 font-sans">
                      <span className="text-[24px] font-black text-[#0cb16b]">6</span>
                      <div className="flex flex-col items-start ml-[2px] mt-[2px]">
                          <span className="text-[9px] text-[#0cb16b] font-bold border border-[#0cb16b] rounded-[2px] px-[2px] scale-90 origin-left" style={{lineHeight: '1.2'}}>至高</span>
                          <span className="text-[13px] font-bold text-[#0cb16b] leading-none mt-[1px]">元</span>
                      </div>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner">
                      现金打款
                  </div>
              </div>

              {/* Box 3 (Up to 10) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-hidden relative lottery-card-inner">
                  <div className="h-[45px] w-full flex items-center justify-center pt-1 font-sans pl-1">
                      <span className="text-[24px] font-black text-[#0cb16b]">10</span>
                      <div className="flex flex-col items-start ml-[2px] mt-[2px]">
                          <span className="text-[9px] text-[#0cb16b] font-bold border border-[#0cb16b] rounded-[2px] px-[2px] scale-90 origin-left" style={{lineHeight: '1.2'}}>至高</span>
                          <span className="text-[13px] font-bold text-[#0cb16b] leading-none mt-[1px]">元</span>
                      </div>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner">
                      现金打款
                  </div>
              </div>

              {/* Box 4 (3 Fixed) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-hidden relative lottery-card-inner">
                  <div className="h-[45px] w-full flex items-center justify-center pt-1 font-sans">
                      <span className="text-[24px] font-black text-[#0cb16b]">3</span>
                      <span className="text-[14px] font-bold text-[#0cb16b] ml-[1px] mt-[5px]">元</span>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner">
                      现金打款
                  </div>
              </div>

              {/* Box 5 (Up to 3) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-hidden relative lottery-card-inner">
                  <div className="h-[45px] w-full flex items-center justify-center pt-1 font-sans">
                      <span className="text-[24px] font-black text-[#0cb16b]">3</span>
                      <div className="flex flex-col items-start ml-[2px] mt-[2px]">
                          <span className="text-[9px] text-[#0cb16b] font-bold border border-[#0cb16b] rounded-[2px] px-[2px] scale-90 origin-left" style={{lineHeight: '1.2'}}>至高</span>
                          <span className="text-[13px] font-bold text-[#0cb16b] leading-none mt-[1px]">元</span>
                      </div>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner">
                      现金打款
                  </div>
              </div>

              {/* Box 6 (Surprise Gift) */}
              <div className="flex flex-col bg-white border-[1.5px] border-[#0cb16b] rounded-lg overflow-hidden relative lottery-card-inner">
                  <div className="h-[45px] w-full flex items-center justify-center pt-2">
                       {/* Geometry Gift Object */}
                       <div className="icon-gift">
                           <div className="icon-gift-bow"><div></div><div></div></div>
                       </div>
                  </div>
                  <div className="h-[26px] bg-gradient-to-t from-[#0cb16b] to-[#12cc7e] text-white text-[12px] font-bold tracking-widest flex items-center justify-center rounded-b-md shadow-inner text-shadow-sm">
                      惊喜奖励
                  </div>
              </div>
          </div>

          {/* Action Trigger Elements */}
          <div className="w-full flex flex-col items-center mt-5 mb-2 relative">
             {/* Small status pill */}
             <div className="px-3 py-[2px] bg-[#fdecd5] text-[#b45d1d] text-[11px] font-medium tracking-wide rounded-full mb-[-12px] z-10 ring-[3px] ring-white">
                 再抽2次必得现金打款
             </div>

             {/* Mega Action Button */}
             <div className="w-[85%] h-[56px] rounded-full flex flex-col justify-center items-center text-white lottery-btn-glow active:scale-95 transition-transform cursor-pointer relative z-0 mt-1">
                 <span className="text-[20px] font-black tracking-widest leading-none drop-shadow-md mb-[2px] mt-1 mr-[-5px]">立即抽提现</span>
                 <span className="text-[11px] font-bold tracking-widest opacity-90 drop-shadow-sm">(可抽1次)</span>
             </div>
             
             {/* Floating Gold Coin 'Task' Element on Right Edge */}
             <div className="absolute right-[-10px] top-[14px] w-[60px] h-[34px] bg-gradient-to-r from-[#ffeeb1] to-[#fce490] rounded-tl-full rounded-bl-full flex flex-col items-center justify-center shadow-md cursor-pointer active:scale-95 transition origin-right border-l-2 border-y-2 border-white/50 z-10 pr-2">
                 {/* CSS Gold Coin representation */}
                 <div className="absolute top-[-14px] w-[24px] h-[24px] bg-[#fcd34d] border-[2px] border-[#fde68a] rounded-full flex items-center justify-center shadow-sm">
                     <span className="text-[#a16207] font-bold font-sans text-[11px]">¥</span>
                 </div>
                 <span className="text-[12px] font-extrabold text-[#bf781d] tracking-wider mt-px pt-1">做任务</span>
             </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 3: 5 ICON MARKETING SERVICES
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] pt-[18px] pb-3 px-3 flex flex-col relative z-10">
          <div className="flex justify-between items-start">
              
              {/* Set of 5 items */}
              <div className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition w-[60px]">
                  <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#fd4e4f] to-[#e61719] rounded-full flex items-center justify-center text-white font-sans font-black text-[18px] italic pr-0.5 tracking-tighter shadow-sm mb-1.5 ring-2 ring-[#ffe4e4] border border-[#fca5a5]">
                      618
                  </div>
                  <span className="text-[13px] text-[#111] font-bold tracking-widest mb-0.5">领京豆</span>
                  <span className="text-[10px] text-gray-400 tracking-wider">双签可得</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition w-[60px]">
                  <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#fd4e4f] to-[#e61719] rounded-full flex items-center justify-center text-white font-black text-[18px] tracking-widest shadow-sm mb-1.5 ring-2 ring-[#ffe4e4] border border-[#fca5a5]">
                      返
                  </div>
                  <span className="text-[13px] text-[#111] font-bold tracking-widest mb-0.5">领2京豆</span>
                  <span className="text-[10px] text-gray-400 tracking-wider whitespace-nowrap -ml-1">天天免费领</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition w-[60px]">
                  <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#fd4e4f] to-[#e61719] rounded-full flex items-center justify-center text-white font-black text-[18px] tracking-widest shadow-sm mb-1.5 ring-2 ring-[#ffe4e4] border border-[#fca5a5]">
                      场
                  </div>
                  <span className="text-[13px] text-[#111] font-bold tracking-widest mb-0.5">彩票券</span>
                  <span className="text-[10px] text-gray-400 tracking-wider whitespace-nowrap -ml-1">购券包赠送</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition w-[60px]">
                  <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#fd4e4f] to-[#e61719] rounded-full flex items-center justify-center text-white font-black text-[18px] tracking-widest shadow-sm mb-1.5 ring-2 ring-[#ffe4e4] border border-[#fca5a5]">
                      礼
                  </div>
                  <span className="text-[13px] text-[#111] font-bold tracking-widest mb-0.5">养猪猪</span>
                  <span className="text-[10px] text-gray-400 tracking-wider whitespace-nowrap -ml-1">天天领猪粮</span>
              </div>

              <div className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition w-[60px] overflow-hidden">
                  <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#fd4e4f] to-[#e61719] rounded-full flex items-center justify-center shadow-sm mb-1.5 ring-2 ring-[#ffe4e4] border border-[#fca5a5] relative overflow-hidden">
                      {/* Sub-elements for visual flair */}
                      <div className="absolute text-[#fcd34d] font-bold text-[14px] top-1 left-2 transform rotate-12">★</div>
                      <div className="absolute text-[#fef08a] font-bold text-[8px] bottom-1 right-2">★</div>
                  </div>
                  <span className="text-[13px] text-[#111] font-bold tracking-widest mb-0.5 whitespace-nowrap -ml-0.5">免费领黄...</span>
                  <span className="text-[10px] text-gray-400 tracking-wider">每日可领</span>
              </div>

          </div>
          
          {/* Scroll Indicator Dot */}
          <div className="w-full flex justify-center mt-3 mb-1">
              <div className="w-[20px] h-[3px] bg-gray-200 rounded-full flex">
                  <div className="w-1/2 h-full bg-gray-600 rounded-full"></div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 4: TASK LIST (赚抽奖次数) -> Base structure visible at bottom
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-t-xl shadow-[0_-2px_12px_rgba(0,0,0,0.02)] p-4 flex flex-col relative z-10 flex-1">
          <span className="text-[18px] font-bold tracking-widest text-[#111] mb-5">赚抽奖次数</span>
          
          <div className="w-full flex items-center justify-between mt-2 border-b border-gray-100 pb-4">
              <span className="text-[15px] font-bold text-[#333] tracking-wider">逛一逛心水好物(0/6)</span>
              
              <div className="w-[72px] h-[30px] rounded-full bg-gradient-to-r from-[#fc615d] to-[#f44b4c] text-white flex justify-center items-center text-[13px] font-bold tracking-widest shadow-sm active:scale-95 transition-transform cursor-pointer">
                  去完成
              </div>
          </div>
      </div>

    </div>
  );
}
