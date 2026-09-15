import '../style.css';
import React from 'react';

// Citation Tape Card Node
const CitationCard = ({ seq, title, source, hasSparkle = false, iconRenderer }: any) => (
  <div className="flex-shrink-0 w-[145px] bg-[#F7F8FA] rounded-[10px] p-[12px] flex flex-col justify-between border border-[#F2F3F5] h-[80px]">
     <div className="text-[12px] font-[400] text-[#111111] leading-[1.4] line-clamp-2 tracking-wide">
        {seq}.{title}
     </div>
     <div className="flex items-center justify-between w-full mt-[4px]">
        <div className="flex items-center space-x-[4px]">
           {iconRenderer}
           <span className="text-[10px] font-[450] text-[#A6ABB5]">{source}</span>
        </div>
        {hasSparkle && (
           <div className="flex justify-center items-center relative opacity-80">
             <div className="absolute w-[8px] h-[8px] bg-[#3BCE7D] rounded-full filter blur-[2px] opacity-40"></div>
             <svg width="10" height="10" viewBox="0 0 24 24" fill="#3BCE7D"><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg>
           </div>
        )}
     </div>
  </div>
);

const ZhipuAIGenerationInterruptionPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND APP CONTEXT                                 */}
      {/* ========================================================= */}
      
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 shrink-0 z-40">
        <div className="flex items-center">
          <div className="mr-[14px] p-[2px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </div>
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0DFFBA] via-[#0D78FF] to-[#0D1FFF]" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 shadow-sm"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
          <div className="flex flex-col ml-[10px]">
             <span className="text-[14.5px] font-[600] text-[#1D2129] leading-[1.2] tracking-widest">AI搜索</span>
             <span className="text-[10.5px] font-[400] text-[#A6ABB5] tracking-widest relative top-[1px]">来自: 智谱清言</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M22 9l-6 6 M16 9l6 6" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
        </div>
      </div>

      {/* Main Conversation Stream Viewport */}
      <div className="flex-1 w-full overflow-y-auto px-[16px] pt-[12px] pb-[160px] [&::-webkit-scrollbar]:hidden flex flex-col space-y-[24px]">

         <div className="flex w-full justify-end">
            <div className="bg-[#E7EEFB] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[16px] pb-[18px] rounded-[24px] rounded-tr-[4px] max-w-[90%] shadow-[0_2px_8px_rgba(0,0,0,0.01)] pointer-events-none">
               人力资源和社会保障部发布最新的最低工资标准，具体内容有哪些
            </div>
         </div>

         <div className="w-full bg-[#FFFFFF] rounded-[22px] max-w-[95%] shadow-[0_2px_24px_rgba(30,40,60,0.04)] relative pb-[32px]">
            
            <div className="flex items-center justify-between px-[16px] pt-[18px] pb-[12px]">
               <div className="flex items-center space-x-[6px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6ABB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  <span className="text-[12px] font-[400] text-[#8A8F9A] tracking-wider">智能阅读85个网页</span>
               </div>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4C8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </div>

            <div className="w-full flex px-[16px] space-x-[8px] overflow-hidden pb-[16px]">
               <CitationCard 
                  seq="1" title="【时政】最新!全国各地区最低工资标..." source="腾讯网" hasSparkle={true}
                  iconRenderer={
                     <div className="w-[12px] h-[12px] rounded-full border border-gray-200 flex justify-center items-center relative overflow-hidden bg-white">
                        <div className="w-[8px] h-[8px] bg-gradient-to-br from-[#FF0000] to-[#FF8C00] rounded-sm transform rotate-45 scale-[60%]"></div>
                        <div className="absolute w-[6px] h-[6px] bg-white rounded-full scale-[80%] left-[2.5px] top-[2.5px]"></div>
                        <div className="w-[4px] h-[4px] bg-[#4B88FF] rounded-full absolute bottom-[-1px] right-[-1px]"></div>
                     </div>
                  }
               />
               <CitationCard 
                  seq="2" title="最新!最低工资标准公布" source="腾讯网" hasSparkle={true}
                  iconRenderer={
                     <div className="w-[12px] h-[12px] rounded-full border border-gray-200 flex justify-center items-center relative overflow-hidden bg-white">
                        <div className="w-[8px] h-[8px] bg-gradient-to-br from-[#FF0000] to-[#FF8C00] rounded-sm transform rotate-45 scale-[60%]"></div>
                        <div className="absolute w-[6px] h-[6px] bg-white rounded-full scale-[80%] left-[2.5px] top-[2.5px]"></div>
                        <div className="w-[4px] h-[4px] bg-[#4B88FF] rounded-full absolute bottom-[-1px] right-[-1px]"></div>
                     </div>
                  }
               />
            </div>

            <div className="px-[16px]">
               <p className="text-[14px] text-[#111111] leading-[1.7] tracking-wide font-[450] -mt-[2px]">
                  根据人力资源和社会保障部2025年7月15日发布的最新数据，全国各省、自治区、直辖市的最低工资标准情况如下（截至2025年7月1日）：
               </p>
               <div className="w-full h-[1px] bg-[#F2F3F5] my-[18px]"></div>
               <div className="w-full flex flex-col space-y-[12px]">
                  <h3 className="text-[15.5px] font-[600] tracking-wide text-[#111] mb-[2px]">一、月最低工资标准（部分重点地区）</h3>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>1.</span><span>上海：2740元（全国最高）</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>2.</span><span>北京：2420元</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>3.</span><span>广东：第一档2500元</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>4.</span><span>江苏、浙江：第一档2490元</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>5.</span><span>四川：第一档2330元，第二档2200元</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>6.</span><span>贵州：第一档2130元</span>
                  </div>
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111] opacity-70 relative">
                     <span>7.</span><span>宁夏：第一档2050元...</span>
                     {/* Stream Generation Blinker Overlay Mock */}
                     <div className="absolute right-[-14px] top-[4px] w-[2px] h-[16px] bg-[#0D78FF] animate-pulse rounded-full" />
                  </div>
               </div>
            </div>

            {/* Absolute Sticky Floating Auto-Scroll Read Anchor */}
            <div className="absolute right-[12px] bottom-[28px] w-[34px] h-[34px] bg-[#FFFFFF] rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#EDEDED] flex justify-center items-center cursor-pointer opacity-90">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative top-[1px]"><path d="M6 9l6 6 6-6" /></svg>
            </div>

         </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ABSOLUTE FLOATING INTERRUPTION CONTROL (STOP GENERATION) */}
      {/* ========================================================= */}
      
      <div className="absolute bottom-[108px] left-1/2 transform -translate-x-1/2 z-50">
         <div className="h-[36px] bg-[#FFFFFF] rounded-full border border-[#ECECEE] flex items-center justify-center px-[16px] cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] active:scale-95 transition-transform">
             <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#111111] flex justify-center items-center shrink-0">
                 <div className="w-[5px] h-[5px] bg-[#111111] rounded-sm shrink-0" />
             </div>
             <span className="ml-[6px] text-[12.5px] font-[450] text-[#111111] tracking-wider relative top-[0.5px]">
                停止生成
             </span>
         </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BASE NAV DOCK TERMINAL                                 */}
      {/* ========================================================= */}
      
      <div className="absolute bottom-0 w-full bg-[#F3F4F7] pt-[12px] pb-[16px] z-40 bg-gradient-to-t from-[#F3F4F7] via-[#F3F4F7] to-transparent shadow-[0_-20px_20px_rgba(243,244,247,0.8)]">
         <div className="w-[calc(100%-32px)] mx-[16px] h-[52px] bg-[#FCFDFE] rounded-[26px] flex items-center px-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#EDEDED]">
            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#333] ml-[2px] bg-transparent active:opacity-60 cursor-pointer">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <input 
               type="text" 
               placeholder="有什么任务需要我做吗" 
               className="flex-1 bg-transparent border-none outline-none text-[#111111] text-[14.5px] px-[12px] placeholder:text-[#A0A4B0] font-[450] tracking-wide pointer-events-none" 
               readOnly
            />
            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#333] bg-[#1A1A1A] mr-[2px] active:scale-95 cursor-pointer">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M8 6v12M16 6v12M4 10v4M20 10v4" /></svg>
            </div>
         </div>

         {/* Global Legal Trace and Footer Safe Zone */}
         <div className="flex justify-center pb-[0px] pt-[8px] opacity-70 pointer-events-none">
            <span className="text-[10px] font-[400] text-[#9CA3AF] tracking-wide">内容由AI生成，仅供参考和借鉴</span>
         </div>
         
         {/* Hardware Base Line Mask */}
         <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mt-[8px] mb-[6px]" />
      </div>

      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-50">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:52</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

    </div>
  );
};

export default ZhipuAIGenerationInterruptionPage;
