import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Universal EdgetoEdge Landscape Row Item
 */
const LandscapeCard = ({ titleNode, imgSrc, year, rating, duration, tags, tagDotColor = "#FFF" }) => {
    return (
        <div className="relative w-full h-[148px] rounded-[6px] overflow-hidden mb-[10px] bg-[#141414] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            
            {/* Background Image / SVG Array */}
            <div className="absolute inset-0 w-[110%] -ml-[5%] z-0 object-cover">
               {imgSrc}
            </div>
            
            {/* Immersive Contrast Gradients (Darken Left and Bottom Text areas) */}
            {/* Enhanced for 'Trending Now' - stronger black gradients for high contrast title dropping */}
            <div className="absolute inset-x-0 left-0 w-[65%] h-full bg-gradient-to-r from-[#050505] via-[#0A0A0A]/85 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 left-0 w-[45%] h-full bg-[#050505] z-10 opacity-30 pointer-events-none"></div>
            <div className="absolute inset-bottom-0 w-full h-[65%] bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none"></div>
            
            {/* Left Aligned Content Matrix */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-[12px] pb-[14px]">
                
                {/* Custom Title Integration */}
                <div className="w-[70%] mb-[3px]">
                   {titleNode}
                </div>
                
                {/* Data Tracking Metadata (Year / Rating / Duration) */}
                <div className="flex items-center text-[#B5B5B5] text-[12px] font-[500] gap-2 mb-[4px] mt-[2px]">
                    <span>{year}</span>
                    <span className="bg-[#424242] text-[#EBEBEB] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-none mb-[1px]">
                        {rating}
                    </span>
                    <span>{duration}</span>
                </div>
                
                {/* Interactive Dynamic Genre Routing */}
                <div className="flex items-center flex-wrap gap-x-[5px] text-white font-[600] text-[12px] tracking-tight drop-shadow-md pb-[2px] w-[80%] leading-[1.3]">
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
            
            {/* Massive Global Action Trigger (Play Ring) */}
            <div className="absolute bottom-[14px] right-[14px] z-30">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.8)] transform active:scale-90 transition-transform pt-[1px] pl-[2.5px] border-[1px] border-white/10">
                     <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black stroke-black stroke-1">
                         <path d="M5 3l15 9-15 9z" strokeLinejoin="round"/>
                     </svg>
                </div>
            </div>
        </div>
    )
}

/**
 * @name Netflix "Trending Now" (Landscape Feed State) - Page 29
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none">
      
      {/* 1. Global Fixed Navigation Array */}
      <div className="absolute top-0 w-full z-50">
           {/* Hardened Black Background per Reference (No heavy translucency here) */}
           <div className="w-full bg-[#0A0A0A]/95 backdrop-blur-[24px] pointer-events-auto">
                {/* Core Mobile System Status Sensors */}
                <div className="flex justify-between items-center px-[28px] pt-[8px] pb-[4px] relative z-50">
                   <span className="text-[14px] font-bold tracking-[0.2px] text-white opacity-95 ml-[-4px]">2:56</span>
                   <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
                       <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                          <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[8.5px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[11px] bg-white rounded-sm"></div>
                       </div>
                       <div className="relative transform scale-[0.80] -mr-1">
                           <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                               <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                               <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                           </svg>
                           <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-white rounded-[1.5px]"></div>
                       </div>
                   </div>
                </div>
                
                {/* Netflix App Software Router Sub-Nav */}
                <div className="flex justify-between items-center px-[18px] pb-[10px] mt-[4px] relative z-20">
                    <svg className="w-[22px] h-[36px] drop-shadow-[0_2px_4px_black]" viewBox="0 0 24 40" fill="none">
                        <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                    </svg>
                    <div className="flex gap-[36px] font-[500] text-white text-[16.5px] tracking-tight mr-[6px] opacity-95">
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">Series</span>
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">Films</span>
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">My List</span>
                    </div>
                </div>
                
                {/* Soft Edge Sub-Mask */}
                <div className="absolute bottom-[-10px] w-full h-[15px] bg-gradient-to-b from-[#0A0A0A]/95 to-transparent pointer-events-none z-10"></div>
           </div>
           
           {/* Ambient Drop Shadow */}
           <div className="absolute inset-x-0 bottom-[-20px] h-[20px] shadow-[0_-5px_15px_rgba(0,0,0,0.8)_inset] pointer-events-none"></div>
      </div>

      {/* 2. Kinematic Virtual Viewport (Scroll Y Engine) */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#050505]">
          
          <div className="flex flex-col w-full min-h-max pt-[100px] pb-[120px] px-[8px]">
              
              {/* Feed Header Controller */}
              <h2 className="text-[#FAFAFA] font-[800] text-[25px] tracking-[-0.5px] drop-shadow-md text-center w-full mt-[8px] mb-[12px] z-20 relative">
                 Trending Now
              </h2>

              {/* === INFINITE CARD STACK === */}

              {/* Feed Slot 1: THE PUNISHER */}
              <LandscapeCard 
                  year="2019" rating="M18" duration="2 Seasons"
                  tags={['Action', 'New York City', 'Based on a Comic']} tagDotColor="#FFFFFF"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                          {/* Grim Dark Environment */}
                          <rect width="400" height="150" fill="#131517" />
                          <path d="M100,0 Q180,80 120,150 L400,150 L400,0 Z" fill="#181A1C" />
                          <path d="M220,0 L220,150 M280,0 L280,150 M340,0 L340,150" stroke="#000" strokeWidth="3" opacity="0.4" />
                          
                          {/* Frank Castle Profile */}
                          {/* Tactical Vest & Jacket */}
                          <path d="M200,150 L240,65 L330,60 L380,150 Z" fill="#101112" />
                          <path d="M245,65 Q260,85 240,110 L220,150 Z" fill="#0C0D0F" />
                          {/* The Skull Underlayer Trace */}
                          <path d="M270,95 Q290,85 305,95 L300,140 Q285,130 275,140 Z" fill="#1E2226" opacity="0.6"/>
                          <path d="M275,110 L275,130 M285,100 L285,130 M295,105 L295,130 M305,105 L305,120" stroke="#101112" strokeWidth="5" opacity="0.6"/>
                          {/* Hands and Gun */}
                          <path d="M295,45 L320,35 L330,60 L320,70 Z" fill="#DDB2A0" opacity="0.8"/>
                          <path d="M305,45 L365,45 L365,58 L305,58 Z" fill="#181A1C" />
                          {/* Stubble Face */}
                          <path d="M310,20 Q335,5 355,20 Q355,45 330,55 Q310,55 310,20 Z" fill="#CF9D85" />
                          <path d="M310,20 Q330,10 355,25 L340,15 L320,10 Z" fill="#000" />
                          <path d="M315,45 Q330,60 345,45 Z" fill="#4A342B" opacity="0.5"/>
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-start leading-[1] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-1 mt-1 ml-[1px]">
                           <span className="text-[5px] text-[#F0F0F0] tracking-[1.5px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
                           <div className="flex items-center bg-[#D61B1B] px-[2.5px] py-[0.5px] mb-[1.5px]">
                                <span className="text-white text-[5.5px] font-[900] tracking-[1px] font-sans leading-[1] pl-[0.5px]">MARVEL</span>
                           </div>
                           <div className="flex flex-col relative w-fit mt-[1px]">
                                <span className="text-[7.5px] font-[900] text-white tracking-[2px] mb-[-4.5px] ml-[24px] z-10 w-fit drop-shadow-[0_1px_1px_black]">THE</span>
                                <div className="relative">
                                    <span className="text-[#FAFAFA] text-[26px] font-['Impact',sans-serif] tracking-[1.6px] transform scale-y-[1.25] opacity-95 relative z-0 inline-block drop-shadow-md">
                                       PUNISHER
                                    </span>
                                    {/* Procedural Ghost Skull Logo overlaying text */}
                                    <svg className="w-[12px] h-[19px] absolute left-[56%] -translate-x-[50%] top-[4px] z-10 opacity-90 drop-shadow-md brightness-110" viewBox="0 0 24 32">
                                       <path d="M4,10 C4,1 20,1 20,10 L20,20 L16,30 L12,25 L8,30 L4,20 Z" fill="#FFFFFF"/>
                                       <circle cx="9" cy="14" r="2.5" fill="#111"/>
                                       <circle cx="15" cy="14" r="2.5" fill="#111"/>
                                       <path d="M10,24 L10,28 M12,24 L12,28 M14,24 L14,28" stroke="#111" strokeWidth="2.5"/>
                                    </svg>
                                </div>
                           </div>
                      </div>
                  }
              />

              {/* Feed Slot 2: SHERLOCK */}
              <LandscapeCard 
                  year="2017" rating="PG13" duration="4 Series"
                  tags={['Tortured Genius', 'London', 'Emmy Winner']} tagDotColor="#FFFFFF"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                           {/* Moody Dark Teal London Background */}
                           <rect width="400" height="150" fill="#11212B" />
                           <path d="M0,0 Q150,50 400,0 L400,150 L0,150 Z" fill="#1A3442" opacity="0.6"/>
                           <circle cx="280" cy="70" r="130" fill="#203E4D" opacity="0.7"/>
                           
                           {/* Sherlock (Cumberbatch) */}
                           <path d="M190,150 L220,70 Q240,60 270,75 L295,150 Z" fill="#161A1D" /> 
                           <path d="M230,70 L240,110 L260,75 Z" fill="#2B3238" /> 
                           <path d="M235,110 L250,75 L245,110 Z" fill="#FFF" /> 
                           {/* Thinking Face */}
                           <path d="M242,40 Q265,25 275,40 Q280,60 260,70 Q240,70 232,50 Z" fill="#DDBAA8" />
                           <path d="M228,40 C235,15 265,20 275,40 C275,35 265,30 252,35 C242,30 235,40 228,40 Z" fill="#201814" /> 
                           <path d="M230,65 L245,65 L250,75" stroke="#DDBAA8" strokeWidth="4" fill="none" /> {/* Hand to chin */}
                           
                           {/* Dr. Watson (Freeman) */}
                           <path d="M285,150 L305,85 Q325,80 355,90 L385,150 Z" fill="#1F282E" /> 
                           <path d="M305,85 L320,110 Q330,120 345,90 Z" fill="#151A1F" />
                           <path d="M310,50 Q335,35 348,50 Q355,70 330,80 Q305,70 310,50 Z" fill="#D3A996" />
                           <path d="M310,50 C315,30 350,30 358,50 C345,40 325,40 315,50 Z" fill="#999EA3" />
                      </svg>
                  }
                  titleNode={
                      <div className="mb-[6px] ml-[1px]">
                          <span className="text-[#F5F5F5] font-sans font-[600] text-[27px] tracking-[1.5px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                              SHERLOCK
                          </span>
                      </div>
                  }
              />

              {/* Feed Slot 3: DESIGNATED SURVIVOR */}
              <LandscapeCard 
                  year="2018" rating="PG13" duration="2 Seasons"
                  tags={['Washington D.C.', 'Thriller', 'TV']} tagDotColor="#1D99D6"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                           {/* Oval Office / Americana Bokeh */}
                           <rect width="400" height="150" fill="#241E1A" />
                           {/* Flag Abstraction Blur */}
                           <path d="M140,0 L240,0 L220,150 L120,150 Z" fill="#142136" opacity="0.95" />
                           <path d="M150,0 Q180,75 140,150 L120,150 Z" fill="#182A45" />
                           <circle cx="170" cy="40" r="14" fill="#EAEAEA" opacity="0.3" />
                           <circle cx="200" cy="90" r="16" fill="#EAEAEA" opacity="0.3" />
                           <path d="M210,0 L310,0 L290,150 L190,150 Z" fill="#7A1818" opacity="0.65" />
                           <path d="M250,0 L300,0 L280,150 L230,150 Z" fill="#241E1A" opacity="0.5" />
                           
                           {/* President Kirkman Profile */}
                           <path d="M220,150 L240,85 Q280,70 330,95 L370,150 Z" fill="#181B1C" /> 
                           <path d="M255,100 L275,135 L295,100 Z" fill="#F0F0F0" />
                           <path d="M272,110 L275,135 L278,110 Z" fill="#8F1414" /> {/* Maroon tie */}
                           {/* Face straight on */}
                           <path d="M255,48 Q280,20 315,35 Q330,60 305,95 Q270,95 245,65 Z" fill="#E0A78E" />
                           <path d="M255,48 Q280,25 315,40" fill="none" stroke="#754228" strokeWidth="8" />
                           {/* Trademark Glasses */}
                           <circle cx="270" cy="62" r="8.5" fill="#E0A78E" stroke="#252525" strokeWidth="1.5" />
                           <circle cx="298" cy="65" r="8.5" fill="#E0A78E" stroke="#252525" strokeWidth="1.5" />
                           <path d="M278,63 L289,64" stroke="#252525" strokeWidth="2" />
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-start leading-[1.05] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] mb-[3.5px] mt-[1px]">
                           <span className="text-[5.5px] text-white opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
                           <span className="text-white text-[16.5px] font-[600] font-sans tracking-[3.8px] scale-x-[1.05] origin-left">DESIGNATED</span>
                           <span className="text-white text-[16.5px] font-[600] font-sans tracking-[3.8px] scale-x-[1.05] origin-left">SURVIVOR</span>
                      </div>
                  }
              />

              {/* Feed Slot 4: PRISON BREAK */}
              <LandscapeCard 
                  year="2017" rating="NC16" duration="5 Seasons"
                  tags={['Prison', 'Action', 'TV']} tagDotColor="#E5B822"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                          {/* Industrial Grid Setting */}
                          <rect width="400" height="150" fill="#24282B" />
                          <path d="M220,0 L220,150 M260,0 L260,150 M300,0 L300,150 M340,0 L340,150 M380,0 L380,150" stroke="#171A1C" strokeWidth="4"/>
                          <path d="M0,70 L400,70 M0,110 L400,110" stroke="#171A1C" strokeWidth="2"/>
                          
                          {/* Ensemble Cast Row */}
                          <g className="cast-lincoln text-[0]"> {/* Dominic */}
                              <path d="M190,150 L200,90 Q215,75 235,90 L245,150 Z" fill="#999E9E" />
                              <path d="M205,50 Q220,25 235,50 Q240,75 215,80 Q195,70 205,50 Z" fill="#CF9D85" />
                              <path d="M205,50 Q220,35 235,50" fill="none" stroke="#222" strokeWidth="5" />
                          </g>
                          <g className="cast-sarah text-[0]"> {/* Sarah */}
                              <path d="M235,150 L245,95 Q260,85 275,95 L285,150 Z" fill="#EAEAEA" />
                              <path d="M255,60 Q265,40 280,60 Q285,80 265,85 Q250,75 255,60 Z" fill="#D8B29E" />
                              <path d="M252,55 C255,30 280,30 283,55 C286,85 285,110 275,100 C250,90 245,70 252,55 Z" fill="#3D201A" />
                          </g>
                          <g className="cast-michael text-[0]"> {/* Wentworth */}
                              <path d="M280,150 L290,90 Q305,80 330,95 L350,150 Z" fill="#383020" />
                              <path d="M310,95 L310,130 L315,130 Z" fill="#1C242E" /> 
                              <path d="M295,55 Q310,35 330,55 Q335,75 310,85 Q290,75 295,55 Z" fill="#DDB2A0" />
                              <path d="M295,55 Q310,40 330,55" fill="none" stroke="#222" strokeWidth="6" />
                          </g>
                      </svg>
                  }
                  titleNode={
                      <div className="relative flex flex-col items-start leading-[0.82] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-1 mt-[5px]">
                           <span className="text-[#F2F2F2] text-[29px] font-['Arial_Black',sans-serif] tracking-[-1px] transform scale-y-[1.1] scale-x-[1.08] opacity-[0.98] relative origin-bottom-left">
                               PRISON
                           </span>
                           <span className="text-[#F2F2F2] text-[29px] font-['Arial_Black',sans-serif] tracking-[-1px] transform scale-y-[1.1] scale-x-[1.08] opacity-[0.98] relative origin-top-left">
                               BREAK
                           </span>
                           {/* Visual CSS Stencil Slash Simulation */}
                           <div className="absolute inset-x-0 w-[110%] top-[-5%] h-[110%] z-10 flex flex-col justify-around py-1 pointer-events-none mix-blend-overlay overflow-hidden">
                               <div className="w-full h-[1.5px] bg-[#1A1A1A] rotate-[-3deg] opacity-90 translate-y-2"></div>
                               <div className="w-full h-[2px] bg-[#111111] rotate-[2deg] opacity-80 shadow-md"></div>
                               <div className="w-full h-[1.5px] bg-[#1A1A1A] rotate-[-1.5deg] opacity-90 -translate-y-2"></div>
                           </div>
                      </div>
                  }
              />
              
              <div className="w-full h-[30px] flex-none"></div>

          </div>
      </div>

      {/* 3. Terminal App Nav Engine */}
      <div className="absolute bottom-0 w-full h-[88px] bg-[#000000] border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
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
