import React from 'react';
import './style.css';

/**
 * Procedural Netflix Avatar Graphic: Jiho (Red Mask)
 * Pure SVG mapping bypassing asset constraints
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

/**
 * Procedural Netflix Avatar Graphic: Mobbin (Green Mummy)
 */
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

/**
 * Procedural Netflix Avatar Graphic: Kids Profile
 */
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
 * Edit Mode Node Injector
 * Wraps any target avatar in a darkened mask and mounts the geometric pencil SVG
 */
const EditActionNode = ({ children, name }) => (
    <div className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity group relative">
        <div className="w-[110px] h-[110px] relative rounded-[3.5px] overflow-hidden">
            
            {/* The underlying native avatar vector */}
            {children}
            
            {/* Active Edit Dimmer Field */}
            <div className="absolute inset-0 bg-[#000000]/55 flex justify-center items-center z-10 transition-colors group-hover:bg-[#000000]/65">
                
                {/* Minimalist Geometry Pencil Icon */}
                <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] stroke-white fill-transparent stroke-[1.8px] stroke-linecap-square stroke-linejoin-miter drop-shadow-md">
                    {/* Pencil Shaft & Tip */}
                    <path d="M18.5 3.5l2 2-12 12-4.5 1 1-4.5 12-12z" />
                    {/* Eraser Division */}
                    <line x1="15" y1="7" x2="17" y2="9" />
                </svg>
                
            </div>
            
            {/* Outline highlight frame acting as focus-ring equivalent for TV/Console remotes */}
            <div className="absolute inset-0 border-[1.5px] border-transparent group-hover:border-white rounded-[3.5px] transition-colors z-20 pointer-events-none"></div>

        </div>
        <span className="text-white text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">{name}</span>
    </div>
);


/**
 * @name Netflix "Manage Profiles" Router State - Page 59
 * Replaces the 'Who's Watching' screen immediately upon pressing the Edit header button.
 */
export default function ManageProfilesScreen() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#000000] overflow-hidden">
            
            {/* OS Level Status Bar mapping */}
            <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
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

            {/* Application Editing Navigation Protocol */}
            <div className="absolute top-[44px] w-full flex justify-between items-center px-[22px] h-[44px] z-[50]">
                {/* Left Escape Action */}
                <span className="text-white text-[16px] font-[600] tracking-tight cursor-pointer hover:opacity-80 active:opacity-50 transition-opacity z-10 antialiased">
                    Done
                </span>
                
                {/* Formidable Zero-Gravity Center Anchor */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <span className="text-white text-[18px] font-[400] tracking-wide antialiased">
                        Manage Profiles
                    </span>
                </div>
            </div>

            {/* Editing Active Workspace Grid */}
            <div className="flex-1 w-full flex flex-col items-center pt-[130px] z-10 overflow-y-auto pb-[100px]">
                
                {/* The identical Flex Layout framework from Page-57 retaining visual harmony */}
                <div className="w-full max-w-[320px] flex justify-center gap-x-[26px] gap-y-[45px] flex-wrap">
                    
                    {/* Wrapped Editable Nodes */}
                    <EditActionNode name="Jiho">
                        <JihoAvatarSVG className="w-full h-full" />
                    </EditActionNode>
                    
                    <EditActionNode name="Mobbin">
                        <MobbinAvatarSVG className="w-full h-full" />
                    </EditActionNode>

                    <EditActionNode name="Children">
                        <KidsAvatarGraphic className="w-full h-full" />
                    </EditActionNode>

                    {/* Operational Node: Create New (Bypasses edit darkening explicitly) */}
                    <div className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity group">
                        
                        {/* Dimensional stabilizer ensuring horizontal row parity */}
                        <div className="w-[110px] h-[110px] flex justify-center items-center">
                            <div className="w-[96px] h-[96px] bg-[#222222] rounded-full flex justify-center items-center shadow-md group-active:scale-95 transition-transform border border-transparent group-hover:border-[#666]">
                                <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#F5F5F5] stroke-[1px] fill-transparent">
                                    <line x1="12" y1="3" x2="12" y2="21" strokeLinecap="butt" />
                                    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="butt" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-white text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">Add Profile</span>
                    </div>

                </div>

            </div>

            {/* Apple Safe Area Terminator Pill */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full opacity-80 pointer-events-none mx-auto left-1/2 -translate-x-1/2"></div>
        </div>
    );
}
