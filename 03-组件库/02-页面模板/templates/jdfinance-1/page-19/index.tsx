/**
 * @name 全部服务 (All Services Hub)
 */
import React from 'react';
import './style.css';

// Reusable Service Item Component
const ServiceItem = ({ icon, label, badge = null }: { icon: React.ReactNode, label: string, badge?: React.ReactNode }) => (
  <div className="flex flex-col items-center cursor-pointer">
    <div className="w-[36px] h-[36px] flex items-center justify-center relative mb-1.5">
       {icon}
       {badge && (
           <div className="absolute -top-1.5 -right-2 z-10">
               {badge}
           </div>
       )}
    </div>
    <span className="text-[12px] text-[#333333] font-medium leading-tight whitespace-nowrap">{label}</span>
  </div>
);

export default function JDAllServices() {
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

      {/* 2. 保险保障 Card */}
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

             <ServiceItem label="车险" badge={
                 <div className="bg-[#5984f7] text-white text-[9px] scale-90 px-1 py-[1.5px] rounded-[3px] rounded-br-[0px] shadow-sm transform -translate-x-1 whitespace-nowrap z-20 font-bold border border-white">底价</div>
             } icon={
                 <div className="w-[30px] h-[24px] bg-[#5984f7] rounded-[6px] rounded-b-sm flex items-center justify-center shadow-sm relative mt-2">
                     <div className="w-[18px] h-[6px] bg-white opacity-80 rounded-[2px] mt-[-6px]"></div>
                     <div className="absolute bottom-[2px] left-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                     <div className="absolute bottom-[2px] right-[4px] w-1.5 h-1.5 bg-[#3755b3] rounded-full"></div>
                 </div>
             } />

         </div>
      </div>

      {/* 3. 生活服务 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-5 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
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
                         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     </div>
                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                     {/* subtle tail */}
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

             {/* Row 2 */}
             <ServiceItem label="生活缴费" icon={
                 <div className="w-[28px] h-[34px] bg-gradient-to-b from-[#6b8cff] to-[#4c75f5] flex items-center justify-center relative shadow-sm" style={{borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px'}}>
                     {/* Lightning mock */}
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
                     {/* subtle sheen top right */}
                     <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full opacity-30"></div>
                     {/* small hanging ball */}
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

             {/* Row 3 */}
             <ServiceItem label="市民中心" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fc726c] to-[#ed4e4a] rounded-full flex items-center justify-center shadow-sm relative overflow-hidden">
                     {/* building back */}
                     <div className="absolute bottom-[4px] left-[6px] w-[6px] h-[14px] bg-[#a93026]"></div>
                     <div className="absolute bottom-[4px] right-[7px] w-[8px] h-[10px] bg-[#a93026]"></div>
                     {/* people front */}
                     <svg className="w-[20px] h-[20px] text-white absolute bottom-[2px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                     </svg>
                 </div>
             } />

         </div>
      </div>

      {/* 4. 互动福利 Card */}
      <div className="mx-4 bg-white rounded-xl pt-[14px] pb-6 px-2 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
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
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#ffb4b7] to-[#fb7c81] rounded-[40%_60%_40%_60%] border-[2px] border-white flex flex-col items-center justify-center shadow-sm relative bg-[#fff]">
                     {/* bunny ears */}
                     <div className="absolute -top-1 left-1.5 w-[6px] h-[14px] bg-[#ffb4b7] rounded-full z-[-1] transform -rotate-12 border border-white"></div>
                     <div className="absolute -top-1 right-1.5 w-[6px] h-[14px] bg-[#ffb4b7] rounded-full z-[-1] transform rotate-12 border border-white"></div>
                     {/* eyes */}
                     <div className="flex space-x-1.5 mt-[-2px]">
                         <div className="w-1 h-1 bg-[#d8404a] rounded-full"></div>
                         <div className="w-1 h-1 bg-[#d8404a] rounded-full"></div>
                     </div>
                     <div className="w-1 h-1 bg-white rounded-full mt-[2px]"></div>
                 </div>
             } />

             <ServiceItem label="财福花园" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#ff8b7c] to-[#ee5541] rounded-full flex flex-col items-center justify-end shadow-sm pb-[3px]">
                     {/* flower pot */}
                     <div className="w-[12px] h-[6px] bg-[#a93026] rounded-sm relative z-10 mt-[2px]"></div>
                     {/* flower */}
                     <div className="absolute top-[5px] flex items-end">
                         <div className="w-[4px] h-[8px] bg-white rounded-[2px] transform -rotate-[30deg] origin-bottom-right opacity-90"></div>
                         <div className="w-[5px] h-[8px] bg-white rounded-[2px] mx-[1px] mb-[-1px]"></div>
                         <div className="w-[4px] h-[8px] bg-white rounded-[2px] transform rotate-[30deg] origin-bottom-left opacity-90"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="天天红包" icon={
                 <div className="w-[28px] h-[34px] bg-gradient-to-b from-[#fb605a] to-[#d63a34] rounded-[4px] flex items-center justify-center shadow-sm relative overflow-hidden">
                     {/* Envelope flap */}
                     <div className="absolute top-[-10px] w-[34px] h-[20px] bg-[#ff8078] rounded-b-full shadow-sm border-b-[1px] border-[#c0302b]"></div>
                     <div className="absolute top-[5px] w-[10px] h-[10px] bg-[#fbd055] rounded-full shadow-sm z-10 flex items-center justify-center border border-[#d6a524]">
                         <div className="w-1 h-1 bg-[#d6a524] rounded-sm"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="京豆捕鱼" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#6f5af3] to-[#402db3] rounded-full flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                     {/* Background waves */}
                     <div className="absolute bottom-0 left-0 w-[40px] h-[10px] bg-[#49c5f8] opacity-80" style={{borderRadius: '50% 50% 0 0'}}></div>
                     {/* Fish mock */}
                     <div className="w-[18px] h-[10px] bg-[#fdd340] rounded-[50%_40%_20%_50%] border border-[#db961a] shadow-sm transform -rotate-12 mb-[2px] z-10 flex border-t-0">
                         {/* eye */}
                         <div className="w-[3px] h-[3px] bg-black rounded-full mt-1 ml-[2px]"></div>
                     </div>
                     {/* Tail */}
                     <div className="absolute top-[8px] right-[4px] w-[8px] h-[10px] bg-[#e13b41] rounded-[2px] shrink-0 border border-white"></div>
                 </div>
             } />

             {/* Row 2 */}
             <ServiceItem label="天天来提额" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#ffe5a4] to-[#f9bb40] rounded-[10px] flex items-center justify-center shadow-sm relative overflow-hidden border border-[#f9bb40]/30 mt-1">
                     {/* Cat shape mock */}
                     <div className="w-[20px] h-[24px] bg-white rounded-t-[10px] rounded-b-[4px] mt-2 flex flex-col items-center absolute bottom-0 shadow-sm border border-[#e4dcc1]">
                         <div className="flex space-x-1 mt-1">
                            <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
                            <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
                         </div>
                     </div>
                     {/* Gold coin overriding */}
                     <div className="w-[14px] h-[14px] bg-[#fc4d40] rounded-full z-10 absolute bottom-[2px] -right-[2px] border-[2px] border-white shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#fbd055] rounded-[1px]"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="掼蛋" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fbbf7e] to-[#e4984e] border-[1.5px] border-[#fcdeb4] rounded-full flex flex-col items-center justify-center shadow-sm relative pt-[2px]">
                     {/* Playing cards stacked */}
                     <div className="w-[16px] h-[20px] bg-white rounded-sm border border-[#ce8646] shadow-sm transform -rotate-12 absolute left-[4px] top-[4px] flex items-center justify-center text-[#d13a30] text-[10px] font-bold">A</div>
                     <div className="w-[16px] h-[20px] bg-white rounded-sm border border-[#ce8646] shadow-sm transform rotate-[10deg] absolute right-[4px] top-[5px] z-10 flex items-center justify-center text-black text-[10px] font-bold">♠</div>
                     <div className="absolute bottom-[2px] bg-[#c36511] text-white text-[8px] rounded px-[6px] py-[1px] leading-none z-20 font-bold border border-white scale-90 whitespace-nowrap">掼</div>
                 </div>
             } />

             <ServiceItem label="黄金豆" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#ffd391] to-[#f2943b] rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                     {/* Internal bean shape */}
                     <div className="w-[20px] h-[20px] bg-gradient-to-br from-[#fcad59] to-[#d66518] rounded-full absolute -top-1 -right-1 shadow-sm"></div>
                     {/* stars */}
                     <svg className="w-[8px] h-[8px] text-white absolute bottom-[6px] left-[6px]" viewBox="0 0 24 24" fill="currentColor">
                         <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
                     </svg>
                 </div>
             } />

             <ServiceItem label="斗地主" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#8fdeff] to-[#40a3eb] rounded-full flex items-center justify-center relative shadow-sm overflow-hidden">
                     {/* Farmer hat */}
                     <div className="absolute top-[3px] w-[18px] h-[8px] bg-[#fbaf64] rounded-t-full shadow-sm z-20 border border-[#d68536]"></div>
                     {/* Face */}
                     <div className="absolute top-[8px] w-[20px] h-[16px] bg-[#ffd4b3] rounded-full z-10 flex flex-col items-center pb-1">
                        <div className="flex space-x-1 mt-1">
                           <div className="w-[4px] h-[2px] bg-gray-800 rounded-lg"></div>
                           <div className="w-[4px] h-[2px] bg-gray-800 rounded-lg"></div>
                        </div>
                        <div className="w-[8px] h-[4px] bg-[#e44e45] rounded-b-full mt-1"></div>
                     </div>
                 </div>
             } />

             <ServiceItem label="互动游戏" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-tr from-[#9c7bfe] to-[#c6b4ff] rounded-full flex items-center justify-center relative shadow-sm">
                     {/* Gamepad mock */}
                     <div className="w-[22px] h-[14px] bg-[#492caf] rounded-full flex items-center justify-between px-[4px] transform rotate-[-15deg] shadow-sm relative">
                         {/* D-Pad mock */}
                         <div className="w-[6px] h-[6px] bg-[#b1a2f4] rounded-sm flex items-center justify-center">
                             <div className="w-[8px] h-[2px] bg-[#b1a2f4]"></div>
                         </div>
                         {/* Buttons */}
                         <div className="flex space-x-[2px]">
                             <div className="w-[3px] h-[3px] bg-[#61dfab] rounded-full"></div>
                             <div className="w-[3px] h-[3px] bg-[#fc4d40] rounded-full mt-[3px]"></div>
                         </div>
                     </div>
                 </div>
             } />

             {/* Row 3 */}
             <ServiceItem label="养猪猪" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-tr from-[#fdb5b1] to-[#fedae3] rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border border-[#fcafac]">
                     {/* snout */}
                     <div className="absolute top-[10px] left-[6px] w-[16px] h-[12px] bg-[#e66c75] rounded-full flex items-center justify-center space-x-[2px] shadow-sm transform rotate-[-10deg] border border-[#a2363d]">
                        <div className="w-[3px] h-[4px] bg-[#752a2d] rounded-[50%]"></div>
                        <div className="w-[3px] h-[4px] bg-[#752a2d] rounded-[50%]"></div>
                     </div>
                     {/* 包邮 tag overrides Pig */}
                     <div className="absolute bottom-[-2px] -right-[1px] bg-[#ea3d33] text-white text-[9px] scale-90 px-[4px] py-[1.5px] rounded-[3px] z-20 font-bold border border-white tracking-widest leading-none">包邮</div>
                 </div>
             } />

             <ServiceItem label="摇黄金" icon={
                 <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#fbbf7e] to-[#db7b20] rounded-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden border border-[#fbd8b0]">
                     {/* Gold bag base */}
                     <div className="absolute bottom-[-1px] w-[26px] h-[18px] bg-[#d36411] rounded-[6px_6px_10px_10px] shadow-[inset_0_-4px_4px_rgba(0,0,0,0.1)]"></div>
                     {/* Bag neck */}
                     <div className="absolute bottom-[16px] w-[14px] h-[4px] bg-[#b44e04] rounded-[2px] z-10 border-b border-[#ffd7aa]"></div>
                     {/* Coins spilling out */}
                     <div className="w-1.5 h-1.5 bg-[#ffeb85] rounded-full absolute top-[6px] left-[10px] shadow-sm"></div>
                     <div className="w-2 h-2 bg-[#ffc334] rounded-full absolute top-[4px] left-[16px] shadow-sm border-[0.5px] border-[#da9415]"></div>
                     <div className="w-1.5 h-1.5 bg-[#fff8b7] rounded-full absolute top-[10px] left-[20px] shadow-sm"></div>
                 </div>
             } />

         </div>
      </div>

      {/* 5. Footer Logos (Ghosted bottom text) */}
      <div className="w-full pt-4 pb-8 flex flex-col items-center justify-center opacity-30">
          <div className="flex items-center space-x-1 mb-1">
             {/* Small JD logo mark mock */}
             <div className="w-5 h-5 border-[1.5px] border-black rounded-[6px] relative overflow-hidden flex flex-col items-center">
                <div className="w-[12px] h-[10px] bg-black rounded-b-full absolute bottom-[-4px]"></div>
                <div className="w-1 h-1 bg-black rounded-full absolute top-[5px] left-[3px]"></div>
             </div>
             <span className="text-[17px] font-bold text-black tracking-widest font-sans">京东金融</span>
          </div>
          <div className="flex items-center text-[12px] text-gray-500 font-medium">
             <div className="w-[20px] h-[1px] bg-gray-400 mr-2"></div>
             简单 · 快捷 · 安全
             <div className="w-[20px] h-[1px] bg-gray-400 ml-2"></div>
          </div>
      </div>

    </div>
  );
}
