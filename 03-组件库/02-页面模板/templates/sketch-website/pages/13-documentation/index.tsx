/**
 * @name Documentation Hub
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
   <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-[15px] font-semibold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product v</a>
            <a href="#" className="hover:text-sketch-orange transition">Learn v</a>
            <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
            <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
            <a href="#" className="hover:text-sketch-orange transition">Why Sketch v</a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-[15px] font-semibold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block text-gray-500">Support v</a>
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition text-sketch-orange font-bold">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#E9611D] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#D55719] transition">Get started for free</a>
         </div>
      </div>

      {/* Sub Nav Bar */}
      <div className="bg-[#FAFAFA] border-t border-gray-100 py-3 px-6">
         <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm">
            <a href="#page=13-documentation" className="font-bold text-[#1D1C1B] flex items-center gap-2 hover:text-sketch-orange transition"><span className="text-lg leading-none">‹</span> Documentation</a>
            <div className="relative w-64">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
               <input type="text" placeholder="Looking for something specific?" className="w-full bg-white border border-gray-200 rounded text-xs px-8 py-2 focus:outline-none focus:border-sketch-orange focus:ring-1 focus:ring-sketch-orange shadow-sm" />
            </div>
         </div>
      </div>
   </header>
);

const DocCard = ({ icon, title, desc }) => (
   <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.02)] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300 border border-transparent hover:border-gray-50 flex flex-col h-full group cursor-pointer">
      <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition duration-500 origin-bottom-left w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl shadow-inner border border-gray-100">{icon}</div>
      <h4 className="text-[17px] font-bold text-[#1D1C1B] mb-2 leading-tight">{title}</h4>
      <p className="text-[14px] text-gray-500 leading-relaxed font-medium mt-auto">{desc}</p>
   </div>
);


export default function P13Documentation() {
   return (
      <div className="min-h-screen bg-[#FDFDFD] overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row relative">
            
            {/* Background Watermark Geometries */}
            <div className="absolute top-0 right-[10%] w-[1000px] h-[1000px] pointer-events-none -z-10 overflow-hidden opacity-[0.03]">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full transform object-cover">
                  <polygon points="0,0 100,50 50,100" fill="#000" />
                  <polygon points="100,0 100,100 0,100" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="2,2"/>
                  <polygon points="20,20 80,40 40,80" fill="none" stroke="#000" strokeWidth="0.5" />
               </svg>
            </div>

            {/* Sidebar (Contents) */}
            <aside className="w-full md:w-64 shrink-0 pr-8 hidden md:block">
               <h3 className="text-[26px] font-black text-[#1D1C1B] mb-6 tracking-tight">Contents</h3>
               <ul className="flex flex-col gap-4">
                  <li>
                     <a href="#" className="font-bold text-[#E9611D] text-[15px] block">Docs</a>
                     <ul className="pl-4 mt-3 flex flex-col gap-3">
                        <li><a href="#page=07-whats-new" className="text-[13px] text-[#E9611D] font-medium block">What's new?</a></li>
                        <li><a href="#resources" className="text-[13px] text-gray-500 hover:text-black font-medium block">Resources</a></li>
                        <li><a href="#help" className="text-[13px] text-gray-500 hover:text-black font-medium block">Need some help?</a></li>
                     </ul>
                  </li>
                  {['Workspaces', 'Designing', 'Prototyping', 'Importing & Exporting', 'Preferences', 'Plugins', 'Browsing in the web app', 'Managing documents', 'Sharing & Permissions', 'Comments & Notifications', 'Developer Handoff', 'Single Sign-On (SSO)', 'iPhone', 'Glossary'].map((item) => (
                     <li key={item}>
                        <a href="#" className="font-bold text-[#1D1C1B] text-[15px] hover:text-[#E9611D] transition block">{item}</a>
                     </li>
                  ))}
               </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:pl-12 lg:pr-24">
               {/* Intro Block */}
               <div className="mb-16">
                  <h1 className="text-[48px] md:text-[56px] font-black text-[#1D1C1B] tracking-tight mb-8">Docs</h1>
                  <p className="text-[22px] md:text-[24px] text-[#1D1C1B]/90 font-medium leading-relaxed mb-8 max-w-3xl">
                     This documentation is your Sketch reference manual. No matter how experienced you are or what you want to achieve, it should cover everything you need to know — from navigating the interface, to making the most of different features.
                  </p>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium max-w-3xl">
                     If you're an absolute beginner looking for some help getting started, or a Sketch veteran looking for in-depth guides on things like best practice or collaboration, we've listed some of our favourite courses and resources below.
                  </p>
               </div>

               {/* Section 1: What's new */}
               <section id="whats-new" className="mb-16">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] tracking-tight mb-8">What's new?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <DocCard 
                        icon={<span className="text-orange-500 drop-shadow-md">🧭</span>}
                        title="Discover"
                        desc="A curated selection of content to stay in the loop or learn something new — right inside your Workspace."
                     />
                     <DocCard 
                        icon={<span className="text-pink-400 drop-shadow-md">🎛️</span>}
                        title="Components web view"
                        desc="Browse, search and inspect all your Components, right in the web app."
                     />
                     <DocCard 
                        icon={<span className="text-yellow-500 drop-shadow-md">💡</span>}
                        title="Canvas view"
                        desc="View Sketch documents in your browser exactly as you see them in the Mac app."
                     />
                     <DocCard 
                        icon={<span className="text-purple-600 drop-shadow-md">💠</span>}
                        title="Workspaces"
                        desc="Store, share and sync documents across the Sketch platform."
                     />
                     <DocCard 
                        icon={<span className="text-blue-500 drop-shadow-md">🎇</span>}
                        title="Real-time collaboration"
                        desc="Work together on the same document and see everyone's changes instantly."
                     />
                     <DocCard 
                        icon={<span className="text-teal-400 drop-shadow-md">🔍</span>}
                        title="Developer handoff improvements"
                        desc="Better designer-developer collaboration with big developer handoff updates"
                     />
                  </div>
               </section>

               {/* Section 2: Resources */}
               <section id="resources" className="mb-16">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] tracking-tight mb-8">Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Faking specific logo icons with HTML text & shapes */}
                     <DocCard 
                        icon={<span className="text-gray-800 drop-shadow-md">🎓</span>}
                        title="Sketch 101 — Create your first designs"
                        desc="Get started in Sketch today with our free beginner's course."
                     />
                     <DocCard 
                        icon={<div className="w-8 h-8 rounded border-2 border-gray-300 flex items-center justify-center gap-1 group-hover:bg-gray-100"><div className="w-1 h-1 bg-gray-400 rounded-full"></div><div className="w-1 h-1 bg-gray-400 rounded-full"></div></div>}
                        title="Plugins & Integrations"
                        desc="Do even more with Sketch with the help of handy plugins and powerful integrations."
                     />
                     <DocCard 
                        icon={<div className="w-8 h-8 bg-[#EF5B5B] rounded-[8px] text-white flex items-center justify-center font-serif italic font-bold">S</div>}
                        title="Sketch App Sources"
                        desc="Thousands of curated free resources for designing, prototyping, and iterating."
                     />
                     <DocCard 
                        icon={<div className="w-8 h-8 bg-black rounded-lg text-white font-bold text-[11px] relative flex shadow-lg"><span className="m-auto font-black leading-none">UI</span><span className="absolute -top-1 -right-1 bg-blue-500 text-[9px] w-4 h-4 rounded-full flex items-center justify-center">8</span></div>}
                        title="UI8"
                        desc="Premium resources including UI kits, design systems, wireframes, illustrations, and more."
                     />
                     <DocCard 
                        icon={<div className="w-8 h-8 bg-black rounded border-2 border-yellow-500 flex items-center justify-center font-bold text-yellow-500 shadow-md">D</div>}
                        title="Design + Sketch"
                        desc="Discover Sketch articles and tutorials from designers around the world on Medium."
                     />
                     <DocCard 
                        icon={<div className="w-8 h-8 bg-black rounded-lg text-white p-1"><svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="6"><path d="M20 20 L80 50 L20 80 Z" /><path d="M20 20 L20 80" /></svg></div>}
                        title="Design+Code"
                        desc="An interactive book on how to design and code an iOS app; from Sketch to native development."
                     />
                  </div>
               </section>

               {/* Section 3: Help */}
               <section id="help" className="mb-32">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] tracking-tight mb-6">Need some help?</h2>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium mb-12 max-w-3xl">
                     If you run into any issues with Sketch, you might find the answer in our <a href="#page=22-support" className="text-[#E9611D] hover:underline font-bold">Support section</a>. You'll also find details there on how to contact our friendly support team, just in case you can't find an answer to your question.
                  </p>

                  <div className="text-[13px] text-gray-400 font-medium">
                     Last updated on 01 Sep 2021
                  </div>
               </section>

               {/* CTA Banner */}
               <div className="w-full relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FD0C0B] via-[#FC5F0B] to-[#FEAD0B] p-12 text-center text-white mb-20 shadow-xl lg:w-[110%] lg:-ml-[5%] h-[250px] flex flex-col items-center justify-center">
                  <div className="absolute inset-0 z-0 select-none opacity-40">
                     {/* Faking the sharp polygon background cuts */}
                     <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
                        <polygon points="0,300 400,0 600,300" fill="rgba(255,255,255,0.1)"></polygon>
                        <polygon points="500,0 1000,0 800,200" fill="rgba(255,255,255,0.05)"></polygon>
                        <polygon points="0,0 200,0 100,150" fill="rgba(0,0,0,0.1)"></polygon>
                     </svg>
                  </div>
                  <div className="relative z-10 w-full">
                     <h2 className="text-[36px] font-black tracking-tight mb-2">Get started with Sketch today</h2>
                     <p className="text-[20px] mb-8 font-medium opacity-90">Turn your ideas into incredible products with a 30-day trial.</p>
                     <button className="bg-white text-[#1D1C1B] px-8 py-3.5 rounded-lg text-[15px] font-bold hover:shadow-lg hover:-translate-y-0.5 transition duration-300 mx-auto block max-w-max">Get started for free</button>
                  </div>
               </div>

            </main>
         </div>

         {/* Footer */}
         <footer className="pt-16 pb-8 bg-[#FAFAFA] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-2 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-sm text-gray-500 mb-6 font-medium">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm" />
                  <button className="bg-[#EFA98E] text-white px-6 py-2 rounded-md text-sm font-semibold shadow-sm hover:opacity-80">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
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
                  <li><a href="#" className="hover:text-black transition flex items-center gap-2">Apps <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm font-bold shadow-sm">3</span></a></li>
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
                  <li><a href="#page=23-developer" className="hover:text-black transition flex items-center justify-between group">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
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
