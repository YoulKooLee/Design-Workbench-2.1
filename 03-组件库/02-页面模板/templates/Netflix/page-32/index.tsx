import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Universal EdgetoEdge Landscape Row Item
 */
const LandscapeCard = ({ titleNode, imgSrc, year, rating, duration, tags, tagDotColor = "#FFF" }) => {
    return (
        <div className="relative w-full h-[148px] rounded-[6px] overflow-hidden mb-[10px] bg-[#1C1C1C] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            
            {/* Background Image / SVG Array */}
            <div className="absolute inset-0 w-[110%] -ml-[5%] z-0 object-cover">
               {imgSrc}
            </div>
            
            {/* Cinematic Degradation Gradients (Safe Area for Text Rendering) */}
            <div className="absolute inset-x-0 left-0 w-[68%] h-full bg-gradient-to-r from-[#030303] via-[#0A0A0A]/85 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 left-0 w-[48%] h-full bg-[#050505] z-10 opacity-40 pointer-events-none"></div>
            <div className="absolute inset-bottom-0 w-full h-[65%] bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none"></div>
            
            {/* Content Injection Vector */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-[12px] pb-[14px]">
                
                {/* Title Container Grid */}
                <div className="w-[75%] mb-[2px]">
                   {titleNode}
                </div>
                
                {/* Taxonomy Array */}
                <div className="flex items-center text-[#B5B5B5] text-[12px] font-[500] gap-[7px] mb-[4px] mt-[1px]">
                    <span>{year}</span>
                    <span className="bg-[#424242] text-[#EBEBEB] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-[1] mt-[1px]">
                        {rating}
                    </span>
                    <span>{duration}</span>
                </div>
                
                {/* Categorization & Tags */}
                <div className="flex items-center flex-wrap gap-x-[5px] text-white font-[600] text-[12.5px] tracking-tight drop-shadow-md pb-[1px] w-[85%] leading-[1.3]">
                    {tags.map((tag, i) => (
                        <React.Fragment key={i}>
                            <span>{tag}</span>
                            {i < tags.length - 1 && (
                                <span style={{ color: tagDotColor }} className="text-[20px] leading-none mt-[-2px] mx-[1px]">·</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            {/* Absolute Play Action Controller */}
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
 * @name Netflix "Popular on Netflix" (Landscape Feed State) - Page 32
 */
export default function NetflixApp() {

  // Feed Asset Matrix 1: Romance Is a Bonus Book
  const romanceBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           {/* Warm Studio Background */}
           <rect width="400" height="150" fill="#F0AA5B" /> 
           <path d="M100,50 L400,50 L400,150 L100,150 Z" fill="#E89645" /> 
           
           {/* Primary Prop Formations (Moving Boxes) */}
           <path d="M200,80 L350,80 L380,150 L180,150 Z" fill="#F4BD44" /> 
           <path d="M250,90 L390,90 L400,150 L260,150 Z" fill="#E26569" opacity="0.95" /> 
           <circle cx="340" cy="120" r="16" fill="#F2C04B" /> 
           <circle cx="320" cy="105" r="4.5" fill="#5895B8" /> 
           <circle cx="355" cy="135" r="6" fill="#F2C04B" /> 
           
           <path d="M120,105 L260,105 L270,150 L110,150 Z" fill="#D39F61" opacity="0.85" /> 

           {/* The Core Subjects (Actors Peeking) */}
           {/* Eun-ho (Right) */}
           <path d="M310,80 L310,35 Q330,15 350,35 L360,80 Z" fill="#1C1814" /> 
           <path d="M320,35 Q330,20 340,35 Q335,50 320,45 Z" fill="#EFD6C5" />
           <path d="M320,35 Q330,15 345,40" fill="none" stroke="#261208" strokeWidth="9" /> 
           
           {/* Dan-i (Left) */}
           <path d="M260,80 L270,30 Q290,25 300,40 L300,80 Z" fill="#FAEEE1" /> 
           <path d="M275,30 Q285,15 295,30 Q290,45 275,40 Z" fill="#F2D1BD" />
           <path d="M270,30 C285,5 305,15 295,40" fill="none" stroke="#40281F" strokeWidth="8" /> 
      </svg>
  );

  // Feed Asset Matrix 2: Sherlock (Re-rendered)
  const sherlockBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#11212B" />
           <path d="M0,0 Q150,50 400,0 L400,150 L0,150 Z" fill="#1A3442" opacity="0.6"/>
           <circle cx="280" cy="70" r="130" fill="#203E4D" opacity="0.7"/>
           
           {/* Sherlock */}
           <path d="M190,150 L220,70 Q240,60 270,75 L295,150 Z" fill="#161A1D" /> 
           <path d="M230,70 L240,110 L260,75 Z" fill="#2B3238" /> 
           <path d="M235,110 L250,75 L245,110 Z" fill="#FFF" /> 
           <path d="M242,40 Q265,25 275,40 Q280,60 260,70 Q240,70 232,50 Z" fill="#DDBAA8" />
           <path d="M228,40 C235,15 265,20 275,40 C275,35 265,30 252,35 C242,30 235,40 228,40 Z" fill="#201814" /> 
           <path d="M230,65 L245,65 L250,75" stroke="#DDBAA8" strokeWidth="4" fill="none" /> 
           
           {/* Watson */}
           <path d="M285,150 L305,85 Q325,80 355,90 L385,150 Z" fill="#1F282E" /> 
           <path d="M305,85 L320,110 Q330,120 345,90 Z" fill="#151A1F" />
           <path d="M310,50 Q335,35 348,50 Q355,70 330,80 Q305,70 310,50 Z" fill="#D3A996" />
           <path d="M310,50 C315,30 350,30 358,50 C345,40 325,40 315,50 Z" fill="#999EA3" />
      </svg>
  );

  // Feed Asset Matrix 3: How I Met Your Mother
  const himymBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#262A33" /> 
           <path d="M200,90 L400,90 L400,150 L200,150 Z" fill="#3D2B26" /> 
           
           <path d="M220,130 L220,60 Q220,50 230,50 L380,50 Q390,50 390,60 L390,130 Z" fill="#691D1D" opacity="0.9" />
           <path d="M220,95 L390,95 L390,150 L220,150 Z" fill="#8B2525" opacity="0.5"/> 
           
           {/* Cast Group Abstraction */}
           <path d="M235,120 L245,65 L265,65 L275,120 Z" fill="#888E94" />
           <path d="M245,65 Q255,55 265,65 Q260,80 250,80 Z" fill="#D3A796" />
           
           <path d="M265,110 L270,60 L290,60 L295,110 Z" fill="#5C2525" />
           <path d="M270,60 Q280,50 290,60 Q285,75 275,75 Z" fill="#E8C3B3" />
           
           <path d="M290,120 L300,40 L320,40 L330,120 Z" fill="#1C1F22" /> 
           <path d="M310,40 L310,60" stroke="#FFF" strokeWidth="2.5" /> 
           <path d="M300,40 Q310,25 320,40 Q315,55 305,55 Z" fill="#D3A796" />
           
           <path d="M325,110 L335,55 L355,55 L365,110 Z" fill="#4B5861" /> 
           <path d="M335,55 Q345,40 355,55 Q350,70 340,70 Z" fill="#DDBBAA" />
           
           <path d="M355,110 L360,65 L380,65 L385,110 Z" fill="#2E1B22" />
           <path d="M360,65 Q370,55 380,65 Q375,80 365,80 Z" fill="#F0CDBC" />
           
           <rect x="255" y="86" width="4.5" height="9" fill="#D6A556" />
           <rect x="335" y="86" width="4.5" height="9" fill="#D6A556" />
           <rect x="365" y="89" width="8" height="3" fill="#A81515" /> 
      </svg>
  );

  // Feed Asset Matrix 4: Designated Survivor (Re-rendered)
  const designatedBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#241E1A" />
           <path d="M140,0 L240,0 L220,150 L120,150 Z" fill="#142136" opacity="0.95" />
           <path d="M150,0 Q180,75 140,150 L120,150 Z" fill="#182A45" />
           <circle cx="170" cy="40" r="14" fill="#EAEAEA" opacity="0.3" />
           <circle cx="200" cy="90" r="16" fill="#EAEAEA" opacity="0.3" />
           <path d="M210,0 L310,0 L290,150 L190,150 Z" fill="#7A1818" opacity="0.65" />
           
           {/* Kiefer Target */}
           <path d="M220,150 L240,85 Q280,70 330,95 L370,150 Z" fill="#181B1C" /> 
           <path d="M255,100 L275,135 L295,100 Z" fill="#F0F0F0" />
           <path d="M272,110 L275,135 L278,110 Z" fill="#8F1414" /> 
           <path d="M255,48 Q280,20 315,35 Q330,60 305,95 Q270,95 245,65 Z" fill="#E0A78E" />
           <path d="M255,48 Q280,25 315,40" fill="none" stroke="#754228" strokeWidth="8" />
           <circle cx="270" cy="62" r="8.5" fill="#E0A78E" stroke="#252525" strokeWidth="1.5" />
           <circle cx="298" cy="65" r="8.5" fill="#E0A78E" stroke="#252525" strokeWidth="1.5" />
           <path d="M278,63 L289,64" stroke="#252525" strokeWidth="2" />
      </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-white font-sans relative select-none">
      
      {/* 1. Dissolving Fixed Top Status Plane (Replaces standard Navigation Bar during deep scroll) */}
      <div className="fixed top-0 w-full h-[65px] z-50 pointer-events-none flex flex-col justify-between pt-[8px]">
           <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-transparent backdrop-blur-[6px] mask-image-b"></div>
           
           <div className="flex justify-between items-center px-[28px] pb-[6px] relative z-50 mix-blend-plus-lighter">
               <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">3:00</span>
               <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px] drop-shadow-md">
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
      </div>

      {/* 2. Kinematic Virtual Viewport (Scroll Y Engine) */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#111111] pt-[8px]">
          
          {/* Base Scrolling Context Wrapper */}
          <div className="flex flex-col w-full min-h-max pb-[10px] px-[8px]">
              
              {/* Simulated Render Matrix Cut-off (Previous Scroll Iteration - Stranger Things) */}
              <div className="relative w-[110%] h-[38px] -ml-[5%] flex items-end px-[24px] pb-[2px] mt-[30px] opacity-95 pointer-events-none">
                  {/* Volumetric Dark Masking replacing the actual image */}
                  <div className="flex gap-[6px] text-white/50 text-[11.5px] font-[600] z-y drop-shadow-[0_2px_4px_black] ml-[6px]">
                      <span>Sci-Fi Drama</span>
                      <span className="text-[#888888]">·</span>
                      <span>Offbeat</span>
                      <span className="text-[#888888]">·</span>
                      <span>Set in the 1980s</span>
                  </div>
                  
                  {/* Fractionally visible Play Button trigger from previous card */}
                  <div className="absolute top-[-4px] right-[20px] w-[36px] h-[18px] rounded-b-full bg-[#FFFFFF]/90 shadow-[0_2px_8px_rgba(0,0,0,0.8)] border-b border-x border-[#FFF]/30 overflow-hidden flex justify-center backdrop-blur-sm">
                       <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black stroke-black stroke-1 -mt-[11px] ml-[2.5px]">
                           <path d="M5 3l15 9-15 9z" strokeLinejoin="round"/>
                       </svg>
                  </div>
              </div>

              {/* Core Feed Topology Header */}
              <h2 className="text-[#FAFAFA] font-[800] text-[25px] tracking-[-0.3px] drop-shadow-md text-center w-full mt-[18px] mb-[12px] z-20 relative">
                 Popular on Netflix
              </h2>

              {/* === INFINITE CARD STACK (PAGE 32 PAYLOAD) === */}

              {/* Feed Slot 1: ROMANCE IS A BONUS BOOK */}
              <LandscapeCard 
                  year="2019" rating="PG13" duration="1 Season"
                  tags={['Workplace', 'Korean', 'Sentimental']} tagDotColor="#E87042"
                  imgSrc={romanceBg}
                  titleNode={
                      <div className="flex flex-col items-start leading-[0.9] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] mb-[4px] mt-[10px]">
                           <span className="text-[5.5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
                           <span className="text-white text-[21.5px] font-[500] font-serif tracking-[0.5px]">ROMANCE IS</span>
                           <div className="flex items-end text-white text-[21.5px] font-[500] font-serif tracking-[0.5px]">
                               <span className="text-[12.5px] mb-[2.5px] mr-[3px]">A</span>
                               <span>BONUS B</span>
                               {/* Custom Embedded Structural Symbol (Heart in 'O') */}
                               <div className="relative w-[16px] h-[22px] flex justify-center items-center -mx-[0.5px] -mt-[3px]">
                                   <span className="absolute">O</span>
                                   <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] absolute z-10 fill-[#FFFFFF] stroke-none drop-shadow-sm mt-[2.5px]">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                   </svg>
                               </div>
                               <span>OK</span>
                           </div>
                      </div>
                  }
              />

              {/* Feed Slot 2: SHERLOCK */}
              <LandscapeCard 
                  year="2017" rating="PG13" duration="4 Series"
                  tags={['Tortured Genius', 'London', 'Emmy Winner']} tagDotColor="#FFFFFF"
                  imgSrc={sherlockBg}
                  titleNode={
                      <div className="mb-[6px] ml-[1px]">
                          <span className="text-[#F5F5F5] font-sans font-[600] text-[27px] tracking-[1.5px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                              SHERLOCK
                          </span>
                      </div>
                  }
              />

              {/* Feed Slot 3: how i met your mother */}
              <LandscapeCard 
                  year="2014" rating="M18" duration="9 Seasons"
                  tags={['Sitcom', 'Emmy Winner', 'Buddies']} tagDotColor="#F0B52B"
                  imgSrc={himymBg}
                  titleNode={
                      <div className="flex flex-col items-start font-['Trebuchet_MS',sans-serif] font-[700] text-[#FCDA14] leading-[0.82] tracking-[-0.6px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ml-[1px] mt-[10px] mb-[6px]">
                          <span className="text-[25px]">how i</span>
                          <span className="text-[25px] mt-[1px]">met your</span>
                          <span className="text-[34px] transform scale-x-[0.98] origin-left mt-[1px] -ml-[1px]">mother</span>
                      </div>
                  }
              />

              {/* Feed Slot 4: DESIGNATED SURVIVOR */}
              <LandscapeCard 
                  year="2018" rating="PG13" duration="2 Seasons"
                  tags={['Washington D.C.', 'Thriller', 'TV']} tagDotColor="#12A8E0"
                  imgSrc={designatedBg}
                  titleNode={
                      <div className="flex flex-col items-start leading-[1.05] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] mb-[3.5px] mt-[3px]">
                           <span className="text-[5.5px] text-white opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
                           <span className="text-white text-[16.5px] font-[600] font-sans tracking-[3.8px] scale-x-[1.05] origin-left drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">DESIGNATED</span>
                           <span className="text-white text-[16.5px] font-[600] font-sans tracking-[3.8px] scale-x-[1.05] origin-left drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">SURVIVOR</span>
                      </div>
                  }
              />

              {/* System Pagination Invoker */}
              <div className="w-full flex justify-center pt-[4px] pb-[4px] mt-[12px] mb-[12px] z-20 pointer-events-auto">
                  <button className="flex items-center gap-[6px] text-[#A3A3A3] bg-[#141414] px-[16px] py-[8px] rounded-[3px] font-[600] text-[13.5px] tracking-tight border border-[#222222] hover:bg-[#1A1A1A] active:scale-95 transition-all shadow-md">
                      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-[#A3A3A3] stroke-[2px] fill-none mt-[1px]">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Show More
                  </button>
              </div>

              {/* Future Payload Render Buffer Cutoff (Trending Now text peeking out at bottom) */}
              <h2 className="text-[#FAFAFA] font-[800] text-[25px] tracking-[-0.5px] drop-shadow-md text-center w-full mt-[12px] mb-[60px] pointer-events-none z-0 overflow-hidden line-clamp-1">
                 {/* Placed specifically low to be cropped by physical screen/nav dimensions */}
                 <span>Tr</span><span>en</span><span>di</span><span>ng </span><span>N</span>
              </h2>

          </div>
      </div>

      {/* 3. Global Hardware Navigation Plane */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-[#FAFAFA] fill-transparent" />
              <span className="text-[10px] text-[#FAFAFA] font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">Search</span>
          </button>

          {/* Persistent Download Badge Memory */}
          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <div className="relative">
                  <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
                  <div className="absolute top-[-3px] right-[-6px] w-[15px] h-[15px] bg-[#0A84FF] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#000000]">
                      <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#FFFFFF] stroke-[4px] fill-none">
                           <path d="M4 12l4 4L20 6" />
                      </svg>
                  </div>
              </div>
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium tracking-tight">More</span>
          </button>

      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
