import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Universal Episode Row Node (State-Aware)
 */
const EpisodeRow = ({ num, title, duration, imgSrc, synopsis, downloadState = 'none', progress = 0 }) => (
    <div className="flex flex-col mb-[22px]">
        <div className="flex items-center justify-between mb-[8px] px-[16px]">
             
             {/* 16:9 Cinema Thumbnail Container */}
             <div className="relative w-[130px] h-[73px] bg-[#1A1A1A] rounded-[2px] overflow-hidden flex-shrink-0 cursor-pointer active:scale-95 transition-transform shadow-md">
                  {imgSrc}
                  <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
                  
                  {/* Play Action Overlay */}
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      <div className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex justify-center items-center bg-black/40 backdrop-blur-[1px] pl-[3px]">
                           <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
                               <path d="M6 4l15 8-15 8z" strokeLinejoin="round" />
                           </svg>
                      </div>
                  </div>
             </div>
             
             {/* Row Metadata (Title & Duration) */}
             <div className="flex-1 pl-[14px] pr-[12px] flex flex-col justify-center">
                  <span className="text-[#FAFAFA] text-[15px] font-[500] tracking-tight leading-[1.2] mb-[2px]">
                      {num}. {title}
                  </span>
                  <span className="text-[#888888] text-[12.5px] font-[500]">
                      {duration}
                  </span>
             </div>
             
             {/* Dynamic Download State Machine */}
             <div className="w-[40px] h-[40px] flex justify-end items-center cursor-pointer active:scale-[0.85] transition-transform">
                  
                  {downloadState === 'downloaded' && (
                       <div className="w-[18px] h-[18px] bg-[#0A84FF] border border-[#0A84FF] rounded-[2px] flex justify-center items-center shadow-[0_1px_4px_rgba(10,132,255,0.4)] mr-[2px]">
                           <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-white stroke-[3px] fill-none mt-[1px] ml-[0.5px]">
                               <path d="M5 12.5l3.5 3.5L18 6" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                       </div>
                  )}

                  {downloadState === 'downloading' && (
                       <div className="w-[30px] h-[30px] flex justify-center items-center relative mr-[2px]">
                            {/* Radian Math Progress Spinner */}
                            <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full transform -rotate-90">
                                <circle cx="12" cy="12" r="10" stroke="#1F1F1F" strokeWidth="2" fill="none" />
                                <circle cx="12" cy="12" r="10" stroke="#0A84FF" strokeWidth="2.5" fill="none" strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 10} 
                                        strokeDashoffset={(2 * Math.PI * 10) - ((progress / 100) * 2 * Math.PI * 10)} />
                            </svg>
                            {/* Network Stop Node */}
                            <div className="w-[8px] h-[8px] bg-[#0A84FF] rounded-[1.5px] z-10 shadow-[0_1px_2px_rgba(10,132,255,0.4)]"></div>
                       </div>
                  )}

                  {downloadState === 'none' && (
                       <div className="w-[20px] h-[20px] relative mr-[2px]">
                           <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#C0C0C0] stroke-[1.8px] fill-none">
                               <path d="M12 3v13m-5-5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                               <path d="M5 20h14" strokeLinecap="round" />
                           </svg>
                       </div>
                  )}

             </div>
        </div>
        
        {/* Row Synopsis Text Block */}
        <p className="text-[#A3A3A3] text-[13.5px] leading-[1.38] font-[400] tracking-[-0.2px] px-[16px] w-[98%]">
            {synopsis}
        </p>
    </div>
);


/**
 * @name Netflix "Episodes Array (Downloading State)" Deep Scroll - Page 38
 */
export default function NetflixApp() {

  // Episode 1 Matrix (Train Interior Scene)
  const ep1Thumb = (
      <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
           <rect width="160" height="90" fill="#18232B" />
           <path d="M10,10 L40,10 L35,50 L10,50 Z" fill="#2E4C63" />
           <path d="M50,10 L110,10 L105,50 L55,50 Z" fill="#3D5A73" />
           <path d="M120,10 L160,10 L160,50 L115,50 Z" fill="#2E4C63" />
           <circle cx="20" cy="70" r="25" fill="#424D54" />
           <circle cx="140" cy="70" r="25" fill="#424D54" />
           <circle cx="25" cy="38" r="6" fill="#D3A796" opacity="0.6"/>
           <path d="M18,50 L32,50 L28,45 L22,45 Z" fill="#111" opacity="0.8"/>
           
           <path d="M55,90 L75,55 Q80,50 85,55 L105,90 Z" fill="#151A21" /> 
           <path d="M75,90 L80,68 L85,90 Z" fill="#364252" /> 
           <path d="M65,55 Q80,25 95,55 Q90,75 75,72 Q60,75 65,55 Z" fill="#E8C5B3" /> 
           <path d="M65,55 Q80,35 95,55 L95,65 L65,65 Z" fill="#A8816F" opacity="0.55"/> 
           <path d="M62,55 Q80,20 100,60 Q95,35 80,35 Q65,35 62,55 Z" fill="#1C1512" />
           
           <path d="M62,60 Q60,65 57,63" stroke="#FFF" strokeWidth="1" fill="none" /> 
           <circle cx="63" cy="58" r="1.5" fill="#111" />
           <path d="M70,55 Q73,53 76,55" fill="none" stroke="#222" strokeWidth="1" />
           <path d="M84,55 Q87,53 90,55" fill="none" stroke="#222" strokeWidth="1" />
      </svg>
  );

  // Episode 2 Matrix (Glass Command Hub Scene)
  const ep2Thumb = (
      <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
           <rect width="160" height="90" fill="#CAD3DC" /> 
           <path d="M0,45 L160,50" stroke="#9BA6AE" strokeWidth="2.5" />
           <path d="M40,0 L40,90 M80,0 L80,90 M120,0 L120,90" stroke="#E8EBED" strokeWidth="3.5" opacity="0.7"/>
           
           <circle cx="28" cy="42" r="11" fill="#2E241F" /> 
           <path d="M12,90 L45,90 L42,65 L15,70 Z" fill="#4B5661" />
           <circle cx="20" cy="78" r="8.5" fill="#F0CEB8" /> 
           
           <circle cx="140" cy="45" r="10" fill="#1F1A15" /> 
           <path d="M125,90 L155,90 L150,60 L135,55 Z" fill="#3D454A" />
           
           <circle cx="65" cy="70" r="9" fill="#E8C3AC" /> 
           <path d="M48,90 L85,90 L75,80 L52,80 Z" fill="#E8EDF2" /> 

           <path d="M92,30 Q105,15 115,35 Q110,60 92,50 Z" fill="#F0DCB8" /> 
           <path d="M115,35 C115,5 82,15 90,40" fill="none" stroke="#2B1A12" strokeWidth="6" /> 
           <path d="M85,90 L95,50 L115,55 L130,90 Z" fill="#1C2126" /> 
           <path d="M98,55 L108,90 L110,60 Z" fill="#F0F0F0" /> 
           
           <path d="M72,25 Q82,15 92,25 Q87,45 77,40 Z" fill="#D3AB95" /> 
           <path d="M55,90 L75,45 L98,45 L110,90 Z" fill="#252A33" />
           <path d="M75,45 Q65,20 85,20 Q95,20 98,45" fill="#111" />
      </svg>
  );

  // Episode 3 Matrix (Close-Interaction Dialogue Scene)
  const ep3Thumb = (
      <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
           <rect width="160" height="90" fill="#12100E" /> 
           <circle cx="160" cy="45" r="85" fill="#2B3642" opacity="0.35" style={{ filter: 'blur(25px)' }}/> 
           
           <path d="M0,90 L40,55 Q50,55 65,90 Z" fill="#E8EBED" /> 
           <path d="M20,60 Q60,-10 70,60 Q65,80 40,75 Z" fill="#F0CFBB" /> 
           <path d="M20,60 Q50,-10 70,60 L60,80 Q30,80 20,60 Z" fill="#A87A60" opacity="0.6"/> 
           <path d="M35,10 C-15,10 -10,75 10,90" fill="none" stroke="#1F130B" strokeWidth="16" />
           
           <path d="M70,90 Q90,65 110,65 Q130,65 160,90 Z" fill="#5A6673" /> 
           <path d="M100,90 L108,70 L115,90 L110,100 Z" fill="#121821" /> 
           <path d="M105,65 Q125,-10 155,40 Q160,75 125,75 Z" fill="#DDB296" /> 
           
           <path d="M130,12 Q160,0 160,30" fill="none" stroke="#110A07" strokeWidth="12" strokeLinecap="round" />
           
           <circle cx="68" cy="42" r="2.5" fill="#111" /> 
           <path d="M58,38 Q68,34 76,40" stroke="#1F130B" strokeWidth="2.5" fill="none" />
           <circle cx="118" cy="40" r="2" fill="#111" /> 
           <path d="M110,38 Q118,34 125,38" stroke="#1A110D" strokeWidth="2" fill="none" />
      </svg>
  );

  // Episode 4 Matrix (Symmetrical Interrogation Scene)
  const ep4Thumb = (
      <svg viewBox="0 0 160 90" className="w-full h-full object-cover">
           <rect width="160" height="90" fill="#0C1217" /> 
           <path d="M95,10 L95,60" stroke="#7A8F9E" strokeWidth="3" opacity="0.6" />
           
           <path d="M0,70 L160,70 L160,90 L0,90 Z" fill="#1D242B" />
           
           <path d="M5,90 L15,40 Q25,35 35,40 L45,90 Z" fill="#3E4C59" /> 
           <circle cx="25" cy="35" r="10.5" fill="#D3AB95" /> 
           <path d="M15,25 C25,18 35,18 35,30" fill="none" stroke="#A8816F" strokeWidth="4.5" /> 
           
           <path d="M75,70 L85,42 Q98,36 108,42 L115,70 Z" fill="#1A1617" /> 
           <circle cx="96" cy="36" r="9.5" fill="#E8C3AC" /> 
           
           <path d="M115,70 L125,38 Q140,20 155,38 L160,70 Z" fill="#0C0A09" /> 
           <circle cx="135" cy="40" r="8.5" fill="#DDB296" /> 
           <path d="M120,48 Q125,38 132,32 Q142,28 148,42 L148,70 Z" fill="#0C0A09" /> 
      </svg>
  );


  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-[#FAFAFA] font-sans relative select-none">
      
      {/* 1. Global Navigation Surface (Solidified Deep Scroll Core) */}
      <div className="fixed top-0 w-full h-[90px] z-50 pointer-events-none flex flex-col pt-[8px] bg-[#111111]/95 backdrop-blur-[20px] border-b border-[#2A2A2A]/20 shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
           <div className="flex justify-between items-center px-[28px] pb-[6px] relative z-20">
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

           <div className="flex justify-center items-center h-[45px] relative mt-[2px] pointer-events-auto">
               <span className="text-[#FAFAFA] text-[16.5px] font-[600] tracking-[0px]">Bodyguard</span>
               <button className="absolute right-[16px] top-[14px] p-1 active:scale-90 transition-transform cursor-pointer">
                   <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-[#FAFAFA] stroke-[2.5px] fill-transparent">
                        <path d="M5 5L19 19M5 19L19 5" strokeLinecap="round" />
                   </svg>
               </button>
           </div>
      </div>

      {/* 2. Procedural Y-Axis DOM List Stream */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar pt-[90px] relative z-10 pb-[100px]">
          
          {/* Sub-Classification Header */}
          <div className="w-full mt-[20px] px-[16px] flex items-center mb-[18px]">
              <span className="text-[#A3A3A3] text-[16px] font-[600] tracking-tight">Season 1</span>
          </div>

          {/* === DYNAMIC STATE ARRAY === */}
          
          <EpisodeRow 
              num="1" 
              title="Episode 1" 
              duration="58m" 
              imgSrc={ep1Thumb} 
              synopsis="Sgt. David Budd is promoted to a protection detail for UK Home Secretary Julia Montague, but he quickly clashes with the hawkish politician."
              downloadState="none" 
          />

          {/* CRITICAL STATE: Network Transfer in Progress */}
          <EpisodeRow 
              num="2" 
              title="Episode 2" 
              duration="58m" 
              imgSrc={ep2Thumb} 
              synopsis="After an attempted attack on the school Budd's kids attend, Montague worries about leaks in the department. But she may be in the line of fire herself."
              downloadState="downloading" 
              progress={65} 
          />

          <EpisodeRow 
              num="3" 
              title="Episode 3" 
              duration="57m" 
              imgSrc={ep3Thumb} 
              synopsis="Montague's public standing sours further. As Budd feels mounting pressure to spy on her, investigators question his statement about the shooting."
              downloadState="none" 
          />

          <EpisodeRow 
              num="4" 
              title="Episode 4" 
              duration="57m" 
              imgSrc={ep4Thumb} 
              synopsis="In the wake of another attack, investigators grow increasingly suspicious of Budd, as his state of mind" 
              downloadState="none" 
          />
          
          <div className="h-[20px]"></div>
      </div>

      {/* 3. Global Control Interceptor (Bottom Nav Frame) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
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
                  
                  {/* Network Ping Topology (Miniature Progress Ring) */}
                  <div className="absolute top-[-5px] right-[-8px] w-[18px] h-[18px] bg-[#141414] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#141414]">
                      <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] transform -rotate-90">
                          <circle cx="12" cy="12" r="10" stroke="#2A2A2A" strokeWidth="3" fill="none" />
                          <circle cx="12" cy="12" r="10" stroke="#0A84FF" strokeWidth="3" fill="none" strokeLinecap="round"
                                  strokeDasharray={2 * Math.PI * 10} 
                                  strokeDashoffset={(2 * Math.PI * 10) - (0.65 * 2 * Math.PI * 10)} />
                      </svg>
                      {/* Sub-Pixel Network Stop Marker */}
                      <div className="absolute w-[5px] h-[5px] bg-[#0A84FF] rounded-[1px]"></div>
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
