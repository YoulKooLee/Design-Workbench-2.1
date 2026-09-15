/**
 * @name Developer Handoff Tools for Everyone
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
  <header className="absolute top-0 w-full z-50">
    <div className="bg-[#FFF3D4] text-center py-2 text-sm font-medium">
      Ready to create your best work? Here's how Sketch can help! →
    </div>
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between sticky top-0 px-6 py-4">
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

const MeasurementLine = ({ text, color = "bg-blue-500", textCol = "text-white", className = "" }) => (
  <div className={`flex items-center w-full opacity-50 ${className}`}>
    <div className={`h-[1px] flex-1 ${color} opacity-40`}></div>
    <div className={`${color} px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono mx-2 ${textCol}`}>
      {text}
    </div>
    <div className={`h-[1px] flex-1 ${color} opacity-40`}></div>
  </div>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 overflow-hidden flex flex-col items-center">
    {/* Vivid radial background blobs */}
    <div className="absolute top-1/4 -left-1/4 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-300 via-fuchsia-400 to-purple-400 rounded-full blur-[120px] mix-blend-multiply opacity-20 -z-10"></div>
    <div className="absolute top-1/3 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-bl from-cyan-200 via-blue-300 to-indigo-300 rounded-full blur-[120px] mix-blend-multiply opacity-20 -z-10"></div>

    <div className="w-full max-w-7xl mx-auto flex items-center mb-10 relative">
      <MeasurementLine text="279" className="hidden md:flex absolute top-[150px] w-full" />
    </div>

    <div className="text-center relative z-10 max-w-4xl mx-auto mt-8">
      {/* Small Turn -> label */}
      <div className="absolute -top-12 left-0 sm:left-12 bg-[#CD43F4] text-white px-2 py-1 rounded text-xs font-bold font-mono tracking-wider shadow-sm transform -rotate-3">
        Turn →
      </div>
      
      <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[1.05] mb-8 text-[#1D1C1B]">
        Designer to developer handoff <span className="bg-[#EBDCF9] block mt-2 px-4 pb-2 rounded-2xl transform rotate-1 inline-block text-[#1D1C1B]">for anyone, anywhere</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-sketch-gray max-w-2xl mx-auto leading-relaxed mb-10">
        You don't need a Mac app, or even a Mac, for developer handoff. Turn pixels into code from your browser with no extra costs, without plugins.
      </p>
      
      <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg shadow-xl mb-16">
        Get started for free
      </a>
      
      <div className="flex flex-col items-center">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">No need for plugins like</p>
        <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
           <span className="font-bold text-xl">Abstract</span>
           <span className="font-bold text-xl">ZEPLIN</span>
           <span className="font-bold text-xl">inVision</span>
           <span className="font-bold text-xl italic">Marvel</span>
        </div>
      </div>
    </div>
    
    <div className="w-full max-w-6xl mx-auto mt-24 relative z-10 px-4">
      {/* Try the demo handwritten note */}
      <div className="absolute -top-16 -left-8 md:top-10 md:-left-24 text-2xl font-serif italic text-[#D838A5] transform -rotate-12 z-20 whitespace-nowrap">
        Try the demo ↘
      </div>
      
      {/* Big Inspector Mockup */}
      <div className="w-full bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative">
         <img src="https://picsum.photos/1400/800?random=15" alt="Sketch web inspector" className="w-full h-auto object-cover" />
      </div>
    </div>
  </section>
);

const FeatureDiamond = ({ title, text }) => (
  <div className="mb-10 last:mb-0">
    <div className="flex gap-4">
      <div className="mt-1 text-gray-400 font-bold shrink-0">◇</div>
      <div>
        <h3 className="font-bold text-lg text-black mb-2">{title}</h3>
        <p className="text-[15px] leading-relaxed text-gray-600">{text}</p>
      </div>
    </div>
  </div>
);

const SectionBlock = ({ annotationLabel, annotationColor, preTitle, title, desc, features, imagePosition, imageSrc, reversed }) => {
  return (
    <section className="py-24 overflow-hidden relative border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Annotation */}
        <div className="flex flex-col items-center mb-16">
          <div className={`${annotationColor} text-white px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold mb-6`}>
            {annotationLabel}
          </div>
          <div className="w-32 h-32 bg-gray-100 rounded-3xl shadow-inner mb-8 overflow-hidden relative flex items-center justify-center">
             {/* Stub for 3D illustrative icon */}
             <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-400 to-cyan-200"></div>
             <span className="text-6xl filter drop-shadow-md">📐</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-center max-w-2xl text-[#1D1C1B] mb-6 leading-tight">
            {title}
          </h2>
          {desc && (
            <p className="text-lg text-sketch-gray text-center max-w-3xl leading-relaxed">
              {desc}
            </p>
          )}
        </div>
        
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mt-20 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
           <div className="lg:w-1/2 w-full">
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm aspect-[4/3] w-full flex items-center justify-center relative group p-8">
                 <img src={imageSrc} className="w-full h-full object-cover rounded shadow" alt="Feature screenshot" />
                 {/* Decorative mock measurement lines overlaid on screenshot */}
                 <div className="absolute top-[20%] w-full h-[1px] bg-blue-500/50 border-b border-dashed border-blue-500/20"></div>
                 <div className="absolute left-[30%] h-full w-[1px] bg-red-500/50 border-r border-dashed border-red-500/20"></div>
              </div>
           </div>
           
           <div className="lg:w-1/2 w-full">
              {features.map((f, i) => (
                <FeatureDiamond key={i} title={f.title} text={f.text} />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

const DemosGrid = () => (
  <section className="py-24 bg-gray-50/30 border-t border-gray-100">
    <div className="text-center mb-16 px-6">
      <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded inline-block text-[10px] font-mono font-bold tracking-widest uppercase mb-6">Demos</div>
      <h2 className="text-4xl md:text-5xl font-black text-[#1D1C1B] mb-6">Handoff in action</h2>
      <p className="text-lg text-sketch-gray max-w-2xl mx-auto">
        Try out some demos to get used to the tools — and maybe even get some inspiration for your own awesome projects.
      </p>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {/* Grid items */}
      <img src="https://picsum.photos/600/800?random=16" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Sea Life" />
      <img src="https://picsum.photos/600/500?random=17" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Color your life" />
      <img src="https://picsum.photos/600/400?random=18" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo How it works" />
      <img src="https://picsum.photos/600/900?random=19" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Prehistoric Art" />
      <img src="https://picsum.photos/600/700?random=20" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Winter Bliss" />
      <img src="https://picsum.photos/600/600?random=21" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Oasis Palace" />
      <img src="https://picsum.photos/600/850?random=22" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Stay Hydrated" />
      <img src="https://picsum.photos/600/550?random=23" className="w-full rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer block" alt="Demo Canvas" />
    </div>
  </section>
);

const WhatsNew = () => (
  <section className="py-24 text-center border-t border-gray-100 bg-white">
    <h2 className="text-4xl font-black mb-4">What's new?</h2>
    <p className="text-sketch-gray mb-16 max-w-md mx-auto">We're always improving things around here. Here's what we've been up to recently:</p>
    
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto px-6 justify-center">
      <div className="bg-gray-50 hover:bg-gray-100 transition cursor-pointer p-12 rounded-3xl flex-1 flex flex-col items-center justify-center min-h-[250px] border border-gray-200">
        <div className="w-16 h-16 bg-[#F4FBEB] rounded-full border border-[#D5E1C3] flex items-center justify-center mb-6 text-2xl">
          <span className="text-green-600 block transform rotate-180">{}</span> {/** Dummy icon **/}
        </div>
        <p className="font-bold text-sm text-[#1D1C1B]">Copy CSS in the web app →</p>
      </div>
      <div className="bg-gray-50 hover:bg-gray-100 transition cursor-pointer p-12 rounded-3xl flex-1 flex flex-col items-center justify-center min-h-[250px] border border-gray-200">
        <div className="w-16 h-16 bg-[#FFF4ED] rounded-full border border-[#EDD9CC] flex items-center justify-center mb-6 text-2xl">
           <span className="text-orange-500 block">{}</span>
        </div>
        <p className="font-bold text-sm text-[#1D1C1B]">Color tokens →</p>
      </div>
    </div>
  </section>
);

const FooterCTA = () => (
  <section className="py-24 px-4 bg-white text-center">
    <div className="bg-gradient-to-r from-[#A7D753] to-[#7BC86A] rounded-[3rem] py-20 px-8 max-w-6xl mx-auto flex flex-col text-left relative overflow-hidden">
      {/* Background poly blob pattern */}
      <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-black/5 clip-path-polygon transform scale-150 translate-x-1/4"></div>
      
      <div className="relative z-10 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[#1D1C1B]">Start your Sketch journey</h2>
        <p className="text-[17px] font-medium text-[#1D1C1B]/80 mb-10 leading-relaxed">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
        <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">Get started for free</a>
      </div>
    </div>
  </section>
);

const QuotesBlockEnd = () => (
   <section className="py-32 px-6 text-center max-w-4xl mx-auto">
     <div className="w-20 h-20 mx-auto mb-8 flex justify-center -space-x-4">
        <div className="w-12 h-12 rounded-full border-2 border-white shadow bg-gray-300 relative z-10 overflow-hidden"><img src="https://i.pravatar.cc/100?u=4" className="w-full h-full object-cover"/></div>
        <div className="w-12 h-12 rounded-full border-2 border-white shadow bg-gray-300 relative z-20 transform translate-y-3 overflow-hidden"><img src="https://i.pravatar.cc/100?u=5" className="w-full h-full object-cover"/></div>
        <div className="w-12 h-12 rounded-full border-2 border-white shadow bg-gray-300 relative z-30 overflow-hidden"><img src="https://i.pravatar.cc/100?u=6" className="w-full h-full object-cover"/></div>
     </div>
     <p className="text-2xl font-bold leading-relaxed mb-6 text-[#1D1C1B]">
       "Libraries and Smart Layout have changed the way our design team works by driving cohesion across our product suite while providing the flexibility needed to solve our customers' most pressing challenges."
     </p>
     <div className="text-[15px] font-bold text-[#1D1C1B]">Matt Jankowski</div>
     <div className="text-[13px] text-gray-500">Senior Designer, Visual — Morningstar, Inc.</div>
   </section>
);

const Footer = () => (
  <footer className="border-t border-gray-200 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
      <div className="lg:col-span-2 pr-8">
        <h4 className="font-bold mb-2">Get inspired by incredible design</h4>
        <p className="text-sm text-sketch-gray mb-6 leading-relaxed">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
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
        <h4 className="font-bold mb-4">Product</h4>
        <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
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
        <h4 className="font-bold mb-4">Why Sketch</h4>
        <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
          <li><a href="#page=01-switch-to-sketch" className="hover:text-black">Switch to Sketch <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
          <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Figma</a></li>
          <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Adobe XD</a></li>
          <li><a href="#page=16-education" className="hover:text-black">Free for Education <span className="bg-gray-100 text-[9px] ml-1 px-1 rounded-sm border border-gray-200">NEW</span></a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Learn</h4>
        <ul className="space-y-3 text-[13px] font-medium text-sketch-gray">
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
    <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 pt-8 flex justify-between items-center text-xs text-slate-400 font-medium">
      <div className="flex justify-center w-full relative">
         <p>© 2026 Sketch B.V.</p>
         <div className="absolute right-0 top-0 flex gap-4 text-gray-400">
             <span>𝕏</span>
             <span>◎</span>
             <span>📷</span>
             <span>▶</span>
         </div>
      </div>
    </div>
  </footer>
);

export default function P04DeveloperHandoff() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-fuchsia-200 text-[#1D1C1B]">
      <Nav />
      <Hero />
      
      <SectionBlock 
         annotationLabel="Pixels →" annotationColor="bg-[#A855F7]"
         title={<span>Free developer tools<br/>in your browser</span>}
         desc="With our handoff tools, any developer can grab the information they need, for any part of a design, at any time. If you're a developer, you don't need to pay for Sketch. Designers can invite developers to inspect work for free — it's that simple."
         imageSrc="https://picsum.photos/1200/800?random=50"
         reversed={false}
         features={[
           { title: "Discuss designs where it matters", text: "Add comments about design details directly on designs — even @mention designers to discuss ideas, share a little praise, and keep the iterations moving." },
           { title: "Read a Library like a book", text: "Use the Components web view to explore the contents of a Library — from Symbols and Styles, to Color Variables and Artboard Templates — including variations that aren't part of a document." },
           { title: "Measure twice, build once", text: "Stay pixel perfect every time. Select a layer, hover over another, and we'll show you the exact measurements for spacing between layers." }
         ]}
      />

      <SectionBlock 
         annotationLabel="Info →" annotationColor="bg-[#EC4899]"
         title={<span>Developer tools that<br/>keep you in sync</span>}
         desc={<>When design systems and <u className="cursor-pointer font-semibold">Libraries</u> are done right, they can make designer-developer handoff a breeze. We help you stay on top of every Component, and keep you in the loop when changes happen.</>}
         imageSrc="https://picsum.photos/1200/800?random=51"
         reversed={true}
         features={[
           { title: "Sync updates automatically", text: "While designer's design, all the latest changes sync straight to the web view automatically and in an instant. Get the most up-to-date screens and components without the need to share new links." },
           { title: "Get clarity on design systems", text: "Inspect any Component in a design and see in an instant if it's part of an existing design system — so you can reuse existing code and stay consistent across teams and time." },
           { title: "Link designs to issue tracking software", text: "When you're working on an isolated component, with Sketch you can share links to your specs directly to tools like Jira and GitHub." }
         ]}
      />

      <SectionBlock 
         annotationLabel="Code →" annotationColor="bg-[#8B5CF6]"
         title={<span>The developer tools<br/>you actually need</span>}
         desc="As a developer, you shouldn't need to learn design tools — and with Sketch, you don't have to. In the web app, you get the features you need in a UI made for handoff."
         imageSrc="https://picsum.photos/1200/800?random=52"
         reversed={false}
         features={[
           { title: "Download assets in a click", text: "Designers: mark assets as exportable. Developers: download them individually or all together. Simple." },
           { title: "Grab Color Tokens straight from Libraries", text: "Download Color Tokens in CSS or JSON formats. You can even generate a URL which updates automatically if you make changes." },
           { title: "Copy everything to your clipboard", text: "Grab the attributes, color values, text and CSS for any layer — straight from our web app, ready to paste to your editor." }
         ]}
      />

      <DemosGrid />
      <WhatsNew />
      <FooterCTA />
      <QuotesBlockEnd />
      <Footer />
    </div>
  );
}
