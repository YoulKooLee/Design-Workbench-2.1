/**
 * @name 我的 (Me - variant)
 */
import React from 'react';
import './style.css';

export default function JDFinanceProfileVariant() {
  return (
    <div className="w-full min-h-screen bg-[#f6f5fb] flex flex-col font-sans select-none pb-[84px] bg-header-glow">
      
      {/* 1. Header Profile Area */}
      <div className="w-full pt-12 px-4 pb-2 flex items-center justify-between relative z-20">
         {/* User Info */}
         <div className="flex items-center space-x-3">
            {/* Avatar Base */}
            <div className="w-[50px] h-[50px] rounded-full bg-[#f48a4c] border-[1.5px] border-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.08)] relative">
               {/* A rough geometric approximation of the user silhouette facing right */}
               <div className="w-10 h-10 bg-[#2e1d1f] rounded-full absolute bottom-[-8px] translate-y-3 translate-x-2"></div>
               <div className="w-5 h-6 bg-[#c27c62] rounded-[10px] absolute top-[8px] right-2 transform rotate-12"></div>
               <div className="w-5 h-5 bg-[#c27c62] rounded-full absolute top-[5px] left-3 transform rotate-45"></div>
               <div className="w-1.5 h-1.5 bg-[#f48a4c] rounded-full absolute top-[14px] right-[10px]"></div> {/* Smile cutout */}
            </div>
            
            <div className="flex flex-col space-y-[2px] mt-1">
               <span className="text-[20px] font-bold text-gray-900 tracking-wide leading-none">美叶_勒川</span>
               {/* Credit Score Pill */}
               <div className="flex items-center bg-credit-score border border-[#feeeea] rounded-full px-2 py-[2px] w-max mt-1 relative left-[-2px]">
                  <div className="w-3.5 h-3.5 bg-[#fb5951] rounded-sm flex items-center justify-center mr-1">
                     <span className="text-white text-[9px] font-bold">G</span>
                  </div>
                  <span className="text-[#644243] text-[10px] font-medium mr-[2px]">京东信誉分857</span>
                  <span className="text-[#d8979a] text-[10px] scale-75">›</span>
               </div>
            </div>
         </div>

         {/* Action Icons */}
         <div className="flex items-center space-x-4 text-gray-800 self-start mt-2">
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

      {/* 2. Top Stats Bar */}
      <div className="w-full flex items-center justify-between px-10 py-4 pb-6 mt-1 z-10">
         <div className="flex flex-col items-center flex-1">
            <span className="text-[17px] font-bold text-gray-900 font-sans tracking-tight">479</span>
            <span className="text-[12px] text-gray-500 mt-1">京豆</span>
         </div>
         <div className="flex flex-col items-center flex-1">
            <span className="text-[17px] font-bold text-gray-900 font-sans tracking-tight">1</span>
            <span className="text-[12px] text-gray-500 mt-1">银行卡</span>
         </div>
         <div className="flex flex-col items-center flex-1 relative">
            <div className="relative flex items-center justify-center">
               <span className="text-[17px] font-bold text-gray-900 font-sans tracking-tight">2</span>
               {/* Expiry Floating Tag */}
               <div className="absolute bottom-[60%] left-[100%] ml-[2px] bg-[#fb5951] text-white text-[9px] px-[5px] py-[1px] rounded-tl-[6px] rounded-tr-[6px] rounded-br-[6px] rounded-bl-[1px] transform scale-90 whitespace-nowrap shadow-sm z-20 
                               after:content-[''] after:absolute after:-bottom-[3px] after:left-[2px] after:w-2 after:h-2 after:bg-[#fb5951] after:rotate-45 after:-z-10">
                  快过期
               </div>
            </div>
            <span className="text-[12px] text-gray-500 mt-1">优惠券</span>
         </div>
      </div>

      <div className="px-[14px] flex flex-col space-y-3 z-10 -mt-1">
        
        {/* 3. Card 1: Main Assets Area (Revised layout matching new screenshot) */}
        <div className="w-full bg-white rounded-[14px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] pb-1">
          
          <ListItem title="我的账单" border>
            <div className="w-5 h-5 rounded-md bg-[#6686eb] flex items-center justify-center">
               <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                  <line x1="8" y1="18" x2="16" y2="18"></line>
               </svg>
            </div>
          </ListItem>

          <ListItem title="我的资产" noChevron border rightExtra={
              <svg className="w-[18px] h-[18px] text-gray-300 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
          }>
            <svg className="w-5 h-5 text-[#f64e56]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8h8c-.5-4.2-3.8-7.5-8-8zm0 10v10c4.2-.5 7.5-3.8 8-8h-8z"/>
            </svg>
          </ListItem>

          {/* Asset Summary Inner Box */}
          <div className="w-full bg-[#fafafc] rounded-xl py-3 px-4 flex items-center mb-1 mt-1">
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

          <ListItem title="余额" border>
            <svg className="w-5 h-5 text-[#f64e56]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4H5C3.34 4 2 5.34 2 7v10c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3zm-3 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              <path d="M16 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="white" />
            </svg>
          </ListItem>
          
          <ListItem title="小金库" border>
            <svg className="w-5 h-5 text-[#fba24d]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 9v10c0 1.66-1.34 3-3 3H6c-1.66 0-3-1.34-3-3V9c0-1.66 1.34-3 3-3h3.29C8.36 4.9 9.3 4 10.5 4h3c1.2 0 2.14.9 2.21 2H19c1.66 0 3 1.34 3 3zm-2 0c0-.55-.45-1-1-1h-1.5c-1.66 0-3 1.34-3 3v.5h-3V11c0-1.66-1.34-3-3-3H6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9z" />
              <circle cx="8.5" cy="13" r="1.5" fill="white" />
              <circle cx="15.5" cy="13" r="1.5" fill="white" />
            </svg>
          </ListItem>
          
          <ListItem title="基金" border>
            <svg className="w-5 h-5 text-[#fb5553]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2.4 9.1L13.8 9.3c-.4-.4-1.1-.4-1.5 0l-3.3 3.3-1.6-1.6c-.4-.4-1.1-.4-1.5 0s-.4 1.1 0 1.5l2.4 2.4c.4.4 1.1.4 1.5 0l3.3-3.3 2.1 2.1c.4.4 1.1.4 1.5 0l3-3c.4-.4.4-1.1 0-1.5s-1.1-.4-1.6 0l-2.2 2.9z"/>
               <path d="M7.5 13.5L9.6 11.4L13 14.8L16.4 10.5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ListItem>
          
          <ListItem title="保险" isLast border={false}>
            <svg className="w-5 h-5 text-[#5b7ce3]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
               <path d="M12 11h3v2h-3v3h-2v-3H7v-2h3V8h2v3z" fill="white" />
            </svg>
          </ListItem>
        </div>

        {/* 4. Card 2: Credits / Loans Area */}
        <div className="w-full bg-white rounded-[14px] px-4 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <ListItem title="总待还" border>
            <svg className="w-5 h-5 text-[#5a7ae2]" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
               <path d="M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="我的白条" rightLabel="可用额度49000.00" border>
            <svg className="w-5 h-5 text-[#f64e56]" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
               <path d="M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="可借现金" border>
            <svg className="w-5 h-5 text-[#fab254]" viewBox="0 0 24 24" fill="currentColor">
               <circle cx="12" cy="12" r="10" />
               <path d="M12 7v10M9 10h6M9 14h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="企业主贷" isLast border={false}>
            <svg className="w-5 h-5 text-[#557de6]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 4L3 9v11h18V9l-9-5zm-2 14H8v-4h2v4zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4z" />
               <rect x="7" y="11" width="10" height="7" fill="white" rx="1" />
               <path d="M9 13h6M9 15h6" stroke="#557de6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </ListItem>
        </div>

        {/* 5. Card 3: Activity Area (Truncated in screenshot) */}
        <div className="w-full bg-white rounded-[14px] px-4 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-4">
          <ListItem title="互动游戏" border>
            <svg className="w-5 h-5 text-[#f65355]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 9v6c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4h10c2.21 0 4 1.79 4 4z" />
               <circle cx="15.5" cy="10.5" r="1.5" fill="white" />
               <circle cx="17.5" cy="13.5" r="1.5" fill="white" />
               <path d="M6 12h4 M8 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ListItem>
          
          <ListItem title="购物车" isLast border={false}>
            <svg className="w-5 h-5 text-[#fa9b4a]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </ListItem>
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
         <div className="flex flex-col items-center relative">
            <svg className="w-7 h-7 text-[#ef3b3a]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
               <path d="M10 13c-1.1 0-2-.9-2-2 0-.25.05-.48.14-.7C7.51 10.87 7 11.87 7 13c0 1.66 1.34 3 3 3h2c-1.54 0-2-.84-2-3z" fill="#ef3b3a" />
               <path d="M15 15.5 M8 13.5 C9 15.5 12 16 15 13" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-[10px] font-bold text-[#ef3b3a] mt-1 relative z-10">我的</span>
         </div>
      </div>

    </div>
  );
}

// Helpers
const ListItem = ({ children, title, rightLabel, isLast, border, rightExtra, noChevron }: any) => (
  <div className={`w-full flex items-center justify-between py-[17px] ${border ? 'border-b border-gray-100' : ''} active:bg-gray-50 cursor-pointer`}>
    <div className="flex items-center pl-1">
      {/* Icon Holder */}
      <div className="w-6 flex justify-center mr-3">{children}</div>
      <span className="text-[15px] font-medium text-black tracking-wide">{title}</span>
      {rightExtra}
    </div>
    <div className="flex items-center space-x-1">
      {rightLabel && <span className="text-[13px] text-gray-400 mr-1">{rightLabel}</span>}
      {!noChevron && (
         <svg className="w-[14px] h-[14px] text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
         </svg>
      )}
    </div>
  </div>
);
