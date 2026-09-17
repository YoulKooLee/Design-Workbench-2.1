import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Universal Episode Row Node
 */
const EpisodeRow = ({ num, title, duration, imgSrc, synopsis, downloadState = 'none', progress = 0 }) => (
    <div className="flex flex-col mb-[22px]">
        <div className="flex items-center justify-between mb-[8px] px-[16px]">
             <div className="relative w-[130px] h-[73px] bg-[#1A1A1A] rounded-[2px] overflow-hidden flex-shrink-0 cursor-pointer active:scale-95 transition-transform shadow-md">
                  {imgSrc}
                  <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
                  
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      <div className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex justify-center items-center bg-black/40 backdrop-blur-[1px] pl-[3px]">
                           <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
                               <path d="M6 4l15 8-15 8z" strokeLinejoin="round" />
                           </svg>
                      </div>
                  </div>
             </div>
             
             <div className="flex-1 pl-[14px] pr-[12px] flex flex-col justify-center">
                  <span className="text-[#FAFAFA] text-[15px] font-[500] tracking-tight leading-[1.2] mb-[2px]">
                      {num}. {title}
                  </span>
                  <span className="text-[#888888] text-[12.5px] font-[500]">
                      {duration}
                  </span>
             </div>
             
             <div className="w-[40px] h-[40px] flex justify-end items-center cursor-pointer active:scale-[0.85] transition-transform">
                  {downloadState === 'none' && (
                       <div className="w-[20px] h-[20px] relative mr-[2px]">
                           <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#C0C0C0] stroke-[1.8px] fill-none">
                               <path d="M12 3v13m-5-5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                               <path d="M5 20h14" strokeLinecap="round" />
                           </svg>
                       </div>
                  )}
             </div>
        </div>
    </div>
);


/**
 * @name Netflix "Show Modal Root" (Top Scroll View) - Page 40
 */
export default function NetflixApp() {

  // Primary Scene Geometry (Procedural Blood Engine for Bodyguard Thumbnail)
  const FullBodyguardPoster = ({ className }) => (
      <svg viewBox="0 0 160 240" className={`object-cover ${className}`}>
          {/* Base cinematic foundation */}
          <rect width="160" height="240" fill="#0C141B" />
          
          {/* Spatial Volumetric Light Engine */}
          <path d="M110,-20 L180,60 L180,180 L140,110 Z" fill="#D2DCE6" opacity="0.6" style={{ filter: 'blur(15px)' }}/>
          <path d="M-20,0 L60,-20 L30,120 L-20,100 Z" fill="#080808" opacity="0.8" style={{ filter: 'blur(10px)' }}/>

          {/* Actor Profile Layer (Torso) */}
          <path d="M30,240 L50,180 Q80,165 130,185 L150,240 Z" fill="#13202E" /> 
          <path d="M75,180 L85,200 L80,240 L65,240 L65,200 Z" fill="#0D1318" /> 
          <path d="M45,185 L75,178 L65,168 Z" fill="#1A2736" /> 
          <path d="M125,185 L85,178 L95,168 Z" fill="#1A2736" /> 

          {/* Organic Frame Base */}
          <path d="M60,130 L63,180 Q80,186 100,180 L100,130 Z" fill="#3D2924" />
          <path d="M85,130 L100,180 L63,180 Z" fill="#2B1A14" opacity="0.4" />
          
          {/* Cranial Topography */}
          <path d="M50,70 Q70,-10 115,35 Q135,70 125,130 Q90,165 65,145 Q40,105 50,70 Z" fill="#3D2924" /> 
          <path d="M54,65 Q80,-5 110,40 Q130,75 115,130 Q90,155 70,140 Q45,100 54,65 Z" fill="#DDB296" />
          <path d="M54,65 Q80,-5 110,40 Q115,55 105,75 Q85,100 70,140 Q45,100 54,65 Z" fill="#E8C5B3" opacity="0.7"/> 
          
          <path d="M45,90 Q35,50 65,20 Q95,5 120,25 Q130,45 135,65 Q115,30 65,40 Z" fill="#16110D" />
          <path d="M55,35 Q85,15 115,35" stroke="#16110D" strokeWidth="8" fill="none" strokeDasharray="10,4" />

          {/* Jaw / Shadows */}
          <path d="M65,140 Q85,155 115,130 L120,110 Q90,135 65,125 Z" fill="#A87A60" opacity="0.8"/>
          
          {/* Facial Center Nodes (Nose, Eye, Mouth arrays) */}
          <path d="M95,70 Q105,85 105,100 L95,105 Z" fill="#F4DECA" />
          <path d="M105,100 Q110,103 115,95Z" fill="#A87A60" opacity="0.8"/>

          <path d="M72,70 Q78,68 85,73 Q78,76 72,70 Z" fill="#F2F5F7" />
          <circle cx="80" cy="72" r="3.5" fill="#2B4D6B" /> 
          <circle cx="82" cy="71" r="1.2" fill="#FFF" /> 
          <path d="M68,66 Q75,60 88,67" stroke="#25160F" strokeWidth="3" fill="none" /> 
          
          <path d="M110,68 Q118,65 125,72 Q115,75 110,68 Z" fill="#F2F5F7" />
          <circle cx="118" cy="70" r="3.5" fill="#2B4D6B" /> 
          <circle cx="120" cy="69" r="1.2" fill="#FFF" /> 
          <path d="M106,64 Q115,60 128,68" stroke="#25160F" strokeWidth="3" fill="none" />

          <path d="M85,118 Q98,115 110,120 Q95,123 85,118 Z" fill="#91524D" />
          <path d="M85,118 Q98,118 110,120 Z" stroke="#3D1A14" strokeWidth="1.2" fill="none" />

          {/* Core Visual Identity: Blood Physics Distribution Matrix */}
          <circle cx="70" cy="118" r="4.5" fill="#690A0A" />
          <circle cx="65" cy="115" r="2.5" fill="#8B1111" />
          <path d="M62,105 Q68,118 72,130 L65,135 Z" fill="#8B1111" />
          <path d="M65,110 Q70,120 75,125" fill="none" stroke="#520505" strokeWidth="2.5" />
          
          <circle cx="88" cy="55" r="2.5" fill="#690A0A" />
          <circle cx="82" cy="58" r="1.5" fill="#520505" />
          <path d="M96,42 Q102,52 98,62 Z" fill="#690A0A" />
          <path d="M98,45 Q102,55 96,60" fill="none" stroke="#8B1111" strokeWidth="1.5" />
          
          <circle cx="115" cy="52" r="3.5" fill="#8B1111" />
          <path d="M118,98 Q125,110 115,125 Q112,120 110,105 Z" fill="#690A0A" />
          <circle cx="123" cy="120" r="1.5" fill="#520505" />
          
          <circle cx="95" cy="138" r="2.5" fill="#8B1111" />
          <path d="M102,130 Q106,138 100,145 Z" fill="#8B1111" />
          <path d="M96,135 Q100,140 98,145" fill="none" stroke="#520505" strokeWidth="1.5" />
          
          <circle cx="60" cy="90" r="2" fill="#690A0A" />
          <circle cx="68" cy="85" r="3.5" fill="#520505" />
          <path d="M85,98 Q82,105 88,102 Z" fill="#8B1111" />
          <path d="M82,88 Q85,92 85,88 " fill="none" stroke="#690A0A" strokeWidth="4" strokeLinecap="round" />

          <circle cx="58" cy="65" r="3.5" fill="#690A0A" />
          <circle cx="125" cy="85" r="2" fill="#8B1111" />
          <circle cx="122" cy="80" r="1.5" fill="#520505" />

          {/* Master Post-Processing Filter Overlay */}
          <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-l from-black/25 via-transparent to-black/10 pointer-events-none mix-blend-multiply"></div>
      </svg>
  );

  // Train Scene (Ep 1)
  const ep1Thumb = (
      <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
           <rect width="160" height="90" fill="#18232B" />
           <path d="M10,10 L40,10 L35,50 L10,50 Z" fill="#2E4C63" />
           <path d="M50,10 L110,10 L105,50 L55,50 Z" fill="#3D5A73" />
           <path d="M120,10 L160,10 L160,50 L115,50 Z" fill="#2E4C63" />
           <circle cx="20" cy="70" r="25" fill="#424D54" />
           <circle cx="140" cy="70" r="25" fill="#424D54" />
           <circle cx="25" cy="38" r="6" fill="#D3A796" opacity="0.6"/>
           <path d="M55,90 L75,55 Q80,50 85,55 L105,90 Z" fill="#151A21" /> 
           <path d="M75,90 L80,68 L85,90 Z" fill="#364252" /> 
           <path d="M65,55 Q80,25 95,55 Q90,75 75,72 Q60,75 65,55 Z" fill="#E8C5B3" /> 
           <path d="M65,55 Q80,35 95,55 L95,65 L65,65 Z" fill="#A8816F" opacity="0.55"/> 
           <path d="M62,55 Q80,20 100,60 Q95,35 80,35 Q65,35 62,55 Z" fill="#1C1512" />
      </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-[#FAFAFA] font-sans relative select-none">
      
      {/* 1. Global Ambient Base Environment (Attached to 0,0 - Unscrolled state only!) */}
      <div className="absolute top-0 inset-x-0 h-[480px] pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#0C1217]"></div>
          {/* Volumetric matching of Richard Madden's poster lighting profiles */}
          <div className="absolute top-[30px] left-[10px] w-[260px] h-[260px] bg-[#1E2D3B] rounded-full opacity-[0.55] mix-blend-screen" style={{ filter: 'blur(70px)' }}></div>
          <div className="absolute top-[100px] right-[-10px] w-[220px] h-[220px] bg-[#3B1914] rounded-full opacity-40 mix-blend-screen" style={{ filter: 'blur(60px)' }}></div>
          {/* Smooth Fade to application black floor */}
          <div className="absolute inset-x-0 bottom-0 h-[240px] bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent"></div>
      </div>

      {/* 2. Top Safe Navigation Frame (Transparent OS UI Overlay) */}
      <div className="absolute top-0 w-full z-50 flex justify-between items-start px-[28px] pt-[8px] pointer-events-none">
           <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:59</span>
           <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
               <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                  <div className="w-[3px] h-[4px] bg-[#FAFAFA] rounded-sm"></div>
                  <div className="w-[3px] h-[6px] bg-[#FAFAFA] rounded-sm"></div>
                  <div className="w-[3px] h-[8.5px] bg-[#FAFAFA] rounded-sm"></div>
                  <div className="w-[3px] h-[11px] bg-[#FAFAFA] rounded-sm"></div>
               </div>
               <div className="relative transform scale-[0.80] -mr-1">
                   <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-[#FAFAFA] stroke-[1.2px]">
                       <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                       <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                   </svg>
                   <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-[#FAFAFA] rounded-[1.5px]"></div>
               </div>
           </div>
      </div>

      {/* Modal Exit Node (Fixed position anchor simulating persistent float) */}
      <div className="absolute top-[48px] right-[16px] w-[30px] h-[30px] bg-[#161616]/70 rounded-full flex justify-center items-center backdrop-blur-md pointer-events-auto z-50 shadow-md active:scale-90 transition-transform">
           <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#FFF] stroke-[2.2px] fill-none mt-[0.5px]">
               <path d="M4 4l16 16m0-16L4 20" strokeLinecap="round" />
           </svg>
      </div>

      {/* 3. Primary Physics Scroll Viewport */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar relative z-10 pt-[55px] pb-[100px]">
          
          {/* Section A: Hero Entity (The Primary Matrix Poster Root) */}
          <div className="relative z-10 mt-[8px] flex flex-col items-center">
               <div className="relative w-[156px] aspect-[2/3] mx-auto rounded-[3px] overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
                   <FullBodyguardPoster className="w-full h-full" />
                   
                   {/* In-Frame Shadows & Post Effects to seat text */}
                   <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply"></div>
                   <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
                   
                   <div className="absolute top-[10px] inset-x-0 flex justify-center w-full z-10">
                       <span className="text-[#E50914] text-[12.5px] font-[800] tracking-[-0.6px] scale-y-[1.1] opacity-95 drop-shadow-md">
                           NETFLIX
                       </span>
                   </div>
                   
                   <div className="absolute bottom-[10px] inset-x-0 flex justify-center text-center w-full z-10">
                       <span className="text-[#FAFAFA] text-[22px] font-[500] font-['Arial_Narrow',sans-serif] tracking-[2px] transform scale-y-[1.3] scale-x-[0.8] origin-bottom drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                           BODYGUARD
                       </span>
                   </div>
               </div>
          </div>

          {/* Section B: Root Level Metadata Grouping */}
          <div className="flex justify-center items-center text-[#A3A3A3] text-[13.5px] font-[500] gap-[10px] mt-[18px] mb-[20px]">
              <span>2018</span>
              <span className="bg-[#1C1C1C] text-[#C0C0C0] rounded-[2px] px-[5px] py-[1.5px] font-[600] text-[11px] leading-tight border border-[#3D3D3D]">M18</span>
              <span>1 Season</span>
          </div>

          {/* Section C: Massive Play Action Trigger */}
          <div className="px-[12px] mb-[16px]">
              <button className="w-full bg-[#E50914] text-[#FAFAFA] py-[10px] rounded-[3px] font-[700] text-[15.5px] flex justify-center items-center gap-[6px] active:scale-[0.98] transition-transform hover:bg-[#eb2a34]">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#FAFAFA] -ml-[2px]">
                      <path d="M6 4l15 8-15 8z" strokeLinejoin="round" />
                  </svg>
                  Play
              </button>
          </div>

          {/* Section D: Deep Linguistic Synopsis Blocks */}
          <div className="px-[12px] mb-[20px]">
              <p className="text-[#FAFAFA] text-[15.5px] font-[400] leading-[1.3] mb-[12px] tracking-[-0.2px]">
                  After helping thwart a terrorist attack, a war veteran is assigned to protect a politician who was a main proponent of the very conflict he fought in.
              </p>
              <div className="text-[12.5px] font-[500] leading-[1.38]">
                  <p className="text-[#A3A3A3]">
                      Cast: <span className="text-[#888]">Richard Madden, Keeley Hawes, Gina McKee</span>
                  </p>
                  <p className="text-[#A3A3A3]">
                      Creator: <span className="text-[#888]">Jed Mercurio</span>
                  </p>
              </div>
          </div>

          {/* Section E: Interactive Micro-Actions Map */}
          <div className="flex px-[16px] mb-[24px] w-full max-w-[280px]">
              <div className="flex-1 flex flex-col justify-center items-center gap-[6px] cursor-pointer active:scale-95 transition-transform opacity-95">
                  <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-[#FAFAFA] stroke-[1.5px] fill-transparent mt-[2px]">
                       <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#888888] text-[11px] font-[600] tracking-[0.2px]">My List</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-[6px] cursor-pointer active:scale-95 transition-transform opacity-95">
                  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] stroke-[#FAFAFA] stroke-[2px] fill-transparent">
                       <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#888888] text-[11px] font-[600] tracking-[0.2px]">Rate</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-[6px] cursor-pointer active:scale-95 transition-transform opacity-95 h-full">
                  <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] stroke-[#FAFAFA] stroke-[2px] fill-transparent -mt-[1px]">
                       <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[#888888] text-[11px] font-[600] tracking-[0.2px]">Share</span>
              </div>
          </div>

          {/* Section F: Core Router Controller Topology */}
          <div className="w-full mt-[10px] relative">
              <div className="absolute top-[0px] w-full h-[1px] bg-[#333333]"></div>
              <div className="w-full flex px-[16px] relative z-10 w-max">
                   <div className="flex flex-col items-center justify-center font-[700] text-[15px] pt-[14px] pb-[10px] text-[#FAFAFA] relative cursor-pointer tracking-tight px-[4px]">
                       EPISODES
                       {/* High Priority Red Tab State Component */}
                       <div className="absolute top-0 inset-x-[0px] h-[4px] bg-[#E50914] rounded-t-sm z-20 shadow-[0_2px_4px_rgba(229,9,20,0.5)]"></div>
                   </div>
                   
                   <div className="flex-1 flex justify-center items-center font-[700] text-[14.5px] pt-[14px] pb-[10px] text-[#A3A3A3] cursor-pointer ml-[20px] tracking-[0.5px]">
                       TRAILERS & MORE
                   </div>
              </div>
          </div>
          
          <div className="w-full mt-[20px] px-[16px] flex items-center mb-[18px]">
              <span className="text-[#A3A3A3] text-[16px] font-[600] tracking-tight">Season 1</span>
          </div>

          {/* Root Level Serial Render Execution - Simulates native device cutoff seamlessly */}
          <EpisodeRow 
              num="1" 
              title="Episode 1" 
              duration="58m" 
              imgSrc={ep1Thumb} 
              synopsis=""
              downloadState="none" 
          />
          {/* Note: In exactly this viewport slice, only the top layer of Ep 1 renders into OS vision. */}
      </div>

      {/* 4. Global Control Interceptor (Standard Bottom UI Overlay Layer) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-[#FAFAFA] fill-transparent" />
              <span className="text-[10px] text-[#FAFAFA] font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Search</span>
          </button>

          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Download size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Menu size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">More</span>
          </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>

    </div>
  );
}
