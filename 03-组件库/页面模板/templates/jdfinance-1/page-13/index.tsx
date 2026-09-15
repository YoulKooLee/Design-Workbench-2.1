/**
 * @name 黄金豆 (Golden Bean Dashboard)
 */
import React from 'react';
import './style.css';

export default function JDFinanceGoldenBean() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* Background Gradients Layer */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-golden-gradient z-0 pointer-events-none"></div>

      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-2 flex items-center justify-between relative z-50">
         {/* Left: Back */}
         <div className="w-10">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>

         {/* Center: Title */}
         <span className="text-[18px] font-bold text-black tracking-wide">黄金豆</span>

         {/* Right: Actions */}
         <div className="w-10 flex justify-end">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
         </div>
      </div>

      {/* Subtitle */}
      <div className="w-full text-center relative z-40 flex justify-center items-center space-x-1 cursor-pointer">
         <span className="text-[13px] text-[#b08b68] tracking-wide">黄金豆即是黄金基金 0.1元起攒</span>
         <svg className="w-3 h-3 text-[#b08b68]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
         </svg>
      </div>

      {/* Side Slide-in Button */}
      <div className="absolute top-[100px] right-0 bg-[#fad4b1] opacity-90 px-3 py-1.5 rounded-l-full text-[12px] text-[#aa6b3c] font-bold z-40 shadow-sm border border-r-0 border-[#f8c599] flex items-center">
         我的记录
      </div>

      {/* 2. Hero Graphic Area (Mocked structurally) */}
      <div className="w-full h-[360px] relative z-20 mt-4 flex justify-center">
         
         {/* Floating Elements */}
         {/* Left Float: Receive */}
         <div className="absolute top-[20px] left-[10%] flex flex-col items-center z-30">
            <div className="w-[50px] h-[50px] rounded-full glass-bubble flex flex-col items-center justify-center relative cursor-pointer">
                <span className="text-[#e24424] font-bold text-[15px] font-sans">+68</span>
                <div className="w-[14px] h-[14px] rounded-full golden-bean mt-[-2px] ml-4"></div>
            </div>
            <span className="text-[12px] text-[#805a3b] font-medium mt-1">领取</span>
         </div>

         {/* Right Top Float: 1g */}
         <div className="absolute top-[40px] right-[10%] flex flex-col items-center z-30">
            <div className="w-[56px] h-[56px] rounded-full glass-bubble flex flex-col items-center justify-center relative cursor-pointer">
                <span className="text-[#d86638] font-bold text-[16px] font-sans mt-1">1g</span>
                <div className="w-[16px] h-[16px] rounded-full golden-bean mt-[-4px] ml-5"></div>
            </div>
            <span className="text-[12px] text-[#805a3b] font-medium mt-1">攒黄金</span>
         </div>

         {/* Right Bottom Float: Envelope */}
         <div className="absolute top-[170px] right-[5%] flex flex-col items-center z-30">
            <div className="w-[50px] h-[50px] rounded-full glass-bubble flex items-center justify-center relative cursor-pointer pb-1">
                {/* Red Envelope Mock */}
                <div className="w-5 h-6 bg-[#eb3d30] rounded-[3px] relative shadow-inner overflow-hidden border border-[#d22d21] mt-2">
                   <div className="absolute top-0 left-0 w-full h-[12px] bg-[#f54a3e] rounded-b-full shadow-sm"></div>
                   <div className="absolute top-[9px] left-[8px] w-1.5 h-1.5 bg-[#fbd46b] rounded-full"></div>
                </div>
            </div>
            <span className="text-[11px] text-[#805a3b] font-medium mt-1">5.26元红包</span>
         </div>

         {/* Loose golden beans on the ground outside */}
         <div className="absolute bottom-[20px] left-[15%] w-[40px] h-[20px] golden-jar-gold rounded-full opacity-90 blur-[1px] transform -rotate-12 z-30"></div>
         <div className="absolute bottom-[30px] left-[18%] w-[12px] h-[12px] golden-bean rounded-full z-40 shadow-lg"></div>
         <div className="absolute bottom-[24px] left-[12%] w-[16px] h-[16px] golden-bean rounded-full z-40 shadow-lg"></div>

         <div className="absolute bottom-[30px] right-[15%] w-[40px] h-[20px] golden-jar-gold rounded-full opacity-90 blur-[1px] transform rotate-12 z-30"></div>
         <div className="absolute bottom-[40px] right-[14%] w-[14px] h-[14px] golden-bean rounded-full z-40 shadow-lg"></div>
         
         <div className="absolute bottom-[20px] left-[30%] w-[14px] h-[14px] golden-bean rounded-full z-40 shadow-lg"></div>

         {/* JAR STRUCTURAL MOCK */}
         <div className="relative w-[280px] h-[260px] flex flex-col items-center justify-end z-10 pt-4">
            
            {/* The Glass Dome */}
            <div className="absolute top-[15px] w-[220px] h-[220px] rounded-[100px] border-[5px] border-white/40 golden-jar-glass flex flex-col items-center justify-center pointer-events-none z-20">
               {/* Internal Content (Text) */}
               <div className="flex flex-col items-center transform -translate-y-4">
                   <div className="flex items-center space-x-0.5 mt-[-10px]">
                      <span className="text-[13px] font-bold text-black tracking-widest">我的黄金豆</span>
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                   </div>
                   <div className="flex items-baseline mt-[-4px]">
                      <span className="text-[44px] font-bold font-sans tracking-tight text-black">3</span>
                      <span className="text-[16px] font-bold text-black">粒</span>
                   </div>
                   <div className="bg-[#f0e7d7]/80 px-3 py-[2px] rounded-full border border-white/50 text-[12px] text-[#aa8661] font-medium mt-1 backdrop-blur-sm">
                      =30ug黄金 约0.02元
                   </div>
               </div>
            </div>

            {/* Inner Beans sitting inside the dome base */}
            <div className="absolute bottom-[50px] w-[140px] h-[20px] flex justify-center space-x-[-2px] z-10">
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-90"></div>
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-100 transform -translate-y-2"></div>
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-110 shadow-lg opacity-80"></div>
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-90 transform -translate-y-1"></div>
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-100"></div>
               <div className="w-[18px] h-[18px] golden-bean rounded-full scale-90 transform -translate-y-2"></div>
            </div>

            {/* Lid Top */}
            <div className="absolute top-[-5px] w-[90px] h-[25px] golden-jar-gold rounded-t-xl z-30 shadow-[0_4px_10px_rgba(0,0,0,0.2)]"></div>
            {/* The golden neck of the dome */}
            <div className="absolute top-[8px] w-[140px] h-[18px] golden-jar-gold rounded-[4px] z-20 border-b border-[#a96614]"></div>

            {/* Base platform structure */}
            <div className="relative w-[180px] h-[34px] golden-jar-gold rounded-[8px] border-t border-[#ffe083] z-20 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"></div>
            <div className="relative w-[210px] h-[26px] golden-jar-base rounded-[6px] -mt-2 z-10 border-t border-[#777] shadow-[0_15px_30px_rgba(0,0,0,0.4)]"></div>
            
            {/* Ambient Base Shadow underneath the jar */}
            <div className="absolute bottom-[-15px] w-[260px] h-[30px] rounded-[100%] bg-black/30 blur-[6px] z-0"></div>

         </div>

      </div>

      {/* 3. Hero CTA Area */}
      <div className="w-full px-5 relative z-30 flex items-end justify-center space-x-4 mt-[-20px]">
          {/* Left Withdraw btn */}
          <div className="flex-1 bg-[#f19b60] text-white py-[14px] rounded-full text-center text-[18px] font-bold shadow-[0_4px_10px_rgba(241,155,96,0.2)] active:scale-95 cursor-pointer">
             提现
          </div>
          {/* Right Save Gold btn */}
          <div className="flex-1 bg-gradient-to-r from-[#edae6e] to-[#ec8c3b] text-white py-[14px] rounded-full text-center text-[18px] font-bold shadow-[0_4px_10px_rgba(236,140,59,0.3)] relative active:scale-95 cursor-pointer">
             {/* Small floating tooltip pill */}
             <div className="absolute -top-[16px] right-[10px] bg-white text-[#ea5d3b] text-[11px] font-bold px-2 py-0.5 rounded-t-md rounded-bl-md shadow-sm border border-[#fbd4bc]">
                1元试试
             </div>
             1元攒黄金
             {/* Hand cursor mock */}
             <div className="absolute -bottom-[12px] right-[14px] w-6 h-8 z-50 transform rotate-12 drop-shadow-md">
                 {/* Basic emoji hand since pure CSS hands are heavy mapping */}
                 <span className="text-[28px] drop-shadow-md">👆🏻</span>
             </div>
          </div>
      </div>

      {/* Exchange links */}
      <div className="w-full flex justify-center items-center space-x-1 mt-4 relative z-30 cursor-pointer">
         <span className="text-[13px] text-gray-400 font-medium tracking-wide">兑换其他</span>
         <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
         </svg>
      </div>

      {/* 4. Notification / Ticker Card */}
      <div className="mx-4 mt-[30px] bg-white/70 backdrop-blur-md rounded-t-xl pt-4 px-4 pb-1 relative z-20 overflow-hidden shadow-[0_-4px_10px_rgba(0,0,0,0.01)] border-b border-gray-100">
         <div className="w-full flex flex-col space-y-3 pb-2 border-b border-dashed border-gray-200 mask-image-bottom">
            <div className="flex items-center">
               <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#fcde84] to-[#e49339] mr-2"></div>
               <span className="text-[13px] text-gray-800 font-bold truncate">您有3粒黄金豆即将过期 请完善信息</span>
            </div>
            <div className="flex items-center opacity-60">
               <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#fcde84] to-[#e49339] mr-2"></div>
               <span className="text-[13px] text-gray-800 font-bold truncate">共40000 700.00 支付金额0.00%</span>
            </div>
         </div>
      </div>

      {/* 5. Tasks Section */}
      <div className="w-full flex-1 bg-white relative z-20 py-4 pb-[80px]">
         
         <div className="px-4 text-[17px] font-extrabold text-black tracking-tight mb-4 flex items-center space-x-1">
            <span>轻松赚取黄金豆</span>
         </div>

         {/* Heavy/Featured Task Card */}
         <div className="mx-4 bg-gradient-to-r from-[#fcb383] to-[#f49964] rounded-xl relative overflow-hidden mb-5 pt-3 pb-[3px] shadow-[0_4px_15px_rgba(244,153,100,0.2)]">
            {/* Gift Box Graphic Mock in Top Right */}
            <div className="absolute top-[-10px] right-[-10px] w-20 h-20 opacity-90 blur-[0.5px]">
               <div className="w-[50px] h-[40px] bg-gradient-to-br from-[#ffaf7b] to-[#ec5b3e] absolute bottom-[10px] left-[10px] rounded shadow-md transform rotate-12"></div>
               <div className="w-2 h-[50px] bg-[#fbdf6e] absolute bottom-[5px] left-[32px] transform rotate-12 shadow-sm"></div>
               <div className="w-[50px] h-2 bg-[#fbdf6e] absolute bottom-[25px] left-[8px] transform rotate-12 shadow-sm"></div>
               <div className="w-4 h-4 bg-[#fbdf6e] absolute top-[8px] left-[26px] rounded-full shadow-sm transform -rotate-12"></div>
               <div className="w-4 h-4 bg-[#fbdf6e] absolute top-[14px] left-[42px] rounded-full shadow-sm"></div>
            </div>

            {/* Countdown Badge */}
            <div className="ml-4 flex items-center space-x-1 mb-2 font-mono text-[13px] font-bold">
               <div className="bg-white/80 text-[#e65a26] rounded-[2px] px-[2px] backdrop-blur-sm">00</div>
               <span className="text-white">:</span>
               <div className="bg-white/80 text-[#e65a26] rounded-[2px] px-[2px] backdrop-blur-sm">09</div>
               <span className="text-white">:</span>
               <div className="bg-white/80 text-[#e65a26] rounded-[2px] px-[2px] backdrop-blur-sm">55</div>
            </div>

            {/* Inner White Action Card */}
            <div className="bg-white mx-[3px] rounded-[10px] p-3 flex items-center justify-between relative z-10">
               <div className="flex items-center flex-1 pr-2">
                  <div className="w-[42px] h-[42px] bg-[#fcf2ea] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <div className="w-5 h-5 bg-[#ed8a54] rounded flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                     </div>
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                     <span className="text-[15px] font-bold text-black truncate mb-[2px]">体验1元黄金</span>
                     <span className="text-[12px] text-gray-500 truncate">确认后得<span className="text-[#ea3e30]">68粒黄金豆</span></span>
                  </div>
               </div>
               <div className="bg-[#eb3d30] text-white text-[13px] font-bold rounded-full px-4 py-[7px] whitespace-nowrap active:scale-95 cursor-pointer">
                  去领取
               </div>
            </div>
         </div>

         {/* Standard Task Item */}
         <div className="mx-4 flex items-center justify-between py-[14px] border-t border-gray-100">
            <div className="flex flex-col w-[70%]">
               <span className="text-[15px] font-bold text-black tracking-tight mb-1 truncate">体验1000元超额收益好品</span>
               <div className="flex items-center text-[12px]">
                   <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fcde84] to-[#dc8029] mr-1.5 shadow-sm"></div>
                   <span className="text-gray-500">体验即可得<span className="text-[#ea3e30] ml-0.5">68粒黄金豆</span></span>
               </div>
            </div>
            <div className="bg-[#fce6e6] text-[#eb3d30] text-[13px] font-bold rounded-full px-4 py-[7px] active:scale-95 cursor-pointer">
               去领取
            </div>
         </div>
         
         {/* Partially cutoff task */}
         <div className="mx-4 flex items-center justify-between py-[14px] border-t border-gray-100 opacity-60">
            <div className="flex flex-col w-[70%]">
               <span className="text-[15px] font-bold text-black tracking-tight mb-1 truncate">黄金小测验等你来挑战</span>
               <div className="flex items-center text-[12px]">
                   <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#fcde84] to-[#dc8029] mr-1.5 shadow-sm"></div>
                   <span className="text-gray-500">体验即可得<span className="text-[#ea3e30] ml-0.5">68粒黄金豆</span></span>
               </div>
            </div>
            <div className="bg-[#fce6e6] text-[#eb3d30] text-[13px] font-bold rounded-full px-4 py-[7px]">
               去领取
            </div>
         </div>

      </div>

      {/* 6. Fixed Promo Banner at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1b1b1b] px-4 py-3 pb-5 flex items-center z-50 rounded-t-lg shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
         <div className="text-gray-400 mr-2 pr-1 border-r border-[#333] cursor-pointer cursor-ew-resize">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </div>
         {/* Moon/Bean Graphic */}
         <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#eeb072] to-[#ec8c3b] mr-2 flex justify-center items-center relative overflow-hidden shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.2)]">
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#fbd46b] rounded-full"></div>
            <div className="absolute bottom-1 left-2 w-[3px] h-[3px] bg-[#fff] rounded-full shadow-[2px_-2px_0_rgba(255,255,255,0.7)]"></div>
         </div>
         <span className="text-[14px] text-white font-bold flex-1 tracking-tight">
            把“<span className="text-[#eeb072]">黄金豆</span>”添加到首页
         </span>
         <div className="bg-[#eb3d30] text-white text-[13px] font-bold rounded-full px-4 py-1.5 active:scale-95 cursor-pointer shadow-sm">
            立即添加
         </div>
      </div>

    </div>
  );
}
