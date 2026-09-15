/**
 * @name 投顾发车 (Investment Advisor Departure)
 */
import React from 'react';
import './style.css';

export default function JDFinanceDeparture() {
  return (
    <div className="w-full min-h-screen bg-[#f6f7f9] flex flex-col font-sans select-none pb-[84px] bg-departure-header relative overflow-hidden">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-2 flex items-center justify-between sticky top-0 z-30">
         {/* Left: Back */}
         <div className="w-8 flex items-center">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>

         {/* Center: Title */}
         <span className="text-[17px] font-bold text-black tracking-wide">投顾发车</span>

         {/* Right: Menu */}
         <div className="w-8 flex items-center justify-end">
            <svg className="w-7 h-7 text-black transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
         </div>
      </div>

      {/* 2. Banner Area */}
      <div className="w-full mt-4 px-5 relative h-[90px]">
         
         {/* Background Arrow Watermark */}
         <div className="absolute right-0 top-[-30px] w-[140px] h-[160px] watermark-arrow z-0 transform rotate-12"></div>

         <div className="flex flex-col relative z-10 w-full">
            <span className="text-[28px] font-black text-[#601b1b] tracking-tight transform scale-y-110 origin-left mb-3">投顾发车一路相伴</span>
            
            {/* Check Bullet Points */}
            <div className="flex items-center space-x-3 text-[#601b1b] mt-1 text-[13px] font-bold">
               <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 bg-white text-[#601b1b] rounded-full p-[1px]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>紧跟市场</span>
               </div>
               <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 bg-white text-[#601b1b] rounded-full p-[1px]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>悉心择时</span>
               </div>
               <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 bg-white text-[#601b1b] rounded-full p-[1px]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>甄选好基</span>
               </div>
            </div>
         </div>

         {/* Right Callout Pill */}
         <div className="absolute right-0 top-3 bg-[rgba(255,255,255,0.4)] backdrop-blur-sm pl-3 pr-2 py-1 rounded-l-full flex items-center border border-white border-r-0 shadow-sm z-20">
            <span className="text-[12px] text-[#601b1b] font-medium opacity-80 mr-1">了解投顾发车</span>
            <span className="text-[#601b1b] text-[10px] scale-y-150 block mt-[-2px] opacity-70">›</span>
         </div>
      </div>

      <div className="px-[14px] flex flex-col space-y-[14px] z-10 relative mt-2">
         
         {/* 3. Core Status Card */}
         <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-1.5">
                  <svg className="w-5 h-5 text-[#f03b38]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M11.75 22C10.6358 22 9.53252 21.733 8.5471 21.225C7.56169 20.7169 6.72754 20.0003 5.962 19.141C4.852 17.893 4.195 16.326 4.159 14.675C4.12 12.898 4.678 11.238 5.765 9.945C6.88 8.618 8.441 7.42 10.155 6.435C11.534 5.643 12.83 4.29 13.914 2.14C14.004 1.96 14.227 1.914 14.372 2.046C15.114 2.731 15.65 3.528 15.918 4.398C16.4 5.972 16.273 7.64 15.603 9.155L14.773 11.031L16.516 9.87C17.519 9.202 18.791 8.948 19.98 9.19C20.17 9.228 20.25 9.467 20.126 9.613C19.13 10.781 18.497 12.227 18.232 13.805C17.852 16.082 18.337 18.375 19.593 20.17C18.665 20.809 17.574 21.206 16.425 21.31C14.862 21.455 13.23 21.082 11.91 20.128C11.66 19.946 11.3 20.088 11.232 20.387C11.166 20.677 11.157 20.978 11.206 21.285L11.261 21.611C11.272 21.674 11.268 21.741 11.258 21.803C11.328 21.932 11.512 22 11.75 22Z" />
                  </svg>
                  <span className="text-[17px] font-bold text-black tracking-wide">正在发车</span>
               </div>
               <span className="text-[14px] text-gray-500 font-sans tracking-tight">2025年06月19日</span>
            </div>

            <div className="flex justify-between items-stretch">
               {/* Col 1 */}
               <div className="flex flex-col flex-1">
                  <span className="text-[13px] text-gray-600 mb-1">上证指数</span>
                  <div className="flex items-baseline space-x-1">
                     <span className="text-[#f63d3f] text-[18px] font-bold font-sans tracking-tight">3388.81</span>
                     <span className="text-[#f63d3f] text-[13px] font-bold font-sans tracking-tight">+0.04%</span>
                  </div>
               </div>
               
               {/* Col 2 */}
               <div className="flex flex-col flex-1 bg-[#fff6f7] rounded-lg px-3 py-2 border border-[#ffeeef] ml-2">
                  <span className="text-[12px] text-gray-700 mb-0.5">发车组合</span>
                  <span className="text-[#f63d3f] text-[16px] font-sans">19<span className="text-[13px] font-normal ml-[1px]">个</span></span>
               </div>
               
               {/* Col 3 */}
               <div className="flex flex-col flex-1 bg-[#fff6f7] rounded-lg px-3 py-2 border border-[#ffeeef] ml-2">
                  <div className="flex items-center mb-0.5">
                     <span className="text-[12px] text-gray-700">发车信号</span>
                     <div className="w-3 h-3 rounded-full bg-[#fddddf] text-[#f63d3f] flex items-center justify-center text-[8px] font-bold italic ml-1">i</div>
                  </div>
                  <span className="text-[#f63d3f] text-[15px] font-sans tracking-tight mt-[1px]">正常投入</span>
               </div>
            </div>
         </div>

         {/* 4. Fund Cards */}
         <FundCard 
            title="牛气冲冲" 
            date="06月18日" 
            advice="增加投入(2.1倍)" 
            timeLeft="5天14:38:50" 
            sentimentLevel={5} 
         />
         
         <FundCard 
            title="福气满满" 
            date="06月18日" 
            advice="增加投入(2.9倍)" 
            timeLeft="5天14:38:50" 
            sentimentLevel={5} 
         />
         
         <FundCard 
            title="司南全球多元精选" 
            date="06月18日" 
            advice="正常投入(2倍)" 
            timeLeft="1天14:38:50" 
            sentimentLevel={3} 
         />
      </div>

      {/* 5. Advisory Dedicated Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-100 flex items-center justify-around z-50 pb-3 pt-[6px] shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
         {/* Home Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
            </svg>
            <span className="text-[11px] text-gray-500 mt-1">首页</span>
         </div>

         {/* Advisor Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <path d="M12 12C9.24 12 7 9.76 7 7s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
               <path d="M2 20.5C2 15.8 7 14 12 14s10 1.8 10 6.5" />
            </svg>
            <span className="text-[11px] text-gray-500 mt-1">投顾</span>
         </div>

         {/* Dispatch Tab (Active) */}
         <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
               <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
            <span className="text-[11px] font-bold text-black mt-1">发车</span>
         </div>

         {/* Custom Selection Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
               <line x1="12" y1="8" x2="12" y2="16" />
               <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className="text-[11px] text-gray-500 mt-1">自选</span>
         </div>

         {/* User Holdings Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <circle cx="12" cy="12" r="9" />
               <path d="M10 9l2 2m0 0l2-2m-2 2v5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M9 11h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] text-gray-500 mt-1">持仓</span>
         </div>
      </div>

    </div>
  );
}

// Sub-Component: Fund Card
const FundCard = ({ title, date, advice, timeLeft, sentimentLevel }: any) => {
   
   // The color states for the 5-segment sentiment bar
   const isActive = (index: number) => index <= sentimentLevel;

   return (
      <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 flex flex-col">
         {/* Top Info */}
         <div className="flex items-center justify-between mb-4">
            <span className="text-[17px] font-bold text-black tracking-wide">{title}</span>
            <div className="bg-[#eb4b3e] text-white text-[13px] font-medium px-[14px] py-[5px] rounded-full active:opacity-80">
               去上车
            </div>
         </div>

         {/* Details Grid */}
         <div className="grid grid-cols-3 gap-1 mb-5">
            <div className="flex flex-col items-center space-y-[2px]">
               <span className="text-[12px] text-gray-500">发车日期</span>
               <span className="text-[16px] text-black font-medium tracking-tight font-sans">{date}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-[2px] border-l border-r border-[#f0f0f0]">
               <div className="flex items-center space-x-[2px]">
                  <span className="text-[12px] text-gray-500">操作建议</span>
                  <div className="w-[11px] h-[11px] rounded-full bg-[#f3f3f3] text-gray-400 flex items-center justify-center text-[7px] italic font-bold">i</div>
               </div>
               <span className="text-[15px] text-black font-bold tracking-tight font-sans">{advice}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-[2px]">
               <span className="text-[12px] text-gray-500">距结束</span>
               <span className="text-[15px] text-[#f63d3f] font-sans tracking-tight">{timeLeft}</span>
            </div>
         </div>

         {/* Sentiment Bar Indicator */}
         <div className="w-full flex items-center justify-between mt-1 px-1">
            <span className="text-[12px] text-gray-500 shrink-0 mr-4">主理人观点</span>
            <div className="flex-1 flex gap-[3px] h-[6px]">
               <div className={`flex-1 rounded-sm ${isActive(1) ? 'bg-[#eb4b3e]' : 'bg-[#ffe4e1]'}`}></div>
               <div className={`flex-1 rounded-sm ${isActive(2) ? 'bg-[#eb4b3e]' : 'bg-[#ffe4e1]'}`}></div>
               <div className={`flex-1 rounded-sm ${isActive(3) ? 'bg-[#eb4b3e]' : 'bg-[#ffe4e1]'}`}></div>
               <div className={`flex-1 rounded-sm ${isActive(4) ? 'bg-[#eb4b3e]' : 'bg-[#ffe4e1]'}`}></div>
               <div className={`flex-1 rounded-sm ${isActive(5) ? 'bg-[#eb4b3e]' : 'bg-[#ffe4e1]'}`}></div>
            </div>
         </div>
         {/* Sentiment Labels */}
         <div className="w-full flex items-center justify-between mt-[5px] pl-[76px] px-1">
            <div className="flex justify-between w-full">
               <span className={`text-[10px] transform -translate-x-[2px] ${isActive(1) ? 'text-[#eb4b3e]' : 'text-gray-400'}`}>谨慎</span>
               <span className={`text-[10px] transform -translate-x-[4px] ${isActive(2) ? 'text-[#eb4b3e]' : 'text-gray-400'}`}>偏谨慎</span>
               <span className={`text-[10px] transform -translate-x-[2px] ${isActive(3) ? 'text-[#eb4b3e]' : 'text-gray-400'}`}>中性</span>
               <span className={`text-[10px] transform translate-x-[4px] ${isActive(4) ? 'text-[#eb4b3e]' : 'text-gray-400'}`}>偏乐观</span>
               <span className={`text-[10px] transform translate-x-[4px] ${isActive(5) ? 'text-[#eb4b3e]' : 'text-gray-400'}`}>乐观</span>
            </div>
         </div>
      </div>
   );
};
