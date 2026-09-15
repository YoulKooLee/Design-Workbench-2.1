/**
 * @name 白金合伙人主视觉页 (Platinum Partner Hero/Mascot Page)
 */
import React from 'react';
import './style.css';

export default function JDPlatinumHero() {
  return (
    <div className="w-full min-h-[120vh] platinum-master-bg flex flex-col font-sans select-none overflow-x-hidden pb-[40px] relative z-0">
      
      {/* 
        ========================================================================
         NAVIGATION HEADER & FLOATING UI CONTEXT LAYER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[52px] pb-[10px] z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[24px] h-[24px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          <div className="w-8 flex justify-end items-center cursor-pointer text-[#111]">
              <div className="w-[18px] h-[10px] flex justify-between items-center opacity-80">
                  <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-current rounded-full"></div>
              </div>
          </div>
      </div>

      {/* Floating Side Manual Tabs */}
      <div className="manual-tab-group font-bold">
          <div className="manual-tab rounded-tl-[6px]">规则</div>
          <div className="manual-tab rounded-bl-[6px]">客服</div>
      </div>

      {/* Floating User Profile Pin */}
      <div className="absolute top-[65px] left-[14px] css-user-tag z-40 cursor-pointer">
          <div className="css-user-avatar overflow-hidden relative">
              {/* Fake abstract face for avatar */}
              <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-[24px] h-[24px] bg-[#fca156] rounded-full"></div>
          </div>
          <span className="text-[9px] text-[#d97706] font-bold mt-1 scale-90 tracking-wider">点我认证</span>
      </div>

      {/* 
        ========================================================================
         HERO TITLE GROUP
        ========================================================================
      */}
      <div className="w-full flex flex-col items-center mt-[10px] relative z-30">
          
           {/* Abstract Tiny Decoration Flakes */}
          <div className="confetti-diamond bg-[#fca156] top-[10px] left-[20%] w-[6px] h-[6px]"></div>
          <div className="confetti-diamond bg-[#f04a4b] top-[40px] left-[30%]"></div>
          <div className="confetti-diamond bg-[#f04a4b] top-[50px] right-[10%] w-[10px] h-[10px]"></div>
          <div className="confetti-diamond bg-[#8B5CF6] top-[60px] right-[25%] w-[6px] h-[6px]"></div>
          <div className="confetti-diamond bg-[#fca156] bottom-[-20px] left-[15%] w-[8px] h-[8px] rotate-[15deg]"></div>

          <div className="flex items-center text-[#d97706]">
              <div className="w-[16px] h-[16px] bg-white rounded flex justify-center items-center shadow-sm overflow-hidden mr-1">
                 <div className="w-[8px] h-[4px] bg-[#f04a4b] rounded-t-lg mt-[2px]"></div>
              </div>
              <span className="text-[13px] font-bold tracking-widest leading-none mt-[2px]">京东金融</span>
          </div>

          <div className="relative inline-block mt-[4px] mb-[12px]">
              <h1 className="text-[52px] font-black text-[#3d1604] tracking-tight italic origin-bottom transform scale-y-110 leading-[1.1] z-10 relative">
                  白金合伙人
              </h1>
              <div className="rough-underline opacity-90"></div>
          </div>

          <p className="text-[14px] text-gray-700 tracking-widest font-medium z-10">
               白条消费和小金库攒钱 <span className="text-[#f04a4b] font-bold">可兑红包</span>
          </p>
      </div>

      {/* 
        ========================================================================
         ABSTRACT 3D MASCOT SCENE (Zero Asset Reconstruction)
        ========================================================================
      */}
      <div className="mascot-scene-container">
          
          {/* Background Coins */}
          <div className="css-floor-coin coin-1"></div>
          <div className="css-floor-coin coin-2"></div>
          <div className="css-floor-coin coin-3"></div>

          {/* Large White Duck Mascot */}
          <div className="css-abstract-duck">
              {/* Chat Bubble Overlap */}
              <div className="css-chat-bubble">
                  白条购物可以<br/>兑红包
              </div>
          </div>

          {/* Orange Mascot Character */}
          <div className="css-abstract-blob">
              {/* Face details mapping */}
              <div className="absolute top-[35px] left-[25px] flex items-end justify-between w-[25px] z-10">
                  <div className="w-[4px] h-[7px] bg-[#3d1604] rounded-full transform rotate-12"></div>
                  <div className="w-[8px] h-[4px] bg-[#3d1604] rounded-[0_0_8px_8px] mb-[1px]"></div>
                  <div className="w-[4px] h-[7px] bg-[#3d1604] rounded-full transform -rotate-12"></div>
              </div>
              {/* Little red shoes/feet */}
              <div className="w-[20px] h-[10px] bg-[#ba2a2a] rounded-[10px_10px_4px_4px] absolute bottom-[-4px] left-[15px] z-0 transform rotate-12 shadow-sm"></div>
              <div className="w-[22px] h-[12px] bg-[#d33a3a] rounded-[10px_10px_4px_4px] absolute bottom-[-6px] right-[10px] z-20 transform -rotate-12 shadow-sm"></div>
              {/* Tiny yellow horn/leaf on head */}
              <div className="w-[25px] h-[15px] bg-[#ffe066] border-b-[4px] border-[#ffb300] rounded-[15px_15px_0_0] absolute top-[-5px] left-[50%] transform -translate-x-1/2 -z-10 rotate-12"></div>
          </div>

          {/* User Currency Floating Balance Widget */}
          <div className="absolute bottom-[20px] right-0 bg-white/70 backdrop-blur-md rounded-l-full py-1.5 pl-2 pr-6 flex items-center shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-white/60 z-20">
              
              <div className="relative w-[34px] h-[34px]">
                  {/* Fake coin stack depth */}
                  <div className="absolute top-1 right-[-4px] w-[26px] h-[26px] rounded-full bg-[#fca156] opacity-30 shadow-[0_0_10px_rgba(252,161,86,0.8)] filter blur-[2px]"></div>
                  {/* Front Main Coin */}
                  <div className="absolute top-0 left-0 w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#fff7d1] to-[#ffb13b] border-2 border-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] flex items-center justify-center">
                      <div className="w-[20px] h-[20px] border border-[#fca156] rounded-full flex justify-center items-center opacity-70">
                          <span className="text-[#fca156] font-bold text-[12px] font-sans scale-[0.8]">¥</span>
                      </div>
                  </div>
              </div>

              <div className="flex flex-col ml-[6px]">
                  <span className="text-[20px] font-black text-[#111] leading-none mb-[2px] font-sans tracking-tight">10.00</span>
                  <span className="text-[10px] text-gray-500 scale-90 origin-left tracking-wider">(0.00冻结中)</span>
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         REDEEM ACTION BOARD (红包兑换区)
        ========================================================================
      */}
      <div className="mx-[14px] bg-white/95 backdrop-blur-md rounded-[20px] px-[14px] pt-[22px] pb-[25px] relative mt-[5px] shadow-[0_8px_20px_rgba(0,0,0,0.02)] z-30">
          
          {/* Header Row */}
          <div className="flex justify-between items-end mb-[18px] px-1">
              <div className="relative inline-block">
                  <h2 className="text-[18px] font-black text-[#111] tracking-widest relative z-10 italic">红包兑换区</h2>
                  <div className="rough-underline-small"></div>
              </div>
              <div className="flex items-center text-gray-400 active:opacity-60 cursor-pointer">
                  <span className="text-[12px] font-medium tracking-widest mr-[2px]">明细</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Carousel Cards */}
          <div className="flex space-x-[10px] overflow-x-auto no-scrollbar pb-[10px] pt-[12px]">
              
              {/* Primary Action Card (Redeemed context) */}
              <div className="w-[105px] flex-shrink-0 bg-white border border-[#f04a4b] rounded-[10px] flex flex-col items-center pb-[14px] relative shadow-[0_4px_12px_rgba(240,74,75,0.1)]">
                  
                  <div className="css-orange-ribbon">新人认证专享</div>
                  
                  <div className="flex items-baseline mt-[20px] mb-[6px] text-[#f04a4b]">
                      <span className="text-[24px] font-black font-sans leading-none tracking-tight">2.53</span>
                      <span className="text-[11px] font-bold ml-px">元</span>
                  </div>
                  
                  <span className="text-[11px] font-bold text-[#111] tracking-widest mb-[12px]">小金库红包</span>
                  
                  <div className="flex items-center justify-center mb-[14px]">
                      <span className="text-[13px] font-sans font-bold text-[#111] mr-[3px]">0</span>
                      <div className="css-gold-coin-mini"></div>
                  </div>
                  
                  <div className="w-[85%] bg-[#f04a4b] text-white text-[12px] font-bold py-1.5 rounded-full text-center shadow-sm cursor-pointer whitespace-nowrap overflow-visible relative">
                      去兑换
                      {/* Interaction Finger Overlay */}
                      <div className="css-hand-pointer !bottom-[-20px] !right-[-8px] scale-[0.8] origin-bottom-right rotate-[-15deg]"></div>
                  </div>
              </div>

              {/* Inactive Card 1 */}
              <div className="w-[105px] flex-shrink-0 bg-white border border-[#eaeaea] rounded-[10px] flex flex-col items-center pb-[14px]">
                  
                  <div className="flex items-baseline mt-[24px] mb-[6px] text-[#f04a4b]">
                      <span className="text-[20px] font-bold font-sans leading-none tracking-tight">0.88</span>
                      <span className="text-[11px] font-bold ml-px">元</span>
                  </div>
                  
                  <span className="text-[11px] font-bold text-[#111] tracking-widest mb-[12px]">白条红包</span>
                  
                  <div className="flex items-center justify-center mb-[14px]">
                      <span className="text-[13px] font-sans font-bold text-[#111] mr-[3px]">888</span>
                      <div className="css-gold-coin-mini"></div>
                  </div>
                  
                  <div className="w-[85%] bg-gray-100 text-gray-400 text-[12px] font-bold py-1.5 rounded-full text-center whitespace-nowrap">
                      还需878
                  </div>
              </div>

              {/* Inactive Card 2 */}
              <div className="w-[105px] flex-shrink-0 bg-white border border-[#eaeaea] rounded-[10px] flex flex-col items-center pb-[14px]">
                  
                  <div className="flex items-baseline mt-[24px] mb-[6px] text-[#f04a4b]">
                      <span className="text-[20px] font-bold font-sans leading-none tracking-tight">1.88</span>
                      <span className="text-[11px] font-bold ml-px">元</span>
                  </div>
                  
                  <span className="text-[11px] font-bold text-[#111] tracking-widest mb-[12px]">白条红包</span>
                  
                  <div className="flex items-center justify-center mb-[14px]">
                      <span className="text-[13px] font-sans font-bold text-[#111] mr-[3px]">1888</span>
                      <div className="css-gold-coin-mini"></div>
                  </div>
                  
                  <div className="w-[85%] bg-gray-100 text-gray-400 text-[12px] font-bold py-1.5 rounded-full text-center whitespace-nowrap">
                      还需1878
                  </div>
              </div>

          </div>
      </div>

      {/* 
        ========================================================================
         STRATEGY BOTTOM CARD (Partial cut-off section)
        ========================================================================
      */}
      <div className="mx-[14px] bg-white/95 backdrop-blur-md rounded-[20px] rounded-b-none px-[20px] pt-[24px] pb-[40px] mt-[16px] relative shadow-[0_-5px_15px_rgba(0,0,0,0.01)] z-30">
          
          <div className="relative inline-block mb-[35px]">
              <h1 className="text-[24px] font-black text-[#111] tracking-tight relative z-10 italic">白金合伙人攻略</h1>
              <div className="rough-underline opacity-90 bottom-1"></div>
          </div>
          
          <div className="flex items-baseline mb-[20px]">
              <span className="text-[#f04a4b] text-[28px] font-black italic mr-1 leading-none tracking-tighter" style={{ textShadow: "1px 1px 0px rgba(240,74,75,0.2)"}}>01</span>
              <span className="text-[#f04a4b] font-black text-[20px] mr-1">、</span>
              <span className="text-[#111] font-bold text-[18px] tracking-widest">完成白金认证</span>
          </div>

          <div className="flex items-center pl-2">
              <div className="w-[12px] h-[16px] bg-gradient-to-br from-[#f55959] to-[#dc2626] rounded-[2px] opacity-80 shadow-sm mr-2"></div>
              <div className="flex items-center text-[13px] text-gray-500 tracking-wide font-medium">
                  购物打白条...
              </div>
          </div>
          
      </div>

    </div>
  );
}
