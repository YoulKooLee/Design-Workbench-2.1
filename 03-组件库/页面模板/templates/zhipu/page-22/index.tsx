import '../style.css';
import React from 'react';

// Unified Attachment Toolkit Action Node
const ToolkitActionNode = ({ icon, label }: any) => (
  <div className="flex flex-col items-center">
     <div className="w-[66px] h-[66px] bg-[#FFFFFF] rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#F4F5F7] flex justify-center items-center mb-[10px] cursor-pointer active:scale-95 transition-transform">
        {icon}
     </div>
     <span className="text-[11.5px] font-[450] text-[#7A7F8C] tracking-wide">{label}</span>
  </div>
);

// Citation Tape Card Node
const CitationCard = ({ seq, title, source, hasSparkle = false, iconRenderer }: any) => (
  <div className="flex-shrink-0 w-[145px] bg-[#F7F8FA] rounded-[10px] p-[12px] flex flex-col justify-between cursor-pointer border border-[#F2F3F5] h-[80px]">
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
             <svg width="10" height="10" viewBox="0 0 24 24" fill="#3BCE7D">
                <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
             </svg>
           </div>
        )}
     </div>
  </div>
);

const ZhipuAISearchExpandedToolkitPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- STICKY HEADER BOUNDARY ---------------- */}
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 z-50 shrink-0">
        <div className="flex items-center">
          <button className="mr-[14px] p-[2px] active:opacity-60 cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0DFFBA] via-[#0D78FF] to-[#0D1FFF]" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 shadow-sm">
               <circle cx="11" cy="11" r="8" />
               <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          
          <div className="flex flex-col ml-[10px]">
            <span className="text-[14.5px] font-[600] text-[#1D2129] leading-[1.2] tracking-widest">AI搜索</span>
            <span className="text-[10.5px] font-[400] text-[#A6ABB5] tracking-widest relative top-[1px]">来自: 智谱清言</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="9" />
             <path d="M12 7v5l3 3" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M11 5L6 9H2v6h4l5 4V5z" />
             <path d="M22 9l-6 6 M16 9l6 6" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
             <circle cx="5" cy="12" r="2" />
             <circle cx="12" cy="12" r="2" />
             <circle cx="19" cy="12" r="2" />
          </svg>
        </div>
      </div>

      {/* ---------------- SCROLLABLE CONVERSATION FEED ---------------- */}
      <div className="flex-1 w-full overflow-y-auto px-[16px] pt-[12px] pb-[200px] [&::-webkit-scrollbar]:hidden flex flex-col space-y-[24px]">
         
         {/* User Intiation Module */}
         <div className="flex w-full justify-end">
            <div className="bg-[#E7EEFB] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[16px] pb-[18px] rounded-[24px] rounded-tr-[4px] max-w-[90%] shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-justify">
               人力资源和社会保障部发布最新的最低工资标准，具体内容有哪些
            </div>
         </div>

         {/* AI Deep Search Generation Architecture Card */}
         <div className="w-full bg-[#FFFFFF] rounded-[22px] max-w-[95%] shadow-[0_2px_24px_rgba(30,40,60,0.04)] relative pb-[32px]">
            
            {/* AI Search Engine Sync Header */}
            <div className="flex items-center justify-between px-[16px] pt-[18px] pb-[12px] cursor-pointer active:opacity-60">
               <div className="flex items-center space-x-[6px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6ABB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                     <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-[12px] font-[400] text-[#8A8F9A] tracking-wider">智能阅读85个网页</span>
               </div>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4C8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </div>

            {/* Citation Carousel Reel Array */}
            <div className="w-full flex px-[16px] space-x-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden pb-[16px]">
               <CitationCard 
                  seq="1" 
                  title="【时政】最新!全国各地区最低工资标..." 
                  source="腾讯网"
                  hasSparkle={true}
                  iconRenderer={
                     <div className="w-[12px] h-[12px] rounded-full border border-gray-200 flex justify-center items-center relative overflow-hidden bg-white">
                        <div className="w-[8px] h-[8px] bg-gradient-to-br from-[#FF0000] to-[#FF8C00] rounded-sm transform rotate-45 scale-[60%]"></div>
                        <div className="absolute w-[6px] h-[6px] bg-white rounded-full scale-[80%] left-[2.5px] top-[2.5px]"></div>
                        <div className="w-[4px] h-[4px] bg-[#4B88FF] rounded-full absolute bottom-[-1px] right-[-1px]"></div>
                     </div>
                  }
               />
               <CitationCard 
                  seq="2" 
                  title="最新!最低工资标准公布" 
                  source="腾讯网"
                  hasSparkle={true}
                  iconRenderer={
                     <div className="w-[12px] h-[12px] rounded-full border border-gray-200 flex justify-center items-center relative overflow-hidden bg-white">
                        <div className="w-[8px] h-[8px] bg-gradient-to-br from-[#FF0000] to-[#FF8C00] rounded-sm transform rotate-45 scale-[60%]"></div>
                        <div className="absolute w-[6px] h-[6px] bg-white rounded-full scale-[80%] left-[2.5px] top-[2.5px]"></div>
                        <div className="w-[4px] h-[4px] bg-[#4B88FF] rounded-full absolute bottom-[-1px] right-[-1px]"></div>
                     </div>
                  }
               />
               <CitationCard 
                  seq="3" 
                  title="最低工资标准公布了！" 
                  source="澎湃新闻"
                  hasSparkle={false}
                  iconRenderer={
                     <div className="w-[12px] h-[12px] bg-[#222] flex justify-center items-center text-white font-serif text-[7px]">
                        澎
                     </div>
                  }
               />
            </div>

            {/* Structured Markdown Synthesis Stream Output */}
            <div className="px-[16px]">
               <p className="text-[14px] text-[#111111] leading-[1.7] tracking-wide font-[450] text-justify -mt-[2px]">
                  根据人力资源和社会保障部2025年7月15日发布的最新数据，全国各省、自治区、直辖市的最低工资标准情况如下（截至2025年7月1日）：
               </p>

               {/* Logical Context Divider */}
               <div className="w-full h-[1px] bg-[#F2F3F5] my-[18px]"></div>

               {/* Aggregated List Output Data */}
               <div className="w-full flex flex-col space-y-[12px]">
                  <h3 className="text-[15.5px] font-[600] tracking-wide text-[#111] mb-[2px]">一、月最低工资标准（部分重点地区）</h3>
                  
                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>1.</span>
                     <span className="tracking-wide">上海：2740元（全国最高）</span>
                  </div>

                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111]">
                     <span>2.</span>
                     <span className="tracking-wide">北京：2420元</span>
                  </div>

                  <div className="flex space-x-[2px] items-start text-[15px] font-[450] text-[#111] opacity-70">
                     <span>3.</span>
                     <span className="tracking-wide">广东：第一档2500元...</span>
                  </div>
               </div>
            </div>

            {/* Absolute Sticky Floating Auto-Scroll Read Anchor */}
            <div className="absolute right-[12px] top-[320px] w-[34px] h-[34px] bg-[#FFFFFF] rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#EDEDED] flex justify-center items-center active:bg-gray-50 cursor-pointer">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative top-[1px]">
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </div>

         </div>

      </div>

      {/* ---------------- DEEP ATTACHMENT TOOLKIT MODAL LAYER ---------------- */}
      <div className="absolute bottom-0 w-full left-0 bg-[#F4F5F7] z-40 flex flex-col pt-[12px] pb-[16px] shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        
        {/* Core Input Block (Elevated by Expansion) */}
        <div className="w-[calc(100%-32px)] mx-[16px] h-[52px] bg-[#FCFDFE] rounded-[26px] flex items-center px-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#EDEDED] mb-[24px]">
          
          <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#333] ml-[2px] bg-transparent active:opacity-60 cursor-pointer">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
             </svg>
          </div>

          <input 
             type="text" 
             placeholder="有什么任务需要我做吗" 
             className="flex-1 bg-transparent border-none outline-none text-[#111111] text-[14.5px] px-[12px] placeholder:text-[#A0A4B0] font-[450] tracking-wide pointer-events-none" 
             readOnly
          />

          <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#333] bg-[#1A1A1A] mr-[2px] active:scale-95 cursor-pointer">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M8 6v12M16 6v12M4 10v4M20 10v4" />
             </svg>
          </div>
        </div>

        {/* Attachment Routing Grid Matrices */}
        <div className="flex flex-col w-full px-[32px] space-y-[24px] mb-[12px]">
           
           {/* Row 1 System Media Links */}
           <div className="flex justify-between w-full">
              
              <ToolkitActionNode 
                 label="相机" 
                 icon={
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="#2D3139" stroke="none" className="relative top-[-1px]">
                     <path d="M4 6h3.5l1.5-2h6l1.5 2H20v14H4zM12 18c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0-2c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
                   </svg>
                 }
              />
              
              <ToolkitActionNode 
                 label="照片" 
                 icon={
                   <svg width="30" height="30" viewBox="0 0 24 24" fill="#2D3139" stroke="none" className="relative top-[-1px]">
                     <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5.5 5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 18h16v-2.5l-4.5-4.5-3 3-4.5-4.5-4 4V18z" />
                   </svg>
                 }
              />
              
              <ToolkitActionNode 
                 label="本地文件" 
                 icon={
                   <svg width="26" height="26" viewBox="0 0 24 24" fill="#2D3139" stroke="none">
                     <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                     <path d="M9 13h6v2H9v-2z" fill="#FFFFFF" />
                   </svg>
                 }
              />
              
              <ToolkitActionNode 
                 label="微信文件" 
                 icon={
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="#2D3139" stroke="none" className="relative right-[-2px] bottom-[-2px]">
                     <path d="M8.5 14.5c-3 0-5.5-2-5.5-4.5s2.5-4.5 5.5-4.5 5.5 2 5.5 4.5-2.5 4.5-5.5 4.5zm0-7c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm2.5 0c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm7 8c-2.5 0-4.5-1.5-4.5-3.5S15.5 8.5 18 8.5 22.5 10 22.5 12s-2 3.5-4.5 3.5zm0-5c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6zm1.8 0c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6z" />
                   </svg>
                 }
              />

           </div>

           {/* Row 2 Proprietary Logic Links */}
           <div className="flex justify-start w-full">
              <div className="w-[66px] mr-[calc((100%-264px)/3)]">
                 <ToolkitActionNode 
                    label="云知识库" 
                    icon={
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#2D3139" stroke="none" className="relative top-[-1px]">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                      </svg>
                    }
                 />
              </div>
           </div>

        </div>

        {/* Global Legal Trace and Footer Safe Zone */}
        <div className="flex justify-center pb-[0px] pt-[8px] opacity-70">
           <span className="text-[10px] font-[400] text-[#9CA3AF] tracking-wide">内容由AI生成，仅供参考和借鉴</span>
        </div>
        
        {/* Hardware Base Line Mask */}
        <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mt-[8px] mb-[6px]" />

      </div>

      {/* ---------------- NATIVE STATUS BAR INJECT (Z-50) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">
          17:52
        </div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor">
             <rect x="0" y="7" width="3" height="4" rx="1" />
             <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
             <rect x="9" y="2" width="3" height="9" rx="1" />
             <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
             <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
             <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
             <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
             <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
             <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default ZhipuAISearchExpandedToolkitPage;
