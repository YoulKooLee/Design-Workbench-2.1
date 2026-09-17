import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Highly customized Horizontal Card (Adapted for Page 22 Documentary Row)
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
                className="absolute inset-0 z-10 w-[98%] h-full" 
                style={{ background: `linear-gradient(to right, ${bgLeftColor} 50%, ${bgLeftColor}CC 75%, transparent 100%)` }}
             />
             <div 
                className="absolute inset-0 z-10 w-[50%] h-full" 
                style={{ background: bgLeftColor }}
             />
             
             {/* CSS Native Noise layer */}
             <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="w-full h-full absolute inset-0 opacity-[0.12] pointer-events-none z-15 mix-blend-overlay">
                 <filter id="noise22_card">
                     <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise22_card)" />
             </svg>

             {/* Content Metadata Assembly */}
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 pl-[14px] pb-[10px]">
                 
                 {/* Title Injector */}
                 <div className="mb-[6px] w-[65%] min-h-[30px] flex items-end">
                     {titleNode}
                 </div>
                 
                 {/* Secondary Meta String (Year, Rating, Duration) */}
                 <div className="flex items-center gap-[6px] text-[#A3A3A3] text-[13px] font-semibold mb-1.5 opacity-90 tracking-tight">
                     <span>{year}</span>
                     {rating && (
                         <span className="border-[1px] border-[#555] bg-[#333]/30 px-[5px] pb-[1px] pt-[0.5px] rounded-[3px] leading-none text-[11px] text-[#E0E0E0] font-bold">
                             {rating}
                         </span>
                     )}
                     <span>{duration}</span>
                 </div>
                 
                 {/* Categorization Tag Node Mapping */}
                 <div className="flex items-center text-[#EBEBEB] font-bold text-[12.5px] tracking-tight whitespace-nowrap overflow-hidden w-[85%]">
                     {tags.map((tag, idx) => (
                         <React.Fragment key={idx}>
                             <span>{tag}</span>
                             {idx < tags.length - 1 && (
                                 <span className="mx-[6px] text-[16px] leading-none mb-1 shadow-sm" style={{color: dotColor, opacity: 0.9}}>
                                     •
                                 </span>
                             )}
                         </React.Fragment>
                     ))}
                 </div>
             </div>

             {/* White Native Play Button */}
             <div className="absolute bottom-3 right-3 w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center z-30 shadow-[0_2px_10px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 transition-transform opacity-95">
                 <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] ml-1 fill-black">
                     <path d="M5 3l14 9-14 9V3z" />
                 </svg>
             </div>
        </div>
    )
}

/**
 * @name Netflix Popular Documentaries Stack (Page 22)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#121212] text-white font-sans relative select-none">
      
      {/* 1. Header Array (Scrolled state simulation) */}
      <div className="absolute top-0 w-full z-40 bg-gradient-to-b from-black via-black/80 to-transparent pt-3 pb-8 pointer-events-none">
          
          {/* Peeking Netflix Logo (Top Left Absolute) */}
          <div className="absolute top-[-4px] left-[18px] z-50 overflow-hidden w-[10px] h-[14px]">
               <svg className="w-[16px] h-[28px] drop-shadow-md" viewBox="0 0 24 40" fill="none">
                   <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
               </svg>
          </div>

          {/* iOS Status Bar Level */}
          <div className="flex justify-between items-center px-6 pb-2 text-[14px] font-bold tracking-tight text-white pl-[45px]">
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
      </div>

      {/* 2. Primary Scroll View Grid */}
      <div className="flex-1 overflow-y-auto pb-[100px] w-full px-[6px] bg-[#121212]">
          
          <h2 className="text-white font-[800] text-[24px] pt-[55px] pb-[16px] drop-shadow-sm tracking-tight text-center w-full">
              Popular on Netflix
          </h2>

          {/* ROW 1: Extraordinary Homes */}
          <HorizontalCard 
              bgLeftColor="#11120F"
              titleNode={
                  <div className="flex flex-col drop-shadow-md mb-[2px] w-[120%] tracking-tight">
                      <div className="flex items-center text-[7.5px] font-[800] tracking-[1.2px] mb-[1px]">
                          <span className="text-[#E6E6E6]">NETFLIX </span>
                          <span className="text-[#B3B3B3] font-[400] ml-1">ORIGINAL</span>
                      </div>
                      <span className="text-white font-sans font-[700] text-[14px] leading-tight mb-[1px]">THE WORLD'S MOST</span>
                      <span className="text-white font-sans font-[800] text-[21px] leading-[0.85] tracking-tighter font-['Arial_Black']">EXTRAORDINARY</span>
                      <span className="text-white font-sans font-[800] text-[21px] leading-[0.85] tracking-[3px] font-['Arial_Black']">H O M E S</span>
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
                        {/* Circle Home Vector */}
                        <path d="M20,65 Q100,95 180,65 Q100,50 20,65 Z" fill="#E8EBED" /> 
                        <path d="M22,67 Q100,95 178,67 L178,85 Q100,115 22,85 Z" fill="#5F768B" />
                        <path d="M22,85 Q100,115 178,85 L178,89 Q100,119 22,89 Z" fill="#3E454A" />
                        {/* Spotlights */}
                        <rect x="50" y="70" width="8" height="14" fill="#8BB939" />
                        <rect x="150" y="65" width="8" height="12" fill="#568BCE" />
                        <rect x="165" y="61" width="6" height="10" fill="#D2E8F1" />
                        {/* Foreground foliage */}
                        <path d="M0,100 L40,65 L60,85 L80,100 Z" fill="#1C210B" />
                        <path d="M140,100 L160,75 L180,90 L200,100 Z" fill="#252A14" />
                    </svg>
                 </div>
              }
          />

          {/* ROW 2: planet earth */}
          <HorizontalCard 
              bgLeftColor="#111F2E"
              titleNode={
                  <div className="flex flex-col drop-shadow-md mb-2">
                      <span className="text-[#E7ECF0] font-light text-[17px] tracking-[5.5px] lowercase whitespace-nowrap">planet earth</span>
                  </div>
              }
              year="2006" rating="G" duration="1 Season"
              tags={['Ocean Adventures', 'Visionary', 'Emmy Winner']}
              dotColor="#8C939A"
              bgRight={
                 <div className="w-full h-full relative">
                    <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-6 -mt-2 opacity-95" preserveAspectRatio="none">
                        <rect width="200" height="100" fill="#6985A1" />
                        {/* Giant Glacier shape */}
                        <path d="M80,60 L100,20 L140,15 L160,50 L180,30 L200,60 L200,100 L80,100 Z" fill="#D4DEE5" />
                        {/* Penguin swarm array */}
                        <path d="M0,85 Q50,70 100,80 T200,75 L200,100 L0,100 Z" fill="#14181F" />
                        {/* Frontline penguins simple vectors */}
                        <path d="M80,100 L84,70 L88,100 Z" fill="#DDDDDD" />
                        <path d="M82,100 L84,80 L86,100 Z" fill="#14181F" />
                        <path d="M110,100 L115,65 L120,100 Z" fill="#DDDDDD" />
                        <path d="M112,100 L115,75 L118,100 Z" fill="#14181F" />
                        <path d="M140,100 L144,72 L148,100 Z" fill="#DDDDDD" />
                        <path d="M165,100 L168,68 L171,100 Z" fill="#DDDDDD" />
                    </svg>
                 </div>
              }
          />

          {/* ROW 3: ROTTEN */}
          <HorizontalCard 
              bgLeftColor="#60645A"
              titleNode={
                  <div className="flex flex-col drop-shadow-md mb-[-2px]">
                      <div className="flex items-center text-[7px] font-[800] tracking-[1.5px] opacity-90 mb-[0px]">
                          <span className="text-[#E6E6E6]">NETFLIX </span>
                          <span className="text-[#B3B3B3] font-[400] ml-1">ORIGINAL</span>
                      </div>
                      <div className="text-transparent font-['Impact','Arial_Black'] tracking-[3px] text-[40px] leading-[0.8] scale-y-[1.2] origin-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-clip-text" style={{
                          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='30' height='100' fill='%23C0A07B'/%3E%3Crect x='30' y='0' width='40' height='100' fill='%23E99A24'/%3E%3Crect x='70' y='0' width='30' height='100' fill='%23A4A390'/%3E%3C/svg%3E")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          WebkitBackgroundClip: 'text',
                      }}>
                          ROTTEN
                      </div>
                  </div>
              }
              year="2018" rating="PG13" duration="1 Season"
              tags={['Whistleblower', 'Docuseries', 'TV']}
              dotColor="#E2A645"
              bgRight={
                 <div className="w-full h-full relative">
                    <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-6 -mt-2 opacity-95" preserveAspectRatio="none">
                        <rect width="200" height="100" fill="#9BA198" /> 
                        <path d="M0,20 L200,20 M0,40 L200,40 M0,60 L200,60 M0,80 L200,80" stroke="#7E857B" strokeWidth="1" opacity="0.6"/>
                        
                        {/* Giant Apple Base */}
                        <path d="M80,45 Q80,10 120,15 Q160,10 160,45 Q160,95 120,90 Q80,95 80,45 Z" fill="#2E4A28" />
                        <path d="M80,45 Q80,10 120,15 Q160,10 160,45 Z" fill="#BA1B1B" /> {/* Top Apple red */}
                        <path d="M120,15 L115,5" stroke="#485D32" strokeWidth="3" />
                        <path d="M115,5 Q100,-5 95,5 Q110,15 115,5 Z" fill="#6A8A3A" />
                        
                        {/* Dollar Texture Bottom */}
                        <path d="M80,45 L160,45 Q160,95 120,90 Q80,95 80,45 Z" fill="#627859" />
                        <path d="M85,45 L155,45 Q155,90 120,86 Q85,90 85,45 Z" fill="#809972" /> 
                        <circle cx="120" cy="55" r="14" fill="none" stroke="#253020" strokeWidth="1.5" strokeDasharray="2 1" />
                        <rect x="112" y="50" width="16" height="12" fill="none" stroke="#253020" strokeWidth="1.2" />
                        <path d="M112,50 Q105,55 112,60 M128,50 Q135,55 128,60" fill="none" stroke="#253020" strokeWidth="1.2" />
                        <path d="M116,58 L124,58 L120,62 Z" fill="#253020" /> {/* Shield Eagle geometry mock */}
                    </svg>
                 </div>
              }
          />

          {/* ROW 4: THE HUNT */}
          <HorizontalCard 
              bgLeftColor="#1A1813"
              titleNode={
                  <div className="flex flex-col drop-shadow-md mb-2">
                       <span className="text-white font-[serif] text-[10.5px] tracking-[2.5px] mb-[-4px] ml-[2px]">THE</span>
                       <span className="text-white font-[serif] text-[44px] font-[500] tracking-[3px] leading-[0.8] mb-[2px]">HUNT</span>
                  </div>
              }
              year="2015" rating="PG" duration="1 Season"
              tags={['Chase', 'Docuseries', 'Nature Doc']}
              dotColor="#EAEAEA"
              bgRight={
                 <div className="w-full h-full relative">
                    <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-16 -mt-2 opacity-95" preserveAspectRatio="none">
                        <rect width="200" height="100" fill="#42352B" /> 
                        <path d="M0,60 L200,40 L200,100 L0,100 Z" fill="#5F4B3C" filter="blur(6px)" />
                        
                        {/* Mother Cheetah */}
                        <path d="M100,100 Q140,-10 200,100 Z" fill="#C49A6C" />
                        <path d="M120,55 Q135,25 155,55 Q145,85 120,55 Z" fill="#DFC29B" />
                        <circle cx="130" cy="50" r="1.5" fill="#1C140E" />
                        <circle cx="145" cy="50" r="1.5" fill="#1C140E" />
                        <path d="M128,55 Q138,70 147,55" fill="none" stroke="#1C140E" strokeWidth="1" />
                        <circle cx="120" cy="75" r="2" fill="#1C140E" /><circle cx="135" cy="85" r="2.5" fill="#1C140E" />
                        <circle cx="150" cy="80" r="2" fill="#1C140E" /><circle cx="165" cy="95" r="2.5" fill="#1C140E" />
                        
                        {/* Offspring Cheetah */}
                        <path d="M80,100 L95,65 L120,110 Z" fill="#C49A6C" />
                        <circle cx="95" cy="65" r="11" fill="#DFC29B" />
                        <circle cx="90" cy="62" r="1.2" fill="#1C140E" /><circle cx="100" cy="62" r="1.2" fill="#1C140E" />
                        <path d="M92,67 Q95,72 98,67" fill="none" stroke="#1C140E" strokeWidth="0.8" />
                    </svg>
                 </div>
              }
          />

          {/* ROW 5: GENIUS (Cut off) */}
          <HorizontalCard 
              bgLeftColor="#03060E"
              titleNode={
                  <div className="flex flex-col drop-shadow-md mb-0">
                      <span className="text-[#A7AFB8] font-sans font-[600] text-[26px] tracking-[10px] uppercase leading-none opacity-90">GENIUS</span>
                  </div>
              }
              year="2018" rating="TVMA" duration="2 Seasons"
              tags={['Biographical', 'Docuseries', 'Inspiring']}
              dotColor="#EAEAEA"
              bgRight={
                 <div className="w-full h-full relative">
                    <svg viewBox="0 0 200 100" className="w-[120%] h-[120%] -ml-8 -mt-2 opacity-95" preserveAspectRatio="none">
                        <rect width="200" height="100" fill="#6B879E" /> 
                        <path d="M0,0 Q60,30 200,10 Z" fill="#E6EEF2" opacity="0.8" />
                        <path d="M0,100 L200,100 L200,60 L0,60 Z" fill="#E6EEF2" opacity="0.6" />
                        
                        {/* Wright Brothers Biplane Silhouette */}
                        <path d="M40,65 L180,65 L170,68 L30,68 Z" fill="#2E2B29" /> 
                        <path d="M40,85 L180,85 L170,88 L30,88 Z" fill="#2E2B29" /> 
                        <line x1="60" y1="68" x2="60" y2="85" stroke="#171514" strokeWidth="1.5" />
                        <line x1="90" y1="68" x2="90" y2="85" stroke="#171514" strokeWidth="1.5" />
                        <line x1="120" y1="68" x2="120" y2="85" stroke="#171514" strokeWidth="1.5" />
                        <line x1="150" y1="68" x2="150" y2="85" stroke="#171514" strokeWidth="1.5" />
                        <circle cx="105" cy="78" r="7" fill="#171514" />
                    </svg>
                 </div>
              }
          />

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

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90"></div>

    </div>
  );
}
