import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './style.css';

/**
 * @name Slack Onboarding - Check Your Email
 */
export default function SlackApp() {

  // Core SVG component reproducing the intricate colored Hash Brand Logo
  const SlackBrandLogo = ({className="w-[28px] h-[28px]"}) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
       <path d="M10,40 a15,15 0 0 0 15,15 h15 a15,15 0 0 0 0,-30 h-15 a15,15 0 0 0 -15,15 z" fill="#E01E5A" />
       <circle cx="25" cy="25" r="15" fill="#E01E5A" />
       
       <path d="M60,10 a15,15 0 0 0 -15,15 v15 a15,15 0 0 0 30,0 v-15 a15,15 0 0 0 -15,-15 z" fill="#36C5F0" />
       <circle cx="75" cy="25" r="15" fill="#36C5F0" />
       
       <path d="M90,60 a15,15 0 0 0 -15,-15 h-15 a15,15 0 0 0 0,30 h15 a15,15 0 0 0 15,-15 z" fill="#2EB67D" />
       <circle cx="75" cy="75" r="15" fill="#2EB67D" />
       
       <path d="M40,90 a15,15 0 0 0 15,-15 v-15 a15,15 0 0 0 -30,0 v15 a15,15 0 0 0 15,15 z" fill="#ECB22E" />
       <circle cx="25" cy="75" r="15" fill="#ECB22E" />
    </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#7D64C3] font-sans shadow-2xl relative select-none overflow-hidden">
      
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

        {/* Back Interaction Overlay */}
        <div className="w-full px-4 mt-2 pointer-events-auto">
           <div className="w-[36px] h-[36px] flex items-center justify-center -ml-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => window.history.back()}>
<ArrowLeft size={26} strokeWidth={2.2} className="text-white" />
           </div>
        </div>
      </div>

      {/* 2. Main Flex Content Canvas */}
      <div className="flex flex-col items-center justify-center flex-1 w-full px-6 relative z-10 -mt-[4vh]">
         
         {/* Paper Airplane Construct */}
         <div className="relative w-[300px] h-[220px] -ml-[25px]">
            
            {/* Aerodynamic Motion Tail (Faked volumetric glow tail) */}
            <div className="absolute top-[80px] left-[-30px] w-[200px] h-[130px] bg-white/[0.15] blur-[24px] rounded-full rotate-[25deg] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[30px] left-[-60px] w-[240px] h-[120px] bg-white/[0.08] blur-[36px] rounded-[100%] rotate-[-10deg] pointer-events-none mix-blend-screen" />
            
            {/* Pure SVG Body Architecture */}
            <svg viewBox="0 0 120 100" className="w-[300px] h-full absolute inset-0 z-10" style={{filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15))'}}>
               {/* Left Core Wing */}
               <polygon points="10,40 100,20 50,50" fill="#FFFFFF" />
               {/* Under Fin Shadow Drop */}
               <polygon points="10,40 50,50 50,70" fill="#E4E4EB" />
               {/* Right Highlight Wing */}
               <polygon points="100,20 80,55 50,50" fill="#F4F4F8" />
               {/* Accent Seam Spine */}
               <line x1="10" y1="40" x2="50" y2="50" stroke="#EFEFF4" strokeWidth="0.5" />
            </svg>
            
            {/* Decal Injection (Slack Brand mapped through affine transforms to fix onto right wing) */}
            <div className="absolute z-20 w-[24px] h-[24px] top-[40%] right-[31%] transform rotate-[6deg] skew-y-[18deg] skew-x-[-12deg] scale-y-90 drop-shadow-sm opacity-95">
               <SlackBrandLogo className="w-full h-full" />
            </div>
            
         </div>

         {/* Landing Topography */}
         <div className="w-full text-center flex flex-col items-center z-20 mt-[26px]">
             
             <h1 className="text-white text-[27px] font-[800] tracking-tight mb-[14px]">
                 Check your email!
             </h1>
             
             <p className="text-white text-[16px] leading-[1.3] text-center opacity-[0.98] tracking-tight w-full max-w-[320px]">
                To confirm your email address, tap the button in<br/>
                the email we sent to <span className="font-[600]">huang_hai_tao@yeah.net</span>.
             </p>
             
             <button onClick={() => window.location.hash = 'page=page-30'} className="mt-[32px] bg-black/15 hover:bg-black/25 active:bg-black/40 text-white font-[600] text-[15.5px] px-[20px] py-[13.5px] rounded-[6px] w-auto inline-flex items-center justify-center transition-colors">
                 Open Email App
             </button>

         </div>
      </div>

      {/* 3. Static Footer Registration Layer */}
      <div className="absolute bottom-[44px] w-full flex flex-col items-center justify-center z-20">
          <span className="text-white text-[15.5px] tracking-tight opacity-95">Already have an account?</span>
          <span className="text-white text-[15.5px] font-[600] tracking-tight underline mt-[8px] cursor-pointer hover:opacity-80 transition-opacity decoration-white/80 underline-offset-2">Use password to sign in</span>
      </div>

      {/* Standard iOS Home Indicator Line */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/80 rounded-full z-40 pointer-events-none drop-shadow-sm"></div>

    </div>
  );
}
