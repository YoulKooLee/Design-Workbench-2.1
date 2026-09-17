/**
 * @name 我的小金库账单页 (page-61)
 */
import React from 'react';
import './style.css';

export default function JDXiaojinkuBill() {

  const billData = [
    {
      month: "2025年2月",
      items: [
        {
          type: 'repay',
          title: '白条还款',
          time: '2025-02-27 10:36:38',
          amount: '-25.00',
          balance: '0.00'
        },
        {
          type: 'transfer',
          title: '转入',
          time: '2025-02-27 10:36:37',
          amount: '+25.00',
          balance: '25.00'
        }
      ]
    },
    {
      month: "2023年5月",
      items: [
        {
          type: 'repay',
          title: '金条还款',
          time: '2023-05-26 22:03:39',
          amount: '-3837.03',
          balance: '0.00'
        },
        {
          type: 'transfer',
          title: '转入',
          time: '2023-05-26 22:03:38',
          amount: '+3837.03',
          balance: '3837.03'
        }
      ]
    },
    {
      month: "2023年4月",
      items: [
        {
          type: 'repay',
          title: '金条还款',
          time: '2023-04-26 09:56:52',
          amount: '-3833.51',
          balance: '0.00'
        },
        {
          type: 'transfer',
          title: '转入',
          time: '2023-04-26 09:56:51',
          amount: '+3833.51',
          balance: '3833.51'
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
              <svg className="w-[26px] h-[26px] text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
          </div>
          <div className="flex-1 flex justify-center">
             <span className="text-[17px] font-bold tracking-widest text-[#111]">我的小金库</span>
          </div>
          <div className="w-12"></div>
      </div>

      {/* 
        ========================================================================
         MAIN CONTENT AREA
        ========================================================================
      */}
      <div className="flex-1 w-full px-[14px] pt-[14px] pb-[40px]">
          
          <div className="w-full bg-white rounded-[12px] p-[20px] pb-[40px] shadow-sm min-h-full">
               
               {/* Fixed Filter Row */}
               <div className="flex space-x-3 mb-[30px] pt-[2px]">
                   
                   {/* 1. Category Filter */}
                   <div className="filter-btn flex-1">
                        <svg className="w-[14px] h-[14px] text-gray-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
                        </svg>
                        <span className="flex-1">全部账单</span>
                        <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                   </div>

                   {/* 2. Date Filter */}
                   <div className="filter-btn flex-1">
                        <svg className="w-[15px] h-[15px] text-gray-500 mr-2 border border-gray-400 rounded-sm p-[1px]" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span className="flex-1">选择时间</span>
                        <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                   </div>
               </div>

               {/* Map through Monthly Groups */}
               {billData.map((group, groupIdx) => (
                  <div key={groupIdx} className="w-full flex flex-col">
                      <h3 className="title-month">{group.month}</h3>
                      <div className="dash-divider"></div>
                      
                      {group.items.map((item, itemIdx) => (
                         <div key={itemIdx} className="flex justify-between items-center mb-[35px] cursor-pointer active:opacity-60">
                             
                             {/* Left side: Icon + Titles */}
                             <div className="flex items-center">
                                 <div className={item.type === 'repay' ? 'list-icon-repay' : 'list-icon-transfer'}></div>
                                 <div className="flex flex-col ml-[14px]">
                                     <span className="item-title">{item.title}</span>
                                     <span className="item-time">{item.time}</span>
                                 </div>
                             </div>

                             {/* Right side: Amounts + Arrow */}
                             <div className="flex items-center">
                                 <div className="flex flex-col items-end mr-[6px]">
                                     <span className="item-amount">{item.amount}</span>
                                     <span className="item-balance">余额 {item.balance}</span>
                                 </div>
                                 <svg className="w-[14px] h-[14px] text-gray-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                 </svg>
                             </div>

                         </div>
                      ))}
                  </div>
               ))}

               {/* Footer Link */}
               <div className="w-full flex justify-center items-center mt-[10px] pb-[10px] cursor-pointer">
                   <span className="text-[13px] text-[#999] tracking-wider">2017.9.1前的账单 点此查看</span>
                   <svg className="w-[12px] h-[12px] text-[#999] opacity-80 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                   </svg>
               </div>

          </div>
      </div>

    </div>
  );
}
