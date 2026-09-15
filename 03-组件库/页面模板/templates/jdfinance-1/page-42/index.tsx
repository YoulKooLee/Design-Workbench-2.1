/**
 * @name 签到领现金大弹窗 (Daily Check-in Trigger Modal)
 */
import React from 'react';
import './style.css';

export default function JDCheckInModal() {
  return (
    <div className="w-full min-h-screen bg-[#111] overflow-hidden relative font-sans select-none">
      
      {/* 
        ========================================================================
         BACKGROUND MUTED RENDER (Phantom representation of page-41 base)
        ========================================================================
      */}
      <div className="absolute inset-0 opacity-40 blur-[1px] pointer-events-none transform scale-[0.98] transition-transform duration-300">
          <div className="w-full h-full checkin-hero-bg flex flex-col pt-[52px]">
             {/* Fake Header */}
             <div className="flex items-center px-4 text-white opacity-50 mb-4">
                <span className="text-[24px]">{'<'} 签到领现金</span>
             </div>
             {/* Fake Status Card with the "X" marker artifact */}
             <div className="mx-3 bg-white h-[120px] rounded-xl mb-4 opacity-50 flex justify-end p-2 relative">
                 <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center absolute top-2 right-4">
                    <span className="text-white font-bold">X</span>
                 </div>
             </div>
             {/* Fake Main Trigger Card */}
             <div className="mx-3 bg-white h-[380px] rounded-xl flex flex-col items-center justify-center mb-4">
                 <span className="text-[24px] font-bold mb-4 opacity-30">每日抽提现</span>
             </div>
          </div>
      </div>

      {/* 
        ========================================================================
         DARK OPACITY OVERLAY MASK
        ========================================================================
      */}
      <div className="absolute inset-0 bg-black/70 z-40 backdrop-blur-sm pointer-events-none"></div>

      {/* 
        ========================================================================
         FOREGROUND MODAL RENDER
        ========================================================================
      */}
      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 w-full perspective-1000">
          
          <div className="w-[310px] bg-[#fff] rounded-[24px] shadow-2xl relative flex flex-col items-center pt-[65px] pb-6 px-4">
              
              {/* 
                ========================================================================
                 THE GLOWING EMERALD ORB (Top Dead Center)
                ========================================================================
              */}
              <div className="absolute top-[-55px] left-1/2 transform -translate-x-1/2 w-[110px] h-[110px] emerald-orb-glow rounded-full flex flex-col items-center justify-center z-50 text-white">
                  <span className="text-[13px] font-medium tracking-widest text-shadow-sm leading-tight mt-2">已领</span>
                  <div className="flex items-baseline font-sans mt-[-2px]">
                      <span className="text-[38px] font-black tracking-tighter drop-shadow-md">0</span>
                      <span className="text-[16px] font-bold ml-[2px]">元</span>
                  </div>

                  {/* Floating CSS Gold Coins around Orb */}
                  <div className="css-gold-coin transform -rotate-12 absolute left-[-15px] top-[40px]">¥</div>
                  <div className="css-gold-coin transform rotate-12 absolute right-[-25px] bottom-[10px] scale-75 opacity-70 blur-[1px]">¥</div>
              </div>

              {/* 
                ========================================================================
                 MODAL BODY CONTENT
                ========================================================================
              */}

              {/* Aggressive Slanted Title */}
              <h2 className="slant-title-text mb-4 mt-2">签到领现金</h2>

              {/* Sub-description */}
              <p className="text-[15px] text-[#111] font-medium tracking-wide mb-6">
                 明天 <span className="text-[#f44b4c]">全部现金可提现</span>，中断将清空
              </p>

              {/* The Central Orange Prize Ticket */}
              <div className="w-[180px] h-[160px] rounded-xl border-[1.5px] border-[#facfab] flex flex-col relative prize-ticket mb-[32px]">
                  
                  {/* Floating Notification Badge */}
                  <div className="absolute top-2 right-[-22px] bg-[#f04a4b] text-white text-[11px] font-bold px-[6px] py-[2px] rounded-full border-2 border-white z-10 shadow-sm transform rotate-3 origin-left whitespace-nowrap">
                      明天可提现
                  </div>

                  {/* Top Ticket Data Area */}
                  <div className="h-[95px] w-full bg-white flex justify-center items-end pb-2 rounded-t-xl overflow-hidden relative">
                      {/* Subtle watermark or pattern for ticket top */}
                      <div className="absolute top-0 left-0 w-full h-[15px] bg-[#fffbf8] border-b border-dashed border-[#facfab] opacity-50"></div>
                      
                      <div className="flex font-sans text-[#b45d1d] items-baseline relative z-10">
                          <span className="text-[52px] font-black tracking-tighter leading-none relative top-1">0.52</span>
                          <span className="text-[20px] font-bold tracking-widest ml-1">元</span>
                      </div>
                  </div>

                  {/* Bottom Ticket Visual Area */}
                  <div className="h-[65px] w-full bg-gradient-to-t from-[#f97316] to-[#fcd34d] flex items-center justify-center rounded-b-[10px] shadow-inner relative overflow-hidden">
                      {/* CSS Sheen effect across ticket base */}
                      <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-white opacity-20 transform -rotate-12 translate-y-[-10px]"></div>
                      
                      <span className="text-[26px] text-white font-bold tracking-widest drop-shadow-md relative z-10">签到现金</span>
                  </div>
              </div>

              {/* 
                ========================================================================
                 MASSIVE CALL TO ACTION BUTTON
                ========================================================================
              */}
              <div className="w-[90%] h-[58px] bg-[#f04a4b] text-white rounded-full flex justify-center items-center font-bold tracking-widest shadow-[0_8px_15px_rgba(240,74,75,0.3)] cursor-pointer active:scale-95 transition-transform">
                  <span className="text-[22px] drop-shadow-sm ml-[-5px]">立即签到领钱</span>
                  <span className="text-[17px] drop-shadow-sm font-sans font-medium ml-1 mt-1">(1s)</span>
              </div>

          </div>
      </div>

    </div>
  );
}
