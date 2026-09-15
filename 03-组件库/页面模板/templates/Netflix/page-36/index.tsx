import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * @name Netflix "Show Details" Deep Scroll Model - Page 36
 */
export default function NetflixApp() {

  // Reusable Bodyguard Raw SVG Array (No Text/Shadow Overlay)
  const BodyguardSVG = () => (
      <svg viewBox="0 0 120 180" className="w-full h-full object-cover">
          <rect width="120" height="180" fill="#1A2833" /> 
          <path d="M0,180 L0,120 Q30,105 60,140 L120,180 Z" fill="#12181C" />
          <path d="M0,120 Q30,105 60,140 L40,180 L0,180 Z" fill="#1D2E3B" />
          <path d="M50,135 L60,128 L75,150 L65,160 Z" fill="#D3DBE0" />
          
          <path d="M10,10 Q50,-15 100,20 Q115,50 100,100 Q80,140 40,150 Q10,120 10,70 Z" fill="#D3AB95" />
          <path d="M10,10 Q50,-15 100,20 L100,70 Q70,95 40,150 Q10,120 10,70 Z" fill="#A8816F" opacity="0.7"/>
          
          <path d="M40,65 Q50,55 65,65 Q50,75 40,65 Z" fill="#FFF" />
          <circle cx="58" cy="65" r="4.5" fill="#2B4D6B" /> 
          <circle cx="60" cy="64" r="1.5" fill="#FFF" />
          
          <path d="M85,65 Q95,55 105,65 Q95,75 85,65 Z" fill="#FFF" />
          <circle cx="102" cy="65" r="4.5" fill="#2B4D6B" /> 
          
          <path d="M35,55 Q50,48 70,58" stroke="#1A110D" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <path d="M80,58 Q95,48 110,55" stroke="#1A110D" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M65,65 Q70,90 75,100 L65,105 Z" fill="#755241" opacity="0.6"/>
          
          <path d="M55,125 Q65,120 80,125" stroke="#4A2A22" strokeWidth="2.5" fill="none" />
          
          <circle cx="28" cy="75" r="3" fill="#690A0A" />
          <circle cx="45" cy="95" r="2.5" fill="#690A0A" />
          <circle cx="70" cy="85" r="3.5" fill="#8B1111" />
          <path d="M30,105 Q35,110 32,120 Z" fill="#8B1111" />
          <path d="M75,115 Q78,122 72,130 Z" fill="#690A0A" />
          <circle cx="20" cy="110" r="3" fill="#8B1111" />
          <circle cx="95" cy="80" r="1.5" fill="#8B1111" />
      </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-[#FAFAFA] font-sans relative select-none">
      
      {/* 1. Volumetric Blur Environment - Fixed to Top */}
      <div className="fixed top-[0px] inset-x-0 h-[220px] pointer-events-none overflow-hidden mask-image-b z-0">
          <div className="absolute inset-0 bg-[#0C1217]"></div>
          {/* Cyan/Slate ambient reflection of police uniform */}
          <div className="absolute top-[30px] left-[30px] w-56 h-56 bg-[#2A3F4A] rounded-full mix-blend-screen opacity-80" style={{ filter: 'blur(50px)' }}></div>
          {/* Blood/Skin tone reflection ambient mapping */}
          <div className="absolute bottom-[20px] right-[40px] w-64 h-64 bg-[#2B1713] rounded-full mix-blend-screen opacity-60" style={{ filter: 'blur(60px)' }}></div>
      </div>

      {/* 2. Global Fixed Header Plane */}
      <div className="fixed top-0 w-full h-[90px] z-50 pointer-events-none flex flex-col pt-[8px] bg-[#0A0C0E]/90 backdrop-blur-md border-b border-transparent">
           
           {/* iOS Sensor Bridge */}
           <div className="flex justify-between items-center px-[28px] pb-[6px] relative z-20">
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

           {/* App Control Context (Modal Header) */}
           <div className="flex justify-center items-center h-[45px] relative mt-[2px] pointer-events-auto">
               <span className="text-[#FAFAFA] text-[16px] font-[600] tracking-[0px]">Bodyguard</span>
               <button className="absolute right-[16px] top-[14px] p-1 active:scale-90 transition-transform cursor-pointer">
                   <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[#FAFAFA] stroke-[2.5px] fill-transparent">
                        <path d="M5 5L19 19M5 19L19 5" strokeLinecap="round" />
                   </svg>
               </button>
           </div>

      </div>

      {/* 3. Deep Y-Scroll Viewport */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar pt-[90px] relative z-10 pb-[100px]">
          
          {/* A. Fractional Pre-Rendered Artifact (The sliced poster proving deep-scroll velocity) */}
          <div className="w-full flex justify-center mx-auto mb-[16px] pointer-events-none relative z-10">
               {/* 
                 Container bounds force absolute horizontal truncation locking ONLY height.
                 Setting h-[16px] precisely bisects the internal 24px typographical boundary,
                 cloning the exact "DUD YGUARD" visual bug/feature of native scrolling headers.
               */}
               <div className="w-[124px] h-[16px] relative overflow-hidden rounded-b-[2px] shadow-2xl ring-1 ring-white/10 mt-[20px]">
                   <div className="absolute bottom-0 w-[124px] h-[186px] bg-[#1A2833]">
                        <BodyguardSVG />
                        
                        {/* Shimmer/Shadow Engine for Text Contrast */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent mix-blend-multiply"></div>
                        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black to-transparent"></div>
                        
                        <div className="absolute bottom-[4px] inset-x-0 flex justify-center text-center z-10">
                            <span className="text-[#FAFAFA] text-[18px] font-[500] font-['Arial_Narrow',sans-serif] tracking-[1.5px] transform scale-y-[1.25] scale-x-[0.85] origin-bottom drop-shadow-[0_2px_4px_black]">
                                BODYGUARD
                            </span>
                        </div>
                   </div>
               </div>
          </div>

          {/* B. Serialized Feed Metadata Container */}
          <div className="flex justify-center items-center text-[#A3A3A3] text-[13.5px] font-[500] gap-[10px] mb-[18px]">
              <span>2018</span>
              <span className="bg-[#1C1C1C] text-[#C0C0C0] rounded-[2px] px-[5px] py-[1.5px] font-[600] text-[11px] leading-tight border border-[#3D3D3D]">M18</span>
              <span>1 Season</span>
          </div>

          {/* C. Primary Action Trigger */}
          <div className="px-[12px] mb-[16px]">
              <button className="w-full bg-[#E50914] text-[#FAFAFA] py-[9.5px] rounded-[3px] font-[700] text-[15.5px] flex justify-center items-center gap-[6px] active:scale-[0.98] transition-transform shadow-md hover:bg-[#F21A25]">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#FAFAFA]">
                      <path d="M6 4l15 8-15 8z" strokeLinejoin="round" />
                  </svg>
                  Play
              </button>
          </div>

          {/* D. Deep Linguistic Synopsis */}
          <div className="px-[12px] mb-[20px]">
              <p className="text-[#FAFAFA] text-[15.5px] font-[400] leading-[1.3] mb-[12px] tracking-[-0.2px]">
                  After helping thwart a terrorist attack, a war veteran is assigned to protect a politician who was a main proponent of the very conflict he fought in.
              </p>
              <div className="text-[12.5px] font-[500] leading-[1.38] tracking-tight">
                  <p className="text-[#A3A3A3]">
                      Cast: <span className="text-[#888]">Richard Madden, Keeley Hawes, Gina McKee</span>
                  </p>
                  <p className="text-[#A3A3A3]">
                      Creator: <span className="text-[#888]">Jed Mercurio</span>
                  </p>
              </div>
          </div>

          {/* E. Modular Application Interaction Array */}
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

          {/* F. Modal Header Routing Topology */}
          <div className="w-full mt-[10px] relative">
              <div className="w-full flex px-[16px] relative z-10 w-max">
                   <div className="flex-1 flex justify-center items-center font-[700] text-[14.5px] pt-[14px] pb-[10px] text-[#A3A3A3] cursor-pointer mr-[12px] tracking-[0.5px]">
                       EPISODES
                   </div>
                   
                   <div className="flex flex-col items-center justify-center font-[700] text-[14.5px] pt-[14px] pb-[10px] text-[#FAFAFA] relative cursor-pointer tracking-tight px-[4px]">
                       TRAILERS & MORE
                       {/* Netflix Inverted Top-Anchored Active Route Line */}
                       <div className="absolute top-0 inset-x-[0px] h-[4px] bg-[#E50914] rounded-t-sm z-20 shadow-[0_2px_4px_rgba(229,9,20,0.5)]"></div>
                   </div>
              </div>
              <div className="absolute top-0 w-full h-[1px] bg-[#333333]"></div>
          </div>

          {/* G. Component Viewport: Trailers Payload */}
          <div className="px-[12px] mt-[12px]">
              
              {/* Complex Interactive Thumbnail (Asset Pipeline) */}
              <div className="relative w-full aspect-video bg-[#1B252E] mb-[8px] flex items-center justify-center overflow-hidden cursor-pointer active:scale-[0.98] transition-transform rounded-[2px]">
                   
                   <div className="absolute inset-x-0 inset-y-[-20%] bg-gradient-to-r from-[#4F6A7A] to-[#252F36]"></div>
                   <circle cx="200" cy="80" r="160" fill="#6A8090" opacity="0.4" style={{ filter: 'blur(35px)' }}/>
                   
                   {/* Tactical Body Frame */}
                   <path d="M30,250 L100,100 L250,100 L320,250 Z" fill="#0D1113" />
                   <path d="M120,100 Q175,80 230,100 L210,250 L140,250 Z" fill="#1C1819" /> 
                   <path d="M175,100 L175,250" stroke="#000" strokeWidth="2.5" /> 
                   
                   {/* 3D Cranial Mapping (Rotated Head) */}
                   <path d="M130,50 Q175,-10 220,50 Q235,90 215,130 Q175,150 135,130 Q115,90 130,50 Z" fill="#D3AB95" />
                   <path d="M130,50 Q175,-10 220,50 L220,100 Q175,120 135,100 Z" fill="#99705E" opacity="0.6"/>
                   
                   {/* Standard Issue UK Police Ballistic Cap */}
                   <path d="M100,60 Q175,10 260,82 L230,50 Q175,-25 110,40 Z" fill="#14181A" />
                   <path d="M100,80 Q175,30 270,95 Q175,45 100,80 Z" fill="#050608" />
                   
                   {/* Procedural Sillitoe Tartan (Chequred Crown Band) */}
                   <path d="M125,50 Q175,30 230,73" stroke="#FFF" strokeWidth="12" strokeDasharray="6,6" fill="none" />
                   <path d="M125,44 Q175,24 230,67" stroke="#111" strokeWidth="12" strokeDasharray="6,6" strokeDashoffset="6" fill="none" />
                   <text x="175" y="48" fontSize="16" fontFamily="sans-serif" fill="#F0F0F0" transform="rotate(10 175 48)" className="font-bold tracking-widest">POLI</text>

                   {/* Character Sensor Nodes (Eyes watching Right Edge) */}
                   <path d="M150,85 Q160,80 170,85 Q160,90 150,85 Z" fill="#FFF" />
                   <circle cx="165" cy="85" r="3.5" fill="#2B4D6B" />
                   <path d="M190,90 Q200,85 210,90 Q200,95 190,90 Z" fill="#FFF" />
                   <circle cx="205" cy="90" r="3.5" fill="#2B4D6B" />
                   
                   {/* Procedural Fluid FX (Trauma mapping geometry) */}
                   <circle cx="140" cy="100" r="4.5" fill="#8B1111" />
                   <circle cx="150" cy="115" r="3.5" fill="#8B1111" />
                   <path d="M135,110 Q140,115 137,130 Z" fill="#520505" />
                   <circle cx="170" cy="130" r="3.5" fill="#8B1111" />
                   <path d="M160,115 Q162,120 158,125 Z" fill="#690A0A" />
                   <circle cx="210" cy="110" r="3" fill="#8B1111" />
                   <path d="M205,100 Q208,105 203,115 Z" fill="#8B1111" />
                   <circle cx="110" cy="160" r="15" fill="#0A0A0A" opacity="0.6" />

                   {/* Dark Gradient Bleed unifying composition */}
                   <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none"></div>
                   
                   {/* Core UI Payload (Overlaid Giant Interactive Play Node) */}
                   <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        <div className="w-[52px] h-[52px] rounded-full bg-black/50 border-[1.5px] border-[#FFF] flex justify-center items-center backdrop-blur-[2px] pl-[3px]">
                             <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-white">
                                 <path d="M6 4l15 8-15 8z" strokeLinejoin="round"/>
                             </svg>
                        </div>
                   </div>
              </div>
              <p className="text-[#E6E6E6] font-[400] text-[15.5px] tracking-tight">Bodyguard: Season 1 (Trailer)</p>
          </div>

      </div>

      {/* 4. OS Safe Area Gateway (Standard Native Bottom Nav) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1A1A1A] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-[#FAFAFA] fill-transparent" />
              <span className="text-[10px] text-[#FAFAFA] font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Search</span>
          </button>

          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <div className="relative">
                  <Download size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              </div>
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Menu size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">More</span>
          </button>
      </div>

      {/* Home UI Control System (Physical Cutout Proxy) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>

    </div>
  );
}
