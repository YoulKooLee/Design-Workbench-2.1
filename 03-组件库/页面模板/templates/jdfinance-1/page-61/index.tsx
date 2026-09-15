/**
 * @name 金条借款平台-还款说明页 (page-66)
 */
import React from 'react';
import './style.css';

export default function JDJintiaoRepayTerms() {

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
         BOTTOM SHEET MODAL (SCROLLABLE MODE)
        ========================================================================
      */}
      <div className="bottom-sheet flex flex-col h-[75%] shadow-2xl overflow-hidden pb-[0px]">
          
          {/* Header & Tabs (Fixed top) */}
          <div className="w-full flex-shrink-0 h-[60px] flex items-center justify-center relative mb-[5px] bg-white z-20">
              
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

          {/* Scrollable Document Area */}
          <div className="flex-1 overflow-y-auto px-[22px] pb-[100px]">
              
              {/* Bullet Section 1 */}
              <div className="mb-[24px] mt-[10px]">
                  <div className="section-title">
                      <div className="bullet-dot"></div>
                      适合人群
                  </div>
                  <div className="section-desc">
                      按计划稳定还款的人，<span className="text-[#db7e35]">息费比按日计息低</span>
                  </div>
              </div>

              {/* Bullet Section 2 */}
              <div className="mb-[28px]">
                  <div className="section-title">
                      <div className="bullet-dot"></div>
                      还款说明
                  </div>
                  <div className="section-desc">
                      建议按期还款，提前结清收取违约金
                  </div>
                  <div className="section-desc-light pr-[4px]">
                      提前结清时，按照按日计息(日利率=0.06%)方式计算应收总额，扣减已还利息后作为提前结清违约金，向您收取的费用总和折合为综合年化利率后上限将不超过监管规定的定价标准，具体的金额以页面显示为准。
                  </div>
              </div>

              {/* Example Info Box (peeking layout) */}
              <div className="example-box mx-[-4px]">
                  <div className="text-[#db7e35] text-[17px] font-bold tracking-widest mb-[6px] relative z-10 flex items-center">
                      举个例子<span className="text-[20px] ml-[2px] relative top-[3px]">*</span>
                  </div>
                  <div className="w-[20px] h-[1.5px] bg-[#eabcd0] opacity-80 mb-[16px] relative z-10"></div>
                  
                  <p className="text-[#db7e35] text-[15px] font-medium leading-[1.65] mb-[24px] tracking-wide relative z-10 pr-[10px]">
                      小明借30000元，分3期，月利率0.95%，提前结清按照按日计息<span className="font-sans">（</span>日利率 = 0.065%<span className="font-sans">）</span>进行计算
                  </p>

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

                  <div className="text-[#444] text-[15px] mb-[2px] tracking-widest font-bold">1个月零3天后提前结清，需交违约金</div>
              </div>

          </div>

          {/* Fixed Sticky Action Button */}
          <div className="absolute bottom-0 left-0 w-full bg-white px-[15px] pb-[34px] pt-[12px] z-20">
              <div className="cta-orange select-none cursor-pointer active:opacity-90">我知道了</div>
          </div>

      </div>
    </div>
  );
}
