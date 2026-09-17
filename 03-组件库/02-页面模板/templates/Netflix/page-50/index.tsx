import React from 'react';
import './style.css';

/**
 * Native OS Component Simulated: iOS Dark Mode Numeric Pad Key
 */
const NumpadKey = ({ num, letters }: { num: string; letters: string }) => {
    // Dynamically compress wide alphabetical strings to map perfectly to standard iOS tracking
    const isWide = letters.length > 5;
    
    return (
        <div className="flex flex-col items-center justify-center flex-1 h-[48px] bg-[#545458] rounded-[6px] active:bg-[#4A4A4D] cursor-pointer touch-manipulation">
            {letters ? (
                <>
                    <span className="text-[#FAFAFA] font-[400] text-[25px] leading-none mb-[1px]">{num}</span>
                    <span className={`text-[#FAFAFA] font-[700] text-[10px] ${isWide ? 'tracking-[0.1em]' : 'tracking-[0.2em]'} leading-none uppercase`}>
                        {letters}
                    </span>
                </>
            ) : (
                <span className="text-[#FAFAFA] font-[400] text-[28px] leading-[0]">{num}</span>
            )}
        </div>
    );
};

/**
 * Standard iOS Pentagon Delete Symbol
 */
const BackspaceIcon = () => (
    <div className="flex justify-center items-center w-full h-full cursor-pointer active:opacity-50 transition-opacity">
        <svg viewBox="0 0 44 32" className="w-[26px] h-[19px] fill-transparent stroke-[#FAFAFA] stroke-[2.5px]" style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}>
            <path d="M 14 2 L 40 2 C 42 2 42 2 42 4 L 42 28 C 42 30 42 30 40 30 L 14 30 L 2 16 Z" />
            <path d="M 22 11 L 32 21 M 32 11 L 22 21" />
        </svg>
    </div>
);

/**
 * Simulated iOS System Keyboard HUD (Numeric Target)
 */
const IosNumpad = () => (
    <div className="absolute bottom-0 w-full bg-[#1C1C1E] px-[6px] pt-[8px] pb-[40px] flex flex-col gap-[8px] z-50">
        
        <div className="flex justify-between gap-[6px]">
            <NumpadKey num="1" letters="" />
            <NumpadKey num="2" letters="A B C" />
            <NumpadKey num="3" letters="D E F" />
        </div>
        
        <div className="flex justify-between gap-[6px]">
            <NumpadKey num="4" letters="G H I" />
            <NumpadKey num="5" letters="J K L" />
            <NumpadKey num="6" letters="M N O" />
        </div>
        
        <div className="flex justify-between gap-[6px]">
            <NumpadKey num="7" letters="P Q R S" />
            <NumpadKey num="8" letters="T U V" />
            <NumpadKey num="9" letters="W X Y Z" />
        </div>
        
        <div className="flex justify-between gap-[6px] items-center h-[48px]">
            <div className="flex-1 h-full"></div>
            <NumpadKey num="0" letters="" />
            <div className="flex-1 h-[48px]">
                <BackspaceIcon />
            </div>
        </div>

    </div>
);


/**
 * OS Top Status Bar (Portrait Standard)
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[20px] flex justify-between items-center z-[100] pointer-events-none">
        
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[4px]">2:57</span>
        
        <div className="flex items-center gap-[6px] mr-[2px]">
            {/* Signal Strength (4 Bars) */}
            <div className="flex items-end gap-[1.5px] h-[11px] mb-[1px]">
                <div className="w-[3px] h-[4px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[9px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[11px] bg-white rounded-[1px]"></div>
            </div>
            
            {/* Wi-Fi Connection */}
            <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-white mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* Battery Indicator (90%) */}
            <div className="w-[23px] h-[11.5px] border border-white/80 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[88%] h-full bg-white rounded-[1.5px]"></div>
                <div className="absolute right-[-3.5px] w-[2px] h-[4px] bg-white/80 rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * @name Netflix "Parental Control PIN OS Modal" - Page 50
 */
export default function RestrictedContentPin() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden font-sans">
            
            {/* Top Anchor */}
            <StatusBar />

            {/* Bottom Anchor */}
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[135px] h-[5px] bg-[#FFFFFF] rounded-full z-[100] opacity-90 pointer-events-none"></div>

            {/* 
                Center Modal Projection Plane
                We pad the bottom relative to the structural footprint of the Keyboard 
                to ensure the alert visually centers in the 'available' screen space 
                just like the native OS renderer computes.
            */}
            <div className="w-full flex-1 flex justify-center items-center pb-[280px] z-10 px-[20px]">
                
                {/* Simulated UIAlertController */}
                <div className="w-[270px] bg-[#D1D1D6] rounded-[14px] flex flex-col overflow-hidden shadow-2xl">
                    
                    {/* Header Top Half */}
                    <div className="flex flex-col items-center pt-[20px] px-[16px] pb-[16px]">
                        <span className="text-[#000000] text-[16.5px] font-[600] leading-[21px] text-center tracking-tight opacity-95">
                            Enter PIN to watch<br />restricted content.
                        </span>
                        
                        {/* Interactive Hardware Mapping (PIN Boxes) */}
                        <div className="flex gap-[8px] mt-[16px]">
                            {/* Active Targeting Box */}
                            <div className="w-[42px] h-[48px] bg-white rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex justify-center items-center">
                                {/* Simulated text-cursor blink */}
                                <div className="w-[2px] h-[24px] bg-[#007AFF] animate-pulse"></div>
                            </div>
                            
                            {/* Inactive Targeting Boxes */}
                            <div className="w-[42px] h-[48px] bg-white rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"></div>
                            <div className="w-[42px] h-[48px] bg-white rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"></div>
                            <div className="w-[42px] h-[48px] bg-white rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"></div>
                        </div>
                    </div>
                    
                    {/* Action Execution Footer List */}
                    <div className="w-full flex flex-col border-t border-[#3C3C43]/20">
                        {/* Secondary Action Link */}
                        <div className="w-full h-[45px] flex justify-center items-center active:bg-black/5 cursor-pointer transition-colors">
                            <span className="text-[#007AFF] text-[17px] font-[400] tracking-tight">
                                Forgot PIN?
                            </span>
                        </div>
                        
                        {/* Primary Destructive/Cancellation Link */}
                        <div className="w-full h-[45px] flex justify-center items-center border-t border-[#3C3C43]/20 active:bg-black/5 cursor-pointer transition-colors">
                            <span className="text-[#007AFF] text-[17px] font-[600] tracking-tight">
                                Cancel
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Keyboard Hardware Layer */}
            <IosNumpad />

        </div>
    );
}
