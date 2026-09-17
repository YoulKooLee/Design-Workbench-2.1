import React from 'react';
import './style.css';

/**
 * @name Netflix "Share Copied State" Modal - Page 43
 */
export default function ShareCopiedOverlay() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden">
            
            {/* 
              =======================================================
              UI ENGINE: PROCEDURAL CINEMATIC BLUR SIMULATOR
              To genuinely replicate the "Overlay" sensation without routing
              dependencies, we paint abstract blobs representing the 
              previously active screen and blast them through a glass lens.
              =======================================================
            */}
            <div className="absolute inset-0 bg-[#090909] z-0 pointer-events-none">
                 {/* The distinctive wide red artifact (Play button / Logo bleed) */}
                 <div className="absolute top-[23%] left-[10%] w-[80%] h-[35px] bg-[#8B0B0B] opacity-85 blur-[35px] rounded-[50%]"></div>
                 <div className="absolute top-[24%] left-[20%] w-[60%] h-[15px] bg-[#E50914] opacity-55 blur-[25px] rounded-[50%]"></div>
                 
                 {/* Ambient Earthy Tones bleeding from the unseen poster below */}
                 <div className="absolute top-[55%] left-[-15%] w-[250px] h-[250px] bg-[#42331c] opacity-40 blur-[60px] rounded-full"></div>
                 <div className="absolute top-[60%] right-[-10%] w-[180px] h-[180px] bg-[#1e2e28] opacity-35 blur-[55px] rounded-full"></div>
            </div>

            {/* Heavy Diffusion Lens: Simulates the Modal Frosted Backdrop */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[35px] z-10 pointer-events-none"></div>

            
            {/* iOS Status Bar Layer */}
            <div className="absolute top-0 w-full z-50 flex justify-between items-start px-[28px] pt-[8px] pointer-events-none">
                 <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:58</span>
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


            {/* Central Toast Feedback Payload */}
            <div className="flex-1 flex flex-col items-center justify-center gap-[18px] pb-[50px] pointer-events-none z-20">
                
                {/* Thin-stroke vector Checkmark Circle */}
                <div className="w-[44px] h-[44px] rounded-full border-[1.2px] border-white flex items-center justify-center bg-transparent drop-shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] ml-[1px] mt-[1px]">
                        {/* Custom asymmetrical checkmark prioritizing optical alignment */}
                        <polyline points="19 7 9.5 16.5 5 12"></polyline>
                    </svg>
                </div>
                
                {/* Typography Feedback */}
                <span className="text-[#FAFAFA] font-[700] text-[17.5px] tracking-tight drop-shadow-md">
                    Copied. Share away!
                </span>

            </div>


            {/* Dismissal Control Node */}
            <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-[#FAFAFA] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 transition-transform z-30">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#141414]" strokeWidth="1.2" strokeLinecap="butt">
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <line x1="21" y1="3" x2="3" y2="21"></line>
                </svg>
            </div>


            {/* Root OS Handle */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>
            
        </div>
    );
}
