/**
 * @name 我的 (Me)
 */
import React from 'react';
import './style.css';

export default function JDFinanceProfile() {
  return (
    <div className="w-full min-h-screen bg-[#f6f5fb] flex flex-col font-sans select-none pb-[84px]">
      
      {/* 1. Header Profile Area */}
      <div className="w-full pt-12 px-4 pb-4 flex items-center justify-between sticky top-0 z-20 bg-gradient-to-b from-[#f6f5fb] via-[#f6f5fb] to-transparent">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          {/* Avatar Base Approximation */}
          <div className="w-[34px] h-[34px] rounded-full bg-[#f48a4c] border border-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm relative">
             {/* A rough geometric approximation of the user silhouette */}
             <div className="w-8 h-8 bg-[#2e1d1f] rounded-full absolute bottom-[-4px] translate-y-2 translate-x-1"></div>
             <div className="w-4 h-5 bg-[#c27c62] rounded-full absolute top-[6px] right-2 transform rotate-12"></div>
             <div className="w-4 h-4 bg-[#c27c62] rounded-full absolute top-1 left-2 transform rotate-45"></div>
          </div>
          <span className="text-[18px] font-bold text-gray-900 tracking-wide">美叶_勒川</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-gray-800">
           {/* Headset Icon */}
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
             <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
             <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
           </svg>
           {/* Message Bubble Icon */}
           <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
             <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
             <circle cx="8" cy="12" r="1.5" fill="currentColor" />
             <circle cx="16" cy="12" r="1.5" fill="currentColor" />
           </svg>
           {/* Settings Gear Icon */}
           <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="3" />
             <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
           </svg>
        </div>
      </div>

      <div className="px-[14px] flex flex-col space-y-3 z-10 -mt-2">
        
        {/* 2. Card 1: Assets Area */}
        <div className="w-full bg-white rounded-[14px] px-4 py-3 shadow-sm pt-4">
          
          {/* Top Asset Summary Box */}
          <div className="w-full bg-[#f9f9fb] rounded-xl py-3 px-4 flex items-center mb-1">
             <div className="flex-1 flex flex-col items-start pr-4">
                <span className="text-gray-400 text-[12px] mb-1">总资产(元)</span>
                <span className="text-black text-[20px] font-bold font-sans tracking-tight">0.00</span>
             </div>
             {/* Divider */}
             <div className="w-[1px] h-10 bg-gray-200"></div>
             <div className="flex-1 flex flex-col items-start pl-6">
                <span className="text-gray-400 text-[12px] mb-1">昨日收益</span>
                <span className="text-black text-[20px] font-bold font-sans tracking-tight">0.00</span>
             </div>
          </div>

          <ListItem title="余额">
            <svg className="w-5 h-5 text-[#f64e56]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4H5C3.34 4 2 5.34 2 7v10c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3zm-3 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              <path d="M16 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="white" />
            </svg>
          </ListItem>
          
          <ListItem title="小金库">
            <svg className="w-5 h-5 text-[#fba24d]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 9v10c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3V9c0-1.66 1.34-3 3-3h3.29C8.36 4.9 9.3 4 10.5 4h3c1.2 0 2.14.9 2.21 2H19c1.66 0 3 1.34 3 3zm-2 0c0-.55-.45-1-1-1h-1.5c-1.66 0-3 1.34-3 3v.5h-3V11c0-1.66-1.34-3-3-3H6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9z" />
              <circle cx="8.5" cy="13" r="1.5" fill="white" />
              <circle cx="15.5" cy="13" r="1.5" fill="white" />
            </svg>
          </ListItem>
          
          <ListItem title="基金">
            <svg className="w-5 h-5 text-[#fb5553]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2.4 9.1L13.8 9.3c-.4-.4-1.1-.4-1.5 0l-3.3 3.3-1.6-1.6c-.4-.4-1.1-.4-1.5 0s-.4 1.1 0 1.5l2.4 2.4c.4.4 1.1.4 1.5 0l3.3-3.3 2.1 2.1c.4.4 1.1.4 1.5 0l3-3c.4-.4.4-1.1 0-1.5s-1.1-.4-1.6 0l-2.2 2.9z"/>
               {/* inner chart path simulation */}
               <path d="M7.5 13.5L9.6 11.4L13 14.8L16.4 10.5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ListItem>
          
          <ListItem title="保险" isLast>
            <svg className="w-5 h-5 text-[#5b7ce3]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
               <path d="M12 11h3v2h-3v3h-2v-3H7v-2h3V8h2v3z" fill="white" />
            </svg>
          </ListItem>
        </div>

        {/* 3. Card 2: Credits / Loans Area */}
        <div className="w-full bg-white rounded-[14px] px-4 py-1 shadow-sm">
          <ListItem title="总待还">
            <svg className="w-5 h-5 text-[#5a7ae2]" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
               <path d="M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="我的白条" rightLabel="可用额度49000.00">
            <svg className="w-5 h-5 text-[#f64e56]" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
               <path d="M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="可借现金">
            <svg className="w-5 h-5 text-[#fab254]" viewBox="0 0 24 24" fill="currentColor">
               <circle cx="12" cy="12" r="10" />
               <path d="M12 7v10M9 10h6M9 14h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="企业主贷" isLast>
            <svg className="w-5 h-5 text-[#557de6]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 4L3 9v11h18V9l-9-5zm-2 14H8v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z" />
               <rect x="7" y="11" width="10" height="7" fill="white" rx="1" />
               <path d="M9 13h6M9 15h6" stroke="#557de6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </ListItem>
        </div>

        {/* 4. Card 3: Activity / Community Area */}
        <div className="w-full bg-white rounded-[14px] px-4 py-1 shadow-sm">
          <ListItem title="互动游戏">
            <svg className="w-5 h-5 text-[#f65355]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 9v6c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4h10c2.21 0 4 1.79 4 4z" />
               <circle cx="15.5" cy="10.5" r="1.5" fill="white" />
               <circle cx="17.5" cy="13.5" r="1.5" fill="white" />
               <path d="M6 12h4 M8 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="购物车">
            <svg className="w-5 h-5 text-[#fa9b4a]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </ListItem>
          
          <ListItem title="活动市集">
            <svg className="w-5 h-5 text-[#f75258]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-7-2h5v-5h-5v5z" />
               <rect x="13" y="14" width="4" height="4" fill="white" rx="0.5" />
            </svg>
          </ListItem>
          
          <ListItem title="用户保护中心" isLast>
            <svg className="w-5 h-5 text-[#889afb]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </ListItem>
        </div>

      </div>

      {/* 5. Footer Logo Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-end mt-10 mb-6 opacity-40">
        <div className="flex items-center space-x-[6px] mb-2">
           <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,4 C16.418,4 20,7.582 20,12 C20,13.674 19.486,15.228 18.608,16.5 C19.162,17.489 19.5,18.673 19.5,19.986 C19.5,21.091 18.605,21.986 17.5,21.986 C16.666,21.986 15.952,21.474 15.654,20.732 C14.542,21.246 13.31,21.536 12,21.536 C10.69,21.536 9.458,21.246 8.346,20.732 C8.048,21.474 7.334,21.986 6.5,21.986 C5.395,21.986 4.5,21.091 4.5,19.986 C4.5,18.673 4.838,17.489 5.392,16.5 C4.514,15.228 4,13.674 4,12 C4,7.582 7.582,4 12,4 Z M9.5,10 C8.67157288,10 8,10.6715729 8,11.5 C8,12.3284271 8.67157288,13 9.5,13 C10.3284271,13 11,12.3284271 11,11.5 C11,10.6715729 10.3284271,10 9.5,10 Z M14.5,10 C13.6715729,10 13,10.6715729 13,11.5 C13,12.3284271 13.6715729,13 14.5,13 C15.3284271,13 16,12.3284271 16,11.5 C16,10.6715729 15.3284271,10 14.5,10 Z M12,15 C10.8954305,15 10,15.8954305 10,17 C10,17.5522847 10.4477153,18 11,18 L13,18 C13.5522847,18 14,17.5522847 14,17 C14,15.8954305 13.1045695,15 12,15 Z" />
           </svg>
           <span className="text-[13px] font-black tracking-widest text-gray-500 font-sans">京东金融</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
           <div className="w-[18px] h-[1px] bg-gray-300"></div>
           <span className="text-[10px] text-gray-400 tracking-widest">简单 · 快捷 · 安全</span>
           <div className="w-[18px] h-[1px] bg-gray-300"></div>
        </div>
      </div>

      {/* 6. Bottom Global Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-100 flex items-center justify-around z-30 pb-3 pt-1">
         {/* Home Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">首页</span>
         </div>

         {/* Finance Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <rect x="3" y="6" width="18" height="13" rx="2" ry="2" />
               <path d="M16 12.5h.01" strokeWidth={3} strokeLinecap="round" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">理财</span>
         </div>

         {/* Savings Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7l2 12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2l2-12-9-5z" />
               <circle cx="12" cy="12" r="3" />
               <path d="M12 9v6" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">省钱</span>
         </div>

         {/* Community Tab */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">社区</span>
         </div>

         {/* Me Tab (Active) */}
         <div className="flex flex-col items-center">
            <svg className="w-7 h-7 text-[#ef3b3a]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
               <path d="M10 13c-1.1 0-2-.9-2-2 0-.25.05-.48.14-.7C7.51 10.87 7 11.87 7 13c0 1.66 1.34 3 3 3h2c-1.54 0-2-.84-2-3z" fill="#ef3b3a" />
               <path d="M15 15.5 M8 13.5 C9 15.5 12 16 15 13" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-[10px] font-bold text-[#ef3b3a] mt-1">我的</span>
         </div>
      </div>

    </div>
  );
}

// Helpers
const ListItem = ({ children, title, rightLabel, isLast }: any) => (
  <div className={`w-full flex items-center justify-between py-[18px] ${isLast ? '' : 'border-b border-gray-100'} active:bg-gray-50 cursor-pointer`}>
    <div className="flex items-center space-x-3 pl-1">
      {/* Icon Holder */}
      {children}
      <span className="text-[15px] font-medium text-black">{title}</span>
    </div>
    <div className="flex items-center space-x-1">
      {rightLabel && <span className="text-[13px] text-gray-400 mr-1">{rightLabel}</span>}
      <svg className="w-[14px] h-[14px] text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);
