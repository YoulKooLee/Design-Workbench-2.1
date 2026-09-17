/**
 * @name Sketch Apps
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

const TopBar = () => (
   <div className="bg-[#FAFAFA] border-b border-gray-100 text-center py-2 text-[13px] font-bold text-gray-600 hover:text-black cursor-pointer transition">
      <span className="opacity-80">💻</span> Ready to create your best work? Here's how Sketch can help! →
   </div>
);

const Nav = () => (
   <header className="bg-white w-full z-50">
      <TopBar />
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
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2.5 rounded-lg hover:bg-black transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const Badge = ({ children }) => (
   <div className="bg-[#F0F2F4] text-gray-500 text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded inline-block mb-6">
      {children}
   </div>
);


export default function P14Apps() {
   return (
      <div className="min-h-screen bg-white overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         {/* Hero Text */}
         <section className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24 pb-20">
            <h1 className="text-[52px] md:text-[76px] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-8">
               Every hero needs a<br/>sidekick. We have two.
            </h1>
            <p className="text-[20px] md:text-[23px] font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed">
               Create with our award-winning macOS app, share your projects in the browser (on any platform), and take Sketch with you.
            </p>
         </section>

         {/* Giant Colorful Background & The Core Container */}
         <section className="relative w-full pb-32 px-6">
            
            {/* The dramatic background gradients */}
            <div className="absolute top-[5%] left-0 w-full h-[120%] -z-20 overflow-hidden pointer-events-none">
               {/* Left Pink Angle */}
               <div className="absolute top-0 left-[-10%] w-[60%] h-[100%] bg-gradient-to-br from-pink-200/50 to-pink-500/30 transform -rotate-12 translate-y-20 blur-2xl"></div>
               {/* Right Orange/Purple Angle */}
               <div className="absolute top-[10%] right-[-10%] w-[60%] h-[100%] bg-gradient-to-tl from-yellow-300/60 via-orange-400/50 to-purple-500/20 transform rotate-[15deg] blur-2xl"></div>
               {/* Center highlight */}
               <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-white/40 blur-3xl rounded-full"></div>
            </div>

            {/* The Main Container */}
            <div className="max-w-[1240px] mx-auto bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.8)] flex flex-col relative z-10">
               
               {/* --- Block 1: Mac App --- */}
               <div className="flex flex-col md:flex-row items-center border-b border-gray-100 p-8 md:p-16 lg:p-24 min-h-[500px]">
                  {/* Left: UI Showcase */}
                  <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] mb-12 md:mb-0">
                     <div className="absolute top-0 right-0 w-[95%] h-[80%] bg-gray-100 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* fake mac ui */}
                        <img src="https://picsum.photos/800/600?random=141" className="w-full h-full object-cover object-left-top" />
                     </div>
                     <div className="absolute top-[30%] left-[-5%] w-[60%] h-[60%] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* fake inspector panel */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center"><span className="text-[10px] font-bold">Overrides</span><span className="text-gray-400">↻</span></div>
                        <img src="https://picsum.photos/300/400?random=142" className="w-full h-full object-cover" />
                     </div>
                     
                     {/* Floating Dock Icons */}
                     <div className="absolute bottom-[-20px] left-[10%] bg-white/80 backdrop-blur-md px-6 py-3 rounded-3xl shadow-xl border border-white flex gap-4 items-end">
                        <div className="w-14 h-14 bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500 rounded-[14px] shadow-lg flex items-center justify-center transform -translate-y-2 hover:-translate-y-4 transition cursor-pointer">🌸</div>
                        <div className="w-14 h-14 bg-white rounded-[14px] shadow-lg flex flex-col items-center justify-center border border-gray-100 transform hover:-translate-y-2 transition cursor-pointer text-center relative overflow-hidden"><div className="bg-red-500 text-white text-[8px] font-bold w-full pt-1 pb-0.5 absolute top-0">SEP</div><div className="text-2xl font-black mt-2">7</div></div>
                        <div className="w-16 h-16 bg-white rounded-[16px] shadow-2xl flex items-center justify-center transform -translate-y-6 flex-col relative z-10 mx-2 hover:-translate-y-8 transition cursor-pointer border border-white"><div className="w-2 h-1 bg-black/20 rounded-full blur-[2px] absolute -bottom-3"></div><div className="text-4xl filter drop-shadow-md">💎</div></div>
                        <div className="w-14 h-14 bg-gradient-to-b from-blue-300 to-blue-500 rounded-[14px] shadow-lg flex items-center justify-center transform hover:-translate-y-2 transition cursor-pointer border-t border-blue-200"><div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">↓</div></div>
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-300 rounded-[14px] shadow-lg flex items-center justify-center transform hover:-translate-y-2 transition cursor-pointer overflow-hidden border border-gray-200">🗑️</div>
                     </div>
                  </div>

                  {/* Right: Trxt */}
                  <div className="w-full md:w-1/2 md:pl-16 relative z-10">
                     <Badge>For Editors</Badge>
                     <h2 className="text-[40px] font-black text-[#1D1C1B] mb-6 leading-tight tracking-tight">Design on your Mac</h2>
                     <p className="text-[19px] font-medium text-gray-600 mb-10 leading-relaxed">
                        Design, prototype, and illustrate in a truly native macOS app, online or offline. Work in private or collaborate with others, in real time.
                     </p>
                     
                     <div className="bg-[#FAF7FD] border border-purple-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#F3EDFC] transition mb-10 shadow-sm w-max pr-8 group">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition">🗂️</div>
                        <div className="text-[15px] text-[#1D1C1B] font-medium leading-snug">Everything you need to know about the <br/>Sketch <strong className="font-black">Mac app</strong> <span className="opacity-50">→</span></div>
                     </div>

                     <button className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-[15px] shadow-md hover:bg-gray-800 transition mb-4">Download for macOS</button>
                     <div className="text-[13px] font-bold text-[#1D1C1B]">
                        <a href="#" className="hover:text-sketch-orange">Browse old versions</a> <span className="px-1 opacity-50">·</span> <a href="#page=01-switch-to-sketch" className="hover:text-sketch-orange">Download Beta</a>
                     </div>
                  </div>
               </div>


               {/* --- Block 2: Web App --- */}
               <div className="flex flex-col-reverse md:flex-row items-center border-b border-gray-100 p-8 md:p-16 lg:p-24 min-h-[500px]">
                  {/* Left: Text */}
                  <div className="w-full md:w-1/2 md:pr-16 relative z-10 mt-12 md:mt-0">
                     <Badge>For Everyone</Badge>
                     <h2 className="text-[40px] font-black text-[#1D1C1B] mb-6 leading-tight tracking-tight">Explore in your browser</h2>
                     <p className="text-[19px] font-medium text-gray-600 mb-10 leading-relaxed">
                        Browse documents, inspect designs, export assets, discuss feedback, manage users, and invite guests — on any computer, in any browser.
                     </p>
                     
                     <div className="bg-[#FFFDF3] border border-yellow-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#FFF9DE] transition mb-10 shadow-sm w-max pr-8 group">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-yellow-100 flex items-center justify-center text-2xl group-hover:scale-110 transition">🧩</div>
                        <div className="text-[15px] text-[#1D1C1B] font-medium leading-snug">Everything you need to know about the <br/>Sketch <strong className="font-black">Web app</strong> <span className="opacity-50">→</span></div>
                     </div>

                     <button className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-[15px] shadow-md hover:bg-gray-800 transition">Open the web app</button>
                  </div>

                  {/* Right: UI Showcase */}
                  <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                     <div className="absolute top-0 right-[-10%] w-[110%] h-[95%] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
                        {/* fake web ui */}
                        <div className="h-10 bg-gray-50 flex items-center gap-2 px-4 border-b border-gray-200">
                           <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div></div>
                           <div className="ml-4 bg-white h-6 rounded flex-1 border border-gray-200 max-w-sm flex items-center px-3 text-[10px] text-gray-400 font-medium">💎 Sketch - Documents</div>
                        </div>
                        <img src="https://picsum.photos/900/600?random=143" className="w-full h-full object-cover object-left-top" />
                     </div>
                  </div>
               </div>


               {/* --- Block 3: iPhone App --- */}
               <div className="flex flex-col md:flex-row items-center p-8 md:p-16 lg:p-24 min-h-[500px]">
                  {/* Left: UI Showcase */}
                  <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] mb-12 md:mb-0 flex items-end">
                     
                     {/* iPhone 1 (back) */}
                     <div className="absolute bottom-0 left-[5%] w-[45%] h-[85%] bg-black rounded-[2.5rem] shadow-2xl border-[6px] border-black overflow-hidden transform -rotate-6 z-10 mask-iphone group cursor-pointer hover:rotate-[-8deg] hover:-translate-x-2 transition duration-500">
                        {/* fake screen */}
                        <img src="https://picsum.photos/400/800?random=144" className="w-full h-full object-cover" />
                        {/* notch fake */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-xl"></div>
                     </div>

                     {/* iPhone 2 (front) */}
                     <div className="absolute bottom-[-10px] left-[35%] w-[50%] h-[95%] bg-black rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[8px] border-black border-r-gray-800 border-b-gray-800 overflow-hidden z-20 mask-iphone group cursor-pointer hover:-translate-y-4 hover:scale-[1.02] transition duration-500">
                        {/* fake screen */}
                        <div className="w-full h-full bg-white relative">
                           <div className="h-10 border-b border-gray-50 flex items-end px-6 pb-2 text-[10px] font-bold"><span className="text-gray-400">9:41</span><div className="ml-auto flex gap-1"><span className="opacity-50">📶</span><span className="opacity-50">🔋</span></div></div>
                           <img src="https://picsum.photos/400/800?random=145" className="w-full h-full object-cover" />
                        </div>
                        {/* notch fake */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[45%] h-7 bg-black rounded-b-2xl shadow-inner border border-gray-800 border-t-0"></div>
                        {/* home bar fake */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1.5 bg-black/20 rounded-full"></div>
                     </div>

                  </div>

                  {/* Right: Text */}
                  <div className="w-full md:w-1/2 md:pl-16 relative z-10">
                     <Badge>For Everyone</Badge>
                     <h2 className="text-[40px] font-black text-[#1D1C1B] mb-6 leading-tight tracking-tight">Preview on iPhone</h2>
                     <p className="text-[19px] font-medium text-gray-600 mb-10 leading-relaxed">
                        View your documents on the go, play prototypes on a real device, and mirror designs as you edit them on your Mac.
                     </p>

                     <button className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-[15px] shadow-md hover:bg-gray-800 transition mb-6">Download on the App Store</button>
                     
                     <p className="text-[14px] font-medium text-gray-400 leading-relaxed max-w-sm">
                        Our iPhone app works exclusively with Workspace documents.
                     </p>
                  </div>
               </div>

            </div>
         </section>

         {/* Standard Footer */}
         <footer className="pt-16 pb-8 bg-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-2 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm" />
                  <button className="bg-[#99A3AB] text-white px-6 py-2 rounded-md text-sm font-semibold shadow-sm hover:opacity-80">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1 border-gray-300 rounded-sm" />
                  <span className="text-[12px] text-gray-500 font-medium">I agree to receive marketing emails from Sketch.</span>
               </div>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Product</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=07-whats-new" className="hover:text-black transition">What's New <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=08-design-collaborate" className="hover:text-black transition">Design</a></li>
                  <li><a href="#page=10-collaborative-design" className="hover:text-black transition">Collaboration</a></li>
                  <li><a href="#page=05-prototyping-tools" className="hover:text-black transition">Prototyping</a></li>
                  <li><a href="#page=04-developer-handoff" className="hover:text-black transition">Developer Handoff</a></li>
                  <li><a href="#page=09-workspace" className="hover:text-black transition">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
                  <li><a href="#" className="hover:text-black transition flex items-center gap-2">Apps <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm border border-gray-200 shadow-sm font-bold">3</span></a></li>
                  <li><a href="#page=20-plugins" className="hover:text-black transition">Extensions</a></li>
                  <li><a href="#page=12-pricing" className="hover:text-black transition">Pricing</a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Adobe XD</a></li>
                  <li><a href="#page=16-education" className="hover:text-black transition">Free for Education <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Learn</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=13-documentation" className="hover:text-black transition">Documentation</a></li>
                  <li><a href="#page=11-community" className="hover:text-black transition">Events & Meetups</a></li>
                  <li><a href="#page=25-newsletter" className="hover:text-black transition">Newsletter</a></li>
                  <li><a href="#page=15-labs" className="hover:text-black transition">Sketch Labs</a></li>
                  <li><a href="#page=23-developer" className="hover:text-black transition flex items-center justify-between group block">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
               </ul>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400 font-medium">
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
