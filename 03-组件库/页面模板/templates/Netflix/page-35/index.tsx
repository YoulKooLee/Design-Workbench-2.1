import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Vertical List Item Component
 */
const VerticalCard = ({ imgSrc, title, netflixBadge, specialBadge }) => (
    <div className="relative w-full aspect-[2/3] rounded-[5px] overflow-hidden bg-[#181818] shadow-[0_4px_10px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 transition-transform duration-200">
        <div className="absolute inset-0 w-full h-full object-cover">
           {imgSrc}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none mix-blend-multiply"></div>
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
        
        {netflixBadge && (
            <div className="absolute top-[5px] left-[5px] z-10 w-full">
                <span className="text-[#E50914] text-[7px] font-[900] tracking-[1px] leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">NETFLIX</span>
            </div>
        )}
        
        {specialBadge && (
             <div className="absolute top-0 right-[6px] z-10">
                 {specialBadge}
             </div>
        )}
        
        <div className="absolute bottom-[6px] inset-x-0 flex justify-center text-center z-10 px-[2px]">
            {title}
        </div>
    </div>
);

/**
 * Universal EdgetoEdge Landscape Row Item
 */
const LandscapeCard = ({ titleNode, imgSrc, year, rating, duration, tags, tagDotColor = "#FFF" }) => {
    return (
        <div className="relative w-full h-[148px] rounded-[6px] overflow-hidden mb-[10px] bg-[#1C1C1C] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 w-[110%] -ml-[5%] z-0 object-cover">
               {imgSrc}
            </div>
            <div className="absolute inset-x-0 left-0 w-[68%] h-full bg-gradient-to-r from-[#000000] via-[#0A0A0A]/85 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 left-0 w-[42%] h-full bg-[#000000] z-10 opacity-40 pointer-events-none"></div>
            
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-[12px] pb-[14px]">
                <div className="w-[75%] mb-[2px]">
                   {titleNode}
                </div>
                {(year || rating || duration) && (
                    <div className="flex items-center text-[#AFAFAF] text-[12px] font-[500] gap-[7px] mb-[4px] mt-[1px]">
                        {year && <span>{year}</span>}
                        {rating && (
                            <span className="bg-[#3D3D3D] text-[#EBEBEB] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-[1] mt-[1px]">
                                {rating}
                            </span>
                        )}
                        {duration && <span>{duration}</span>}
                    </div>
                )}
                {tags && tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-[5px] text-[#FAFAFA] font-[600] text-[12.5px] tracking-tight drop-shadow-md pb-[1px] w-[85%] leading-[1.3]">
                        {tags.map((tag, i) => (
                            <React.Fragment key={i}>
                                <span>{tag}</span>
                                {i < tags.length - 1 && (
                                    <span style={{ color: tagDotColor }} className="text-[20px] leading-none mt-[-2px] mx-[2.5px] opacity-90">·</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
            <div className="absolute bottom-[14px] right-[14px] z-30">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.8)] transform active:scale-95 transition-transform pt-[1px] pl-[2.5px] border-[1px] border-white/5 hover:bg-[#F2F2F2]">
                     <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black stroke-black stroke-1">
                         <path d="M5 3l15 9-15 9z" strokeLinejoin="round"/>
                     </svg>
                </div>
            </div>
        </div>
    )
}

/**
 * Interactive Bandersnatch Badge
 */
const InteractiveBadge = () => (
    <div className="relative w-[21px] h-[34px] overflow-hidden drop-shadow-md">
        <svg viewBox="0 0 20 32" className="w-full h-full fill-[#E50914]">
             <path d="M0,0 L20,0 L20,32 L10,25 L0,32 Z" />
        </svg>
        <div className="absolute top-[4px] inset-x-0 flex justify-center pt-[1px] pl-[0.5px]">
             <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-white stroke-[2.5px] fill-none">
                 {/* Standard 8-point interactive asterisk */}
                 <path d="M12,2 L12,22 M2,12 L22,12 M5.5,5.5 L18.5,18.5 M5.5,18.5 L18.5,5.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
        </div>
    </div>
);

/**
 * @name Netflix Hybrid Domain (My List Grid + Feed) - Page 35
 */
export default function NetflixApp() {

  // Feed Asset Matrix 1: BODYGUARD
  const bodyguardBg = (
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
          
          {/* Faux Blood Spatter Map */}
          <circle cx="28" cy="75" r="3" fill="#690A0A" />
          <circle cx="45" cy="95" r="2.5" fill="#690A0A" />
          <circle cx="70" cy="85" r="3.5" fill="#8B1111" />
          <path d="M30,105 Q35,110 32,120 Z" fill="#8B1111" />
          <path d="M75,115 Q78,122 72,130 Z" fill="#690A0A" />
          <circle cx="20" cy="110" r="3" fill="#8B1111" />
          <circle cx="95" cy="80" r="1.5" fill="#8B1111" />
      </svg>
  );

  const bodyguardTitle = (
      <span className="text-[#FAFAFA] text-[15.5px] font-[500] font-['Arial_Narrow',sans-serif] tracking-[1.5px] transform scale-y-[1.2] scale-x-[0.85] origin-bottom mb-[1.5px]">
          BODYGUARD
      </span>
  );

  // Feed Asset Matrix 2: BLACK MIRROR BANDERSNATCH
  const bandersnatchBg = (
      <svg viewBox="0 0 120 180" className="w-full h-full object-cover">
          <rect width="120" height="180" fill="#1C1813" /> 
          <circle cx="10" cy="60" r="50" fill="#E8DCD3" opacity="0.15" /> 
          <path d="M10,180 L0,140 Q60,110 120,130 L110,180 Z" fill="#4B5661" /> 
          <path d="M20,60 Q55,-10 95,60 Q105,100 85,140 Q60,160 30,140 Q10,100 20,60 Z" fill="#DFAC8F" />
          
          {/* Hair (Bleached spikey) */}
          <path d="M10,50 Q20,-5 60,-10 Q100,-5 110,50 Q85,20 60,15 Q35,20 10,50 Z" fill="#EAD29A" />
          <path d="M25,10 L30,15 L40,0 L50,15 L60,0 L70,15 L80,5" stroke="#EAD29A" strokeWidth="8" fill="none" strokeLinejoin="round" />
          
          <path d="M35,65 Q45,55 55,60" stroke="#B8976C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M65,60 Q80,45 90,65" stroke="#B8976C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          
          <path d="M30,75 Q40,70 50,75 Q40,80 30,75 Z" fill="#FFF" />
          <circle cx="38" cy="75" r="3" fill="#1A110D" />
          <path d="M65,75 Q75,70 85,75 Q75,80 65,75 Z" fill="#FFF" />
          <circle cx="73" cy="75" r="3" fill="#1A110D" />
          
          {/* Signature 80s Wire Glasses */}
          <rect x="20" y="65" width="38" height="32" rx="5" fill="none" stroke="#281A11" strokeWidth="1.5" />
          <rect x="65" y="65" width="36" height="32" rx="5" fill="none" stroke="#281A11" strokeWidth="1.5" />
          <path d="M58,75 L65,75 M20,75 L5,70 M101,75 L115,70" stroke="#281A11" strokeWidth="1.5" />
          <path d="M30,70 L50,90 M70,70 L90,90" stroke="#FFF" strokeWidth="2.5" opacity="0.25" fill="none" strokeLinecap="round" /> 

          <path d="M45,125 Q55,128 70,125" stroke="#875841" strokeWidth="2" fill="none" />
      </svg>
  );

  const bandersnatchTitle = (
      <div className="flex flex-col items-center leading-[0.98] drop-shadow-[0_2px_4px_black] mb-[1px]">
           <span className="text-[#FAFAFA] text-[12.5px] font-[900] tracking-[-0.2px] transform scale-y-[1.1] scale-x-[0.9]">
               BLACK MIRROR
           </span>
           <span className="text-[#FAFAFA] text-[12.5px] font-[900] tracking-[-0.2px] transform scale-y-[1.1] scale-x-[0.9]">
               BANDERSNATCH
           </span>
      </div>
  );

  // Feed Asset Matrix 3: SUITS
  const suitsBg = (
      <svg viewBox="0 0 120 180" className="w-full h-full object-cover">
          <rect width="120" height="180" fill="#E2E7EB" />
          
          {/* Mike Ross Vector Node */}
          <path d="M-10,180 L0,90 Q15,70 35,90 L60,180 Z" fill="#141E28" />
          <path d="M10,95 Q25,-5 60,15 Q45,55 35,95 Z" fill="#E8C5B3" /> 
          <path d="M20,15 Q35,-5 60,15 Q50,-10 15,0 Z" fill="#1F1511" /> 
          <path d="M10,95 L25,125 L40,95 Z" fill="#FAFAFA" /> 
          <path d="M22,105 L28,105 L28,125 L22,125 Z" fill="#0A0A0A" /> 
          <path d="M20,55 Q35,50 45,60" fill="none" stroke="#2B1D16" strokeWidth="2" />
          
          {/* Rachel Zane Vector Node */}
          <path d="M45,180 L50,110 Q80,80 120,110 L130,180 Z" fill="#1B2833" /> 
          <path d="M70,80 Q90,10 120,30 Q110,60 90,80 Z" fill="#D3A796" />
          <path d="M70,80 C60,40 100,-10 120,10 C130,50 110,120 110,180 C80,180 80,120 70,80 Z" fill="#0D0907" />
          <path d="M78,50 Q88,45 98,50" stroke="#0D0907" strokeWidth="2" fill="none" /> 
          <path d="M35,145 Q60,135 80,165 Z" fill="#D3A796" opacity="0.95" /> {/* Interlocking arm action */}
      </svg>
  );

  const suitsTitle = (
      <div className="mb-[15px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)] z-20">
           <span className="text-[#FFDC14] text-[34px] font-[800] font-sans tracking-[-1.5px] origin-center transform scale-y-[1.1] scale-x-[0.9]">
               SUITS
           </span>
      </div>
  );

  // Feed Asset Matrix 4: BLACK MIRROR (Arkangel)
  const blackMirrorBg = (
      <svg viewBox="0 0 120 180" className="w-full h-full object-cover">
          <rect width="120" height="180" fill="#9CB2C4" /> 
          
          <ellipse cx="60" cy="150" rx="55" ry="25" fill="#E8EBED" />
          <path d="M5,150 Q60,195 115,150 Q60,105 5,150 Z" fill="#7A93A6" />
          
          <path d="M10,180 L0,75 Q20,55 40,75 L55,180 Z" fill="#FAFAFA" /> 
          <path d="M10,60 Q20,30 40,40 Q35,65 20,60 Z" fill="#E8C5B3" />
          <path d="M10,60 Q20,20 45,40 Q35,10 5,30 Z" fill="#3D291F" /> 
          
          {/* Interaction Device Setup */}
          <path d="M20,95 Q50,85 70,105" stroke="#FAFAFA" strokeWidth="12" fill="none" strokeLinecap="round" />
          <circle cx="70" cy="105" r="7.5" fill="#3D82BA" /> 
          <path d="M75,105 L85,108 L98,122" stroke="#E8EBED" strokeWidth="2.5" fill="none" />
          
          <path d="M60,180 L45,140 Q70,125 95,140 L85,180 Z" fill="#D4B075" /> 
          <path d="M55,105 Q70,75 90,90 Q85,115 70,105 Z" fill="#F0DCB8" />
          <path d="M55,105 Q70,55 100,90 Q85,125 45,125 Q45,95 55,105 Z" fill="#E8D9A5" />
          
          {/* Floating UI Array prop */}
          <rect x="95" y="115" width="22" height="32" rx="2" fill="#E8EBED" transform="rotate(-15 95 115)" />
          <rect x="97" y="118" width="18" height="26" rx="1.5" fill="#D3DCE3" transform="rotate(-15 95 115)" />
      </svg>
  );

  const blackMirrorTitle = (
      <div className="flex flex-col justify-center items-center leading-[1.0] drop-shadow-[0_2px_6px_black] mb-[15px] z-20">
           <span className="text-[#FAFAFA] text-[16.5px] font-[900] tracking-[-0.2px] transform scale-y-[1.1] scale-x-[0.95]">
               BLACK MIRROR
           </span>
      </div>
  );

  // Landscape Feed Reused: UMBRELLA ACADEMY
  const umbrellaBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#E8EBED" />
           {Array.from({length: 12}).map((_, i) => (
               <path key={`rip-${i}`} d={`M${25 + i*18},0 L${25 + i*18},${8 + (i%4)*12}`} stroke="#5A6166" strokeWidth="2.5" strokeLinecap="round" />
           ))}
           <path d="M190,40 L195,35 L215,65 L210,70 Z" fill="#14181A" />
           <path d="M195,35 L200,30 L225,60 L220,65 Z" fill="#2E373B" />
           
           <path d="M260,70 L270,10 L310,10 L320,70 Z" fill="#4B584B" /> 
           <path d="M280,10 Q290,0 300,10 Q295,25 285,20 Z" fill="#DDBAA2" />
           
           <path d="M220,150 L240,85 Q250,80 260,85 L280,150 Z" fill="#691C21" /> 
           <path d="M250,85 Q260,75 270,85 Q265,100 255,100 Z" fill="#EFD2C0" />
           <path d="M250,85 C240,65 275,65 265,95" fill="none" stroke="#25160E" strokeWidth="6" />

           <path d="M245,80 L250,45 Q265,40 275,55 Z" fill="#202A36" /> 
           <path d="M258,42 Q270,38 275,50 Q265,58 255,55 Z" fill="#151A1F" /> 

           <path d="M280,150 L290,105 Q300,100 310,105 L320,150 Z" fill="#252D36" />
           <path d="M295,100 Q305,85 315,100 Q310,115 300,115 Z" fill="#E8C5B3" />
           
           <path d="M315,150 L325,100 Q335,95 345,100 L355,150 Z" fill="#4A2D35" />
           <path d="M330,100 Q340,85 350,100 Q345,115 335,115 Z" fill="#CQA895" />
           <path d="M325,100 C315,75 360,75 350,110" fill="none" stroke="#C2A277" strokeWidth="6" /> 

           <path d="M350,150 L360,85 Q375,80 390,85 L400,150 Z" fill="#181A1A" /> 
           <path d="M345,140 Q365,115 390,135" stroke="#9E1E8B" strokeWidth="12" fill="none" strokeLinecap="round" />
           <path d="M365,85 Q375,70 385,85 Q380,100 370,100 Z" fill="#EFCEBB" />
           <path d="M358,60 Q365,55 372,60 Q365,65 358,60 Z" fill="#EFCEBB" />
           
           <text x="355" y="55" fontSize="6.5" fontFamily="sans-serif" fill="#752828" transform="rotate(-15 355 55)">GOOD</text>
           <text x="357" y="62" fontSize="6.5" fontFamily="sans-serif" fill="#752828" transform="rotate(-15 357 62)">BYE</text>
      </svg>
  );

  const umbrellaTitle = (
      <div className="flex flex-col items-start leading-[0.95] drop-shadow-[0_4px_8px_black] mb-[5px] ml-[2px]">
           <span className="text-[5.5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[-0.3px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               THE
           </span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[0px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               UMBRELLA
           </span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[0px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               ACADEMY
           </span>
      </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-white font-sans relative select-none">
      
      {/* 1. Universal Top Navigation Context */}
      <div className="fixed top-0 w-full h-[95px] z-50 pointer-events-none flex flex-col pt-[8px]">
           {/* Hardcore ambient mask mimicking Netflix App scroll physics */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent backdrop-blur-[8px] mask-image-b"></div>
           
           <div className="flex justify-between items-center px-[28px] pb-[6px] relative z-50 mix-blend-plus-lighter drop-shadow-md">
               <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:55</span>
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
           
           <div className="flex items-center px-[22px] mt-[6px] relative z-50 pointer-events-auto">
               <div className="mr-[28px] mt-[-6px]">
                   <span className="text-[#E50914] font-[900] text-[36px] tracking-tight transform scale-y-[1.25] scale-x-[0.85] origin-left cursor-pointer drop-shadow-md">
                       N
                   </span>
               </div>
               <div className="flex-1 flex justify-between items-center text-[#FAFAFA] font-[500] text-[15px] tracking-[0.2px] drop-shadow-md pr-[12px] pt-[2px]">
                   <span className="cursor-pointer active:opacity-60 transition-opacity">Series</span>
                   <span className="cursor-pointer active:opacity-60 transition-opacity">Films</span>
                   <span className="cursor-pointer active:opacity-60 transition-opacity font-[700] tracking-tight">My List</span>
               </div>
           </div>
      </div>

      {/* 2. Primary Deep-Scroll Render Viewport */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#101010] pt-[8px]">
          
          <div className="flex flex-col w-full min-h-max pb-[20px] px-[8px]">
              
              {/* Category Root A (Grid Topology) */}
              <div className="mt-[85px] px-[2px]">
                  <h2 className="text-[#FAFAFA] font-[800] text-[25.5px] tracking-[0px] drop-shadow-md text-center w-full mb-[12px] z-20">
                      My List
                  </h2>
                  
                  {/* Dynamic Adaptive CSS Grid */}
                  <div className="grid grid-cols-3 gap-[8px]">
                      <VerticalCard imgSrc={bodyguardBg} title={bodyguardTitle} netflixBadge />
                      <VerticalCard imgSrc={bandersnatchBg} title={bandersnatchTitle} netflixBadge specialBadge={<InteractiveBadge />} />
                      <VerticalCard imgSrc={suitsBg} title={suitsTitle} />
                      <VerticalCard imgSrc={blackMirrorBg} title={blackMirrorTitle} netflixBadge />
                  </div>
              </div>

              {/* Category Root B (Edge-to-Edge List Topology) */}
              <div className="mt-[42px] mb-[60px]">
                  <h2 className="text-[#FAFAFA] font-[800] text-[25.5px] tracking-[-0.3px] drop-shadow-md text-center w-full mb-[12px] z-20">
                      Popular on Netflix
                  </h2>
                  
                  <LandscapeCard 
                      year="2019" rating="M18" duration="1 Season"
                      tags={['Armageddon', 'Time Travel', 'Action']} tagDotColor="#3E8EB3"
                      imgSrc={umbrellaBg}
                      titleNode={umbrellaTitle}
                  />
                  {/* Overflow naturally clamped by the system DOM via the absolute Nav bar below */}
              </div>

          </div>
      </div>

      {/* 3. Global Control Interface (Native Nav) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
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
                  <div className="absolute top-[-3px] right-[-6px] w-[15px] h-[15px] bg-[#0A84FF] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#0A0A0A]">
                      <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#FAFAFA] stroke-[4px] fill-none">
                           <path d="M4 12l4 4L20 6" />
                      </svg>
                  </div>
              </div>
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
