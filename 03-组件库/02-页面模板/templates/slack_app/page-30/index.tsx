import React from 'react';
import { X } from 'lucide-react';
import './style.css';

/**
 * @name Slack Onboarding - Magic Link Prompt
 */
export default function SlackApp() {

  // Sub-component for generating Magic Sparkles organically in the SVG space
  const Star = ({ cx, cy, scale, opacity = 1 }: { cx: number, cy: number, scale: number, opacity?: number }) => (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={opacity}>
       <path d="M 0 -8 Q 0 0, -8 0 Q 0 0, 0 8 Q 0 0, 8 0 Q 0 0, 0 -8 Z" fill="#FDE274" />
    </g>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#7C63C4] font-sans shadow-2xl relative select-none overflow-hidden">
      
      {/* 1. Transparent Global iOS Status Bar & Nav Layer */}
      <div className="w-full flex flex-col pt-3 z-30 absolute top-0 left-0 pointer-events-none">
        
        {/* iOS Top Meta */}
        <div className="flex justify-between items-center px-5 pb-2 text-[13px] font-medium tracking-tight text-white drop-shadow-sm">
          <div className="flex items-center">
            <span className="font-semibold text-[14px] tracking-wider ml-1 mt-px">7:43</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-1 -mt-px opacity-90" stroke="currentColor" strokeWidth="2.5">
                <path d="M 22 2 L 2 22 L 22 22 Z" stroke="none" fill="white" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 -mr-1.5">
            <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1" className="opacity-90">
                <rect x="1" y="16" width="3" height="4" rx="1" />
                <rect x="6" y="12" width="3" height="8" rx="1" />
                <rect x="11" y="8" width="3" height="12" rx="1" />
                <rect x="16" y="4" width="3" height="16" rx="1" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight">4G</span>
            <div className="relative transform scale-90 -mr-1 opacity-90">
                <svg width="24" height="12" viewBox="0 0 24 12" className="fill-none stroke-white stroke-[1.2px]">
                  <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                  <path d="M22.5 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                </svg>
                <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
            </div>
          </div>
        </div>

        {/* Back/Close Interaction Overlay */}
        <div className="w-full px-[14px] mt-2 pointer-events-auto">
           <div className="w-[36px] h-[36px] flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => window.history.back()}>
<X size={27} strokeWidth={1.4} className="text-white" />
           </div>
        </div>
      </div>

      {/* 2. Main Flex Content Canvas */}
      <div className="flex flex-col items-center justify-start flex-1 w-full px-6 relative z-10 pt-[22vh]">
         
         {/* Native Vector Composite: Envelope & Magic Wand */}
         <div className="relative w-[300px] h-[270px]">
            <svg viewBox="0 0 300 270" className="w-[300px] h-full absolute inset-0 z-10" xmlns="http://www.w3.org/2000/svg">
              
              {/* Elliptical Vector Floor Shadow */}
              <ellipse cx="145" cy="254" rx="108" ry="16" fill="rgba(0,0,0,0.18)" />

              <g transform="translate(0, 8)">
                 {/* Mail Envelope (Rendered Backwards for 2.5D intersection fix) */}
                 <g transform="translate(45, 100) rotate(-10)">
                    {/* Outline / Base Mask */}
                    <rect x="0" y="0" width="166" height="106" fill="#FFFFFF" rx="4" />
                    
                    {/* Shadow Flaps via Fill Logic (Z-Index equivalent handling) */}
                    <path d="M 0 0 L 0 106 L 166 106 L 166 0 L 83 58 Z" fill="#FFFFFF" stroke="#E4E4EB" strokeWidth="2.5" strokeLinejoin="round" />
                    
                    {/* Cross line for lower flap segments */}
                    <path d="M 0 106 L 83 58 L 166 106" fill="none" stroke="#E4E4EB" strokeWidth="2.5" strokeLinejoin="round" />
                    
                    {/* Top Closing Flap (Layered on Top) */}
                    <path d="M 0 0 L 83 62 L 166 0 Z" fill="#FFFFFF" stroke="#E4E4EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                 </g>

                 {/* Magic Wand Component */}
                 <g transform="translate(58, 55) rotate(10)">
                    {/* Black Handle Stick */}
                    <rect x="22" y="0" width="144" height="15" fill="#1D1C1D" rx="2" />
                    {/* White Wand Head */}
                    <rect x="0" y="0" width="22" height="15" fill="#FFFFFF" rx="2.5" />
                    {/* Magic Band Seam Ring */}
                    <rect x="22" y="0" width="5.5" height="15" fill="#C7C7CC" />
                 </g>

                 {/* Procedural Golden Dust & Star Sparkles */}
                 <g>
                    {/* Primary Star Eruptions */}
                    <Star cx="50" cy="40" scale="1.45" />
                    <Star cx="30" cy="70" scale="0.9" opacity={0.9} />
                    <Star cx="95" cy="45" scale="1.05" />
                    <Star cx="110" cy="80" scale="1.25" />
                    
                    {/* Background Soft Stars */}
                    <Star cx="40" cy="25" scale="0.65" opacity={0.8} />
                    <Star cx="80" cy="25" scale="0.75" opacity={0.9} />
                    <Star cx="65" cy="85" scale="0.55" opacity={0.7} />
                    <Star cx="125" cy="35" scale="0.6" opacity={0.85} />
                    <Star cx="15px" cy="85px" scale="0.4" opacity={0.6} />

                    {/* Ambient Glow Particles */}
                    <circle cx="45" cy="60" r="1.8" fill="#FDE274" opacity={0.9} />
                    <circle cx="85" cy="35" r="2.2" fill="#FCE588" />
                    <circle cx="100" cy="65" r="1.5" fill="#FDE274" opacity="0.8" />
                    <circle cx="55" cy="85" r="1.8" fill="#FDE274" />
                    <circle cx="25" cy="45" r="1.5" fill="#FCE588" opacity={0.7} />
                 </g>
              </g>
            </svg>
         </div>

         {/* Hero Topography Block */}
         <div className="w-full text-center flex flex-col items-center z-20 mt-[20px]">
             
             <h1 className="text-white text-[25px] font-[800] tracking-tight mb-[14px]">
                 Want to skip the typing?
             </h1>
             
             <p className="text-white text-[16px] leading-[1.3] text-center opacity-[0.98] tracking-tight w-full max-w-[320px]">
                We can email you a magic sign-in link that adds all your workspaces at once!
             </p>
             
         </div>
      </div>

      {/* 3. Action Buttons Registration Layer (Fixed to iOS Safe Area) */}
      <div className="absolute bottom-[44px] left-0 w-full flex flex-col gap-[14px] px-[18px] z-20">
          <button onClick={() => window.location.hash = 'page=page-01'} className="w-full bg-white hover:bg-white/95 active:bg-white/80 text-[#7C63C4] font-[700] text-[16px] py-[15px] rounded-[6px] tracking-wide transition-colors">
              Email me a magic link
          </button>
          
          <button onClick={() => window.location.hash = 'page=page-04'} className="w-full bg-transparent active:bg-black/10 text-white font-[600] text-[16px] py-[14px] rounded-[6px] tracking-wide border-[1px] border-white transition-colors">
              I'll sign in manually
          </button>
      </div>

      {/* Standard iOS Home Indicator Line */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/80 rounded-full z-40 pointer-events-none drop-shadow-sm"></div>

    </div>
  );
}
