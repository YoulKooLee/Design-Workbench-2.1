import '../style.css';
import React from 'react';

// Citation Tape Card Node (Background Mock)
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

// Bottom Sheet Option Node
const ShareTargetNode = ({ label, bgClass, iconOverride, systemColors = false }: any) => (
  <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
    <div className={`w-[60px] h-[60px] rounded-full flex justify-center items-center ${bgClass} mb-[10px]`}>
       {iconOverride}
    </div>
    <span className="text-[11.5px] font-[450] text-[#1D2129] tracking-wide">{label}</span>
  </div>
);

const ZhipuAIShareBottomSheetPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. BACKGROUND APP CONTEXT (VISUALLY DIMMED BY OVERLAY)   */}
      {/* ========================================================= */}
      
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 shrink-0">
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

      <div className="flex w-full justify-end px-[16px] pt-[12px]">
         <div className="bg-[#E7EEFB] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[16px] pb-[18px] rounded-[24px] rounded-tr-[4px] max-w-[90%] pointer-events-none">
            人力资源和社会保障部发布最新的最低工资标准，具体内容有哪些
         </div>
      </div>

      <div className="w-full px-[16px] mt-[24px]">
         <div className="w-full bg-[#FFFFFF] rounded-[22px] shadow-[0_2px_24px_rgba(30,40,60,0.04)] relative pb-[32px] pointer-events-none">
            
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
               </div>
            </div>
         </div>
      </div>

      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-10">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:52</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MODAL OVERLAY (DIMMING SHIELD)                         */}
      {/* ========================================================= */}
      <div className="absolute inset-0 bg-[#000000] opacity-40 z-40 transition-opacity" />

      {/* ========================================================= */}
      {/* 3. ACTIVE BOTTOM SHEET OVERLAY (分享至)                   */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] rounded-t-[20px] z-50 flex flex-col pt-[20px] pb-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
         
         {/* Sheet Header Control Area */}
         <div className="flex justify-between items-center px-[22px] mb-[24px]">
            <span className="text-[15px] font-[500] text-[#111111] tracking-wide">分享至</span>
            <div className="p-[4px] cursor-pointer active:scale-90 transition-transform">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18 M6 6l12 12" />
               </svg>
            </div>
         </div>

         {/* Share Matrix Rows */}
         <div className="w-full flex justify-between px-[20px] mb-[18px]">
            <ShareTargetNode 
               label="微信好友"
               bgClass="bg-[#07C160]"
               iconOverride={
                 <svg width="34" height="34" viewBox="0 0 24 24" fill="white" stroke="none" className="relative right-[-1px] bottom-[-1px]">
                   <path d="M8.5 14.5c-3 0-5.5-2-5.5-4.5s2.5-4.5 5.5-4.5 5.5 2 5.5 4.5-2.5 4.5-5.5 4.5zm0-7c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm2.5 0c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm7 8c-2.5 0-4.5-1.5-4.5-3.5S15.5 8.5 18 8.5 22.5 10 22.5 12s-2 3.5-4.5 3.5zm0-5c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6zm1.8 0c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6z" />
                 </svg>
               }
            />
            <ShareTargetNode 
               label="微博"
               bgClass="bg-[#FF6246]"
               iconOverride={
                 <svg width="34" height="34" viewBox="0 0 24 24" fill="white" stroke="none">
                   <path d="M20.6 13c-.1 1.6-1.5 2.9-3.4 3.7-3.4 1.4-8 1.1-10.4-1-.8-.7-1.3-1.6-1.3-2.6 0-2.3 3.6-3.7 6.4-3.7 1.8 0 3.3.4 4.5 1 .4.2.8.1.9-.3l.3-1c.2-.7-.2-1.2-.8-1.5-1.5-.7-3.6-1-5.7-1C7.5 6.6 4 8.7 4 11.5c0 1.2.6 2.3 1.8 3.3 2.7 2.3 7.8 2.8 11.6 1.2 2.3-.9 4-2.5 4.2-4.4.1-1-.2-1.9-.8-2.6-.6-.7-1.6-1.2-2.8-1.5-.5-.1-.7.2-.9.6l-.3 1.1h1.3c.7.1 1.2.5 1.5 1 0 .2.1.5.1.7v2.1z" />
                   <path d="M12 11c-.5 0-.9.2-1.3.5-.4.4-.6.9-.6 1.5 0 .5.2.9.6 1.3s1 .5 1.5.5c.5 0 1-.2 1.3-.6.3-.4.5-.8.5-1.3 0-1-.8-1.9-2-1.9z"/>
                 </svg>
               }
            />
            <ShareTargetNode 
               label="朋友圈"
               bgClass="bg-[#2ACD9A]"
               iconOverride={
                 <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12 2v8l3-3 M22 12h-8l3-3 M12 22v-8l-3 3 M2 12h8l-3 3" />
                   <circle cx="12" cy="12" r="3" fill="white" />
                 </svg>
               }
            />
            <ShareTargetNode 
               label="更多"
               bgClass="bg-[#F2F3F6]"
               iconOverride={
                 <svg width="34" height="34" viewBox="0 0 24 24" fill="#111">
                    <circle cx="6" cy="12" r="2.5" />
                    <circle cx="12" cy="12" r="2.5" />
                    <circle cx="18" cy="12" r="2.5" />
                 </svg>
               }
            />
         </div>

         <div className="w-full flex justify-start px-[20px]">
            <div className="flex space-x-[26px]">
               <ShareTargetNode 
                  label="生成名片"
                  bgClass="bg-[#F2F3F6]"
                  iconOverride={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative left-[1px]">
                       <rect x="3" y="6" width="18" height="12" rx="2" />
                       <circle cx="8.5" cy="12" r="2.5" />
                       <path d="M14 10h4 M14 14h2" />
                    </svg>
                  }
               />
               <ShareTargetNode 
                  label="复制链接"
                  bgClass="bg-[#F2F3F6]"
                  iconOverride={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  }
               />
            </div>
         </div>

         {/* Base Anchor / Home Bar Inject */}
         <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mt-[40px] absolute bottom-[8px] left-1/2 transform -translate-x-1/2" />
      </div>

    </div>
  );
};

export default ZhipuAIShareBottomSheetPage;
