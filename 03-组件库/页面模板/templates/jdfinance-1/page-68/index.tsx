/**
 * @name 白条权益-新手引导弹层 (page-73)
 */
import React from 'react';
import './style.css';

export default function JDBaitiaoWalkthroughStep3() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-[#f4f5f7] overflow-hidden">
      
      {/* 
        ========================================================================
         BACKGROUND UNDERLAY (Faded view of page-71 structural bottom)
        ========================================================================
      */}
      <div className="w-full h-full absolute inset-0 z-0 bg-[#f4f5f7] pointer-events-none transform -translate-y-[50px]">
          <div className="bg-ice-page"></div>
          
          <div className="w-full relative z-20 flex flex-col pt-[52px] px-[16px] opacity-20">
              <div className="flex justify-between items-center">
                  <svg className="w-[24px] h-[24px] text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-[18px] font-bold tracking-widest text-[#111]">白条权益</span>
              </div>
          </div>

          <div className="mt-[200px] mx-[16px] text-[#4f1e00] font-bold text-[18px] opacity-20">你有超大鹅红包待领取</div>

          <div className="mt-[30px] mx-[16px] text-black font-bold text-[18px] opacity-20">月月领 <span className="text-[12px] text-[#999] opacity-70">每月领1次</span></div>

          <div className="mx-[16px] mt-4 grid grid-cols-3 gap-[10px] opacity-[0.2]">
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">3.18</div></div>
                  <div className="btn-solid-red text-[12px] py-[4px] w-[80%] rounded-[10px]">选这个</div>
              </div>
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">3</div></div>
                  <div className="btn-solid-red text-[12px] py-[4px] w-[80%] rounded-[10px]">选这个</div>
              </div>
              <div className="coupon-card">
                  <div className="coupon-ticket"><div className="coupon-ticket-top">9</div></div>
                  <div className="btn-solid-red text-[12px] py-[4px] w-[80%] rounded-[10px]">选这个</div>
              </div>
          </div>
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

          <button className="btn-outline-glow active:opacity-70">
              下一步 (3/4)
          </button>

          <div className="scroll-indicator-box">
              <div className="glow-dot"></div>
              <div className="glow-line"></div>
          </div>
      </div>

      {/* 3D Duck Emoji Mock Floating above the sheet */}
      <div className="floating-duck-group z-[70]">
          🦆
          <div className="sunglasses">🕶️</div>
          <div className="trophy">🏆</div>
      </div>

      {/* 
        ========================================================================
         BOTTOM SHEET MODAL (金融特权)
        ========================================================================
      */}
      <div className="bottom-modal shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
          
          <div className="skip-tag active:opacity-70 cursor-pointer">
              跳过
          </div>

          {/* Modal Header */}
          <div className="flex items-end mb-[20px] px-1">
              <span className="text-[20px] font-bold text-[#111] leading-none mb-[2px]">金融特权</span>
          </div>

          {/* Service Cards Matrix (Grid Large) */}
          <div className="grid grid-cols-2 gap-[12px]">
              
              {/* Card 1: 理财权益卡 */}
              <div className="feat-card-left">
                  
                  {/* CSS 3D Mock for Podium & Card */}
                  <div className="mock-podium-group">
                      <div className="podium-leaves-left">🌿</div>
                      <div className="podium-leaves-right">🌿</div>
                      <div className="podium-base"></div>
                      <div className="podium-card">
                          <div className="podium-star">⭐</div>
                      </div>
                  </div>

                  <div className="feat-title">理财权益卡</div>
                  <div className="feat-sub">限量5000张月卡</div>
                  <div className="btn-solid-red cursor-pointer active:opacity-80 scale-[0.95]">
                      点我领
                  </div>
              </div>

              {/* Card 2: 小金库加息券 */}
              <div className="feat-card-right">
                  
                  {/* CSS 3D Mock for Phone, Hand & Float Coins */}
                  <div className="mock-phone-group">
                      <div className="phone-hand">🖐🏼</div>
                      <div className="phone-device">
                          <div className="phone-screen">📈</div>
                      </div>
                      <div className="float-coin-1"></div>
                      <div className="float-coin-2"></div>
                  </div>

                  <div className="feat-title">小金库加息券</div>
                  <div className="feat-sub">至高加0.5%</div>
                  <div className="btn-solid-red cursor-pointer active:opacity-80 scale-[0.95]">
                      点我领
                  </div>
              </div>

          </div>

      </div>

    </div>
  );
}
