import '../style.css';
import React from 'react';

// Unified List Element Component 
const AgentRow = ({
  title,
  desc,
  stats,
  added = false,
  avatar
}: any) => {
  return (
    <div className="flex w-full pb-[26px]">
      
      {/* 1. Specialized Graphical Avatar Lock */}
      <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative border border-black/[0.04]">
         {avatar}
      </div>

      {/* 2. Primary Information Matrix */}
      <div className="flex flex-col ml-[14px] flex-1 min-w-0 pr-4">
         
         <div className="flex items-center pt-[2px]">
            <span className="text-[14.5px] font-[500] text-[#111111] leading-none tracking-wide">{title}</span>
            <div className="ml-[6px] bg-[#EEF2FC] text-[#3A43E6] text-[9.5px] font-[500] tracking-wider px-[5px] py-[2px] rounded-[4px] relative top-[-1px]">
               官方
            </div>
         </div>

         {/* 2-line truncated heavy description representing AI capabilities cleanly */}
         <span className="text-[12.5px] font-[450] text-[#111] mt-[8px] leading-[1.4] line-clamp-2 tracking-[0.01em]">
            {desc}
         </span>

         <div className="flex items-center mt-[7px] text-[#A6ABB5] space-x-[2px]">
            {/* Native Conversation Bubble Iconography */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="opacity-90 relative top-[0.5px]">
               <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-[10px] font-[400] tracking-widest pl-[2px]">{stats}</span>
            <span className="text-[10px] font-[400] ml-[6px] tracking-wide">@智谱清言</span>
         </div>
      </div>

      {/* 3. Action Configuration Flow */}
      <div className="shrink-0 flex items-center justify-end w-[24px] pt-[2px]">
         {added ? (
           <div className="w-[24px] h-[24px] bg-[#F2F3F6] rounded-full flex justify-center items-center">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4C8D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
           </div>
         ) : (
           <div className="w-[24px] h-[24px] bg-[#3B4CF3] rounded-full flex justify-center items-center shadow-[0_2px_4px_rgba(59,76,243,0.3)] cursor-pointer active:scale-95 transition-transform">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
           </div>
         )}
      </div>
    </div>
  )
}

const ZhipuAIAgentsDiscoveryPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- 1. STICKY HEADER BOUNDARY ---------------- */}
      <div className="flex flex-col bg-white sticky top-0 z-50 shrink-0 w-full pb-[10px]">
         
         {/* Native iOS Clock and Battery Mask Simulation Space*/}
         <div className="w-full flex justify-between items-center px-6 pt-[14px] pb-2">
           <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5">
              18:08
           </div>
           <div className="flex items-center space-x-[5px] text-[#111]">
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

         {/* Dedicated Search Input Array */}
         <div className="flex items-center w-full px-[16px] pt-[8px]">
            <div className="flex-1 h-[36px] bg-[#F3F4F6] rounded-[18px] flex items-center px-[12px]">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A4B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-[6px]">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
               </svg>
               <input 
                  type="text" 
                  placeholder="搜索智能体" 
                  className="bg-transparent border-none outline-none text-[#111111] text-[13.5px] font-[400] placeholder:text-[#AAB0BA] w-full" 
                  value=""
                  readOnly 
               />
            </div>
            {/* Explicit Cancel Native Navigation Path */}
            <span className="text-[#3A4CF3] text-[14px] font-[400] tracking-wide ml-[14px]">
               取消
            </span>
         </div>

      </div>

      {/* ---------------- 2. SCROLLING DISCOVERY ROSTER ---------------- */}
      <div className="flex-1 overflow-y-auto px-[20px] w-full [&::-webkit-scrollbar]:hidden pt-[18px] pb-[40px]">
        
        {/* Subheader Node */}
        <div className="mb-[22px]">
           <span className="text-[11.5px] font-[400] text-[#8C92A0] tracking-[0.02em]">官方推荐</span>
        </div>

        {/* --- Agent Nodes Rendering Sequence --- */}
        
        <AgentRow 
          title="翻译专家"
          desc="精准传达原文信息，保留格式和术语。"
          stats="37.4w人聊过"
          added={false}
          avatar={
            <div className="bg-[#7B3830] text-[#FFFFFF] text-[24px] font-[600] rounded-full w-full h-full flex justify-center items-center shadow-inner tracking-tighter">
              翻
            </div>
          }
        />

        <AgentRow 
          title="AI画图"
          desc="打开你的脑洞，所想即所画！"
          stats="1193w人聊过"
          added={true}
          avatar={
            <div className="w-full h-full bg-gradient-to-br from-[#120D54] via-[#352EB9] to-[#E55288] flex justify-center items-center">
              <svg viewBox="0 0 100 100" className="w-[26px] h-[26px]" fill="none">
                <path d="M20 80 L80 20" stroke="#FFD854" strokeWidth="16" strokeLinecap="round" />
                <path d="M20 20 L80 80" stroke="#1CE4FF" strokeWidth="16" strokeLinecap="round" />
              </svg>
            </div>
          }
        />

        <AgentRow 
          title="海π数学"
          desc="培养数学思维，提高解题能力，助力终身学习！"
          stats="3429人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-gradient-to-b from-[#141870] to-[#2522C6] flex flex-col justify-center items-center relative shadow-inner">
               <span className="text-[#FFFFFF] text-[14.5px] font-[600] tracking-widest relative z-10 font-serif">海<span className="font-sans">π</span></span>
               <div className="absolute inset-0 opacity-[0.25] text-[7px] text-[#FFFFFF] overflow-hidden leading-snug break-all font-mono font-[600] pl-1 pt-1">
                  ∫x²dx=y <br/>∑E=mc²
               </div>
            </div>
          }
        />

        <AgentRow 
          title="海π物理"
          desc="培养物理思维，提高解题能力，助力终身学习！"
          stats="2105人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-gradient-to-b from-[#6BEA9D] to-[#2BA86D] flex justify-center items-center relative shadow-inner">
               <span className="text-white text-[14.5px] font-[600] tracking-widest relative z-10 font-serif">海<span className="font-sans">π</span></span>
               <div className="absolute inset-0 opacity-[0.2] text-[7px] text-[#FFFFFF] overflow-hidden leading-snug break-all font-mono font-[600] pl-1 pt-1">
                  F=ma P=UI <br/>v=s/t
               </div>
            </div>
          }
        />

        <AgentRow 
          title="海π英语"
          desc="解锁英语学习新境界，轻松应对各类挑战！"
          stats="1741人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-gradient-to-br from-[#FFADC0] via-[#A8CEE8] to-[#60A5D4] flex justify-center items-center relative shadow-inner">
               <span className="text-white text-[14.5px] font-[600] tracking-widest relative z-10 font-serif">海<span className="font-sans">π</span></span>
               <div className="absolute inset-0 opacity-[0.4] text-[8px] text-[#FFFFFF] overflow-hidden leading-[1] break-all font-mono font-[600] pl-[2px] pt-[2px]">
                  K A O T <br/> E W C
               </div>
            </div>
          }
        />

        <AgentRow 
          title="论文解读小助手"
          desc="请上传你的论文，我会帮你全面解析论文概要和细节。"
          stats="15.9w人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-[#FFF5CF] flex justify-center items-center relative border-[1px] border-[#FCEBAE]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" className="relative top-[-2px]">
                 <path d="M14.5 13a3.5 3.5 0 10-5 0c0 1.5-1 2-1 5h7c0-3-1-3.5-1-5z" fill="#FFE274" />
                 <path d="M9 18h6 M10 22h4 M12 2v2 M4 12h2 M18 12h2" />
                 <path d="M12 21 H4v-6c0-2-1.5-3-1.5-3s1.5-1 1.5-3v-6h16v6c0 2 1.5 3 1.5 3s-1.5 1-1.5 3v6h-3" fill="#FFF5CF" stroke="none" />
                 <path d="M3 19h18" />
              </svg>
            </div>
          }
        />

        <AgentRow 
          title="知乎回答生产机"
          desc="泻药，人在电脑里，刚开主机，有什么我能帮你的吗？"
          stats="7.81w人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-[#DFF3FF] flex justify-center items-center border-[2px] border-[#BAE3FC]">
              <div className="w-[28px] h-[28px] bg-[#0E8AF0] rounded-[6px] flex flex-col justify-center items-center shadow-sm">
                <span className="text-white text-[8.5px] font-[600] leading-none mb-[2px]">回答</span>
                <div className="w-[20px] h-[10px] bg-white rounded-full flex justify-center items-center relative">
                   <span className="text-[#0E8AF0] text-[7px] font-[600] tracking-tighter">知乎</span>
                </div>
              </div>
            </div>
          }
        />

        <AgentRow 
          title="英文单词语法助手"
          desc="输入单词，进行单词查询；输入句子，进行语法检查；输入讲解，进行语法解释。"
          stats="4.48w人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-[#FDF1CE] flex justify-center items-center">
              <div className="w-[26px] h-[30px] bg-white border-[2px] border-[#A2D3C4] rounded-[4px] relative flex justify-center pt-[5px] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                <div className="absolute top-[-5px] w-[14px] h-[4px] bg-[#FFA7A7] rounded-sm" />
                <span className="text-[#A2D3C4] font-[600] text-[12.5px]">A</span>
                <div className="absolute bottom-[3px] bg-[#91CCFF] w-[20px] h-[8px] text-[4.5px] text-white flex justify-center items-center font-[600] rounded-sm tracking-tighter leading-none">Grammar</div>
              </div>
            </div>
          }
        />

        <AgentRow 
          title="哄哄挑战"
          desc="据说，哄好女朋友的难度不亚于阻止一次世界大战"
          stats="1.2w人聊过"
          added={false}
          avatar={
            <div className="w-full h-full bg-gradient-to-b from-[#FE84C3] to-[#EE3597] flex justify-center items-center relative shadow-inner">
               <div className="w-[30px] h-[22px] bg-white/20 rounded-[8px] overflow-hidden flex justify-center items-center border-[1.5px] border-[#FFF] backdrop-blur-sm shadow-md">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00D261" stroke="#00D261" strokeWidth="1">
                     <circle cx="7" cy="12" r="3" />
                     <circle cx="17" cy="12" r="3" />
                     <rect x="7" y="10" width="10" height="4" />
                  </svg>
                  <span className="absolute text-[10px] top-[1px] right-[2px]">❤️</span>
               </div>
            </div>
          }
        />

      </div>
      
      {/* Home line base indicator overlaying the scroll */}
      <div className="absolute bottom-[8px] w-full flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-[#111111] rounded-full opacity-90" />
      </div>

    </div>
  );
};

export default ZhipuAIAgentsDiscoveryPage;
