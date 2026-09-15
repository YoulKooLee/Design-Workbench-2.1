/**
 * @name 收益购 (Yield Purchase)
 */
import React from 'react';
import './style.css';

export default function JDYieldPurchase() {
  return (
    <div className="w-full min-h-screen yield-hero-bg flex flex-col font-sans select-none overflow-x-hidden pb-[60px]">
      
      {/* 
        ========================================================================
         NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[52px] pb-[10px] z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <span className="text-[17px] font-bold tracking-widest text-[#111] leading-none">收益购|理财就是理生活</span>
          
          <div className="w-8 flex justify-end items-center cursor-pointer">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         HORIZONTAL PILL TABS
        ========================================================================
      */}
      <div className="w-full px-[14px] mt-1 flex space-x-[12px] overflow-x-auto no-scrollbar py-2">
          {/* Selected Tab */}
          <div className="bg-white border border-[#f04a4b] text-[#f04a4b] text-[14px] font-bold tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
             电动牙刷
          </div>
          {/* Unselected Tabs */}
          <div className="bg-white border border-transparent text-[#111] text-[14px] font-medium tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
             吹风机
          </div>
          <div className="bg-white border border-transparent text-[#111] text-[14px] font-medium tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_5px_rgba(0,0,0,0.02)] relative">
             夹耳式蓝...
             {/* Fake cut-off overlay trick isn't needed here if text is truncated, but we use hardcode layout per screen */}
          </div>
          <div className="bg-white border border-transparent text-[#111] text-[14px] font-medium tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
             无线耳机
          </div>
      </div>

      {/* 
        ========================================================================
         PRODUCT GALLERY CAROUSEL (ZERO ASSET ABSTRACT RECONSTRUCTION)
        ========================================================================
      */}
      <div className="w-full px-[14px] mt-2 flex space-x-3 overflow-x-auto no-scrollbar pb-2 z-20">
          
          {/* Main Card: Electric Toothbrush */}
          <div className="w-[230px] flex-shrink-0 bg-white rounded-[12px] flex flex-col overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer">
              
              {/* Product Artwork Construction */}
              <div className="tooth-brush-art">
                  <div className="jdz-brand-tag">京东京造</div>
                  
                  {/* Scene Elements */}
                  <div className="css-pink-cylinder"></div>
                  <div className="css-pink-circle"></div>

                  {/* Hardware Abstract Assembly */}
                  <div className="toothbrush-assembly">
                      <div className="css-head">
                          <div className="css-bristles"></div>
                      </div>
                      <div className="css-neck"></div>
                      <div className="css-handle">
                          <div className="css-button"></div>
                      </div>
                  </div>
              </div>

              {/* Product Text Meta */}
              <div className="px-3 pt-3 pb-4 flex flex-col">
                  <span className="text-[14px] font-bold text-[#111] truncate tracking-wide">京东京造 声波电动牙刷 白色...</span>
                  <span className="text-[11px] text-gray-500 mt-[6px] tracking-widest">攒钱下单仅需</span>
                  
                  <div className="flex items-end justify-between mt-[2px]">
                      <div className="flex items-baseline">
                          <span className="text-[#f04a4b] text-[13px] font-bold font-sans tracking-tighter">¥</span>
                          <span className="text-[#f04a4b] text-[20px] font-black font-sans leading-none tracking-tighter ml-[1px]">0.00</span>
                          <span className="text-gray-400 text-[11px] line-through ml-2 scale-[0.9] origin-bottom tracking-wider">价值¥357.50</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 active:opacity-60 transition">
                          <span className="text-[11px] tracking-widest scale-90 origin-right">查看商品</span>
                          <svg className="w-3 h-3 scale-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                      </div>
                  </div>
              </div>
          </div>

          {/* Secondary Cut-off Card (Mock layout for Hair dryer) */}
          <div className="w-[230px] flex-shrink-0 bg-white rounded-[12px] flex flex-col overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer">
              <div className="w-full h-[190px] bg-red-700 relative">
                  <div className="jdz-brand-tag !bg-transparent !border !border-white/40 !top-2 !left-2 !text-[10px] !rounded-[2px]">京东京造</div>
                  <div className="absolute top-[40px] w-full text-center text-white/90 font-bold text-[13px] tracking-widest">1000H寿命<br/>安全低辐射</div>
              </div>
              <div className="px-3 pt-3 pb-4 flex flex-col">
                  <span className="text-[14px] font-bold text-[#111] truncate tracking-wide">京东京造智能高...</span>
                  <span className="text-[11px] text-gray-500 mt-[6px] tracking-widest">攒钱下单仅需</span>
                  <div className="flex items-end justify-between mt-[2px]">
                      <div className="flex items-baseline">
                          <span className="text-[#f04a4b] text-[13px] font-bold font-sans tracking-tighter">¥</span>
                          <span className="text-[#f04a4b] text-[20px] font-black font-sans leading-none tracking-tighter ml-[1px]">0.00</span>
                          <span className="text-gray-400 text-[11px] line-through ml-2 scale-[0.9] origin-bottom tracking-wider">价值¥300.00</span>
                      </div>
                  </div>
              </div>
          </div>
          
      </div>

      {/* 
        ========================================================================
         FINANCIAL ACTION MODAL (THE FORM)
        ========================================================================
      */}
      <div className="mx-[14px] mt-1 bg-white rounded-[16px] px-5 py-[22px] relative shadow-[0_6px_20px_rgba(0,0,0,0.03)] z-30">
          
          {/* Connector point linking card to product tab */}
          <div className="floating-point-triangle"></div>

          {/* Modal Header */}
          <div className="w-full flex justify-center items-center relative mb-[18px]">
              <span className="text-[15px] font-bold text-[#111] tracking-widest">确认充值金额（元）</span>
              
              <div className="absolute right-0 flex items-center text-gray-500 cursor-pointer active:opacity-60 transition">
                  <svg className="w-[14px] h-[14px] mr-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[12px] font-medium tracking-widest scale-95">换一换</span>
              </div>
          </div>

          {/* Core Huge Number Value */}
          <div className="w-full text-center text-[#f04a4b] font-sans font-black text-[52px] leading-none tracking-tight mb-6">
              15,000
          </div>

          {/* Grid of Selection Options */}
          <div className="flex justify-between space-x-[10px] mb-[24px]">
              
              {/* Option 1 (Selected) */}
              <div className="flex-1 border-[1.5px] border-[#f04a4b] bg-red-50 rounded-[6px] py-[13px] flex flex-col items-center justify-center cursor-pointer">
                  <span className="text-[#f04a4b] text-[13px] font-bold tracking-widest mb-1">充值15000元</span>
                  <span className="text-[#f04a4b] text-[11px] tracking-wider scale-95 opacity-90">持有180天</span>
              </div>
              
              {/* Option 2 (Unselected) */}
              <div className="flex-1 border-[1.5px] border-transparent bg-[#f7f8f9] rounded-[6px] py-[13px] flex flex-col items-center justify-center cursor-pointer active:bg-gray-100 transition">
                  <span className="text-[#111] text-[13px] font-bold tracking-widest mb-1">充值30000元</span>
                  <span className="text-gray-500 text-[11px] tracking-wider scale-95">持有90天</span>
              </div>

              {/* Option 3 (Unselected) */}
              <div className="flex-1 border-[1.5px] border-transparent bg-[#f7f8f9] rounded-[6px] py-[13px] flex flex-col items-center justify-center cursor-pointer active:bg-gray-100 transition">
                  <span className="text-[#111] text-[13px] font-bold tracking-widest mb-1">充值90000元</span>
                  <span className="text-gray-500 text-[11px] tracking-wider scale-95">持有30天</span>
              </div>

          </div>

          {/* CTA Button */}
          <div className="w-full bg-[#f04a4b] text-white text-[18px] font-bold tracking-widest py-[13px] rounded-full text-center shadow-[0_5px_15px_rgba(240,74,75,0.3)] cursor-pointer active:scale-[0.98] transition">
              立即参与
          </div>

          {/* Legal Notice */}
          <div className="w-full flex justify-center items-center mt-[14px]">
              <span className="text-[11px] text-gray-400 font-medium tracking-wide">到期本金全额可提，提前取出需补付商品价款</span>
              <div className="w-[12px] h-[12px] bg-gray-300 text-white rounded-full flex justify-center items-center ml-[4px] mt-px">
                  <span className="text-[10px] font-bold font-serif leading-none italic text-white scale-75 pt-[1px]">i</span>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         BOTTOM NOTIFICATION / INFOGRAPHY CARD
        ========================================================================
      */}
      <div className="mx-[14px] mt-3 mb-4 bg-white rounded-[12px] p-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.02)] z-20 flex flex-col">
          
          <div className="relative inline-block w-fit mb-[4px]">
              <span className="relative z-10 text-[18px] font-bold text-[#111] tracking-widest">快速了解收益购</span>
              <div className="text-marker-highlight"></div>
          </div>

          {/* Placeholder block indicating extra info contents... */}
          <div className="w-full h-[60px] bg-gray-50 rounded mt-3 flex items-center justify-center border border-dashed border-gray-200">
              <span className="text-gray-400 text-sm tracking-widest">玩法规则说明图表区 (抽象)</span>
          </div>
          
      </div>

    </div>
  );
}
