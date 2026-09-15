/**
 * @name Careers at Sketch
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


const BenefitCard = ({ icon, title, desc }) => (
   <div className="flex flex-col text-left">
      <div className="text-4xl mb-6 relative">
         <div className="w-12 h-12 bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 transition duration-500 cursor-default">
            {icon}
         </div>
      </div>
      <h4 className="text-[17px] font-bold text-[#1D1C1B] mb-2">{title}</h4>
      <p className="text-[14px] text-gray-500 font-medium leading-relaxed pr-6">{desc}</p>
   </div>
);


export default function P17Careers() {
   return (
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         {/* Hero Section */}
         <section className="relative w-full pt-40 pb-32 overflow-hidden bg-[#FFF8EE]">
            {/* Background Geometric Abstract */}
            <div className="absolute inset-0 pointer-events-none -z-10">
               {/* Left massive orange polygons */}
               <svg className="absolute top-0 left-0 w-full h-[150%] transform -translate-x-[20%]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  <polygon points="0,0 600,0 200,800 0,600" fill="url(#left-grad-1)"/>
                  <polygon points="0,200 400,600 0,1000" fill="url(#left-grad-2)"/>
                  <defs>
                     <linearGradient id="left-grad-1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FD6B22"/>
                        <stop offset="100%" stopColor="#F98F34"/>
                     </linearGradient>
                     <linearGradient id="left-grad-2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#EB5424"/>
                        <stop offset="100%" stopColor="#FF9B51" stopOpacity="0.8"/>
                     </linearGradient>
                  </defs>
               </svg>
               {/* Right massive yellow polygons */}
               <svg className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] transform rotate-[15deg] opacity-90" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  <polygon points="400,0 1000,0 1000,600 200,400" fill="url(#right-grad-1)"/>
                  <defs>
                     <linearGradient id="right-grad-1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFC837"/>
                        <stop offset="100%" stopColor="#FFDF70" stopOpacity="0.4"/>
                     </linearGradient>
                  </defs>
               </svg>
            </div>

            <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
               <h1 className="text-[52px] md:text-[68px] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-8 drop-shadow-sm">
                  Careers at Sketch
               </h1>
               <h3 className="text-[24px] md:text-[28px] font-bold text-[#1D1C1B] mb-6 leading-snug drop-shadow-sm">
                  Help over one million people create their best work.
               </h3>
               <p className="text-[19px] text-[#1D1C1B]/80 font-medium leading-[1.7] mb-12 drop-shadow-sm">
                  Over the last ten years, Sketch has had a lasting impact on the design industry — but our work has only just begun! We have some ambitious plans to help people create their best work and design better products — and we need change-makers, open minds and fresh ideas to make them a reality.
               </p>
               <button className="bg-[#FD6B22] text-white px-8 py-3.5 rounded-lg text-[15px] font-bold shadow-lg hover:bg-[#E55A16] hover:shadow-xl hover:-translate-y-0.5 transition duration-300">
                  See current openings
               </button>
            </div>
         </section>

         {/* Sticky Anchor Nav */}
         <div className="bg-white border-b border-gray-100 sticky top-0 z-40 hidden md:block">
            <div className="flex justify-center items-center gap-12 py-5 text-[14px] font-bold text-gray-400">
               <a href="#who" className="hover:text-black transition flex items-center gap-2 text-black"><span className="text-[#FD6B22]">💎</span> Who we are</a>
               <a href="#benefits" className="hover:text-black transition flex items-center gap-2"><span className="text-gray-300">📑</span> Benefits</a>
               <a href="#openings" className="hover:text-black transition flex items-center gap-2"><span className="text-yellow-500">👱</span> Job openings</a>
               <a href="#process" className="hover:text-black transition flex items-center gap-2"><span className="text-orange-400">⏸</span> Our Process</a>
            </div>
         </div>

         {/* Section: Who We Are */}
         <section id="who" className="max-w-[1240px] mx-auto px-6 py-32 flex flex-col lg:flex-row gap-24 items-center">
            
            {/* Left Graphics (Testimonial UI) */}
            <div className="w-full lg:w-[45%] relative h-[500px]">
               {/* Concentric wireframe circles */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-100 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] rounded-full border border-gray-100 flex items-center justify-center">
                     <div className="w-[200px] h-[200px] rounded-full border border-gray-100"></div>
                  </div>
               </div>

               {/* Solid Orange Circle */}
               <div className="absolute top-[10%] right-[15%] w-32 h-32 bg-[#FD6B22] rounded-full shadow-lg"></div>

               {/* Profile Image */}
               <div className="absolute top-[20%] left-[20%] w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-500 z-10">
                  <img src="https://picsum.photos/400/400?random=171" className="w-full h-full object-cover" />
               </div>

               {/* Floating Quote Card */}
               <div className="absolute bottom-[5%] left-[25%] bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] p-6 z-20 w-[300px]">
                  <p className="text-[13px] text-gray-500 italic font-medium leading-relaxed mb-4">
                     Work at Sketch is some of the most challenging and rewarding I've done. I'm constantly inspired by the talented people I get to work with.
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 text-[18px]">
                        🇬🇧
                     </div>
                     <div>
                        <div className="text-[14px] font-black text-[#1D1C1B]">Freddie Harrison</div>
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mt-0.5">HEAD OF COPY AND CONTENT</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-[55%]">
               
               {/* Stats */}
               <div className="flex gap-16 mb-16 border-b border-gray-100 pb-12">
                  <div>
                     <div className="text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">220</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">PEOPLE</div>
                  </div>
                  <div>
                     <div className="text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">43</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">COUNTRIES</div>
                  </div>
                  <div>
                     <div className="text-[64px] font-black tracking-tighter text-[#1D1C1B] leading-none mb-2">0</div>
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">OFFICES</div>
                  </div>
               </div>

               {/* Descriptions */}
               <p className="text-[18px] font-medium text-gray-600 leading-relaxed mb-12">
                  We've been a fully distributed company since day one and we cannot imagine it any other way. Today, there are over 100 of us, working together across more than 25 countries. We've never really had an office and we don't plan to open one. And that decision has shaped our values.
               </p>

               <div className="space-y-10">
                  <div>
                     <h3 className="text-[24px] font-black text-[#1D1C1B] mb-4 tracking-tight">Freedom and trust</h3>
                     <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                        Being remote-first (and remote-only) means we place a lot of value on freedom and trust. Everyone here can make decisions and get things done in a way that makes sense to them.
                     </p>
                  </div>
                  <div>
                     <h3 className="text-[24px] font-black text-[#1D1C1B] mb-4 tracking-tight">Embracing change</h3>
                     <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                        Our industry is always evolving, and it's up to us to make an impact where it counts. So we work hard to stay flexible, adapt and always be ready for change.
                     </p>
                  </div>
                  <div>
                     <h3 className="text-[24px] font-black text-[#1D1C1B] mb-4 tracking-tight">Owning our work</h3>
                     <p className="text-[16px] text-gray-600 font-medium leading-relaxed">
                        We believe in taking ownership and responsibility for what we do, working proactively, figuring things out, and asking for forgiveness rather than permission.
                     </p>
                  </div>
               </div>

            </div>

         </section>

         {/* Section: Benefits */}
         <section id="benefits" className="max-w-[1240px] mx-auto px-6 py-24 border-t border-gray-100">
            <h2 className="text-[44px] font-black text-[#1D1C1B] tracking-tight mb-8">Benefits</h2>
            <p className="text-[19px] font-medium text-gray-600 leading-relaxed max-w-3xl mb-20">
               From flexible hours and company equity, to laptops and unlimited leave — working here comes with some great benefits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
               <BenefitCard icon="🕘" title="Flexibility" desc="With no set hours, you can work to a schedule that makes sense for you." />
               <BenefitCard icon="🌍" title="Work anywhere" desc="No need to relocate or commute to an office, because we don't have one." />
               <BenefitCard icon="📈" title="Company equity" desc="The chance to benefit from our future success." />
               <BenefitCard icon="⛱️" title="Unlimited vacation" desc="Plus extra time for honeymoons, moving and starting a family." />
               <BenefitCard icon="💻" title="Hardware and software" desc="A powerful laptop and any software you need for your job." />
               <BenefitCard icon="🪑" title="Home office budget" desc="For whatever you need — from comfy chairs to standing desks." />
               <BenefitCard icon="🎓" title="Professional development" desc="A generous learning budget to help you develop." />
               <BenefitCard icon="📍" title="Annual meetup" desc="Work and play together, in-person, every year." />
            </div>
         </section>


         {/* Section: Job openings */}
         <section id="openings" className="bg-[#FAFAFA] border-t border-gray-200">
            <div className="max-w-[1240px] mx-auto px-6 py-32">
               <h2 className="text-[44px] font-black text-[#1D1C1B] tracking-tight mb-12">Job openings</h2>
               
               <div className="mb-12">
                  <h3 className="text-[28px] font-black text-[#1D1C1B] border-b border-gray-200 pb-4 mb-8">Any team</h3>
                  
                  {/* Job Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition duration-300 cursor-pointer w-full md:w-[400px]">
                     <h4 className="text-[20px] font-bold text-[#1D1C1B] mb-4">Open application</h4>
                     <div className="text-[13px] text-gray-500 font-medium space-y-1">
                        <div>Time zone: <strong className="text-black">Europe/United States</strong></div>
                        <div>Commitment: <strong className="text-black">Full-time remote</strong></div>
                     </div>
                  </div>
               </div>
               
            </div>
         </section>

         {/* Section: Our process */}
         <section id="process" className="bg-white border-t border-gray-100">
            <div className="max-w-[1240px] mx-auto px-6 py-32">
               <h2 className="text-[44px] font-black text-[#1D1C1B] tracking-tight mb-6">Our process</h2>
               <p className="text-[19px] font-medium text-gray-600 leading-relaxed max-w-3xl mb-12">
                  We value your time and the effort you put in to applying for a role with us, so we'll do our best to make your application and interview process as enjoyable as possible. We aim for no more than four interviews in total, and we'll keep you informed about what to expect at every stage.
               </p>

               <h4 className="text-[18px] font-bold text-[#1D1C1B] mb-8">Here's what happens after you apply:</h4>

               {/* Process columns */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-[15px] font-medium text-gray-600 leading-relaxed">
                  <div className="flex gap-4">
                     <span className="text-black text-xs mt-1.5 opacity-50">●</span>
                     <p>If we're interested in your application, we'll kick things off with a call to get to know you better, understand your current situation, your motivations and your goals.</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-black text-xs mt-1.5 opacity-50">●</span>
                     <p>Your final interview stages will include a written Slack chat. It's how we communicate every day at Sketch, and we want to make sure you feel comfortable with it. If it's your first time interviewing over Slack, don't worry. Just hit return often, ignore your typos and remember to have fun!</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-black text-xs mt-1.5 opacity-50">●</span>
                     <p>Often, we'll ask you to complete a practical exercise to give us an idea of how you work, communicate, and solve problems. This could be a coding challenge, a short quick task or a presentation you'll give in your next interview. It's also your chance to see how we work, get to know our product and understand our challenges.</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-black text-xs mt-1.5 opacity-50">●</span>
                     <p>Whether you're successful or not with us, we'll always give you feedback. It's our way of saying thanks for the time and effort you put in to applying.</p>
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
                  <button className="bg-[#E7BA9A] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:opacity-80">Try it out</button>
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
