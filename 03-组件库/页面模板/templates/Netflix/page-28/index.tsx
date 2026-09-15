import React from 'react';
import { Home, Search as SearchIcon, Download, Menu, Play } from 'lucide-react';
import './style.css';

/**
 * Universal EdgetoEdge Landscape Row Item
 */
const LandscapeCard = ({ titleNode, imgSrc, year, rating, duration, tags, tagDotColor = "#FFF" }) => {
    return (
        <div className="relative w-full h-[148px] rounded-[6px] overflow-hidden mb-[10px] bg-[#141414] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            
            {/* Background Image / SVG Array */}
            <div className="absolute inset-0 w-[110%] -ml-[5%] z-0 object-cover">
               {imgSrc}
            </div>
            
            {/* Immersive Contrast Gradients (Darken Left and Bottom Text areas) */}
            <div className="absolute inset-x-0 left-0 w-[65%] h-full bg-gradient-to-r from-black via-[#0A0A0A]/85 to-transparent z-10"></div>
            <div className="absolute inset-x-0 left-0 w-[45%] h-full bg-black z-10 opacity-40"></div>
            <div className="absolute inset-bottom-0 w-full h-[60%] bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>
            
            {/* Left Aligned Content Matrix */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-[12px] pb-[14px]">
                
                {/* Custom Title Integration */}
                <div className="w-[70%] mb-[3px]">
                   {titleNode}
                </div>
                
                {/* Data Tracking Metadata (Year / Rating / Duration) */}
                <div className="flex items-center text-[#B0B0B0] text-[12px] font-[500] gap-2 mb-[4px]">
                    <span>{year}</span>
                    <span className="bg-[#4D4D4D] text-[#E8E8E8] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-none mb-[1px]">
                        {rating}
                    </span>
                    <span>{duration}</span>
                </div>
                
                {/* Interactive Dynamic Genre Routing */}
                <div className="flex items-center gap-x-[5px] text-white font-[700] text-[12.5px] tracking-tight drop-shadow-md pb-[2px]">
                    {tags.map((tag, i) => (
                        <React.Fragment key={i}>
                            <span>{tag}</span>
                            {i < tags.length - 1 && (
                                <span style={{ color: tagDotColor }} className="text-[20px] leading-none mt-[-2px] mx-[1px]">·</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            {/* Massive Global Action Trigger (Play Ring) */}
            <div className="absolute bottom-[14px] right-[14px] z-30">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.8)] transform active:scale-90 transition-transform pt-[1px] pl-[2.5px] border-[1px] border-white/10">
                     <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black stroke-black stroke-1">
                         <path d="M5 3l15 9-15 9z" strokeLinejoin="round"/>
                     </svg>
                </div>
            </div>
        </div>
    )
}

/**
 * @name Netflix "Top Picks for Jiho" (Landscape Infinite List State) - Page 28
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none">
      
      {/* 1. Global Fixed Navigation Array (Blurred Dark Matrix) */}
      <div className="absolute top-0 w-full z-50">
           <div className="w-full bg-[#0E0E0E]/85 backdrop-blur-[24px] border-b border-[#222222]/40 shadow-sm pointer-events-auto">
                {/* Core Mobile System Status Sensors */}
                <div className="flex justify-between items-center px-[28px] pt-[8px] pb-[4px] relative z-50">
                   <span className="text-[14px] font-bold tracking-[0.2px] text-white opacity-95 ml-[-4px]">2:56</span>
                   <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
                       <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                          <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[8.5px] bg-white rounded-sm"></div>
                          <div className="w-[3px] h-[11px] bg-white rounded-sm"></div>
                       </div>
                       <div className="relative transform scale-[0.80] -mr-1">
                           <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
                               <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                               <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                           </svg>
                           <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-white rounded-[1.5px]"></div>
                       </div>
                   </div>
                </div>
                
                {/* Netflix App Software Router Sub-Nav */}
                <div className="flex justify-between items-center px-[18px] pb-[10px] mt-[4px]">
                    <svg className="w-[22px] h-[36px] drop-shadow-[0_2px_4px_black]" viewBox="0 0 24 40" fill="none">
                        <path d="M0 40V0H6.5L17.5 28.5V0H24V40H17.5L6.5 11.5V40H0Z" fill="#E50914"/>
                    </svg>
                    <div className="flex gap-[36px] font-[500] text-white text-[16.5px] tracking-tight mr-[6px] opacity-95">
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">Series</span>
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">Films</span>
                        <span className="cursor-pointer hover:opacity-80 transition-opacity">My List</span>
                    </div>
                </div>
           </div>
      </div>

      {/* 2. Kinematic Virtual Viewport (Scroll Y Engine) */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#050505]">
          
          <div className="flex flex-col w-full min-h-max pt-[80px] pb-[110px] px-[8px]">
              
              {/* Partially Obscured Prior Feed Memory */}
              <div className="relative w-full h-[40px] opacity-[0.5] flex items-end px-[8px] pb-3 overflow-hidden rounded-t-[6px] bg-[#141A21] mt-[8px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                  <span className="text-[#A5A5A5] font-[700] text-[12px] z-20 bottom-[1px] relative">
                     Masashi Kishimoto <span className="text-[#C47623] mx-[2px] text-[14px]">·</span> Fantasy Anime <span className="text-[#C47623] mx-[2px] text-[14px]">·</span> Action...
                  </span>
                  <div className="absolute bottom-[-16px] right-[14px] w-[36px] h-[36px] rounded-full bg-white opacity-[0.3] z-20" />
              </div>

              {/* Feed Header Controller */}
              <h2 className="text-white font-[800] text-[25px] tracking-[-0.5px] drop-shadow-md text-center w-full mt-[14px] mb-[12px] z-20 relative">
                 Top Picks for Jiho
              </h2>

              {/* === INFINITE CARD STACK === */}

              {/* Feed Slot 1: FRIENDS */}
              <LandscapeCard 
                  year="2003" rating="PG" duration="10 Seasons"
                  tags={['Loveable Loser', 'Sitcom', 'Emmy Winner']} tagDotColor="#FFD166"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                          {/* Urban Brick Underlayer */}
                          <rect width="400" height="150" fill="#1C273A" />
                          <path d="M120,0 Q180,75 120,150 L400,150 L400,0 Z" fill="#253549" opacity="0.8"/>
                          {/* Procedural Cast Depth Field (The Squad) */}
                          <ellipse cx="270" cy="50" rx="15" ry="20" fill="#B38B76" />
                          <ellipse cx="320" cy="35" rx="16" ry="22" fill="#DDBB9A" />
                          <ellipse cx="360" cy="45" rx="15" ry="22" fill="#C9A18B" />
                          <ellipse cx="250" cy="95" rx="16" ry="22" fill="#D3BAA5" /> 
                          <ellipse cx="310" cy="110" rx="18" ry="24" fill="#EFD0B6" /> 
                          <ellipse cx="355" cy="100" rx="17" ry="22" fill="#E2BD9A" /> 
                          <path d="M240,95 Q250,60 270,95" stroke="#45271A" strokeWidth="9" fill="none" />
                          <path d="M290,110 C300,50 330,50 330,120" stroke="#9C7051" strokeWidth="12" fill="none" />
                          <path d="M340,90 C350,60 370,60 375,100" stroke="#25160E" strokeWidth="10" fill="none" />
                      </svg>
                  }
                  titleNode={
                      <div className="flex items-center text-[#F5F5F5] font-[500] font-['Comic_Sans_MS',sans-serif] tracking-[2px] text-[20px] drop-shadow-[0_2px_4px_black] italic pb-[2px] mb-[-2px] ml-[2px]">
                          F<span className="text-[#FF5959] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          R<span className="text-[#4DAA57] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          I<span className="text-[#F2C94C] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          E<span className="text-[#4da1a2] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          N<span className="text-[#F2C94C] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          D<span className="text-[#FF5959] text-[5px] mx-[1.5px] mt-[4px]">●</span>
                          <span className="pr-2">S</span>
                      </div>
                  }
              />

              {/* Feed Slot 2: the goodwife */}
              <LandscapeCard 
                  year="2016" rating="M18" duration="6 Seasons"
                  tags={['Courtroom', 'Emmy Winner', 'Golden Globe']} tagDotColor="#D85A3F"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                           {/* Corporate Office Backdrop Matrix */}
                           <rect width="400" height="150" fill="#2E343A" />
                           <path d="M180,120 L400,120 L400,150 L180,150 Z" fill="#656D75" opacity="0.5"/> 
                           <rect x="240" y="30" width="30" height="90" fill="#1C1F22" />
                           <rect x="360" y="30" width="25" height="90" fill="#181A1D" />
                           
                           {/* The Legal Cast Blocks */}
                           <path d="M290,120 L295,45 Q300,40 305,45 L310,120 Z" fill="#131416" /> {/* Julianna Lead */}
                           <circle cx="300" cy="30" r="9" fill="#D3A790" />
                           <path d="M260,110 L263,55 Q265,50 268,55 L272,110 Z" fill="#2D2F33" />
                           <circle cx="266" cy="45" r="7.5" fill="#C5B1A5" />
                           <path d="M335,115 L338,50 Q341,45 344,50 L348,115 Z" fill="#1E2024" />
                           <circle cx="341" cy="40" r="8" fill="#CDAE9C" />
                      </svg>
                  }
                  titleNode={
                      <div className="flex items-center drop-shadow-[0_2px_4px_black] ml-[2px] mt-[-6px] mb-[2px]">
                          <span className="text-[#DE3E3E] text-[26px] font-['Times_New_Roman',serif] italic font-[400] pr-[1px]">the</span>
                          <span className="text-[#F2F2F2] text-[28px] font-['Georgia',serif] font-[700] tracking-[-1px] leading-none">goodwife</span>
                      </div>
                  }
              />

              {/* Feed Slot 3: Orange is the New Black */}
              <LandscapeCard 
                  year="2018" rating="R21" duration="6 Seasons"
                  tags={['Dark Comedy', 'Prison', 'Emmy Winner']} tagDotColor="#A6A6A6"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                          {/* Transport Van Core Concrete */}
                          <rect width="400" height="150" fill="#6A737C" />
                          <path d="M0,90 L400,90" stroke="#3D444A" strokeWidth="2.5" />
                          <path d="M200,30 L200,150 M250,30 L250,150 M300,30 L300,150 M350,30 L350,150" stroke="#4C555C" strokeWidth="4" />
                          
                          {/* Litchfield Cast Jumpsuit Formations */}
                          <path d="M235,120 L220,70 Q235,60 245,70 L255,120 Z" fill="#DF4F1F" />
                          <circle cx="235" cy="55" r="9.5" fill="#F0CAA5" />
                          
                          <path d="M285,130 L270,60 Q285,50 295,60 L305,130 Z" fill="#DF4F1F" />
                          <circle cx="285" cy="45" r="9" fill="#5E3E2F" />
                          
                          <path d="M345,125 L330,65 Q345,55 355,65 L365,125 Z" fill="#DF4F1F" />
                          <circle cx="345" cy="50" r="10" fill="#DEB181" />
                      </svg>
                  }
                  titleNode={
                      <div className="flex flex-col items-start leading-[0.9] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mb-1">
                         <div className="text-[5.5px] font-[800] text-white opacity-90 tracking-[1.2px] mb-[2px]">NETFLIX ORIGINAL</div>
                         <div className="flex items-end h-[24px]">
                            <span className="text-white text-[25px] font-['Arial_Black',sans-serif] font-[900] tracking-[-1px]">ORANGE</span>
                         </div>
                         <div className="flex items-start">
                            <div className="flex flex-col text-white/95 text-[6.5px] leading-[0.9] font-[600] mr-1 pt-[5px] text-right">
                               <span>is</span><span>the</span><span>new</span>
                            </div>
                            <span className="text-[#DE5829] text-[25px] font-['Arial_Black',sans-serif] font-[900] tracking-[-1.5px] ml-[-2px]">BLACK</span>
                         </div>
                      </div>
                  }
              />

              {/* Feed Slot 4: LIMITLESS */}
              <LandscapeCard 
                  year="2016" rating="NC16" duration="1 Season"
                  tags={['Sci-Fi & Fantasy', 'TV', 'Drama']} tagDotColor="#CD783D"
                  imgSrc={
                      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
                           {/* Warm Gloomy Focus Environment */}
                           <rect width="400" height="150" fill="#3D251A" />
                           <path d="M220,15 L320,15 L320,80 L220,80 Z" fill="#614A3E" />
                           {/* Blinds texture slicing */}
                           <path d="M220,25 L320,25 M220,35 L320,35 M220,45 L320,45 M220,55 L320,55" stroke="#251610" strokeWidth="2.5" opacity="0.8"/>
                           
                           {/* Focus Subject (Jake McDorman Matrix) */}
                           <path d="M260,150 L275,85 Q295,75 325,85 L360,150 Z" fill="#1A1C1F" />
                           <path d="M295,85 L305,120 L315,85 Z" fill="#111" />
                           <path d="M280,45 Q305,25 320,45 Q325,65 305,80 Q285,80 280,45 Z" fill="#D39F7F" /> 
                           {/* Focus Hair profile block */}
                           <path d="M280,45 Q295,25 320,35 L310,55 Z" fill="#AB673A" /> 
                      </svg>
                  }
                  titleNode={
                      <div className="mb-[6px] ml-[2px]">
                          <span className="text-[#E6E6E6] font-sans font-[300] text-[26px] tracking-[1px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              LIMITLESS
                          </span>
                      </div>
                  }
              />

              {/* Terminal Chevron Action Trigger */}
              <div className="w-full flex justify-center pb-2 mt-4 z-20 pointer-events-auto">
                  <button className="flex items-center gap-[6px] text-[#A3A3A3] bg-[#111111]/80 px-[16px] py-[8.5px] rounded-[3px] font-[600] text-[13px] border border-[#2B2B2B] hover:bg-[#1A1A1A] active:scale-95 transition-all shadow-md">
                      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-[#A3A3A3] stroke-[2px] fill-none mt-[1px]">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Show More
                  </button>
              </div>

          </div>
      </div>

      {/* 3. Hardware App Interface Layer (Floating Action Navigation) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black border-t border-[#1C1C1C] flex px-[5px] pt-2 z-50">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity">
              <Home size={24} strokeWidth={2.5} className="text-white fill-transparent" />
              <span className="text-[10px] text-white font-bold">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Search</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <Download size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100">
              <Menu size={24} strokeWidth={1.8} className="text-[#B3B3B3]" />
              <span className="text-[10px] text-[#B3B3B3] font-medium">More</span>
          </button>

      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>

    </div>
  );
}
