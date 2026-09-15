/**
 * @name 定期理财 (Fixed-Term Wealth Management)
 */
import React from 'react';
import './style.css';

export default function JDFixedTerm() {
  
  const products = [
    { yield: '2.17', label: '成立以来年化', period: '7天', details: '低风险 | 银行系' },
    { yield: '2.55', label: '近一年收益率', period: '1个月', details: '中低风险' },
    { yield: '2.81', label: '近一年收益率', period: '2个月', details: '中低风险 | 连涨8天' },
    { yield: '4.25', label: '近一年收益率', period: '3个月', details: '中低风险' },
    { yield: '5.41', label: '近一年收益率', period: '6个月', details: '中低风险 | 连涨10天' },
  ];

  return (
    <div className="w-full min-h-screen fixed-term-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* 
        ========================================================================
         NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[48px] pb-2 z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <span className="text-[17px] font-bold tracking-widest text-[#111]">定期理财</span>
          
          <div className="w-8 flex justify-end items-center space-x-[3px] py-1 cursor-pointer opacity-80">
              <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-[#111] rounded-full"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         DYNAMIC HERO TITLE AREA & CSS 3D CYLINDER ENGINE
        ========================================================================
      */}
      <div className="px-5 pt-3 pb-4 relative z-20">
          {/* Top Pill */}
          <div className="inline-block bg-gradient-to-r from-[#fde8c5] to-[#fad295] px-[6px] py-[2px] rounded-[4px] rounded-br-[10px] mb-2 shadow-sm">
             <span className="text-[#a46006] text-[10px] font-bold tracking-widest">金库+</span>
          </div>
          
          {/* Main Huge Typography */}
          <div className="mega-slant-title mb-1">
             定期理财
          </div>

          <p className="text-[13px] text-gray-500 font-medium tracking-widest mt-2 opacity-80">
             活钱理财小金库 定期理财选这里
          </p>

          {/* Abstract 3D Hero Diagram Representation */}
          <div className="css-cylinder-container">
             <div className="cylinder-red-glow"></div>
             
             {/* Left Object */}
             <div className="cylinder-orange">
                <div className="cylinder-tag-orange">小金库</div>
             </div>
             
             {/* Dynamic Connection Arrow */}
             <div className="transfer-arrow"></div>

             {/* Right Object */}
             <div className="cylinder-red">
                <div className="cylinder-tag-red">定期理财</div>
             </div>
          </div>
      </div>

      {/* 
        ========================================================================
         "MY ASSETS" STATUS BAR
        ========================================================================
      */}
      <div className="mx-4 mt-2 bg-gradient-to-r from-[#fb9961] to-[#f4ab79] rounded-[10px] h-[52px] flex items-center justify-between px-[14px] shadow-[0_6px_15px_rgba(250,165,115,0.3)] z-20 cursor-pointer active:scale-[0.98] transition">
          <div className="flex items-center">
             <span className="text-white text-[16px] font-bold tracking-widest text-shadow-sm">我的资产</span>
             
             {/* Eye Icon */}
             <svg className="w-[14px] h-[14px] text-white/90 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
             </svg>

             {/* Outlined Shield Badge */}
             <div className="flex items-center ml-2 border border-white/60 rounded-full px-[5px] py-[1.5px] scale-90 origin-left">
                  <div className="w-[10px] h-[10px] bg-white rounded-full flex items-center justify-center mr-[3px]">
                      <svg className="w-[7px] h-[7px] text-[#f4ab79] mt-px ml-px" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM10 14a4 4 0 100-8 4 4 0 000 8zm2.707-5.707a1 1 0 00-1.414-1.414L9 9.172 7.707 7.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <span className="text-[10px] font-medium text-white tracking-widest leading-none mt-px">资金保障</span>
              </div>
          </div>
          
          <div className="flex items-center text-white">
             <span className="font-sans font-bold text-[22px] tracking-wider mb-[2px]">0.00</span>
             <svg className="w-[14px] h-[14px] opacity-80 pl-1 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
             </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         MAIN PRODUCT LISTING CARD
        ========================================================================
      */}
      <div className="mx-4 mt-3 bg-white rounded-[12px] pt-5 pb-2 flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.02)] z-20">
          
          {/* Card Header */}
          <div className="px-4 mb-3">
             <span className="text-[17px] font-bold text-[#111] tracking-widest">定期理财</span>
          </div>

          {/* Map through investment products */}
          {products.map((item, idx) => (
             <div key={idx} className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 active:bg-gray-50 transition cursor-pointer">
                 
                 {/* Left Column: Yield */}
                 <div className="w-[100px] flex flex-col justify-center">
                    <div className="text-[#de3541] font-sans font-medium flex items-baseline">
                        <span className="text-[20px] tracking-tight">{item.yield}</span>
                        <span className="text-[14px] ml-[1px]">%</span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5 tracking-wider">{item.label}</span>
                 </div>

                 {/* Middle Column: Specs */}
                 <div className="flex-1 flex flex-col justify-center pl-2">
                    <div className="flex items-center">
                        <span className="text-[16px] text-[#111] font-medium mr-2 tracking-wide font-sans">{item.period}</span>
                        {/* Welfare Tag */}
                        <div className="border border-[#e7c9b2] rounded-[3px] px-[4px] py-[0px] flex items-center justify-center">
                            <span className="text-[#b57342] text-[9px] font-bold tracking-widest scale-90">福利</span>
                        </div>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-[3px] tracking-wider">{item.details}</span>
                 </div>

                 {/* Right Column: CTA */}
                 <div className="flex justify-end flex-shrink-0 ml-2">
                    <div className="bg-gradient-to-r from-[#ec9762] to-[#de7b3a] text-white text-[13px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap hover:opacity-90 active:scale-95 transition">
                        立即转入
                    </div>
                 </div>
                 
             </div>
          ))}
      </div>

      {/* 
        ========================================================================
         FOOTER AREA
        ========================================================================
      */}
      <div className="w-full flex justify-center mt-6 z-10 cursor-pointer active:opacity-70">
          <span className="text-[13px] text-gray-400 tracking-widest font-medium">查看更多产品</span>
      </div>

      <div className="w-full flex flex-col items-center mt-[70px] mb-8 opacity-40 mix-blend-multiply pointer-events-none">
          {/* Logo Abstraction */}
          <div className="flex items-center text-[#999] mb-1">
              {/* Fake logo icon block */}
              <div className="w-[18px] h-[18px] bg-gray-300 rounded-md flex items-center justify-center mr-1">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-[16px] font-black tracking-widest ml-1 text-gray-400">京东金融</span>
          </div>
          <div className="flex items-center w-[160px] justify-between">
              <div className="h-px bg-gray-300 w-4"></div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-gray-400 ml-1">简单 · 快捷 · 安全</span>
              <div className="h-px bg-gray-300 w-4"></div>
          </div>
      </div>

    </div>
  );
}
