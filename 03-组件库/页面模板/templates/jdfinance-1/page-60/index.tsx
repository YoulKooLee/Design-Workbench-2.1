/**
 * @name 金条借款说明弹窗页 (page-65)
 */
import React from 'react';
import './style.css';

export default function JDJintiaoExplanationModal() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none overflow-hidden text-[#111]">
      
      {/* 
        ========================================================================
         BACKGROUND LAYER (Fake Jintiao Page Behind)
        ========================================================================
      */}
      <div className="bg-underlay w-full flex flex-col px-[14px] pt-[52px]">
          <div className="flex justify-between items-center mb-6">
              <svg className="w-6 h-6 text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[18px] font-bold tracking-widest ml-4">金条借款平台</span>
              <div className="flex space-x-4 pr-1">
                  <div className="flex flex-col items-center">
                     <svg className="w-5 h-5 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                     </svg>
                     <span className="text-[10px] mt-1 text-[#444]">客服</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <svg className="w-5 h-5 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                     </svg>
                     <span className="text-[10px] mt-1 text-[#444]">更多</span>
                  </div>
              </div>
          </div>
          <div className="flex items-center space-x-1.5 text-[12px] text-[#b67332] bg-[#fcf4e8] px-3 py-1.5 rounded-[4px] mb-[40px]">
             <svg className="w-3.5 h-3.5 text-[#b67332]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/></svg>
             <span>您的信贷信息会如实上报至人民银行征信系统...</span>
          </div>
          <div className="text-[#999] text-[13px] mb-2 px-2">十万</div>
          <div className="text-[54px] font-bold font-sans tracking-tight leading-none px-1 border-b border-gray-300 pb-12">
             <span className="text-[26px] font-normal mr-[4px]">¥</span>200000
          </div>
      </div>

      <div className="dark-mask"></div>

      {/* 
        ========================================================================
         BOTTOM SHEET MODAL
        ========================================================================
      */}
      <div className="bottom-sheet shadow-2xl">
          
          {/* Header & Tabs */}
          <div className="w-full h-[60px] flex items-center justify-center relative mb-[15px]">
              
              <div className="absolute top-[0] w-full flex justify-center text-[18px] text-[#ccc] transform -translate-y-4 opacity-40 pointer-events-none filter blur-[1px]">
                  灵活还 按期还
              </div>

              <div className="flex space-x-[26px] items-baseline pl-[20px]">
                 <span className="tab-inactive tracking-widest pl-[2px]">灵活还</span>
                 <span className="tab-active tracking-widest">按期还</span>
              </div>
              <div className="absolute right-[20px] top-[20px] close-icon-btn">
                 <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </div>
          </div>

          {/* Example Info Box */}
          <div className="example-box mb-[28px]">
              
              <div className="text-[#db7e35] text-[17px] font-bold tracking-widest mb-[6px] relative z-10 flex items-center">
                  举个例子<span className="text-[20px] ml-[2px] relative top-[3px]">*</span>
              </div>
              <div className="w-[20px] h-[1.5px] bg-[#eabcd0] opacity-80 mb-[16px] relative z-10"></div>
              
              <p className="text-[#db7e35] text-[15px] font-medium leading-[1.65] mb-[24px] tracking-wide relative z-10 pr-[10px]">
                  小明借30000元，分3期，月利率0.95%，提前结清按照按日计息<span className="font-sans">（</span>日利率 = 0.065%<span className="font-sans">）</span>进行计算
              </p>

              {/* Monthly Interest Section */}
              <div className="text-[#444] text-[15px] mb-[12px] tracking-widest font-bold">每月利息</div>
              <div className="formula-group mb-[32px]">
                  <div className="formula-block">
                      <span className="formula-text">30000元</span>
                      <span className="formula-note">借款本金</span>
                  </div>
                  <span className="formula-operator relative top-[3px]">×</span>
                  <div className="formula-block">
                      <span className="formula-text">0.95%</span>
                      <span className="formula-note">月利率</span>
                  </div>
                  <span className="formula-operator relative top-[3px] mx-[6px] text-gray-500">=</span>
                  <div className="formula-block ml-[2px]">
                      <span className="formula-text-red">285元</span>
                      <span className="formula-note">每月利息</span>
                  </div>
              </div>

              {/* Default Fee Section */}
              <div className="text-[#444] text-[15px] mb-[12px] tracking-widest font-bold">1个月零3天后提前结清，需交违约金</div>
              <div className="formula-group pr-[10px]">
                  
                  {/* First row of the long formula wrapping manually */}
                  <div className="w-full flex flex-wrap items-start">
                     <div className="formula-block">
                         <span className="formula-text">30000元</span>
                         <span className="formula-note">剩余本金</span>
                     </div>
                     <span className="formula-operator relative top-[3px]">×</span>
                     <div className="formula-block">
                         <span className="formula-text">0.065%</span>
                         <span className="formula-note"></span> 
                     </div>
                     <span className="formula-operator relative top-[3px] mx-[4px]">×</span>
                     <div className="formula-block">
                         <span className="formula-text">30天</span>
                         <span className="formula-note whitespace-nowrap">借款天数</span>
                     </div>
                     <span className="formula-operator relative top-[3px] mx-[6px]">+</span>
                     <div className="formula-block">
                         <span className="formula-text">20000元</span>
                         <span className="formula-note">剩余本金</span>
                     </div>
                     <span className="formula-operator relative top-[3px]">×</span>
                     <div className="formula-block">
                         <span className="formula-text">0.065%</span>
                         <span className="formula-note"></span>
                     </div>
                     <span className="formula-operator relative top-[3px] mx-[2px]">×</span>
                     <div className="formula-block">
                         <span className="formula-text">3天</span>
                         <span className="formula-note"></span>
                     </div>
                  </div>
                  
                  {/* Extension line of the formula */}
                  <div className="w-full flex flex-wrap items-start mt-[10px]">
                     <span className="formula-operator ml-[2px] mr-[8px] relative top-[4px] text-[14px]">-</span>
                     <div className="formula-block">
                         <span className="formula-text">285元</span>
                         <span className="formula-note">已还利息</span>
                     </div>
                     <span className="formula-operator relative top-[3px] mx-[8px] text-gray-500">=</span>
                     <div className="formula-block ml-[2px]">
                         <span className="formula-text-red">339元</span>
                         <span className="formula-note"></span>
                     </div>
                  </div>

              </div>
          </div>

          {/* Legal / Policy explanation */}
          <div className="px-[20px] mb-[28px]">
              <div className="flex items-center mb-[18px]">
                  <div className="w-[5px] h-[5px] bg-[#333] rounded-full mr-[8px]"></div>
                  <span className="text-[#111] font-bold text-[15px] tracking-widest">息费说明</span>
              </div>
              <div className="text-[14.5px] text-[#333] tracking-wider pl-[13px] mb-[12px] font-medium opacity-90">
                  总利息 = 借款本金 × 月利率 × 借款月数
              </div>
              <div className="text-[12.5px] text-[#999] tracking-wider pl-[13px]">
                  本产品展示利率均以单利计算
              </div>
          </div>

          {/* Main Action Button */}
          <div className="px-[16px]">
               <div className="cta-orange">我知道了</div>
          </div>

      </div>
    </div>
  );
}
