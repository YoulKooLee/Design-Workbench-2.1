import '../style.css';
import React from 'react';

// Reusable Predictive Text Bubble
const PredictivePromptNode = ({ text }: { text: string }) => (
  <div className="bg-[rgba(255,255,255,0.12)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-[18px] rounded-tl-[4px] px-[16px] py-[11px] text-[#EDEDED] text-[12.5px] leading-snug shadow-[0_4px_16px_rgba(0,0,0,0.1)] active:opacity-60 transition-opacity cursor-pointer">
     {text}
  </div>
);

const ZhipuAICustomAgentPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#0A0A0A] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ---------------- 1. IMMERSIVE BACKGROUND CONTEXT ---------------- */}
      <div className="w-full h-full absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base Aesthetic Matrix mapping a stylized anime background mock */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C2631] via-[#101416] to-[#0D1011]" />
          
          {/* Abstract Character Lighting Representation */}
          <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[70%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B4C6D4]/30 via-[#B4C6D4]/5 to-transparent blur-[25px] mix-blend-screen opacity-70" />
          <div className="absolute bottom-[0px] left-[15%] w-[70%] h-[40%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-white/20 blur-[40px] mix-blend-overlay" />
          
          {/* Deep Dimming Filter allowing native text contrast without solid masking */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0.1)_70%,rgba(0,0,0,0.7)_100%)] z-10" />
      </div>

      {/* ---------------- 2. FIXED PERSISTENT HEADER (TRANSLUCENT) ---------------- */}
      <div className="flex flex-col fixed top-0 w-full z-50 shrink-0 bg-gradient-to-b from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.5)] to-transparent sm:absolute pb-[24px]">
         
         {/* Native iOS Status Row Mock */}
         <div className="w-full flex justify-between items-center px-[22px] pt-[14px] pb-[8px]">
           <div className="text-[13px] font-[600] text-[#E0E0E0] tracking-tight">17:53</div>
           <div className="flex items-center space-x-[5px] text-[#E0E0E0]">
              <svg className="w-[17px] h-[10.5px] opacity-80" viewBox="0 0 17 11" fill="currentColor">
                 <rect x="0" y="7" width="3" height="4" rx="1" />
                 <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
                 <rect x="9" y="2" width="3" height="9" rx="1" />
                 <rect x="13.5" y="0" width="3" height="11" rx="1" opacity="0.3" />
              </svg>
              <svg className="w-[15.5px] h-[11px] opacity-80" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
                 <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
                 <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
              </svg>
              <svg className="w-[24.5px] h-[11.5px] opacity-80" viewBox="0 0 25 12" fill="none">
                 <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
                 <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
                 <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" />
              </svg>
           </div>
         </div>

         {/* Context App Navigation Anchor */}
         <div className="w-full flex justify-between items-center px-[16px] pt-[6px]">
            <div className="flex items-center">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-[12px] active:scale-90 cursor-pointer">
                  <path d="M15 18l-6-6 6-6" />
               </svg>

               <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 border-[0.5px] border-white/20 relative shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {/* Faux Custom Agent Logo Identity */}
                  <div className="absolute inset-0 bg-[#A6B2C8] flex justify-center items-center">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                        <path d="M12 2L2 22l10-4 10 4L12 2z" />
                        <circle cx="12" cy="14" r="3" fill="#111" />
                     </svg>
                  </div>
               </div>

               <div className="flex flex-col ml-[10px]">
                  <div className="flex items-center">
                     <span className="text-[13px] font-[500] text-[#FAFAFA] leading-tight tracking-[0.02em]">炫酷logo设计大师</span>
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-[2px] opacity-70">
                        <path d="M9 18l6-6-6-6" />
                     </svg>
                  </div>
                  <span className="text-[10.5px] font-[450] text-[#A6ABB5] tracking-wide relative top-[1px]">来自: 波浪的魔术师</span>
               </div>
            </div>

            <div className="flex items-center space-x-[18px] text-[#FAFAFA]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 15" />
               </svg>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
               </svg>
               <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
               </svg>
            </div>
         </div>
      </div>

      {/* ---------------- 3. CORE CHAT FLOW THREAD ---------------- */}
      <div className="flex-1 w-full overflow-y-auto z-20 pt-[110px] pb-[160px] px-[16px] [&::-webkit-scrollbar]:hidden flex flex-col space-y-[24px]">
         
         {/* User Intiation Module */}
         <div className="flex w-full justify-end">
            <div className="bg-[rgba(44,53,82,0.85)] text-white text-[13.5px] font-[450] tracking-wide leading-relaxed px-[16px] py-[12px] rounded-[18px] rounded-tr-[4px] max-w-[85%] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)]">
               请根据我的要求设计一个logo
            </div>
         </div>

         {/* AI Deep Response Layer */}
         <div className="flex w-full flex-col items-start mt-[16px]">
            <div className="bg-[rgba(32,32,32,0.7)] backdrop-blur-2xl text-[#EFEFEF] text-[13.5px] font-[450] tracking-[0.02em] leading-[1.65] pl-[18px] pr-[16px] pt-[16px] pb-[14px] rounded-[20px] rounded-tl-[4px] max-w-[92%] shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative border border-[rgba(255,255,255,0.05)] text-justify">
               当然可以，请告诉我您对logo的具体需求，包括颜色、形状、大小等元素，以及您希望logo传达的信息或主题。
               
               {/* Response Interaction Footprint Block */}
               <div className="flex justify-between items-end mt-[18px] w-full">
                  {/* Left: Audio Readback Dictation Toggle */}
                  <div className="w-[26px] h-[26px] bg-[rgba(255,255,255,0.15)] rounded-full flex justify-center items-center cursor-pointer active:scale-95 transition-transform border border-[rgba(255,255,255,0.1)]">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" className="ml-[2px]"><path d="M5 3l14 9-14 9z"/></svg>
                  </div>
                  
                  {/* Right: Feedback & Export Utilities Matrix */}
                  <div className="flex items-center space-x-[16px] text-[#A6ABB5]">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="active:scale-95 cursor-pointer">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                     </svg>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="active:scale-95 cursor-pointer">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                     </svg>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="active:scale-95 cursor-pointer">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                     </svg>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="active:scale-95 cursor-pointer">
                        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4 M17 8l-5-5-5 5 M12 3v13" />
                     </svg>
                  </div>
               </div>

               {/* Absolute Watermark Flag */}
               <div className="absolute right-[4px] bottom-[-20px] text-[#6B7280] text-[9.5px] font-[500] tracking-widest pointer-events-none">AI生成</div>
            </div>

            {/* AI Suggested Intelligent Response Block (Predictive Prompts Stack) */}
            <div className="flex flex-col space-y-[12px] mt-[16px] pl-[2px] items-start w-full">
               <PredictivePromptNode text="我想要一个黑色的圆形logo" />
               <PredictivePromptNode text="请加入一些现代感的元素" />
               <PredictivePromptNode text="不要太大，适合用在网站和名片上" />
            </div>

         </div>

      </div>

      {/* ---------------- 4. DEEP ANCHORED INPUT DECK (TRANSLUCENT) ---------------- */}
      {/* Background bleed block catching the scroll under natively */}
      <div className="absolute bottom-0 w-full left-0 z-40 flex flex-col pt-[120px] pb-[12px] pointer-events-none bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.4)] to-transparent">
         
         <div className="w-full flex flex-col px-[14px] pointer-events-auto">
            
            {/* Context Floating Appreciation Feedback Node */}
            <div className="flex w-full mb-[12px]">
               <div className="flex items-center space-x-[4px] px-[14px] py-[7px] bg-[rgba(20,20,20,0.7)] backdrop-blur-md rounded-full border-[0.5px] border-[rgba(255,255,255,0.15)] shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:scale-95 cursor-pointer transition-transform">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="text-[11px] font-[400] text-[#FAFAFA] tracking-widest relative top-[0.5px]">点赞</span>
               </div>
            </div>

            {/* Translucent Active Input Boundary */}
            <div className="w-full h-[52px] bg-[rgba(15,15,15,0.7)] backdrop-blur-xl rounded-[26px] flex items-center px-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.12)]">
               
               {/* System Logic Attachment Switch (+) */}
               <div className="w-[34px] h-[34px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#DCDCDC] ml-[2px] bg-[#1A1A1A] active:scale-95 cursor-pointer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M12 5v14M5 12h14"/>
                  </svg>
               </div>

               {/* Ambient Text Receiver */}
               <input 
                  type="text" 
                  placeholder="我愿意倾听你的任何想法" 
                  className="flex-1 bg-transparent border-none outline-none text-[#FAFAFA] text-[14px] px-[14px] placeholder:text-[#A0A4B0] opacity-80 tracking-[0.01em] font-[450]" 
                  readOnly
               />

               {/* Audio / Dictation Execution Node */}
               <div className="w-[34px] h-[34px] flex items-center justify-center shrink-0 rounded-full border-[1.5px] border-[#DCDCDC] bg-[#1A1A1A] mr-[2px] active:scale-95 cursor-pointer">
                  {/* Concentric Wave Audio Icon Structure */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative top-[0.5px]">
                     <path d="M12 2v20M8 5v14M16 5v14M4 9v6M20 9v6" />
                  </svg>
               </div>
            </div>

            {/* Global Legal/Subtext Output Floor */}
            <div className="flex justify-center pb-[4px] pt-[12px] opacity-70">
               <span className="text-[10px] font-[400] text-[#9CA3AF] tracking-wide">内容由AI生成，仅供参考和借鉴</span>
            </div>
            
         </div>

         {/* Hardware Safe Area Navigation Lock */}
         <div className="w-[134px] h-[5px] bg-[#C1C1C1] rounded-full mx-auto pointer-events-auto" />

      </div>

    </div>
  );
};

export default ZhipuAICustomAgentPage;
