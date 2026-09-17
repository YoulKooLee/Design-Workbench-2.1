import React from 'react';
import './style.css';

/**
 * Standard Netflix SVGs (Thumb Action Array)
 */
const ThumbUpIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[38px] h-[38px] fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" preserveAspectRatio="xMidYMid meet">
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
);

const ThumbDownIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[38px] h-[38px] fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" preserveAspectRatio="xMidYMid meet">
        <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-white stroke-[1.5px] fill-transparent pointer-events-none" strokeLinecap="round">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
);

/**
 * OS StatusBar
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px]">2:58</span>
        
        <div className="flex items-center gap-[6px]">
            {/* System Signal */}
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-white rounded-[1px]"></div>
            </div>
            
            {/* System Wi-Fi */}
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-white mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* System Battery */}
            <div className="w-[23.5px] h-[11.5px] border border-white/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-white rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-white/85 rounded-[2px]"></div>
            </div>
        </div>
    </div>
);

/**
 * Bottom OS Tab Bar
 */
const BottomNavTabs = () => (
    <div className="w-full h-[88px] bg-[#121212] flex justify-around items-start pt-[12px] border-t border-[#333]/40 z-50 relative pb-[20px]">
        {/* Home */}
        <div className="flex flex-col items-center gap-[4px] w-[60px]">
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            <span className="text-[10px] font-[500] text-white tracking-wide">Home</span>
        </div>
        {/* Search */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.65]">
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide">Search</span>
        </div>
        {/* Downloads */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.65]">
            <svg viewBox="0 0 24 24" className="w-[23px] h-[23px] fill-transparent stroke-white stroke-[2px] stroke-linecap-round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide">Downloads</span>
        </div>
        {/* More */}
        <div className="flex flex-col items-center gap-[4px] w-[60px] opacity-[0.65]">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            <span className="text-[10px] font-[500] text-[#A6A6A6] tracking-wide">More</span>
        </div>
        {/* iOS Home Indicator */}
        <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-white rounded-full mx-auto left-1/2 -translate-x-1/2"></div>
    </div>
);

/**
 * @name Netflix "Rating Interface Overlay Matrix" - Page 51
 * Accurately mimics standard application photometric z-index dimming
 */
export default function RatingModalInteraction() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none overflow-hidden font-sans bg-[#0F0F0F]">
            
            <StatusBar />

            {/* 
                =================================================
                ROOT VIEWPORT DOM (Background Target)
                We build the vibrant full-brightness layout. 
                The shadow dim overlay will squash this via Z-Index matrix.
                =================================================
            */}
            <div className="flex-1 w-full flex flex-col overflow-y-auto">
                
                {/* Details Header */}
                <div className="w-full h-[60px] mt-[40px] flex justify-between items-center px-[22px]">
                    <div className="flex-1" />
                    <span className="text-[#A1A1A1] text-[17px] font-[600] tracking-tight">Black Mirror: Bandersnatch</span>
                    <div className="flex-1 flex justify-end">
                        <div className="w-[32px] h-[32px] bg-[#1B1B1B] rounded-full flex justify-center items-center">
                            <CloseIcon />
                        </div>
                    </div>
                </div>

                {/* Primary Movie Logo Box */}
                <div className="w-full flex justify-center mt-[12px]">
                    <div className="w-[185px] h-[65px] bg-[#0A0A0A] border-[0.5px] border-white/5 flex flex-col justify-center items-center shadow-lg relative rounded-[2px] overflow-hidden">
                        <span className="text-[#656565] font-[900] text-[19px] uppercase tracking-wider relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Black Mirror</span>
                        <span className="text-[#555] font-[900] text-[13px] uppercase tracking-widest -mt-[3px] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Bandersnatch</span>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/10 to-[#000]/60 z-0"></div>
                    </div>
                </div>

                {/* Streaming Meta Array */}
                <div className="w-full flex justify-center items-center gap-[14px] mt-[20px]">
                    <span className="text-[#46D369] font-[600] text-[15px] tracking-tight">89% match</span>
                    <span className="text-[#A3A3A3] font-[400] text-[14px]">2018</span>
                    <div className="px-[5px] py-[1.5px] bg-[#222] rounded-[3px]">
                        <span className="text-[#E0E0E0] font-[600] text-[11px]">M18</span>
                    </div>
                    <span className="text-[#A3A3A3] font-[400] text-[14px]">1h 30m</span>
                </div>

                {/* Play Payload Trigger */}
                <div className="w-full px-[12px] mt-[18px]">
                    <div className="w-full h-[45px] bg-[#E50914] rounded-[4px] flex justify-center items-center gap-[8px] shadow-sm">
                        <svg className="w-[22px] h-[22px] fill-white ml-[4px]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        <span className="text-white font-[600] text-[16px] tracking-tight">Play</span>
                    </div>
                </div>

                {/* Narrative Synopsys payload */}
                <div className="w-full px-[12px] mt-[20px] flex flex-col gap-[6px]">
                    <p className="text-[#CDCDCD] text-[14px] leading-[20px] font-[400]">
                        In 1984, a young programmer begins to question reality as he adapts a dark fantasy novel into a video game. A mind-bending tale with multiple endings.
                    </p>
                    <p className="text-[#888] text-[12.5px] leading-[18px] mt-[2px]">
                        <span className="text-[#777]">Cast:</span> Fionn Whitehead, Will Poulter, Craig Parkinson
                    </p>
                </div>

                {/* Secondary Tesselation Structure */}
                <div className="w-full mt-[28px] relative border-b border-[#282828]">
                    <div className="w-full px-[12px] flex">
                        <div className="flex flex-col relative pb-[12px] pt-[2px]">
                            <span className="text-white font-[700] text-[13.5px] tracking-[0.1em] uppercase">Trailers & More</span>
                            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#E50914] rounded-t-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Auxiliary Output Stream */}
                <div className="w-full px-[12px] mt-[20px] flex flex-col gap-[10px]">
                    <div className="w-full h-[210px] bg-[#0E0E10] shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden flex justify-center items-center rounded-sm">
                        
                        {/* Procedural Aesthetic Render for the Trailer Still */}
                        <div className="absolute top-[10%] right-[20%] w-[120px] h-[50px] bg-[#E50914] opacity-[0.25] blur-[25px]"></div>
                        <div className="absolute bottom-[20%] left-[25%] w-[80px] h-[60px] bg-[#9FB5D5] opacity-[0.35] blur-[20px]"></div>
                        
                        {/* Hero Silhouette Component */}
                        <div className="absolute bottom-[-15px] left-[38%] w-[140px] h-[160px] bg-[#070707] rounded-[35px]"></div>
                        <div className="absolute bottom-[105px] left-[48%] w-[70px] h-[80px] bg-[#070707] rounded-full"></div>
                        <div className="absolute bottom-[0px] left-[15%] w-[110px] h-[40px] bg-[#111111] rotate-[-5deg]"></div>

                        {/* Trailer Sub-Play Prompt */}
                        <div className="w-[50px] h-[50px] rounded-full border-[1.5px] border-[#FFF]/80 bg-[#000]/50 flex justify-center items-center z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            <svg className="w-[26px] h-[26px] fill-white ml-[3px]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                    <span className="text-[#CDCDCD] text-[14px] font-[500] leading-tight">Black Mirror: Bandersnatch (Trailer)</span>
                </div>
                
                {/* Padding sink */}
                <div className="h-[20px] w-full shrink-0"></div>
            </div>

            <BottomNavTabs />

            {/* 
                =================================================
                OPTICAL REDUCTION DIM LAYER (z: 100)
                Automatically pushes all underlying RGB channels into black thresholds, 
                matching output from 051.png flawlessly.
                =================================================
            */}
            <div className="absolute inset-0 bg-[#000000]/85 z-[100] backdrop-blur-[0px] pointer-events-auto"></div>

            {/* 
                RATING SYSTEM OVERLAY MATRIX (z: 110)
            */}
            <div className="absolute inset-0 z-[110] flex flex-col justify-center items-center pointer-events-none mt-[-170px]">
                
                <div className="flex gap-[20px] pointer-events-auto">
                    {/* Primary Engagement Hitbox (Up) */}
                    <div className="w-[88px] h-[88px] rounded-full bg-[#3D3D3D]/60 backdrop-blur-xl border border-[#999]/30 flex justify-center items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] active:scale-95 transition-transform cursor-pointer">
                        <ThumbUpIcon />
                    </div>
                    
                    {/* Primary Engagement Hitbox (Down) */}
                    <div className="w-[88px] h-[88px] rounded-full bg-[#3D3D3D]/60 backdrop-blur-xl border border-[#999]/30 flex justify-center items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)] active:scale-95 transition-transform cursor-pointer">
                        <ThumbDownIcon />
                    </div>
                </div>
                
                {/* Cancel Disruption Matrix */}
                <div className="mt-[24px] pointer-events-auto">
                    <div className="w-[42px] h-[42px] rounded-full bg-[#3D3D3D]/60 backdrop-blur-xl border border-[#999]/30 flex justify-center items-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-transform cursor-pointer">
                        <CloseIcon />
                    </div>
                </div>
                
            </div>

        </div>
    );
}
