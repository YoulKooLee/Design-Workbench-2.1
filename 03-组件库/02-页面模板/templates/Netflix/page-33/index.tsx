import React from 'react';
import './style.css';

/**
 * @name Netflix Onboarding First Screen (Page 33)
 */
export default function NetflixApp() {

  // Pure CSS/SVG Reconstruction of the Native Onboarding 4:3 TV Illustration
  const TvGraphic = (
      <svg viewBox="0 0 240 200" className="w-[85%] max-w-[320px] h-auto mx-auto mt-[40px] mb-[50px] drop-shadow-md">
          
          {/* Support Legs (Drawn on Z-0 to tuck cleanly behind the main frame) */}
          <path d="M50,148 L35,182 L48,182 L60,148" fill="#000000" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <path d="M190,148 L205,182 L192,182 L180,148" fill="#000000" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />

          {/* Exterior Hardware Frame Array */}
          <rect x="25" y="25" width="190" height="120" rx="4.5" fill="#000000" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Software Screen Viewport Bounds (Clipping Mask) */}
          <clipPath id="tv-clip-bounds">
              <rect x="26.5" y="26.5" width="187" height="117" rx="3" />
          </clipPath>

          <g clipPath="url(#tv-clip-bounds)">
              
              {/* Background is implicitly #000000 from the App Container */}

              {/* Minimalist Cloud Artifact */}
              {/* Modeled via quadratic sequences resolving to a completely flat structural horizon on y=55 */}
              <path 
                  d="M45,55 C45,45 55,42 60,48 C65,40 75,40 80,48 C85,45 95,48 95,55 Z" 
                  fill="#000000" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"
              />
              
              {/* Setting Sun Environment Sphere */}
              <circle cx="160" cy="50" r="10" fill="#F0B52B" />

              {/* == Monolithic Mountain Body == */}
              {/* The peaks merge seamlessly into a single #E50914 (Brand Red) block instance */}
              
              {/* Dominant Center Apex */}
              <path d="M70,120 L130,40 L190,120 Z" fill="#E50914" />
              <path d="M130,40 L145,60 L135,66 L130,60 L120,66 L115,60 Z" fill="#FFFFFF" />

              {/* Sub-Summit Foreground (Left) */}
              <path d="M30,120 L75,70 L120,120 Z" fill="#E50914" />
              <path d="M75,70 L85,82 L78,86 L75,82 L68,86 L65,82 Z" fill="#FFFFFF" />

              {/* Sub-Summit Foreground (Right) */}
              <path d="M140,120 L185,65 L230,120 Z" fill="#E50914" />
              <path d="M185,65 L195,80 L188,84 L185,80 L178,84 L175,80 Z" fill="#FFFFFF" />

              {/* == Kinetic Water Boundary == */}
              {/* Exact continuous bezier sine-wave replication. Sequence matches amplitude tracking. */}
              <path 
                  d="M20,115 Q30,105 40,115 T60,115 T80,115 T100,115 T120,115 T140,115 T160,115 T180,115 T200,115 T220,115 L230,135 L20,135 Z" 
                  fill="#3EC3C1" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" 
              />
          </g>
      </svg>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#000000] text-white font-sans relative select-none">
      
      {/* 1. Global iOS Device Sensor Emulation */}
      <div className="w-full absolute top-0 z-50 pointer-events-none">
          <div className="flex justify-between items-center px-[28px] pt-[8px] pb-[6px] relative">
             <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:53</span>
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
      </div>

      {/* 2. Primary Modal Interaction Domain (Logo & Help Array) */}
      <div className="flex justify-center items-center mt-[55px] mb-[10px] relative w-full h-[40px] pointer-events-auto">
          {/* Text-driven brand replica holding space cleanly avoiding heavy remote vectors */}
          <div className="text-[#E50914] font-['Arial',sans-serif] font-[900] text-[34px] transform scale-y-[1.3] scale-x-[0.85] tracking-[-1.5px] absolute top-[2px] cursor-pointer">
              NETFLIX
          </div>
          {/* High-contrast Utility Interaction Point */}
          <div className="absolute right-[22px] top-[14px] cursor-pointer active:opacity-60 transition-opacity">
              <span className="text-[#FAFAFA] font-[700] text-[15.5px] tracking-tight">Help</span>
          </div>
      </div>

      {/* 3. Volumetric Vector Rendering Surface */}
      {TvGraphic}

      {/* 4. Cognitive Payload (Value Proposition Typography) */}
      <div className="flex-1 px-4 cursor-default">
          <h1 className="text-white text-[32px] font-[700] leading-[1.2] text-center tracking-[0.2px]">
              Watch on<br/>any device
          </h1>
          
          <p className="text-[#F5F5F5] text-[18px] font-[400] text-center mt-[16px] px-[20px] leading-[1.38] tracking-[-0.2px]">
              Stream on your phone, tablet,<br/>laptop, and TV without paying<br/>more.
          </p>
      </div>

      {/* 5. State Machine Indicator (Onboarding Sequence Map) */}
      <div className="flex justify-center items-center gap-[10px] mb-[26px] mt-auto relative z-20 pointer-events-none">
          <div className="w-[8px] h-[8px] rounded-full bg-[#E50914] shadow-[0_0_8px_rgba(229,9,20,0.4)]"></div>
          <div className="w-[8px] h-[8px] rounded-full bg-[#3D3D3D]"></div>
          <div className="w-[8px] h-[8px] rounded-full bg-[#3D3D3D]"></div>
          <div className="w-[8px] h-[8px] rounded-full bg-[#3D3D3D]"></div>
      </div>

      {/* 6. Hardware Escapement Plane (Primary Call To Action + OS Safe Bounds) */}
      <div className="w-full pointer-events-auto z-10 flex flex-col items-center">
          {/* Flush edge-to-edge interaction gateway */}
          <button className="w-full bg-[#E50914] text-[#FAFAFA] py-[16.5px] text-[15.5px] font-[400] tracking-[0.6px] active:scale-[0.98] transition-transform hover:bg-[#F21A25]">
              SIGN IN
          </button>
          
          {/* Local Area Home Indicator Safe Anchor Zone */}
          <div className="w-full h-[32px] bg-black flex justify-center items-center relative z-20 pointer-events-none">
              <div className="w-[134px] h-[5px] bg-[#FFFFFF] rounded-full mt-[4px]"></div>
          </div>
      </div>

    </div>
  );
}
