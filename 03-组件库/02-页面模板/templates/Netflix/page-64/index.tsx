import React from 'react';
import './style.css';

/**
 * OS Status Bar Component
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px] antialiased">2:58</span>
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
);


/**
 * Sub-Component: Cinematic Header Overlay
 * Serves as the pseudo modal anchor for navigation logic.
 */
const ModalHeader = () => (
    <div className="absolute top-[44px] w-full flex justify-between items-center px-[16px] h-[55px] z-[50]">
        <div className="w-[30px]"></div> {/* Positional Anchor */}
        
        <span className="text-[#FDFDFD] text-[17px] font-[600] tracking-wide antialiased line-clamp-1 truncate px-[10px]">
            Black Mirror: Bandersnatch
        </span>
        
        <div className="w-[30px] h-[30px] bg-[#2E2E2E] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#444] active:scale-95 transition-all">
            <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-white stroke-[2.2px] stroke-linecap-round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
        </div>
    </div>
);


/**
 * Synthetic Zero-Asset Text Mark Block
 * Replaces the static image poster title of Bandersnatch.
 */
const SyntheticTitleMark = () => (
    <div className="flex flex-col items-center justify-center relative w-[160px] mx-auto group cursor-pointer transition-transform hover:scale-[1.02]">
        <div className="bg-[#121212]/90 backdrop-blur-sm px-[10px] py-[4px] flex flex-col items-center shadow-[0_5px_20px_rgba(0,0,0,0.8)] border-x-[1px] border-[#3a3a3a]">
            <span className="text-[#E5E5E5] text-[12.5px] font-[800] tracking-[0.14em] leading-tight antialiased" style={{ fontFamily: 'Arial, sans-serif' }}>
                BLACK MIRROR
            </span>
            <span className="text-[#FDFDFD] text-[16.5px] font-[900] tracking-tight leading-tight mt-[1px] antialiased" style={{ fontFamily: 'Arial, sans-serif' }}>
                BANDERSNATCH
            </span>
            
            {/* Synthetic Grudge FX (0 Assets Rule Integration) */}
            <div className="absolute top-1/2 w-[110%] h-[1.5px] bg-[#FDFDFD]/10 -left-[5%] rotate-[-1deg] mix-blend-overlay pointer-events-none"></div>
        </div>
    </div>
);


/**
 * CSS-Only Thumbnail Simulator (Bandersnatch specific geometry overlay)
 * Mocks the complex retro layout visual data strictly using absolute divs and splines.
 */
const BandersnatchCSSThumbnailArt = () => (
    <div className="w-full aspect-[16/9] relative bg-[#131411] overflow-hidden rounded-[2px] shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
         {/* Background Room Atmosphere */}
         <div className="absolute inset-0 bg-[#252824] opacity-80 shadow-[inset_0px_30px_80px_rgba(0,0,0,0.9)]"></div>
         <div className="absolute right-[5%] top-[10%] w-[120px] h-[120px] bg-[#f9dba2] blur-[45px] opacity-[0.25]"></div>
         <div className="absolute right-[35%] top-[45%] w-[180px] h-[120px] bg-[#ce7e2f] blur-[55px] opacity-[0.22]"></div>

         {/* Left Periphery (Desk Architecture) */}
         <div className="absolute left-[-5%] bottom-[-10%] w-[160px] h-[220px] bg-[#120F0D] border-r border-[#332a22]">
              <div className="absolute w-[85%] h-[16px] bg-[#221A15] top-[50px] left-[10%]"></div>
              <div className="absolute w-[80%] h-[12px] bg-[#3a2818] top-[66px] left-[10%] shadow-lg"></div> {/* Binder shadow */}
              <div className="absolute w-[85%] h-[16px] bg-[#221A15] top-[110px] left-[10%]"></div>
         </div>
         
         {/* Primary Desk Pane */}
         <div className="absolute right-0 bottom-[5%] w-[55%] h-[20px] bg-[#0c0906] transform skew-x-[12deg] shadow-[-10px_10px_20px_rgba(0,0,0,0.8)]"></div>

         {/* Focal Hardware (Synth-VCR/Computer Block) */}
         <div className="absolute left-[28%] bottom-[12%] w-[85px] h-[38px] bg-[#1d1f18] border-t border-[#3b3d33] shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-end">
             <div className="w-[60%] h-[4px] bg-black mb-[6px] mx-auto opacity-60"></div>
             {/* Tech glowing indicator light */}
             <div className="absolute bottom-[6px] right-[10px] w-[2px] h-[2px] bg-[#38e8cb] rounded-full blur-[1px]"></div>
         </div>

         {/* Extractor Reference Geometry (Red Desktop File Block) */}
         <div className="absolute right-[33%] top-[55%] w-[48px] h-[26px] bg-[#8a1a1a] shadow-[0_5px_10px_rgba(0,0,0,0.7)] rounded-sm rotate-[-8deg] border border-[#a62b2b]/50"></div>

         {/* Stefan Procedural Dark Vector Entity Silhouette */}
         <svg viewBox="0 0 100 100" className="absolute right-[2%] bottom-[-12%] w-[190px] h-[155px] z-20 overflow-visible fill-[#070908] stroke-[#151c17] stroke-[0.3px]">
             {/* Head, Back, Neck */}
             <path d="M50,70 Q45,30 20,25 Q15,40 25,60 Q20,80 30,100 L70,100 Q65,80 50,70" />
             {/* Arm Connection */}
             <path d="M25,60 Q10,75 -15,85 L-15,95 Q15,90 30,80" strokeLinejoin="mround" />
         </svg>

         {/* OS Standardized Video Play Intercept Layer */}
         <div className="absolute inset-0 z-[30] flex items-center justify-center pointer-events-none">
              <div className="w-[52px] h-[52px] rounded-full border-[2px] border-[#FDFDFD] bg-[#000000]/40 flex justify-center items-center backdrop-blur-[1px] pointer-events-auto cursor-pointer hover:bg-[#000000]/60 hover:scale-105 transition-all">
                   <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-[#FDFDFD] ml-[3px] mt-[1px]">
                       <path d="M6 4l15 8-15 8z" />
                   </svg>
              </div>
         </div>
    </div>
);


/**
 * Netflix Global Layout Tab Bar
 */
const PrimaryTabBar = () => (
    <div className="w-full flex-shrink-0 bg-[#121212] pt-[12px] px-[20px] pb-[34px] border-t border-[#2A2A2A] z-[120] relative">
        <div className="flex justify-between items-start w-full">
            {/* Validated Home Tab */}
            <div className="flex flex-col items-center gap-[4px] cursor-pointer group flex-1">
                 <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-[#FDFDFD] stroke-[2px] stroke-linejoin-round transition-transform group-active:scale-95">
                     <path d="M3 10l9-7 9 7v11H3v-11z" />
                     <path d="M9 21v-8h6v8" />
                 </svg>
                 <span className="text-[#FDFDFD] text-[10px] font-[500] tracking-wide antialiased">Home</span>
            </div>
            
            {/* Search Tab */}
            <div className="flex flex-col items-center gap-[4px] cursor-pointer group flex-1">
                 <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-[#888888] stroke-[2px] transition-transform group-active:scale-95">
                     <circle cx="10.5" cy="10.5" r="7" />
                     <line x1="21" y1="21" x2="15.8" y2="15.8" className="stroke-linecap-round" />
                 </svg>
                 <span className="text-[#888] text-[10px] font-[500] tracking-wide antialiased">Search</span>
            </div>

            {/* Downloads Tab */}
            <div className="flex flex-col items-center gap-[4px] cursor-pointer group flex-1">
                 <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-[#888888] stroke-[2px] stroke-linejoin-round transition-transform group-active:scale-95">
                     <path d="M12 3v13M12 16l-5-4M12 16l5-4M4 21h16" strokeLinecap="round" />
                 </svg>
                 <span className="text-[#888] text-[10px] font-[500] tracking-wide antialiased">Downloads</span>
            </div>

            {/* More Context Drawer */}
            <div className="flex flex-col items-center gap-[4px] cursor-pointer group flex-1">
                 <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-[#888888] stroke-[2.2px] stroke-linecap-round transition-transform group-active:scale-95">
                     <line x1="3" y1="6" x2="21" y2="6" />
                     <line x1="3" y1="12" x2="21" y2="12" />
                     <line x1="3" y1="18" x2="21" y2="18" />
                 </svg>
                 <span className="text-[#888] text-[10px] font-[500] tracking-wide antialiased">More</span>
            </div>
        </div>

        {/* Global Nav Indicator */}
        <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full left-1/2 -translate-x-1/2"></div>
    </div>
);


/**
 * @name Netflix Title Inspection Modal Detail - Page 64
 * Top level scrolling detail wrapper containing full interactive UX suite.
 */
export default function NetflixTitleDetailView() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#121212] overflow-hidden">
            
            <StatusBar />
            <ModalHeader />

            {/* Native Scroll Content Container */}
            <div className="flex-1 w-full overflow-y-auto relative">
                
                {/* 
                  Volumetric Parallax Depth Canvas
                  Generates the cinematic dark shadow bloom seen behind titles seamlessly 
                  merging into the base App Hex #121212 tone.
                */}
                <div className="absolute top-0 w-full h-[320px] bg-gradient-to-b from-[#2E2822] via-[#1A1613] to-[#121212] z-0 pointer-events-none"></div>

                {/* Secure Floating Form Interaction Flow */}
                <div className="relative z-[10] w-full flex flex-col pt-[115px]">
                    
                    {/* Hero Graphic Assembly */}
                    <div className="w-full flex justify-center">
                        <SyntheticTitleMark />
                    </div>

                    {/* Quick Metadata Info Row (Year / Rating / Runtime) */}
                    <div className="flex items-center gap-[12px] text-[#A3A3A3] text-[14px] font-[500] mt-[16px] justify-center tracking-wide">
                        {/* Rating Endorsement */}
                        <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white mt-1">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1.505 1.505 0 00-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05A1.976 1.976 0 0023 12v-2z" />
                        </svg>
                        <span className="antialiased">2018</span>
                        {/* Mature Control Box UI */}
                        <div className="px-[5px] py-[1.5px] text-[#D1D1D1] text-[12px] font-[600] rounded-[2px] leading-none flex items-center antialiased border border-transparent shadow-sm">
                            M18
                        </div>
                        <span className="antialiased">1h 30m</span>
                    </div>

                    {/* Primary Engagement Hook */}
                    <div className="px-[10px] w-full mt-[15px]">
                        <div className="w-full h-[46px] bg-[#E50914] rounded-[3px] flex justify-center items-center gap-[8px] cursor-pointer hover:bg-[#C10812] active:scale-[0.98] transition-all shadow-sm">
                            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-white">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="text-[#FDFDFD] text-[16px] font-[700] tracking-wide antialiased">Play</span>
                        </div>
                    </div>

                    {/* Full Typography Synaptic Breakdown */}
                    <div className="px-[10px] mt-[14px]">
                        <p className="text-[#E5E5E5] text-[14.5px] font-[400] leading-[1.45] tracking-[0.01em] antialiased drop-shadow-sm">
                            In 1984, a young programmer begins to question reality as he adapts a dark fantasy novel into a video game. A mind-bending tale with multiple endings.
                        </p>
                        <p className="text-[#A3A3A3] text-[12.5px] font-[400] mt-[10px] antialiased tracking-wide">
                            <span className="text-[#7A7A7A]">Cast: </span>Fionn Whitehead, Will Poulter, Craig Parkinson
                        </p>
                    </div>

                    {/* Post-Action Row Operations Suite */}
                    <div className="w-full flex justify-start px-[15px] mt-[24px]">
                        <div className="flex justify-between w-[75%] max-w-[280px]">
                            {/* Vault / Watchlist Storage Hook */}
                            <div className="flex flex-col items-center gap-[8px] cursor-pointer group">
                                <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] stroke-[#FDFDFD] stroke-[2px] fill-transparent transition-transform group-active:scale-90">
                                     <polyline points="21 6 9 18 4 13" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[#7A7A7A] text-[11px] font-[500] tracking-wide antialiased">My List</span>
                            </div>
                            
                            {/* Algorithm Recommendation Poller */}
                            <div className="flex flex-col items-center gap-[8px] cursor-pointer group">
                                <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-[#FDFDFD] transition-transform group-active:scale-90">
                                     <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1.505 1.505 0 00-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05A1.976 1.976 0 0023 12v-2z" />
                                </svg>
                                <span className="text-[#7A7A7A] text-[11px] font-[500] tracking-wide antialiased">Rated</span>
                            </div>

                            {/* Omnichannel Broadcast API Trigger */}
                            <div className="flex flex-col items-center gap-[8px] cursor-pointer group">
                                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-[#FDFDFD] stroke-[1.8px] transition-transform group-active:scale-90">
                                     <path d="M12 4v13M12 4L8 8M12 4l4 4M4 12v8h16v-8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-[#7A7A7A] text-[11px] font-[500] tracking-wide antialiased">Share</span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Navigation Ribbon Control Panel */}
                    <div className="w-full mt-[32px] border-b border-[#333333]">
                        <div className="px-[12px] flex">
                            {/* Tab Layout Absolute Overlap Anchor */}
                            <div className="flex flex-col cursor-pointer relative pb-[12px]">
                                <span className="text-[#FDFDFD] text-[14px] font-[700] tracking-[0.05em] antialiased">
                                    TRAILERS & MORE
                                </span>
                                {/* Native Semantic Highlight Border (-1px Offset Hack solves cross-browser border overlay drops) */}
                                <div className="absolute bottom-[-1px] left-0 w-full h-[4px] bg-[#E50914] z-[10] shadow-[0_1px_2px_rgba(229,9,20,0.5)]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Feed Content Projection Block */}
                    <div className="px-[10px] mt-[16px] flex flex-col w-full pb-[25px]">
                        
                        {/* Invokes Zero-Asset Graphics Synthesis */}
                        <BandersnatchCSSThumbnailArt className="mb-[12px] cursor-pointer" />
                        
                        <span className="text-[#E5E5E5] text-[14.5px] font-[400] tracking-wide antialiased ml-[2px]">
                             Black Mirror: Bandersnatch (Trailer)
                        </span>
                    </div>

                </div>
            </div>

            {/* Persistent Structural Bottom Base */}
            <PrimaryTabBar />

        </div>
    );
}
