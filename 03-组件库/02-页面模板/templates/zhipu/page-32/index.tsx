import '../style.css';
import React from 'react';

// Unified App Routing Icon Constructor
const AppGridNode = ({ icon, label, badge, isMore = false }: any) => (
  <div className="flex flex-col items-center justify-center space-y-[8px] cursor-pointer hover:opacity-80 transition-opacity">
     <div className="relative">
        {isMore ? (
            <div className="w-[46px] h-[46px] rounded-full border-[1.5px] border-dashed border-[#4B6BFF] text-[#4B6BFF] flex justify-center items-center bg-[#F3F6FF]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
        ) : (
            <div className="w-[46px] h-[46px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)] bg-white overflow-hidden flex justify-center items-center">
               {icon}
            </div>
        )}
        {badge && (
           <div className="absolute top-[-2px] right-[-2px] w-[14px] h-[14px] bg-[#FF4D4F] border-[2px] border-white rounded-full flex justify-center items-center">
           </div>
        )}
     </div>
     <span className="text-[11.5px] font-[450] text-[#111111] tracking-wide">{label}</span>
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


const ZhipuAIMainHubPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F3F4F8] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ========================================================= */}
      {/* 1. NATIVE STATUS BAR                                      */}
      {/* ========================================================= */}
      <div className="flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none z-50 shrink-0">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">17:51</div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="4.5" width="3" height="6.5" rx="1" /><rect x="9" y="2" width="3" height="9" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" /><path d="M4 7C6.5 5.2 9.5 5.2 12 7" /><path d="M7 9.5C7.8 9 8.2 9 9 9.5" /></svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" /><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" /><path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" /></svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. BASE APP HOME DISCOVERY NAVIGATION                     */}
      {/* ========================================================= */}
      <div className="flex justify-between items-center px-[18px] pt-[8px] pb-[10px] shrink-0 z-40">
        <div className="p-[4px] cursor-pointer">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <line x1="3" y1="12" x2="21" y2="12"></line>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <line x1="3" y1="18" x2="15" y2="18"></line>
           </svg>
        </div>
        
        <div className="flex items-center space-x-[24px]">
           <div className="relative flex flex-col items-center">
              <span className="text-[15.5px] font-[600] text-[#111111] tracking-wider">首页</span>
              <div className="absolute bottom-[-6px] w-[18px] h-[3px] bg-[#111111] rounded-full" />
           </div>
           <span className="text-[15.5px] font-[450] text-[#A6ABB5] tracking-wider cursor-pointer transition-colors active:text-[#4B4B55]">智能体</span>
        </div>
        
        <div className="w-[24px]"></div>
      </div>

      <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col">
         {/* Drop shadow container spacing logic */}
         <div className="px-[12px] pt-[16px] pb-[40px]">
            <div className="w-full bg-[#FFFFFF] rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] pb-[24px]">
               
               {/* Visual Promo Hero Block */}
               <div className="w-full h-[88px] relative overflow-hidden rounded-[18px] bg-[#254AFA]">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B25E1] opacity-50"></div>
                   <div className="absolute inset-0 flex items-center px-[16px]">
                      <div className="flex flex-col">
                         <span className="text-[18px] font-[600] text-white italic tracking-tighter shadow-sm flex items-end">
                            <span className="text-[32px] leading-[0.8] mr-[4px]">AI</span>智能体2025
                         </span>
                         <span className="text-[18px] font-[600] text-white italic tracking-tighter shadow-sm">开发大师赛</span>
                      </div>
                   </div>
               </div>

               {/* Application Routing Grids */}
               <div className="px-[14px] pt-[24px] grid grid-cols-4 gap-y-[28px] gap-x-[8px]">
                   
                   <AppGridNode badge={true} label="清影AI视频" icon={ <div className="relative w-full h-full flex justify-center items-center bg-gradient-to-br from-[#1E2E4A] to-[#0A0D15]"> <svg width="20" height="20" viewBox="0 0 24 24" fill="#3B53FF"><polygon points="5 3 19 12 5 21 5 3" /></svg> </div> } />
                   <AppGridNode label="AI画图" icon={ <div className="w-full h-full flex justify-center items-center bg-[#0724E9]"> <div className="w-[20px] h-[20px] bg-gradient-to-br from-[#FFE300] via-[#FF1493] to-[#00FFFF] transform rotate-45 rounded-sm"></div> </div> } />
                   <AppGridNode label="AI搜索" icon={ <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-[#1E2E4A] to-[#0A0D15]"> <div className="relative"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> <div className="absolute right-[-2px] bottom-[-2px] w-[8px] h-[8px] bg-[#3BCE7D] rounded-full flex justify-center items-center"><svg width="6" height="6" viewBox="0 0 24 24" fill="#111"><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg></div> </div> </div> } />
                   <AppGridNode label="视频通话" icon={ <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-[#4A3289] to-[#281855]"> <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> </div> } />
                   <AppGridNode label="志愿预测" icon={ <div className="w-full h-full flex justify-center items-center bg-[#E5F1FF]"> <div className="w-[28px] h-[28px] bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full opacity-80" /> </div> } />
                   <AppGridNode label="更多智能体" isMore={true} />

               </div>
            </div>
         </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MULTI-MODAL TERMINAL BLOCK                             */}
      {/* ========================================================= */}
      
      <div className="w-full pt-[2px] pb-[16px] z-40 bg-gradient-to-t from-[#F3F4F7] via-[#F3F4F7] to-transparent shrink-0">
         
         {/* Pre-Input Horizontal Scroll Tape */}
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

         {/* Advanced Rectangular Input Deck (Idle State) */}
         <div className="w-[calc(100%-24px)] mx-[12px] bg-[#FFFFFF] rounded-[24px] rounded-b-[30px] border border-[#E9EAEF] px-[12px] py-[12px] shadow-[0_4px_24px_rgba(30,40,60,0.04)] flex flex-col pt-[14px]">
             
             {/* Dynamic Placeholder Update */}
             <div className="w-full mb-[12px] px-[8px]">
                <input 
                   type="text" 
                   placeholder="输入你的问题..." 
                   className="w-full bg-transparent border-none outline-none text-[#111111] text-[14.5px] placeholder:text-[#A0A4B0] font-[450] tracking-wide pointer-events-none" 
                   readOnly
                />
             </div>

             <div className="w-full flex justify-between items-center">
                 
                 <div className="flex items-center space-x-[8px]">
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

                 {/* Idle Dictation Styling Toggle */}
                 <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#222222] bg-transparent flex justify-center items-center cursor-pointer active:scale-95 transition-transform ml-[4px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M8 6v12M16 6v12M4 10v4M20 10v4" /></svg>
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

export default ZhipuAIMainHubPage;
