import React from 'react';
import { Search as SearchIcon, XCircle, Globe, Mic } from 'lucide-react';
import './style.css';

/**
 * Procedural Poster generator
 */
const Poster = ({ title, titleColor="text-white", titleNode, topTitle, bgGrad="from-[#1A1A1A] to-[#111111]", bgVector, alignment="justify-end", fontClass="text-[14px]", customStyle="w-full aspect-[2/3]", overlay=true }) => (
    <div className={`${customStyle} relative bg-[#1A1A1A] overflow-hidden break-inside-avoid block transform transition-transform hover:scale-[1.02] cursor-pointer`}>
        {/* Synthetic background vector / gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGrad} mix-blend-normal z-0`} />
        {bgVector && <div className="absolute inset-0 z-0">{bgVector}</div>}
        
        {/* Fake ambient texture overlay to make it feel like a real poster */}
        {overlay && (
            <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-15 pointer-events-none z-10">
                <filter id="noise14">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
                </filter>
                <rect width="100" height="150" filter="url(#noise14)" />
            </svg>
        )}

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col ${alignment == 'justify-between' ? 'justify-between' : 'justify-end'} items-center text-center px-1 pb-2 z-20`}>
            {topTitle && alignment === 'justify-between' && (
                <span className="text-[#E50914] font-[900] text-[8px] tracking-[1.5px] pt-1 pt-[6px]">
                    {topTitle}
                </span>
            )}
            {topTitle && alignment !== 'justify-between' && (
                <div className="absolute top-1 left-0 w-full flex justify-center">
                    <span className="text-[#E50914] font-[900] text-[7.5px] tracking-[1.5px] drop-shadow-md">
                        {topTitle}
                    </span>
                </div>
            )}
            
            {titleNode ? titleNode : (
                <span className={`${titleColor} font-[900] uppercase leading-[1.05] opacity-95 ${fontClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                    {title}
                </span>
            )}
        </div>
    </div>
);

/**
 * Functional iOS Dark Mode Keyboard Simulation
 */
const IosKeyboard = () => (
    <div className="w-full bg-[#1A1A1A]/90 backdrop-blur-2xl pb-2 pt-3 flex flex-col gap-[12px] z-50 fixed bottom-0 px-[3px] border-t border-white/5">
        
        {/* Row 1 - QWERTY */}
        <div className="flex justify-center gap-[6px] px-0 w-full">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
                <div key={k} className="h-[43px] bg-[#616161] flex-1 rounded-[5px] flex items-center justify-center text-white text-[24px] font-normal shadow-[0_1px_0_rgba(0,0,0,0.7)] pb-1 cursor-pointer hover:bg-[#777]">
                    {k}
                </div>
            ))}
        </div>
        
        {/* Row 2 - ASDFGHJKL */}
        <div className="flex justify-center gap-[6px] px-[16px] w-full">
            {['a','s','d','f','g','h','j','k','l'].map(k => (
                <div key={k} className="h-[43px] bg-[#616161] flex-1 rounded-[5px] flex items-center justify-center text-white text-[24px] font-normal shadow-[0_1px_0_rgba(0,0,0,0.7)] pb-1 cursor-pointer hover:bg-[#777]">
                    {k}
                </div>
            ))}
        </div>
        
        {/* Row 3 - SHIFT ZXCVBNM DEL */}
        <div className="flex justify-between gap-[6px] w-full">
            <div className="h-[43px] w-[45px] bg-[#434343] rounded-[5px] flex items-center justify-center text-white shadow-[0_1px_0_rgba(0,0,0,0.7)] shrink-0 cursor-pointer active:bg-white active:text-black">
                <svg width="20" height="18" viewBox="0 0 22 20" fill="none" className="stroke-current stroke-2 mt-1">
                    <path d="M11 2 L2 10 H7 V18 H15 V10 H20 Z" strokeLinejoin="round"/>
                </svg>
            </div>
            
            <div className="flex justify-center gap-[6px] flex-1">
                 {['z','x','c','v','b','n','m'].map(k => (
                    <div key={k} className="h-[43px] bg-[#616161] flex-1 max-w-[34px] rounded-[5px] flex items-center justify-center text-white text-[24px] font-normal shadow-[0_1px_0_rgba(0,0,0,0.7)] pb-1 cursor-pointer hover:bg-[#777]">
                        {k}
                    </div>
                 ))}
            </div>
            
            <div className="h-[43px] w-[45px] bg-[#434343] rounded-[5px] flex items-center justify-center text-[#EBEBEB] shadow-[0_1px_0_rgba(0,0,0,0.7)] shrink-0 px-1 cursor-pointer">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="stroke-current stroke-2">
                    <path d="M7 2 L1 9 L7 16 H22 V2 Z" strokeLinejoin="round"/>
                    <path d="M11 6 L17 12 M17 6 L11 12"/>
                </svg>
            </div>
        </div>

        {/* Row 4 - NUMBERS SPACE RETURN */}
        <div className="flex justify-center gap-[6px] h-[43px] w-full">
            <div className="w-[90px] bg-[#434343] rounded-[5px] flex items-center justify-center text-[#EBEBEB] text-[16px] font-normal tracking-wide shadow-[0_1px_0_rgba(0,0,0,0.7)] cursor-pointer">
                123
            </div>
            <div className="flex-1 bg-[#616161] rounded-[5px] flex items-center justify-center text-white text-[16px] shadow-[0_1px_0_rgba(0,0,0,0.7)] cursor-pointer">
                space
            </div>
            <div className="w-[90px] bg-[#434343] rounded-[5px] flex items-center justify-center text-[#EBEBEB] text-[16px] font-normal tracking-wide shadow-[0_1px_0_rgba(0,0,0,0.7)] cursor-pointer">
                return
            </div>
        </div>

        {/* Outer Bottom Utility Row (Globe, Mic, Home Indicator) */}
        <div className="h-[46px] w-full flex justify-between items-start pl-4 pr-5 pt-3 relative">
            <Globe size={26} strokeWidth={1} className="text-[#B3B3B3] cursor-pointer" />
            
            {/* Native Home Bar Indicator */}
            <div className="w-[134px] h-[5px] bg-white rounded-full mt-4 absolute left-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <Mic size={26} strokeWidth={1} className="text-[#B3B3B3] cursor-pointer" />
        </div>
    </div>
);

/**
 * @name Netflix Active Auto-Complete Grid (Page 14)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. TOP HEADER LAYER (High Z-Index) */}
      <div className="absolute top-0 w-full z-40 bg-black">
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:03</span>
            </div>
            <div className="flex items-center gap-[5px] opacity-90">
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

          {/* Search Input Row with Cancel */}
          <div className="px-2 pb-3 flex items-center justify-between gap-1 w-full bg-[#121212] pt-1">
              <div className="bg-[#333333] h-[36px] rounded-[4px] flex items-center px-2 flex-1">
                  <SearchIcon size={20} strokeWidth={2.5} className="text-[#8C8C8C] shrink-0" />
                  <input 
                      type="text" 
                      value="the end of" 
                      readOnly 
                      className="bg-transparent border-none outline-none flex-1 font-[400] text-[16px] text-white ml-2 placeholder-[#8C8C8C]"
                  />
                  <XCircle size={16} strokeWidth={2.5} className="fill-[#8C8C8C] text-[#333333] shrink-0" />
              </div>
              <button className="text-white font-[400] text-[16px] px-2 font-serif opacity-90 tracking-wide hover:opacity-100">
                  Cancel
              </button>
          </div>
          
          {/* Section Header: Films & TV (Immediately below input in this state) */}
          <div className="w-full h-[32px] bg-[#2E2E2E] flex items-center px-[8px] shadow-sm">
              <span className="text-[#CBCBCB] font-[800] text-[15px] tracking-tight">Films & TV</span>
          </div>
      </div>

      {/* 2. MAIN RESULTS GRID */}
      <div className="flex-1 overflow-y-auto pt-[124px] pb-[320px] bg-black">
          <div className="grid grid-cols-3 gap-[6px] px-[6px] mt-1.5 w-full">
              
              {/* Row 1 */}
              
              {/* THE END OF THE F***ING WORLD */}
              <Poster 
                  bgGrad="from-[#2A2925] via-[#4A1719] to-[#601416]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          {/* Face 1 (Upside down, top right) */}
                          <path d="M50,0 Q70,40 100,0 Z" fill="#DDBBA4" />
                          <circle cx="75" cy="-5" r="20" fill="#2E2319" /> {/* Dark Hair */}
                          
                          {/* Face 2 (Bottom left) */}
                          <path d="M-10,130 Q10,150 40,150 L20,90 Z" fill="#D32F2F" /> {/* Red Shirt */}
                          <circle cx="20" cy="110" r="18" fill="#E6C8B5" /> {/* Face */}
                          <circle cx="20" cy="110" r="19" fill="none" stroke="#601416" strokeWidth="2" /> {/* Blood trail */}
                      </svg>
                  }
                  titleNode={
                      <div className="w-full h-full relative font-['Arial']">
                          <div className="absolute top-[28px] left-[-4px] rotate-[-22deg] origin-left">
                              <span className="text-white font-[900] text-[18px] drop-shadow-[0_4px_4px_black] tracking-tight whitespace-nowrap">THE END OF THE</span>
                          </div>
                          <div className="absolute bottom-[28px] left-[0px] rotate-[15deg] origin-left">
                              <span className="text-white font-[900] text-[18px] drop-shadow-[0_4px_4px_black] tracking-tighter whitespace-nowrap leading-none break-all w-[150%] text-left">F<span className="text-[12px]">X X X</span>ING WORLD</span>
                          </div>
                      </div>
                  }
              />
              
              {/* SEX EDUCATION */}
              <Poster 
                  bgGrad="from-[#CC9A78] via-[#857161] to-[#122A2F]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          <rect x="0" y="80" width="100" height="70" fill="#992A3A" /> {/* Red shirt */}
                          <circle cx="50" cy="80" r="28" fill="#ECB4BB" /> {/* Pink Hair block */}
                          <circle cx="50" cy="90" r="20" fill="#E6CDB8" /> {/* Face */}
                          <path d="M30,130 L70,120 L80,150 L20,150 Z" fill="#A8D6D9" /> {/* Book */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute top-8 left-0 w-full flex justify-center">
                          <span className="text-white font-['Arial'] font-bold text-[18px] tracking-[-0.8px] scale-y-125 opacity-90">
                              SEX EDUCATION
                          </span>
                      </div>
                  }
              />

              {/* What do you do at the end of the world... */}
              <Poster 
                  bgGrad="from-[#E39868] via-[#B87C54] to-[#3B281B]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-95">
                          <circle cx="60" cy="100" r="25" fill="#3D2924" /> {/* Anime hair mass */}
                          <path d="M50,150 L40,110 L80,110 L90,150 Z" fill="#1A1813" /> {/* Coat */}
                          <path d="M40,110 L60,80 L70,110 Z" fill="#EBD1BA" /> {/* Face profile */}
                          
                          {/* Spiky hair lines */}
                          <path d="M40,100 L30,90 M40,80 L20,60 M55,70 L50,50" stroke="#3D2924" strokeWidth="4" />
                      </svg>
                  }
                  titleNode={
                      <div className="absolute top-2 w-full flex flex-col items-center px-[2px]">
                          <span className="text-white font-serif text-[9.5px] leading-[1.2] drop-shadow-md text-center opacity-95 font-medium italic">
                              What do you do at<br/>the end of the world?<br/>Are you busy?<br/>Will you save us?
                          </span>
                      </div>
                  }
              />

              {/* Row 2 */}
              
              {/* the End of the World CULT */}
              <Poster 
                  bgGrad="from-[#82A5CF] via-[#527AB3] to-[#0A0A0A]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-95">
                          <circle cx="50" cy="70" r="30" fill="#EAEAEA" /> {/* White hood */}
                          <circle cx="45" cy="75" r="20" fill="#DCA88D" /> {/* Face */}
                          <path d="M20,95 Q40,120 70,95 Z" fill="#6A4633" /> {/* Beard */}
                          <path d="M20,150 Q50,100 80,150 Z" fill="#EAEAEA" /> {/* Robe */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute top-[25%] left-0 w-full flex flex-col items-center rotate-[-4deg]">
                          <span className="text-[#FFC400] font-serif text-[11px] font-bold drop-shadow-[0_2px_2px_black] tracking-tight mr-2">the <span className="text-[14px]">End</span> of the <span className="text-[14px]">World</span></span>
                          <span className="text-[#FFFFFF] font-['Impact'] text-[34px] tracking-widest drop-shadow-[0_3px_5px_black] leading-none mt-[-2px] ml-4">CULT</span>
                      </div>
                  }
              />

              {/* DANGANRONPA 3 */}
              <Poster 
                  bgGrad="from-[#E8E8E8] via-[#FFFFFF] to-[#AAAAAA]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full">
                          {/* Hot Pink Blood/Splash Graphic */}
                          <path d="M100,20 Q80,50 100,80 Q50,120 100,150 L100,150 L100,0 Z" fill="#E70B8F" />
                          <circle cx="85" cy="45" r="25" fill="#E70B8F" />
                          <circle cx="50" cy="115" r="35" fill="#E70B8F" />
                          
                          {/* Anime Guy Body */}
                          <path d="M20,150 L40,80 L60,80 L80,150 Z" fill="#2E3333" /> {/* Suit */}
                          <path d="M45,80 L50,100 L55,80 Z" fill="#EAD098" /> {/* Tie */}
                          <circle cx="50" cy="65" r="14" fill="#EBD1BA" /> {/* Head */}
                          
                          {/* Messy anime hair */}
                          <path d="M30,60 L50,40 L70,60 M40,50 L50,30 L60,50 M35,65 L25,50" stroke="#3D3730" strokeWidth="3" />
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-2 w-full flex flex-col items-center justify-center bg-white/70 py-1">
                          <span className="text-black font-[900] text-[13px] tracking-[-0.5px] scale-x-110">DANGANRONPA</span>
                      </div>
                  }
              />

              {/* PIRATES */}
              <Poster 
                  bgGrad="from-[#5A5241] via-[#35433C] to-[#182B29]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-80">
                          {/* Sky / Sea horizon */}
                          <rect x="0" y="80" width="100" height="70" fill="#2D4D47" />
                          
                          {/* Ships silhouette */}
                          <path d="M10,130 L30,90 L50,130 Z" fill="#14110A" />
                          <path d="M40,140 L60,100 L80,140 Z" fill="#14110A" />

                          {/* Faces row at top */}
                          <circle cx="20" cy="40" r="12" fill="#DCA88D" />
                          <circle cx="50" cy="35" r="16" fill="#DCA88D" /> {/* Jack Sparrow */}
                          <circle cx="80" cy="40" r="12" fill="#DCA88D" />
                      </svg>
                  }
                  titleNode={
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                          <span className="text-white font-serif italic text-[8px] opacity-80 mb-[-2px]">Disney</span>
                          <span className="text-[#DEB887] font-serif text-[18px] font-[800] leading-[0.85] tracking-tight drop-shadow-[0_2px_4px_black] px-1 text-center font-variant-caps">PIRATES OF THE<br/><span className="text-[12px] text-white">CARIBBEAN</span><br/><span className="text-[7px]">AT WORLD'S END</span></span>
                      </div>
                  }
              />

              {/* Row 3 (Partially blocked by Keyboard) */}
              <Poster bgGrad="from-[#88D37F] to-[#2E5E26]" topTitle="NETFLIX" />
              <Poster bgGrad="from-[#211915] to-[#0D0B0A]" topTitle="NETFLIX" />
              <Poster bgGrad="from-[#CFC1A6] to-[#806B56]" topTitle="NETFLIX" />

          </div>
      </div>

      {/* 3. NATIVE IOS KEYBOARD LAYER */}
      <IosKeyboard />

    </div>
  );
}
