/**
 * @name Sketch For Education
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
      <div className="border-t border-gray-200 py-6 cursor-pointer group" onClick={() => setOpen(!open)}>
         <div className="flex justify-between items-center text-[19px] font-bold text-[#1D1C1B]">
            <div className="group-hover:text-black transition pr-8">{title}</div>
            <div className={`text-2xl transition transform ${open ? 'rotate-45 text-black' : 'text-black'}`}>+</div>
         </div>
         {open && (
            <div className="mt-4 text-[16px] text-gray-600 leading-relaxed font-medium">
               Details about {title.toLowerCase()} will be provided here to help students and educators.
            </div>
         )}
      </div>
   );
};

export default function P16Education() {
   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-red-200 selection:text-black">
         <style dangerouslySetInnerHTML={{__html: `
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
            .font-handwriting { font-family: 'Caveat', cursive; }
         `}} />
         
         <Nav />

         {/* Hero Section */}
         <section className="max-w-[1240px] mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
            {/* Left Texts */}
            <div className="w-full md:w-[45%] pr-0 md:pr-16 mb-16 md:mb-0 relative z-10">
               <h1 className="leading-[1.1] tracking-tight mb-8">
                  <div className="text-[56px] md:text-[80px] font-black text-[#1D1C1B]">Sketch</div>
                  <div className="text-[60px] md:text-[86px] font-handwriting text-[#FF6363] transform -rotate-2 -translate-y-4">For Education</div>
               </h1>
               
               <h3 className="text-[20px] font-bold text-[#1D1C1B] mb-6">Get Sketch for free as a student or educator</h3>
               <p className="text-[17px] font-medium text-gray-600 leading-relaxed max-w-[90%] mb-12">
                  Do your best work, faster — for free. With access to our design platform you'll get a whole set of powerful tools, including a Mac app, web app and iPhone app — for design, collaboration, prototyping and handoff. All you need is a macOS compatible device.
               </p>

               {/* Hand-drawn prompt */}
               <div className="relative inline-block mt-4">
                  <span className="font-handwriting text-[#FF6363] text-[36px] font-bold block transform -rotate-6">Learn how to apply</span>
                  {/* Faux marker arrow */}
                  <svg className="absolute top-10 left-[110%] w-[60px] text-[#FF6363] transform rotate-12" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M10,10 Q40,40 90,20 M75,5 L90,20 L75,35" />
                  </svg>
               </div>
            </div>

            {/* Right Abstract Art */}
            <div className="w-full md:w-[55%] relative">
               <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#9AB4D4] via-[#A8C8E6] to-[#E9A7CB] relative shadow-lg">
                  {/* Floating tag */}
                  <div className="absolute top-[15%] left-[20%] bg-[#7752FF] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-lg transform -rotate-12 flex items-center gap-1">
                     <span className="text-lg leading-none">✶</span> Professor
                  </div>
                  
                  {/* Floating items via pure CSS fakes for 3D vibes */}
                  
                  {/* Laptop base */}
                  <div className="absolute top-[50%] left-[25%] w-[50%] h-[40%] bg-[#F0F2F5] rounded-xl transform -rotate-12 skew-x-[30deg] shadow-[20px_20px_40px_rgba(0,0,0,0.15)] border border-white/50 flex items-center justify-center">
                     <div className="w-10 h-10 bg-black/80 rounded mask-apple-logo shadow-inner"></div>
                  </div>
                  {/* Floating books/boxes */}
                  <div className="absolute top-[25%] right-[25%] w-[25%] h-[20%] bg-white rounded-lg transform rotate-12 skew-x-[-20deg] shadow-[10px_15px_30px_rgba(0,0,0,0.1)] border-b-8 border-gray-200"></div>
                  
                  <div className="absolute top-[35%] right-[15%] w-[30%] h-[25%] bg-[#F9EFE3] rounded-sm transform rotate-45 skew-x-[-10deg] shadow-[5px_10px_20px_rgba(0,0,0,0.1)] flex border-t-8 border-r-8 border-white">
                     <div className="w-1/2 h-full bg-white/80 border-r border-gray-200"></div><div className="w-1/2 h-full bg-white/40"></div>
                  </div>
                  
                  {/* Small floating sticky note */}
                  <div className="absolute top-[40%] left-[15%] w-[8%] h-[8%] bg-[#E5D7B7] transform rotate-12 shadow-lg border border-white/30"></div>
                  
                  {/* Background magic glow */}
                  <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-pink-400/30 blur-[80px] rounded-full mix-blend-overlay pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-400/30 blur-[60px] rounded-full mix-blend-overlay pointer-events-none"></div>
               </div>
            </div>
         </section>

         {/* Chalkboard Steps Region */}
         <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">
            
            <div className="text-center mb-16">
               <h2 className="text-[52px] font-black text-[#1D1C1B] leading-tight mb-0">It's easy</h2>
               <h2 className="text-[56px] font-handwriting text-[#FF6363] leading-none transform -rotate-1 -translate-y-2 mb-6">to get started</h2>
               <p className="text-[17px] text-gray-600 font-medium max-w-lg mx-auto">
                  In just two simple steps you can design, prototype and collaborate with your classmates and colleagues (and maybe even your design idols).
               </p>
            </div>

            {/* The Chalkboard */}
            <div className="w-full rounded-[24px] bg-[#2A2B2D] border-[16px] border-[#916E53] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),_inset_0_0_80px_rgba(0,0,0,0.6)] px-10 py-16 md:p-20 relative overflow-hidden box-border">
               {/* Faint chalk dust texture map (simulation via radial gradients) */}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_100%)]"></div>
               <div className="absolute top-10 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
               <div className="absolute bottom-10 right-20 w-64 h-32 bg-white/5 rounded-full blur-3xl"></div>
               {/* Sketch diamond dark watermark */}
               <div className="absolute top-12 right-12 opacity-5 text-4xl">💎</div>

               <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-8 justify-between">
                  
                  {/* Step 1 */}
                  <div className="w-full md:w-[45%] text-white">
                     <div className="w-8 h-8 rounded-full bg-[#6EB2DA] text-[#123955] flex items-center justify-center font-bold text-sm mb-6 font-mono">1</div>
                     <h3 className="text-[22px] font-bold mb-4">Sign up for Sketch</h3>
                     <p className="text-[15px] font-medium text-white/70 leading-relaxed mb-6">
                        Create your Sketch account and set up your <strong className="text-white">Workspace <span className="opacity-70 text-xs">ℹ</span></strong> (no credit card or payment details required). If you already have your own Workspace, you can skip this step!
                     </p>
                     <a href="#" className="inline-flex items-center text-[14px] font-bold text-white hover:text-gray-300 transition group">
                        Create account <span className="ml-2 transform group-hover:translate-x-1 transition">→</span>
                     </a>
                  </div>

                  {/* Chalk Arrow Connector (Visible on desktop) */}
                  <div className="hidden md:block w-[10%] relative flex-shrink-0">
                     {/* Hand-drawn chalk arrow SVGs */}
                     <svg className="absolute top-[20px] left-[-20px] w-[140%] text-white/50" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.2))'}}>
                        <path d="M0,10 Q50,40 100,10" />
                        <path d="M85,3 L100,10 L85,20" />
                     </svg>
                  </div>

                  {/* Step 2 */}
                  <div className="w-full md:w-[45%] text-white pt-8 md:pt-0">
                     <div className="w-8 h-8 rounded-full bg-[#FF6363] text-[#551212] flex items-center justify-center font-bold text-sm mb-6 font-mono">2</div>
                     <h3 className="text-[22px] font-bold mb-4">Answer a few questions</h3>
                     <p className="text-[15px] font-medium text-white/70 leading-relaxed mb-8">
                        Tell us about your student or educator status using our <a href="#" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition">application form</a> — we need a few details as proof of eligibility (that's all we'll use those details for). Once we've verified you, you'll have free access for a year!
                     </p>
                     <button className="bg-white text-[#1D1C1B] px-6 py-3 rounded text-[14px] font-bold shadow-md hover:bg-gray-100 transition">
                        Apply for your education status
                     </button>
                  </div>

               </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
               <div className="bg-[#FAF9FA] rounded-2xl p-8 border border-gray-100">
                  <div className="text-gray-400 mb-4 text-xl">💻</div>
                  <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                     You'll need a macOS compatible device to design with Sketch — our Mac app requires macOS Big Sur (11.0.0) or newer.
                  </p>
               </div>
               <div className="bg-[#FAF9FA] rounded-2xl p-8 border border-gray-100">
                  <div className="text-gray-400 mb-4 text-xl"></div>
                  <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                     Looking for a MacBook or iMac? Try <a href="#page=16-education" className="text-black font-bold underline decoration-gray-300 underline-offset-2">Apple's Education Store</a> for discounts. Availability may depend on your country.
                  </p>
               </div>
               <div className="bg-[#FAF9FA] rounded-2xl p-8 border border-gray-100">
                  <div className="text-gray-400 mb-4 text-xl">🤝</div>
                  <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                     We can't wait to see the wonderful things you create, don't forget to show off your work with <a href="#" className="text-black font-bold underline decoration-gray-300 underline-offset-2">#MadeWithSketch</a>
                  </p>
               </div>
            </div>

         </section>

         {/* Learn Sketch for free! */}
         <section className="bg-white border-t border-gray-100 pt-24 pb-32">
            <div className="max-w-[1100px] mx-auto px-6 text-center">
               
               <div className="mb-16">
                  <h2 className="text-[48px] font-black text-[#1D1C1B] leading-tight mb-0">Learn Sketch</h2>
                  <h2 className="text-[52px] font-handwriting text-[#FF6363] leading-none transform -rotate-1 -translate-y-2 mb-6">for free!</h2>
                  <p className="text-[18px] text-gray-600 font-medium max-w-xl mx-auto">
                     Getting your free Workspace is only one step on your journey. You can do great things with Sketch, and we're here to help you make those great things happen.
                  </p>
               </div>

               <div className="flex flex-col md:flex-row gap-8 justify-center">
                  
                  {/* Course Card */}
                  <div className="bg-white rounded-[24px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden w-full md:w-1/2 flex flex-col text-left group hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition duration-500">
                     <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-end justify-center">
                        {/* fake LEGO pieces */}
                        <div className="w-[120px] h-[80px] bg-[#D7D7D7] relative transform skew-x-[-20deg] shadow-lg border border-white/50 border-b-8 border-gray-400 border-r-8 border-r-gray-300 group-hover:-translate-y-2 transition duration-500">
                           <div className="absolute -top-4 left-4 w-6 h-4 bg-[#E2E2E2] rounded-full border border-gray-300 shadow-sm"></div>
                           <div className="absolute -top-4 left-16 w-6 h-4 bg-[#E2E2E2] rounded-full border border-gray-300 shadow-sm"></div>
                           <div className="absolute top-4 left-4 w-6 h-4 bg-[#E2E2E2] rounded-full border border-gray-300 shadow-sm"></div>
                           <div className="absolute top-4 left-16 w-6 h-4 bg-[#E2E2E2] rounded-full border border-gray-300 shadow-sm"></div>
                        </div>
                     </div>
                     <div className="p-10 flex flex-col flex-1">
                        <div className="text-[#3AA436] mb-4 text-2xl">📓</div>
                        <h3 className="text-[22px] font-black text-[#1D1C1B] mb-4">Course: Sketch 101</h3>
                        <p className="text-[15px] font-medium text-gray-500 leading-relaxed mb-10 flex-1">
                           Our free Sketch 101 course will give you the solid foundations to build remarkable things, whether you're brand new to design, returning to Sketch, or more familiar with other tools.
                        </p>
                        <a href="#" className="text-[14px] font-bold text-[#1D1C1B] flex items-center group-hover:text-sketch-orange transition">Get started <span className="ml-2">→</span></a>
                     </div>
                  </div>

                  {/* Support Card */}
                  <div className="bg-white rounded-[24px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden w-full md:w-1/2 flex flex-col text-left group hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition duration-500">
                     <div className="h-48 bg-gradient-to-b from-gray-50 to-gray-200 relative overflow-hidden flex items-end justify-end pb-8 pr-12">
                        {/* fake ring binder edge */}
                        <div className="w-[180px] h-[40px] bg-white rounded-l-full transform rotate-[-15deg] shadow-lg border-2 border-gray-200 relative group-hover:-translate-y-2 transition duration-500">
                           <div className="absolute top-2 left-6 w-4 h-4 bg-gray-200 rounded-full shadow-inner border border-gray-300"></div>
                           <div className="absolute -bottom-4 left-8 text-6xl text-gray-400 opacity-20">📖</div>
                        </div>
                     </div>
                     <div className="p-10 flex flex-col flex-1">
                        <div className="text-[#3EC1BF] mb-4 text-2xl">🤝</div>
                        <h3 className="text-[22px] font-black text-[#1D1C1B] mb-4">Support</h3>
                        <p className="text-[15px] font-medium text-gray-500 leading-relaxed mb-10 flex-1">
                           Is there a particular Sketch feature that you're eager to master? Or do you have a question about something simple? Our Help Center has FAQs and documentation to help you learn more.
                        </p>
                        <div className="flex flex-col gap-3 mt-auto">
                           <a href="#" className="text-[14px] font-bold text-[#1D1C1B] flex items-center hover:text-sketch-orange transition">Help Center <span className="ml-2">→</span></a>
                           <a href="#page=13-documentation" className="text-[14px] font-bold text-[#1D1C1B] flex items-center hover:text-sketch-orange transition">Documentation <span className="ml-2">→</span></a>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* FAQ section */}
         <section className="bg-white border-t border-gray-100">
            <div className="max-w-[1100px] mx-auto px-6 py-24 flex flex-col md:flex-row gap-16">
               <div className="w-full md:w-1/3 shrink-0">
                  <h2 className="text-[36px] font-black text-[#1D1C1B] leading-tight sticky top-24">Common <br/> questions</h2>
               </div>
               <div className="w-full md:w-2/3 flex flex-col">
                  {/* Reuse AccordionItem, slightly modified without Top Border on the first */}
                  <AccordionItem title="What's an Education Plan?" defaultOpen={false} />
                  <AccordionItem title="Who qualifies for a free Sketch education plan?" />
                  <AccordionItem title="I sent my request. How long will I wait for an answer?" />
                  <AccordionItem title="How many devices can I use with the Mac app?" />
                  <AccordionItem title="Can I use the free Education Workspace for longer than a year?" />
                  <AccordionItem title="Who doesn't get to use the free Education Workspace?" />
                  <AccordionItem title="I want to switch my paid subscription to a free Education Workspace. Will I get a refund for the time I haven't used?" />
                  <div className="border-t border-gray-200"></div>
               </div>
            </div>
         </section>

         {/* Bottom CTA Gradient Banner */}
         <section className="max-w-[1240px] mx-auto px-6 pb-32">
            <div className="w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#9BB5D5] via-[#E4D5E0] to-[#EFAECB] p-16 md:p-24 shadow-lg text-left relative flex flex-col justify-end min-h-[400px]">
               {/* Huge watermark diamond */}
               <div className="absolute top-[10%] left-[10%] opacity-[0.8] text-[80px]">💎</div>
               {/* Background soft wavy shape via CSS radial */}
               <div className="absolute top-[-50%] right-[-20%] w-[100%] h-[150%] bg-[#A8C7E6]/40 blur-3xl rounded-full mix-blend-overlay"></div>
               
               <div className="relative z-10 max-w-2xl mt-auto">
                  <h2 className="text-[48px] md:text-[60px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-4">Get Sketch for free</h2>
                  <p className="text-[20px] font-medium text-[#1D1C1B]/80 leading-relaxed mb-8">
                     Whether you're a student, educator or institution, we'll have you signed up, verified and making great work in no time.
                  </p>
                  <button className="bg-black text-white px-8 py-3.5 rounded font-bold text-[15px] shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition duration-300 block w-max">
                     Apply for your education status
                  </button>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-3 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed max-w-md">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black shadow-sm bg-gray-50/50" />
                  <button className="bg-[#99A3AB] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80">Try it out</button>
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
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition flex items-center">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-2 px-1.5 py-0.5 rounded border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
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
