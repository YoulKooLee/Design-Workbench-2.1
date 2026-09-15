import React from 'react';
import './style.css';


/**
 * OS Status Bar Node
 */
const StatusBar = () => (
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
);

/**
 * Procedural Netflix Avatar Generation Node: Jiho (Red Hero Mask)
 * Eliminates the need for external asset loading via complex mathematical SVG polygons.
 */
const JihoAvatarSVG = () => (
    <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] rounded-[3px] bg-[#E50914] flex-shrink-0 shadow-sm transition-transform active:scale-95">
        
        {/* Core Skin Base */}
        <rect x="20" y="55" width="60" height="45" fill="#EFC71C" />
        <rect x="20" y="55" width="60" height="10" fill="#D3A212" />
        
        {/* The Red Hero Mask Central 'V' Drop */}
        <polygon points="40,55 60,55 50,70" fill="#B20710" transform="translate(0, 2)" />
        <polygon points="40,55 60,55 50,70" fill="#E50914" />

        {/* Squinting Angry Eyes Geometry */}
        {/* Left Eye: Bottom flat, top slanted diagonally left/up */}
        <polygon points="12,46 42,52 42,56 12,56" fill="white" />
        <path d="M 29 52 A 3.5 3.5 0 0 0 36 52 Z" fill="#111" />
        
        {/* Right Eye: Symmetrical */}
        <polygon points="88,46 58,52 58,56 88,56" fill="white" />
        <path d="M 64 52 A 3.5 3.5 0 0 0 71 52 Z" fill="#111" />

        {/* Severe Stotic Mouth */}
        <line x1="38" y1="85" x2="62" y2="85" stroke="#4A3403" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

/**
 * Procedural Netflix Avatar Generation Node: Mobbin (Green Mummy)
 * Exploits <path> curving algorithms to synthesize wrapped cloth depth shadowing.
 */
const MobbinAvatarSVG = () => (
    <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] rounded-[3px] bg-[#3B9E73] flex-shrink-0 overflow-hidden shadow-sm transition-transform active:scale-95">
        
        {/* Left Lazy Eye */}
        <polygon points="15,62 45,62 45,68 15,68" fill="white" />
        <path d="M 28 62 A 3.5 3.5 0 0 0 35 62 Z" fill="#111" />
        
        {/* Right Lazy Eye */}
        <polygon points="55,62 85,62 85,68 55,68" fill="white" />
        <path d="M 65 62 A 3.5 3.5 0 0 0 72 62 Z" fill="#111" />

        <g fill="white">
            {/* Crown Wrap */}
            <path d="M -5,-5 L 105,-5 L 105,15 Q 50,30 -5,10 Z" />
            
            {/* Forehead Wrap (Covers upper half of eyes to create laziness) */}
            <path d="M -5,15 Q 50,35 105,20 L 105,48 Q 50,62 -5,42 Z" />
            
            {/* Lower Face Cheeks/Mouth Wrap */}
            <path d="M -5,68 Q 50,85 105,68 L 105,105 L -5,105 Z" />
            
            {/* Throat/Neck Diagonal Support Wrap */}
            <polygon points="-5,80 105,70 105,105 -5,105" />
        </g>
        
        {/* Depth Perception Shadow Drop lines */}
        <g fill="none" stroke="#2B7957" strokeWidth="2.5" opacity="0.6">
            <path d="M -5,44 Q 50,65 105,50" />
            <path d="M -5,68 Q 50,85 105,68" />
        </g>

        {/* Ambient Wrap Texture Folds */}
        <g fill="none" stroke="#D1D1D1" strokeWidth="1.2" opacity="0.7">
             <path d="M 20,10 Q 50,15 80,5" />
             <path d="M 10,25 Q 50,35 90,25" />
             <path d="M 0,80 L 100,70" />
        </g>
    </svg>
);

/**
 * @name Netflix "Who's Watching" Profile Gateway - Page 57
 * Resolves the primary user identification block logic. High fidelity flex-grid fallback structures.
 */
export default function NetflixProfileGateway() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none overflow-hidden font-sans bg-[#000000]">
            
            <StatusBar />

            {/* Application Universal Action Header */}
            <div className="absolute top-[44px] w-full flex justify-between items-center px-[20px] z-50 h-[44px]">
                
                <div className="w-[50px]"></div> {/* Flex Balancer Node */}
                
                {/* Official Vector Wordmark */}
                <div className="flex justify-center items-center h-full pt-[2px]">
                    <svg viewBox="0 0 111 30" className="w-[88px] h-[26px] fill-[#E50914] drop-shadow-sm">
                        <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.469 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.875 0h-4.594v27.281c1.5.188 3.063.281 4.594.406V0zm-15.156 26.25c1.531.063 3.031.125 4.563.219l1.468-6.188H87.12v-4.125h-4.843L84 9.187H87.5V5.125h-8.063L75.719 26.25zm-15.031.906c1.531.125 3.031.22 4.562.313V15.063h6v-3.938h-6V4h7.094V0h-11.656v27.156zM46.75 24.28c1.531.157 3.063.313 4.594.47V0h-4.594v24.281zM36.125 4h-5.281v19.469c1.531.188 3.063.344 4.594.501V4h5.313V0H30.844v4h5.281zm-9.062 18.844c-1.469.188-2.906.313-4.375.469l-6.281-16.125V24.5c-1.469.188-2.938.344-4.406.501V0h5.344l5.656 14.375V0h4.062v22.844z"/>
                    </svg>
                </div>
                
                <div className="w-[50px] flex justify-end cursor-pointer active:opacity-50">
                    <span className="text-[#F5F5F5] text-[16px] font-[600] tracking-tight hover:text-white transition-colors">Edit</span>
                </div>

            </div>

            {/* Vertically Biased Content Hub */}
            <div className="flex-1 w-full flex flex-col items-center pt-[155px] z-10 overflow-y-auto">
                
                <h1 className="text-white text-[23.5px] font-[400] mb-[45px] tracking-[0.01em] antialiased">
                    Who's Watching?
                </h1>

                {/* Profile Grid (Wraps symmetrically across bounded max-width) */}
                <div className="w-full max-w-[320px] flex justify-center gap-x-[26px] gap-y-[45px] flex-wrap">
                    
                    {/* User Node 1 */}
                    <div className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity group">
                        <JihoAvatarSVG />
                        <span className="text-white text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">Jiho</span>
                    </div>
                    
                    {/* User Node 2 */}
                    <div className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity group">
                        <MobbinAvatarSVG />
                        <span className="text-white text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">Mobbin</span>
                    </div>

                    {/* Operational Node: Create New */}
                    <div className="flex flex-col items-center cursor-pointer hover:opacity-85 transition-opacity group">
                        {/* Parent flex dimension lock prevents the span text from shifting upwards relative to the square avatars */}
                        <div className="w-[110px] h-[110px] flex justify-center items-center">
                            <div className="w-[96px] h-[96px] bg-[#2F2F2F] rounded-full flex justify-center items-center shadow-md group-active:scale-95 transition-transform border border-transparent hover:border-[#666]">
                                <svg viewBox="0 0 24 24" className="w-[45px] h-[45px] stroke-[#F5F5F5] stroke-[1px] fill-transparent">
                                    <line x1="12" y1="3" x2="12" y2="21" strokeLinecap="butt" />
                                    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="butt" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-[#F5F5F5] text-[15.5px] font-[400] mt-[12px] tracking-[0.02em]">Add Profile</span>
                    </div>

                </div>

            </div>

            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full opacity-80 pointer-events-none mx-auto left-1/2 -translate-x-1/2"></div>
        </div>
    );
}
