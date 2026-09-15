import '../style.css';
import React from 'react';

// Unified Share Node Icon Base Template
const ShareActionNode = ({ icon, label, bgColor }: any) => (
  <div className="flex flex-col items-center flex-shrink-0 cursor-pointer">
     <div className={`w-[52px] h-[52px] rounded-full flex justify-center items-center ${bgColor} mb-[8px] transform active:scale-95 transition-transform`}>
        {icon}
     </div>
     <span className="text-[10.5px] text-[#A6ABB5] font-[400] tracking-wide">{label}</span>
  </div>
);

// Unified Checkbox Asset
const SelectionCheckbox = ({ active }: { active: boolean }) => (
  <div className={`w-[22px] h-[22px] rounded-full flex justify-center items-center shrink-0 shadow-sm transition-colors ${active ? 'bg-[#E5E6E8]' : 'border-[1.5px] border-[#A0A4B0] bg-transparent'}`}>
     {active && (
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
     )}
  </div>
);

const ZhipuAIShareModalPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#121215] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ---------------- 1. STICKY TOP HEADER ---------------- */}
      <div className="flex flex-col bg-[#121215] fixed top-0 w-full z-50 shrink-0 border-b border-[#222225] sm:absolute">
         <div className="w-full flex justify-between items-center px-[22px] pt-[58px] pb-[12px]">
           {/* Dismiss Action */}
           <span className="text-[#3A4CF3] text-[14px] font-[400] tracking-wide active:opacity-70 cursor-pointer">
              取消
           </span>
           
           <span className="text-[14.5px] font-[500] text-[#FFFFFF] tracking-widest absolute left-1/2 transform -translate-x-1/2">
              分享对话
           </span>

           {/* Empty spacer to align center text perfectly */}
           <div className="w-[32px]" />
         </div>
      </div>

      {/* ---------------- 2. BACKGROUND CONTEXT & CHAT DOMAIN ---------------- */}
      <div className="w-full h-full absolute inset-0 z-0">
          {/* Mock background art representing previous generative sessions */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#415367] via-[#2D2A2B] to-[#121215] opacity-50 blur-[2px]" />
          {/* Aesthetic Character Outline Mock */}
          <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[80%] h-[50%] bg-[#B6C2CC]/20 rounded-t-full filter blur-[20px] mix-blend-overlay" />
          
          {/* Dimmer Overlay ensuring readable text contrast */}
          <div className="absolute inset-0 bg-[#0A0A0E]/60 z-10" />
      </div>

      {/* ---------------- 3. SCROLLABLE CONVERSATION THREAD MATRIX ---------------- */}
      <div className="flex-1 w-full overflow-y-auto z-20 pt-[100px] pb-[280px] px-[12px] [&::-webkit-scrollbar]:hidden scroll-smooth">
         
         {/* Interaction Pair 1: Unselected Context */}
         <div className="flex w-full mb-[24px]">
            {/* Pair Checkbox Aligned to top user prompt */}
            <div className="w-[30px] flex justify-center pt-[10px] shrink-0 opacity-80 cursor-pointer">
               <SelectionCheckbox active={false} />
            </div>

            {/* Bubble Thread Array */}
            <div className="flex-1 flex flex-col space-y-[14px] w-full pl-[5px]">
               {/* User Prompt */}
               <div className="self-end bg-[#2A3451]/95 text-white text-[13.5px] font-[450] tracking-wide leading-relaxed px-[16px] py-[12px] rounded-[18px] rounded-tr-[4px] max-w-[85%] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md">
                  请根据我的要求设计一个logo
               </div>
               
               {/* AI Response Block */}
               <div className="self-start bg-[#26282B]/95 text-[#EDEDED] text-[13.5px] font-[450] tracking-[0.02em] leading-[1.65] px-[16px] py-[14px] rounded-[18px] rounded-tl-[4px] max-w-[95%] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md relative border border-[rgba(255,255,255,0.02)]">
                  当然可以，请告诉我您对logo的具体需求，包括颜色、形状、大小等元素，以及您希望logo传达的信息或主题。
                  <div className="absolute bottom-[4px] right-[10px] text-[#555] text-[9px] font-[500] tracking-widest pointer-events-none">AI生成</div>
               </div>
            </div>
         </div>

         {/* Interaction Pair 2: Active / Checked Context */}
         <div className="flex w-full mb-[24px]">
            {/* Pair Checkbox Aligned to top user prompt */}
            <div className="w-[30px] flex justify-center pt-[10px] shrink-0 cursor-pointer">
               <SelectionCheckbox active={true} />
            </div>

            {/* Bubble Thread Array */}
            <div className="flex-1 flex flex-col space-y-[14px] w-full pl-[5px]">
               {/* User Prompt */}
               <div className="self-end bg-[#2A3451]/95 text-white text-[13.5px] font-[450] tracking-wide leading-relaxed px-[16px] py-[12px] rounded-[18px] rounded-tr-[4px] max-w-[85%] shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-md border border-[rgba(255,255,255,0.02)]">
                  我想要一个黑色的圆形logo
               </div>
               
               {/* AI Response Block [ACTIVE SELECTED BORDER GLOW STATE] */}
               <div className="self-start bg-[#26282B]/95 text-[#EDEDED] text-[13.5px] font-[450] tracking-[0.02em] leading-[1.65] px-[16px] pb-[22px] pt-[14px] rounded-[18px] rounded-tl-[4px] max-w-[95%] shadow-[0_0_20px_rgba(59,76,243,0.15)] backdrop-blur-md relative border-[1px] border-[#3B4CF3] transition-all">
                  好的，我会为您设计一个黑色的圆形logo。请问您希望在logo中包含任何特定的图形或文字吗？
                  {/* Faux generated image proxy representation inside bubble */}
                  <div className="w-full h-[18px]" />
                  <div className="absolute bottom-[14px] right-[16px] w-[50px] h-[16px] bg-[#3B4CF3]/10 border border-[#3B4CF3]/20 flex space-x-[2px] p-[2px] opacity-40">
                     <div className="w-1/3 h-full bg-[#3B4CF3]/40" />
                     <div className="w-1/3 h-full bg-[#3B4CF3]/40" />
                     <div className="w-1/3 h-full bg-[#3B4CF3]/40" />
                  </div>
                  <div className="absolute bottom-[4px] right-[10px] text-[#555] text-[9px] font-[500] tracking-widest pointer-events-none">AI生成</div>
               </div>
            </div>
         </div>

      </div>

      {/* ---------------- 4. DEEP BOUNDARY SHARE MODAL OVERLAY ---------------- */}
      <div className="absolute bottom-0 w-full left-0 bg-[#1A1A1A] z-40 flex flex-col pt-[20px] pb-[16px] rounded-t-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] border-t border-[#333333]">
        
        {/* Global Toolbar Header */}
        <div className="flex justify-between items-center px-[22px] mb-[20px]">
           {/* Global Select All Toggle Container */}
           <div className="flex items-center space-x-[10px] cursor-pointer">
              <SelectionCheckbox active={false} />
              <span className="text-[13.5px] font-[400] text-white tracking-widest relative top-[0.5px]">全选</span>
           </div>

           {/* Close Bottom Sheet Dispatch Node */}
           <div className="active:scale-90 transition-transform cursor-pointer p-[2px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A6ABB5" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
           </div>
        </div>
        
        {/* Row 1: External Platform Routing (Social APIs) */}
        <div className="flex px-[16px] space-x-[20px] overflow-x-auto [&::-webkit-scrollbar]:hidden w-full pb-[24px]">
          
          <ShareActionNode 
             label="微信好友" 
             bgColor="bg-[#0CD782]"
             icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                   <path d="M8.5 14.5c-3 0-5.5-2-5.5-4.5s2.5-4.5 5.5-4.5 5.5 2 5.5 4.5-2.5 4.5-5.5 4.5zm0-7c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm2.5 0c-.4 0-.8.3-.8.8s.4.8.8.8.8-.3.8-.8-.4-.8-.8-.8zm7 8c-2.5 0-4.5-1.5-4.5-3.5S15.5 8.5 18 8.5 22.5 10 22.5 12s-2 3.5-4.5 3.5zm0-5c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6zm1.8 0c-.3 0-.6.2-.6.6s.3.6.6.6.6-.2.6-.6-.3-.6-.6-.6z" />
                </svg>
             }
          />

          <ShareActionNode 
             label="小红书" 
             bgColor="bg-[#F13835]"
             icon={
                <span className="text-white font-[600] text-[12.5px] italic tracking-tighter">小红书</span>
             }
          />

          <ShareActionNode 
             label="微博" 
             bgColor="bg-[#FF8A37]"
             icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                   <path d="M12 4a8 8 0 0 0-8 8v1a8 8 0 0 0 16 0v-4" />
                   <path d="M12 12h.01 M16 8h.01 M8 8h.01" strokeWidth="3" />
                   <path d="M9 16h6" strokeWidth="2" />
                </svg>
             }
          />

          <ShareActionNode 
             label="朋友圈" 
             bgColor="bg-[#2BE6A8]"
             icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10" />
                   <circle cx="12" cy="12" r="4" />
                   <path d="M12 2v6 M12 16v6 M2 12h6 M16 12h6 M4.9 4.9l4.2 4.2 M14.9 14.9l4.2 4.2 M19.1 4.9l-4.2 4.2 M9.1 14.9l-4.2 4.2" />
                </svg>
             }
          />

          <ShareActionNode 
             label="社区" 
             bgColor="bg-[#FFB719]"
             icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                   <path d="M18 10h-2V8h2zm-2 4h-4v-2h4z M4 6h16v12H4z" />
                   <path d="M8 10h2V8H8z M8 14h2v-2H8z" />
                   <path d="M12 2C6.48 2 2 5.58 2 10c0 2.5 1.45 4.7 3.65 6.1L4 21l3.85-2.05h4.15c5.52 0 10-3.58 10-8S17.52 2 12 2zm0 15h-4.3l-2.4 1.3.4-2.6C4.1 14.85 3 12.55 3 10c0-3.85 4.05-7 9-7s9 3.15 9 7-4.05 7-9 7z" />
                </svg>
             }
          />

          <ShareActionNode 
             label="更多" 
             bgColor="bg-[#333333]"
             icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                   <circle cx="5" cy="12" r="2" />
                   <circle cx="12" cy="12" r="2" />
                   <circle cx="19" cy="12" r="2" />
                </svg>
             }
          />

        </div>

        {/* Row 2: Secondary Internal Engine Actions */}
        <div className="flex px-[16px] space-x-[20px] w-full mb-[12px]">
           <ShareActionNode 
             label="生成图片" 
             bgColor="bg-[#333333]"
             icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                   <circle cx="8.5" cy="8.5" r="1.5" />
                   <polyline points="21 15 16 10 5 21" />
                </svg>
             }
          />
          <ShareActionNode 
             label="复制链接" 
             bgColor="bg-[#333333]"
             icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
             }
          />
        </div>

        {/* Hardware Nav Spacer Base line */}
        <div className="w-[134px] h-[5px] bg-[#666666] rounded-full mx-auto" />

      </div>

    </div>
  );
};

export default ZhipuAIShareModalPage;
