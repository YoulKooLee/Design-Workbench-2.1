/**
 * @name Collaborative Design
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
   <header className="absolute top-0 w-full z-50">
      <div className="bg-white/80 backdrop-blur text-center py-2 text-sm font-medium border-b border-gray-100/50">
         Ready to create your best work? Here's how Sketch can help! →
      </div>
      <div className="flex items-center justify-between px-6 py-4">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-sm font-semibold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:text-black/60 transition">Product v</a>
            <a href="#" className="hover:text-black/60 transition">Learn v</a>
            <a href="#page=14-apps" className="hover:text-black/60 transition">Apps</a>
            <a href="#page=12-pricing" className="hover:text-black/60 transition">Pricing</a>
            <a href="#" className="hover:text-black/60 transition">Why Sketch v</a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-sm font-semibold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:text-black/60 transition hidden md:block">Support v</a>
         <a href="#page=12-pricing" className="hover:text-black/60 transition">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2 rounded-full hover:bg-black/80 transition">Get started for free</a>
         </div>
      </div>
   </header>
);

const FeaturePoint = ({ title, text }) => (
   <div className="mb-10 last:mb-0">
      <h3 className="text-xl font-bold text-[#1D1C1B] mb-2">{title}</h3>
      <p className="text-[15px] text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: text }}></p>
   </div>
);


export default function P10CollaborativeDesign() {
   return (
      <div className="min-h-screen bg-white overflow-x-hidden">
         <Nav />

         {/* Hero Section with Diagonal Cut Background */}
         <section className="relative pt-48 pb-60 overflow-visible text-[#1D1C1B]">
            {/* The teal background mask */}
            <div className="absolute inset-0 bg-[#A2EAD9] -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)' }}></div>
            {/* Some background grid texture overlay hidden in opacity */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)' }}></div>

            <div className="max-w-4xl px-6 lg:ml-[10%]">
               <h1 className="text-6xl md:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-8">
                  Collaborative design<br/>that works for everyone.
               </h1>
               <p className="text-[20px] font-medium text-[#1D1C1B]/80 max-w-2xl leading-relaxed mb-12">
                  From designers to developers and anyone else who needs project updates, all the tools you need to collaborate with your team are right here.
               </p>
               <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg shadow-xl">Get started for free</a>
            </div>
         </section>

         {/* 1. Collaborate with Designers */}
         <section className="relative pb-40">
            {/* Decorative Edge Element Left */}
            <div className="absolute left-[-5%] top-[60%] w-[150px] h-[300px] bg-[#A2EAD9] z-0 transform -rotate-12 hidden lg:block" style={{ clipPath: 'polygon(0% 0%, 100% 20%, 70% 50%, 100% 100%, 0% 80%)' }}></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
               <div className="max-w-xl mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 tracking-tight">Collaborate with<br/>Designers</h2>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">There's no "I" in team. Sure, there's one in design, but that doesn't mean you have to do it alone. Every project is different, so our <u className="text-[#1D1C1B] font-bold cursor-pointer">real-time collaborative design tools</u> mean you choose what to share, when to share it and how you work together.</p>
               </div>

               {/* Center Giant Image */}
               <div className="w-full relative flex justify-center mb-16 group">
                  <div className="w-[110%] max-w-[1200px] bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden transform transition duration-1000 group-hover:scale-[1.02] flex z-20 absolute left-1/2 -translate-x-1/2">
                     <img src="https://picsum.photos/1200/700?random=101" className="w-full object-cover object-left-top" alt="Mac UI" />
                  </div>
                  {/* Spacer to push content down because image is absolute to overlap beautifully */}
                  <div className="w-full h-[500px] md:h-[700px]"></div>
               </div>

               {/* Texts positioned bottom right */}
               <div className="w-full relative z-30">
                  <div className="max-w-md ml-auto bg-white/80 backdrop-blur p-8 rounded-3xl lg:-mt-[150px] lg:-mr-10 shadow-2xl border border-white">
                     <FeaturePoint title="Share a Workspace" text="Bring your people, documents, Libraries and more together with a Sketch Workspace and give your team a boost. You'll always have full, instant control over who's a part of your team, and what they can access and what they can edit." />
                     <FeaturePoint title="Share Components" text="Give teammates instant access to Libraries of Components that they can use and reuse across designs. If something changes, like brand colors or typography, simply update your shared Library. You can <u class='text-black font-bold'>highlight the important moments</u> in your version history, so people only get the updates they need." />
                     <FeaturePoint title="Share frameworks" text="Don't redesign the wheel. Take any fixed frame in your Canvas (we call them Artboards) and turn it — and all its content — into a template, ready to reuse. Include your <u class='text-black font-bold'>Artboard Templates</u> as part of a <u class='text-black font-bold'>Library</u> to make them available for other documents." />
                     <FeaturePoint title="Share a document" text="Work with your colleagues in real-time with collaborative design tools. When you collaborate, every change you make syncs in the moment, so anyone who opens the document while you're working will get all the latest updates automatically. Best of all, <u class='text-black font-bold'>it's easy to get started</u>." />
                  </div>
               </div>
            </div>
         </section>

         {/* 2. Collaborate with Decision Makers */}
         <section className="relative py-20 pb-40 border-t border-black/5 bg-[#FAFAF9]/30">
            {/* Decorative right pink triangle */}
            <div className="absolute right-[-10%] top-[40%] w-[400px] h-[400px] bg-[#FFB6D8] z-0 transform rotate-12 hidden lg:block" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            {/* Decorative left gray rock */}
            <div className="absolute left-[-5%] top-[20%] w-[200px] h-[300px] bg-[#E8E8E8] z-0 rounded-full blur-xl hidden lg:block"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
               <div className="max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 tracking-tight">Collaborate with<br/>Decision Makers</h2>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">It takes a lot of great people to make a great product, and not all of those people need to edit designs. So, we built the exact tools they do need, in the browser, so they can check out documents wherever they are, with no learning curve. Sketch's sharing and privacy features mean the right people get the right level of access whenever they need it.</p>
               </div>

               <div className="w-full relative flex justify-center mb-16 group">
                  <div className="w-[100%] max-w-[1100px] bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden transform transition duration-1000 group-hover:-translate-y-4 flex z-20 absolute left-1/2 -translate-x-1/2">
                     <img src="https://picsum.photos/1100/600?random=102" className="w-full object-cover object-left-top" alt="Web UI" />
                  </div>
                  <div className="w-full h-[400px] md:h-[600px]"></div>
               </div>

               {/* Texts positioned bottom left aligned */}
               <div className="w-full relative z-30 flex justify-start text-left">
                  <div className="max-w-md bg-white/90 backdrop-blur p-8 rounded-3xl lg:-mt-[120px] lg:-ml-10 shadow-2xl border border-white">
                     <FeaturePoint title="Invite anybody" text="Invite anyone to view your Workspace, documents or projects on your own terms, or <u class='text-black font-bold'>share your documents with a link</u>. What they see is up to you, and anyone you invite can view for free." />
                     <FeaturePoint title="View designs anywhere" text="There's nothing like the real thing. So view your documents just as you would in the Mac app, in any browser. <u class='text-black font-bold'>See every detail on the Canvas</u>, browse version histories, and leave comments to keep the feedback moving." />
                     <FeaturePoint title="Keep every version safe" text="Forget about sending files back and forth, or worrying about overwriting someone's work. With a robust version history, you can keep track of changes. <u class='text-black font-bold'>Control which versions are visible</u> along the way and make sure that your important updates are noticed." />
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Collaborate with Developers */}
         <section className="relative py-20 pb-40 border-t border-black/5 bg-white">
            {/* Right Crescent shape */}
            <div className="absolute right-[-4%] top-[40%] w-[300px] h-[300px] border-[50px] border-[#1D1C1B] rounded-full z-0 transform hidden lg:block" style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
               <div className="max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6 tracking-tight">Collaborate with<br/>Developers</h2>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">Developers shouldn't need to learn design tools — and with Sketch, they don't have to. Teamwork isn't reserved for collaborative design, Sketch comes with <u className="text-[#1D1C1B] font-bold cursor-pointer">all the features developers need</u> built-in, with a UI made for handoff.</p>
               </div>

               <div className="w-full relative flex justify-center mb-16 group">
                  <div className="w-[105%] max-w-[1100px] bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden transform transition duration-1000 group-hover:scale-[1.01] flex z-20 absolute left-1/2 -translate-x-1/2">
                     <img src="https://picsum.photos/1100/700?random=103" className="w-full object-cover object-left-top" alt="Developer Handoff UI" />
                  </div>
                  <div className="w-full h-[500px] md:h-[700px]"></div>
               </div>

               {/* Texts positioned bottom right */}
               <div className="w-full relative z-30 flex justify-end text-left">
                  <div className="max-w-md bg-white/95 p-8 rounded-3xl lg:-mt-[150px] lg:-mr-4 shadow-2xl border border-white">
                     <FeaturePoint title="Free access" text="You don't need to pay for the Mac app for developers. As standard, designers can invite developers to inspect work in any browser for free — it's that simple. No additional plugins. No hassle." />
                     <FeaturePoint title="Grab and go" text="Any developer can grab the information they need, for any part of a design, at any time. Inspecting designs. Grabbing assets, attributes, and color values. Even grabbing text and CSS for any layer — it's all possible straight from our web app." />
                     <a href="#" className="inline-block mt-4 text-[#1D1C1B] font-bold text-[15px] hover:text-sketch-orange transition">Learn more about Handoff with Sketch →</a>
                  </div>
               </div>
            </div>
         </section>

         {/* What's new grid section */}
         <section className="py-24 bg-[#FAFAFA] border-y border-gray-100 text-center relative overflow-hidden">
             <div className="max-w-[1200px] mx-auto px-6">
                 <h2 className="text-4xl font-black text-[#1D1C1B] mb-4">What's new?</h2>
                 <p className="text-gray-500 text-lg mb-16 max-w-md mx-auto">Here's where you'll find the latest updates for new and exciting prototyping features.</p>

                 <div className="flex flex-col md:flex-row gap-8 justify-center select-none">
                     <div className="bg-white p-12 rounded-[2rem] shadow-sm flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer flex-1 max-w-[400px] border border-gray-100">
                         <div className="w-20 h-20 mb-6 bg-cyan-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-cyan-100">🖼️</div>
                         <p className="font-bold text-sm text-[#1D1C1B]">Artboard Templates →</p>
                     </div>
                     <div className="bg-white p-12 rounded-[2rem] shadow-sm flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer flex-1 max-w-[400px] border border-gray-100">
                         <div className="w-20 h-20 mb-6 bg-orange-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-orange-100">🔒</div>
                         <p className="font-bold text-sm text-[#1D1C1B]">Restricted Projects →</p>
                     </div>
                 </div>
             </div>
         </section>

         {/* CTA + Testimonial Block */}
         <section className="bg-white pt-24 pb-8 border-b border-gray-100 overflow-hidden text-center relative">
            <div className="bg-gradient-to-br from-[#A7D753] to-[#7BC86A] rounded-[3xl] py-24 px-10 max-w-[1000px] mx-auto flex flex-col items-center relative shadow-lg rounded-[3rem] mb-20 text-left">
               <div className="absolute left-[-20%] top-[-20%] w-full h-full bg-white/10 rotate-12 pointer-events-none"></div>
               <div className="relative z-10 w-full max-w-2xl px-6">
                  <div className="text-black text-opacity-20 text-5xl mb-6">💎</div>
                  <h2 className="text-4xl md:text-[54px] font-black mb-6 leading-[1.1] text-[#1D1C1B] tracking-tight">Start your<br/>Sketch journey</h2>
                  <p className="text-[18px] font-medium text-[#1D1C1B]/80 mb-10 leading-relaxed max-w-md">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
                  <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl text-lg">Get started for free</a>
               </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mb-16">
               <div className="flex justify-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md relative z-10 opacity-70 transform rotate-12 translate-x-2"><img src="https://i.pravatar.cc/100?u=a" alt="User"/></div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400 shadow-lg relative z-20 scale-110"><img src="https://i.pravatar.cc/100?u=b" alt="User"/></div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md relative z-10 opacity-70 transform -rotate-12 -translate-x-2"><img src="https://i.pravatar.cc/100?u=c" alt="User"/></div>
               </div>
               <p className="text-2xl md:text-[28px] font-bold leading-[1.6] mb-10 text-[#1D1C1B]">
                  "We use Sketch across multiple products, with multiple UI/UX designers and also graphic designers. Everything from landing pages to full-blown websites. We love how easy it is to scale graphics."
               </p>
               <div className="text-[15px] font-bold text-[#1D1C1B] mb-1">Roberta Galea</div>
               <div className="text-[13px] text-gray-500">Head of Design, <u className="cursor-pointer">Catena Media</u></div>
            </div>
         </section>

         {/* Footer */}
         <footer className="pt-16 pb-8 bg-white">
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
