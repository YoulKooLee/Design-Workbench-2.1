import '../style.css';
import React from 'react';

// Horizontal Tool Architecture
const FeaturedToolNode = ({ 
  title, 
  badgeColor, 
  gradFrom, 
  gradVia, 
  gradTo,
  children 
}: any) => (
  <div className="flex flex-col items-center flex-shrink-0 w-[84px] cursor-pointer group">
     <div className="w-[84px] h-[84px] relative flex justify-center items-end pb-[2px] transition-transform group-active:scale-95">
        {/* Arch shape containment */}
        <div className={`absolute bottom-0 w-full h-[76px] rounded-t-[42px] rounded-b-[4px] bg-gradient-to-br ${gradFrom} ${gradVia} ${gradTo} overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]`}>
          {/* Default base scenic mask logic */}
          <div className="w-full h-full opacity-60 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-white/30 to-transparent mix-blend-overlay" />
        </div>
        {/* External floating graphic boundaries to allow bleeding outside the arch */}
        <div className="relative w-full h-[84px]">
          {children}
        </div>
     </div>
     <div className={`mt-[6px] w-[78px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-[500] text-white ${badgeColor} tracking-wide shadow-sm`}>
        {title}
     </div>
  </div>
);

// Generation Reference Matrix Cards Structure
const InspirationCard = ({ children }: any) => (
  <div className="w-full bg-[#F6F7FA] rounded-[14px] overflow-hidden flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.02)] border-[1.5px] border-[#F2F4F7]">
    {/* Generative Payload Canvas */}
    <div className="w-full aspect-[3/4.2] relative overflow-hidden bg-[#E2E6EC]">
       {children}
    </div>
    {/* Interaction Dock */}
    <div className="w-full h-[46px] flex items-center justify-end px-3 bg-white">
       <button className="flex items-center space-x-[2px] px-[12px] py-[5px] bg-[#F1F2F4] rounded-full active:opacity-70 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#333]">
             <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" />
             <path d="M19 19L20 16L23 18L20 20L19 23L18 20L15 18L18 16L19 19Z" opacity="0.8"/>
          </svg>
          <span className="text-[11px] font-[400] text-[#222222] tracking-wider relative top-[0.5px]">画同款</span>
       </button>
    </div>
  </div>
);

const ZhipuAIDrawingDashboardPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white overflow-hidden sm:w-[390px] sm:h-[844px] sm:min-h-0 sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:mx-auto sm:my-8 sm:rounded-[40px] sm:border-[8px] sm:border-gray-900">
      
      {/* ---------------- STICKY HEADER BOUNDARY ---------------- */}
      <div className="flex justify-between items-center px-[18px] pt-[56px] pb-[10px] bg-white sticky top-0 z-50 shrink-0">
        <div className="flex items-center">
          <button className="mr-[12px] p-[2px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#120D54] via-[#352EB9] to-[#E55288]" />
            <svg viewBox="0 0 100 100" className="w-[18px] h-[18px] relative z-10" fill="none">
              <path d="M20 80 L80 20" stroke="#FFD854" strokeWidth="12" strokeLinecap="round" />
              <path d="M20 20 L80 80" stroke="#1CE4FF" strokeWidth="12" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="flex flex-col ml-[10px]">
            <span className="text-[14.5px] font-[600] text-[#1D2129] leading-[1.2] tracking-widest">AI画图</span>
            <span className="text-[10.5px] font-[400] text-[#A6ABB5] tracking-widest relative top-[1px]">来自: 智谱清言</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-[18px] text-[#222222]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="9" />
             <path d="M12 7v5l3 3" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M11 5L6 9H2v6h4l5 4V5z" />
             <path d="M22 9l-6 6 M16 9l6 6" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
             <circle cx="5" cy="12" r="2" />
             <circle cx="12" cy="12" r="2" />
             <circle cx="19" cy="12" r="2" />
          </svg>
        </div>
      </div>

      {/* ---------------- SCROLLABLE EXPLORE CONTENT ---------------- */}
      <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden relative pt-[8px] pb-[160px] scroll-smooth">
         
         {/* SECTION 1: Featured Toolbox */}
         <div className="w-full flex flex-col mb-[22px]">
            {/* Sec Title */}
            <div className="flex items-center px-[20px] mb-[12px]">
               <div className="w-[20px] h-[20px] bg-[#34A4FC] rounded-[5px] flex items-center justify-center mr-[8px]">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3L14 3L20 9L20 13L14 19L10 19L4 13L4 9L10 3Z" strokeWidth="2" fill="none" />
                    <path d="M7 6L17 16" strokeWidth="2" stroke="white" />
                 </svg>
               </div>
               <span className="text-[14.5px] font-[600] text-[#1D2129] tracking-widest relative top-[0.5px]">精选工具</span>
            </div>

            {/* Configured Interactive Horizontal Array */}
            <div className="flex space-x-[12px] px-[20px] overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x">
               
               <FeaturedToolNode title="海边派对" badgeColor="bg-[#F59858]" gradFrom="from-[#82BAE6]" gradVia="via-[#ED8952]" gradTo="to-[#A7634B]">
                  {/* Faux Beach setup bounding external arch bounds slightly */}
                  <div className="absolute top-[30px] left-[15px] w-[50px] h-[50px] bg-[#FCECD8] rounded-full blur-[2px]" />
                  <div className="text-[16px] absolute top-[5px] left-[-2px] transform -rotate-[20deg] drop-shadow-md z-10">🏐</div>
                  <div className="text-[42px] absolute bottom-[-4px] left-[14px]">🐶</div>
               </FeaturedToolNode>

               <FeaturedToolNode title="随便画画" badgeColor="bg-[#788899]" gradFrom="from-[#223447]" gradVia="via-[#3A5B74]" gradTo="to-[#203142]">
                  <div className="w-[60%] h-[70%] absolute top-[15%] left-[20%] border-[2px] border-[#DFB167] rounded-[4px] transform rotate-[15deg] flex justify-center items-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                     <span className="text-[#DEB265] text-[30px] font-[600] filter drop-shadow-[0_0_2px_#DFB167]">?</span>
                  </div>
                  <div className="text-[12.5px] absolute bottom-[2px] left-[4px] opacity-80">🎲</div>
               </FeaturedToolNode>

               <FeaturedToolNode title="今天吃啥" badgeColor="bg-[#C89B86]" gradFrom="from-[#CA9069]" gradVia="via-[#44231E]" gradTo="to-[#985338]">
                  <div className="absolute bottom-[2px] w-full flex justify-center">
                    <div className="w-[70px] h-[45px] bg-[#B04C2D] rounded-full scale-110 shadow-lg border-t-4 border-[#FFAE68]"></div>
                  </div>
                  <div className="text-[34px] absolute bottom-[-8px] left-[12px] filter grayscale-[0.2]">🍜</div>
                  <h3 className="text-white text-[30px] font-[600] absolute top-[-6px] right-[-6px] rotate-[15deg] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none text-[#FFF5E6]">?</h3>
               </FeaturedToolNode>

               <FeaturedToolNode title="精神状态" badgeColor="bg-[#6DCDE4]" gradFrom="from-[#FDFDFD]" gradVia="via-[#F6EBF8]" gradTo="to-[#D0E2EE]">
                  <div className="text-[32px] absolute top-[14px] left-[20px] opacity-20 filter blur-[2px]">🌸</div>
                  <div className="absolute w-[50px] h-[50px] top-[14px] left-[18px] bg-white rounded-full 
                      before:content-[''] before:absolute before:w-[15px] before:h-[20px] before:bg-white before:-top-4 before:left-0 before:rounded-t-full before:rotate-[-20deg]
                      after:content-[''] after:absolute after:w-[15px] after:h-[20px] after:bg-white after:-top-4 after:right-0 after:rounded-t-full after:rotate-[20deg] shadow-lg">
                    <div className="absolute top-[8px] right-[4px] w-[20px] h-[15px] bg-[#F25A86] rounded-full transform -rotate-[15deg]" />
                    <div className="absolute top-[22px] left-[14px] w-[5px] h-[6px] bg-black rounded-full" />
                    <div className="absolute top-[22px] right-[14px] w-[5px] h-[6px] bg-black rounded-full" />
                    <div className="absolute top-[28px] left-[22px] w-[6px] h-[4px] bg-[#FFD700] rounded-full" />
                  </div>
                  <div className="absolute bottom-0 w-full h-[30px] bg-gradient-to-t from-[#EDA6B5] to-transparent mix-blend-multiply" />
               </FeaturedToolNode>

               <FeaturedToolNode title="探索更多" badgeColor="bg-[#BBBBBB]" gradFrom="from-[#EDEDED]" gradVia="via-[#EEEEEE]" gradTo="to-[#E6E6E6]">
                  <div className="w-full h-full flex justify-center items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14"/></svg>
                  </div>
               </FeaturedToolNode>

            </div>
         </div>

         {/* SECTION 2: Global Inspiration Masonry Feed */}
         <div className="w-full flex flex-col px-[20px]">
            {/* Sec Title */}
            <div className="flex items-center mb-[14px]">
               <div className="w-[18px] h-[18px] bg-gradient-to-br from-[#4522B0] to-[#994AFF] rounded-full flex items-center justify-center mr-[8px]">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" className="transform -rotate-[15deg]">
                    <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" />
                 </svg>
               </div>
               <span className="text-[14.5px] font-[600] text-[#1D2129] tracking-widest relative top-[0.5px]">一键生同款</span>
            </div>

            {/* Inspiration Nodes Grid Matrix */}
            <div className="grid grid-cols-2 gap-[12px] w-full">
              
              {/* Primary Visual Block 1 (Fireworks structure logic emulation) */}
              <InspirationCard>
                 <div className="absolute inset-0 bg-[#162758] flex flex-col">
                    <div className="h-[65%] w-full relative">
                       {/* Stars */}
                       <div className="w-full h-full bg-[radial-gradient(1px_1px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_90px_40px,#fff,rgba(0,0,0,0))] opacity-80 z-0" />
                       {/* Fireworks */}
                       <div className="absolute top-[20%] left-[20%] w-[80px] h-[80px] bg-[radial-gradient(circle_at_center,theme(colors.pink.500),theme(colors.pink.600)/0)] mix-blend-screen animate-pulse" />
                       <div className="absolute top-[10%] right-[10%] w-[60px] h-[60px] bg-[radial-gradient(circle_at_center,theme(colors.pink.400),theme(colors.pink.600)/0)] mix-blend-screen" />
                    </div>
                    {/* Beach base geometry */}
                    <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#1F2E51] to-[#6777A3]">
                       <div className="absolute top-0 w-full h-[4px] bg-white opacity-40 blur-[1px]" />
                       <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
                       <div className="absolute bottom-[0px] w-full h-[30px] rounded-t-full bg-[#11162A]/60 scale-[2.0]" />
                    </div>
                 </div>
              </InspirationCard>

              {/* Primary Visual Block 2 (Ethnic girl from earlier prototypes logic) */}
              <InspirationCard>
                 <div className="absolute inset-0 bg-gradient-to-br from-[#7FCBEE] via-[#EAC2A6] to-[#EE5B54]">
                    <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/70 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-[#405615]/30 to-transparent mix-blend-multiply" />
                    <div className="absolute bottom-0 w-[80%] h-[70%] bg-gradient-to-t from-[#B03126] to-[#ED6858] rounded-t-full ml-[10%]" />
                 </div>
              </InspirationCard>

              {/* Secondary Visual Block 1 (Nature pathway) */}
              <InspirationCard>
                 <div className="absolute inset-0 bg-gradient-to-br from-[#7ED856] via-[#B4DF65] to-[#45A133]">
                    <div className="w-[40%] h-full mx-auto bg-[#42BAEA] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] relative">
                       {/* Butterfly */}
                       <div className="absolute right-[5px] top-[30px] w-[15px] h-[10px] bg-[#E16744] transform rotate-[15deg] rounded-bl-full rounded-tr-full"></div>
                    </div>
                    {/* Bridge */}
                    <div className="absolute bottom-[10px] w-[140%] -left-[20%] h-[20px] border-t-[8px] border-[#915B35] rounded-t-[50%] z-10" />
                 </div>
              </InspirationCard>

              {/* Secondary Visual Block 2 (Archway of flowers) */}
              <InspirationCard>
                 <div className="absolute inset-0 bg-gradient-to-br from-[#5D8436] to-[#AECB5C]">
                    <div className="w-[120%] h-[120%] ml-[-10%] mt-[-10%] border-[20px] border-[#EB94B3]/90 rounded-full border-dashed opacity-80 blur-[2px]" />
                    <div className="w-[110%] h-[110%] ml-[-5%] mt-[-5%] border-[10px] border-[#FFF8ED] rounded-full border-dashed opacity-80" />
                    {/* Pink balloon floats */}
                    <div className="absolute left-[20px] top-[40px] w-[14px] h-[16px] bg-[#F391AF] rounded-[10px_10px_14px_14px]" />
                 </div>
              </InspirationCard>

            </div>

         </div>
         
         {/* Intersecting Navigation Floater */}
         <div className="absolute right-[24px] bottom-[10px] w-[36px] h-[36px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-[#EDEDED] flex items-center justify-center cursor-pointer active:bg-gray-100 z-10 transition-transform hover:scale-105">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M6 9l6 6 6-6" />
           </svg>
         </div>

      </div>

      {/* ---------------- FIXED BOTTOM ANCHOR BLOCK (ACTIONS / TERMINAL) ---------------- */}
      <div className="absolute bottom-0 w-full left-0 bg-gradient-to-t from-[rgba(252,254,255,1)] to-[#FFFFFF] border-t border-[#F1F2F4] z-40 flex flex-col pt-[12px] pb-[8px]">
        
        {/* Row 1: Horizontal Actions Carousel Menu */}
        <div className="flex px-4 space-x-[8px] overflow-x-auto [&::-webkit-scrollbar]:hidden w-full pb-[12px] snap-x">
          
          <div className="relative shrink-0 flex items-center h-[34px] bg-[#F5F6F8] rounded-[10px] px-[12px] shadow-sm cursor-pointer snap-start">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[4px]"><path d="M21 4l-4 4 M16 4l4 4 M5 19L19 5 M5 16v3h3"/></svg>
             <span className="text-[12px] font-[500] text-[#111111] tracking-wide relative top-[0.5px]">AI特效</span>
             <div className="absolute top-[-5px] right-[-4px] bg-[#0CD782] text-white text-[8px] font-[600] px-[3px] py-[1px] rounded-tl-[6px] rounded-br-[6px] shadow-sm tracking-widest z-10">新</div>
          </div>

          <div className="shrink-0 flex items-center h-[34px] bg-[#F5F6F8] rounded-[10px] px-[12px] shadow-sm cursor-pointer snap-start">
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-[4px]"><path d="M12 20h9 M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"/></svg>
             <span className="text-[12px] font-[500] text-[#111111] tracking-wide relative top-[0.5px]">AI编辑</span>
          </div>

          <div className="shrink-0 flex items-center h-[34px] bg-[#F5F6F8] rounded-[10px] px-[14px] shadow-sm cursor-pointer snap-start">
             <span className="text-[12px] font-[400] text-[#111111] tracking-wide relative top-[0.5px]">风格</span>
          </div>

          <div className="shrink-0 flex items-center h-[34px] bg-[#F5F6F8] rounded-[10px] px-[14px] shadow-sm cursor-pointer snap-start">
             <span className="text-[12px] font-[400] text-[#111] tracking-wide relative top-[0.5px]">比例1:1</span>
          </div>

          <div className="shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-[#F5F6F8] rounded-[10px] shadow-sm cursor-pointer snap-start">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>

          <div className="shrink-0 flex items-center justify-center w-[34px] h-[34px] bg-[#F5F6F8] rounded-[10px] shadow-sm cursor-pointer snap-start">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"/></svg>
          </div>
        </div>

        {/* Row 2: Deep Input Terminal */}
        <div className="px-4 pb-[8px]">
          <div className="w-full h-[48px] bg-[#FCFDFE] rounded-[24px] flex items-center px-[6px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#EDEDED]">
            
            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 cursor-pointer active:opacity-60">
              <div className="relative">
                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="16" height="16" rx="4" />
                 </svg>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[3px] left-[7px] bg-[#FCFDFE]">
                    <path d="M12 5v14M5 12h14"/>
                 </svg>
              </div>
            </div>

            <input 
               type="text" 
               placeholder="有什么问题尽管问我！" 
               className="flex-1 bg-transparent border-none outline-none text-[#111] text-[14px] px-[8px] placeholder:text-[#A0A4B0] font-[400] tracking-wide" 
               readOnly
            />

            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 cursor-pointer active:bg-gray-100 rounded-full">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 10v4 M12 8v8 M15 10v4" />
               </svg>
            </div>
          </div>
        </div>

        {/* Global Footer Subtext Context */}
        <div className="flex justify-center pb-[16px] pt-[4px]">
           <span className="text-[10.5px] font-[400] text-[#C1C4CC]">内容由AI生成，仅供参考和借鉴</span>
        </div>

        {/* Native IOS Spacer Line */}
        <div className="w-[134px] h-[5px] bg-[#111111] rounded-full mx-auto mb-[6px]" />

      </div>

      {/* ---------------- NATIVE STATUS BAR (Z-50 FLUID) ---------------- */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 pt-[14px] pb-2 pointer-events-none">
        <div className="text-[13.5px] font-[600] text-[#111] tracking-tight mt-0.5 mix-blend-normal">
          18:08
        </div>
        <div className="flex items-center space-x-[5px] mix-blend-normal text-[#111]">
          <svg className="w-[17px] h-[10.5px]" viewBox="0 0 17 11" fill="currentColor">
             <rect x="0" y="7" width="3" height="4" rx="1" />
             <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
             <rect x="9" y="2" width="3" height="9" rx="1" />
             <rect x="13.5" y="0" width="3" height="11" rx="1" />
          </svg>
          <svg className="w-[15.5px] h-[11px]" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M1 4.5C4.5 1.5 11.5 1.5 15 4.5" />
             <path d="M4 7C6.5 5.2 9.5 5.2 12 7" />
             <path d="M7 9.5C7.8 9 8.2 9 9 9.5" />
          </svg>
          <svg className="w-[24.5px] h-[11.5px]" viewBox="0 0 25 12" fill="none">
             <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
             <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
             <path d="M23 4V8C23.6 8 24 7.6 24 7V5C24 4.4 23.6 4 23 4Z" fill="currentColor" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default ZhipuAIDrawingDashboardPage;
