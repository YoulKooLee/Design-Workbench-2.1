import React from 'react';
import './style.css';

/**
 * Native OS Top Anchor
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px]">2:53</span>
        
        <div className="flex items-center gap-[6px]">
            {/* iOS Cell Array */}
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-white rounded-[1px]"></div>
            </div>
            
            {/* iOS Wi-Fi Indicator */}
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-white mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* iOS Battery Standard */}
            <div className="w-[23.5px] h-[11.5px] border border-white/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-white rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-white/85 rounded-[2px]"></div>
            </div>
        </div>
    </div>
);

/**
 * Procedural implementation of the Netflix "Folded Ribbon" N Logo.
 * Explicitly reconstructed purely via scalable geometric SVG polygons without asset dependencies.
 */
const NetflixLogoVector = () => (
    <svg viewBox="0 0 100 130" className="w-[48px] h-[68px] overflow-visible">
        
        <defs>
            {/* Shadow Mask: Ensures the ambient ribbon shadow only bleeds into the right pillar 
                and explicitly prevents it from casting backward onto the left pillar. */}
            <clipPath id="rightPillarBound">
                <rect x="72" y="0" width="28" height="130" />
            </clipPath>
            <filter id="shadowBlur">
                <feGaussianBlur stdDeviation="3.5" />
            </filter>
        </defs>

        {/* 1. Left Anchoring Pillar (Secondary Backing Hue) */}
        <polygon points="0,0 28,0 28,130 0,130" fill="#B20710" />
        
        {/* 2. Right Anchoring Pillar (Secondary Backing Hue) */}
        <polygon points="72,0 100,0 100,130 72,130" fill="#B20710" />

        {/* 3. Shadow Projection Map 
            Duplicates the diagonal ribbon path, shifting it along the X-axis (dx) 
            and blurring it before aggressively clipping its rendered bounds into the Right Pillar only. */}
        <polygon 
            points="6,0 34,0 106,130 78,130" 
            fill="#000000" 
            opacity="0.75" 
            filter="url(#shadowBlur)" 
            clipPath="url(#rightPillarBound)" 
        />

        {/* 4. Primary Center Ribbon (Core Brand Vivid Red) */}
        <polygon points="0,0 28,0 100,130 72,130" fill="#E50914" />
        
    </svg>
);


/**
 * @name Netflix "App Splash Screen" - Page 53
 * Emulates the zero-state loading sequence of the native iOS wrapper.
 */
export default function AuthenticationSplash() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden font-sans justify-center items-center">
            
            {/* Upper Frame Guard */}
            <StatusBar />

            {/* Core Cinematic Branding Node */}
            <div className="flex justify-center items-center scale-[1.05]">
                <NetflixLogoVector />
            </div>

            {/* System Indicator Rest State */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full mx-auto left-1/2 -translate-x-1/2 pointer-events-none opacity-90"></div>

        </div>
    );
}
