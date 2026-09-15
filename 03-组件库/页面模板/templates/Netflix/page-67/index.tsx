import React from 'react';
import './style.css';

/**
 * Validated iOS Status Bar (Light Mode Payload)
 * Utilizing strict dark-rendered vectors to maintain contrast on absolute white #FFFFFF background.
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-[#0E0E0E] text-[15px] font-[600] tracking-tight ml-[2px] antialiased">1:31</span>
        
        <div className="flex items-center gap-[6px]">
            {/* Array: Cellular Connectivity Node */}
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-[#0E0E0E] rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-[#0E0E0E] rounded-[1px]"></div>
            </div>
            
            {/* Vector: WiFi Signal Node */}
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-[#0E0E0E] mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            
            {/* Box: Battery Power Payload */}
            <div className="w-[23.5px] h-[11.5px] border border-[#0E0E0E]/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-[#0E0E0E] rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-[#0E0E0E] rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * @name Entale Podcast Media Unit (Page 67)
 * Executes the standalone audio scrubber timeline variant UI with explicit non-standard tracking.
 */
export default function ExternalPodcastOnboardingScreen() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#FFFFFF] overflow-hidden">
            
            <StatusBar />

            {/* 
              Typographic Hero Hook 
              Preserving structural font cadence from previous screen (Page 66) using system Serif.
            */}
            <div className="w-full pt-[240px] flex justify-center z-10 px-[20px]">
                 <h1 
                    className="text-center text-[#1C1D1E] text-[36px] font-[400] leading-[1.0] tracking-[-0.01em] antialiased" 
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                 >
                     This is a podcast
                 </h1>
            </div>

            {/* 
              Dynamic Audio Engine Player Canvas
              Centers the master playback unit directly beneath the typographic anchor.
            */}
            <div className="w-full flex justify-center mt-[120px]">
                 
                 {/* 
                   Core Player Base Plate
                   Mirrors the "Teal/Green" UI geometry. Heavy luminescent drop shadow matches hue.
                 */}
                 <div className="w-[88%] max-w-[340px] h-[85px] bg-[#4EC7A7] rounded-[10px] shadow-[0_12px_30px_rgba(78,199,167,0.38)] flex items-center px-[22px] relative z-[25]">
                     
                     {/* Hardware Pause Trigger (Static) */}
                     <div className="flex gap-[6px] items-center cursor-pointer active:scale-95 transition-transform flex-shrink-0">
                         <div className="w-[7px] h-[24px] bg-[#3B9E87] rounded-[0.5px]"></div>
                         <div className="w-[7px] h-[24px] bg-[#3B9E87] rounded-[0.5px]"></div>
                     </div>
                     
                     {/* 
                       Tape-Measure Scrubber Interface
                       Deviates from standard sliders: the played area is empty/card background, 
                       and the slider thumb acts as a "pull head" for the remaining track!
                     */}
                     <div className="flex-1 ml-[18px] mr-[16px] relative h-[32px] flex items-center cursor-pointer">
                         
                         {/* Static Remaining Unplayed Tape Line */}
                         <div className="absolute left-[18%] right-0 h-[8px] bg-[#3B9E87] rounded-[2px] top-1/2 -translate-y-1/2 pointer-events-none"></div>
                         
                         {/* 
                           Active Transport Scrub Head 
                           Mated composite of the circular slider thumb and trailing white plastic "hook" 
                           connector, creating the illusion of dragging the tape out.
                         */}
                         <div className="absolute left-[18%] transform -translate-x-[50%] flex items-center h-full hover:scale-105 active:scale-[0.95] transition-transform">
                             
                             {/* Tape Connector Hook (offset overlaps thumb center preventing rendering gap) */}
                             <div className="w-[12px] h-[14px] bg-[#FFFFFF] rounded-l-[1px] translate-x-[6px] relative z-[5]"></div>
                             
                             {/* Thumb Sphere */}
                             <div className="w-[28px] h-[28px] bg-[#FFFFFF] rounded-full shadow-[0_4px_12px_rgba(20,85,70,0.3)] relative z-[10] border-[0.5px] border-[#3B9E87]/10"></div>
                         </div>

                     </div>

                     {/* Transport Playhead Timer String */}
                     <span className="text-[#FDFDFD] text-[13.5px] font-[700] tracking-widest flex-shrink-0 font-sans mt-[1px] text-right w-[42px] tabular-nums">
                         00:02
                     </span>
                     
                 </div>
            </div>

            {/* Apple Home Indicator Constraint Marker */}
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#0E0E0E] rounded-full left-1/2 -translate-x-1/2 z-[100]"></div>
        
        </div>
    );
}
