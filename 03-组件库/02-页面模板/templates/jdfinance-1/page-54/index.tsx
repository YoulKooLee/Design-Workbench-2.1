/**
 * @name 财富会员可选权益页 (page-59)
 */
import React from 'react';
import './style.css';

export default function JDWealthHubV2() {
  
  const gridItems = [
    { title: "话费立减", sub: "1.08元/月", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v3.5c-1.1 0-2 .9-2 2s.9 2 2 2V17c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-3.5c1.1 0 2-.9 2-2s-.9-2-2-2V8c0-1.1.9-2 2-2zm4 7h8v-2H8v2z"/></svg>
    )},
    { title: "2%活钱理财", sub: "专属额度20万", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
    )},
    { title: "财运券", sub: "至高68.88元", icon: (
      <strong className="text-[14px]">¥</strong>
    )},
    { title: "78元应急金", sub: "兑重疾保额", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 20.95c-4.42-.51-8-4.44-8-9 0-1.15.22-2.25.6-3.26L13.1 18.2c-.67.14-1.39.06-2.1 2.75zM22 12c0 5-3.8 9.09-8.7 9.87l-9.5-9.5C4.3 11 5 9 7 9h2l6-6 3.8 3.8L16 9.6h1.5C19.98 9.6 22 11.62 22 14v-2z"/></svg>
    )},
    { title: "进阶课程", sub: "基金投资指南", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
    )},
    { title: "2000元额度", sub: "信用卡还款", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
    )},
    { title: "车险免息券", sub: "12期免息", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
    )},
    { title: "外卖优惠券", sub: "8元券包", icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
    )},
    { title: "理财师", sub: "1v1专属服务", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    )},
    { title: "收益分析", sub: "基金收益速查", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
    )},
    { title: "账户险", sub: "至高200万", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
    )},
  ];

  return (
    <div className="w-full min-h-screen obsidian-bg flex flex-col font-sans select-none overflow-x-hidden text-white pb-[30px]">
      
      {/* 
        ========================================================================
         GLOBAL HEADER & MEMBER LEVEL NAVIGATION
        ========================================================================
      */}
      <div className="w-full flex items-center justify-between px-3 pt-[52px]">
          <div className="w-8 flex items-center cursor-pointer active:opacity-60 pointer-events-auto">
              <svg className="w-[26px] h-[26px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          
          <div className="flex-1 flex justify-center">
             <div className="section-divider flex-nowrap">
                <span className="text-[16px] font-medium tracking-widest text-[#ece2db] whitespace-nowrap flex-shrink-0">财富会员可选权益</span>
             </div>
          </div>

          <div className="w-8 flex space-x-1 items-center justify-end cursor-pointer active:opacity-60 pr-1">
              <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
              <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
          </div>
      </div>

      <div className="w-full flex px-[12px] space-x-[10px] overflow-x-auto no-scrollbar mt-[20px] pb-2">
          <div className="lv-pill lv-pill-idle">Lv.1</div>
          <div className="lv-pill lv-pill-idle">Lv.2</div>
          <div className="lv-pill lv-pill-active">Lv.3</div>
          <div className="lv-pill lv-pill-idle">Lv.4</div>
          <div className="lv-pill lv-pill-idle">Lv.5</div>
          <div className="lv-pill lv-pill-idle">Lv.6</div>
      </div>

      {/* 
        ========================================================================
         4-COLUMN GRID MATRIX
        ========================================================================
      */}
      <div className="w-full px-2 pt-[25px] pb-[35px] grid grid-cols-4 gap-y-[22px] gap-x-1 z-10">
          {gridItems.map((item, idx) => (
             <div key={idx} className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
                 <div className="grid-icon-box mb-2">
                     <div className="grid-icon-symbol">
                         {item.icon}
                     </div>
                 </div>
                 <span className="text-[#e2dad3] text-[12px] font-bold tracking-tight mb-1 leading-none">{item.title}</span>
                 <span className="text-[#867a72] text-[9px] tracking-tight scale-90">{item.sub}</span>
             </div>
          ))}
      </div>

      {/* 
        ========================================================================
         CATEGORY TABS SCROLL
        ========================================================================
      */}
      <div className="w-full flex flex-col items-center mt-2 mb-[50px]">
          <div className="section-divider mb-[12px]">
              <span className="text-[17px] font-medium tracking-widest text-[#ece2db]">理财优选好品</span>
          </div>
          <span className="text-[11px] text-[#867a72] tracking-wider mb-[25px]">理财值根据近30天日均持仓资产1:1折算</span>

          <div className="w-full flex px-[15px] space-x-[12px] overflow-x-auto no-scrollbar">
              <div className="category-tab category-tab-active">活钱理财</div>
              <div className="category-tab category-tab-idle">稳健理财</div>
              <div className="category-tab category-tab-idle">进阶理财</div>
              <div className="category-tab category-tab-idle">黄金投资</div>
          </div>
      </div>

      {/* 
        ========================================================================
         WHITE PRODUCT CARD WITH UPWARD TAB
        ========================================================================
      */}
      <div className="mx-[15px] product-main-card px-[20px] pt-[30px] pb-[25px] flex flex-col items-center text-center">
          
          <div className="card-top-tab">灵活取用</div>

          <h2 className="text-[22px] font-black text-[#111] tracking-widest mb-[12px]">闲钱就存小金库</h2>
          
          <div className="flex items-center space-x-1 mb-[25px]">
              <div className="feature-tag-solid">收益高</div>
              <div className="feature-tag-outline">历史天天正收益</div>
              <span className="text-[#999] text-[11px] ml-1">50万快赎秒到账</span>
          </div>

          <div className="number-ledger-bg border-b border-gray-100 pb-[10px] mb-[15px] w-full">
              <span className="txt-number-hero">1.6530%</span>
              <span className="text-[#999] text-[13px] tracking-widest mt-1">最高七日年化</span>
          </div>

          <div className="w-full mt-[5px]">
              <div className="btn-experience w-full py-[12px] rounded-full text-white font-bold text-[18px] tracking-widest cursor-pointer active:scale-[0.98] transition-transform">
                  立即体验
              </div>
          </div>
      </div>

      {/* 
        ========================================================================
         BOTTOM ACTIONS
        ========================================================================
      */}
      <div className="w-full flex justify-center mt-[35px] mb-[150px]">
          <div className="btn-view-more active:bg-white/10 transition-colors cursor-pointer">
              查看更多产品
          </div>
      </div>

    </div>
  );
}
