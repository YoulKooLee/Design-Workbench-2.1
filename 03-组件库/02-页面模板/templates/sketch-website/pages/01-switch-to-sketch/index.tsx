/**
 * @name 切换到 Sketch
 */
import React from 'react';
import './style.css';

// SVG Icons (Simplified for prototype)
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
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0">
      <div className="flex items-center space-x-8">
        <Logo />
        <nav className="hidden md:flex space-x-6 text-sm font-semibold">
          <a href="#page=03-best-platform" className="hover:text-sketch-orange transition">Product v</a>
          <a href="#" className="hover:text-sketch-orange transition">Learn v</a>
          <a href="#page=14-apps" className="hover:text-sketch-orange transition">Apps</a>
          <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Pricing</a>
          <a href="#" className="hover:text-sketch-orange transition">Why Sketch v</a>
        </nav>
      </div>
      <div className="flex items-center space-x-6 text-sm font-semibold">
        <a href="#page=22-support" className="hover:text-sketch-orange transition hidden md:block">Support v</a>
        <a href="#page=12-pricing" className="hover:text-sketch-orange transition">Sign In</a>
        <a href="#page=12-pricing" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">Get started for free</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="pt-48 pb-20 px-6 text-center max-w-4xl mx-auto relative relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 opacity-30 mt-20">
      {/* Decorative BG element simplified */}
      <div className="w-[600px] h-[300px] bg-yellow-300 rounded-full blur-[100px]"></div>
    </div>
    <div className="inline-block relative">
      <span className="absolute -top-4 -right-10 text-[#E56337] transform rotate-12 font-serif italic text-2xl">back</span>
      <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
        Why <span className="text-[#E56337] italic font-serif font-medium">switch</span> to<br />Sketch?
      </h1>
    </div>
    <p className="text-xl text-sketch-gray max-w-2xl mx-auto mb-16 leading-relaxed">
      Whether you're trying Sketch for the first time, or coming back after an extended holiday (we missed you!) — we have so much to tell you.
    </p>
  </section>
);

const TwinPlatforms = () => (
  <section className="py-24 bg-gray-50 flex flex-col items-center">
    <h2 className="text-4xl md:text-5xl font-black text-center mb-6">
      Sketch is a Mac app.<br />And a web app. <span className="text-[#E56337] italic font-serif font-medium text-4xl rotate-6 inline-block ml-2">wow!</span>
    </h2>
    <p className="text-lg text-sketch-gray text-center max-w-3xl mb-16">
      Sure, we have the best native editor with an experience that feels right at home on <strong className="text-black">macOS</strong>, but that's not the full story. You can also work offline and save your files locally, but that's still only scratching the surface.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
      {/* Feature 1 */}
      <div>
        <div className="bg-gray-200 rounded-2xl aspect-[4/3] mb-6 overflow-hidden border border-gray-100"><img src="https://picsum.photos/400/300?random=1" className="w-full h-full object-cover" alt="Real-time collaboration" /></div>
        <h3 className="font-bold text-xl mb-3">Real-time collaboration</h3>
        <p className="text-sm text-sketch-gray mb-4">It's true. Real-time collaboration in the <strong className="text-black">Mac app</strong> is included at no extra cost with your subscription — and you can invite anyone else who's got one, too.</p>
        <a href="#" className="font-semibold text-sm hover:underline">Learn more →</a>
      </div>
      {/* Feature 2 */}
      <div>
        <div className="bg-gray-200 rounded-2xl aspect-[4/3] mb-6 overflow-hidden border border-gray-100"><img src="https://picsum.photos/400/300?random=2" className="w-full h-full object-cover" alt="Browser-based tools" /></div>
        <h3 className="font-bold text-xl mb-3">Browser-based tools</h3>
        <p className="text-sm text-sketch-gray mb-4">Not everyone has a Mac. So, with our <strong className="text-black">web app</strong>, you can browse your documents, inspect designs, export assets, comment with annotations, manage users, and invite guests for free. In any browser. On any device.</p>
        <a href="#" className="font-semibold text-sm hover:underline">Learn more →</a>
      </div>
      {/* Feature 3 */}
      <div>
        <div className="bg-gray-200 rounded-2xl aspect-[4/3] mb-6 overflow-hidden border border-gray-100"><img src="https://picsum.photos/400/300?random=3" className="w-full h-full object-cover" alt="Sketch on your iPhone" /></div>
        <h3 className="font-bold text-xl mb-3">Sketch on your iPhone</h3>
        <p className="text-sm text-sketch-gray mb-4">Our brand new <strong className="text-black">iPhone app</strong> lets you take your designs with you, anywhere. View your documents on the go, play prototypes on a real device, and mirror designs as you edit them on your Mac.</p>
        <a href="#page=01-switch-to-sketch" className="font-semibold text-sm hover:underline">Download the app →</a>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto mt-20">
      {/* Row 2 - 1 */}
      <div>
        <div className="mb-4 h-24 flex items-end"><img src="https://picsum.photos/200/100?random=4" className="h-full rounded-lg" alt="Space" /></div>
        <h3 className="font-bold text-xl mb-3">A space for everything</h3>
        <p className="text-sm text-sketch-gray mb-4">Your Sketch Workspace helps you keep all of your documents together and your design systems distributed, in sync and available wherever your team is. You can be part of multiple Workspaces, have one just for you, or share it with other people.</p>
        <a href="#" className="font-semibold text-sm hover:underline">Learn more →</a>
      </div>
       {/* Row 2 - 2 */}
       <div>
        <div className="mb-4 h-24 flex items-end"><img src="https://picsum.photos/200/100?random=5" className="h-full rounded-lg" alt="Future proof" /></div>
        <h3 className="font-bold text-xl mb-3">Future-proof your files</h3>
        <p className="text-sm text-sketch-gray mb-4">Thanks to our completely open file format, your documents are future-proofed — no matter what. They're your files and you're in control to read, edit, and move them as you please. You can even automate actions in your documents without plugins — even without Sketch.</p>
        <a href="#" className="font-semibold text-sm hover:underline">Read on our blog →</a>
      </div>
       {/* Row 2 - 3 */}
       <div>
        <div className="mb-4 h-24 flex items-end"><img src="https://picsum.photos/200/100?random=6" className="h-full rounded-lg" alt="Safe" /></div>
        <h3 className="font-bold text-xl mb-3">You're in safe hands</h3>
        <p className="text-sm text-sketch-gray mb-4">We're committed to keeping you and your documents safe. From extra security with completely private draft documents, Two-Factor Authentication (2FA), secure URLs so nobody can force their way into your files, Single-Sign-On (SSO) for business plans and ISO 27001 certification.</p>
        <a href="#" className="font-semibold text-sm hover:underline">Learn about SSO →</a>
      </div>
    </div>

    <div className="mt-20 text-center">
      <p className="text-sm font-semibold mb-4 text-sketch-gray">Thinking of switching from Figma to Sketch? Or should we say switching from Adobe to Sketch?</p>
      <div className="flex gap-6 justify-center">
        <a href="#page=02-sketch-vs-figma" className="font-bold border-b border-black pb-0.5 hover:text-sketch-orange hover:border-sketch-orange transition">Compare Sketch vs. Figma →</a>
        <a href="#page=02-sketch-vs-figma" className="font-bold border-b border-black pb-0.5 hover:text-sketch-orange hover:border-sketch-orange transition">Compare Sketch vs. Adobe XD →</a>
      </div>
    </div>
  </section>
);

const DarkSection = () => (
  <section className="bg-sketch-bg-black text-white py-32 rounded-[3rem] mt-24 mb-16 mx-4">
    <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-center">
      <div className="flex-1">
        <span className="text-[#E56337] italic font-serif text-2xl rotate-[-10deg] inline-block mb-2">very</span>
        <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">The future is bright</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-md">
          We're shipping shiny new things all the time. From landmark features that hit the headlines, to quality of life improvements flying below the radar — we're always busy making moves.
        </p>
        <a href="#page=07-whats-new" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">See what's new</a>
      </div>
      <div className="flex-1 w-full bg-black/50 p-8 rounded-3xl border border-white/10">
        <p className="text-xs uppercase tracking-widest text-[#E56337] font-bold mb-6">WHAT'S NEW</p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E56337]"></span><span className="font-medium">Annotations in the web app</span></li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E56337]"></span><span className="font-medium">38 smaller improvements</span></li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E56337]"></span><span className="font-medium">Duplicate documents</span></li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E56337]"></span><span className="font-medium">Align layers faster</span></li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E56337]"></span><span className="font-medium">Overlays</span></li>
        </ul>
        <div className="mt-8 pt-6 border-t border-white/10 text-right">
          <a href="#" className="text-sm font-semibold hover:underline">See all updates</a>
        </div>
      </div>
    </div>
    
    <div className="max-w-6xl mx-auto px-8 mt-16 text-center">
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-3xl p-[2px]">
        <div className="bg-black rounded-[23px] overflow-hidden p-8 flex items-center justify-center h-[300px]">
          <div className="text-center space-y-6 blur-[1px] opacity-80">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Components web view</h3>
            <h3 className="text-3xl font-bold">Overlays</h3>
            <h3 className="text-3xl font-bold">Foresight</h3>
            <h3 className="text-3xl font-bold">Web Inspector improvements</h3>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-6"><span className="italic text-[#E56337] font-serif">P.S.</span> Annotations are in our web app now, and they'll be live in the Mac app very soon.</p>
    </div>
  </section>
);

const Pricing = () => (
  <section className="py-24 bg-[#FAFAFA] border-y border-gray-200">
    <div className="text-center max-w-3xl mx-auto px-6 mb-16">
      <h2 className="text-4xl md:text-5xl font-black mb-6">Transparent pricing</h2>
      <p className="text-lg text-sketch-gray">
        Our standard plan is just $9 a month. That covers everything. Sure, you could spend that on an extra large fancy coffee or two — maybe an extra small popcorn. Or, you could also use it to open up a world of design possibilities, your choice.
      </p>
      <div className="mt-8">
        <a href="#" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition">See our plans</a>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-[#E2D5FC] rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">💬</div>
        </div>
        <h3 className="font-bold text-xl mb-3">Guests go free</h3>
        <p className="text-sm text-sketch-gray text-center">You only pay for Editors — the people in your team who need to design. Viewers and Guests are free. That means you won't bump into any hidden costs when you share your file with the wider team.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-[#D1F0E4] rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">💎</div>
        </div>
        <h3 className="font-bold text-xl mb-3">All the tools for one price</h3>
        <p className="text-sm text-sketch-gray text-center">What's more, you'll find everything you need for prototyping and developer handoff included in that price. That means you don't need to pay for additional plugins like Zeplin or Abstract.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-[#FFDFB8] rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">🎓</div>
        </div>
        <h3 className="font-bold text-xl mb-3">Free for Education</h3>
        <p className="text-sm text-sketch-gray text-center">Are you a student, teacher or academic institution? We have a free tier exclusively for education, so Sketch is free for you!</p>
        <a href="#" className="font-bold text-sm mt-4 hover:underline">Learn more →</a>
      </div>
    </div>
    
    <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-orange-100 via-pink-100 to-indigo-100 p-8 rounded-2xl text-center shadow-sm border border-white/50">
      <p className="text-sm font-medium">We also offer a <strong>Business</strong> plan for companies that need more than <strong>25 seats</strong>. Getting a demo is easy, our sales team can show you why Sketch is the right choice for you. <a href="#" className="underline font-bold hover:text-sketch-orange">Get in touch.</a></p>
    </div>
  </section>
);

const FooterCTA = () => (
  <section className="mt-32 px-4 mb-8">
    <div className="bg-sketch-green rounded-[3rem] p-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
      <div className="absolute top-8 right-8 scale-150 rotate-12 opacity-80 mix-blend-overlay">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none"><path d="M50 0L100 50L50 100L0 50L50 0Z" fill="black"/></svg>
      </div>
      <div className="max-w-lg relative z-10">
        <h2 className="text-5xl font-black mb-6 leading-tight">Kickstart your Sketch journey</h2>
        <p className="text-xl font-medium opacity-80 mb-8">With our 30-day free trial, we'll have you set up and ready to do your best work in minutes. Even if you've had a trial before, you can start another one today.</p>
        <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition">Get started for free</a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-gray-200 pt-16 pb-8">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
      <div className="lg:col-span-2">
        <h4 className="font-bold mb-2">Get inspired by incredible design</h4>
        <p className="text-sm text-sketch-gray mb-6">Subscribe to Beyond the Canvas and get the latest design news, articles, resources and inspiration.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email address" className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black" />
          <button className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-black">Try it out</button>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4">Product</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=07-whats-new" className="hover:text-black">What's New</a> <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">New</span></li>
          <li><a href="#page=08-design-collaborate" className="hover:text-black">Design</a></li>
          <li><a href="#page=10-collaborative-design" className="hover:text-black">Collaboration</a></li>
          <li><a href="#page=05-prototyping-tools" className="hover:text-black">Prototyping</a></li>
          <li><a href="#page=04-developer-handoff" className="hover:text-black">Developer Handoff</a></li>
          <li><a href="#page=09-workspace" className="hover:text-black">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Why Sketch</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=01-switch-to-sketch" className="hover:text-black">Switch to Sketch</a></li>
          <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Figma</a></li>
          <li><a href="#page=02-sketch-vs-figma" className="hover:text-black">Sketch vs. Adobe XD</a></li>
          <li><a href="#page=16-education" className="hover:text-black">Free for Education</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Company</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=19-about-us" className="hover:text-black">About Us</a></li>
          <li><a href="#page=17-careers" className="hover:text-black">Careers</a></li>
          <li><a href="#" className="hover:text-black">Terms & Policies</a></li>
          <li><a href="#" className="hover:text-black">Cookie Preferences</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 border-t border-gray-100 pt-8 flex flex-col md:flex-row shadow justify-between items-center text-xs text-sketch-gray font-medium">
      <div className="flex items-center gap-4">
        <Logo />
        <p>© 2022 Sketch B.V.</p>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-black text-lg">𝕏</a>
        <a href="#" className="hover:text-black text-lg">📷</a>
        <a href="#" className="hover:text-black text-lg">▶️</a>
      </div>
    </div>
  </footer>
);

export default function SwitchToSketch() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-yellow-200">
      <Nav />
      <Hero />
      <TwinPlatforms />
      <DarkSection />
      
      {/* Simplified middle sections to save space while fulfilling requirements */}
      <section className="py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6">Getting started has never<br/>been easier</h2>
        <p className="text-lg text-sketch-gray mb-16 px-6">Leave your imposter syndrome at the door. We know that looking at a blank page in a new platform can be daunting, but we've got you covered.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="text-left bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-1 transition duration-300">
            <div className="bg-gray-100 rounded-xl aspect-[1.5] mb-6 overflow-hidden"><img src="https://picsum.photos/300/200?random=7" className="w-full h-full object-cover" /></div>
            <h3 className="font-bold text-lg mb-2">Try our cheat sheets</h3>
            <p className="text-sm text-sketch-gray mb-4">Our documentation acts as your A-Z for Sketch. No matter how experienced you are...</p>
            <a href="#" className="font-bold text-sm text-black hover:underline">Take a look at our docs →</a>
          </div>
          <div className="text-left bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-1 transition duration-300">
            <div className="bg-gray-100 rounded-xl aspect-[1.5] mb-6 overflow-hidden"><img src="https://picsum.photos/300/200?random=8" className="w-full h-full object-cover" /></div>
            <h3 className="font-bold text-lg mb-2">Sketch 101</h3>
            <p className="text-sm text-sketch-gray mb-4">Our free beginners' course is everything you need to get started. Get comfortable...</p>
            <a href="#page=18-sketch-101" className="font-bold text-sm text-black hover:underline">Check out Sketch 101 for free →</a>
          </div>
          <div className="text-left bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:-translate-y-1 transition duration-300">
            <div className="bg-gray-100 rounded-xl aspect-[1.5] mb-6 overflow-hidden"><img src="https://picsum.photos/300/200?random=9" className="w-full h-full object-cover" /></div>
            <h3 className="font-bold text-lg mb-2">Stay updated</h3>
            <p className="text-sm text-sketch-gray mb-4">Our blog is a fantastic place to keep up to date with insights, inspirations...</p>
            <a href="#" className="font-bold text-sm text-black hover:underline">Check our blog →</a>
          </div>
        </div>
      </section>

      <Pricing />
      <FooterCTA />
      <Footer />
    </div>
  );
}
