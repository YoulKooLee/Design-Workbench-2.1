import React from 'react';
import './style.css';

/**
 * Vectors for Playback Navigation Mechanics (Zero-Asset)
 */
const Rewind10Icon = () => (
    <div className="relative flex justify-center items-center w-[54px] h-[54px] drop-shadow-md opacity-95">
        <svg viewBox="0 0 48 48" className="w-[48px] h-[48px] fill-none stroke-[#FAFAFA] stroke-[2.5px] stroke-linecap-round stroke-linejoin-round">
            {/* Rewind (CCW): Start top-left, sweep long path around the bottom to top-center pointing Left */}
            <path d="M 11 17 A 16 16 0 1 0 24 9"></path>
            <polyline points="31 2 24 9 31 16"></polyline>
        </svg>
        <span className="absolute font-[700] text-[15px] tracking-tight text-[#FAFAFA] mt-[2px]">10</span>
    </div>
);

const Forward10Icon = () => (
    <div className="relative flex justify-center items-center w-[54px] h-[54px] drop-shadow-md opacity-95">
        <svg viewBox="0 0 48 48" className="w-[48px] h-[48px] fill-none stroke-[#FAFAFA] stroke-[2.5px] stroke-linecap-round stroke-linejoin-round">
            {/* Forward (CW): Start top-right, sweep long path around the bottom to top-center pointing Right */}
            <path d="M 37 17 A 16 16 0 1 1 24 9"></path>
            <polyline points="17 2 24 9 17 16"></polyline>
        </svg>
        <span className="absolute font-[700] text-[15px] tracking-tight text-[#FAFAFA] mt-[2px]">10</span>
    </div>
);


/**
 * Procedural Vector Scene: Nohzdyve (Bandersnatch Game Clip)
 */
const BandersnatchNohzdyveScreen = () => (
    <div className="w-full h-full bg-[#B2B8BD] overflow-hidden relative shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]">
       {/* Background structural horizon lines */}
       <div className="absolute inset-x-0 bottom-0 top-[80%] bg-[#D7DADF]"></div>
       <div className="absolute inset-x-0 bottom-[20%] h-[5px] bg-[#1A1A1A]"></div>
       <div className="absolute inset-x-0 bottom-[20%] top-0 bg-[#A0A6AD]"></div>

       {/* Ground Spikes */}
       <div className="absolute bottom-[20%] left-[20%] w-[18px] h-[28px]">
            <svg viewBox="0 0 20 40" className="w-full h-full fill-[#111]">
                <polygon points="10 0 20 40 0 40"></polygon>
            </svg>
       </div>
       <div className="absolute bottom-[20%] left-[35%] w-[18px] h-[28px]">
            <svg viewBox="0 0 20 40" className="w-full h-full fill-[#111]">
                <polygon points="10 0 20 40 0 40"></polygon>
            </svg>
       </div>

       {/* Floating Cypher Logic Overlay */}
       <span className="absolute top-[38%] left-[8%] text-[#111] font-mono font-[800] text-[14px] tracking-tighter whitespace-nowrap opacity-[0.85] drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]">
            $?*& %@!&gt;
       </span>
       <span className="absolute top-[65%] left-[8%] text-[#111] font-mono font-[800] text-[14px] tracking-tighter whitespace-nowrap opacity-[0.85] drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]">
            £#+%&
       </span>

       {/* Destination Block Platform */}
       <div className="absolute bottom-[20%] right-[10%] w-[160px] h-[95px] border-t-[7px] border-l-[7px] border-[#111] flex bg-[#8C949B]">
            <div className="absolute right-0 top-[25%] w-[120px] h-[35%] bg-[#62686E] border-y-[4px] border-[#111]"></div>
            <div className="absolute right-[25px] top-[30%] w-[50px] h-[50px] rounded-full bg-[#111]"></div>
       </div>

       {/* Diving Character (Nohzdyve Avatar) */}
       <div className="absolute bottom-[40%] left-[65%]">
            <svg viewBox="0 0 100 100" className="w-[55px] h-[55px] transform rotate-[155deg] scale-x-[-1] opacity-95">
                <circle cx="50" cy="20" r="11" fill="#111" />
                <line x1="50" y1="30" x2="50" y2="70" stroke="#111" strokeWidth="6.5" strokeLinecap="round" />
                <polyline points="25 60 50 40 75 60" stroke="#111" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <polyline points="35 100 50 70 65 100" stroke="#111" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
       </div>

       {/* Choice Horizon / Time Depletion Line overlay baked into the CRT stream */}
       <div className="absolute bottom-[6%] left-[6%] right-[6%] h-[5px] bg-[#FFFFFF] shadow-[0_0_12px_rgba(255,255,255,1)] rounded-[2px] opacity-95 z-20"></div>

       {/* Glass Glare Profile */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#EAEBEB]/10 to-white opacity-[0.12] mix-blend-overlay pointer-events-none rounded-[25px] z-30"></div>
    </div>
);


/**
 * CSS-Engineered Vintage CRT Monitor
 * Architected natively in Landscape coordinate space (Identical to Page-45 specifications).
 */
const VintageTVEngine = () => (
    <div className="w-[680px] h-[495px] relative flex justify-center items-center shadow-2xl">
        <div className="absolute inset-x-[-150px] inset-y-[-150px] bg-[#000000] overflow-hidden -z-20">
             <div className="absolute top-[5%] left-[10%] w-[50%] h-[75%] bg-[#0B252E] opacity-90 blur-[50px]"></div>
             <div className="absolute top-[20%] right-[10%] w-[35%] h-[55%] bg-[#21110A] opacity-60 blur-[60px]"></div>
        </div>

        <div className="w-full h-full bg-gradient-to-br from-[#E6E1D3] to-[#BCB499] rounded-[32px] p-[30px] flex flex-col border border-[#A19882] shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_2px_10px_rgba(255,255,255,0.7)] relative z-10">
            <div className="w-full flex-1 bg-[#1A1C1F] rounded-[45px] p-[24px] shadow-[inset_0_8px_18px_rgba(0,0,0,0.95)] border-[3px] border-[#0A0B0C] relative">
                <div className="absolute inset-[24px] z-20 shadow-[inset_0_0_90px_rgba(0,0,0,0.95)] rounded-[25px] pointer-events-none"></div>
                <div className="w-full h-full bg-gradient-to-b from-[#F4F5F6] to-[#C8CCD0] rounded-[25px] overflow-hidden relative z-10 border-[2px] border-[#333]">
                    <div className="absolute inset-0 z-30 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white to-transparent opacity-[0.08] rounded-tr-[25px] mix-blend-overlay pointer-events-none"></div>
                    <BandersnatchNohzdyveScreen />
                </div>
            </div>

            <div className="w-full h-[120px] mt-[25px] flex bg-[#0A0A0A] rounded-[20px] border border-[#2A2A2A] shadow-[inset_0_6px_12px_rgba(0,0,0,0.95)] overflow-hidden">
                <div className="flex-1 flex flex-col justify-between py-[18px] px-[30px] border-r border-[#1C1C1C]">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-full h-[4px] bg-[#020202] shadow-[0_1px_0_rgba(255,255,255,0.06)] rounded-sm"></div>
                    ))}
                </div>
                <div className="w-[195px] bg-[#141414] p-[12px] flex justify-around items-center">
                    <div className="flex flex-col gap-[18px] ml-[10px]">
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_3px_6px_rgba(0,0,0,0.6)] flex justify-center items-center">
                            <div className="w-[20px] h-[4.5px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-b from-[#3A3A3A] to-[#0A0A0A] border-[1.5px] border-[#000] shadow-[0_3px_6px_rgba(0,0,0,0.6)] flex justify-center items-center rotate-45">
                            <div className="w-[20px] h-[4.5px] bg-[#050505] rounded-[1px]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-[85px] h-full mr-[15px]">
                        <div className="flex flex-col justify-between h-full py-[8px]">
                           {Array.from({length: 8}).map((_, i) => (
                               <div key={i} className="w-[50px] h-[6px] bg-[#020202] border-t border-[#2A2A2A] rounded-[1px] flex items-center shrink-0">
                                   {i === 2 && <div className="w-[14px] h-[4.5px] bg-[#FF3333] rounded-[1px] shadow-[0_0_6px_#FF3333] ml-[2px]"></div>}
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
 * @name Netflix "Active Player HUD Overlay" - Page 47
 */
export default function InteractivePlayerHUD() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden justify-center items-center">
            
            {/* iOS System Home Indicator (Portrait raw-space anchor) */}
            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[5px] h-[135px] bg-[#FFFFFF] rounded-full z-[100] pointer-events-none drop-shadow-sm opacity-95"></div>
            
            
            {/* --- LANDSCAPE ENGINE ROTATIONAL MAPPER --- */}
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[430px] -translate-x-1/2 -translate-y-1/2 origin-center rotate-90 flex z-0 overflow-hidden">
                 
                 {/* Video Playback Layer (Z-0) */}
                 <div className="absolute inset-0 flex justify-center items-center scale-[0.68] sm:scale-[0.8]">
                      <VintageTVEngine />
                 </div>

                 {/* Player HUD Scrim Filter (Z-10) */}
                 <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none"></div>

                 {/* Player HUD Interaction Matrix (Z-20) */}
                 <div className="absolute inset-0 z-20 flex flex-col justify-between px-[40px] pt-[30px] pb-[25px]">
                     
                     {/* Header: Title and Dismissal */}
                     <div className="flex justify-between items-start w-full">
                         <div className="flex flex-col gap-[2px]">
                             <span className="text-[#FAFAFA] font-[700] text-[18px] tracking-[0.2px] drop-shadow-lg">Black Mirror: Bandersnatch</span>
                             <span className="text-[#E0E0E0] font-[500] text-[15px] drop-shadow-lg opacity-90 italic">To select one, just tap on it.</span>
                         </div>
                         <div className="p-[5px] cursor-pointer hover:bg-white/10 rounded-full transition-colors active:scale-90 mt-[-5px] mr-[-10px]">
                             <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-[#FAFAFA] fill-transparent" style={{strokeWidth: '1.2px'}}>
                                  <line x1="4" y1="4" x2="20" y2="20"></line>
                                  <line x1="20" y1="4" x2="4" y2="20"></line>
                             </svg>
                         </div>
                     </div>

                     {/* Core Playback Nav Center */}
                     <div className="absolute inset-0 flex justify-center items-center gap-[95px] pointer-events-none">
                         <div className="pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-transform"><Rewind10Icon /></div>
                         <div className="pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mx-[10px]">
                              <div className="flex gap-[16px]">
                                  <div className="w-[11px] h-[40px] bg-[#FAFAFA] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></div>
                                  <div className="w-[11px] h-[40px] bg-[#FAFAFA] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></div>
                              </div>
                         </div>
                         <div className="pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-transform"><Forward10Icon /></div>
                     </div>

                     {/* Footer Settings Row */}
                     <div className="w-full flex justify-center">
                         <div className="flex items-center gap-[8px] cursor-pointer hover:opacity-80 active:scale-95 transition-all opacity-95">
                             <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-[#FAFAFA] drop-shadow-md">
                                 <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/>
                             </svg>
                             <span className="text-[#FAFAFA] font-[600] text-[15px] tracking-wide drop-shadow-md mt-[1px]">Audio &amp; Subtitles</span>
                         </div>
                     </div>

                 </div>
            </div>

        </div>
    );
}
