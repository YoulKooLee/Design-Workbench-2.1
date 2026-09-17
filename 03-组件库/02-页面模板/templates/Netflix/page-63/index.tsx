import React from 'react';
import './style.css';

/**
 * OS Status Bar Node
 */
const StatusBar = () => (
    <div className="absolute top-0 w-full h-[44px] px-[22px] flex justify-between items-center z-[120] pointer-events-none">
        <span className="text-white text-[15px] font-[600] tracking-tight ml-[2px] antialiased">2:54</span>
        <div className="flex items-center gap-[6px]">
            <div className="flex items-end gap-[1.5px] h-[10.5px]">
                <div className="w-[3px] h-[4.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[6.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[8.5px] bg-white rounded-[1px]"></div>
                <div className="w-[3px] h-[10.5px] bg-white rounded-[1px]"></div>
            </div>
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-white mb-[1px]">
                <path d="M12 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-6c-2-2.2-5.1-3.6-8-3.6s-6 1.4-8 3.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4c2.4-2.6 6.1-4.2 9.4-4.2s7 1.6 9.4 4.2c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0zm4-4.7c-3.1-3.4-7.6-5.5-12-5.5S3.1 6.9 0 10.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 2.7-3 6.6-4.9 10.6-4.9s7.9 1.9 10.6 4.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4z"/>
            </svg>
            <div className="w-[23.5px] h-[11.5px] border border-white/85 rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="w-[85%] h-full bg-white rounded-[1.5px]"></div>
                <div className="absolute right-[-3px] w-[2px] h-[4px] bg-white/85 rounded-[2px]"></div>
            </div>
        </div>
    </div>
);


/**
 * OS Autofill Passwords Bridge
 */
const AutofillExtensionBar = () => (
    <div className="w-full h-[45px] bg-[#D1D4D9] border-t-[1px] border-b-[1px] border-[#B7BBxC0] flex justify-center items-center relative shadow-[0_1px_1px_rgba(0,0,0,0.05)] border-t-[#B7BAC0] border-b-[#B7BAC0] z-[120]">
        
        {/* Subtle separator guidelines indicating touch zones */}
        <div className="absolute left-[12%] h-[60%] border-l border-[#B7BAC0]"></div>
        <div className="absolute right-[12%] h-[60%] border-l border-[#B7BAC0]"></div>
        
        {/* Interactive Injection Target */}
        <div className="flex items-center gap-[6px] cursor-pointer hover:opacity-60 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#0B0B0B]">
                <circle cx="12" cy="7" r="3.5" />
                <path d="M11 10.2V21h3v-3h3v-3h-3v-4.8c-1-.26-1.84-.86-2.45-1.65L11 10.2z" />
            </svg>
            <span className="text-[#0B0B0B] text-[17px] font-[400] antialiased tracking-wide pt-[1px]">Passwords</span>
        </div>
    </div>
);


/**
 * iOS Numeric/Symbolic OS Keyboard Override 
 * Matrix exactly maps '123' symbol layout for password logic contexts.
 */
const IOSNumericalKeyboard = () => (
    <div className="w-full bg-[#D1D4D9] flex flex-col pt-[8px] select-none z-[120]">
        
        {/* Row 1 - Numerics */}
        <div className="flex justify-center gap-[6px] px-[3px] mb-[12px] w-full">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors cursor-default">
                    <span className="text-black text-[23px] font-[400] pb-[2px] leading-none antialiased">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Row 2 - Primary Symbols */}
        <div className="flex justify-center gap-[6px] px-[3px] mb-[12px] w-full">
            {['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'].map(k => (
                <div key={k} className="flex-1 min-w-[28px] max-w-[34px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors cursor-default">
                    <span className="text-black text-[20px] font-[400] pb-[2px] leading-none antialiased">{k}</span>
                </div>
            ))}
        </div>
        
        {/* Row 3 - Secondary Symbols & Operational */}
        <div className="flex justify-between items-center px-[3px] mb-[12px] w-full gap-[6px]">
            {/* Alt Symbol Toggle */}
            <div className="w-[43px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-gray-400 transition-colors">
                <span className="text-black text-[15.5px] font-[400] tracking-wide antialiased">#+=</span>
            </div>
            
            {/* Punctuation Chunk */}
            <div className="flex-1 flex justify-center gap-[6px] max-w-[240px]">
                {['.', ',', '?', '!', '\''].map(k => (
                    <div key={k} className="flex-1 min-w-[32px] max-w-[42px] h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-[#D1D4D9] transition-colors cursor-default">
                        <span className="text-black text-[22px] font-[400] pb-[2px] leading-none antialiased">{k}</span>
                    </div>
                ))}
            </div>

            {/* Backspace Logic Hook */}
            <div className="w-[48px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-gray-400 transition-colors">
                 <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-transparent stroke-black stroke-[1.8px]">
                     <path d="M21 5H9.5L2 12l7.5 7H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" strokeLinejoin="miter" strokeLinecap="square" />
                     <line x1="10" y1="9" x2="16" y2="15" strokeLinecap="round" />
                     <line x1="16" y1="9" x2="10" y2="15" strokeLinecap="round" />
                 </svg>
            </div>
        </div>

        {/* Row 4 - Alpha Revert & Submit Vector */}
        <div className="flex justify-between gap-[6px] px-[3px] w-full">
            <div className="w-[90px] h-[42px] bg-[#B3B8C1] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center shrink-0 active:bg-gray-400 transition-colors">
                <span className="text-black text-[16px] font-[400] tracking-wide antialiased">ABC</span>
            </div>
            
            <div className="flex-1 h-[42px] bg-[#FCFCFC] rounded-[5px] shadow-[0_1px_0_rgba(136,138,142,1)] flex justify-center items-center active:bg-[#D1D4D9] transition-colors cursor-default">
                <span className="text-black text-[16.5px] font-[400] tracking-wide antialiased mb-[1px]">space</span>
            </div>

            <div className="w-[90px] h-[42px] bg-[#AEB4BE] rounded-[5px] shadow-[0_1px_0_rgba(96,110,126,1)] flex justify-center items-center shrink-0 active:bg-gray-400 transition-colors">
                <span className="text-black text-[16px] font-[400] tracking-wide antialiased">return</span>
            </div>
        </div>

        {/* Minimal Context Base Zone (No Globe/Mic verified per reference 063.png layer) */}
        <div className="w-full relative h-[60px] mt-[8px]">
            <div className="absolute bottom-[8px] w-[135px] h-[5px] bg-[#000000] rounded-full left-1/2 -translate-x-1/2"></div>
        </div>
    </div>
);


/**
 * Netflix Native Render Activity Spinner
 */
const NetflixLoadingSpinner = () => (
    <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] animate-[spin_1.2s_linear_infinite] absolute inset-0 m-auto z-10 pointer-events-none">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <line
                key={deg}
                x1="12" y1="3" x2="12" y2="7.5"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${deg} 12 12)`}
                opacity={0.15 + (i * 0.07)} // Geometric radial fade
            />
        ))}
    </svg>
);


/**
 * @name Netflix Sign In Flow / Active Submitting State - Page 63
 * Standard Authentication overlay intercept framework handling network loading block mode.
 */
export default function NetflixAuthenticationState() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto relative select-none font-sans bg-[#0E0E0E] overflow-hidden">
            
            <StatusBar />

            {/* Top Security & Escape Shell */}
            <div className="absolute top-[44px] w-full flex justify-between items-center px-[22px] h-[44px] z-[50]">
                {/* Visual Back Hook */}
                <div className="w-[50px] flex items-center justify-start cursor-pointer hover:opacity-70 transition-opacity">
                    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-transparent stroke-white stroke-[2.2px] stroke-linecap-round stroke-linejoin-round transform -translate-x-1">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </div>
                
                {/* Brand Axis (Netflix Text Logo Approximation Synced with Page 01) */}
                <span 
                    className="text-[#E50914] font-[900] text-[28px] tracking-[-1px] transform scale-y-[1.1] absolute left-1/2 -translate-x-1/2"
                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                    NETFLIX
                </span>
                
                {/* Secondary Support Link */}
                <div className="w-[50px] flex justify-end cursor-pointer active:opacity-50">
                    <span className="text-[#FFFFFF] text-[16px] font-[600] tracking-tight hover:underline transition-all antialiased">Help</span>
                </div>
            </div>

            {/* 
              AUTHENTICATION INPUT FORM LAYER 
              Global block opacity suppresses contrast indicating network block out logic mapping
              identically to the reference composite without polluting Z-index stacks.
            */}
            <div className="flex-1 w-full flex flex-col items-center pt-[175px] opacity-[0.35] pointer-events-none transition-opacity">
                
                {/* Payload 1: Identifier */}
                <div className="w-[85%] max-w-[340px] h-[55px] bg-[#333333] rounded-[4px] px-[16px] flex flex-col justify-center relative shadow-sm">
                    {/* Material Logic Floating Label Effect */}
                    <span className="text-[#8C8C8C] text-[12.5px] font-[400] absolute top-[8px] transform origin-left antialiased">
                        Email or phone number
                    </span>
                    
                    {/* Raw Value with Native OS OS-Spellcheck Simulation */}
                    <div className="flex items-center w-full mt-[18px]">
                        <span className="text-white text-[16px] font-[400] antialiased tracking-wide">
                            jiho@
                        </span>
                        {/* OS Red Squiggly Error Hook Vector */}
                        <span className="text-white text-[16px] font-[400] underline decoration-[#ff3b30] decoration-wavy underline-offset-[3px] decoration-[1.5px] antialiased tracking-wide">
                            mobbin
                        </span>
                        <span className="text-white text-[16px] font-[400] antialiased tracking-wide">
                            .design
                        </span>
                    </div>
                </div>

                {/* Payload 2: Access Token */}
                <div className="w-[85%] max-w-[340px] h-[55px] bg-[#333333] rounded-[4px] px-[16px] flex flex-col justify-center relative shadow-sm mt-[20px]">
                    <span className="text-[#8C8C8C] text-[12.5px] font-[400] absolute top-[8px] transform origin-left antialiased">
                        Password
                    </span>
                    
                    <div className="flex items-center w-full mt-[16px]">
                        {/* Secure Mask Character Generator */}
                        <span className="text-white text-[20px] font-[800] tracking-[0.1em] antialiased leading-none pt-[5px]">
                            ••••••••••
                        </span>
                        {/* CSS Active Context Blinking Caret */}
                        <div className="w-[1.5px] h-[22px] bg-[#3384FF] ml-[2px] animate-pulse mt-[4px]"></div>
                    </div>
                    
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#9A9A9A] text-[14px] font-[600] tracking-[0.05em] antialiased pt-[2px] cursor-pointer hover:text-white transition-colors">
                        SHOW
                    </span>
                </div>

                {/* Action Submit Dispatch Button */}
                <div className="w-[85%] max-w-[340px] h-[50px] bg-[#E50914] rounded-[4px] mt-[25px] flex justify-center items-center relative overflow-hidden transition-all rounded-[3.5px]">
                    {/* Shadow Layer Ghost Text */}
                    <span className="text-[#FFFFFF] text-[17px] font-[600] tracking-wide antialiased opacity-[0.35]">
                        Sign In
                    </span>
                    {/* The Intercept Radial Renderer */}
                    <NetflixLoadingSpinner />
                </div>

            </div>

            {/* Native Environment Intrusion Boundary */}
            <div className="absolute bottom-0 w-full flex flex-col z-[100]">
                <AutofillExtensionBar />
                <IOSNumericalKeyboard />
            </div>

        </div>
    );
}
