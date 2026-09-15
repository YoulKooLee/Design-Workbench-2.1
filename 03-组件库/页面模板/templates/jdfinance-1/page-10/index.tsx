/**
 * @name 基金对比结果 (Fund Comparison Result)
 */
import React from 'react';
import './style.css';

export default function JDFinanceFundCompare() {
  return (
    <div className="w-full min-h-screen bg-[#f4f4f4] flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 1. Top Header */}
      <div className="w-full h-[52px] bg-white px-4 flex items-center justify-between sticky top-0 z-50">
         <div className="w-10">
            <svg className="w-[22px] h-[22px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
         </div>
         <span className="text-[17px] font-bold text-black tracking-wide">基金对比结果</span>
         <div className="w-10"></div>
      </div>

      {/* 2. Fixed Product Table Header Row */}
      <div className="w-full bg-white flex sticky top-[52px] z-40 border-b border-table">
         {/* Label Col */}
         <div className="w-[66px] flex-shrink-0 flex items-center justify-center text-gray-500 text-[14px] border-r border-table">
            产品
         </div>

         {/* Fund 1 */}
         <div className="flex-1 flex flex-col justify-center px-2 py-3 border-r border-table relative min-w-0">
            <span className="text-[14px] font-bold text-black truncate mb-1">华安纳斯达克100ET...</span>
            <div className="flex items-center space-x-1">
                <div className="flex items-center bg-[#fdf3e2] text-[#d69f43] px-[4px] py-[2px] rounded text-[10px] font-medium leading-[12px]">
                   <svg className="w-[10px] h-[10px] mr-[2px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
                   </svg>
                   中风险
                </div>
                <div className="border border-[#e7bc7e] text-[#d69f43] px-[4px] py-[1px] rounded text-[10px] bg-white font-medium leading-[12px]">
                   QDII
                </div>
            </div>
            {/* Close Button */}
            <div className="absolute top-1 right-1 cursor-pointer w-4 h-4 bg-[#d8d8d8] rounded-bl-lg flex items-start justify-end px-1 py-0.5" style={{ borderRadius: '0 0 0 8px' }}>
               <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </div>
         </div>

         {/* Fund 2 */}
         <div className="flex-1 flex flex-col justify-center px-2 py-3 border-r border-table relative min-w-0 bg-[#fbfbfc]">
            <span className="text-[14px] font-bold text-black truncate mb-1">工银前沿医疗股票A</span>
            <div className="flex items-center space-x-1">
                <div className="flex items-center bg-[#fcf2ea] text-[#cf8e51] px-[4px] py-[2px] rounded text-[10px] font-medium leading-[12px]">
                   <svg className="w-[10px] h-[10px] mr-[2px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
                   </svg>
                   中高风险
                </div>
                <div className="bg-[#fcf2ea] text-[#cf8e51] px-[4px] py-[2px] rounded text-[10px] font-medium leading-[12px]">
                   股票型
                </div>
            </div>
            {/* Close Button */}
            <div className="absolute top-1 right-1 cursor-pointer w-4 h-4 bg-[#d8d8d8] rounded-bl-lg flex items-start justify-end px-1 py-0.5" style={{ borderRadius: '0 0 0 8px' }}>
               <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </div>
         </div>

         {/* Add Fund Vertical Strip */}
         <div className="w-[32px] flex-shrink-0 flex items-center justify-center border-table py-4 bg-white cursor-pointer group">
            <span className="text-[#3c6ee8] text-[12px] font-medium leading-tight flex flex-col items-center space-y-1">
               <svg className="w-[14px] h-[14px] mb-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
               </svg>
               <span>添</span>
               <span>加</span>
               <span>基</span>
               <span>金</span>
            </span>
         </div>
      </div>

      {/* Gap Between Sections */}
      <div className="w-full h-[10px] bg-[#f4f4f4]"></div>

      {/* 3. Diagnostic Performance Section */}
      <div className="w-full bg-white flex flex-col border-b border-table">
         
         <div className="flex w-full border-b border-table bg-white">
            <div className="w-[66px] flex-shrink-0 flex items-center px-4 py-[14px]">
               <span className="text-[16px] font-bold text-black tracking-tight whitespace-nowrap">诊断表现</span>
               <span className="text-[12px] text-gray-400 pl-1 whitespace-nowrap">(同类排行)</span>
               <div className="w-[13px] h-[13px] bg-gray-200 text-white rounded-full flex items-center justify-center text-[9px] font-bold italic ml-1 flex-shrink-0">i</div>
            </div>
            <div className="flex-1 border-r border-table"></div>
            <div className="flex-1 flex items-center justify-end px-3 py-[14px] border-r border-table bg-[#fbfbfc]">
               <span className="text-[14px] text-gray-700">近一年</span>
            </div>
            <div className="w-[32px] flex-shrink-0 bg-white"></div>
         </div>

         {/* Diagnosis Tables */}
         <div className="flex flex-col w-full">
            
            {/* Row 1: 收益性 */}
            <div className="flex w-full border-b border-table">
               <div className="w-[66px] flex-shrink-0 flex flex-col justify-center items-center text-gray-500 text-[13px] border-r border-table py-[10px]">
                  <span>收益性</span>
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">一般</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">265</span><span className="text-gray-400">/366</span></span>
                  </div>
                  <ProgressBar score={2} />
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0 bg-[#fbfbfc]">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">一般</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">480</span><span className="text-gray-400">/953</span></span>
                  </div>
                  <ProgressBar score={2} />
               </div>
               <div className="w-[32px] flex-shrink-0 bg-white"></div>
            </div>

            {/* Row 2: 管理力 */}
            <div className="flex w-full border-b border-table">
               <div className="w-[66px] flex-shrink-0 flex flex-col justify-center items-center text-gray-500 text-[13px] border-r border-table py-[10px]">
                  <span>管理力</span>
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">优秀</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">68</span><span className="text-gray-400">/411</span></span>
                  </div>
                  <ProgressBar score={5} />
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0 bg-[#fbfbfc]">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">优秀</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">19</span><span className="text-gray-400">/511</span></span>
                  </div>
                  <ProgressBar score={5} />
               </div>
               <div className="w-[32px] flex-shrink-0 bg-white"></div>
            </div>

            {/* Row 3: 抗风险 */}
            <div className="flex w-full border-b border-table">
               <div className="w-[66px] flex-shrink-0 flex flex-col justify-center items-center text-gray-500 text-[13px] border-r border-table py-[10px]">
                  <span>抗风险</span>
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">一般</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">447</span><span className="text-gray-400">/605</span></span>
                  </div>
                  <ProgressBar score={2} />
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0 bg-[#fbfbfc]">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">良好</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">1685</span><span className="text-gray-400">/3808</span></span>
                  </div>
                  <ProgressBar score={3} />
               </div>
               <div className="w-[32px] flex-shrink-0 bg-white"></div>
            </div>

            {/* Row 4: 性价比 */}
            <div className="flex w-full border-b border-table">
               <div className="w-[66px] flex-shrink-0 flex flex-col justify-center items-center text-gray-500 text-[13px] border-r border-table py-[10px]">
                  <span>性价比</span>
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">较弱</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">467</span><span className="text-gray-400">/605</span></span>
                  </div>
                  <ProgressBar score={1} />
               </div>
               <div className="flex-1 flex flex-col justify-center px-3 py-[10px] border-r border-table min-w-0 bg-[#fbfbfc]">
                  <div className="flex items-baseline justify-between mb-1.5">
                     <span className="text-[15px] font-bold text-black">一般</span>
                     <span className="text-[10px] font-sans tracking-tight"><span className="text-[#eb3d30]">1798</span><span className="text-gray-400">/3807</span></span>
                  </div>
                  <ProgressBar score={2} />
               </div>
               <div className="w-[32px] flex-shrink-0 bg-white"></div>
            </div>

         </div>
      </div>

      {/* 4. Performance Trend Section */}
      <div className="w-full bg-white flex flex-col mt-2 pt-2 pb-14 border-t border-table shadow-sm">
         
         <div className="px-4 py-[14px] flex items-center justify-between">
            <span className="text-[16px] font-bold text-black tracking-tight">业绩走势</span>
         </div>

         {/* Legend Grid */}
         <div className="w-full px-4 mb-5 space-y-1">
            {/* Fund 1 Legend */}
            <div className="w-full flex items-center justify-between">
               <div className="flex items-center space-x-[6px] flex-shrink-0">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#eb3d30]"></div>
                  <span className="text-[12px] text-gray-500 truncate w-[130px]">华安纳斯达克100...</span>
               </div>
               <span className="text-[13px] font-bold font-sans text-[#eb3d30] tracking-tight">+5.75%</span>
            </div>
            
            {/* Fund 2 Legend */}
            <div className="w-full flex items-center justify-between">
               <div className="flex items-center space-x-[6px] flex-shrink-0">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#3976ed]"></div>
                  <span className="text-[12px] text-gray-500 truncate w-[130px]">工银前沿医疗股票A</span>
               </div>
               <span className="text-[13px] font-bold font-sans text-[#eb3d30] tracking-tight">+9.35%</span>
            </div>
            
            {/* Benchmark Legend */}
            <div className="w-full flex items-center justify-between">
               <div className="flex items-center space-x-[6px] flex-shrink-0">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#828f9d]"></div>
                  <div className="flex items-center">
                     <span className="text-[12px] text-gray-500">沪深300</span>
                     <svg className="w-3 h-3 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                     </svg>
                  </div>
               </div>
               <span className="text-[13px] font-bold font-sans text-[#eb3d30] tracking-tight">+9.45%</span>
            </div>
         </div>

         {/* Line Chart Area (Mock via SVG) */}
         <div className="w-full h-[220px] relative px-4 mt-2">
            
            {/* Y-Axis Grid & Labels */}
            <div className="absolute inset-y-0 left-4 w-8 flex flex-col justify-between text-[11px] text-gray-400 font-sans z-10 py-[6px]">
               <span>30%</span>
               <span>20%</span>
               <span>10%</span>
               <span>0%</span>
               <span>-10%</span>
               <span>-20%</span>
            </div>
            
            <div className="absolute inset-y-0 left-14 right-4 flex flex-col justify-between py-2.5 z-0">
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
               <div className="w-full h-[1px] bg-gray-100 border-b border-dashed border-gray-200"></div>
            </div>

            {/* SVG Chart Core */}
            <div className="w-full h-full pl-[46px] pr-2 pt-2 pb-[14px] relative z-20 overflow-hidden">
               <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  
                  {/* Gray Line (沪深300 Benchmark) */}
                  <path d="M 0 100 L 10 110 L 20 105 L 30 115 L 40 100 L 50 115 L 60 120 L 70 122 L 75 110 L 80 125 L 85 110 L 90 120 L 95 100 
                           L 100 80 L 105 105 L 110 40 L 115 70 L 120 75 L 125 50 L 130 65 L 135 55 L 140 70 L 145 60 L 150 78 L 160 65 
                           L 170 80 L 180 75 L 190 85 L 200 75 L 210 70 L 220 75 L 230 150 L 240 100 L 250 95 L 260 90 L 270 95 L 280 80 L 290 85 L 300 70" 
                        fill="none" stroke="#828f9d" strokeWidth="1.5" strokeLinejoin="round" />
                  
                  {/* Red Line (Fund 1) */}
                  <path d="M 0 100 L 15 90 L 30 75 L 45 100 L 50 95 L 60 110 L 75 105 L 85 125 L 90 110 L 95 120 L 100 95 
                           L 110 80 L 115 100 L 125 90 L 135 105 L 140 85 L 150 90 L 160 85 L 170 65 L 180 75 
                           L 190 60 L 200 80 L 210 65 L 220 75 L 230 120 L 235 160 L 240 130 L 250 145 L 260 110 L 270 100 L 280 95 L 290 75 L 300 85" 
                        fill="none" stroke="#eb3d30" strokeWidth="1.5" strokeLinejoin="round" />
                  
                  {/* Blue Line (Fund 2) */}
                  <path d="M 0 100 L 10 125 L 20 130 L 35 140 L 45 125 L 55 145 L 65 110 L 75 140 L 85 145 L 90 160 L 95 145 
                           L 100 135 L 110 50 L 120 75 L 130 85 L 140 105 L 150 85 L 160 110 L 170 100 L 180 115 
                           L 190 120 L 200 145 L 210 155 L 220 145 L 230 140 L 240 135 L 250 110 L 260 120 L 270 115 L 280 85 L 290 100 L 295 50 L 300 80" 
                        fill="none" stroke="#3976ed" strokeWidth="1.5" strokeLinejoin="round" />
               </svg>
            </div>
         </div>

         {/* Time Filter Tabs */}
         <div className="w-full px-4 mt-4 flex items-center justify-between">
            <div className="bg-[#f3f4f6] text-gray-500 rounded-full px-4 py-[6px] text-[12px] font-sans font-medium">近1月</div>
            <div className="bg-[#f3f4f6] text-gray-500 rounded-full px-4 py-[6px] text-[12px] font-sans font-medium">近3月</div>
            <div className="bg-[#f3f4f6] text-gray-500 rounded-full px-4 py-[6px] text-[12px] font-sans font-medium">近6月</div>
            <div className="bg-[#feeaec] text-[#e83a31] rounded-full px-4 py-[6px] text-[12px] font-sans font-bold">近一年</div>
            <div className="bg-[#f3f4f6] text-gray-500 rounded-full px-4 py-[6px] text-[12px] font-sans font-medium">近三年</div>
         </div>

      </div>
      
    </div>
  );
}

// Sub-Component: Segmented Progress Bar
const ProgressBar = ({ score }: { score: number }) => {
   return (
      <div className="w-full flex gap-[2px] h-[4px]">
         <div className={`flex-1 rounded-sm ${score >= 1 ? 'bg-[#eb3d30]' : 'bg-[#f4f4f4]'}`}></div>
         <div className={`flex-1 rounded-sm ${score >= 2 ? 'bg-[#eb3d30]' : 'bg-[#f4f4f4]'}`}></div>
         <div className={`flex-1 rounded-sm ${score >= 3 ? 'bg-[#eb3d30]' : 'bg-[#f4f4f4]'}`}></div>
         <div className={`flex-1 rounded-sm ${score >= 4 ? 'bg-[#eb3d30]' : 'bg-[#f4f4f4]'}`}></div>
         <div className={`flex-1 rounded-sm ${score >= 5 ? 'bg-[#eb3d30]' : 'bg-[#f4f4f4]'}`}></div>
      </div>
   );
};
