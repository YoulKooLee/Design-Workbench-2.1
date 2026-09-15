import React from 'react';
import './style.css';

/**
 * Procedural Vector Graphic: "Rotate/Hold Device" Tutorial
 */
const HandsHoldingTablet = () => (
    <svg viewBox="0 0 200 200" className="w-[160px] h-[160px]">
        {/* Top-Left Hand Gripping Base */}
        <path d="M25,55 C35,45 55,40 75,45 L105,45 L105,53 L80,53 C70,53 60,63 50,63 L30,63 Z" fill="#5F6366" />
        <path d="M25,65 L50,65 C60,65 70,70 70,85 L70,95 L62,95 C62,80 47,75 25,75 Z" fill="#5F6366" />
        
        {/* Bottom-Right Hand Gripping Base */}
        <path d="M175,145 C165,155 145,160 125,155 L95,155 L95,147 L120,147 C130,147 140,137 150,137 L170,137 Z" fill="#5F6366" />
        <path d="M175,135 L150,135 C140,135 130,130 130,115 L130,105 L138,105 C138,120 153,125 175,125 Z" fill="#5F6366" />

        {/* Central Tablet Device Hardware */}
        <rect x="62" y="32" width="76" height="136" rx="4" fill="#5F6366" />
        
        {/* Phosphor Glowing Inner Screen Area */}
        <rect x="68" y="38" width="64" height="124" fill="#E8EBEC" />
        
        {/* Device Peripheral Detail Nodes */}
        <circle cx="100" cy="35" r="1.5" fill="#E8EBEC" />
        <rect x="92" y="164" width="16" height="2.5" rx="1" fill="#E8EBEC" />
    </svg>
);


/**
 * CSS-Engineered Vintage CRT Monitor
 * Architected natively in Landscape coordinate space to match standard rendering patterns.
 */
const VintageTVEngine = () => (
    <div className="w-[660px] h-[480px] relative flex justify-center items-center">
        
        {/* Simulated Ambient Room Backlight Behind Hardware */}
        <div className="absolute inset-x-[-150px] inset-y-[-150px] bg-[#000000] overflow-hidden -z-20">
             <div className="absolute top-[5%] left-[20%] w-[45%] h-[85%] bg-[#122A30] opacity-80 blur-[50px]"></div>
             <div className="absolute top-[10%] right-[10%] w-[35%] h-[60%] bg-[#612411] opacity-75 blur-[55px]"></div>
             <div className="absolute bottom-[0%] right-[15%] w-[40%] h-[35%] bg-[#991A00] opacity-30 blur-[45px]"></div>
        </div>

        {/* Outer CRT Hardware Casing */}
        <div className="w-full h-full bg-gradient-to-br from-[#E6E1D3] to-[#BCB499] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_2px_10px_rgba(255,255,255,0.7)] p-[30px] flex flex-col border border-[#A19882] relative z-10">
            
            {/* Display Bezel and Tube Container */}
            <div className="w-full flex-1 bg-[#1A1C1F] rounded-[45px] p-[24px] shadow-[inset_0_8px_18px_rgba(0,0,0,0.9),inset_0_-4px_10px_rgba(255,255,255,0.08)] border-[3px] border-[#0A0B0C] relative">
                
                {/* 3D Convex Inner Glass Shadow Profile */}
                <div className="absolute inset-[24px] z-20 shadow-[inset_0_0_90px_rgba(0,0,0,0.95)] rounded-[25px] pointer-events-none"></div>

                {/* CRT Cathode Illumination Surface */}
                <div className="w-full h-full bg-gradient-to-b from-[#F4F5F6] to-[#C8CCD0] rounded-[25px] flex justify-center items-center overflow-hidden relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.05)] border-[2px] border-[#333]">
                    
                    {/* Organic Interlaced Scanlines */}
                    <div className="absolute inset-0 z-30 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                    
                    {/* Glass Glare Reflection Arch */}
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white to-transparent opacity-[0.08] rounded-tr-[25px] mix-blend-overlay pointer-events-none"></div>
                    
                    {/* Injected Content Stream */}
                    <HandsHoldingTablet />
                </div>
            </div>

            {/* Hardware Operations Dashboard */}
            <div className="w-full h-[120px] mt-[25px] flex bg-[#0A0A0A] rounded-[20px] border border-[#2A2A2A] shadow-[inset_0_6px_12px_rgba(0,0,0,0.95),0_2px_4px_rgba(255,255,255,0.1)] overflow-hidden">
                
                {/* Modular Acoustic Grill Array */}
                <div className="flex-1 flex flex-col justify-between py-[18px] px-[30px] border-r border-[#1C1C1C]">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-full h-[4px] bg-[#020202] shadow-[0_1px_0_rgba(255,255,255,0.06)] rounded-sm"></div>
                    ))}
                </div>

                {/* Frequency & Bandwidth Tuning Cluster */}
                <div className="w-[195px] bg-[#141414] p-[12px] flex justify-around items-center">
                    
                    {/* Primary Analog Tuning Knobs */}
                    <div className="flex flex-col gap-[18px] ml-[10px]">
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] flex justify-center items-center">
                            <div className="w-[20px] h-[4.5px] bg-[#050505] rounded-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"></div>
                        </div>
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] flex justify-center items-center rotate-45">
                            <div className="w-[20px] h-[4.5px] bg-[#050505] rounded-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"></div>
                        </div>
                    </div>

                    {/* Sequential Program Station Matrix */}
                    <div className="flex justify-between items-center w-[85px] h-full mr-[15px]">
                        <div className="flex flex-col justify-between h-full py-[8px]">
                           {Array.from({length: 8}).map((_, i) => (
                               <div key={i} className="w-[50px] h-[6px] bg-[#020202] border-t border-[#2A2A2A] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] rounded-[1px] flex items-center shrink-0">
                                   {/* Channel 3 Hardware Active Lamp */}
                                   {i === 2 && <div className="w-[14px] h-[4.5px] bg-[#FF3333] rounded-[1px] shadow-[0_0_6px_#FF3333] ml-[2px]"></div>}
                               </div>
                           ))}
                        </div>
                        
                        <div className="flex flex-col justify-between h-full py-[6px] text-[#7A7A7A] text-[9.5px] font-[800] tracking-tighter">
                            <span>1</span><span>2</span><span className="text-[#F0F0F0] drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Structural Hardware Lighting Polish */}
            <div className="absolute inset-x-[3px] top-[3px] h-[5px] bg-[#FFFFFF] opacity-30 blur-[2px] rounded-t-[28px] pointer-events-none"></div>
            <div className="absolute inset-y-[3px] left-[3px] w-[3px] bg-[#FFFFFF] opacity-20 blur-[1px] rounded-l-[28px] pointer-events-none"></div>
        </div>
    </div>
);


/**
 * @name Netflix "Bandersnatch Interactive Choice" Route - Page 45
 */
export default function InteractiveChoiceScreen() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden justify-center items-center">
            
            {/* 
              =======================================================
              HYPER-REALISTIC LANDSCAPE ENGINE
              We map the 16:9 Landscape Video sequence mathematically 
              into an Absolute Rotated Space to perfectly replicate
              the optical orientation of Mobile Native Players sideways.
              =======================================================
            */}
            <div className="absolute top-1/2 left-1/2 w-[950px] h-[650px] -translate-x-1/2 -translate-y-1/2 rotate-90 origin-center flex justify-center items-center z-0 pointer-events-none scale-[0.7] sm:scale-[0.8] md:scale-[0.9]">
                 <VintageTVEngine />
            </div>

            
            {/* 
              =======================================================
              NATIVE INTERACTIVE CHOICE OVERLAY HUD
              Constructed natively onto the Portrait bounding box exactly
              as intercepted by the system composition engine.
              =======================================================
            */}
            <div className="absolute inset-0 w-full h-full z-20">
                
                {/* HUD Focus Diffusion Shadow */}
                <div className="absolute top-0 bottom-0 left-0 w-[140px] bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>

                {/* Primary Depletion Timer Line (Horizontal mapping on Landscape) */}
                <div className="absolute left-[70px] top-[26%] bottom-[26%] w-[6px] bg-[#FAFAFA] rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.4)] z-30"></div>

                {/* Branch Origin A (YES) */}
                <div className="absolute left-[10px] top-[28%] origin-center rotate-90 flex justify-center items-center w-[60px] h-[60px] cursor-pointer hover:scale-110 transition-transform active:scale-95">
                    <span className="text-[#A3A3A3] font-[600] text-[22px] tracking-[0.2em] transform translate-y-[2px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        YES
                    </span>
                </div>

                {/* Branch Origin B (NO) */}
                <div className="absolute left-[10px] bottom-[28%] origin-center rotate-90 flex justify-center items-center w-[60px] h-[60px] cursor-pointer hover:scale-110 transition-transform active:scale-95">
                    <span className="text-[#A3A3A3] font-[600] text-[22px] tracking-[0.2em] transform translate-y-[2px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        NO
                    </span>
                </div>

            </div>
            
        </div>
    );
}
