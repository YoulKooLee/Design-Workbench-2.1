/**
 * @name Sketch Blog
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
  <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
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
        {/* Note the orange button per the blog spec */}
        <a href="#page=12-pricing" className="bg-[#EA580C] text-white px-5 py-2 rounded-full hover:bg-[#C2410C] transition">Get started for free</a>
      </div>
    </div>
  </header>
);

const BlogHeader = () => (
   <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 flex flex-col md:flex-row md:items-end justify-between relative z-10">
      <div>
         <h1 className="text-6xl font-black text-[#1D1C1B] mb-2">Blog</h1>
         <div className="flex items-center gap-2 cursor-pointer group">
            <span className="font-bold text-lg text-[#1D1C1B] group-hover:text-sketch-orange transition">All Posts</span>
            <span className="text-sketch-orange text-xl transform group-hover:-translate-y-0.5 transition">⌄</span>
         </div>
      </div>
      
      <div className="flex items-center gap-5 text-gray-500 mt-8 md:mt-0">
          <button className="hover:text-black transition">✉</button>
          <button className="hover:text-black transition">🛜</button>
          <button className="hover:text-black transition">𝕏</button>
          <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
          <button className="hover:text-black transition">🔍</button>
      </div>
   </div>
);

const ArticleCard = ({ imageSrc, tags, date, title, excerpt }) => (
   <article className="mb-24 group cursor-pointer">
      <div className="w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-xl mb-6 bg-gray-100">
         <img src={imageSrc} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out" alt={title} />
      </div>
      
      <div className="flex justify-between items-center mb-4 text-[10px] sm:text-xs">
         <div className="flex gap-3 font-bold tracking-widest text-[#0D9488] uppercase">
            {tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
         </div>
         <div className="text-gray-400 font-medium flex items-center gap-1">
            {date} <span>🔒</span>
         </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-[#1D1C1B] mb-3 leading-tight group-hover:text-sketch-orange transition">
         {title}
      </h2>
      
      <p className="text-[17px] text-gray-600 leading-relaxed max-w-3xl">
         {excerpt}
      </p>
   </article>
);

const InlineSubscribe = () => (
   <div className="bg-[#FAF9F8] border border-gray-100 rounded-xl p-8 mb-24 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
         <h4 className="font-bold text-[#1D1C1B] mb-2">Get inspired by incredible design</h4>
         <p className="text-sm text-sketch-gray">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
      </div>
      <div className="flex-1 w-full max-w-sm">
         <div className="flex gap-0">
            <input type="email" placeholder="Email address" className="w-full border border-gray-300 border-r-0 rounded-l-md px-4 py-3 text-sm focus:outline-none focus:border-sketch-orange" />
            <button className="bg-[#FCA5A5] text-white px-6 py-3 rounded-r-md font-bold hover:bg-[#F87171] transition">→</button>
         </div>
         <div className="mt-3 flex items-start gap-2">
            <input type="checkbox" className="mt-0.5" />
            <span className="text-[11px] text-gray-500 leading-snug">I agree to receive marketing emails from Sketch.</span>
         </div>
      </div>
   </div>
);

const ReleaseNoteCard = ({ tags, date, title, content }) => (
   <article className="mb-24 flex flex-col md:flex-row gap-6">
      <div className="w-16 h-16 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
         <Logo />
      </div>
      <div className="flex-1">
         <div className="flex justify-between items-center mb-4 text-[10px] sm:text-xs">
            <div className="flex gap-3 font-bold tracking-widest text-[#EA580C] uppercase">
               {tags.map((tag, idx) => <span key={idx}>{tag}</span>)}
            </div>
            <div className="text-gray-400 font-medium">
               {date}
            </div>
         </div>

         <h2 className="text-2xl font-black text-[#1D1C1B] mb-3 leading-tight hover:text-sketch-orange transition cursor-pointer">
            {title}
         </h2>
         
         <div className="text-[16px] text-gray-700 leading-relaxed mb-6">
            {content}
         </div>

         <div className="flex gap-6 text-sm font-bold text-gray-600">
             <button className="flex items-center gap-2 hover:text-black hover:bg-gray-100 px-3 py-1.5 -ml-3 rounded transition"><span className="text-gray-400">📄</span> Release notes</button>
             <button className="flex items-center gap-2 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded transition"><span className="text-gray-400">📖</span> Documentation</button>
         </div>
      </div>
   </article>
);


const Footer = () => (
  <footer className="border-t border-gray-200 mt-20 pt-16 pb-8 bg-[#FAF9F8]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between w-full mb-16 border-b border-gray-200 pb-16">
      <div className="max-w-md w-full mb-10 md:mb-0">
        <h4 className="font-bold mb-2 text-[#1D1C1B]">Get inspired by incredible design</h4>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
      </div>
      <div className="w-full md:w-auto">
        <div className="flex gap-2">
          <input type="email" placeholder="Email address" className="w-[280px] border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black" />
          <button className="bg-[#FDBA74] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#FB923C] transition">Try it out</button>
        </div>
        <div className="mt-3 flex items-start gap-2">
           <input type="checkbox" className="mt-1" />
           <span className="text-[11px] text-gray-500">I agree to receive marketing emails from Sketch.</span>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
      <div>
         <h4 className="font-bold mb-4 text-[#1D1C1B]">Support</h4>
         <ul className="space-y-3 text-[13px] font-medium text-gray-500">
            <li><a href="#" className="hover:text-black">Sketch Help ↗</a></li>
            <li><a href="#" className="hover:text-black">Contact Us</a></li>
            <li><a href="#" className="hover:text-black">Manage License</a></li>
            <li><a href="#" className="hover:text-black">Service Status ↗</a></li>
         </ul>
      </div>
      <div>
         <h4 className="font-bold mb-4 text-[#1D1C1B]">Company</h4>
         <ul className="space-y-3 text-[13px] font-medium text-gray-500">
            <li><a href="#page=19-about-us" className="hover:text-black">About Us</a></li>
            <li><a href="#page=17-careers" className="hover:text-black">Careers <span className="bg-gray-200 text-[10px] ml-1 px-1.5 rounded-full font-bold">1</span></a></li>
            <li><a href="#" className="hover:text-black">Terms & Policies</a></li>
            <li><a href="#" className="hover:text-black">Cookie Preferences</a></li>
         </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center text-xs text-gray-400 font-medium">
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
);

export default function P06Blog() {
   return (
     <div className="min-h-screen bg-white">
        <Nav />
        {/* Giant decorative background blobs hidden behind the header */}
        <div className="absolute top-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-slate-100 rounded-full blur-3xl opacity-50"></div>
           <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50"></div>
           {/* faint diamond shapes traces in bg... */}
        </div>

        <BlogHeader />
        
        <main className="max-w-4xl mx-auto px-6 relative z-10">
           
           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=401"
              tags={["SKETCH TUTORIALS", "DESIGN TUTORIALS"]}
              date="Yesterday"
              title="How to create Instagram carousel post templates using Sketch"
              excerpt="Fast-track your social media output with the power of Artboard Templates"
           />
           
           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=402"
              tags={["DESIGN TUTORIALS", "SKETCH TUTORIALS"]}
              date="14 October 2022"
              title="How to create a glassmorphic design in Sketch"
              excerpt="Use blurs, gradients and texture to create a glassmorphic design in seven simple steps"
           />
           
           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=403"
              tags={["DESIGN TUTORIALS"]}
              date="7 October 2022"
              title="The ultimate color combination guide"
              excerpt="Discover the best color combinations by learning your way around the color wheel"
           />

           <InlineSubscribe />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=404"
              tags={["INSIDE SKETCH"]}
              date="30 September 2022"
              title="Benefits of working with Overlays in Sketch"
              excerpt="Here's why Sketch is the best tool for creating dynamic prototypes with screen-popping overlays — examples included!"
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=405"
              tags={["INDUSTRY"]}
              date="27 September 2022"
              title="Ramsés Cabello: A designer's journey to collaboration beyond the canvas"
              excerpt='"The journey to effective collaboration starts with communication, and the first step is being conscious of how we talk"'
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=406"
              tags={["SKETCH TUTORIALS"]}
              date="26 September 2022"
              title="Get started with your Sketch Workspace"
              excerpt={
                 <ul className="space-y-1">
                    <li>→ Welcome to Workspaces, the powerhouse behind your design team</li>
                    <li>→ Find out how to get started with real-time collaboration and handoff in your Workspace</li>
                    <li>→ Bring all your people and projects together — in one place</li>
                 </ul>
              }
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=407"
              tags={["NEW IN SKETCH"]}
              date="23 September 2022"
              title="Everything you need to know about the Sketch Mac app"
              excerpt="Does Sketch have real time collaboration? Find out inside! (Spoiler alert: Yes it does)"
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=408"
              tags={["NEW IN SKETCH"]}
              date="22 September 2022"
              title="Everything you need to know about the Sketch web app"
              excerpt="What can you do in the Sketch web app? From annotations to handoff, we've got the answers you need..."
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=409"
              tags={["INSIDE SKETCH", "NEW IN SKETCH"]}
              date="21 September 2022"
              title="Glow-up: Eight new Sketch features you might've missed"
              excerpt="The old Sketch can't come to the phone — but the new Sketch certainly can"
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=410"
              tags={["NEW IN SKETCH"]}
              date="19 September 2022"
              title="Introducing: Sketch for Education"
              excerpt="Here's how to get Sketch for free as a student or educator"
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=411"
              tags={["INSIDE SKETCH", "NEW IN SKETCH"]}
              date="15 September 2022"
              title="Long time no see? Discover the new Sketch"
              excerpt="Missed what we've been doing recently? Let's get you up to speed..."
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=412"
              tags={["DESIGN TUTORIALS", "SKETCH TUTORIALS"]}
              date="15 September 2022"
              title="How to make a Twitch Emote in Sketch"
              excerpt="Give your Twitch subscribers a unique way to interact with you"
           />

           {/* Special Release Note Inline Card */}
           <ReleaseNoteCard 
              tags={["NEW IN SKETCH"]}
              date="13 September 2022"
              title="A new Mac app release is out now!"
              content={
                 <>
                   In this update, we're making small, quality-of-life improvements that add up to a better overall experience. Document thumbnails have always been a great way to make your Workspace more visual and easier to navigate — so we're making them easier to set. Now, with just a couple of clicks, you can <a href="#" className="font-bold text-sketch-orange hover:underline">set any Artboard as your document thumbnail</a>. We've also improved the Smart Grid experience and SVG exports for simple shapes, and made some other fixes and improvements.
                 </>
              }
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=413"
              tags={["INSIDE SKETCH"]}
              date="13 September 2022"
              title="A look at Glòria Langreo's life as a product manager at Sketch"
              excerpt="Celebrating our very own demo legend — whose feature walkthroughs are always a treat for the team"
           />

           <ArticleCard 
              imageSrc="https://picsum.photos/1200/514?random=414"
              tags={["INDUSTRY"]}
              date="12 September 2022"
              title="What is game UI? A complete beginner's guide to game interface design"
              excerpt="Press A to continue"
           />

           <div className="w-full flex justify-center py-8 mb-20 border-t border-gray-100">
              <button className="bg-white border border-gray-200 text-gray-700 font-bold px-12 py-4 rounded-xl hover:border-gray-300 hover:shadow-sm transition">
                 Load More
              </button>
           </div>
           
        </main>

        <Footer />
     </div>
   );
}
