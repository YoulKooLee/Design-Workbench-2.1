/**
 * @name Contact Us
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
   <header className="bg-transparent w-full z-50 absolute top-0 left-0 border-b border-transparent">
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
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2.5 rounded hover:bg-black transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const BlackLink = ({children}) => (
   <a href="#" className="font-bold underline decoration-[2px] decoration-black underline-offset-2 hover:opacity-70 transition">{children}</a>
);

export default function P22Contact() {
   return (
      <div className="min-h-screen bg-white overflow-hidden selection:bg-orange-200 selection:text-black font-sans relative">
         
         {/* Right Side Environmental Decor & Background */}
         <div className="hidden lg:block absolute top-[80px] right-0 w-[45%] h-full z-0 h-screen pointer-events-none origin-top overflow-visible">
            
            {/* Soft Purple Vertical Strip */}
            <div className="absolute top-[300px] right-[10%] w-[80%] bottom-0 bg-[#E0BBEF] flex translate-x-12 z-0 pb-32 shadow-xl" style={{height: '150vh'}}></div>
            
            {/* The 3D Magenta Bubble Container */}
            <div className="absolute top-[-40px] right-[5%] w-[680px] h-[680px] z-10 translate-x-[50px] transform">
               
               {/* Tail shapes made with SVG */}
               <svg viewBox="0 0 400 400" className="absolute bottom-[-100px] left-[150px] w-[350px] h-[350px] transform rotate-[-20deg] z-0">
                  <path d="M100 100 L200 300 C250 350, 300 250, 250 200 Z" fill="url(#tailGrad1)"/>
                  <path d="M50 150 L10 250 C-10 320, 100 280, 120 200 Z" fill="url(#tailGrad2)"/>
                  <defs>
                     <linearGradient id="tailGrad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C415B1" />
                        <stop offset="100%" stopColor="#871A65" />
                     </linearGradient>
                     <linearGradient id="tailGrad2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#D94EB4" />
                        <stop offset="100%" stopColor="#A23281" />
                     </linearGradient>
                  </defs>
               </svg>

               {/* Giant main 3D sphere */}
               <div className="absolute inset-0 rounded-full z-10 shadow-[0_40px_80px_rgba(110,12,125,0.4)]"
                    style={{
                       background: 'radial-gradient(circle at 30% 25%, #FFBEF9 0%, #EB4DE9 20%, #A20ECB 60%, #470D6A 100%)'
                    }}>
               </div>
            </div>

         </div>

         <Nav />

         <main className="relative z-10 pt-32 pb-40 max-w-[1400px] mx-auto px-6 lg:pl-20 xl:pl-32 pr-6 flex justify-between h-auto">
            
            {/* Main Form Left Column */}
            <div className="w-full lg:max-w-[560px] xl:max-w-[580px] flex-shrink-0 mt-8 mb-20 bg-white">
               
               <h1 className="text-[56px] md:text-[68px] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-8">
                  Contact Us
               </h1>
               
               <p className="text-[21px] font-medium text-[#1D1C1B] leading-[1.5] mb-12">
                  Got a licensing, billing or technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
               </p>

               <div className="mb-12">
                  <h3 className="text-[22px] font-black text-[#1D1C1B] mb-4">We're here to help you out</h3>
                  <div className="space-y-5 text-[15px] font-medium text-[#1D1C1B] leading-[1.6]">
                     <p>If you have any questions, just reach out to us and we'll respond as soon as we can. Please provide as much information as possible.</p>
                     <p>For any issues with Sketch, you can also check our <BlackLink>status</BlackLink> at any time and sign-up to our updates.</p>
                  </div>
               </div>

               {/* The Form */}
               <form className="space-y-8 mt-10">
                  
                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-[#1D1C1B]">
                        Your email address <span className="font-medium text-gray-500">(So we can reply to you)</span>
                     </label>
                     <input type="email" placeholder="Email address" className="w-full p-3.5 bg-[#FCFBFC] border border-gray-200 rounded-[6px] text-[15px] font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]" />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-[#1D1C1B]">Topic</label>
                     <div className="relative">
                        <select className="appearance-none w-full p-3.5 bg-[#FCFBFC] border border-gray-200 rounded-[6px] text-[15px] font-medium text-[#1D1C1B] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
                           <option>Select a topic</option>
                           <option>Licensing and Billing</option>
                           <option>Technical Support</option>
                           <option>Beta Feedback</option>
                           <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="8 15 12 19 16 15"></polyline>
                              <polyline points="16 9 12 5 8 9"></polyline>
                           </svg>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-[#1D1C1B]">Subject</label>
                     <input type="text" placeholder="Let us know how we ca" className="w-full p-3.5 bg-[#FCFBFC] border border-gray-200 rounded-[6px] text-[15px] font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]" />
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-[#1D1C1B]">Full description</label>
                     <textarea rows={6} placeholder="Include as much detail as you can" className="w-full p-3.5 bg-[#FCFBFC] border border-gray-200 rounded-[6px] text-[15px] font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition resize-y shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"></textarea>
                  </div>

                  {/* Attachment Note */}
                  <div className="text-[13px] font-medium text-[#1D1C1B] leading-relaxed">
                     You can include files (documents, screen recordings, screenshots, crash logs, etc.) by uploading them to any third-party file-sharing service, such as <BlackLink>Dropbox</BlackLink>, <BlackLink>Google Drive</BlackLink>, <BlackLink>Microsoft OneDrive</BlackLink>, <BlackLink>WeTransfer</BlackLink> or similar, and pasting the URLs above. Please make sure the correct sharing permissions have been set. All files sent to us are 100% confidential.
                     <div className="mt-4">
                        <BlackLink>What files should you include?</BlackLink>
                     </div>
                  </div>

                  {/* Checkboxes Line */}
                  <div className="space-y-4 pt-2">
                     <label className="flex items-start gap-4 cursor-pointer group">
                        <input type="checkbox" className="mt-1 flex-shrink-0 w-4 h-4 rounded-sm border-gray-300 text-black shadow-sm focus:ring-black" />
                        <span className="text-[14px] font-medium text-gray-700 leading-relaxed group-hover:text-black transition">
                           By submitting this form, you confirm that you have read and agree to Sketch's <BlackLink>Terms of Service</BlackLink> and <BlackLink>Privacy Statement</BlackLink>
                        </span>
                     </label>

                     <label className="flex items-start gap-4 cursor-pointer group">
                        <input type="checkbox" className="mt-1 flex-shrink-0 w-4 h-4 rounded-sm border-gray-300 text-black shadow-sm focus:ring-black" />
                        <span className="text-[14px] font-medium text-gray-700 leading-relaxed group-hover:text-black transition">
                           Keep me updated on news and offers
                        </span>
                     </label>
                  </div>

                  <div className="pt-2">
                     <button type="submit" className="bg-[#1D1C1B] text-white px-8 py-3.5 rounded-[4px] font-bold text-[15px] shadow-sm hover:bg-gray-800 transition duration-300">
                        Send
                     </button>
                  </div>
               </form>

            </div>
         </main>


         {/* Standard Footer Area */}
         <footer className="pt-20 pb-8 border-t border-gray-100 bg-white relative z-20">
            {/* Same generic layout */}
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-3 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed max-w-md">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-black shadow-sm bg-[#FAFAFA]" />
                  <button className="bg-[#9A9A9A] text-white px-6 py-3 rounded-[4px] text-[14px] shadow-sm hover:opacity-80 transition font-bold leading-none">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded-sm border-gray-300 text-black" />
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
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Support</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#" className="hover:text-black transition flex items-center justify-between group cursor-pointer">Sketch Help <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
                  <li><a href="#" className="hover:text-black transition font-bold text-black border-l-2 border-black pl-3 -ml-[14px]">Contact Us</a></li>
                  <li><a href="#" className="hover:text-black transition">Manage License</a></li>
                  <li><a href="#" className="hover:text-black transition flex items-center justify-between group cursor-pointer">Service Status <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Company</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=19-about-us" className="hover:text-black transition">About Us</a></li>
                  <li><a href="#page=17-careers" className="hover:text-black transition flex items-center">Careers <span className="text-[10px] bg-gray-200 text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded shadow-sm border border-gray-200">1</span></a></li>
                  <li><a href="#" className="hover:text-black transition">Terms & Policies</a></li>
                  <li><a href="#" className="hover:text-black transition">Cookie Preferences</a></li>
               </ul>
               </div>
            </div>
            {/* Added standard company and support sections back to footer in this page for visual accuracy */}
         </footer>

      </div>
   );
}
