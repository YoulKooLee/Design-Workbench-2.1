/**
 * @name 基金特色榜单 (Fund Featured Rankings Profile)
 */
import React from 'react';
import './style.css';

export default function JDFundRankings() {
  
  // Mock Data Array for the Ranking List
  const rankingData = [
    {
      id: 1,
      title: '易方达黄金主题 (QDII-LOF-F...',
      medal: 'gold',
      risk: '中高风险',
      returns1Y: '+45.42%',
      returns3Y: '+74.51%',
      isActiveBtn: false
    },
    {
      id: 2,
      title: '建信上海金ETF联接A',
      medal: 'silver',
      risk: '中高风险',
      returns1Y: '+41.83%',
      returns3Y: '+90.76%',
      isActiveBtn: true
    },
    {
      id: 3,
      title: '汇添富黄金及贵金属(QDII-LO...',
      medal: 'bronze',
      risk: '中风险',
      returns1Y: '+41.69%',
      returns3Y: '+82.10%',
      isActiveBtn: false
    },
    {
      id: 4,
      title: '国泰黄金ETF联接A',
      medal: 'none',
      risk: '中风险',
      returns1Y: '+41.60%',
      returns3Y: '+92.74%',
      isActiveBtn: true
    },
    {
      id: 5,
      title: '嘉实黄金 (QDII-FOF-LOF)',
      medal: 'none',
      risk: '中高风险',
      returns1Y: '+41.28%',
      returns3Y: '+80.07%',
      isActiveBtn: false
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f5f6f9] flex flex-col font-sans select-none overflow-x-hidden relative">
      
      {/* 
        ========================================================================
         TOP NAVIGATION HEADER
        ========================================================================
      */}
      <div className="w-full bg-white sticky top-0 z-50 flex flex-col shadow-sm">
         <div className="w-full pt-[52px] pb-[10px] px-4 flex items-center justify-between text-[#111]">
             {/* Back Button */}
             <div className="w-8 flex items-center cursor-pointer active:opacity-50">
                <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
             </div>
             
             {/* Dual Main Tabs */}
             <div className="flex space-x-6 items-center flex-1 justify-center relative -left-[10px]">
                 <span className="text-[17px] font-bold tracking-widest text-[#ccc]">基金排行</span>
                 <div className="relative flex flex-col items-center">
                     <span className="text-[18px] font-black tracking-widest text-[#111]">特色榜单</span>
                     <div className="absolute bottom-[-6px] w-[16px] h-[3px] bg-[#f44b4c] rounded-full"></div>
                 </div>
             </div>

             {/* Search Menu */}
             <div className="w-8 flex items-center justify-end cursor-pointer active:opacity-50">
                 <svg className="w-[22px] h-[22px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
             </div>
         </div>

         {/* 
           ========================================================================
            HORIZONTAL CATEGORY PILLS (SCROLLABLE)
           ========================================================================
         */}
         <div className="w-full pl-4 pr-1 py-3 flex overflow-x-auto scrollbar-hide space-x-2 fade-mask-right">
             <div className="px-3 py-[6px] bg-[#fef2f2] border border-[#ffdbdb] text-[#ec494a] text-[14px] font-bold rounded-[4px] tracking-widest flex items-center shrink-0">
                 商品基金榜
             </div>
             <div className="px-3 py-[6px] bg-[#f5f6f9] text-[#111] text-[14px] font-medium rounded-[4px] tracking-widest flex items-center shrink-0">
                 领涨先锋
             </div>
             <div className="px-3 py-[6px] bg-[#f5f6f9] text-[#111] text-[14px] font-medium rounded-[4px] tracking-widest flex items-center shrink-0">
                 热基收益榜
             </div>
             <div className="px-3 py-[6px] bg-[#f5f6f9] text-[#111] text-[14px] font-medium rounded-[4px] tracking-widest flex items-center shrink-0">
                 QDI
             </div>
             <div className="px-2 py-[6px] text-gray-500 text-[14px] font-medium tracking-widest flex items-center shrink-0 pr-8">
                 更多
             </div>
         </div>

      </div>

      {/* 
        ========================================================================
         RECOMMENDATION ALERT BANNER
        ========================================================================
      */}
      <div className="mx-4 mt-3 mb-3 recommendation-bg rounded-lg py-3 px-3 shadow-[0_2px_6px_rgba(250,50,50,0.03)] cursor-pointer active:scale-[0.99] transition">
          <div className="flex items-start">
             <div className="bg-[#f04a4b] text-white text-[10px] font-bold tracking-widest px-1 py-[2px] rounded-[3px] shrink-0 mr-1.5 mt-0.5">
                 推荐理由
             </div>
             <div className="text-[13px] text-[#111] leading-snug tracking-wide inline">
                 <span className="text-gray-700">筛选</span><span className="text-[#f04a4b] font-medium">近期涨幅优秀的商品基金</span>，并按照近1年收益排序。<span className="text-gray-500">(成立满1年的非货基金，剔除异常数据基金)</span>
                 <svg className="w-[11px] h-[11px] text-gray-400 inline-block ml-0.5 relative top-[-1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                 </svg>
             </div>
          </div>
      </div>

      {/* 
        ========================================================================
         CORE RANKING LIST CONTAINER
        ========================================================================
      */}
      <div className="w-full bg-white rounded-t-[14px] min-h-screen px-4 pt-4 flex flex-col shadow-[0_-2px_15px_rgba(0,0,0,0.02)]">
          
          {/* Internal Secondary Horizontal Tabs */}
          <div className="w-full flex space-x-4 overflow-x-auto scrollbar-hide pb-2 fade-mask-right -mx-4 px-4 pl-4 border-b border-gray-50">
              <div className="relative flex flex-col items-center shrink-0">
                  <span className="text-[15px] font-bold text-[#111] tracking-widest mb-1.5">全部</span>
                  <div className="absolute bottom-0 w-[14px] h-[3px] bg-[#f44b4c] rounded-full"></div>
              </div>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0">黄金</span>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0">白银</span>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0">豆粕</span>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0">原油</span>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0">有色金属</span>
              <span className="text-[15px] font-medium text-gray-400 tracking-widest shrink-0 pr-6">能源化工</span>
          </div>

          {/* List Items Loop */}
          <div className="w-full flex flex-col mt-2">
              {rankingData.map((item, index) => (
                  <div key={item.id} className="w-full py-[18px] border-b border-gray-50 flex flex-col hover:bg-gray-50/50 transition">
                      
                      {/* Fund Title Row */}
                      <div className="flex items-center w-full mb-3">
                          
                          {/* Optional Medal Rendering */}
                          {item.medal !== 'none' && (
                              <div className={`medal-badge medal-ribbon medal-${item.medal} mr-1.5 shrink-0`}></div>
                          )}

                          {/* Title */}
                          <span className="text-[16px] font-bold text-[#111] tracking-wider truncate mr-1.5 max-w-[190px]">
                              {item.title}
                          </span>
                          
                          {/* Tags */}
                          <div className="flex items-center space-x-1 shrink-0">
                              <div className="w-[14px] h-[14px] bg-white border border-gray-300 text-gray-400 text-[12px] font-sans flex items-center justify-center rounded-[2px] leading-none pb-[1px]">+</div>
                              <div className="px-[3px] py-[1px] bg-white border border-gray-200 text-gray-400 text-[10px] tracking-widest rounded-[2px] transform scale-90 origin-left">
                                  {item.risk}
                              </div>
                          </div>
                      </div>

                      {/* Financial Metrics Row */}
                      <div className="flex items-center justify-between w-full">
                           
                           {/* 1 Year Returns */}
                           <div className="flex-[0.4] flex flex-col">
                               <span className="text-[17px] font-bold font-sans text-[#f04a4b] leading-none mb-1.5 tracking-tight">{item.returns1Y}</span>
                               <span className="text-[12px] text-gray-400 tracking-widest leading-none">近1年收益率</span>
                           </div>

                           {/* 3 Year Returns */}
                           <div className="flex-[0.35] flex flex-col">
                               <span className="text-[17px] font-bold font-sans text-[#111] leading-none mb-1.5 tracking-tight">{item.returns3Y}</span>
                               <span className="text-[12px] text-gray-400 tracking-widest leading-none">近3年收益率</span>
                           </div>

                           {/* Action Button */}
                           <div className="flex-[0.25] flex justify-end">
                               <div className={`w-[60px] h-[28px] rounded-full flex justify-center items-center text-[13px] font-bold tracking-widest shadow-sm active:scale-95 transition-transform cursor-pointer ${
                                   item.isActiveBtn ? 'bg-[#f44b4c] text-white shadow-[0_2px_8px_rgba(250,50,50,0.2)]' : 'bg-[#fca5a5] text-white/90'
                               }`}>
                                   买入
                               </div>
                           </div>
                      </div>

                  </div>
              ))}
          </div>

      </div>

      {/* 
        ========================================================================
         FLOATING SURVEY TAB (Right Edge)
        ========================================================================
      */}
      <div className="fixed right-0 top-[60%] transform -translate-y-1/2 bg-black/50 text-white rounded-l-[10px] pl-[6px] pr-[5px] py-3 flex flex-col items-center justify-between cursor-pointer active:scale-95 shadow-md z-40 backdrop-blur-md">
          <svg className="w-[12px] h-[12px] text-white/80 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
             <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[11px] survey-badge tracking-widest">调研问卷</span>
          <div className="w-[14px] h-[14px] bg-white/20 rounded-full flex items-center justify-center mt-3 mb-1">
             <span className="text-[9px] font-bold scale-[0.8]">X</span>
          </div>
      </div>

    </div>
  );
}
