/**
 * @name The best platform for digital product design
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
    <div className="bg-transparent border-b border-gray-900/10 px-6 py-4 flex items-center justify-between sticky top-0">
      <div className="flex items-center space-x-8">
        <Logo />
        <nav className="hidden md:flex space-x-6 text-sm font-semibold text-black">
          <a href="#page=03-best-platform" className="hover:text-amber-600 transition">Product v</a>
          <a href="#" className="hover:text-amber-600 transition">Learn v</a>
          <a href="#page=14-apps" className="hover:text-amber-600 transition">Apps</a>
          <a href="#page=12-pricing" className="hover:text-amber-600 transition">Pricing</a>
          <a href="#" className="hover:text-amber-600 transition">Why Sketch v</a>
        </nav>
      </div>
      <div className="flex items-center space-x-6 text-sm font-semibold text-black">
        <a href="#page=22-support" className="hover:text-amber-600 transition hidden md:block">Support v</a>
        <a href="#page=12-pricing" className="hover:text-amber-600 transition">Sign In</a>
        <a href="#page=12-pricing" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">Get started for free</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative pt-40 pb-48 px-6 overflow-hidden bg-gradient-to-br from-[#FFE3D6] via-[#FFD4A2] to-[#FFE2AD]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row relative z-10">
      <div className="md:w-1/2">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6">
          Make<br/>something great
        </h1>
        <p className="text-xl text-[#1D1C1B] max-w-md mb-10 font-medium">
          Do your best work with a powerful macOS app packed with all the tools you need for a truly collaborative design process.
        </p>
        <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">Get started for free</a>
      </div>
      
      {/* Abstract Cursor Graphic */}
      <div className="hidden md:block absolute top-[10%] right-[10%] scale-150 rotate-[-15deg] pointer-events-none">
        <svg width="240" height="240" viewBox="0 0 100 100" fill="none">
          <path d="M30 10 L80 60 L60 65 L75 90 L60 100 L45 75 L25 90 Z" fill="#1D1C1B" stroke="#FFF" strokeWidth="2" />
        </svg>
      </div>
    </div>
  </section>
);

const FlexibleDesign = () => (
  <section className="relative bg-gradient-to-b from-white to-[#F2FCDA] py-32 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 mb-16 relative z-10 text-center md:text-left">
      <h2 className="text-5xl font-black mb-6">Flexible design</h2>
      <p className="text-xl text-sketch-gray max-w-xl">
        Pushing your boundaries means bending without breaking. To apply that to your work you need a robust set of design tools. Sketch has your whole design process covered, from canvas to code.
      </p>
    </div>
    
    <div className="flex flex-col xl:flex-row max-w-[1400px] mx-auto px-6 relative z-10 gap-16">
      {/* Huge Screenshot placeholder */}
      <div className="xl:w-2/3">
        <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[16/10]">
          <img src="https://picsum.photos/1200/800?random=11" alt="App interface" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Features list */}
      <div className="xl:w-1/3 space-y-12 flex flex-col justify-center">
        <div>
          <h3 className="text-xl font-bold mb-3">Landmark vector editing</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Sketch started life as a revolutionary vector editing tool. Those tools for editing vectors and boolean operations are more intuitive and flexible than ever thanks to features like shorthand math operators and easy editing for multiple borders. Iterate on your work with ease at any stage of the design process.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">A Canvas without limits</h3>
          <p className="text-sm text-gray-500 leading-relaxed">When your Canvas is infinite, so are the possibilities. Especially with simple resizing tools to fit any screen size. Don't worry about blank page syndrome here though, flexible Artboards and <u className="font-semibold cursor-pointer">Templates</u> give you great foundations to stay organized and find your flow.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Variable and OpenType fonts</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Make typography follow your instructions to the letter with variable fonts and RTL support, and unlock alternate characters, ligatures and more with full support for OpenType features.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Design System control</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Build a Design System that works for you with Symbols, Colors and Styles. Then manage, browse and organize everything in one place with <u className="font-semibold cursor-pointer">Components View</u>. Inserting is super-fast too, thanks to searchable menus and a dedicated Insert Window.</p>
        </div>
      </div>
    </div>
  </section>
);

const ConsistentDesign = () => (
  <section className="relative overflow-hidden py-32 bg-gradient-to-br from-[#F5EEFA] via-[#DEACE6] to-[#AD22CC]">
    <div className="max-w-4xl mx-auto px-6 mb-20 relative z-10 text-center">
      <h2 className="text-5xl font-black mb-6">Consistent design</h2>
      <p className="text-xl text-black font-medium">
        Projects move fast. Deadlines exist. Time is precious. Cut out unnecessary legwork and deliver quality without setbacks.
      </p>
    </div>
    
    {/* Central Huge Screenshot */}
    <div className="max-w-6xl mx-auto px-6 relative z-10 mb-20">
      <div className="w-full bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 aspect-[16/9]">
        <img src="https://picsum.photos/1200/800?random=12" alt="Dark mode interface" className="w-full h-full object-cover opacity-90 mix-blend-luminosity" />
      </div>
    </div>

    {/* Abstract 3D elements (A, ⬟, cube) scattered */}
    <div className="absolute left-[10%] bottom-[15%] text-6xl font-black text-white/50 transform -rotate-12 blur-[1px]">Ag</div>
    <div className="absolute right-[5%] top-[40%] text-6xl text-purple-200 transform rotate-45 blur-sm opacity-50">✦</div>
    
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 relative z-10">
      <div>
        <h3 className="text-xl font-bold mb-3 text-black">Start with Artboard Templates</h3>
        <p className="text-sm text-gray-800 leading-relaxed font-medium">Don't redesign the wheel. Turn any Artboard — and its content — into a template and reuse it across your documents. Include your <u className="font-bold">Artboard Templates</u> as part of a <u className="font-bold">Library</u> to make them available for other documents.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3 text-black">Set the bar with Symbols</h3>
        <p className="text-sm text-gray-800 leading-relaxed font-medium">With responsive Symbols, create a component once, reuse it anywhere, and update every instance simultaneously. Symbols can even automatically resize to fit their content with <u className="font-bold">Smart Layout</u>, keeping the spacing of the layers in your Symbols intact.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3 text-black">Stay in sync with Styles</h3>
        <p className="text-sm text-gray-800 leading-relaxed font-medium">Define Color Variables, Text and Layer Styles that work for you. Then use, reuse and update them across your designs. With Color Tokens you can even export, integrate and sync Color Variables to development projects.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3 text-black">Test fast with Prototypes</h3>
        <p className="text-sm text-gray-800 leading-relaxed font-medium">Build user journeys in no time at all with <u className="font-bold">Prototyping tools</u> built for speed. Reusable UI elements, powerful <u className="font-bold">Overlays</u> and a dedicated Prototyping UI means you can bring life to your ideas and share them with the world — quickly.</p>
      </div>
    </div>
  </section>
);

const NativeToMacos = () => {
  const checkList = [
    'Dark and light user interfaces',
    'Full support for Retina and non-Retina displays',
    'Touch Bar support',
    'Seamless drag and drop from app to app',
    'Local document versioning',
    'Super fast performance on Apple silicon',
    'Work locally and offline, any time',
    'Built-in spellcheck and RTL support',
    'Customizable toolbar and shortcuts',
    'Native font rendering and emoji support'
  ];

  return (
    <section className="bg-[#1D1C1B] text-white overflow-hidden py-32">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Native to macOS</h2>
          <p className="text-lg text-gray-400 mb-10">
            Sketch feels right at home on the Mac. No compromises. With a UI that'll feel instantly familiar if you've used any native macOS app, you can take full advantage of things like:
          </p>
          <ul className="space-y-4">
            {checkList.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-green-400 shrink-0 font-bold">✓</span>
                <span className="text-sm text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-2/3">
          <div className="w-full bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl border border-gray-700 ml-0 lg:ml-12 aspect-[16/10]">
            <img src="https://picsum.photos/1000/700?random=13" alt="Native macOS Dark Mode" className="w-full h-full object-cover mix-blend-lighten" />
          </div>
        </div>
      </div>
    </section>
  );
};

const DesignGrows = () => (
  <section className="py-32 overflow-hidden bg-white">
    <div className="text-center max-w-3xl mx-auto px-6 mb-20">
      <h2 className="text-4xl md:text-5xl font-black mb-6">Design that grows<br/>with you</h2>
      <p className="text-lg text-sketch-gray">
        As a designer, you're always evolving. Use tools that allow your work and workflow to evolve with you. With Sketch your documents are futureproofed for any eventuality — be that style changes, team changes, or even software changes.
      </p>
    </div>

    <div className="flex flex-col xl:flex-row max-w-[1400px] mx-auto px-6 relative z-10 gap-16 items-center">
      <div className="xl:w-3/5">
        <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-square md:aspect-[4/3]">
           {/* Focus on small centered modal graphic */}
          <img src="https://picsum.photos/1000/800?random=14" alt="Inspector panel" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="xl:w-2/5 space-y-10">
        <div>
          <h3 className="text-xl font-bold mb-3">Build reliable Libraries</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Create Libraries of your Symbols, Text Styles, Layer Styles, and Color Variables. Share them across documents and with collaborators automatically, and push updates that keep everyone in sync as your Design System evolves.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Design together</h3>
          <p className="text-sm text-gray-500 leading-relaxed">With <u className="font-semibold cursor-pointer">real-time collaboration</u> in the Mac app, and a set of cross-platform tools for feedback, sharing and <u className="font-semibold cursor-pointer">developer handoff in the browser</u>, you can keep everyone on the same page (literally).</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Take your files anywhere</h3>
          <p className="text-sm text-gray-500 leading-relaxed">With Sketch, you own everything you create. It's up to you what happens with your documents, because <u className="font-semibold cursor-pointer">our file format is completely open</u> so third-party tools can read and modify it. You can even automate actions in your Sketch documents without plugins — without Sketch, even.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Online or offline</h3>
          <p className="text-sm text-gray-500 leading-relaxed">Sketch doesn't force you to have an internet connection to do your design work. Create new documents, keep existing projects moving and even access Libraries at any time. Whether you're going through a tunnel, a power surge, or a detox from the newsfeed, Sketch still works.</p>
        </div>
      </div>
    </div>
  </section>
);

const Plugins = () => {
  const pluginsData = [
    { name: 'Cluse', desc: 'Check color contrast for web accessibility based on WCAG 2.0. Fitting seamlessly into your team\'s workflow, Cluse allows you to remotely change your design and see the updated WCAG score live.', by: 'Yana Gevorgyan', iconColor: 'bg-blue-600' },
    { name: 'Pexels', desc: 'Quickly and easily add stunning images from creators around the world, directly to your Sketch designs.', by: 'Pexels', iconColor: 'bg-teal-600' },
    { name: 'Chart', desc: 'Create charts with random, tabular or JSON data inside Sketch. Customize visual representation of your charts and change data in seconds.', by: 'Pavel Kuligin', iconColor: 'bg-pink-500' },
    { name: 'Overflow', desc: 'Sync and convert your Artboards into screens in Overflow and turn your designs into playable user flow diagrams.', by: 'proto.io', iconColor: 'bg-blue-400' },
    { name: 'Plant', desc: 'Invite your team members to collaborate and version control your design projects with a tool that\'s seamlessly integrated into Sketch.', by: 'Plant', iconColor: 'bg-green-500' },
    { name: 'Crowdin', desc: 'Preview and customize localized copy in your Sketch documents, then hand them off to developers, with the help of Crowdin\'s platform.', by: 'Crowdin', iconColor: 'bg-indigo-900' },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 border-t border-gray-100">
      <div className="lg:w-1/3">
        <h2 className="text-4xl md:text-5xl font-black mb-6">Make Sketch your<br/>own</h2>
        <p className="text-lg text-sketch-gray mb-8">
          Choose from <u className="font-semibold cursor-pointer">hundreds of plugins, Assistants and integrations</u> that let you do everything from improving the accessibility of your designs to animating interactions. Can't find exactly what you need? Our open file system means it's easy to build your own extensions.
        </p>
        <a href="#page=20-plugins" className="font-bold text-sm text-black hover:text-sketch-orange transition">Browse 700+ extensions →</a>
      </div>
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
        {pluginsData.map((p, i) => (
          <div key={i} className="flex gap-4">
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xl font-bold ${p.iconColor}`}>
              {p.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{p.desc}</p>
              <div className="inline-block bg-gray-100 text-[10px] text-gray-500 px-2 py-1 rounded font-medium">
                Plugin <span className="opacity-50 mx-1">by</span> {p.by}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhatsNew = () => (
  <section className="py-24 text-center border-t border-gray-100 bg-gray-50/50">
    <h2 className="text-4xl font-black mb-4">What's new?</h2>
    <p className="text-sketch-gray mb-16">We're always improving things around here. Here's what<br/>we've been up to recently:</p>
    
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto px-6 justify-center">
      <div className="bg-gray-100/50 hover:bg-gray-100 transition cursor-pointer p-12 rounded-3xl flex-1 flex flex-col items-center justify-center min-h-[250px] border border-gray-100 shadow-sm">
        <div className="w-12 h-12 mb-6">
          {/* Mockup icon */}
          <div className="w-full h-full bg-purple-200 rounded border border-purple-300"></div>
        </div>
        <p className="font-bold text-sm">Duplicate Documents →</p>
      </div>
      <div className="bg-gray-100/50 hover:bg-gray-100 transition cursor-pointer p-12 rounded-3xl flex-1 flex flex-col items-center justify-center min-h-[250px] border border-gray-100 shadow-sm">
        <div className="w-12 h-12 mb-6">
          {/* Mockup icon */}
          <div className="w-full h-full bg-teal-200 rounded border border-teal-300"></div>
        </div>
        <p className="font-bold text-sm">Artboard Templates →</p>
      </div>
    </div>
  </section>
);

const FooterCTA = () => (
  <section className="py-24 px-4 bg-white text-center border-b border-gray-100">
    <div className="bg-gradient-to-br from-[#A6E63F] to-[#51CB6F] rounded-[3rem] p-16 max-w-5xl mx-auto flex flex-col text-left relative overflow-hidden">
      {/* Background poly block */}
      <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-black/5 clip-path-polygon"></div>
      
      <div className="relative z-10 max-w-md">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-black">Start your<br/>Sketch journey</h2>
        <p className="text-lg font-medium text-black/80 mb-10">Whether you're new to Sketch, or back to see what's new, we'll have you set up and ready to do your best work in minutes.</p>
        <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">Get started for free</a>
      </div>
    </div>
  </section>
);

const QuotesBlockEnd = () => (
   <section className="py-32 px-6 text-center max-w-3xl mx-auto">
     <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 flex justify-center -space-x-4">
        <img src={`https://i.pravatar.cc/150?u=1`} className="w-12 h-12 rounded-full border-2 border-white relative z-10" />
        <img src={`https://i.pravatar.cc/150?u=2`} className="w-12 h-12 rounded-full border-2 border-white" />
     </div>
     <p className="text-2xl font-bold leading-tight mb-8">
       "We use Sketch across multiple products, with multiple UI/UX designers and also graphic designers. Everything from landing pages to full-blown websites. We love how easy it is to scale graphics."
     </p>
     <div className="text-sm font-bold text-black">Roberta Galea</div>
     <div className="text-xs text-gray-500">Head of Design, <u className="cursor-pointer">Catania Media</u></div>
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
          <button className="bg-gray-400 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-500">Try it out</button>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4">Product</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=07-whats-new">What's New <span className="bg-gray-100 text-[10px] ml-1 px-1 rounded">NEW</span></a></li>
          <li><a href="#page=08-design-collaborate">Design</a></li>
          <li><a href="#page=10-collaborative-design">Collaboration</a></li>
          <li><a href="#page=05-prototyping-tools">Prototyping</a></li>
          <li><a href="#page=04-developer-handoff">Developer Handoff</a></li>
          <li><a href="#page=09-workspace">Workspaces</a></li>
          <li><a href="#page=21-sketch2react" className="hover:text-black transition">Sketch2React</a></li>
          <li><a href="#page=24-discover" className="hover:text-black transition">Discover</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Why Sketch</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=01-switch-to-sketch">Switch to Sketch <span className="bg-gray-100 text-[10px] ml-1 px-1 rounded">NEW</span></a></li>
          <li><a href="#page=02-sketch-vs-figma">Sketch vs. Figma</a></li>
          <li><a href="#page=02-sketch-vs-figma">Sketch vs. Adobe XD</a></li>
          <li><a href="#page=16-education">Free for Education</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Learn</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=06-blog">Blog</a></li>
          <li><a href="#page=18-sketch-101">Course: Sketch 101</a></li>
          <li><a href="#page=13-documentation">Documentation</a></li>
          <li><a href="#page=11-community">Events & Meetups</a></li>
          <li><a href="#page=25-newsletter">Newsletter</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 border-t border-gray-100 pt-8 flexjustify-between items-center text-xs text-sketch-gray font-medium">
      <div className="text-center w-full">
         <p>© 2026 Sketch B.V.</p>
      </div>
    </div>
  </footer>
);

export default function P03BestPlatform() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-yellow-200 text-[#1D1C1B]">
      <Nav />
      <Hero />
      <FlexibleDesign />
      <ConsistentDesign />
      <NativeToMacos />
      <DesignGrows />
      <Plugins />
      <WhatsNew />
      <FooterCTA />
      <QuotesBlockEnd />
      <Footer />
    </div>
  );
}
