import '../style.css';
import React from 'react';

// Single Predictive Prompt Pill Component
const PredictivePromptPill = ({ label }: { label: string }) => (
  <div className="w-fit bg-[#FFFFFF] border border-[#E9EAEF] rounded-full px-[16px] py-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.01)] cursor-pointer active:bg-gray-50 transition-colors">
     <span className="text-[12.5px] font-[450] text-[#111111] tracking-wide">{label}</span>
  </div>
);

// Horizontal Skill Tape Interaction Node
const SkillTapeNode = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex-shrink-0 h-[32px] px-[12px] bg-[#FFFFFF] border border-[#E5E6EB] rounded-[16px] flex items-center justify-center space-x-[4px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)] active:bg-gray-50">
     <div className="flex justify-center items-center opacity-80">{icon}</div>
     <span className="text-[12px] font-[450] text-[#111111] tracking-wide relative top-[0.5px]">{label}</span>
  </div>
);

// Stateful Input Routing Control Tag
const InputRoutingControl = ({ active, icon, label }: { active: boolean, icon: React.ReactNode, label: string }) => (
  <div className={`h-[30px] px-[12px] flex items-center justify-center space-x-[4px] rounded-[10px] cursor-pointer transition-colors
      ${active 
         ? 'bg-[#EEF2FC] text-[#3B53FF]' 
         : 'bg-[#F4F5F8] text-[#111111] active:bg-[#EAECF0]'
      }`}
  >
      <div className={`flex justify-center items-center ${active ? 'text-[#3B53FF]' : 'text-[#111] opacity-70'}`}>
         {icon}
      </div>
      <span className={`text-[11.5px] font-[400] tracking-wide relative top-[0.5px] ${active ? 'text-[#3B53FF]' : 'text-[#111]'}`}>
         {label}
      </span>
  </div>
);

const ZhipuAICorePersonaChatPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F7] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. NATIVE STATUS BAR (Z-50)                               */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-50">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:51</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CORE PERSONA HEADER DECK                               */}
      {/* ========================================================= */}
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-[#F3F4F7] sticky top-0 shrink-0 z-40">
        <div className="flex items-center">
          <div className="mr-[12px] p-[2px] cursor-pointer active:scale-95 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </div>
          
          {/* Base Zhipu Logo Construction */}
          <div className="relative w-[30px] h-[30px] bg-[#3153FF] rounded-full overflow-hidden flex items-center justify-center shrink-0">
             <div className="scale-[40%] absolute">
                 <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M72 40C72 40 68 28 50 28C32 28 28 40 28 40" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round"/>
                    <path d="M28 60C28 60 32 72 50 72C68 72 72 60 72 60" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="18" stroke="#FFFFFF" strokeWidth="12"/>
                 </svg>
             </div>
          </div>
          
          <span className="text-[15.5px] font-[500] text-[#1D2129] ml-[10px] tracking-wide relative top-[0.5px]">清言</span>
        </div>
        
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M22 9l-6 6 M16 9l6 6" /></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. GENERATIVE CONVERSATION STREAM SCROLL AREA             */}
      {/* ========================================================= */}
      <div className="flex-1 w-full overflow-y-auto px-[16px] pt-[16px] pb-[190px] [&::-webkit-scrollbar]:hidden flex flex-col">
         
         {/* User Prompt 1 */}
         <div className="flex w-full justify-end mb-[22px]">
            <div className="bg-[#E7EEFC] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[16px] pb-[18px] rounded-[22px] rounded-tr-[4px] max-w-[90%] shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-justify">
               帮我写一句真诚的祝福语，祝福主题是：端午安康
            </div>
         </div>

         {/* AI Return 1 */}
         <div className="w-full bg-[#FFFFFF] rounded-[22px] rounded-tl-[4px] max-w-[95%] shadow-[0_2px_18px_rgba(30,40,60,0.04)] relative px-[16px] py-[18px] mb-[26px]">
             <p className="text-[14px] text-[#111111] leading-[1.8] tracking-wide font-[450] text-justify">
                在这个粽叶飘香、龙舟竞渡的时节，愿您安康常伴，每一刻都如清泉般澄澈，每一日都似龙舟般奋进，端午安康！
             </p>
             <div className="absolute right-[16px] bottom-[12px] opacity-20 pointer-events-none">
                 <span className="text-[10px] font-[500] tracking-wider text-[#A0A4B0]">AI生成</span>
             </div>
         </div>

         {/* User Prompt 2 */}
         <div className="flex w-full justify-end mb-[22px]">
            <div className="bg-[#E7EEFC] text-[#111111] text-[14px] font-[450] tracking-wide leading-relaxed px-[16px] py-[14px] rounded-[22px] rounded-tr-[4px] max-w-[90%] shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
               再给我一句祝福语
            </div>
         </div>

         {/* AI Return 2 (Full Active Element) */}
         <div className="w-full bg-[#FFFFFF] rounded-[22px] rounded-tl-[4px] max-w-[95%] shadow-[0_2px_18px_rgba(30,40,60,0.04)] relative pl-[16px] pr-[16px] pt-[20px] pb-[12px] mb-[24px]">
             <p className="text-[14px] text-[#111111] leading-[1.8] tracking-wide font-[450] text-justify mb-[20px]">
                当艾草的清香萦绕窗棂，愿您的心田如粽米般充实饱满，生活似龙舟竞渡般充满活力，端午安康，喜乐绵长！
             </p>
             
             {/* Rich Generative Action Bar */}
             <div className="w-full flex justify-between items-center mt-[8px]">
                 <div className="w-[32px] h-[32px] bg-[#EEF2FC] rounded-full flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="#3B53FF">
                        <polygon points="5 3 19 12 5 21 5 3" />
                     </svg>
                 </div>
                 
                 <div className="flex items-center space-x-[18px]">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer active:text-[#3B53FF]"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer active:text-[#FF5722]"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                     
                     <div className="relative flex justify-center items-center cursor-pointer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        <span className="absolute text-[6px] font-[600] text-[#4E5969] mt-[2px] tracking-tighter">PDF</span>
                     </div>

                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E5969" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                 </div>
             </div>
             
             <div className="absolute right-[16px] bottom-[-20px] opacity-30 pointer-events-none z-10 w-[40px] flex justify-end">
                 <span className="text-[9px] font-[500] tracking-wider text-[#A0A4B0]">AI生成</span>
             </div>
         </div>

         {/* Cascading Floating Prompts Matrix */}
         <div className="w-full flex justify-between items-end mt-[12px] relative z-20">
             <div className="flex flex-col space-y-[12px]">
                 <PredictivePromptPill label="祝福语更文艺一些" />
                 <PredictivePromptPill label="祝福语更幽默一些" />
                 <PredictivePromptPill label="祝福语更温馨一些" />
             </div>
             <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#EDEDED] flex justify-center items-center cursor-pointer active:bg-gray-50 mb-[44px]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative top-[1px]"><path d="M6 9l6 6 6-6" /></svg>
             </div>
         </div>

      </div>

      {/* ========================================================= */}
      {/* 4. ADVANCED MULTI-MODAL INPUT TERMINAL                    */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 w-full pt-[2px] pb-[16px] z-40 bg-gradient-to-t from-[#F3F4F7] via-[#F3F4F7] to-transparent shadow-[0_-30px_30px_rgba(243,244,247,0.85)] flex flex-col">
         
         {/* Pre-Input Horizontal Scroll Tape (Tools Injection) */}
         <div className="w-full px-[16px] mb-[12px] flex space-x-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden pb-[4px]">
             <SkillTapeNode 
                label="写作" 
                icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg> }
             />
             <SkillTapeNode 
                label="拍照解读" 
                icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="3"></circle><path d="M19 8h-2.5l-1-2H8.5l-1 2H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2z"></path></svg> }
             />
             <SkillTapeNode 
                label="图片创作" 
                icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> }
             />
             <SkillTapeNode 
                label="生视频" 
                icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M10 16v-8l6 4-6 4z"></path></svg> }
             />
             <SkillTapeNode 
                label="数学" 
                icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12"></path><path d="M4 14h12"></path><path d="M14 6v12"></path><path d="M18 10h4"></path><path d="M20 8v4"></path></svg> }
             />
         </div>

         {/* Core Advanced Rectangular Input Deck */}
         <div className="w-[calc(100%-24px)] mx-[12px] bg-[#FFFFFF] rounded-[24px] rounded-b-[30px] border border-[#E9EAEF] px-[12px] py-[12px] shadow-[0_4px_24px_rgba(30,40,60,0.04)] flex flex-col pt-[14px]">
             
             {/* Text Buffer Field */}
             <div className="w-full mb-[12px] px-[8px]">
                <input 
                   type="text" 
                   placeholder="有什么任务需要我做吗" 
                   className="w-full bg-transparent border-none outline-none text-[#111111] text-[14.5px] placeholder:text-[#B1B5C0] font-[450] tracking-wide pointer-events-none" 
                   readOnly
                />
             </div>

             {/* Semantic Routing Tool Row */}
             <div className="w-full flex justify-between items-center">
                 
                 <div className="flex items-center space-x-[8px]">
                    {/* Add Media Button */}
                    <div className="w-[32px] h-[32px] bg-[#FFFFFF] rounded-full border border-[#D5D8DF] flex justify-center items-center cursor-pointer active:bg-gray-50 mr-[2px]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                    </div>

                    <InputRoutingControl 
                       active={false}
                       label="推理" 
                       icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path><circle cx="12" cy="12" r="2"></circle><path d="M12 8v2"></path><path d="M12 14v2"></path><path d="M8 12h2"></path><path d="M14 12h2"></path></svg> } 
                    />
                    
                    <InputRoutingControl 
                       active={false}
                       label="沉思" 
                       icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg> } 
                    />
                    
                    <InputRoutingControl 
                       active={true}
                       label="联网" 
                       icon={ <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative left-[1px]"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> } 
                    />
                 </div>

                 {/* Voice Dictation Active Routing */}
                 <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#333] bg-[#1A1A1A] flex justify-center items-center cursor-pointer active:scale-95 transition-transform ml-[4px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M8 6v12M16 6v12M4 10v4M20 10v4" /></svg>
                 </div>
             </div>
         </div>

         {/* Global Legal Trace and Footer Safe Zone */}
         <div className="flex justify-center pb-[0px] pt-[8px] opacity-70 pointer-events-none text-center">
            <span className="text-[10px] font-[400] text-[#9CA3AF] tracking-wide">内容由AI生成，仅供参考和借鉴</span>
         </div>
         
         {/* Hardware Base Line Mask */}
         <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mt-[8px] mb-[6px]" />
      </div>

    </div>
  );
};

export default ZhipuAICorePersonaChatPage;
