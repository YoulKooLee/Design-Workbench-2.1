/**
 * @name 小病应急 (Minor Illness Emergency / Daily Savings)
 */
import React from 'react';
import './style.css';

export default function JDMinorIllness() {
  return (
    <div className="w-full min-h-screen gold-hero-bg flex flex-col font-sans select-none overflow-x-hidden relative pb-[40px]">
      
      {/* 
        ========================================================================
         TOP NAVIGATION BAR 
        ========================================================================
      */}
      <div className="w-full h-[52px] bg-transparent flex items-center justify-between sticky top-0 z-50 px-4 pt-1">
         <div className="w-8 flex items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <div className="flex items-center space-x-1.5 bg-white/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
             {/* Mascot micro logo mock */}
             <div className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm relative">
                 <div className="absolute top-[20%] w-[10px] h-[3px] bg-[#fb4a4f] rounded-full"></div>
                 <div className="flex justify-between w-[80%] absolute top-[45%] px-[2px]">
                     <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                     <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                 </div>
                 <div className="absolute bottom-[10%] w-[6px] h-[3px] bg-black rounded-b-full"></div>
             </div>
             <span className="text-[13px] font-bold text-[#e12e15] tracking-wide">京东金融</span>
         </div>
         <div className="w-8 flex items-center justify-end cursor-pointer">
             <div className="flex space-x-[3px]">
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                 <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
             </div>
         </div>
      </div>

      {/* 
        ========================================================================
         HERO TITLE & FLOATING TAB
        ========================================================================
      */}
      <div className="w-full px-5 mt-3 relative z-10 flex flex-col items-center">
          <div className="text-[26px] font-black text-[#5c1605] leading-none tracking-wide mb-2 drop-shadow-sm flex items-center">
              领保障金，大病立即赔
          </div>
          <span className="text-[14px] text-[#9c3f22] font-medium tracking-wide drop-shadow-sm">
              天天攒保障 生病住院能报销 突遇大病不惧赔
          </span>
      </div>

      {/* Sticky Right Edge Tab */}
      <div className="absolute right-0 top-[110px] bg-gradient-to-l from-[#eeddbe] to-[#fbefcf] text-[#5e4b2d] px-1 py-2.5 rounded-l-md font-medium text-[11px] leading-tight flex flex-col items-center justify-center shadow-sm w-[22px] z-50 cursor-pointer">
          <span className="mb-[2px]">领</span>
          <span className="mb-[2px]">取</span>
          <span className="mb-[2px]">明</span>
          <span>细</span>
      </div>

      {/* 
        ========================================================================
         FLOATING COINS ORBIT (Interactive Area)
        ========================================================================
      */}
      <div className="w-full h-[220px] relative mt-6 z-10 pointer-events-auto">
          
          {/* Center Shield Graphic */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[160px] flex flex-col items-center justify-center pb-8 shield-watermark cursor-pointer active:scale-95 transition-transform">
              <span className="text-[54px] text-[#5c1605] font-bold font-sans leading-none mb-1 drop-shadow-md">0</span>
              <span className="text-[12px] text-[#5c1605] font-bold tracking-wide">我的应急保额(元)</span>
          </div>

          {/* Coin 1: 首次登录余额 (Left Middle) */}
          <div className="absolute top-[35px] left-[13%] flex flex-col items-center cursor-pointer transition transform scale-95">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">18.00</div>
              </div>
              <span className="text-[10px] text-[#7a2e16] mt-1.5 font-bold tracking-wide drop-shadow-sm">首次登录余额</span>
          </div>

          {/* Coin 2: 每日首次支付 (Left Top) */}
          <div className="absolute top-[-5px] left-[30%] flex flex-col items-center cursor-pointer transition transform scale-95">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">10.00</div>
              </div>
              <span className="text-[10px] text-[#7a2e16] mt-1.5 font-bold tracking-wide drop-shadow-sm">每日首次支付</span>
          </div>

          {/* Coin 3: 每日首次支付 (Right Top) */}
          <div className="absolute top-[-5px] right-[30%] flex flex-col items-center cursor-pointer transition transform scale-95">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">10.00</div>
              </div>
              <span className="text-[10px] text-[#7a2e16] mt-1.5 font-bold tracking-wide drop-shadow-sm">每日首次支付</span>
          </div>

          {/* Coin 4: 历史积分 (Right Middle) */}
          <div className="absolute top-[35px] right-[13%] flex flex-col items-center cursor-pointer transition transform scale-95">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">188.00</div>
              </div>
              <span className="text-[10px] text-[#7a2e16] mt-1.5 font-bold tracking-wide drop-shadow-sm">历史积分</span>
          </div>

          {/* Coin 5: 京东金融app签到 (Left Lowest) */}
          <div className="absolute top-[90px] left-[3%] flex flex-col items-center cursor-pointer transition transform scale-95">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-sm">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">10.00</div>
              </div>
              <span className="text-[10px] text-[#7a2e16] mt-1.5 font-bold tracking-wide drop-shadow-sm whitespace-nowrap">去APP签到</span>
          </div>

          {/* Coin 6: 特殊推广任务 (Right Lowest) */}
          <div className="absolute top-[90px] right-[3%] flex flex-col items-center cursor-pointer transition">
              <div className="w-[46px] h-[46px] rounded-full golden-coin flex items-center justify-center shadow-md relative z-10">
                  <div className="w-[38px] h-[38px] rounded-full golden-coin-inner flex items-center justify-center font-bold text-[#5c1605] text-[13px] font-sans">58.00</div>
              </div>
              {/* Badge replaces the standard text to keep overall height similar */}
              <div className="bg-[#fc4a4f] text-white text-[9px] font-medium px-2 py-[2px] rounded-full relative z-20 mt-[-8px] shadow-sm transform scale-95 hover:scale-100 transition whitespace-nowrap">
                  仅需1分
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         WHITE BOTTOM CONTAINER (Covers the rest of the page)
        ========================================================================
      */}
      <div className="w-full flex-1 bg-[#f9f9fc] rounded-t-[20px] shadow-[0_-5px_25px_rgba(200,100,50,0.15)] z-20 flex flex-col pb-[40px]">
          
          {/* Toggle Tabs */}
          <div className="flex w-[88%] mx-auto mt-[-24px] z-30">
              <div className="flex-1 bg-[#fc4a4f] rounded-[10px] py-[10px] flex flex-col items-center justify-center tab-pointer-down relative shadow-[0_4px_15px_rgba(250,50,50,0.3)] cursor-pointer active:scale-[0.98] transition">
                 <span className="text-white text-[13px] font-bold tracking-widest mb-0.5 mt-0.5">1种重疾保障</span>
                 <span className="text-white text-[17px] font-bold font-sans drop-shadow-sm leading-none">0.00</span>
              </div>
              <div className="flex-1 bg-[#fdfdfd] border border-gray-100 border-l-transparent rounded-r-[10px] py-[10px] flex flex-col items-center justify-center shadow-sm cursor-pointer active:bg-gray-50 transition relative left-[-4px]">
                 <span className="text-black text-[13px] font-medium tracking-widest mb-0.5 mt-0.5">100种重疾保障</span>
                 <span className="text-black text-[17px] font-bold font-sans drop-shadow-sm leading-none">0.00</span>
              </div>
          </div>

          {/* Central Promotion Card */}
          <div className="mx-4 mt-6 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] overflow-hidden">
               {/* Faded Photo Top Half */}
               <div className="w-full h-[90px] abstract-nurse-bg flex items-start p-4 relative group cursor-pointer overflow-hidden">
                   {/* Nurse CSS vector dummy outline inside the background */}
                   <svg className="absolute right-0 bottom-0 w-[140px] h-full opacity-30 transform translate-x-[10%] translate-y-[20%]" viewBox="0 0 100 100" fill="currentColor" color="#3b6b9e">
                       <circle cx="50" cy="30" r="20" />
                       <path d="M20 90 L30 50 L70 50 L80 90 Z" />
                   </svg>
                   <span className="text-[17px] font-bold text-black tracking-wide relative z-10 w-[70%] leading-tight drop-shadow-sm mt-1">
                       至高5000元免费保额可获得
                   </span>
               </div>
               
               {/* CTA Button Bottom Half */}
               <div className="w-full px-5 py-5 pt-4 bg-white relative z-20">
                   <div className="w-full h-[48px] bg-[#fb4a4f] rounded-full flex justify-center items-center text-white text-[17px] font-bold tracking-widest shadow-[0_4px_12px_rgba(250,50,50,0.25)] active:scale-95 transition-transform cursor-pointer">
                       去开通
                   </div>
               </div>
          </div>

          {/* 
            ========================================================================
             TASKS SECTION ("做任务提升保额")
            ========================================================================
          */}
          <div className="mx-4 mt-5 mb-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] rounded-[14px]">
              
              {/* Header */}
              <div className="w-full h-[54px] bg-gradient-to-r from-[#fffcf8] to-[#feecd0] rounded-t-[14px] flex items-center justify-between px-4 relative overflow-hidden cursor-pointer group">
                  <div className="flex items-center relative z-10">
                      <span className="text-[20px] font-black text-black italic tracking-wider">做任务</span>
                      <span className="text-[20px] font-black text-[#e8533c] italic tracking-wider ml-0.5 drop-shadow-sm" style={{WebkitTextStroke: "0.5px white"}}>提升保额</span>
                  </div>
                  {/* Decorative bouncing coins on the right */}
                  <div className="absolute right-[-10px] top-[-10px] w-[100px] h-[100px] opacity-80 pointer-events-none transition-transform group-hover:scale-105">
                      <div className="absolute top-[30px] right-[30px] w-[40px] h-[40px] bg-[#fb4a4f] rounded-full shadow-inner border border-red-400"></div>
                      <div className="absolute top-[45px] right-[45px] w-[10px] h-[10px] bg-[#feecd0] rounded-full shadow-sm"></div>
                      <div className="absolute top-[20px] right-[70px] w-[20px] h-[20px] bg-[#fdb2b6] rounded-full shadow-inner border border-red-200"></div>
                      <div className="absolute top-[60px] right-[10px] w-[24px] h-[24px] bg-[#fce0b0] rounded-full shadow-inner border border-orange-200"></div>
                  </div>
              </div>

              {/* Task List items */}
              <div className="w-full bg-white rounded-b-[14px] px-4 flex flex-col pb-2">
                  
                  {/* Item 1 */}
                  <div className="flex justify-between items-center py-5 border-b border-gray-50 group cursor-pointer active:bg-gray-50/50 transition">
                      <div className="flex flex-col flex-1 pr-2">
                          <div className="flex items-center mb-1">
                              <span className="text-[14.5px] font-bold text-[#111] tracking-wide leading-none">浏览你的家庭应急金页面5秒</span>
                              <div className="border border-[#fc817f] text-[#fc6262] text-[9px] px-[3px] py-[0.5px] rounded-[3px] tracking-widest scale-90 origin-left font-medium ml-1 flex-shrink-0">每日</div>
                          </div>
                          <span className="text-[12px] text-[#999] tracking-wide">查看您的家庭大病应急金缺口</span>
                      </div>
                      <div className="bg-[#fb4a4f] text-white px-4 py-[7px] rounded-full font-bold text-[13px] tracking-widest shadow-[0_2px_8px_rgba(250,50,50,0.3)] active:scale-95 transition-transform flex-shrink-0">
                          +18元
                      </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex justify-between items-center py-5 border-none group cursor-pointer active:bg-gray-50/50 transition relative">
                      <div className="flex flex-col flex-1 pr-2">
                          <div className="flex items-center mb-1">
                              <span className="text-[14.5px] font-bold text-[#111] tracking-wide leading-none">1分钱起体验重疾险保障</span>
                          </div>
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0 relative">
                          <div className="absolute top-[-22px] bg-[#fdecd5] text-[#b46c36] text-[10px] font-medium px-2 py-[2px] rounded-t-xl rounded-bl-xl shadow-sm z-10 w-max pointer-events-none transform scale-95 border border-orange-100">
                             无需报销
                          </div>
                          <div className="bg-[#fb4a4f] text-white px-4 py-[7px] rounded-full font-bold text-[13px] tracking-widest shadow-[0_2px_8px_rgba(250,50,50,0.3)] active:scale-95 transition-transform">
                              +58元
                          </div>
                      </div>
                  </div>

              </div>

          </div>
      </div>
      
    </div>
  );
}
