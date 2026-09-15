import '../style.css';
import React from 'react';

const MyWorksEmptyPage = () => (
  <div className="flex flex-col h-full bg-white relative">
    
    {/* Primary Navigation Header */}
    <div className="flex justify-between items-center px-[22px] pt-[8px] pb-[6px] shrink-0">
      {/* Back Chevron */}
      <button className="flex items-center justify-center -ml-2 active:opacity-60 transition-opacity p-[4px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      {/* Title */}
      <h1 className="text-[16px] font-[600] text-[#111111] tracking-wide relative left-[1px]">
        我的作品
      </h1>
      
      {/* Right Padding Balance */}
      <div className="w-[32px] h-[32px]" />
    </div>

    {/* Secondary Navigation Tabs */}
    <div className="flex w-full mt-1 mb-[4px] shrink-0">
      <div className="flex-1 flex justify-center cursor-pointer active:opacity-70 transition-opacity">
        <div className="text-[14px] font-[400] text-[#787D8E] tracking-widest py-2">
          图库
        </div>
      </div>
      <div className="flex-1 flex justify-center cursor-pointer active:opacity-70 transition-opacity">
        <div className="text-[14px] font-[600] text-[#111111] tracking-widest py-2 relative flex flex-col items-center">
          视频库
          <div className="absolute bottom-[2px] w-[18px] h-[3px] bg-[#111] rounded-full" />
        </div>
      </div>
    </div>

    {/* Central Empty State Area */}
    <div className="flex-1 flex flex-col justify-center items-center pb-[160px]">
      
      {/* Visual Illustration Elements Container */}
      <div className="relative w-[156px] h-[130px] flex items-center justify-center ml-[4px]">
        
        {/* Core Mascot Body (Winking Face Blob) */}
        <div className="relative w-[68px] h-[68px] z-10 flex mt-2">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5F6F8] to-[#DDE1EA] rounded-full shadow-[inset_-3px_-4px_10px_rgba(0,0,0,0.03)]" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-[6deg]">
             {/* Left slanted eye \ */}
             <path d="M 34 38 L 44 48" stroke="#111" strokeWidth="6.5" strokeLinecap="round" />
             {/* Right winking eye < */}
             <path d="M 76 38 L 58 46 L 72 56" fill="none" stroke="#111" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
             {/* Smile mouth curve */}
             <path d="M 40 66 Q 54 74 66 64" fill="none" stroke="#111" strokeWidth="6.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Tilted Picture Gallery Graphic - Left */}
        <div className="absolute left-[3px] top-[14px] transform -rotate-[22deg]">
          <svg width="42" height="42" viewBox="0 0 100 100">
            {/* Pastel base block */}
            <rect x="10" y="20" width="80" height="60" rx="14" fill="#A5AFCC" />
            {/* Cutout mountain range */}
            <path d="M 10 65 L 35 40 L 55 60 L 70 45 L 90 65 Z" fill="#FFFFFF" opacity="0.9" />
            {/* Cutout sun coordinate */}
            <circle cx="32" cy="35" r="7" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </div>

        {/* Tilted Video Camera Graphic - Right */}
        <div className="absolute right-[1px] top-[26px] transform -rotate-[16deg]">
          <svg width="42" height="42" viewBox="0 0 100 100">
            {/* Main camera body */}
            <rect x="14" y="25" width="55" height="44" rx="14" fill="#A5AFCC" />
            {/* Lens snout */}
            <path d="M 85 28 L 60 38 V 56 L 85 66 C 88 68 93 66 93 62 V 32 C 93 28 88 26 85 28 Z" fill="#A5AFCC" />
            {/* Inner tiny lens ring */}
            <circle cx="45" cy="46" r="6" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </div>

        {/* Ambient Floating Sparkles */}
        {/* Top Center Asterisk */}
        <svg width="18" height="18" viewBox="0 0 100 100" stroke="#A5AFCC" strokeWidth="7" strokeLinecap="round" className="absolute top-[-2px] left-[52%] transform -translate-x-1/2">
          <line x1="50" y1="20" x2="50" y2="80" />
          <line x1="24" y1="35" x2="76" y2="65" />
          <line x1="24" y1="65" x2="76" y2="35" />
        </svg>
        
        {/* Left Edge Diamond */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#A5AFCC" className="absolute top-[40%] left-[-4px]">
           <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
        </svg>
        
        {/* Lower Right Diamond */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#A5AFCC" className="absolute bottom-[0px] right-[10px]">
           <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
        </svg>
        
        {/* Lower Left Tiny Plus/Cross */}
        <svg width="11" height="11" viewBox="0 0 100 100" stroke="#A5AFCC" strokeWidth="8" strokeLinecap="round" className="absolute bottom-[0px] left-[22px]">
          <line x1="50" y1="20" x2="50" y2="80" />
          <line x1="20" y1="50" x2="80" y2="50" />
        </svg>

      </div>

      {/* Description Text */}
      <p className="text-[12.5px] font-[400] text-[#9A9FB0] tracking-wide mt-[20px] ml-[3px]">
        快去进行创作吧～
      </p>

    </div>
  </div>
);

const ZhipuMyWorksPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- HARD STATUS BAR (Z-50 FRONT) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-black tracking-tight mt-0.5">
          18:13
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

      {/* ---------------- MAIN APP CONTENT LAYER ---------------- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-[48px] w-full h-full bg-white">
         <MyWorksEmptyPage />
         
         {/* iOS Floating Home Indicator Placeholder */}
         <div className="absolute bottom-[8px] w-full flex justify-center pb-2 pt-[22px] pointer-events-none">
           <div className="w-[134px] h-[5px] bg-[#111] rounded-full opacity-90" />
         </div>
      </div>

    </div>
  );
};

export default ZhipuMyWorksPage;
