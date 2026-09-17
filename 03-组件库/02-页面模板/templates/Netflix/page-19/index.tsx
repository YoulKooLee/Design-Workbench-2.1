import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * Reusable Horizontal Category Details Card
 */
const HorizontalCard = ({ 
    titleNode, 
    year, rating, duration, 
    tags, dotColor="#7E7E7E",
    bgRight, bgLeftColor="#121212" 
}) => {
    return (
        <div className="w-full h-[155px] relative rounded-[4px] overflow-hidden mb-[8px] bg-black">
             {/* Right side image/vector container */}
             <div className="absolute right-0 top-0 w-[70%] h-full z-0 overflow-hidden">
                 {bgRight}
             </div>
             
             {/* Gradient Overlays for smooth blend */}
             <div 
                className="absolute inset-0 z-10 w-[95%] h-full" 
                style={{ background: `linear-gradient(to right, ${bgLeftColor} 50%, ${bgLeftColor}B3 75%, transparent 100%)` }}
             />
             <div 
                className="absolute inset-0 z-10 w-[50%] h-full" 
                style={{ background: bgLeftColor }}
             />
             
             {/* Cinematic Grain */}
             <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-10 pointer-events-none z-15 mix-blend-overlay">
                 <filter id="noise19_card">
                     <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise19_card)" />
             </svg>

             {/* Inner Content Data */}
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 pl-4 pb-[10px]">
                 
                 <div className="mb-2 w-[65%] min-h-[30px] flex items-end">
                     {titleNode}
                 </div>
                 
                 <div className="flex items-center gap-[6px] text-[#A3A3A3] text-[13px] font-semibold mb-1.5 opacity-90 tracking-tight">
                     <span>{year}</span>
                     {rating && (
                         <span className="border border-[#555] bg-[#333]/30 px-[5px] pb-[1px] pt-[0.5px] rounded-[3px] leading-none text-[11px] text-white/90">
                             {rating}
                         </span>
                     )}
                     <span>{duration}</span>
                 </div>
                 
                 <div className="flex items-center text-[#EBEBEB] font-bold text-[13px] tracking-tight whitespace-nowrap overflow-hidden w-[85%]">
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
                 </div>
             </div>

             {/* Native Play Button */}
             <div className="absolute bottom-3 right-3 w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center z-30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 transition-transform opacity-95">
                 <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] ml-1 fill-black">
                     <path d="M5 3l14 9-14 9V3z" />
                 </svg>
             </div>
        </div>
    )
}

/**
 * @name Netflix Home Filtered State (Page 19)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none">
      
      {/* 1. Global Header (Transparent overlap) */}
      <div className="absolute top-0 w-full z-40 bg-gradient-to-b from-black/80 via-black/30 to-transparent pt-3 pb-8 pointer-events-none">
          {/* iOS Status Bar */}
          <div className="flex justify-between items-center px-6 pb-2 text-[14px] font-bold tracking-tight text-white">
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

          {/* Navigation Category Drops */}
          <div className="flex items-center px-4 pt-1 pointer-events-auto">
              <div className="mr-5 ml-1">
                  <svg className="w-[18px] h-[32px] drop-shadow-md" viewBox="0 0 24 40" fill="none">
                      <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                  </svg>
              </div>
              <div className="flex items-center gap-6">
                  <div className="flex items-center gap-[3px] cursor-pointer drop-shadow-md">
                      <span className="text-white font-[600] text-[17px] tracking-tight">Films</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white opacity-100 mt-1">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
                  <div className="flex items-center gap-[3px] cursor-pointer drop-shadow-md">
                      <span className="text-[#C4C4C4] font-[400] text-[15px] tracking-tight">Award-Winning</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#C4C4C4] opacity-90 mt-0.5">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Scrollable Body Stream */}
      <div className="flex-1 overflow-y-auto pb-[100px] w-full bg-[#121212]">
          
          {/* ---- HERO TIER: ROMA ---- */}
          <div className="relative w-full h-[62vh] min-h-[460px] flex flex-col justify-end pb-4 bg-black">
              {/* Massive Hero Vector Background */}
              <div className="absolute top-0 left-0 w-full h-[100%] z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[#8C8C8C]"></div>
                  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="w-[140%] h-[120%] -ml-[20%] -mt-[5%] opacity-[0.85] mix-blend-multiply">
                     {/* Beach horizon */}
                     <path d="M0,90 L200,90 L200,200 L0,200 Z" fill="#3D3D3D" />
                     <path d="M0,0 L200,0 L200,90 L0,90 Z" fill="#C4C4C4" /> 
                     {/* Group hugging silhouette block */}
                     <path d="M40,160 Q100,50 150,160 Z" fill="#2E2E2E" /> 
                     {/* Individual simulated heads mapped to structure */}
                     <circle cx="85" cy="115" r="14" fill="#EAEAEA" /> 
                     <circle cx="105" cy="120" r="16" fill="#A3A3A3" /> 
                     <circle cx="125" cy="110" r="13" fill="#8C8C8C" /> 
                     <circle cx="65" cy="125" r="12" fill="#EAEAEA" /> 
                     {/* Sun glare left */}
                     <circle cx="60" cy="60" r="40" fill="#FFFFFF" filter="blur(15px)" opacity="0.6"/>
                  </svg>
                  
                  <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-15 pointer-events-none z-10 mix-blend-overlay">
                       <filter id="noise19_hero">
                           <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch"/>
                       </filter>
                       <rect width="100%" height="100%" filter="url(#noise19_hero)" />
                  </svg>
                  
                  {/* Base Gradient Fade */}
                  <div className="absolute bottom-[-2px] w-full h-[50%] bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent z-20"></div>
              </div>

              {/* Hero Inner Detail Text */}
              <div className="relative z-30 flex flex-col items-center w-full px-4">
                  <span className="text-white text-[12px] font-[800] tracking-[2.5px] drop-shadow-[0_2px_4px_black] opacity-95 mb-[-2px]">
                      A NETFLIX FILM
                  </span>
                  
                  {/* Custom ROMA Logo */}
                  <div className="text-[#EBC43B] font-['Arial'] tracking-[-4px] leading-none flex items-baseline outline-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] ml-[-8px]">
                      <span className="text-[96px] font-[300] scale-y-110 origin-bottom">R</span>
                      <span className="text-[76px] font-[400] ml-[-5px]">OMA</span>
                  </div>
                  
                  <div className="flex items-center text-white font-[500] text-[13px] tracking-tight drop-shadow-[0_2px_2px_black] opacity-[0.95] mt-1 space-x-[8px]">
                      <span>Mexico City</span>
                      <span className="text-[#EBC43B] text-[14px]">•</span>
                      <span>Visionary</span>
                      <span className="text-[#EBC43B] text-[14px]">•</span>
                      <span>Venice Film Festival</span>
                  </div>

                  {/* Actions Dashboard */}
                  <div className="flex justify-center items-center w-full mt-5 gap-12 mb-2">
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

          {/* ---- HORIZONTAL ROWS ---- */}
          <div className="w-full px-[6px] mt-2">
              
              <h2 className="text-white font-[800] text-[22px] px-3 pt-3 pb-3 drop-shadow-sm tracking-tight">
                  Popular on Netflix
              </h2>

              {/* CARD 1: ROMA (Re-listing) */}
              <HorizontalCard 
                  bgLeftColor="#161517"
                  titleNode={
                      <div className="flex flex-col drop-shadow-[0_2px_4px_black] mb-2 scale-y-105 origin-bottom-left">
                          <span className="text-white text-[7px] font-[800] tracking-[1.5px] mb-[-4px] opacity-90">A NETFLIX FILM</span>
                          <div className="text-[#EBC43B] font-['Arial'] tracking-[-2.5px] leading-none flex items-baseline">
                              <span className="text-[52px] font-[300]">R</span>
                              <span className="text-[42px] font-[400] ml-[-3px]">OMA</span>
                          </div>
                      </div>
                  }
                  year="2018" rating="M18" duration="2h 15m"
                  tags={['Mexico City', 'Visionary', 'Venice Film Festival']}
                  dotColor="#EBC43B"
                  bgRight={
                     <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-[#A9A9A9]"></div>
                        <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-90 mix-blend-multiply">
                           <path d="M0,60 L200,60 L200,100 L0,100 Z" fill="#3D3D3D" /> 
                           <path d="M40,100 Q110,10 180,100 Z" fill="#2E2E2E" /> 
                           <circle cx="95" cy="55" r="12" fill="#EAEAEA" />
                           <circle cx="115" cy="58" r="14" fill="#D3D3D3" />
                        </svg>
                     </div>
                  }
              />

              {/* CARD 2: THE (Cut-off frame mock) */}
              <HorizontalCard 
                  bgLeftColor="#080604"
                  titleNode={
                      <div className="flex items-center drop-shadow-[0_2px_4px_black] mt-4">
                          <span className="text-[#C69A45] font-serif font-[900] text-[26px] uppercase tracking-wider origin-left scale-x-110">THE</span>
                      </div>
                  }
                  year="" rating="" duration=""
                  tags={[]}
                  bgRight={
                     <div className="w-full h-full relative">
                        <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-10 -mt-2 opacity-90" preserveAspectRatio="none">
                            <rect width="200" height="100" fill="#140E10" /> 
                            {/* Retro neon pub setting */}
                            <path d="M100,50 Q130,20 160,50" fill="none" stroke="#BB2822" strokeWidth="4" opacity="0.85" />
                            <circle cx="80" cy="40" r="15" fill="#2A1B38" /> {/* Screen/TV */}
                            
                            {/* Assorted sitting figures */}
                            <circle cx="110" cy="80" r="12" fill="#D9A88F" />
                            <circle cx="140" cy="85" r="11" fill="#D9A88F" />
                            <circle cx="180" cy="75" r="14" fill="#D9A88F" />
                            <path d="M100,100 L110,90 L120,100 Z" fill="#3D4A50" />
                            <path d="M130,100 L140,95 L150,100 Z" fill="#4B3A36" />
                            <path d="M170,100 L180,85 L190,100 Z" fill="#5E636A" />
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
