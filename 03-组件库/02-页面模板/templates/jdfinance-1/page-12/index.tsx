/**
 * @name 基金-自选 (Fund - Optional List Populated State)
 */
import React from 'react';
import './style.css';

export default function JDFinanceFundOptionalPopulated() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans select-none overflow-x-hidden relative pb-[70px]">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-3 flex items-center justify-between sticky top-0 bg-white z-50">
         {/* Left: Back */}
         <div className="w-12 flex items-center">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>

         {/* Center: Title Tabs */}
         <div className="flex items-end space-x-3 mb-[-2px]">
            <span className="text-[20px] font-bold text-black tracking-wide">基金</span>
            <span className="text-[18px] text-gray-500 tracking-wide font-medium">投顾</span>
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

      {/* 2. Sub-Header Toolbar Section */}
      <div className="w-full pl-4 pr-1 py-4 flex items-center justify-between border-b border-gray-100 mb-1">
         
         {/* Left Side: Market Index */}
         <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1 text-gray-600 cursor-pointer">
               <span className="text-[13px] font-medium">上证指数</span>
               <span className="text-[12px] opacity-70 transform scale-y-125 mb-[1px]">›</span>
            </div>
            <div className="flex items-baseline space-x-[2px]">
               <span className="text-[#ea3e30] text-[16px] font-bold font-sans tracking-tight">3388.81</span>
               <span className="text-[#ea3e30] text-[12px] font-bold font-sans tracking-tight ml-1">+0.04%</span>
            </div>
         </div>

         <div className="h-8 w-[1px] bg-gray-100 flex-shrink-0"></div>

         {/* Right Side: Tools Grid */}
         <div className="flex items-center pr-2 space-x-4">
            
            {/* Tool 1 */}
            <div className="flex flex-col items-center">
               <svg className="w-[22px] h-[22px] text-gray-800 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="10" y1="10" x2="10" y2="20" />
               </svg>
               <span className="text-[10px] text-gray-500 font-medium">大数据榜</span>
            </div>

            {/* Tool 2 */}
            <div className="flex flex-col items-center">
               <div className="w-[22px] h-[22px] flex items-center justify-center text-[13px] font-black text-gray-800 italic mb-1">
                  PK
               </div>
               <span className="text-[10px] text-gray-500 font-medium">基金PK</span>
            </div>

            {/* Tool 3 */}
            <div className="flex flex-col items-center">
               <svg className="w-[22px] h-[22px] text-gray-800 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 11l-2 2M12 11l2 2" />
               </svg>
               <span className="text-[10px] text-gray-500 font-medium">自选分组</span>
            </div>

            {/* Tool 4 */}
            <div className="flex flex-col items-center relative">
               <div className="absolute top-[-2px] right-[-2px] w-[6px] h-[6px] bg-[#eb3d30] rounded-full border border-white"></div>
               <svg className="w-[22px] h-[22px] text-gray-800 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
               </svg>
               <span className="text-[10px] text-gray-500 font-medium">自选资讯</span>
            </div>

         </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="w-full px-4 py-[6px] flex items-center justify-between pb-3">
         <div className="flex items-center space-x-3">
            <div className="bg-[#fff0ef] text-[#ef3b3a] px-5 py-[5px] rounded-full text-[13px] font-bold">
               全部
            </div>
            <div className="bg-[#f2f2f4] text-gray-500 px-5 py-[5px] rounded-full text-[13px] font-medium">
               我的持仓
            </div>
         </div>
         {/* Sort toggle icon */}
         <div className="text-gray-400">
             <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                 {/* Decorative dot mock */}
                 <circle cx="8" cy="6" r="1.5" fill="currentColor"/>
                 <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
             </svg>
         </div>
      </div>

      {/* 4. Fund List Wrapper */}
      <div className="w-full flex flex-col">
         
         {/* Fixed Table Header */}
         <div className="w-full px-4 py-2 border-y border-gray-100 flex items-center bg-white sticky top-[120px] z-40 text-[12px] text-gray-500">
            <div className="w-[38%] flex items-center">
               基金名称
               <svg className="w-3 h-3 ml-0.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" strokeWidth={2}/>
               </svg>
            </div>
            <div className="w-[20%] flex flex-col items-center border-l border-gray-100">
               <div className="flex items-center">
                  净值
                  <svg className="w-3 h-3 ml-0.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" strokeWidth={2}/>
                  </svg>
               </div>
               <span className="text-[10px] scale-90 text-gray-400">06-18</span>
            </div>
            <div className="w-[20%] flex flex-col items-center">
               <div className="flex items-center">
                  估值
                  <svg className="w-3 h-3 ml-0.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" strokeWidth={2}/>
                  </svg>
               </div>
               <span className="text-[10px] scale-90 text-gray-400">06-19</span>
            </div>
            <div className="w-[22%] flex flex-col items-end">
               <span>添加后...</span>
               <span className="text-[10px] scale-90 text-gray-400">添加时长</span>
            </div>
         </div>

         {/* ----- Row 1 ------ */}
         <div className="w-full flex items-center px-4 py-[14px]">
            <div className="w-[38%] flex flex-col pr-2">
               <span className="text-[15px] font-bold text-black tracking-tight leading-snug">华安纳斯达克100ETF联接 (QDII) C</span>
               <span className="text-[13px] text-gray-400 mt-1">014978</span>
            </div>
            <div className="w-[20%] flex flex-col items-center">
               <span className="text-[15px] font-bold font-sans text-black tracking-tight">6.3628</span>
               <span className="text-[12px] font-sans font-medium text-[#05a860] mt-0.5">-1.03%</span>
               <span className="text-[11px] text-gray-400 font-sans mt-0.5">06-17</span>
            </div>
            <div className="w-[20%] flex flex-col items-center">
               <span className="text-[15px] font-bold font-sans text-black tracking-tight">--</span>
            </div>
            <div className="w-[22%] flex flex-col items-end">
               <span className="text-[15px] font-bold font-sans text-black tracking-tight mt-[6px]">0.00%</span>
               <span className="text-[11px] text-gray-400 font-sans mt-0.5 pt-[18px]">1天</span>
            </div>
         </div>

         {/* Embedded Recommendation Card */}
         <div className="mx-4 bg-[#fcfcfd] border border-gray-100 rounded-[10px] p-[14px] flex flex-col relative mb-4">
            <div className="absolute top-3 right-3 text-gray-300">
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </div>
            <div className="flex items-center space-x-1 mb-2">
               {/* Robot Head Mascot */}
               <div className="w-5 h-5 bg-gradient-to-t from-gray-900 to-gray-700 rounded-md flex items-center justify-center relative">
                  <div className="flex space-x-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#fddfa0]"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-[#fddfa0]"></div>
                  </div>
                  <div className="absolute -top-1 w-1 h-1 bg-[#ea3e30] rounded-full"></div>
               </div>
               <span className="text-[14px] font-bold text-black tracking-tight">科技龙头的长期价值投资</span>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-[12px] text-gray-500 tracking-tight">精选全球顶尖科技企业，定期定额平滑风险</span>
               <div className="px-3 py-[3px] border border-[#ea3e30] text-[#ea3e30] text-[12px] font-bold rounded-full cursor-pointer">
                  去定投
               </div>
            </div>
         </div>
         {/* Separator */}
         <div className="w-[calc(100%-2rem)] mx-auto h-[1px] bg-gray-100 mb-1"></div>

         {/* ----- Row 2 ------ */}
         <div className="w-full flex items-center pt-[14px] px-4 pb-6">
            <div className="w-[38%] flex flex-col pr-2">
               <span className="text-[15px] font-bold text-black tracking-tight leading-snug">工银前沿医疗股票A</span>
               <span className="text-[13px] text-gray-400 mt-1">001717</span>
            </div>
            <div className="w-[20%] flex flex-col items-center pt-2">
               <span className="text-[15px] font-bold font-sans text-black tracking-tight mt-[-10px]">3.0560</span>
               <span className="text-[12px] font-sans font-medium text-[#05a860] mt-0.5">-0.26%</span>
            </div>
            <div className="w-[20%] flex flex-col items-center pt-2">
               <span className="text-[15px] font-bold font-sans text-black tracking-tight mt-[-24px]">--</span>
            </div>
            <div className="w-[22%] flex flex-col items-end pt-2">
               <span className="text-[15px] font-bold font-sans text-[#05a860] tracking-tight mt-[-10px]">-10.69%</span>
               <span className="text-[11px] text-gray-400 font-sans mt-0.5">930天</span>
            </div>
         </div>

         {/* 5. Tool Action Bar */}
         <div className="w-full border-y border-gray-100 bg-white grid grid-cols-3 py-[14px] text-[15px] text-black font-medium pb-[20px]">
            <div className="flex items-center justify-center space-x-1 border-r border-gray-100 cursor-pointer">
               <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
               </svg>
               <span>一键下单</span>
            </div>
            <div className="flex items-center justify-center space-x-1 border-r border-gray-100 cursor-pointer">
               <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
               </svg>
               <span>编辑</span>
            </div>
            <div className="flex items-center justify-center space-x-1 cursor-pointer">
               <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>添加自选</span>
            </div>
         </div>

         {/* 6. Hot Recommendations (热门关注) */}
         <div className="w-full bg-[#f6f6f8] h-2"></div>
         <div className="w-full bg-white flex flex-col pt-4">
            
            <div className="w-full px-4 flex items-center justify-between mb-2">
               <span className="text-[17px] font-bold text-black tracking-tight">热门关注</span>
               <div className="flex items-center space-x-1 text-gray-500 cursor-pointer">
                  <span className="text-[13px] font-medium">换一批</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
               </div>
            </div>

            {/* Hot Item 1 */}
            <div className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-100">
               <div className="flex flex-col w-[50%] pr-4">
                  <span className="text-[15px] font-bold text-black tracking-tight mb-2 leading-snug">中银港股通医药混合发起C</span>
                  <span className="text-[12px] text-gray-400 font-sans tracking-tight">020398</span>
               </div>
               <div className="flex flex-col items-center w-[25%] mt-[-10px]">
                  <span className="text-[17px] font-bold text-[#eb3d30] font-sans tracking-tight mb-2">+75.64%</span>
                  <span className="text-[11px] text-gray-400">近一年涨跌幅</span>
               </div>
               <div className="flex flex-col items-end justify-center w-[25%] pl-4 border-l border-gray-100 mt-[-10px]">
                  <div className="flex flex-col items-center text-gray-400 group cursor-pointer">
                     <svg className="w-5 h-5 mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                     </svg>
                     <span className="text-[11px]">加自选</span>
                  </div>
               </div>
            </div>

            {/* Hot Item 2 */}
            <div className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-100">
               <div className="flex flex-col w-[50%] pr-4">
                  <span className="text-[15px] font-bold text-black tracking-tight mb-2 leading-snug">汇添富国证港股通创新药ETF发...</span>
                  <span className="text-[12px] text-gray-400 font-sans tracking-tight">021031</span>
               </div>
               <div className="flex flex-col items-center w-[25%] mt-[-10px]">
                  <span className="text-[17px] font-bold text-[#eb3d30] font-sans tracking-tight mb-2">+75.31%</span>
                  <span className="text-[11px] text-gray-400">近一年涨跌幅</span>
               </div>
               <div className="flex flex-col items-end justify-center w-[25%] pl-4 border-l border-gray-100 mt-[-10px]">
                  <div className="flex flex-col items-center text-gray-400 group cursor-pointer">
                     <svg className="w-5 h-5 mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                     </svg>
                     <span className="text-[11px]">加自选</span>
                  </div>
               </div>
            </div>

         </div>

      </div>

      {/* 7. Global Tabs (Funds Sector Mode) */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#fcfcfc] border-t border-gray-100 flex items-center justify-around z-50 pb-3 pt-[6px]">
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
         <div className="flex flex-col items-center relative">
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
