/**
 * @name Newsletter
 */
import React from 'react';
import './style.css';

const Logo = () => (
   <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M16 2L2 10L16 30L30 10L16 2Z" fill="#1D1C1B"/>
     <path d="M16 2L9 10L16 30L16 2Z" fill="#1D1C1B"/>
     <path d="M16 2L23 10L16 30L16 2Z" fill="#1D1C1B"/>
     <path d="M2 10L9 10L16 30L2 10Z" fill="#1D1C1B"/>
     <path d="M30 10L23 10L16 30L30 10Z" fill="#1D1C1B"/>
     <path d="M9 10H23L16 2L9 10Z" fill="#1D1C1B"/>
   </svg>
);

const Nav = () => (
   <header className="w-full z-50 relative bg-transparent">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-[15px] font-bold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product <span className="text-[10px] text-[#1D1C1B] font-normal ml-0.5">v</span></a>
            <a href="#" className="hover:text-sketch-orange transition">Learn <span className="text-[10px] text-[#1D1C1B] font-normal ml-0.5">v</span></a>
            <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
            <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
            <a href="#" className="hover:text-sketch-orange transition">Why Sketch <span className="text-[10px] text-[#1D1C1B] font-normal ml-0.5">v</span></a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-[15px] font-bold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block">Support <span className="text-[10px] text-[#1D1C1B] font-normal ml-0.5">v</span></a>
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2.5 rounded hover:bg-black transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const IssueItem = ({ num, title, desc, gradient, emoji }) => (
   <div className="flex items-start gap-6 border-b border-gray-100 py-8 group cursor-pointer">
      <div className={`w-[72px] h-[72px] rounded-[14px] flex-shrink-0 flex items-center justify-center relative shadow-sm overflow-hidden ${gradient}`}>
         <div className="text-[32px] transform group-hover:scale-110 transition duration-300 drop-shadow-sm z-10 relative left-0 top-0 leading-none filter drop-shadow">
            {emoji}
         </div>
         {/* Abstract geometric noise or glares */}
         <div className="absolute top-0 right-0 w-8 h-8 bg-white/30 backdrop-blur rounded-full transform -translate-y-4 translate-x-2"></div>
      </div>
      <div className="flex flex-col justify-center pt-2">
         <h4 className="text-[16px] font-bold leading-tight text-[#1D1C1B] group-hover:text-sketch-orange transition mb-1 flex items-center">
            Issue {num}: <span className="font-medium ml-1.5">{title}</span>
            <svg className="w-3 h-3 ml-2 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
         </h4>
      </div>
   </div>
);

export default function P25Newsletter() {
   return (
      <div className="min-h-screen bg-white text-[#1D1C1B] font-sans overflow-x-hidden selection:bg-yellow-200 selection:text-black">
         
         {/* Top Promo Banner */}
         <div className="bg-[#FEFAEC] w-full py-2.5 flex justify-center items-center gap-3 text-[13px] font-bold text-[#1D1C1B] cursor-pointer group border-b border-[#F7EAC1]/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span className="group-hover:underline decoration-1 underline-offset-2">Ready to create your best work? Here's how Sketch can help! →</span>
         </div>

         {/* Hero Section Container */}
         <section className="relative w-full overflow-hidden pb-32">
            
            {/* The Massive Diagonal Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FFF8DF] via-[#FCE492] to-[#EFA02A]" 
                 style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)',
                 }}>
               {/* Internal subtle radial highlight */}
               <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-60"></div>
            </div>

            <Nav />

            {/* Hero Main Content */}
            <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 h-[600px]">
               
               {/* Left: Complex 3D Book Graphic */}
               <div className="w-full md:w-1/2 flex justify-center items-center relative h-full">
                  <div className="relative w-[340px] h-[480px]">
                     
                     {/* Background Magazine */}
                     <div className="absolute top-[20px] left-[-20px] w-[300px] h-[420px] bg-white rounded-r-[8px] rounded-l-[4px] shadow-[20px_0px_30px_rgba(0,0,0,0.05),-10px_0px_10px_rgba(0,0,0,0.02)] border border-[#EBEBEB] transform -rotate-[4deg] flex overflow-hidden">
                        {/* Fake binding crease */}
                        <div className="w-[10px] h-full bg-gradient-to-r from-gray-200 to-white flex-shrink-0 relative z-10"></div>
                        <div className="p-8 pb-12 pt-16 flex flex-col w-full relative z-0">
                           <div className="text-[64px] font-black text-[#1D1C1B] leading-[0.85] tracking-tighter opacity-90">E</div>
                        </div>
                     </div>

                     {/* Foreground Magazine */}
                     <div className="absolute top-[40px] left-[30px] w-[310px] h-[435px] bg-white rounded-[6px] shadow-[20px_30px_60px_rgba(0,0,0,0.15)] border border-[#FAFAFA] transform rotate-[7deg] overflow-hidden flex flex-col">
                        
                        {/* Book Cover Design */}
                        <div className="w-full h-full relative p-8">
                           {/* Dotted corner border mimicking safe-zones */}
                           <div className="absolute top-6 left-6 w-[200px] h-[100px] border border-dashed border-gray-300"></div>
                           <div className="absolute top-5 left-5 w-2 h-2 border border-gray-400 bg-white"></div>
                           <div className="absolute top-5 left-[202px] w-2 h-2 border border-gray-400 bg-white"></div>
                           <div className="absolute top-[101px] left-5 w-2 h-2 border border-gray-400 bg-white"></div>
                           <div className="absolute top-[101px] left-[202px] w-2 h-2 border border-gray-400 bg-white"></div>

                           <div className="text-[52px] font-black text-[#1D1C1B] leading-[0.9] tracking-tighter relative z-10 mt-6">
                              Beyond <br/> 
                              <div className="flex items-center gap-2 -mt-1 mb-1">
                                 <span className="text-[11px] bg-[#EAEAEA] px-1.5 py-0.5 rounded-sm uppercase tracking-widest font-bold">THE</span>
                              </div>
                              Canvas
                           </div>

                           {/* Central Graphic: Etch a Sketch style iPad */}
                           <div className="absolute bottom-[60px] right-[40px] w-[140px] h-[105px] bg-[#EE4631] border-[4px] border-[#D0301E] rounded-[10px] flex items-center justify-center shadow-lg transform -rotate-[5deg]">
                              <div className="w-[110px] h-[75px] bg-[#EEEEEE] rounded-[4px] border-b-[3px] border-[#CD2F20] relative flex items-start justify-center pt-2 overflow-hidden shadow-inner">
                                 {/* Diamond Line Art inside Screen */}
                                 <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="#C4C4C4" strokeWidth="1.5">
                                    <path d="M16 2L2 10L16 30L30 10L16 2Z" />
                                    <path d="M16 2L9 10L16 30" />
                                    <path d="M16 2L23 10L16 30" />
                                    <path d="M2 10H30" />
                                 </svg>
                                 <div className="absolute bottom-1 left-1.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                 <div className="absolute bottom-1 right-1.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                              </div>
                           </div>

                           {/* Green Issue Tag */}
                           <div className="absolute bottom-[40px] right-[-10px] bg-[#89B846] text-white px-3 py-1 font-bold text-[10px] tracking-widest uppercase rounded shadow-md transform rotate-[10deg] flex items-center gap-1 z-20">
                              ISSUE 01
                           </div>
                        </div>

                        {/* Top book spine shadow binding */}
                        <div className="absolute left-0 top-0 w-[12px] h-full bg-gradient-to-r from-gray-200/50 to-transparent"></div>
                     </div>
                  </div>
               </div>

               {/* Right: Copy & Form */}
               <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h1 className="text-[28px] md:text-[34px] font-medium text-[#1D1C1B] leading-[1.3] mb-8 pr-4">
                     Subscribe to the Sketch newsletter and get carefully-curated news, inspiration and resources in your inbox — <span className="font-bold">every month</span>.
                  </h1>

                  <form className="max-w-[480px]">
                     <div className="flex w-full mb-4">
                        <input type="email" placeholder="Your email address" className="flex-1 px-5 py-4 min-w-0 bg-white border border-transparent rounded-l-[6px] text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#EFA02A] shadow-sm transition" />
                        <button type="submit" className="flex-shrink-0 px-8 py-4 bg-[#8E7E62] text-white rounded-r-[6px] text-[15px] font-bold shadow-sm hover:bg-[#78694F] transition">Subscribe</button>
                     </div>

                     <label className="flex items-start gap-4 cursor-pointer group mb-6">
                        <input type="checkbox" className="mt-1.5 flex-shrink-0" />
                        <span className="text-[13px] font-medium text-gray-800 leading-relaxed group-hover:text-black transition pr-6">
                           I want to receive other Marketing emails from Sketch, including product updates, inspiration from the Sketch community and more.
                        </span>
                     </label>

                     <a href="#" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#1D1C1B] hover:opacity-70 transition border-b-2 border-transparent hover:border-black pb-0.5">
                        Preview previous issues <span className="text-[12px]">↓</span>
                     </a>
                  </form>
               </div>

            </div>
         </section>

         {/* 2 Column Value Props Sub-Hero */}
         <section className="bg-white py-16 px-6 relative z-10 w-full mb-16">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 pb-4 pt-10">
               <div>
                  <div className="mb-4">
                     {/* News Icon */}
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#68C795" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="M2 18h10"></path></svg>
                  </div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-3">Hand-picked resources</h3>
                  <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
                     Our Editorial team carefully curates all the articles, videos, resources and design files in every newsletter. So you get the best design industry content delivered right to your inbox once a month.
                  </p>
               </div>
               <div>
                  <div className="mb-4">
                     {/* Cube Icon */}
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  </div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-3">The latest updates</h3>
                  <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
                     Stay updated on Sketch with a single subscription. You'll get our latest updates, see what fellow creators have been up to and get the inside track on the features we're most excited about each quarter.
                  </p>
               </div>
            </div>
         </section>


         {/* Previous Issues Archive Section */}
         <section className="bg-[#FAF9FA] py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-20">
               
               {/* Left Column Text (Sticky behavior potential) */}
               <div className="lg:w-5/12 flex-shrink-0 lg:sticky lg:top-24 h-max">
                  <div className="inline-block bg-[#EFEFEF] text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-[4px] mb-6 shadow-sm">
                     Issues
                  </div>
                  <h2 className="text-[44px] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-6 max-w-[380px]">
                     Catch up on previous newsletters
                  </h2>
                  <p className="text-[18px] font-medium text-gray-600 leading-relaxed max-w-[400px]">
                     Missed out on previous issues of Beyond the Canvas? No problem — here you can catch up with our previous newsletters. They're packed with useful interesting content and useful advice and resources.
                  </p>
               </div>

               {/* Right Column List */}
               <div className="lg:w-7/12 flex-shrink-0 lg:pl-10">
                  <IssueItem num="08" title="Here are some handy design resources for iOS 16 📱" gradient="bg-gradient-to-tr from-sky-400 to-blue-600" emoji="📲" />
                  <IssueItem num="07" title="Ever had to keep quiet about your design projects? 🤐" gradient="bg-gradient-to-tr from-teal-300 to-emerald-500" emoji="Aa" />
                  <IssueItem num="06" title="Here's what they don't teach you in design school... 🎓" gradient="bg-gradient-to-tr from-[#DBEECA] to-green-300" emoji="🏫" />
                  <IssueItem num="05" title="Skeuomorphism is back! ...Wait, what?! 🤯" gradient="bg-gradient-to-tr from-cyan-200 to-blue-400" emoji="👜" />
                  <IssueItem num="04" title="Keep it cool this summer with more collaboration ⛱" gradient="bg-gradient-to-tr from-yellow-300 to-orange-400" emoji="🎨" />
                  <IssueItem num="03" title="Seek out inspiration 💡" gradient="bg-gradient-to-tr from-pink-300 to-purple-400" emoji="🖼️" />
                  <IssueItem num="02" title="Power up designs with Color Tokens 🎨" gradient="bg-gradient-to-tr from-green-700 to-green-900" emoji="D" />
                  <IssueItem num="01" title="Welcome to the all-new Sketch Newsletter ✨" gradient="bg-gradient-to-tr from-red-500 to-orange-500" emoji="🖥️" />
               </div>

            </div>
         </section>

         {/* Green Bottom CTA */}
         <section className="bg-white py-32 px-6 overflow-hidden">
            <div className="max-w-[1240px] mx-auto rounded-[24px] relative overflow-hidden h-[460px] bg-[#BDED7E] flex items-center">
               {/* Massive radial green glow */}
               <div className="absolute left-[10%] bottom-[-50%] w-[1200px] h-[1200px] rounded-full mix-blend-multiply opacity-50 filter blur-[100px]" 
                    style={{ background: 'radial-gradient(circle, #52D02B 0%, transparent 70%)' }}>
               </div>
               
               {/* Diamond Watermark in background */}
               <div className="absolute top-[80px] left-[150px] opacity-100 z-10 hidden md:block">
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M16 2L2 10L16 30L30 10L16 2Z" fill="#1D1C1B"/>
                     <path d="M16 2L9 10L16 30L16 2Z" fill="#111"/>
                     <path d="M16 2L23 10L16 30L16 2Z" fill="#111"/>
                     <path d="M2 10L9 10L16 30L2 10Z" fill="#111"/>
                     <path d="M30 10L23 10L16 30L30 10Z" fill="#111"/>
                     <path d="M9 10H23L16 2L9 10Z" fill="#111"/>
                  </svg>
               </div>

               <div className="relative z-20 px-10 md:px-24 max-w-[800px] pt-12">
                  <h2 className="text-[48px] md:text-[64px] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-6 drop-shadow-sm">
                     Create your Workspace for free
                  </h2>
                  <p className="text-[20px] md:text-[23px] font-medium text-[#1D1C1B] opacity-90 leading-[1.4] mb-10 max-w-[640px]">
                     Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.
                  </p>
                  <button className="bg-[#1D1C1B] text-white px-8 py-3.5 rounded-[4px] font-bold text-[15px] shadow-sm hover:bg-black hover:scale-[1.02] transition duration-300">
                     Get started for free
                  </button>
               </div>
            </div>
         </section>

         {/* Footer Area - Final Copy */}
         <footer className="pt-24 pb-8 border-t border-gray-100 bg-white relative z-20">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
               <div>
                  <h4 className="font-bold mb-5 text-[#1D1C1B] text-[15px]">Product</h4>
                  <ul className="space-y-4 text-[14px] font-medium text-gray-500">
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
                  <h4 className="font-bold mb-5 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
                  <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                     <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition flex items-center">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                     <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
                     <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Adobe XD</a></li>
                     <li><a href="#page=16-education" className="hover:text-black transition flex items-center">Free for Education <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold mb-5 text-[#1D1C1B] text-[15px]">Learn</h4>
                  <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                     <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                     <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                     <li><a href="#page=13-documentation" className="hover:text-black transition">Documentation</a></li>
                     <li><a href="#page=11-community" className="hover:text-black transition">Events & Meetups</a></li>
                     <li><a href="#page=25-newsletter" className="hover:text-black transition">Newsletter</a></li>
                     <li><a href="#page=15-labs" className="hover:text-black transition">Sketch Labs</a></li>
                     <li><a href="#page=23-developer" className="hover:text-black transition flex items-center justify-between group cursor-pointer w-32">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
                  </ul>
               </div>
               <div className="flex justify-between">
                  <div>
                     <h4 className="font-bold mb-5 text-[#1D1C1B] text-[15px]">Support</h4>
                     <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                        <li><a href="#" className="hover:text-black transition flex items-center justify-between group cursor-pointer w-24">Sketch Help <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
                        <li><a href="#" className="hover:text-black transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-black transition">Manage License</a></li>
                        <li><a href="#" className="hover:text-black transition flex items-center justify-between group cursor-pointer w-[110px]">Service Status <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-bold mb-5 text-[#1D1C1B] text-[15px]">Company</h4>
                     <ul className="space-y-4 text-[14px] font-medium text-gray-500">
                        <li><a href="#page=19-about-us" className="hover:text-black transition">About Us</a></li>
                        <li><a href="#page=17-careers" className="hover:text-black transition flex items-center">Careers <span className="text-[10px] bg-gray-200 text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded shadow-sm border border-gray-200">1</span></a></li>
                        <li><a href="#" className="hover:text-black transition">Terms & Policies</a></li>
                        <li><a href="#" className="hover:text-black transition">Cookie Preferences</a></li>
                     </ul>
                  </div>
               </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <Logo />
               <div className="text-[13px] font-medium text-gray-400">
                  © 2026 Sketch B.V.
               </div>
               <div className="flex gap-6 text-gray-400">
                  <a href="#" className="hover:text-[#1DA1F2] transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
                  <a href="#" className="hover:text-[#E1306C] transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="#" className="hover:text-[#EA4C89] transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm8.791-10.59c-.04-.08-1.53-3.08-4.59-4.32.2-1.2.22-2.39.06-3.53a9.58 9.58 0 0 0-3.51-1.37c-.32 1.34-1.02 3.19-2.02 5.16-3.83-1.14-7.53-1.25-8.24-1.26a9.57 9.57 0 0 0 1.25 9.17c1.78-1.02 4.2-2.09 7.6-2.08 1.47 2.76 2.45 5.09 2.66 5.6A9.61 9.61 0 0 0 20.79 13.41zM2.85 9.18C3.59 9.19 7.02 9.3 10.6 10.3c-1.3 2.37-2.73 4.41-3.1 4.9C4.85 13.88 3.51 11.66 2.85 9.18zm8.67 11.68c-.2-0.53-1.15-2.78-2.58-5.46 3.63.15 6.6.9 8.23 1.54M17.84 8.71C15 9.77 13.62 12.39 13.3 13.1c-1.58.07-3.92-.09-6.3-0.89.33-0.45 1.76-2.45 3.01-4.78C12.59 7.4 14.54 6 15 5.64c2 .2 3.82 1 5.34 2.19c-.3.8-.93 2.13-2.54 3.07z"/></svg></a>
                  <a href="#" className="hover:text-[#FF0000] transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
               </div>
            </div>
         </footer>
      </div>
   );
}
