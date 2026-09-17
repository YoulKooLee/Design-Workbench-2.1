/**
 * @name Sketch Labs
 */
import React, { useState } from 'react';
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

const AccordionItem = ({ title, defaultOpen = false }) => {
   const [open, setOpen] = useState(defaultOpen);
   return (
      <div className="border-b border-gray-200 py-6 cursor-pointer group" onClick={() => setOpen(!open)}>
         <div className="flex justify-between items-center text-[19px] font-bold text-[#1D1C1B]">
            <div className="group-hover:text-black transition pr-8">{title}</div>
            <div className={`text-2xl transition transform ${open ? 'rotate-45 text-black' : 'text-black'}`}>+</div>
         </div>
         {open && (
            <div className="mt-4 text-[16px] text-gray-600 leading-relaxed font-medium">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </div>
         )}
      </div>
   );
};

export default function P15Labs() {
   return (
      <div className="min-h-screen bg-[#FDFDFD] overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         {/* Hero Section */}
         <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-32 flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-16 mb-16 md:mb-0">
               <h1 className="text-[56px] md:text-[80px] font-black leading-[1.0] tracking-tight mb-8">
                  <div className="text-[#1D1C1B]">Sketch</div>
                  <div className="text-[#FFAD6A]">Labs</div>
               </h1>
               <p className="text-[19px] font-medium text-gray-700 leading-relaxed mb-10 max-w-md">
                  With Sketch Labs, we're opening our doors and bringing more people who are passionate about Sketch into our research process. It's free and simple to sign up. And by joining and taking part, you'll get great perks in return.
               </p>
               <button className="bg-black text-white px-8 py-3.5 rounded-lg border-2 border-black font-bold text-[15px] shadow-sm hover:bg-transparent hover:text-black hover:shadow-none transition duration-300">
                  Join Sketch Labs
               </button>
            </div>

            {/* Right Faked 3D Illustration */}
            <div className="w-full md:w-1/2 flex justify-end">
               <div className="w-full max-w-[500px] aspect-square rounded-3xl bg-gradient-to-br from-[#FFE3A0] via-[#FFC05A] to-[#FF9342] shadow-2xl overflow-hidden relative group">
                  {/* The Flask Shape */}
                  <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[240px] h-[300px] flex flex-col items-center">
                     {/* Neck */}
                     <div className="w-[60px] h-[100px] bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-t-xl shadow-inner relative z-10 border border-white/50">
                        {/* Highlights & reflections */}
                        <div className="absolute top-0 left-2 w-1.5 h-[80%] bg-white/60 rounded-full blur-[1px]"></div>
                        {/* Lip */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[70px] h-[16px] bg-gray-200 rounded-full border border-white boxShadow-lip shadow-md"></div>
                     </div>
                     {/* Body Triangle Base*/}
                     <div className="w-full h-[200px] -mt-4 bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-600 rounded-[50%] shadow-2xl relative border-b-8 border-r-8 border-transparent backdrop-blur-md overflow-hidden mask-flask group-hover:scale-105 transition duration-700">
                        
                        {/* Internal Liquid color bleed */}
                        <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-900 rounded-[40%] blur-[2px]"></div>
                        
                        {/* Specular curved highlights on glass */}
                        <div className="absolute top-[10%] left-[10%] w-[30%] h-[70%] bg-white/30 rounded-full blur-[4px] transform -rotate-12"></div>
                        <div className="absolute top-[40%] right-[10%] w-[10%] h-[40%] bg-white/20 rounded-full blur-[3px] transform rotate-12"></div>
                        
                        {/* Internal Bubbles */}
                        <div className="absolute bottom-[20%] left-[30%] w-6 h-6 bg-white/40 rounded-full blur-[1px] animate-pulse"></div>
                        <div className="absolute bottom-[40%] left-[50%] w-4 h-4 bg-white/30 rounded-full blur-[1px] animate-bounce"></div>
                     </div>
                     {/* Heavy Drop Shadow on background */}
                     <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[200px] h-[30px] bg-red-900/40 blur-xl rounded-full -z-10"></div>
                  </div>

                  {/* Floating Magic Spheres */}
                  <div className="absolute top-[30%] left-[35%] w-[50px] h-[50px] rounded-full bg-gradient-to-br from-cyan-200 to-blue-600 shadow-xl border border-white/40"></div>
                  <div className="absolute top-[15%] left-[55%] w-[80px] h-[80px] rounded-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500 shadow-2xl transform hover:-translate-y-4 transition duration-500 border border-white/30"></div>
                  <div className="absolute top-[20%] left-[45%] w-[25px] h-[25px] rounded-full bg-gradient-to-br from-purple-200 to-pink-500 shadow-lg border border-white/50"></div>
               </div>
            </div>
         </section>

         {/* Story Sections */}
         <main className="max-w-[760px] mx-auto px-6 pb-32">
            
            <section className="mb-20">
               <h2 className="text-[32px] font-black text-[#1D1C1B] mb-6 tracking-tight">What is Sketch Labs?</h2>
               <div className="space-y-6 text-[18px] text-gray-700 font-medium leading-relaxed">
                  <p>We continuously ask ourselves how Sketch can be even better. And our incredible product team make that their mission every day. But we know that our community can play a part in that mission, too.</p>
                  <p>Everyone is unique and has their own ways of working. And your feedback and ideas help shape our product and empower design teams around the world. That's what Sketch Labs is all about.</p>
                  <p>By joining, you'll get an inside look at our product development process, and help test drive new features and upcoming releases.</p>
                  <p>We'll work together to figure out what your needs are, what works for you, what doesn't, and where the gaps are. With your feedback, we'll be able to make Sketch even better for everyone.</p>
               </div>
            </section>

            <section className="mb-20">
               <h2 className="text-[32px] font-black text-[#1D1C1B] mb-6 tracking-tight">What happens if I sign up?</h2>
               <div className="space-y-6 text-[18px] text-gray-700 font-medium leading-relaxed">
                  <p>When we have an idea for a new feature, or when something we've been working on is ready for testing — we'll send out an invitation to you and other members of Sketch Labs to join a Labs session.</p>
                  <p>Labs sessions can take many forms (we've outlined a few of the most common types below), and you don't have to take part in all of them — every session is voluntary.</p>
                  <p>Our Labs sessions are usually remote, so location isn't an issue — all you need is an internet connection, a Mac, access to Sketch, an inquisitive mind and time to experiment!</p>
               </div>
            </section>

            <section className="mb-24">
               <h2 className="text-[32px] font-black text-[#1D1C1B] mb-6 tracking-tight">How do Labs sessions work?</h2>
               <p className="text-[18px] text-gray-700 font-medium leading-relaxed mb-6">
                  Labs sessions can work a little differently depending on what we're testing and the type of feedback we're looking for. Here are a few examples:
               </p>
               
               <div className="flex flex-col border-t border-gray-200 mt-10">
                  <AccordionItem title="User Interviews" defaultOpen={false} />
                  <AccordionItem title="Usability Testing" />
                  <AccordionItem title="Concept Testing" />
                  <AccordionItem title="Surveys" />
                  <AccordionItem title="A/B Testing" />
                  <AccordionItem title="Diary Study" />
               </div>
            </section>

            <section className="mb-24">
               <h2 className="text-[32px] font-black text-[#1D1C1B] mb-6 tracking-tight">What do I get in return?</h2>
               <p className="text-[18px] text-gray-700 font-medium leading-relaxed mb-8">
                  By being a part of Sketch Labs, you'll be helping us to create an even better product that empowers over a million people around the world. In return, you'll get:
               </p>

               <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                     <span className="w-2 h-2 mt-2.5 rounded-full border-2 border-orange-400 shrink-0"></span>
                     <span className="text-[18px] text-gray-700 font-medium leading-relaxed">A first look at the future of Sketch with demos from our team and the chance to try new features through our Beta versions.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="w-2 h-2 mt-2.5 rounded-full border-2 border-orange-400 shrink-0"></span>
                     <span className="text-[18px] text-gray-700 font-medium leading-relaxed">Access to our Sketch Labs Slack workspace, where you can chat with the Sketch team, share tips and advice, and find out about upcoming Labs sessions.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="w-2 h-2 mt-2.5 rounded-full border-2 border-orange-400 shrink-0"></span>
                     <span className="text-[18px] text-gray-700 font-medium leading-relaxed">The chance to win Sketch swag and other prizes.</span>
                  </li>
               </ul>
            </section>

            <section className="mb-10">
               <h2 className="text-[32px] font-black text-[#1D1C1B] mb-10 tracking-tight">A few more things...</h2>
               
               <div className="flex flex-col border-t border-gray-200">
                  <AccordionItem title="Do I need to prepare for Labs sessions?" />
                  <AccordionItem title="What are the requirements to be able to participate in Sketch research?" />
                  <AccordionItem title="Will my feedback be confidential?" />
                  <AccordionItem title="What will you do with my personal information?" />
                  <AccordionItem title="Can you delete my data?" />
                  <AccordionItem title="What happens if I want to leave Sketch Labs?" />
               </div>
            </section>
            
         </main>

         {/* Standard Footer */}
         <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-2 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-400 mb-6 font-medium leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm bg-gray-50 bg-opacity-50" />
                  <button className="bg-[#A0A0A0] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1 border-gray-300 rounded-sm" />
                  <span className="text-[12px] text-gray-400 font-medium">I agree to receive marketing emails from Sketch.</span>
               </div>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Product</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=07-whats-new" className="hover:text-black transition flex items-center">What's New <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide shadow-sm">NEW</span></a></li>
                  <li><a href="#page=08-design-collaborate" className="hover:text-black transition">Design</a></li>
                  <li><a href="#page=10-collaborative-design" className="hover:text-black transition">Collaboration</a></li>
                  <li><a href="#page=05-prototyping-tools" className="hover:text-black transition">Prototyping</a></li>
                  <li><a href="#page=04-developer-handoff" className="hover:text-black transition">Developer Handoff</a></li>
                  <li><a href="#page=09-workspace" className="hover:text-black transition">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
                  <li><a href="#" className="hover:text-black transition flex items-center">Apps <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded shadow-sm font-bold ml-2">3</span></a></li>
                  <li><a href="#page=20-plugins" className="hover:text-black transition">Extensions</a></li>
                  <li><a href="#page=12-pricing" className="hover:text-black transition">Pricing</a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition flex items-center">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide shadow-sm">NEW</span></a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Adobe XD</a></li>
                  <li><a href="#page=16-education" className="hover:text-black transition flex items-center">Free for Education <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide shadow-sm">NEW</span></a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Learn</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide shadow-sm">NEW</span></a></li>
                  <li><a href="#page=13-documentation" className="hover:text-black transition">Documentation</a></li>
                  <li><a href="#page=11-community" className="hover:text-black transition">Events & Meetups</a></li>
                  <li><a href="#page=25-newsletter" className="hover:text-black transition">Newsletter</a></li>
                  <li><a href="#page=15-labs" className="hover:text-black transition text-black">Sketch Labs</a></li>
                  <li><a href="#page=23-developer" className="hover:text-black transition flex justify-between items-center group cursor-pointer">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
               </ul>
               </div>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-500 font-medium tracking-wide">
               <div className="md:w-1/3 content-start"><Logo /></div>
               <p className="mb-4 md:mb-0 md:w-1/3 text-center opacity-80">© 2026 Sketch B.V.</p>
               <div className="flex gap-6 text-xl md:w-1/3 justify-end relative bottom-4 opacity-70">
                  <span className="hover:text-black cursor-pointer transition">𝕏</span>
                  <span className="hover:text-black cursor-pointer transition">◎</span>
                  <span className="hover:text-black cursor-pointer transition">📷</span>
                  <span className="hover:text-black cursor-pointer transition">▶</span>
               </div>
            </div>
         </footer>
      </div>
   );
}
