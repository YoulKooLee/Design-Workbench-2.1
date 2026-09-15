import React from 'react';
import { Home, Search, Download, Menu, Search as SearchIcon, XCircle } from 'lucide-react';
import './style.css';

/**
 * Procedural Poster component mimicking the Netflix visual weight
 */
const Poster = ({ title, titleColor="text-white", titleNode, topTitle, bgGrad="from-[#1A1A1A] to-[#111111]", bgVector, alignment="justify-end", fontClass="text-[14px]", customStyle="w-full aspect-[2/3]", offset=null }) => (
    <div className={`${customStyle} relative bg-[#1A1A1A] overflow-hidden break-inside-avoid block transform transition-transform hover:scale-[1.02] cursor-pointer`}>
        {/* Synthetic background vector / gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGrad} mix-blend-normal z-0`} />
        {bgVector && <div className="absolute inset-0 z-0">{bgVector}</div>}
        
        {/* Fake ambient texture overlay to make it feel like a real poster */}
        <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-10 pointer-events-none z-10">
            <filter id="noise13">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100" height="150" filter="url(#noise13)" />
        </svg>

        {/* Content Overlay */}
        <div className={`absolute inset-0 flex flex-col ${alignment == 'justify-between' ? 'justify-between' : 'justify-end'} items-center text-center px-1 pb-2 z-20 ${offset ? offset : ''}`}>
            {topTitle && alignment === 'justify-between' && (
                <span className="text-[#E50914] font-[900] text-[8px] tracking-[1.5px] pt-1">
                    {topTitle}
                </span>
            )}
            {topTitle && alignment !== 'justify-between' && (
                <div className="absolute top-2 left-0 w-full flex justify-center">
                    <span className="text-[#E50914] font-[900] text-[7.5px] tracking-[1.5px] drop-shadow-md">
                        {topTitle}
                    </span>
                </div>
            )}
            
            {titleNode ? titleNode : (
                <span 
                    className={`${titleColor} font-[900] uppercase leading-[1.05] opacity-95 ${fontClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`} 
                >
                    {title}
                </span>
            )}
        </div>
    </div>
);

/**
 * @name Netflix Active Search View (Page 13)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar & Search Input (Fixed Header) */}
      <div className="absolute top-0 w-full z-40 bg-black">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:03</span>
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

          {/* Search Input Bar */}
          <div className="px-[6px] pb-3">
              <div className="bg-[#333333] h-[34px] rounded-[4px] flex items-center px-2">
                  <SearchIcon size={18} strokeWidth={2.5} className="text-[#8C8C8C] shrink-0" />
                  <input 
                      type="text" 
                      value="the end of" 
                      readOnly 
                      className="bg-transparent border-none outline-none flex-1 font-medium text-[15px] text-[#EBEBEB] ml-2 placeholder-[#8C8C8C]"
                  />
                  <XCircle size={16} strokeWidth={2} className="text-[#8C8C8C] shrink-0 fill-[#404040]" />
              </div>
          </div>
      </div>

      {/* 2. Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[86px] pb-24 bg-black relative">
          
          {/* Scroll overlap shadow generator */}
          <div className="absolute top-[86px] w-full h-8 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>

          {/* TOP ROW: Cut-off Posters (Simulating previous scrolled content) */}
          <div className="grid grid-cols-3 gap-[6px] px-[6px] w-full">
              
              {/* Fake Bojack Horseman bottom half */}
              <div className="w-full h-[72px] bg-[#E8DAA6] relative overflow-hidden flex flex-col justify-end items-center pb-2">
                 {/* Vector simulation of bojack/todd */}
                 <svg viewBox="0 0 100 80" className="absolute bottom-0 w-full opacity-90 drop-shadow-md">
                     <path d="M20,80 L30,40 Q40,30 50,40 L60,80" fill="#E8B0BA" /> {/* Pink shirt */}
                     <circle cx="50" cy="25" r="20" fill="#FFDB58" /> {/* Face */}
                     <path d="M10,80 L20,60 L30,80" fill="#4CAF50" /> {/* Background element */}
                 </svg>
                 <div className="bg-[#E50914] text-white font-[900] text-[8px] tracking-[0.5px] px-[6px] py-[2px] rounded-[2px] z-10 pb-[3px]">
                     NEW EPISODE
                 </div>
                 {/* Shadow gradient pushing up from the header below */}
                 <div className="absolute bottom-0 w-full h-[15px] bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              </div>

              {/* Fake OITNB bottom half */}
              <div className="w-full h-[72px] bg-[#3B3C3E] relative overflow-hidden flex items-end">
                 <svg viewBox="0 0 100 80" className="absolute bottom-0 w-full opacity-90">
                     <rect x="0" y="50" width="100" height="30" fill="#2B2C2E" /> {/* Floor */}
                     {/* Orange jumpsuits/legs sitting */}
                     <path d="M10,20 L25,80 M30,20 L20,80" stroke="#EB5E28" strokeWidth="6" />
                     <path d="M40,20 L55,80 M60,20 L50,80" stroke="#EB5E28" strokeWidth="6" />
                     <path d="M70,20 L85,80 M90,20 L80,80" stroke="#EB5E28" strokeWidth="6" />
                     {/* Cuffs */}
                     <line x1="20" y1="70" x2="25" y2="70" stroke="#FFFFFF" strokeWidth="2" />
                     <line x1="50" y1="70" x2="55" y2="70" stroke="#FFFFFF" strokeWidth="2" />
                 </svg>
                 <div className="absolute bottom-0 w-full h-[15px] bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              </div>

              {/* Fake chairs/blue bottom half */}
              <div className="w-full h-[72px] bg-[#1E8FA6] relative overflow-hidden flex items-end">
                 <svg viewBox="0 0 100 80" className="absolute bottom-0 w-full opacity-90">
                     <path d="M0,40 Q50,90 100,40 L100,80 L0,80 Z" fill="#4BB3C7" /> {/* Chair curve */}
                     <path d="M30,0 L40,80 M70,0 L60,80" stroke="#7A2D35" strokeWidth="8" /> {/* Legs */}
                 </svg>
                 <div className="absolute bottom-0 w-full h-[15px] bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              </div>

          </div>

          {/* Section Header: Films & TV */}
          <div className="w-full h-[32px] bg-[#2E2E2E] mt-[4px] flex items-center px-[8px] sticky z-30 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-[#CBCBCB] font-[800] text-[15px] tracking-tight">Films & TV</span>
          </div>

          {/* Result Grid: TEEN DRAMA DOMINANCE */}
          <div className="grid grid-cols-3 gap-[6px] px-[6px] mt-[6px] w-full">
              
              {/* Row 1 */}
              {/* ELITE */}
              <Poster 
                  bgGrad="from-[#B4AFA9] via-[#85807B] to-[#5C5753]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          <circle cx="50" cy="65" r="45" fill="#E6CDB8" /> {/* Chest */}
                          <path d="M30,35 Q50,15 70,35 L65,60 Q50,40 35,60 Z" fill="#E6CDB8" /> {/* Shoulders/Neck */}
                          <circle cx="50" cy="25" r="14" fill="#D3BAA4" /> {/* Head shadow */}
                      </svg>
                  }
                  titleNode={
                      <div className="flex font-[900] text-[28px] text-white tracking-[2px] mb-1">
                          <span>ELIT</span>
                          <span style={{ display:'inline-block', transform: 'scaleX(-1)' }}>E</span>
                      </div>
                  }
              />
              
              {/* Sierra Burgess */}
              <Poster 
                  bgGrad="from-[#F8D62D] to-[#F2CA17]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-80">
                          <line x1="20" y1="0" x2="20" y2="150" stroke="#D1A70B" strokeWidth="1" />
                          <line x1="40" y1="0" x2="40" y2="150" stroke="#D1A70B" strokeWidth="1" />
                          <line x1="60" y1="0" x2="60" y2="150" stroke="#D1A70B" strokeWidth="1" />
                          <line x1="80" y1="0" x2="80" y2="150" stroke="#D1A70B" strokeWidth="1" />
                          {/* Person Left */}
                          <path d="M-10,150 L20,100 L40,150" fill="#E3E0DB" />
                          {/* Person Right */}
                          <path d="M60,150 L80,90 L110,150" fill="#4B82A8" />
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-center">
                          <span className="text-[#E72023] font-[900] text-[18px] font-serif leading-none tracking-tight">Sierra</span>
                          <span className="text-[#E72023] font-[900] text-[18px] font-serif leading-none tracking-tight mb-[20px]">Burgess</span>
                          <span className="text-[#323232] font-semibold text-[11px] font-serif absolute bottom-[18px]">is a</span>
                          <span className="text-[#E72023] font-[900] text-[22px] font-serif absolute bottom-[0px]">Loser</span>
                      </div>
                  }
                  offset="pb-5"
              />

              {/* To All The Boys */}
              <Poster 
                  bgGrad="from-[#1B3639] via-[#2F474A] to-[#8F554E]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-80">
                          {/* Bed */}
                          <rect x="0" y="90" width="100" height="60" fill="#D3AAA0" /> 
                          <path d="M20,110 Q50,90 80,110 L100,150 L0,150 Z" fill="#EAD6CF" />
                          {/* Person */}
                          <circle cx="50" cy="80" r="16" fill="#141113" /> {/* Dark Hair */}
                          <circle cx="50" cy="85" r="12" fill="#DFBCA5" /> {/* Face */}
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-center -rotate-2">
                          <span className="text-white font-[400] text-[12px] font-serif italic drop-shadow-md">To All the Boys</span>
                          <span className="text-white font-[400] text-[10px] font-serif italic drop-shadow-md">I've Loved Before</span>
                      </div>
                  }
                  offset="pb-[6px]"
              />

              {/* Row 2 */}
              {/* Kissing Booth */}
              <Poster 
                  bgGrad="from-[#6E2E2A] via-[#AF6F58] to-[#DFC17A]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          {/* Face Left */}
                          <path d="M-10,150 L20,70 L30,150" fill="#E9E7E6" />
                          <circle cx="10" cy="60" r="18" fill="#583C2F" /> {/* Hair */}
                          {/* Face Right (Girl biting pen) */}
                          <path d="M40,150 L60,80 L90,150" fill="#A8B4D4" />
                          <circle cx="70" cy="70" r="18" fill="#A46E52" /> {/* Hair */}
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-center w-full px-1">
                          <span className="text-[#FFDB00] font-[900] text-[16px] leading-[0.9] tracking-tighter drop-shadow-md w-full bg-blend-darken filter">THE</span>
                          <span className="text-[#FFDB00] font-[900] text-[20px] leading-[0.9] tracking-tighter drop-shadow-md w-full relative -space-y-2">KISSING <br/> BOOTH</span>
                      </div>
                  }
                  offset="pb-4"
              />

              {/* Everything Sucks! */}
              <Poster 
                  bgGrad="from-[#DCE0EA] via-[#BEC6D4] to-[#7B8B9B]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-90">
                          {/* Tray */}
                          <rect x="10" y="100" width="80" height="30" fill="#E22729" rx="2" />
                          <circle cx="30" cy="115" r="8" fill="#F4F4F4" />
                          <circle cx="70" cy="115" r="8" fill="#EAC454" />
                          {/* Girl */}
                          <path d="M30,150 L50,50 L70,150" fill="#D29986" />
                          <circle cx="50" cy="40" r="16" fill="#846059" /> {/* Hair */}
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-center w-full absolute bottom-[30px] rotate-[-2deg]">
                          {/* Graffiti text simulation */}
                          <span className="text-white font-[900] text-[16px] leading-[0.95] tracking-tight stroke-black stroke-[1px] drop-shadow-[0_0_2px_black]" style={{ WebkitTextStroke: '2px black' }}>EVERYTHING</span>
                          <span className="text-white font-[900] text-[22px] leading-[0.8] tracking-tight stroke-black stroke-[1px] drop-shadow-[0_0_2px_black]" style={{ WebkitTextStroke: '2px black' }}>SUCKS!</span>
                      </div>
                  }
                  offset="pb-10"
              />

              {/* BABY */}
              <Poster 
                  bgGrad="from-[#211B18] via-[#352F2D] to-[#121212]"
                  topTitle="NETFLIX"
                  bgVector={
                      <svg viewBox="0 0 100 150" className="w-full h-full opacity-80">
                          <path d="M0,150 L20,70 L40,150 Z" fill="#6682A6" /> {/* Denim */}
                          <circle cx="15" cy="65" r="16" fill="#CFB79A" /> {/* Blonde Hair */}

                          <path d="M50,150 L80,60 L110,150 Z" fill="#0A0A0A" /> {/* Black shirt */}
                          <circle cx="85" cy="55" r="16" fill="#3D2924" /> {/* Dark Hair */}
                      </svg>
                  }
                  titleNode={
                      <div className="w-full flex justify-center pb-2">
                          <span className="text-[#E70B8F] font-[300] text-[40px] italic font-serif leading-none tracking-tight drop-shadow-[0_0_10px_rgba(231,11,143,0.5)]">
                              B<span className="text-[34px]">A</span>BY
                          </span>
                      </div>
                  }
              />

          </div>

          {/* Section 3: Explore Titles Related to... */}
          <div className="w-full mt-4">
              <div className="h-[34px] bg-[#2E2E2E] flex items-center px-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  <span className="text-[#CBCBCB] font-[800] text-[15px] tracking-tight">Explore titles related to</span>
              </div>
              
              <div className="flex flex-col px-4 bg-black pt-1">
                  <div className="py-3 border-b border-[#1A1A1A] flex items-center">
                      <span className="text-[#EBEBEB] text-[15.5px] tracking-[-0.1px] font-medium leading-none mt-1">The End-of-the-World</span>
                  </div>
                  <div className="py-3 flex items-center">
                      <span className="text-[#EBEBEB] text-[15.5px] tracking-[-0.1px] font-medium leading-none mt-1">End-of-the-World Movies</span>
                  </div>
              </div>
          </div>

      </div>

      {/* 4. Bottom Tab Bar (Netflix Standard Native) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60">
              <Home size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Home</span>
          </button>
          
          {/* SEARCH TAB IS ACTIVE */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <Search size={24} strokeWidth={2.5} className="text-white" />
              <span className="text-[10px] text-white font-bold">Search</span>
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
