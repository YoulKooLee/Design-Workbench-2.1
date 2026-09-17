import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * A highly specific horizontal list card for Netflix category rows
 */
const HorizontalCard = ({ 
    titleNode, 
    year, rating, duration, 
    tags, dotColor="#7E7E7E",
    bgRight, bgLeftColor="#000000" 
}) => {
    return (
        <div className="w-full h-[155px] relative rounded-[4px] overflow-hidden mb-[8px] bg-black">
             {/* Right side image/vector container */}
             <div className="absolute right-0 top-0 w-[70%] h-full z-0 overflow-hidden">
                 {bgRight}
             </div>
             
             {/* Gradient Overlays (Double layer for rich fade effect mimicking Netflix film gradients) */}
             <div 
                className="absolute inset-0 z-10 w-[95%] h-full" 
                style={{ background: `linear-gradient(to right, ${bgLeftColor} 50%, ${bgLeftColor}B3 75%, transparent 100%)` }}
             />
             <div 
                className="absolute inset-0 z-10 w-[50%] h-full" 
                style={{ background: bgLeftColor }}
             />
             
             {/* Cinematic Grain Overlay */}
             <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-10 pointer-events-none z-15 mix-blend-overlay">
                 <filter id="noise18">
                     <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise18)" />
             </svg>

             {/* Inner Content Data Area */}
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 pl-4 pb-[10px]">
                 
                 {/* Title Identity Area */}
                 <div className="mb-2 w-[65%] min-h-[30px] flex items-end">
                     {titleNode}
                 </div>
                 
                 {/* Numeric Metadata Row */}
                 <div className="flex items-center gap-[6px] text-[#A3A3A3] text-[13px] font-semibold mb-1.5 opacity-90 tracking-tight">
                     <span>{year}</span>
                     <span className="border border-[#555] bg-[#333]/30 px-[5px] pb-[1px] pt-[0.5px] rounded-[3px] leading-none text-[11px] text-white/90">
                         {rating}
                     </span>
                     <span>{duration}</span>
                 </div>
                 
                 {/* Semantic Tags Row */}
                 <div className="flex items-center text-[#EBEBEB] font-bold text-[13px] tracking-tight whitespace-nowrap overflow-hidden w-[85%] relative">
                     {tags.map((tag, idx) => (
                         <React.Fragment key={idx}>
                             <span>{tag}</span>
                             {idx < tags.length - 1 && (
                                 <span className="mx-[6px] text-[15px] leading-none mb-1 opacity-90" style={{color: dotColor}}>
                                     •
                                 </span>
                             )}
                         </React.Fragment>
                     ))}
                     {/* Soft Right Fade for long tags */}
                     <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-transparent"></div> {/* Not strictly needed based on image, but good practice, omitted for 1:1 if not visible */}
                 </div>
                 
             </div>

             {/* Native Play Button (Bottom Right) */}
             <div className="absolute bottom-3 right-3 w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center z-30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 transition-transform opacity-95">
                 <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] ml-1 fill-black">
                     <path d="M5 3l14 9-14 9V3z" />
                 </svg>
             </div>
        </div>
    )
}


/**
 * @name Netflix List Row Deep-Dive View (Page 18)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Header Setup */}
      <div className="absolute top-0 w-full z-40 bg-black/95 backdrop-blur-md pb-1 border-b border-[#222]">
          
          {/* Simulated scroll-occluded dropdown handler at top center */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-[#222] rounded-[3px] border-b border-[#333] flex justify-center items-end pb-0.5 z-30">
              <span className="text-[#888] text-[10px] font-bold tracking-widest leading-none">OWS  ▼</span>
          </div>

          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight text-white relative z-40">
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
          
          {/* Main List Title */}
          <div className="pt-2 pb-3 w-full flex justify-center">
              <h1 className="text-white font-[800] text-[26px] tracking-tight text-center drop-shadow-md">
                  Dramas based on a book
              </h1>
          </div>
      </div>

      {/* 2. Main Scrollable Stack */}
      <div className="flex-1 overflow-y-auto pt-[104px] pb-[100px] w-full px-[6px] bg-[#121212]">
          
          {/* ROW 1: THE BLIND SIDE */}
          <HorizontalCard 
              bgLeftColor="#050505"
              titleNode={
                  <span className="font-serif text-[20px] text-white tracking-[1px] uppercase drop-shadow-[0_2px_4px_black] opacity-95">THE BLIND SIDE</span>
              }
              year="2009" rating="PG" duration="2h 8m"
              tags={['Football', 'Tearjerker', 'Golden Globe']}
              dotColor="#7E7E7E"
              bgRight={
                  <div className="w-full h-full relative">
                      <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-10 -mt-2 opacity-90" preserveAspectRatio="none">
                          <rect width="200" height="100" fill="#4B423B" /> {/* Wall base */}
                          <rect x="120" y="0" width="80" height="100" fill="#7FAAB6" opacity="0.3" /> {/* Glass reflection */}
                          {/* Guy sitting */}
                          <path d="M60,100 L80,20 L120,20 L130,100 Z" fill="#999CA1" /> {/* Shirt */}
                          <path d="M80,100 L110,60 L140,100 Z" fill="#D2B48C" /> {/* Pants */}
                          <circle cx="100" cy="20" r="14" fill="#3B2E2A" /> {/* Dark Head */}
                          {/* Woman sitting */}
                          <path d="M140,100 L150,40 L170,40 L180,100 Z" fill="#E8EBEE" /> {/* Dress */}
                          <circle cx="160" cy="35" r="12" fill="#E8CDA6" /> {/* Blonde Face */}
                          <path d="M145,40 Q160,10 175,40 Z" fill="#F4E0A0" /> {/* Blonde Hair */}
                      </svg>
                  </div>
              }
          />

          {/* ROW 2: NOCTURNAL ANIMALS */}
          <HorizontalCard 
              bgLeftColor="#0D0412"
              titleNode={
                  <span className="font-['Arial'] font-bold text-[12px] text-white tracking-wide uppercase drop-shadow-[0_2px_4px_black]">NOCTURNAL ANIMALS</span>
              }
              year="2016" rating="M18" duration="1h 56m"
              tags={['Venice Film Festival', 'Golden Globe', 'Love &...']}
              dotColor="#E50914"
              bgRight={
                  <div className="w-full h-full relative">
                      <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-4 -mt-2 opacity-95" preserveAspectRatio="none">
                          {/* Eye / Face Canvas */}
                          <rect width="200" height="100" fill="#C59682" />
                          <circle cx="140" cy="40" r="15" fill="#FFFFFF" /> {/* Sclera */}
                          <circle cx="140" cy="40" r="7" fill="#45627E" /> {/* Iris */}
                          <circle cx="140" cy="40" r="3" fill="#1A181C" /> {/* Pupil */}
                          <path d="M120,30 Q140,20 160,30 L160,25 Q140,15 120,25 Z" fill="#2E1D1A" /> {/* Eyebrow */}
                          
                          {/* Desert overlay overlay (Multiply effect) */}
                          <path d="M0,70 Q50,60 100,50 L200,80 L200,100 L0,100 Z" fill="#D34F18" opacity="0.8" />
                          <path d="M0,60 Q30,40 60,70 L0,90 Z" fill="#F2A522" opacity="0.9" />
                          <path d="M50,80 L60,40 L70,80 Z" fill="#521B17" opacity="0.9" /> {/* Guy silhouette */}
                      </svg>
                  </div>
              }
          />

          {/* ROW 3: THE TOWN */}
          <HorizontalCard 
              bgLeftColor="#060814"
              titleNode={
                  <div className="flex items-start tracking-tighter mb-0 scale-y-110 origin-left drop-shadow-[0_2px_4px_black]">
                      <span className="text-[#DE1A12] font-[900] text-[10px] mt-[6.5px] mr-[2px]">THE</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E73926] via-[#D8251C] to-[#8C0A06] font-[900] text-[40px] leading-[0.75] font-['Arial_Black','Impact']">TOWN</span>
                  </div>
              }
              year="2010" rating="M18" duration="2h 4m"
              tags={['Heist', 'Action Thriller', 'Hollywood Film']}
              dotColor="#E50914"
              bgRight={
                  <div className="w-full h-full relative">
                      <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-4 -mt-2 opacity-95" preserveAspectRatio="none">
                          <rect width="200" height="100" fill="#9B6C62" /> {/* Brick wall base */}
                          <path d="M100,0 L100,100 M110,0 L110,100 M120,0 L120,100 M130,0 L130,100 M140,0 L140,100 M150,0 L150,100 M160,0 L160,100" stroke="#E3E3E3" strokeWidth="1" opacity="0.4" /> {/* Brick lines vertical */}
                          
                          {/* Cop inserting cash */}
                          <path d="M50,150 L60,50 L110,50 L120,150 Z" fill="#1C2130" /> {/* Dark Cop Uniform */}
                          <path d="M70,45 L100,45 L95,65 L75,65 Z" fill="#A8C4A6" /> {/* Stack of Cash */}
                          <rect x="120" y="50" width="30" height="30" fill="#141113" /> {/* Dark Drop Box */}
                          
                          <circle cx="85" cy="30" r="14" fill="#E1C6AF" /> {/* Cop Face profile */}
                          <path d="M70,20 L100,15 L95,25 L70,25 Z" fill="#12151D" /> {/* Cop Hat */}
                      </svg>
                  </div>
              }
          />

          {/* ROW 4: the Help */}
          <HorizontalCard 
              bgLeftColor="#23143B"
              titleNode={
                  <div className="flex items-end -ml-1 scale-y-105 origin-left mb-1 drop-shadow-[0_2px_4px_black]">
                      <span className="font-serif italic text-[#8B78A5] text-[26px] mr-[1px] leading-none mb-[2px]">the</span>
                      <span className="font-['Arial'] font-medium text-[#8B78A5] text-[48px] leading-[0.75] tracking-tighter">Help</span>
                  </div>
              }
              year="2011" rating="PG" duration="2h 26m"
              tags={['Tearjerker', '1960s', 'Golden Globe']}
              dotColor="#F3B32F"
              bgRight={
                  <div className="w-full h-full relative">
                      <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-12 -mt-2 opacity-95" preserveAspectRatio="none">
                          <rect width="200" height="100" fill="#758B5D" /> {/* Grass/Park base */}
                          {/* Women walking in 60s attire */}
                          {/* Woman 1 */}
                          <path d="M80,100 L70,30 L90,30 Z" fill="#B4377F" /> {/* Floral dress */}
                          <circle cx="80" cy="22" r="10" fill="#4B292E" /> {/* Dark Hair / Updo */}
                          {/* Woman 2 */}
                          <path d="M120,100 L110,35 L130,35 Z" fill="#DDDEE0" /> {/* Maid uniform White */}
                          <path d="M120,100 L115,45 L125,45 Z" fill="#4B5660" /> {/* Maid uniform Grey */}
                          <circle cx="120" cy="27" r="10" fill="#3D2924" />
                          {/* Woman 3 */}
                          <path d="M150,100 L140,30 L160,30 Z" fill="#E89BC0" /> {/* Pink dress */}
                          <circle cx="150" cy="22" r="10" fill="#D49942" /> {/* Blonde updo */}
                          {/* Woman 4 */}
                          <path d="M180,100 L170,35 L190,35 Z" fill="#4B5660" /> {/* Maid uniform grey */}
                          <path d="M180,100 L175,45 L185,45 Z" fill="#DDDEE0" /> {/* Whites */}
                          <circle cx="180" cy="27" r="10" fill="#3D2924" />
                      </svg>
                  </div>
              }
          />

          {/* ROW 5: Les Misérables (Cut-off) */}
          <HorizontalCard 
              bgLeftColor="#0A0605"
              titleNode={
                  <div className="flex items-start drop-shadow-[0_2px_4px_black] opacity-90">
                      <span className="font-serif italic font-bold text-[#E2C785] text-[24px] tracking-tight">Les Misérables</span>
                  </div>
              }
              year="2012" rating="PG13" duration="2h 38m"
              tags={['Musical', 'Period Piece', 'Oscar Winner']}
              dotColor="#E50914"
              bgRight={
                  <div className="w-full h-full relative">
                      <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-4 -mt-2 opacity-90" preserveAspectRatio="none">
                          <rect width="200" height="100" fill="#B8B4AE" /> {/* Building wall */}
                          <rect x="130" y="20" width="30" height="60" fill="#2C2F36" /> {/* Window */}
                          {/* Barricade & Flag */}
                          <path d="M40,100 L60,80 L140,80 L200,100 Z" fill="#3E342B" /> {/* Barricade wood */}
                          <line x1="80" y1="90" x2="120" y2="10" stroke="#796A5B" strokeWidth="4" /> {/* Flag pole */}
                          <path d="M120,10 Q140,20 160,15 L150,50 Q130,55 105,50 Z" fill="#C0101F" opacity="0.9" /> {/* Red Flag */}
                          <circle cx="110" cy="65" r="8" fill="#E0BC9E" /> {/* Enjolras */}
                          <path d="M100,80 L110,65 L120,80 Z" fill="#8B191D" /> {/* Red vest */}
                      </svg>
                  </div>
              }
          />

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
