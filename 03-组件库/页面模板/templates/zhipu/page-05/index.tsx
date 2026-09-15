import '../style.css';
import React from 'react';

// CSS SVG construct of the Magical Pencil asset on the Tooltip
const MagicalStylizedPencil = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="drop-shadow-sm scale-[1.15]">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4AF4DD" />
        <stop offset="50%" stopColor="#7E70FF" />
        <stop offset="100%" stopColor="#FF6DB8" />
      </linearGradient>
      <linearGradient id="tipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE0AA" />
        <stop offset="100%" stopColor="#F9BC5C" />
      </linearGradient>
    </defs>
    
    {/* Body Base Segment */}
    <path d="M 68 28 L 78 38 L 38 78 L 28 68 Z" fill="url(#bodyGradient)" />
    
    {/* White 3D Reflection Streak on Body */}
    <path d="M 63 35 L 71 43 L 41 73 L 33 65 Z" fill="rgba(255,255,255,0.35)" />

    {/* Lead Cone / Tip Base */}
    <polygon points="28,68 38,78 14,88" fill="url(#tipGradient)" />
    
    {/* Lead Tip Black Marker */}
    <polygon points="20,83 26,83 14,88" fill="#292F3A" />

    {/* Ferrule (Metal Gold Ring near Eraser) */}
    <path d="M 68 28 L 78 38 L 84 32 L 74 22 Z" fill="#F8C946" />
    
    {/* Eraser */}
    <path d="M 74 22 L 84 32 C 90 26 87 18 82 13 Z" fill="#FE82A5" />

    {/* Surrounding Ambient Sparkles */}
    <path d="M 88 44 Q 92 44 92 40 Q 92 44 96 44 Q 92 44 92 48 Q 92 44 88 44" fill="white" />
    <path d="M 18 64 Q 21 64 21 61 Q 21 64 24 64 Q 21 64 21 67 Q 21 64 18 64" fill="white" />
  </svg>
);

const MonochromeEmptyMascot = () => (
  <div className="relative w-[84px] h-[84px] flex items-center justify-center">
    {/* Grey Background Body element mimicking the zhipu ai mascot */}
    <div 
      className="relative z-20 w-[64px] h-[60px]"
      style={{
        borderRadius: '45% 42% 43% 46%',
        background: 'linear-gradient(135deg, #F8FAFB 0%, #D1D6E0 60%, #B8C0CB 100%)',
        boxShadow: 'inset -6px -6px 15px rgba(184,192,203,0.7), inset 4px 4px 8px rgba(255,255,255,1), 0 10px 20px rgba(184,192,203,0.25)',
        transform: 'rotate(-6deg)'
      }}
    >
      <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
      {/* Eye structure */}
      <div className="absolute top-[40%] right-[24%] flex space-x-[4.5px] rotate-[10deg]">
        <div className="w-[7.5px] h-[8.5px] bg-[#43454B] rounded-[2.5px] transform -skew-x-[6deg]" />
        <div className="w-[6.5px] h-[7.5px] bg-[#43454B] rounded-[2.5px] transform -skew-x-[6deg] mt-[1.5px]" />
      </div>
    </div>
    
    {/* Floating Prop: Big right circle */}
    <div className="absolute -right-[14px] -top-[4px] w-[14px] h-[14px] bg-[#AAB2BE] rounded-full shadow-sm" />
    
    {/* Floating Prop: Tiny middle circle */}
    <div className="absolute left-[54%] -top-[18px] w-[7px] h-[7px] bg-[#BEC4D2] rounded-full shadow-sm" />
    
    {/* Floating Prop: Left geometric asterisk */}
    <svg className="absolute -left-[18px] -top-[4px] w-[18px] h-[18px] text-[#AEB4C2] transform -rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20 M2 12h20 M4.9 4.9l14.2 14.2 M4.9 19.1l14.2-14.2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  </div>
);

const ZhipuCreatorEmptyLayoutPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-[#F7F8FA] overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- BACKGROUND AMBIENT GLOWS ---------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-80px] left-[-60px] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(230,220,250,0.6)_0%,rgba(247,248,250,0)_60%)]" />
         <div className="absolute top-[-60px] right-[-140px] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(215,240,255,0.5)_0%,rgba(247,248,250,0)_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col pt-[14px] flex-1">
        
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
            <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
               <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
               <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black" />
               <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="black" />
            </svg>
          </div>
        </div>

        {/* Dynamic header Nav arrow */}
        <div className="px-5 pt-4 pb-2 mt-2 flex items-center">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-[-4px]">
              <path d="M15 18l-6-6 6-6" />
           </svg>
        </div>

        {/* Profile Info Header */}
        <div className="flex px-[22px] items-center mt-[14px]">
           {/* Detailed Pure-CSS Avatar Construction matching the screenshot */}
           <div className="w-[62px] h-[62px] rounded-full border-[1.5px] border-white/60 overflow-hidden shrink-0 bg-gradient-to-br from-[#E2EFE9] via-[#DEEBE5] to-[#B6C7BE] relative flex items-end justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="absolute bottom-0 left-[-20%] w-[140%] h-[50%] bg-[#6EA392] rounded-t-[100%] opacity-70 border-t border-[#8ABAAC]/30" />
              <div className="absolute top-[18%] right-[14%] w-[24px] h-[24px] bg-gradient-to-br from-[#FFEA91] to-[#FCCD43] rounded-full shadow-[0_0_8px_rgba(255,234,145,0.4)]" />
              
              <div className="relative w-[18px] h-[34px] bg-gradient-to-br from-[#24354D] to-[#122033] rounded-t-[10px] flex flex-col items-center">
                 <div className="absolute -top-[13px] w-[14px] h-[14px] bg-[#FCD3B3] rounded-full shadow-sm" />
                 <div className="absolute -top-[14px] w-[14.5px] h-[6px] bg-[#1C202B] rounded-t-[10px]" />
              </div>
              
              <div className="absolute top-[15%] left-[8%] opacity-30 flex flex-col">
                  <span className="text-[5px] font-[600] text-white tracking-[0.2em] leading-none">天气搭配</span>
                  <span className="text-[4px] font-[600] text-white tracking-[0.2em] leading-none mt-[2px]">STYLIST</span>
              </div>
           </div>
           
           <div className="ml-[14px]">
              <h1 className="text-[18px] font-[600] text-[#222222] tracking-wide leading-tight">天气搭配师</h1>
              <p className="text-[#999FA9] text-[11.5px] mt-[4px] tracking-wide font-[400]">来自: 美叶 &nbsp;&nbsp; 智能体热度: 0</p>
           </div>
        </div>

        {/* Description body */}
        <div className="px-[22px] mt-[26px] mb-2">
          <p className="text-[#333333] text-[13.5px] font-[400] leading-[1.6] tracking-wide">
            一键获取天气与穿搭建议，让你每天正能量满满！
          </p>
          <p className="text-[#9CA1AC] text-[11.5px] mt-[8px] tracking-wide">
            社区内容有可能由AI生成，请您注意识别
          </p>
        </div>

        {/* Community Board section */}
        <div className="px-[22px] mt-[32px] mb-8">
          <h2 className="text-[15.5px] font-[600] text-[#222222] tracking-wide">创作者社区</h2>
        </div>

        {/* Empty state illustrations */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-[60px]">
          <MonochromeEmptyMascot />
          <p className="text-[#727885] text-[12.5px] tracking-wide mt-7 mb-[18px]">快来抢占“沙发帖”吧</p>
          <button className="bg-[#3B4CF3] text-white font-[600] text-[13px] px-[26px] py-[9px] rounded-full tracking-wide shadow-[0_4px_16px_rgba(59,76,243,0.3)] active:scale-95 transition-transform">
            立即发帖
          </button>
        </div>

      </div>

      {/* ---------------- FIXED FLOATING BOTTOM UI ---------------- */}
      <div className="absolute right-4 bottom-[40px] flex items-end justify-end space-x-[8px] z-50 pointer-events-none">
         
         {/* Tooltip Bubble */}
         <div className="relative pointer-events-auto">
            <div className="bg-gradient-to-br from-[#5377FB] via-[#4863F5] to-[#394EF3] rounded-[14px] px-[18px] pt-[12px] pb-[14px] shadow-[0_8px_20px_rgba(57,78,243,0.3)] max-w-[200px] leading-[1.55]">
               <span className="text-[#4BFBE2] font-[500] text-[12.5px] tracking-wide">两种发帖模式</span>
               <span className="text-white font-[500] text-[12.5px] tracking-wide">任你选，快来发布你的首帖吧！</span>
            </div>
            {/* The little pointer arrow */}
            <div className="absolute right-[-6px] top-1/2 -mt-[6px] w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-[#394DF3]" />
            {/* The Floating Magic Pencil Badge */}
            <div className="absolute -bottom-[12px] right-[4px]">
               <MagicalStylizedPencil />
            </div>
         </div>

         {/* FAB Button */}
         <button className="w-[58px] h-[58px] bg-gradient-to-b from-[#3335F3] to-[#2522DB] rounded-full flex items-center justify-center shrink-0 shadow-[0_8px_20px_rgba(42,39,229,0.4)] pointer-events-auto active:scale-95 transition-transform mb-[6px]">
            {/* FAB Icon: Edit / Sketch SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transform translate-y-[1px]">
               <path d="M12 20h9"/>
               <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
         </button>
      </div>

      {/* Standard iOS Home Indicator */}
      <div className="absolute bottom-0 w-full flex justify-center pb-2 pt-1 bg-transparent z-40">
        <div className="w-[134px] h-[5px] bg-[#121212] rounded-full mix-blend-difference opacity-50" />
      </div>

    </div>
  );
};

export default ZhipuCreatorEmptyLayoutPage;
