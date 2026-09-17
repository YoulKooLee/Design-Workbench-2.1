/**
 * @name 理财 (Wealth Management App Homepage Segment)
 */
import React from 'react';
import './style.css';

export default function JDFinanceWealthHome() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative pb-[80px]">
      
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-finance-header guilloche-pattern z-0 pointer-events-none"></div>

      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-3 pb-2 flex items-center justify-between sticky top-0 bg-transparent z-50">
         
         {/* Left: Robot Mascot */}
         <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-sm flex items-center justify-center relative flex-shrink-0 z-20">
            {/* Robot Face Mock */}
            <div className="w-6 h-4 bg-black rounded-full flex justify-center items-center space-x-1 relative">
                <div className="w-1.5 h-1.5 bg-[#fadp4b1] rounded-full bg-[#fbd46b]"></div>
                <div className="w-1.5 h-1.5 bg-[#fadp4b1] rounded-full bg-[#fbd46b]"></div>
            </div>
            <div className="absolute -top-1 w-1.5 h-1.5 bg-[#eb3d30] rounded-full scale-75"></div>
         </div>

         {/* Center: Search / Ticker Chat Bubble */}
         <div className="flex-1 ml-2 mr-3 bg-white/95 backdrop-blur-md rounded-full py-[8px] px-3 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative h-[36px]">
            {/* Bubble Tail Pointing Left */}
            <div className="absolute -left-[4px] top-[12px] w-2 h-2 bg-white/95 transform rotate-45"></div>
            <span className="text-[13px] text-gray-800 truncate z-10 w-[200px]">三大指数集体收涨。上证指数上...</span>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center justify-end space-x-4 pr-1">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="relative">
               <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
                  <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
               </svg>
               {/* Red Dot Badge */}
               <div className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] bg-[#eb3d30] rounded-full border border-white"></div>
            </div>
         </div>
      </div>

      {/* 2. User Guarantee Banner */}
      <div className="mx-4 mt-2 mb-5 guarantee-banner rounded-[10px] pb-4 pt-3 px-3 relative z-10 shadow-[0_4px_10px_rgba(255,230,220,0.4)]">
         
         <div className="absolute top-2 right-2 text-[#d2a392] cursor-pointer">
            <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </div>

         <div className="inline-flex border border-[#eab498] text-[#c07c59] rounded-[2px] px-1 py-[1px] text-[10px] font-medium leading-[12px] bg-white/20 mb-1">
            用户保障
         </div>

         <h2 className="text-[19px] font-bold text-[#9e3a24] mb-1.5 tracking-tight font-sans">
            为3亿+用户提供金融服务
         </h2>

         <div className="flex items-center text-[12px] text-[#b6735e] font-medium space-x-3">
            <div className="flex items-center">
               <svg className="w-3.5 h-3.5 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
               </svg>
               证监会批准
            </div>
            <div className="flex items-center">
               <svg className="w-3.5 h-3.5 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
               </svg>
               民生银行资金监管
            </div>
         </div>

         {/* Graphic Overlay (Trophies mock via SVG paths) */}
         <div className="absolute right-[-10px] bottom-0 w-[140px] h-[80px] pointer-events-none opacity-90 overflow-hidden flex items-end justify-end">
            <svg viewBox="0 0 100 80" className="w-[120px] h-full overflow-visible drop-shadow-md">
               <defs>
                  <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#ffeecc" />
                     <stop offset="50%" stopColor="#eebd73" />
                     <stop offset="100%" stopColor="#ab7834" />
                  </linearGradient>
               </defs>
               {/* Left Tall Trophy/Star */}
               <polygon points="30,10 35,30 50,35 35,40 30,60 25,40 10,35 25,30" fill="url(#gold)" opacity="0.9" />
               <rect x="26" y="60" width="8" height="15" fill="url(#gold)" />
               <rect x="20" y="75" width="20" height="5" fill="#d2964e" />
               <circle cx="30" cy="35" r="4" fill="#ffeecc"/>
               {/* Right Cup */}
               <path d="M 60 45 C 60 60, 80 60, 80 45 L 80 30 L 60 30 Z" fill="url(#gold)" />
               <path d="M 55 35 C 50 35, 50 45, 60 45" fill="none" stroke="url(#gold)" strokeWidth="3"/>
               <path d="M 85 35 C 90 35, 90 45, 80 45" fill="none" stroke="url(#gold)" strokeWidth="3"/>
               <rect x="68" y="56" width="4" height="14" fill="url(#gold)" />
               <rect x="62" y="70" width="16" height="6" fill="#d2964e" />
               <path d="M 65 30 L 75 30 L 70 40 Z" fill="#ffeebb" opacity="0.6"/>
            </svg>
            <div className="absolute bottom-2 right-[60px] w-8 h-8 rounded-full bg-white opacity-40 blur-md mix-blend-overlay"></div>
         </div>
      </div>

      {/* 3. Main Navigation Grid */}
      <div className="w-full px-2 mb-2 grid grid-cols-5 z-10 relative">
         
         {/* Icon 1 */}
         <div className="flex flex-col items-center">
            <div className="w-[42px] h-[42px] bg-gradient-to-b from-[#ffb585] to-[#f47f48] rounded-[14px] flex items-center justify-center shadow-sm relative">
               <div className="absolute top-[-4px] w-6 h-6 border-[3px] border-[#ffb585] rounded-full border-b-0 border-l-0 transform rotate-45 opacity-50"></div>
               {/* Smile */}
               <svg className="w-6 h-6 text-white absolute mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12c1.5 2 4.5 2 6 0" />
               </svg>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">小金库</span>
         </div>

         {/* Icon 2 */}
         <div className="flex flex-col items-center relative">
            <div className="w-[42px] h-[42px] bg-gradient-to-b from-[#fe6b68] to-[#ea343a] rounded-[10px] flex items-center justify-center shadow-sm">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l5-5 3 3 7-7" />
               </svg>
            </div>
            {/* Small floating coin/badge */}
            <div className="absolute right-[6px] bottom-[18px] w-3 h-3 bg-white/50 backdrop-blur-sm border border-white rounded-full flex items-center justify-center text-[6px]">
               <div className="w-1.5 h-1.5 bg-[#ea343a] rounded-sm"></div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">基金</span>
         </div>

         {/* Icon 3 */}
         <div className="flex flex-col items-center">
            <div className="w-[42px] h-[42px] bg-gradient-to-b from-[#76aafd] to-[#396bed] rounded-full flex items-center justify-center shadow-sm relative">
                {/* Tote handle mock */}
                <div className="absolute top-[-3px] w-4 h-4 border-2 border-[#76aafd] rounded-full"></div>
                {/* Shield hole inside */}
                <div className="w-[14px] h-[16px] bg-white rounded-full mt-1 relative">
                   <div className="absolute inset-0 m-auto w-1 h-1 bg-[#396bed] rounded-full"></div>
                </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">稳健理财</span>
         </div>

         {/* Icon 4 */}
         <div className="flex flex-col items-center">
            <div className="w-[42px] h-[42px] bg-transparent flex items-center justify-center space-x-1.5">
               {/* Candlestick 1 */}
               <div className="w-[10px] h-[22px] bg-gradient-to-b from-[#fe6b68] to-[#ea343a] rounded-[2px] relative mt-2">
                  <div className="absolute -top-1.5 left-[3.5px] w-[3px] h-5 bg-[#ea343a] -z-10 rounded"></div>
               </div>
               {/* Candlestick 2 */}
               <div className="w-[10px] h-[16px] bg-gradient-to-b from-[#fe6b68] to-[#ea343a] rounded-[2px] relative mb-4">
                  <div className="absolute -bottom-1.5 left-[3.5px] w-[3px] h-5 bg-[#ea343a] -z-10 rounded"></div>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">股票</span>
         </div>

         {/* Icon 5 */}
         <div className="flex flex-col items-center">
            <div className="w-[42px] h-[42px] bg-transparent flex flex-col items-center justify-center h-full pt-1">
               <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#ffd391] to-[#e49c4f] rounded shadow-sm z-20"></div>
               <div className="flex space-x-[2px] -mt-1 z-10">
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#ffd391] to-[#e49c4f] rounded shadow-sm"></div>
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#ffd391] to-[#e49c4f] rounded shadow-sm"></div>
               </div>
            </div>
            <span className="text-[12px] text-gray-800 font-medium mt-1.5">黄金</span>
         </div>
      </div>
      
      {/* Pagination dots under icons */}
      <div className="flex justify-center items-center space-x-1 mb-5 z-10 relative">
         <div className="w-3 h-[3px] bg-gray-400 rounded-full"></div>
         <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* 4. New User Benefit Card */}
      <div className="mx-4 bg-white rounded-[12px] pt-4 pb-3 px-4 relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.02)] mb-4">
         
         <div className="flex items-center justify-between mb-4">
            <span className="text-[17px] font-bold text-black tracking-tight">新人福利</span>
            <div className="flex items-center text-gray-400 cursor-pointer">
               <span className="text-[12px]">了解黄金</span>
               <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
               </svg>
            </div>
         </div>

         <div className="text-center flex justify-center items-center space-x-1 mb-2">
            <span className="text-[14px]">✍️</span>
            <span className="text-[15px] text-black font-bold tracking-tight">您的黄金权益已到账</span>
         </div>

         <div className="border-t border-b border-gray-100 py-3 my-4 mb-2 flex justify-center items-baseline mx-4 relative">
             <div className="absolute left-0 right-0 top-[8px] border-t border-gray-50 opacity-50"></div>
             <div className="absolute left-0 right-0 bottom-[8px] border-t border-gray-50 opacity-50"></div>
             <span className="text-[46px] font-sans font-bold text-black tracking-tighter leading-none z-10">6.0</span>
             <span className="text-[20px] font-sans font-bold text-black ml-1 z-10">mg</span>
         </div>

         <div className="text-center text-[12px] text-gray-500 font-sans tracking-tight mb-[18px]">
            实时金价784.84元/克，近一年涨幅超42.50%
         </div>

         <div className="w-[85%] mx-auto bg-[#eb3d30] text-white py-[11px] rounded-full text-[16px] font-bold text-center active:scale-95 cursor-pointer shadow-[0_4px_10px_rgba(235,61,48,0.2)]">
            立即提现
         </div>

         <div className="w-full flex justify-center items-center mt-4 mb-1 space-x-1">
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-[3px] bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
         </div>
      </div>

      {/* 5. Split Opportunity Cards */}
      <div className="mx-4 flex space-x-[10px] relative z-10 mb-6">
         
         {/* Left Card: Bond Market */}
         <div className="flex-1 bg-gradient-to-b from-[#f4f8fb] to-[#ffffff] rounded-xl p-3 shadow-sm border border-[#f0f4f8] flex flex-col justify-between">
            <div>
               <div className="flex justify-between items-start mb-2">
                  <span className="text-[15px] font-bold text-black tracking-tight mt-0.5">债市晴雨</span>
                  {/* Glowing Sun Icon */}
                  <div className="w-7 h-7 relative mt-[-2px] mr-[-2px]">
                     <div className="absolute inset-0 bg-[#fbce47] rounded-full blur-[4px] opacity-80"></div>
                     <div className="absolute top-1 left-1 w-5 h-5 bg-[#fbcd40] rounded-full z-10 shadow-[inset_-2px_-2px_4px_rgba(230,150,20,0.5)]"></div>
                     <div className="absolute bottom-1 right-[-4px] w-5 h-2 bg-white/80 rounded-full z-20 blur-[1px]"></div>
                  </div>
               </div>
               <div className="text-[13px] text-black font-medium tracking-tight mb-1">
                  最新债市：行情向好
               </div>
               <div className="text-[12px] text-gray-400 flex items-center">
                  关注<span className="text-[#ea3d33] ml-0.5">连涨机会</span>
               </div>
            </div>

            {/* 5-day Weather Forecast Mock */}
            <div className="flex justify-between items-center mt-3 pr-1">
               {[12, 13, 16, 17].map(day => (
                  <div key={day} className="flex flex-col items-center">
                     <svg className="w-4 h-4 text-[#fbce47] mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                     </svg>
                     <span className="text-[10px] text-gray-400 font-sans scale-90 origin-top">{day}日</span>
                  </div>
               ))}
               <div className="flex flex-col items-center">
                  <svg className="w-4 h-4 text-[#fbce47] mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                     </svg>
                  <span className="text-[10px] text-gray-400 font-sans scale-90 origin-top">昨日</span>
               </div>
            </div>
            
            <div className="w-full flex justify-center items-center mt-2 space-x-1">
               <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
               <div className="w-3 h-[3px] bg-gray-500 rounded-full"></div>
               <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
               <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            </div>
         </div>

         {/* Right Card: Optional Opportunities */}
         <div className="flex-1 bg-white rounded-xl p-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
               <div className="text-[15px] font-bold text-black tracking-tight mb-2 mt-0.5">
                  自选机会
               </div>
               <div className="text-[13px] text-black font-medium tracking-tight mb-1 truncate">
                  永赢科技智选混合发...
               </div>
               <div className="text-[20px] font-bold font-sans text-[#ea3d33] tracking-tight mb-0.5">
                  +58.24%
               </div>
               <div className="text-[11px] text-gray-400 scale-95 origin-left mb-1">
                  成立以来收益率
               </div>
            </div>

            <div className="flex items-end justify-between mt-1">
               <div className="bg-[#fe5b50] text-white text-[12px] font-bold rounded-full px-[14px] py-[5px] active:scale-95 cursor-pointer">
                  加自选
               </div>
               {/* Sparkline Graph */}
               <svg viewBox="0 0 60 25" className="w-[50px] h-6 overflow-visible mb-1">
                  <path d="M0,20 L5,22 L10,18 L15,20 L20,15 L25,18 L30,10 L35,14 L40,8 L45,15 L50,0 L55,5" fill="none" stroke="#ea3d33" strokeWidth="1.5" strokeLinejoin="round"/>
               </svg>
            </div>
         </div>
      </div>

      {/* Global Tab Bar Spacer representation for screenshot completeness */}
      <div className="w-full h-10 bg-white border-t border-gray-100 flex invisible relative z-10"></div> 

      {/* 8. Main App Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#fcfcfc] border-t border-gray-100 flex items-center justify-around z-50 pt-[4px] pb-3 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
         
         <div className="flex flex-col items-center">
            <svg className="w-[26px] h-[26px] text-black mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[11px] font-bold text-gray-800">首页</span>
         </div>

         {/* Active Tab: 理财 */}
         <div className="flex flex-col items-center text-[#ea3d33]">
            <svg className="w-[26px] h-[26px] mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[11px] font-bold">理财</span>
         </div>

         <div className="flex flex-col items-center">
            <svg className="w-[26px] h-[26px] text-black mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold text-gray-800">省钱</span>
         </div>

         <div className="flex flex-col items-center relative">
            <svg className="w-[26px] h-[26px] text-black mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Hovering Red Badge "提现" */}
            <div className="absolute -top-[6px] -right-[12px] bg-[#ea3d33] text-white text-[9px] font-bold rounded-t-[6px] rounded-br-[6px] px-1 py-[1px] transform scale-90 border-[1.5px] border-white z-10">
               提现
            </div>
            <span className="text-[11px] font-bold text-gray-800">社区</span>
         </div>

         <div className="flex flex-col items-center">
            <svg className="w-[26px] h-[26px] text-black mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-bold text-gray-800">我的</span>
         </div>
      </div>

    </div>
  );
}
