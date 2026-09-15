/**
 * @name Sketch 101
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
   <header className="bg-white w-full z-50 fixed top-0 border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto bg-white">
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
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2.5 rounded hover:bg-black transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const CheckIcon = () => (
   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#1D1C1B] mt-1 shrink-0">
      <polyline points="20 6 9 17 4 12"></polyline>
   </svg>
);

const PlayIconOrange = () => (
   <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF844B" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FF844B"/>
      <path d="M16 12L9 16V8L16 12Z" fill="white"/>
   </svg>
);

export default function P18Sketch101() {
   const syllabus = [
      {
         title: "Chapter 1: Getting started with Sketch",
         videosCount: "3 videos",
         lessons: [
            { id: "1.1", name: "Welcome to Sketch 101", duration: "1:51" },
            { id: "1.2", name: "What is Sketch?", duration: "1:51" },
            { id: "1.3", name: "Getting set up", duration: "4:12" },
         ]
      },
      {
         title: "Chapter 2: Designing in the Mac app",
         videosCount: "10 videos",
         lessons: [
            { id: "2.1", name: "The Interface", duration: "2:05" },
            { id: "2.2", name: "Creating, saving, and managing documents", duration: "3:33" },
            { id: "2.3", name: "Layer basics", duration: "12:08" },
            { id: "2.4", name: "Vector Editing", duration: "6:35" },
            { id: "2.5", name: "Making icons with Boolean operations", duration: "1:08" },
            { id: "2.6", name: "Masking layers", duration: "4:10" },
            { id: "2.7", name: "Working with text", duration: "10:31" },
            { id: "2.8", name: "Styling layers", duration: "10:07" },
            { id: "2.9", name: "Give the wireframe some style", duration: "0:39" },
            { id: "2.10", name: "Exporting in the Mac app", duration: "3:16" },
         ]
      },
      {
         title: "Chapter 3: Sharing and Collaborating",
         videosCount: "3 videos",
         lessons: [
            { id: "3.1", name: "Sharing and real-time collaboration", duration: "7:20" },
            { id: "3.2", name: "Viewing documents in the web app", duration: "3:27" },
            { id: "3.3", name: "Organizing your Workspace", duration: "5:09" },
         ]
      }
   ];

   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-orange-200 selection:text-black font-sans pt-[72px]">
         <Nav />

         {/* Hero Header Area with Ambient Background */}
         <section className="relative w-full pt-16 pb-0 overflow-hidden">
            {/* Soft Orbs Background effect */}
            <div className="absolute top-0 left-0 w-full h-[500px] -z-10 bg-white">
               <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#4BC8C5]/30 blur-[120px] rounded-full mix-blend-multiply"></div>
               <div className="absolute top-[10%] right-[-10%] w-[40%] h-[120%] bg-[#FFA47E]/30 blur-[100px] rounded-full mix-blend-multiply"></div>
               <div className="absolute bottom-[-50%] right-[10%] w-[50%] h-[150%] bg-[#FFCA58]/40 blur-[130px] rounded-full mix-blend-multiply"></div>
            </div>

            <div className="max-w-[1240px] mx-auto px-6 text-center">
               <div className="uppercase tracking-[0.2em] font-bold text-[11px] text-gray-500 mb-4 bg-white/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full">
                  Sketch Courses
               </div>
               <h1 className="text-[44px] md:text-[56px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-12">
                  Sketch 101: Create your first designs
               </h1>

               {/* Video Thumbnail wrapper */}
               <div className="w-full max-w-[1000px] mx-auto aspect-video rounded-3xl overflow-hidden relative shadow-2xl group cursor-pointer border border-gray-100 z-10">
                  <img src="https://picsum.photos/1200/675?random=50" className="w-full h-full object-cover" alt="Video Cover" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
                  {/* Play Button Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-16 bg-black/60 backdrop-blur border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-[#FD6B22] group-hover:scale-105 transition duration-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                     </svg>
                  </div>
               </div>
            </div>
         </section>

         {/* Main 2-Column Split */}
         <section className="max-w-[1000px] mx-auto px-6 py-20 flex flex-col md:flex-row gap-16 relative">
            
            {/* LEFT COLUMN: Main Course Info */}
            <div className="w-full md:w-[65%] text-[16px] text-gray-700 font-medium leading-relaxed space-y-16">
               
               {/* Ground up */}
               <div>
                  <h2 className="text-[32px] font-black text-[#1D1C1B] mb-6">Learn from the ground up</h2>
                  <p className="mb-8">
                     In this beginner's course you'll find everything you need to get started with Sketch. We'll give you an overview of what Sketch is, help you set up your Workspace and cover everything you need to start designing.
                  </p>
                  
                  <h4 className="text-[17px] font-bold text-[#1D1C1B] mb-3">Meet Workspaces</h4>
                  <p className="mb-8">
                     Discover how to make the most of your Workspace and create your best work. Learn how to keep documents organized, invite people to collaborate with you and much more.
                  </p>

                  <h4 className="text-[17px] font-bold text-[#1D1C1B] mb-3">Create your first designs</h4>
                  <p>
                     Time to jump into the Mac app and start designing from day one. Throughout this course, you'll learn basic design concepts that'll get your design journey started.
                  </p>
               </div>

               {/* What you'll learn */}
               <div className="border-t border-gray-100 pt-16">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] mb-8">What you'll learn</h2>
                  <div className="space-y-6">
                     <div className="flex gap-4 items-start">
                        <CheckIcon />
                        <div>
                           <div className="text-[#1D1C1B] font-bold mb-1">How Sketch can help you in each stage of the design process</div>
                           <p className="text-[15px] opacity-80">Use the Mac app and web app in an end-to-end design workflow, from ideation to handoff</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <CheckIcon />
                        <div>
                           <div className="text-[#1D1C1B] font-bold mb-1">How to make the most of your Workspace</div>
                           <p className="text-[15px] opacity-80">Tailor your Workspace to suit your workflow and collaboration needs</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <CheckIcon />
                        <div>
                           <div className="text-[#1D1C1B] font-bold mb-1">Everything you need to create your first designs</div>
                           <p className="text-[15px] opacity-80">You'll understand basic design concepts and how to make the most of the Mac app</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Course lessons */}
               <div className="border-t border-gray-100 pt-16 pb-6">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] mb-6">Course lessons</h2>
                  <p className="mb-10">
                     Let's get you set up in Sketch first. We'll then create your Sketch Workspace and learn about its possibilities. Then, we'll deep-dive into the Mac app and get your first designs off the ground. We'll wrap it up by sharing your designs and inviting other people to work along with you.
                  </p>

                  {/* Accordion / Table Wrapper */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white text-[15px]">
                     {syllabus.map((chapter, idx) => (
                        <div key={idx} className="border-b border-gray-200 last:border-b-0">
                           {/* Header of Chapter */}
                           <div className="px-6 py-4 bg-[#F9F9F9] flex justify-between items-center text-[#1D1C1B]">
                              <span className="font-bold">{chapter.title}</span>
                              <span className="text-gray-500 text-[14px]">{chapter.videosCount}</span>
                           </div>
                           {/* List of lessons */}
                           <div className="bg-white">
                              {chapter.lessons.map((lesson, l_idx) => (
                                 <div key={l_idx} className="px-6 py-3 flex items-center hover:bg-gray-50 transition border-t border-gray-100 first:border-0 group cursor-pointer">
                                    <span className="w-12 text-gray-400 tabular-nums">{lesson.id}</span>
                                    <span className="flex-1 text-[#1D1C1B]">{lesson.name}</span>
                                    <span className="text-gray-400 tabular-nums mr-4">{lesson.duration}</span>
                                    <div className="opacity-0 group-hover:opacity-100 transition"><PlayIconOrange /></div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Requirements */}
               <div className="border-t border-gray-100 pt-16">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] mb-6">Requirements</h2>
                  <p className="mb-6">To successfully complete this course, you'll need:</p>
                  <div className="space-y-4 text-[15px]">
                     <div className="flex gap-4 items-start">
                        <CheckIcon />
                        <span className="mt-0.5">A Sketch Account — don't worry, we'll set this up together in our first few lessons.</span>
                     </div>
                     <div className="flex gap-4 items-start">
                        <CheckIcon />
                        <span className="mt-0.5">macOS Big Sur (11.0.0) or newer to run the Mac app.</span>
                     </div>
                  </div>
               </div>

               {/* Soft grey alert banner */}
               <div className="bg-[#FAF9FA] rounded-xl p-6 border border-gray-100 mt-6 flex flex-col justify-center">
                  <h4 className="font-bold text-[#1D1C1B] mb-1">Don't have a Sketch Account?</h4>
                  <p className="text-[14px] text-gray-500">
                     <a href="#" className="underline font-bold text-black hover:text-sketch-orange transition mr-1">Sign up</a> 
                     today and get started for free with our 30-day trial.
                  </p>
               </div>

               {/* Mentor */}
               <div className="border-t border-gray-100 pt-16">
                  <h2 className="text-[28px] font-black text-[#1D1C1B] mb-8">Mentor</h2>
                  <div className="flex items-center gap-4 mb-8">
                     <img src="https://picsum.photos/100/100?random=202" className="w-[60px] h-[60px] rounded-full shadow-sm" />
                     <div>
                        <div className="font-bold text-[18px] text-[#1D1C1B]">Joseph Todaro</div>
                        <div className="text-[14px] text-gray-500">Head of Video at Sketch</div>
                     </div>
                  </div>
                  <div className="space-y-6 text-[15px] opacity-90 leading-relaxed">
                     <p>Joseph is our Head of Video at Sketch. He brings over a decade of product, design, and education experience. Before joining Sketch, he was a Senior Product Designer at InVision and was also responsible for the design education courses for InVision Studio and DSM.</p>
                     <p>While designing in-flight entertainment software at Fuse IFX, he migrated his team to Sketch – a tool that would go on to change the way he works. Eventually, he founded LearnSketch.com as a side project to share his knowledge and passion for the tool.</p>
                     <p>Joseph currently teaches UI and UX design at the Laguna College of Art and Design. He continues to share resources with the design community through projects like LearnSketch.com, Shapefest.com, LUTHOUSE.com and RandomUI.com.</p>
                  </div>
                  {/* Social links */}
                  <div className="flex gap-4 mt-6 text-gray-400">
                     <span className="hover:text-black transition cursor-pointer text-xl">🐦</span>
                     <span className="hover:text-black transition cursor-pointer text-xl">▶</span>
                  </div>
               </div>

            </div>

            {/* RIGHT COLUMN: Sticky Information Card */}
            <div className="w-full md:w-[35%] relative">
               <div className="sticky top-28 bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col z-20">
                  {/* Warm Gradient Underlay */}
                  <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#FFF5E6] to-white -z-10"></div>
                  
                  {/* Content Wrapper */}
                  <div className="p-8 pb-8 flex flex-col">
                     {/* Mini Profile */}
                     <div className="flex items-center gap-4 mb-8">
                        <img src="https://picsum.photos/100/100?random=202" className="w-12 h-12 rounded-full shadow-sm" />
                        <div>
                           <div className="font-bold text-[15px] text-[#1D1C1B] leading-tight">Joseph Todaro</div>
                           <div className="text-[13px] text-gray-500 font-medium">Mentor</div>
                        </div>
                     </div>

                     {/* Details Rows */}
                     <div className="flex flex-col text-[14px]">
                        
                        <div className="py-4 border-t border-gray-100 flex gap-4 items-center">
                           <span className="text-gray-400 shrink-0 text-lg">▶</span>
                           <div className="font-bold text-[#1D1C1B]">
                              16 video lessons
                              <div className="text-gray-400 font-normal text-[12px] mt-0.5">+ 12 additional resources</div>
                           </div>
                        </div>

                        <div className="py-4 border-t border-gray-100 flex gap-4 items-center">
                           <span className="text-gray-400 shrink-0 text-lg">⏱</span>
                           <div className="font-bold text-[#1D1C1B]">Approx. 90 minutes</div>
                        </div>

                        <div className="py-4 border-t border-gray-100 flex gap-4 items-center">
                           <span className="text-gray-400 shrink-0 text-lg">🏷</span>
                           <div className="font-bold text-[#1D1C1B]">Design</div>
                        </div>
                        
                        <div className="py-4 border-t border-gray-100 flex gap-4 items-center">
                           <span className="text-gray-400 shrink-0 text-lg">💬</span>
                           <div className="font-bold text-[#1D1C1B]">English</div>
                        </div>

                        <div className="py-4 border-t border-gray-100 flex gap-4 items-center">
                           <span className="text-gray-400 shrink-0 text-lg">☆</span>
                           <div className="font-bold text-[#1D1C1B]">Free for everyone</div>
                        </div>

                     </div>

                     <button className="bg-black text-white w-full py-3.5 mt-6 rounded-lg font-bold text-[15px] shadow-md hover:bg-gray-800 transition duration-300">
                        Start course
                     </button>
                  </div>
               </div>

               {/* Second sticky box (optional fallback message) */}
               <div className="sticky top-[700px] bg-[#FAF9FA] rounded-xl p-6 border border-gray-100 mt-6 mt-8 flex flex-col">
                  <h4 className="font-bold text-[#1D1C1B] mb-1 text-[14px]">Don't have a Sketch Account?</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                     <a href="#" className="underline font-bold text-black hover:text-sketch-orange transition">Sign up</a> today and get started for free with our 30-day trial.
                  </p>
               </div>
            </div>

         </section>

         {/* Bottom Action Section Component */}
         <section className="bg-white border-t border-gray-100 relative overflow-hidden py-32">
            
            {/* Background Line-art decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
               <div className="absolute top-[30%] left-[20%] text-6xl transform -rotate-12">🎨</div>
               <div className="absolute top-[20%] right-[30%] text-5xl transform rotate-12">🎯</div>
               <div className="absolute bottom-[20%] left-[25%] text-7xl transform rotate-[-5deg]">💬</div>
               <div className="absolute bottom-[30%] right-[20%] text-6xl transform rotate-[20deg]">📐</div>
               <div className="absolute top-[50%] right-[10%] text-5xl transform rotate-[-15deg]">📖</div>
            </div>

            <div className="max-w-xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-2xl mb-8">
                  <span className="text-[#FD6B22]">⏰</span>
               </div>
               <h2 className="text-[36px] font-black text-[#1D1C1B] tracking-tight mb-4">Sketch 102 is coming</h2>
               <p className="text-[17px] font-medium text-gray-500 leading-relaxed mb-10 w-[80%] mx-auto">
                  Get early access and receive the latest updates on courses right in your inbox.
               </p>

               <div className="flex w-full max-w-sm gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-black shadow-sm bg-gray-50/50" />
                  <button className="bg-[#99A3AB] text-white px-6 py-3 rounded-md text-[14px] font-bold shadow-sm hover:opacity-80 transition block w-fit">
                     Notify me
                  </button>
               </div>
               <div className="mt-4 flex items-center gap-2">
                  <input type="checkbox" className="border-gray-300 rounded-sm" />
                  <span className="text-[12px] text-gray-400 font-medium whitespace-nowrap">I agree to receive educational emails from Sketch</span>
               </div>
            </div>
         </section>

         {/* Standard Footer */}
         <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-3 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed max-w-md">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm bg-gray-50/50" />
                  <button className="bg-gray-300 text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80">Try it out</button>
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
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center text-black">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
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
