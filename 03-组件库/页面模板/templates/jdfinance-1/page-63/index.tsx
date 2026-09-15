/**
 * @name 金条借款主干操作页 (page-68)
 */
import React from 'react';
import './style.css';

export default function JDJintiaoMain() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-canvas overflow-y-auto pb-[130px]">
      
      {/* 
        ========================================================================
         GLOBAL HEADER
        ========================================================================
      */}
      <div className="w-full flex-col pt-[52px] bg-canvas pb-[10px]">
          
          {/* Top Navbar */}
          <div className="flex justify-between items-center mb-[18px] px-[14px]">
              <svg className="w-[24px] h-[24px] text-[#111] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[18px] font-bold tracking-widest ml-4">金条借款平台</span>
              <div className="flex space-x-4 pr-1">
                  <div className="flex flex-col items-center">
                     <svg className="w-[20px] h-[20px] text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                     </svg>
                     <span className="text-[10px] mt-1 text-[#444]">客服</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <svg className="w-[20px] h-[20px] text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                     </svg>
                     <span className="text-[10px] mt-1 text-[#444]">更多</span>
                  </div>
              </div>
          </div>

          {/* Warning Mock Banner */}
          <div className="flex items-center space-x-[6px] text-[12.5px] text-[#b67332] bg-[#fdf5e7] px-[12px] mx-[14px] py-[6px] rounded-[4px] mb-[28px]">
             <svg className="w-[14px] h-[14px] text-[#d69046]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/></svg>
             <span className="truncate flex-1 tracking-wider opacity-80">仅用于个人消费，请理性借用，如您是在校学生，请勿借款...</span>
          </div>

          {/* Core Amount View */}
          <div className="px-[16px]">
             <div className="text-[13px] text-[#a0a0a0] mb-[4px] tracking-widest pl-[4px]">十万</div>
             <div className="text-[52px] font-bold font-sans tracking-tight leading-none px-1 border-b-[0.5px] border-gray-300 pb-[10px]">
                 <span className="text-[24px] font-normal mr-[4px]">¥</span>200000
             </div>
          </div>
      </div>

      {/* 
        ========================================================================
         MAIN CONTROL CARD 
        ========================================================================
      */}
      <div className="jd-card mt-[15px]">
          
          {/* Top Tabs */}
          <div className="flex w-full items-start px-[10px]">
              
              <div className="tab-column">
                  <div className="tab-title-active">灵活还</div>
                  <div className="tab-sub-active">
                     年利率(单利) <span className="font-sans">16.1%</span> <span className="text-[#ccc] text-[11px] font-sans line-through opacity-80 ml-[2px]">18.3%</span>
                  </div>
                  <div className="tab-underline"></div>
              </div>

              <div className="tab-divider"></div>

              <div className="tab-column pr-[15px]">
                  <div className="flex items-center tab-title-inactive opacity-90">
                      按期还
                      <div className="badge-red">24期</div>
                  </div>
                  <div className="tab-sub-inactive">
                      按计划还款，息费更低
                  </div>
              </div>
          </div>

          {/* Alert Mini Box underneath */}
          <div className="alert-box">
              <span className="text-[13px] text-[#444] tracking-wider font-medium">按天算利息，提前<span className="text-[#e77a28]">还款无违约金</span></span>
              <svg className="w-[12px] h-[12px] text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>

          {/* Internal Setting Rows */}
          <div className="px-[2px]">
              
              <div className="list-row cursor-pointer">
                  <span className="list-title">优惠</span>
                  <div className="list-value-box">
                      <span className="text-[14px] text-[#111]">
                          已享<span className="text-[#f23c3c] font-sans font-bold text-[15px]">1</span>项优惠 <span className="text-[#f23c3c] font-medium mr-[2px]">预计省¥<span className="font-sans font-bold text-[15px]">2499.62</span></span>
                      </span>
                      <svg className="chevron-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
              </div>

              <div className="list-row cursor-pointer pt-[24px]">
                  <span className="list-title">借多久</span>
                  <div className="list-value-box items-center">
                      <div className="flex flex-col items-end mr-[4px]">
                          <span className="text-[16px] text-[#111] font-bold tracking-wide">
                             <span className="font-sans">12</span>个月
                          </span>
                          <span className="text-[12px] text-[#999] mt-[6px] tracking-wide">
                             首期<span className="font-sans">07</span>月<span className="font-sans">19</span>日 还<span className="font-sans">¥18,154.18</span>
                          </span>
                      </div>
                      <svg className="chevron-right mt-[-10px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
              </div>

              <div className="list-row cursor-pointer pt-[24px] border-none">
                  <div className="list-title">
                      收款账户
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <div className="list-value-box">
                      <span className="text-[#444] text-[15px]">请选择</span>
                      <svg className="chevron-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
              </div>

          </div>
      </div>

      {/* 
        ========================================================================
         CARD 2: SERVICE AGENCY
        ========================================================================
      */}
      <div className="jd-card">
          <div className="list-row border-none py-[6px] cursor-pointer">
              <span className="list-title">服务机构</span>
              <div className="list-value-box">
                  <span className="text-[#444] text-[15px]">外贸信托、京东小贷等</span>
                  <svg className="chevron-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 3: INTEREST DISCOUNT CHECKBOX
        ========================================================================
      */}
      <div className="jd-card mb-[40px]">
          <div className="list-row border-none py-[4px] cursor-pointer items-start">
              <div className="flex flex-col">
                  <div className="list-title mb-[6px]">
                      息费立减<span className="font-sans">44.62</span>元
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                  </div>
                  <div className="text-[12.5px] text-[#b0b0b0] tracking-wide">
                      由京东盛际小贷为您提供免息优惠
                  </div>
              </div>
              <div className="h-full flex items-center pt-[10px]">
                  <div className="custom-checkbox">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         GLOBAL FIXED BOTTOM CTA
        ========================================================================
      */}
      <div className="bottom-cta-area">
          <div className="btn-submit">确认借款</div>
          <div className="security-tag">
             {/* Simple hand/shield mock SVG */}
             <svg className="w-[14px] h-[14px] mr-[4px] text-[#ebd4c5]" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
             </svg>
             京东金融全程保障您的账户安全
          </div>
      </div>

    </div>
  );
}
