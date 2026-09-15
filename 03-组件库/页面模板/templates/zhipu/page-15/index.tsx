import '../style.css';
import React from 'react';

const ZhipuAIViewPreviewPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-black overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ---------------- 1. ACTIONS HEADER (Z-50) ---------------- */}
      <div className="flex justify-between items-center px-[22px] pt-[56px] pb-[10px] w-full shrink-0">
        
        {/* Terminate Flow Action */}
        <button className="p-[4px] -ml-2 active:opacity-60 transition-opacity">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Global Pipeline Interactions */}
        <div className="flex space-x-[20px]">
          
          {/* Share Action */}
          <button className="active:opacity-60 transition-opacity p-[4px]">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18v-5a3 3 0 0 1 3-3h7 M15 5l4 4-4 4"/>
             </svg> 
          </button>
          
          {/* Save Action */}
          <button className="active:opacity-60 transition-opacity p-[4px] -mr-[4px]">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3"/>
             </svg>
          </button>
          
        </div>
      </div>

      {/* ---------------- 2. FULL WIDTH GENERATIVE CANVAS DOMAIN ---------------- */}
      <div className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden">
        
        {/* Edge-to-edge unrestricted container framing the image */}
        <div className="w-full aspect-[3/4.2] bg-gradient-to-br from-[#53BBEA] via-[#EBC1A3] to-[#EB5852] relative flex justify-center shadow-[0_0_80px_rgba(80,180,240,0.1)]">
          
          {/* Scenic backdrop simulations (Sky, Sun flares, Fields) */}
          <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-[#405615]/30 to-transparent mix-blend-multiply" />
          
          {/* Faux character mockup blocking purely to resemble structural density of the UI render */}
          <div className="absolute bottom-0 w-[80%] h-[70%] bg-gradient-to-t from-[#B03126] to-[#ED6858] rounded-t-full opacity-0"></div>

        </div>

      </div>

      {/* ---------------- 3. BOTTOM PIPELINE ACTION ROW ---------------- */}
      <div className="flex justify-between px-[50px] pt-[30px] pb-[44px] shrink-0 w-full">
        
        {/* Action 1: Ultra HD Export */}
        <div className="flex flex-col items-center cursor-pointer active:opacity-60 transition-opacity relative group">
           <div className="relative mb-[10px]">
              {/* 4K Box Custom Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-active:scale-95 transition-transform">
                 <rect x="2" y="5" width="20" height="14" rx="3" />
                 <text x="12" y="14" fill="white" stroke="none" fontSize="8" fontWeight="800" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.5">4K</text>
              </svg>
              {/* Overlapping Consumption Counter Badge */}
              <div className="absolute top-[-9px] right-[-14px] bg-[#FFDF74] text-[#111111] text-[10px] font-[600] px-[4px] py-[1px] rounded-[4px] border-[2px] border-black transform scale-[0.85] origin-bottom-left tracking-tighter shadow-sm z-10 whitespace-nowrap">
                 10次
              </div>
           </div>
           <span className="text-[11.5px] font-[400] text-white tracking-widest">超清下载</span>
        </div>

        {/* Action 2: Poster Template Flow */}
        <div className="flex flex-col items-center cursor-pointer active:opacity-60 transition-opacity group">
           <div className="mb-[10px]">
              {/* Picture Square Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-active:scale-95 transition-transform">
                 <rect x="3" y="3" width="18" height="18" rx="3" />
                 <circle cx="8.5" cy="8.5" r="1.5" />
                 <path d="M21 15l-5-5-11 11" />
              </svg>
           </div>
           <span className="text-[11.5px] font-[400] text-[#FFFFFF] tracking-widest relative right-[-1px]">海报</span>
        </div>

        {/* Action 3: Global AI Edit Flow */}
        <div className="flex flex-col items-center cursor-pointer active:opacity-60 transition-opacity relative group">
           <div className="mb-[10px] relative">
              {/* Dynamic Broken Border Icon For AI Wand Intersection */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-active:scale-95 transition-transform">
                 <path d="M11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
                 {/* Internal Text Asset */}
                 <text x="11.5" y="16.5" fill="white" stroke="none" fontSize="10.5" fontWeight="800" textAnchor="middle">Ai</text>
              </svg>
              {/* Floating Magic Wand Star Element */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[0px] right-[-2px]">
                 <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
              </svg>
           </div>
           <span className="text-[11.5px] font-[400] text-white tracking-widest relative right-[-1px]">AI编辑</span>
        </div>

      </div>

      {/* ---------------- 4. NATIVE SYSTEM HARDWARE SPACERS ---------------- */}
      
      {/* Home line base indicator */}
      <div className="absolute bottom-[8px] w-full flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-[#FFFFFF] rounded-full opacity-90" />
      </div>

    </div>
  );
};

export default ZhipuAIViewPreviewPage;
