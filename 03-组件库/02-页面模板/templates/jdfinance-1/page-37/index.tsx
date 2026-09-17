/**
 * @name 基金购买付款页 (Fund Purchase Checkout Profile)
 */
import React from 'react';
import './style.css';

export default function JDPurchaseCheckout() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f9] flex flex-col font-sans select-none overflow-x-hidden relative pb-[160px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER (WHITE)
        ========================================================================
      */}
      <div className="w-full bg-white sticky top-0 z-50 flex flex-col pt-[52px] pb-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
         <div className="w-full px-4 flex items-center justify-between text-[#111]">
             {/* Back Button */}
             <div className="w-8 flex items-center cursor-pointer active:opacity-50">
                <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
             </div>
             
             {/* Title */}
             <span className="text-[18px] font-bold tracking-widest text-[#111]">购买</span>

             {/* More Menu */}
             <div className="w-8 flex items-center justify-end cursor-pointer">
                 <div className="flex space-x-[4px] opacity-100 pb-1">
                     <div className="w-[5px] h-[5px] bg-[#111] rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-[#111] rounded-full"></div>
                     <div className="w-[5px] h-[5px] bg-[#111] rounded-full"></div>
                 </div>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         SUB PRODUCT INFO & ALERT
        ========================================================================
      */}
      <div className="w-full px-4 pt-3 flex flex-col">
          {/* Sub Info Row */}
          <div className="flex items-center text-gray-500 text-[13px] tracking-wide mb-3 pl-1">
              <span>建信上海金ETF联接A (009033)</span>
              <div className="ml-2 px-1 py-[1px] border border-[#f44b4c]/60 text-[#f44b4c] text-[10px] rounded-[3px] transform scale-90 origin-left flex items-center shadow-sm">
                  中高风险
              </div>
          </div>

          {/* White Alert Banner */}
          <div className="w-full bg-white rounded-[8px] py-3 px-4 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.015)] active:bg-gray-50 transition cursor-pointer mb-3">
              <div className="flex items-center">
                  <span className="text-[14px] text-[#333] font-medium tracking-wide">你知道A类/C类的区别吗？</span>
                  <svg className="w-[12px] h-[12px] text-gray-400 ml-1 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
              <svg className="w-[14px] h-[14px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>

          {/* 
            ========================================================================
             CORE PURCHASE INPUT CARD
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 flex flex-col mb-3">
              {/* Card Header */}
              <div className="flex items-center justify-between w-full mb-6">
                  <div className="flex items-center">
                      <span className="text-[16px] font-bold text-[#111] tracking-widest mr-2">买入金额</span>
                      {/* Sub Tag */}
                      <div className="flex items-center px-[4px] py-[2px] bg-gradient-to-r from-[#fff3ec] to-[#fdf4ed] text-[#ed8643] rounded-full border border-[#fbeadd] scale-90 origin-left">
                          <svg className="w-[10px] h-[10px] mr-[3px]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4zm-1 14l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L19 8l-8 8z"/>
                          </svg>
                          <span className="text-[10px] font-medium tracking-widest">资金保障</span>
                      </div>
                  </div>
                  <span className="text-[13px] text-gray-500 tracking-wide font-medium">交易规则</span>
              </div>

              {/* Huge Input Row */}
              <div className="flex items-center w-full border-b border-gray-100 pb-3 mb-3">
                  <span className="text-[26px] font-black font-sans text-[#111] mr-3 mt-1">¥</span>
                  <span className="text-[24px] text-gray-300 font-bold tracking-widest">0.1元起购</span>
                  {/* Blinking cursor simulation if active */}
                  <div className="w-[2px] h-[30px] bg-[#f44b4c] ml-1 animate-pulse hidden"></div>
              </div>

              {/* Transaction Notice */}
              <div className="flex items-start text-[12px] text-gray-400 leading-relaxed pr-2">
                  <span>预计 06月20日(周五) 根据 06月19日(周四) 的净值确认份额 (赎回费率见交易规则)</span>
                  <div className="w-[11px] h-[11px] border border-gray-300 rounded-full flex items-center justify-center shrink-0 ml-[4px] opacity-80 mt-[3px]">
                      <span className="text-[8px] font-bold font-serif scale-75 pt-[1px] leading-none">i</span>
                  </div>
              </div>
          </div>

          {/* 
            ========================================================================
             FEES CARD
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] px-4 py-[18px] flex items-center justify-between mb-3 cursor-pointer active:bg-gray-50 transition">
              <span className="text-[16px] font-bold text-[#111] tracking-widest">申购费</span>
              <div className="flex items-center">
                  {/* PLUS Black Tag */}
                  <div className="bg-[#4d3a29] text-[#eac088] pt-[2px] pb-[1px] px-[5px] rounded-[3px] flex items-center shadow-inner mr-2 scale-90 origin-right">
                      <svg className="w-[11px] h-[11px] mr-1 mt-[-1px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                      </svg>
                      <span className="text-[10px] font-bold font-serif leading-none tracking-wider">PLUS</span>
                  </div>
                  <span className="text-[14px] text-[#111] font-medium tracking-wide">费率低至0%</span>
                  <span className="text-[14px] text-gray-400 font-sans line-through decoration-gray-400 ml-1.5 mr-1">1.50%</span>
                  <svg className="w-[14px] h-[14px] text-gray-300 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* 
            ========================================================================
             PAYMENT METHOD CARD
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] px-4 py-[16px] flex items-center justify-between mb-3 cursor-pointer active:bg-gray-50 transition">
              <span className="text-[16px] font-bold text-[#111] tracking-widest">支付方式</span>
              <div className="flex items-center">
                  <div className="flex flex-col items-end mr-1">
                      <span className="text-[15px] text-[#333] tracking-wide mb-0.5">工商银行(尾号7717)</span>
                      <span className="text-[11px] text-[#aaa] tracking-widest font-medium">单笔限额10万</span>
                  </div>
                  <svg className="w-[14px] h-[14px] text-gray-300 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* 
            ========================================================================
             REFERRAL CARD
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] px-4 py-[18px] flex items-center justify-between mb-3">
              <div className="flex items-center">
                  <span className="text-[16px] font-bold text-[#111] tracking-widest mr-[3px]">推荐人</span>
                  <div className="w-[12px] h-[12px] border border-gray-300 rounded-full flex items-center justify-center opacity-80 mb-px">
                      <span className="text-[8px] font-bold font-serif scale-75 pt-[1px] leading-none text-gray-400">i</span>
                  </div>
              </div>
              <span className="text-[14px] text-[#ccc] tracking-widest font-medium pr-1">请填写客户经理编号 (选填)</span>
          </div>

          {/* 
            ========================================================================
             PRODUCT SUMMARY INFO CARD
            ========================================================================
          */}
          <div className="w-full bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 flex flex-col mb-[20px]">
              <span className="text-[17px] font-bold text-[#111] tracking-widest mb-4">产品概要</span>
              <span className="text-[14px] text-[#d6854e] font-medium tracking-wider mb-5">为保障您的投资权益，请仔细阅读产品所有相关信息</span>

              <div className="flex flex-col space-y-4 text-[14px] tracking-wide">
                  <div className="flex w-full">
                      <span className="text-gray-500 w-[80px] shrink-0">基金简称:</span>
                      <span className="text-[#333]">建信上海金ETF联接A</span>
                  </div>
                  <div className="flex w-full">
                      <span className="text-gray-500 w-[80px] shrink-0">基金代码:</span>
                      <span className="text-[#333] font-sans">009033</span>
                  </div>
                  {/* Clipped fake row */}
                  <div className="flex w-full overflow-hidden h-[18px]">
                      <span className="text-gray-500 w-[80px] shrink-0">基金管理人:</span>
                      <span className="text-[#333]">建信基金管理有限责任公司</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         FIXED BOTTOM CHECKOUT ACTION BAR
        ========================================================================
      */}
      <div className="fixed bottom-0 w-full bg-white z-50 flex flex-col border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] rounded-t-xl">
          
          {/* Top Row: User Agreement Checkbox */}
          <div className="w-full pt-3 pb-2 px-4 flex items-start">
              {/* Empty Red Circle Checkbox */}
              <div className="w-[16px] h-[16px] rounded-full border-[1.5px] border-[#f44b4c] shrink-0 mr-2 mt-[2px] flex items-center justify-center cursor-pointer">
                  {/* Not checked visually */}
              </div>
              <p className="text-[12px] text-gray-500 tracking-wider leading-[18px]">
                  我已阅读 <span className="text-[#111] font-bold">相关协议</span>，理解其内容并承担相关风险
              </p>
          </div>

          {/* Bottom Row: Total & Pay Button */}
          <div className="w-full px-4 pt-1 pb-6 flex items-center justify-between">
              <div className="flex items-end mb-1">
                  <span className="text-[15px] font-bold text-[#111] tracking-widest mr-1 mb-[2px]">合计</span>
                  <span className="text-[22px] font-black font-sans text-[#111] leading-none mb-[-1px]">¥0.00</span>
              </div>

              {/* Disabled Pay Button */}
              <div className="w-[160px] h-[48px] bg-[#d8d8d8] text-white rounded-full flex justify-center items-center text-[17px] font-bold tracking-widest shadow-sm cursor-not-allowed">
                  立即支付
              </div>
          </div>
          
      </div>

    </div>
  );
}
