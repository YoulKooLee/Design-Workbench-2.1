import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * Reusable Vertical Poster Card (from Page 17 standard)
 */
const VerticalPoster = ({ titleNode, topTitle, bgGrad="from-[#1A1A1A] to-[#111111]", bgVector, children }) => (
    <div className="w-[124px] aspect-[2/2.95] relative bg-[#1A1A1A] rounded-[4px] overflow-hidden shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <div className={`absolute inset-0 bg-gradient-to-b ${bgGrad} mix-blend-normal z-0`} />
        {bgVector && <div className="absolute inset-0 z-0">{bgVector}</div>}
        
        {/* Fake ambient texture overlay to make it feel like a real poster */}
        <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-15 pointer-events-none z-10 mix-blend-overlay">
            <filter id="noise20_poster">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise20_poster)" />
        </svg>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-1 pb-2 z-20">
            {topTitle && (
                <div className="absolute top-1.5 left-0 w-full flex justify-center">
                    <span className="text-[#E50914] font-[900] text-[8.5px] tracking-[1.5px] drop-shadow-[0_2px_4px_black] z-30 opacity-[0.95]">
                        {topTitle}
                    </span>
                </div>
            )}
            {titleNode}
        </div>
        {children}
    </div>
);

/**
 * @name Netflix Home Filtered State (All Genres / Bird Box) - Page 20
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none">
      
      {/* 1. Global Header (Transparent overlap) */}
      <div className="absolute top-0 w-full z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-3 pb-8 pointer-events-none">
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
              <div className="mr-4 ml-1">
                  <svg className="w-[18px] h-[32px] drop-shadow-md" viewBox="0 0 24 40" fill="none">
                      <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                  </svg>
              </div>
              <div className="flex items-center gap-5">
                  <div className="flex items-center gap-[1px] cursor-pointer drop-shadow-md">
                      <span className="text-white font-[600] text-[17px] tracking-tight">Films</span>
                      <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-white opacity-100 mt-[2px] ml-[2px]">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
                  <div className="flex items-center gap-[1px] cursor-pointer drop-shadow-md opacity-90">
                      <span className="text-white font-[500] text-[15px] tracking-tight">All Genres</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white opacity-90 mt-[3px] ml-[2px]">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Scrollable Body Stream */}
      <div className="flex-1 overflow-y-auto pb-[100px] w-full bg-[#121212]">
          
          {/* ---- HERO TIER: BIRD BOX ---- */}
          <div className="relative w-full h-[62vh] min-h-[460px] flex flex-col justify-end pb-[28px] bg-black">
              {/* Massive Hero Vector Background */}
              <div className="absolute top-0 left-0 w-full h-[100%] z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-[#344654]"></div>
                  
                  {/* Custom SVG Illustration for Bird Box */}
                  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="w-[140%] h-[120%] -ml-[20%] -mt-[5%] opacity-[0.9] mix-blend-multiply">
                      {/* Water base */}
                      <path d="M0,100 Q50,90 100,105 T200,90 L200,200 L0,200 Z" fill="#1C2D38" />
                      <path d="M0,130 Q70,110 130,140 T200,120 L200,200 L0,200 Z" fill="#111B22" />
                      
                      {/* Malorie (Sandra Bullock) Right */}
                      <path d="M100,200 L115,50 L185,50 L195,200 Z" fill="#D3A78E" /> 
                      <path d="M115,0 Q150,0 185,50 L195,120 L105,120 Z" fill="#2E2428" /> {/* Hair */}
                      <rect x="110" y="60" width="80" height="30" fill="#151A24" transform="rotate(-5 150 75)" /> {/* Blindfold */}
                      <path d="M140,110 Q150,115 160,110 Q150,125 140,110 Z" fill="#754336" /> {/* Mouth / expression */}
                      
                      {/* Boy (Left) */}
                      <path d="M10,200 L40,85 L95,85 L115,200 Z" fill="#C49B85" />
                      <path d="M40,50 Q65,40 95,85 L95,140 L30,120 Z" fill="#3D2924" /> {/* Kid Hair */}
                      <rect x="35" y="80" width="65" height="26" fill="#1E282E" transform="rotate(-15 65 90)" /> {/* Kid Blindfold */}
                      
                      {/* Arm wrapping dynamically */}
                      <path d="M110,165 Q60,110 10,135 L5,165 Q80,150 120,200 Z" fill="#AD8168" />
                  </svg>
                  
                  {/* Cinematic Grain Overlay */}
                  <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-[0.25] pointer-events-none z-10 mix-blend-overlay">
                       <filter id="noise20_hero">
                           <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/>
                       </filter>
                       <rect width="100%" height="100%" filter="url(#noise20_hero)" />
                  </svg>
                  
                  {/* Base Gradient Fade */}
                  <div className="absolute bottom-[-2px] w-full h-[50%] bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent z-20 pointer-events-none"></div>
              </div>

              {/* Hero Inner Detail Text */}
              <div className="relative z-30 flex flex-col items-center w-full px-4 mb-2">
                  <span className="text-white text-[11px] font-[800] tracking-[2px] drop-shadow-[0_2px_4px_black] opacity-95 mb-[0px]">
                      A NETFLIX FILM
                  </span>
                  
                  {/* Distressed "BIRD BOX" Typographic Integration */}
                  <div className="font-['Impact','Arial_Black'] text-[62px] transform scale-y-[1.1] scale-x-[0.9] tracking-[9px] ml-3 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)] relative overflow-visible mt-2" style={{ letterSpacing: '8.5px' }}>
                       <span className="relative z-10 text-transparent bg-clip-text bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20100%20100%22%20preserveAspectRatio=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect%20width=%22100%22%20height=%22100%22%20fill=%22%23F5F5F5%22/%3E%3Cpath%20d=%22M5%200L2%20100M15%200L18%20100M35%200L31%20100M60%200L58%20100M85%200L90%20100M95%200L92%20100%22%20stroke=%22%23121212%22%20stroke-width=%220.8%22%20opacity=%220.7%22/%3E%3C/svg%3E')]">
                           BIRD BOX
                       </span>
                  </div>
                  
                  <div className="flex items-center text-white font-[500] text-[13px] tracking-tight drop-shadow-[0_2px_2px_black] opacity-[0.95] mt-3 space-x-[8px]">
                      <span>Sci-Fi Drama</span>
                      <span className="text-[#647885] text-[15px]">•</span>
                      <span>Post Apocalypse</span>
                      <span className="text-[#647885] text-[15px]">•</span>
                      <span>Auteur Cinema</span>
                  </div>

                  {/* Actions Dashboard */}
                  <div className="flex justify-center items-center w-full mt-[18px] gap-[44px] mb-2">
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

          {/* ---- MY LIST CAROUSEL ---- */}
          <div className="w-full px-[6px] mt-2 mb-8">
              
              <h2 className="text-white font-[800] text-[22px] px-3 pt-4 pb-[18px] drop-shadow-sm tracking-tight text-center w-full">
                  My List
              </h2>

              <div className="flex overflow-x-auto px-[10px] pb-6 gap-[8px] hide-scrollbar">
                  
                  {/* CARD 1: BANDERSNATCH */}
                  <VerticalPoster 
                      bgGrad="from-[#E3DCD1] via-[#A89885] to-[#121516]"
                      topTitle="NETFLIX"
                      bgVector={
                          <svg viewBox="0 0 100 150" className="w-full h-full opacity-[0.95]">
                              <path d="M20,60 Q50,0 80,60 L75,40 Q50,-10 25,40 Z" fill="#E1CFB0" /> {/* Hair */}
                              <circle cx="50" cy="65" r="32" fill="#E8C9AA" /> {/* Face */}
                              {/* Retro Glasses */}
                              <rect x="23" y="55" width="22" height="18" fill="none" stroke="#2C2C29" strokeWidth="1.5" rx="2" />
                              <rect x="55" y="55" width="22" height="18" fill="none" stroke="#2C2C29" strokeWidth="1.5" rx="2" />
                              <line x1="45" y1="62" x2="55" y2="62" stroke="#2C2C29" strokeWidth="1.5" />
                              <path d="M20,150 L30,105 L70,105 L80,150 Z" fill="#4B4B48" /> {/* Shirt */}
                          </svg>
                      }
                      titleNode={
                          <div className="absolute bottom-[4px] w-full flex flex-col items-center leading-none">
                              <span className="text-white font-[900] text-[12.5px] font-[Arial] tracking-tight drop-shadow-[0_2px_4px_black] uppercase scale-x-[0.95]">Black Mirror</span>
                              <span className="text-white font-[900] text-[13.5px] font-[Arial] tracking-tight drop-shadow-[0_2px_4px_black] uppercase scale-x-[0.95] mt-[-2px]">Bandersnatch</span>
                          </div>
                      }
                  >
                      {/* Interactive Badge Redux */}
                      <div className="absolute top-0 right-2 w-[24px] h-[36px] bg-[#E50914] z-30 flex justify-center pt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                          <svg viewBox="0 0 100 100" className="w-[15px] h-[15px] fill-white drop-shadow-sm mt-0.5">
                              <path d="M50,-10 Q50,40 110,50 Q50,60 50,110 Q50,60 -10,50 Q50,40 50,-10 Z" />
                          </svg>
                      </div>
                  </VerticalPoster>

                  {/* Empty/Placeholder space allowing native scroll inference */}
                  <div className="w-[124px] aspect-[2/2.95] shrink-0"></div>
              </div>
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
