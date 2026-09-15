/**
 * @name About Sketch
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
   <header className="bg-transparent w-full z-50 absolute top-0 left-0">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1400px] mx-auto">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-[15px] font-bold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product v</a>
            <a href="#" className="hover:text-sketch-orange transition">Learn v</a>
            <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
            <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
            <a href="#" className="hover:text-sketch-orange transition">Why Sketch v</a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-[15px] font-bold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block">Support v</a>
         <a href="#page=12-pricing" className="hover:text-sketch-orange transition text-sketch-orange">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#FD6B22] text-white px-5 py-2.5 rounded hover:bg-[#E55A16] transition shadow-sm">Get started for free</a>
         </div>
      </div>
   </header>
);

const TimelineNode = ({ top, children, dotBottom }: any) => (
   <div className={`relative flex flex-col items-center flex-1 ${top ? 'justify-end pb-8' : 'justify-start pt-8'}`}>
      <div className="absolute w-[8px] h-[8px] rounded-full bg-[#FD6B22] z-10" style={{ top: top ? 'auto' : '-4px', bottom: top ? '-4px' : 'auto' }}></div>
      <div className="w-[1px] h-6 bg-gray-200 opacity-50 absolute" style={{ top: top ? 'auto' : '0', bottom: top ? '0' : 'auto' }}></div>
      <div className={`transform ${top ? 'translate-y-[-10px]' : 'translate-y-[10px]'}`}>
         {children}
      </div>
   </div>
);


export default function P19About() {
   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         {/* Immersive Hero Section */}
         <section className="relative w-full pt-40 pb-32 overflow-hidden bg-[#FFF8EE]">
            {/* Background Geometric Abstract */}
            <div className="absolute inset-0 pointer-events-none z-0">
               {/* Left giant orange slice */}
               <svg className="absolute top-0 left-[-10%] w-[80%] h-[120%] transform rotate-[-5deg]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  <polygon points="0,0 800,0 300,900 0,600" fill="url(#left-grad)"/>
                  <defs>
                     <linearGradient id="left-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FD6B22"/>
                        <stop offset="100%" stopColor="#FA9540" stopOpacity="0.8"/>
                     </linearGradient>
                  </defs>
               </svg>
               {/* Right giant yellow slice */}
               <svg className="absolute top-[-10%] right-[-10%] w-[60%] h-[110%] transform rotate-[10deg] opacity-80" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  <polygon points="300,0 1000,0 1000,800 0,600" fill="url(#right-grad)"/>
                  <defs>
                     <linearGradient id="right-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFC837"/>
                        <stop offset="100%" stopColor="#FFE082" stopOpacity="0.4"/>
                     </linearGradient>
                  </defs>
               </svg>
            </div>

            <div className="max-w-[760px] mx-auto px-6 relative z-10">
               <h1 className="text-[52px] md:text-[68px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-8">
                  About Sketch
               </h1>
               <div className="text-[20px] md:text-[23px] font-medium text-[#1D1C1B] leading-relaxed max-w-[90%] mb-12">
                  Over a million people — from freelancers to the world's most successful product teams — use Sketch to create their best work. 
               </div>
               
               <div className="text-[17px] text-[#1D1C1B]/80 font-medium leading-relaxed space-y-6 max-w-[95%]">
                  <p>Our co-founders, Pieter Omvlee and Emanuel Sá, started Sketch back in 2010 because they believed that designers deserved a better set of tools. We started with a true native Mac app, built specifically for UI design — and we've never looked back.</p>
                  <p>Today, we're building a fully-featured design platform that combines our award-winning Mac app with powerful, browser-based collaboration tools. And although a lot has changed in the last ten years, we're still staying true to our values.</p>
               </div>
            </div>

            {/* Timeline */}
            <div className="max-w-[1240px] mx-auto px-6 mt-32 relative z-10 w-full">
               <div className="relative w-[90%] mx-auto h-[160px] flex">
                  {/* Central line */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200"></div>

                  {/* Nodes */}
                  <TimelineNode top={true}>
                     <div className="bg-[#FFAE2B] text-white font-bold text-[13px] px-6 py-2 rounded-sm shadow-md">Launched in 2010</div>
                  </TimelineNode>
                  
                  <TimelineNode top={false}>
                     <div className="flex items-center gap-2">
                        <div className="text-xl"></div>
                        <div className="text-left leading-tight">
                           <div className="font-bold text-[#1D1C1B] text-[14px]">Apple Design Award</div>
                           <div className="text-[#1D1C1B]/60 text-[10px] font-bold uppercase tracking-wider">Mac Developer Showcase<br/>2012 Winner</div>
                        </div>
                     </div>
                  </TimelineNode>

                  <TimelineNode top={true}>
                     <div className="text-center">
                        <div className="font-black text-[28px] text-[#FD6B22] leading-none tracking-tighter shadow-sm" style={{textShadow: "1px 1px 0px rgba(0,0,0,0.1)"}}>1 MILLION</div>
                        <div className="text-[#1D1C1B]/60 text-[10px] font-bold uppercase tracking-wider mt-1">customers</div>
                     </div>
                  </TimelineNode>

                  <TimelineNode top={false}>
                     <div className="text-center">
                        <div className="border border-black px-2 py-0.5 text-[14px] tracking-widest font-serif font-bold text-black bg-white inline-block">BENCHMARK</div>
                        <div className="text-[#1D1C1B]/80 text-[10px] font-bold uppercase tracking-wider mt-1 scale-90">$20 million Series A funding</div>
                     </div>
                  </TimelineNode>
               </div>
            </div>

         </section>

         {/* Beliefs Grid */}
         <section className="bg-white">
            <div className="max-w-[900px] mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
               <div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-4 tracking-tight">We believe in being open</h3>
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                     We've opened up our file format, so developers can build incredible plugins and integrations with their own apps, and anyone can move their work anywhere, with no platform lock-in.
                  </p>
               </div>
               <div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-4 tracking-tight">We believe in offering choice</h3>
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                     With Sketch, you can choose when to work locally and privately, and when to share your designs and collaborate with others. Working in private is your choice — and always will be.
                  </p>
               </div>
               <div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-4 tracking-tight">We believe in the power of community</h3>
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                     From sponsoring design meetups around the world, to empowering developers that create incredible integrations, we work hard to look after our community — and they look after us!
                  </p>
               </div>
               <div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-4 tracking-tight">We believe in the best of both worlds</h3>
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                     Native apps and browser-based tools can coexist! We think that native apps are the best place to create, while the browser is the best place to share work, get feedback and hand off designs.
                  </p>
               </div>
               <div>
                  <h3 className="text-[20px] font-black text-[#1D1C1B] mb-4 tracking-tight">We believe in building sustainably</h3>
                  <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                     With a simple business model of selling our product at a fair price, we've been profitable since day one. We're here to support you and your work — and we're in it for the long term.
                  </p>
               </div>
            </div>
         </section>

         {/* Trusted By / Logos */}
         <section className="bg-white border-t border-gray-100 flex flex-col items-center py-20 pb-24">
            <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted by some of the world's best product teams</h4>
            
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
               {/* Faked logo row text/icons */}
               <span className="font-bold text-xl flex items-center bg-black text-white w-6 h-6 justify-center">f</span>
               <span className="font-serif italic text-2xl font-bold tracking-tight">Google</span>
               <span className="font-bold border-l-4 border-r-4 border-black px-1 text-xl">MiT</span>
               <span className="font-black text-2xl tracking-tighter">stripe</span>
               <span className="font-bold text-xl flex items-center gap-1"><span className="w-5 h-5 bg-black rounded-full text-white flex items-center justify-center text-xs">x</span> XBOX</span>
               <span className="font-handwriting text-2xl">pok pok</span>
               <span className="font-black text-xl flex items-center gap-1">✢TaxSlayer®</span>
               <span className="font-serif text-xl tracking-tight leading-none text-center">HCSC<br/><span className="text-[6px] tracking-normal">Health Care Service Corporation</span></span>
            </div>
         </section>

         {/* Who we are Section */}
         <section className="max-w-[1240px] mx-auto px-6 py-32 flex flex-col lg:flex-row gap-24 items-center border-t border-gray-100">
            {/* Left Graphics (Testimonial UI - Co-founders) */}
            <div className="w-full lg:w-[45%] relative h-[500px]">
               {/* Concentric wireframe circles */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-gray-100 flex items-center justify-center">
                  <div className="w-[350px] h-[350px] rounded-full border border-gray-100 flex items-center justify-center">
                     <div className="w-[250px] h-[250px] rounded-full border border-gray-100"></div>
                  </div>
               </div>

               {/* Solid Orange Circle */}
               <div className="absolute top-[8%] right-[10%] w-[150px] h-[150px] bg-[#FD6B22] rounded-full shadow-lg"></div>

               {/* Profile Image (Double wide) */}
               <div className="absolute top-[18%] left-[10%] w-[380px] h-[320px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white transform -rotate-1 hover:rotate-0 transition duration-500 z-10 bg-gray-200">
                  <img src="https://picsum.photos/600/500?random=190" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" />
               </div>

               {/* Floating Tag Card */}
               <div className="absolute bottom-[8%] left-[20%] bg-white/95 backdrop-blur-md rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] px-6 py-4 z-20 w-max border border-gray-50">
                  <div className="text-[15px] font-black text-[#1D1C1B]">Emanuel Sá & Pieter Omvlee</div>
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1">THE CO-FOUNDERS OF SKETCH</div>
               </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-[55%]">
               <h2 className="text-[44px] font-black text-[#1D1C1B] leading-tight tracking-tight mb-6">Who we are</h2>
               <p className="text-[20px] font-medium text-gray-600 leading-relaxed mb-12 max-w-lg">
                  We're a company of diverse thinkers and doers who take pride in always improving our product. We share a vision and commitment to help each other — and our customers — create great work.
               </p>
               
               {/* Stats */}
               <div className="flex gap-12 sm:gap-16 mb-12">
                  <div>
                     <div className="text-[56px] sm:text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">220</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">PEOPLE</div>
                  </div>
                  <div>
                     <div className="text-[56px] sm:text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">43</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">COUNTRIES</div>
                  </div>
                  <div>
                     <div className="text-[56px] sm:text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">0</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">OFFICES</div>
                  </div>
               </div>

               {/* Bio texts */}
               <div className="space-y-6 text-[15px] text-gray-600 font-medium leading-relaxed max-w-2xl">
                  <p>As a company, we've been fully remote since day one. It's meant we can bring together the best people from around the world to work in a way that makes sense to everyone. Today, there are over 100 of us, from 25 different countries (and zero offices).</p>
                  <p>Although we've grown a lot in the last ten years, our co-founders — Emanuel and Pieter — are still here and hands-on when it comes to product development. It's helped us stay true to our values of collaboration, respect for each other, and eating our own dogfood.</p>
                  <p>We're always on the look out for creative people to join our talented team. <a href="#page=17-careers" className="font-bold text-sketch-orange hover:text-[#E55A16] transition underline underline-offset-2 decoration-orange-200">Head over to our careers page</a> for further information and to see our latest openings.</p>
               </div>
            </div>
         </section>


         {/* Press Information Section */}
         <section className="bg-[#FAFAFA] border-t border-gray-100">
            <div className="max-w-[1240px] mx-auto px-6 py-32">
               
               {/* Section Header */}
               <div className="mb-16">
                  <h2 className="text-[44px] font-black text-[#1D1C1B] tracking-tight mb-6">Press Information</h2>
                  <p className="text-[19px] font-medium text-gray-600 leading-relaxed max-w-xl">
                     Want to know more about Sketch? We'd love to hear from you. Please get in touch with us at <a href="mailto:press@sketch.com" className="font-bold text-sketch-orange hover:text-[#E55A16] transition">press@sketch.com</a>.
                  </p>
               </div>

               {/* Asset Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Card 1 */}
                  <div className="bg-white rounded-[20px] shadow-sm hover:shadow-xl transition duration-500 overflow-hidden flex flex-col group border border-gray-100">
                     <div className="h-[260px] bg-gradient-to-br from-[#FFC245] to-[#FF844B] flex items-center justify-center p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-[-10%] w-[50%] h-full bg-white opacity-20 transform skew-12 mix-blend-overlay"></div>
                        <Logo /> {/* Replace with huge diamond logo later, but reusing logo component with massive scale */}
                        <div className="transform scale-[4]"><Logo /></div>
                     </div>
                     <div className="p-8 flex flex-col flex-1 bg-white">
                        <h4 className="text-[18px] font-bold text-[#1D1C1B] mb-1">Logo and Guidelines</h4>
                        <div className="text-[13px] text-gray-400 font-bold mb-8 uppercase tracking-wider">ZIP, 824 KB</div>
                        <button className="w-full border border-gray-200 text-[#1D1C1B] px-6 py-2.5 rounded text-[14px] font-bold group-hover:border-black transition mt-auto">
                           Download
                        </button>
                     </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-[20px] shadow-sm hover:shadow-xl transition duration-500 overflow-hidden flex flex-col group border border-gray-100">
                     <div className="h-[260px] bg-[#97D968] flex items-center justify-center p-8 relative overflow-hidden">
                         {/* Faked icon layout */}
                         <div className="w-[120px] h-[120px] bg-white rounded-[28px] shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition duration-500">
                             <div className="text-[#FDAD00] text-6xl shadow-inner drop-shadow-md">💎</div>
                         </div>
                     </div>
                     <div className="p-8 flex flex-col flex-1 bg-white">
                        <h4 className="text-[18px] font-bold text-[#1D1C1B] mb-1">Icons</h4>
                        <div className="text-[13px] text-gray-400 font-bold mb-8 uppercase tracking-wider">ZIP, 531 KB</div>
                        <button className="w-full border border-gray-200 text-[#1D1C1B] px-6 py-2.5 rounded text-[14px] font-bold group-hover:border-black transition mt-auto">
                           Download
                        </button>
                     </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-[20px] shadow-sm hover:shadow-xl transition duration-500 overflow-hidden flex flex-col group border border-gray-100">
                     <div className="h-[260px] bg-gradient-to-b from-[#FFF5DC] to-[#FFDBCB] flex items-end justify-center pt-8 px-6 relative overflow-hidden">
                        {/* Faked UI Screenshot overlapping */}
                        <div className="w-[90%] h-[90%] bg-white rounded-t-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col transform group-hover:translate-y-[-10px] transition duration-500">
                           <div className="h-6 bg-gray-100 flex items-center px-3 border-b border-gray-200">
                              <div className="flex gap-1.5"><div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div><div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div><div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div></div>
                           </div>
                           <div className="flex-1 bg-gray-50 flex">
                              <div className="w-[25%] border-r border-gray-200 h-full p-2 space-y-2">
                                 <div className="h-2 w-full bg-gray-200 rounded"></div>
                                 <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                              </div>
                              <div className="flex-1 p-4 bg-white flex flex-col">
                                 <div className="h-3 w-1/2 bg-gray-300 rounded mb-4"></div>
                                 <div className="h-20 w-full bg-[#FF844B] rounded shadow-inner mb-2"></div>
                                 <div className="h-20 w-full bg-[#4BC8C5] rounded shadow-inner"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="p-8 flex flex-col flex-1 bg-white">
                        <h4 className="text-[18px] font-bold text-[#1D1C1B] mb-1">Screenshots</h4>
                        <div className="text-[13px] text-gray-400 font-bold mb-8 uppercase tracking-wider">ZIP, 10.4 MB</div>
                        <button className="w-full border border-gray-200 text-[#1D1C1B] px-6 py-2.5 rounded text-[14px] font-bold group-hover:border-black transition mt-auto">
                           Download
                        </button>
                     </div>
                  </div>

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
                  <button className="bg-[#E7BA9A] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80 transition">Try it out</button>
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
