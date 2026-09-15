/**
 * @name 白金合伙人 (Platinum Partner Landing Page)
 */
import React from 'react';
import './style.css';

export default function JDPlatinumPartner() {
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
          
          <div className="w-8"></div>
      </div>

      {/* 
        ========================================================================
         TOP CARD (Partial Section 1 + Full Section 2)
        ========================================================================
      */}
      <div className="mx-[14px] bg-white/95 rounded-[20px] rounded-t-none pt-4 pb-[20px] px-[20px] relative shadow-[0_5px_15px_rgba(0,0,0,0.02)] mt-[-10px] backdrop-blur-sm">
          
          {/* Mocked Remnant of Section 01 */}
          <div className="flex justify-between items-center mb-6 pl-2">
              <div className="flex items-center text-[13px] text-gray-500 tracking-wide font-medium">
                  {/* Fake tiny red doc icon */}
                  <div className="w-[12px] h-[16px] bg-[#f04a4b] rounded-[1px] mr-2 flex justify-center items-center">
                     <span className="text-[6px] text-white scale-75">白条</span>
                  </div>
                  购物打白条！能省钱！
              </div>
              <div className="bg-[#f04a4b] text-white text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm hover:opacity-90 transition">
                  去购物
              </div>
          </div>
          <div className="flex justify-between items-center mb-4 pl-2">
              <div className="flex items-center text-[13px] text-gray-500 tracking-wide font-medium">
                  {/* Fake tiny orange bag icon */}
                  <div className="w-[14px] h-[14px] bg-[#fca156] rounded-[5px_5px_8px_8px] mr-2"></div>
                  用小金库攒钱！赚收益！
              </div>
              <div className="bg-[#f04a4b] text-white text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm hover:opacity-90 transition">
                  攒一笔
              </div>
          </div>

          {/* SECTION 02: Reward Mechanics */}
          <div className="flex items-baseline mb-[14px] mt-[40px]">
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
                  
                  {/* Inline visual coin icon */}
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#f4f6fa] border border-[#e6eaf3] mx-1 relative bottom-[1px]">
                      <span className="text-[#fca156] text-[10px] font-bold scale-[0.6]">200</span>
                  </span>
                  ，单月上限2万
              </p>

              <p className="text-[13px] text-gray-500 tracking-wider flex items-center flex-wrap leading-relaxed">
                  ·最低满888就能兑换<span className="text-[#f04a4b] mx-1">0.88元红包</span>
                  
                  {/* Inline visual red packet icon */}
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
                       {/* Pointing Hand Abstract SVG */}
                       <div className="css-hand-pointer"></div>
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
      <div className="mx-[14px] mt-[12px] bg-white rounded-[16px] px-[20px] pt-[20px] pb-[25px] shadow-[0_5px_15px_rgba(0,0,0,0.02)] flex flex-col items-center">
          
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
          <span className="text-[16px] font-bold text-[#111] tracking-widest">
              你就是优秀的白金合伙人
          </span>

      </div>

      {/* 
        ========================================================================
         BOTTOM SEARCH ACTION FOOTER
        ========================================================================
      */}
      <div className="mx-[30px] mt-[35px] bg-[#f04a4b] rounded-full flex justify-between items-center py-[2px] pl-[18px] pr-[2px] shadow-[0_6px_20px_rgba(240,74,75,0.3)] cursor-pointer active:scale-95 transition">
          
          <div className="flex items-center text-white">
              <span className="text-[15px] font-black mr-[6px] italic">来</span>
              {/* Abstract tiny JD Dog Box */}
              <div className="w-[18px] h-[18px] bg-white rounded-md flex items-center justify-center mr-[6px] overflow-hidden p-1 shadow-sm">
                  {/* Fake face shape */}
                  <div className="w-full h-[60%] bg-[#f04a4b] rounded-[10px_10px_4px_4px] flex justify-center">
                     <span className="text-white text-[5px] scale-50">oo</span>
                  </div>
              </div>
              <span className="text-[15px] font-black tracking-widest font-sans opacity-95">京东金融搜</span>
          </div>

          <div className="bg-white rounded-full flex items-center justify-center px-[25px] py-[10px]">
              <svg className="w-[16px] h-[16px] text-[#f04a4b] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-[#f04a4b] font-bold text-[15px] tracking-widest ml-1">白金合伙人</span>
          </div>

      </div>

      {/* Footer watermark */}
      <div className="w-full flex flex-col items-center mt-[45px] pb-[20px] opacity-40 mix-blend-multiply pointer-events-none">
          <div className="flex items-center text-[#999] mb-1">
              <div className="w-[18px] h-[18px] bg-gray-300 rounded-md flex items-center justify-center mr-1">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-[16px] font-black tracking-widest ml-1 text-gray-400">京东金融</span>
          </div>
          <div className="flex items-center w-[160px] justify-between">
              <div className="h-px bg-gray-300 w-4"></div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-gray-400 ml-1">简单 · 快捷 · 安全</span>
              <div className="h-px bg-gray-300 w-4"></div>
          </div>
      </div>

    </div>
  );
}
