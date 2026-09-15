import React from 'react';
import './style.css';

/**
 * Validated iOS Status Bar (Light Mode Payload)
 * Force-inverted stroke and fill targeting #000000 composite environments.
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-[#0E0E0E] text-[15px] font-[600] tracking-tight ml-[2px] antialiased">1:31</span>
        
        <div className="flex items-center gap-[6px]">
            {/* Cellular Topology */}
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-[#0E0E0E] rounded-[1px]"></div>
            </div>
            
            {/* Wifi Topology */}
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-[#0E0E0E] mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* Battery Topology */}
            <div className="w-[23.5px] h-[11.5px] border border-[#0E0E0E]/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-[#0E0E0E] rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-[#0E0E0E] rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * @name Chapter Organization Flow / Intercept (Page 65)
 * Radically disparate UI architecture from Netflix Core. Indicates external Onboarding
 * intercept or app promotion modal sequence (ex. Web view integration constraint layout).
 */
export default function ExternalChapterFlowOverlay() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#FDFDFD] overflow-hidden">
            
            {/* Hardware Header Node */}
            <StatusBar />

            {/* 
              Typographic Hero Anchor 
              Utilizes native system serif fallbacks targeting precision visual weight 
              mapping to standard webview renders.
            */}
            <div className="flex flex-col items-center flex-1 justify-center pb-[75px]">
                <h1 className="text-center text-[#2F3132] text-[36px] font-[400] leading-[1.12]" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
                    We split them <br />
                    into chapters
                </h1>
            </div>

            {/* 
              Synthetic Document Base Plate 
              Primary anchor for content projection. 
            */}
            <div className="w-full h-[410px] relative px-[16px]">
                
                {/* 
                  Abstract Geometry Layer (Teal/Mint UI Ornaments) 
                  These float distinctly at z-30 halfway above the master layout structure.
                */}
                <div className="absolute top-[-22px] w-full flex items-center justify-start pl-[34px] gap-[24px] z-[30]">
                    {/* Primary Pill */}
                    <div className="w-[125px] h-[45px] bg-[#4EC7A7] rounded-full shadow-[0_4px_15px_rgba(78,199,167,0.25)]"></div>
                    {/* Synchronous Sphere */}
                    <div className="w-[45px] h-[45px] bg-[#4EC7A7] rounded-full shadow-[0_4px_15px_rgba(78,199,167,0.25)]"></div>
                </div>

                {/* 
                  Content Article Card 
                  Simulates a loaded block structure utilizing highly dense grey box artifacts. 
                */}
                <div className="w-full h-full bg-[#FFFFFF] rounded-t-[5px] shadow-[0_-5px_40px_rgba(0,0,0,0.06)] px-[34px] pt-[45px] relative z-[20]">
                    
                    {/* Dark Title Simulation */}
                    <div className="w-[88%] h-[24px] bg-[#545454]"></div>
                    
                    {/* Light Subtitle Simulation */}
                    <div className="w-[35%] h-[6px] bg-[#D4D4D4] mt-[16px]"></div>
                    
                    {/* Body Typeform Masking Lines */}
                    <div className="flex flex-col mt-[35px] gap-[14px]">
                        <div className="w-[60%] h-[9px] bg-[#F4F4F4]"></div>
                        <div className="w-[82%] h-[9px] bg-[#F4F4F4]"></div>
                        <div className="w-[60%] h-[9px] bg-[#F4F4F4]"></div>
                        <div className="w-[82%] h-[9px] bg-[#F4F4F4]"></div>
                    </div>

                    {/* 
                      Interactive Horizon Tray 
                      Holds sequentially numbered structural card elements with localized drop-glow arrays.
                    */}
                    <div className="w-full flex gap-[12px] mt-[48px] overflow-visible">
                        {[1, 2, 3, 4].map((num) => (
                            <div 
                                key={num} 
                                className="w-[78px] h-[125px] bg-[#4EC7A7] rounded-[8px] shadow-[0_12px_25px_rgba(78,199,167,0.35)] flex flex-col justify-end p-[14px] shrink-0"
                            >
                                <span className="text-white text-[17.5px] font-[600] font-sans leading-none tracking-tight">
                                    {num}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* iOS System Safe Constraint Reference */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#0E0E0E] rounded-full left-1/2 -translate-x-1/2 z-[100]"></div>
        
        </div>
    );
}
