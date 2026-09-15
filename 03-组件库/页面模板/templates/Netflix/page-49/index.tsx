import React from 'react';
import './style.css';

/**
 * Procedural Vector Art: The "White Bear" Fracture Glitch 
 * This SVG artificially simulates physical damage or a graphical electron beam
 * tear mirroring the flow-chart geometry of the Bandersnatch meta-glyph.
 */
const GlitchGlyph = () => (
    <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full z-20 pointer-events-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
        
        {/* --- CORE FRACTURE STEM (Through 'BLACK') --- */}
        {/* Outer Glow Pass */}
        <path d="M 60 305 Q 120 290 180 315 T 320 295 T 430 300" stroke="#FFF" strokeWidth="10" fill="none" className="opacity-80 blur-[2.5px]" />
        {/* Intense Core Splinter */}
        <path d="M 50 305 L 110 298 L 190 312 L 260 290 L 330 308 L 430 300" stroke="#FFF" strokeWidth="5" fill="none" className="opacity-100 drop-shadow-[0_0_12px_#FFF] stroke-linecap-round stroke-linejoin-round" />

        {/* --- UPPER BRANCH FRACTURE (Through top of 'MIRROR') --- */}
        <path d="M 430 300 Q 480 240 550 180 T 680 110 T 760 70" stroke="#FFF" strokeWidth="10" fill="none" className="opacity-80 blur-[2.5px]" />
        <path d="M 430 300 L 460 270 L 510 220 L 580 160 L 640 130 L 710 90 L 760 70" stroke="#FFF" strokeWidth="5" fill="none" className="opacity-100 drop-shadow-[0_0_12px_#FFF] stroke-linecap-round stroke-linejoin-round" />

        {/* --- LOWER BRANCH FRACTURE (Through bottom of 'MIRROR') --- */}
        <path d="M 430 300 Q 470 350 520 400 T 660 500 T 740 560" stroke="#FFF" strokeWidth="10" fill="none" className="opacity-80 blur-[2.5px]" />
        <path d="M 430 300 L 470 340 L 510 390 L 560 440 L 630 490 L 740 560" stroke="#FFF" strokeWidth="5" fill="none" className="opacity-100 drop-shadow-[0_0_12px_#FFF] stroke-linecap-round stroke-linejoin-round" />

        {/* --- ERRATIC ORTHOGONAL TEARS (Scanline bleeding) --- */}
        {/* These simulate tearing perpendicular to the main scratch, behaving like electron beam stutters */}
        <path d="M 130 260 L 125 350 M 180 270 L 185 340 M 250 250 L 245 360 M 330 275 L 335 320" stroke="#FFF" strokeWidth="3" fill="none" className="opacity-75 blur-[1px]" />
        <path d="M 410 220 L 420 380 M 460 180 L 450 320 M 480 280 L 490 430 M 530 140 L 525 280 M 550 320 L 560 480" stroke="#FFF" strokeWidth="3.5" fill="none" className="opacity-[0.85] blur-[1px]" />
        <path d="M 610 100 L 600 220 M 630 400 L 640 560" stroke="#FFF" strokeWidth="3" fill="none" className="opacity-70 blur-[1px]" />

        {/* --- MICRO CRYSTAL FRACTURES --- */}
        {/* Sharp, unblurred splinter lines branching erratically */}
        <path d="M 170 310 L 200 250 M 270 295 L 310 340 M 380 308 L 420 340 M 440 290 L 470 250 M 560 160 L 580 120 M 530 400 L 500 440" stroke="#FFF" strokeWidth="2.5" fill="none" strokeLinecap="round" className="opacity-[0.95]" />
        <path d="M 430 300 L 450 310 M 310 290 L 290 270" stroke="#FFF" strokeWidth="4" fill="none" strokeLinecap="round" className="opacity-100" />
    </svg>
);


/**
 * Active CRT Broadcast Simulator 
 * Displays the Title Card undergoing the glitch event.
 */
const BandersnatchFractureScreen = () => (
    <div className="w-full h-full bg-[#16181B] overflow-hidden relative shadow-[inset_0_0_90px_rgba(0,0,0,0.9)] flex justify-center items-center">
       
       {/* Ambient Backlight / V-Sync Noise Blur */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#24282D] to-[#0E1012] opacity-[0.85] z-0 pointer-events-none"></div>

       {/* Title Card Matrix */}
       <div className="z-10 flex w-full justify-center opacity-[0.85] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mix-blend-screen px-[20px]">
           <span className="text-[#969EA5] font-[Helvetica,Arial,sans-serif] font-[900] text-[54px] tracking-[0.3em] select-none whitespace-pre pb-[10px]">
               BLACK    MIRROR
           </span>
       </div>

       {/* The "White Bear" Symbology Rupture */}
       <GlitchGlyph />

       {/* CRT Glass & Glare Projections */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#EAEBEB]/5 to-white opacity-[0.16] mix-blend-overlay pointer-events-none rounded-[25px] z-30"></div>
       <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[repeating-radial-gradient(circle,transparent,transparent_2px,#000_2px,#000_4px)] mix-blend-color-burn z-40"></div>
    </div>
);


/**
 * Extracted Vintage TV Prop Engine
 * Inherits 3D bevels and CSS geometry from the Page 45-48 architectures.
 */
const VintageTVEngine = () => (
    <div className="w-[680px] h-[495px] relative flex justify-center items-center shadow-2xl">
        {/* 
            Dynamic Scene Illuminator
            Mapping the brown wooden desk glow to the Engine-Bottom (Portrait-Left)
        */}
        <div className="absolute inset-x-[-150px] inset-y-[-150px] bg-[#020202] overflow-hidden -z-20">
             <div className="absolute top-[5%] right-[5%] w-[60%] h-[75%] bg-[#08202A] opacity-[0.6] blur-[80px]"></div>
             <div className="absolute bottom-[-10%] left-[5%] w-[90%] h-[40%] bg-[#5E2F13] opacity-[0.7] blur-[75px]"></div>
        </div>

        {/* Casing Geometry Frame */}
        <div className="w-full h-full bg-gradient-to-br from-[#EAE6D9] to-[#C0B9A0] rounded-[32px] p-[28px] flex flex-col border border-[#A19882] shadow-[0_35px_80px_rgba(0,0,0,0.95),inset_0_2px_12px_rgba(255,255,255,0.85)] relative z-10 box-border">
            
            <div className="w-full flex-1 bg-[#1A1C1F] rounded-[48px] p-[22px] shadow-[inset_0_8px_18px_rgba(0,0,0,0.98)] border-[3.5px] border-[#0A0B0C] relative">
                <div className="absolute inset-[22px] z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.99)] rounded-[25px] pointer-events-none"></div>
                
                <div className="w-full h-full bg-gradient-to-b from-[#F9F9F9] to-[#C8CCD0] rounded-[28px] overflow-hidden relative z-10 border-[2px] border-[#333]">
                    <div className="absolute inset-0 z-[60] opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                    <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-white to-transparent opacity-[0.08] rounded-tr-[28px] mix-blend-overlay pointer-events-none"></div>
                    
                    <BandersnatchFractureScreen />
                </div>
            </div>

            <div className="w-full h-[120px] mt-[26px] flex bg-[#0A0A0A] rounded-[20px] border border-[#2A2A2A] shadow-[inset_0_6px_15px_rgba(0,0,0,0.95)] overflow-hidden">
                <div className="flex-1 flex flex-col justify-between py-[18px] px-[30px] border-r border-[#1C1C1C]">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-full h-[4.5px] bg-[#020202] shadow-[0_1px_0_rgba(255,255,255,0.05)] rounded-sm"></div>
                    ))}
                </div>
                <div className="w-[195px] bg-[#141414] p-[12px] flex justify-around items-center gap-[5px] pl-[15px]">
                    <div className="flex flex-col gap-[18px]">
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_4px_8px_rgba(0,0,0,0.8)] flex justify-center items-center">
                            <div className="w-[20px] h-[4px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_4px_8px_rgba(0,0,0,0.8)] flex justify-center items-center rotate-45">
                            <div className="w-[20px] h-[4px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-[85px] h-full mr-[10px]">
                        <div className="flex flex-col justify-between h-full py-[8px]">
                           {Array.from({length: 8}).map((_, i) => (
                               <div key={i} className="w-[50px] h-[6px] bg-[#020202] border-t border-[#2A2A2A] rounded-[1px] flex items-center shrink-0">
                                   {i === 2 && <div className="w-[14px] h-[4.5px] bg-[#FF3333] rounded-[1px] shadow-[0_0_8px_#FF3333] ml-[2px]"></div>}
                               </div>
                           ))}
                        </div>
                        <div className="flex flex-col justify-between h-full py-[6px] text-[#7A7A7A] text-[9.5px] font-[800] tracking-tighter">
                            <span>1</span><span>2</span><span className="text-[#F0F0F0]">3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


/**
 * @name Netflix "Bandersnatch Meta-Glitch Screen" - Page 49
 */
export default function BandersnatchMetaGlitch() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#000] relative select-none overflow-hidden justify-center items-center">
            
            {/* iOS System Home Indicator / Rotational Proof Anchor */}
            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[5px] h-[135px] bg-[#FFFFFF] rounded-full z-[100] pointer-events-none drop-shadow-sm opacity-95"></div>
            
            {/* 
              LANDSCAPE ROTATION MATRIX
              Restoring the standard +90deg (CW) orientation algorithm.
              (Map: Engine-Bottom -> Portrait-Left)
            */}
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[430px] -translate-x-1/2 -translate-y-1/2 origin-center rotate-90 flex z-0 overflow-hidden">
                 
                 <div className="absolute inset-0 flex justify-center items-center scale-[0.68] sm:scale-[0.8] opacity-100">
                      <VintageTVEngine />
                 </div>

                 {/* No Native Netflix Player OS Overlays Active in this Frame */}
                 
            </div>

        </div>
    );
}
