/**
 * @name Prototyping Tools for Everyone
 */
import React from 'react';
import './style.css';

const Logo = () => (
   <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M16 2L2 10L16 30L30 10L16 2Z" fill="#FDAD00"/>
     <path d="M16 2L9 10L16 30L16 2Z" fill="#F48A00"/>
     <path d="M16 2L23 10L16 30L16 2Z" fill="#FFC959"/>
     <path d="M2 10L9 10L16 30L2 10Z" fill="#E27300"/>
     <path d="M30 10L23 10L16 30L30 10Z" fill="#FFE29E"/>
     <path d="M9 10H23L16 2L9 10Z" fill="#FFE29E"/>
   </svg>
 );
 
 const Nav = () => (
   <header className="absolute top-0 w-full z-50">
     <div className="bg-[#FFF3D4] text-center py-2 text-sm font-medium">
       Ready to create your best work? Here's how Sketch can help! →
     </div>
     <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between sticky top-0 px-6 py-4">
       <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-sm font-semibold text-[#1D1C1B]">
           <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product v</a>
           <a href="#" className="hover:text-sketch-orange transition">Learn v</a>
           <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
           <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
           <a href="#" className="hover:text-sketch-orange transition">Why Sketch v</a>
         </nav>
       </div>
       <div className="flex items-center space-x-6 text-sm font-semibold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block">Support v</a>
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Sign In</a>
         <a href="#page=12-pricing" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">Get started for free</a>
       </div>
     </div>
   </header>
 );

 // Mocking prototype connection line with SVG
 const PrototypeConnection = ({ className }) => (
    <svg className={`absolute z-0 pointer-events-none opacity-50 ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M 0 100 Q 100 100 100 0 T 200 -100" stroke="#FDAD00" strokeWidth="2" strokeDasharray="4 4" fill="transparent" />
       <circle cx="0" cy="100" r="5" fill="#FDAD00" />
       <circle cx="200" cy="-100" r="5" fill="white" stroke="#FDAD00" strokeWidth="2"/>
    </svg>
 );

 const Hero = () => (
   <section className="relative pt-40 pb-32 px-6 overflow-hidden flex flex-col items-center">
     <div className="absolute top-1/4 -left-1/4 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-300 via-rose-200 to-orange-100 rounded-full blur-[140px] mix-blend-multiply opacity-30 -z-10"></div>
     <div className="absolute top-1/3 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-bl from-purple-100 via-pink-200 to-orange-200 rounded-full blur-[140px] mix-blend-multiply opacity-30 -z-10"></div>
 
     <div className="text-center relative z-10 max-w-4xl mx-auto mt-8 mb-16">
       <div className="relative inline-block">
          {/* Top connection line decors */}
          <div className="absolute -left-32 top-10 w-24 h-[2px] bg-dashed-orange border-t-2 border-dashed border-[#FDAD00]/40"></div>
          <div className="absolute -left-32 top-10 w-3 h-3 rounded-full border-2 border-[#FDAD00] bg-white -translate-y-[5px]"></div>
          
          <div className="absolute -right-32 top-[120px] w-24 h-[2px] bg-dashed-orange border-t-2 border-dashed border-[#FDAD00]/40"></div>
          <div className="absolute right-[-128px] top-[120px] w-3 h-3 rounded-full border-2 border-[#FDAD00] bg-[#FDAD00] -translate-y-[5px]"></div>

          <h1 className="text-5xl md:text-[6rem] font-black tracking-tighter leading-[1.05] mb-6 text-[#1D1C1B]">
             Build Prototypes.<br/>Share them anywhere.
          </h1>
       </div>

       <p className="text-xl md:text-[22px] text-sketch-gray max-w-2xl mx-auto leading-relaxed mb-10">
         Let your big ideas speak for themselves. Prototype with Sketch and bring your concepts to life.
       </p>
       
       <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg shadow-xl mb-12">
         Get started for free
       </a>
       
       <div className="flex flex-col items-center mb-10">
         <p className="text-[11px] font-bold tracking-[0.2em] text-[#A0A09B] uppercase mb-5">No need for plugins like</p>
         <div className="flex items-center justify-center gap-6 opacity-30 grayscale filter">
            <span className="font-bold text-2xl tracking-tight">inVision</span>
            <span className="font-bold text-2xl italic tracking-tighter">Marvel</span>
         </div>
       </div>
     </div>

     {/* Floating Screenshots Group */}
     <div className="w-full max-w-[1200px] h-[500px] relative mx-auto mt-8 z-10">
        <PrototypeConnection className="top-1/4 left-1/3 w-64 h-64 transform scale-150" />
        
        {/* Left Mobile */}
        <div className="absolute left-0 bottom-[-50px] w-1/4 max-w-[280px] rounded-[2rem] shadow-2xl border-8 border-black overflow-hidden z-30 transform hover:-translate-y-4 hover:rotate-1 transition duration-500">
           <img src="https://picsum.photos/400/800?random=111" className="w-full h-auto" alt="Mobile App screen" />
        </div>
        {/* Center UI Dialog */}
        <div className="absolute left-[20%] top-[-100px] w-1/3 max-w-[380px] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100/50 bg-white overflow-hidden z-20 hover:-translate-y-2 transition duration-500">
           <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-sm">Search</span>
              <span className="text-gray-400">✖</span>
           </div>
           <img src="https://picsum.photos/600/700?random=112" className="w-full h-auto" alt="Dialog screen" />
        </div>
        {/* Right Desktop */}
        <div className="absolute right-0 top-[20px] w-[55%] max-w-[700px] rounded-2xl shadow-2xl border border-gray-100 bg-white overflow-hidden z-10 hover:shadow-3xl hover:translate-x-2 hover:-translate-y-2 transition duration-500">
           <img src="https://picsum.photos/1200/850?random=113" className="w-full h-auto" alt="Desktop Web screen" />
        </div>
     </div>
   </section>
 );

 // Mocking 3D Icons
 const BulbIcon = () => (
    <div className="w-20 h-20 mb-8 mx-auto relative group">
       <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-pink-400 to-yellow-400 rounded-full blur-[10px] opacity-60"></div>
       <div className="absolute inset-2 bg-gradient-to-t from-gray-100 to-white rounded-full shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)] border border-white/50 flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300 z-10">
          💡
       </div>
    </div>
 );

 const SpringIcon = () => (
    <div className="w-20 h-20 mb-8 mx-auto relative group">
       <div className="absolute inset-0 bg-gradient-to-b from-orange-300 to-yellow-500 rounded-[10px] blur-[10px] opacity-40"></div>
       <div className="absolute inset-2 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-xl shadow-[inset_0_5px_15px_rgba(255,255,255,0.8)] border border-yellow-200 flex items-center justify-center text-4xl transform group-hover:-rotate-12 transition-transform duration-300 z-10">
          🌀
       </div>
    </div>
 );

 const CompassIcon = () => (
    <div className="w-20 h-20 mb-8 mx-auto relative group">
       <div className="absolute inset-0 bg-gradient-to-bl from-gray-300 to-gray-500 rounded-full blur-[10px] opacity-40"></div>
       <div className="absolute inset-2 bg-gradient-to-r from-gray-100 to-gray-300 rounded-full shadow-[inset_0_-5px_10px_rgba(0,0,0,0.2)] border border-gray-400 flex items-center justify-center text-4xl transform group-hover:rotate-45 transition-transform duration-300 z-10">
          🧭
       </div>
    </div>
 );

 const BlocksIcon = () => (
    <div className="w-20 h-20 mb-8 mx-auto relative group">
       <div className="absolute inset-0 bg-gray-400 rounded-[8px] blur-[12px] opacity-30"></div>
       <div className="absolute inset-2 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-4xl transform group-hover:-translate-y-2 transition-transform duration-300 z-10">
          🧩
       </div>
    </div>
 );

 const PrototypingPoint = ({ title, text, showBullet = true }) => (
    <div className="mb-10 last:mb-0 relative">
      <div className="flex gap-4">
        {showBullet && (
           <div className="mt-[6px] shrink-0 w-4 h-4 rounded-full border-[3px] border-[#FDAD00] flex items-center justify-center relative bg-white z-10">
              <div className="w-1.5 h-1.5 bg-[#FDAD00] rounded-full"></div>
              {/* Fake connecting line for bullet */}
              <div className="absolute top-4 left-[5px] w-[2px] h-24 bg-[#FDAD00]/30 -z-10"></div>
           </div>
        )}
        {!showBullet && <div className="mt-1 text-[#FDAD00] font-bold shrink-0 text-xl leading-none">○</div>}
        <div>
          <h3 className="font-bold text-[17px] text-[#1D1C1B] mb-2 leading-tight">{title}</h3>
          <p className="text-[15px] leading-relaxed text-sketch-gray">{text}</p>
        </div>
      </div>
    </div>
  );

  const TitleHeader = ({ title, desc, Icon }) => (
     <div className="text-center max-w-2xl mx-auto mb-20 px-6">
        <Icon />
        <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 leading-tight tracking-tight">{title}</h2>
        <p className="text-lg md:text-[20px] text-sketch-gray leading-relaxed">{desc}</p>
     </div>
  );

  // iPhone Showcase Ribbon
  const MobileAppBanner = () => (
     <section className="py-24 px-6 relative mt-10">
        <div className="max-w-[1200px] mx-auto bg-[#F9F9F8] rounded-[2rem] p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
           
           <div className="flex-1 relative w-full h-[300px] md:h-[400px] mb-12 md:mb-0">
              {/* iPhone Mockups Overlapping */}
              <img src="https://picsum.photos/300/600?random=200" className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[220px] md:w-[260px] rounded-[2rem] border-[6px] border-black shadow-2xl z-20" alt="App Front" />
              <img src="https://picsum.photos/300/600?random=201" className="absolute left-[5%] top-[10%] w-[200px] md:w-[230px] rounded-[2rem] border-[6px] border-white shadow-xl z-10 blur-[1px] opacity-80" alt="App Back" />
           </div>

           <div className="flex-1 md:pl-20 relative z-30">
               <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase mb-6 inline-block">iPhone App</span>
               <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 leading-tight">If it's made for mobile, test it there</h2>
               <p className="text-[17px] text-sketch-gray mb-8 leading-relaxed max-w-md">
                 Building a mobile app? Take out the guesswork of previewing in a desktop browser. Get the real experience by testing prototypes in our iPhone app, or on your mobile browser of choice.
               </p>
               <a href="#page=01-switch-to-sketch" className="inline-block bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition text-[15px] shadow-lg mb-4">
                 Download on the App Store
               </a>
               <p className="text-xs text-gray-400">Our iPhone app works exclusively with Workspace documents.</p>
           </div>
        </div>
     </section>
  );

  const WhatsNew = () => (
    <section className="py-24 text-center border-t border-gray-100 bg-white">
      <h2 className="text-4xl md:text-[42px] font-black mb-4">What's new?</h2>
      <p className="text-sketch-gray text-[17px] mb-16 max-w-md mx-auto leading-relaxed">We're always improving things around here. Here's what we've been up to recently:</p>
      
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] mx-auto px-6 justify-center">
        <div className="bg-[#F9F9F8] hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer p-12 rounded-[2rem] flex-1 flex flex-col items-center justify-center min-h-[250px] border border-transparent hover:border-gray-100">
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl">
            <span className="text-green-500 filter drop-shadow-sm">⎚</span>
          </div>
          <p className="font-bold text-[15px] text-[#1D1C1B]">Overlays in prototypes →</p>
        </div>
        <div className="bg-[#F9F9F8] hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer p-12 rounded-[2rem] flex-1 flex flex-col items-center justify-center min-h-[250px] border border-transparent hover:border-gray-100">
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl">
             <span className="text-orange-500 filter drop-shadow-sm">📱</span>
          </div>
          <p className="font-bold text-[15px] text-[#1D1C1B]">New and improved iPhone app →</p>
        </div>
      </div>
    </section>
  );
  
  const FooterCTA = () => (
    <section className="py-24 px-4 bg-white text-center">
      <div className="bg-gradient-to-br from-[#A7D753] to-[#7BC86A] rounded-[3rem] py-24 px-10 max-w-[1200px] mx-auto flex flex-col relative overflow-hidden text-left">
        <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-black/5 clip-path-polygon transform scale-150 translate-x-1/4"></div>
        <div className="relative z-10 max-w-2xl">
           <div className="text-black text-opacity-20 text-6xl mb-6">💎</div>
          <h2 className="text-4xl md:text-[54px] font-black mb-6 leading-[1.1] text-[#1D1C1B] tracking-tight">Create your<br/>Workspace for free</h2>
          <p className="text-[18px] font-medium text-[#1D1C1B]/80 mb-10 leading-relaxed max-w-lg">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
          <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl text-lg">Get started for free</a>
        </div>
      </div>
    </section>
  );

  const Testimonial = () => (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto border-t border-gray-100">
       <div className="w-16 h-16 mx-auto mb-8 rounded-full overflow-hidden border border-gray-200">
           <img src="https://i.pravatar.cc/150?u=peter" alt="Peter Nowell" className="w-full h-full object-cover" />
       </div>
       <p className="text-[22px] md:text-2xl font-bold leading-[1.6] mb-8 text-[#1D1C1B]">
         "Sketch has this astonishing ability to be welcoming to beginners, yet unrestrained for advanced users. As someone who trains many design teams, this makes Sketch a clear choice as the industry-standard tool for digital design."
       </p>
       <div className="text-[15px] font-bold text-[#1D1C1B] mb-1">Peter Nowell</div>
       <div className="text-[13px] text-gray-500">Creator, <u className="cursor-pointer">Sketch Master</u></div>
   </section>
  );

  const Footer = () => (
    <footer className="border-t border-gray-200 pt-16 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
        <div className="lg:col-span-2 pr-8">
          <h4 className="font-bold mb-2">Get inspired by incredible design</h4>
          <p className="text-sm text-sketch-gray mb-6 leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black" />
            <button className="bg-gray-400 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-500">Try it out</button>
          </div>
          <div className="mt-2 flex items-start gap-2">
             <input type="checkbox" className="mt-1" />
             <span className="text-[10px] text-gray-500">I agree to receive marketing emails from Sketch.</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
            <li><a href="#page=07-whats-new" className="hover:text-black">What's New <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
            <li><a href="#page=08-design-collaborate" className="hover:text-black">Design</a></li>
            <li><a href="#page=10-collaborative-design" className="hover:text-black">Collaboration</a></li>
            <li><a href="#page=05-prototyping-tools" className="hover:text-black">Prototyping</a></li>
            <li><a href="#page=04-developer-handoff" className="hover:text-black">Developer Handoff</a></li>
            <li><a href="#page=09-workspace" className="hover:text-black">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
            <li><a href="#page=14-apps" className="hover:text-black">Apps <span className="w-3 h-3 inline-block bg-gray-200 rounded-full ml-1 align-middle"></span></a></li>
            <li><a href="#page=20-plugins" className="hover:text-black">Extensions</a></li>
            <li><a href="#page=12-pricing" className="hover:text-black">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Why Sketch</h4>
          <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
            <li><a href="#page=01-switch-to-sketch" className="hover:text-black">Switch to Sketch <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
            <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Figma</a></li>
            <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Adobe XD</a></li>
            <li><a href="#page=16-education" className="hover:text-black">Free for Education <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Learn</h4>
          <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
            <li><a href="#page=06-blog" className="hover:text-black">Blog</a></li>
            <li><a href="#page=18-sketch-101" className="hover:text-black">Course: Sketch 101 <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
            <li><a href="#page=13-documentation" className="hover:text-black">Documentation</a></li>
            <li><a href="#page=11-community" className="hover:text-black">Events & Meetups</a></li>
            <li><a href="#page=25-newsletter" className="hover:text-black">Newsletter</a></li>
            <li><a href="#page=15-labs" className="hover:text-black">Sketch Labs</a></li>
            <li><a href="#page=23-developer" className="hover:text-black">Developer Platform ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 pt-8 flex justify-between items-center text-xs text-slate-400 font-medium">
        <div className="flex justify-center w-full relative">
           <p>© 2026 Sketch B.V.</p>
           <div className="absolute right-0 top-0 flex gap-4 text-gray-400">
               <span>𝕏</span>
               <span>◎</span>
               <span>📷</span>
               <span>▶</span>
           </div>
        </div>
      </div>
    </footer>
  );

export default function P05PrototypingTools() {
   return (
     <div className="min-h-screen bg-white overflow-x-hidden selection:bg-orange-200 text-[#1D1C1B]">
        <Nav />
        <Hero />
        
        {/* Section 1 */}
        <section className="py-24 max-w-[1200px] mx-auto relative px-6 mt-10">
           <TitleHeader 
              Icon={BulbIcon}
              title="Prototype at the speed of thought"
              desc="When you can share your work and get feedback fast, you can iterate, improve and build better things. That's why we made our prototyping tools with speed in mind."
           />
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-8 overflow-hidden relative group hover:shadow-2xl transition">
                 <img src="https://picsum.photos/1200/900?random=300" alt="Node flow map" className="w-full transform group-hover:scale-[1.02] transition duration-500"/>
              </div>
              <div className="flex-1 lg:pl-10">
                 <PrototypingPoint title="Build user journeys in seconds" text="Connect screens, Artboards and UI elements with animated interactions in just a few clicks." />
                 <PrototypingPoint title="Build elements once (and for all)" text="Use and re-use common UI elements (and their interactions) across your prototypes. Avoid covering old ground and save even more time." />
                 <PrototypingPoint title="Movement without friction" text="Simulate scrolling content in no time. Extend a standard Artboard size, pin elements as headers and footers — that's it." />
              </div>
           </div>
        </section>

        {/* Section 2 */}
        <section className="py-24 max-w-[1200px] mx-auto relative px-6">
           {/* Connection curve mock */}
           <PrototypeConnection className="hidden lg:block top-[-100px] left-1/2 w-[300px] h-[300px]" />
           
           <TitleHeader 
              Icon={SpringIcon}
              title="Prototype without the learning curve"
              desc="With feature-packed tools and a low barrier to entry, you can make magic from day one — all without touching a line of code."
           />
           <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1 w-full relative group">
                 {/* Decorative background block behind image */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-teal-100 rounded-[2rem] transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition duration-300"></div>
                 <img src="https://picsum.photos/1000/700?random=301" alt="Inspector panel overlay" className="w-full rounded-2xl shadow-xl border border-gray-200 object-cover" />
              </div>
              <div className="flex-1 lg:pr-10 relative">
                 <PrototypingPoint showBullet={false} title="A/B testing as easy as ABC" text="With multiple start-points in the same document, you can present your testers with multiple flows from one place. Give all your great ideas the opportunity to shine." />
                 <PrototypingPoint showBullet={false} title="Test your ideas in true-to-life settings" text="Context is important for communicating clearly. Test your prototypes in the Mac app, in your web browser or on our iPhone app. See them in situ instantly." />
                 <PrototypingPoint showBullet={false} title="Authentic interactions with Hotspots" text="Use Hotspots to make entire areas clickable, rather than layers or single elements. Create realistic tap targets to make your mobile app prototype feel like the real thing." />
              </div>
           </div>
        </section>

        {/* Section 3 */}
        <section className="py-24 max-w-[1200px] mx-auto relative px-6">
           <PrototypeConnection className="hidden lg:block top-[-50px] right-20 w-[400px] h-[400px] transform rotate-90 scale-x-[-1]" />

           <TitleHeader 
              Icon={CompassIcon}
              title="Prototype beyond basics"
              desc="Sometimes a prototype requires more sophisticated layers and interactions, from alerts to input screens, menus and popovers — we've got that covered too."
           />
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-6 relative group">
                 <img src="https://picsum.photos/800/600?random=302" alt="Overlay settings" className="w-full shadow-sm rounded border border-gray-100 transform group-hover:scale-[1.03] transition duration-500" />
              </div>
              <div className="flex-1 lg:pl-10">
                 <PrototypingPoint title="Create Overlays" text="Set any Artboard as an Overlay and link to it from anywhere in your prototype for richer and more interactive results. You can even apply universal or one-off positioning — background styling, too." />
                 <PrototypingPoint title="Apply unique interactions" text="Define transitions to make things appear, slide up, or fade in to fit your plans. You can even speed up your process by creating reusable elements with prototyping interactions built in." />
                 <PrototypingPoint title="Dedicated Prototyping UI" text="Switch between the Design and Prototype tabs in the Inspector to get the right setup for your workflow — and the right tools at your fingertips." />
              </div>
           </div>
        </section>

        {/* Section 4 */}
        <section className="py-24 max-w-[1200px] mx-auto relative px-6">
           <TitleHeader 
              Icon={BlocksIcon}
              title="Prototype without plugins"
              desc="We get it, costs matter and time is valuable. With Sketch, you can keep your workflow simple without paying for extra tools. Make it, make it move and make it happen, all from one platform."
           />
           <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1 w-full relative">
                 <img src="https://picsum.photos/1000/600?random=303" alt="Dark mobile web preview" className="w-full rounded-2xl shadow-2xl border border-gray-200 ring-4 ring-black/5" />
              </div>
              <div className="flex-1 lg:pr-10">
                 <PrototypingPoint showBullet={false} title="No extra costs" text="No extra apps, no extra payments — you can say goodbye to your InVision subscription." />
                 <PrototypingPoint showBullet={false} title="Share directly, test anywhere" text="Instantly generate a link to your prototypes, share them by email or paste them into other tools, like Notion, to embed them — ready for testing in app and browser." />
                 <PrototypingPoint showBullet={false} title="Exchange feedback, fast" text="There's no limit on how many guests you can invite to test your prototypes — for free! If somebody new needs eyes on your project, their insight is only an invitation away." />
              </div>
           </div>
        </section>
        
        <MobileAppBanner />
        <WhatsNew />
        <FooterCTA />
        <Testimonial />
        <Footer />
     </div>
   );
}
