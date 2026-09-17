/**
 * @name Pricing
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
      <div className="bg-white/70 text-center py-2 text-sm font-medium border-b border-black/5">
         Ready to create your best work? Here's how Sketch can help! →
      </div>
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
         <div className="flex items-center space-x-8">
         <Logo />
         <nav className="hidden md:flex space-x-6 text-sm font-semibold text-[#1D1C1B]">
            <a href="#page=03-best-platform" className="hover:opacity-70 transition">Product v</a>
            <a href="#" className="hover:opacity-70 transition">Learn v</a>
            <a href="#page=14-apps" className="hover:opacity-70 transition">Apps</a>
            <a href="#page=12-pricing" className="hover:opacity-70 transition">Pricing</a>
            <a href="#" className="hover:opacity-70 transition">Why Sketch v</a>
         </nav>
         </div>
         <div className="flex items-center space-x-6 text-sm font-semibold text-[#1D1C1B]">
         <a href="#page=22-support" className="hover:opacity-70 transition hidden md:block">Support v</a>
         <a href="#page=12-pricing" className="hover:opacity-70 transition">Sign In</a>
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2 rounded-full hover:bg-black/80 transition">Get started for free</a>
         </div>
      </div>
   </header>
);

const FeatureCheckItem = ({ title, text, small = false }) => (
   <div className={`mb-${small ? '4' : '8'}`}>
      <h4 className="flex items-start gap-3 font-bold text-[#1D1C1B] leading-snug mb-2 text-lg">
         <span className="text-xl shrink-0 mt-0.5">✓</span>
         <span>
            {title}
            {text && <div className="text-[15px] text-gray-500 font-medium leading-relaxed mt-2 max-w-lg">{text}</div>}
         </span>
      </h4>
   </div>
);

const PricingFeature = ({ icon, title, desc }) => (
   <div className="flex items-start gap-4 mb-6">
      <div className="text-xl shrink-0 leading-none">{icon}</div>
      <div>
         <h5 className="font-bold text-[15px] text-[#1D1C1B] leading-tight mb-1 content-center">{title}</h5>
         <p className="text-[13px] text-gray-500 leading-snug font-medium pr-4">{desc}</p>
      </div>
   </div>
);

const FAQItem = ({ question }) => (
   <div className="border-b border-gray-200 py-6 flex justify-between items-center group cursor-pointer hover:opacity-70 transition">
      <h5 className="font-bold text-[#1D1C1B] text-[17px]">{question}</h5>
      <span className="text-2xl font-light text-[#1D1C1B] transform group-hover:-rotate-90 transition duration-300">+</span>
   </div>
);


export default function P12Pricing() {
   return (
      <div className="min-h-screen bg-white pt-[112px] isolate">
         {/* Super bright lime green backdrop */}
         <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#CCE55E] via-[#DFF576] to-white -z-10 pointer-events-none"></div>

         <Nav />

         {/* Hero Title */}
         <section className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16 pb-16">
            <h1 className="text-5xl md:text-[5.5rem] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-6">
               Solo, agency or team?<br/>We've got you.
            </h1>
            <p className="text-[20px] md:text-[22px] font-medium text-[#1D1C1B]/80 max-w-2xl mx-auto leading-relaxed">
               Your first 30 days are free — no credit card required.
            </p>
         </section>

         {/* Pricing Cards Area */}
         <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch lg:px-12">
               
               {/* Card 1: Standard */}
               <div className="flex-1 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden relative group transform transition duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="p-10 flex-col flex h-full">
                     <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-[#1D1C1B] mb-2 tracking-tight">Standard</h3>
                        <p className="text-gray-500 text-[15px] font-medium">For individuals and teams</p>
                     </div>
                     {/* Dashed Price Box */}
                     <div className="border border-dashed border-gray-400 p-8 rounded relative mb-8 flex justify-center items-center gap-4 group-hover:bg-gray-50 transition">
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gray-400"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gray-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gray-400"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gray-400"></div>
                        
                        <div className="font-black text-6xl text-[#1D1C1B] tracking-tighter"><span className="text-3xl relative -top-3 left-0 mr-1">$</span>9</div>
                        <div className="text-left text-[#1D1C1B] font-bold text-[13px] leading-tight">per Editor, monthly<br/><span className="text-gray-400 font-medium">with unlimited free viewers</span></div>
                     </div>

                     <div className="text-center text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Or $99 per Editor, yearly</div>

                     <div className="flex-1">
                        <PricingFeature icon="☁️" title="A home for your work" desc="Easily access all of your documents and projects, with version histories, shared libraries, and unlimited Viewers and Guests." />
                        <PricingFeature icon="💎" title="A native Mac editor" desc="Real-time collaboration, components, prototyping, advanced layout, customizable, works offline." />
                        <PricingFeature icon="🌐" title="A web app for everyone" desc="View projects and documents, inspect designs, download assets, comment and discuss." />
                        <PricingFeature icon="📱" title="Preview on iPhone" desc="View your documents, play prototypes, and mirror designs as you edit them on your Mac." />
                     </div>

                     <div className="mt-8 pt-8 flex flex-col items-center border-t border-gray-50">
                        <button className="bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-black transition text-[17px] w-full mb-4">Get started for free</button>
                        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed">No credit card required, cancel any time.<br/>Creating and editing documents in Sketch <u className="cursor-pointer">requires macOS</u>.</p>
                     </div>
                  </div>
               </div>

               {/* Card 2: Business */}
               <div className="flex-1 bg-gradient-to-b from-[#F2F7E5] to-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden relative group transform transition duration-500 hover:-translate-y-2 border border-[#E1EFCE]">
                  {/* subtle top bar highlight */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#CCE55E]"></div>
                  
                  <div className="p-10 flex-col flex h-full">
                     <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-[#1D1C1B] mb-2 tracking-tight">Business</h3>
                        <p className="text-gray-500 text-[15px] font-medium">For organizations with advanced needs</p>
                     </div>
                     {/* Dashed Price Box */}
                     <div className="border border-dashed border-[#C3D9A4] bg-white p-8 rounded relative mb-8 flex justify-center items-center gap-4 shadow-sm group-hover:shadow-md transition">
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#C3D9A4]"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C3D9A4]"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C3D9A4]"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#C3D9A4]"></div>
                        
                        <div className="font-black text-6xl text-[#1D1C1B] tracking-tighter"><span className="text-3xl relative -top-3 left-0 mr-1">$</span>20</div>
                        <div className="text-left text-[#1D1C1B] font-bold text-[13px] leading-tight">per Editor, monthly<br/><span className="text-gray-400 font-medium">paid by annual subscription</span></div>
                     </div>

                     <div className="text-center text-[#1D1C1B] font-bold text-[13px] mb-8 pb-8 border-b border-black/5">Everything in Standard, plus...</div>

                     <div className="flex-1 flex flex-col gap-5 px-4 mb-8">
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Single Sign-On (SSO)</div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Unlimited Cloud Storage</div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Invoice-based billing</div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Technical support via Live Chat <span className="text-orange-400">*</span></div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Priority support <span className="text-orange-400">*</span></div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-center"><span className="text-lg leading-none">✓</span> Dedicated Customer Success Manager <span className="text-orange-400">*</span></div>
                        <div className="flex font-bold text-[15px] text-[#1D1C1B] gap-3 items-start"><span className="text-lg leading-none">✓</span> <span>Security reviews and terms may be customized <span className="text-orange-400">*</span></span></div>
                     </div>

                     <div className="mt-8 pt-8 flex flex-col items-center">
                        <button className="bg-white border border-gray-200 text-[#1D1C1B] px-8 py-4 rounded-full font-bold shadow-sm hover:border-gray-400 transition text-[17px] w-full mb-4 max-w-[200px]">Get in touch</button>
                        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed">Only available with yearly billing<br/>* Requires 25 Editors</p>
                     </div>
                  </div>
               </div>

            </div>

            <p className="text-center text-[11px] font-bold text-gray-400 mt-12 tracking-wide">Prices in USD. Taxes may apply.</p>
         </section>

         {/* Down arrows indicator */}
         <div className="flex justify-center items-center gap-4 text-gray-300 mb-20 text-[20px]">
            <span>↓</span>
            <span className="font-bold text-lg text-[#1D1C1B] tracking-tight">A Sketch subscription includes everything below</span>
            <span>↓</span>
         </div>


         {/* Section: Workspace */}
         <section className="relative py-20 border-t border-gray-100 overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
             {/* Left Giant Orange Geometry Bleed */}
             <div className="absolute left-[-5%] top-[10%] bottom-[10%] w-[350px] bg-gradient-to-br from-[#FECA38] to-[#FC9E23] z-0 transform -rotate-12 rounded-lg opacity-40 hidden lg:block"></div>
             
             <div className="w-full md:w-[40%] pl-6 md:pl-20 relative z-10 lg:pr-10">
                <div className="max-w-xs mb-10 pt-10">
                   <h2 className="text-[44px] font-black text-[#1D1C1B] mb-2 leading-none">Workspace</h2>
                   <p className="text-[20px] font-medium text-gray-600 mb-8 mt-4">A home for all your work</p>
                   <button className="bg-[#1D1C1B] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-black transition">Learn more</button>
                </div>
                {/* Floating paper decoration relative to text */}
                <div className="relative w-48 h-32 ml-10 transform translate-y-10 group hidden lg:block">
                    <div className="absolute inset-0 bg-white shadow-xl transform rotate-12 rounded-lg border border-gray-100 z-10 transition duration-700 group-hover:rotate-[15deg]"></div>
                    <div className="absolute inset-0 bg-white shadow-xl transform rotate-6 rounded-lg border border-gray-100 z-20 transition duration-700 group-hover:rotate-[8deg] group-hover:-translate-y-2"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-gray-100 to-white shadow-2xl transform rotate-0 rounded-lg border border-gray-200 z-30 flex items-center justify-center p-2">
                        <div className="w-full h-full border border-gray-200 rounded text-gray-200 fill-current opacity-50 flex items-center justify-center">☁️</div>
                    </div>
                </div>
             </div>

             <div className="w-full md:w-[60%] px-6 mt-12 md:mt-0 lg:pl-10 relative z-10 bg-white/80 py-8 rounded-2xl">
                 <FeatureCheckItem title="Save and sync every document" text="Keep all your documents together, in sync and available anywhere. Compare changes with a browsable version history and stay organised with projects."/>
                 <FeatureCheckItem title="Stay small, or scale up" text="Whether on your own or with a team, you can easily manage your account, Workspace access and members from your admin dashboard. In any browser, at any time."/>
                 <FeatureCheckItem title="Bring in Guests" text="From one-off collaborations to working with freelancers and contractors, it's easy to invite Workspace Guests, or offer access to specific documents."/>
                 <FeatureCheckItem title="Share Libraries effortlessly" text="Every Workspace member gets instant access to any shared Libraries. It makes onboarding a breeze, and keeps design systems in sync."/>
             </div>
         </section>

         {/* Section: Mac app */}
         <section className="relative py-20 border-t border-gray-100 overflow-hidden flex flex-col-reverse md:flex-row items-center min-h-[500px]">
             {/* Right Giant Teal/Cyan Geometry Bleed */}
             <div className="absolute right-0 top-0 bottom-0 w-[450px] bg-[#3CB3AB] z-0 transform rounded-l-[100px] opacity-40 hidden lg:block" style={{clipPath: 'polygon(0% 20%, 100% 0, 100% 100%, 0% 100%)'}}></div>

             <div className="w-full md:w-[60%] px-6 mt-12 md:mt-0 lg:pl-[max(2rem,calc((100vw-1200px)/2))] lg:pr-10 relative z-10 bg-white/80 py-8 rounded-2xl">
                 <FeatureCheckItem title="Made exclusively for macOS" text="Dark mode, customizable toolbars and shortcuts, RTL support, built-in spellcheck, local document editing, and pain-free offline access all come as standard."/>
                 <FeatureCheckItem title="Ready for real-time collaboration" text="Invite others to Workspace documents and work together, in real-time. No more pinging files back and forth or wondering who has the latest version."/>
                 <FeatureCheckItem title="Built for design systems" text="With Symbols, Styles and Color Variables, you'll have everything you need to build, scale and share design systems that everyone can take advantage of."/>
                 <FeatureCheckItem title="Perfect for prototyping" text="Turn mockups into functional prototypes in minutes. Then test them in the browser and share them with a link — or try them out on your iOS device."/>
                 <FeatureCheckItem title="And that's not all..." text="Plugins, Assistants, Smart Distribute, Smart Layout, multi-format and multi-scale exports, math operators, resizing constraints, Variable fonts and OpenType features, Mirror for iOS."/>
             </div>
             
             <div className="w-full md:w-[40%] pr-6 md:pr-20 relative z-10 flex flex-col items-start lg:pl-10">
                <div className="max-w-xs mb-10 pt-10">
                   <h2 className="text-[44px] font-black text-[#1D1C1B] mb-2 leading-none">Mac app</h2>
                   <p className="text-[20px] font-medium text-gray-600 mb-8 mt-4">An award-winning, native editor</p>
                   <button className="bg-[#1D1C1B] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-black transition">Learn more</button>
                </div>
                {/* Floating computer windows decoration relative to text */}
                <div className="relative w-64 h-48 self-end transform -translate-x-10 group hidden lg:block">
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-gray-200 rounded-lg transform -rotate-12 border-4 border-white shadow-xl z-20 group-hover:-rotate-6 transition duration-700"></div>
                    <div className="absolute right-10 bottom-10 w-40 h-28 bg-blue-100 rounded-lg transform border-8 border-gray-800 shadow-2xl z-30 overflow-hidden flex items-center justify-center text-4xl group-hover:-translate-y-4 transition duration-700">💎</div>
                </div>
             </div>
         </section>

         {/* Section: Web app */}
         <section className="relative py-20 border-t border-gray-100 overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
             {/* Left Giant Magenta/Purple Geometry Bleed */}
             <div className="absolute left-[-10%] top-[40%] bottom-[0%] w-[500px] h-full bg-gradient-to-tr from-[#DB11A7] to-[#7824C5] z-0 transform rotate-12 hidden lg:block border-[30px] border-white shadow-2xl opacity-40"></div>
             
             <div className="w-full md:w-[40%] pl-6 md:pl-20 relative z-10 lg:pr-10">
                <div className="max-w-xs mb-10 pt-10">
                   <h2 className="text-[44px] font-black text-[#1D1C1B] mb-2 leading-none">Web app</h2>
                   <p className="text-[20px] font-medium text-gray-600 mb-8 mt-4">Browser-based tools for feedback and handoff</p>
                   <button className="bg-[#1D1C1B] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-black transition">Learn more</button>
                </div>
             </div>

             <div className="w-full md:w-[60%] px-6 mt-12 md:mt-0 lg:pl-10 relative z-10 bg-white/80 lg:pr-[max(2rem,calc((100vw-1200px)/2))] py-8 rounded-2xl">
                 <FeatureCheckItem title="View designs in any browser" text="Browse Sketch documents and try out prototypes, right inside your web browser. Need to share your work with stakeholders? Simply copy a link."/>
                 <FeatureCheckItem title="Comment and discuss" text="Leave your feedback next to any Artboard, keep track of discussions with threads and make sure the right people get notified with mentions."/>
                 <FeatureCheckItem title="Developer Handoff" text="Invite developers to inspect designs, measure layers, copy attributes and download production-ready assets — all from their favorite browser."/>
                 <FeatureCheckItem title="Stay on top of changes" text="See every save with version history, browse through changes, roll back easily, and highlight important updates with Starred updates."/>
             </div>
         </section>

         {/* Common questions */}
         <section className="py-32 px-6 max-w-[1000px] mx-auto border-t border-gray-100">
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/3 shrink-0">
                  <h2 className="text-4xl font-black text-[#1D1C1B] leading-tight sticky top-32">Common<br/>questions</h2>
               </div>
               
               <div className="md:w-2/3 flex flex-col pt-2">
                  
                  <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4 pl-2">Buying</div>
                  <div className="mb-12 border-t border-gray-200">
                     <FAQItem question="Why is there no free plan?" />
                     <FAQItem question="Which payment methods do you accept?" />
                     <FAQItem question="I have a license. Can I switch to a subscription?" />
                     <FAQItem question="Do I need a Sketch subscription and a license key?" />
                     <FAQItem question="How can I get a quote or purchase order?" />
                     <FAQItem question="How to get the Education version?" />
                     <FAQItem question="Is Sketch only available as a subscription?" />
                  </div>

                  <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4 pl-2">Using</div>
                  <div className="mb-12 border-t border-gray-200">
                     <FAQItem question="What are the differences between Viewers, Editors and Admins?" />
                     <FAQItem question="What are Guests? Do I need to pay for them?" />
                     <FAQItem question="Can Editors use the Mac app on more than one device?" />
                     <FAQItem question="Is my data secure and private?" />
                     <FAQItem question="Do I need a Mac to use Sketch?" />
                  </div>

                  <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4 pl-2">Billing and management</div>
                  <div className="mb-12 border-t border-gray-200">
                     <FAQItem question="Where can I get an invoice?" />
                     <FAQItem question="How can I change or cancel my subscription?" />
                     <FAQItem question="How does adding or removing Editors affect my bill?" />
                  </div>

                  <div className="mt-4 pt-10 border-t border-gray-100 flex flex-col items-start gap-6">
                     <h5 className="font-bold text-[17px] text-[#1D1C1B]">Have more questions?</h5>
                     <button className="bg-[#1D1C1B] text-white px-5 py-2.5 rounded text-[13px] font-bold hover:bg-gray-800 transition shadow-sm">Check our support section</button>
                  </div>

               </div>
            </div>
         </section>

         {/* Sketch for Education */}
         <section className="py-20 bg-white border-t border-gray-100 px-6">
            <div className="max-w-[1000px] mx-auto bg-[#FAFAFA] rounded-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] p-12 pr-12 lg:pr-32 relative overflow-hidden flex flex-col md:flex-row justify-between items-center group">
               <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
                  <h3 className="text-3xl font-black text-[#1D1C1B] mb-2"><span className="text-sketch-orange font-serif italic text-[36px] font-normal tracking-tight relative pr-1">Sketch for Education</span></h3>
                  <p className="text-[17px] font-medium text-gray-700">Get Sketch for free if you're a student or educator.</p>
               </div>
               
               {/* Small floating illustration in center */}
               <div className="absolute left-[50%] transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-[30%] opacity-20 md:opacity-100 pointer-events-none group-hover:-translate-y-2 transition duration-500">
                   {/* Fake paper graphics */}
                   <div className="w-32 h-20 bg-white border border-gray-200 shadow-md transform rotate-12 absolute left-[-60px] top-4"></div>
                   <div className="w-40 h-28 bg-white border border-gray-200 shadow-xl transform shrink-0 rotate-[-10deg] flex items-center justify-center"><div className="w-full h-2 bg-red-400 absolute bottom-4 transform -rotate-2"></div></div>
               </div>

               <div className="relative z-10">
                  <button className="bg-black text-white px-6 py-3 text-sm font-bold rounded hover:bg-gray-800 transition shadow-md">Find out more</button>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="pt-16 pb-8 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
               <div className="lg:col-span-2 pr-8">
               <h4 className="font-bold mb-2 text-[#1D1C1B] text-[15px]">Get inspired by incredible design</h4>
               <p className="text-sm text-gray-500 mb-6 font-medium">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black" />
                  <button className="bg-gray-400 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-500">Try it out</button>
               </div>
               <div className="mt-4 flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-[12px] text-gray-500 font-medium">I agree to receive marketing emails from Sketch.</span>
               </div>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Product</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=07-whats-new" className="hover:text-black transition">What's New <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=08-design-collaborate" className="hover:text-black transition">Design</a></li>
                  <li><a href="#page=10-collaborative-design" className="hover:text-black transition">Collaboration</a></li>
                  <li><a href="#page=05-prototyping-tools" className="hover:text-black transition">Prototyping</a></li>
                  <li><a href="#page=04-developer-handoff" className="hover:text-black transition">Developer Handoff</a></li>
                  <li><a href="#page=09-workspace" className="hover:text-black transition">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
                  <li><a href="#" className="hover:text-black transition flex items-center gap-2">Apps <span className="w-4 h-4 bg-gray-200 rounded-full inline-flex font-black text-[9px] items-center justify-center pt-0.5 shadow-sm">◊</span></a></li>
                  <li><a href="#page=20-plugins" className="hover:text-black transition">Extensions</a></li>
                  <li><a href="#page=12-pricing" className="hover:text-black transition">Pricing</a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Why Sketch</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=01-switch-to-sketch" className="hover:text-black transition">Switch to Sketch <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Figma</a></li>
                  <li><a href="#page=02-sketch-vs-figma" className="hover:text-black transition">Sketch vs. Adobe XD</a></li>
                  <li><a href="#page=16-education" className="hover:text-black transition">Free for Education <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
               </ul>
               </div>
               <div>
               <h4 className="font-bold mb-4 text-[#1D1C1B] text-[15px]">Learn</h4>
               <ul className="space-y-3 text-[14px] font-medium text-gray-500">
                  <li><a href="#page=06-blog" className="hover:text-black transition">Blog</a></li>
                  <li><a href="#page=18-sketch-101" className="hover:text-black transition">Course: Sketch 101 <span className="bg-gray-100 text-[10px] text-gray-600 font-bold ml-1 px-1.5 py-0.5 rounded-sm border border-gray-200 tracking-wide uppercase shadow-sm">NEW</span></a></li>
                  <li><a href="#page=13-documentation" className="hover:text-black transition">Documentation</a></li>
                  <li><a href="#page=11-community" className="hover:text-black transition">Events & Meetups</a></li>
                  <li><a href="#page=25-newsletter" className="hover:text-black transition">Newsletter</a></li>
                  <li><a href="#page=15-labs" className="hover:text-black transition">Sketch Labs</a></li>
                  <li><a href="#page=23-developer" className="hover:text-black transition flex items-center justify-between group">Developer Platform <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition text-gray-400">↗</span></a></li>
               </ul>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-400 font-medium">
               <p className="mb-4 md:mb-0">© 2026 Sketch B.V.</p>
               <div className="flex gap-6 text-xl">
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
