import React from 'react';
import './style.css';

/**
 * Standard Application Icons (Native Vectors)
 */
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-[#FFF] stroke-[2.2px] fill-transparent pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" strokeLinecap="round">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] stroke-white stroke-[1.2px] fill-transparent pointer-events-none" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M5 12l4.5 4.5L20 6" />
    </svg>
);

const RateIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white stroke-[1.2px] fill-transparent stroke-linecap-round stroke-linejoin-round pointer-events-none">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
);

const ShareIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] stroke-white stroke-[1.2px] fill-transparent pointer-events-none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v13"/>
    </svg>
);

/**
 * Netflix Interactive Graphic Tag (Starburst Node)
 */
const InteractionStar = () => (
    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-white stroke-[2.5px] fill-transparent stroke-linecap-round pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] mt-[3px]">
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
    </svg>
);

/**
 * Core Status Bar Anchor
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none bg-gradient-to-b from-[#121212]/30 to-transparent">
        
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px] drop-shadow-md">2:57</span>
        
        <div className="flex items-center gap-[6px] drop-shadow-md">
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
);


/**
 * OS Footer Level Navigation Hub
 */
const BottomNavTabs = () => (
    <div className="absolute bottom-0 w-full h-[88px] bg-[#121212]/95 backdrop-blur-md flex justify-around items-start pt-[12px] border-t border-[#333]/50 z-50 pb-[20px]">
        {/* Home */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-white"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            <span className="text-[10.5px] font-[500] text-white tracking-wide mt-[1px]">Home</span>
        </div>
        {/* Search */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-[#F2F2F2]"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide mt-[1px]">Search</span>
        </div>
        {/* Downloads */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] fill-transparent stroke-[#F2F2F2] stroke-[2px] stroke-linecap-round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide mt-[0px]">Downloads</span>
        </div>
        {/* More */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.6] hover:opacity-100 cursor-pointer transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] fill-[#F2F2F2]"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide mt-[0px]">More</span>
        </div>
        {/* Hardware Indicator */}
        <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full mx-auto left-1/2 -translate-x-1/2 pointer-events-none"></div>
    </div>
);


/**
 * @name Netflix "Bandersnatch Vertical Poster Profile" - Page 54
 * Replaces the horizontal header string (052) with an absolute hero portrait poster wrapper.
 */
export default function DetailPageHeroPoster() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none overflow-hidden font-sans bg-[#121212]">
            
            <StatusBar />

            {/* Independent Floating OS Close */}
            <div className="absolute top-[52px] right-[18px] w-[32px] h-[32px] bg-[#222222]/80 backdrop-blur-md rounded-full flex justify-center items-center shadow-[0_2px_10px_rgba(0,0,0,0.8)] z-[100] cursor-pointer hover:bg-[#333] transition-colors border-[0.5px] border-white/5">
                <CloseIcon />
            </div>

            {/* Main Scrolling Track */}
            <div className="flex-1 w-full flex flex-col items-center overflow-y-auto z-10 scrollbar-hide">
                
                {/* Poster Content-Aware Ambient Halo extraction */}
                <div className="absolute top-0 left-0 w-full h-[400px] bg-[radial-gradient(ellipse_at_top,_#2E2E30_0%,_#121212_65%)] z-[-1] pointer-events-none mix-blend-screen opacity-90"></div>

                {/* Hero Vertical Poster Geometry */}
                <div className="mt-[60px] w-[190px] h-[280px] bg-[#1a1a1a] rounded-[4px] shadow-[0_15px_35px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col justify-between items-center z-20 group">
                    
                    {/* Procedural Skin/Face Texture Base (Will Poulter simulation) */}
                    <div className="absolute inset-0 bg-[#A6A6A6] z-[0]"></div>
                    <div className="absolute top-[5%] left-[5%] w-[170px] h-[200px] bg-[#D1BEA5] rounded-full blur-[25px] z-[0]"></div>
                    
                    {/* Hair Simulation */}
                    <div className="absolute top-[-20px] left-[0] w-[200px] h-[80px] bg-[#F7EACD] blur-[15px] z-[0] opacity-95"></div>
                    
                    {/* Character Glasses / Shadow mapping */}
                    <div className="absolute top-[35%] left-[20%] w-[130px] h-[45px] bg-[#000] opacity-[0.35] blur-[12px] z-[0]"></div>
                    
                    {/* Torso/Blue Shirt Simulation */}
                    <div className="absolute bottom-[0] left-0 w-full h-[120px] bg-[#2C3B4E] blur-[22px] z-[0]"></div>
                    
                    {/* Typography Contrast Gradient map */}
                    <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent z-[10] pointer-events-none"></div>
                    
                    {/* Corporate Branding Headers */}
                    <div className="w-full flex justify-between items-start z-[20] pt-[5px] px-[8px] relative pointer-events-none">
                         <span className="text-[#E50914] font-[900] tracking-tighter text-[11.5px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">NETFLIX</span>
                    </div>

                    {/* Highly Interactive "Bandersnatch Branching" Red Notch Badge */}
                    <div 
                        className="absolute top-[-1px] right-[8px] w-[36px] h-[52px] bg-[#E50914] z-[30] flex justify-center items-start pt-[5px] shadow-[0_2px_10px_rgba(229,9,20,0.4)]" 
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }}
                    >
                         <InteractionStar />
                    </div>

                    {/* Bottom Grounded Title Sequence */}
                    <div className="relative z-[20] flex flex-col justify-center items-center pb-[10px] pointer-events-none">
                        <span className="text-[#F2F2F2] font-[900] text-[18px] uppercase tracking-[0.03em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Black Mirror</span>
                        <span className="text-[#C0C0C0] font-[900] text-[13px] uppercase tracking-[0.08em] -mt-[4px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Bandersnatch</span>
                    </div>
                </div>

                {/* Algorithmic Category Array */}
                <div className="w-full flex justify-center items-center gap-[14px] mt-[26px]">
                    <span className="text-[#46D369] font-[600] text-[15px] tracking-tight drop-shadow-[0_0_1px_rgba(0,0,0,1)]">89% match</span>
                    <span className="text-[#A3A3A3] font-[400] text-[14px]">2018</span>
                    <div className="px-[5px] py-[1.5px] bg-[#2E2E2E] rounded-[3px] border border-[#555]">
                        <span className="text-[#A3A3A3] font-[600] text-[11px]">M18</span>
                    </div>
                    <span className="text-[#A3A3A3] font-[400] text-[14px]">1h 30m</span>
                </div>

                {/* Core Stream Button */}
                <div className="w-full px-[10px] mt-[18px]">
                    <div className="w-full h-[46px] bg-[#E50914] rounded-[4px] flex justify-center items-center gap-[8px] active:bg-[#C00811] transition-colors shadow-sm cursor-pointer">
                        <svg className="w-[20px] h-[20px] fill-white ml-[4px]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        <span className="text-white font-[600] text-[16px] tracking-tight">Play</span>
                    </div>
                </div>

                {/* Synopsis Rendering */}
                <div className="w-full px-[10px] mt-[18px] flex flex-col gap-[6px]">
                    <p className="text-[#F5F5F5] text-[15px] leading-[22px] font-[400] tracking-tight">
                        In 1984, a young programmer begins to question reality as he adapts a dark fantasy novel into a video game. A mind-bending tale with multiple endings.
                    </p>
                    <p className="text-[#999999] text-[12.5px] leading-[18px] mt-[2px] font-[400]">
                        Cast: Fionn Whitehead, Will Poulter, Craig Parkinson
                    </p>
                </div>

                {/* User Social Actions Array */}
                <div className="w-full px-[40px] mt-[22px] mb-[25px] flex justify-between items-center">
                    
                    <div className="flex flex-col items-center cursor-pointer active:opacity-50 transition-opacity">
                        <CheckIcon />
                        <span className="text-[#989898] text-[10px] mt-[6px] font-[500] tracking-wide relative left-[1px]">My List</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer active:opacity-50 transition-opacity ml-[8px]">
                        <RateIcon />
                        <span className="text-[#989898] text-[10px] mt-[6px] font-[500] tracking-wide relative left-[1px]">Rate</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer active:opacity-50 transition-opacity ml-[10px]">
                        <ShareIcon />
                        <span className="text-[#989898] text-[10px] mt-[8px] font-[500] tracking-wide">Share</span>
                    </div>

                </div>

                {/* Content Carousel Navigation */}
                <div className="w-full relative">
                    <div className="absolute bottom-0 w-full h-[1px] bg-[#333333]"></div>
                    <div className="w-full px-[10px] flex border-t border-transparent">
                        <div className="flex flex-col relative pb-[12px] pt-[2px]">
                            <span className="text-white font-[700] text-[13.5px] tracking-[0.05em] uppercase pr-[4px]">Trailers & More</span>
                            {/* Selected Node Indicator (Overlaps the boundary border) */}
                            <div className="absolute bottom-[0] left-[0] right-[0] h-[4px] bg-[#E50914] rounded-t-[2px] z-10"></div>
                        </div>
                    </div>
                </div>

                {/* Content Stream (Procedural Geometry Equivalent) */}
                <div className="w-full px-[10px] mt-[16px] flex flex-col gap-[10px]">
                    <div className="w-full h-[200px] bg-[#111] relative overflow-hidden flex justify-center items-center shadow-lg rounded-sm cursor-pointer border border-[#1a1a1a]">
                        
                        {/* Environmental light processing for the Trailer still */}
                        <div className="absolute top-[8%] right-[12%] w-[90px] h-[40px] bg-[#B21C14] opacity-[0.8] blur-[2px] rounded-sm transform rotate-[6deg]"></div>
                        <div className="absolute top-[6%] right-[10%] w-[100px] h-[45px] bg-[#C1251E] opacity-[0.3] blur-[15px]"></div>
                        <div className="absolute bottom-[18%] left-[20%] w-[60px] h-[50px] bg-[#7D9BC4] opacity-[0.9] blur-[25px]"></div>
                        <div className="absolute top-[8%] right-[35%] w-[45px] h-[25px] bg-[#F7E1A6] opacity-[0.95] blur-[10px]"></div>

                        {/* Silhouette and desk elements mapping */}
                        <div className="absolute bottom-[-15px] left-[35%] w-[130px] h-[160px] bg-[#151719] rounded-[30px] shadow-[inset_4px_0_10px_rgba(255,255,255,0.03)]"></div>
                        <div className="absolute bottom-[105px] left-[45%] w-[65px] h-[75px] bg-[#151719] rounded-full shadow-[inset_2px_0_5px_rgba(255,255,255,0.03)]"></div>
                        <div className="absolute bottom-[0px] left-[15%] w-[120px] h-[45px] bg-[#151719] rotate-[-5deg] rounded-l-full"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[25px] bg-[#0A0A0A]"></div>

                        {/* Absolute Centered Video Execution Circle */}
                        <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-white bg-[#000]/60 flex justify-center items-center z-20 shadow-[0_2px_15px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-transform active:scale-95">
                            <svg className="w-[28px] h-[28px] fill-white ml-[3px]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                    
                    <span className="text-[#C0C0C0] text-[14.5px] font-[500] leading-tight">Black Mirror: Bandersnatch (Trailer)</span>
                </div>

                {/* Extends scroll plane for bottom Navigation Array */}
                <div className="h-[120px] w-full shrink-0"></div>
            </div>

            <BottomNavTabs />

        </div>
    );
}
