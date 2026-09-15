/**
 * @name Workspace
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
      <div className="bg-[#1D1C1B]/5 text-center py-2 text-sm font-medium">
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

// Helper for the tutorial links
const TutorialLink = ({ iconSrc, title, desc, emoji }) => (
   <div className="group flex items-center gap-4 py-3 cursor-pointer">
      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm border border-black/5 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center relative">
         {iconSrc ? <img src={iconSrc} className="w-full h-full object-cover" alt="icon"/> : <span className="text-3xl filter drop-shadow-md">{emoji}</span>}
         {/* Subtle overlay */}
         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
      </div>
      <div>
         <p className="text-[14px] text-[#1D1C1B] leading-tight pr-4">
            <span className="font-bold">{title}</span>: {desc} <span className="inline-block transform group-hover:translate-x-1 transition text-sketch-orange">→</span>
         </p>
      </div>
   </div>
);

// Helper for Dark Promo Card
const TryItPromo = ({ iconEmoji, text }) => (
   <div className="bg-[#1D1C1B] rounded-2xl p-6 flex items-center gap-6 mt-8 mb-4 max-w-sm hover:scale-[1.02] transition duration-500 cursor-pointer shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-white/10 transition"></div>
      <div className="w-20 h-20 shrink-0 bg-gradient-to-tr from-[#38C6D9] to-[#7BC86A] rounded-xl flex items-center justify-center text-4xl shadow-lg z-10 border border-white/10">
         {iconEmoji}
      </div>
      <div className="z-10">
         <p className="font-bold text-white text-[15px] leading-tight mb-2 pr-2">{text}</p>
         <button className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded hover:bg-gray-200 transition">Check the prototype</button>
      </div>
   </div>
);


export default function P09Workspace() {
   return (
      <div className="min-h-screen bg-white overflow-x-hidden selection:bg-yellow-200 selection:text-black">
         <Nav />

         {/* Giant Curved Hero Background */}
         {/* We use an oversized absolute div rotated or border-radius stretched to achieve the gentle slope */}
         <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#FDE599] via-[#FFDF7D] to-[#FCD34D]/20 overflow-hidden -z-10" style={{ borderBottomLeftRadius: '100% 20%', borderBottomRightRadius: '100% 30%'}}></div>

         <section className="pt-40 md:pt-48 pb-20 px-6 max-w-5xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-[5.5rem] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-8">
               One Workspace.<br/>Unlimited possibilities.
            </h1>
            <p className="text-[20px] md:text-[22px] text-[#1D1C1B]/80 max-w-2xl leading-relaxed mb-16">
               Bring your projects and people together, and get all the tools you need to design, collaborate and handoff — in one place.
            </p>

            {/* Huge Dark Video Thumbnail */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-black rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transition duration-700 cursor-pointer">
               {/* Faint ambient stars/noise in background */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen"></div>
               {/* Glowing Text */}
               <h2 className="text-7xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FFE3A0] via-[#FFB76B] to-[#F37B5C] leading-none transform group-hover:scale-105 transition duration-700 blur-[0.5px]">
                  Sketch<br/>Workspace
               </h2>
               {/* Central Play Button overlay */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition duration-300 border border-black/5 z-20">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
               </div>
            </div>
         </section>

         {/* Anchors Section */}
         <section className="py-12 border-b border-gray-100/50 relative z-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
               <h3 className="text-xl md:text-2xl font-bold text-[#1D1C1B] mb-8">Get more from your Sketch Workspace. From kickoff to handoff.</h3>
               <div className="flex flex-wrap items-center justify-center gap-4 text-[13px] font-bold text-gray-500">
                  <button className="flex items-center gap-2 hover:text-black transition">
                     <span className="w-5 h-5 rounded-full bg-[#FFE599] text-[#1D1C1B] font-black flex items-center justify-center text-[10px]">1</span> Bring it all together
                  </button>
                  <button className="flex items-center gap-2 hover:text-black transition pl-4 border-l border-gray-200">
                     <span className="w-5 h-5 rounded-full bg-gray-100 text-[#1D1C1B] font-black flex items-center justify-center text-[10px]">2</span> Collaboration
                  </button>
                  <button className="flex items-center gap-2 hover:text-black transition pl-4 border-l border-gray-200">
                     <span className="w-5 h-5 rounded-full bg-gray-100 text-[#1D1C1B] font-black flex items-center justify-center text-[10px]">3</span> Feedback
                  </button>
                  <button className="flex items-center gap-2 hover:text-black transition pl-4 border-l border-gray-200">
                     <span className="w-5 h-5 rounded-full bg-gray-100 text-[#1D1C1B] font-black flex items-center justify-center text-[10px]">4</span> Developer Handoff
                  </button>
               </div>
            </div>
         </section>

         {/* The 4 Feature Sections with ZigZag Layout */}
         <div className="overflow-hidden">

            {/* 1. Bring it all together (Yellow Theme) */}
            <section className="py-24 md:py-40 relative flex flex-col md:flex-row items-center border-b border-gray-100/30">
               {/* Giant Swash Background Right Edge */}
               <div className="absolute right-[-100px] top-[10%] w-[600px] h-[800px] bg-[#FFF2A8] rounded-full blur-3xl opacity-50 -z-10 transform rotate-45 hidden lg:block"></div>
               
               <div className="w-full md:w-1/2 px-6 relative z-20 md:pr-10 lg:pl-[max(2rem,calc((100vw-1200px)/2))] mb-12 md:mb-0">
                  <h2 className="text-4xl md:text-[54px] font-black text-[#1D1C1B] tracking-tight leading-[1.1] mb-6">Bring it all<br/>together</h2>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 max-w-md">Your Sketch Workspace brings together your team, documents, Libraries and more. With a native Mac app for design and a powerful web app packed with collaboration tools, you can involve your whole team — from designers to stakeholders — at every stage in the process.</p>
                  
                  <button className="flex items-center gap-2 font-bold text-[#1D1C1B] mb-8 hover:opacity-70 transition text-sm">
                     <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-lg leading-none pb-0.5">+</span> Quick facts
                  </button>

                  <div className="flex flex-col gap-2 max-w-md">
                     <TutorialLink emoji="🧩" title="Sketch Tutorials" desc="How to set up your Sketch Workspace for teams — the definitive guide" />
                     <TutorialLink emoji="💎" title="Sketch Tutorials" desc="Get started with your Sketch Workspace" />
                     <TutorialLink emoji="🗺️" title="All you need is Sketch" desc="Simplify your design process and save money" />
                  </div>
               </div>

               <div className="w-full md:w-1/2 relative z-20 md:pl-20">
                  {/* Decorative curved backdrop physically rendered to look like vector */}
                  <div className="absolute left-[10%] top-[-10%] right-[-10%] bottom-[-10%] bg-[#FFF6C5] rounded-[100px] transform rotate-12 -z-10 hidden md:block"></div>
                  
                  <div className="relative group">
                     {/* "See it in action" badge */}
                     <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30 flex items-center gap-2 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                        <span className="w-2 h-3 bg-white block" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></span> See it in action
                     </div>
                     <img src="https://picsum.photos/800/900?random=901" className="w-[120%] max-w-[120%] md:w-[130%] md:max-w-[130%] h-auto rounded-tl-3xl rounded-bl-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] border border-white/50 border-r-0 object-cover object-left transform -translate-x-[5%] md:-translate-x-0 group-hover:-translate-x-[2%] transition duration-700 z-20 bg-white" alt="Workspace UI Dashboard" />
                  </div>
               </div>
            </section>

            {/* 2. Collaborate in real-time (Teal Theme) */}
            <section className="py-24 md:py-40 relative flex flex-col-reverse md:flex-row items-center border-b border-gray-100/30">
               <div className="absolute left-[-100px] top-[20%] w-[600px] h-[700px] bg-[#A5EBEB] rounded-full blur-3xl opacity-40 -z-10 transform -rotate-12 hidden lg:block"></div>

               <div className="w-full md:w-1/2 relative z-20 md:pr-20 mb-12 md:mb-0 mt-12 md:mt-0">
                  <div className="absolute right-[10%] top-[-10%] left-[-10%] bottom-[-10%] bg-[#D4F6F6] rounded-[80px] transform -rotate-6 -z-10 hidden md:block"></div>
                  <div className="relative group flex justify-end">
                     <div className="absolute top-4 left-[20%] bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30 flex items-center gap-2 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                        <span className="w-2 h-3 bg-white block" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></span> See it in action
                     </div>
                     <img src="https://picsum.photos/800/900?random=902" className="w-[120%] max-w-[120%] md:w-[130%] md:max-w-[130%] h-auto rounded-tr-3xl rounded-br-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] border border-white/50 border-l-0 object-cover object-right transform translate-x-[5%] md:translate-x-0 group-hover:translate-x-[2%] transition duration-700 z-20 bg-white" alt="Collab UI" />
                  </div>
               </div>

               <div className="w-full md:w-1/2 px-6 relative z-20 md:pl-10 lg:pr-[max(2rem,calc((100vw-1200px)/2))]">
                  <h2 className="text-4xl md:text-[54px] font-black text-[#1D1C1B] tracking-tight leading-[1.1] mb-6">Collaborate in<br/>real-time</h2>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 max-w-md">With real-time collaboration in our native Mac app, you can design alongside others and see everyone's best ideas in one place — as soon as they have them. And with a single source of truth and a full version history for all your documents, you always know that everyone's on the same page, with no conflicts.</p>
                  
                  <div className="flex items-center gap-6 mb-8">
                     <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-sm">Learn more</button>
                     <button className="flex items-center gap-2 font-bold text-[#1D1C1B] hover:opacity-70 transition text-sm">
                        <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-lg leading-none pb-0.5">+</span> Quick facts
                     </button>
                  </div>

                  <div className="flex flex-col gap-2 max-w-md">
                     <TutorialLink emoji="📦" title="Sketch Tutorials" desc="How to get started with real-time collaboration" />
                     <TutorialLink emoji="⚡" title="Welcome to Workspaces" desc="Staying in sync" />
                     <TutorialLink emoji="🎛️" title="Behind the scenes" desc="How we researched and tested collaborative editing" />
                  </div>
               </div>
            </section>

            {/* 3. Prototyping and feedback (Pink Theme) */}
            <section className="py-24 md:py-40 relative flex flex-col md:flex-row items-center border-b border-gray-100/30">
               <div className="absolute right-[-100px] top-[10%] w-[600px] h-[800px] bg-[#FFC5D3] rounded-full blur-3xl opacity-40 -z-10 transform rotate-12 hidden lg:block"></div>
               
               <div className="w-full md:w-1/2 px-6 relative z-20 md:pr-10 lg:pl-[max(2rem,calc((100vw-1200px)/2))] mb-12 md:mb-0">
                  <h2 className="text-4xl md:text-[54px] font-black text-[#1D1C1B] tracking-tight leading-[1.1] mb-6">Prototyping and<br/>feedback</h2>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 max-w-md">Because your Workspace brings your projects and people together, there's no need to send out invites when it's time for feedback. Your people can instantly test prototypes and share comments in the web app — in any browser, on any device. Best of all? Viewers in your Workspace are free and unlimited.</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                     <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-sm">Learn more</button>
                     <button className="flex items-center gap-2 font-bold text-[#1D1C1B] hover:opacity-70 transition text-sm">
                        <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-lg leading-none pb-0.5">+</span> Quick facts
                     </button>
                  </div>

                  <TryItPromo iconEmoji="📱" text="Want to try it yourself? Test our prototyping features with a demo." />

                  <div className="flex flex-col gap-2 max-w-md mt-4">
                     <TutorialLink emoji="🕹️" title="Sketch Tutorials" desc="How to get started with UX prototyping" />
                     <TutorialLink emoji="💬" title="Sketch Tutorials" desc="How to give constructive design feedback" />
                     <TutorialLink emoji="🎯" title="Welcome to Workspaces" desc="Getting feedback and testing your designs" />
                  </div>
               </div>

               <div className="w-full md:w-1/2 relative z-20 md:pl-20">
                  <div className="absolute left-[5%] top-[-5%] right-[-15%] bottom-[-5%] bg-[#FFE1E7] rounded-[100px] transform -rotate-6 -z-10 hidden md:block"></div>
                  
                  <div className="relative group">
                     {/* "See it in action" badge */}
                     <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30 flex items-center gap-2 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                        <span className="w-2 h-3 bg-white block" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></span> See it in action
                     </div>
                     <img src="https://picsum.photos/800/900?random=903" className="w-[120%] max-w-[120%] md:w-[130%] md:max-w-[130%] h-auto rounded-tl-3xl rounded-bl-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] border border-white/50 border-r-0 object-cover object-left transform -translate-x-[5%] md:-translate-x-0 group-hover:-translate-x-[2%] transition duration-700 z-20 bg-white" alt="Prototyping Web App" />
                  </div>
               </div>
            </section>

            {/* 4. Handoff without the hassle (Purple Theme) */}
            <section className="py-24 md:py-40 relative flex flex-col-reverse md:flex-row items-center border-b border-gray-100/30">
               <div className="absolute left-[-100px] top-[20%] w-[600px] h-[700px] bg-[#E1D3FA] rounded-full blur-3xl opacity-40 -z-10 transform -rotate-12 hidden lg:block"></div>

               <div className="w-full md:w-1/2 relative z-20 md:pr-20 mb-12 md:mb-0 mt-12 md:mt-0">
                  <div className="absolute right-[5%] top-[-5%] left-[-15%] bottom-[-5%] bg-[#F2EBFF] rounded-[80px] transform rotate-3 -z-10 hidden md:block"></div>
                  <div className="relative group flex justify-end">
                     <div className="absolute top-4 left-[20%] bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30 flex items-center gap-2 transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                        <span className="w-2 h-3 bg-white block" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></span> See it in action
                     </div>
                     <img src="https://picsum.photos/800/900?random=904" className="w-[120%] max-w-[120%] md:w-[130%] md:max-w-[130%] h-auto rounded-tr-3xl rounded-br-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] border border-white/50 border-l-0 object-cover object-right transform translate-x-[5%] md:translate-x-0 group-hover:translate-x-[2%] transition duration-700 z-20 bg-white" alt="Handoff UI" />
                  </div>
               </div>

               <div className="w-full md:w-1/2 px-6 relative z-20 md:pl-10 lg:pr-[max(2rem,calc((100vw-1200px)/2))]">
                  <h2 className="text-4xl md:text-[54px] font-black text-[#1D1C1B] tracking-tight leading-[1.1] mb-6">Handoff without<br/>the hassle</h2>
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 max-w-md">Ready to turn pixels into code? Developers can view, inspect and measure designs in any browser, on any operating system. Invite them for free, and they can download production-ready assets in a click, see design elements in context, grab color values in whatever format they use, and more. No Mac app or third-party plugins needed.</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                     <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-sm">Learn more</button>
                     <button className="flex items-center gap-2 font-bold text-[#1D1C1B] hover:opacity-70 transition text-sm">
                        <span className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-lg leading-none pb-0.5">+</span> Quick facts
                     </button>
                  </div>

                  <TryItPromo iconEmoji="💻" text="Want to try it yourself? Test our handoff tools with a live document." />

                  <div className="flex flex-col gap-2 max-w-md mt-4">
                     <TutorialLink emoji="🔍" title="Sketch Tutorials" desc="How to get started with developer handoff in Sketch" />
                     <TutorialLink emoji="🔧" title="Community" desc="How to set up your design process for smooth developer handoff in Sketch" />
                     <TutorialLink emoji="🚀" title="Welcome to Workspaces" desc="Making developer handoff work for everyone" />
                  </div>
               </div>
            </section>
         </div>

         {/* Testimonial */}
         <section className="py-32 px-6 text-center max-w-4xl mx-auto border-t border-gray-100">
            <div className="flex justify-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md relative z-10 opacity-70 transform scale-90 translate-x-2"><img src="https://i.pravatar.cc/100?u=1" /></div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 shadow-lg relative z-20 scale-110"><img src="https://i.pravatar.cc/100?u=2" /></div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md relative z-10 opacity-70 transform scale-90 -translate-x-2"><img src="https://i.pravatar.cc/100?u=3" /></div>
            </div>
            <p className="text-2xl md:text-[28px] font-bold leading-relaxed mb-10 text-[#1D1C1B]">
               "Real-time collaboration brings out the best in my designs! During calls, it's effortless to focus on whoever's presenting and follow their cursor while talking."
            </p>
            <div className="text-[15px] font-bold text-[#1D1C1B] mb-1">Helena Bukovac</div>
            <div className="text-[13px] text-gray-500">Product Designer & Sketch Advocate</div>
         </section>

         {/* Footer CTA */}
         <section className="py-24 px-4 bg-white text-center border-t border-gray-100">
            <div className="bg-gradient-to-br from-[#A7D753] to-[#7BC86A] rounded-[3rem] py-24 px-10 max-w-[1200px] mx-auto flex flex-col relative overflow-hidden text-left shadow-lg">
               <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-black/5 clip-path-polygon transform scale-150 translate-x-1/4"></div>
               <div className="relative z-10 max-w-2xl">
                  <div className="text-black text-opacity-20 text-6xl mb-6">💎</div>
                  <h2 className="text-4xl md:text-[54px] font-black mb-6 leading-[1.1] text-[#1D1C1B] tracking-tight">Create your<br/>Workspace for free</h2>
                  <p className="text-[18px] font-medium text-[#1D1C1B]/80 mb-10 leading-relaxed max-w-lg">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
                  <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl text-lg mb-6">Get started for free</a>
                  <p className="flex items-center gap-2 text-sm text-[#1D1C1B] font-bold hover:opacity-80 transition cursor-pointer">
                     <span className="w-5 h-5 bg-white/70 rounded flex items-center justify-center text-xs">☑</span> Got a license key? Switch to a subscription and get more <span>→</span>
                  </p>
               </div>
            </div>
         </section>

         {/* Footer */}
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
      </div>
   );
}
