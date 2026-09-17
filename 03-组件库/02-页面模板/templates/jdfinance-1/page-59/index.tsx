/**
 * @name 京东小金库核心大版面页 (page-64)
 */
import React from 'react';
import './style.css';

export default function JDXiaojinkuHero() {

  const gridServices = [
    {
      label: "收益购",
      hasTag: true,
      tagText: "0元下单",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] overflow-visible">
           <path className="stroke-main" d="M18 20H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z"/>
           <path className="stroke-accent" d="M16 6V4c0-2.2-1.8-4-4-4S8 1.8 8 4v2"/>
           <path className="stroke-main" d="M12 10v6M10 12h4M10 14h4"/>
        </svg>
      )
    },
    {
      label: "购物红包",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] overflow-visible">
           <path className="stroke-main" d="M4 6h16v12H4z"/>
           <path className="stroke-main" d="M4 6l8 6 8-6"/>
           <circle className="stroke-accent" cx="12" cy="15" r="1.5"/>
        </svg>
      )
    },
    {
      label: "固收理财",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] overflow-visible">
           <circle className="stroke-main" cx="12" cy="12" r="9"/>
           <path className="stroke-main" d="M8 14l2.5-3.5 2 2.5 L16 8"/>
           <path className="stroke-accent" d="M16 11V8h-3"/>
        </svg>
      )
    },
    {
      label: "绑微信消费",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] overflow-visible">
           <path className="stroke-main" d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.2-3.2 7.7-7.3 8L8 22v-3C5.5 17.5 4 15 4 12z"/>
           <path className="stroke-accent" d="M9 12l2 2 4-4"/>
        </svg>
      )
    },
    {
      label: "全部服务",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] overflow-visible">
           <rect className="stroke-main" x="5" y="5" width="6" height="6" rx="1"/>
           <rect className="stroke-main" x="15" y="5" width="4" height="6" rx="1"/>
           <rect className="stroke-main" x="5" y="15" width="6" height="4" rx="1"/>
           <rect className="stroke-main" x="15" y="15" width="4" height="4" rx="1"/>
           <circle className="fill-accent w-1 h-1" cx="21" cy="4" r="1"/>
        </svg>
      )
    }
  ];

  return (
    <div className="w-full min-h-screen bg-canvas flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* 
        ========================================================================
         BACKGROUND HER0 ARC & OVERLAYS
        ========================================================================
      */}
      <div className="hero-curved-wrapper">
          <div className="watermark-column watermark-left">理·理·财</div>
          <div className="watermark-column watermark-right">财·更·旺</div>
          
          <div className="gold-flare-1"></div>
          <div className="gold-flare-2"></div>
          <div className="gold-flare-3"></div>
      </div>

      {/* 
        ========================================================================
         TRANSPARENT TOP NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-3 pt-[52px] pb-[16px] relative z-20">
          <div className="flex items-center cursor-pointer active:opacity-60 pl-1">
              <svg className="w-[22px] h-[22px] text-[#111] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[19px] font-bold text-[#111] mr-2">京东小金库</span>
              <span className="text-[12px] text-[#555] tracking-wide mt-1 font-medium">简单·快捷·安全</span>
          </div>

          <div className="flex space-x-3 text-[#111] pr-1">
              <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 00-12.728 0M12 11c-1.657 0-3 1.343-3 3v2a3 3 0 003 3h0a3 3 0 003-3v-2c0-1.657-1.343-3-3-3zM9.5 7.5A2.5 2.5 0 0112 5h0a2.5 2.5 0 012.5 2.5M15 13h1.5a1.5 1.5 0 011.5 1.5v.5a1.5 1.5 0 01-1.5 1.5" />
              </svg>
              <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
          </div>
      </div>

      {/* 
        ========================================================================
         SCROLLING CONTENT LAYER
        ========================================================================
      */}
      <div className="w-full relative z-10 flex flex-col px-[14px]">
          
          {/* ---> LAYER 1: Core White Asset Card <--- */}
          <div className="glass-card mt-2 mb-4 pt-5 pb-[20px] px-4 w-full">
               
               {/* Overflow Sticky Promo Tag */}
               <div className="tag-right-overflow">
                   <div className="absolute left-[6px] top-[2px] w-[20px] h-[20px] bg-[#fbdfa2] rounded-full flex justify-center items-center transform -rotate-12">
                       <span className="text-[#e23b2c] font-black text-[12px] italic">¥</span>
                   </div>
                   6.18元现金 <span className="text-[#ffeecc] ml-1 opacity-90">必中</span> 
                   <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
               </div>

               <div className="flex items-center space-x-1.5 text-[15px] text-[#555] mb-[6px]">
                  <span>小金库资产</span>
                  <svg className="w-[18px] h-[18px] text-[#999] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  
                  {/* Security Badge */}
                  <div className="badge-orange-bg flex items-center">
                      <svg className="w-[9px] h-[9px] mr-[2px] text-[#d18158]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                      安全保障中
                  </div>
               </div>

               <div className="flex items-baseline space-x-2 mb-[25px]">
                  <span className="currency-hero">0.00</span>
                  <div className="flex items-center text-[#999] text-[13px] active:opacity-60 cursor-pointer">
                      明细 <svg className="w-3 h-3 ml-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
               </div>

               <div className="flex justify-between items-start mb-[30px] pr-[10px]">
                  <div className="flex flex-col">
                      <span className="text-[#999] text-[12px] mb-1">最新收益</span>
                      <span className="text-[#111] text-[16px] font-medium tracking-wide">收益在路上</span>
                  </div>
                  <div className="flex flex-col items-center pl-[10px]">
                      <span className="text-[#999] text-[12px] mb-1">累计收益</span>
                      <span className="text-[#111] text-[17px] font-sans font-bold">0.00</span>
                  </div>
                  <div className="flex flex-col items-end">
                      <span className="text-[#999] text-[12px] mb-1 flex items-center">
                         最高七日年化
                         <svg className="w-3 h-3 ml-1 text-[#ccc]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                      </span>
                      <span className="text-[#111] text-[17px] font-sans font-bold">1.6530%</span>
                  </div>
               </div>

               <div className="w-full flex space-x-3 mb-[20px]">
                   <div className="btn-half-light">转出</div>
                   <div className="btn-half-solid">转入</div>
               </div>

               <div className="flex items-center justify-center text-[#888] text-[12px] tracking-wide w-full pt-[6px]">
                   <svg className="w-[14px] h-[14px] mr-[6px] text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   领取「固收理财」资格，约定年化收益可达8.18% 
                   <div className="w-[5px] h-[5px] bg-[#f23c3c] rounded-full ml-1.5 mr-[3px]"></div>
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
               </div>

          </div>

          {/* ---> LAYER 2: Promo Scratch Ticket <--- */}
          <div className="w-full flex flex-col items-center mb-[20px] text-white relative mt-[5px]">
               <span className="font-bold font-sans italic text-[16px] tracking-widest mb-[6px] drop-shadow-md pb-1">刮财富618</span>
               
               <div className="scratch-ticket-box">
                   <span className="text-[28px] font-bold tracking-widest mr-1 italic drop-shadow font-sans pr-1">618元</span>
                   <span className="text-[14px] font-bold italic opacity-30 drop-shadow mt-[8px]">快来领取</span>
                   
                   {/* Decorative 3D yellow shape fakeout */}
                   <div className="absolute right-[-20px] bottom-[-20px] w-[100px] h-[100px] bg-gradient-to-br from-[#ffe7a0] to-[#fdb54d] transform rotate-12 rounded-lg opacity-80 mix-blend-overlay"></div>
               </div>

               <div className="scratch-btn-glow mt-[-14px] z-10 select-none cursor-pointer active:scale-95 transition-transform">
                   立即刮奖
               </div>
          </div>

          {/* ---> LAYER 3: Grid Services Matrix <--- */}
          <div className="glass-card px-[10px] py-[16px] mb-4">
              <div className="grid grid-cols-5 gap-y-2">
                  {gridServices.map((item, idx) => (
                     <div key={idx} className="icon-wrapper relative">
                         <div className="icon-box">
                             {item.icon}
                             {item.hasTag && (
                                <div className="grid-overlap-badge">{item.tagText}</div>
                             )}
                         </div>
                         <span className="icon-label font-medium">{item.label}</span>
                     </div>
                  ))}
              </div>
          </div>

          {/* ---> LAYER 4: Term Deposit Product Layout <--- */}
          <div className="glass-card px-[16px] pt-[20px] pb-[16px] mb-[40px]">
              <div className="flex justify-between items-end mb-[22px]">
                  <span className="text-[17px] font-bold text-[#111]">定期理财</span>
                  <div className="flex items-center text-[12px] text-[#999] active:opacity-70 cursor-pointer">
                      闲钱放定期 追求更高收益 <svg className="w-3 h-3 ml-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
              </div>

              {/* Product 1 */}
              <div className="w-full flex justify-between items-center mb-[8px]">
                  <div className="flex items-end">
                      <span className="text-[22px] font-bold font-sans text-[#f23c3c] leading-none mb-[-2px] tracking-tight w-[78px]">+5.41%</span>
                      <span className="text-[15px] font-bold text-[#222] ml-4 mr-2 leading-none">6个月</span>
                      <div className="badge-red-outline">福利</div>
                  </div>
                  <div className="btn-soft-orange cursor-pointer active:opacity-70">
                      购买
                  </div>
              </div>
              <div className="info-faint-box mb-[25px]">
                  该产品已经连涨<span className="text-[#f23c3c]">10</span>天，趋势向好，不错过好收益
              </div>

              {/* Line Divider */}
              <div className="w-[calc(100%-80px)] h-[1px] bg-[#f5f5f5] ml-[78px] mb-[22px]"></div>

              {/* Product 2 */}
              <div className="w-full flex justify-between items-center pb-[5px]">
                  <div className="flex items-end">
                      <span className="text-[22px] font-bold font-sans text-[#f23c3c] leading-none mb-[-2px] tracking-tight w-[78px]">+4.25%</span>
                      <span className="text-[15px] font-bold text-[#222] ml-4 mr-2 leading-none">3个月</span>
                      <div className="badge-orange-bg border-none" style={{ background: '#fffcf9', border: '1px solid #ffd8c7', color: '#db845b' }}>正收益</div>
                  </div>
                  <div className="btn-soft-orange cursor-pointer active:opacity-70">
                      购买
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}
