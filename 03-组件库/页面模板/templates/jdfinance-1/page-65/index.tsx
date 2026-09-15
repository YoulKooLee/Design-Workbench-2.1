/**
 * @name 白条权益 (page-70)
 */
import React from 'react';
import './style.css';

export default function JDBaitiaoVIP() {

  return (
    <div className="w-full min-h-screen relative font-sans select-none bg-[#f4f5f7] overflow-y-auto pb-8">
      
      {/* Background Underlay */}
      <div className="bg-ice-page"></div>

      {/* 
        ========================================================================
         HEADER
        ========================================================================
      */}
      <div className="w-full relative z-20 flex flex-col pt-[52px] px-[16px]">
          <div className="flex justify-between items-center">
              <svg className="w-[24px] h-[24px] text-brand-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[18px] font-bold tracking-widest text-[#111]">白条权益</span>
              <svg className="w-[24px] h-[24px] text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         V-LEVEL TRACKER
        ========================================================================
      */}
      <div className="v-track-container mt-[20px]">
          <div className="v-line"></div>
          
          <div className="v-node">
              <div className="v-node-text-inactive">V1</div>
          </div>
          
          <div className="v-node">
              <div className="v-node-text-active">V2</div>
              <div className="v-node-sub font-sans font-bold">100</div>
          </div>
          
          <div className="v-node">
              <div className="v-node-text-inactive">V3</div>
          </div>
      </div>

      {/* 
        ========================================================================
         VIP CARD CAROUSEL
        ========================================================================
      */}
      <div className="vip-carousel">
          
          {/* V1 Peek (Left side) */}
          <div className="vip-card-wrapper-side w-[20px]" style={{ marginLeft: '-15vw' }}>
              <div className="vip-card"></div>
          </div>

          {/* V2 Main Active Card */}
          <div className="vip-card-wrapper">
              <div className="vip-card">
                  <div className="vip-lock-tag">
                      <svg className="w-[10px] h-[10px] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      未解锁
                  </div>
                  
                  <div className="mt-[16px] text-[#111] font-bold text-[28px] tracking-wider relative z-20">白条<span className="font-sans italic pr-1">V2</span></div>
                  <div className="vip-cursive mt-[2px] relative z-20">Baitiao Vip Member</div>

                  <div className="absolute bottom-[20px] left-[16px] text-[12px] text-[#3e6a96] flex items-center z-20 font-medium">
                      未解锁，当前成长值<span className="font-sans font-bold mx-1">0</span>
                      <svg className="w-[12px] h-[12px] ml-1 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                  </div>

                  {/* Duck CSS Mock Graphic */}
                  <div className="css-hex-outer">
                      <div className="css-hex-inner flex-col">
                          <div className="text-[20px] relative top-[4px] z-10 left-[8px]">👑</div>
                          <div className="css-duck-mock relative z-0">🦆</div>
                          <div className="text-[14px] relative top-[-10px] z-10 left-[-6px]">💎</div>
                      </div>
                  </div>
              </div>
          </div>

          {/* V3 Peek (Right side) */}
          <div className="vip-card-wrapper-side">
              <div className="vip-card" style={{ background: 'linear-gradient(135deg, #fff2f2 0%, #ffe3e3 100%)' }}>
                  <div className="vip-lock-tag" style={{ color: '#d28b8b', backgroundColor: 'rgba(210,139,139,0.1)' }}>未解锁</div>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         DUCK PROMO BANNER 
        ========================================================================
      */}
      <div className="promo-duck-banner">
          {/* Abstract floating shapes for zero asset mockup */}
          <div className="absolute top-[10px] right-[40px] w-[60px] h-[50px] bg-[#adeaa3] rounded-tl-[30px] rounded-br-[30px] opacity-80 transform rotate-12"></div>
          <div className="absolute bottom-[-10px] right-[20px] w-[50px] h-[50px] bg-[#fb564b] rounded-[10px] opacity-90 transform rotate-[-15deg] flex items-center justify-center">
              <div className="w-[15px] h-[15px] bg-[#ffde66] rounded-full"></div>
          </div>
          <div className="absolute top-[15px] right-[120px] w-[20px] h-[15px] bg-[#ffb944] rounded-full opacity-90 transform rotate-[30deg]"></div>
          
          <div className="text-[12px] text-[#a56543] mb-[2px] tracking-wider font-bold z-20 relative">大鹅游玩记</div>
          <div className="text-[18px] text-[#4f1e00] font-bold tracking-wider mb-[2px] z-20 relative">你有超大鹅红包待领取</div>
          
          <div className="promo-red-btn z-20 relative">
              100%有钱
              <svg className="w-[12px] h-[12px] ml-1 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         MONTHLY COUPONS (月月领)
        ========================================================================
      */}
      <div className="white-section-card">
          <div className="flex items-end mb-[16px]">
              <span className="text-[17px] font-bold text-[#111] leading-none mb-[1px]">月月领</span>
              <span className="text-[12px] text-[#999] ml-2 tracking-wide leading-none">每月领1次 8日等级更新</span>
          </div>

          <div className="grid grid-cols-3 gap-[10px]">
              
              {/* Box 1 */}
              <div className="coupon-card">
                  <div className="coupon-ticket">
                      <div className="coupon-ticket-top">
                          <span className="text-[20px] font-bold font-sans">7</span>折
                      </div>
                      <div className="coupon-ticket-bottom tracking-wider">6期息费券</div>
                  </div>
                  <div className="text-[14px] text-[#222] font-medium mt-[2px] mb-[2px]">7<span className="text-[13px]">折</span></div>
                  <div className="text-[11px] text-[#e04033] mb-[12px]">6期息费券</div>
                  <div className="btn-lock">
                     <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </div>
              </div>

              {/* Box 2 */}
              <div className="coupon-card">
                  <div className="coupon-ticket">
                      <div className="coupon-ticket-top">
                          <span className="text-[20px] font-bold font-sans">1.88</span>元
                      </div>
                      <div className="coupon-ticket-bottom tracking-wider">满139可用</div>
                  </div>
                  <div className="text-[14px] text-[#222] font-medium font-sans mt-[2px] mb-[2px]">1.88<span className="text-[13px] font-normal">元</span></div>
                  <div className="text-[11px] text-[#e04033] mb-[12px]">白条满减券</div>
                  <div className="btn-lock">
                     <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </div>
              </div>

              {/* Box 3 */}
              <div className="coupon-card">
                  <div className="coupon-ticket">
                      <div className="coupon-ticket-top">
                          <span className="text-[20px] font-bold font-sans">5.18</span>元
                      </div>
                      <div className="coupon-ticket-bottom tracking-wider">满399可用</div>
                  </div>
                  <div className="text-[14px] text-[#222] font-medium font-sans mt-[2px] mb-[2px]">5.18<span className="text-[13px] font-normal">元</span></div>
                  <div className="text-[11px] text-[#e04033] mb-[12px]">白条满减券</div>
                  <div className="btn-lock">
                     <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                  </div>
              </div>

          </div>
      </div>

      {/* 
        ========================================================================
         FINANCIAL PRIVILEGES (金融特权)
        ========================================================================
      */}
      <div className="white-section-card pb-[25px]">
          <div className="text-[17px] font-bold text-[#111] mb-[16px]">金融特权</div>

          <div className="grid grid-cols-2 gap-[10px]">
              
              <div className="privilege-box-left">
                  {/* Mock Gold Bars Graphic */}
                  <div className="absolute right-[-10px] bottom-[-10px] w-[50px] h-[80px] bg-[#ffc34b] transform rotate-12 rounded-[4px] shadow-lg"></div>
                  <div className="absolute right-[15px] bottom-[-20px] w-[30px] h-[80px] bg-[#ffaa22] transform rotate-12 rounded-[4px]"></div>
                  <div className="absolute left-[20px] bottom-[20px] w-[8px] h-[4px] bg-[#ff7b5a] transform rotate-[-20deg]"></div>
                  <div className="absolute left-[30px] top-[20px] w-[14px] h-[4px] bg-[#ffd7a2] transform rotate-45"></div>
              </div>

              <div className="privilege-box-right">
                  {/* Mock Red Envelope Graphic */}
                  <div className="absolute right-[10px] bottom-[-10px] w-[45px] h-[70px] bg-[#ff2642] rounded-[4px] transform rotate-[-5deg] shadow-lg"></div>
                  <div className="absolute right-[5px] bottom-[20px] w-[50px] h-[12px] bg-[#ffe4c3] transform rotate-[-5deg] shadow-sm"></div>
                  <div className="absolute left-[25px] top-[35px] w-[12px] h-[12px] bg-[#ffd645] rounded-full flex items-center justify-center shadow-md">
                      <span className="text-[8px] text-white">★</span>
                  </div>
                  <div className="absolute right-[15px] top-[25px] w-[8px] h-[8px] bg-[#ff97a3] rounded-full"></div>
              </div>

          </div>
      </div>

    </div>
  );
}
