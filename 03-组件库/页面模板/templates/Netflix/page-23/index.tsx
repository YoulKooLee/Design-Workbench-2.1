import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * Reusable Horizontal Category Card (Adapted from Page 22)
 */
const HorizontalCard = ({ 
    titleNode, 
    year, rating, duration, 
    tags, dotColor="#7E7E7E",
    bgRight, bgLeftColor="#000000" 
}) => {
    return (
        <div className="w-full h-[155px] relative rounded-[4px] overflow-hidden mb-[8px] bg-black">
             {/* Base Right Vector injection */}
             <div className="absolute right-0 top-0 w-[70%] h-full z-0 overflow-hidden">
                 {bgRight}
             </div>
             
             {/* Deep Blending Gradients (Double layer CSS algorithm) */}
             <div 
                className="absolute inset-0 z-10 w-[95%] h-full" 
                style={{ background: `linear-gradient(to right, ${bgLeftColor} 50%, ${bgLeftColor}E6 70%, transparent 100%)` }}
             />
             <div 
                className="absolute inset-0 z-10 w-[55%] h-full" 
                style={{ background: bgLeftColor }}
             />
             
             {/* CSS Native Noise layer */}
             <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-[0.12] pointer-events-none z-15 mix-blend-overlay">
                 <filter id="noise23_card">
                     <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise23_card)" />
             </svg>

             {/* Content Overlay Data */}
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 pl-[14px] pb-[10px]">
                 
                 <div className="mb-[6px] w-[65%] min-h-[30px] flex items-end">
                     {titleNode}
                 </div>
                 
                 <div className="flex items-center gap-[6px] text-[#A3A3A3] text-[13px] font-semibold mb-1.5 opacity-90 tracking-tight">
                     <span>{year}</span>
                     {rating && (
                         <span className="border-[1.5px] border-[#555] bg-[#333]/40 px-[5px] pb-[1px] pt-[0.5px] rounded-[3px] leading-[1] text-[11px] text-[#E0E0E0] font-bold">
                             {rating}
                         </span>
                     )}
                     <span>{duration}</span>
                 </div>
                 
                 <div className="flex items-center text-[#EBEBEB] font-bold text-[12.5px] tracking-tight whitespace-nowrap overflow-hidden w-[85%]">
                     {tags.map((tag, idx) => (
                         <React.Fragment key={idx}>
                             <span>{tag}</span>
                             {idx < tags.length - 1 && (
                                 <span className="mx-[5px] text-[16px] leading-none mb-[2px] shadow-sm font-light" style={{color: dotColor, opacity: 0.9}}>
                                     •
                                 </span>
                             )}
                         </React.Fragment>
                     ))}
                 </div>
             </div>

             <div className="absolute bottom-3 right-3 w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center z-30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 transition-transform opacity-95">
                 <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] ml-1 fill-black">
                     <path d="M5 3l14 9-14 9V3z" />
                 </svg>
             </div>
        </div>
    )
}

/**
 * @name Netflix Home Filtered State (Series / Science & Nature) - Page 23
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none">
      
      {/* 1. Global Header (Transparent overlap) */}
      <div className="absolute top-0 w-full z-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent pt-3 pb-8 pointer-events-none">
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center px-6 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1">
              <span>3:01</span>
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

          {/* Navigation Category Drops */}
          <div className="flex items-center px-4 pt-1 pointer-events-auto">
              <div className="mr-5 ml-[2px]">
                  <svg className="w-[18px] h-[32px] drop-shadow-md" viewBox="0 0 24 40" fill="none">
                      <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                  </svg>
              </div>
              <div className="flex items-center gap-[22px]">
                  <div className="flex items-center gap-[1px] cursor-pointer drop-shadow-md">
                      <span className="text-white font-[600] text-[17px] tracking-[0.2px]">Series</span>
                      <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-white opacity-100 mt-[2px] ml-[1px]">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
                  <div className="flex items-center gap-[1px] cursor-pointer drop-shadow-md opacity-90">
                      <span className="text-[#C4C4C4] font-[500] text-[15.5px] tracking-tight">Science & Nature</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#C4C4C4] mt-[1px] ml-[2px]">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Scrollable Body Stream */}
      <div className="flex-1 overflow-y-auto pb-[100px] w-full bg-[#121212]">
          
          {/* ---- HERO TIER: EXTRAORDINARY HOMES ---- */}
          <div className="relative w-full h-[62vh] min-h-[460px] flex flex-col justify-end pb-[24px] bg-black">
              {/* Massive Hero Vector Background (Ocean / Boat House scene) */}
              <div className="absolute top-0 left-0 w-full h-[100%] z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[#06263A]"></div>
                  
                  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="w-[140%] h-[120%] -ml-[20%] -mt-[5%] opacity-[1] mix-blend-normal">
                      {/* True Sky */}
                      <rect width="200" height="200" fill="#78ABC6" />
                      <path d="M0,0 Q100,60 200,0 L200,65 L0,65 Z" fill="#A8C8E0" opacity="0.9"/>
                      
                      {/* Background Scottish/Nordic Hills */}
                      <path d="M0,60 Q50,56 120,62 Q160,65 200,60 L200,67 L0,67 Z" fill="#7B9850" />
                      <path d="M0,64 L200,64 L200,68 L0,68 Z" fill="#3D4B34" />
                      
                      {/* Deep Ocean Ripples Map */}
                      <path d="M0,66 L200,66 L200,200 L0,200 Z" fill="#3CA5D0" />
                      <path d="M0,85 Q50,75 100,85 T200,75 L200,200 L0,200 Z" fill="#1483B8" />
                      <path d="M0,120 Q50,110 100,125 T200,110 L200,200 L0,200 Z" fill="#0A5B8A" />
                      <path d="M0,165 Q60,150 120,180 T200,160 L200,200 L0,200 Z" fill="#032D48" />
                      
                      {/* Procedural Water Reflections */}
                      <path d="M20,95 Q40,90 60,95 M140,80 Q160,82 180,80 M80,105 Q100,108 120,105 M30,135 Q50,130 70,135 M150,140 Q170,135 190,140" fill="none" stroke="#68C7E8" strokeWidth="0.5" opacity="0.8"/>
                      <circle cx="150" cy="90" r="30" fill="#FFFFFF" opacity="0.2" filter="blur(10px)" />
                      
                      {/* Left Boathouse Structure */}
                      {/* Main wood shell */}
                      <path d="M30,20 L80,20 L90,50 L90,112 L20,112 L20,50 Z" fill="#304E67" /> 
                      <path d="M30,20 L55,0 L80,20 Z" fill="#203344" /> {/* Roof Pitch */}
                      <path d="M20,50 L55,10 L90,50 Z" fill="#1F364B" /> {/* Front Face Pitch */}
                      
                      {/* Planking & Windows */}
                      <path d="M30,60 L80,60 M30,70 L80,70 M30,80 L80,80 M30,90 L80,90 M30,100 L80,100" stroke="#162635" strokeWidth="1.2" opacity="0.8" />
                      <rect x="38" y="62" width="12" height="12" fill="#111B24" /> {/* Win L1 */}
                      <rect x="62" y="62" width="12" height="12" fill="#111B24" /> {/* Win R1 */}
                      <rect x="50" y="82" width="14" height="12" fill="#111B24" /> {/* Door/Win C2 */}
                      
                      {/* Pier / Lower structure */}
                      <path d="M0,105 L25,105 L30,118 L0,112 Z" fill="#697152" />
                      <path d="M20,115 L40,115 L45,122 L15,122 Z" fill="#4B607A" />
                      
                      {/* Right Touring Boat */}
                      <path d="M110,130 Q125,140 140,130 Q150,130 155,125 Q130,123 110,130 Z" fill="#152B3D" /> {/* Boat Base */}
                      <path d="M109,127 Q125,137 141,127 L140,130 Q125,140 110,130 Z" fill="#DEE1E5" /> {/* Trim */}
                      <path d="M152,122 L160,120 L158,127 L153,125 Z" fill="#111" /> {/* Engine */}
                      
                      {/* Tourists Onboard */}
                      <circle cx="120" cy="115" r="4.5" fill="#3D5068" />
                      <circle cx="130" cy="113" r="4" fill="#6C7B8B" />
                      <circle cx="140" cy="116" r="5" fill="#C21E1E" />
                      <path d="M116,115 L124,115 L126,128 L114,128 Z" fill="#3D5068" />
                      <path d="M127,113 L133,113 L135,126 L125,126 Z" fill="#6C7B8B" />
                      <path d="M136,116 L145,116 L147,128 L134,128 Z" fill="#A51A1A" />
                  </svg>
                  
                  {/* Cinematic Noise Injection */}
                  <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-[0.2] pointer-events-none z-10 mix-blend-overlay">
                       <filter id="noise23_hero">
                           <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/>
                       </filter>
                       <rect width="100%" height="100%" filter="url(#noise23_hero)" />
                  </svg>
                  
                  {/* Base Gradient Fade */}
                  <div className="absolute bottom-[-2px] w-full h-[50%] bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent z-20 pointer-events-none"></div>
              </div>

              {/* Hero Centered Stack Text */}
              <div className="relative z-30 flex flex-col items-center w-full px-4 mb-2">
                  
                  <div className="flex items-center text-white text-[10.5px] tracking-[1.5px] drop-shadow-[0_2px_4px_black] opacity-[0.95] mb-[2px]">
                      <span className="font-[800]">NETFLIX</span>
                      <span className="font-[300] ml-1">ORIGINAL</span>
                  </div>
                  
                  <div className="flex flex-col items-center mt-[-2px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-white font-[Arial,sans-serif] leading-[1.05] tracking-tight">
                       <span className="font-[600] text-[18.5px] letter-spacing-[-0.5px] mb-[-1px]">THE WORLD'S MOST</span>
                       <span className="text-[35px] font-[800] tracking-tighter">EXTRAORDINARY</span>
                       <span className="text-[35px] font-[800] tracking-tighter mt-[-4px]">HOMES</span>
                  </div>
                  
                  <div className="flex items-center text-white font-[500] text-[13px] tracking-tight drop-shadow-[0_2px_2px_black] opacity-[0.95] mt-[10px] space-x-[8px]">
                      <span>Home & Garden</span>
                      <span className="text-[#A2ABB5] text-[16px] leading-[0] mb-0.5">•</span>
                      <span>Docuseries</span>
                      <span className="text-[#A2ABB5] text-[16px] leading-[0] mb-0.5">•</span>
                      <span>Science & Nature</span>
                  </div>

                  {/* UI App Actions Dashboard */}
                  <div className="flex justify-center items-center w-full mt-[20px] gap-[44px] mb-2">
                      <div className="flex flex-col items-center cursor-pointer opacity-90 hover:opacity-100">
                          <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] stroke-white stroke-[1.5px] fill-none mb-1 drop-shadow-md">
                              <path d="M12 5v14m-7-7h14" />
                          </svg>
                          <span className="text-[#D1D1D1] text-[10.5px] font-medium tracking-tight">My List</span>
                      </div>
                      
                      <button className="bg-white text-black font-[700] text-[16px] tracking-tight flex items-center justify-center pl-4 pr-5 py-[6px] rounded-[3px] w-[115px] shadow-[0_2px_10px_rgba(0,0,0,0.5)] active:scale-95 transition-transform">
                          <Play size={24} fill="black" className="mr-1.5" />
                          Play
                      </button>
                      
                      <div className="flex flex-col items-center cursor-pointer opacity-90 hover:opacity-100">
                          <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] stroke-white stroke-[1.5px] fill-none mb-1 drop-shadow-md">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4m0-4h.01" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <span className="text-[#D1D1D1] text-[10.5px] font-medium tracking-tight">Info</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* ---- POPULAR ON NETFLIX FEED ---- */}
          <div className="w-full px-[6px] mt-2 mb-8">
              
              <h2 className="text-white font-[800] text-[24px] px-3 pt-6 pb-[16px] drop-shadow-sm tracking-tight text-center w-full">
                  Popular on Netflix
              </h2>

              {/* CARD 1: Extraordinary Homes (Circular home vector loop-back) */}
              <HorizontalCard 
                  bgLeftColor="#11120F"
                  titleNode={
                      <div className="flex flex-col drop-shadow-md mb-[2px] w-[120%] tracking-tight z-30">
                          <div className="flex items-center text-[7.5px] font-[800] tracking-[1.2px] mb-[1px]">
                              <span className="text-[#E6E6E6]">NETFLIX </span>
                              <span className="text-[#B3B3B3] font-[400] ml-1">ORIGINAL</span>
                          </div>
                          <span className="text-white font-[Arial,sans-serif] font-[700] text-[14px] leading-tight mb-[1px]">THE WORLD'S MOST</span>
                          <span className="text-white font-[Arial,sans-serif] font-[800] text-[21px] leading-[0.85] tracking-tighter mix-blend-plus-lighter">EXTRAORDINARY</span>
                          <span className="text-white font-[Arial,sans-serif] font-[800] text-[21px] leading-[0.85] tracking-[3px] mix-blend-plus-lighter">H O M E S</span>
                      </div>
                  }
                  year="2019" rating="G" duration="3 Seasons"
                  tags={['Home & Garden', 'Docuseries', 'Science & Na...']}
                  dotColor="#8C939A"
                  bgRight={
                     <div className="w-full h-full relative">
                        <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-8 -mt-2 opacity-95 mix-blend-luminosity" preserveAspectRatio="none">
                            <rect width="200" height="100" fill="#293910" />
                            <path d="M0,45 Q100,-10 200,45 L200,0 L0,0 Z" fill="#D38C3B" opacity="0.9"/> 
                            <path d="M100,25 Q130,40 180,25 L180,45 L100,45 Z" fill="#364023" />
                            {/* Circle Roof/Ring */}
                            <path d="M20,65 Q100,95 180,65 Q100,50 20,65 Z" fill="#E8EBED" /> 
                            <path d="M22,67 Q100,95 178,67 L178,85 Q100,115 22,85 Z" fill="#5F768B" />
                            <path d="M22,85 Q100,115 178,85 L178,89 Q100,119 22,89 Z" fill="#3E454A" />
                            {/* Inner lights */}
                            <rect x="50" y="70" width="8" height="14" fill="#8BB939" />
                            <rect x="150" y="65" width="8" height="12" fill="#568BCE" />
                            <rect x="165" y="61" width="6" height="10" fill="#D2E8F1" />
                            <rect x="110" y="75" width="12" height="15" fill="#ECA730" />
                            {/* Foliage */}
                            <path d="M0,100 L40,65 L60,85 L80,100 Z" fill="#1C210B" />
                            <path d="M140,100 L160,75 L180,90 L200,100 Z" fill="#252A14" />
                        </svg>
                     </div>
                  }
              />

              {/* CARD 2: planet earth (chopped view) */}
              <HorizontalCard 
                  bgLeftColor="#111F2E"
                  titleNode={<div className="h-[20px]"></div>} 
                  year="" rating="" duration=""
                  tags={[]}
                  dotColor="#8C939A"
                  bgRight={
                     <div className="w-full h-full relative">
                        <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-6 -mt-2 opacity-95" preserveAspectRatio="none">
                            <rect width="200" height="100" fill="#6985A1" />
                            <path d="M80,60 L100,20 L140,15 L160,50 L180,30 L200,60 L200,100 L80,100 Z" fill="#D4DEE5" />
                        </svg>
                     </div>
                  }
              />

          </div>
      </div>

      {/* 3. Global Edge Tab Bar */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#121212] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100">
              <Home size={24} strokeWidth={2.5} className="text-white fill-transparent" />
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

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none"></div>

    </div>
  );
}
