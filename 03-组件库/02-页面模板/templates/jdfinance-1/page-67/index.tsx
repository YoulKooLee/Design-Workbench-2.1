/**
 * @name 白条权益-新手引导弹层 (page-72)
 */
import React from 'react';
import './style.css';

export default function JDBaitiaoWalkthrough() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-[#f4f5f7] overflow-hidden">
      
      {/* 
        ========================================================================
         BACKGROUND UNDERLAY (Faded view of page-71 structural bottom)
        ========================================================================
      */}
      <div className="w-full h-full absolute inset-0 z-0 bg-[#f4f5f7] pointer-events-none">
          <div className="bg-ice-page"></div>
          
          {/* Header area (dimmed out) */}
          <div className="w-full relative z-20 flex flex-col pt-[52px] px-[16px] opacity-10">
              <div className="flex justify-between items-center">
                  <svg className="w-[24px] h-[24px] text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-[18px] font-bold tracking-widest text-[#111]">白条权益</span>
              </div>
          </div>

          <div className="mt-[60px] mx-[16px] text-black font-bold text-[18px] opacity-10">月月领</div>

          <div className="mx-[16px] mt-4 grid grid-cols-3 gap-[10px] opacity-[0.15]">
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">3.18</div></div>
                  <div className="btn-red-pill">选这个</div>
              </div>
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">3</div></div>
                  <div className="btn-red-pill">选这个</div>
              </div>
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">9</div></div>
                  <div className="btn-red-pill">选这个</div>
              </div>
          </div>

          <div className="mx-[16px] mt-8 text-black font-bold text-[18px] opacity-20">金融特权</div>
      </div>

      {/* 
        ========================================================================
         THE DARK MASK (dim the entire background)
        ========================================================================
      */}
      <div className="dark-mask"></div>

      {/* 
        ========================================================================
         WALKTHROUGH SPOTLIGHT OVERLAY
        ========================================================================
      */}
      <div className="walkthrough-layer">
          <div className="text-glow tracking-wide mb-[10px]">
              向下滑动，金融特权和白条服务<br/>
              已为你解锁~
          </div>

          <button className="btn-outline-glow">
              开启全新权益
          </button>

          <div className="scroll-indicator-box">
              <div className="glow-dot"></div>
              <div className="glow-line"></div>
          </div>
      </div>



      {/* 
        ========================================================================
         BOTTOM SHEET MODAL (白条服务)
        ========================================================================
      */}
      <div className="bottom-modal shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          


          {/* Modal Header */}
          <div className="flex items-end mb-[20px] px-2">
              <span className="text-[20px] font-bold text-[#111] leading-none mb-[2px]">白条服务</span>
              <span className="text-[13px] text-[#999] ml-3 tracking-wide leading-none">产品特色服务</span>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-2 gap-[10px]">
              
              {/* Card 1: 分期无忧退 */}
              <div className="srv-card-red cursor-pointer">
                  <div className="srv-super-title">分期无忧退</div>
                  <div className="srv-main-title">不限次数</div>
                  <div className="srv-action">
                      点我领 
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
                  <div className="icon-mock-cart"></div>
              </div>

              {/* Card 2: 延期还款 */}
              <div className="srv-card-blue cursor-pointer">
                  <div className="srv-super-title">延期还款</div>
                  <div className="srv-main-title">账单延1期</div>
                  <div className="srv-action">
                      去查看 
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
                  <div className="icon-mock-calendar"></div>
              </div>

              {/* Card 3: 忘还无忧 */}
              <div className="srv-card-cyan cursor-pointer">
                  <div className="srv-super-title">
                      忘还无忧
                      <span className="text-[10px] ml-1 px-[4px] border border-[#d0e0ed] text-[#869fc4] rounded-[3px] scale-90 origin-left">守约分≥600</span>
                  </div>
                  <div className="srv-main-title">免服务费1次</div>
                  <div className="icon-mock-bell"></div>
              </div>

              {/* Card 4: 来电提醒 */}
              <div className="srv-card-pink cursor-pointer">
                  <div className="srv-super-title">来电提醒</div>
                  <div className="srv-main-title">还款提醒</div>
                  <div className="icon-mock-phone">🍎</div>
              </div>
          </div>

      </div>

    </div>
  );
}
