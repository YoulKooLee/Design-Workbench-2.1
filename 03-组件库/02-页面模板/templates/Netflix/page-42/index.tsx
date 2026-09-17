import React from 'react';
import './style.css';

/**
 * @name Netflix "Splash Screen / Launch Zero-State" - Page 42
 */
export default function NetflixSplashPage() {

    // Procedural Arch Geometry Engine
    // Each character node maps exactly to a unique Y-axis multiplier 
    // to algorithmically forge the iconic inverted baseline curve!
    const logoMap = [
        { char: 'N', scale: 1.00, weight: '900' },
        { char: 'E', scale: 1.04, weight: '900' },
        { char: 'T', scale: 1.08, weight: '900' },
        { char: 'F', scale: 1.11, weight: '900' },
        { char: 'L', scale: 1.08, weight: '900' },
        { char: 'I', scale: 1.04, weight: '900' },
        { char: 'X', scale: 1.00, weight: '900' }
    ];

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#000000] relative select-none">
            
            {/* Native OS Sensor Environment (Status Bar) */}
            <div className="absolute top-0 w-full z-50 flex justify-between items-start px-[28px] pt-[8px] pointer-events-none">
                 <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:53</span>
                 <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
                     <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                        <div className="w-[3px] h-[4px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[6px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[8.5px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[11px] bg-[#FAFAFA] rounded-sm"></div>
                     </div>
                     <div className="relative transform scale-[0.80] -mr-1">
                         <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-[#FAFAFA] stroke-[1.2px]">
                             <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                             <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                         </svg>
                         <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-[#FAFAFA] rounded-[1.5px]"></div>
                     </div>
                 </div>
            </div>

            {/* Application Splash Core Viewport */}
            <div className="flex-1 flex justify-center items-center pb-[20px]">
                
                {/* 
                  Algorithmic Typography Engine:
                  Using origin-top manipulation, creating flawless cross-platform 
                  fidelity without generating expensive or resolution-dependent images.
                */}
                <div className="flex items-start justify-center tracking-tight">
                    {logoMap.map((node, i) => (
                        <div key={i} className="flex justify-center origin-top pointer-events-none" 
                             style={{ transform: `scaleY(${node.scale})` }}>
                            
                            <span className="text-[#E50914] leading-none" 
                                  style={{ 
                                      fontFamily: '"Arial Narrow", "Helvetica Condensed", Impact, sans-serif',
                                      fontWeight: node.weight,
                                      fontSize: '70px',
                                      transform: 'scaleX(0.85)',
                                      display: 'inline-block',
                                      marginLeft: i === 0 ? '0' : '-1.5px', // Kerning compression
                                      marginRight: i === logoMap.length - 1 ? '0' : '-1.5px',
                                      textShadow: '0 2px 10px rgba(229, 9, 20, 0.15)' // Slight red cinematic bloom
                                  }}>
                                {node.char}
                            </span>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* Native App Root Hardware Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>

        </div>
    );
}
