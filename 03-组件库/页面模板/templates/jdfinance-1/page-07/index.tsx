/**
 * @name 奖励升级弹窗 (Save Money - Reward Upgrade Modal)
 */
import React from 'react';
import './style.css';

export default function JdFinanceRewardModal() {
  return (
    <div className="w-full min-h-screen bg-[#222] flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* --- BACKGROUND MOCK UI (Dimmed) --- */}
      <div className="absolute inset-0 opacity-30 flex flex-col pointer-events-none">
         {/* Top Header Mock */}
         <div className="w-full pt-12 px-4 flex items-center justify-between">
            <div className="flex-1 h-[34px] bg-[#333] rounded-full flex items-center justify-between px-3">
               <div className="flex items-center text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-[14px]">京豆</span>
               </div>
               <div className="bg-[#fe3840] text-white text-[13px] px-3 py-1 rounded-full">搜索</div>
            </div>
            <div className="flex items-center space-x-3 ml-4 text-gray-300">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
            </div>
         </div>
         {/* Fake Content Layers below */}
         <div className="flex-1 p-4 mt-10">
            <div className="w-full h-[120px] bg-[#333] rounded-xl mb-4"></div>
            <div className="w-full h-[120px] bg-[#333] rounded-xl mb-4"></div>
         </div>
         
         {/* Bottom Global Tab Bar Mock */}
         <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#111] border-t border-gray-800 flex items-center justify-around pb-3 pt-1">
             <div className="flex flex-col items-center">
                <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
                </svg>
                <span className="text-[10px] text-gray-500 mt-1">首页</span>
             </div>
             <div className="flex flex-col items-center">
                <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                   <rect x="3" y="6" width="18" height="13" rx="2" ry="2" />
                   <path d="M16 12.5h.01" strokeWidth={3} strokeLinecap="round" />
                </svg>
                <span className="text-[10px] text-gray-500 mt-1">理财</span>
             </div>
             {/* Active Tab: 省钱 */}
             <div className="flex flex-col items-center relative">
                <svg className="w-7 h-7 text-[#ef3b3a]" viewBox="0 0 24 24" fill="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7l2 12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2l2-12-9-5z" />
                   <circle cx="12" cy="12" r="3" fill="#ef3b3a"/>
                   <path d="M12 9v6" stroke="white" strokeWidth="2" />
                </svg>
                <span className="text-[10px] text-[#ef3b3a] font-bold mt-1">省钱</span>
             </div>
             <div className="flex flex-col items-center relative">
                <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z" />
                </svg>
                <span className="text-[10px] text-gray-500 mt-1">社区</span>
                <div className="absolute -top-[4px] -right-[12px] bg-[#555] text-white text-[9px] px-[4px] rounded-bl-[6px] rounded-tr-[6px] rounded-tl-[1px] rounded-br-[1px] scale-90">提现</div>
             </div>
             <div className="flex flex-col items-center">
                <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                   <path d="M12 12C9.24 12 7 9.76 7 7s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                   <path d="M2 20.5C2 15.8 7 14 12 14s10 1.8 10 6.5" />
                </svg>
                <span className="text-[10px] text-gray-500 mt-1">我的</span>
             </div>
         </div>
      </div>

      {/* --- FOREGROUND MODAL OVERLAY --- */}
      <div className="absolute inset-0 flex flex-col items-center z-50 pt-[16vh]">
         
         {/* Top Skip Button */}
         <div className="absolute top-14 right-5 px-3 py-1 border border-[rgba(255,255,255,0.4)] rounded-full bg-[rgba(0,0,0,0.4)] backdrop-blur-sm cursor-pointer active:opacity-70">
            <span className="text-white text-[13px] font-light">跳过</span>
         </div>

         {/* Confetti particles mock (Absolute positioned around the title) */}
         <div className="absolute top-[20%] w-full h-[100px] pointer-events-none z-0">
            <div className="w-[6px] h-[12px] bg-[#66bfff] absolute left-[20%] top-[-20px] transform rotate-45"></div>
            <div className="w-[8px] h-[8px] bg-[#ff6b6b] absolute left-[40%] top-[-10px] transform rotate-12"></div>
            <div className="w-[6px] h-[14px] bg-[#66bfff] absolute right-[25%] top-[-25px] transform -rotate-12"></div>
            <div className="w-[10px] h-[6px] bg-[#ffc64b] absolute left-[30%] bottom-[-10px] transform rotate-[-30deg]"></div>
            <div className="w-[10px] h-[5px] bg-[#ffc64b] absolute right-[15%] bottom-[10px] transform rotate-[45deg]"></div>
            <div className="w-[6px] h-[6px] rounded-full bg-white absolute left-[10%] top-[40px] opacity-70 blur-[1px]"></div>
            <div className="w-[8px] h-[8px] rounded-full bg-white absolute right-[5%] top-[100px] opacity-70 blur-[1px]"></div>
         </div>

         {/* Giant Title */}
         <div className="flex items-center space-x-1 mb-8 z-10 w-full justify-center transform scale-110">
             <span className="text-[34px] font-black italic tracking-tighter text-title-stroke">省钱频道</span>
             <span className="text-[34px] font-black italic tracking-tighter text-[#ffdb4a] text-title-glow pl-1">奖励升级</span>
         </div>

         {/* Rewards Collection White Ribbon (Horizontal Card) */}
         <div className="w-[90%] bg-white rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.5)] p-3 px-4 flex items-center justify-between mb-10 z-10">
            {/* Left Icons Group */}
            <div className="flex items-center space-x-2">
               {/* Item 1 */}
               <div className="flex flex-col items-center">
                  <div className="relative mb-1">
                     <div className="w-9 h-9 jd-bean-small opacity-90 shadow-sm relative">
                        {/* Highlights */}
                        <div className="w-3 h-1 bg-white rounded-full absolute top-[4px] left-[6px] opacity-60 rotate-45"></div>
                     </div>
                     <div className="absolute -bottom-1 -right-2 bg-[#fe3840] text-white text-[10px] font-bold px-[4px] rounded-full border border-white">+2</div>
                  </div>
                  <span className="text-[#d73f15] text-[10px] font-bold mt-1">今日可领</span>
               </div>
               
               {/* Item 2 */}
               <div className="flex flex-col items-center">
                  <div className="relative mb-1">
                     <div className="w-9 h-9 jd-bean-small opacity-90 shadow-sm relative">
                        <div className="w-3 h-1 bg-white rounded-full absolute top-[4px] left-[6px] opacity-60 rotate-45"></div>
                     </div>
                     <div className="absolute -bottom-1 -right-2 bg-[#fe3840] text-white text-[10px] font-bold px-[4px] rounded-full border border-white">+5</div>
                  </div>
                  <span className="text-[#a54c16] text-[10px] mt-1 pr-1">加桌面组件</span>
               </div>
               
               {/* Item 3 */}
               <div className="flex flex-col items-center">
                  <div className="relative mb-1">
                     <div className="w-9 h-9 jd-bean-small opacity-90 shadow-sm relative">
                        <div className="w-3 h-1 bg-white rounded-full absolute top-[4px] left-[6px] opacity-60 rotate-45"></div>
                     </div>
                     <div className="absolute -bottom-1 -right-2 bg-[#f99b24] text-white text-[10px] font-bold px-[4px] rounded-full border border-white">+1</div>
                  </div>
                  <span className="text-[#a54c16] text-[10px] mt-1 pr-1 pl-1">去虎牙</span>
               </div>
               
               {/* Item 4 */}
               <div className="flex flex-col items-center">
                  <div className="relative mb-1">
                     <div className="w-9 h-9 jd-bean-small opacity-90 shadow-sm relative">
                        <div className="w-3 h-1 bg-white rounded-full absolute top-[4px] left-[6px] opacity-60 rotate-45"></div>
                     </div>
                     <div className="absolute -bottom-1 -right-2 bg-[#f99b24] text-white text-[10px] font-bold px-[4px] rounded-full border border-white">+1</div>
                  </div>
                  <span className="text-[#a54c16] text-[10px] mt-1">去京东健康</span>
               </div>
            </div>

            {/* Right Action Button */}
            <div className="w-[85px] h-[36px] bg-gradient-to-r from-[#fc6859] to-[#ee2733] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(238,39,51,0.4)] cursor-pointer">
               <span className="text-white text-[13px] font-bold tracking-wide shadow-sm">一键领取</span>
            </div>
         </div>


         {/* Huge Upgrade Diagram Graphic Area */}
         <div className="w-full px-6 flex items-center justify-center relative mt-6 h-[180px]">
            
            {/* Soft Glow behind graphic */}
            <div className="absolute w-[250px] h-[250px] bg-[#ffd556] rounded-full opacity-10 filter blur-[40px] top-[-30px] z-0"></div>
            
            {/* Left Small Block (Points) */}
            <div className="w-[110px] h-[130px] glow-box-yellow rounded-[24px] flex flex-col items-center justify-end pb-8 relative z-10 transform -translate-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
               {/* Floating Icon Base */}
               <div className="absolute -top-6 w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#ffe7a9] to-[#ffc844] flex items-center justify-center shadow-[0_6px_14px_rgba(255,200,0,0.5)] border-2 border-white">
                  {/* Inner Coin */}
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#ffce49] to-[#f8951d] border-[2px] border-[#ffec9c] flex items-center justify-center">
                     <div className="w-[10px] h-[10px] bg-[#e17411] transform rotate-45 rounded-sm outline outline-1 outline-white/30"></div>
                  </div>
               </div>
               
               <span className="text-[26px] font-black tracking-widest text-[#1a1a1a]">积分</span>
            </div>

            {/* Connector Arrow SVG */}
            <div className="w-[60px] h-[80px] absolute left-[30vw] top-[60px] z-20">
               <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
                  <path d="M 10 90 Q 50 80 80 40 L 60 30 L 95 10 L 90 45 L 70 30 Q 30 70 5 80 Z" 
                        fill="url(#arrowGradient)" />
                  <defs>
                     <linearGradient id="arrowGradient" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                        <stop offset="40%" stopColor="#fe6d60" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ed2823" stopOpacity="1" />
                     </linearGradient>
                  </defs>
               </svg>
            </div>

            {/* Right Large Block (Jingdou) */}
            <div className="w-[170px] h-[160px] rounded-[24px] flex flex-col items-center justify-end pb-4 pl-8 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#ffd359] via-[#fffceb] to-white ml-[-15px]">
               
               {/* Giant Overlapping Beans */}
               <div className="absolute -top-12 -left-6 z-30">
                  <div className="relative">
                     {/* Back Bean */}
                     <div className="w-[70px] h-[70px] jd-bean absolute left-[-10px] top-[10px] transform scale-90 rotate-[10deg] brightness-95 opacity-90 drop-shadow-xl">
                        <div className="w-8 h-2 bg-white rounded-full absolute top-[10px] left-[15px] opacity-70 rotate-45 block"></div>
                     </div>
                     {/* Front Bean */}
                     <div className="w-[80px] h-[80px] jd-bean relative drop-shadow-2xl">
                        {/* Glow highlight inside */}
                        <div className="w-10 h-3 bg-white rounded-full absolute top-[12px] left-[15px] opacity-80 rotate-45 block blur-[1px]"></div>
                     </div>
                  </div>
               </div>

               {/* Content */}
               <span className="text-[32px] font-black tracking-widest text-[#1a1a1a] leading-none mb-2 z-10 w-full text-center pr-3">京豆</span>
               
               {/* Yellow Pill description */}
               <div className="bg-gradient-to-r from-[#ffeeb1] to-[#fff6c2] rounded-full px-2 py-[2px] flex items-center shadow-sm w-max mb-[6px] z-10 ml-[-10px]">
                  <div className="w-3 h-3 jd-bean-small mr-1 shadow-none"></div>
                  <span className="text-[#644a14] text-[11px] font-bold">100京豆=1元</span>
               </div>
               
               {/* Text body */}
               <p className="text-[10px] text-[#787878] leading-tight text-center px-4 w-[110%] ml-[-10%] z-10">
                  京豆可在购物、充值时与优惠券、红包叠加使用；
               </p>
            </div>

         </div>

         {/* Bottom Action CTA Button */}
         <div className="mt-14 w-[75%] h-[50px] rounded-full bg-gradient-to-r from-[#fc655c] via-[#f73f3c] to-[#f42c29] flex items-center justify-center shadow-[0_8px_20px_rgba(244,44,41,0.5)] cursor-pointer active:scale-95 transform transition-transform border-[1px] border-[#ff7b71]">
            {/* Button Inner Text & Glow */}
            <div className="absolute top-1 left-[15%] right-[15%] h-2 bg-white rounded-full opacity-20 blur-[1px]"></div>
            <span className="text-white text-[18px] font-bold tracking-widest text-shadow-sm font-sans drop-shadow-md">开始体验</span>
         </div>
         
         {/* Subtle instruction / link text below btn (mocked empty space for balance) */}
         <div className="mt-4 h-5"></div>

      </div>

    </div>
  );
}
