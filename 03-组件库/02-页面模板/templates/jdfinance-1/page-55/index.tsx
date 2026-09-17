/**
 * @name 全量财富会员大厅页 (page-60)
 */
import React from 'react';
import './style.css';

export default function JDWealthVIP() {

  const cardRow1 = [
    { bgClass: 'card-red', watermark: 'Cours', label: '小金库红包',
      content: (
        <div className="relative w-full h-[85px] flex justify-center items-start pt-[20px]">
           <div className="relative w-[45px] h-[40px] bg-gradient-to-b from-[#ffdbb5] to-[#f09a5b] rounded-[40%_40%_50%_50%] border-t border-[#fff1e0] shadow-[0_6px_12px_rgba(0,0,0,0.5)] flex justify-center z-10">
               {/* Sack Tie */}
               <div className="absolute top-[-8px] w-[20px] h-[8px] bg-gradient-to-b from-[#ffe5c7] to-[#fad5a7] rounded-[50%_50%_0_0] border-b border-[#dd925a]"></div>
           </div>
        </div>
      )
    },
    { bgClass: 'card-purple', watermark: 'VIP', label: '机场贵宾厅',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-start pt-[15px] overflow-visible">
             <svg className="w-[72px] h-[72px] text-[#f7f8fa] drop-shadow-[4px_6px_3px_rgba(0,0,0,0.3)] transform -rotate-[20deg]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
             </svg>
         </div>
      )
    },
    { bgClass: 'card-blue', watermark: 'Fina', label: '理财师陪伴',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-end">
            <div className="w-[48px] h-[58px] bg-[#1a2e45] rounded-t-[22px] relative shadow-[0_-2px_10px_rgba(0,0,0,0.4)] flex justify-center">
               {/* Face */}
               <div className="w-[20px] h-[24px] bg-[#fed0b9] rounded-[8px_8px_12px_12px] mt-[6px]">
                   {/* Hair */}
                   <div className="w-[22px] h-[10px] bg-[#1a1715] rounded-t-full ml-[-1px] mt-[-2px]"></div>
               </div>
               {/* Suit body */}
               <div className="w-[42px] h-[26px] bg-[#192430] absolute bottom-0 rounded-t-[8px]">
                    {/* Suit collar V */}
                    <div className="absolute top-0 left-[50%] transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#fed0b9]"></div>
               </div>
            </div>
         </div>
      )
    },
    { bgClass: 'card-brown', watermark: 'Jing', label: '京东双倍',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-center">
             <div className="w-[40px] h-[40px] rounded-full bg-[#f6483d] flex justify-center items-center shadow-lg">
                <div className="w-[20px] h-[20px] bg-white rounded flex justify-center items-center overflow-hidden mr-[1px]">
                   <div className="w-[10px] h-[5px] bg-[#f04a4b] rounded-t-lg mt-[3px]"></div>
                </div>
             </div>
         </div>
      )
    }
  ];

  const cardRow2 = [
    { bgClass: 'card-cyan', watermark: 'ca', label: '支付满减券',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-start pt-[20px]">
             <div className="w-[45px] h-[45px] bg-[#3a158b] rounded-full border-2 border-[#6232cc] shadow-inner opacity-40"></div>
         </div>
      )
    },
    { bgClass: 'card-blue', watermark: 'card', label: '京东E卡',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-start pt-[25px]">
             <div className="w-[60px] h-[38px] bg-gradient-to-br from-[#10b2f1] to-[#047ccc] rounded-[4px] relative overflow-hidden flex flex-col pt-1 pl-1 transform -rotate-[6deg] shadow-[4px_6px_6px_rgba(0,0,0,0.3)]">
                 <div className="w-[12px] h-[8px] border border-[#ffefa1] rounded-[2px] opacity-70 mb-[2px]"></div>
                 <div className="absolute top-0 right-0 h-full w-[35px] bg-[#009bfa]"></div>
                 <span className="font-sans font-black italic text-white text-[16px] absolute right-2 bottom-1 drop-shadow-md">JD</span>
                 <span className="text-[7px] text-white/80 absolute left-1 bottom-1">¥50</span>
             </div>
         </div>
      )
    },
    { bgClass: 'card-green', watermark: 'off', label: '话费充值券',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-start pt-[25px]">
             <div className="w-[52px] h-[35px] bg-gradient-to-r from-[#ffe1c2] to-[#fdbe8a] rounded-[4px] relative flex items-center justify-center transform rotate-[6deg] shadow-[2px_6px_5px_rgba(0,0,0,0.4)] border border-[#ffeed6]">
                <div className="absolute left-[-3px] flex flex-col space-y-[2px]">
                   {[1,2,3,4].map(k=><div key={k} className="w-[6px] h-[6px] bg-[#051d0e] rounded-full"></div>)}
                </div>
                <div className="absolute right-[-3px] flex flex-col space-y-[2px]">
                   {[1,2,3,4].map(k=><div key={k} className="w-[6px] h-[6px] bg-[#051d0e] rounded-full"></div>)}
                </div>
                <svg className="w-[18px] h-[18px] text-[#e37e29]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
             </div>
         </div>
      )
    },
    { bgClass: 'card-darkred', watermark: 'Po', label: '申购费减免',
      content: (
         <div className="relative w-full h-[85px] flex justify-center items-start pt-[25px]">
             <div className="relative w-[54px] h-[32px] shadow-[4px_6px_6px_rgba(0,0,0,0.4)]">
                 <div className="w-full h-full bg-[#bd241f] rounded-sm transform rotate-[-6deg] absolute top-[2px] left-[2px] opacity-80"></div>
                 <div className="w-full h-full bg-gradient-to-br from-[#ee4b46] to-[#ba2923] rounded-sm transform rotate-[4deg] relative flex items-center border-t border-[#f59e9a]">
                    <div className="w-[10px] h-full bg-[#fde8dc] absolute right-[10px] border-r border-[#e8cbb9]"></div>
                    <div className="w-[12px] h-[12px] bg-[#ffecc5] rounded-full border-[1px] border-[#da9447] absolute right-[9px] z-10 shadow-sm flex justify-center items-center"><div className="w-1 h-1 bg-[#da9447] rounded-full"></div></div>
                 </div>
             </div>
         </div>
      )
    }
  ];

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
    )}
  ];

  return (
    <div className="w-full min-h-screen space-bg-container flex flex-col font-sans select-none overflow-x-hidden text-white pb-[30px]">
      
      {/* Dynamic Starry Universe Background Layer */}
      <div className="starry-universe"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* 
            ====================================================================
             TOP NAV & HERO TITLE
            ====================================================================
          */}
          <div className="w-full flex items-center justify-between px-3 pt-[52px]">
              <div className="w-8 flex items-center cursor-pointer active:opacity-60">
                  <svg className="w-[26px] h-[26px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="w-8 flex space-x-1 items-center justify-end cursor-pointer active:opacity-60 pr-1">
                  <div className="w-[4.5px] h-[4.5px] bg-white rounded-full"></div>
                  <div className="w-[4.5px] h-[4.5px] bg-white rounded-full"></div>
                  <div className="w-[4.5px] h-[4.5px] bg-white rounded-full"></div>
              </div>
          </div>

          <div className="mt-8 mb-[18px]">
              <div className="hero-member-badge">
                  <span className="font-bold font-sans italic text-[14px] mr-[3px]">V</span> 财富会员
              </div>
          </div>

          <div className="mb-[25px]">
              <h1 className="hero-title-main">1元即享海量权益</h1>
          </div>

          {/* 
            ====================================================================
             CAROUSEL CARD ROWS
            ====================================================================
          */}
          
          <div className="w-full flex flex-col space-y-[12px] mb-[30px] px-[16px]">
              
              {/* Row 1 (Shifted Left) */}
              <div className="flex space-x-[12px] justify-start w-[150%] transform -translate-x-[20px]">
                  {cardRow1.map((c, i) => (
                      <div key={i} className={`hero-card ${c.bgClass}`}>
                          <div className="watermark-hero">{c.watermark}</div>
                          {c.content}
                          <div className="card-label">{c.label}</div>
                      </div>
                  ))}
              </div>

              {/* Row 2 (Shifted Right) */}
              <div className="flex space-x-[12px] justify-start w-[150%] transform -translate-x-[14px]">
                  {cardRow2.map((c, i) => (
                      <div key={i} className={`hero-card ${c.bgClass}`}>
                          <div className="watermark-hero">{c.watermark}</div>
                          {c.content}
                          <div className="card-label">{c.label}</div>
                      </div>
                  ))}
              </div>
          </div>

          {/* 
            ====================================================================
             CTA BUTTON & TEXT
            ====================================================================
          */}

          <div className="w-full px-[25px] mb-[15px]">
              <div className="cta-pill-hero w-full text-[18px] tracking-widest cursor-pointer active:scale-95">
                  体验1元理财产品<span className="opacity-80 px-2 font-normal">|</span>享海量权益
              </div>
          </div>
          
          <span className="text-[#867a72] text-[12px] tracking-wider mb-[45px]">理财值根据近30天日均资产1:1折算（不包含今天）</span>


          {/* 
            ====================================================================
             MEMBER OPTIONAL EQUITIES (Copied module from page-59)
            ====================================================================
          */}
          
          <div className="section-divider mb-[20px]">
              <span className="text-[17px] font-medium tracking-widest text-[#ece2db]">财富会员可选权益</span>
          </div>

          <div className="w-full flex px-[12px] space-x-[10px] overflow-x-auto no-scrollbar mb-[20px]">
              <div className="lv-pill lv-pill-idle">Lv.1</div>
              <div className="lv-pill lv-pill-idle">Lv.2</div>
              <div className="lv-pill lv-pill-active">Lv.3</div>
              <div className="lv-pill lv-pill-idle">Lv.4</div>
              <div className="lv-pill lv-pill-idle">Lv.5</div>
              <div className="lv-pill lv-pill-idle">Lv.6</div>
          </div>

          <div className="w-full px-2 pt-[10px] pb-[35px] grid grid-cols-4 gap-y-[22px] gap-x-1">
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

      </div>
    </div>
  );
}
