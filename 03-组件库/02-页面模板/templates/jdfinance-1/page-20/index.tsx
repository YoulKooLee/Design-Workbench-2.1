/**
 * @name 全部服务 - 信用借贷位点 (All Services - Lending Focused)
 */
import React from 'react';
import './style.css';

// Reusable Service Item Component
const ServiceItem = ({ icon, label, badge = null }: { icon: React.ReactNode, label: string, badge?: React.ReactNode }) => (
  <div className="flex flex-col items-center cursor-pointer">
    <div className="w-[36px] h-[36px] flex items-center justify-center relative mb-1.5">
       {icon}
       {badge && (
           <div className="absolute -top-1.5 -right-2 z-10 hidden">
               {/* Badges disabled for this specific clone screenshot, but logic kept intact */}
               {badge}
           </div>
       )}
    </div>
    <span className="text-[12px] text-[#333333] font-medium leading-tight whitespace-nowrap">{label}</span>
  </div>
);

export default function JDAllServicesLending() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden pb-10">
      
      {/* 1. Header Navigation */}
      <div className="w-full pt-[52px] px-4 pb-2 flex items-center justify-between sticky top-0 bg-white z-50">
         <div className="w-8 cursor-pointer">
            <svg className="w-[24px] h-[24px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <span className="text-[18px] font-bold text-black tracking-wide">全部服务</span>
         <div className="w-8 flex justify-end cursor-pointer">
            <svg className="w-[22px] h-[22px] text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
         </div>
      </div>

      {/* spacer */}
      <div className="h-3 w-full bg-[#f5f6f8]"></div>

      {/* NEW CARD: 信用借贷 (Credit & Lending) */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-5 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             信用借贷
         </div>
         <div className="grid grid-cols-5 gap-y-5">
             
             {/* 1. 金条借款 */}
             <ServiceItem label="金条借款" icon={
                 <div className="w-[26px] h-[32px] bg-gradient-to-b from-[#fca466] to-[#f68940] rounded-sm flex items-center justify-center relative shadow-sm overflow-hidden">
                     <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-white transform -rotate-45 translate-x-1.5 -translate-y-1.5 shadow-sm border-l border-b border-[#fbc9a8]"></div>
                     <span className="text-white text-[12px] font-bold tracking-widest leading-tight flex flex-col font-sans mt-1">
                         <span>金</span>
                         <span className="mt-[-2px]">条</span>
                     </span>
                 </div>
             } />

             {/* 2. 农户借钱 */}
             <ServiceItem label="农户借钱" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fca466] to-[#f68940] rounded-full flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                     {/* Abstract wheat rays */}
                     <div className="w-[2px] h-[26px] bg-white/40 absolute transform rotate-0"></div>
                     <div className="w-[2px] h-[26px] bg-white/40 absolute transform rotate-45"></div>
                     <div className="w-[2px] h-[26px] bg-white/40 absolute transform -rotate-45"></div>
                     <div className="w-[20px] h-[20px] bg-[#fca466] rounded-full z-10 flex items-center justify-center border border-[#f68940]">
                        <span className="text-white text-[12px] font-bold">¥</span>
                     </div>
                 </div>
             } />

             {/* 3. 借钱 */}
             <ServiceItem label="借钱" icon={
                 <div className="w-[26px] h-[30px] bg-gradient-to-b from-[#6b9dff] to-[#4c75f5] rounded-sm flex flex-col items-center justify-center shadow-sm relative border-t-[4px] border-[#9bc1ff] mt-1">
                     <span className="text-white text-[14px] font-bold tracking-tight">借</span>
                 </div>
             } />

             {/* 4. 车抵贷 */}
             <ServiceItem label="车抵贷" icon={
                 <div className="w-[30px] h-[24px] bg-[#5984f7] rounded-[6px] rounded-b-sm flex items-center justify-center shadow-sm relative overflow-hidden mt-1 text-center">
                     <div className="w-[20px] h-[10px] bg-[#3755b3] rounded-t-[4px] absolute top-[2px] flex items-center justify-center">
                         <span className="text-[7.5px] text-white font-bold leading-none transform scale-90 pl-[0.5px]">贷</span>
                     </div>
                     <div className="absolute bottom-[2px] left-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                     <div className="absolute bottom-[2px] right-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                 </div>
             } />

             {/* 5. 企业主贷 */}
             <ServiceItem label="企业主贷" icon={
                 <div className="w-[34px] h-[30px] relative flex items-end justify-start mt-1">
                     {/* Back folder */}
                     <div className="absolute top-0 right-[2px] w-[22px] h-[26px] bg-[#9bbfff] rounded-sm shadow-sm border border-white"></div>
                     {/* Front folder */}
                     <div className="w-[22px] h-[26px] bg-[#5382ff] rounded-sm shadow-[2px_0_4px_rgba(0,0,0,0.1)] z-10 flex items-center justify-center">
                         <span className="text-white text-[12px] font-bold relative z-20">企</span>
                     </div>
                 </div>
             } />

             {/* 6. 信用卡 */}
             <ServiceItem label="信用卡" icon={
                 <div className="w-[30px] h-[22px] bg-gradient-to-b from-[#fd6b6a] to-[#ee4b4a] rounded-[4px] flex items-start justify-start shadow-sm border border-[#fb9392] overflow-hidden pt-[3px] mt-1 relative">
                     <div className="w-full h-[4px] bg-white opacity-90 absolute top-[4px]"></div>
                     <div className="absolute bottom-[3px] left-[3px] w-[4px] h-[3px] bg-white/60 rounded-[1px]"></div>
                 </div>
             } />

             {/* 7. 小微借款 */}
             <ServiceItem label="小微借款" icon={
                 <div className="w-[30px] h-[30px] relative flex items-center justify-center mt-1">
                     {/* Abstract Storefront */}
                     <div className="w-[24px] h-[24px] bg-transparent flex flex-col items-center">
                         <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#f66767]"></div>
                         <div className="w-[18px] h-[14px] border-x-[2px] border-t-[2px] border-b-[14px] border-[#f66767] relative flex justify-center">
                            <div className="w-[2px] h-full bg-[#f66767]"></div>
                         </div>
                     </div>
                     {/* Coin Overlap */}
                     <div className="w-[14px] h-[14px] bg-gradient-to-b from-[#fcad59] to-[#d66518] rounded-full absolute bottom-0 -right-1 shadow-sm border-[1.5px] border-white flex items-center justify-center">
                         <span className="text-white text-[8px] font-bold">¥</span>
                     </div>
                 </div>
             } />

             {/* 8. 企业金融 */}
             <ServiceItem label="企业金融" icon={
                 <div className="w-[30px] h-[30px] relative flex items-center justify-center mt-1">
                     {/* Abstract Building */}
                     <div className="w-[18px] h-[26px] bg-[#f66767] rounded-t-sm flex flex-col justify-evenly px-[3px] py-[2px] shadow-sm">
                         <div className="flex justify-between"><div className="w-1 h-[2px] bg-white/80"></div><div className="w-1 h-[2px] bg-white/80"></div></div>
                         <div className="flex justify-between"><div className="w-1 h-[2px] bg-white/80"></div><div className="w-1 h-[2px] bg-white/80"></div></div>
                         <div className="flex justify-between"><div className="w-1 h-[2px] bg-white/80"></div><div className="w-1 h-[2px] bg-white/80"></div></div>
                         <div className="flex justify-between"><div className="w-1 h-[2px] bg-white/80"></div><div className="w-1 h-[2px] bg-white/80"></div></div>
                     </div>
                     {/* Small coin mock */}
                     <div className="w-[10px] h-[10px] bg-[#fac89e] rounded-full absolute bottom-[2px] -right-[1px] shadow-sm border-[1px] border-white"></div>
                 </div>
             } />

         </div>
      </div>

      {/* ORIGINAL CARD 1 (Now Card 2): 保险保障 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-4 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             保险保障
         </div>
         <div className="grid grid-cols-5 gap-y-5">
             
             <ServiceItem label="保险" icon={
                 <div className="w-[30px] h-[34px] bg-[#5382ff] flex items-center justify-center shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                    <span className="text-white text-[14px] font-bold mt-[-2px]">车</span>
                 </div>
             } />

             <ServiceItem label="储备金" icon={
                 <div className="w-[28px] h-[32px] bg-[#fb5a5a] flex items-center justify-center relative shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)'}}>
                    <span className="text-white text-[14px] font-bold mt-1">¥</span>
                 </div>
             } />

             <ServiceItem label="应急金" icon={
                 <div className="w-[28px] h-[32px] bg-[#fb5a5a] flex items-center justify-center relative shadow-sm" style={{clipPath: 'polygon(50% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)'}}>
                    <svg className="w-3.5 h-3.5 text-white mt-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                 </div>
             } />

             <ServiceItem label="车险" icon={
                 <div className="w-[30px] h-[24px] bg-[#5984f7] rounded-[6px] rounded-b-sm flex flex-col items-center justify-center shadow-sm relative mt-2">
                     {/* The Bottom Price Badge embedded as physical DOM overlapping instead of prop for 1-1 page mapping */}
                     <div className="absolute -top-[10px] bg-[#5984f7] text-white text-[9px] px-1 py-[1.5px] rounded-[3px] rounded-br-[0px] shadow-sm whitespace-nowrap z-[30] font-bold border border-white scale-95 opacity-90">底价</div>
                     <div className="w-[18px] h-[6px] bg-white opacity-80 rounded-[2px] mt-[-2px] mb-[2px]"></div>
                     <div className="absolute bottom-[2px] left-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                     <div className="absolute bottom-[2px] right-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                 </div>
             } />

         </div>
      </div>

      {/* ORIGINAL CARD 2 (Now Card 3): 生活服务 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-5 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)] relative z-10">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             生活服务
         </div>
         <div className="grid grid-cols-5 gap-y-5">
             
             <ServiceItem label="京享租" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#fc7270] to-[#f45c5c] rounded-full flex items-center justify-center relative shadow-sm">
                     <span className="text-white text-[14px] font-bold">租</span>
                     <div className="absolute bottom-[-1px] right-[-1px] w-[11px] h-[11px] bg-white rounded-full flex items-center justify-center">
                         <div className="w-[9px] h-[9px] bg-[#fbafaf] rounded-full flex flex-col items-center justify-center">
                             <div className="w-[1px] h-[3px] bg-white ml-[2px] mt-[1px] transform rotate-45"></div>
                             <div className="w-[3px] h-[1px] bg-white mt-0"></div>
                         </div>
                     </div>
                 </div>
             } />

             <ServiceItem label="电影演出" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#778aff] to-[#596df2] rounded-full flex flex-col items-center justify-center shadow-sm transform -rotate-12">
                     <div className="flex space-x-1 mb-1">
                         <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
                         <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
                     </div>
                     <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
                     <div className="absolute -bottom-[2px] -right-[1px] w-3 h-3 bg-[#596df2] rotate-45 z-[-1]"></div>
                 </div>
             } />

             <ServiceItem label="京东闪付" icon={
                 <div className="w-[26px] h-[34px] bg-gradient-to-b from-[#fc6a63] to-[#e4423c] rounded-[4px] border-t-[8px] border-[#fbafaf] flex items-center justify-center shadow-sm">
                     <span className="text-white text-[10px] font-sans font-medium">东付</span>
                 </div>
             } />

             <ServiceItem label="亲密卡" icon={
                 <div className="w-[34px] h-[26px] bg-gradient-to-r from-[#fc645b] to-[#f74f4c] rounded-[4px] relative flex items-center shadow-sm overflow-hidden mt-1">
                     <div className="absolute left-0 w-0 h-0 border-t-[13px] border-b-[13px] border-l-[18px] border-transparent border-l-[#ff8883] opacity-60"></div>
                     <div className="absolute left-[3px] w-[14px] h-[14px] bg-[#fa3f3b] rounded-full flex items-center justify-center ml-1">
                         <svg className="w-2 h-2 text-white mt-[1px]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                     </div>
                 </div>
             } />

             <ServiceItem label="直播广场" icon={
                 <div className="w-[32px] h-[24px] bg-gradient-to-r from-[#fc645b] to-[#f74f4c] rounded-[6px] relative flex items-center justify-center shadow-sm mt-1">
                     <div className="absolute right-[-4px] w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-[#f74f4c]"></div>
                     <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                         <div className="w-0 h-0 border-t-[2.5px] border-b-[2.5px] border-l-[3.5px] border-transparent border-l-[#fc645b] ml-0.5"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="生活缴费" icon={
                 <div className="w-[28px] h-[34px] bg-gradient-to-b from-[#6b8cff] to-[#4c75f5] flex items-center justify-center relative shadow-sm" style={{borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px'}}>
                     <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                     <div className="absolute top-[4px] right-[4px] w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                 </div>
             } />

             <ServiceItem label="京东快递" icon={
                 <div className="w-[30px] h-[24px] bg-gradient-to-b from-[#fd7f75] to-[#f2584c] rounded-[4px] flex items-center justify-center relative shadow-sm mt-1">
                     <div className="absolute top-0 w-full h-[6px] bg-white opacity-20 border-b-[1px] border-white/50 flex space-x-1 justify-center px-1">
                         <div className="w-1/2 h-full bg-white/30"></div>
                     </div>
                     <span className="text-white text-[10px] font-sans font-medium mt-1">快递</span>
                 </div>
             } />

             <ServiceItem label="手机充值" icon={
                 <div className="w-[26px] h-[32px] bg-gradient-to-b from-[#6492fd] to-[#4574ef] rounded-[4px] flex flex-col items-center justify-center relative shadow-sm">
                     <div className="w-[14px] h-[2px] bg-white rounded-full mt-1 mb-1"></div>
                     <span className="text-white text-[12px] font-sans font-medium leading-none">充</span>
                     <div className="w-[6px] h-[1px] bg-white rounded-full mt-1.5 opacity-80"></div>
                 </div>
             } />

             <ServiceItem label="彩票券" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fc5e5a] to-[#e4413c] rounded-full flex items-center justify-center shadow-sm relative">
                     <span className="text-white text-[16px] font-sans font-bold">8</span>
                     <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full opacity-30"></div>
                     <div className="absolute bottom-[-1px] right-[-1px] w-2.5 h-2.5 bg-gradient-to-r from-[#ffe4e4] to-[#fcc1c1] rounded-full shadow-sm"></div>
                 </div>
             } />

             <ServiceItem label="京东旅行" icon={
                 <div className="w-[30px] h-[30px] bg-gradient-to-b from-[#6b9dff] to-[#4c75f5] rounded-[6px] flex items-center justify-center shadow-sm relative overflow-hidden">
                     <div className="w-full h-full bg-white opacity-10 absolute bottom-[-10px] right-[-10px] rounded-full"></div>
                     <svg className="w-[18px] h-[18px] text-white z-10 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                 </div>
             } />

             <ServiceItem label="市民中心" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fc726c] to-[#ed4e4a] rounded-full flex items-center justify-center shadow-sm relative overflow-hidden">
                     <div className="absolute bottom-[4px] left-[6px] w-[6px] h-[14px] bg-[#a93026]"></div>
                     <div className="absolute bottom-[4px] right-[7px] w-[8px] h-[10px] bg-[#a93026]"></div>
                     <svg className="w-[20px] h-[20px] text-white absolute bottom-[2px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                     </svg>
                 </div>
             } />

         </div>
      </div>

      {/* ORIGINAL CARD 3 (Now Card 4 partially visible cut off): 互动福利 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-6 px-2 shadow-[0_2px_10px_rgba(0,0,0,0.015)] h-[180px] overflow-hidden">
         <div className="px-2 text-[15px] font-bold text-black tracking-tight mb-4">
             互动福利
         </div>
         <div className="grid grid-cols-5 gap-y-6">
             
             <ServiceItem label="签到" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#7693ff] to-[#516ce8] rounded-full flex flex-col items-center justify-center shadow-sm overflow-hidden relative">
                     <div className="absolute bottom-0 w-full h-[8px] bg-[#3a52be] flex justify-center space-x-[2px] items-start pt-[1px]">
                         <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
                         <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
                         <div className="w-[3px] h-[3px] bg-white rounded-full opacity-60"></div>
                     </div>
                     <span className="text-white text-[13px] font-bold mt-[-5px]">签</span>
                 </div>
             } />

             <ServiceItem label="订单公益" icon={
                 <div className="w-[32px] h-[32px] bg-[#fff] border-[2px] border-white rounded-[40%_60%_40%_60%] bg-gradient-to-b from-[#ffb4b7] to-[#fb7c81] flex flex-col items-center justify-center shadow-sm relative">
                     <div className="absolute -top-1 left-1.5 w-[6px] h-[14px] bg-[#ffb4b7] rounded-full z-[-1] transform -rotate-12 border border-white"></div>
                     <div className="absolute -top-1 right-1.5 w-[6px] h-[14px] bg-[#ffb4b7] rounded-full z-[-1] transform rotate-12 border border-white"></div>
                     <div className="flex space-x-1.5 mt-[-2px]">
                         <div className="w-1 h-1 bg-[#d8404a] rounded-full"></div>
                         <div className="w-1 h-1 bg-[#d8404a] rounded-full"></div>
                     </div>
                     <div className="w-1 h-1 bg-white rounded-full mt-[2px]"></div>
                 </div>
             } />

             <ServiceItem label="财富花园" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#ff8b7c] to-[#ee5541] rounded-full flex flex-col items-center justify-end shadow-sm pb-[3px]">
                     <div className="w-[12px] h-[6px] bg-[#a93026] rounded-sm relative z-10 mt-[2px]"></div>
                     <div className="absolute top-[5px] flex items-end">
                         <div className="w-[4px] h-[8px] bg-white rounded-[2px] transform -rotate-[30deg] origin-bottom-right opacity-90"></div>
                         <div className="w-[5px] h-[8px] bg-white rounded-[2px] mx-[1px] mb-[-1px]"></div>
                         <div className="w-[4px] h-[8px] bg-white rounded-[2px] transform rotate-[30deg] origin-bottom-left opacity-90"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="天天红包" icon={
                 <div className="w-[28px] h-[34px] bg-gradient-to-b from-[#fb605a] to-[#d63a34] rounded-[4px] flex items-center justify-center shadow-sm relative overflow-hidden">
                     <div className="absolute top-[-10px] w-[34px] h-[20px] bg-[#ff8078] rounded-b-full shadow-sm border-b-[1px] border-[#c0302b]"></div>
                     <div className="absolute top-[5px] w-[10px] h-[10px] bg-[#fbd055] rounded-full shadow-sm z-10 flex items-center justify-center border border-[#d6a524]">
                         <div className="w-1 h-1 bg-[#d6a524] rounded-sm"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="京豆捕鱼" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#6f5af3] to-[#402db3] rounded-full flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 w-[40px] h-[10px] bg-[#49c5f8] opacity-80" style={{borderRadius: '50% 50% 0 0'}}></div>
                     <div className="w-[18px] h-[10px] bg-[#fdd340] rounded-[50%_40%_20%_50%] border border-[#db961a] shadow-sm transform -rotate-12 mb-[2px] z-10 flex border-t-0">
                         <div className="w-[3px] h-[3px] bg-black rounded-full mt-1 ml-[2px]"></div>
                     </div>
                     <div className="absolute top-[8px] right-[4px] w-[8px] h-[10px] bg-[#e13b41] rounded-[2px] shrink-0 border border-white"></div>
                 </div>
             } />
             
             {/* Note: Row 2 truncated for visual identical matching to 020-pic */}
             <ServiceItem label="天天来提额" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#ffe5a4] to-[#f9bb40] rounded-[10px] flex items-center justify-center shadow-sm relative overflow-hidden border border-[#f9bb40]/30 mt-1">
                     <div className="w-[20px] h-[24px] bg-white rounded-t-[10px] rounded-b-[4px] mt-2 flex flex-col items-center absolute bottom-0 shadow-sm border border-[#e4dcc1]"><div className="flex space-x-1 mt-1"><div className="w-[3px] h-[3px] bg-black rounded-full"></div><div className="w-[3px] h-[3px] bg-black rounded-full"></div></div></div>
                     <div className="w-[14px] h-[14px] bg-[#fc4d40] rounded-full z-10 absolute bottom-[2px] -right-[2px] border-[2px] border-white shadow-sm flex items-center justify-center"><div className="w-1.5 h-1.5 bg-[#fbd055] rounded-[1px]"></div></div>
                 </div>
             } />

             <ServiceItem label="掼蛋" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fbbf7e] to-[#e4984e] border-[1.5px] border-[#fcdeb4] rounded-full flex flex-col items-center justify-center shadow-sm relative pt-[2px]">
                     <div className="w-[16px] h-[20px] bg-white rounded-sm border border-[#ce8646] shadow-sm transform -rotate-12 absolute left-[4px] top-[4px] flex items-center justify-center text-[#d13a30] text-[10px] font-bold">A</div>
                     <div className="w-[16px] h-[20px] bg-white rounded-sm border border-[#ce8646] shadow-sm transform rotate-[10deg] absolute right-[4px] top-[5px] z-10 flex items-center justify-center text-black text-[10px] font-bold">♠</div>
                     <div className="absolute bottom-[2px] bg-[#c36511] text-white text-[8px] rounded px-[6px] py-[1px] leading-none z-20 font-bold border border-white scale-90 whitespace-nowrap">掼</div>
                 </div>
             } />

             <ServiceItem label="黄金豆" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#ffd391] to-[#f2943b] rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                     <div className="w-[20px] h-[20px] bg-gradient-to-br from-[#fcad59] to-[#d66518] rounded-full absolute -top-1 -right-1 shadow-sm"></div>
                     <svg className="w-[8px] h-[8px] text-white absolute bottom-[6px] left-[6px]" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" /></svg>
                 </div>
             } />

             <ServiceItem label="斗地主" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#8fdeff] to-[#40a3eb] rounded-full flex items-center justify-center relative shadow-sm overflow-hidden">
                     <div className="absolute top-[3px] w-[18px] h-[8px] bg-[#fbaf64] rounded-t-full shadow-sm z-20 border border-[#d68536]"></div>
                     <div className="absolute top-[8px] w-[20px] h-[16px] bg-[#ffd4b3] rounded-full z-10 flex flex-col items-center pb-1"><div className="flex space-x-1 mt-1"><div className="w-[4px] h-[2px] bg-gray-800 rounded-lg"></div><div className="w-[4px] h-[2px] bg-gray-800 rounded-lg"></div></div><div className="w-[8px] h-[4px] bg-[#e44e45] rounded-b-full mt-1"></div></div>
                 </div>
             } />

             <ServiceItem label="互动游戏" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-tr from-[#9c7bfe] to-[#c6b4ff] rounded-full flex items-center justify-center relative shadow-sm">
                     <div className="w-[22px] h-[14px] bg-[#492caf] rounded-full flex items-center justify-between px-[4px] transform rotate-[-15deg] shadow-sm relative"><div className="w-[6px] h-[6px] bg-[#b1a2f4] rounded-sm flex items-center justify-center"><div className="w-[8px] h-[2px] bg-[#b1a2f4]"></div></div><div className="flex space-x-[2px]"><div className="w-[3px] h-[3px] bg-[#61dfab] rounded-full"></div><div className="w-[3px] h-[3px] bg-[#fc4d40] rounded-full mt-[3px]"></div></div></div>
                 </div>
             } />

         </div>
      </div>

    </div>
  );
}
