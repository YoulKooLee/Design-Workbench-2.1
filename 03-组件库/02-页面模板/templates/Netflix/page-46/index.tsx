import React from 'react';
import './style.css';

/**
 * Landscape Audio & Subtitles Modalities
 * Architected in Native Horizontal space (16:9).
 * Exists to be projected into standard rotational matrices.
 */
const LandscapeAudioMenuHUD = () => (
    <div className="w-full h-full flex relative px-[24px] pt-[60px] pb-[25px] bg-[#141414]">
        
        {/* Core Divider Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[75%] bg-[#2A2A2A] pointer-events-none rounded-full"></div>

        {/* =========================================
            COLUMN A: AUDIO TRACKS
            ========================================= */}
        <div className="flex-1 flex flex-col h-full z-10 relative">
            <div className="flex flex-col items-start pl-[26%] w-full h-full">
                
                {/* Column Headline */}
                <h2 className="text-[#FAFAFA] font-[700] text-[20px] tracking-wide mb-[45px]">
                    Audio
                </h2>
                
                {/* Scrollable Flow Area */}
                <div className="flex flex-col gap-[36px] w-full items-start pb-[20px]">
                    {/* Active Track */}
                    <span className="text-[#FAFAFA] font-[700] text-[18px] tracking-[0.2px] shadow-sm select-none cursor-pointer">
                        English [Original]
                    </span>
                    
                    {/* Background Track */}
                    <span className="text-[#A3A3A3] font-[500] text-[18px] tracking-[0.2px] hover:text-[#FAFAFA] transition-colors select-none cursor-pointer">
                        English - Audio Description
                    </span>
                </div>

            </div>

            {/* Anchored Scroll Target Chevron */}
            <div className="absolute bottom-[0px] w-full flex justify-center opacity-80 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>


        {/* =========================================
            COLUMN B: SUBTITLE TRACKS
            ========================================= */}
        <div className="flex-1 flex flex-col h-full z-10 relative">
            <div className="flex flex-col items-start pl-[28%] w-full h-full">
                
                {/* Column Headline */}
                <h2 className="text-[#FAFAFA] font-[700] text-[20px] tracking-wide mb-[45px]">
                    Subtitles
                </h2>
                
                {/* Scrollable Flow Area */}
                <div className="flex flex-col gap-[36px] w-full items-start pb-[20px]">
                    
                    {/* Active State Disable Node */}
                    <span className="text-[#FAFAFA] font-[700] text-[18px] tracking-[0.2px] shadow-sm select-none cursor-pointer">
                        Off
                    </span>
                    
                    {/* Track Pool */}
                    <span className="text-[#A3A3A3] font-[500] text-[18px] tracking-[0.2px] hover:text-[#FAFAFA] transition-colors select-none cursor-pointer">
                        English [CC]
                    </span>
                    <span className="text-[#A3A3A3] font-[500] text-[18px] tracking-[0.2px] hover:text-[#FAFAFA] transition-colors select-none cursor-pointer">
                        Simplified Chinese
                    </span>
                    <span className="text-[#A3A3A3] font-[500] text-[18px] tracking-[0.2px] hover:text-[#FAFAFA] transition-colors select-none cursor-pointer">
                        Traditional Chinese
                    </span>

                </div>

            </div>

            {/* Anchored Scroll Target Chevron */}
            <div className="absolute bottom-[0px] w-full flex justify-center opacity-80 pointer-events-none">
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>


        {/* Dismissal Action Trigger (Top-Right Landscape) */}
        <div className="absolute top-[35px] right-[40px] p-[10px] cursor-pointer hover:scale-110 active:scale-95 transition-transform z-50">
            <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-transparent stroke-[#FAFAFA]" style={{strokeWidth: '1.5px', strokeLinecap: 'butt'}}>
                <line x1="2" y1="2" x2="22" y2="22"></line>
                <line x1="22" y1="2" x2="2" y2="22"></line>
            </svg>
        </div>

    </div>
);


/**
 * @name Netflix "A/V Menu Rotational Wrapper" - Page 46
 */
export default function AudioSubsSettings() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden justify-center items-center">
            
            {/* 
              =======================================================
              OS-LEVEL ANCHORS (PORTRAIT RAW-SPACE)
              Native iOS behaviors exist purely in the physical device orientation, 
              untouched by the Application's forced playback rotations.
              =======================================================
            */}
            
            {/* iOS Base Home Indicator - Anchored to Left Edge indicating CCW Rotation by User */}
            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[5px] h-[140px] bg-[#FFFFFF] rounded-full z-[100] pointer-events-none opacity-90 shadow-md"></div>
            
            
            {/* 
              =======================================================
              APP-LEVEL RENDER ENGINE
              We perform an absolute Euclidean Rotation mapping the 16:9 Landscape App Frame 
              directly into the viewport. This generates the 1:1 identical layout observed
              in the portrait screenshot.
              =======================================================
            */}
            <div className="absolute top-1/2 left-1/2 w-[850px] h-[430px] -translate-x-1/2 -translate-y-1/2 origin-center rotate-90 flex z-0 overflow-hidden shadow-2xl">
                 <LandscapeAudioMenuHUD />
            </div>

        </div>
    );
}
