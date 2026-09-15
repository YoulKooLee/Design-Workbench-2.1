import React from 'react';
import './style.css';

/**
 * Procedural SVG engine for the massive centralized Download graphic.
 * Ensures infinite scaling resolution decoupled from standard raster assets.
 */
const DownloadGraphicNode = () => (
    <div className="w-[215px] h-[215px] bg-[#EBEBEB] rounded-full flex justify-center items-center">
        <svg viewBox="0 0 100 100" className="w-[88px] h-[88px] stroke-black fill-transparent stroke-[6.5px]">
            {/* Ground Base Line */}
            <line x1="16" y1="88" x2="84" y2="88" strokeLinecap="square" />
            
            {/* Central Drop Shaft */}
            <line x1="50" y1="12" x2="50" y2="72" strokeLinecap="square" />
            
            {/* Chevron Wing Deflectors */}
            <polyline 
                points="22,46 50,74 78,46" 
                strokeLinejoin="miter" 
                strokeLinecap="square" 
            />
        </svg>
    </div>
);

/**
 * Reconstructed 1:1 Ribbon Anchor
 * Utilizes CSS polygons bounding over SVG paths for structural arching (concave bottom bounding).
 */
const BannerRibbon = () => (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[86px] h-[38px] flex justify-center pt-[6px]">
        {/* Core mathematical mask - Q50,28 pulls the bottom edge upwards in an arch */}
        <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full z-[-1] drop-shadow-sm">
            <path d="M0,0 L100,0 L100,40 Q50,28 0,40 Z" fill="#D92010" />
        </svg>
        
        {/* Content Typography */}
        <span className="text-white text-[15px] font-[500] tracking-[0.04em] antialiased">NEW</span>
    </div>
);

/**
 * @name Netflix "Download Onboarding" Feature Modal - Page 56
 * Represents an un-cancelable OS-blocking modal dialog that intercepts the application root.
 */
export default function DownloadFeatureModal() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none overflow-hidden font-sans bg-[#000000] justify-center items-center">
            
            {/* 
              ====================================================
              CORE MODAL DECK 
              ====================================================
            */}
            <div className="w-[88%] bg-white rounded-[3px] flex flex-col items-center relative shadow-[0_0_40px_rgba(0,0,0,0.6)] pb-[2px]">
                
                {/* Ribbon Anchor */}
                <BannerRibbon />

                {/* Primary Header Typographic System */}
                <h1 className="mt-[75px] text-black font-[400] text-[34px] tracking-tight antialiased">
                    Download & Go
                </h1>

                {/* Central Graphic Block */}
                <div className="mt-[50px]">
                    <DownloadGraphicNode />
                </div>

                {/* Description Body Matrix */}
                <div className="w-full px-[36px] text-center mt-[55px] mb-[50px]">
                    <p className="text-[#050505] text-[15.5px] font-[400] leading-[22px] tracking-tight antialiased">
                        Look for this symbol to download movies and TV episodes to watch on the go without using data.
                    </p>
                </div>

                {/* Sequential Interaction Array */}
                <div className="w-full px-[28px]">
                    
                    {/* Divider Top */}
                    <div className="w-full h-[1px] bg-[#D6D6D6]"></div>
                    
                    {/* Primary Action (Deep Link Router) */}
                    <div className="w-full py-[18px] flex justify-center items-center gap-[8px] cursor-pointer active:opacity-50 transition-opacity">
                        <span className="text-black font-[800] text-[12.5px] tracking-[0.03em] uppercase antialiased">Find Something to Download</span>
                        {/* Directional Chevron Marker */}
                        <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-[#E50914] stroke-[3.5px] fill-transparent mt-[0.5px]">
                            <polyline points="8,4 16,12 8,20" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Divider Middle */}
                    <div className="w-full h-[1px] bg-[#D6D6D6]"></div>
                    
                    {/* Resolution Action (Close Dialog) */}
                    <div className="w-full py-[20px] flex justify-center items-center cursor-pointer active:opacity-50 transition-opacity">
                        <span className="text-black font-[800] text-[13px] tracking-[0.04em] uppercase antialiased">OK</span>
                    </div>

                </div>

            </div>

            {/* Application Native Home Control (Pill Anchor) */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] rounded-full opacity-[0.85] pointer-events-none"></div>

        </div>
    );
}
