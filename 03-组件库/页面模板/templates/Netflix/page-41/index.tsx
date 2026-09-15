import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';


/**
 * Extracted Bodyguard Poster Core Geometry
 */
const GridBodyguardContent = () => (
    <svg viewBox="0 0 160 240" className="w-full h-full object-cover">
         <rect width="160" height="240" fill="#0C141B" />
         
         <path d="M110,-20 L180,60 L180,180 L140,110 Z" fill="#D2DCE6" opacity="0.6" style={{ filter: 'blur(15px)' }}/>
         <path d="M-20,0 L60,-20 L30,120 L-20,100 Z" fill="#080808" opacity="0.8" style={{ filter: 'blur(10px)' }}/>

         <path d="M30,240 L50,180 Q80,165 130,185 L150,240 Z" fill="#13202E" /> 
         <path d="M75,180 L85,200 L80,240 L65,240 L65,200 Z" fill="#0D1318" /> 
         <path d="M45,185 L75,178 L65,168 Z" fill="#1A2736" /> 
         <path d="M125,185 L85,178 L95,168 Z" fill="#1A2736" /> 

         <path d="M60,130 L63,180 Q80,186 100,180 L100,130 Z" fill="#3D2924" />
         <path d="M85,130 L100,180 L63,180 Z" fill="#2B1A14" opacity="0.4" />
         
         <path d="M50,70 Q70,-10 115,35 Q135,70 125,130 Q90,165 65,145 Q40,105 50,70 Z" fill="#3D2924" /> 
         <path d="M54,65 Q80,-5 110,40 Q130,75 115,130 Q90,155 70,140 Q45,100 54,65 Z" fill="#DDB296" />
         <path d="M54,65 Q80,-5 110,40 Q115,55 105,75 Q85,100 70,140 Q45,100 54,65 Z" fill="#E8C5B3" opacity="0.7"/> 
         
         <path d="M45,90 Q35,50 65,20 Q95,5 120,25 Q130,45 135,65 Q115,30 65,40 Z" fill="#16110D" />
         
         <path d="M65,140 Q85,155 115,130 L120,110 Q90,135 65,125 Z" fill="#A87A60" opacity="0.8"/>
         
         <path d="M95,70 Q105,85 105,100 L95,105 Z" fill="#F4DECA" />
         <path d="M105,100 Q110,103 115,95Z" fill="#A87A60" opacity="0.8"/>

         {/* Eyes */}
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

         {/* Extracted Blood Matrix Core Nodes */}
         <circle cx="70" cy="118" r="4.5" fill="#690A0A" />
         <path d="M62,105 Q68,118 72,130 L65,135 Z" fill="#8B1111" />
         <path d="M65,110 Q70,120 75,125" fill="none" stroke="#520505" strokeWidth="2.5" />
         
         <circle cx="88" cy="55" r="2.5" fill="#690A0A" />
         <path d="M96,42 Q102,52 98,62 Z" fill="#690A0A" />
         <path d="M98,45 Q102,55 96,60" fill="none" stroke="#8B1111" strokeWidth="1.5" />
         
         <circle cx="115" cy="52" r="3.5" fill="#8B1111" />
         <path d="M118,98 Q125,110 115,125 Q112,120 110,105 Z" fill="#690A0A" />
         <circle cx="123" cy="120" r="1.5" fill="#520505" />
         
         <circle cx="95" cy="138" r="2.5" fill="#8B1111" />
         <path d="M102,130 Q106,138 100,145 Z" fill="#8B1111" />
         
         <circle cx="68" cy="85" r="3.5" fill="#520505" />
         <path d="M85,98 Q82,105 88,102 Z" fill="#8B1111" />
         <path d="M82,88 Q85,92 85,88 " fill="none" stroke="#690A0A" strokeWidth="4" strokeLinecap="round" />

         <circle cx="58" cy="65" r="3.5" fill="#690A0A" />

         <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-l from-black/25 via-transparent to-black/10 pointer-events-none mix-blend-multiply"></div>
    </svg>
);


/**
 * @name Netflix "Home Feed / My List Segment" - Page 41
 */
export default function NetflixApp() {

  // 1. Grid Asset: Black Mirror Bandersnatch
  const BandersnatchPoster = () => (
      <div className="relative w-full aspect-[2/3] rounded-[4px] shadow-sm overflow-hidden bg-[#2E241F]">
          <svg viewBox="0 0 160 240" className="w-full h-full object-cover">
              {/* Lighting Base */}
              <rect width="160" height="240" fill="#221C18" />
              <path d="M0,0 L160,0 L160,180 L0,240 Z" fill="#D3AB95" opacity="0.15" style={{ filter: 'blur(20px)' }}/>
              
              {/* Costume */}
              <path d="M20,240 L40,160 Q80,150 120,160 L140,240 Z" fill="#6B7280" />
              <path d="M40,160 Q80,180 120,160 L110,240 L50,240 Z" fill="#4B5563" />
              
              {/* Head Geometry */}
              <path d="M40,70 Q80,0 120,70 Q130,110 110,150 Q80,180 50,150 Q30,110 40,70 Z" fill="#F0CFBB" />
              <path d="M40,70 Q80,0 120,70 Q120,90 100,120 Q80,150 50,120 Q40,90 40,70 Z" fill="#DDB296" />
              <path d="M50,120 Q80,160 110,120 Q95,150 80,150 Q65,150 50,120 Z" fill="#CD9B86" opacity="0.6"/>
              
              {/* Blonde Hair Block */}
              <path d="M20,80 Q40,20 80,10 Q120,20 140,80 Q130,50 120,40 Q100,-10 60,30 Q40,50 20,80 Z" fill="#E8C3AC" />
              <path d="M30,60 Q60,10 90,20 Q120,10 130,50 Q120,20 90,30 Q60,20 30,60 Z" fill="#F0DCB8" />

              {/* Wireframe Glasses mapping */}
              <circle cx="65" cy="100" r="18" fill="none" stroke="#E3CFA8" strokeWidth="2.5" opacity="0.8"/>
              <circle cx="107" cy="100" r="18" fill="none" stroke="#E3CFA8" strokeWidth="2.5" opacity="0.8"/>
              <path d="M83,98 Q86,95 89,98" fill="none" stroke="#E3CFA8" strokeWidth="2.5" opacity="0.8" />
              {/* Glasses arm */}
              <path d="M47,96 Q30,95 25,90" fill="none" stroke="#E3CFA8" strokeWidth="2.5" opacity="0.8" />
              
              {/* Eyes Base */}
              <path d="M55,98 Q65,95 75,98" stroke="#8B5A52" strokeWidth="2" fill="none" />
              <path d="M58,103 Q65,100 72,103" stroke="#8B5A52" strokeWidth="1.5" fill="none" />
              <circle cx="65" cy="100" r="3" fill="#2E4C63" />
              
              <path d="M97,98 Q107,95 117,98" stroke="#8B5A52" strokeWidth="2" fill="none" />
              <path d="M100,103 Q107,100 114,103" stroke="#8B5A52" strokeWidth="1.5" fill="none" />
              <circle cx="107" cy="100" r="3" fill="#2E4C63" />

              {/* Signature Smirk Line */}
              <path d="M60,140 Q80,138 105,130" stroke="#8B5A52" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M60,140 Q80,132 105,130" fill="#B3786B" opacity="0.4"/>
          </svg>

          {/* Interactive Tag (Red Starburst Ribbon) */}
          <svg viewBox="0 0 24 36" className="absolute top-0 right-[6px] w-[22px] h-[33px] z-20 shadow-md">
              <path d="M0,0 L24,0 L24,36 L12,28 L0,36 Z" fill="#e50914" />
              {/* 8-Point Star Native SVG */}
              <path d="M12,4 L13.5,10 L19,6.5 L15,12 L20.5,16 L14,15.5 L12,22 L10,15.5 L3.5,16 L9,12 L5,6.5 L10.5,10 Z" fill="#FFF" />
          </svg>

          {/* Typography Layout */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent mix-blend-multiply"></div>
          
          <div className="absolute top-[8px] inset-x-0 flex justify-center">
              <span className="text-[#E50914] text-[9.5px] font-[800] tracking-[-0.6px] scale-y-[1.1] opacity-90 drop-shadow-md">
                 NETFLIX
              </span>
          </div>
          
          <div className="absolute inset-x-0 bottom-[6px] flex flex-col items-center justify-end z-10 pointers-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="text-[#FAFAFA] text-[13px] font-[900] transform scale-x-[1.1] tracking-[-0.8px] leading-[1] font-sans">
                  BLACK MIRROR
              </span>
              <span className="text-[#FAFAFA] text-[10px] font-[900] transform scale-x-[1.1] tracking-[-0.5px] leading-[1.2] font-sans">
                  BANDERSNATCH
              </span>
          </div>
      </div>
  );

  // 2. Grid Asset: Bodyguard Container Proxy
  const GridBodyguard = () => (
      <div className="relative w-full aspect-[2/3] rounded-[4px] shadow-sm overflow-hidden bg-[#0C141B]">
          <GridBodyguardContent />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply"></div>
          
          <div className="absolute top-[8px] inset-x-0 flex justify-center">
               <span className="text-[#E50914] text-[9.5px] font-[800] tracking-[-0.6px] scale-y-[1.1] opacity-90 drop-shadow-md">
                   NETFLIX
               </span>
          </div>
          <div className="absolute bottom-[8px] inset-x-0 flex justify-center text-center w-full">
               <span className="text-[#FAFAFA] text-[16px] font-[500] font-['Arial_Narrow',sans-serif] tracking-[1px] transform scale-y-[1.3] scale-x-[0.9] origin-bottom drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                   BODYGUARD
               </span>
          </div>
      </div>
  );

  // 3. Grid Asset: Suits
  const SuitsPoster = () => (
      <div className="relative w-full aspect-[2/3] rounded-[4px] shadow-sm overflow-hidden bg-[#E8F0F5]">
          <svg viewBox="0 0 160 240" className="w-full h-full object-cover">
              {/* Harvey Silhouette & Structure */}
              <path d="M0,240 L30,120 Q50,100 70,120 L100,240 Z" fill="#1C2B39" />
              <path d="M30,120 L50,150 L70,120 Z" fill="#FFF" />
              <path d="M45,130 L55,130 L53,190 L47,190 Z" fill="#0C151C" />
              <path d="M20,60 Q50,10 70,60 Q80,90 60,110 Q40,120 30,110 Q10,90 20,60 Z" fill="#D3E0EA" />
              <circle cx="35" cy="70" r="2.5" fill="#1A2A3A" />
              <circle cx="55" cy="70" r="2.5" fill="#1A2A3A" />
              <path d="M40,90 Q45,95 50,90" fill="none" stroke="#1A2A3A" strokeWidth="1.5" />
              <path d="M20,40 Q40,20 60,30 Q70,50 65,40 Q40,10 20,40 Z" fill="#0C151C" />
  
              {/* Meghan Silhouette & Structure */}
              <path d="M50,240 L90,130 Q110,120 140,130 L160,240 Z" fill="#0A0A0A" />
              <path d="M80,60 Q110,20 130,60 Q140,90 120,110 Q100,120 90,110 Q70,90 80,60 Z" fill="#D3E0EA" />
              <circle cx="100" cy="75" r="2.5" fill="#1A2A3A" />
              <circle cx="120" cy="75" r="2.5" fill="#1A2A3A" />
              
              <path d="M70,140 Q60,80 90,30 Q120,0 150,30 Q160,80 150,150 Q130,100 130,60 Q100,20 80,60 Q70,100 85,150 Z" fill="#0A0A0A" />
              
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0A0A0A]/80 to-transparent mix-blend-multiply"></div>
          </svg>
          
          <div className="absolute bottom-[20px] inset-x-0 flex justify-center text-center w-full z-10 pointers-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <span className="text-[#FFCC00] text-[34px] font-[900] tracking-[-1.5px] scale-y-[1.1] scale-x-[1.05] drop-shadow-md">
                  SUITS
              </span>
          </div>
      </div>
  );

  // 4. Grid Asset: Black Mirror Arkangel
  const ArkangelPoster = () => (
      <div className="relative w-full aspect-[2/3] rounded-[4px] shadow-sm overflow-hidden bg-[#90C5CD]">
          <svg viewBox="0 0 160 240" className="w-full h-full object-cover">
              {/* Medical Gradient Wash */}
              <rect width="160" height="240" fill="#90C5CD" />
              <path d="M0,0 L160,0 L160,240 L0,240 Z" fill="#CDE2E5" opacity="0.4" style={{ filter: 'blur(15px)' }}/>
              
              {/* Tech Chair/Pod */}
              <ellipse cx="80" cy="180" rx="70" ry="60" fill="#6BA3AD" />
              <ellipse cx="80" cy="190" rx="60" ry="50" fill="#4B8A96" />
      
              {/* Subject (Child in Yellow) */}
              <path d="M50,180 Q80,130 110,180 L100,240 L60,240 Z" fill="#E8C3AC" /> 
              <path d="M45,160 Q80,140 115,160 L105,200 L55,200 Z" fill="#BD8947" /> 
              <circle cx="80" cy="130" r="18" fill="#F0CFBB" />
              {/* Blonde Child Hair */}
              <path d="M55,140 Q60,100 80,100 Q100,100 105,140 Q90,110 80,110 Q70,110 55,140 Z" fill="#F0E6D2" />
              
              {/* Nurse / Doctor Construct */}
              <path d="M-20,240 L20,100 Q50,90 60,140 L40,240 Z" fill="#FAFAFA" /> 
              <path d="M20,130 L60,155 L70,150 M50,140 L70,130 L80,135" stroke="#4AA5B8" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M70,150 L90,155" stroke="#FAFAFA" strokeWidth="2.5" /> 

              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent mix-blend-multiply"></div>
          </svg>

          <div className="absolute top-[8px] inset-x-0 flex justify-center">
              <span className="text-[#E50914] text-[9.5px] font-[800] tracking-[-0.6px] scale-y-[1.1] opacity-90 drop-shadow-md">
                 NETFLIX
              </span>
          </div>

          <div className="absolute inset-x-0 bottom-[14px] flex flex-col items-center justify-end z-10 pointers-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="text-[#FAFAFA] text-[13px] font-[900] transform scale-x-[1.1] tracking-[-0.8px] leading-[1] font-sans">
                  BLACK MIRROR
              </span>
          </div>
      </div>
  );


  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#0A0A0A] text-[#FAFAFA] font-sans relative select-none">
      
      {/* Universal Floating Header Status Bar */}
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


      {/* Dynamic Main App Scroll Pipeline */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar relative pb-[100px]">
          
          {/* Scroll Simulator Engine: Forcefully trims the previous row off-screen natively */}
          <div className="w-full flex gap-[8px] px-[12px] -mt-[175px] mb-[18px] opacity-80 pointer-events-none origin-bottom">
              {/* Dummy row representing the immediate scroll history */}
              <div className="flex-1 aspect-[2/3] bg-[#141414] rounded-[4px] relative overflow-hidden flex flex-col justify-end items-center pb-[8px]">
                  <span className="text-[#A3A3A3] font-[900] text-[16px] leading-[1]">st</span>
              </div>
              <div className="flex-1 aspect-[2/3] bg-[#160606] rounded-[4px] relative overflow-hidden flex flex-col justify-end">
                  <div className="w-[45px] h-[30px] bg-[#E50914] mb-[0px] ml-[10px]"></div>
              </div>
              <div className="flex-1 aspect-[2/3] bg-[#0E151A] rounded-[4px] relative"></div>
          </div>
          
          {/* Group 1: My List Node */}
          <div className="w-full text-center mt-[2px] mb-[14px]">
              <h1 className="text-[#FAFAFA] font-[800] text-[24px] tracking-tight drop-shadow-md">My List</h1>
          </div>

          <div className="grid grid-cols-3 gap-[8px] px-[12px] mb-[45px]">
              <BandersnatchPoster />
              <GridBodyguard />
              <SuitsPoster />
              <ArkangelPoster />
              {/* 2 natural empty slots remaining in the grid */}
          </div>


          {/* Group 2: Massive Promo Block Node ("Popular on Netflix") */}
          <div className="w-full text-center mb-[14px]">
              <h1 className="text-[#FAFAFA] font-[800] text-[24px] tracking-tight drop-shadow-md">Popular on Netflix</h1>
          </div>

          <div className="w-full h-[220px] relative px-[12px] mb-[40px]">
              <div className="w-full h-full relative rounded-[6px] overflow-hidden bg-[#D3D8DB] shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                   
                   {/* Background Collage: The Umbrella Academy Cast Art */}
                   <svg viewBox="0 0 200 120" className="absolute right-[-10px] top-0 h-[105%] w-[68%] object-cover pointer-events-none" preserveAspectRatio="xMaxYMid slice">
                       {/* Background graphic geometries matching the real promo poster composition */}
                       <path d="M80,120 C70,50 110,20 140,20 L180,120 Z" fill="#425044" /> {/* Luther Huge base */}
                       <circle cx="130" cy="35" r="14" fill="#D3AB95" />
                       
                       <path d="M30,120 L40,65 L80,65 L90,120 Z" fill="#1C1F2B" /> {/* Diego Outfit */}
                       <circle cx="60" cy="60" r="11" fill="#E8C5B3" />
                       <path d="M50,55 L70,55 L68,64 L52,64 Z" fill="#111" /> {/* Mask map */}
                       
                       <path d="M10,120 L25,75 L55,75 L70,120 Z" fill="#2E3C50" /> {/* Five Suit */}
                       <circle cx="40" cy="70" r="10" fill="#F0DCB8" />
                   
                       <ellipse cx="165" cy="85" rx="15" ry="32" fill="#69304F" /> {/* Allison / Feathers */}
                       <circle cx="158" cy="68" r="11" fill="#A87A60" />
                       
                       <path d="M160,120 L165,65 L200,80 L195,120 Z" fill="#5F2256" /> {/* Klaus Pattern */}
                       <circle cx="185" cy="75" r="10" fill="#F4DECA" />
                       <path d="M170,70 L195,45 L205,60" fill="none" stroke="#DDB296" strokeWidth="6" strokeLinecap="round"/> {/* Klaus waving hand abstract */}
                   
                       <path d="M60,120 L75,90 L115,90 L130,120 Z" fill="#111A22" /> {/* Vanya Base */}
                       <circle cx="95" cy="88" r="12" fill="#FAFAFA" />
                       <path d="M85,82 C95,95 105,75 105,75 C95,65 85,73 85,82" stroke="#111" strokeWidth="2.5" fill="none"/>
                       
                       <path d="M40,50 L50,60" stroke="#111" strokeWidth="5" strokeLinecap="round" /> {/* Spatial depth debris */}
                   </svg>
                   
                   {/* Promo Card Contrast Gradients */}
                   <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#D7DCDE] via-[#D7DCDE]/95 to-transparent z-10 mix-blend-normal"></div>
                   <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent z-10"></div>
                   
                   {/* Front Typography UI Layer */}
                   <div className="absolute inset-0 p-[16px] flex flex-col justify-end pointer-events-none z-20">
                        {/* Fake Rain overlay top left */}
                        <div className="absolute top-[5px] left-[16px] w-[50%] h-[30px] opacity-[0.25]">
                            <svg viewBox="0 0 100 20" className="w-full h-full">
                                <line x1="10" y1="0" x2="10" y2="10" stroke="#111" strokeWidth="1.5" />
                                <line x1="25" y1="5" x2="25" y2="15" stroke="#111" strokeWidth="1.5" />
                                <line x1="40" y1="2" x2="40" y2="12" stroke="#111" strokeWidth="1.5" />
                                <line x1="60" y1="8" x2="60" y2="18" stroke="#111" strokeWidth="1.5" />
                                <line x1="80" y1="0" x2="80" y2="10" stroke="#111" strokeWidth="1.5" />
                            </svg>
                        </div>
          
                        <span className="text-[#333333] text-[9px] font-[800] tracking-[0.6px] leading-tight">
                            NETFLIX <span className="font-[450]">ORIGINAL</span>
                        </span>
                        
                        {/* Title text pushing through gradient via pure white over grey */}
                        <h2 className="text-[#FAFAFA] font-[900] text-[25px] leading-[1.0] tracking-tight mt-[6px] font-['Arial_Narrow',sans-serif] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            THE<br/>UMBRELLA<br/>ACADEMY
                        </h2>
                        
                        {/* Metdata Groupings */}
                        <div className="flex items-center text-[#B0B0B0] text-[12px] font-[600] gap-[8px] mt-[16px] tracking-tight">
                            <span>2019</span>
                            <span className="bg-[#1C1C1C]/60 text-[#C0C0C0] px-[4px] py-[1.5px] rounded-[2px] text-[11px] font-[700] border border-[#555]/50 leading-tight">M18</span>
                            <span>1 Season</span>
                        </div>
                        
                        {/* Category Tag Nodes */}
                        <div className="flex items-center text-[#FAFAFA] text-[12px] font-[700] gap-[6px] mt-[6px] tracking-[0.2px]">
                            <span>Armageddon</span>
                            <div className="w-[3.5px] h-[3.5px] rounded-full bg-[#5CA3BD] mt-[1px]"></div>
                            <span>Time Travel</span>
                            <div className="w-[3.5px] h-[3.5px] rounded-full bg-[#5CA3BD] mt-[1px]"></div>
                            <span>Action</span>
                        </div>
                   </div>
          
                   {/* Native Card Launch Action */}
                   <div className="absolute bottom-[16px] right-[16px] w-[42px] h-[42px] bg-[#FAFAFA] rounded-full flex justify-center items-center shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-90 transition-transform cursor-pointer pointer-events-auto z-30">
                       <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#0A0A0A] ml-[3px] mt-[0.5px]">
                           <path d="M6 4l15 8-15 8z" strokeLinejoin="round" />
                       </svg>
                   </div>
              </div>
          </div>


          {/* Group 3: Sub-Featured Character Poster Row (Sex Education Visual Proxy) */}
          <div className="w-full flex gap-[6px] px-[12px] overflow-hidden -mt-[4px]">
              
              <div className="flex-1 max-w-[80px] h-[70px] bg-[#2E3C4D] flex-shrink-0 rounded-[3px] overflow-hidden">
                  <svg viewBox="0 0 60 70" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90">
                      <rect width="60" height="70" fill="#2E3C4D" />
                      <path d="M0,0 L60,0 L60,70 L0,70 Z" fill="#1F2833" opacity="0.4" style={{ filter: 'blur(5px)' }}/>
                      <path d="M10,70 Q30,30 50,70" fill="#E8C5B3" />
                      <path d="M15,40 Q30,20 45,40 L60,70 L0,70 Z" fill="#C4805A" opacity="0.9"/>
                      <circle cx="26" cy="50" r="1.5" fill="#111" />
                      <circle cx="36" cy="50" r="1.5" fill="#111" />
                  </svg>
              </div>

              <div className="flex-1 max-w-[80px] h-[70px] bg-[#1E2B38] flex-shrink-0 rounded-[3px] overflow-hidden">
                  <svg viewBox="0 0 60 70" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90">
                      <rect width="60" height="70" fill="#1E2B38" />
                      <path d="M10,70 Q30,30 50,70" fill="#4A3428" />
                      <circle cx="26" cy="50" r="1.5" fill="#111" />
                      <circle cx="36" cy="50" r="1.5" fill="#111" />
                  </svg>
              </div>

              <div className="flex-1 max-w-[80px] h-[70px] bg-[#3B4D60] flex-shrink-0 rounded-[3px] overflow-hidden">
                  <svg viewBox="0 0 60 70" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90">
                      <rect width="60" height="70" fill="#29394A" />
                      <path d="M10,70 Q30,30 50,70" fill="#F0DCB8" />
                      <path d="M-5,70 L10,35 Q30,15 50,35 L65,70 Z" fill="#E8C3AC" /> 
                      <circle cx="26" cy="50" r="1.2" fill="#111" />
                      <circle cx="36" cy="50" r="1.2" fill="#111" />
                  </svg>
              </div>

              <div className="flex-1 max-w-[80px] h-[70px] bg-[#1E2E3E] flex-shrink-0 rounded-[3px] overflow-hidden">
                  <svg viewBox="0 0 60 70" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90">
                      <rect width="60" height="70" fill="#182330" />
                      <path d="M10,70 Q30,30 50,70" fill="#DDB296" />
                      <path d="M20,35 Q30,15 40,35 L55,45 Q30,30 5,45 Z" fill="#1A110D" /> 
                      <circle cx="26" cy="48" r="1.5" fill="#111" />
                      <circle cx="36" cy="48" r="1.5" fill="#111" />
                  </svg>
              </div>

              <div className="flex-1 max-w-[80px] h-[70px] bg-[#223548] flex-shrink-0 rounded-[3px] overflow-hidden mr-[12px]">
                  <svg viewBox="0 0 60 70" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90">
                      <rect width="60" height="70" fill="#1E2A38" />
                      <path d="M10,70 Q30,30 50,70" fill="#4B332B" />
                      <circle cx="26" cy="48" r="2" fill="#E8EBED" />
                      <circle cx="36" cy="48" r="2" fill="#E8EBED" />
                      <circle cx="26" cy="48" r="1" fill="#111" />
                      <circle cx="36" cy="48" r="1" fill="#111" />
                  </svg>
              </div>
          </div>
      </div>

      {/* 5. Application Bottom Sheet Global Controller */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          {/* HOME Tab (Active Override) */}
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 active:scale-95 transition-transform">
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
