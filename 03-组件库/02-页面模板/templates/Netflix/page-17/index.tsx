import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, ChevronDown } from 'lucide-react';
import './style.css';

/**
 * Procedural Poster generator
 */
const Poster = ({ title, titleColor="text-white", titleNode, topTitle, bgGrad="from-[#1A1A1A] to-[#111111]", bgVector, alignment="justify-end", customStyle="w-full aspect-[2/3]", overlay=true, children }) => (
    <div className={`${customStyle} relative bg-[#1A1A1A] overflow-hidden break-inside-avoid block transform transition-transform hover:scale-[1.02] cursor-pointer`}>
        {/* Synthetic background vector / gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGrad} mix-blend-normal z-0`} />
        {bgVector && <div className="absolute inset-0 z-0">{bgVector}</div>}
        
        {/* Fake ambient texture overlay to make it feel like a real poster */}
        {overlay && (
            <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-15 pointer-events-none z-10">
                <filter id="noise17">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100" height="150" filter="url(#noise17)" />
            </svg>
        )}

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col ${alignment == 'justify-between' ? 'justify-between' : 'justify-end'} items-center text-center px-1 pb-2 z-20`}>
            {topTitle && alignment === 'justify-between' && (
                <span className="text-[#E50914] font-[900] text-[8px] tracking-[1.5px] pt-1">
                    {topTitle}
                </span>
            )}
            {topTitle && alignment !== 'justify-between' && (
                <div className="absolute top-1.5 left-0 w-full flex justify-center">
                    <span className="text-[#E50914] font-[900] text-[7.5px] tracking-[1.5px] drop-shadow-md z-30">
                        {topTitle}
                    </span>
                </div>
            )}
            
            {titleNode ? titleNode : (
                <span className={`${titleColor} font-[900] uppercase leading-[1.05] opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                    {title}
                </span>
            )}
        </div>
        
        {children}
    </div>
);

/**
 * @name Netflix 'My List' Collection View (Page 17)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar & Custom Header */}
      <div className="absolute top-0 w-full z-40 bg-black/95 backdrop-blur-md pb-2 border-b border-[#222]">
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:02</span>
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

          {/* Action Header: N Logo + My List Chevron */}
          <div className="flex items-center px-4 pt-1 pb-1">
              {/* Synthetic Netflix 'N' Logo */}
              <div className="mr-3">
                  <svg className="w-[18px] h-[32px]" viewBox="0 0 24 40" fill="none">
                      <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                  </svg>
              </div>
              <div className="flex items-center gap-[1px] cursor-pointer active:opacity-70 transition-opacity">
                  <span className="text-white font-[600] text-[18.5px] tracking-tight">My List</span>
                  <ChevronDown size={22} strokeWidth={2.5} className="text-white mt-[2px] ml-0.5 opacity-95" />
              </div>
          </div>
      </div>

      {/* 2. Main Body Grid (Scrollable) */}
      <div className="flex-1 overflow-y-auto pt-[94px] pb-[100px] bg-[#121212]">
          
          <div className="grid grid-cols-3 gap-[6px] px-[6px] w-full">
              
              {/* ROW 1 */}

              {/* SHERLOCK */}
              <Poster 
                  bgGrad="from-[#5E686D] via-[#4A5D6B] to-[#141A22]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90 mix-blend-luminosity">
                          <rect x="25" y="25" width="50" height="80" fill="#7C8F9F" opacity="0.3" rx="2" />
                          {/* Watson (standing left) */}
                          <path d="M15,95 L30,45 L45,45 L50,95 Z" fill="#2E3940" />
                          <circle cx="35" cy="35" r="10" fill="#E1C4B5" opacity="0.8" />
                          {/* Sherlock (sitting right/center) */}
                          <path d="M30,150 L45,95 L85,95 L100,150 Z" fill="#151A22" />
                          <circle cx="65" cy="80" r="12" fill="#E1C4B5" />
                          <path d="M50,150 L65,110 L80,150 Z" fill="#1C212B" />
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-[6px] w-full flex justify-center">
                          <span className="text-white fill-white font-[500] text-[16.5px] font-['Arial'] tracking-[1.5px] drop-shadow-[0_2px_4px_black]">SHERLOCK</span>
                      </div>
                  }
              >
                  {/* BBC Logo Badge */}
                  <div className="absolute top-[6px] left-[6px] bg-[#121212] border-[1px] border-white/90 flex text-center z-30 opacity-95">
                      <span className="text-white font-serif font-bold text-[8px] leading-none px-[3px] py-[1.5px] uppercase tracking-wide">BBC</span>
                  </div>
              </Poster>

              {/* BLACK MIRROR BANDERSNATCH */}
              <Poster 
                  bgGrad="from-[#E3DCD1] via-[#A89885] to-[#121516]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-[0.95]">
                          <path d="M20,60 Q50,0 80,60 L75,40 Q50,-10 25,40 Z" fill="#E1CFB0" /> {/* Hair */}
                          <circle cx="50" cy="65" r="32" fill="#E8C9AA" /> {/* Face */}
                          {/* Retro Glasses */}
                          <rect x="23" y="55" width="22" height="18" fill="none" stroke="#2C2C29" strokeWidth="1.5" rx="2" />
                          <rect x="55" y="55" width="22" height="18" fill="none" stroke="#2C2C29" strokeWidth="1.5" rx="2" />
                          <line x1="45" y1="62" x2="55" y2="62" stroke="#2C2C29" strokeWidth="1.5" />
                          <path d="M20,150 L30,105 L70,105 L80,150 Z" fill="#4B4B48" /> {/* Shirt */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-[2px] w-full flex flex-col items-center leading-none">
                          <span className="text-white font-[900] text-[12px] font-['Arial'] tracking-tight drop-shadow-[0_2px_2px_black] uppercase scale-x-[0.95]">Black Mirror</span>
                          <span className="text-white font-[900] text-[13px] font-['Arial'] tracking-tight drop-shadow-[0_2px_2px_black] uppercase scale-x-[0.95] mt-[-2px]">Bandersnatch</span>
                      </div>
                  }
              >
                  {/* Interactive Starburst Ribbon */}
                  <div className="absolute top-0 right-2 w-[22px] h-[34px] bg-[#E50914] z-30 flex justify-center pt-1.5 drop-shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                      <svg viewBox="0 0 100 100" className="w-[14px] h-[14px] fill-white drop-shadow-sm mt-0.5">
                          <path d="M50,-10 Q50,40 110,50 Q50,60 50,110 Q50,60 -10,50 Q50,40 50,-10 Z" />
                      </svg>
                  </div>
              </Poster>

              {/* BODYGUARD */}
              <Poster 
                  bgGrad="from-[#4D7185] via-[#2F4756] to-[#010609]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          <circle cx="65" cy="75" r="38" fill="#D3B19E" /> {/* Main face angled right */}
                          <path d="M10,150 L35,110 L95,110 L110,150 Z" fill="#1C2830" /> {/* Dark suit */}
                          
                          {/* Face detailing (Blood/Dirt) */}
                          <path d="M35,70 L45,50 L55,70 Z" fill="#751313" opacity="0.85" /> 
                          <path d="M85,95 L90,80 L95,95 Z" fill="#751313" opacity="0.85" />
                          <circle cx="45" cy="85" r="4" fill="#751313" opacity="0.7" />
                          
                          <path d="M30,55 Q65,30 95,55 L85,30 Q65,10 40,30 Z" fill="#1A1513" /> {/* Dark Hair contour */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-[8px] w-full flex justify-center">
                          <span className="text-white font-[400] text-[24px] font-['Arial'] tracking-[-1px] transform scale-y-[1.6] scale-x-[0.6] opacity-95 drop-shadow-[0_2px_4px_black]">BODYGUARD</span>
                      </div>
                  }
              />

              {/* ROW 2 */}

              {/* SUITS */}
              <Poster 
                  bgGrad="from-[#B0C5DB] via-[#65819A] to-[#121A24]"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-[0.85]">
                          {/* Rachel (Right) */}
                          <circle cx="75" cy="55" r="16" fill="#D4B4A4" /> {/* Face */}
                          <path d="M55,60 Q75,20 100,60 L100,100 L55,100 Z" fill="#18191B" /> {/* Hair flowing */}
                          <path d="M60,150 L75,100 L95,150 Z" fill="#2E4459" /> {/* Dress/Suit */}
                          
                          {/* Harvey/Mike (Left) */}
                          <circle cx="35" cy="55" r="15" fill="#E8CDBC" /> {/* Face */}
                          <path d="M0,150 L15,85 L55,85 L70,150 Z" fill="#101822" /> {/* Suit jacket */}
                          <path d="M15,85 L35,115 L55,85 Z" fill="#FFFFFF" /> {/* Shirt */}
                          <path d="M30,85 L35,125 L40,85 Z" fill="#2A323A" /> {/* Tie */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-[35px] w-full flex justify-center">
                          <span className="text-[#FFCD00] font-[900] text-[34px] font-['Arial'] tracking-tighter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] opacity-100">
                              SUITS
                          </span>
                      </div>
                  }
              />

              {/* BLACK MIRROR (Arkangel) */}
              <Poster 
                  bgGrad="from-[#A9C3C8] via-[#5C899E] to-[#172D3A]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-[0.85]">
                          {/* Clinical environment circles */}
                          <circle cx="50" cy="110" r="35" fill="#7EAAB8" />
                          <circle cx="50" cy="110" r="28" fill="#A8D1DD" />
                          
                          {/* Child in chair */}
                          <path d="M40,150 L45,105 L55,105 L60,150 Z" fill="#8C343D" /> {/* Maroon tights/pants */}
                          <path d="M40,105 L45,85 L55,85 L60,105 Z" fill="#D3A760" /> {/* Yellow sweater */}
                          <circle cx="50" cy="80" r="11" fill="#EBE0C5" /> {/* Blonde child head */}
                          
                          {/* Scientist on left */}
                          <path d="M-10,150 L10,65 L35,65 L30,150 Z" fill="#EAF1F3" /> {/* Lab coat */}
                          <circle cx="15" cy="45" r="14" fill="#18181A" /> {/* Dark hair/head */}
                          <path d="M25,85 L44,93" stroke="#87B0BF" strokeWidth="4" /> {/* Arm with tablet/needle */}
                      </svg>
                  }
                  titleNode={
                      <div className="absolute bottom-[40px] w-full flex justify-center">
                          <span className="text-[#FFFFFF] font-[900] text-[13px] font-['Arial'] tracking-tight drop-shadow-[0_2px_4px_black] uppercase scale-x-[0.95]">
                              BLACK MIRROR
                          </span>
                      </div>
                  }
              />

              {/* R2C3: Empty cell, background bleeds naturally since it's the end of my list */}
              
          </div>
      </div>

      {/* 3. Bottom Tab Bar Navigation */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          {/* HOME TAB IS ACTIVE */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <Home size={24} strokeWidth={2.5} className="text-white" />
              <span className="text-[10px] text-white font-bold">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Search</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">More</span>
          </button>

      </div>

      {/* Global iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none"></div>

    </div>
  );
}
