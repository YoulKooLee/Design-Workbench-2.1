/**
 * @name 白条权益-新手引导弹层 (page-75)
 */
import React from 'react';
import './style.css';

export default function JDBaitiaoWalkthroughStep1() {

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

          {/* V Track Indicator Mock Underlay */}
          <div className="w-full relative opacity-15 mt-2">
              <div className="v-line-faded"></div>
              <div className="v-node-faded"></div>
              <div className="v-node-text-faded">V1</div>
              <div className="absolute right-[40px] top-[10px] text-[#8cd1c2] font-bold italic">V2</div>
          </div>

          <div className="mt-[240px] mx-[16px] text-black font-bold text-[18px] opacity-15">你有超大鹅红包待领取</div>
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
         SPOTLIGHT ELEVATED CARD (Floating without Modal)
        ========================================================================
      */}
      <div className="elevated-card-wrapper">
          <div className="elevated-card">
              
              <div className="ec-tag">白条等级</div>
              
              <div className="ec-title">白条<span>V3</span></div>
              <div className="ec-script">Baitiao Vip Member</div>

              <div className="ec-prog-track">
                  <div className="ec-prog-fill"></div>
              </div>
              <div className="ec-prog-sub">
                  还需567成长值升级V5 
                  <span className="ec-prog-icon">i</span>
              </div>

              {/* Hexagon & Ruby Duck Mock */}
              <div className="ec-right-box">
                  <div className="pink-hexagon">
                      <div className="pink-hex-inner">
                          <div className="crown-obj">👑</div>
                          <div className="duck-obj">🦆</div>
                          {/* Hue rotated Diamond to simulate Red Ruby */}
                          <div className="ruby-obj" style={{filter: 'hue-rotate(160deg) drop-shadow(0 4px 6px rgba(0,0,0,0.5))'}}>💎</div>
                          <div className="hand-l">👐</div>
                          <div className="hand-r">👐</div>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* 
        ========================================================================
         WALKTHROUGH LAYER (Arrow pointing UP to the card)
        ========================================================================
      */}
      <div className="walkthrough-layer">
          
          <div className="up-indicator-box">
              <div className="glow-dot-up"></div>
              <div className="glow-line-up"></div>
          </div>

          <div className="text-glow tracking-wide">
              您的白条权益升级啦<br/>
              查看全新等级，横滑发现惊喜
          </div>

          <button className="btn-outline-glow active:opacity-70">
              下一步 (1/4)
          </button>
      </div>

      {/* Skip Button attached to Overlay fixed bottom right */}
      <div className="skip-tag active:opacity-70 cursor-pointer">
          跳过
      </div>

    </div>
  );
}
