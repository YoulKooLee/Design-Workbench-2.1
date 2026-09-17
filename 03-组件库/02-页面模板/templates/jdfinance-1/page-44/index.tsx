/**
 * @name 金库与持仓 (Vault & Portfolio Holdings)
 */
import React from 'react';
import './style.css';

export default function JDVaultHoldings() {
  return (
    <div className="w-full min-h-screen vault-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[120px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[52px] pb-[10px] z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <span className="text-[18px] font-bold tracking-widest text-[#111]">金库+持仓</span>
          
          <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* 
        ========================================================================
         CARD 1: MASTER ASSET BOARD
        ========================================================================
      */}
      <div className="mx-3 mt-1 bg-white rounded-[12px] p-5 pb-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col relative z-20 overflow-hidden">
          
          {/* Promo Artifacts in Top Right */}
          <div className="promo-red-glow"></div>
          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#fc615d] to-[#f44b4c] text-white text-[12px] font-medium tracking-widest pl-2.5 pr-2 py-1 rounded-bl-[12px] z-10 flex items-center shadow-sm cursor-pointer active:scale-95 transition origin-top-right">
              领新人福利
              <svg className="w-[12px] h-[12px] ml-[1px] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>

          {/* Heading Row */}
          <div className="flex items-center mt-1 z-10">
              <span className="text-[14px] text-gray-500 tracking-wide">总金额(元)</span>
              
              {/* Hide/Show Toggle */}
              <div className="ml-2 cursor-pointer active:opacity-50">
                  <svg className="w-[16px] h-[16px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
              </div>

              {/* Security Shield Pill */}
              <div className="flex items-center ml-2 border border-[#d97706] rounded-full px-[5px] py-[1.5px] scale-90 origin-left">
                  <div className="w-[10px] h-[10px] bg-[#d97706] rounded-full flex items-center justify-center mr-[3px]">
                      <svg className="w-[6px] h-[6px] text-white mt-px" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM10 14a4 4 0 100-8 4 4 0 000 8zm2.707-5.707a1 1 0 00-1.414-1.414L9 9.172 7.707 7.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <span className="text-[9px] font-bold text-[#d97706] tracking-widest leading-none mt-px">资金保障中</span>
              </div>
          </div>
          
          {/* Master Digit */}
          <div className="font-sans font-black text-[45px] text-[#111] tracking-tighter leading-none mt-3.5 mb-7 z-10">
              0.00
          </div>
          
          {/* Sub Row */}
          <div className="flex items-center z-10 w-full pr-[20%]">
              <div className="flex items-center w-1/2">
                  <span className="text-[13px] text-gray-500 tracking-wide">昨日收益</span>
                  <span className="text-[15px] font-medium text-[#111] ml-2 font-sans">0.00</span>
              </div>
              <div className="flex items-center w-1/2">
                  <span className="text-[13px] text-gray-500 tracking-wide">累计收益</span>
                  <span className="text-[15px] font-medium text-[#111] ml-2 font-sans">0.00</span>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         CARD 2: FIVE QUICK TOOLS MATRIX
        ========================================================================
      */}
      <div className="mx-3 mt-[14px] bg-white rounded-[12px] px-3 pt-5 pb-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex justify-between relative z-20">
          
          {/* Tool 1 */}
          <div className="flex flex-col items-center justify-center cursor-pointer active:opacity-70 transition w-[60px]">
              <div className="icon-outline icon-doc mb-2"></div>
              <span className="text-[12px] font-bold text-[#333] tracking-widest">交易记录</span>
          </div>

          {/* Tool 2 */}
          <div className="flex flex-col items-center justify-center cursor-pointer active:opacity-70 transition w-[60px]">
              <div className="icon-outline icon-doc-full mb-2"></div>
              <span className="text-[12px] font-bold text-[#333] tracking-widest">收益明细</span>
          </div>

          {/* Tool 3 */}
          <div className="flex flex-col items-center justify-center cursor-pointer active:opacity-70 transition w-[60px]">
              <div className="icon-outline icon-pie mb-2"></div>
              <span className="text-[12px] font-bold text-[#333] tracking-widest">持仓分析</span>
          </div>

          {/* Tool 4 */}
          <div className="flex flex-col items-center justify-center cursor-pointer active:opacity-70 transition w-[60px]">
              <div className="icon-outline icon-cal mb-2 transform scale-[1.1]"></div>
              <span className="text-[12px] font-bold text-[#333] tracking-widest">我的定投</span>
          </div>

          {/* Tool 5 (Promoted feature) */}
          <div className="flex flex-col items-center justify-center cursor-pointer active:opacity-70 transition w-[65px] relative">
              <div className="absolute top-[-10px] right-[-6px] bg-[#ef4444] text-white text-[9px] font-bold px-1 py-[1px] rounded-[3px] rounded-bl-none shadow-sm whitespace-nowrap z-10 scale-90 origin-bottom-left">
                 超人气
              </div>
              <div className="icon-outline icon-badge mb-2 flex items-center justify-center text-[#111]">
                 {/* Internal flame core */}
                 <svg className="w-[12px] h-[12px] ml-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                 </svg>
              </div>
              <span className="text-[12px] font-bold text-[#333] tracking-widest whitespace-nowrap">大家都在买</span>
          </div>

      </div>

      {/* 
        ========================================================================
         BANNER 3: MICRO PROMOTIONAL TICKET
        ========================================================================
      */}
      <div className="mx-3 mt-3 bg-white rounded-[8px] p-[10px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.015)] relative z-20">
          <div className="flex items-center">
              <div className="mini-envelope mr-2"></div>
              <span className="text-[12px] text-[#333] font-medium tracking-wide">学理财知识，领至高40元财运优惠券</span>
          </div>
          <div className="flex items-center space-x-3">
              <div className="px-3 py-[3px] bg-[#f04a4b] text-white text-[12px] font-bold tracking-widest rounded-full cursor-pointer active:scale-95 transition pb-[4px]">
                  领取
              </div>
              <svg className="w-[14px] h-[14px] text-gray-300 cursor-pointer hover:text-gray-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 4: HOLDINGS & PORTFOLIO INVENTORY (EMPTY STATE TARGET)
        ========================================================================
      */}
      <div className="mx-3 mt-4 bg-white flex flex-col items-center flex-1 rounded-t-[14px] p-5 shadow-[0_-2px_8px_rgba(0,0,0,0.02)] min-h-[350px] relative z-10 w-[calc(100%-24px)]">
          
          <div className="w-full text-left mb-10">
              <span className="text-[18px] font-bold text-[#111] tracking-widest">我的持有</span>
          </div>

          {/* Complex CSS Character Construction (Joy Mascot Empty State) */}
          <div className="w-full flex justify-center mt-[10px] relative">
              {/* Outer faint background glow for environment integration */}
              <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-[180px] h-[180px] bg-white opacity-80 rounded-full blur-[20px] pointer-events-none"></div>

              {/* The perforated ticket backplate */}
              <div className="empty-ticket-bg flex justify-center items-end pb-2 relative opacity-90 shadow-[0_10px_25px_rgba(255,200,200,0.2)]">
                  
                  {/* Floating geometric sparkle */}
                  <div className="absolute top-[-10px] right-[-10px] w-6 h-6 bg-[#ffe4e6] rounded-full flex items-center justify-center transform hover:scale-110 transition cursor-pointer">
                      <div className="w-2 h-2 bg-white rounded-sm transform rotate-45"></div>
                  </div>

                  {/* DOM Constructed Mascot Object */}
                  <div className="dog-joy-minimal">
                      <div className="joy-ear-l"></div>
                      <div className="joy-ear-r"></div>
                      <div className="joy-head">
                          <div className="joy-eye-l"></div>
                          <div className="joy-eye-r"></div>
                          <div className="joy-smile"></div>
                      </div>
                      
                      <div className="joy-body"></div>
                      
                      <div className="joy-arm-l"></div>
                      <div className="joy-arm-r"></div>
                      
                      {/* Red Envelope Held Firmly */}
                      <div className="mini-wallet drop-shadow-md"></div>
                      
                      {/* Sub-surface bloom applied directly under arm */}
                      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[40px] h-[20px] bg-[#fb7185] opacity-20 blur-md rounded-full pointer-events-none"></div>
                  </div>
              </div>
          </div>
          
          <span className="text-gray-400 text-[14px] tracking-widest mt-[70px] font-medium">暂无持有产品</span>

      </div>

      {/* 
        ========================================================================
         FIXED BOTTOM ACTION (买一笔 / BUY NOW)
        ========================================================================
      */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md pb-[38px] pt-4 px-4 flex justify-center shadow-[0_-4px_15px_rgba(0,0,0,0.03)] z-50">
          <div className="w-full max-w-[400px] h-[52px] bg-[#dca873] rounded-full flex justify-center items-center text-white text-[18px] font-black tracking-widest shadow-lg cursor-pointer active:bg-[#c9955f] active:scale-[0.98] transition">
              买一笔
          </div>
      </div>

    </div>
  );
}
