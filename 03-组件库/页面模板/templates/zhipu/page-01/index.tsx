import '../style.css';
import React from 'react';

const Spark = ({ size, color, className }: { size: number; color: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 0C12.5 6.5 17.5 11.5 24 12C17.5 12.5 12.5 17.5 12 24C11.5 17.5 6.5 12.5 0 12C6.5 11.5 11.5 6.5 12 0Z" />
  </svg>
);

const ZhipuSplash: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen bg-white relative flex flex-col justify-between overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* Top Status Bar */}
      <div className="flex justify-between items-center px-6 pt-4 z-20 w-full shrink-0">
        <div className="text-[13.5px] font-[500] text-black tracking-tight mt-0.5">
          17:51
        </div>
        <div className="flex items-center space-x-[5px]">
          {/* Cellular */}
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="black">
            <rect x="0" y="7" width="3" height="4" rx="1" />
            <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
            <rect x="9" y="2" width="3" height="9" rx="1" />
            <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          {/* WiFi */}
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
            <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
            <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          {/* Battery */}
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
            <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black" />
            <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="black" />
          </svg>
        </div>
      </div>

      {/* Main Illustration Area */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none">
        
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center -mt-16 sm:-mt-24">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-[20%] left-[20%] w-[100px] h-[100px] bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[20%] w-[80px] h-[80px] bg-purple-100/40 rounded-full blur-2xl"></div>

          {/* Center Mascot (Blue Glass Cube Node) */}
          <div 
            className="absolute z-20 w-[140px] h-[135px] animate-[pulse_4s_ease-in-out_infinite]"
            style={{
              borderRadius: '45% 42% 43% 46%',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #C9EEFF 60%, #90D6FF 100%)',
              boxShadow: 'inset -12px -12px 30px rgba(135,210,255,0.7), inset 8px 8px 16px rgba(255,255,255,1), 0 20px 40px rgba(185,230,255,0.4)',
              transform: 'rotate(-8deg)'
            }}
          >
            {/* Soft inner core glow */}
            <div className="absolute inset-2 rounded-full bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.9)_0%,rgba(164,233,255,0)_60%)] opacity-80" />
            
            {/* Eyes */}
            <div className="absolute top-[40%] right-[22%] flex space-x-[8px] rotate-[10deg]">
              <div 
                className="w-[14px] h-[14px] bg-[#102AAB] rounded-[3px]"
                style={{ transform: 'skewX(-6deg)' }}
              />
              <div 
                className="w-[13px] h-[13px] bg-[#102AAB] rounded-[3px] mt-[1px]"
                style={{ transform: 'skewX(-6deg)' }}
              />
            </div>
          </div>

          {/* --------- Floating Elements --------- */}

          {/* 1. Large Top-Left Spark */}
          <div className="absolute top-[16%] left-[26%] transform -rotate-12 animate-[bounce_5s_ease-in-out_infinite_reverse]">
            <Spark size={34} color="#BDEFFA" />
          </div>

          {/* 2. Top-Right Video Camera */}
          <div className="absolute top-[26%] right-[16%] flex animate-[bounce_4s_ease-in-out_infinite]">
             <div className="w-[32px] h-[22px] bg-gradient-to-br from-[#A5E3FF] to-[#7ED2FF] rounded-[6px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),0_4px_10px_rgba(126,210,255,0.3)] transform rotate-[10deg] flex items-center justify-center relative">
               <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-[5px] h-[10px] bg-[#7ED2FF] rounded-r-[3px]"></div>
               <Spark size={8} color="white" className="relative left-[1px]" />
             </div>
          </div>

          {/* 3. Small Top Spark */}
          <div className="absolute top-[28%] right-[42%] transform rotate-12">
            <Spark size={16} color="#C4F4F3" />
          </div>

          {/* 4. Left Pencil */}
          <div className="absolute left-[12%] top-[40%] flex flex-col items-center transform -rotate-[24deg] animate-[bounce_6s_ease-in-out_infinite]">
            <div className="w-[13px] h-[22px] bg-gradient-to-b from-[#C1F9CB] to-[#80EAA0] rounded-t-[3px] shadow-[inset_1px_0_4px_rgba(255,255,255,0.6),0_4px_8px_rgba(128,234,160,0.3)] relative overflow-hidden">
               <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/5" />
            </div>
            <div 
              className="w-[13px] h-[10px] bg-gradient-to-b from-[#EBF7EE] to-[#E2FADE] relative shadow-[0_2px_4px_rgba(128,234,160,0.2)]" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
               <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#80EAA0] rounded-full" />
            </div>
          </div>

          {/* 5. Small Left Spark */}
          <div className="absolute left-[15%] top-[54%] transform -rotate-45">
             <Spark size={18} color="#94F1B7" />
          </div>

          {/* 6. Far Left Purple Dot (Ambient) */}
          <div className="absolute left-[20%] top-[62%] w-[5px] h-[5px] rounded-full bg-[#E4D1FC] blur-[1px]"></div>

          {/* 7. Right Gallery/Image Icon */}
          <div className="absolute right-[22%] bottom-[32%] top-auto animate-[bounce_5.5s_ease-in-out_infinite_reverse]">
            <div className="w-[36px] h-[36px] bg-gradient-to-br from-[#E2BFFF] to-[#C99FFF] rounded-[8px] transform -rotate-[15deg] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),0_6px_12px_rgba(201,159,255,0.3)] p-[8px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="white" stroke="none" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>

          {/* 8. Bottom Code Pill */}
          <div className="absolute left-[32%] bottom-[16%] animate-[bounce_4.5s_ease-in-out_infinite]">
             <div className="px-[12px] py-[6px] bg-gradient-to-r from-[#A7F8C4] to-[#73EB9C] rounded-[16px] transform rotate-[-8deg] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),0_6px_12px_rgba(115,235,156,0.3)] flex items-center justify-center">
                <span className="text-white font-[600] text-[13.5px] tracking-widest relative top-[0.5px]">
                  &lt;/&gt;
                </span>
             </div>
          </div>

        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col items-center pb-2 z-20 shrink-0 mb-4 sm:mb-8">
        {/* Brand */}
        <div className="flex items-center space-x-[10px] mb-[26px]">
          {/* Logo Mark: Stylized Swirl Ring */}
          <div className="w-[26px] h-[26px] text-[#2B4BFB] relative flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              {/* Outer rotated ring */}
              <ellipse 
                cx="20" cy="20" 
                rx="16" ry="11" 
                transform="rotate(-30 20 20)" 
                stroke="currentColor" 
                strokeWidth="5" 
                className="opacity-90"
              />
              {/* Inner breaking path simulating the 3D overlap */}
              <path 
                d="M6 26 C12 34 26 36 34 22 C37 16 35 11 31 8" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          {/* Brand Text */}
          <span className="font-[600] text-[20px] tracking-[0.14em] text-[#121626]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            智谱清言
          </span>
        </div>

        {/* Home Indicator */}
        <div className="w-[134px] h-[5px] bg-[#121212] rounded-full" />
      </div>

    </div>
  );
};

export default ZhipuSplash;
