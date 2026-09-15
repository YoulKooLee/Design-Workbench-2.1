/**
 * @name Extensions
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

// Types of cards components

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

const PluginCard = ({ title, author, desc, coverBg, heroContent }) => (
   <div className="bg-white rounded-[12px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition duration-300 flex flex-col h-full cursor-pointer overflow-hidden">
      <div className={`h-[220px] w-full flex items-center justify-center ${coverBg} relative overflow-hidden`}>
         {heroContent}
      </div>
      <div className="p-8 flex-1 flex flex-col bg-white">
         <h4 className="text-[18px] font-bold text-[#1D1C1B] leading-tight mb-1">{title}</h4>
         <div className="text-[12px] text-gray-400 mb-4 font-medium">by {author}</div>
         <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
            {desc}
         </p>
      </div>
   </div>
);

export default function P20Extensions() {
   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-orange-200 selection:text-black font-sans pt-[72px]">
         <Nav />

         {/* Hero Header Frame */}
         <section className="relative w-full py-40 bg-[#FAFAFA] overflow-hidden border-b border-gray-200">
            {/* Background Geometric Grid/Lines (Abstract light gray) */}
            <div className="absolute inset-0 pointer-events-none flex justify-center opacity-40">
               <svg viewBox="0 0 1440 400" className="w-full h-full object-cover">
                  <path d="M0 400L1440 0V400H0Z" fill="url(#grad_bg)" opacity="0.3"></path>
                  <path d="M-100 0L400 400H100" stroke="#DDDDDD" strokeWidth="1" fill="none"></path>
                  <path d="M1200 400L1500 100" stroke="#DDDDDD" strokeWidth="1" fill="none"></path>
                  <circle cx="200" cy="100" r="300" stroke="#EEEEEE" strokeWidth="1" fill="white"></circle>
                  <defs>
                     <linearGradient id="grad_bg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF"/>
                        <stop offset="100%" stopColor="#F0F0F0"/>
                     </linearGradient>
                  </defs>
               </svg>
            </div>

            <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
               <h1 className="text-[48px] md:text-[60px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-6">
                  Make Sketch your own
               </h1>
               <h3 className="text-[20px] md:text-[23px] font-medium text-gray-600 leading-relaxed drop-shadow-sm max-w-xl mx-auto">
                  Do even more with powerful third-party extensions, created by our talented <span className="text-sketch-orange">Developer Community.</span>
               </h3>
            </div>
         </section>

         {/* Sticky Sort/Sub Nav */}
         <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-[1240px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center bg-white gap-4">
               
               <div className="flex gap-8 text-[14px] font-medium text-[#1D1C1B]">
                  <a href="#assistants" className="flex items-center gap-2 hover:text-sketch-orange transition">
                     <span className="text-[#FD6B22]">🛎</span> <span className="font-bold">Assistants</span>
                  </a>
                  <a href="#page=20-plugins" className="flex items-center gap-2 hover:text-sketch-orange transition">
                     <span className="text-[#FD6B22]">🧩</span> <span className="text-gray-500 font-bold hover:text-black">Plugins</span>
                  </a>
                  <a href="#integrations" className="flex items-center gap-2 hover:text-sketch-orange transition">
                     <span className="text-[#FD6B22]">⊞</span> <span className="text-gray-500 font-bold hover:text-black">Integrations</span>
                  </a>
                  <a href="#create" className="flex items-center gap-2 hover:text-sketch-orange transition hidden sm:flex">
                     <span className="text-[#FD6B22]">＋</span> <span className="text-gray-500 font-bold hover:text-black">Create your own</span>
                  </a>
               </div>

               <div className="cursor-pointer text-gray-400 hover:text-black transition flex items-center pr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="11" cy="11" r="8"></circle>
                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
               </div>
            </div>
         </div>


         {/* Section: Sketch Assistants */}
         <section id="assistants" className="max-w-[1240px] mx-auto px-6 pt-24 pb-12">
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-[28px] font-black text-[#1D1C1B]">Sketch Assistants</h2>
                  <a href="#" className="text-[14px] font-bold text-[#FD6B22] hover:text-[#E55A16] transition mt-1 flex items-center gap-1">See all <span className="text-[10px]">›</span></a>
               </div>
               <p className="text-[17px] text-gray-500 font-medium max-w-lg leading-relaxed">
                  Get a helping hand with your designs to spot issues, stay consistent with design systems, and so much more.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <AssistantCard 
                  title="Sketch2React Conventions" author="Team Sketch2React" 
                  desc="An assistant to help you with Sketch2React's framework's naming conventions and document structure."
                  tag="GUIDELINES" tagColorBg="bg-[#F4F3FF]" tagColorText="text-[#6E56CF]" 
                  icon={<div className="text-[#DB2777] text-2xl">⚛</div>} />
                  
               <AssistantCard 
                  title="Accessibility" author="Yana Gevorgyan" 
                  desc="Ensure your document is accessible and compliant with WCAG 2.1"
                  tag="ACCESSIBILITY" tagColorBg="bg-[#EEF2FF]" tagColorText="text-[#4338CA]" 
                  icon={<div className="text-gray-400 text-2xl">🛎</div>} />

               <AssistantCard 
                  title="Organizer" author="Slice Design" 
                  desc="Organizer Assistant keeps your documents clean and organized with helpful tips and suggestions."
                  tag="ORGANIZATION" tagColorBg="bg-[#EEF2FF]" tagColorText="text-[#4338CA]" 
                  icon={<div className="w-5 h-5 border-[3px] border-[#3B82F6] rounded-sm bg-transparent"></div>} />
            </div>
         </section>

         {/* Section: Sketch Plugins */}
         <section id="plugins" className="max-w-[1240px] mx-auto px-6 py-12">
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-[28px] font-black text-[#1D1C1B]">Sketch Plugins</h2>
                  <a href="#" className="text-[14px] font-bold text-[#FD6B22] hover:text-[#E55A16] transition mt-1 flex items-center gap-1">See all <span className="text-[10px]">›</span></a>
               </div>
               <p className="text-[17px] text-gray-500 font-medium max-w-lg leading-relaxed">
                  Choose from hundreds of plugins that add extra functionality and automate work, right inside the Mac app.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <PluginCard 
                  title="Stark" author="Stark" 
                  desc="Stark helps you design and build products that are accessible, ethical, and inclusive."
                  coverBg="bg-[#FAFAFA]" 
                  heroContent={
                     <div className="relative w-[100px] h-[100px] bg-black rounded-[24px] shadow-lg flex items-center justify-center transform rotate-3">
                        <span className="font-serif italic text-white text-[56px] mt-[-8px]">S</span>
                        <div className="absolute top-1/4 left-[-40px] text-black text-[12px] opacity-80 rotate-12">◆</div>
                        <div className="absolute bottom-[-20px] right-[-20px] text-black text-[10px] opacity-80">◾</div>
                     </div>
                  } />
                  
               <PluginCard 
                  title="Chart" author="Pavel Kuligin" 
                  desc="Create charts with random, tabular or JSON data inside Sketch. Customize visual representation of your charts and change data in seconds."
                  coverBg="bg-[#F5F5F5]" 
                  heroContent={
                     <div className="w-[80px] h-[80px] bg-white rounded-2xl shadow-sm flex items-center justify-center">
                        <div className="text-[52px] font-bold" style={{background: "-webkit-linear-gradient(45deg, #FF6B6B, #C0392B, #8E44AD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>C</div>
                     </div>
                  } />

               <PluginCard 
                  title="Overflow" author="Proto.io" 
                  desc="Sync and convert your Artboards into screens in Overflow and turn your designs into playable user flow diagrams."
                  coverBg="bg-[#FAFAFA]" 
                  heroContent={
                     <div className="w-[80px] h-[80px] rounded-full overflow-hidden flex flex-col relative transform rotate-12 drop-shadow-md">
                        <div className="h-1/2 bg-[#3498DB] w-full"></div>
                        <div className="h-1/2 bg-[#E74C3C] w-full mt-0.5"></div>
                     </div>
                  } />

               <PluginCard 
                  title="Plant" author="Plant" 
                  desc="Invite your team members to collaborate and version control your design projects with a tool that's seamlessly integrated into Sketch."
                  coverBg="bg-[#1890FF]" 
                  heroContent={
                     <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center relative">
                        <div className="absolute w-[40px] h-[40px] bg-[#1890FF] transform rotate-45 skew-x-[20deg]"></div>
                        <div className="absolute w-[40px] h-[40px] bg-white transform rotate-45 scale-75"></div>
                     </div>
                  } />

               <PluginCard 
                  title="Crowdin" author="Crowdin" 
                  desc="Preview and customize localized copy in your Sketch documents, then hand them off to developers, with the help of Crowdin's platform."
                  coverBg="bg-[#2D333F]" 
                  heroContent={
                     <div className="text-[100px] text-white opacity-90 transform -rotate-12 translate-x-3 3d-drop shadow-sm" style={{textShadow: "4px 4px 0px rgba(0,0,0,0.2)"}}>
                        C
                     </div>
                  } />

               <PluginCard 
                  title="Lokalise" author="Lokalise" 
                  desc="Lokalise is a translation management system that allows designers and translators to instantly translate, preview and download Sketch files in multiple languages."
                  coverBg="bg-[#FCF9EE]" 
                  heroContent={
                     <div className="flex flex-col gap-2 transform translate-y-2">
                        <div className="w-[60px] h-[10px] bg-[#2ECC71] rounded-full relative"><div className="absolute -left-[20px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-[#2ECC71]"></div></div>
                        <div className="w-[70px] h-[10px] bg-[#E67E22] rounded-full mt-4 flex items-center"><div className="w-3 h-3 bg-white ml-2 rounded-full absolute -right-1"></div></div>
                     </div>
                  } />
            </div>
         </section>

         {/* Section: Sketch Integrations */}
         <section id="integrations" className="max-w-[1240px] mx-auto px-6 py-12 mb-12">
            <div className="mb-10">
               <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-[28px] font-black text-[#1D1C1B]">Sketch Integrations</h2>
                  <a href="#" className="text-[14px] font-bold text-[#FD6B22] hover:text-[#E55A16] transition mt-1 flex items-center gap-1">See all <span className="text-[10px]">›</span></a>
               </div>
               <p className="text-[17px] text-gray-500 font-medium max-w-lg leading-relaxed">
                  Add to your workflow with third-party apps that integrate with Sketch and take your designs further.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <PluginCard 
                  title="ProtoPie" author="" 
                  desc="ProtoPie is a tool to turn your interaction design ideas into realistic prototypes. Create interactive prototypes for mobile, desktop, web, and IoT."
                  coverBg="bg-[#1F2228]" 
                  heroContent={
                     <div className="flex items-center gap-3 text-white">
                        <div className="text-[#FF4A60] text-[40px] transform rotate-180 drop-shadow">▲</div>
                        <div className="text-[32px] font-bold tracking-tight">ProtoPie</div>
                     </div>
                  } />
                  
               <PluginCard 
                  title="Maze" author="" 
                  desc="Maze is a product research platform that turns your design into actionable insights from real users, bringing confidence to the design process."
                  coverBg="bg-[#0055FF]" 
                  heroContent={
                     <div className="flex items-center gap-2 text-white">
                        <svg width="40" height="24" viewBox="0 0 24 16" fill="white">
                           <path d="M12 4C9.5 4 8 6 8 6L5 2C5 2 7.5 -0.5 12 0C16.5 0.5 19 3 19 3L16 7C16 7 14.5 4 12 4Z" opacity="0.6"/>
                           <path d="M4 14C4.5 14.5 6 16 9 16C12 16 14 14 14 14L17 18C17 18 14.5 20 9 20C3.5 20 0 16 0 16L4 14Z"/>
                        </svg>
                        <div className="text-[32px] font-bold tracking-tighter">maze</div>
                     </div>
                  } />

               <PluginCard 
                  title="Flinto" author="" 
                  desc="Flinto for Mac is a prototyping tool for designers. Import all your Sketch artboards as screens. Then design custom animated transitions with gesture control."
                  coverBg="bg-[#EDF5FF]" 
                  heroContent={
                     <div className="text-[70px] transform -rotate-12 drop-shadow-xl text-[#FF85B3]">
                        <div className="relative">
                           <div className="w-[60px] h-[60px] bg-[#3B5998] rounded-tl-[30px] rounded-br-[30px] rounded-tr flex items-center justify-center shadow-inner">
                              <div className="w-1/2 h-1/2 border-[4px] border-white rounded-full"></div>
                           </div>
                           <div className="absolute top-[-20px] right-[-20px] transform rotate-45 text-[#E74C3C] text-[30px]">⚙️</div>
                        </div>
                     </div>
                  } />

               <PluginCard 
                  title="Abstract" author="" 
                  desc="Abstract is the design workflow management system that empowers design teams and stakeholders to seamlessly manage, version, and collaborate on Sketch files."
                  coverBg="bg-[#FAFAFA]" 
                  heroContent={
                     <div className="w-[70px] h-[70px] bg-black rounded-lg text-white font-bold flex items-center justify-center flex-col leading-none shadow-xl transform rotate-3">
                        <span className="text-[32px]">ō</span>
                        <span className="text-[32px] transform scale-y-[-1] mt-[-5px]">ō</span>
                     </div>
                  } />

               <PluginCard 
                  title="Overlay" author="" 
                  desc="Overlay transforms your design components into clean React, Vue and HTML components, making developer handoff faster and easier than ever."
                  coverBg="bg-[#EBF7F8]" 
                  heroContent={
                     <div className="w-[60px] h-[60px] rounded-full border-[10px] border-[#10304C] relative transform rotate-45 flex items-center justify-center">
                        <div className="absolute top-[-15px] left-[50%] w-[12px] h-[12px] rounded-full bg-[#1CD7D4]"></div>
                        <div className="absolute bottom-[50%] right-[-15px] w-[12px] h-[12px] rounded-full bg-[#1CD7D4]"></div>
                     </div>
                  } />

               <PluginCard 
                  title="Zeplin" author="" 
                  desc="Zeplin enables collaboration between UI designers and front-end developers, allowing designers to create specs and guidelines quickly and easily."
                  coverBg="bg-[#F6BE40]" 
                  heroContent={
                     <div className="text-[60px] relative drop-shadow-md">
                        🟡
                        <div className="absolute inset-0 flex items-center justify-center transform 
                           rotate-[30deg]">
                           <div className="w-[90px] h-[30px] rounded-full border border-white/40 absolute"></div>
                           <div className="w-[30px] h-[90px] rounded-full border border-white/40 absolute mt-[-10px] ml-[-5px]"></div>
                        </div>
                     </div>
                  } />
            </div>
         </section>
         
         
         {/* Bottom Action Section: Create your own extensions */}
         <section id="create" className="max-w-[1240px] mx-auto px-6 py-24 mb-12 border-t border-gray-100 flex flex-col md:flex-row items-center gap-16 justify-between">
            <div className="md:w-1/2">
               <h2 className="text-[36px] font-black text-[#1D1C1B] tracking-tight mb-6">Want to create your own extensions?</h2>
               <p className="text-[19px] font-medium text-gray-500 leading-relaxed mb-10 max-w-lg">
                  Check our developer documentation, or join the community on our <a href="#" className="font-bold text-[#FD6B22] hover:underline">developer forums</a>. If you have any questions, you can <a href="#" className="font-bold text-[#FD6B22] hover:underline">get in touch</a> with us. We're happy to help!
               </p>
               <button className="bg-[#FD6B22] text-white px-8 py-3.5 rounded-lg text-[15px] font-bold shadow-md hover:bg-[#E55A16] transition duration-300">
                  Read the documentation
               </button>
            </div>
            <div className="md:w-[400px] h-[300px] bg-[#FCF8EC] rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
               {/* Decorative background grid in card */}
               <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
               
               {/* 3D Plug Icon (CSS) */}
               <div className="w-[180px] h-[180px] rounded-full relative z-10 flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #FF9C3B, #F66810)', boxShadow: '0 20px 40px rgba(246,104,16,0.3), inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.3)'}}>
                  <div className="flex gap-8 mt-[-10px]">
                     <div className="w-6 h-6 rounded-full bg-[#651A1A] shadow-inner"></div>
                     <div className="w-6 h-6 rounded-full bg-[#651A1A] shadow-inner"></div>
                  </div>
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
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm bg-white" />
                  <button className="bg-[#E7BA9A] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80 transition">Try it out</button>
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
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition flex items-center">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Learn</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
               </ul>
               </div>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400 font-medium">
               <div className="md:w-1/3 content-start"><Logo /></div>
               <p className="mb-4 md:mb-0 md:w-1/3 text-center">© 2026 Sketch B.V.</p>
               <div className="flex gap-6 text-xl md:w-1/3 justify-end relative bottom-4">
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">𝕏</span>
                  <span className="hover:text-[#1D1C1B] cursor-pointer transition">◎</span>
               </div>
            </div>
         </footer>

      </div>
   );
}
