/**
 * @name Assistant Detail
 */
import React from 'react';
import './style.css';

const Logo = () => (
   <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M16 2L2 10L16 30L30 10L16 2Z" fill="#1D1C1B"/>
     <path d="M16 2L9 10L16 30L16 2Z" fill="#1D1C1B"/>
     <path d="M16 2L23 10L16 30L16 2Z" fill="#1D1C1B"/>
     <path d="M2 10L9 10L16 30L2 10Z" fill="#1D1C1B"/>
     <path d="M30 10L23 10L16 30L30 10Z" fill="#1D1C1B"/>
     <path d="M9 10H23L16 2L9 10Z" fill="#1D1C1B"/>
   </svg>
);

const Nav = () => (
   <header className="bg-transparent w-full z-50 absolute top-0 left-0">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-[15px] font-bold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product <span className="text-[10px] text-gray-400 font-normal">v</span></a>
            <a href="#" className="hover:text-sketch-orange transition">Learn <span className="text-[10px] text-gray-400 font-normal">v</span></a>
            <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
            <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
            <a href="#" className="hover:text-sketch-orange transition">Why Sketch <span className="text-[10px] text-gray-400 font-normal">v</span></a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-[15px] font-bold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block">Support <span className="text-[10px] text-gray-400 font-normal">v</span></a>
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition text-sketch-orange">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#FD6B22] text-white px-5 py-2.5 rounded hover:bg-[#E55A16] transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const CodeOr = ({children}) => (
   <span className="font-bold text-[#FD6B22] break-all">{children}</span>
);

const ExternalLinkIcon = () => (
   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 mt-0.5 shrink-0">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
   </svg>
);

const AssistantCard = ({ title, author, desc, tag, tagColorBg, tagColorText, icon }) => (
   <div className="bg-white rounded-[12px] p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition duration-300 flex flex-col h-full cursor-pointer group">
      <div className="flex justify-between items-start mb-6 w-full">
         <div className="w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition shrink-0 bg-white shadow-sm border border-gray-100 rounded-lg">
            {icon}
         </div>
         <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[4px] mt-1 shrink-0 ${tagColorBg} ${tagColorText}`}>
            {tag}
         </div>
      </div>
      <div>
         <h4 className="text-[18px] font-bold text-[#1D1C1B] leading-tight mb-1">{title}</h4>
         <div className="text-[12px] text-gray-400 mb-4 font-medium">by {author}</div>
         <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
            {desc}
         </p>
      </div>
   </div>
);


export default function P21AssistantDetail() {
   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-orange-200 selection:text-black font-sans pt-[72px]">
         <Nav />

         {/* Extensible Global Wrap for Top Hero (Mesh background) */}
         <div className="relative w-full">
            
            {/* Top faded geometric mesh pattern backdrop */}
            <div className="absolute top-0 left-0 w-full h-[400px] pointer-events-none flex justify-center opacity-40 z-0">
               <svg viewBox="0 0 1440 400" className="w-full h-full object-cover">
                  <path d="M0 400L1440 0V400H0Z" fill="url(#grad_bg_top)" opacity="0.1"></path>
                  <path d="M1200 400L1500 100" stroke="#DDDDDD" strokeWidth="1" fill="none"></path>
                  <path d="M-100 0L400 400H100" stroke="#DDDDDD" strokeWidth="1" fill="none"></path>
                  <defs>
                     <linearGradient id="grad_bg_top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF"/>
                        <stop offset="100%" stopColor="#F0F0F0"/>
                     </linearGradient>
                  </defs>
               </svg>
            </div>

            {/* Sub Nav / Breadcrumbs */}
            <div className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 pt-16">
               <div className="flex items-center gap-2 text-[14px] font-medium text-gray-500">
                  <span className="font-bold cursor-pointer hover:text-black transition">{'<'} Extensions</span>
                  <span>/</span>
                  <span className="text-[#1D1C1B] font-bold">Assistants</span>
               </div>
               
               <div className="relative w-full md:w-auto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                     <circle cx="11" cy="11" r="8"></circle>
                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" placeholder="Search for Assistants..." className="w-full md:w-[320px] pl-10 pr-4 py-2 border border-gray-200 rounded-md text-[14px] shadow-sm focus:outline-none focus:border-black transition" />
               </div>
            </div>

            {/* Split Content Area */}
            <section className="max-w-[1240px] mx-auto px-6 py-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:items-start pb-32">
               
               {/* Left Sidebar Frame */}
               <div className="w-full lg:w-[260px] flex-shrink-0 flex flex-col gap-6">
                  
                  {/* Icon Backdrop Canvas */}
                  <div className="w-full aspect-square bg-[#F5F5F5] p-5 rounded-md flex items-center justify-center">
                     <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
                        {/* React/Atom Custom Logo */}
                        <div className="relative flex items-center justify-center">
                           <div className="absolute w-[100px] h-[30px] rounded-[100%] border-[4px] border-[#A825C9] transform rotate-[30deg]"></div>
                           <div className="absolute w-[100px] h-[30px] rounded-[100%] border-[4px] border-[#A825C9] transform rotate-[-30deg]"></div>
                           <div className="absolute w-[100px] h-[30px] rounded-[100%] border-[4px] border-[#A825C9] transform rotate-[90deg]"></div>
                           <div className="text-[20px] absolute transform -translate-x-[2px] -translate-y-[2px]">💎</div>
                        </div>
                     </div>
                  </div>

                  <button className="w-full bg-[#FD6B22] text-white py-3.5 rounded-[4px] font-bold text-[15px] shadow-sm hover:bg-[#E55A16] hover:shadow transition duration-300">
                     Add to Sketch
                  </button>

                  <div className="text-[13px] text-gray-500 font-medium space-y-1">
                     <div>v1.0.9</div>
                     <div>November 13, 2020</div>
                  </div>

                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest mt-2">
                     <span className="bg-[#EEF2FF] text-[#4338CA] px-2 py-1 rounded">GUIDELINES</span>
                     <span className="bg-[#EEF2FF] text-[#4338CA] px-2 py-1 rounded">WEB</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4 text-[14px] text-gray-600 font-medium">
                     <a href="#" className="flex gap-2 items-center hover:text-black transition group"><ExternalLinkIcon /><span className="group-hover:underline decoration-gray-300 underline-offset-2">npm</span></a>
                     <a href="#" className="flex gap-2 items-center hover:text-black transition group"><ExternalLinkIcon /><span className="group-hover:underline decoration-gray-300 underline-offset-2">homepage</span></a>
                     <a href="#" className="flex gap-2 items-center hover:text-black transition group"><ExternalLinkIcon /><span className="group-hover:underline decoration-gray-300 underline-offset-2">repository</span></a>
                     <a href="#" className="flex gap-2 items-center hover:text-black transition group"><ExternalLinkIcon /><span className="group-hover:underline decoration-gray-300 underline-offset-2">bugs</span></a>
                  </div>

               </div>


               {/* Right Reading Content */}
               <div className="flex-1 w-full flex flex-col pt-4 max-w-[800px]">
                  
                  <h1 className="text-[40px] md:text-[46px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-2">
                     Sketch2React Conventions
                  </h1>
                  <h3 className="text-[20px] text-gray-400 font-medium mb-8">
                     by Team Sketch2React
                  </h3>

                  <p className="text-[22px] md:text-[24px] font-medium text-[#1D1C1B] leading-[1.6] mb-12 drop-shadow-sm">
                     An assistant to help you with Sketch2React's framework's naming conventions and document structure
                  </p>

                  <h2 className="text-[26px] font-black text-[#1D1C1B] tracking-tight mb-4">About Sketch2React</h2>
                  <p className="text-[16px] text-[#1D1C1B]/80 leading-[1.7] mb-10">
                     <CodeOr>Sketch2React</CodeOr> lets you build responsive prototypes and <CodeOr>even very simple websites</CodeOr>. No plugins, no code, only using the built-in tools <strong className="font-bold text-black">directly inside Sketch app.</strong> When you're ready with your masterpiece just export to HTML or React 🎇
                  </p>

                  <h2 className="text-[26px] font-black text-[#1D1C1B] tracking-tight mb-6">Rules</h2>
                  
                  {/* Nested Styled Bullet List */}
                  <ul className="space-y-4 text-[15px] text-[#1D1C1B]/80 leading-[1.7] list-none md:pl-0 mb-16">
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Document must contain one page named <CodeOr>"Start here"</CodeOr> - <CodeOr>@sketch2react/sketch2react-core-assistant/occurrence-of-page</CodeOr>
                     </li>
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Document must contain one artboard named <CodeOr>"Start"</CodeOr> on a page named “Start here” - <CodeOr>@sketch2react/sketch2react-core-assistant/occurrence-of-artboard</CodeOr>
                     </li>
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Group name must contain one pair of curly brackets - <CodeOr>@sketch2react/sketch2react-core-assistant/group-name-component-name</CodeOr>
                     </li>
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Text name must contain one pair of curly brackets - <CodeOr>@sketch2react/sketch2react-core-assistant/text-name-component-name</CodeOr>
                     </li>
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Group name may contain zero or one pair of square brackets - <CodeOr>@sketch2react/sketch2react-core-assistant/group-name-css-classnames</CodeOr>
                     </li>
                     <li className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full"></span>
                        Text name may contain zero or one pair of square brackets - <CodeOr>@sketch2react/sketch2react-core-assistant/text-name-css-classnames</CodeOr>
                        <ul className="mt-4 space-y-3 pl-2">
                           <li className="relative pl-5 text-[14px]">
                              <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[#1D1C1B] rounded-full opacity-60"></span>
                              Artboards must contain at least one text layer named {'{externalasset.css}'} as a direct decendant. - <CodeOr>@sketch2react/sketch2react-assistant/artboard-contains-external-css-asset</CodeOr>
                           </li>
                        </ul>
                     </li>
                  </ul>

                  {/* Disclaimer Box */}
                  <div className="bg-[#FAF9FA] rounded-xl p-8 border border-gray-100 mt-4 flex flex-col">
                     <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                        The information on this page is provided by the developer of this extension, and is not edited by the Sketch team. If you have questions or need support with this extension, please contact the developer directly.
                     </p>
                  </div>
               </div>

            </section>
         </div>


         {/* Featured Assistants Row */}
         <section className="bg-white border-t border-gray-100">
            <div className="max-w-[1240px] mx-auto px-6 py-20">
               <h2 className="text-[28px] font-black text-[#1D1C1B] mb-10">Featured Assistants</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3">
                  <AssistantCard 
                     title="Accessibility" author="Yana Gevorgyan" 
                     desc="Ensure your document is accessible and compliant with WCAG 2.1"
                     tag="ACCESSIBILITY" tagColorBg="bg-[#EEF2FF]" tagColorText="text-[#4338CA]" 
                     icon={<div className="text-gray-400 text-2xl">🛎</div>} />

                  <AssistantCard 
                     title="Organizer" author="Slice Design" 
                     desc="Organizer Assistant keeps your documents clean and organized with helpful tips and suggestions."
                     tag="ORGANIZATION" tagColorBg="bg-[#EEF2FF]" tagColorText="text-[#4338CA]" 
                     icon={
                        <div className="w-12 h-12 bg-[#2ECC71] rounded-lg text-white flex items-center justify-center relative shadow-sm border-[3px] border-white z-0">
                           <div className="transform -rotate-45 font-black text-xl mb-1 ml-1 text-white">🔪</div>
                           <div className="absolute top-1 right-1 text-[8px] text-white font-black animate-pulse">✦</div>
                        </div>
                     } />
               </div>
            </div>
         </section>

         {/* Standard Footer Area */}
         <footer className="pt-20 pb-8 border-t border-gray-100 bg-[#FAFAFA]">
            {/* Same generic layout */}
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-3 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed max-w-md">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-black shadow-sm bg-white" />
                  <button className="bg-[#E7BA9A] text-white px-6 py-3 rounded-[4px] text-[14px] shadow-sm hover:opacity-80 transition font-bold leading-none">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1 border-gray-300 rounded-sm" />
                  <span className="text-[12px] text-gray-400 font-medium tracking-wide">I agree to receive marketing emails from Sketch.</span>
               </div>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Product</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=07-whats-new" className="hover:text-black transition flex items-center">What's New <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=08-design-collaborate" className="hover:text-black transition">Design</a></li>
                  <li><a href="#page=10-collaborative-design" className="hover:text-black transition">Collaboration</a></li>
                  <li><a href="#page=05-prototyping-tools" className="hover:text-black transition">Prototyping</a></li>
                  <li><a href="#page=04-developer-handoff" className="hover:text-black transition">Developer Handoff</a></li>
                  <li><a href="#page=09-workspace" className="hover:text-black transition">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
                  <li><a href="#" className="hover:text-black transition flex items-center">Apps <span className="text-[10px] bg-gray-200 text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded shadow-sm border border-gray-200">3</span></a></li>
                  <li><a href="#page=20-plugins" className="hover:text-black transition">Extensions</a></li>
                  <li><a href="#page=12-pricing" className="hover:text-black transition">Pricing</a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition flex items-center">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Adobe XD</a></li>
                  <li><a href="#page=16-education" className="hover:text-black transition flex items-center">Free for Education <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Learn</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=13-documentation" className="hover:text-black transition">Documentation</a></li>
                  <li><a href="#page=11-community" className="hover:text-black transition">Events & Meetups</a></li>
                  <li><a href="#page=25-newsletter" className="hover:text-black transition">Newsletter</a></li>
                  <li><a href="#page=15-labs" className="hover:text-black transition">Sketch Labs</a></li>
                  <li><a href="#page=23-developer" className="hover:text-black transition flex items-center justify-between group cursor-pointer">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
               </ul>
               </div>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400 font-medium">
               <div className="md:w-1/3 content-start"><Logo /></div>
               <p className="mb-4 md:mb-0 md:w-1/3 text-center">© 2026 Sketch B.V.</p>
               <div className="flex gap-6 text-xl md:w-1/3 justify-end relative bottom-4">
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">𝕏</span>
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">◎</span>
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">📷</span>
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">▶</span>
               </div>
            </div>
         </footer>

      </div>
   );
}
