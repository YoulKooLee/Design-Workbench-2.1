/**
 * @name 小金库全部服务页 (page-62)
 */
import React from 'react';
import './style.css';

export default function JDXiaojinkuServices() {

  // Data structure for the grids
  const serviceGroups = [
    {
      title: "还钱",
      items: [
        {
          label: "还白条",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path className="stroke-accent" d="M10 11l4 2-1-4"/>
            </svg>
          )
        },
        {
          label: "还金条",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="9"/>
              <path className="stroke-accent" d="M10 12h5m-2-2l2 2-2 2"/>
            </svg>
          )
        },
        {
          label: "还贷款",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M7 6c-2 4-3 8-3 12 0 4 3 4 8 4s8 0 8-4c0-4-1-8-3-12"/>
              <path className="stroke-main" d="M9 5c0-1.5 1-3 3-3s3 1.5 3 3"/>
              <path className="stroke-accent" d="M8 8h8"/>
              <path className="stroke-main" d="M10 12l2 2 2-2"/>
            </svg>
          )
        },
        {
          label: "还信用卡",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="3" y="6" width="18" height="12" rx="2"/>
              <path className="stroke-accent" d="M7 10h5"/>
              <path className="stroke-main" d="M12 14h5"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "攒钱",
      items: [
        {
          label: "轻松攒",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M18.5 7.5A3.5 3.5 0 0 0 15 4h-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2H7a3.5 3.5 0 0 0-3.5 3.5v1A2.5 2.5 0 0 0 6 11v6a2 2 0 0 0 2 2h1v1h2v-1h2v1h2v-1h1a2 2 0 0 0 2-2v-6c1.38 0 2.5-1.12 2.5-2.5v-1z"/>
              <circle className="fill-accent" cx="15.5" cy="8.5" r="1"/>
            </svg>
          )
        },
        {
          label: "工资理财",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="3" y="6" width="18" height="13" rx="2"/>
              <path className="stroke-main" d="M3 10c0-2.5 8-5 9-5s9 2.5 9 5"/>
              <circle className="stroke-accent" cx="16" cy="12" r="1.5"/>
            </svg>
          )
        },
        {
          label: "心愿计划",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="5" y="4" width="14" height="16" rx="2"/>
              <path className="stroke-accent" d="M12 14.5l-2.5-2a1.5 1.5 0 1 1 2.5-1.5 1.5 1.5 0 1 1 2.5 1.5z"/>
            </svg>
          )
        },
        {
          label: "自动充",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="4" y="5" width="16" height="14" rx="2"/>
              <path className="stroke-main" d="M4 9h16"/>
              <path className="stroke-main" d="M8 3v4M16 3v4"/>
              <path className="stroke-accent" d="M12 16v-4m-2 2l2-2 2 2"/>
            </svg>
          )
        },
        {
          label: "健康卡",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="4" y="6" width="16" height="12" rx="2"/>
              <path className="stroke-main" d="M4 10h16"/>
              <path className="stroke-accent" d="M12 12v4m-2-2h4"/>
            </svg>
          )
        },
        {
          label: "多花多攒",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M6 8l-1 12h14l-1-12z"/>
              <path className="stroke-main" d="M8 11V6a4 4 0 0 1 8 0v5"/>
              <circle className="fill-accent" cx="12" cy="14" r="1.5"/>
            </svg>
          )
        },
        {
          label: "宝宝金",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M12 21v-8"/>
              <path className="stroke-main" d="M12 15C8 15 5 12 5 8c4 0 7 3 7 7z"/>
              <path className="stroke-main" d="M12 18c4 0 7-3 7-7-4 0-7 3-7 7z"/>
              <path className="stroke-accent" d="M9 22h6"/>
            </svg>
          )
        },
        {
          label: "银行转账",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="4" y="6" width="16" height="12" rx="2"/>
              <path className="stroke-main" d="M14 9H9l2-2"/>
              <path className="stroke-accent" d="M10 15h5l-2 2"/>
            </svg>
          )
        },
        {
          label: "成财计划",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M12 14l9-5-9-5-9 5z"/>
              <path className="stroke-main" d="M6 10.7V16c0 2 3 4 6 4s6-2 6-4v-5.3"/>
              <line className="stroke-accent" x1="21" y1="9" x2="21" y2="15"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "赚钱",
      items: [
        {
          label: "自动赚",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="8"/>
              <path className="stroke-main" d="M12 8l3 4-3 4-3-4z"/>
              <path className="stroke-accent" d="M9 12a3 3 0 0 0 6 0"/>
            </svg>
          )
        },
        {
          label: "闲钱多赚",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M17.5 6.5C14 3 9 5 9 5s-2 5.5-5.5 8.5c-.5.5-.5 1.5 0 2s1.5.5 2 0l3-3c1-1 3-1 4 0s1 3 0 4l-3 3c-.5.5 0 2 2 0 3-3.5 8.5-5.5 8.5-5.5s2-5-1.5-8.5z"/>
              <path className="stroke-main" d="M7 17l-3 3"/>
              <circle className="fill-accent" cx="14" cy="10" r="1.5"/>
            </svg>
          )
        },
        {
          label: "金库+",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="8"/>
              <path className="stroke-main" d="M12 7l4 4-4 4-4-4z"/>
              <path className="stroke-accent" d="M18 6v4m-2-2h4"/>
            </svg>
          )
        },
        {
          label: "理财金",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="8"/>
              <path className="stroke-main" d="M10 9l2 3 2-3"/>
              <path className="stroke-main" d="M12 12v4"/>
              <path className="stroke-accent" d="M10 13h4M10 15h4"/>
            </svg>
          )
        },
        {
          label: "固收理财",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="8"/>
              <path className="stroke-main" d="M8 14l2-3 2 2 4-5"/>
              <path className="stroke-accent" d="M13 8h3v3"/>
            </svg>
          )
        },
        {
          label: "体验金",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <circle className="stroke-main" cx="12" cy="12" r="8"/>
              <path className="stroke-main" d="M10 6l-1 5 3 2 3-2-1-5"/>
              <circle className="fill-accent" cx="12" cy="16" r="2.5"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "用钱",
      items: [
        {
          label: "购物红包",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M4 7h16v11H4z"/>
              <path className="stroke-main" d="M4 7l8 6 8-6"/>
              <circle className="fill-accent" cx="12" cy="13" r="1.5"/>
            </svg>
          )
        },
        {
          label: "绑微信消费",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <path className="stroke-main" d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.2-3.2 7.7-7.3 8L8 22v-3C5.5 17.5 4 15 4 12z"/>
              <path className="stroke-accent" d="M9 12l2 2 4-4"/>
            </svg>
          )
        },
        {
          label: "充话费",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="6" y="4" width="12" height="16" rx="2"/>
              <path className="stroke-main" d="M9 12h6"/>
              <path className="stroke-main" d="M12 9v6"/>
              <path className="stroke-accent" d="M8 8h8M8 16h8"/>
            </svg>
          )
        },
        {
          label: "收益购",
          icon: (
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] overflow-visible">
              <rect className="stroke-main" x="4" y="5" width="16" height="14" rx="2"/>
              <path className="stroke-main" d="M10 9l2 3 2-3"/>
              <path className="stroke-accent" d="M12 12v3"/>
              <path className="stroke-main" d="M10 13h4M10 15h4"/>
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-canvas flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full bg-white flex items-center justify-between px-3 pt-[52px] pb-[16px] sticky top-0 z-50">
          <div className="w-12 flex items-center justify-center cursor-pointer active:opacity-60">
              <svg className="w-[26px] h-[26px] text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          <div className="flex-1 flex justify-center">
             <span className="text-[17px] font-bold tracking-widest text-[#111]">小金库全部服务</span>
          </div>
          <div className="w-12"></div>
      </div>

      {/* 
        ========================================================================
         MAIN CONTENT AREA
        ========================================================================
      */}
      <div className="flex-1 w-full px-[14px] pt-[12px] pb-[30px]">
          
          {/* Card 1: 持仓页应用 */}
          <div className="service-card flex items-center justify-between py-[22px]">
              
              <div className="flex items-center">
                  <span className="card-title-lg mr-3">持仓页应用</span>
                  
                  {/* Tiny Icon Sequence */}
                  <div className="flex space-x-1">
                      <div className="mini-icon-circle">
                         <span className="text-[9px] font-bold">¥</span>
                      </div>
                      <div className="mini-icon-circle">
                         <svg className="w-[9px] h-[9px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <div className="mini-icon-circle">
                         <svg className="w-[9px] h-[9px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                      </div>
                      <div className="mini-icon-circle">
                         <svg className="w-[9px] h-[9px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                      </div>
                  </div>
              </div>

              <div className="btn-edit">编辑</div>
          </div>

          {/* Cards 2-5: Dynamic Grids */}
          {serviceGroups.map((group, groupIdx) => (
             <div key={groupIdx} className="service-card pt-[20px] pb-[25px]">
                 <h2 className="card-title-md">{group.title}</h2>
                 
                 <div className="grid grid-cols-5 gap-y-[26px]">
                     {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="icon-wrapper">
                            <div className="icon-box">
                                {item.icon}
                            </div>
                            <span className="icon-label">{item.label}</span>
                        </div>
                     ))}
                 </div>
             </div>
          ))}

      </div>
    
    </div>
  );
}
