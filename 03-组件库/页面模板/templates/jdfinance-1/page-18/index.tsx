/**
 * @name 充值中心 (Recharge Center)
 */
import React from 'react';
import './style.css';

export default function JDRechargeCenter() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[20px]">
      
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-recharge-header recharge-hero-pattern z-0 pointer-events-none"></div>

      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-2 flex items-center justify-between sticky top-0 bg-transparent z-50">
         
         <div className="flex items-end flex-1">
            <div className="w-6 mr-1 cursor-pointer">
               <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
               </svg>
            </div>
            <span className="text-[20px] font-bold text-black tracking-wide leading-none">充值中心</span>
            <span className="text-[12px] text-gray-800 font-medium ml-2 mb-[2px] tracking-wide whitespace-nowrap">每月有优惠</span>
         </div>

         <div className="flex flex-col items-center justify-center cursor-pointer ext-black ml-4">
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[10px] font-medium mt-[1px]">订单</span>
         </div>
      </div>

      {/* 2. Phone Number Input Area */}
      <div className="w-full px-4 mt-2 z-10 relative flex flex-col">
          
          {/* Pills */}
          <div className="flex space-x-2 mb-3">
              <div className="bg-white/60 backdrop-blur-md text-gray-600 text-[12px] px-3 py-1 rounded-full font-medium shadow-[0_2px_8px_rgba(0,0,0,0.01)] border border-white/40">
                  我的号码
              </div>
              <div className="bg-white/60 backdrop-blur-md text-gray-600 text-[12px] px-3 py-1 rounded-full font-medium shadow-[0_2px_8px_rgba(0,0,0,0.01)] border border-white/40">
                  + 号码管理
              </div>
          </div>

          {/* Number Display Row */}
          <div className="flex items-end justify-between mb-4 mt-1 border-b-[1.5px] border-black pb-3">
              <div className="flex items-baseline">
                  <span className="text-[36px] font-sans font-bold text-black tracking-tight leading-none">135 2585 2525</span>
                  <span className="text-[13px] text-gray-500 ml-2 font-medium">河南移动</span>
              </div>
              <div className="text-gray-800 cursor-pointer mb-1 mr-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     <line x1="20" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth={1.8}/>
                     <line x1="20" y1="11" x2="24" y2="11" stroke="currentColor" strokeWidth={1.8}/>
                     <line x1="20" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth={1.8}/>
                  </svg>
              </div>
          </div>

          {/* Helper / Save Action Row */}
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-[12px] text-gray-500 font-medium">
                  <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  保存后，下次可快速给该号码充值
              </div>
              <div className="bg-[#ff4141] text-white text-[13px] rounded-full px-4 py-1 font-medium shadow-sm">
                  保存
              </div>
          </div>
      </div>

      {/* 3. Main Phone Bill Grid (充话费) */}
      <div className="mx-4 bg-white rounded-[14px] z-10 relative p-4 mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white">
          
          <div className="flex justify-between items-center mb-3">
              <span className="text-[17px] font-bold text-black">充话费</span>
              <div className="flex items-center text-[12px] text-[#ea3d33]">
                  含京豆最高减¥5.84
                  <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
              
              {/* Option 1: 50 (Inactive) */}
              <div className="bg-[#f5f6f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-transparent">
                  <div className="text-[24px] font-sans font-bold text-black leading-none mb-1">50<span className="text-[12px]">元</span></div>
                  <div className="text-[11px] text-gray-400">中国移动提供</div>
              </div>

              {/* Option 2: 100 (Active) */}
              <div className="bg-[#fff8f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-[#ffdcdc]">
                  <div className="text-[24px] font-sans font-bold text-black leading-none mb-1">100<span className="text-[12px]">元</span></div>
                  <div className="text-[11px] text-[#ea3d33]">券后94.16元</div>
              </div>

              {/* Option 3: 200 (Active) */}
              <div className="bg-[#fff8f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-[#ffdcdc]">
                  <div className="text-[24px] font-sans font-bold text-black leading-none mb-1">200<span className="text-[12px]">元</span></div>
                  <div className="text-[11px] text-[#ea3d33]">券后194.16元</div>
              </div>

              {/* Option 4: 300 (Active) */}
              <div className="bg-[#fff8f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-[#ffdcdc]">
                  <div className="text-[24px] font-sans font-bold text-black leading-none mb-1">300<span className="text-[12px]">元</span></div>
                  <div className="text-[11px] text-[#ea3d33]">券后294.16元</div>
              </div>

              {/* Option 5: -30 (Coupon) */}
              <div className="bg-[#f5f6f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-transparent relative overflow-visible">
                  <div className="text-[24px] font-sans font-bold text-black leading-none mb-1">-¥30</div>
                  <div className="text-[11px] text-gray-500">充值立减</div>
                  
                  {/* Floating Red Envelope/Ticket Badge */}
                  <div className="absolute -bottom-[6px] -right-[6px] w-[22px] h-[22px] bg-[#eb3d30] rounded-full flex items-center justify-center shadow-sm transform -rotate-12 border-2 border-white z-10">
                      {/* Ticket graphic inside badge */}
                      <div className="w-[12px] h-[8px] border-[1px] border-[#fbce47] bg-transparent rounded-[1px] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#fbce47] rounded-full"></div>
                      </div>
                  </div>
              </div>

              {/* Option 6: 免单 */}
              <div className="bg-[#f5f6f8] rounded-lg h-[80px] flex flex-col items-center justify-center border border-transparent">
                  <div className="text-[22px] font-sans font-bold text-black leading-none mb-1 pt-1 tracking-widest">免单</div>
                  <div className="text-[11px] text-gray-400">已中奖166人</div>
              </div>
          </div>

          <div className="w-full flex justify-center items-center mt-3 pt-1 text-[12px] text-gray-500 cursor-pointer">
              可抵扣-￥60.18
              <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
          </div>
      </div>

      {/* 4. Lottery Promo Block (购商品赠彩票券) */}
      <div className="mx-4 bg-white rounded-[14px] z-10 relative pt-4 pb-4 px-4 mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white">
          
          <div className="flex justify-between items-center mb-3">
              <span className="text-[16px] font-bold text-black tracking-tight">购商品赠彩票券</span>
              <div className="flex items-center text-[12px] text-gray-400 cursor-pointer">
                  更多彩票券
                  <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Split Content Box */}
          <div className="w-full rounded-xl flex border border-[#f0f0f0] items-stretch relative overflow-hidden bg-white shadow-sm">
              
              {/* Left Side (Lottery) */}
              <div className="w-[124px] bg-[#fff5f5] flex flex-col items-center justify-start pt-3 relative">
                  {/* "赠" Label */}
                  <div className="absolute top-0 left-0 bg-[#ea3d33] text-white text-[10px] px-1 py-[1px] rounded-br-[4px] opacity-90 z-10">
                      赠
                  </div>
                  
                  <span className="text-[13px] font-bold text-[#ea3d33] mb-2 z-10 tracking-tight">1张彩票券</span>
                  
                  {/* Abstract Logo Mapping DP/CP */}
                  <div className="w-[30px] h-[30px] relative mt-1">
                      <div className="absolute inset-0 m-auto w-[24px] h-[24px] border-[4px] border-[#ea3d33] rounded-full flex items-center justify-center -rotate-45">
                          <div className="w-[4px] h-[30px] bg-[#ea3d33] absolute top-[-6px] left-[6px] transform rotate-[105deg]"></div>
                      </div>
                  </div>
              </div>

              {/* Dynamic Plus Circle Divider */}
              <div className="absolute left-[124px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-white rounded-full border border-[#ea3d33]/20 flex items-center justify-center z-20 shadow-sm">
                  <span className="text-[#ea3d33] text-[12px] font-bold leading-none mt-[-1.5px] ml-[0.5px] scale-125">+</span>
              </div>

              {/* Right Side (Product) */}
              <div className="flex-1 px-3 py-3 pl-5 bg-white relative flex flex-col justify-between">
                  <div className="flex items-center mb-1">
                      {/* Avatar Mock */}
                      <div className="w-4 h-4 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mr-1 flex items-center justify-center overflow-hidden">
                          {/* Face representation */}
                          <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
                      </div>
                      <span className="text-[13px] text-black font-bold tracking-tight">购买财富知识包</span>
                  </div>
                  
                  <div className="flex items-end justify-between mt-2">
                      <div className="flex items-baseline">
                          <span className="text-[18px] font-sans font-bold text-[#ea3d33] leading-none">¥2.99</span>
                          <span className="text-[10px] text-gray-400 line-through ml-1 font-sans">原价¥99</span>
                      </div>
                      <div className="bg-[#ea3d33] text-white text-[12px] rounded-full px-[14px] py-[4px] font-bold shadow-sm active:scale-95">
                          购买
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 5. Discounts Banner (领优惠 省话费) */}
      <div className="mx-4 bg-white rounded-[14px] z-10 relative pt-4 pb-4 mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-white overflow-hidden">
          
          <div className="px-4 flex justify-between items-center mb-3">
              <span className="text-[16px] font-bold text-black tracking-tight">领优惠 省话费</span>
              <div className="flex items-center text-[12px] text-gray-400 cursor-pointer">
                  <span className="text-[#ea3d33]">5</span>个优惠待领取
                  <svg className="w-3 h-3 ml-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
              </div>
          </div>

          {/* Horizontally scrolling ticket list */}
          <div className="w-full px-4 flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
              
              {/* Ticket 1 */}
              <div className="w-[104px] flex-shrink-0 ticket-cutout bg-[#fff3ef] rounded-lg ticket-border flex flex-col h-[94px] overflow-hidden">
                  <div className="flex-1 flex flex-col items-center justify-center pt-2 border-b border-white border-dashed">
                      <div className="text-[#ea3d33] font-sans font-bold leading-none mb-1 text-[22px]"><span className="text-[12px] mr-[1px]">¥</span>2</div>
                      <div className="text-[11px] text-gray-800">满10元可用</div>
                  </div>
                  <div className="h-[34px] flex items-center justify-center px-2 pb-1">
                      <div className="w-full bg-[#ea3d33] text-white text-[11px] rounded-full py-[4px] text-center font-bold">点击领取</div>
                  </div>
              </div>

              {/* Ticket 2 */}
              <div className="w-[104px] flex-shrink-0 ticket-cutout bg-[#fff8f5] rounded-lg ticket-border flex flex-col h-[94px] overflow-hidden opacity-90 border-[#fce4da]">
                  <div className="flex-1 flex flex-col items-center justify-center pt-2 border-b border-[#fce4da] border-dashed">
                      <div className="text-[#ea3d33] font-sans font-bold leading-none mb-1 text-[22px]"><span className="text-[12px] mr-[1px]">¥</span>30</div>
                      <div className="text-[11px] text-gray-800">3分钟到账</div>
                  </div>
                  <div className="h-[34px] flex items-center justify-center px-2 pb-1">
                      <div className="w-full text-[#ea3d33] border border-[#ea3d33]/50 bg-transparent text-[11px] rounded-full py-[3px] text-center font-bold">去完成</div>
                  </div>
              </div>

              {/* Ticket 3 */}
              <div className="w-[104px] flex-shrink-0 ticket-cutout bg-[#fff8f5] rounded-lg ticket-border flex flex-col h-[94px] overflow-hidden opacity-90 border-[#fce4da]">
                  <div className="flex-1 flex flex-col items-center justify-center pt-2 border-b border-[#fce4da] border-dashed">
                      <div className="text-[#ea3d33] font-sans font-bold leading-none mb-1 text-[22px] tracking-tight"><span className="text-[12px] mr-[1px]">¥</span>30.27</div>
                      <div className="text-[11px] text-gray-800 tracking-tight">证券账户开通</div>
                  </div>
                  <div className="h-[34px] flex items-center justify-center px-2 pb-1">
                      <div className="w-full text-[#ea3d33] border border-[#ea3d33]/50 bg-transparent text-[11px] rounded-full py-[3px] text-center font-bold">去完成</div>
                  </div>
              </div>

          </div>
      </div>

      {/* 6. Promotional specific bottom banner section */}
      <div className="mx-4 bg-white rounded-[14px] z-10 relative pt-3 px-4 h-[70px] flex justify-between items-start overflow-hidden border border-white shadow-sm">
          <span className="text-[16px] font-bold text-black transform pt-1">
              限时送<span className="text-[#ea3d33]">50元</span>无门槛话费券
          </span>
          {/* Edge graphical ticket mockup clipping */}
          <div className="w-[80px] h-full absolute right-0 top-0 flex items-center justify-center opacity-90">
             <div className="w-[50px] h-[36px] bg-gradient-to-r from-[#ffe4c2] to-[#ffd19a] transform rotate-12 rounded shadow-sm border border-[#f0c388] mt-4 flex items-center justify-center text-[#d97f25] font-sans font-bold text-[18px]">
                 50<span className="text-[10px]">元</span>
             </div>
          </div>
      </div>

    </div>
  );
}
