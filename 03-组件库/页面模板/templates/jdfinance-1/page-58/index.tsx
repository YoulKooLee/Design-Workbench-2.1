/**
 * @name 京东小金库促销弹窗页 (page-63)
 */
import React from 'react';
import './style.css';

export default function JDModalView() {

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* 
        ========================================================================
         BACKGROUND LAYER (Under the modal)
        ========================================================================
      */}
      <div className="absolute inset-0 bg-underlay -z-10"></div>
      
      <div className="w-full px-4 pt-[52px] pb-2 flex items-center justify-between relative z-10">
         <div className="flex items-center">
             <svg className="w-6 h-6 text-[#72361b] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
             </svg>
             <span className="text-[20px] font-bold text-[#72361b] mr-2">京东小金库</span>
             <span className="text-[12px] text-[#9e7663] mt-[3px]">简单 · 快捷 · 安全</span>
         </div>
         <div className="flex space-x-3 text-[#72361b]">
             <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 00-12.728 0M12 11c-1.657 0-3 1.343-3 3v2a3 3 0 003 3h0a3 3 0 003-3v-2c0-1.657-1.343-3-3-3zM9.5 7.5A2.5 2.5 0 0112 5h0a2.5 2.5 0 012.5 2.5M15 13h1.5a1.5 1.5 0 011.5 1.5v.5a1.5 1.5 0 01-1.5 1.5" />
             </svg>
             <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
         </div>
      </div>

      {/* Mock Asset Card Behind Mode */}
      <div className="w-[calc(100%-30px)] mx-auto mt-4 bg-white/70 backdrop-blur-md rounded-[16px] border border-white/50 p-5 relative z-10 hidden sm:block h-[300px]">
         <div className="flex items-center space-x-2 text-[14px] text-[#444] mb-2">
            <span>小金库资产</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
         </div>
      </div>

      <div className="dark-mask"></div>

      {/* 
        ========================================================================
         BOTTOM SHEET MODAL
        ========================================================================
      */}
      <div className="bottom-sheet">
          <div className="close-btn transition-transform active:scale-90">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>

          <div className="mb-[15px] pt-[8px]">
             <h2 className="text-[17px] text-[#222]">
                 <strong className="font-bold font-sans pr-[6px] text-[18px]">Hi</strong>
                 <span className="tracking-wide font-bold">京东金融送您现金抵扣券</span>
             </h2>
          </div>

          {/* Ledger Numbers */}
          <div className="flex items-end mb-[15px] pt-[5px] pl-[2px]">
             <div className="ledger-lines-behind">
                <span className="currency-yen mb-[10px]">¥</span>
                <span className="currency-num">5.24</span>
             </div>
          </div>

          {/* Miniature Tags */}
          <div className="flex space-x-1.5 mb-[35px] pl-[2px]">
             <div className="tag-hollow">支付立减</div>
             <div className="tag-hollow">本单使用</div>
          </div>

          {/* Value Prop string */}
          <div className="flex items-center mb-[30px] text-[14px] text-[#111] tracking-wide">
             <span className="text-[15px] mr-[6px] relative top-[-1px]">👍</span>
             <strong className="font-bold">金牛老将掌舵，连续5年持续创造超额</strong>
          </div>

          {/* Recommended Product Box */}
          <div className="product-block mb-[40px]">
             <div className="flex justify-between items-start mb-2">
                <span className="text-[15px] font-bold text-[#111] tracking-wide">国富基本面优选混合A</span>
                <span className="text-[18px] font-bold text-[#f23c3c] font-sans">+18.93%</span>
             </div>
             <div className="flex justify-between items-center mt-[12px]">
                <div className="flex space-x-1.5">
                   <div className="tag-info-gray">中风险</div>
                   <div className="tag-info-red">年年正收益</div>
                   <div className="tag-info-red">晨星评级5星</div>
                </div>
                <span className="text-[11px] text-[#999] tracking-widest relative top-[1px]">近一年</span>
             </div>
          </div>

          {/* Huge CTA Button */}
          <div className="w-full mb-[24px]">
             <div className="cta-red cursor-pointer">
                 立即体验200元
                 {/* Visual Pulse Indicator & Hand pointer */}
                 <div className="ripple-ring"></div>
                 <div className="mock-cursor-hand">👆🏻</div>
             </div>
          </div>

          {/* Legal Agreement */}
          <div className="flex items-start text-[11px] tracking-wide leading-relaxed px-[6px]">
             <div className="radio-open"></div>
             <div className="flex-1 mt-[2px]">
               <span className="text-[#999]">我已阅读并同意</span>
               <span className="text-[#444] font-bold">《相关协议》</span>
               <span className="text-[#999]">，知晓资金申购国富基本面优选混合A。</span>
             </div>
          </div>

      </div>

    </div>
  );
}
