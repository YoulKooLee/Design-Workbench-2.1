/**
 * @name 特色榜单 (Featured Leaderboard / Specialty Fund List)
 */
import React from 'react';
import './style.css';

export default function JDFinanceFeaturedList() {
  return (
    <div className="w-full min-h-screen bg-[#f5f6f8] flex flex-col font-sans select-none overflow-x-hidden pt-[44px]">
      
      {/* 1. Top Header */}
      <div className="w-full h-[52px] bg-white px-4 flex items-center justify-between fixed top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
         <div className="w-10">
            <svg className="w-[22px] h-[22px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <span className="text-[17px] font-bold text-black tracking-wide">特色榜单</span>
         <div className="w-10 flex justify-end">
            <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
         </div>
      </div>

      {/* 2. Top Category Pills */}
      <div className="w-full bg-white flex items-center pt-3 pb-3 relative">
         <div className="flex-1 overflow-x-auto whitespace-nowrap pl-4 pr-16 no-scrollbar flex items-center space-x-2">
            <div className="inline-flex items-center px-[10px] py-[6px] bg-[#fff1f2] text-[#eb3d30] rounded text-[13px] font-medium tracking-wide flex-shrink-0">
               商品基金榜
            </div>
            <div className="inline-flex items-center px-[10px] py-[6px] bg-[#f4f5f7] text-[#555] rounded text-[13px] font-medium tracking-wide flex-shrink-0">
               领涨先锋
            </div>
            <div className="inline-flex items-center px-[10px] py-[6px] bg-[#f4f5f7] text-[#555] rounded text-[13px] font-medium tracking-wide flex-shrink-0">
               热基收益榜
            </div>
            <div className="inline-flex items-center px-[10px] py-[6px] bg-[#f4f5f7] text-[#555] rounded text-[13px] font-medium tracking-wide flex-shrink-0">
               QDII...
            </div>
         </div>
         {/* Fixed "更多" Right Area */}
         <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white via-white to-transparent w-16 flex items-center justify-end pr-4 pointer-events-none">
            <span className="text-[#555] text-[13px] font-medium pointer-events-auto cursor-pointer">更多</span>
         </div>
      </div>

      {/* 3. Recommendation Banner */}
      <div className="w-full px-4 mb-3 mt-[1px]">
         <div className="w-full bg-gradient-to-r from-[#ffeef0] to-[#fff3f4] rounded-lg p-3 flex items-start border border-[#ffeaed]">
            <div className="flex bg-[#e83a31] text-white text-[11px] font-bold px-1 py-[1px] rounded-[3px] mt-[1px] mr-1.5 flex-shrink-0">
               推荐理由
            </div>
            <p className="text-[12px] text-[#222] leading-[18px] tracking-tight w-full font-sans">
               筛选<span className="text-[#eb3d30]">近期涨幅优秀的商品基金</span>，并按照近1年收益排序。（成立满1年的非货基金，剔除异常数据基金）<span className="text-[#a0a0a0] ml-1">›</span>
            </p>
         </div>
      </div>

      {/* 4. Main White Card List Container */}
      <div className="w-full flex-1 bg-white pt-1">
         
         {/* Sub Category Text Toggles */}
         <div className="w-full px-4 py-2 flex items-center space-x-[14px] overflow-x-auto whitespace-nowrap no-scrollbar border-b border-gray-100">
            <div className="flex flex-col items-center">
               <span className="text-[14px] font-bold text-black tracking-tight mb-[2px]">全部</span>
               <div className="w-[14px] h-[3px] bg-[#eb3d30] rounded-full"></div>
            </div>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">黄金</span>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">白银</span>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">豆粕</span>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">原油</span>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">有色金属</span>
            <span className="text-[14px] font-medium text-gray-500 tracking-tight pb-[5px]">能源化工</span>
         </div>

         {/* Fund List rows */}
         <div className="w-full pb-10">
            <FundListItem 
               rank={1}
               title="易方达黄金主题（QDII-LOF-F..."
               yield1y="+45.42%"
               yield3y="+74.51%"
               btnType="pink"
            />
            <FundListItem 
               rank={2}
               title="建信上海金ETF联接A"
               yield1y="+41.83%"
               yield3y="+90.76%"
               btnType="red"
            />
            <FundListItem 
               rank={3}
               title="汇添富黄金及贵金属(QDII-LO..."
               yield1y="+41.69%"
               yield3y="+82.10%"
               btnType="pink"
            />
            <FundListItem 
               rank={0}
               title="国泰黄金ETF联接A"
               yield1y="+41.60%"
               yield3y="+92.74%"
               btnType="red"
            />
            <FundListItem 
               rank={0}
               title="嘉实黄金（QDII-FOF-LOF）"
               yield1y="+41.28%"
               yield3y="+80.07%"
               btnType="pink"
               isLast={true}
            />
         </div>

      </div>

    </div>
  );
}

// Sub-component: Fund List Item
const FundListItem = ({ rank, title, yield1y, yield3y, btnType, isLast }: any) => {

   // Determine medal styling based on rank
   let medalClass = "";
   if (rank === 1) medalClass = "rank-medal-gold text-white";
   else if (rank === 2) medalClass = "rank-medal-silver text-white";
   else if (rank === 3) medalClass = "rank-medal-bronze text-white";

   return (
      <div className={`w-full px-4 pt-5 pb-5 flex flex-col ${!isLast ? 'border-b border-gray-100' : ''}`}>
         
         {/* Row 1: Header */}
         <div className="flex items-center space-x-[6px] mb-4 relative">
            
            {/* Medals */}
            {rank > 0 && rank <= 3 && (
               <div className={`w-[18px] h-[18px] rounded flex items-center justify-center -ml-[2px] ${medalClass} relative flex-shrink-0`}>
                  {/* Star outline mock inside medal */}
                  <svg className="w-2.5 h-2.5 absolute top-[4px]" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.4h7.6z"/>
                  </svg>
                  {/* Outer ribbon mock */}
                  <div className="absolute top-[16px] left-[3px] w-[3px] h-[4px] bg-inherit -skew-x-[20deg]"></div>
                  <div className="absolute top-[16px] right-[3px] w-[3px] h-[4px] bg-inherit skew-x-[20deg]"></div>
               </div>
            )}

            <span className="text-[15px] text-black font-bold tracking-tight truncate max-w-[200px]">
               {title}
            </span>

            {/* Micro Tags */}
            <div className="flex items-center space-x-1 flex-shrink-0">
               <div className="border border-gray-300 text-gray-400 rounded-[2px] w-[14px] h-[14px] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
               </div>
               <div className="border border-gray-300 text-gray-500 rounded-[2px] text-xxs px-[3px] py-0.5 leading-none">
                  中高风险
               </div>
            </div>
         </div>

         {/* Row 2: Data & Action */}
         <div className="flex items-center justify-between">
            <div className="flex items-center w-[60%]">
               
               {/* Data Col 1 */}
               <div className="flex flex-col w-[50%]">
                  <span className="text-[#eb3d30] text-[18px] font-sans font-bold tracking-tight mb-[2px]">{yield1y}</span>
                  <span className="text-[11px] text-gray-400">近1年收益率</span>
               </div>
               
               {/* Data Col 2 */}
               <div className="flex flex-col w-[50%]">
                  <span className="text-black text-[15px] font-sans font-bold tracking-tight mb-[3px] mt-[1px]">{yield3y}</span>
                  <span className="text-[11px] text-gray-400">近3年收益率</span>
               </div>

            </div>

             {/* Action Button */}
             <div className={`
                 px-[18px] py-[6px] rounded-full text-[14px] font-bold text-white shadow-sm flex items-center justify-center
                 ${btnType === 'red' ? 'bg-[#eb3d30]' : 'bg-[#ffbcbc] font-medium'}
               `}>
                 买入
             </div>
         </div>

      </div>
   );
};
