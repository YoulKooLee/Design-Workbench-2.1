import React from 'react';
import { Home, Search as SearchIcon, Download, Menu } from 'lucide-react';
import './style.css';

/**
 * Universal EdgetoEdge Landscape Row Item
 */
const LandscapeCard = ({ titleNode, imgSrc, year, rating, duration, tags, tagDotColor = "#FFF" }) => {
    return (
        <div className="relative w-full h-[148px] rounded-[6px] overflow-hidden mb-[10px] bg-[#1C1C1C] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            
            {/* Background Image / SVG Array */}
            <div className="absolute inset-0 w-[110%] -ml-[5%] z-0 object-cover">
               {imgSrc}
            </div>
            
            {/* Cinematic Degradation Gradients (Safe Area for Text Rendering) */}
            <div className="absolute inset-x-0 left-0 w-[68%] h-full bg-gradient-to-r from-[#000000] via-[#0A0A0A]/85 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 left-0 w-[42%] h-full bg-[#000000] z-10 opacity-40 pointer-events-none"></div>
            
            {/* Content Injection Vector */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-[12px] pb-[14px]">
                
                {/* Title Container Grid */}
                <div className="w-[75%] mb-[2px]">
                   {titleNode}
                </div>
                
                {/* Taxonomy Array */}
                {(year || rating || duration) && (
                    <div className="flex items-center text-[#AFAFAF] text-[12px] font-[500] gap-[7px] mb-[4px] mt-[1px]">
                        {year && <span>{year}</span>}
                        {rating && (
                            <span className="bg-[#3D3D3D] text-[#EBEBEB] rounded-[2px] px-[4px] py-[1px] font-[600] text-[10px] leading-[1] mt-[1px]">
                                {rating}
                            </span>
                        )}
                        {duration && <span>{duration}</span>}
                    </div>
                )}
                
                {/* Categorization & Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-[5px] text-[#FAFAFA] font-[600] text-[12.5px] tracking-tight drop-shadow-md pb-[1px] w-[85%] leading-[1.3]">
                        {tags.map((tag, i) => (
                            <React.Fragment key={i}>
                                <span>{tag}</span>
                                {i < tags.length - 1 && (
                                    <span style={{ color: tagDotColor }} className="text-[20px] leading-none mt-[-2px] mx-[2.5px] opacity-90">·</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Absolute Play Action Controller */}
            <div className="absolute bottom-[14px] right-[14px] z-30">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FFFFFF] flex justify-center items-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.8)] transform active:scale-95 transition-transform pt-[1px] pl-[2.5px] border-[1px] border-white/5 hover:bg-[#F2F2F2]">
                     <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-black stroke-black stroke-1">
                         <path d="M5 3l15 9-15 9z" strokeLinejoin="round"/>
                     </svg>
                </div>
            </div>
        </div>
    )
}

/**
 * @name Netflix "Popular on Netflix" (Secondary Feed Mapping) - Page 34
 */
export default function NetflixApp() {

  // Feed Asset Matrix 1: THE UMBRELLA ACADEMY
  const umbrellaBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#E8EBED" />
           {/* Obscured Environmental FX (Vertical Drip Motifs) */}
           {Array.from({length: 12}).map((_, i) => (
               <path key={`rip-${i}`} d={`M${25 + i*18},0 L${25 + i*18},${8 + (i%4)*12}`} stroke="#5A6166" strokeWidth="2.5" strokeLinecap="round" />
           ))}

           {/* Central Threat Node (Flying Dagger) */}
           <path d="M190,40 L195,35 L215,65 L210,70 Z" fill="#14181A" />
           <path d="M195,35 L200,30 L225,60 L220,65 Z" fill="#2E373B" />
           
           {/* Clustered Protagonists Frame Right */}
           <path d="M260,70 L270,10 L310,10 L320,70 Z" fill="#4B584B" /> 
           <path d="M280,10 Q290,0 300,10 Q295,25 285,20 Z" fill="#DDBAA2" />
           
           <path d="M220,150 L240,85 Q250,80 260,85 L280,150 Z" fill="#691C21" /> 
           <path d="M250,85 Q260,75 270,85 Q265,100 255,100 Z" fill="#EFD2C0" />
           <path d="M250,85 C240,65 275,65 265,95" fill="none" stroke="#25160E" strokeWidth="6" />

           <path d="M245,80 L250,45 Q265,40 275,55 Z" fill="#202A36" /> 
           <path d="M258,42 Q270,38 275,50 Q265,58 255,55 Z" fill="#151A1F" /> 

           <path d="M280,150 L290,105 Q300,100 310,105 L320,150 Z" fill="#252D36" />
           <path d="M295,100 Q305,85 315,100 Q310,115 300,115 Z" fill="#E8C5B3" />
           
           <path d="M315,150 L325,100 Q335,95 345,100 L355,150 Z" fill="#4A2D35" />
           <path d="M330,100 Q340,85 350,100 Q345,115 335,115 Z" fill="#CQA895" />
           <path d="M325,100 C315,75 360,75 350,110" fill="none" stroke="#C2A277" strokeWidth="6" /> 

           <path d="M350,150 L360,85 Q375,80 390,85 L400,150 Z" fill="#181A1A" /> 
           <path d="M345,140 Q365,115 390,135" stroke="#9E1E8B" strokeWidth="12" fill="none" strokeLinecap="round" />
           <path d="M365,85 Q375,70 385,85 Q380,100 370,100 Z" fill="#EFCEBB" />
           <path d="M358,60 Q365,55 372,60 Q365,65 358,60 Z" fill="#EFCEBB" />
           
           {/* Diegetic Inscribed Tattoo/Text */}
           <text x="355" y="55" fontSize="6.5" fontFamily="sans-serif" fill="#752828" transform="rotate(-15 355 55)">GOOD</text>
           <text x="357" y="62" fontSize="6.5" fontFamily="sans-serif" fill="#752828" transform="rotate(-15 357 62)">BYE</text>
      </svg>
  );

  const umbrellaTitle = (
      <div className="flex flex-col items-start leading-[0.95] drop-shadow-[0_4px_8px_black] mb-[5px] ml-[2px]">
           <span className="text-[5.5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[-0.3px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               THE
           </span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[0px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               UMBRELLA
           </span>
           <span className="text-[#F2F2F2] text-[20.5px] font-[900] font-sans tracking-[0px] transform scale-y-[1.1] scale-x-[0.92] origin-left drop-shadow-[0_2px_2px_black]">
               ACADEMY
           </span>
      </div>
  );

  // Feed Asset Matrix 2: SEX EDUCATION
  const sexEdBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#151A1D" />
           
           <g id="p1">
               <rect x="0" y="0" width="105" height="150" fill="#1C2329" />
               <path d="M10,150 L30,50 Q50,55 70,50 L90,150 Z" fill="#4B3325" /> 
               <path d="M30,50 Q50,25 70,40 Q60,65 40,65 Z" fill="#EFCEBB" /> 
               <path d="M25,65 C20,10 80,5 75,55" fill="none" stroke="#D37E3A" strokeWidth="8" /> 
           </g>

           <g id="p2">
               <rect x="105" y="0" width="60" height="150" fill="#5E1A1A" />
               <path d="M110,150 L125,55 Q135,50 145,55 L160,150 Z" fill="#18232B" /> 
               <path d="M125,55 Q135,35 145,45 Q140,65 130,65 Z" fill="#4A342B" /> 
           </g>

           <g id="p3">
               <rect x="165" y="0" width="70" height="150" fill="#254252" />
               <path d="M170,150 L185,65 Q195,60 205,65 L220,150 Z" fill="#1C1A18" /> 
               <path d="M185,65 Q195,45 205,55 Q200,75 190,75 Z" fill="#F0CEB8" /> 
               <path d="M180,75 C180,35 210,35 210,65" fill="none" stroke="#EDAD93" strokeWidth="6" /> 
           </g>

           <g id="p4">
               <rect x="235" y="0" width="80" height="150" fill="#2D4036" />
               <path d="M245,150 L260,70 Q275,65 290,70 L305,150 Z" fill="#EFBE5C" /> 
               <path d="M280,85 L280,150" stroke="#1A1510" strokeWidth="2" opacity="0.6"/>
               <path d="M265,70 Q275,50 285,60 Q280,80 270,75 Z" fill="#EFD2C0" />
               <path d="M260,65 C265,40 290,40 295,60" fill="none" stroke="#25160E" strokeWidth="5.5" /> 
           </g>

           <g id="p5">
               <rect x="315" y="0" width="85" height="150" fill="#222B42" />
               <path d="M325,150 L340,70 Q355,65 370,70 L385,150 Z" fill="#9C2A78" /> 
               <path d="M345,70 Q360,50 375,60 Q365,80 350,75 Z" fill="#422920" />
               <path d="M352,70 L363,73" stroke="#FFFFFF" strokeWidth="1.8" fill="none" /> 
           </g>
           
           <path d="M105,0 L105,150 M165,0 L165,150 M235,0 L235,150 M315,0 L315,150" stroke="#05080A" strokeWidth="3" />
      </svg>
  );

  const sexEdTitle = (
      <div className="flex flex-col items-start leading-[0.95] drop-shadow-[0_4px_8px_black] mb-[3px] ml-[2px]">
           <span className="text-[5.5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
           <span className="text-[#FAFAFA] text-[24px] font-[800] font-['Arial_Narrow',sans-serif] tracking-[-1.2px] transform scale-y-[1.3] scale-x-[0.82] origin-left">
               SEX EDUCATION
           </span>
      </div>
  );

  // Feed Asset Matrix 3: KINGDOM
  const kingdomBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#0A0B0D" />
           
           <g clipPath="url(#zombie-clip)">
               <clipPath id="zombie-clip"><rect x="0" y="0" width="220" height="150" /></clipPath>
               <path d="M120,0 L260,0 L260,150 L120,150 Z" fill="#1C1814" />
               <ellipse cx="205" cy="45" rx="14" ry="7" fill="#0A0805" />
               <path d="M195,95 Q215,85 225,105 Q215,135 190,125 Q180,110 195,95 Z" fill="#050302" />
               <path d="M200,103 L205,98 M210,105 L213,100 M215,110 L218,105" stroke="#9C9287" strokeWidth="1.5" />
               <path d="M170,35 Q190,55 170,95" stroke="#120E0A" strokeWidth="5" fill="none" />
           </g>

           <g clipPath="url(#prince-clip)">
               <clipPath id="prince-clip"><rect x="220" y="0" width="180" height="150" /></clipPath>
               <path d="M220,0 L400,0 L400,150 L220,150 Z" fill="#C29471" />
               <path d="M220,0 L280,0 L280,150 L220,150 Z" fill="#755239" opacity="0.7"/>
               <path d="M255,48 Q280,38 305,52 Q280,62 255,48 Z" fill="#FAEEE5" />
               <circle cx="275" cy="50" r="7" fill="#1A110D" />
               <circle cx="272" cy="48" r="2" fill="#FFFFFF" />
               <path d="M245,35 Q275,25 315,38" stroke="#170F0A" strokeWidth="4" fill="none" strokeLinecap="round" />
           </g>
           
           <path d="M217,-10 L223,-10 L223,160 L217,160 Z" fill="#9BA6AE" />
           <path d="M220,-10 L223,-10 L223,160 L220,160 Z" fill="#Cad2DB" /> 
      </svg>
  );

  const kingdomTitle = (
      <div className="flex flex-col items-start leading-[0.95] drop-shadow-[0_2px_4px_black] mb-[8px] ml-[2px]">
           <span className="text-[5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[4px]">NETFLIX ORIGINAL</span>
           <span className="text-[#FAFAFA] text-[22px] font-[400] font-['Georgia',serif] tracking-[5.5px] origin-left transform scale-x-[1.05] drop-shadow-[0_2px_2px_black]">
               KINGDOM
           </span>
      </div>
  );

  // Feed Asset Matrix 4: YOU
  const youBg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#0A0F0D" /> 
           
           <path d="M150,0 L400,0 L400,150 L150,150 Z" fill="#D3A796" opacity="0.8"/>
           <path d="M150,0 L240,0 L200,150 L150,150 Z" fill="#121815" opacity="0.95" />
           <path d="M190,0 Q240,75 210,150 L150,150 L150,0 Z" fill="#121815" />
           
           <path d="M245,60 Q275,50 305,62 Q275,72 245,60 Z" fill="#DED2CB" />
           <circle cx="275" cy="61" r="8.5" fill="#36231C" />
           <circle cx="275" cy="61" r="3.5" fill="#080808" />
           <circle cx="271" cy="58" r="1.5" fill="#FFFFFF" />
           
           <path d="M235,45 Q275,35 315,52" stroke="#25160E" strokeWidth="5.5" fill="none" strokeLinecap="round" />
           <path d="M235,52 Q275,42 315,57" fill="#784B35" opacity="0.3" />
           
           <path d="M400,0 Q300,45 180,150" stroke="#1F1510" strokeWidth="2.5" fill="none" opacity="0.8"/>
           <path d="M400,20 Q280,55 200,130" stroke="#120905" strokeWidth="3.5" fill="none" />
           <path d="M350,-10 Q280,75 150,90" stroke="#25160E" strokeWidth="2" fill="none" opacity="0.6"/>
           <path d="M380,-10 Q320,60 180,80" stroke="#180C08" strokeWidth="3" fill="none" />
      </svg>
  );

  const youTitle = (
      <div className="flex flex-col items-start leading-[0.9] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-[3px] ml-[3px]">
           <span className="text-[5.5px] text-[#FAFAFA] opacity-95 tracking-[1px] font-[800] mb-[3px]">NETFLIX ORIGINAL</span>
           <span className="text-[#FAFAFA] text-[46px] font-[400] font-serif tracking-[-1.5px] transform scale-y-[1.05] scale-x-[0.9] origin-left">
               YOU
           </span>
      </div>
  );

  // Feed Asset Matrix 5: BROOKLYN NINE-NINE
  const b99Bg = (
      <svg viewBox="0 0 400 150" className="w-full h-full object-cover">
           <rect width="400" height="150" fill="#142233" />
           <defs>
               <linearGradient id="b99-grad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#1B2D45" />
                   <stop offset="100%" stopColor="#0B131D" />
               </linearGradient>
           </defs>
           <rect width="400" height="150" fill="url(#b99-grad)" />

           <circle cx="250" cy="120" r="100" fill="#4B6C8A" opacity="0.3" style={{filter:'blur(25px)'}} />

           {/* Cast Lineup Silhouette Grid */}
           <path d="M120,150 L140,110 Q145,100 155,110 L175,150 Z" fill="#D3A78A" />
           <path d="M130,110 C140,85 160,85 165,110" fill="#1C1410" /> 
           
           <path d="M165,150 L185,95 Q195,90 205,95 L225,150 Z" fill="#1C1816" />
           <circle cx="195" cy="90" r="11" fill="#4A2E22" /> 
           
           <path d="M210,150 L230,85 Q240,75 250,85 L270,150 Z" fill="#303B47" /> 
           <circle cx="240" cy="80" r="13" fill="#DDB296" /> 
           <path d="M230,75 Q240,60 250,75" stroke="#2B1D16" strokeWidth="5" fill="none" /> 
           
           <path d="M260,150 L280,95 Q290,85 300,95 L320,150 Z" fill="#171513" /> 
           <circle cx="290" cy="90" r="10" fill="#CCA894" />
           <path d="M275,90 C285,75 305,75 305,90" fill="none" stroke="#0D0A08" strokeWidth="6" /> 

           <path d="M305,150 L320,105 Q330,100 340,105 L360,150 Z" fill="#695B4E" /> 
           <circle cx="330" cy="100" r="9" fill="#DDB296" />
      </svg>
  );

  const b99Title = (
      <div className="flex flex-col items-start leading-[0.8] drop-shadow-[0_2px_4px_black] ml-[2px] mt-[10px] mb-[-4px]">
           <span className="text-[#FFDC14] text-[20px] font-[900] font-sans tracking-[-0.6px] transform scale-y-[1.3] scale-x-[0.95] origin-left -rotate-[3deg]">
               BROOKLYN
           </span>
           <span className="text-[#FFDC14] text-[20px] font-[900] font-sans tracking-[-0.6px] transform scale-y-[1.3] scale-x-[0.95] origin-left -rotate-[3deg] ml-[2.5px] mt-[0.5px]">
               NINE-NINE
           </span>
      </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#141414] text-white font-sans relative select-none">
      
      {/* 1. Global Navigation Surface Array (Deep Scroll State) */}
      <div className="fixed top-0 w-full h-[85px] z-50 pointer-events-none flex flex-col justify-between pt-[8px]">
           <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-transparent backdrop-blur-[4px] mask-image-b"></div>
           
           <div className="flex justify-between items-center px-[28px] pb-[6px] relative z-50 mix-blend-plus-lighter drop-shadow-md">
               <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">3:00</span>
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
           
           {/* Out-of-bounds rendering fragment (Memory decay from off-screen object) */}
           <div className="absolute top-[42px] left-[32px] flex gap-[2px] opacity-20">
                <div className="w-[1.5px] h-[7px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[11px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[14px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[6px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[4px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[15px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[11px] bg-[#FAFAFA]"></div>
                <div className="w-[1.5px] h-[16px] bg-[#FAFAFA]"></div>
           </div>
      </div>

      {/* 2. Primary Y-Axis Interpolation Zone */}
      <div className="flex-1 overflow-y-auto w-full custom-hide-scrollbar bg-[#111111] pt-[8px]">
          
          <div className="flex flex-col w-full min-h-max pb-[10px] px-[8px]">
              
              {/* Category Anchor Root */}
              <h2 className="text-[#FAFAFA] font-[800] text-[25.5px] tracking-[-0.3px] drop-shadow-md text-center w-full mt-[68px] mb-[12px] z-20 relative">
                 Popular on Netflix
              </h2>

              {/* === ARRAY FEED LOOP === */}

              {/* Memory Node 1: THE UMBRELLA ACADEMY */}
              <LandscapeCard 
                  year="2019" rating="M18" duration="1 Season"
                  tags={['Armageddon', 'Time Travel', 'Action']} tagDotColor="#3E8EB3"
                  imgSrc={umbrellaBg}
                  titleNode={umbrellaTitle}
              />

              {/* Memory Node 2: SEX EDUCATION */}
              <LandscapeCard 
                  year="2018" rating="R21" duration="1 Season"
                  tags={['Teen', 'High School', 'TV']} tagDotColor="#E8A92A"
                  imgSrc={sexEdBg}
                  titleNode={sexEdTitle}
              />

              {/* Memory Node 3: KINGDOM */}
              <LandscapeCard 
                  year="2019" rating="M18" duration="1 Season"
                  tags={['Viral Plague', 'Korean', 'Period Piece']} tagDotColor="#D14E28"
                  imgSrc={kingdomBg}
                  titleNode={kingdomTitle}
              />

              {/* Memory Node 4: YOU */}
              <LandscapeCard 
                  year="2018" rating="M18" duration="1 Season"
                  tags={['Love & Obsession', 'Keeping Secrets', 'Thriller']} tagDotColor="#EAEAEA"
                  imgSrc={youBg}
                  titleNode={youTitle}
              />

              {/* Memory Node 5: BROOKLYN NINE-NINE (Engineered to clip naturally into OS Sub-Nav) */}
              <div className="mb-[60px]">
                  <LandscapeCard 
                      tags={[]} // Tag metadata omitted due to strict bottom-clip constraints
                      imgSrc={b99Bg}
                      titleNode={b99Title}
                  />
              </div>

          </div>
      </div>

      {/* 3. Terminal Viewport Overlay (Bottom Access Array) */}
      <div className="absolute bottom-0 w-full h-[88px] bg-black/95 backdrop-blur-md border-t border-[#1C1C1C] flex px-[5px] pt-[8.5px] z-50 pointer-events-auto">
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-100 transition-opacity active:scale-95">
              <Home size={24} strokeWidth={2.5} className="text-[#FAFAFA] fill-transparent" />
              <span className="text-[10px] text-[#FAFAFA] font-bold tracking-tight">Home</span>
          </button>
          
          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <SearchIcon size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Search</span>
          </button>

          <button className="relative flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <div className="relative">
                  <Download size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
                  <div className="absolute top-[-3px] right-[-6px] w-[15px] h-[15px] bg-[#0A84FF] rounded-full flex justify-center items-center shadow-[0_0_0_2px_#000000]">
                      <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-[#FAFAFA] stroke-[4px] fill-none">
                           <path d="M4 12l4 4L20 6" />
                      </svg>
                  </div>
              </div>
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">Downloads</span>
          </button>

          <button className="flex-1 flex flex-col items-center gap-[4px] opacity-60 transition-opacity hover:opacity-100 active:scale-95">
              <Menu size={24} strokeWidth={1.8} className="text-[#A3A3A3]" />
              <span className="text-[10px] text-[#A3A3A3] font-medium tracking-tight">More</span>
          </button>

      </div>

      {/* Screen Boundary Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>

    </div>
  );
}
