import React from 'react';
import './style.css';

/**
 * Validated iOS Status Bar (Light Mode Payload)
 * Forced #0E0E0E contrast mode for white-base Webview / Native scenes.
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-[#0E0E0E] text-[15px] font-[600] tracking-tight ml-[2px] antialiased">1:31</span>
        
        <div className="flex items-center gap-[6px]">
            {/* Cellular Network Topology */}
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-[#0E0E0E] rounded-[1px]"></div>
            </div>
            
            {/* WiFi Topology */}
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-[#0E0E0E] mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* Battery Core Boundary */}
            <div className="w-[23.5px] h-[11.5px] border border-[#0E0E0E]/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-[#0E0E0E] rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-[#0E0E0E] rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * Zero-Asset Scissors SVG 
 * Mathematically structured crossing dual-loop vectors pointing UP when rotated -90deg.
 */
const ScissorsGraphic = ({ className }: { className: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        className={`stroke-linecap-round stroke-linejoin-round fill-transparent ${className}`}
    >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M8.6 8.6L20 20" />
        <path d="M8.6 15.4L20 4" />
    </svg>
);


/**
 * @name Entale Interactive Fragment UI (Page 66)
 * Distinct flow interceptor displaying a physical "cut" in the DOM timeline array.
 */
export default function ExternalInteractiveCutScreen() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#FFFFFF] overflow-hidden">
            
            {/* Persistent System Header */}
            <StatusBar />

            {/* 
              Typographic Hero Hook 
              Precision centered fallback stack utilizing classic serif tracking.
            */}
            <div className="w-full pt-[170px] flex justify-center z-10 px-[20px]">
                 <h1 
                    className="text-center text-[#1C1D1E] text-[34px] md:text-[36px] font-[400] leading-[1.08] tracking-tight antialiased" 
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                 >
                     At Entale we treat<br/>
                     them a little differently
                 </h1>
            </div>

            {/* 
              Geometric Cut Canvas 
              Coordinates normalized via relative localized wrappers.
            */}
            <div className="w-[88%] max-w-[340px] mx-auto mt-[120px] relative z-20">
                 
                 {/* 
                   Fractured Timeline Vector Matrix
                   The container visually unifies but spatially splits [1 2 3] from [4] via strict % distributions.
                 */}
                 <div className="w-full h-[85px] bg-[#4EC7A7] rounded-[8.5px] shadow-[0_12px_28px_rgba(78,199,167,0.38)] flex relative z-[25] overflow-visible">
                     
                     {/* Safe Node Grid (Uncut) */}
                     <div className="w-[73%] flex justify-between items-center px-[30px] h-full">
                          <span className="text-white text-[20px] font-[600] leading-none antialiased">1</span>
                          <span className="text-white text-[20px] font-[600] leading-none antialiased">2</span>
                          <span className="text-white text-[20px] font-[600] leading-none antialiased">3</span>
                     </div>
                     
                     {/* Severed Node Terminal */}
                     <div className="w-[27%] flex justify-center items-center h-full pr-[8px]">
                          <span className="text-white text-[20px] font-[600] leading-none antialiased">4</span>
                     </div>
                 </div>

                 {/* 
                   Synthetic Cut Apparatus
                   Rides the exact geometric fissure line (right-27%) resolving the fracture illusion.
                 */}
                 <div className="absolute top-[-35px] right-[27%] translate-x-[50%] flex flex-col items-center z-[30] pointer-events-none">
                     
                     {/* Dashed Shear Line Extrusion */}
                     <div className="h-[210px] w-0 border-l-[3.5px] border-dashed border-[#AEAEAE]/90"></div>
                     
                     {/* Solid Hardware Effector */}
                     <ScissorsGraphic className="w-[50px] h-[50px] stroke-[#AEAEAE] stroke-[2.5px] mt-[-6px] transform rotate-[-90deg]" />
                 
                 </div>

                 {/* 
                   Animation Ghost Shell Overlay 
                   Simulating mid-frame linear physics engine visual residue.
                 */}
                 <div className="absolute top-[-25px] left-[48%] -translate-x-[50%] z-[28] opacity-[0.25] blur-[1px] pointer-events-none mix-blend-multiply">
                     <ScissorsGraphic className="w-[48px] h-[48px] stroke-[#8D8D8D] stroke-[2.5px] transform rotate-[-88deg]" />
                 </div>

            </div>

            {/* Apple Home Indicator Secure Pad */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#0E0E0E] rounded-full left-1/2 -translate-x-1/2 z-[100]"></div>
        
        </div>
    );
}
