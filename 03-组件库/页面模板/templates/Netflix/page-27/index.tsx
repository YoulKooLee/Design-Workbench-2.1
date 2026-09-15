import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * Vertical Poster Component (My List Grid)
 */
const VerticalPoster = ({ svgGraphic, isNetflixOriginal, titleNode, interactiveBadge }) => {
    return (
        <div className="relative flex-none w-[114px] h-[164px] rounded-[4px] overflow-hidden bg-[#181818] shadow-md border-[0.5px] border-white/5">
            {/* Primary SVG Data */}
            <div className="absolute inset-0 z-0">
                {svgGraphic}
            </div>
            
            {/* Edge Blackening (Visual weight at bottom for text contrast) */}
            <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>
            
            {/* Optional Top Left Netflix Flag */}
            {isNetflixOriginal && (
                <div className="absolute top-[5px] left-[6px] z-20">
                    <span className="text-[#E50914] font-['Arial_Black',sans-serif] font-[900] text-[6.5px] tracking-tight uppercase transform scale-y-[1.1] scale-x-[0.9] drop-shadow-md block">
                        NETFLIX
                    </span>
                </div>
            )}
            
            {/* Optional Custom Corner Ribbon (Interactive path badges) */}
            {interactiveBadge && (
                <div className="absolute top-0 right-[6px] z-20 w-[22px] h-[32px] bg-[#E50914] shadow-md flex justify-center pt-[5px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)'}}>
                    {interactiveBadge}
                </div>
            )}
            
            {/* Typography Overlays */}
            {titleNode}
        </div>
    )
}

/**
 * @name Netflix Filtered Home State - Page 27 (My List active focus)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#000000] text-white font-sans relative select-none">
      
      {/* 1. Global Navigation Transparency Layer */}
      <div className="absolute top-0 w-full z-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent pt-3 pb-8 pointer-events-none">
          {/* Hardware iOS Status Bar Segment */}
          <div className="flex justify-between items-center px-6 pb-2 text-[14px] font-bold tracking-tight text-white">
            <div className="flex items-center gap-1 drop-shadow-md">
              <span>3:00</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-90 drop-shadow-md">
              {/* Cellular RF Array */}
              <div className="flex gap-[3px] items-end h-[12px]">
                 <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[6px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                 <div className="w-[3px] h-[12px] bg-white rounded-[1px]"></div>
              </div>
              {/* Energy Cell Configuration */}
              <div className="relative transform scale-90 -mr-1">
                <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                  <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                  <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                </svg>
                <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
              </div>
            </div>
          </div>

          {/* Software Navbar (Brand & Filters) */}
          <div className="flex items-center px-4 pt-1 pointer-events-auto min-h-[30px]">
              {/* Netflix Vector Flag */}
              <div className="mr-[22px] ml-[2px]">
                  <svg className="w-[18px] h-[32px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" viewBox="0 0 24 40" fill="none">
                      <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                  </svg>
              </div>
              {/* Filter Sub-Controllers */}
              <div className="flex items-center gap-[20px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-[2px] cursor-pointer opacity-100 hover:opacity-80 active:scale-95 transition-all">
                      <span className="text-white font-[600] text-[17.5px] tracking-[0.2px]">Series</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white opacity-100 mt-[2px]">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
                  <div className="flex items-center gap-[2px] cursor-pointer opacity-[0.85] hover:opacity-100 active:scale-95 transition-all">
                      <span className="text-white font-[500] text-[16px] tracking-tight">All Genres</span>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white mt-[2px] opacity-90">
                          <path d="M7 10l5 5 5-5z" />
                      </svg>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. Scrolling Content Container */}
      <div className="flex-1 overflow-y-auto w-full bg-[#060606] custom-hide-scrollbar" style={{ paddingBottom: '100px' }}>
          
          {/* === MASSSIVE HERO BANNER (BODYGUARD TIER 1) === */}
          <div className="relative w-full h-[62vh] min-h-[460px] flex flex-col justify-end bg-black/90 pb-[4px]">
              
              {/* Core Hero Illustration Vector (Handcoded SVG) */}
              <div className="absolute top-0 left-0 w-full h-[100%] z-0 overflow-hidden bg-[#242A30]">
                  <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="w-[125%] h-[115%] -ml-[12%] -mt-[3%] opacity-[0.95]">
                      {/* Depth Field Context */}
                      <rect width="200" height="250" fill="#4B5660" />
                      <path d="M0,0 Q100,20 200,0 L200,250 L0,250 Z" fill="#2E343A" />
                      
                      {/* Matte Vehicle Geometry (Left edge scale) */}
                      <path d="M-10,130 Q30,130 55,160 T50,260 L-10,260 Z" fill="#14171A" />
                      <path d="M-10,145 Q25,150 28,190" stroke="#32383D" strokeWidth="2.5" fill="none" /> 
                      <path d="M28,190 Q30,220 20,250" stroke="#252A2E" strokeWidth="1.5" fill="none" /> 
                      
                      {/* Character #1: The Woman (Right Foreground) */}
                      <g className="woman-layer">
                          {/* Rich Ultramarine Blazer Array */}
                          <path d="M60,250 L65,150 Q80,105 130,105 T210,125 L210,250 Z" fill="#0C57A3" />
                          <path d="M125,110 L105,165 L145,170 Z" fill="#083E75" />
                          <path d="M105,165 L135,260 L115,260 Z" fill="#05274A" /> 
                          {/* Inner Shadow / Blouse Cut */}
                          <path d="M115,130 L135,105 L155,115 L145,170 Z" fill="#181A1C" />
                          <path d="M135,105 L155,115 L145,130 Z" fill="#A87F6F" opacity="0.6"/> {/* Neck shadow */}
                          
                          {/* Organic Face & Hair Matrices */}
                          <path d="M115,105 Q115,45 150,45 T185,100 Q155,125 115,105 Z" fill="#CF9B82" />
                          <path d="M115,105 Q120,70 150,60 T185,100" fill="#B08069" opacity="0.4" /> {/* cheek tone */}
                          {/* Flowing Brunette Hair Sweeps */}
                          <path d="M105,85 C115,25 185,25 190,55 C190,85 185,95 175,95 C185,65 145,25 105,85 Z" fill="#3D2924" /> 
                          <path d="M120,40 Q150,25 170,45" stroke="#261A16" strokeWidth="4" fill="none" />
                          <path d="M110,65 C100,50 140,5 185,55" fill="none" stroke="#4A342E" strokeWidth="2" />
                          {/* Distinctive Features */}
                          <path d="M115,65 Q125,60 135,65" fill="none" stroke="#5E4039" strokeWidth="2.5" /> 
                          <path d="M150,65 Q160,60 170,65" fill="none" stroke="#5E4039" strokeWidth="2.5" />
                          <circle cx="130" cy="75" r="2.5" fill="#181A1B" /> 
                          <circle cx="160" cy="75" r="2.5" fill="#181A1B" />
                          <path d="M140,75 L140,88 L150,88" stroke="#875E4D" strokeWidth="1.5" fill="none" /> 
                          <path d="M140,100 Q150,105 155,100" stroke="#9C473A" strokeWidth="2.5" fill="none" /> {/* Distinct stern lip */}
                          
                          {/* Focal Prop: Red Brief Folder */}
                          <path d="M105,250 L80,180 L185,145 L205,200 L145,250 Z" fill="#99151A" />
                          <path d="M83,180 L185,147" stroke="#DB9A21" strokeWidth="2" /> 
                          <path d="M183,145 L203,200" stroke="#DB9A21" strokeWidth="1.5" /> 
                          <path d="M155,205 Q160,200 165,205 Q160,210 155,205 Z" fill="#DB9A21" /> {/* Seal/emblem mass */}
                      </g>

                      {/* Character #2: The Man (Left Background Offset) */}
                      <g className="man-layer">
                          {/* Charcoal Suit Geometry */}
                          <path d="M5,250 L5,135 Q35,115 65,115 T105,155 L105,250 Z" fill="#1C1F21" />
                          <path d="M35,115 L45,155 L75,120 Z" fill="#282B2E" /> 
                          <path d="M105,155 L90,120 L75,120 Z" fill="#2E3338" /> 
                          {/* Ice Blue Button-down & Tie block */}
                          <path d="M45,145 L55,120 L68,120 L60,155 Z" fill="#7192B8" />
                          <path d="M55,135 L60,135 L60,250 L50,250 Z" fill="#3D4247" /> {/* Tactical tie */}
                          <path d="M52,130 L63,125 L60,140 Z" fill="#292D30" /> {/* Tie Knot */}

                          {/* Organic Face & Structured Hair Matrices */}
                          <path d="M35,120 Q25,65 50,65 T85,120 Q60,135 35,120 Z" fill="#E0A78E" /> 
                          <path d="M35,120 Q40,90 85,120 Q60,135 35,120 Z" fill="#BD8973" opacity="0.3" /> {/* shadow jawline */}
                          {/* Military crop hair mapping */}
                          <path d="M25,75 Q40,30 75,30 T95,75 L90,65 Q70,40 35,65 Z" fill="#452D23" /> 
                          <path d="M40,55 Q60,35 80,55 Q60,40 40,55 Z" fill="#221510" opacity="0.4"/> {/* grain shading */}
                          {/* Features */}
                          <path d="M40,80 Q50,78 50,83" fill="none" stroke="#251711" strokeWidth="2.5" /> 
                          <path d="M65,80 Q75,78 75,83" fill="none" stroke="#251711" strokeWidth="2.5" /> 
                          <circle cx="45" cy="90" r="1.8" fill="#0A0C0D" />
                          <circle cx="70" cy="90" r="1.8" fill="#0A0C0D" />
                          <path d="M57,90 L57,105 L63,105" stroke="#A87560" strokeWidth="2" fill="none" /> {/* sharp nose */}
                          <path d="M50,115 Q57,117 65,115" stroke="#AA6550" strokeWidth="2" fill="none" /> {/* flat stoic mouth */}
                      </g>
                  </svg>
                  
                  {/* Environmental Sub-surface Scattering Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[#0A0F14]/20 z-10 pointer-events-none"></div>
                  {/* Heavy Base Anchor Filter to pop text */}
                  <div className="absolute bottom-[-10px] w-full h-[60%] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent z-20 pointer-events-none"></div>
              </div>

              {/* Title & Interaction Overlay Engine */}
              <div className="relative z-30 flex flex-col items-center w-full px-4 mb-2 mt-auto">
                  
                  {/* Signature Branding Drop */}
                  <div className="flex items-center text-white text-[10px] tracking-[1.5px] drop-shadow-[0_2px_4px_black] opacity-[0.95] mb-[2px]">
                      <span className="font-[800]">NETFLIX</span>
                      <span className="font-[300] ml-1">ORIGINAL</span>
                  </div>
                  
                  {/* Primary Typography Treatment (High compression & extreme tracking) */}
                  <div className="flex justify-center w-full mt-[-6px] drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] pb-[2px]">
                       <span className="text-[44px] tracking-[7px] text-white font-['Arial',sans-serif] font-[400] transform scale-y-[1.65] scale-x-[0.8] mix-blend-plus-lighter w-full text-center pr-[12px] whitespace-nowrap">
                           BODYGUARD
                       </span>
                  </div>
                  
                  {/* Meta Keyword Identification Track */}
                  <div className="flex items-center justify-center flex-wrap text-white font-[500] text-[13px] tracking-tight drop-shadow-[0_2px_2px_black] opacity-[0.95] mt-[18px] space-x-[7px] w-full max-w-[90%]">
                      <span>London</span>
                      <span className="text-[#E50914] text-[8px] mt-[1px]">●</span>
                      <span>Golden Globe</span>
                      <span className="text-[#E50914] text-[8px] mt-[1px]">●</span>
                      <span>Mystery</span>
                      <span className="text-[#E50914] text-[8px] mt-[1px]">●</span>
                      <span>TV</span>
                      <span className="text-[#E50914] text-[8px] mt-[1px]">●</span>
                      <span>Drama</span>
                  </div>

                  {/* UI App Control Action Panel */}
                  <div className="flex justify-center items-center w-full mt-[18px] gap-[40px] mb-2 px-6">
                      {/* Active Toggle State -> My List Checkmark */}
                      <div className="flex flex-col items-center cursor-pointer opacity-90 transition-opacity flex-1">
                          <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] stroke-white stroke-[2.2px] fill-none mb-[3px] drop-shadow-md">
                              <path d="M5 12l4.5 4.5L19 7" strokeLinecap="square" strokeLinejoin="miter" />
                          </svg>
                          <span className="text-[#969696] text-[10.5px] font-[500] tracking-tight">My List</span>
                      </div>
                      
                      {/* Central Action CTA */}
                      <button className="bg-white text-black font-[700] text-[16px] tracking-tight flex items-center justify-center pl-4 pr-5 py-[5.5px] rounded-[3px] w-[110px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-95 transition-transform flex-none">
                          <Play size={24} fill="black" className="mr-1.5" />
                          Play
                      </button>
                      
                      <div className="flex flex-col items-center cursor-pointer opacity-90 transition-opacity flex-1">
                          <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] stroke-white stroke-[1.8px] fill-none mb-[3px] drop-shadow-md pb-[1px]">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4m0-4h.01" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <span className="text-[#D1D1D1] text-[10.5px] font-[500] tracking-tight">Info</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* === VERTICAL ROW ENGINE (MY LIST) === */}
          <div className="w-full mt-2 mb-6 pointer-events-auto bg-[#0A0A0A]">
              
              <h2 className="text-white font-[800] text-[26px] px-3 pt-6 pb-[20px] drop-shadow-sm tracking-tight text-center w-full">
                  My List
              </h2>

              {/* Native Mobile Horizontal Flow Reel (Hide Scrollbar) */}
              <div className="flex px-[10px] gap-[8px] overflow-x-auto pb-4 custom-hide-scrollbar">
                  
                  {/* Poster #1: Bodyguard Internal Match */}
                  <VerticalPoster 
                      isNetflixOriginal={true}
                      svgGraphic={
                          <svg viewBox="0 0 100 150" className="w-[120%] h-[120%] -ml-[10%] -mt-[2%] opacity-100">
                              {/* Background Block */}
                              <rect width="100" height="150" fill="#1B2834" />
                              <path d="M0,0 Q50,75 100,0 L100,150 L0,150 Z" fill="#131C24" />
                              
                              {/* Suit Frame */}
                              <path d="M10,150 L20,100 L80,100 L90,150 Z" fill="#1C2329" />
                              <path d="M45,100 L50,130 L55,100 Z" fill="#0A0E12" /> 
                              <path d="M40,100 L45,120 L50,110 L40,100 Z" fill="#5F7182" /> 
                              <path d="M60,100 L55,120 L50,110 L60,100 Z" fill="#5F7182" />
                              
                              {/* Tensed Upward Glancing Face */}
                              <path d="M25,100 Q15,40 45,30 T85,55 Q85,80 75,100 Z" fill="#E8BDAD" />
                              <path d="M30,50 Q15,60 30,90 Q40,85 30,50 Z" fill="#C5907B" opacity="0.6" /> {/* cheek shadow */}
                              {/* Dark Cropped Hair */}
                              <path d="M45,30 Q30,15 50,10 T80,25 Q90,35 85,50 T75,40 Q60,20 45,30 Z" fill="#2E231C" /> 
                              <path d="M40,40 Q60,25 70,40 Q60,30 40,40 Z" fill="#111" opacity="0.4" />
                              
                              {/* Intense Shadowing & Facial Detailing */}
                              <path d="M45,50 Q40,65 55,60" stroke="#925942" strokeWidth="2.5" fill="none" /> 
                              <path d="M60,50 Q66,60 70,55" stroke="#925942" strokeWidth="2.5" fill="none" />
                              <circle cx="45" cy="65" r="2.5" fill="#1A1F24" />
                              <circle cx="65" cy="68" r="2.5" fill="#1A1F24" />
                              <path d="M45,50 Q43,55 48,58" stroke="#F5DFD5" strokeWidth="1" fill="none" /> {/* highlight */}
                              <path d="M50,85 Q60,88 65,85" stroke="#9E5D4B" strokeWidth="1.5" fill="none" /> 
                              <path d="M52,85 Q60,88 63,85" stroke="#3A221C" strokeWidth="0.5" fill="none" /> {/* mouth inset */}
                              
                              {/* Gore FX Overlay Pattern Grid (Blood Spray) */}
                              <circle cx="50" cy="40" r="1.5" fill="#880C0C" />
                              <circle cx="45" cy="55" r="1.2" fill="#880C0C" />
                              <circle cx="60" cy="75" r="2.2" fill="#5F0808" />
                              <circle cx="65" cy="50" r="1.5" fill="#880C0C" />
                              <path d="M35,60 Q30,70 35,80" stroke="#880C0C" strokeWidth="1" fill="none" />
                              <circle cx="40" cy="90" r="2.5" fill="#5F0808" />
                              <circle cx="70" cy="80" r="2" fill="#750C0C" />
                              <path d="M50,55 Q52,60 50,65" stroke="#880C0C" strokeWidth="1.5" fill="none" />
                          </svg>
                      }
                      titleNode={
                          <div className="absolute bottom-2 left-0 w-full flex justify-center z-30 drop-shadow-[0_2px_4px_black]">
                              <span className="text-[13px] text-white tracking-[2.5px] font-['Helvetica',sans-serif] font-[400] transform scale-y-[1.65] scale-x-[0.8] mb-[2px]">
                                  BODYGUARD
                              </span>
                          </div>
                      }
                  />

                  {/* Poster #2: Bandersnatch Interactive */}
                  <VerticalPoster 
                      isNetflixOriginal={true}
                      interactiveBadge={
                          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-white stroke-[2.2px] fill-none">
                             <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
                             <line x1="4" y1="6" x2="20" y2="18" strokeLinecap="round" />
                             <line x1="4" y1="18" x2="20" y2="6" strokeLinecap="round" />
                          </svg>
                      }
                      svgGraphic={
                          <svg viewBox="0 0 100 150" className="w-[120%] h-[120%] -ml-[10%] -mt-[2%] opacity-100">
                              {/* Grainy Retro Room Block */}
                              <rect width="100" height="150" fill="#29201D" />
                              <path d="M10,80 Q50,70 90,80 L100,150 L0,150 Z" fill="#59463A" opacity="0.9" /> 
                              
                              {/* 80s Shoulder Silhouette */}
                              <path d="M15,150 L25,110 Q50,105 75,110 L85,150 Z" fill="#181A1D" /> 
                              <path d="M40,110 L50,130 L60,110 Z" fill="#CFB7AA" /> 
                              <path d="M40,110 L50,120 Q50,125 55,120 L60,110 Q50,125 40,110 Z" fill="#9C8173" opacity="0.6"/> {/* collar shadow */}
                              
                              {/* Iconographic Spiked Blonde Bleached Hair */}
                              <path d="M20,50 Q40,10 80,40 T90,60 Q60,30 20,50 Z" fill="#DDB26A" /> 
                              <path d="M25,25 L35,15 L45,25 L55,10 L65,25 L75,15 L85,35 Z" fill="#DDB26A" /> 
                              <path d="M30,35 L40,25 Q50,30 60,25 L70,35 Z" fill="#B88A42" opacity="0.5" /> {/* root depth */}
                              
                              {/* Distinctive Smirk Face */}
                              <path d="M30,50 Q20,80 50,105 Q80,80 70,50 Z" fill="#DEBAA5" />     
                              
                              {/* Thick 80s Eyebrows */}
                              <path d="M35,62 Q42,55 48,62" fill="none" stroke="#A88147" strokeWidth="2.5" /> 
                              <path d="M55,62 Q62,55 68,62" fill="none" stroke="#A88147" strokeWidth="2.5" />
                              
                              {/* The Iconic Round Wireframe Glasses */}
                              <circle cx="41" cy="72" r="9.5" fill="none" stroke="#A99580" strokeWidth="1.2" opacity="0.8" />
                              <circle cx="63" cy="70" r="9.5" fill="none" stroke="#A99580" strokeWidth="1.2" opacity="0.8" />
                              <path d="M51,70 L53,70" stroke="#A99580" strokeWidth="1.5" /> 
                              
                              {/* Smug Eyes */}
                              <circle cx="41" cy="72" r="2" fill="#4B637B" /> 
                              <circle cx="63" cy="70" r="2" fill="#4B637B" /> 
                              <path d="M37,70 Q41,68 45,70" stroke="#9C7862" strokeWidth="1.5" fill="none" /> {/* eyelid */}
                              <path d="M59,68 Q63,66 67,68" stroke="#9C7862" strokeWidth="1.5" fill="none" />
                              
                              {/* Distinct smirk pathing */}
                              <path d="M50,85 L50,92 L53,92" stroke="#B88574" strokeWidth="1.5" fill="none" /> {/* nose curve */}
                              <path d="M43,96 Q50,98 62,92" fill="none" stroke="#A66755" strokeWidth="1.5" />
                              <path d="M43,96 Q50,99 62,92" fill="none" stroke="#4A2F28" strokeWidth="0.5" />
                          </svg>
                      }
                      titleNode={
                          <div className="absolute bottom-[8px] left-0 w-full flex flex-col items-center z-30 drop-shadow-[0_2px_6px_black] pb-0">
                              <span className="text-[10.5px] text-white tracking-[0.5px] font-[900] font-['Arial',sans-serif] leading-[0.9] scale-y-[1.1] scale-x-[0.9]">
                                  BLACK MIRROR
                              </span>
                              <span className="text-[9.5px] text-white tracking-[0.8px] font-[900] font-['Arial',sans-serif] leading-[0.9] scale-y-[1.1] scale-x-[0.9] mt-[-1px]">
                                  BANDERSNATCH
                              </span>
                          </div>
                      }
                  />

                  {/* Poster #3: Suits Exterior Asset */}
                  <VerticalPoster 
                      isNetflixOriginal={false}
                      svgGraphic={
                          <svg viewBox="0 0 100 150" className="w-[120%] h-[120%] -ml-[10%] -mt-[2%] opacity-100">
                              {/* Bright Office Interior Mask */}
                              <rect width="100" height="150" fill="#E6EAED" />
                              <path d="M40,0 L100,0 L100,150 L10,150 Z" fill="#D2DCE5" /> 
                              <path d="M0,0 L10,0 L30,150 L0,150 Z" fill="#F0F4F7" opacity="0.6"/> {/* Window light shaft */}

                              {/* LEFT FIGURE: The Businessman (Harvey) */}
                              <g className="suits-harvey">
                                  {/* Sharp tailored dark suit */}
                                  <path d="M0,150 L5,80 L20,80 L50,150 Z" fill="#131C24" />
                                  <path d="M20,80 L25,110 L40,85 L55,150 Z" fill="#1B2838" /> 
                                  <path d="M22,80 L27,110 L35,85 Z" fill="#FFFFFF" /> {/* Crisp shirt */}
                                  <path d="M26,90 L26,110 L28,110 Z" fill="#181B1F" /> {/* Skinny tie */}
                                  {/* Strict jawline face profile */}
                                  <path d="M10,80 Q5,40 25,30 T45,50 Q45,70 30,80 Z" fill="#D3BDB1" />
                                  <path d="M15,80 Q10,60 20,50 Q30,60 30,80 Z" fill="#B3998D" opacity="0.5"/>
                                  {/* Sculpted formal hair */}
                                  <path d="M25,30 Q15,15 35,10 T50,30 Q35,25 25,30 Z" fill="#1C1815" /> 
                                  <path d="M35,10 L30,20 L40,15" fill="#3D3631" opacity="0.6" /> {/* hair reflection */}
                                  <path d="M20,40 Q25,38 30,40" stroke="#4A342B" strokeWidth="1.5" fill="none" />
                                  <circle cx="25" cy="50" r="1.5" fill="#111" />
                                  <path d="M28,60 Q32,62 35,60" stroke="#B08371" strokeWidth="1.5" fill="none" />
                              </g>

                              {/* RIGHT FIGURE: The Businesswoman (Rachel) */}
                              <g className="suits-rachel">
                                  {/* Deep black dress silhouette */}
                                  <path d="M45,150 L55,90 L75,90 L105,150 Z" fill="#11151A" />
                                  <path d="M60,95 Q65,115 70,95 Z" fill="#C59E87" /> 
                                  {/* Focused profile face */}
                                  <path d="M55,90 Q50,55 75,45 T95,65 L85,90 Z" fill="#D0A38B" />
                                  <path d="M65,90 Q65,70 80,65 Q80,80 85,90 Z" fill="#A87F6B" opacity="0.4"/>
                                  {/* Thick flowing raven hair forming negative space border */}
                                  <path d="M55,90 C45,40 85,20 95,45 C105,70 95,100 85,110 C80,80 65,40 55,90 Z" fill="#171312" />
                                  <path d="M65,45 Q75,40 80,45" stroke="#3D201A" strokeWidth="1.5" fill="none" />
                                  <circle cx="70" cy="55" r="1.5" fill="#111" />
                                  <path d="M65,70 Q70,73 75,70" stroke="#AD6554" strokeWidth="2" fill="none" /> {/* lipstick drop */}
                              </g>
                          </svg>
                      }
                      titleNode={
                          <div className="absolute top-[80px] left-0 w-full flex justify-center z-30 pointer-events-none mix-blend-plus-lighter">
                              <span className="text-[#FFE819] text-[29px] font-['Arial_Black',sans-serif] font-[900] tracking-[-1.5px] scale-y-[1.1] scale-x-[0.95] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] opacity-[0.95]">
                                  SUITS
                              </span>
                          </div>
                      }
                  />

                  {/* Invisible padding anchor for smooth scrolling limits */}
                  <div className="flex-none w-[4px] h-[10px]"></div>

              </div>
          </div>
      </div>

      {/* 3. Global OS Interaction Module (Navigation Edge) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity">
              <Home size={24} strokeWidth={2.5} className="text-white fill-transparent" />
              <span className="text-[10px] text-white font-bold">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Search</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">More</span>
          </button>

      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
