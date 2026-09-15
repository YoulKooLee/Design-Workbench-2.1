import '../style.css';
import React from 'react';

const TemplateThumbnail = ({ active, children, hideMarker = false }: { active: boolean, children: any, hideMarker?: boolean }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Structural bounding container determining active scaled padding */}
      <div className={`w-[58px] h-[78px] rounded-[4px] p-[2px] transition-all flex justify-center items-center ${active ? 'border-[1.5px] border-[#FDFDFD]' : 'border-none'}`}>
         {/* Underlying core aesthetic generative baseline graphic mapping */}
         <div className="w-full h-full rounded-[2px] overflow-hidden bg-gradient-to-br from-[#53BBEA] via-[#EBC1A3] to-[#EB5852] relative shadow-inner">
           {children}
           {/* Static internal branding text for mini representation */}
           <div className="absolute bottom-[3px] w-full flex justify-center pointer-events-none opacity-80">
              <span className="text-white text-[4px] font-[500] tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] px-2 whitespace-nowrap overflow-hidden">
                清言 一起AI画图吧
              </span>
           </div>
         </div>
      </div>
      
      {/* Indicator Node Mapping Check */}
      <div className="mt-[16px] h-[14px]">
        {active ? (
          <div className="w-[13px] h-[13px] bg-[#344DFB] rounded-full flex justify-center items-center shadow-[0_2px_4px_rgba(52,77,251,0.5)]">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        ) : (
          !hideMarker && <div className="w-[13px] h-[13px] rounded-full border-[1.5px] border-[#555555]" />
        )}
      </div>
    </div>
  )
}

const ZhipuAIImageViewerPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-black overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-2xl sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900 select-none">
      
      {/* ---------------- 1. ACTIONS HEADER (Z-50) ---------------- */}
      <div className="flex justify-between items-center px-[22px] pt-[54px] pb-[10px] w-full">
        {/* Terminate Flow Action */}
        <button className="p-2 -ml-2 active:opacity-60 transition-opacity">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Global Pipeline Interactions */}
        <div className="flex space-x-[14px]">
          {/* Transparent Share Button */}
          <button className="flex items-center space-x-[6px] px-[16px] h-[36px] bg-[#222222] rounded-full active:bg-[#333] transition-colors">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18v-5a3 3 0 0 1 3-3h7 M15 5l4 4-4 4"/>
             </svg> 
             <span className="text-[12.5px] text-[#FFFFFF] font-[500] tracking-wide relative top-[0.5px]">分享</span>
          </button>
          
          {/* Heavy Gradient Save Data Output */}
          <button className="flex items-center space-x-[6px] px-[16px] h-[36px] bg-[#4939FF] rounded-full active:opacity-80 transition-opacity shadow-[0_2px_12px_rgba(73,57,255,0.4)]">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3"/>
             </svg>
             <span className="text-[12.5px] text-[#FFFFFF] font-[500] tracking-wide relative top-[0.5px]">保存</span>
          </button>
        </div>
      </div>

      {/* ---------------- 2. MAIN GENERATIVE CANVAS DOMAIN ---------------- */}
      <div className="w-full px-[18px] mt-[12px] flex-1 flex flex-col justify-center">
        
        {/* Asset Bound Container Context | Emulating anime girl output styling natively via complex BG mapping */}
        <div className="w-full aspect-[3/4.2] bg-gradient-to-br from-[#77CAE7] via-[#DFE696] to-[#E9676A] rounded-[14px] relative overflow-hidden shadow-[0_4px_30px_rgba(255,255,255,0.06)]">
          {/* Scenic backdrop simulations (Sky, Sun flare, fields) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent z-0" />
          <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-[#3C4A11]/20 to-transparent mix-blend-multiply z-0" />

          {/* Draggable Layer Template 1: User Dynamic Text Customizer Box */}
          <div className="absolute top-[41%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[72%] z-30">
            <div className="relative border-[1px] border-dashed border-[#F3F3F3] py-[10px] px-[10px] flex justify-center items-center shadow-sm">
              
              {/* Hitbox Node: Top-Right Destroy Target */}
              <div className="absolute top-[-11px] right-[-11px] w-[22px] h-[22px] bg-[rgba(60,60,60,0.8)] rounded-full flex justify-center items-center backdrop-blur-md cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.6)] border border-[#444]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </div>

              {/* Hitbox Node: Bottom-Right Morph Bounds Tracker */}
              <div className="absolute bottom-[-11px] right-[-11px] w-[22px] h-[22px] bg-[rgba(60,60,60,0.8)] rounded-full flex justify-center items-center backdrop-blur-md cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.6)] border border-[#444]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"/></svg>
              </div>

              {/* Active User String Edit Line */}
              <span className="text-white text-[23px] font-[400] tracking-[0.06em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                藏韵清风，笑映晴空
              </span>
            </div>
          </div>

          {/* Decorative Template Assets Output Graphics */}
          {/* Flying book graphic left */}
          <div className="absolute bottom-[58px] left-[15px] z-[5]">
             <svg width="55" height="55" viewBox="0 0 100 100" className="opacity-95 transform -rotate-[16deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                <path d="M50 30 L 20 20 L 24 80 L 50 85 L 76 80 L 80 20 Z" fill="white" />
                <path d="M50 30 L 50 85" stroke="#DFE696" strokeWidth="4" />
                <path d="M20 20 L 50 30 L 80 20" stroke="#DFE696" strokeWidth="4" fill="none"/>
             </svg>
          </div>
          
          {/* Flying book graphic right */}
          <div className="absolute bottom-[80px] right-[10px] z-[5]">
             <svg width="45" height="45" viewBox="0 0 100 100" className="opacity-95 transform rotate-[24deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                <path d="M50 30 L 20 20 L 24 80 L 50 85 L 76 80 L 80 20 Z" fill="white" />
                <path d="M50 30 L 50 85" stroke="#77CAE7" strokeWidth="4" />
                <path d="M20 20 L 50 30 L 80 20" stroke="#77CAE7" strokeWidth="4" fill="none"/>
             </svg>
          </div>

          {/* Yellow torn paper left */}
          <div className="absolute bottom-[20px] left-[35px] z-[5]">
             <svg width="55" height="55" viewBox="0 0 100 100" className="opacity-95 transform -rotate-[22deg] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                <path d="M20 20 h 50 v 50 l -20 -10 l -30 20 Z" fill="#FFED7C" />
             </svg>
          </div>

          {/* Emulated Artistic Heavy Calligraphic Texts Generated by Tool */}
          <div className="absolute bottom-[80px] w-full flex flex-col items-center pointer-events-none z-[10] space-y-[-24px]">
             <h2 className="text-white text-[68px] leading-[1] font-[600] tracking-[-0.05em] italic transform -rotate-[14deg] drop-shadow-[0_4px_16px_rgba(30,20,10,0.45)] outline-white/20">
                全力以赴
             </h2>
             <h2 className="text-white text-[76px] leading-[1] font-[600] tracking-[-0.05em] italic transform -rotate-[6deg] relative right-[-10px] drop-shadow-[0_4px_16px_rgba(30,20,10,0.45)]">
                高考加油
             </h2>
          </div>

          {/* Integrated Platform Output Identity Brand Protection */}
          <div className="absolute bottom-0 w-full h-[54px] bg-gradient-to-t from-[rgba(65,80,250,0.85)] to-transparent flex items-end justify-center pb-[10px] z-20">
             <div className="flex items-center space-x-[4px] opacity-95">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                 <circle cx="12" cy="12" r="9"/>
                 <circle cx="12" cy="14" r="2.5" fill="white" stroke="none"/>
               </svg>
               <span className="text-white text-[11px] font-[400] tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ml-1">
                 清言 <span className="ml-[2px] opacity-80 text-[10.5px]">|</span> 一起AI画图吧
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* ---------------- 3. TEMPLATE POST-PRODUCTION PIPELINE ---------------- */}
      <div className="w-full pb-[35px] pt-[20px] px-[20px] shrink-0">
        <div className="flex justify-between items-center w-full">
          
          {/* Configuration Selection T1 (Active default) */}
          <TemplateThumbnail active={true} id={1}>
             <div className="absolute top-0 right-0 w-[15px] h-[15px] bg-[#344DFB]/30 rounded-bl-[10px]" />
          </TemplateThumbnail>

          {/* Configuration Selection T2 (Snow / Frost overlay visual mock) */}
          <TemplateThumbnail active={false} id={2}>
             <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent mix-blend-overlay" />
          </TemplateThumbnail>

          {/* Configuration Selection T3 (Edge Torn Vignette mock) */}
          <TemplateThumbnail active={false} id={3}>
             <div className="absolute inset-0 border-[2.5px] border-white/60 m-[1px] mix-blend-overlay" />
          </TemplateThumbnail>

          {/* Configuration Selection T4 (Yellow accent vector mock) */}
          <TemplateThumbnail active={false} id={4}>
             <div className="absolute -top-[10px] -right-[10px] w-[30px] h-[30px] bg-[#FFD75E]/80 rounded-full blur-[2px]" />
          </TemplateThumbnail>

          {/* Configuration Selection T5 (Dark border contrast vector mock) */}
          <TemplateThumbnail active={false} id={5}>
             <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[rgba(65,80,250,0.8)] to-transparent" />
          </TemplateThumbnail>

        </div>
      </div>

      {/* Hardware Standard Nav Spacer */}
      <div className="absolute bottom-[8px] w-full flex justify-center z-50 pointer-events-none">
        <div className="w-[134px] h-[5px] bg-[#FFFFFF] rounded-full opacity-90" />
      </div>

    </div>
  );
};

export default ZhipuAIImageViewerPage;
