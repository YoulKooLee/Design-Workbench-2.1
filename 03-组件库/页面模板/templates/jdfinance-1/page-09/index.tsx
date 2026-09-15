/**
 * @name 基金-自选 (Fund - Optional List)
 */
import React from 'react';
import './style.css';

export default function JDFinanceFundOptional() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-3 flex items-center justify-between sticky top-0 bg-white z-30">
         {/* Left: Back */}
         <div className="w-12 flex items-center">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>

         {/* Center: Title Tabs */}
         <div className="flex items-end space-x-3 mb-[-2px]">
            <span className="text-[18px] text-gray-500 tracking-wide font-medium">基金</span>
            <span className="text-[20px] font-bold text-black tracking-wide">投顾</span>
         </div>

         {/* Right: Actions */}
         <div className="w-16 flex items-center justify-end space-x-3 text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <svg className="w-[26px] h-[26px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
         </div>
      </div>

      {/* 2. Sub-Header: Indices & Departure */}
      <div className="w-full px-5 py-3 flex items-end justify-between border-b border-gray-100">
         <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1 text-gray-600 cursor-pointer">
               <span className="text-[13px] font-medium">上证50</span>
               <span className="text-[12px] opacity-70 transform scale-y-125 mb-[1px]">›</span>
            </div>
            <div className="flex items-baseline space-x-2">
               <span className="text-[#05a860] text-[16px] font-bold font-sans">2679.92</span>
               <span className="text-[#05a860] text-[15px] font-bold font-sans">-0.15%</span>
            </div>
         </div>

         <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

         <div className="flex flex-col items-center justify-center pt-1 cursor-pointer">
            <svg className="w-[22px] h-[22px] text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               {/* Calendar/Board mock */}
               <rect x="4" y="5" width="16" height="14" rx="2" ry="2" />
               <path strokeLinecap="round" d="M8 3v4M16 3v4" />
               {/* Chart line up */}
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 14l3-3 2 2 3-3" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M16 10h-2M16 10v2" />
            </svg>
            <span className="text-gray-500 text-[11px] mt-1">发车</span>
         </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="w-full px-4 py-3 pb-2 flex items-center space-x-3 border-b border-gray-100">
         <div className="bg-[#fff0ef] text-[#ef3b3a] px-5 py-[5px] rounded-full text-[13px] font-bold">
            全部
         </div>
         <div className="bg-[#f2f2f4] text-gray-500 px-5 py-[5px] rounded-full text-[13px] font-medium">
            我的持仓
         </div>
      </div>

      {/* 4. Main Empty State */}
      <div className="flex-1 flex flex-col items-center justify-start pt-[60px] pb-10">
         
         {/* Mascot/Empty Illustration */}
         <div className="relative w-[200px] h-[160px] flex justify-center items-center">
             {/* Small floating bubble top right */}
             <div className="absolute top-[0] right-[10%] w-[12px] h-[12px] rounded-full bg-[#ffecec] shadow-sm border-[1.5px] border-white flex items-center justify-center">
                 <div className="w-1 h-1 bg-white rounded-full"></div>
             </div>

             {/* Pink speech bubble body */}
             <div className="absolute w-[140px] h-[140px] rounded-full bg-gradient-to-t from-[#ffeff0] to-[#fffbfc] shadow-[0_4px_20px_rgba(255,235,235,0.8)] z-0 flex flex-col items-center pt-6">
                 {/* Thought dots */}
                 <div className="flex items-center space-x-2 mb-4">
                     <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                     <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                     <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                 </div>
             </div>
             
             {/* Base shadow glow */}
             <div className="absolute bottom-[-10px] w-[180px] h-[30px] rounded-[100%] bg-gradient-to-t from-[#f6f6f8] to-transparent z-0 opacity-80 filter blur-[4px]"></div>

             {/* Mascot Body Approximation (Dog) */}
             <div className="relative z-10 w-[70px] h-[80px] flex flex-col items-center transform translate-y-6">
                 {/* Dog Head */}
                 <div className="w-[50px] h-[44px] bg-white rounded-[26px] shadow-sm relative z-20 flex flex-col items-center justify-center">
                     {/* Ears */}
                     <div className="absolute w-4 h-[22px] bg-[#ffdbde] rounded-full transform -rotate-[40deg] -left-1 top-2"></div>
                     <div className="absolute w-4 h-[22px] bg-[#ffdbde] rounded-full transform rotate-[40deg] -right-1 top-2"></div>
                     {/* Eyes */}
                     <div className="flex space-x-4 mb-1 relative z-10 w-full justify-center">
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                         <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                     </div>
                     {/* Mouth */}
                     <div className="w-3 h-[18px] bg-[#fb4242] rounded-full relative z-10 mt-[2px] shadow-inner">
                         <div className="w-3 h-[6px] bg-[#ff8686] rounded-full absolute bottom-0 left-0 border-t border-[#da2828]"></div>
                     </div>
                 </div>
                 {/* Dog Body */}
                 <div className="w-[30px] h-[36px] bg-[#fdfdfd] rounded-[14px] shadow-sm -mt-3 relative z-10 flex items-end justify-center pb-1">
                     {/* Arms upwards */}
                     <div className="absolute w-[10px] h-[24px] bg-white rounded-full transform rotate-45 -left-[14px] top-[2px] shadow-sm flex items-start justify-center pt-1"><div className="w-1.5 h-2.5 bg-[#ffdbde] rounded-full"></div></div>
                     <div className="absolute w-[10px] h-[24px] bg-white rounded-full transform -rotate-45 -right-[14px] top-[2px] shadow-sm flex items-start justify-center pt-1"><div className="w-1.5 h-2.5 bg-[#ffdbde] rounded-full"></div></div>
                     {/* Legs */}
                     <div className="flex space-x-1">
                         <div className="w-2.5 h-[14px] bg-[#efefef] rounded-full"></div>
                         <div className="w-2.5 h-[14px] bg-[#efefef] rounded-full"></div>
                     </div>
                 </div>
             </div>
         </div>

         {/* Empty State Text */}
         <span className="text-gray-400 text-[15px] mt-6 tracking-wide">暂无自选</span>

         {/* Add Optional Button */}
         <div className="mt-5 bg-[#ee2f2c] text-white flex items-center justify-center space-x-1 py-[10px] px-8 rounded-full shadow-[0_4px_10px_rgba(238,47,44,0.3)] active:scale-95 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-[14px] font-bold">添加自选</span>
         </div>
      </div>

      {/* 5. Footer Information Block */}
      <div className="w-full bg-[#f6f6f8] flex flex-col items-center justify-start pt-14 pb-[100px] flex-shrink-0 z-0 border-t-2 border-white">
         
         {/* Guarantee Badges Row */}
         <div className="grid grid-cols-3 w-full px-4 mb-4">
            
            <div className="flex flex-col items-center justify-center space-y-1.5">
               <svg className="w-8 h-8 text-[#d0d0d8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 12h-6l2 8-10-14h6L12 2z" />
                  {/* Hexagon/Triangle approximation for CSRC */}
                  <polygon points="12,3 21,11 18,20 6,20 3,11" fill="none" />
               </svg>
               <span className="text-[11px] text-[#c0c0c8] font-medium tracking-wide">证监会批准</span>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-1.5">
               <svg className="w-8 h-8 text-[#d0d0d8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  {/* S ring shape for bank */}
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9s-1.5-1.5-3-1.5S9 9 9 10.5 10.5 13 12 13s3 1.5 3 3-1.5 3-3 3-3-1.5-3-1.5" />
               </svg>
               <span className="text-[11px] text-[#c0c0c8] font-medium tracking-wide">民生银行资金监管</span>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-1.5">
               <svg className="w-8 h-8 text-[#d0d0d8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
               <span className="text-[11px] text-[#c0c0c8] font-medium tracking-wide pr-1">200万资金安全险</span>
            </div>
         </div>

         {/* Disclaimer Texts */}
         <span className="text-xxs text-[#c0c0c8] mt-2 mb-1">
            基金销售服务由 京东肯特瑞基金销售有限公司 提供
         </span>
         <span className="text-xxs text-[#c0c0c8] mb-6">
            市场有风险，投资需谨慎
         </span>

         {/* Watermark Logo */}
         <div className="flex flex-col items-center justify-center mt-3 opacity-40 grayscale">
            <div className="flex items-center space-x-[6px] mb-2">
               <svg className="w-[18px] h-[18px] text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  {/* JD dog logo simplified */}
                  <path d="M12,4 C16.418,4 20,7.582 20,12 C20,13.674 19.486,15.228 18.608,16.5 C19.162,17.489 19.5,18.673 19.5,19.986 C19.5,21.091 18.605,21.986 17.5,21.986 C16.666,21.986 15.952,21.474 15.654,20.732 C14.542,21.246 13.31,21.536 12,21.536 C10.69,21.536 9.458,21.246 8.346,20.732 C8.048,21.474 7.334,21.986 6.5,21.986 C5.395,21.986 4.5,21.091 4.5,19.986 C4.5,18.673 4.838,17.489 5.392,16.5 C4.514,15.228 4,13.674 4,12 C4,7.582 7.582,4 12,4 Z M9.5,10 C8.67157288,10 8,10.6715729 8,11.5 C8,12.3284271 8.67157288,13 9.5,13 C10.3284271,13 11,12.3284271 11,11.5 C11,10.6715729 10.3284271,10 9.5,10 Z M14.5,10 C13.6715729,10 13,10.6715729 13,11.5 C13,12.3284271 13.6715729,13 14.5,13 C15.3284271,13 16,12.3284271 16,11.5 C16,10.6715729 15.3284271,10 14.5,10 Z M12,15 C10.8954305,15 10,15.8954305 10,17 C10,17.5522847 10.4477153,18 11,18 L13,18 C13.5522847,18 14,17.5522847 14,17 C14,15.8954305 13.1045695,15 12,15 Z" />
               </svg>
               <span className="text-[13px] font-black tracking-widest text-[#a0a0aa] font-sans">京东金融</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
               <div className="w-[18px] h-[1px] bg-gray-300"></div>
               <span className="text-[11px] text-[#a0a0aa] tracking-widest">简单 · 快捷 · 安全</span>
               <div className="w-[18px] h-[1px] bg-gray-300"></div>
            </div>
         </div>
      </div>

      {/* 6. Global Tabs (Funds Sector Mode) */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#fcfcfc] border-t border-gray-100 flex items-center justify-around z-50 pb-3 pt-[6px]">
         {/* Found Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-[24px] h-[24px] text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
               <path d="M7 14l3-3 3 3 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] text-gray-700 mt-[3px]">基金</span>
         </div>

         {/* Index Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-[24px] h-[24px] text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <circle cx="12" cy="12" r="9" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l-2 5 5-2" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l2 2-2 2" />
            </svg>
            <span className="text-[11px] text-gray-700 mt-[3px]">指数</span>
         </div>

         {/* Global Investment */}
         <div className="flex flex-col items-center">
            <svg className="w-[24px] h-[24px] text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <circle cx="12" cy="12" r="9" />
               <path strokeLinecap="round" d="M12 3c-3 0-3 18 0 18M12 3c3 0 3 18 0 18" />
               <path strokeLinecap="round" d="M3 12h18" />
            </svg>
            <span className="text-[11px] text-gray-700 mt-[3px]">全球投资</span>
         </div>

         {/* Optional Tab (Active) */}
         <div className="flex flex-col items-center">
            <svg className="w-[24px] h-[24px] text-black" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
               <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-bold text-black mt-[3px]">自选</span>
         </div>

         {/* User Holdings Tab */}
         <div className="flex flex-col items-center cursor-pointer">
            <svg className="w-[24px] h-[24px] text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <circle cx="12" cy="12" r="9" />
               <path d="M10 9l2 2m0 0l2-2m-2 2v5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M9 11h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] text-gray-700 mt-[3px]">持仓</span>
         </div>
      </div>

    </div>
  );
}
