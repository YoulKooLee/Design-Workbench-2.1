import React from 'react';
import './style.css';

/**
 * Standard Netflix Mobile Icons & Interactive Graphical SVGs
 */
const InteractionStar = ({ className = "w-[20px] h-[20px] stroke-[2px]" }) => (
    <svg viewBox="0 0 24 24" className={`stroke-white fill-transparent stroke-linecap-round pointer-events-none drop-shadow-sm ${className}`}>
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
    </svg>
);

const NavNLogo = () => (
    <svg viewBox="0 0 100 130" className="w-[18px] h-[26px] drop-shadow-sm">
        <polygon points="0,0 28,0 28,130 0,130" fill="#B20710" />
        <polygon points="72,0 100,0 100,130 72,130" fill="#B20710" />
        <polygon points="0,0 28,0 100,130 72,130" fill="#E50914" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white stroke-[2px] fill-transparent pointer-events-none drop-shadow-md" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M5 12l4.5 4.5L20 6" />
    </svg>
);

const InfoIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white stroke-[1.8px] fill-transparent pointer-events-none drop-shadow-md">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="11" x2="12" y2="17" strokeLinecap="round" />
        <circle cx="12" cy="7.5" r="1" fill="white" stroke="none" />
    </svg>
);

/**
 * Procedural Topographical Fingerprint Art Logic
 * Simulates the highly complex original 'Bandersnatch' Poster image dynamically via SVG contours.
 */
const ProceduralBandersnatchFace = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Cinematic Space Foundation */}
            <div className="absolute inset-0 bg-[#09151A]"></div>
            
            {/* Soft Ambient Radiance */}
            <div className="absolute top-[20%] left-[20%] w-[180px] h-[250px] bg-[#1B3E4D] blur-[45px] z-[1]"></div>
            
            {/* Geometric Contour Ripple Generator */}
            <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen z-[2]">
                <g stroke="#91C3CF" fill="none" strokeWidth="1.2" opacity="0.85">
                    {Array.from({length: 42}).map((_, i) => (
                        <ellipse 
                            key={i}
                            cx="150" cy="220" 
                            rx={i * 8 + (i%5)*2} 
                            ry={i * 12 + (i%3)*5} 
                            transform={`rotate(${-i * 1.5} 150 220)`} 
                        />
                    ))}
                </g>
                <g stroke="#71A0AC" fill="none" strokeWidth="2" opacity="0.4">
                    {Array.from({length: 15}).map((_, i) => (
                        <ellipse cx="150" cy="220" rx={i * 18} ry={i * 24} transform={`rotate(${-i * 3} 150 220)`} />
                    ))}
                </g>
            </svg>

            {/* Solid Silhouette Terminator Shadow */}
            {/* Erases the contour rings gracefully along the right boundary to construct the profile geometry (Nose, lips, chin) */}
            <div className="absolute top-[80px] right-[-10px] w-[110px] h-[400px] bg-[#000000] z-[3] blur-[8px] transform rotate-[8deg]"></div>
            <div className="absolute top-[180px] right-[40px] w-[50px] h-[50px] bg-[#000] z-[3] rounded-full blur-[4px]"></div>
            
            {/* Base Darkness Anchor */}
            <div className="absolute bottom-[0px] right-[10%] w-[250px] h-[100px] bg-[#000000] z-[3] blur-[15px]"></div>
        </div>
    );
};

/**
 * Application Head Mount (Z-Indexed for Readability)
 */
const AppHeader = () => (
    <div className="absolute top-0 w-full pointer-events-none z-[50]">
        
        {/* Light Dimming Shield mapped over the dynamic hero artwork */}
        <div className="absolute top-0 w-full h-[120px] bg-gradient-to-b from-black/85 via-black/40 to-transparent"></div>
        
        {/* OS Standard Status Bar */}
        <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[60]">
            <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px]">2:55</span>
            <div className="flex items-center gap-[6px]">
                <div className="flex items-end gap-[1.5px] h-[10.5px]">
                    <div className="w-[3px] h-[4.5px] bg-white rounded-[1px]"></div>
                    <div className="w-[3px] h-[6.5px] bg-white rounded-[1px]"></div>
                    <div className="w-[3px] h-[8.5px] bg-white rounded-[1px]"></div>
                    <div className="w-[3px] h-[10.5px] bg-white rounded-[1px]"></div>
                </div>
                <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-white mb-[1px]">
                    <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
                </svg>
                <div className="w-[23.5px] h-[11.5px] border border-white/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                    <div className="w-[85%] h-full bg-white rounded-[1.5px]"></div>
                    <div className="absolute right-[-3px] w-[2px] h-[4px] bg-white/85 rounded-[2px]"></div>
                </div>
            </div>
        </div>

        {/* Global Netflix Navigation Structure */}
        <div className="absolute top-[50px] w-full px-[20px] flex items-center pointer-events-auto z-[60]">
            <div className="mr-[30px] ml-[2px]">
                <NavNLogo />
            </div>
            <div className="flex-1 flex justify-between pr-[14px]">
                <span className="text-white text-[15.5px] font-[600] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer">Series</span>
                <span className="text-white text-[15.5px] font-[600] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer">Films</span>
                <span className="text-white text-[15.5px] font-[600] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer">My List</span>
            </div>
        </div>
    </div>
);

/**
 * Universal iOS Navigation Footprint
 */
const BottomNavTabs = () => (
    <div className="absolute bottom-0 w-full h-[88px] bg-[#121212]/95 backdrop-blur-md flex justify-around items-start pt-[12px] border-t border-[#333]/50 z-50 pb-[20px]">
        <div className="flex flex-col items-center gap-[4px] w-[60px] cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-white"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            <span className="text-[10.5px] font-[700] text-white tracking-wide mt-[1px]">Home</span>
        </div>
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-[#F2F2F2]"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span className="text-[10px] font-[600] text-[#A6A6A6] tracking-wide mt-[1px]">Search</span>
        </div>
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] fill-transparent stroke-[#F2F2F2] stroke-[2px] stroke-linecap-round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
            <span className="text-[10px] font-[600] text-[#A6A6A6] tracking-wide mt-[0px]">Downloads</span>
        </div>
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] fill-[#F2F2F2]"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            <span className="text-[10px] font-[600] text-[#A6A6A6] tracking-wide mt-[0px]">More</span>
        </div>
        <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full mx-auto left-1/2 -translate-x-1/2 pointer-events-none"></div>
    </div>
);


/**
 * @name Netflix "Main Home Shell" - Page 55
 * Simulates the primary Netflix iOS viewing matrix (Root Application state)
 */
export default function NetflixHome() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none overflow-hidden font-sans bg-black">
            
            <AppHeader />

            {/* Global Viewport Scrolling Engine */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hide z-10 pb-[100px]">
                
                {/* 
                  ====================================================
                  1. HERO BILLBOARD 
                  Dynamic height mapped to approx 60% of vertical standard bounds.
                  Encompasses full bleed graphics and interaction logic anchors.
                  ====================================================
                */}
                <div className="w-full h-[530px] relative">
                    
                    {/* SVG Procedural Texture Map */}
                    <ProceduralBandersnatchFace />

                    {/* Massive Graphic Overlay (Z:40 escapes traditional dark headers natively) */}
                    <div className="absolute top-0 right-[25px] w-[55px] h-[135px] bg-[#E50914] flex justify-center pt-[70px] shadow-[0_8px_15px_rgba(229,9,20,0.4)] z-[40]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)' }}>
                        <InteractionStar className="w-[32px] h-[32px] stroke-[2.2px] ml-[1px]" />
                    </div>

                    {/* Text Gradation Sink (Ensure typography always reads over images) */}
                    <div className="absolute bottom-0 w-full h-[180px] bg-gradient-to-t from-black via-[#000000]/80 to-transparent z-[10] pointer-events-none"></div>

                    {/* Meta Typography Core */}
                    <div className="flex flex-col items-center z-[20] w-full absolute bottom-[85px] pointer-events-none">
                        <span className="text-[#FAFAFA] text-[10.5px] tracking-[0.16em] font-[500] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">A <span className="font-[900]">NETFLIX</span> INTERACTIVE FILM</span>
                        
                        <div className="mt-[6px] flex flex-col items-center">
                            <span className="text-[#F5F5F5] font-[900] text-[34px] uppercase tracking-[0.02em] drop-shadow-[0_2px_20px_rgba(100,200,255,0.4)] leading-none blur-[0.3px]">Black Mirror</span>
                            <span className="text-[#D0D0D0] font-[900] text-[20.5px] uppercase tracking-[0.08em] drop-shadow-[0_2px_20px_rgba(100,200,255,0.4)] -mt-[4px]">Bandersnatch</span>
                        </div>
                        
                        <span className="text-[#CCCCCC] text-[11px] font-[500] mt-[16px] tracking-wide drop-shadow-md">
                            Sci-Fi Drama &nbsp;<span className="text-[#888] scale-[1.2] inline-block">&bull;</span>&nbsp; Offbeat &nbsp;<span className="text-[#888] scale-[1.2] inline-block">&bull;</span>&nbsp; Set in the 1980s
                        </span>
                    </div>

                    {/* Hero Immediate Actions */}
                    <div className="absolute bottom-[20px] w-full px-[45px] flex justify-between items-center z-[20]">
                        <div className="flex flex-col items-center gap-[4px] cursor-pointer hover:opacity-80 transition-opacity">
                            <CheckIcon />
                            <span className="text-[#999] text-[10px] font-[500] tracking-wide mt-[2px]">My List</span>
                        </div>

                        <div className="w-[110px] h-[35px] bg-white rounded-[2.5px] flex justify-center items-center gap-[6px] active:scale-95 transition-transform shadow-[0_4px_10px_rgba(0,0,0,0.4)] cursor-pointer mb-[6px]">
                            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black"><path d="M8 5v14l11-7z"/></svg>
                            <span className="text-black text-[15.5px] font-[600] tracking-tight">Play</span>
                        </div>

                        <div className="flex flex-col items-center gap-[4px] cursor-pointer hover:opacity-80 transition-opacity">
                            <InfoIcon />
                            <span className="text-[#999] text-[10px] font-[500] tracking-wide mt-[2px]">Info</span>
                        </div>
                    </div>
                </div>

                {/* 
                  ====================================================
                  2. SCROLLABLE ASSET MATRICES 
                  Standard Netflix horizontal carousel mapping.
                  ====================================================
                */}
                <div className="w-full bg-black flex flex-col pt-[15px]">
                    <span className="text-white font-[700] text-[18px] tracking-tight px-[10px] mb-[10px]">My List</span>
                    
                    <div className="w-full pl-[10px] flex gap-[8px] overflow-x-auto scrollbar-hide pb-[10px]">
                        
                        {/* Procedural Poster 1 (Punisher/Action) */}
                        <div className="w-[105px] h-[155px] bg-[#222] rounded-[3.5px] flex-shrink-0 relative overflow-hidden shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[#E0E5E7] z-[0]"></div>
                            {/* Generic Suit / Body silhouette */}
                            <div className="absolute bottom-0 left-[5%] w-[90%] h-[70%] bg-[#1E2328] rounded-t-[40px] z-[1] blur-[1px]"></div>
                            {/* Gritty Profile Structure */}
                            <div className="absolute bottom-[20%] left-[20%] w-[60%] h-[50%] bg-[#DDBBAA] rounded-[20px] z-[2] blur-[1px]"></div>
                            <div className="absolute top-[40%] right-[30%] w-[25px] h-[45px] bg-[#990000] z-[3] blur-[3px]"></div>
                            <span className="absolute top-[6px] left-[6px] text-[#E50914] text-[8px] font-[900] tracking-tighter z-10 drop-shadow-md">NETFLIX</span>
                        </div>

                        {/* Procedural Poster 2 (Will Poulter - Inherited from page-54 logic) */}
                        <div className="w-[105px] h-[155px] bg-[#1a1a1a] rounded-[3.5px] flex-shrink-0 relative overflow-hidden shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[#A6A6A6] z-[0]"></div>
                            <div className="absolute top-[5%] left-[5%] w-[90px] h-[110px] bg-[#D1BEA5] rounded-full blur-[15px] z-[0]"></div>
                            <div className="absolute top-[-10px] left-[0] w-[110px] h-[50px] bg-[#F7EACD] blur-[10px] z-[0] opacity-95"></div>
                            <div className="absolute top-[35%] left-[20%] w-[70px] h-[25px] bg-[#000] opacity-[0.35] blur-[8px] z-[0]"></div>
                            <div className="absolute bottom-[0] left-0 w-full h-[60px] bg-[#2C3B4E] blur-[15px] z-[0]"></div>
                            
                            <span className="absolute top-[6px] left-[6px] text-[#E50914] text-[8px] font-[900] tracking-tighter z-[20] drop-shadow-md">NETFLIX</span>
                            
                            {/* Small format Red Interaction Ribbon */}
                            <div className="absolute top-[0px] right-[4px] w-[24px] h-[36px] bg-[#E50914] z-[30] flex justify-center pt-[5px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                                <InteractionStar className="w-[14px] h-[14px] stroke-white stroke-[2.5px]" />
                            </div>
                        </div>

                        {/* Procedural Poster 3 (Suits / Coporate Drama) */}
                        <div className="w-[105px] h-[155px] bg-[#FDFDFD] rounded-[3.5px] flex-shrink-0 relative overflow-hidden shadow-lg cursor-pointer">
                            <div className="absolute bottom-0 left-[10%] w-[45px] h-[80px] bg-[#0E1116] rounded-t-[5px]"></div>
                            <div className="absolute bottom-[75px] left-[15%] w-[35px] h-[50px] bg-[#E5D0C0] rounded-[20px]"></div>
                            
                            <div className="absolute bottom-0 right-[0] w-[45px] h-[70px] bg-[#18181A] rounded-t-[10px]"></div>
                            <div className="absolute bottom-[65px] right-[5%] w-[35px] h-[50px] bg-[#C1A893] rounded-[20px] shadow-[-2px_0_5px_rgba(0,0,0,0.3)]"></div>
                            <div className="absolute bottom-[105px] right-[5%] w-[40px] h-[35px] bg-[#000] blur-[2px] opacity-90 rounded-[20px]"></div>
                        </div>

                    </div>
                </div>

                <div className="w-full h-[100px]"></div>
            </div>

            <BottomNavTabs />
        </div>
    );
}
