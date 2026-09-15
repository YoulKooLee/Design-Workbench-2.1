/**
 * @name 理财资产
 */
import React from 'react';
import './style.css';

export default function JDFinanceWealth() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] font-sans pb-10 flex flex-col relative select-none">
      {/* Background Decorator */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-jd-header-pattern z-0 pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <div className="relative z-10 w-full px-4 pt-12 pb-2 flex items-center justify-between">
        <div className="absolute left-4 top-14">
          {/* Back Chevron */}
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        
        <div className="w-full text-center mt-2">
          <span className="text-[17px] font-bold text-black tracking-wide">理财资产</span>
        </div>

        <div className="absolute right-4 top-14">
          {/* Headset Customer Service Icon */}
          <svg className="w-[22px] h-[22px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
          {/* Red Dot */}
          <div className="absolute -top-[1px] -right-[1px] w-[6px] h-[6px] bg-red-500 rounded-full border border-white"></div>
        </div>
      </div>

      <div className="relative z-10 px-[14px] mt-4 flex flex-col space-y-[10px]">
        {/* Card 1: 持仓概览 (Position Overview) */}
        <div className="w-full bg-white rounded-xl p-4 shadow-sm flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-[15px] font-bold text-black">持仓概览</span>
              {/* Asset Protection Badge */}
              <div className="flex items-center space-x-[2px] bg-[#fff6ee] border border-[#ffdbb2] rounded-full px-[6px] py-[1px]">
                <svg className="w-2.5 h-2.5 text-[#e08930]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span className="text-[#e08930] text-[10px] scale-90 origin-left whitespace-nowrap">资金保障中</span>
              </div>
            </div>
            
            {/* Wealth Member Badge */}
            <div className="bg-member-bronze rounded-full flex items-center px-2 py-[2px] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[50%] bg-white opacity-20"></div>
               {/* Star / Crown SVG approximation */}
               <svg className="w-3.5 h-3.5 text-white mr-1 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z"/>
               </svg>
               <span className="text-white text-[11px] font-bold tracking-wide relative z-10 mr-[2px]">财富会员</span>
               <span className="bg-[#5c3110] text-[#fcd2b5] text-[10px] font-black rounded-sm px-1 py-[1px] leading-none z-10 scale-90 origin-right">Lv.1</span>
            </div>
          </div>

          {/* Total Assets */}
          <div className="flex flex-col items-center mt-2">
            <div className="flex items-center space-x-1 justify-center relative">
              <span className="text-gray-500 text-[13px]">我的资产(元)</span>
              {/* Eye icon */}
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex items-baseline justify-center mt-1 relative left-2">
              <span className="text-[38px] font-[900] tracking-tight font-sans text-black">0.00</span>
              <span className="text-gray-300 ml-1 text-sm font-light">›</span>
            </div>
          </div>

          {/* Sub Revenues */}
          <div className="flex items-center justify-between w-[85%] mx-auto mt-5 mb-3">
            {/* Left */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center text-gray-500 text-[12px] space-x-[2px]">
                <span>昨日收益</span>
                <span className="text-gray-300 scale-75">›</span>
              </div>
              <span className="text-[17px] font-bold text-black mt-1">0.00</span>
            </div>
            
            {/* Divider */}
            <div className="w-[1px] h-6 bg-gray-200"></div>

            {/* Right */}
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center text-gray-500 text-[12px] space-x-[2px]">
                <span>累计收益</span>
                <span className="text-gray-300 scale-75">›</span>
              </div>
              <span className="text-[17px] font-bold text-black mt-1">0.00</span>
            </div>
          </div>
          
          {/* Bottom Chevron expander */}
          <div className="w-full flex justify-center mt-2">
            <svg className="w-[14px] h-[14px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Small Banner Card: 稳健理财 */}
        <div className="w-full bg-white rounded-xl p-[14px] shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-[#ff4d4f] rounded pl-1 pr-1 py-[2px] leading-tight">
               <span className="text-white text-[10px] font-bold tracking-wide">稳健理财</span>
            </div>
            <span className="text-[13px] text-black tracking-wide font-medium">学知识领福利，追求稳稳正收益</span>
          </div>
          <svg className="w-[14px] h-[14px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Card 2: 资产明细 (Asset Details) */}
        <div className="w-full bg-white rounded-xl p-[14px] shadow-sm flex flex-col">
          <span className="text-[15px] font-bold text-black mb-4">资产明细</span>
          
          <div className="grid grid-cols-2 gap-y-6">
            {/* Item 1 */}
            <div className="flex flex-col space-y-1">
              <span className="text-[12px] text-gray-400">京东小金库</span>
              <span className="text-[14px] text-black font-medium">1.63元待提现</span>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col space-y-1">
              <span className="text-[12px] text-gray-400">基金</span>
              <span className="text-[14px] text-black font-medium">买基金费率低至0%</span>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col space-y-1">
              <span className="text-[12px] text-gray-400">京东活钱+</span>
              <span className="text-[14px] text-black font-medium">灵活取用 收益升级</span>
            </div>
          </div>
        </div>

        {/* Card 3: 专属服务 (Exclusive Services) */}
        <div className="w-full bg-white rounded-xl p-[14px] shadow-sm flex flex-col mb-6">
          <span className="text-[15px] font-bold text-black mb-3">专属服务</span>
          
          <div className="flex w-full space-x-[10px]">
             
             {/* Left Block - Risk Type */}
             <div className="flex-1 rounded-xl bg-gradient-to-b from-[#f2f7ff] to-[#f8fafe] p-4 flex flex-col items-center relative overflow-hidden h-[160px]">
               <div className="w-full text-left">
                  <span className="text-[14px] font-medium text-black">风险类型</span>
               </div>
               
               {/* Large Shield */}
               <div className="mt-4 flex items-center justify-center relative w-16 h-16">
                 {/* Blue Shield SVG background */}
                 <svg className="w-full h-full text-[#81b2ff]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
                 </svg>
                 {/* Shiny gradient overlay top left */}
                 <div className="absolute top-1 left-2 w-4 h-6 bg-white opacity-20 skew-x-12 blur-[1px]"></div>
                 {/* A1 Text */}
                 <span className="absolute text-white font-[800] text-[20px] font-sans drop-shadow-sm mt-[-2px]">A1</span>
               </div>
               
               {/* Labels bottom */}
               <div className="mt-auto flex flex-col items-center pb-1">
                 <span className="text-[13px] text-black font-medium">保守型</span>
                 <span className="text-[10px] text-gray-400 mt-[2px]">适合低风险产品</span>
               </div>
             </div>

             {/* Right Block - All weather */}
             <div className="flex-1 rounded-xl bg-gradient-to-b from-[#fff6f4] to-[#fef8f8] p-4 flex flex-col items-center relative overflow-hidden h-[160px]">
               <div className="w-full text-left">
                  <span className="text-[14px] font-medium text-black">京东全天候</span>
               </div>
               
               {/* Chart Container */}
               <div className="mt-4 flex items-center justify-center relative w-[100px] h-[90px]">
                  {/* Fake connections/dotted lines behind */}
                  <svg className="absolute inset-0 w-full h-full" overflow="visible">
                     <path d="M30,30 L10,30 L10,40" fill="none" stroke="#ffcccc" strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
                     <path d="M70,30 L90,30 L90,40" fill="none" stroke="#ffcccc" strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
                     <path d="M50,70 L50,85" fill="none" stroke="#ffcccc" strokeWidth="0.8" strokeDasharray="1.5 1.5"/>
                  </svg>

                  {/* The pie chart */}
                  <div className="w-[48px] h-[48px] rounded-full pie-chart shadow-sm z-10 border border-white"></div>
                  
                  {/* Float text labels around */}
                  <div className="absolute top-[-4px] left-[-16px] flex flex-col items-center">
                     <span className="text-[10px] text-black font-bold font-sans">60%</span>
                     <span className="text-[8px] text-[#ff5a5f] bg-[#ffe4e4] rounded-sm px-[2px] transform scale-90 -mt-[2px]">全球投资</span>
                  </div>

                  <div className="absolute top-[-4px] right-[-14px] flex flex-col items-center">
                     <span className="text-[10px] text-black font-bold font-sans">20%</span>
                     <span className="text-[8px] text-[#ff7979] bg-[#ffe4e4] rounded-sm px-[2px] transform scale-90 -mt-[2px]">全球债券</span>
                  </div>

                  <div className="absolute bottom-[-14px] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
                     <span className="text-[10px] text-black font-bold font-sans">20%</span>
                     <span className="text-[8px] text-[#ff9898] bg-[#ffe4e4] rounded-sm px-[2px] transform scale-90 -mt-[2px]">大宗商品</span>
                  </div>
               </div>

             </div>

          </div>
        </div>

      </div>

    </div>
  );
}
