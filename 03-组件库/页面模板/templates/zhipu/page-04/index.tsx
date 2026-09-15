import '../style.css';
import React from 'react';

const MonochromeEmptyMascot = () => (
  <div className="relative w-[80px] h-[80px] flex items-center justify-center">
    {/* Grey Background Body element mimicking the zhipu mascot */}
    <div 
      className="relative z-20 w-[64px] h-[60px]"
      style={{
        borderRadius: '45% 42% 43% 46%',
        background: 'linear-gradient(135deg, #F9FAFB 0%, #CCD1DA 60%, #B8BEC8 100%)',
        boxShadow: 'inset -6px -6px 15px rgba(184,190,200,0.8), inset 4px 4px 8px rgba(255,255,255,1), 0 10px 20px rgba(184,190,200,0.3)',
        transform: 'rotate(-6deg)'
      }}
    >
      {/* Eye structure */}
      <div className="absolute top-[40%] right-[24%] flex space-x-[4.5px] rotate-[10deg]">
        <div className="w-[7.5px] h-[8.5px] bg-[#43454B] rounded-[2.5px] transform -skew-x-[6deg]" />
        <div className="w-[6.5px] h-[7.5px] bg-[#43454B] rounded-[2.5px] transform -skew-x-[6deg] mt-[1.5px]" />
      </div>
    </div>
    
    {/* Surrounding grey props */}
    {/* Big right circle */}
    <div className="absolute -right-[14px] -top-[4px] w-[14px] h-[14px] bg-[#AAB0BB] rounded-full drop-shadow-sm" />
    
    {/* Tiny middle circle */}
    <div className="absolute left-[54%] -top-[18px] w-[7px] h-[7px] bg-[#C1C6D2] rounded-full drop-shadow-sm" />
    
    {/* Left geometric asterisk */}
    <svg className="absolute -left-[16px] -top-[4px] w-[18px] h-[18px] text-[#A6ACB7] transform -rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20 M2 12h20 M4.9 4.9l14.2 14.2 M4.9 19.1l14.2-14.2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

const PostActionSheet = () => (
  <div className="absolute bottom-0 left-0 w-full bg-white z-50 rounded-t-[20px] px-[20px] pt-[28px] pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col">
    
    {/* Option 1: Image & Text */}
    <div className="flex items-center mb-[28px] active:scale-[0.98] transition-transform cursor-pointer">
       <div className="w-[48px] h-[48px] bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Picture Frame */}
            <path d="M17.5 11.5v-5a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.5" />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="none" fill="#222" />
            <path d="M2.5 17.5l4.5-4.5 3 3" />
            {/* Pencil intersecting bottom right */}
            <path d="M14 20.5l-1 1.5-3 1 1-3 1.5-1" fill="#fff" />
            <path d="M15 19.5l6-6a2 2 0 0 0 -2.8-2.8l-6 6l-1 3.5 3.5-1z" />
          </svg>
       </div>
       <div className="ml-[16px] flex flex-col justify-center translate-y-[-1px]">
          <h3 className="text-[14.5px] font-[600] text-[#111] leading-tight mb-1 tracking-wide">图文帖子</h3>
          <p className="text-[12px] text-[#9599A3] tracking-[0.01em] leading-tight">分享你使用智能体的日常，畅所欲言</p>
       </div>
    </div>

    {/* Option 2: Conversation Share */}
    <div className="flex items-center mb-[32px] active:scale-[0.98] transition-transform cursor-pointer">
       <div className="w-[48px] h-[48px] bg-[#F5F6F8] rounded-full flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Chat Bubble Body */}
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9c4.7 0 8.5 3.8 8.5 8.5z" />
            {/* Inner Star/Spark logo */}
            <path d="M9.5 9l1-2.5 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1z" fill="#222" stroke="none" />
          </svg>
       </div>
       <div className="ml-[16px] flex flex-col justify-center translate-y-[-1px]">
          <h3 className="text-[14.5px] font-[600] text-[#111] leading-tight mb-1 tracking-wide">对话分享帖子</h3>
          <p className="text-[12px] text-[#9599A3] tracking-[0.01em] leading-tight">分享你与智能体的对话，与大家一起交流</p>
       </div>
    </div>

    {/* Cancel Button */}
    <button className="w-full h-[48px] bg-[#F4F5F7] rounded-full flex items-center justify-center text-[#222] font-[500] text-[14.5px] tracking-widest active:bg-[#EBECEF] transition-colors">
      取消
    </button>
    
    {/* iOS Home indicator visual spacer */}
    <div className="w-full flex justify-center mt-[22px] mb-[-6px]">
      <div className="w-[134px] h-[5px] bg-[#111] rounded-full" />
    </div>

  </div>
);

const CreatorCommunityModalPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F7F8FA] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- BACKGROUND PAGE (STATIC) ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[14px]">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 w-full shrink-0">
          <div className="text-[13.5px] font-[500] text-black tracking-tight mt-0.5">
            18:14
          </div>
          <div className="flex items-center space-x-[5px]">
            <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="black">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
              <rect x="9" y="2" width="3" height="9" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
              <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
              <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
            </svg>
            <svg className="w-[24px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
              <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black" />
              <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="black" />
            </svg>
          </div>
        </div>

        {/* Dynamic header Nav arrow */}
        <div className="px-5 pt-4 pb-2 mt-2">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-[-4px]">
              <path d="M15 18l-6-6 6-6" />
           </svg>
        </div>

        {/* Profile Info Header */}
        <div className="flex px-[22px] items-center mt-3">
           <div className="w-[60px] h-[60px] rounded-full border border-[#E9EBEF] overflow-hidden shrink-0 flex items-end justify-center bg-gradient-to-tr from-[#314E69] to-[#88AAA2] relative shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
              {/* Symbolic stylized portrait graphics matching aesthetic */}
              <div className="absolute top-[8px] right-[8px] w-[22px] h-[22px] bg-[#FAD477] rounded-full opacity-80" />
              <div className="w-[22px] h-[36px] bg-[#142636] rounded-t-[10px]" />
           </div>
           <div className="ml-[14px]">
              <h1 className="text-[18px] font-[600] text-[#222222] tracking-wide">天气搭配师</h1>
              <p className="text-[#989CA6] text-[11.5px] mt-[3px] tracking-wide font-[400]">来自: 美叶 &nbsp;&nbsp; 智能体热度: 0</p>
           </div>
        </div>

        {/* Description body */}
        <div className="px-[22px] mt-6 mb-2">
          <p className="text-[#333333] text-[13px] font-[500] leading-[1.6] tracking-wide">
            一键获取天气与穿搭建议，让你每天正能量满满！
          </p>
          <p className="text-[#9CA1AC] text-[11.5px] mt-[6px] tracking-wide">
            社区内容有可能由AI生成，请您注意识别
          </p>
        </div>

        {/* Community Board section */}
        <div className="px-[22px] mt-[32px] mb-8">
          <h2 className="text-[15.5px] font-[600] text-[#222222] tracking-wide">创作者社区</h2>
        </div>

        {/* Empty state illustrations */}
        <div className="flex-1 flex flex-col items-center justify-center mt-12 pb-24">
          <MonochromeEmptyMascot />
          <p className="text-[#7D818C] text-[12.5px] tracking-wide mt-7 mb-4">快来抢占“沙发帖”吧</p>
          <button className="bg-[#24357B] text-white font-[600] text-[13px] px-[26px] py-[9.5px] rounded-full tracking-wide shadow-[0_4px_12px_rgba(36,53,123,0.25)]">
            立即发帖
          </button>
        </div>

      </div>

      {/* ---------------- ACTIVE OVERLAY DIM ---------------- */}
      <div className="absolute inset-0 z-40 bg-black/60 pointer-events-none transition-opacity" />

      {/* ---------------- BOTTOM SHEET MODAL ---------------- */}
      <PostActionSheet />

    </div>
  );
};

export default CreatorCommunityModalPage;
