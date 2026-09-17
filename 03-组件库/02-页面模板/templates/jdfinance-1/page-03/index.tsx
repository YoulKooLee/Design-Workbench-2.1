/**
 * @name 优惠券
 */
import React from 'react';
import './style.css';

export default function JDFinanceCoupons() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none pb-12">
      {/* 1. Header Navigation */}
      <div className="w-full bg-white pt-12 pb-2 px-4 shadow-sm z-20 sticky top-0">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0">
            {/* Back Chevron */}
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          <div className="w-full text-center">
            <span className="text-[17px] font-bold text-black tracking-wide">优惠券</span>
          </div>

          <div className="absolute right-0 flex items-center space-x-[18px]">
             {/* Record Icon */}
             <div className="flex flex-col items-center justify-center">
               <svg className="w-5 h-5 text-black mb-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                 <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                 <path d="M8 9h8" />
                 <path d="M8 13h8" />
                 <path d="M8 17h4" />
               </svg>
               <span className="text-[10px] text-black">记录</span>
             </div>
             
             {/* Exchange Icon */}
             <div className="flex flex-col items-center justify-center">
               <div className="w-5 h-5 rounded-full border-[1.8px] border-black flex items-center justify-center mb-[2px]">
                 <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M16 7l-3-3M16 7l-3 3M16 17H8M8 17l3-3M8 17l3 3" />
                 </svg>
               </div>
               <span className="text-[10px] text-black">兑换</span>
             </div>
          </div>
        </div>

        {/* 2. Tabs */}
        <div className="flex items-center justify-between mt-6 px-1">
           <div className="flex items-center space-x-6">
              {/* Active Tab */}
              <div className="relative flex flex-col items-center">
                <span className="text-[14px] font-bold text-black">全部(2)</span>
                <div className="absolute -bottom-2 w-4 h-[3px] bg-[#e1251b] rounded-full"></div>
              </div>
              
              {/* Inactive Tabs */}
              <div className="flex flex-col items-center">
                <span className="text-[14px] text-gray-400">新到(0)</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[14px] text-gray-400">快过期(1)</span>
              </div>
           </div>

           {/* Filter */}
           <div className="flex items-center space-x-1 text-gray-600">
              <span className="text-[13px]">筛选</span>
              <svg className="w-3 h-3 text-gray-400 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
           </div>
        </div>
      </div>

      {/* 3. Section 1: 平台好券 (Platform Coupons) */}
      <div className="px-3 mt-4">
        <h2 className="text-[15px] font-bold text-black mb-3 px-1">平台好券</h2>
        
        <div className="flex flex-col space-y-3">
          
          {/* Card 1 */}
          <div className="coupon-cutout-bg w-full h-[90px] flex">
            {/* Top Left Tag */}
            <div className="absolute top-0 left-0 bg-[#ffeceb] text-[#e1251b] text-[10px] px-[6px] py-[1px] rounded-br-lg rounded-tl-lg z-10 scale-90 origin-top-left">
               支付
            </div>
            
            {/* Top Right Tag */}
            <div className="absolute top-0 right-0 bg-[#ff9e17] text-white text-[10px] px-[6px] py-[1px] rounded-bl-lg rounded-tr-lg z-10 scale-90 origin-top-right">
               快过期
            </div>

            {/* Left Value Area */}
            <div className="w-[100px] h-full flex flex-col items-center justify-center shrink-0 pr-1 pl-2">
               <div className="text-[#fe3840] flex items-baseline justify-center">
                  <span className="text-[28px] font-bold tracking-tight">3</span>
                  <span className="text-[12px] font-bold ml-[1px]">元</span>
               </div>
               <span className="text-[#fe3840] text-[10px] mt-[2px]">满10可用</span>
            </div>

            {/* Dash Line Divider */}
            <div className="w-[1px] h-full flex items-center justify-center">
               <div className="w-full h-[70%] border-l border-dashed border-gray-200"></div>
            </div>

            {/* Right Information Area */}
            <div className="flex-1 h-full flex items-center justify-between px-3 pl-4">
               <div className="flex flex-col justify-center max-w-[150px]">
                  <span className="text-[14px] text-black font-bold truncate">百亿餐补券</span>
                  <div className="flex items-center text-[#fe3840] text-[11px] mt-1 space-x-[2px]">
                     <span>今日23:59过期</span>
                     <span className="scale-75 relative top-[1px]">›</span>
                  </div>
               </div>
               <button className="bg-[#fe3941] text-white rounded-full px-3 py-[5px] text-[12px] font-medium shrink-0 shadow-[0_2px_4px_rgba(254,57,65,0.2)]">
                  去使用
               </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="coupon-cutout-bg w-full h-[90px] flex">
            {/* Top Left Tag */}
            <div className="absolute top-0 left-0 bg-[#ffeceb] text-[#e1251b] text-[10px] px-[6px] py-[1px] rounded-br-lg rounded-tl-lg z-10 scale-90 origin-top-left">
               财富
            </div>

            {/* Left Value Area */}
            <div className="w-[100px] h-full flex flex-col items-center justify-center shrink-0 pr-1 pl-2">
               <div className="text-[#fe3840] flex items-baseline justify-center">
                  <span className="text-[28px] font-bold tracking-tight">5.24</span>
                  <span className="text-[12px] font-bold ml-[1px]">元</span>
               </div>
               <span className="text-[#fe3840] text-[10px] mt-[2px]">至高随机减</span>
            </div>

            {/* Dash Line Divider */}
            <div className="w-[1px] h-full flex items-center justify-center">
               <div className="w-full h-[70%] border-l border-dashed border-gray-200"></div>
            </div>

            {/* Right Information Area */}
            <div className="flex-1 h-full flex items-center justify-between px-3 pl-4">
               <div className="flex flex-col justify-center pr-2">
                  <span className="text-[14px] text-black font-bold leading-snug break-words line-clamp-2">至高5.24元新人专属财运券</span>
                  <div className="flex items-center text-gray-400 text-[11px] mt-2 space-x-[2px]">
                     <span>有效期至 2025.07.19</span>
                     <span className="scale-75 relative top-[1px]">›</span>
                  </div>
               </div>
               <button className="bg-[#fe3941] text-white rounded-full px-3 py-[5px] text-[12px] font-medium shrink-0 shadow-[0_2px_4px_rgba(254,57,65,0.2)]">
                  去使用
               </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* 4. Section 2: 更多推荐好券 (More Recommendation Coupons) */}
      <div className="px-3 mt-8 relative">
        <div className="w-full bg-white rounded-xl shadow-sm p-3 pt-4 flex flex-col relative">
          
          <div className="flex items-end justify-between mb-3 z-10 relative">
            <h2 className="text-[15px] font-bold text-black">更多推荐好券</h2>
          </div>
          
          {/* Animated Mascot Graphic Placeholder */}
          <div className="absolute right-0 -top-6 w-24 h-16 pointer-events-none z-0">
            <svg viewBox="0 0 100 60" fill="none">
               {/* Simple dog head breaking out */}
               <circle cx="70" cy="40" r="20" fill="white" />
               <circle cx="63" cy="35" r="2" fill="black" />
               <circle cx="77" cy="35" r="2" fill="black" />
               <path d="M65 45 Q70 48 75 45" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
               <rect x="62" y="52" width="16" height="4" fill="#e1251b" rx="2" />
               
               {/* Floating coins & red envelopes */}
               <rect x="25" y="15" width="8" height="12" fill="#ff4d4f" rx="1" transform="rotate(-15 25 15)" />
               <rect x="85" y="10" width="6" height="9" fill="#ffd591" rx="1" transform="rotate(25 85 10)" />
               <circle cx="20" cy="40" r="3" fill="#ffc069" />
               <circle cx="45" cy="18" r="2" fill="#ffc069" />
            </svg>
          </div>

          <div className="w-full flex flex-col space-y-3 z-10 relative">
          
          {/* Card 3 (Pink Background) */}
          <div className="coupon-cutout-bg coupon-cutout-pink w-full h-[85px] flex items-center">
            {/* Left Value Area */}
            <div className="w-[100px] h-full flex flex-col items-center justify-center shrink-0 pr-1 pl-2">
               <div className="text-[#fe3840] flex items-baseline justify-center">
                  <span className="text-[26px] font-bold tracking-tight">30.22</span>
                  <span className="text-[12px] font-bold ml-[1px]">元</span>
               </div>
            </div>

            {/* Dash Line Divider */}
            <div className="w-[1px] h-[70%] border-l border-dashed border-[#ffcfcf]"></div>

            {/* Right Information Area */}
            <div className="flex-1 h-full flex items-center justify-between px-3 pl-4">
               <div className="flex flex-col justify-center flex-1 pr-2">
                  <span className="text-[14px] text-black font-bold leading-snug mb-1">京东支付券（激活券）</span>
                  <span className="text-gray-400 text-[11px] truncate">限京东商城App/PC、...</span>
               </div>
               <button className="bg-white border border-[#fe3941] text-[#fe3941] rounded-full px-3 py-[5px] text-[12px] font-bold shrink-0">
                  去激活
               </button>
            </div>
          </div>

          {/* Card 4 (Pink Background) */}
          <div className="coupon-cutout-bg coupon-cutout-pink w-full h-[85px] flex items-center">
            {/* Left Value Area */}
            <div className="w-[100px] h-full flex flex-col items-center justify-center shrink-0 pr-1 pl-2">
               <div className="text-[#fe3840] flex items-baseline justify-center">
                  <span className="text-[26px] font-bold tracking-tight">100</span>
                  <span className="text-[12px] font-bold ml-[1px]">元</span>
               </div>
            </div>

            {/* Dash Line Divider */}
            <div className="w-[1px] h-[70%] border-l border-dashed border-[#ffcfcf]"></div>

            {/* Right Information Area */}
            <div className="flex-1 h-full flex items-center justify-between px-3 pl-4">
               <div className="flex flex-col justify-center flex-1 pr-2">
                  <span className="text-[14px] text-black font-bold leading-snug mb-1">京东支付券</span>
                  <span className="text-gray-400 text-[11px] truncate">京东APP、京东金融A...</span>
               </div>
               <button className="bg-white border border-[#fe3941] text-[#fe3941] rounded-full px-3 py-[5px] text-[12px] font-bold shrink-0">
                  去激活
               </button>
            </div>
          </div>
          
        </div>
        </div>
      </div>

      {/* 5. Footer Watermark / Legal marks */}
      <div className="w-full flex-1 flex flex-col items-center justify-end mt-12 mb-4 opacity-40">
        <div className="flex items-center space-x-[6px] mb-2">
           {/* Gray JD Dog Icon outline */}
           <svg className="w-5 h-5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              {/* Approximated simple dog head silhouette */}
              <path d="M12,4 C16.418,4 20,7.582 20,12 C20,13.674 19.486,15.228 18.608,16.5 C19.162,17.489 19.5,18.673 19.5,19.986 C19.5,21.091 18.605,21.986 17.5,21.986 C16.666,21.986 15.952,21.474 15.654,20.732 C14.542,21.246 13.31,21.536 12,21.536 C10.69,21.536 9.458,21.246 8.346,20.732 C8.048,21.474 7.334,21.986 6.5,21.986 C5.395,21.986 4.5,21.091 4.5,19.986 C4.5,18.673 4.838,17.489 5.392,16.5 C4.514,15.228 4,13.674 4,12 C4,7.582 7.582,4 12,4 Z M9.5,10 C8.67157288,10 8,10.6715729 8,11.5 C8,12.3284271 8.67157288,13 9.5,13 C10.3284271,13 11,12.3284271 11,11.5 C11,10.6715729 10.3284271,10 9.5,10 Z M14.5,10 C13.6715729,10 13,10.6715729 13,11.5 C13,12.3284271 13.6715729,13 14.5,13 C15.3284271,13 16,12.3284271 16,11.5 C16,10.6715729 15.3284271,10 14.5,10 Z M12,15 C10.8954305,15 10,15.8954305 10,17 C10,17.5522847 10.4477153,18 11,18 L13,18 C13.5522847,18 14,17.5522847 14,17 C14,15.8954305 13.1045695,15 12,15 Z" />
           </svg>
           <span className="text-[14px] font-black tracking-widest text-gray-500 font-sans">京东金融</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
           <div className="w-[20px] h-[1px] bg-gray-300"></div>
           <span className="text-[10px] text-gray-400 tracking-widest">简单 · 快捷 · 安全</span>
           <div className="w-[20px] h-[1px] bg-gray-300"></div>
        </div>
      </div>
      
    </div>
  );
}
