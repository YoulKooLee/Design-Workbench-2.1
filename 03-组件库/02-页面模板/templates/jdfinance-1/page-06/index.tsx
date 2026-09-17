/**
 * @name 社区
 */
import React from 'react';
import './style.css';

export default function JDFinanceCommunity() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none pb-[84px] bg-community-header relative">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-12 px-4 pb-2 flex items-center justify-between sticky top-0 z-30 bg-gradient-to-b from-[#fbf9fa] to-transparent">
         {/* Left: Search */}
         <div className="w-8">
            <svg className="w-[22px] h-[22px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
         </div>

         {/* Center: Tabs */}
         <div className="flex items-center space-x-6 relative">
            <span className="text-[16px] text-gray-500 tracking-wide">关注</span>
            
            <div className="flex flex-col items-center relative">
               <span className="text-[18px] font-bold text-black tracking-wide">社区</span>
               <div className="absolute -bottom-[6px] w-[20px] h-[3px] bg-black rounded-full"></div>
            </div>

            <div className="relative flex flex-col items-center">
               <span className="text-[16px] text-gray-500 tracking-wide">视频</span>
               <div className="absolute -top-[8px] -right-[22px] bg-[#fe3840] text-white text-[9px] px-[4px] py-[1px] rounded-tl-[6px] rounded-br-[6px] rounded-tr-[6px] rounded-bl-[1px] scale-90 whitespace-nowrap z-10 shadow-sm">
                  提现
               </div>
            </div>
         </div>

         {/* Right: Notifications & Avatar */}
         <div className="flex items-center space-x-4">
            <svg className="w-[22px] h-[22px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="w-[26px] h-[26px] rounded-full bg-[#f48a4c] border border-white flex items-center justify-center overflow-hidden flex-shrink-0 relative">
               <div className="w-6 h-6 bg-[#2e1d1f] rounded-full absolute bottom-[-4px] translate-y-1 translate-x-1"></div>
               <div className="w-3 h-4 bg-[#c27c62] rounded-full absolute top-[4px] right-1 transform rotate-12"></div>
            </div>
         </div>
      </div>

      {/* 2. Horizontal Menu Categories */}
      <div className="w-full mt-4 px-4 overflow-hidden relative">
         <div className="flex items-center justify-between">
            {/* Menu Item 1 */}
            <div className="flex flex-col items-center">
               <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#fead54] to-[#ff7d36] flex items-center justify-center shadow-[0_2px_8px_rgba(255,125,54,0.3)] mb-[6px] relative">
                  <div className="w-[22px] h-[22px] border-[2px] border-white rounded-full absolute top-[6px] left-[6px]"></div>
                  <div className="w-[10px] h-[10px] border-[2px] border-white rounded-full absolute bottom-[10px] right-[8px]"></div>
                  <div className="w-[6px] h-[6px] bg-white rounded-full absolute bottom-[10px] left-[10px]"></div>
               </div>
               <span className="text-[12px] text-gray-800 font-medium tracking-wide">金友圈</span>
            </div>

            {/* Menu Item 2 */}
            <div className="flex flex-col items-center">
               <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#e1251b] flex items-center justify-center shadow-[0_2px_8px_rgba(225,37,27,0.3)] mb-[6px] relative">
                  <div className="w-[24px] h-[24px] border-[2px] border-white rounded-full flex items-center justify-center overflow-hidden relative">
                     <svg className="absolute inset-[3px]" viewBox="0 0 24 24" fill="none">
                        <path d="M4 16 L10 10 L14 14 L20 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                     </svg>
                     <div className="w-2 h-2 border-t-[2px] border-r-[2px] border-white transform rotate-0 absolute top-[4px] right-[4px]"></div>
                  </div>
               </div>
               <span className="text-[12px] text-gray-800 font-medium tracking-wide">基金圈</span>
            </div>

            {/* Menu Item 3 */}
            <div className="flex flex-col items-center">
               <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#ff7a73] to-[#fb4242] flex items-center justify-center shadow-[0_2px_8px_rgba(251,66,66,0.3)] mb-[6px] relative">
                  {/* Silhouette */}
                  <div className="w-[16px] h-[16px] bg-white rounded-full absolute top-[8px]"></div>
                  <div className="w-[26px] h-[16px] bg-white rounded-t-[12px] absolute bottom-[4px]"></div>
                  {/* Star Badge */}
                  <div className="w-[14px] h-[14px] bg-[#fbdf66] border border-white rounded-full absolute bottom-[8px] right-[4px] flex items-center justify-center">
                     <svg className="w-2 h-2 text-[#e1251b]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z"/>
                     </svg>
                  </div>
               </div>
               <span className="text-[12px] text-gray-800 font-medium tracking-wide">基金牛人榜</span>
            </div>

            {/* Menu Item 4 */}
            <div className="flex flex-col items-center">
               <div className="w-[46px] h-[46px] rounded-[16px] bg-gradient-to-br from-[#77a1ff] to-[#456be3] flex items-center justify-center shadow-[0_2px_8px_rgba(69,107,227,0.3)] mb-[6px] transform rotate-3">
                  <span className="text-white font-bold text-[14px] transform -rotate-3 tracking-widest">创作</span>
               </div>
               <span className="text-[12px] text-gray-800 font-medium tracking-wide">创作中心</span>
            </div>

            {/* Menu Item 5 */}
            <div className="flex flex-col items-center">
               <div className="w-[46px] h-[46px] rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#fb4242] flex items-center justify-center shadow-[0_2px_8px_rgba(251,66,66,0.2)] mb-[6px] relative">
                  {/* Bag shape */}
                  <div className="w-[20px] h-[16px] bg-[#ffcfcf] rounded-[4px] relative mt-2 flex items-center justify-center">
                     <div className="absolute -top-2 w-[10px] h-[6px] border-[2px] border-[#ffcfcf] rounded-t-full"></div>
                  </div>
                  {/* Star Icon overlay */}
                  <div className="absolute top-[8px] right-[6px]">
                     <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z"/>
                     </svg>
                  </div>
               </div>
               <span className="text-[12px] text-gray-800 font-medium tracking-wide">福利专区</span>
            </div>
         </div>
         {/* Page Indicator */}
         <div className="flex items-center justify-center mt-[10px]">
             <div className="w-[12px] h-[3px] bg-gray-400 rounded-full mr-[4px]"></div>
             <div className="w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
         </div>
      </div>

      <div className="px-3 mt-4 flex flex-col space-y-3 z-10 relative">
         
         {/* 3. Feed Post Card */}
         <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-4 pb-1">
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 mb-3">
               <div className="flex items-center space-x-2">
                  {/* Avatar */}
                  <div className="w-[38px] h-[38px] rounded-full bg-[#fff6ed] border border-[#ffdbb2] flex items-center justify-center relative overflow-hidden">
                     {/* Mascot / Fortune Cat Mock */}
                     <div className="w-6 h-6 bg-white rounded-full absolute top-[6px]"></div>
                     <div className="w-2 h-2 bg-black rounded-full absolute top-[12px] left-[10px]"></div>
                     <div className="w-2 h-2 bg-black rounded-full absolute top-[12px] right-[10px]"></div>
                     <div className="w-8 h-3 bg-[#e2231a] absolute bottom-1 text-[5px] text-[#fbdf66] flex items-center justify-center">招财</div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[15px] font-bold text-black tracking-wide">上班族学理财</span>
                     <span className="text-[11px] text-gray-400 mt-[-1px]">17小时前</span>
                  </div>
               </div>
               <div className="flex items-center text-gray-400 font-normal space-x-[2px]">
                  <span className="text-[15px] leading-none mb-[2px]">+</span>
                  <span className="text-[13px]">关注</span>
               </div>
            </div>

            {/* Post Content */}
            <div className="px-4">
               <p className="text-[17px] text-black font-medium leading-[1.5] tracking-wide text-title-ellipsis">
                 寻人启事：这位失踪已久的牛人，快来看看吧，你这一年在京东金融赚了156万！
               </p>
               <p className="text-[14px] text-gray-400 leading-[1.5] mt-2 line-clamp-2 pr-2">
                 #晒出你的基金引路人#基金界惊现“卧龙”：以静制动、清静无为，近一年收益达到156w！
               </p>
            </div>

            {/* Image Grid Placeholder */}
            <div className="px-4 mt-3 flex items-center space-x-2 h-[160px]">
               {/* Left Image (Mocked table graphic) */}
               <div className="flex-1 h-full bg-[#f6f9f8] rounded-[8px] border border-gray-100 p-2 relative overflow-hidden">
                  <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1 mb-2">
                     <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full bg-blue-900 border-[0.5px] border-yellow-500"></div>
                        <div className="w-12 h-1.5 bg-gray-300 rounded-sm"></div>
                     </div>
                     <div className="w-16 h-1.5 bg-[#fe3840] rounded-sm opacity-60"></div>
                  </div>
                  {/* Fake rows */}
                  <div className="space-y-3 mt-4">
                     <div className="w-full flex justify-between">
                        <div className="w-1/3 h-1.5 bg-gray-300 rounded-sm"></div>
                        <div className="w-1/4 h-1.5 bg-[#fe3840] rounded-sm opacity-60"></div>
                     </div>
                     <div className="w-full flex justify-between">
                        <div className="w-1/2 h-1.5 bg-gray-300 rounded-sm"></div>
                        <div className="w-1/5 h-1.5 bg-[#fe3840] rounded-sm opacity-60"></div>
                     </div>
                     <div className="w-full flex justify-between">
                        <div className="w-2/5 h-1.5 bg-gray-300 rounded-sm"></div>
                        <div className="w-1/3 h-1.5 bg-[#fe3840] rounded-sm opacity-60"></div>
                     </div>
                     <div className="w-1/4 h-[40px] bg-[#fbdf66] absolute -right-2 top-10 opacity-20 transform -rotate-12 blur-[2px]"></div>
                  </div>
               </div>

               {/* Right Image (Mocked table graphic) */}
               <div className="flex-1 h-full bg-[#fbfbfa] rounded-[8px] border border-gray-100 p-2 relative overflow-hidden">
                  <div className="w-full flex items-center justify-center border-b border-gray-200 pb-1 mb-2">
                     <span className="text-[8px] text-black font-bold">基金持仓</span>
                  </div>
                  {/* Fake matrix */}
                  <div className="flex justify-between mt-2">
                     <div className="flex flex-col space-y-2 w-1/2">
                        <div className="w-full h-1 bg-gray-300 rounded-sm"></div>
                        <div className="w-3/4 h-1 bg-gray-300 rounded-sm"></div>
                        <div className="w-5/6 h-1 bg-gray-300 rounded-sm mt-3"></div>
                        <div className="w-1/2 h-1 bg-gray-300 rounded-sm"></div>
                     </div>
                     <div className="flex flex-col space-y-2 w-1/3 items-end">
                        <div className="w-full h-1 bg-green-500 rounded-sm opacity-60"></div>
                        <div className="w-1/2 h-1 bg-[#fe3840] rounded-sm opacity-60 mt-3"></div>
                        <div className="w-full h-1 bg-green-500 rounded-sm opacity-60 mt-3"></div>
                     </div>
                  </div>
                  
                  {/* "+1" Overlay */}
                  <div className="absolute bottom-0 right-0 w-[40px] h-[40px] bg-[rgba(0,0,0,0.4)] rounded-tl-[8px] rounded-br-[8px] flex items-center justify-center">
                     <span className="text-white text-[16px] font-bold">+1</span>
                  </div>
               </div>
            </div>

            {/* Topic Link Pill */}
            <div className="px-4 mt-3">
               <div className="inline-flex items-center space-x-1 bg-[#fff6ef] text-[#f76d29] px-[10px] py-[4px] rounded-full">
                  <div className="w-[14px] h-[14px] rounded-full bg-[#f76d29] flex items-center justify-center">
                     <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                     </svg>
                  </div>
                  <span className="text-[13px] font-bold">基金圈</span>
                  <span className="text-[12px] font-medium opacity-80 pl-1">25.9万个讨论 ›</span>
               </div>
            </div>

            {/* Divider */}
            <div className="w-[calc(100%-2rem)] h-[1px] bg-gray-100 mx-auto mt-4"></div>

            {/* Footer Action Bar */}
            <div className="flex items-center justify-between px-5 py-[12px]">
               <div className="flex items-center space-x-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-[13px] font-medium">分享</span>
               </div>
               <div className="flex items-center space-x-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[13px] font-medium">3</span>
               </div>
               <div className="flex items-center space-x-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514C5.7 9.8 5.48 8.4 5.48 7.3c0-.98.79-1.78 1.77-1.78 1 0 1.8.8 1.8 1.8V10" />
                  </svg>
                  <span className="text-[13px] font-medium">34</span>
               </div>
               <div className="text-gray-300 ml-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </div>
            </div>
         </div>

         {/* 4. Leaderboard Panel */}
         <div className="w-full bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 pb-6 mt-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 mt-2">
               <div className="flex items-center space-x-2">
                  {/* Red Text Logo Box */}
                  <div className="w-9 h-9 rounded-full bg-[#f03b38] flex items-center justify-center shadow-sm relative">
                     <span className="text-white text-[16px] font-bold font-sans transform skew-x-[-10deg]">榜</span>
                     {/* Splash strokes */}
                     <div className="absolute top-[2px] right-0 w-[4px] h-[8px] bg-red-400 rotate-45 skew-x-[20deg]"></div>
                     <div className="absolute bottom-[2px] left-0 w-[5px] h-[5px] bg-red-400 rotate-12 skew-y-[10deg]"></div>
                  </div>
                  <div className="flex flex-col mb-1">
                     <span className="text-[16px] font-bold text-black tracking-wide leading-tight">基金实盘牛人榜</span>
                     <span className="text-[11px] text-gray-400 mt-[2px]">真实实盘牛人 跟随大佬操作</span>
                  </div>
               </div>
               
               <div className="flex items-center text-gray-400">
                  <span className="text-[13px] tracking-wide">关注牛人</span>
                  <span className="scale-75 text-[14px]"> ›</span>
               </div>
            </div>

            {/* Cards Grid */}
            <div className="flex justify-between space-x-2 mt-4 pt-4 relative">
               
               {/* Place 1 */}
               <div className="flex-1 bg-rank-1 rounded-lg flex flex-col items-center pt-6 pb-3 px-1 relative h-[140px]">
                  {/* Medal 1 */}
                  <div className="absolute -top-5 w-8 h-10 flex flex-col items-center drop-shadow-sm">
                     <div className="w-3 h-3 bg-[#f1bc66] -mb-1 rounded-sm z-0"></div>
                     <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#ffd361] to-[#ffb617] border-2 border-white flex items-center justify-center z-10 shadow-sm">
                        <span className="text-white text-[15px] font-bold italic pr-[1px]">1</span>
                     </div>
                  </div>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white shadow-sm mt-1 overflow-hidden">
                     {/* Fake Silhouette */}
                     <div className="w-full h-full bg-[#8ba4b3] relative"></div>
                  </div>
                  {/* User Data */}
                  <span className="text-[12px] font-medium text-black mt-2 truncate w-full text-center">金生四海</span>
                  <span className="text-[#f63d3f] text-[13px] font-bold font-sans mt-1 leading-tight">+3,893,892.38</span>
                  <span className="text-gray-400 text-[10px] mt-1 shrink-0">收益额</span>
               </div>

               {/* Place 2 */}
               <div className="flex-1 bg-rank-2 rounded-lg flex flex-col items-center pt-6 pb-3 px-1 relative h-[140px] transform -translate-y-2">
                  {/* Medal 2 */}
                  <div className="absolute -top-5 w-8 h-10 flex flex-col items-center drop-shadow-sm">
                     <div className="w-3 h-3 bg-[#a2bbd8] -mb-1 rounded-sm z-0"></div>
                     <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#c0defa] to-[#92badc] border-2 border-white flex items-center justify-center z-10 shadow-sm">
                        <span className="text-white text-[15px] font-bold italic pr-[1px]">2</span>
                     </div>
                  </div>
                  {/* Avatar  */}
                  <div className="w-9 h-9 rounded-full bg-black border-2 border-white shadow-sm mt-1 overflow-hidden relative">
                     <div className="w-5 h-4 bg-[#f0a94e] absolute bottom-0 left-2 rounded-t-full"></div>
                  </div>
                  {/* User Data */}
                  <span className="text-[12px] font-medium text-black mt-2 truncate w-full text-center">黄金鱼翅糕</span>
                  <span className="text-[#f63d3f] text-[13px] font-bold font-sans mt-1 leading-tight">+2,071,511.81</span>
                  <span className="text-gray-400 text-[10px] mt-1 shrink-0">收益额</span>
               </div>

               {/* Place 3 */}
               <div className="flex-1 bg-rank-3 rounded-lg flex flex-col items-center pt-6 pb-3 px-1 relative h-[140px]">
                  {/* Medal 3 */}
                  <div className="absolute -top-5 w-8 h-10 flex flex-col items-center drop-shadow-sm">
                     <div className="w-3 h-3 bg-[#db9a75] -mb-1 rounded-sm z-0"></div>
                     <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#fcd1ad] to-[#d8935c] border-2 border-white flex items-center justify-center z-10 shadow-sm">
                        <span className="text-white text-[15px] font-bold italic pr-[1px]">3</span>
                     </div>
                  </div>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#fbe7d5] border-2 border-white shadow-sm mt-1 overflow-hidden relative">
                     <div className="w-[12px] h-[4px] bg-black transform rotate-12 absolute left-2 top-4"></div>
                  </div>
                  {/* User Data */}
                  <span className="text-[12px] font-medium text-black mt-2 truncate w-full text-center tracking-tighter">我要回报以歌</span>
                  <span className="text-[#f63d3f] text-[13px] font-bold font-sans mt-1 leading-tight">+2,008,8...</span>
                  <span className="text-gray-400 text-[10px] mt-1 shrink-0">收益额</span>
               </div>
               
            </div>
         </div>
      </div>

      {/* Floating Action Button (Write Post) */}
      <div className="fixed bottom-[80px] right-[16px] w-[50px] h-[50px] rounded-full bg-[#fa4c44] shadow-[0_4px_12px_rgba(250,76,68,0.4)] flex items-center justify-center z-40 transform hover:scale-105 active:scale-95 cursor-pointer">
         <svg className="w-[20px] h-[20px] text-white transform -translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
         </svg>
      </div>

      {/* 5. Bottom Global Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-[#fbf9fb] border-t border-gray-100 flex items-center justify-around z-50 pb-3 pt-1 shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
         {/* Home Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1 font-medium">首页</span>
         </div>

         {/* Finance Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <rect x="3" y="6" width="18" height="13" rx="2" ry="2" />
               <path d="M16 12.5h.01" strokeWidth={3} strokeLinecap="round" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1 font-medium">理财</span>
         </div>

         {/* Savings Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7l2 12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2l2-12-9-5z" />
               <circle cx="12" cy="12" r="3" />
               <path d="M12 9v6" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1 font-medium">省钱</span>
         </div>

         {/* Community Tab (Active) */}
         <div className="flex flex-col items-center relative">
            <svg className="w-7 h-7 text-[#ef3b3a]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z" />
               {/* Smilling Face / Eyes inside chat bubble */}
               <path d="M9 10h1M14 10h1M9 14.5 C10 16 14 16 15 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <span className="text-[10px] font-bold text-[#ef3b3a] mt-1 relative z-10">社区</span>
         </div>

         {/* Me Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path d="M12 12C9.24 12 7 9.76 7 7s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
               <path d="M2 20.5C2 15.8 7 14 12 14s10 1.8 10 6.5" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1 font-medium">我的</span>
         </div>
      </div>

    </div>
  );
}
