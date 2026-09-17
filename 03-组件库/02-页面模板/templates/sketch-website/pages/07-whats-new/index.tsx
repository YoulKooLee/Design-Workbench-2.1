/**
 * @name What's New
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
  <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
    <div className="bg-[#FFF3D4] text-center py-2 text-sm font-medium">
       Ready to create your best work? Here's how Sketch can help! →
    </div>
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
        <a href="#page=12-pricing" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">Get started for free</a>
      </div>
    </div>
  </header>
);

const HeaderSection = () => (
   <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-center relative">
      <div className="absolute top-24 right-0 hidden md:block">
         <button className="flex items-center gap-2 border border-gray-200 bg-white shadow-sm px-4 py-2 rounded-full text-sm font-bold hover:shadow transition text-[#1D1C1B]">
            Release notes for Mac <span className="opacity-50 text-xs">📶</span>
         </button>
      </div>
      
      <div className="inline-block relative mb-4">
         <h1 className="text-5xl md:text-6xl font-black text-[#1D1C1B] tracking-tight">What's New</h1>
         <div className="absolute -top-3 -right-8 w-6 h-6 bg-[#EA580C] text-white text-xs font-bold rounded-full flex items-center justify-center transform rotate-12 shadow-sm">
            9
         </div>
      </div>
      
      <p className="text-xl md:text-[22px] text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
         Discover the latest features in our Mac, web and iPhone apps.
      </p>

      {/* Tabs Filter */}
      <div className="flex justify-center mb-6">
         <div className="flex bg-gray-50 border border-gray-200 rounded-full p-1 shadow-inner max-w-md w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 rounded-full bg-white shadow text-sm font-bold text-[#1D1C1B]">All</button>
            <button className="flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-black transition">Mac</button>
            <button className="flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-black transition">Web</button>
            <button className="flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-black transition">iPhone</button>
         </div>
      </div>

      {/* New Since message */}
      <div className="inline-block bg-orange-100/50 text-[#EA580C] px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide">
         9 new since your last visit
      </div>
   </section>
);

const TimelineItem = ({ date, title, platforms, imageSrc, description, ctaText, isUnread = false }) => (
   <div className="relative pl-10 md:pl-0 w-full max-w-[1100px] mx-auto mb-28 group">
      
      {/* Desktop Layout split (Left: metadata, Right: content) */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
         
         {/* Left Column (Timeline Dot, meta and title) */}
         <div className="md:w-1/3 relative md:text-right md:pr-12 md:shrink-0 flex flex-col md:items-end">
            
            {/* The actual dot injected via absolute positioning (desktop left side of line, mobile left of container) */}
            <div className={`absolute left-0 md:left-auto md:right-[-4.5px] top-1 w-2.5 h-2.5 rounded-full border border-white z-10 
               ${isUnread ? "bg-[#EA580C] ring-4 ring-orange-100" : "bg-gray-300"} 
               transform -translate-x-[4.5px] md:translate-x-0`}></div>
            
            <div className="text-[13px] font-bold text-gray-400 mb-3 flex items-center justify-start md:justify-end gap-1">
               <span className={isUnread ? "text-[#EA580C]" : ""}>{date}</span> 
               <span className="cursor-pointer opacity-50 hover:opacity-100 transition">🔗</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-[#1D1C1B] leading-tight mb-5 md:text-right">
               {title}
            </h2>
            
            <div className="flex flex-wrap justify-start md:justify-end gap-2">
               {platforms.map((plat) => (
                  <span key={plat} className="bg-gray-100 border border-gray-200 text-gray-500 text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded">
                     {plat}
                  </span>
               ))}
            </div>
         </div>
         
         {/* Right Column (Image/Video, Text, Button) */}
         <div className="md:w-2/3 md:pl-12 w-full pt-1 md:pt-0">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-200 mb-8 aspect-video w-full flex items-center justify-center group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition duration-500">
               {/* Stand-in for image/video thumbnail */}
               <img src={imageSrc} className="w-full h-full object-cover" alt={title}/>
            </div>
            <div className="text-[17px] text-[#1D1C1B]/80 leading-relaxed max-w-2xl mb-8">
               {description}
            </div>
            {ctaText && (
               <button className="bg-black text-white px-6 py-3.5 rounded-xl text-[15px] font-bold hover:bg-gray-800 transition shadow-md">
                  {ctaText}
               </button>
            )}
         </div>

      </div>
   </div>
);


const TimelineSection = () => (
   <section className="relative px-6 pb-20 overflow-hidden w-full max-w-[1400px] mx-auto">
      {/* The Central Line */}
      {/* On mobile it's on left, on desktop it's precisely at 33.33% to match md:w-1/3 structure */}
      <div className="absolute left-[38px] md:left-[calc(33.333333%+1.5rem)] top-0 bottom-0 w-[1px] bg-gray-200 z-0 hidden md:block"></div>
      <div className="absolute left-6 md:hidden top-0 bottom-0 w-[1px] bg-gray-200 z-0"></div>

      <div className="relative z-10 w-full mt-10">
         <TimelineItem 
            isUnread={true}
            date="Yesterday"
            title="Annotations in the web app"
            platforms={["WEB APP"]}
            imageSrc="https://picsum.photos/1000/600?random=501"
            description="Share ideas, discuss details and ideate together with annotations. Now, you can pin a comment directly to a point on the Canvas and strike up a conversation, right where it matters. And once you've left your comments, you can add more detail as a reply and discuss with others right inside that same annotation. We'll be bringing annotations support to the Mac app soon, too."
            ctaText="Check out the blog post"
         />

         <TimelineItem 
            isUnread={true}
            date="12 Sep"
            title="38 smaller (but still sweet) Sketch improvements"
            platforms={["MAC APP", "WEB APP", "IPHONE APP"]}
            imageSrc="https://picsum.photos/1000/600?random=502"
            description="With all the big feature releases in recent months, it's sometimes easy to miss some of the smaller (but still sweet) improvements we've made to Sketch along the way. So grab a coffee and take a seat as we run you through 38(!) of these little gems in less than four minutes."
            ctaText="Read more on our blog"
         />

         <TimelineItem 
            isUnread={true}
            date="03 Aug"
            title="Duplicate documents"
            platforms={["MAC APP", "WEB APP"]}
            imageSrc="https://picsum.photos/1000/600?random=503"
            description="We've added a new option to duplicate a document to your drafts folder, so you can iterate on an idea without adding updates to the original file. This works for documents in Workspaces that you're a part of, as well as documents others share via a public link."
            ctaText="Read the blog post"
         />

         <TimelineItem 
            isUnread={true}
            date="03 Aug"
            title="Align layers faster"
            platforms={["MAC APP"]}
            imageSrc="https://picsum.photos/1000/600?random=504"
            description="We're giving you even more control over how you align multiple selections of layers. Now, you can click on any layer within a multi-layer selection to make it the reference object. When you do this, all the layers within your selection will now align to that reference object when you use the alignment controls in the Inspector."
            ctaText="Read the documentation"
         />

         <TimelineItem 
            isUnread={true}
            date="12 Jul"
            title="Overlays"
            platforms={["MAC APP"]}
            imageSrc="https://picsum.photos/1000/600?random=505"
            description="With Overlays, you can create richer and more interactive prototypes. Simply set any Artboard as an Overlay and link to it from anywhere in your prototype to get started. After that, you can make every interaction unique and realistic with a powerful set of options — from universal and one-off positioning, to background styling and interactions."
            ctaText="See how it works"
         />

         <TimelineItem 
            isUnread={true}
            date="12 Jul"
            title="The new Sketch iPhone app"
            platforms={["IPHONE APP"]}
            imageSrc="https://picsum.photos/1000/600?random=506"
            description={
               <>
                  Being able to see your designs in context is invaluable. That's why we've rebuilt our iPhone app from the ground up, giving you a better viewing and mirroring experience for documents in your <a href="#page=09-workspace" className="font-bold border-b border-black">Workspace</a> — wherever you are. It's available to download from the <a href="#" className="font-bold border-b border-black">App Store</a> for free right now.
               </>
            }
            ctaText="Read more on our blog"
         />

         <TimelineItem 
            isUnread={true}
            date="11 Jul"
            title="Auto-download Libraries"
            platforms={["MAC APP"]}
            imageSrc="https://picsum.photos/1000/600?random=507"
            description="We've introduced the option to automatically download and update Libraries as soon as they become available. You'll still be able to review and update Components manually, but we're saving you a step so you can stay on top of changes to your design systems."
            ctaText="Learn how to enable it"
         />

         <TimelineItem 
            isUnread={true}
            date="14 Jun"
            title="Artboard Templates"
            platforms={["MAC APP"]}
            imageSrc="https://picsum.photos/1000/600?random=508"
            description="It's time to meet a brand new building block for your designs — Artboard Templates. With them, you can turn any Artboard — and its content — into a template and reuse it across your documents."
            ctaText="Read the blog post"
         />

         <TimelineItem 
            isUnread={true}
            date="16 Mar"
            title="Color Tokens"
            platforms={["WEB APP"]}
            imageSrc="https://picsum.photos/1000/600?random=509"
            description={
               <>
                  With Color Tokens you can export, integrate and sync <a href="#" className="font-bold border-b border-black">Color Variables</a> from your designs to your development projects. If you've got a document or Library with Color Variables, you can now use the web app to download Color Tokens in CSS or JSON formats, or generate a URL that stays up to date with any changes you make.
               </>
            }
            ctaText="Find out more on our blog"
         />
      </div>

      <div className="md:ml-[calc(33.333333%+1.5rem)] ml-10 mt-10">
         <button className="text-gray-400 font-bold hover:text-black transition">
            Older updates →
         </button>
      </div>

   </section>
);

const FooterCTA = () => (
   <section className="py-24 px-4 bg-white text-center">
     <div className="bg-gradient-to-r from-[#A7D753] to-[#7BC86A] rounded-[3rem] py-24 px-10 max-w-[1200px] mx-auto flex flex-col relative overflow-hidden text-left">
       <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-black/5 clip-path-polygon transform scale-150 translate-x-1/4"></div>
       <div className="relative z-10 max-w-2xl">
          <div className="text-black text-opacity-20 text-6xl mb-6">💎</div>
         <h2 className="text-4xl md:text-[54px] font-black mb-6 leading-[1.1] text-[#1D1C1B] tracking-tight">Create your<br/>Workspace for free</h2>
         <p className="text-[18px] font-medium text-[#1D1C1B]/80 mb-10 leading-relaxed max-w-lg">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
         <a href="#page=12-pricing" className="inline-block bg-[#1D1C1B] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-xl text-lg">Get started for free</a>
       </div>
     </div>
   </section>
);

const Footer = () => (
   <footer className="border-t border-gray-200 pt-16 pb-8 bg-white">
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
 );

export default function P07WhatsNew() {
   return (
      <div className="min-h-screen bg-white">
         <Nav />
         <HeaderSection />
         <TimelineSection />
         <FooterCTA />
         <Footer />
      </div>
   );
}
