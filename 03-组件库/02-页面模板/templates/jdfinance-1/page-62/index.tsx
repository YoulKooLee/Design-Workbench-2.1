/**
 * @name 金条借款平台-借多久(还款计划)页 (page-67)
 */
import React from 'react';
import './style.css';

export default function JDJintiaoTermSelect() {

  const timelineData = [
    { title: '首期',  date: '07-19', amount: '¥18,108.80', principal: '15,475.4',  interest: '2,633.40' },
    { title: '第2期', date: '08-19', amount: '¥18,108.80', principal: '15,598.71', interest: '2,510.09' },
    { title: '第3期', date: '09-19', amount: '¥18,108.80', principal: '15,811.47', interest: '2,297.33' },
    { title: '第4期', date: '10-19', amount: '¥18,108.80', principal: '16,094.29', interest: '2,014.51' },
    { title: '第5期', date: '11-19', amount: '¥18,108.80', principal: '16,246.67', interest: '1,862.13' },
    { title: '第6期', date: '12-19', amount: '¥18,108.80', principal: '16,521.19', interest: '1,587.61' },
  ];

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
          <div className="flex items-center space-x-1.5 text-[12px] text-[#b67332] bg-[#fcf4e8] px-3 py-1.5 rounded-[4px] mb-[40px] opacity-40">
             <svg className="w-3.5 h-3.5 text-[#b67332]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/></svg>
             <span>请勿借款。您的信贷信息会如实上报至人民银行征信系统，请...</span>
          </div>
          <div className="text-[#999] text-[13px] mb-2 px-2">十万</div>
          <div className="text-[54px] font-bold font-sans tracking-tight leading-none px-1 border-b border-gray-300 pb-12">
             <span className="text-[26px] font-normal mr-[4px]">¥</span>200000
          </div>
      </div>

      <div className="dark-mask"></div>

      {/* 
        ========================================================================
         BOTTOM SHEET MODAL (Fixed Size / Internal Scroll)
        ========================================================================
      */}
      <div className="bottom-sheet h-[72%] shadow-2xl">
          
          {/* Header */}
          <div className="w-full flex-shrink-0 h-[64px] flex items-center justify-between px-[20px] relative z-20">
              <span className="text-[22px] text-[#111] font-bold tracking-widest mt-[4px]">借多久</span>
              <div className="close-icon-btn mt-[2px]">
                 <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </div>
          </div>

          {/* Core Scroll Area */}
          <div className="flex-1 overflow-y-auto w-full flex flex-col pb-[30px]" style={{ WebkitOverflowScrolling: 'touch' }}>
              
              {/* Horizontal Scroll Selector */}
              <div className="term-scroll-container">
                  <div className="term-box">
                      <div className="term-tag">按期还专享</div>
                      <span className="font-sans">24</span>个月
                  </div>
                  <div className="term-box">
                      <div className="term-tag">按期还专享</div>
                      <span className="font-sans">18</span>个月
                  </div>
                  <div className="term-box active">
                      {/* Using HTML checkmark inside the CSS injected triangle */}
                      <svg className="term-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans">12</span>个月
                  </div>
                  <div className="term-box blur-[1px] opacity-40">
                      <span className="font-sans">6</span>个月
                  </div>
              </div>

              {/* Loan Summary Info */}
              <div className="summary-strip">
                  <div className="summary-bar-indicator"></div>
                  <span className="summary-main-text tracking-wide">
                      借满<span className="font-sans px-[1px]">12</span>个月，总利息<span className="font-sans font-bold">¥17,805.63</span>
                  </span>
                  <span className="summary-strike-text">¥20,349.89</span>
                  <svg className="w-[14px] h-[14px] text-[#ccc] ml-[6px]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
              </div>

              {/* Order Headers (With smooth left-to-right fade gradient background mapping) */}
              <div className="order-tab-container">
                  <div className="order-tab tracking-wider">第一单</div>
                  <div className="order-tab-faint tracking-wider">第二单</div>
              </div>

              {/* Repayment Timeline List */}
              <div className="timeline-container pr-[16px]">
                  {timelineData.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                          
                          <div className="timeline-dot"></div>
                          
                          {/* Timeline Date Info */}
                          <div className="timeline-left">
                              <span className="tracking-widest">{item.title}</span>
                              <span className="timeline-date tracking-widest">{item.date}</span>
                          </div>

                          {/* Timeline Money Breakdown */}
                          <div className="timeline-right">
                              <span className="timeline-amount">{item.amount}</span>
                              <span className="timeline-subtext">
                                  本金 <span className="font-sans">{item.principal}</span>元 + 利息约<span className="font-sans">{item.interest}</span>元
                              </span>
                          </div>
                      </div>
                  ))}
                  
                  {/* Faded out item to indicate more content down below */}
                  <div className="timeline-item opacity-40">
                      <div className="timeline-dot opacity-40"></div>
                      <div className="timeline-left">
                          <span className="tracking-widest">第7期</span>
                          <span className="timeline-date tracking-widest">01-19</span>
                      </div>
                      <div className="timeline-right">
                          <span className="timeline-amount">¥18,108.80</span>
                          <span className="timeline-subtext">
                              本金 <span className="font-sans">16,801.44</span>元 + 利息约<span className="font-sans">1,307.36</span>元
                          </span>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
}
