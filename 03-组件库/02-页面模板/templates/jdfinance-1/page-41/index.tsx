/**
 * @name 抽奖结果弹窗呈现 (Lottery Result Modal Overlay)
 */
import React from 'react';
import './style.css';

export default function JDLotteryModal() {
  return (
    <div className="w-full min-h-screen bg-[#111] overflow-hidden relative font-sans select-none">
      
      {/* 
        ========================================================================
         BACKGROUND MUTED RENDER (Simulating page-41 underneath)
        ========================================================================
      */}
      <div className="absolute inset-0 opacity-30 blur-[1px] pointer-events-none transform scale-[0.98] transition-transform duration-300">
          
          <div className="w-full h-full checkin-hero-bg flex flex-col pt-[52px]">
             {/* Fake Header */}
             <div className="flex items-center px-4 text-white opacity-50 mb-4">
                <span className="text-[24px]">{'<'} 签到领现金</span>
             </div>
             
             {/* Fake Status Card */}
             <div className="mx-3 bg-white h-[120px] rounded-xl mb-4 opacity-50"></div>
             
             {/* Fake Main Trigger Card */}
             <div className="mx-3 bg-white h-[380px] rounded-xl flex flex-col items-center justify-center mb-4">
                 <span className="text-[24px] font-bold mb-4 opacity-30">每日抽提现</span>
                 <div className="w-[120px] h-[50px] bg-red-400 rounded-full opacity-30"></div>
             </div>

             {/* Fake Services Card */}
             <div className="mx-3 bg-white h-[100px] rounded-xl opacity-50"></div>
          </div>
      </div>

      {/* 
        ========================================================================
         DARK OVERLAY MASK
        ========================================================================
      */}
      <div className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm pointer-events-none"></div>

      {/* 
        ========================================================================
         FOREGROUND CELEBRATION MODAL SYSTEM
        ========================================================================
      */}
      <div className="absolute top-[26%] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 w-full perspective-1000">
          
          {/* Floating Congratulation Text */}
          <div className="flex items-center mb-1 drop-shadow-md">
              <span className="text-[17px] mr-1">🎉</span>
              <span className="text-[16px] text-white font-bold tracking-widest text-shadow-sm">恭喜抽中</span>
          </div>

          {/* Massive 3D Golden Subject */}
          <span className="text-[38px] font-black mega-gold-text mb-[12px]">现金打款</span>

          {/* 
            ========================================================================
             THE REWARD BOX
            ========================================================================
          */}
          <div className="relative flex justify-center w-full">
              {/* Green Aura Core */}
              <div className="celebration-aura"></div>

              {/* Box Structural Body */}
              <div className="mega-modal-box w-[250px] rounded-[24px] flex flex-col z-50 overflow-hidden bg-white mt-1 border-[2.5px] border-[#0cb16b]">
                  
                  {/* Top White Canvas (The Value) */}
                  <div className="w-full h-[140px] modal-grid-lines flex justify-center items-[65px] relative">
                      {/* Inner upper shine */}
                      <div className="absolute top-0 left-0 w-full h-[30px] bg-gradient-to-b from-white to-transparent mix-blend-overlay"></div>
                      
                      <div className="flex items-baseline font-sans mt-[30px]">
                          <span className="text-[58px] font-black text-[#0cb16b] tracking-tighter leading-none" style={{textShadow: '0 4px 10px rgba(12,177,107,0.15)'}}>0.01</span>
                          <span className="text-[22px] font-bold text-[#0cb16b] ml-[3px] mt-2 leading-none">元</span>
                      </div>
                  </div>

                  {/* Bottom Green Execution Plate */}
                  <div className="w-full h-[70px] bg-gradient-to-t from-[#01a25d] to-[#16d083] flex justify-center items-center relative overflow-hidden">
                      {/* Curved top highlight artifact inside green plate */}
                      <div className="absolute top-[-10px] w-[150%] h-[20px] bg-white opacity-[0.15] rounded-full border border-b pb-4"></div>
                      
                      <span className="text-[25px] font-bold text-white tracking-widest text-shadow-md relative z-10">现金打款</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CONFETTI PARTICLE EMITTERS
        ========================================================================
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          <div className="particle particle-1">❤️</div>
          <div className="particle particle-2">🪙</div>
          <div className="particle particle-3">🤩</div>
          <div className="particle particle-4 text-[#fcd34d]">✨</div>
          <div className="particle particle-5">❤️</div>
          {/* Faint distant sparks */}
          <div className="particle text-white opacity-40 text-[10px]" style={{left: '20%', bottom: '30%', animationDelay: '1.2s'}}>✦</div>
          <div className="particle text-white opacity-50 text-[14px]" style={{right: '25%', bottom: '40%', animationDelay: '0.7s'}}>✦</div>
          <div className="particle text-white opacity-30 text-[12px]" style={{left: '60%', bottom: '35%', animationDelay: '2.0s'}}>✦</div>
      </div>

      {/* 
        ========================================================================
         PSEUDO-3D GEOMETRIC CLAPPING HANDS (Bottom Edge)
        ========================================================================
      */}
      <div className="absolute bottom-[-15px] w-full h-[160px] overflow-hidden pointer-events-none z-50 flex justify-center">
          <div className="relative w-full max-w-[375px] h-full mx-auto">
              {/* Outer Left Arm */}
              <div className="abstract-hand hand-left-1"></div>
              {/* Inner Left Arm */}
              <div className="abstract-hand hand-left-2"></div>
              
              {/* Central explosion source glow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[100px] bg-yellow-400 opacity-20 blur-[40px] rounded-full"></div>

              {/* Inner Right Arm */}
              <div className="abstract-hand hand-right-1"></div>
              {/* Outer Right Arm */}
              <div className="abstract-hand hand-right-2"></div>
          </div>
      </div>

      {/* Close button hint (Often expected in modals, invisible but clickable trigger mapping) */}
      <div className="absolute top-[10%] right-[10%] w-[32px] h-[32px] bg-white/10 border border-white/20 rounded-full flex justify-center items-center z-50 cursor-pointer hover:bg-white/30 backdrop-blur-md">
          <svg className="w-[14px] h-[14px] text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
      </div>

    </div>
  );
}
