import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * @name Netflix "Show Details" Header State (Hero Poster & Episodes View) - Page 31
 */
export default function NetflixApp() {

  // Pure SVG Representation of the BBC Sherlock Vertical Hero Asset
  const sherlockPosterSvg = (
      <svg viewBox="0 0 100 150" className="w-full h-full object-cover">
          <rect width="100" height="150" fill="#202A30" />
          {/* Gritty Wall Texture */}
          <path d="M0,0 L100,0 L100,150 L0,150 Z" fill="#2A3842" opacity="0.6" />
          <path d="M10,0 L10,150 M30,0 L30,150 L70,0 L70,150 M90,0 L90,150" stroke="#182329" strokeWidth="2.5" opacity="0.5"/>
          {/* Spatial Depth Box (Door Frame Abstract) */}
          <rect x="25" y="25" width="50" height="125" fill="none" stroke="#10181C" strokeWidth="4" />
          <rect x="23" y="23" width="54" height="127" fill="none" stroke="#3D4A52" strokeWidth="1" opacity="0.4"/>
          
          {/* Watson Figure (Standing Back Left) */}
          <path d="M35,100 L40,40 Q45,35 55,40 L60,100 Z" fill="#181C1E" /> 
          <path d="M43,35 Q48,25 53,35 Q50,45 45,45 Q40,45 43,35 Z" fill="#B38A7E" /> 
          <path d="M43,35 C45,25 55,25 53,35" fill="#888E91" /> 
          <path d="M45,46 Q48,40 51,46 L48,50 Z" fill="#EAEAEA" /> {/* Shirt collar peek */}

          {/* Sherlock Figure (Sitting Front Centerish) */}
          <path d="M25,120 L40,75 Q55,65 85,90 L95,120 Z" fill="#14191C" /> 
          <ellipse cx="60" cy="115" rx="18" ry="12" fill="#0C0D0E" /> {/* Dark Chair Form */}
          <path d="M45,85 L50,110 L55,85 Z" fill="#232B30" /> {/* Lapels */}
          <path d="M55,75 Q65,65 72,75 Q75,85 65,92 Q55,85 55,75 Z" fill="#DDB2A3" /> {/* Profile */}
          <path d="M55,75 C55,55 75,55 72,75" fill="#0A0908" /> {/* Hair mass */}
          <path d="M50,120 L65,88" stroke="#DDB2A3" strokeWidth="2.5" fill="none" strokeLinecap="round" /> {/* Reaching Hand/Violin abstract */}
          
          {/* Obfuscating Floor Fog / Vignette Gradient */}
          <path d="M0,80 Q50,60 100,80 L100,150 L0,150 Z" fill="#111517" opacity="0.85" />
      </svg>
  );

  // Pure SVG Representation of the Episode 1 Thumbnail (A Study in Pink)
  const ep1ThumbSvg = (
      <svg viewBox="0 0 160 90" className="w-[110%] h-[110%] -mt-[2%] -ml-[5%] object-cover">
           <rect width="160" height="90" fill="#EBF0F5" /> 
           <path d="M0,0 L70,0 Q60,45 70,90 L0,90 Z" fill="#121314" /> 
           
           {/* Subject Perspective Leaning over */}
           <path d="M45,0 L95,0 L125,40 Q115,65 85,90 L45,90 Z" fill="#21272E" /> 
           <circle cx="85" cy="40" r="20" fill="#111314" /> {/* Chunky dark scarf mask */}
           <path d="M75,40 L65,90 Q95,70 95,40 Z" fill="#16181A" />
           
           <path d="M100,45 Q125,30 140,55 Q125,85 105,80 Z" fill="#E8CCC0" /> {/* Face catching light */}
           <path d="M100,45 Q125,15 140,55" fill="none" stroke="#16181A" strokeWidth="14" /> {/* Messy dark mop */}
      </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#111111] text-white font-sans relative select-none">
      
      {/* 1. Global iOS OS Status Bar Payload */}
      <div className="w-full absolute top-0 z-50 pointer-events-none">
          <div className="flex justify-between items-center px-[28px] pt-[8px] pb-[6px] relative">
             <span className="text-[14px] font-bold tracking-[0.2px] text-white opacity-95 ml-[-4px] drop-shadow-[0_1px_2px_black]">3:00</span>
             <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px] drop-shadow-[0_1px_2px_black]">
                 <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                    <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
                    <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
                    <div className="w-[3px] h-[8.5px] bg-white rounded-sm"></div>
                    <div className="w-[3px] h-[11px] bg-white rounded-sm"></div>
                 </div>
                 <div className="relative transform scale-[0.80] -mr-1">
                     <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                         <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                         <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                     </svg>
                     <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-white rounded-[1.5px]"></div>
                 </div>
             </div>
          </div>
      </div>

      {/* 2. Scrollable Kinematic Core Viewport */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#141414]">
          
          {/* Top Hero Container (Poster + Dynamic Blur Background) */}
          <div className="relative w-full pt-[48px] pb-[8px]">
              {/* Volumetric Blur Lighting System (Dynamically reacting to Poster) */}
              <div className="absolute top-0 w-full h-[140%] bg-[#141414] overflow-hidden -z-10 pointer-events-none">
                   {/* Fake Lighting Nodes mimicking Poster Base */}
                   <div className="absolute top-[20%] left-[20%] w-[60%] h-[50%] bg-[#4A6478] opacity-[0.22] rounded-full" style={{ filter: 'blur(50px)' }}></div>
                   <div className="absolute top-[5%] right-[10%] w-[40%] h-[30%] bg-[#2A3842] opacity-[0.3] rounded-full" style={{ filter: 'blur(40px)' }}></div>
                   {/* Soft Dissolve Mask back to flat dark UI */}
                   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#141414]/90 to-[#141414]"></div>
              </div>
              
              {/* Modal Generic Close Action */}
              <div className="absolute top-[48px] right-[18px] z-50 pointer-events-auto">
                   <div className="w-[28px] h-[28px] rounded-full bg-[#1A1C1F]/60 flex items-center justify-center cursor-pointer shadow-md backdrop-blur-[12px] active:scale-95 transition-transform border border-white/5">
                       <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#FAFAFA] stroke-[2px] fill-none ml-[0.5px]">
                            <path d="M5 5l14 14M5 19L19 5" strokeLinecap="round" strokeLinejoin="miter" />
                       </svg>
                   </div>
              </div>

              {/* Master Box Art Root (Sherlock) */}
              <div className="relative w-[130px] mx-auto z-10 aspect-[2/3] shadow-[0_12px_32px_rgba(0,0,0,0.9)] rounded-[3px] overflow-hidden bg-[#2D3840]">
                  {sherlockPosterSvg}
                  
                  {/* Dynamic DOM Injected Logo Group (BBC Channel Block) */}
                  <div className="absolute top-[7px] left-[7px] flex gap-[1px] z-20">
                       <div className="w-[11.5px] h-[11.5px] bg-[#F2F2F2] flex justify-center items-center drop-shadow-sm">
                            <span className="text-[#1A1A1A] font-['Arial',sans-serif] font-[900] text-[8px] mt-[1px] ml-[0.5px] scale-x-[1.1]">B</span>
                       </div>
                       <div className="w-[11.5px] h-[11.5px] bg-[#F2F2F2] flex justify-center items-center drop-shadow-sm">
                            <span className="text-[#1A1A1A] font-['Arial',sans-serif] font-[900] text-[8px] mt-[1px] ml-[0.5px] scale-x-[1.1]">B</span>
                       </div>
                       <div className="w-[11.5px] h-[11.5px] bg-[#F2F2F2] flex justify-center items-center drop-shadow-sm">
                            <span className="text-[#1A1A1A] font-['Arial',sans-serif] font-[900] text-[8px] mt-[1px] ml-[0.5px] scale-x-[1.1]">C</span>
                       </div>
                  </div>

                  {/* Absolute Typographical Anchor */}
                  <div className="absolute inset-x-0 bottom-[14px] w-full flex justify-center drop-shadow-[0_3px_6px_black] z-20">
                       <span className="text-[#FAFAFA] font-sans font-[600] text-[18px] tracking-[1.5px] leading-none drop-shadow-[0_2px_8px_black]">
                           SHERLOCK
                       </span>
                  </div>
              </div>
              
              {/* Meta Array Line */}
              <div className="relative z-10 w-full flex justify-center items-center gap-[12px] mt-[18px] text-[#A3A3A3] text-[13px] font-[500]">
                  <span className="text-[#46D369] font-[700] tracking-tight text-[13.5px]">98% match</span>
                  <span>2017</span>
                  <span className="bg-[#3D3D3D] text-[#E8E8E8] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-none mb-[1px]">PG13</span>
                  <span>4 Series</span>
              </div>
          </div>

          {/* Primary Action Engagement Surface */}
          <div className="px-2 mb-[14px] pointer-events-auto">
              <button className="w-full bg-[#E50914] text-[#FFFFFF] rounded-[3px] py-[8px] flex justify-center items-center font-[700] text-[15px] tracking-tight shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:scale-95 transition-transform hover:bg-[#F21A25]">
                  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-[#FFFFFF] mr-[6px] pb-[1px]">
                       <path d="M7 5l13.5 7-13.5 7z" />
                  </svg>
                  Play
              </button>
          </div>

          {/* Core Descriptive Payload & Social Interactions */}
          <div className="px-[12px] mb-2 z-10 relative">
               <p className="text-[#F2F2F2] text-[14.5px] leading-[1.38] tracking-[-0.2px] font-[400] mb-[12px] drop-shadow-sm">
                   In this updated take on Sir Arthur Conan Doyle's beloved mystery tales, the eccentric sleuth prowls the streets of modern London in search of clues.
               </p>
               <div className="text-[#969696] text-[12px] leading-[1.35] font-[500] tracking-tight drop-shadow-sm">
                   <p>Cast: Benedict Cumberbatch, Martin Freeman, Una Stubbs</p>
                   <p className="mt-[2px]">Creators: Mark Gatiss, Steven Moffat</p>
               </div>
          </div>

          {/* Auxiliary Operations Flex Line */}
          <div className="flex justify-start px-[26px] mt-[20px] mb-2 gap-[60px] pointer-events-auto">
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] stroke-[#FFFFFF] stroke-[1.8px] fill-none mb-[5px]">
                      <path d="M5 12l4.5 4.5L19 7" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[2px]">My List</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-[#FFFFFF] stroke-[1.8px] fill-none mb-[6px]">
                       <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[1px]">Rate</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-[#FFFFFF] stroke-[1.8px] fill-none mb-[5px] ml-[2px]">
                       <path d="M12 15V3m0 0L8 7m4-4l4 4M2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[2px]">Share</span>
              </div>
          </div>

          {/* Sub-Classification Route Controllers (Tabs) - EPISODES Active State */}
          <div className="w-full flex items-center gap-[24px] px-[14px] mt-[14px] border-t-[1.5px] border-[#222222]">
              <div className="relative py-[14px] cursor-pointer">
                  <span className="text-[#FFFFFF] font-[700] tracking-[0.2px] text-[14.5px]">EPISODES</span>
                  {/* Indicator Highlight (Overriding standard bottom border to align flush against upper divisor) */}
                  <div className="absolute top-[-1.5px] left-0 w-[110%] -ml-[5%] h-[4px] bg-[#E50914] rounded-[1px] shadow-sm"></div>
              </div>
              <div className="relative py-[14px] cursor-pointer group">
                  <span className="text-[#8C8C8C] font-[700] tracking-[0.2px] text-[14.5px] group-active:text-[#FFFFFF] transition-colors">MORE LIKE THIS</span>
              </div>
          </div>

          {/* Sub-Route Map (Episodes Stream Array) */}
          <div className="w-full pb-[110px] bg-[#141414]">
              
              {/* Dynamic Season Selector Context */}
              <div className="px-[12px] pt-[12px] pb-[16px] z-20 pointer-events-auto">
                  <button className="flex items-center gap-[6px] text-[#E6E6E6] bg-transparent rounded-[3px] font-[500] text-[15px] tracking-[0.2px] opacity-95 hover:opacity-100 active:bg-white/5 px-1 py-1 -ml-1 transition-colors">
                      Series 1
                      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-[#E6E6E6] stroke-[2px] fill-none mt-[1px]">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </button>
              </div>

              {/* Single Episode Iterative Block (1. A Study in Pink) */}
              <div className="px-[14px] flex gap-[14px] items-center mb-6 pointer-events-auto cursor-pointer group hover:bg-[#1A1A1A] p-2 -mx-2 rounded-md transition-colors">
                  
                  {/* Aspect Locked Frame (Thumbnail) */}
                  <div className="relative w-[130px] aspect-[16/9] bg-[#1C1C1C] rounded-[3px] overflow-hidden flex-none shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {ep1ThumbSvg}
                      {/* Interaction Signal (Hardware Play Ring) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-active:scale-95 transition-transform">
                          <div className="w-[36px] h-[36px] rounded-full border-[1.5px] border-[#FAFAFA] bg-black/40 backdrop-blur-[2px] flex justify-center items-center pl-[2.5px] shadow-sm">
                              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#FAFAFA]">
                                  <path d="M7 5l13.5 7-13.5 7z" />
                              </svg>
                          </div>
                      </div>
                  </div>
                  
                  {/* Context Block Payload */}
                  <div className="flex-1 flex flex-col justify-center gap-[1px]">
                      <span className="text-[#FAFAFA] text-[15px] font-[500] tracking-tight leading-tight line-clamp-2">1. A Study in Pink</span>
                      <span className="text-[#8C8C8C] text-[12.5px] font-[500]">1h 28m</span>
                  </div>

                  {/* Off-Grid Terminal Action (Local Network Download) */}
                  <div className="w-[40px] flex justify-center items-center opacity-80 cursor-pointer active:scale-90 active:opacity-100 transition-all">
                      <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] stroke-[#E6E6E6] stroke-[1.8px] fill-none -mt-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="miter"/>
                          <path d="M12 15V3" />
                      </svg>
                  </div>
              </div>
              
          </div>

      </div>

      {/* 3. Global Edge Hardware System (Bottom Action Nav) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#000000] border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto shadow-[0_-2px_10px_rgba(0,0,0,0.9)]">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-[#FAFAFA] fill-transparent" />
              <span className="text-[10px] text-[#FAFAFA] font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">Search</span>
          </button>

          {/* Live Notification Payload Integration */}
          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <div className="relative">
                  <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
                  {/* Extracted Blue State Ping */}
                  <div className="absolute top-[-3px] right-[-6px] w-[15px] h-[15px] bg-[#0A84FF] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#000000]">
                      <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#FFFFFF] stroke-[4px] fill-none">
                           <path d="M4 12l4 4L20 6" />
                      </svg>
                  </div>
              </div>
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">More</span>
          </button>

      </div>

      {/* iOS Gesture Array Controller Map */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
