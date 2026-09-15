import React from 'react';
import './style.css';

/**
 * Procedural Poster component mimicking the visual weight of the original images
 */
const Poster = ({ title, aspect = "h-48", gradientFrom, gradientTo, fontSize = "14px", topTitle = "NETFLIX" }) => (
    <div className={`w-full rounded-[3px] overflow-hidden ${aspect} relative mb-2 break-inside-avoid block transform transition-transform hover:scale-[1.02] cursor-pointer`}>
        <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
            <linearGradient id={`grad-${title.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
            <rect width="100" height="150" fill={`url(#grad-${title.replace(/\s/g,'')})`} />
            
            {/* Fake silhouettes/shapes for texture */}
            <circle cx="50" cy="50" r="30" fill="#000" fillOpacity="0.1" />
            <circle cx="30" cy="100" r="25" fill="#000" fillOpacity="0.2" />
            <polygon points="0,150 100,60 100,150" fill="#000" fillOpacity="0.15" />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-between items-center text-center p-2">
            {topTitle && (
                <span className="text-[#E50914] font-bold text-[8px] tracking-[1px] pt-1">
                    {topTitle}
                </span>
            )}
            <span 
                className="text-white font-[900] tracking-tight uppercase leading-none opacity-90 drop-shadow-md pb-2" 
                style={{ fontSize, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            >
                {title}
            </span>
        </div>
    </div>
);

/**
 * @name Netflix Splash / Walkthrough Landing (Page 07)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar (Transparent overlay) */}
      <div className="absolute top-0 w-full z-40">
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white drop-shadow-md">
            <div className="flex items-center gap-1">
              <span>2:54</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="flex gap-[3px] items-end h-[12px]">
                 <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
              </div>
              <div className="relative transform scale-90 -mr-1">
                <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                  <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                  <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                </svg>
                <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
              </div>
            </div>
          </div>
      </div>

      {/* 2. Help Button Overlay */}
      <div className="absolute top-10 right-4 z-40 drop-shadow-md cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-white font-bold text-[15.5px] px-2 py-1">Help</span>
      </div>

      {/* 3. Masonry Grid Background Layer */}
      <div className="absolute inset-0 overflow-hidden w-full h-[120vh] -top-10">
          {/* Columns container (using multi-column layout for dynamic masonry) */}
          <div className="columns-3 gap-[6px] px-[6px] pt-4 w-[110%] -ml-[5%]">
              
              {/* Column 1 */}
              <div>
                  <Poster title="BOSS BABY" aspect="h-64" gradientFrom="#2A4B27" gradientTo="#0D200A" fontSize="16px" topTitle="NETFLIX" />
                  <Poster title="BROOKLYN NINE-NINE" aspect="h-72" gradientFrom="#D1B000" gradientTo="#2B2B2B" fontSize="20px" topTitle="" />
                  <Poster title="TIDYING UP" aspect="h-56" gradientFrom="#4A2F2B" gradientTo="#1A0D0B" fontSize="18px" />
                  <Poster title="WILD" aspect="h-64" gradientFrom="#1F1533" gradientTo="#080312" fontSize="18px" />
              </div>

              {/* Column 2 */}
              <div className="pt-8">
                  <Poster title="BODYGUARD" aspect="h-32" gradientFrom="#1F3A4D" gradientTo="#0B151F" fontSize="13px" topTitle="NETFLIX" />
                  <Poster title="F R I E N D S" aspect="h-[90px]" gradientFrom="#2A648C" gradientTo="#0F283B" fontSize="10px" topTitle="" />
                  <Poster title="KINGDOM" aspect="h-64" gradientFrom="#42392E" gradientTo="#120D08" fontSize="16px" topTitle="NETFLIX" />
                  <Poster title="BLACK MIRROR" aspect="h-48" gradientFrom="#16181C" gradientTo="#000000" fontSize="14px" />
                  <Poster title="DRAGONS" aspect="h-40" gradientFrom="#3B2312" gradientTo="#1A0E05" fontSize="12px" topTitle="" />
              </div>

              {/* Column 3 */}
              <div className="pt-16">
                  <Poster title="ALHAMBRA" aspect="h-60" gradientFrom="#664627" gradientTo="#24160A" fontSize="16px" topTitle="" />
                  <Poster title="SEX EDUCATION" aspect="h-72" gradientFrom="#7A605B" gradientTo="#2B1D19" fontSize="22px" topTitle="NETFLIX" />
                  <Poster title="UMBRELLA ACADEMY" aspect="h-56" gradientFrom="#2B2B2B" gradientTo="#0F0F0F" fontSize="18px" topTitle="NETFLIX" />
              </div>
          </div>

          {/* Core Fade-to-Black Gradient Vignette */}
          {/* Obscures the center heavily for text readability, and softens bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/95 to-black/80 pointer-events-none" style={{ backgroundPositionY: '0', backgroundSize: '100% 100%' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000] to-[#000000] opacity-80 pointer-events-none" style={{ marginTop: '35vh' }}></div>
      </div>

      {/* 4. Foreground Content Block (Centered) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-8 z-30 pt-16">
          <h1 className="text-white font-[900] text-[31px] leading-[1.05] text-center tracking-[-0.5px] whitespace-nowrap">
              Unlimited<br/>
              entertainment, one<br/>
              low price
          </h1>
          <p className="text-white text-center text-[17px] font-medium leading-[1.3] mt-5 px-4 tracking-[-0.3px]">
              Stream and download as much as you want, no extra fees.
          </p>

          {/* Spacer to push dots/button to safe bottom area, though absolute positioning works better */}
      </div>

      {/* 5. Bottom Action Block (Sticky/Fixed to bottom bounds) */}
      <div className="absolute bottom-0 w-full flex flex-col items-center px-[4%] pb-9 z-40">
          
          {/* Pagination Indicators Container */}
          <div className="flex gap-[10px] mb-8">
             <div className="w-[7.5px] h-[7.5px] rounded-full bg-[#666666]"></div>
             <div className="w-[7.5px] h-[7.5px] rounded-full bg-[#666666]"></div>
             <div className="w-[7.5px] h-[7.5px] rounded-full bg-[#666666]"></div>
             {/* Active Red Dot */}
             <div className="w-[7.5px] h-[7.5px] rounded-full bg-[#E50914] transform scale-[1.05] shadow-[0_0_8px_rgba(229,9,20,0.6)]"></div>
          </div>

          {/* Primary Submit CTA */}
          <button className="bg-[#E50914] text-white font-bold text-[16px] py-[15px] rounded-[3px] w-full hover:bg-[#F40612] active:bg-[#B20710] transition-colors shadow-md">
             SIGN IN
          </button>
      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none"></div>

    </div>
  );
}
