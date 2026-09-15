import React from 'react';
import './style.css';

/**
 * Validated iOS Status Bar (Mixed/Light Constraint)
 * Pitch black metrics over colored canvas (mimicking Light mode override)
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-[#0E0E0E] text-[15px] font-[600] tracking-tight ml-[2px] antialiased">1:31</span>
        
        <div className="flex items-center gap-[6px]">
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-[#0E0E0E] rounded-[1px]"></div>
            </div>
            
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-[#0E0E0E] mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            <div className="w-[23.5px] h-[11.5px] border border-[#0E0E0E]/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-[#0E0E0E] rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-[#0E0E0E] rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * SVG Grain Engine (0 Asset Constraint Simulator)
 * Executes a high-frequency fractal noise function multiplied over the canvas.
 * Achieves the cinematic matte finish seen in the original render without using JPEGs.
 */
const CinematicNoiseOverlay = () => (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-[10] opacity-[0.25] mix-blend-overlay">
        <filter id="noiseFilter">
            <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.95" 
                numOctaves="3" 
                stitchTiles="stitch"
            />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
);


/**
 * Abstract Fluid Geometry Mesh
 * Escaping vector asset limits by utilizing massive CSS circle projections 
 * under fractional opacities to physically build the intersecting background wave tones.
 */
const AmbientWaveCanvas = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#34BE9F]">
        {/* Top-Left Volumetric Bloom */}
        <div className="absolute top-[-30%] left-[-20%] w-[140vw] h-[140vw] max-w-[800px] max-h-[800px] bg-[#FFFFFF] opacity-[0.06] rounded-full border border-white/5"></div>
        
        {/* Right Eclipse Node */}
        <div className="absolute top-[20%] right-[-50%] w-[150vw] h-[150vw] max-w-[800px] max-h-[800px] bg-[#000000] opacity-[0.04] rounded-full"></div>
        
        {/* Bottom Horizon Ascending Curve */}
        <div className="absolute bottom-[-10%] left-[-40%] w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-[#000000] opacity-[0.07] rounded-full shadow-[0_0_80px_rgba(0,0,0,0.1)]"></div>
        
        {/* Abyss Anchor Curve */}
        <div className="absolute bottom-[-30%] right-[-30%] w-[100vw] h-[100vw] max-w-[600px] max-h-[600px] bg-[#000000] opacity-[0.11] rounded-full"></div>
    </div>
);


/**
 * Zero-Asset Entale Logomark 
 * Procedural implementation of the folded `S` brand icon utilizing raw `<path>` architecture.
 */
const EntaleVectorLogo = () => (
    <svg 
        viewBox="0 0 100 100" 
        className="w-[72px] h-[72px] stroke-[#121314] stroke-[13px] fill-transparent stroke-linecap-round stroke-linejoin-round"
    >
        {/* 
          Path Architecture Map:
          - Starts at (75, 30): Top right tail.
          - Moves left to (35, 30).
          - Executes 180° counter-clockwise U-turn to (35, 50).
          - Moves right to (65, 50).
          - Executes 180° clockwise U-turn to (65, 70).
          - Moves left ending at (25, 70): Bottom left tail.
        */}
        <path d="M 75 30 L 35 30 A 10 10 0 0 0 35 50 L 65 50 A 10 10 0 0 1 65 70 L 25 70" />
    </svg>
);


/**
 * @name Entale App Splash Initialization (Page 68)
 * Demonstrates advanced systemic asset stripping through CSS procedural rendering matrices.
 */
export default function ExternalAppSplashOverlay() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#34BE9F] overflow-hidden">
            
            <CinematicNoiseOverlay />
            <AmbientWaveCanvas />
            <StatusBar />

            {/* Central Anchor Lock */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-20 w-full pb-[10%]">
                
                {/* Visual Mark Injection */}
                <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
                     <EntaleVectorLogo />
                </div>
                
                {/* 
                  Typographic Endorsement 
                  Utilizing heavy track spacing matched with explicit indent balancing 
                  to guarantee absolute DOM centering despite tracking overflow behaviors.
                */}
                <h2 className="text-[#121314] text-[15px] font-[700] tracking-[0.38em] pl-[0.38em] mt-[26px] antialiased">
                    ENTALE
                </h2>
                
            </div>

            {/* Apple Home Indicator (Intelligently inversed for dark/midtone base canvases) */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#FFFFFF] opacity-90 rounded-full left-1/2 -translate-x-1/2 z-[100] shadow-[0_1px_5px_rgba(0,0,0,0.1)]"></div>
        
        </div>
    );
}
