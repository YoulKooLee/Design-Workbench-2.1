import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Check, ThumbsUp, Share, X } from 'lucide-react';
import './style.css';

/**
 * @name Netflix "Show Details" Content State (More Like This Grid) - Page 30
 */
export default function NetflixApp() {

  // SVG Arrays for "More Like This" Grid Items
  const daredevilPoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#18181A] shadow-md">
           {/* Abstract Action Vectors */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#141416" />
              {/* Suit Under-Mesh */}
              <path d="M15,150 L25,90 Q50,70 70,80 L95,150 Z" fill="#2E2426" />
              <path d="M25,90 Q40,95 30,120 L20,150 Z" fill="#4B1214" opacity="0.8"/>
              <path d="M70,80 L75,100 L95,120 L95,150 Z" fill="#4B1214" opacity="0.8"/> 
              
              {/* Crimson Helm Core */}
              <path d="M30,80 L40,30 L60,35 L70,75 Z" fill="#691014" />
              <path d="M40,30 Q45,20 50,30 L45,35 Z" fill="#99151A" />
              <path d="M60,35 Q65,25 70,35 L62,40 Z" fill="#99151A" />
              <path d="M35,65 Q45,90 60,65 Z" fill="#D3A796" /> {/* Exposed chin */}
              
              {/* Aggressive Visor Splash Bounds */}
              <path d="M15,50 Q40,65 50,55 Q60,60 85,45 Q70,75 50,65 Q40,80 15,50 Z" fill="#DD161F" />
              <circle cx="20" cy="40" r="3" fill="#A8151A" />
              <circle cx="85" cy="35" r="3.5" fill="#A8151A" />
              <circle cx="28" cy="30" r="1.5" fill="#DD161F" />
              <circle cx="55" cy="85" r="2.5" fill="#DD161F" />
              <path d="M40,90 Q40,110 43,125" stroke="#A8151A" strokeWidth="1.5" fill="none" />
           </svg>
           {/* Deep Obfuscation Overlay */}
           <div className="absolute inset-bottom-0 w-full h-[55%] bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
           
           {/* Overlay Identifiers */}
           <div className="absolute top-[8px] w-full flex justify-center z-10 text-[#E50914] font-['Arial_Black',sans-serif] text-[7.5px] tracking-[1.5px] scale-y-[1.2]">
               NETFLIX
           </div>
           
           <div className="absolute bottom-[22px] w-full flex flex-col items-center drop-shadow-[0_2px_4px_black] z-20">
               <span className="text-[#FAFAFA] text-[5.5px] bg-[#E50914] px-[2.5px] pb-[0.5px] tracking-[1px] font-[800] mb-[2px] leading-[1.2]">MARVEL</span>
               <span className="text-[#DE242C] font-['Impact',sans-serif] text-[20px] transform scale-y-[1.25] scale-x-[0.95] italic tracking-tight leading-none drop-shadow-[1px_1px_0px_white,-1px_1px_0px_white,-1px_-1px_0px_white,1px_-1px_0px_white]">
                   DAREDEVIL
               </span>
           </div>
      </div>
  );

  const gothamPoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#222E36] shadow-md">
           {/* Sub-lit Portait Profile */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#1C2226" />
              <path d="M10,150 L20,110 Q50,110 80,110 L90,150 Z" fill="#2E333D" />
              <path d="M40,110 L50,135 L60,110 Z" fill="#0A0B0C" /> 
              <path d="M45,115 L50,120 L55,115 Z" fill="#F0F0F0" />
              <path d="M25,110 Q20,50 50,45 Q80,50 75,110 Q50,125 25,110 Z" fill="#D2BCB0" />
              <path d="M25,110 Q35,80 50,90 Q40,110 25,110 Z" fill="#998175" opacity="0.6"/>
              <path d="M75,110 Q65,80 50,90 Q60,110 75,110 Z" fill="#756157" opacity="0.6"/>
              
              {/* Wayne Cowl/Hair Geometry */}
              <path d="M20,60 C20,30 50,15 80,55 C70,25 30,15 20,60 Z" fill="#151210" />
               <path d="M20,60 Q30,40 50,45" fill="none" stroke="#2B221E" strokeWidth="3" />
               <path d="M80,55 Q70,40 50,45" fill="none" stroke="#2B221E" strokeWidth="3" />
               
              <circle cx="38" cy="70" r="2.8" fill="#111" />
              <circle cx="62" cy="70" r="2.8" fill="#111" />
              <path d="M32,66 Q38,64 43,67" stroke="#3D2924" strokeWidth="1.5" fill="none" />
              <path d="M68,66 Q62,64 57,67" stroke="#3D2924" strokeWidth="1.5" fill="none" />
           </svg>
           <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>

           <div className="absolute bottom-[24px] w-full flex justify-center z-20">
               <span className="text-[#F2F2F2] font-['Georgia',serif] text-[18px] tracking-[2px] drop-shadow-[0_2px_4px_black] opacity-95">
                   GOTHAM
               </span>
           </div>
      </div>
  );

  const limitlessPoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#24211D] shadow-md">
           {/* Architectural Vertigo Map */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#3D3A36" />
              <path d="M0,0 L45,0 L0,150 Z" fill="#322E29" />
              <path d="M100,0 L55,0 L100,150 Z" fill="#252422" />
              <path d="M15,70 L0,110 M85,70 L100,110" stroke="#111" strokeWidth="2.5" opacity="0.6"/>
              <path d="M25,50 L0,70 M75,50 L100,70" stroke="#111" strokeWidth="2.5" opacity="0.6"/>
              
              <path d="M10,150 L30,100 Q50,75 70,100 L95,150 Z" fill="#2E394A" /> 
              <path d="M35,100 Q50,90 65,100 L75,150 L25,150 Z" fill="#87756B" /> 
              {/* Upward Gazing Profile */}
              <path d="M42,80 Q50,40 62,80 Q50,105 42,80 Z" fill="#D3A78A" />
              <path d="M15,20 Q30,40 42,90" stroke="#D3A78A" strokeWidth="8" fill="none" strokeLinecap="round" />
           </svg>
           <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black/85 to-transparent z-10 pointer-events-none"></div>

           <div className="absolute bottom-[28px] w-full flex justify-center z-20 mix-blend-plus-lighter opacity-95">
               <span className="text-[#FFFFFF] font-sans font-[300] text-[17px] tracking-[0.5px] scale-y-[1.1] drop-shadow-[0_2px_6px_black]">
                   LIMITLESS
               </span>
           </div>
      </div>
  );

  const alienistPoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#D1D4D6] shadow-md">
           {/* Monochrome Victorian Setup */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#E8EDF2" />
              <circle cx="20" cy="25" r="14" fill="#FFFFFF" opacity="0.9" />
              <path d="M0,70 Q20,60 30,80 Q50,55 100,60" fill="none" stroke="#A8B4BD" strokeWidth="1.5" opacity="0.7"/>
              <path d="M85,50 L85,150" stroke="#1A1C1D" strokeWidth="2.5" />
              <path d="M78,35 L92,35 L85,25 Z" fill="#F0CD60" /> 
              
              <path d="M25,150 L35,85 L65,85 L75,150 Z" fill="#1C1E20" />
              <path d="M30,45 L70,45 L62,15 L38,15 Z" fill="#141517" />
              <path d="M40,55 Q50,45 60,55 Q60,75 50,85 Q40,75 40,55 Z" fill="#0C0D0E" />
              
              <path d="M30,140 Q20,120 40,95" stroke="#111" strokeWidth="4.5" fill="none" />
              <path d="M30,135 L30,150" stroke="#111" strokeWidth="2.5" /> 
              
              {/* Dripping Gore Vectors */}
              <path d="M60,110 L80,120 L80,150" stroke="#CC1414" strokeWidth="2.5" fill="none" />
              <circle cx="80" cy="146" r="2.5" fill="#CC1414" />
              <path d="M82,125 L92,145 M82,135 L87,150" stroke="#CC1414" strokeWidth="1.5" fill="none" />
           </svg>
           <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>

           <div className="absolute top-[10px] w-full flex justify-center text-[#E50914] font-['Arial_Black',sans-serif] text-[7.5px] tracking-[1px] scale-y-[1.2]">
               NETFLIX
           </div>
           <div className="absolute bottom-[10px] w-full flex flex-col items-center">
               <span className="text-[#CCCFD1] text-[6px] tracking-[2px] font-bold font-serif mb-[1px]">THE</span>
               <span className="text-[#FAFAFA] font-serif text-[18.5px] tracking-[1px] drop-shadow-[0_2px_6px_black]">
                   ALIENIST
               </span>
           </div>
      </div>
  );

  const luciferPoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#1D2B36] shadow-md">
           {/* Hellgate Environment */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#18242A" />
              <path d="M10,0 L10,150 M30,0 L30,150 M70,0 L70,150 M90,0 L90,150" stroke="#0B1114" strokeWidth="5" />
              <circle cx="30" cy="30" r="10" fill="none" stroke="#0B1114" strokeWidth="4" />
              <circle cx="70" cy="30" r="10" fill="none" stroke="#0B1114" strokeWidth="4" />
              
              <circle cx="50" cy="80" r="45" fill="#5E1E1C" opacity="0.65" />
              
              <path d="M25,150 L35,80 Q50,70 65,80 L75,150 Z" fill="#0A0B0C" /> 
              <path d="M39,80 L50,115 L61,80 Z" fill="#181A1C" /> 
              <path d="M48,80 L50,90 L52,80 Z" fill="#D3A796" /> 
              <path d="M43,45 Q50,15 57,45 Q60,65 50,75 Q40,65 43,45 Z" fill="#CE9F89" />
              <path d="M42,48 C35,25 65,25 58,48 C55,10 45,10 42,48 Z" fill="#120E0C" /> 
              <path d="M43,45 Q50,35 57,45 Q55,60 50,70 Q45,60 43,45 Z" fill="#6B4536" opacity="0.4" />
           </svg>
           <div className="absolute inset-bottom-0 w-full h-[30%] bottom-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

           <div className="absolute top-[82px] w-full flex justify-center z-20 mix-blend-plus-lighter opacity-95">
               <span className="text-[#FFFFFF] font-serif font-[300] text-[22px] tracking-[0.5px] scale-y-[1.25] scale-x-[0.95] drop-shadow-[0_0px_10px_black]">
                   LUCIFER
               </span>
           </div>
      </div>
  );

  const goodPlacePoster = (
      <div className="w-full aspect-[2/3] relative rounded-[3px] overflow-hidden bg-[#DEE0CD] shadow-md">
           {/* Pop Daylit Colors & Tints */}
           <svg viewBox="0 0 100 150" className="w-[110%] h-[110%] -ml-[5%] -mt-[2%]">
              <rect width="100" height="150" fill="#EAE5D8" />
              <path d="M0,20 L100,50 L100,80 L0,30 Z" fill="#BCC8C9" opacity="0.9"/>
              <path d="M0,80 L100,100 L100,150 L0,120 Z" fill="#BAAD97" opacity="0.6"/>
              
              <path d="M10,150 L25,115 Q50,105 75,115 L90,150 Z" fill="#F0F0F0" />
              <path d="M40,115 Q50,135 60,115 L50,145 Z" fill="#E8BBA3" /> 
              <path d="M25,80 Q20,15 50,20 Q80,15 75,80 Q65,120 50,120 Q35,120 25,80 Z" fill="#FFCFB3" />
              
              <path d="M20,150 C5,100 20,20 50,25 C80,20 95,100 80,150 C70,120 80,80 75,60 C65,25 35,25 25,60 C20,80 30,120 20,150 Z" fill="#EED08A" />
              <path d="M20,150 C10,110 30,50 50,35" fill="none" stroke="#D3B06C" strokeWidth="6" opacity="0.6" />
              
              {/* Aviator Hardware Elements */}
              <path d="M28,68 C28,52 45,58 48,68 C48,82 38,88 28,68 Z" fill="#F4CB2B" />
              <path d="M52,68 C55,58 72,52 72,68 C72,82 62,88 52,68 Z" fill="#F4CB2B" />
              <path d="M28,68 C28,52 45,58 48,68 C48,82 38,88 28,68 Z" fill="none" stroke="#251F19" strokeWidth="2.5" />
              <path d="M52,68 C55,58 72,52 72,68 C72,82 62,88 52,68 Z" fill="none" stroke="#251F19" strokeWidth="2.5" />
              <path d="M48,63 Q50,60 52,63" fill="none" stroke="#251F19" strokeWidth="2" /> 
              
              <path d="M44,98 Q50,94 56,98 Q50,103 44,98 Z" fill="#F0516E" />
              <path d="M44,98 Q50,96 56,98" fill="none" stroke="#B32B43" strokeWidth="1" />
           </svg>
           <div className="absolute top-[8px] w-full flex justify-center z-20">
               <span className="text-[#FFDD1A] font-['Arial',sans-serif] font-[900] tracking-tight text-[13.5px] drop-shadow-[0_1.5px_3px_black]">
                   The Good Place
               </span>
           </div>
           
           <div className="absolute inset-bottom-0 w-full h-[15%] bottom-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      </div>
  );


  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-white font-sans relative select-none">
      
      {/* 1. Modal OS Top Frame */}
      <div className="flex flex-col w-full bg-[#111111] z-40 sticky top-0 pb-[10px]">
          {/* iOS Standard Status Sensor */}
          <div className="flex justify-between items-center px-[28px] pt-[8px] pb-[6px] relative">
             <span className="text-[14px] font-bold tracking-[0.2px] text-white opacity-95 ml-[-4px]">3:00</span>
             <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
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
          
          {/* Internal Sheet Title & Terminal Close Button */}
          <div className="flex justify-between items-center px-4 pt-[4px] pb-1">
             <div className="w-[30px]" /> {/* Balancing Spacer */}
             <span className="text-[17px] font-[600] tracking-[0.2px] ml-4 text-[#F2F2F2]">Sherlock</span>
             <div className="flex-1 flex justify-end">
                 <div className="w-[28px] h-[28px] rounded-full bg-[#1A1A1C] flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-transform">
                     <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#E6E6E6] stroke-[2px] fill-none ml-[0.5px]">
                          <path d="M5 5l14 14M5 19L19 5" strokeLinecap="square" strokeLinejoin="miter" />
                     </svg>
                 </div>
             </div>
          </div>
      </div>

      {/* 2. Scrolling Kinematics Viewport (Sheet Content) */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#111111]">
          
          {/* Main Context Terminal (Play Matrix) */}
          <div className="px-2 mb-[14px]">
              <button className="w-full bg-[#E50914] text-white rounded-[3px] py-[8px] flex justify-center items-center font-[700] text-[15px] tracking-tight shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:scale-95 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white mr-[6px] pb-[1px]">
                       <path d="M7 5l13.5 7-13.5 7z" />
                  </svg>
                  Play
              </button>
          </div>

          {/* Extracted Detail Nodes (Synopsis & Meta) */}
          <div className="px-[12px] mb-2">
               <p className="text-[#F2F2F2] text-[14.5px] leading-[1.4] tracking-[-0.2px] font-[400] mb-[12px]">
                   In this updated take on Sir Arthur Conan Doyle's beloved mystery tales, the eccentric sleuth prowls the streets of modern London in search of clues.
               </p>
               <div className="text-[#969696] text-[11.5px] leading-[1.35] font-[500] tracking-tight">
                   <p>Cast: Benedict Cumberbatch, Martin Freeman, Una Stubbs</p>
                   <p>Creators: Mark Gatiss, Steven Moffat</p>
               </div>
          </div>

          {/* Localized UX Grid (Memory / Ratings / Relational Ops) */}
          <div className="flex justify-start px-[26px] mt-5 mb-2 gap-[60px]">
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] stroke-white stroke-[1.8px] fill-none mb-[5px]">
                      <path d="M5 12l4.5 4.5L19 7" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[2px]">My List</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white stroke-[1.8px] fill-none mb-[6px]">
                       <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[1px]">Rate</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white stroke-[1.8px] fill-none mb-[5px] ml-[2px]">
                       <path d="M12 15V3m0 0L8 7m4-4l4 4M2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#8C8C8C] text-[10px] font-medium tracking-tight mt-[2px]">Share</span>
              </div>
          </div>

          {/* Sub-Classification Route Controllers (Tabs) */}
          <div className="w-full flex items-center gap-[24px] px-3 mt-[14px] border-t-[1.5px] border-[#2B2B2B]">
              <div className="relative py-[14px] cursor-pointer group">
                  <span className="text-[#8C8C8C] font-[700] tracking-tight text-[15px] group-active:text-white transition-colors">EPISODES</span>
              </div>
              <div className="relative py-[14px] cursor-pointer">
                  <span className="text-white font-[700] tracking-[0.2px] text-[15px]">MORE LIKE THIS</span>
                  <div className="absolute top-[-1.5px] left-0 w-full h-[4px] bg-[#E50914] rounded-sm shadow-sm"></div>
              </div>
          </div>

          {/* Content Pipeline Render: Target "MORE LIKE THIS" Grid Format */}
          <div className="w-full px-[6px] pb-[110px] bg-[#111111] pt-[2px]">
               <div className="grid grid-cols-3 gap-x-[7px] gap-y-[8px]">
                    {/* Row 1 Context */}
                    {daredevilPoster}
                    {gothamPoster}
                    {limitlessPoster}

                    {/* Row 2 Context */}
                    {alienistPoster}
                    {luciferPoster}
                    {goodPlacePoster}
               </div>
          </div>

      </div>

      {/* 3. Global Edge Hardware (Bottom App Navigation) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-white fill-transparent" />
              <span className="text-[10px] text-white font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">Search</span>
          </button>

          {/* Active Download Memory Marker (Badge Array) */}
          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <div className="relative">
                  <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
                  {/* Dynamic Blue Completion Circle */}
                  <div className="absolute top-[-3px] right-[-6px] w-[15px] h-[15px] bg-[#0A84FF] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#000000]">
                      <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-white stroke-[4px] fill-none">
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

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
