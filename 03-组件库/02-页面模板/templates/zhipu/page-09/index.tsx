import '../style.css';
import React from 'react';

const MyAgentsEmptyPage = () => (
  <div className="flex flex-col h-full bg-white relative">
    
    {/* Nav Header */}
    <div className="flex justify-between items-center px-5 pt-[10px] pb-2 shrink-0">
      <button className="w-[32px] h-[32px] flex items-center justify-center -ml-2 active:bg-gray-100 rounded-full transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="text-[16px] font-[600] text-[#111111] tracking-wide relative left-[1px]">
        我的智能体
      </h1>
      <div className="w-[32px] h-[32px]" /> {/* Spacer to balance title perfectly */}
    </div>

    {/* Central Empty State Area */}
    <div className="flex-1 flex flex-col justify-center items-center pb-[140px]">
      
      {/* Visual Illustration Elements Container */}
      <div className="relative w-[156px] h-[106px] flex items-center justify-center -ml-5">
        
        {/* Left Dashed Ring Character */}
        <div className="absolute left-[3px] top-1/2 transform -translate-y-1/2">
          <svg width="84" height="84" viewBox="0 0 100 100">
            {/* Symmetrical Dashed Boundary */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#A8B4CB" strokeWidth="5.5" strokeDasharray="14 16" strokeLinecap="round" transform="rotate(-8 50 50)" />
            {/* Pill Eyes */}
            <rect x="35" y="38" width="7" height="15" rx="3.5" fill="#A8B4CB" />
            <rect x="58" y="38" width="7" height="15" rx="3.5" fill="#A8B4CB" />
          </svg>
        </div>

        {/* Right Dizzy Blob Character */}
        <div className="absolute right-[-12px] bottom-[16px]">
          <svg width="74" height="74" viewBox="0 0 100 100">
            {/* Base Blob Body */}
            <circle cx="50" cy="55" r="38" fill="#E4E5EA" />
            {/* Top jagged forehead mark / crack */}
            <path d="M 22 36 Q 30 46 45 35 Q 58 28 68 40" fill="none" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
            {/* Dizzy left eye */}
            <path d="M 38 52 L 40 60" stroke="#111" strokeWidth="5.5" strokeLinecap="round" />
            {/* Dizzy right eye */}
            <path d="M 52 48 L 56 56" stroke="#111" strokeWidth="5.5" strokeLinecap="round" />
            {/* Small mouth dot */}
            <circle cx="48" cy="74" r="3" fill="#111" />
          </svg>
          
          {/* Accent Burst Sparks Top Right */}
          <div className="absolute top-[-30%] right-[-30%]">
             <svg width="50" height="50" viewBox="0 0 100 100">
               {/* Ascending Left Spark */}
               <path d="M 30 70 L 22 46" stroke="#CFD5E2" strokeWidth="5.5" strokeLinecap="round" />
               {/* Ascending Right Spark */}
               <path d="M 50 60 L 72 40" stroke="#CFD5E2" strokeWidth="5.5" strokeLinecap="round" />
               {/* Lower Right Horizontal Spark */}
               <path d="M 58 82 L 86 86" stroke="#CFD5E2" strokeWidth="5.5" strokeLinecap="round" />
             </svg>
          </div>
        </div>

      </div>

      {/* Description Text */}
      <p className="text-[13px] font-[400] text-[#9A9FB0] tracking-wide mt-[28px] pl-[5px]">
        快去创建你的专属智能体
      </p>

    </div>

    {/* Fixed Floating CTA Bottom Bar */}
    <div className="absolute bottom-[22px] w-full px-[22px] flex flex-col items-center bg-white pt-4 z-50">
      <button className="w-full h-[52px] bg-gradient-to-r from-[#214CF3] to-[#8130E7] text-white rounded-full font-[600] text-[14.5px] tracking-widest flex items-center justify-center shadow-[0_6px_20px_rgba(33,76,243,0.35)] active:scale-[0.98] transition-transform">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-[6px] -mt-[1px]">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        创建智能体
      </button>
      
      {/* iOS Space */}
      <div className="w-[134px] h-[5px] bg-[#111] rounded-full mt-[20px] mb-[2px]" />
    </div>

  </div>
);

const ZhipuMyAgentsPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- HARD STATUS BAR (Z-50 FRONT) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-black tracking-tight mt-0.5">
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

      {/* ---------------- MAIN APP LAYER ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[48px] w-full h-full bg-white">
         <MyAgentsEmptyPage />
      </div>

    </div>
  );
};

export default ZhipuMyAgentsPage;
