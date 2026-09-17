import React from 'react';
import './style.css';

/**
 * OS Status Bar Node
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px] antialiased">2:54</span>
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
 * Procedural Avatar Vectors (Zero-Asset)
 */
const JihoAvatarSVG = ({ className = "w-[110px] h-[110px]" }) => (
    <svg viewBox="0 0 100 100" className={`rounded-[3.5px] bg-[#E50914] flex-shrink-0 ${className}`}>
        <rect x="20" y="55" width="60" height="45" fill="#EFC71C" />
        <rect x="20" y="55" width="60" height="10" fill="#D3A212" />
        <polygon points="40,55 60,55 50,70" fill="#B20710" transform="translate(0, 2)" />
        <polygon points="40,55 60,55 50,70" fill="#E50914" />
        <polygon points="12,46 42,52 42,56 12,56" fill="white" />
        <path d="M 29 52 A 3.5 3.5 0 0 0 36 52 Z" fill="#111" />
        <polygon points="88,46 58,52 58,56 88,56" fill="white" />
        <path d="M 64 52 A 3.5 3.5 0 0 0 71 52 Z" fill="#111" />
        <line x1="38" y1="85" x2="62" y2="85" stroke="#4A3403" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const MobbinAvatarSVG = ({ className = "w-[110px] h-[110px]" }) => (
    <svg viewBox="0 0 100 100" className={`rounded-[3.5px] bg-[#3B9E73] flex-shrink-0 overflow-hidden ${className}`}>
        <polygon points="15,62 45,62 45,68 15,68" fill="white" />
        <path d="M 28 62 A 3.5 3.5 0 0 0 35 62 Z" fill="#111" />
        <polygon points="55,62 85,62 85,68 55,68" fill="white" />
        <path d="M 65 62 A 3.5 3.5 0 0 0 72 62 Z" fill="#111" />
        <g fill="white">
            <path d="M -5,-5 L 105,-5 L 105,15 Q 50,30 -5,10 Z" />
            <path d="M -5,15 Q 50,35 105,20 L 105,48 Q 50,62 -5,42 Z" />
            <path d="M -5,68 Q 50,85 105,68 L 105,105 L -5,105 Z" />
            <polygon points="-5,80 105,70 105,105 -5,105" />
        </g>
        <g fill="none" stroke="#2B7957" strokeWidth="2.5" opacity="0.6">
            <path d="M -5,44 Q 50,65 105,50" />
            <path d="M -5,68 Q 50,85 105,68" />
        </g>
        <g fill="none" stroke="#D1D1D1" strokeWidth="1.2" opacity="0.7">
             <path d="M 20,10 Q 50,15 80,5" />
             <path d="M 10,25 Q 50,35 90,25" />
             <path d="M 0,80 L 100,70" />
        </g>
    </svg>
);

const KidsAvatarGraphic = ({ className = "w-[110px] h-[110px]" }) => (
    <div className={`relative overflow-hidden rounded-[3.5px] bg-gradient-to-br from-[#0BD7F2] to-[#0148D4] shadow-sm flex-shrink-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B00C3] to-[#E80E6B]" style={{ clipPath: 'polygon(0 35%, 60% 100%, 0 100%)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-[#C3E700] to-[#00A93F]" style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 68%)' }}></div>
        <div className="absolute inset-0 flex justify-center items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pb-[5px]">
            <span className="text-[#FEDA00] font-[900] text-[43px] tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Varela Round", sans-serif' }}>
                kids
            </span>
        </div>
    </div>
);


/**
 * Active Modality iOS Native Keyboard
 * Functional Flex matrix matching iOS OS bounds (h-290).
 */
const IOSNativeKeyboardOverlay = () => (
    <div className="w-full bg-[#D1D4D9] flex flex-col pt-[8px] select-none shadow-[0_-5px_20px_rgba(0,0,0,0.15)] relative h-[290px] z-[120]">
        
        {/* Row 1 */}
        <div className="flex justify-center gap-[6px] px-[3px] mb-[12px] w-full">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                    <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Row 2 */}
        <div className="flex justify-center gap-[6px] px-[18px] mb-[12px] w-full">
            {['a','s','d','f','g','h','j','k','l'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                    <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Row 3 - Functionals included */}
        <div className="flex justify-between items-center px-[3px] mb-[12px] w-full gap-[6px]">
            {/* Outline Shift SVG Arrow */}
            <div className="w-[43px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-transparent stroke-black stroke-[1.8px] stroke-linejoin-miter pt-[1px]">
                     <path d="M12 3 l-8 8 h5 v9 h6 v-9 h5 Z" />
                </svg>
            </div>
            
            <div className="flex-1 flex justify-center gap-[6px]">
                {['z','x','c','v','b','n','m'].map(k => (
                    <div key={k} className="w-[32px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-[#D1D4D9] transition-colors">
                        <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                    </div>
                ))}
            </div>

            {/* Polygon OS Backspace Icon */}
            <div className="w-[43px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                 <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-transparent stroke-black stroke-[1.8px]">
                     <path d="M21 5H9.5L2 12l7.5 7H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" strokeLinejoin="miter" strokeLinecap="square" />
                     <line x1="10" y1="9" x2="16" y2="15" strokeLinecap="round" />
                     <line x1="16" y1="9" x2="10" y2="15" strokeLinecap="round" />
                 </svg>
            </div>
        </div>

        {/* Row 4 - Spacebar Action Block */}
        <div className="flex justify-between gap-[6px] px-[3px] w-full">
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                <span className="text-black text-[16.5px] font-[400] tracking-wide">123</span>
            </div>
            
            <div className="flex-1 h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                <span className="text-black text-[16px] font-[400] tracking-wide antialiased">space</span>
            </div>

            <div className="w-[88px] h-[42px] bg-[#AEC2D6] rounded-[5px] shadow-[0_1px_0_rgba(96,110,126,1)] flex justify-center items-center shrink-0 cursor-pointer">
                <span className="text-black text-[16.5px] font-[400] tracking-wide">return</span>
            </div>
        </div>

        {/* Home Indicator Space Injection Padding Array */}
        <div className="flex justify-between items-start px-[26px] mt-[26px] w-full relative h-[60px]">
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] stroke-[#555] fill-transparent stroke-[1.2px]">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4.5" ry="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#555] fill-transparent stroke-[1.5px]">
                <path d="M12 2A3 3 0 0 0 9 5V11A3 3 0 0 0 15 11V5A3 3 0 0 0 12 2Z"/>
                <path d="M19 11v1A7 7 0 0 1 5 12v-1M12 19V22M8 22H16" strokeLinecap="square"/>
            </svg>
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#000000] rounded-full left-1/2 -translate-x-1/2"></div>
        </div>
    </div>
);


/**
 * Netflix Profile Creation State (Page 61)
 * A fully modular modal layer overlapping the standard gateway route.
 */
export default function CreateProfileModal() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#000000] overflow-hidden">
            
            {/* 
              =============================================================================
              Z-0: PARALLAX BACKGROUND GHOST GRID
              Renders the exact architectural footprint of the underlying 'Who's Watching' route
              but with `bg-[#000000]/85` suppression film.
              =============================================================================
            */}
            <div className="absolute inset-0 z-[0] flex flex-col items-center">
                <div className="flex-1 w-full flex flex-col items-center pt-[155px] overflow-hidden">
                    
                    <h1 className="text-[#FDFDFD] text-[23.5px] font-[400] mb-[45px] tracking-[0.01em]">
                        Who's Watching?
                    </h1>

                    <div className="w-full max-w-[320px] flex justify-center gap-x-[26px] gap-y-[45px] flex-wrap">
                        {/* Ghost Active Nodes */}
                        <div className="flex flex-col items-center">
                            <JihoAvatarSVG className="w-[110px] h-[110px]" />
                            <span className="text-[#FDFDFD] text-[15.5px] font-[400] mt-[12px]">Jiho</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <KidsAvatarGraphic className="w-[110px] h-[110px]" />
                            <span className="text-[#FDFDFD] text-[15.5px] font-[400] mt-[12px]">Children</span>
                        </div>
                        {/* Ghost Action Anchor */}
                        <div className="flex flex-col items-center opacity-85">
                            <div className="w-[110px] h-[110px] flex justify-center items-center">
                                <div className="w-[96px] h-[96px] bg-[#222222] rounded-full flex justify-center items-center shadow-md">
                                    <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#F5F5F5] stroke-[1px] fill-transparent">
                                        <line x1="12" y1="3" x2="12" y2="21" strokeLinecap="butt" />
                                        <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="butt" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-[#FDFDFD] text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">Add Profile</span>
                        </div>
                    </div>
                </div>

                {/* Hard Disruption Suppressor Film */}
                <div className="absolute inset-0 bg-[#000000] opacity-[0.88] z-[5]"></div>
            </div>

            
            {/* 
              =============================================================================
              Z-50: GLOBAL MODAL HEADER
              Forces pure absolute centering and action hooks.
              =============================================================================
            */}
            <div className="absolute top-[44px] w-full flex justify-between items-center px-[22px] h-[44px] z-[50]">
                <span className="text-[#FFFFFF] text-[16px] font-[600] tracking-tight hover:opacity-80 cursor-pointer active:opacity-50 transition-opacity antialiased">
                    Cancel
                </span>
                <span className="text-[#FFFFFF] text-[17.5px] font-[400] tracking-wide antialiased">
                    Create Profile
                </span>
                <span className="text-[#FFFFFF] text-[16px] font-[600] tracking-tight hover:opacity-80 cursor-pointer active:opacity-50 transition-opacity antialiased">
                    Save
                </span>
            </div>
            
            <StatusBar />

            {/* 
              =============================================================================
              Z-20: PRIMARY FOCUS METRICS (CREATE PROFILE CREATION DOMAIN)
              =============================================================================
            */}
            <div className="flex-1 w-full flex flex-col items-center pt-[155px] z-[20]">
                
                {/* Generated Target Focus Graphic */}
                <MobbinAvatarSVG className="w-[110px] h-[110px] shadow-[0_5px_25px_rgba(0,0,0,0.5)]" />
                
                <span className="text-[#FFFFFF] text-[13px] font-[600] tracking-[0.05em] mt-[12px] cursor-pointer hover:underline antialiased">
                    CHANGE
                </span>

                {/* Synthetic Text Modality Block - Mimics structural native inputs identically */}
                <div className="w-[85%] max-w-[340px] mt-[38px] border border-[#FFFFFF]/90 bg-transparent py-[14px] px-[15px] flex items-center">
                    <span className="text-[#FFFFFF] text-[18px] font-[400] tracking-wide antialiased flex items-center leading-none h-auto">
                        Mobbin
                        {/* Animated Structural Flex Cursor */}
                        <div className="w-[1.5px] h-[22px] bg-[#3384FF] ml-[1px] animate-pulse"></div>
                    </span>
                </div>

                {/* Switch Constraint Element */}
                <div className="flex items-center gap-[15px] mt-[30px] active:scale-95 transition-transform cursor-pointer">
                    <span className="text-[#FFFFFF] text-[14px] font-[500] tracking-[0.05em] antialiased pt-[2px]">
                        FOR KIDS
                    </span>
                    
                    {/* Native Recreated Oversized iOS Switch Base Configured to "False/Off" */}
                    <div className="w-[52px] h-[31px] rounded-full border-[1.5px] border-[#FFFFFF]/90 flex items-center px-[2px] transition-colors relative overflow-hidden bg-transparent">
                        <div className="w-[24.5px] h-[24.5px] bg-[#FFFFFF] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.5)] transform translate-x-0 transition-transform"></div>
                    </div>
                </div>

            </div>

            {/* 
              =============================================================================
              Z-100: OPERATING SYSTEM INJECTION
              CSS synthesized reproduction of the massive iOS typing interface.
              =============================================================================
            */}
            <div className="absolute bottom-0 w-full z-[100] h-[290px]">
                <IOSNativeKeyboardOverlay />
            </div>

        </div>
    );
}
