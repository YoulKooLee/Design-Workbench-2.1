/**
 * @name 白金合伙人攻略 (Platinum Partner Strategy Hub)
 */
import React from 'react';
import './style.css';

export default function JDPlatinumStrategy() {
  return (
    <div className="w-full min-h-screen platinum-hero-bg flex flex-col font-sans select-none overflow-x-hidden pb-[40px]">
      
      {/* 
        ========================================================================
         NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-4 pt-[52px] pb-[10px] z-50">
          <div className="w-8 flex items-center cursor-pointer active:opacity-50">
              <svg className="w-[22px] h-[22px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <span className="text-[17px] font-bold tracking-widest text-[#111] leading-none">白金合伙人</span>
          
          <div className="w-8 flex justify-end items-center cursor-pointer">
              <div className="w-[18px] h-[10px] flex justify-between items-center opacity-80">
                  <div className="w-[3px] h-[3px] bg-[#111] rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-[#111] rounded-full"></div>
                  <div className="w-[3px] h-[3px] bg-[#111] rounded-full"></div>
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         TOP REWARDS CAROUSEL (Red Packets & Coupons)
        ========================================================================
      */}
      <div className="w-full px-[14px] mt-1 flex space-x-[12px] overflow-x-auto no-scrollbar pb-[20px] pt-1">
          
          {/* Active Coupon Card */}
          <div className="w-[110px] flex-shrink-0 bg-white border-[1.5px] border-[#f04a4b] rounded-[10px] flex flex-col items-center pt-[14px] pb-[14px] relative shadow-[0_4px_10px_rgba(240,74,75,0.15)] overflow-visible cursor-pointer">
              <span className="text-[14px] font-bold text-[#111] tracking-widest mb-2">小金库红包</span>
              <div className="flex items-center justify-center mb-[14px]">
                  <span className="text-[16px] font-sans font-bold text-[#111] mr-1">0</span>
                  <div className="css-gold-coin-mini"></div>
              </div>
              <div className="w-[85%] bg-[#f04a4b] text-white text-[13px] font-bold py-1.5 rounded-full text-center shadow-sm">
                  去兑换
              </div>
              
              {/* Hand Pointer Call-To-Action Overlay */}
              <div className="css-hand-pointer absolute -bottom-[16px] right-[-10px] scale-[0.8] origin-bottom-right"></div>
          </div>

          {/* Inactive Coupon Card 1 */}
          <div className="w-[110px] flex-shrink-0 bg-white border border-[#e5e7eb] rounded-[10px] flex flex-col items-center pt-[14px] pb-[14px] shadow-[0_2px_5px_rgba(0,0,0,0.02)] cursor-pointer">
              <span className="text-[14px] font-bold text-[#111] tracking-widest mb-2">白条红包</span>
              <div className="flex items-center justify-center mb-[14px]">
                  <span className="text-[16px] font-sans font-bold text-[#111] mr-1">888</span>
                  <div className="css-gold-coin-mini"></div>
              </div>
              <div className="w-[85%] bg-gray-100 text-gray-400 text-[13px] font-bold py-1.5 rounded-full text-center">
                  还需878
              </div>
          </div>

          {/* Inactive Coupon Card 2 */}
          <div className="w-[110px] flex-shrink-0 bg-white border border-[#e5e7eb] rounded-[10px] flex flex-col items-center pt-[14px] pb-[14px] shadow-[0_2px_5px_rgba(0,0,0,0.02)] cursor-pointer">
              <span className="text-[14px] font-bold text-[#111] tracking-widest mb-2">白条红包</span>
              <div className="flex items-center justify-center mb-[14px]">
                  <span className="text-[16px] font-sans font-bold text-[#111] mr-1">1888</span>
                  <div className="css-gold-coin-mini"></div>
              </div>
              <div className="w-[85%] bg-gray-100 text-gray-400 text-[13px] font-bold py-1.5 rounded-full text-center">
                  还需1878
              </div>
          </div>

      </div>

      {/* 
        ========================================================================
         MAIN STRATEGY CARD (Section 01 & 02)
        ========================================================================
      */}
      <div className="mx-[14px] bg-white/95 backdrop-blur-sm rounded-[20px] px-[20px] pt-[24px] pb-[20px] relative shadow-[0_5px_15px_rgba(0,0,0,0.02)] mt-[4px]">
          
          {/* Main Title Hero */}
          <div className="relative inline-block mb-[35px] mt-2">
              <h1 className="text-[28px] font-black text-[#111] tracking-tight relative z-10 italic">白金合伙人攻略</h1>
              <div className="rough-underline text-marker-highlight"></div>
          </div>
          
          {/* SECTION 01: Certification */}
          <div className="flex items-baseline mb-[20px]">
              <span className="text-[#f04a4b] text-[28px] font-black italic mr-1 leading-none tracking-tighter" style={{ textShadow: "1px 1px 0px rgba(240,74,75,0.2)"}}>01</span>
              <span className="text-[#f04a4b] font-black text-[20px] mr-1">、</span>
              <span className="text-[#111] font-bold text-[18px] tracking-widest">完成白金认证</span>
          </div>

          <div className="flex justify-between items-center mb-6 pl-2">
              <div className="flex items-center text-[13px] text-gray-500 tracking-wide font-medium">
                  {/* Fake tiny red doc icon */}
                  <div className="w-[12px] h-[16px] bg-[#f04a4b] rounded-[1px] mr-2 flex justify-center items-center">
                     <span className="text-[6px] text-white scale-75">白条</span>
                  </div>
                  购物打白条！能省钱！
              </div>
              <div className="bg-[#f04a4b] text-white text-[13px] font-bold px-[18px] py-1.5 rounded-full shadow-sm hover:opacity-90 transition">
                  去购物
              </div>
          </div>
          <div className="flex justify-between items-center mb-[45px] pl-2">
              <div className="flex items-center text-[13px] text-gray-500 tracking-wide font-medium">
                  {/* Fake tiny orange bag icon */}
                  <div className="w-[14px] h-[14px] bg-[#fca156] rounded-[5px_5px_8px_8px] mr-2"></div>
                  用小金库攒钱！赚收益！
              </div>
              <div className="bg-[#f04a4b] text-white text-[13px] font-bold px-[18px] py-1.5 rounded-full shadow-sm hover:opacity-90 transition">
                  攒一笔
              </div>
          </div>

          {/* SECTION 02: Reward Mechanics */}
          <div className="flex items-baseline mb-[14px]">
              <span className="text-[#f04a4b] text-[28px] font-black italic mr-1 leading-none tracking-tighter" style={{ textShadow: "1px 1px 0px rgba(240,74,75,0.2)"}}>02</span>
              <span className="text-[#f04a4b] font-black text-[20px] mr-1">、</span>
              <span className="text-[#111] font-bold text-[18px] tracking-widest">省钱攒钱都奖励</span>
          </div>

          {/* Details List */}
          <div className="flex flex-col space-y-[18px] px-[8px] mb-[45px]">
              <p className="text-[13px] text-gray-500 tracking-wider flex items-center flex-wrap leading-relaxed">
                  ·每笔白条实物购物或小金库攒钱，<span className="text-[#f04a4b] ml-1">金币1:1发放</span>
              </p>
              
              <p className="text-[13px] text-gray-500 tracking-wider flex items-center flex-wrap leading-relaxed">
                  ·单个气泡发放金币<span className="text-[#f04a4b] mx-1">上限200</span>
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#f4f6fa] border border-[#e6eaf3] mx-1 relative bottom-[1px]">
                      <span className="text-[#fca156] text-[10px] font-bold scale-[0.6]">200</span>
                  </span>
                  ，单月上限2万
              </p>

              <p className="text-[13px] text-gray-500 tracking-wider flex items-center flex-wrap leading-relaxed">
                  ·最低满888就能兑换<span className="text-[#f04a4b] mx-1">0.88元红包</span>
                  <span className="inline-block w-[16px] h-[20px] bg-gradient-to-b from-[#f55959] to-[#dc2626] rounded-[2px] ml-1 relative bottom-[1px] shadow-sm">
                      <span className="absolute top-[6px] left-[4px] w-[8px] h-[8px] bg-[#fbbf24] rounded-full"></span>
                  </span>
              </p>
          </div>

          {/* Floating Bubble Collection */}
          <div className="w-full flex justify-between items-end h-[120px] px-1 mb-[25px]">
              {/* Bubble 1 */}
              <div className="flex flex-col items-center animate-float-slow">
                  <div className="floating-coin-bubble shadow-blue-100 mb-2">
                       <div className="css-gold-coin"></div>
                       <span className="text-[#111] font-bold text-[12px] font-sans mt-[1px]">10.00</span>
                  </div>
                  <span className="text-[10px] text-gray-500 tracking-widest scale-95">小金库轻松攒</span>
              </div>

              {/* Bubble 2 */}
              <div className="flex flex-col items-center animate-float-fast mb-[20px]">
                  <div className="floating-coin-bubble shadow-blue-100 mb-2">
                       <div className="css-gold-coin"></div>
                       <span className="text-[#111] font-bold text-[12px] font-sans mt-[1px]">140.34</span>
                  </div>
                  <span className="text-[10px] text-gray-500 tracking-widest scale-95">白条购物</span>
              </div>

              {/* Bubble 3 */}
              <div className="flex flex-col items-center animate-float-slower mb-[8px]">
                  <div className="floating-coin-bubble shadow-blue-100 mb-2">
                       <div className="css-gold-coin"></div>
                       <span className="text-[#111] font-bold text-[12px] font-sans mt-[1px]">50.00</span>
                  </div>
                  <span className="text-[10px] text-gray-500 tracking-widest scale-95">主动转入小金库</span>
              </div>

              {/* Bubble 4 with Hand Pointer */}
              <div className="flex flex-col items-center animate-float-slow">
                  <div className="floating-coin-bubble shadow-blue-100 mb-2">
                       <div className="css-gold-coin"></div>
                       <span className="text-[#111] font-bold text-[12px] font-sans mt-[1px]">50.0</span>
                       {/* Hand SVG Component */}
                       <div className="css-hand-pointer !bottom-[-20px] !right-[-25px] rotate-[-25deg]"></div>
                  </div>
                  <span className="text-[10px] text-gray-500 tracking-widest scale-95">小金库工资理财</span>
              </div>
          </div>

          <div className="w-full border-t border-dashed border-gray-200 mt-[10px] pt-[15px] flex justify-center">
              <span className="text-[#f04a4b] text-[10px] tracking-widest opacity-80 font-medium">详细奖励规则以活动页右上方的规则页面为准</span>
          </div>

      </div>

      {/* 
        ========================================================================
         CARD 3: VISUAL DIAGRAM - REWARD MECHANISM
        ========================================================================
      */}
      <div className="mx-[14px] mt-[16px] mb-8 bg-white/95 backdrop-blur-sm rounded-[16px] px-[20px] pt-[20px] pb-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.02)] flex flex-col items-center">
          
          <div className="dashed-diagram-header">花的机智 攒的聪明</div>

          <div className="w-[85%] relative h-[45px]">
              <div className="diagram-connector diagram-connector-left"></div>
              <div className="diagram-connector diagram-connector-right"></div>
          </div>

          <div className="w-[75%] flex justify-between relative -mt-[15px] z-10">
              
              <div className="flex flex-col items-center">
                  <div className="circle-icon-red mb-3">
                      <div className="css-doc-icon">
                          <span className="text-white text-[11px] font-bold tracking-widest rotate-[-90deg] translate-y-1">白条</span>
                      </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#111] tracking-widest">白条购物省</span>
              </div>

              <div className="flex flex-col items-center">
                  <div className="circle-icon-orange mb-3">
                      <div className="css-wallet-icon">
                          <div className="wallet-smile"></div>
                      </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#111] tracking-widest">小金库赚收益</span>
              </div>

          </div>

          <p className="text-[12px] text-gray-500 tracking-widest mt-[25px] mb-[6px]">
              白条购物 × 小金库还款既赚收益又省钱
          </p>

      </div>

    </div>
  );
}
