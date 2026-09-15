/**
 * @name Everything you need to handoff
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
    <div className="flex items-center justify-between px-6 py-4">
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

const Hero = () => (
   <section className="relative pt-40 md:pt-48 pb-32 overflow-hidden flex flex-col items-center">
      {/* Massive radial background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-orange-100 to-white opacity-80 -z-20"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[100%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-300 via-[#FFB183] to-transparent blur-[120px] mix-blend-multiply opacity-50 -z-10 text-[0px]">.</div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-16 text-center md:text-left md:ml-[10%] w-full">
         <h1 className="text-6xl md:text-[5.5rem] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-6 max-w-xl">
            Everything you<br/>need to handoff
         </h1>
         <p className="text-[20px] text-[#1D1C1B]/80 max-w-lg leading-relaxed mb-10">
            Sketch gives you all the tools you need for a truly collaborative design process. From early ideas to pixel-perfect artwork, playable prototypes and developer handoff. It all starts here.
         </p>
         <div className="flex items-center gap-6">
            <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg shadow-xl">Get started for free</a>
            <a href="#page=07-whats-new" className="font-bold text-[#1D1C1B] hover:text-sketch-orange transition flex items-center gap-2">See what's new <span>→</span></a>
         </div>
      </div>

      {/* giant Carousel Mockup Area */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] max-w-[1400px] mx-auto mt-10">
         {/* Behind faded layer left */}
         <div className="absolute left-[-20%] md:left-[-15%] top-10 bottom-10 w-[70%] max-w-[800px] bg-white rounded-3xl opacity-30 shadow-2xl overflow-hidden blur-[4px] transform scale-90 z-0 hidden md:block border border-gray-200">
            <img src="https://picsum.photos/800/600?random=811" className="w-full h-full object-cover" />
         </div>
         {/* Behind faded layer right */}
         <div className="absolute right-[-20%] md:right-[-15%] top-10 bottom-10 w-[70%] max-w-[800px] bg-white rounded-3xl opacity-30 shadow-2xl overflow-hidden blur-[4px] transform scale-90 z-0 hidden md:block border border-gray-200">
            <img src="https://picsum.photos/800/600?random=812" className="w-full h-full object-cover" />
         </div>

         {/* Center Hero Shot */}
         <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-[90%] md:w-[75%] max-w-[1000px] bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-10 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-4 w-full relative">
               <div className="flex gap-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="mx-auto flex gap-6 text-[10px] text-gray-500 font-bold">
                  <span>Design</span>
                  <span className="text-black bg-gray-200 px-2 py-0.5 rounded">Detail View</span>
               </div>
            </div>
            <div className="flex-1 bg-gray-100 w-full overflow-hidden relative group">
               <img src="https://picsum.photos/1200/800?random=813" className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition duration-700" alt="Web App Handoff" />
               {/* overlay measurement markers to simulate the image */}
               <div className="absolute top-[30%] left-[40%] bg-[#EA580C] text-white text-[10px] px-2 py-0.5 rounded shadow">Free Diving</div>
               <div className="absolute top-[40%] right-[20%] border border-[#EA580C] text-[#EA580C] bg-white text-[9px] px-1 shadow">Position and size</div>
            </div>
         </div>

         {/* Carousel Controls */}
         <button className="absolute left-[2%] md:left-[8%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/90 hover:bg-black text-white flex items-center justify-center text-xl z-20 shadow border border-white/20 transition">←</button>
         <button className="absolute right-[2%] md:right-[8%] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/90 hover:bg-black text-white flex items-center justify-center text-xl z-20 shadow border border-white/20 transition">→</button>
      </div>
   </section>
);

const LogoGrid = () => (
   <section className="py-20 text-center border-b border-black/5 bg-[#FAFAFA]">
      <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#1D1C1B]/40 uppercase mb-10">Trusted by innovative companies worldwide</p>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-40 px-6 max-w-5xl mx-auto grayscale">
         <span className="font-bold text-xl flex items-center bg-black text-white w-6 h-6 justify-center rounded-full">f</span>
         <span className="font-serif italic text-2xl font-bold tracking-tight">Google</span>
         <span className="font-black text-xl flex items-center gap-1">✢TaxSlayer®</span>
         <span className="font-serif text-xl tracking-tight leading-none text-center">HCSC<br/><span className="text-[6px] tracking-normal">Health Care Service Corporation</span></span>
         <span className="font-bold border-l-4 border-r-4 border-black px-1 text-xl">MiT</span>
         <span className="font-bold text-xl tracking-tighter mb-1 relative top-1 font-serif italic">pok pok</span>
         <span className="font-bold text-xl flex items-center gap-1"><span className="w-5 h-5 bg-black rounded-full text-white flex items-center justify-center text-xs">x</span> XBOX</span>
         <span className="font-black text-2xl tracking-tighter">stripe</span>
      </div>
   </section>
);

const FeatureBlock = ({ title, text, link, children, reverse = false }) => (
   <div className="flex flex-col mb-4">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden aspect-[4/3] w-full flex items-center justify-center mb-6 relative group">
         {children}
      </div>
      <h3 className="text-[20px] font-bold text-[#1D1C1B] mb-2">{title}</h3>
      <p className="text-[15px] text-gray-500 leading-relaxed mb-4">{text}</p>
      {link && <a href="#" className="font-bold text-sm text-[#1D1C1B] hover:text-sketch-orange transition">{link} →</a>}
   </div>
);

const FeaturesGridSections = () => (
   <div className="max-w-[1200px] mx-auto overflow-hidden">
      
      {/* 1. All in one Bleed Section */}
      <section className="py-24 md:py-40 relative flex flex-col md:flex-row items-center border-b border-gray-100">
         <div className="w-full md:w-3/5 h-[400px] md:h-[600px] relative mb-12 md:mb-0">
            {/* Image pushing out the left edge */}
            <div className="absolute right-0 md:left-[-100px] lg:left-[-200px] top-0 bottom-0 w-full md:w-[120%] bg-white rounded-r-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden z-10 transition transform hover:scale-[1.01] duration-700">
               <img src="https://picsum.photos/1200/900?random=814" className="w-full h-full object-cover object-left-top" alt="Mac Toolkit" />
            </div>
         </div>
         <div className="w-full md:w-2/5 px-6 relative z-20 md:pr-10 lg:pr-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] tracking-tight leading-tight mb-6">The all-in-one designer's toolkit</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">More than just UI design tools — if you're collaborating on new concepts, building beautiful prototypes or crafting the perfect app icon, we've got your whole design process covered.</p>
            
            <div className="flex bg-gray-50 p-4 rounded-3xl w-max mb-10 shadow-sm border border-gray-100 gap-4 opacity-90">
               <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center font-bold text-[#EA580C] text-[10px] overflow-hidden"><div className="bg-[#EA580C] w-full text-center text-white pb-0.5">SEP</div>7</div>
               <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">💎</div>
               <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[10px] font-bold text-gray-400">A A<br/>A G</div>
            </div>
            
            <h3 className="font-bold text-[20px] text-[#1D1C1B] mb-2">Native macOS editor</h3>
            <p className="text-[15px] text-gray-500 mb-6 leading-relaxed">Create your best work with an intuitive UI, thoughtful features and all the benefits you'd expect from a great Mac app (like support for P3 color profiles, native font rendering, and super-fast Apple Silicon performance).</p>
            <a href="#" className="font-bold text-[#1D1C1B] text-sm hover:text-sketch-orange transition">Explore your design toolkit →</a>
         </div>
      </section>

      {/* 2. Grid A */}
      <section className="py-24 px-6 border-b border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            <FeatureBlock title="Prototyping" link="Discover Prototyping in Sketch" text="Bring your designs to life with easy-to-use tools. Test prototypes on your devices. Or share a link with others so they can try them out in any browser and give their feedback, for free. With no plugins required.">
               {/* Prototyping mini graphic */}
               <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="w-[150px] bg-white p-3 rounded-lg shadow-md border border-gray-200 text-[10px] font-bold z-10 transform -rotate-2 group-hover:rotate-0 transition">Where to?</div>
                  <div className="absolute top-1/2 left-1/2 w-[180px] h-10 border-b-2 border-r-2 border-dashed border-[#EA580C]/50 rounded-br-3xl -z-0"></div>
                  <div className="absolute right-[10%] bottom-[20%] bg-[#EA580C] text-white text-[9px] px-2 py-0.5 rounded shadow-lg transform rotate-3 z-10">Augusto</div>
               </div>
            </FeatureBlock>
            
            <FeatureBlock title="Real-time collaboration" link="See collaboration in action" text="Work together in the same document, at the same time — right inside the Mac app. No hassle, no save conflicts, no pinging files back and forth. Just you, your collaborators, and an infinite Canvas to explore.">
               <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-50">
                  <div className="relative flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full border-4 border-white bg-blue-100 relative z-10 transform translate-x-2 group-hover:-translate-y-2 transition shadow"><img src="https://i.pravatar.cc/100?img=1" className="w-full h-full rounded-full object-cover"/></div>
                     <div className="w-20 h-20 rounded-full border-4 border-white bg-green-100 relative z-20 group-hover:scale-110 transition shadow-lg"><img src="https://i.pravatar.cc/100?img=2" className="w-full h-full rounded-full object-cover"/></div>
                     <div className="w-14 h-14 rounded-full border-4 border-white bg-purple-100 relative z-10 transform -translate-x-3 group-hover:-translate-y-1 transition shadow"><img src="https://i.pravatar.cc/100?img=3" className="w-full h-full rounded-full object-cover"/></div>
                  </div>
                  {/* Fake cursors */}
                  <div className="absolute top-[20%] left-[20%] text-[10px] bg-green-500 text-white rounded-br-xl px-2 py-0.5 transform -rotate-12">James</div>
                  <div className="absolute top-[30%] right-[10%] text-[10px] bg-blue-500 text-white rounded-bl-xl px-2 py-0.5 transform rotate-12">Elisa</div>
                  <div className="absolute bottom-[20%] right-[30%] text-[10px] bg-pink-500 text-white rounded-tr-xl px-2 py-0.5 transform rotate-6">Leon</div>
               </div>
            </FeatureBlock>
         </div>
      </section>

      {/* 3. Scale up process Bleed Section */}
      <section className="py-24 md:py-40 relative flex flex-col-reverse md:flex-row items-center border-b border-gray-100">
         <div className="w-full md:w-2/5 px-6 relative z-20 md:pl-10 lg:pl-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] tracking-tight leading-tight mb-6">Scale up your design process</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">Bring your projects and people together, share feedback, hand off to developers, and build out beautiful design systems — all in one place.</p>
            
            {/* small graph component */}
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl mb-8 border border-gray-100/50 relative overflow-hidden group">
               <div className="absolute inset-0 bg-purple-50/20 group-hover:bg-purple-100/30 transition"></div>
               <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="relative z-10">
                  {/* simple vector lines drawing */}
                  <path d="M60 20 L40 50 M60 20 L80 50 M60 20 L60 70 M40 50 L60 70 M80 50 L60 70" stroke="#CBD5E1" strokeWidth="2"/>
                  <circle cx="40" cy="50" r="12" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
                  <text x="35" y="55" fontSize="14">👤</text>
                  <circle cx="80" cy="50" r="12" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
                  <text x="75" y="55" fontSize="14">💬</text>
                  <circle cx="60" cy="70" r="16" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
                  <text x="52" y="75" fontSize="16">💎</text>
               </svg>
            </div>
            
            <h3 className="font-bold text-[20px] text-[#1D1C1B] mb-2">Workspaces</h3>
            <p className="text-[15px] text-gray-500 mb-6 leading-relaxed">With a Sketch Workspace, you get a home for storing files, sharing ideas, getting feedback, managing your team, distributing Libraries, handing off to developers and exploring your Design System. It's all included in your subscription.</p>
            <div className="flex items-center gap-4">
               <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold flex-shrink-0">Create your Workspace</button>
               <a href="#page=09-workspace" className="font-bold text-[#1D1C1B] text-[13px] hover:text-sketch-orange transition shrink-0 whitespace-nowrap">See what a Workspace can do →</a>
            </div>
         </div>

         <div className="w-full md:w-3/5 h-[400px] md:h-[600px] relative mb-12 md:mb-0">
            {/* Multiple nested floating browser windows pushing out the right edge */}
            <div className="absolute left-0 md:left-[50px] lg:left-[100px] top-[10%] bottom-[10%] lg:bottom-[20%] w-[120%] bg-[#E5E0EE] rounded-l-3xl z-0 transform group-hover:scale-[1.01] transition duration-700 overflow-hidden opacity-50 blur-sm"></div>
            <div className="absolute left-[5%] md:left-[100px] lg:left-[150px] top-0 bottom-0 w-[110%] bg-white rounded-l-3xl shadow-[[-20px_20px_60px_-15px_rgba(0,0,0,0.15)]] border border-gray-200 overflow-hidden z-20 flex flex-col transition transform hover:translate-x-2 duration-700">
               <div className="h-10 bg-gray-100 flex items-center px-4 w-full">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div></div>
                  <div className="mx-auto text-[10px] text-gray-400 bg-white px-4 py-1 rounded shadow-sm border border-gray-200">www.sketch.com</div>
               </div>
               <img src="https://picsum.photos/900/800?random=815" className="w-full h-full object-cover object-left-top" alt="Sea Life Handoff" />
            </div>
         </div>
      </section>

      {/* 4. Grid B */}
      <section className="py-24 px-6 mb-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            <FeatureBlock title="Design systems" link="Discover design systems" text="Build out your design systems with reusable Styles and responsive Symbols. Manage them effortlessly on the Mac app or in the browser, share them with your team and update them everywhere in seconds.">
               {/* Design system mini graphic */}
               <div className="relative w-full h-full flex items-center justify-center gap-6 bg-gradient-to-t from-gray-100 to-white">
                  <div className="text-3xl text-pink-400 font-bold group-hover:scale-125 transition">◊</div>
                  <div className="text-3xl font-serif text-gray-400 group-hover:-translate-y-2 transition">Aa</div>
                  <div className="text-3xl text-gray-400 group-hover:rotate-12 transition">🗂</div>
                  <div className="text-3xl text-gray-400 group-hover:scale-90 transition">🖌</div>
               </div>
            </FeatureBlock>
            
            <FeatureBlock title="Developer handoff" link="Try developer handoff now" text="Invite developers to inspect and measure designs, then download production-ready assets, all for free. They don't need the Mac app (or even a Mac) or third-party plugins. Just their favorite browser. And you know they have a favorite.">
               {/* Developer handoff mini graphic */}
               <div className="relative w-full h-full bg-gray-50 flex items-center justify-center p-6 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:10px_10px]">
                  <div className="relative z-10 w-4/5 max-w-[200px] aspect-video border-[4px] border-white shadow-xl group-hover:shadow-2xl transition">
                     <img src="https://picsum.photos/200/120?random=816" className="w-full h-full object-cover" />
                     {/* Blue measurement lines */}
                     <div className="absolute top-1/2 -left-8 w-8 h-[2px] bg-[#3B82F6] flex items-center justify-center"><span className="absolute -top-3 text-[8px] bg-white text-[#3B82F6] px-1 shadow rounded">140</span></div>
                     <div className="absolute top-1/2 -right-8 w-8 h-[2px] bg-[#3B82F6] flex items-center justify-center"><span className="absolute -top-3 text-[8px] bg-white text-[#3B82F6] px-1 shadow rounded">140</span></div>
                  </div>
               </div>
            </FeatureBlock>
         </div>
      </section>

   </div>
);

// What's new grid
const WhatsNewBlock = ({ title, bgClass, sizeClass = "col-span-1 row-span-1", imageSrc }) => (
   <div className={`${sizeClass} ${bgClass} rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-black/5 hover:shadow-xl transition duration-300 flex flex-col items-center justify-center text-center min-h-[220px]`}>
       {imageSrc && <img src={imageSrc} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition duration-700" alt={title}/>}
       {!imageSrc && <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition duration-300">📦</div>}
       <p className="relative z-10 text-[13px] font-bold text-[#1D1C1B] mt-auto w-full pt-2">{title} →</p>
   </div>
);

const WhatsNewGrid = () => (
   <section className="py-24 relative overflow-hidden bg-[#FAFAFA] border-y border-gray-100">
      {/* Giant star decoration */}
      <div className="absolute left-[-20%] top-[40%] text-[#1D1C1B] text-[400px] leading-none transform -rotate-12 opacity-90 hidden lg:block z-0 select-none pointer-events-none">★</div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6">What's new?</h2>
            <p className="text-gray-500 text-lg mb-6">We're always shipping new updates to Sketch. Here's a selection of our latest features for you to explore.</p>
            <a href="#" className="font-bold text-sm text-[#1D1C1B] hover:text-sketch-orange transition">See all the updates →</a>
         </div>

         {/* Masonry-like grid using CSS Grid rows/cols */}
         <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 auto-rows-[160px] h-auto lg:h-[700px]">
             {/* Left tall */}
             <div className="col-span-1 row-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-between hover:shadow-lg transition">
                 <div className="text-4xl mt-12 text-purple-400">📄</div>
                 <p className="font-bold text-xs">Duplicate Documents →</p>
             </div>
             {/* Center giant */}
             <div className="col-span-2 row-span-2 bg-[#6DC9C9] rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-end hover:shadow-xl transition group overflow-hidden">
                 <div className="absolute inset-x-0 bottom-16 h-full flex items-center justify-center transform group-hover:scale-105 transition duration-500">
                     <div className="w-1/2 max-w-[200px] aspect-[1/2] bg-white/20 backdrop-blur rounded-2xl transform -rotate-12 translate-y-10 border border-white/50 shadow-xl"></div>
                     <div className="w-1/2 max-w-[200px] aspect-[1/2] bg-white rounded-2xl border border-white/50 shadow-xl overflow-hidden -ml-16 -translate-y-4"></div>
                 </div>
                 <p className="relative z-10 font-bold text-white text-sm pb-4">Overlays in prototypes →</p>
             </div>
             {/* Right Top small */}
             <div className="col-span-1 row-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center hover:shadow-lg transition">
                 <div className="text-2xl mb-2 text-green-500">📎</div>
                 <p className="font-bold text-[11px]">Copy CSS in the web app →</p>
             </div>
             {/* Right Middle small */}
             <div className="col-span-1 row-span-1 bg-[#F9F9F8] rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center hover:shadow-lg transition">
                 <div className="text-2xl mb-2 text-yellow-500">🖼</div>
                 <p className="font-bold text-[11px]">Artboard Templates →</p>
             </div>
             {/* Bottom Left medium */}
             <div className="col-span-2 row-span-1 bg-[#FF7F6D] rounded-3xl p-6 flex flex-col items-start justify-end relative overflow-hidden group hover:shadow-xl transition">
                 <div className="absolute right-[-10%] top-[-10%] w-1/2 h-[150%] bg-black/20 transform rotate-[30deg] mix-blend-overlay group-hover:rotate-[25deg] transition duration-700"></div>
                 <p className="relative z-10 font-bold text-white text-sm">New and improved iPhone app →</p>
             </div>
             {/* Bottom Center small */}
             <div className="col-span-1 row-span-1 bg-[#F9F9F8] rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center hover:shadow-lg transition">
                 <div className="text-3xl mb-2">🎨</div>
                 <p className="font-bold text-[11px]">Color Tokens →</p>
             </div>
             {/* Bottom Right small */}
             <div className="col-span-1 row-span-1 bg-[#F9F9F8] rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center hover:shadow-lg transition">
                 <div className="text-3xl mb-2 text-orange-400">🔒</div>
                 <p className="font-bold text-[11px]">Restricted Projects →</p>
             </div>
         </div>
      </div>
   </section>
);

const Extensions = () => (
   <section className="py-32 text-center relative overflow-hidden bg-white">
      {/* Wave of icons */}
      <div className="flex items-center justify-center flex-wrap gap-4 md:gap-8 max-w-[1400px] mx-auto px-6 mb-20 opacity-90 opacity-80">
         <div className="w-16 h-16 bg-[#BCF0CB] rounded-full flex items-center justify-center text-[#1D1C1B] font-serif text-sm font-bold shadow-sm transform -translate-y-4">Spelly</div>
         <div className="w-16 h-16 bg-black rounded-lg shadow-xl shadow-black/20 flex flex-col items-center justify-center p-2 transform rotate-12 bg-white"><div className="w-6 h-6 border-4 border-black"></div></div>
         <div className="w-16 h-16 rotate-45 transform translate-y-6"><img src="https://picsum.photos/60/60?random=817" className="w-full h-full object-cover shadow-lg rounded" alt="Ext 1" /></div>
         <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-[inset_0_-5px_10px_rgba(0,0,0,0.2)] transform -translate-y-8"><div className="w-full h-1/2 bg-red-500 rounded-b-full"></div></div>
         <div className="w-16 h-16 bg-[#FCA5A5] rounded-xl flex flex-wrap p-1 gap-1 shadow-lg transform rotate-[-10deg]">
            <div className="w-[45%] h-[45%] border-2 border-white rounded-full"></div><div className="w-[45%] h-[45%] border-2 border-white rounded-full"></div>
            <div className="w-[45%] h-[45%] border-2 border-white rounded-full"></div>
         </div>
         <div className="w-24 h-24 bg-[#0D66D0] rounded-3xl shadow-xl flex items-center justify-center text-white font-bold text-4xl transform -translate-y-4">∾</div>
         <div className="w-16 h-16 bg-transparent border-4 border-black rounded-[20px] shadow-sm flex items-center justify-center text-4xl text-black transform rotate-12 translate-y-8">🦜</div>
         <div className="w-20 h-20 bg-blue-400 rounded-full shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-white text-3xl font-bold font-mono">G</div>
         <div className="w-16 h-16 flex items-center justify-center transform -translate-y-12 rotate-[-15deg] font-bold text-purple-400 text-5xl">M</div>
         <div className="w-16 h-16 flex items-center justify-center border-4 border-gray-200 transform translate-y-2 rounded-2xl rotate-45 text-2xl">⚡</div>
      </div>
      
      <div className="max-w-xl mx-auto px-6">
         <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Extensions</p>
         <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 leading-tight tracking-tight">Customize your workflow</h2>
         <p className="text-gray-500 text-[17px] mb-8 leading-relaxed">Choose from hundreds of plugins, Assistants and integrations that let you do everything from animating interactions to making your designs more accessible.</p>
         <a href="#page=20-plugins" className="font-bold text-[#1D1C1B] hover:text-sketch-orange transition">Browse 700+ extensions →</a>
      </div>
   </section>
);

const BlogSection = () => (
   <section className="py-24 max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row gap-16 border-t border-gray-100">
      <div className="lg:w-1/3">
         <span className="bg-gray-100 text-[#1D1C1B] text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">News</span>
         <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mt-6 mb-6">Our blog</h2>
         <p className="text-gray-500 text-[17px] leading-relaxed mb-6">The latest news, greatest tutorials and inspiration that'll make you say "I wish I'd done that!" From incredible things you can make with Sketch, to insights from the people who make Sketch happen.</p>
         <a href="#" className="font-bold text-[#1D1C1B] hover:text-sketch-orange transition text-sm">Take a look →</a>
      </div>
      <div className="lg:w-2/3 flex flex-col gap-6">
         <div className="flex gap-6 items-center p-4 hover:bg-gray-50 rounded-2xl transition cursor-pointer group group/item">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
               <img src="https://picsum.photos/100/100?random=818" className="w-full h-full object-cover transform group-hover/item:scale-110 transition duration-500" />
            </div>
            <div>
               <p className="font-bold text-[#1D1C1B] text-[15px] group-hover:text-sketch-orange transition leading-snug pr-4">New in Sketch: 38 recent Sketch improvements you might have missed →</p>
            </div>
         </div>
         <div className="flex gap-6 items-center p-4 hover:bg-gray-50 rounded-2xl transition cursor-pointer group group/item border-t border-gray-100 lg:border-t-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
               <img src="https://picsum.photos/100/100?random=819" className="w-full h-full object-cover transform group-hover/item:scale-110 transition duration-500" />
            </div>
            <div>
               <p className="font-bold text-[#1D1C1B] text-[15px] group-hover:text-sketch-orange transition leading-snug pr-4">Behind the scenes: How we built the new iPhone app — now powered by Workspaces →</p>
            </div>
         </div>
         <div className="flex gap-6 items-center p-4 hover:bg-gray-50 rounded-2xl transition cursor-pointer group group/item border-t border-gray-100 lg:border-t-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
               <img src="https://picsum.photos/100/100?random=820" className="w-full h-full object-cover transform group-hover/item:scale-110 transition duration-500" />
            </div>
            <div>
               <p className="font-bold text-[#1D1C1B] text-[15px] group-hover:text-sketch-orange transition leading-snug pr-4">Inside Sketch: How our remote team spent a week in Porto together →</p>
            </div>
         </div>
      </div>
   </section>
);


const FooterCTA = () => (
   <section className="py-24 px-4 bg-white text-center border-t border-gray-100">
     <div className="bg-gradient-to-br from-[#A7D753] to-[#7BC86A] rounded-[3rem] py-24 px-10 max-w-[1200px] mx-auto flex flex-col relative overflow-hidden text-left shadow-lg">
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

const Footer = () => (
   <footer className="border-t border-gray-200 pt-16 pb-8 bg-white">
     <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
       <div className="lg:col-span-2 pr-8">
         <h4 className="font-bold mb-2">Get inspired by incredible design</h4>
         <p className="text-sm text-gray-500 mb-6 leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
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
         <h4 className="font-bold mb-4 text-[#1D1C1B]">Product</h4>
         <ul className="space-y-3 text-[13px] font-medium text-gray-500">
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
         <h4 className="font-bold mb-4 text-[#1D1C1B]">Why Sketch</h4>
         <ul className="space-y-3 text-[13px] font-medium text-gray-500">
           <li><a href="#page=01-switch-to-sketch" className="hover:text-black">Switch to Sketch <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
           <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Figma</a></li>
           <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Adobe XD</a></li>
           <li><a href="#page=16-education" className="hover:text-black">Free for Education <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
         </ul>
       </div>
       <div>
         <h4 className="font-bold mb-4 text-[#1D1C1B]">Learn</h4>
         <ul className="space-y-3 text-[13px] font-medium text-gray-500">
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
     <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 pt-8 flex justify-between items-center text-xs text-gray-400 font-medium">
       <div className="flex justify-between w-full relative">
          <p>© 2026 Sketch B.V.</p>
          <div className="flex gap-4 text-gray-400">
              <span className="hover:text-black cursor-pointer">𝕏</span>
              <span className="hover:text-black cursor-pointer">◎</span>
              <span className="hover:text-black cursor-pointer">📷</span>
              <span className="hover:text-black cursor-pointer">▶</span>
          </div>
       </div>
     </div>
   </footer>
 );

export default function P08DesignHandoff() {
   return (
      <div className="min-h-screen bg-white">
         <Nav />
         <Hero />
         <LogoGrid />
         <FeaturesGridSections />
         <WhatsNewGrid />
         <Extensions />
         <BlogSection />
         <FooterCTA />
         <Footer />
      </div>
   );
}
