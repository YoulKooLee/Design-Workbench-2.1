import React from 'react';
import './style.css';

/**
 * Procedural Netflix Avatar Graphic: Kids Profile
 * Generates the highly geometric faceted layout utilizing pure CSS gradients and clip-path polygon routing.
 */
const KidsAvatarGraphic = ({ className = "w-[110px] h-[110px]" }) => (
    <div className={`relative overflow-hidden rounded-[3.5px] bg-gradient-to-br from-[#0BD7F2] to-[#0148D4] shadow-sm flex-shrink-0 ${className}`}>
        
        {/* Pink/Purple Facet Base Vector (Bottom Left) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B00C3] to-[#E80E6B]" style={{ clipPath: 'polygon(0 35%, 60% 100%, 0 100%)' }}></div>
        
        {/* Yellow-Green Facet Vector (Top Right) */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#C3E700] to-[#00A93F]" style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 68%)' }}></div>

        {/* Brand Text Projection */}
        <div className="absolute inset-0 flex justify-center items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pb-[5px]">
            {/* Arial Rounded behaves nicely across iOS mappings */}
            <span className="text-[#FEDA00] font-[900] text-[43px] tracking-tighter" style={{ fontFamily: '"Arial Rounded MT Bold", "Varela Round", sans-serif' }}>
                kids
            </span>
        </div>
    </div>
);


/**
 * Background Grid Ghost Components (Reconstructed locally to prevent cross-file dependencies)
 */
const JihoGhostSVG = () => (
    <svg viewBox="0 0 100 100" className="w-[105px] h-[105px] rounded-[3px] bg-[#E50914] flex-shrink-0">
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

const MobbinGhostSVG = () => (
    <svg viewBox="0 0 100 100" className="w-[105px] h-[105px] rounded-[3px] bg-[#3B9E73] flex-shrink-0 overflow-hidden">
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
    </svg>
);


/**
 * OS Keyboard Simulator
 * Flexbox matrix mimicking native iOS 16+ alphabetic input mode.
 */
const IOSNativeKeyboardOverlay = () => (
    <div className="w-full bg-[#D1D4D9] flex flex-col pt-[8px] select-none shadow-[0_-5px_20px_rgba(0,0,0,0.15)] relative h-[290px] z-[120]">
        
        {/* Top Row */}
        <div className="flex justify-center gap-[6px] px-[3px] mb-[12px] w-full">
            {['q','w','e','r','t','y','u','i','o','p'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                    <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Middle Row */}
        <div className="flex justify-center gap-[6px] px-[18px] mb-[12px] w-full">
            {['a','s','d','f','g','h','j','k','l'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                    <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Bottom Alphabetic Row with Utilities */}
        <div className="flex justify-between items-center px-[3px] mb-[12px] w-full gap-[6px]">
            <div className="w-[43px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                {/* Shift Solid Icon */}
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-transparent stroke-black stroke-[1.8px]"><path d="M12 4 L12 20 M12 4 L5 11 M12 4 L19 11"/></svg>
            </div>
            
            <div className="flex-1 flex justify-center gap-[6px]">
                {['z','x','c','v','b','n','m'].map(k => (
                    <div key={k} className="w-[32px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-[#D1D4D9] transition-colors">
                        <span className="text-black text-[22px] font-[400] pb-[2px]">{k}</span>
                    </div>
                ))}
            </div>

            <div className="w-[43px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                 {/* Backspace Icon */}
                 <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-transparent stroke-black stroke-[1.8px]">
                     <path d="M21 5H9.5L2 12l7.5 7H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" strokeLinejoin="miter" strokeLinecap="square" />
                     <line x1="10" y1="9" x2="16" y2="15" strokeLinecap="round" />
                     <line x1="16" y1="9" x2="10" y2="15" strokeLinecap="round" />
                 </svg>
            </div>
        </div>

        {/* Spacebar Footer Row */}
        <div className="flex justify-between gap-[6px] px-[3px] w-full">
            <div className="w-[88px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0">
                <span className="text-black text-[16.5px] font-[400] tracking-wide">123</span>
            </div>
            
            <div className="flex-1 h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors">
                <span className="text-black text-[16px] font-[400] tracking-wide antialiased">space</span>
            </div>

            <div className="w-[88px] h-[42px] bg-[#AEC2D6] rounded-[5px] shadow-[0_1px_0_rgba(96,110,126,1)] flex justify-center items-center shrink-0">
                <span className="text-black text-[16.5px] font-[400] tracking-wide">return</span>
            </div>
        </div>

        {/* Action Tray Bottom */}
        <div className="flex justify-between items-start px-[26px] mt-[26px] w-full relative h-[60px]">
            {/* Globe SVG */}
            <svg viewBox="0 0 24 24" className="w-[25px] h-[25px] stroke-[#555] fill-transparent stroke-[1.2px]">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4.5" ry="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            {/* Mic SVG */}
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#555] fill-transparent stroke-[1.5px]">
                <path d="M12 2A3 3 0 0 0 9 5V11A3 3 0 0 0 15 11V5A3 3 0 0 0 12 2Z"/>
                <path d="M19 11v1A7 7 0 0 1 5 12v-1M12 19V22M8 22H16" strokeLinecap="square"/>
            </svg>

            {/* Apple Home Pill Overlay */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#000000] rounded-full left-1/2 -translate-x-1/2"></div>
        </div>
    </div>
);


/**
 * Netflix Profile Editing State (Page 58)
 */
export default function EditProfileModal() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#000000] overflow-hidden">
            
            {/* 
              =============================================================================
              Z-0: PARALLAX BACKGROUND GRID
              Mimics the 'Who's Watching' previous route covered in heavy dark gradients
              =============================================================================
            */}
            <div className="absolute inset-0 z-[0] flex flex-col items-center">
                
                {/* Mocked Route Layer */}
                <div className="absolute top-[160px] w-full max-w-[320px] flex justify-center gap-x-[26px] gap-y-[45px] flex-wrap z-0">
                    
                    {/* Ghost Node: Jiho */}
                    <div className="flex flex-col items-center relative">
                        <JihoGhostSVG />
                        <div className="absolute top-0 w-[105px] h-[105px] bg-black/60 flex justify-center items-center rounded-[3px]">
                             <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#A1A1A1] fill-transparent stroke-[1px]">
                                 <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                             </svg>
                        </div>
                        <span className="text-[#666] text-[15.5px] font-[500] mt-[12px]">Jiho</span>
                    </div>
                    
                    {/* Ghost Node: Mobbin */}
                    <div className="flex flex-col items-center relative">
                        <MobbinGhostSVG />
                        <div className="absolute top-0 w-[105px] h-[105px] bg-black/60 flex justify-center items-center rounded-[3px]">
                             <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#A1A1A1] fill-transparent stroke-[1px]">
                                 <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                             </svg>
                        </div>
                        <span className="text-[#666] text-[15.5px] font-[500] mt-[12px]">Mobbin</span>
                    </div>

                    {/* Ghost Node: Children (Substituted for standard avatar to match route flow) */}
                    <div className="flex flex-col items-center relative">
                        <KidsAvatarGraphic className="w-[105px] h-[105px]" />
                        <div className="absolute top-0 w-[105px] h-[105px] bg-black/60 flex justify-center items-center rounded-[3.5px]">
                             <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#A1A1A1] fill-transparent stroke-[1px]">
                                 <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                             </svg>
                        </div>
                        <span className="text-[#666] text-[15.5px] font-[500] mt-[12px]">Children</span>
                    </div>

                    {/* Ghost Node: Add Grid */}
                    <div className="flex flex-col items-center">
                        <div className="w-[105px] h-[105px] flex justify-center items-center">
                            <div className="w-[96px] h-[96px] bg-[#111111] rounded-full flex justify-center items-center opacity-80">
                                <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#555] stroke-[1px] fill-transparent">
                                    <line x1="12" y1="3" x2="12" y2="21" /> <line x1="3" y1="12" x2="21" y2="12" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-[#666] text-[15.5px] font-[400] mt-[12px]">Add Profile</span>
                    </div>
                </div>

                {/* Hard Disruption Blur Dimmer */}
                <div className="absolute inset-0 bg-[#000000] opacity-[0.88] z-[5]"></div>
            </div>

            
            {/* 
              =============================================================================
              Z-50: GLOBAL APPLICATION HEADER
              =============================================================================
            */}
            <div className="absolute top-[44px] w-full flex justify-between items-center px-[22px] h-[44px] z-[50]">
                <span className="text-white text-[16px] font-[600] tracking-tight hover:opacity-80 cursor-pointer transition-opacity antialiased">Cancel</span>
                <span className="text-white text-[17.5px] font-[400] tracking-wide antialiased">Edit Profile</span>
                <span className="text-white text-[16px] font-[600] tracking-tight hover:opacity-80 cursor-pointer transition-opacity antialiased">Save</span>
            </div>
            
            {/* Standard Global Status Tracker */}
            <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[50] pointer-events-none">
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

            {/* 
              =============================================================================
              Z-20: PRIMARY FOCUS METRIC (EDIT CONTEXT)
              =============================================================================
            */}
            <div className="flex-1 w-full flex flex-col items-center pt-[155px] z-[20]">
                
                {/* Elevated Focus Identity Profile */}
                <KidsAvatarGraphic className="w-[110px] h-[110px] shadow-[0_5px_25px_rgba(0,0,0,0.5)]" />
                
                <span className="text-white text-[13px] font-[600] tracking-[0.05em] mt-[12px] cursor-pointer hover:underline antialiased">
                    CHANGE
                </span>

                {/* Simulated Text Node Structure */}
                <div className="w-[85%] max-w-[340px] mt-[38px] border border-white/90 bg-transparent flex items-center py-[14px] px-[18px]">
                    <span className="text-white text-[18px] font-[400] tracking-wide w-full antialiased h-auto leading-none border-r border-[#3384FF] pr-[2px]">
                        Children
                    </span>
                </div>

                {/* Subtext Constraint Rule */}
                <div className="w-[80%] max-w-[320px] mt-[26px]">
                    <p className="text-[#A4A4A4] text-[13.5px] leading-[18px] text-center font-[400] antialiased">
                        This profile only allows access to age-appropriate content for kids 12 and under.
                    </p>
                </div>

                {/* Terminal Actions */}
                <div className="flex justify-center items-center gap-[6px] mt-[48px] cursor-pointer group">
                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-[#FDFDFD] group-hover:fill-red-500 transition-colors">
                        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm-2-1h-2v1h2V3zm4 16H7V6h10v13z"/>
                        <path d="M9 8h2v9H9zm4 0h2v9h-2z"/>
                    </svg>
                    <span className="text-white font-[500] text-[13.5px] tracking-[0.02em] whitespace-nowrap antialiased group-hover:text-red-500 transition-colors">
                        DELETE
                    </span>
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
