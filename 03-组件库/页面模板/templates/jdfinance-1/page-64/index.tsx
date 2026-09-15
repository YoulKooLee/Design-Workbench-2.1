/**
 * @name 金条借款核心首页 (page-69)
 */
import React from 'react';
import './style.css';

export default function JDJintiaoHome() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-canvas overflow-y-auto pb-[70px]">
      
      {/* 
        ========================================================================
         BACKGROUND
        ========================================================================
      */}
      <div className="hero-golden-bg"></div>

      {/* 
        ========================================================================
         TRANSPARENT HEADER & BADGES
        ========================================================================
      */}
      <div className="w-full relative z-20 flex flex-col pt-[52px]">
          
          <div className="flex justify-between items-center mb-[18px] px-[14px]">
              <svg className="w-[24px] h-[24px] text-white cursor-pointer active:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="flex items-center text-white ml-[6px]">
                  <span className="text-[19px] font-bold tracking-widest mr-2">金条借款</span>
                  <span className="text-[12px] opacity-80 mt-[3px] tracking-wide font-normal">简单·快捷·安全</span>
              </div>
              <div className="flex space-x-[18px] pr-1 text-white">
                  <div className="flex flex-col items-center">
                     <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                     </svg>
                     <span className="text-[10px] mt-1 opacity-90">客服</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                     </svg>
                     <span className="text-[10px] mt-1 opacity-90">更多</span>
                  </div>
              </div>
          </div>

          <div className="service-badge-strip">
              <div className="service-badge-item">
                  <div className="service-badge-icon"><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                  随时可还款
              </div>
              <div className="service-badge-item">
                  <div className="service-badge-icon"><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                  极速秒到账
              </div>
              <div className="service-badge-item">
                  <div className="service-badge-icon"><svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                  京东自营平台
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 1: MAIN ASSET VIEW
        ========================================================================
      */}
      <div className="main-asset-card pt-[35px] flex flex-col items-center">
          
          <div className="flex items-center justify-center mb-[12px] relative z-10 w-full">
              <span className="text-[16px] text-[#222]">最高可借现金(元)</span>
              <div className="asset-tag-orange">
                  <svg className="w-[10px] h-[10px] mr-[1px]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.642 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.358-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/></svg>
                  保障中
              </div>
          </div>

          <div className="huge-amount relative z-10">
              208,000
          </div>

          <div className="promo-temp-strip relative z-10">
              含临时额度<span className="font-sans font-bold text-[15px]">28000</span>元，部分于<span className="font-sans font-bold text-[15px]">06</span>月<span className="font-sans font-bold text-[15px]">19</span>日过期
          </div>

          <div className="text-[14px] text-[#555] mb-[15px] relative z-10 tracking-wide font-medium">
              年利率<span className="font-sans">16.1%</span> <span className="font-sans line-through text-[#999] opacity-80 mx-[2px]">18.3%</span>，<span className="font-sans">1</span>千借<span className="font-sans">1</span>天，利息<span className="font-sans">0.44</span>元
          </div>

          <div className="btn-huge-borrow relative z-10">
              我要借款
          </div>

          <div className="text-[12px] text-[#c0c0c0] mb-[20px] flex items-center justify-center tracking-wide w-full relative z-10 font-medium">
              贷款服务由承德银行提供
              <svg className="w-[12px] h-[12px] ml-1 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
          </div>

          <div className="warning-scroller w-full relative z-10">
              <svg className="w-[16px] h-[16px] mr-[10px] text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 11c-1.657 0-3 1.343-3 3v2a3 3 0 003 3h0a3 3 0 003-3v-2c0-1.657-1.343-3-3-3zM9.5 7.5A2.5 2.5 0 0112 5h0a2.5 2.5 0 012.5 2.5M15 13h1.5a1.5 1.5 0 011.5 1.5v.5a1.5 1.5 0 01-1.5 1.5" />
              </svg>
              <div className="flex-1 truncate tracking-wider font-light">宁来电不会提到：“共享屏幕”、“注销账户”、“调低利率”</div>
              <svg className="w-[14px] h-[14px] ml-[5px] text-[#ccc] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         CARD 2: OPPORTUNITY PROMO
        ========================================================================
      */}
      <div className="promo-card">
          <div className="promo-inner-border flex items-center justify-between">
              
              <div className="promo-top-left-tag">618限时专享</div>
              
              <div className="flex flex-col flex-1 pl-[4px]">
                  <div className="text-[17px] font-bold text-[#111] tracking-wide mb-[4px]">
                      你有一个<span className="text-[#e26425]">降息机会</span>待使用
                  </div>
                  <div className="text-[12.5px] text-[#999] tracking-wide">
                      100%可降 借款后抽清空购物车机会
                  </div>
              </div>

              <div className="btn-claim-orange cursor-pointer active:opacity-90">
                  立即领取
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         RECOMMENDATION TABS & CARDS
        ========================================================================
      */}
      <div className="rec-header">
          <div className="flex items-center">
              <div className="rec-tab cursor-pointer">产品推荐</div>
              <div className="rec-tab-inactive cursor-pointer">查看更多</div>
          </div>
          <div className="service-avatar-btn cursor-pointer active:opacity-80">
              <div className="relative mr-[4px]">
                  <img src="data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='12' fill='%23e0e0e0'/><circle cx='12' cy='8' r='4' fill='%23999'/><path d='M4 20c0-4 4-7 8-7s8 3 8 7' fill='%23999'/></svg>" className="w-[26px] h-[26px] rounded-full" alt="avatar" />
                  <div className="absolute bottom-[0px] right-[-2px] w-[10px] h-[10px] rounded-full border-[1.5px] border-white bg-[#00c55a]"></div>
              </div>
              <span className="text-[#111] font-bold text-[12.5px]">点我咨询</span>
          </div>
      </div>

      <div className="peek-card">
          <div className="flex items-center">
              <div className="w-[20px] h-[20px] rounded-[4px] bg-[#e66c24] flex items-center justify-center mr-[8px]">
                 <span className="text-white text-[12px] font-bold font-serif leading-none italic relative top-[1px]">C</span>
              </div>
              <span className="text-[15px] text-[#111] font-bold tracking-wide">宁波银行·年化利率低至</span>
          </div>
      </div>

      {/* 
        ========================================================================
         NATIVE BOTTOM TAB BAR
        ========================================================================
      */}
      <div className="tab-bar-fixed">
          <div className="tab-item active">
              <div className="icon-borrow mb-[4px]">¥</div>
              <span className="font-bold text-[10px]">借款</span>
          </div>
          <div className="tab-item">
              <div className="icon-repay mb-[4px]"></div>
              <span className="font-medium text-[10px]">还款</span>
          </div>
          <div className="tab-item">
              <div className="icon-my mb-[4px]"></div>
              <span className="font-medium text-[10px]">我的</span>
          </div>
      </div>

    </div>
  );
}
