import React from 'react';
import './style.css';

/**
 * Procedural Vector Scene: Nohzdyve Phase 2 (Bandersnatch Game Clip)
 * The scene displays the protagonist leaping across the industrial zone.
 */
const BandersnatchNohzdyveScreenV2 = () => (
    <div className="w-full h-full bg-[#CED4D9] overflow-hidden relative shadow-[inset_0_0_70px_rgba(0,0,0,0.6)]">
       {/* Global Horizon Grid & Ground Plane */}
       <div className="absolute inset-x-0 bottom-0 top-[80%] bg-[#DFE2E6]"></div>
       <div className="absolute inset-x-0 bottom-[20%] h-[5px] bg-[#111]"></div>
       <div className="absolute inset-x-0 bottom-[20%] top-0 bg-[#A0A6AD]"></div>

       {/* Ground Spikes Obstacles */}
       <div className="absolute bottom-[20%] left-[40%] w-[16px] h-[24px]">
            <svg viewBox="0 0 20 40" className="w-full h-full fill-[#222]">
                <polygon points="10 0 20 40 0 40"></polygon>
            </svg>
       </div>
       <div className="absolute bottom-[20%] right-[35%] w-[16px] h-[24px]">
            <svg viewBox="0 0 20 40" className="w-full h-full fill-[#222]">
                <polygon points="10 0 20 40 0 40"></polygon>
            </svg>
       </div>

       {/* Sub-level Industrial Chimney / Platform (Left-aligned) */}
       <div className="absolute bottom-[20%] left-[8%] w-[185px] h-[195px] bg-[#898E94] border-t-[7px] border-r-[7px] border-[#222] shadow-sm">
            {/* Ventilation Core */}
            <div className="absolute right-[25px] top-[20px] w-[50px] h-[50px] rounded-full bg-[#222]"></div>
            {/* Strut System */}
            <div className="absolute right-[45px] top-[70px] w-[8px] h-full bg-[#222]"></div>
            <div className="absolute left-0 right-[45px] top-[95px] h-[40px] bg-[#757A80] border-b-[5px] border-[#222]"></div>
       </div>

       {/* Avatar (Colin's Jumper) Mid-Leap Sequence */}
       <div className="absolute bottom-[48%] right-[28%] drop-shadow-md">
            <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] transform opacity-[0.98]">
                {/* Cranium thrust forward */}
                <circle cx="82" cy="50" r="11" fill="#1C1C1C" />
                {/* Horizontal Torso Spine */}
                <line x1="30" y1="50" x2="72" y2="50" stroke="#1C1C1C" strokeWidth="6.5" strokeLinecap="round" />
                
                {/* Running Leg Engine (Scissored backward) */}
                <polyline points="10 38 32 50 15 65" stroke="#1C1C1C" strokeWidth="6.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                
                {/* Fused Arm Thrust (Downward angular pull) */}
                <polyline points="65 50 60 70 75 80" stroke="#1C1C1C" strokeWidth="6.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
       </div>

       {/* Distressed CRT Glass Profile Projection */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#EAEBEB]/10 to-white opacity-[0.14] mix-blend-overlay pointer-events-none rounded-[25px] z-30"></div>
       <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-radial-gradient(circle,transparent,transparent_2px,#000_2px,#000_4px)] mix-blend-color-burn z-40"></div>
    </div>
);


/**
 * Extracted Vintage TV Prop Engine
 * Encapsulated CSS layout rendering a 3D British 1980s tube monitor.
 */
const VintageTVEngine = () => (
    <div className="w-[680px] h-[495px] relative flex justify-center items-center shadow-2xl">
        {/* Dynamic Dark Ambient Lighting / Environment Scrim */}
        <div className="absolute inset-x-[-150px] inset-y-[-150px] bg-[#030303] overflow-hidden -z-20">
             <div className="absolute top-[10%] left-[8%] w-[55%] h-[75%] bg-[#08202A] opacity-[0.7] blur-[70px]"></div>
             <div className="absolute top-[20%] right-[5%] w-[50%] h-[60%] bg-[#3D1408] opacity-[0.55] blur-[80px]"></div>
        </div>

        {/* Structural Chassis Frame */}
        <div className="w-full h-full bg-gradient-to-br from-[#EAE6D9] to-[#C0B9A0] rounded-[32px] p-[28px] flex flex-col border border-[#A19882] shadow-[0_35px_80px_rgba(0,0,0,0.95),inset_0_2px_12px_rgba(255,255,255,0.85)] relative z-10 box-border">
            
            {/* Tube Bezel Cavity */}
            <div className="w-full flex-1 bg-[#1A1C1F] rounded-[48px] p-[22px] shadow-[inset_0_8px_18px_rgba(0,0,0,0.98)] border-[3.5px] border-[#0A0B0C] relative">
                {/* Soft Screen Falloff Inner Shadow */}
                <div className="absolute inset-[22px] z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.99)] rounded-[25px] pointer-events-none"></div>
                
                {/* Active Radiator Plane (The Glass Screen) */}
                <div className="w-full h-full bg-gradient-to-b from-[#F9F9F9] to-[#C8CCD0] rounded-[28px] overflow-hidden relative z-10 border-[2px] border-[#333]">
                    <div className="absolute inset-0 z-[60] opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                    <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-white to-transparent opacity-[0.08] rounded-tr-[28px] mix-blend-overlay pointer-events-none"></div>
                    <BandersnatchNohzdyveScreenV2 />
                </div>
            </div>

            {/* Sub-Panel: Electronics & Hardware Interfaces */}
            <div className="w-full h-[120px] mt-[26px] flex bg-[#0A0A0A] rounded-[20px] border border-[#2A2A2A] shadow-[inset_0_6px_15px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Acoustics System (Speaker Grille Array) */}
                <div className="flex-1 flex flex-col justify-between py-[18px] px-[30px] border-r border-[#1C1C1C]">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-full h-[4.5px] bg-[#020202] shadow-[0_1px_0_rgba(255,255,255,0.05)] rounded-sm"></div>
                    ))}
                </div>
                
                {/* Analog Rotary Channel Interface */}
                <div className="w-[195px] bg-[#141414] p-[12px] flex justify-around items-center gap-[5px] pl-[15px]">
                    <div className="flex flex-col gap-[18px]">
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_4px_8px_rgba(0,0,0,0.8)] flex justify-center items-center">
                            <div className="w-[20px] h-[4px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_4px_8px_rgba(0,0,0,0.8)] flex justify-center items-center rotate-45">
                            <div className="w-[20px] h-[4px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                    </div>
                    
                    {/* Linear State Indicator Column */}
                    <div className="flex justify-between items-center w-[85px] h-full mr-[10px]">
                        <div className="flex flex-col justify-between h-full py-[8px]">
                           {Array.from({length: 8}).map((_, i) => (
                               <div key={i} className="w-[50px] h-[6px] bg-[#020202] border-t border-[#2A2A2A] rounded-[1px] flex items-center shrink-0">
                                   {/* Active LED for Channel Matrix */}
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
 * @name Netflix "Inverted Playback State" - Page 48
 */
export default function InvertedPlaybackState() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden justify-center items-center">
            
            {/* 
              =======================================================
              INVERTED LANDSCAPE ENGINE MATRICES
              User device physically rotated 90 degrees Clockwise to view horizontal video.
              Thus, standard mathematical engine requires -90 degree (CCW) compensation 
              to map physical device coordinates back into portrait bounds!
              =======================================================
            */}
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[430px] -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90 flex z-0 overflow-hidden">
                 
                 {/* Raw Video Underlay (Z-0) */}
                 <div className="absolute inset-0 flex justify-center items-center scale-[0.68] sm:scale-[0.8] opacity-100">
                      <VintageTVEngine />
                 </div>

                 {/* 
                   Rendered Closed Caption Engine (OS-Layer) (Z-20)
                   Netflix intelligently bumps CC nodes to viewport Top to prevent obscuring sub-layer critical UI bounds.
                 */}
                 <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col justify-center w-full z-20 pointer-events-none fade-in">
                      {/* Typographic box rendering using high alpha fallback format (Courier mono) */}
                      <div className="flex justify-center w-full">
                           <div className="bg-[#000000]/80 px-[16px] py-[6px] rounded-[5px] backdrop-blur-[2px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 mx-auto">
                                <span className="text-[#E0E0E0] font-mono text-[22px] font-[500] tracking-widest drop-shadow-sm lowercase select-none">
                                     which alter the story.
                                </span>
                           </div>
                      </div>
                 </div>

            </div>

        </div>
    );
}
