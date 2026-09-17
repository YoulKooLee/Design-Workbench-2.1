/**
 * @name Sketch 对比 Figma
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
  <header className="absolute w-full z-50">
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
  <section className="relative pt-48 pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
    {/* Abstract background blobs */}
    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10 mix-blend-multiply opacity-70"></div>
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4 -z-10 mix-blend-multiply opacity-70"></div>
    
    <div className="absolute left-[10%] top-[30%] -z-10">
      <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl transform rotate-12 shadow-lg"></div>
    </div>
    <div className="absolute right-[15%] top-[20%] -z-10">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-lg"></div>
    </div>

    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
      Sketch <br/> <span className="text-2xl font-serif italic text-gray-500 font-medium inline-block mr-4 translate-y-[-24px]">vs.</span> Figma
    </h1>
    
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1D1C1B]">Sketch is more than just a Mac app</h2>
      <p className="text-lg text-sketch-gray leading-relaxed">
        We're the original design alternative. Yes — we built the best native Mac app for designers. But we didn't stop there. With web-based tools for sharing work, getting feedback, testing prototypes and handing off to developers in any browser, we're a platform for the entire design process — and we're still independent.
      </p>
      <p className="font-bold text-lg text-black mt-8">
        Try Sketch today, you'll feel the difference.
      </p>
      <div className="mt-8">
        <a href="#page=12-pricing" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">Get started for free</a>
      </div>
    </div>
  </section>
);

const ComparisonTable = () => {
  const Check = () => <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold leading-none">✓</span>;
  const Cross = () => <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold leading-none">×</span>;
  
  const features = [
    { name: 'Real-time collaboration', sketch: true, figma: true },
    { name: 'Shareable prototype links', sketch: true, figma: true },
    { name: 'Developer handoff', sketch: true, figma: true },
    { name: 'Includes a powerful native Mac app', sketch: true, figma: false },
    { name: 'Full offline workflow', sketch: true, figma: false },
    { name: 'User control over who sees your work', sketch: true, figma: false },
    { name: 'Strict override control for Design Systems', sketch: true, figma: false },
    { name: 'Open file format', sketch: true, figma: false },
    { name: 'Advanced color management', sketch: true, figma: false },
    { name: 'Work with local documents', sketch: true, figma: false },
    { name: 'Artboard Templates', sketch: true, figma: false },
    { name: 'No document size limit (via RAM usage limit)', sketch: true, figma: false },
    { name: 'Billing with no surprises', sketch: true, figma: false },
    { name: 'The complete platform for only $9/month', sketch: true, figma: false },
    { name: 'No credit card required for full featured free trial', sketch: true, figma: false },
    { name: 'Independent', sketch: true, figma: false },
  ];

  return (
    <section className="py-24 px-6 border-t border-gray-100 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
      <div className="lg:w-1/3 sticky top-32">
        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-16">
          How does<br/>Sketch compare<br/>with Figma?
        </h2>
        {/* Abstract 3D shape illustration representation */}
        <div className="w-64 h-64 bg-gradient-to-tr from-[#A6D6C6] to-[#DBEAD1] transform rotate-12 mx-auto relative hidden md:block">
           <div className="absolute inset-0 bg-white shadow-xl transform -translate-x-4 translate-y-4"></div>
           <div className="absolute right-0 bottom-0 w-32 h-32 bg-yellow-200"></div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-4 pb-4 border-b border-gray-200 text-xs font-bold tracking-wider text-gray-400 uppercase">
          <div>Feature</div>
          <div className="w-16 text-center">Sketch</div>
          <div className="w-16 text-center">Figma</div>
        </div>
        {features.map((f, i) => (
          <div key={i} className={`grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-4 py-4 items-center ${i !== features.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="font-semibold text-[15px]">{f.name}</div>
            <div className="w-16 flex justify-center">{f.sketch ? <Check /> : <Cross />}</div>
            <div className="w-16 flex justify-center">{f.figma ? <Check /> : <Cross />}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ArticleSection = ({ num, color, bgStripe, title, content, isReversed, asideImage }) => (
  <section className="relative py-24 flex items-center min-h-[500px]">
    {/* Colorful side stripe */}
    <div className={`absolute top-0 bottom-0 ${bgStripe} ${isReversed ? 'right-0 w-1/4' : 'left-0 w-1/4 lg:w-[15%]'} -z-10 opacity-30`}></div>
    
    <div className={`max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row ${isReversed ? 'flex-row-reverse' : ''} gap-16 lg:gap-32 relative z-10`}>
      <div className="md:w-5/12 flex flex-col justify-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-6 ${color}`}>
          {num}
        </div>
        <h3 className="text-3xl md:text-4xl font-black leading-tight mb-2">
          {title}
        </h3>
      </div>
      <div className="md:w-7/12 text-sketch-gray text-lg leading-relaxed flex flex-col justify-center">
        {content}
      </div>
    </div>
  </section>
);

const QuotesBlock = ({ text, author, role }) => (
  <section className="py-24 px-6 text-center max-w-4xl mx-auto">
    <p className="text-2xl md:text-3xl font-bold leading-tight mb-8">
      "{text}"
    </p>
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-gray-200 rounded-full mb-3 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${author}`} alt={author} /></div>
      <div className="text-sm font-bold text-black">{author}</div>
      <div className="text-xs text-gray-500">{role}</div>
    </div>
  </section>
);


const Details = () => (
  <>
    <ArticleSection
      num="1" color="bg-[#A4CE4A]" bgStripe="bg-[#E4F5D4]"
      title="Can Sketch do real-time collaboration?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#A4CE4A]">Yes! Figma says it's not possible. We say that real-time design collaboration is for native apps, too.</strong></p>
          <p className="mb-6">Sketch subscriptions come with a shared Workspace, so your team can do everything from designing seamlessly side-by-side in the same space to sharing documents with version histories (with unique links for each and every version).</p>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex-shrink-0 bg-gradient-to-br from-pink-300 to-red-400"></div>
            <div>
              <p className="font-bold text-sm text-black mb-1">Behind the scenes: How we added real-time collaboration to a native Mac app →</p>
            </div>
          </div>
        </>
      }
    />
    <ArticleSection
      num="2" color="bg-[#6BB7C3]" bgStripe="bg-[#DFF1F4]"
      title="Native app or web app? How do I choose?"
      content={
        <>
          <p className="mb-8"><strong>Truly native</strong><br/>Our native app for designers offers great features that web-based electron apps, like Figma, simply can't. That means super-fast performance on Apple silicon, native font rendering and P3 color profiles.</p>
          <p><strong>With the power of the browser</strong><br/>Share your designs with our powerful web app. Invite collaborators to your documents, then give and get feedback in any browser, on any operating system. Developers, project managers and other team members get the tools they need. A focused environment for every stakeholder means Sketch is easier to learn and easier to use, with less distractions. Keep your workflow simple.</p>
        </>
      }
    />
    <ArticleSection
      num="3" color="bg-[#9F6EB2]" bgStripe="bg-[#EAE1EE]"
      title="On or offline? Either's fine."
      content={
        <>
          <p className="mb-6">Sketch doesn't force you to have an internet connection to do your design work.</p>
          <p className="mb-6"><strong>The freedom to work online and offline in our Mac app is right here. Grab it!</strong></p>
          <p className="mb-6">You can create new documents, keep existing projects moving and even access Libraries.</p>
          <p>You have the freedom to design at any time. Whether you're going through a tunnel, a power surge, or a detox from the newsfeed, Sketch still works.</p>
        </>
      }
    />
    <ArticleSection
      num="4" color="bg-[#EE834E]" bgStripe="bg-[#FDEBE1]"
      title="Why does the Sketch UI feel so good?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#EE834E]">Our processes</strong> just make sense so you can do better work, and do it faster.</p>
          <p className="mb-6">The fact is, you won't find a UI this intuitive to Mac users anywhere else. Apple set the standard for what great creative software should be — and our goal with Sketch was to make a design app as easy to use as Keynote.</p>
          <p className="mb-6"><strong>You can say goodbye to Figma's unfamiliar UI and head scratching moments. Like <u>this</u>, <u>this</u> and <u>this</u>.</strong></p>
          <p>Our Mac app makes perfect sense, so you can spend more time on Bezier curves, and less time on learning curves.</p>
        </>
      }
    />
    
    <QuotesBlock 
      text="Sketch delivers the smoothest user experience of any UI tool on the market today." 
      author="Daniel Schwarz" role="Creative Bloq" 
    />

    <ArticleSection
      num="5" color="bg-[#EFB034]" bgStripe="bg-[#FCF4E2]"
      title="Control your workflow (and who's watching)"
      content={
        <>
          <p className="mb-6"><strong className="text-[#EFB034]">Trust</strong> is an integral part of the design process. You should feel empowered from the start of your project to the final product.</p>
          <p>Take control over who can follow you around in a collaborative document, when you share your work, and even whether you're on or offline to begin with.</p>
        </>
      }
    />
    
    <ArticleSection
      num="6" color="bg-[#8F8D84]" bgStripe="bg-[#F1F0ED]"
      title="Are colors true-to-life in Sketch?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#8F8D84]">They sure are.</strong> Figma forces your assets to be exported using a single color profile, or to go completely unmanaged. If you're using Figma in the browser, you don't have the option to change the color profile at all. This means that your end-users might see something different to what you've designed.</p>
          <p className="mb-6">Whatever you do, don't let your designs down with a limited and inaccurate color gamut.</p>
          <p className="mb-6">With Sketch, you can <strong>assign P3 or sRGB color profiles to all of your assets and documents.</strong></p>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-400 to-red-400 rounded-full flex-shrink-0"></div>
            <p className="font-bold text-sm text-black hover:underline cursor-pointer">Industry: What are color profiles? And why do they matter? →</p>
          </div>
        </>
      }
    />

    <ArticleSection
      num="7" color="bg-[#A4CE4A]" bgStripe="bg-[#E4F5D4]"
      title="Do my clients and developers really need a Mac app to work with Sketch?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#A4CE4A]">No! That's the power of our web app.</strong></p>
          <p className="mb-6"><strong>People that aren't designing simply don't need to be distracted by design tools.</strong></p>
          <p className="mb-6">What they do need, is to inspect designs, give feedback, and be able to test prototypes.</p>
          <p>Invite clients, managers and developers to do all of the above on any operating system, in any browser, with our web app. Better still, you can invite them all for free.</p>
        </>
      }
    />

    <QuotesBlock 
      text="Sketch's Libraries, compatibility with industry tools, and community of plugins let our team build and scale a design system across multiple brands and platforms — which gives our users a better, more cohesive experience." 
      author="Luca Reger" role="Senior Software Engineer & Designer — Xbox R&D" 
    />
    
    <ArticleSection
      num="8" color="bg-[#6BB7C3]" bgStripe="bg-[#DFF1F4]"
      title="Why are Sketch's Symbols so powerful?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#6BB7C3]">Make handoff a breeze</strong> with Symbols that match the components developers work with. Having a single source of truth for your elements isn't only great for designing, it makes developers' lives easier too.</p>
          <p className="mb-6">You need to be able to control which parts of a Symbol designers can change, and which parts stay consistent. Only Sketch gives you that level of control.</p>
          <p className="mb-6"><strong>Make Symbols work for your design system and developers</strong></p>
          <p>That means causing less feedback and fewer questions, resulting in more time saved for everybody.</p>
        </>
      }
    />
    
     <ArticleSection
      num="9" color="bg-[#9F6EB2]" bgStripe="bg-[#EAE1EE]"
      title="What makes Sketch's Design System control so robust?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#9F6EB2]">Some rules</strong> are made to be broken, but which rules everyone follows should be in your control. Symbol override controls make Sketch stand out with full control over when designers can (and can't) deviate from your established Design Systems.</p>
          <p className="mb-6"><strong>Manage overrides</strong><br/>Always maintain consistent styles across your designs by deciding which aspects of your Symbols can be overridden by you and your collaborators, and which ones can't.</p>
          <p className="mb-6">If you want to allow free rein to change everything, that's an option too. The choice is yours!</p>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex-shrink-0"></div>
            <p className="font-bold text-sm text-black hover:underline cursor-pointer">Sketch Tutorials: How to organize your Symbols and manage overrides →</p>
          </div>
        </>
      }
    />

    <ArticleSection
      num="10" color="bg-[#EE834E]" bgStripe="bg-[#FDEBE1]"
      title="Do I need plugins for prototyping or developer handoff in Sketch?"
      content={
        <>
          <p className="mb-6"><strong className="text-[#EE834E]">No, you don't need plugins.</strong> Sketch comes with design, collaboration, prototyping and developer handoff straight out of the box. It's like getting InVision, Zeplin and Abstract bundled into one tool — with all the powerful editing functionality you know and love.</p>
          <p className="mb-6"><strong>It's time to wake up from platform fatigue, all the tools are here.</strong></p>
          <p className="mb-2"><strong>Built-in prototyping</strong><br/>Create prototypes right inside the Mac app and share a link for anyone to test them out, in any web browser, without plugins.</p>
           <div className="flex gap-4 items-center mb-6">
            <div className="w-8 h-8 bg-blue-300 rounded-lg flex-shrink-0"></div>
            <p className="font-bold text-sm text-black hover:underline cursor-pointer">Sketch Tutorials: How to get started with UX prototyping →</p>
          </div>
          <p className="mb-2"><strong>Easy developer handoff</strong><br/>Developers can inspect your designs and download ready-to-go assets from any browser — for free. All you need to do is share.</p>
          <div className="flex gap-4 items-center mb-6">
            <div className="w-8 h-8 bg-green-300 rounded-lg flex-shrink-0"></div>
            <p className="font-bold text-sm text-black hover:underline cursor-pointer">Community: How to set up your design process for smooth developer handoff in Sketch →</p>
          </div>
        </>
      }
    />

    <ArticleSection
      num="11" color="bg-[#EFB034]" bgStripe="bg-[#FCF4E2]"
      title="Futureproof your design process"
      content={
        <>
          <p className="mb-6"><strong className="text-[#EFB034]">Sketch</strong> was once a humble vector drawing application. Now, it's the all-in-one platform for design, collaboration, prototyping and developer handoff.</p>
          <p>As you can see, constant improvement is in our DNA, and we're just getting started.</p>
        </>
      }
    />

    <QuotesBlock 
      text="Sketch shined a light on UX design." 
      author="Figma" role="" 
    />
  </>
);

const Testimonials = () => (
  <section className="py-24 bg-gray-50 border-t border-gray-100">
    <div className="text-center max-w-2xl mx-auto px-6 mb-16">
      <h2 className="text-4xl md:text-5xl font-black mb-6">What people are saying</h2>
      <p className="text-lg text-sketch-gray">
        Some of the most successful product teams in the world use Sketch every day. It's also used by hundreds of thousands of talented individuals, like you. Here's what people have to say:
      </p>
    </div>
    
    <div className="max-w-[1400px] mx-auto px-8 columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
      {/* Testimonial Card 1 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div><p className="font-bold text-sm">Gary</p><p className="text-xs text-gray-500">@gary</p></div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">After trialling Figma for a while I have concluded it is a collaboration tool with design built in and sketch is a design tool first, with collaboration built in. Figma allows admin to "spy" on designers time. Sketch conscious choice to omit this "feature"</p>
      </div>
      {/* Testimonial Card 2 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div><p className="font-bold text-sm">Aaron Benjamin</p><p className="text-xs text-gray-500">@aaron</p></div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">The number of plugins Figma needs to match the most basic capabilities of Sketch is just silly. I just want to draw/color nice looking rectangles y'all. Why is it so hard?</p>
      </div>
      {/* Testimonial Card 3 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div><p className="font-bold text-sm">Richard Oliver Bray</p><p className="text-xs text-gray-500">@robray</p></div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">Really like what Sketch are doing with colour tokens. Don't think I've seen anything like it before. Thanks for showing it off.</p>
      </div>
      {/* Testimonial Card 4 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div><p className="font-bold text-sm">Abdul-Rahman</p><p className="text-xs text-gray-500">@abdul</p></div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">So people hate me for saying this but sketch {'>'} Figma. Although they both do &similar things. Yup wire framing, designing and prototyping. For me I find Sketch more intuitive to use, I also think there are small features that help me build faster.</p>
      </div>
      {/* Testimonial Card 5 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm break-inside-avoid">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div><p className="font-bold text-sm">Gavin Nelson</p><p className="text-xs text-gray-500">@gavin</p></div>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed mb-4">I like Sketch a lot better for icon design currently.<br/> a few reasons:<br/>- better vector editing<br/>- much better inspector for layer styles<br/>- color management</p>
      </div>
    </div>
  </section>
);

const FooterCTA = () => (
  <section className="py-24 px-4 bg-white text-center">
    <div className="bg-gradient-to-r from-[#B9EA38] to-[#92DC7E] rounded-[3rem] py-24 px-8 max-w-5xl mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-900 opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-5xl font-black mb-8 leading-tight text-gray-900">Ready to join thousands of design teams across the globe?</h2>
        <p className="text-xl font-medium text-gray-800 mb-10">Try Sketch today, for free.</p>
        <a href="#" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg tracking-wide shadow-xl">Let's go!</a>
      </div>
    </div>
  </section>
);

const FAQSupport = () => (
   <section className="py-20 text-center border-t border-gray-100">
     <h2 className="text-2xl font-bold mb-4">Any further questions?</h2>
     <p className="text-gray-500 mb-6 text-sm">If you have any further questions or need any more information on Sketch, don't be a stranger! Ask away.</p>
     <a href="#" className="font-bold text-sm border-b border-black hover:text-sketch-orange hover:border-sketch-orange transition pb-0.5">Contact us</a>
   </section>
)

const Footer = () => (
  <footer className="border-t border-gray-200 pt-16 pb-8">
    {/* Copied structurally from previous page to maintain global consistency */}
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
          <li><a href="#page=07-whats-new">What's New</a></li>
          <li><a href="#page=08-design-collaborate">Design</a></li>
          <li><a href="#page=10-collaborative-design">Collaboration</a></li>
          <li><a href="#page=05-prototyping-tools">Prototyping</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Why Sketch</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=01-switch-to-sketch">Switch to Sketch</a></li>
          <li><a href="#page=02-sketch-vs-figma">Sketch vs. Figma</a></li>
          <li><a href="#page=02-sketch-vs-figma">Sketch vs. Adobe XD</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Company</h4>
        <ul className="space-y-3 text-sm font-medium text-sketch-gray">
          <li><a href="#page=19-about-us">About Us</a></li>
          <li><a href="#page=17-careers">Careers</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default function SketchVsFigma() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-yellow-200">
      <Nav />
      <Hero />
      <ComparisonTable />
      <Details />
      <Testimonials />
      <FooterCTA />
      <FAQSupport />
      <Footer />
    </div>
  );
}
