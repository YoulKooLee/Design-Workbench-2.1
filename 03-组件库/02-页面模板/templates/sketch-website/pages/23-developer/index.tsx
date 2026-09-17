/**
 * @name Developer
 */
import React from 'react';
import './style.css';

// Special Developer Yellow Logo
const DevLogo = () => (
   <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M16 2L2 10L16 30L30 10L16 2Z" fill="#F5A623"/>
     <path d="M16 2L9 10L16 30L16 2Z" fill="#F8B62C"/>
     <path d="M16 2L23 10L16 30L16 2Z" fill="#F39C12"/>
     <path d="M2 10L9 10L16 30L2 10Z" fill="#F8B62C"/>
     <path d="M30 10L23 10L16 30L30 10Z" fill="#F39C12"/>
     <path d="M9 10H23L16 2L9 10Z" fill="#FAD15F"/>
   </svg>
);

const DeveloperNav = () => (
   <header className="bg-[#111111] w-full z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
         <div className="flex items-center gap-2">
            <DevLogo />
            <span className="text-[18px] font-bold text-white tracking-tight">Developer</span>
         </div>
         <nav className="hidden lg:flex space-x-8 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
            <a href="#page=20-plugins" className="hover:text-white transition">Plugins</a>
            <a href="#" className="hover:text-white transition">Assistants</a>
            <a href="#" className="hover:text-white transition">CLI</a>
            <a href="#" className="hover:text-white transition">File Format</a>
            <a href="#" className="hover:text-white transition">Sketch.App</a>
            <a href="#" className="hover:text-white transition">API Reference</a>
         </nav>
      </div>
   </header>
);

const FakeMacMenu = () => (
   <div className="relative inline-block mt-4 mb-4 select-none">
      {/* Fake Top Bar Snippet */}
      <div className="flex bg-[#E5E5E5] text-black text-[13px] font-medium px-4 py-1.5 rounded-t-lg gap-4 shadow-sm border border-b-0 border-gray-200">
         <span className="opacity-50">Edit</span>
         <span className="bg-blue-600 text-white px-2 py-0.5 rounded-sm -mx-2 shadow-sm relative z-10">Plugins</span>
         <span className="opacity-50">View</span>
         <span className="opacity-50">Window</span>
         <span className="opacity-50">Help</span>
      </div>
      
      {/* Fake Dropdown Menu */}
      <div className="absolute top-[28px] left-[40px] w-[240px] bg-white/95 backdrop-blur-md border border-gray-200 rounded-md shadow-2xl z-20 py-1 flex flex-col text-[14px]">
         <div className="flex justify-between items-center px-4 py-1 bg-blue-600 text-white font-medium cursor-default">
            <span>Run Script...</span>
            <span className="opacity-80 text-[12px] tracking-widest">^⇧K</span>
         </div>
         <div className="flex justify-between items-center px-4 py-1 hover:bg-blue-600 hover:text-white text-gray-800 font-medium cursor-default group transition-colors duration-75">
            <span>Run Last Plugin...</span>
            <span className="opacity-50 group-hover:opacity-80 text-[12px] tracking-widest">^⇧R</span>
         </div>
         <div className="h-[1px] bg-gray-200 my-1 mx-4"></div>
         <div className="px-4 py-1 hover:bg-blue-600 hover:text-white text-gray-800 font-medium cursor-default transition-colors duration-75">Manage Plugins...</div>
         <div className="px-4 py-1 hover:bg-blue-600 hover:text-white text-gray-800 font-medium cursor-default transition-colors duration-75">Edit Plugins...</div>
      </div>
   </div>
);


const InlineCode = ({children}) => (
   <code className="bg-gray-100 text-[#E55A16] px-1.5 py-0.5 rounded text-[13px] font-mono border border-gray-200 mx-0.5">{children}</code>
);

export default function P23Developer() {
   return (
      <div className="min-h-screen bg-white font-sans selection:bg-purple-300 selection:text-black">
         <DeveloperNav />

         {/* Hero Section: Memphis Style */}
         <section className="relative w-full overflow-hidden bg-[#1D0F7B] flex flex-col items-center pt-24 pb-32 z-0" style={{background: 'linear-gradient(135deg, #100C7B 0%, #3F058F 50%, #7E01A4 100%)'}}>
            
            {/* Absolute Background Floating Shapes */}
            <div className="absolute inset-0 pointer-events-none z-0">
               {/* Top left orange triangle */}
               <svg className="absolute top-[10%] left-[10%] w-[100px] h-[100px] transform -rotate-[15deg]" viewBox="0 0 100 100"><polygon points="50,0 100,100 0,100" fill="#FC6820"/></svg>
               {/* Left purple slice */}
               <div className="absolute top-[30%] left-[-20px] w-24 h-48 bg-[#9333EA] rounded-r-[100px] transform -rotate-12"></div>
               {/* Left cyan pill */}
               <div className="absolute bottom-[25%] left-[8%] w-4 h-16 bg-[#1CD7D4] rounded-full transform rotate-[20deg]"></div>
               {/* Top right pink arc */}
               <svg className="absolute top-[15%] right-[15%] w-16 h-16 transform rotate-45" viewBox="0 0 100 100"><path d="M0,50 A50,50 0 0,1 100,50" fill="none" stroke="#F472B6" strokeWidth="20" strokeLinecap="round"/></svg>
               {/* Top center orange pill */}
               <div className="absolute top-[20%] right-[40%] w-3 h-12 bg-[#F5A623] rounded-full transform rotate-[45deg]"></div>
               {/* Right purple donut */}
               <div className="absolute top-[8%] right-[25%] w-16 h-16 rounded-full border-[12px] border-[#9333EA]"></div>
               {/* Right arch path */}
               <svg className="absolute top-[35%] right-[5%] w-24 h-24 transform -rotate-[30deg]" viewBox="0 0 100 100"><path d="M10,90 A40,40 0 0,1 90,90" fill="none" stroke="#FC6820" strokeWidth="15" strokeLinecap="round"/></svg>
               {/* Right orange slash */}
               <div className="absolute top-[45%] right-[15%] w-4 h-24 bg-[#FC6820] rounded-sm transform rotate-[30deg]"></div>
               {/* Bottom right blue half-circle */}
               <div className="absolute bottom-[30%] right-[-30px] w-32 h-64 bg-[#3B82F6] rounded-l-[150px] transform rotate-12"></div>
            </div>

            <div className="relative z-10 text-center max-w-[800px] px-6">
               <h1 className="text-[52px] md:text-[68px] font-black text-white leading-tight tracking-tight mb-6">
                  Build something beautiful
               </h1>
               <p className="text-[19px] md:text-[21px] font-medium text-white/80 leading-relaxed drop-shadow-sm">
                  We've laid the foundations so you can build on the platform that empowers over one million designers. Create plugins and integrations, read and write Sketch files directly in JSON or render Sketch documents using the command-line interface.
               </p>
            </div>

            {/* Giant Graphic Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-[1000px] px-6 w-full">
               
               {/* Plugins Card */}
               <div className="rounded-xl p-10 md:p-14 shadow-2xl flex flex-col justify-center min-h-[300px] transform hover:-translate-y-2 transition duration-300 cursor-pointer"
                    style={{background: 'linear-gradient(135deg, #FF894B 0%, #E33E43 100%)'}}>
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-xl">🔌</span>
                     </div>
                     <h2 className="text-[32px] font-black text-white">Plugins</h2>
                  </div>
                  <p className="text-[16px] text-white/90 font-medium leading-relaxed">
                     Extend and customize the functionality of Sketch using JavaScript or Objective-C. Modify the document using Sketch's APIs, add your own user interface, and integrate Sketch with your product or other applications.
                  </p>
               </div>

               {/* Assistants Card */}
               <div className="rounded-xl p-10 md:p-14 shadow-2xl flex flex-col justify-center min-h-[300px] transform hover:-translate-y-2 transition duration-300 cursor-pointer"
                    style={{background: 'linear-gradient(135deg, #D9A3FE 0%, #7B2EFE 100%)'}}>
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <span className="text-white text-xl drop-shadow">🛎</span>
                     </div>
                     <h2 className="text-[32px] font-black text-white">Assistants</h2>
                  </div>
                  <p className="text-[16px] text-white/90 font-medium leading-relaxed">
                     Bring consistency to your designs and reduce friction between team members with Assistants. Create your own, either by modifying existing Assistants or writing your own rule implementations in TypeScript.
                  </p>
               </div>
            </div>

            {/* 3 Column Links below Hero Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 max-w-[1000px] px-6 text-center text-white">
               
               <a href="#" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-[#FF7F00] rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition shadow-lg">
                     <span className="text-white font-serif font-black text-xl italic">S</span>
                  </div>
                  <h3 className="text-[20px] font-bold mb-2 flex items-center gap-2">Sketch File Format <span className="transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-white/70 font-medium leading-relaxed max-w-[240px]">Integrate Sketch into your workflows and server applications, on any platform.</p>
               </a>

               <a href="#" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition shadow-lg px-2">
                     <DevLogo />
                  </div>
                  <h3 className="text-[20px] font-bold mb-2 flex items-center gap-2">Sketch.app <span className="transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-white/70 font-medium leading-relaxed max-w-[260px]">Integrate Sketch into your workflows with the <span className="px-1.5 py-0.5 bg-white/20 rounded bg-blur">sketch://</span> URL scheme.</p>
               </a>

               <a href="#" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-[#2ECC71] rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition shadow-lg">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </div>
                  <h3 className="text-[20px] font-bold mb-2 flex items-center gap-2">Plugin API Reference <span className="transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-white/70 font-medium leading-relaxed max-w-[240px]">View the index of all classes and methods in the Sketch JavaScript API.</p>
               </a>

            </div>

         </section>


         {/* Getting Started Main Content */}
         <section className="bg-white py-24 px-6 max-w-[840px] mx-auto text-[#1D1C1B]">
            <h2 className="text-[40px] font-black text-center mb-16 tracking-tight">Getting started</h2>

            {/* Block 1 */}
            <div className="mb-16">
               <h3 className="text-[24px] font-bold mb-4">Run a script</h3>
               <p className="text-[15px] text-gray-700 leading-relaxed font-medium mb-6">
                  Try the Sketch JavaScript API now, directly within Sketch. The code below shows a message at the bottom of your Sketch Document window saying <em className="italic font-serif">Hello Sketch 👋</em>.
               </p>

               <div className="mb-10 pl-4 h-[180px]">
                  <FakeMacMenu />
               </div>

               <div className="space-y-4 text-[15px] font-medium text-gray-700 leading-relaxed">
                  <p>1. Open a new or existing file in Sketch</p>
                  <p>2. Select <em className="italic font-serif">Run Script...</em> from the <em className="italic font-serif">Plugins</em> menu or use the keyboard shortcut <InlineCode>control + shift + k</InlineCode> to bring up the code editor</p>
                  <p>3. Paste in the code below</p>
                  <p>4. Select <em className="italic font-serif">Run</em></p>
               </div>

               <div className="mt-8 bg-[#F8F9FA] rounded-[8px] p-6 border border-gray-100 font-mono text-[13px] overflow-x-auto shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                  <pre className="text-gray-800 leading-[1.8]">
                     <span className="text-[#E74C3C]">const</span> sketch = <span className="text-[#3B82F6]">require</span>(<span className="text-[#27AE60]">'sketch'</span>){'\n\n'}
                     sketch.UI.<span className="text-[#3B82F6]">message</span>(<span className="text-[#27AE60]">'Hello Sketch 👋'</span>)
                  </pre>
               </div>
            </div>

            {/* Block 2 */}
            <div className="mb-16">
               <h3 className="text-[24px] font-bold mb-4">Publish a plugin</h3>
               <p className="text-[15px] text-gray-700 leading-relaxed font-medium mb-6">
                  Use the Sketch Plugin Manager <InlineCode>skpm</InlineCode> to publish a new plugin or an update of an existing one. This adds your plugin automatically to the <a href="#" className="font-bold text-[#FC6820] hover:underline">Sketch Plugin Directory ↗</a> for review before being listed on the <a href="#" className="font-bold text-[#FC6820] hover:underline">Sketch website</a>.
               </p>
            </div>

            {/* Block 3 */}
            <div className="mb-16">
               <h3 className="text-[24px] font-bold mb-4">Export assets automatically</h3>
               <p className="text-[15px] text-gray-700 leading-relaxed font-medium mb-6">
                  Create assets with a single command with the Sketch command-line interface <InlineCode>sketchtool</InlineCode> . Quickly generate files for all exportable layers, slices, artboards or entire pages in as many different resolutions as you want.
               </p>

               <div className="space-y-4 text-[15px] font-medium text-gray-700 leading-relaxed mb-6">
                  <p>1. Open a new file in Sketch</p>
                  <p>2. Add a shape or anything else to the canvas</p>
                  <p>3. Save the file locally, e.g. <em className="italic font-serif">App.sketch</em> on your Desktop</p>
                  <p>4. Open <em className="italic font-serif">Terminal</em> and run the following command, which looks up the <InlineCode>sketchtool</InlineCode> bundled with Sketch and exports all pages of <em className="italic font-serif">App.sketch</em>.</p>
               </div>

               <p className="text-[15px] text-gray-700 font-medium mb-6">
                  This will generate an image file called <em className="italic font-serif">Page 1.png</em> in the same folder you ran the command in.
               </p>

               <div className="bg-[#F8F9FA] rounded-[8px] p-6 border border-gray-100 font-mono text-[13px] overflow-x-auto whitespace-pre block w-full mb-12 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
<span className="text-[#9B59B6]">SKETCH</span>=<span className="text-[#E74C3C]">$</span>(<span className="text-[#3B82F6]">mdfind</span> kMDItemCFBundleIdentifier == <span className="text-[#27AE60]">'com.bohemiancoding.sketch3'</span> | <span className="text-[#3B82F6]">head</span> -n 1) {'&&'} \
<span className="text-[#9B59B6]">"$SKETCH</span>/Contents/Resources/sketchtool/bin/sketchtool<span className="text-[#9B59B6]">"</span> <span className="text-[#8E44AD]">export</span> pages ~/Desktop/App.sketch
               </div>

               {/* Callout Info Box */}
               <div className="bg-[#FCFBFC] border border-gray-100 rounded-[8px] p-4 text-[14px] text-gray-500 font-medium text-center shadow-sm">
                  See something wrong or incomplete? <a href="#" className="font-bold text-[#FC6820] hover:underline">Improve this page.</a>
               </div>

            </div>
         </section>

         {/* Submit an Idea Section (Dark) */}
         <section className="bg-[#1D1C1B] py-24 px-6 text-center">
            <div className="max-w-[700px] mx-auto">
               <h2 className="text-[36px] font-black text-white tracking-tight mb-8">Not a developer? Submit an idea</h2>
               <p className="text-[20px] font-medium text-white/80 leading-relaxed mb-8">
                  If you don't have the programming experience to create your own Sketch plugin or integration, you can <a href="#" className="text-[#FC6820] font-bold hover:text-white transition">submit an idea</a> to let our team and the community know what kind of functionality you're looking for.
               </p>
               <p className="text-[20px] font-medium text-white/80 leading-relaxed">
                  Take a look at the <a href="#page=20-plugins" className="text-[#FC6820] font-bold hover:text-white transition">list of plugins</a> the community has already built.
               </p>
            </div>
         </section>

         {/* We're here to help Sections */}
         <section className="bg-white py-24 px-6 max-w-[1200px] mx-auto text-center border-b border-gray-100">
            <h2 className="text-[36px] font-black text-[#1D1C1B] tracking-tight mb-16">We're here to help</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <a href="#page=20-plugins" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-[#FF8E3C] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition duration-300">
                     <span className="text-white text-2xl drop-shadow-sm">💬</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1D1C1B] mb-3 flex items-center gap-1 group-hover:text-[#FC6820] transition">Developer Community <span className="text-[20px] font-normal transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[260px]">Join our dev forums to discuss plugins and third party integration.</p>
               </a>

               <a href="#page=20-plugins" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-[#6E36E4] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition duration-300">
                     <span className="text-white font-bold tracking-widest text-lg drop-shadow-sm">{'</>'}</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1D1C1B] mb-3 flex items-center gap-1 group-hover:text-[#6E36E4] transition">Examples <span className="text-[20px] font-normal transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[260px]">Explore some sample plugins built by the Sketch Team.</p>
               </a>

               <a href="#page=22-support" className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-[#25A2FF] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition duration-300">
                     <span className="text-white text-2xl drop-shadow-sm">💌</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1D1C1B] mb-3 flex items-center gap-1 group-hover:text-[#25A2FF] transition">Support <span className="text-[20px] font-normal transform group-hover:translate-x-1 transition">→</span></h3>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[260px]">Contact us and we'll get back to you as soon as we can.</p>
               </a>
            </div>
         </section>

         {/* Unique Minimalist Developer Footer with inline cookie banner */}
         <footer className="bg-white py-8 px-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center z-50 relative bottom-0">
            <div className="text-[12px] font-medium text-gray-400 mb-6 md:mb-0">
               © 2026 Sketch B.V.
            </div>

            {/* Embedded Cookie Banner */}
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-full px-6 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-[12px] font-medium text-gray-600 mb-6 md:mb-0 pointer-events-auto">
               <span>By using this website, you agree to our <a href="#" className="font-bold text-[#FC6820] hover:underline">Privacy Statement.</a></span>
               <button className="text-gray-400 hover:text-black ml-2 font-light">✕</button>
            </div>

            <div className="flex items-center gap-6 text-[12px] font-bold text-[#1D1C1B]">
               <a href="#" className="hover:text-gray-500 transition">Sketch Home</a>
               <a href="#" className="hover:text-gray-500 transition">GitHub</a>
               <a href="#" className="hover:text-gray-500 transition">Twitter</a>
               <a href="#" className="hover:text-gray-500 transition">Facebook</a>
            </div>
         </footer>

      </div>
   );
}
