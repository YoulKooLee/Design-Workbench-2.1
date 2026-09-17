/**
 * @name 白条权益-新手引导弹层 (page-74)
 */
import React from 'react';
import './style.css';

export default function JDBaitiaoWalkthroughStep2() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-[#f4f5f7] overflow-hidden">
      
      {/* 
        ========================================================================
         BACKGROUND UNDERLAY (Faded view of page-71 Default state)
        ========================================================================
      */}
      <div className="w-full h-full absolute inset-0 z-0 bg-[#f4f5f7] pointer-events-none">
          <div className="bg-ice-page"></div>
          
          <div className="w-full relative z-20 flex flex-col pt-[52px] px-[16px] opacity-20">
              <div className="flex justify-between items-center">
                  <svg className="w-[24px] h-[24px] text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-[18px] font-bold tracking-widest text-[#111]">白条权益</span>
              </div>
          </div>

          <div className="mt-[200px] mx-[16px] text-black font-bold text-[18px] opacity-15">白条V1</div>

          <div className="mt-[70px] mx-[16px] text-black font-bold text-[18px] opacity-15">你有超大鹅红包待领取</div>

          <div className="mx-[16px] mt-8 text-black font-bold text-[18px] opacity-10">金融特权</div>

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
              每月尊享权益，神券免费领<br/>
              好物1分购，每日10点限量发放
          </div>

          <button className="btn-outline-glow active:opacity-70">
              下一步 (2/4)
          </button>

          <div className="scroll-indicator-box">
              <div className="glow-dot"></div>
              <div className="glow-line"></div>
          </div>
      </div>



      {/* 
        ========================================================================
         BOTTOM SHEET MODAL (月月领)
        ========================================================================
      */}
      <div className="skip-tag active:opacity-70 cursor-pointer">
          跳过
      </div>


      <div className="bottom-modal shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
          
          {/* 3D Duck Emoji Mock Floating VISUALLY above the sheet */}
          <div className="floating-duck-group z-[70]">
              🦆
              <div className="sunglasses">🕶️</div>
              <div className="trophy">🏆</div>
          </div>
          
          {/* Modal Header */}
          <div className="flex items-end mb-[20px] px-1">
              <span className="text-[20px] font-bold text-[#111] leading-none mb-[1px]">月月领</span>
              <span className="text-[12px] text-[#999] ml-2 tracking-wide leading-none">每月领一次 每天10点开启</span>
          </div>

          {/* Service Cards Matrix (Grid 3 Cols) */}
          <div className="grid-3-cards">
              
              {/* Card 1: 白条优惠券 */}
              <div className="card-3-col">
                  
                  {/* CSS Ticket Mock */}
                  <div className="coupon-ticket-v">
                      <div className="ctv-top">12<span className="text-[11px] ml-[1px] mb-[2px]">期</span></div>
                      <div className="ctv-bottom tracking-wider">免息券</div>
                  </div>

                  <div className="col-title">白条优惠券</div>
                  <div className="col-sub">12期免息</div>
                  
                  <div className="btn-solid-red cursor-pointer active:opacity-80">
                      选这个
                  </div>
              </div>

              {/* Card 2: 瑞幸咖啡券 */}
              <div className="card-3-col">
                  
                  {/* CSS Luckin Mock */}
                  <div className="mock-luckin">
                      🦌
                  </div>

                  <div className="col-title">瑞幸咖啡券</div>
                  <div className="col-sub-gray">每日20份</div>
                  
                  {/* Split Button ! */}
                  <div className="btn-split-price cursor-pointer active:opacity-80">
                      <div className="btn-split-left">
                          <span className="price-main">¥0.01</span>
                          <span className="price-sub">已补¥99</span>
                      </div>
                      <div className="btn-split-right">
                          领
                      </div>
                  </div>
              </div>

              {/* Card 3: QQ音乐会员 */}
              <div className="card-3-col">
                  
                  {/* CSS QQ Music Mock */}
                  <div className="mock-qqmusic">
                      <div className="qq-text">QQ音乐</div>
                      <div className="qq-badge">
                          <svg className="w-[8px] h-[8px] object-cover mr-[2px]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M11.3 1.046A12.018 12.018 0 0115 5c0 5.225-3.34 9.67-8 11.317A12.02 12.02 0 013 5c1.054 0 2-.946 2-2 0-1.054-.946-2-2-2 0 0 10.3 0 10.3.046zM11 14a1 1 0 10-2 0V7a1 1 0 102 0v7z"/>
                          </svg>
                          超级会员
                      </div>
                  </div>

                  <div className="col-title">QQ音乐会员</div>
                  <div className="col-sub-gray">每日10份</div>
                  
                  {/* Split Button ! */}
                  <div className="btn-split-price cursor-pointer active:opacity-80">
                      <div className="btn-split-left">
                          <span className="price-main">¥0.01</span>
                          <span className="price-sub">已补¥99</span>
                      </div>
                      <div className="btn-split-right">
                          领
                      </div>
                  </div>
              </div>

          </div>

          <div className="modal-handle-dash"></div>

      </div>

    </div>
  );
}
