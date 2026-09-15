import '../style.css';
import React from 'react';

// Generalized Agent Entry Row Component (Matched to Page-22 sizing logic)
const AgentRow = ({ title, desc, stats, avatar }: any) => {
  return (
    <div className="flex items-center w-full pb-[28px]">
      
      {/* 1. Specialized Graphical Avatar Lock */}
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] relative border border-black/[0.04] bg-[#F7F8FA]">
         {avatar}
      </div>

      {/* 2. Primary Information Matrix */}
      <div className="flex flex-col ml-[16px] flex-1 min-w-0 pr-4">
         
         <div className="flex items-center pt-[2px]">
            <span className="text-[14.5px] font-[500] text-[#111111] leading-none tracking-wide">{title}</span>
         </div>

         {/* 2-line truncated heavy description representing AI capabilities cleanly */}
         <span className="text-[12.5px] font-[400] text-[#444] mt-[8px] leading-[1.45] line-clamp-2 tracking-[0.01em]">
            {desc}
         </span>

         <div className="flex items-center mt-[7px] text-[#A6ABB5] space-x-[2px]">
            {/* Native Conversation Bubble Iconography */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="opacity-90 relative top-[0.5px]">
               <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-[10px] font-[450] tracking-widest pl-[2px]">{stats}</span>
         </div>
      </div>

      {/* 3. Action Add Node (Universally Unsubscribed in View) */}
      <div className="shrink-0 flex items-center justify-end w-[24px]">
         <div className="w-[24px] h-[24px] bg-[#3B4CF3] rounded-full flex justify-center items-center shadow-[0_2px_4px_rgba(59,76,243,0.3)] cursor-pointer active:scale-95 transition-transform">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
         </div>
      </div>
    </div>
  )
}

const ZhipuAIAgentsDiscoveryHomePage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ---------------- 1. STICKY TOP HEADER NAV ---------------- */}
      <div className="flex flex-col bg-white sticky top-0 z-40 shrink-0 w-full pb-[10px]">
         
         {/* Top Native Clock/Status Block */}
         <div className="w-full flex justify-between items-center px-6 pt-[14px] pb-2">
           <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5">
              17:53
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

         {/* Base Central Navigation Tabs Wrapper */}
         <div className="flex items-center justify-between px-[20px] pt-[6px]">
            {/* Hamburger System Dispatch */}
            <div className="active:opacity-60 cursor-pointer">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 6h18 M3 12h12 M3 18h18" />
               </svg>
            </div>
            
            {/* Central Tabs Array */}
            <div className="flex space-x-[20px] items-center relative pr-[12px]">
               <span className="text-[15.5px] font-[400] text-[#9A9EA6] tracking-widest cursor-pointer">首页</span>
               
               <div className="flex flex-col items-center">
                  <span className="text-[17px] font-[600] text-[#111111] tracking-widest leading-none pb-[6px]">智能体</span>
                  <div className="w-[14px] h-[3px] bg-[#111111] rounded-full" />
               </div>
            </div>

            {/* Layout Blank Anchor */}
            <div className="w-[24px]" />
         </div>

      </div>

      {/* ---------------- 2. CONTINUOUS SCROLL DATA FEED ---------------- */}
      <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden pb-[140px]">
        
        {/* Horizontal Sticky Category Controller Container */}
        <div className="sticky top-0 bg-white z-30 pt-[12px] pb-[16px]">
          <div className="relative w-full overflow-hidden">
            <div className="flex px-[16px] space-x-[12px] overflow-x-auto [&::-webkit-scrollbar]:hidden w-full pr-[64px]">
               
               <div className="px-[16px] py-[6px] shrink-0 border border-[#E8EAEF] rounded-full text-[#1D2129] text-[12.5px] font-[400] cursor-pointer">
                  最近聊过
               </div>
               
               <div className="px-[16px] py-[6px] shrink-0 bg-[#191919] text-[#FFFFFF] rounded-full text-[12.5px] font-[500] tracking-wide shadow-sm cursor-pointer border border-transparent">
                  精选推荐
               </div>

               <div className="px-[16px] py-[6px] shrink-0 border border-[#E8EAEF] rounded-full text-[#1D2129] text-[12.5px] font-[400] cursor-pointer">
                  官方
               </div>

               <div className="px-[16px] py-[6px] shrink-0 border border-[#E8EAEF] rounded-full text-[#1D2129] text-[12.5px] font-[400] cursor-pointer">
                  写作
               </div>

               <div className="px-[16px] py-[6px] shrink-0 border border-[#E8EAEF] rounded-full text-[#1D2129] text-[12.5px] font-[400] cursor-pointer">
                  职场
               </div>

               <div className="px-[16px] py-[6px] shrink-0 border border-[#E8EAEF] rounded-full text-[#1D2129] text-[12.5px] font-[400] cursor-pointer">
                  发现
               </div>

            </div>

            {/* Overlap Global Search Interaction Block */}
            <div className="absolute right-0 top-0 h-full w-[64px] bg-gradient-to-l from-white via-white to-transparent flex justify-end items-center px-[22px] pointer-events-none">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-auto cursor-pointer active:opacity-60 relative right-[-5px]">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
               </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Section Mapping Block */}
        <div className="flex flex-col px-[20px] w-full pt-[4px]">
           
           {/* Section Anchor Layout Title */}
           <div className="flex items-center mb-[20px] active:opacity-70 cursor-pointer">
             <span className="text-[14px] font-[600] text-[#111111] tracking-widest">编辑精选</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-[2px]"><path d="M9 18l6-6-6-6" /></svg>
           </div>

           {/* AI Agent Routing Nodes */}
           <AgentRow 
             title="宫心计：甄嬛沉浸模拟器"
             desc={<>小主吉祥🌸，欢迎来到《宫心计：甄嬛沉浸模拟器》。在这里，您将置身大清宫廷，化身一位才情...</>}
             stats="4041人聊过 &nbsp;&nbsp;@摩西"
             avatar={
               <div className="w-full h-full bg-[#5E4D4A] flex justify-center items-center shadow-inner pt-2">
                  <span className="text-[32px]">🪭</span>
               </div>
             }
           />

           <AgentRow 
             title="炫酷logo设计大师"
             desc="这是一款专注于现代极简风格的高端logo设计工具，能够提供超高清的2D平面插画效果，炫酷且时尚。"
             stats="6969人聊过 &nbsp;&nbsp;@波浪的魔术师"
             avatar={
               <div className="absolute inset-0 bg-[#A6B2C8] flex justify-center items-center shadow-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                     <path d="M12 2L2 22l10-4 10 4L12 2z" />
                     <circle cx="12" cy="14" r="3" fill="#111" />
                  </svg>
               </div>
             }
           />

           <AgentRow 
             title="相思AI废土世界"
             desc="捕捉废土之美，描绘末日印象，带你领略侘寂艺术空间。"
             stats="1655人聊过 &nbsp;&nbsp;@一曲相思"
             avatar={
               <div className="w-full h-full bg-gradient-to-br from-[#0F172A] to-[#2D1B36] flex flex-col justify-center items-center shadow-inner relative">
                  <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20px_20px,#fff,rgba(0,0,0,0))] opacity-50" />
                  <span className="text-[16px] opacity-80 z-10">🦾</span>
                  <div className="text-[6px] tracking-widest font-[600] text-[#5CED74] mt-1 z-10 scale-[80%] border border-[#5CED74] px-[2px] bg-black/60 font-mono">废土世界</div>
               </div>
             }
           />

           <AgentRow 
             title="四级单词闯关"
             desc="收录英语四级全部词汇，在闯关中拿下四级词汇！"
             stats="2628人聊过 &nbsp;&nbsp;@逗包"
             avatar={
               <div className="w-full h-full bg-[#50B774] flex justify-center items-center shadow-inner">
                  <span className="text-white font-[600] text-[12px] tracking-wide font-sans">CET-4</span>
               </div>
             }
           />

           <AgentRow 
             title="亿万富翁养成游戏"
             desc="闯关选择人生，挑战财富极限，向成为亿万富翁进军吧！AI游戏智能体。"
             stats="5213人聊过 &nbsp;&nbsp;@秀仙"
             avatar={
               <div className="w-full h-full bg-gradient-to-br from-[#FFD3A5] to-[#FD6585] flex justify-center items-center shadow-inner">
                  <span className="text-[26px] relative top-[2px]">🤑</span>
               </div>
             }
           />

           <AgentRow 
             title="我画你猜"
             desc="AI绘制简笔画，用户猜画的内容，无限挑战模式"
             stats="2146人聊过 &nbsp;&nbsp;@小许分身"
             avatar={
               <div className="w-full h-full bg-[#FCB388] flex justify-center items-center shadow-inner">
                  <div className="w-[30px] h-[34px] bg-[#FFF2EA] shadow-sm transform -rotate-6 flex justify-center items-center rounded-sm">
                     <span className="text-[14.5px]">✏️</span>
                  </div>
               </div>
             }
           />

           <AgentRow 
             title="喵喵打工人能量补给站"
             desc={<>喵呜~ 欢迎来到【喵喵能量补给站】！🐱💤 我是你的小喵助理，在这个钢铁森林里，专职帮你偷懒回...</>}
             stats="2251人聊过 &nbsp;&nbsp;@鱼七"
             avatar={
               <div className="w-full h-full bg-[#FCE6BD] flex justify-center items-center shadow-inner">
                  <span className="text-[32px] relative top-[4px] opacity-90 right-[2px]">🐈</span>
               </div>
             }
           />

           <AgentRow 
             title="高情商回复神器"
             desc="帮你搜索高情商回答，提供全网最佳聊天话术，让你聊天不再尴尬"
             stats="43.2w人聊过 &nbsp;&nbsp;@恋爱砖家"
             avatar={
               <div className="w-full h-full bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] flex justify-center items-center shadow-inner">
                  <span className="text-[22px] text-white">❤️</span>
               </div>
             }
           />

        </div>
      </div>

      {/* ---------------- 3. FLOATING CREATION MATRIX ANCHOR ---------------- */}
      <div className="absolute bottom-[34px] w-full flex justify-center z-50 pointer-events-none">
         <div className="bg-gradient-to-r from-[#3949F0] to-[#7135F6] w-[156px] h-[48px] rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(70,50,240,0.4)] pointer-events-auto cursor-pointer active:scale-95 transition-transform border border-t-[rgba(255,255,255,0.2)] border-x-transparent border-b-transparent">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" className="mr-[6px] relative top-[-0.5px]"><path d="M12 5v14M5 12h14"/></svg>
            <span className="text-[13.5px] font-[500] text-white tracking-widest relative top-[0.5px]">创建智能体</span>
         </div>
      </div>

      {/* Global Home iOS Indicator Override */}
      <div className="absolute bottom-[8px] w-full flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-[#111111] rounded-full opacity-90" />
      </div>

    </div>
  );
};

export default ZhipuAIAgentsDiscoveryHomePage;
