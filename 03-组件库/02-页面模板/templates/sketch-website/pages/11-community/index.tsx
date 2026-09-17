/**
 * @name Join the Sketch Community
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
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
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
         <a href="#page=12-pricing" className="bg-[#1D1C1B] text-white px-5 py-2 rounded-full hover:bg-black/80 transition">Get started for free</a>
         </div>
      </div>
   </header>
);

// Helper for floating avatars with Depth of Field
const DOF_Avatar = ({ imageSrc, top, left, size, blurClass, zIndex }) => (
   <div className={`absolute rounded-full overflow-hidden border border-black/5 shadow-lg ${blurClass}`} style={{ top, left, width: size, height: size, zIndex }}>
      <img src={imageSrc} className="w-full h-full object-cover" alt="Community Member" />
   </div>
);

// Reusable Event List Item
const EventItem = ({ imageUrl, date, time, title, text }) => (
   <div className="flex gap-6 py-6 border-t border-gray-100 group">
      <div className="w-[160px] md:w-[200px] shrink-0 h-max overflow-hidden rounded shadow-sm border border-black/5">
         <img src={imageUrl} className="w-full h-auto aspect-video object-cover transform group-hover:scale-105 transition duration-500" alt="Event cover" />
      </div>
      <div className="flex flex-col">
         <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-2">
            <span className="flex items-center gap-1"><span className="text-[13px] opacity-70">📅</span> {date}</span>
            <span className="flex items-center gap-1"><span className="text-[14px] opacity-70">⏱</span> {time}</span>
         </div>
         <h4 className="text-xl font-bold text-[#1D1C1B] mb-2 cursor-pointer hover:text-sketch-orange transition">{title}</h4>
         <p className="text-gray-500 text-[15px] leading-relaxed mb-4 font-medium max-w-3xl">{text}</p>
         <button className="bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-bold w-max hover:bg-gray-200 transition">Event details</button>
      </div>
   </div>
);


export default function P11Community() {
   return (
      <div className="min-h-screen bg-white overflow-x-hidden selection:bg-orange-200 selection:text-black">
         <Nav />

         {/* Hero with Depth of Field Floating Avatars */}
         <section className="relative pt-40 md:pt-48 pb-32 text-center min-h-[500px]">
            {/* The Avatars */}
            <div className="max-w-[1400px] mx-auto absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=12" top="20%" left="15%" size="40px" blurClass="blur-[1px]" zIndex={10} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=24" top="15%" left="45%" size="64px" blurClass="blur-[2px]" zIndex={5} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=35" top="10%" left="75%" size="30px" blurClass="blur-[3px]" zIndex={1} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=41" top="35%" left="8%" size="80px" blurClass="" zIndex={20} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=56" top="30%" left="82%" size="50px" blurClass="blur-[1px]" zIndex={10} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=62" top="45%" left="90%" size="40px" blurClass="blur-[2px]" zIndex={5} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=79" top="65%" left="20%" size="60px" blurClass="blur-[1px]" zIndex={15} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=88" top="75%" left="35%" size="35px" blurClass="blur-[3px]" zIndex={2} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=91" top="60%" left="60%" size="50px" blurClass="blur-none" zIndex={20} />
               <DOF_Avatar imageSrc="https://i.pravatar.cc/150?u=10" top="70%" left="85%" size="70px" blurClass="blur-[2px]" zIndex={5} />
            </div>

            <div className="relative z-20 max-w-2xl mx-auto px-6">
               <h1 className="text-5xl md:text-[5.5rem] font-black text-[#1D1C1B] leading-[1.05] tracking-tight mb-6">
                  Welcome to our<br/>Community Hub
               </h1>
               <p className="text-[20px] font-medium text-[#1D1C1B]/80 leading-relaxed max-w-xl mx-auto">
                  Community is at the <span className="text-red-500">♥</span> of Sketch. You can check out all the Sketch design events and even join us on the next one! Become part of a global network of designers to share knowledge, ask questions and make new friends!
               </p>
            </div>
         </section>

         {/* Events Area (Start) with the gradient bleeding from right */}
         <section className="relative pt-12 pb-12 w-full overflow-hidden">
            {/* Massive angled orange/red radiant burst background on the right */}
            <div className="absolute right-0 top-[20%] w-[80%] max-w-[1200px] h-[1000px] bg-gradient-to-l from-[#FF7A45] via-[#FFAE7A] to-transparent opacity-30 transform rotate-12 translate-x-[30%] -z-10 hidden md:block"></div>
            
            <div className="max-w-[1000px] mx-auto px-6 mb-12">
               <h2 className="text-[44px] font-black tracking-tight text-[#1D1C1B] mb-4">Sketch Events</h2>
               <p className="text-lg font-medium text-gray-600 max-w-xl leading-relaxed">
                  Whether you're a beginner looking to get started or a seasoned professional seeking expert tips, we've got you covered. Get together with Sketch Sessions or check out the other design App events that we're part of. Let's talk all things design.
               </p>
            </div>

            {/* Featured Event Card */}
            <div className="max-w-[1000px] mx-auto px-6 relative z-10">
               <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden group hover:shadow-3xl transition duration-500">
                  
                  {/* Left Banner area */}
                  <div className="md:w-[45%] p-10 bg-gradient-to-br from-[#FFAD7E] to-[#FA9175] flex flex-col justify-between relative overflow-hidden text-[#1D1C1B]">
                     {/* Abstract shapes hidden via opacity for background */}
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent opacity-40 mix-blend-overlay"></div>
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-8">
                           <h3 className="text-3xl font-black leading-tight mb-4">The Journey into<br/>UX Design</h3>
                           <p className="font-mono text-sm font-bold opacity-80 uppercase tracking-widest leading-loose">04 August, 17:00 CEST<br/>08:00AM PT</p>
                        </div>
                        <div className="mt-auto">
                           <span className="font-bold text-sm bg-black/10 px-3 py-1 rounded inline-block backdrop-blur-sm">Panel discussion</span>
                        </div>
                     </div>
                     {/* The external partnership badge overlap */}
                     <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur rounded-xl px-4 py-2 text-[10px] font-bold text-black shadow-lg flex flex-col items-center gap-1.5 z-20">
                        <span className="opacity-50 tracking-widest uppercase">In partnership with</span>
                        <div className="flex gap-2">
                           {/* Faking the logos */}
                           <span className="flex items-center gap-1 text-[#1EB589]"><div className="w-2.5 h-2.5 bg-[#1EB589] rounded-[2px] transform rotate-45"></div> Springboard</span>
                           <span className="flex items-center gap-1 text-black"><div className="w-[3px] h-2.5 bg-black rounded-[1px] transform rotate-12"></div><div className="w-[3px] h-2.5 bg-black rounded-[1px] transform -rotate-12"></div> ADPList</span>
                        </div>
                     </div>
                  </div>

                  {/* Right Details area */}
                  <div className="md:w-[55%] p-10 flex flex-col bg-white/90 backdrop-blur">
                     <div className="flex gap-4 text-[11px] font-bold tracking-widest text-[#1D1C1B]/50 uppercase mb-4">
                        <span>📅 04 Aug</span>
                        <span>⏱ 17:00 CEST / 08:00AM EDT</span>
                     </div>
                     <h3 className="text-[26px] font-black text-[#1D1C1B] mb-4">The Journey into UX Design</h3>
                     <p className="text-[15px] font-medium text-gray-500 mb-8 leading-relaxed">
                        Join us for this insightful panel discussion with experts from ADPList, Springboard and Sketch to find out more on taking stronger first steps towards a career in UX Design!
                     </p>
                     
                     <div className="flex flex-col gap-3 mb-10 text-[13px] font-bold text-[#1D1C1B]">
                        <div className="flex items-center gap-3"><img src="https://i.pravatar.cc/100?u=a1" className="w-7 h-7 rounded-full shadow-sm"/> Christian Siles <span className="opacity-40 font-normal">(speaker)</span></div>
                        <div className="flex items-center gap-3"><img src="https://i.pravatar.cc/100?u=a2" className="w-7 h-7 rounded-full shadow-sm"/> Alessandro Caliandro <span className="opacity-40 font-normal">(speaker)</span></div>
                        <div className="flex items-center gap-3"><img src="https://i.pravatar.cc/100?u=a3" className="w-7 h-7 rounded-full shadow-sm"/> Carl Miller <span className="opacity-40 font-normal">(speaker)</span></div>
                     </div>

                     <div className="mt-auto">
                        <button className="bg-[#1D1C1B] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-black hover:-translate-y-0.5 transition w-full md:w-auto">Event details</button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Events List Segment */}
         <section className="max-w-[1000px] mx-auto px-6 py-12">
            {/* Tabs */}
            <div className="flex gap-3 mb-10">
               <button className="bg-white border border-gray-100 text-gray-400 font-bold px-6 py-2 rounded-full text-sm hover:text-black transition">Upcoming events</button>
               <button className="bg-[#FFF4E5] text-[#D87040] font-bold px-6 py-2 rounded-full text-sm">Past events</button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2">
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=111"
                  date="11 AUG" time="17:00 CEST / 08:00AM EDT"
                  title="The Journey into Product Design"
                  text="Join us for this insightful panel discussion with experts from ADPList, Springboard and Sketch to find out all about making a strong start to your career in Product Design and stand out from the crowd! We will be covering potential interview questions, soft skill enhancements, insider tips and what do industry leading companies like Sketch look for in a Product Designer."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=112"
                  date="04 AUG" time="17:00 CEST / 08:00AM EDT"
                  title="The Journey into UX Design"
                  text="Join us for this insightful panel discussion with experts from ADPList, Springboard and Sketch to find out more on taking stronger first steps towards a career in UX Design!"
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=113"
                  date="09 JUN" time="17:00 CEST / 11:00 EDT"
                  title="The Journey of Inclusive Design"
                  text="We know that user experience is more than just wireframes and prototypes. Inclusivity is central to the user experience. Inclusive design is one of the most impactful and effective ways to improve experiences for users of any identity, background, or experience."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=114"
                  date="23 MAR" time="10:00AM CEST"
                  title="Why trust is at the heart of innovation, excellence and great work"
                  text="Our Head of People Justyna Adamczyk and Design Advocate Layshi Curbelo joined Design Matters pop-up to talk about Sketch's remote culture that has trust, freedom and collaboration at its core."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=115"
                  date="28 OCT 2021" time="18:00 BST"
                  title="Can data and ethics live together?"
                  text="Building a product as a designer is challenging on its own. But what happens when you add ethics, privacy, and data into the mix? Our Design Advocate Matteo Gratton joined Tech Circus to dive deep into this topic."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=116"
                  date="21 OCT 2021" time="18:00 BST"
                  title="User research: Why it's important and how we do it!"
                  text="Our Design Researcher, Tanya Native joined Tech Circus to share the entire research journey, including how we build our features based on user feedback!"
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=117"
                  date="14 OCT 2021" time="18:00 BST"
                  title="A home for the entire creative process: Sketch in 2021 and beyond"
                  text="How does Sketch offer a home for the entire creative process? Our Design Advocate, Matteo Gratton, joined Tech Circus to explore cross-team collaboration, the future of Sketch and ways to improve your daily workflow."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=118"
                  date="13 JUL 2021" time="09:00AM PT"
                  title="Transition into Product Design, Tips & Tricks"
                  text="Join our Design Advocates Francesco and Matteo to hear about their journey and stories as product designers."
               />
               <EventItem 
                  imageUrl="https://picsum.photos/400/225?random=119"
                  date="23 JUN 2021" time="08:00AM PT"
                  title="The Scope of Remote Working"
                  text="Tune into our joint session with ADPList to find out all about our remote culture and how it's thrived over a decade."
               />
            </div>
         </section>

         {/* More on Sketch Community Block */}
         <section className="relative py-32 bg-[#FAFAFA] border-y border-gray-100 overflow-hidden">
            {/* The giant 3D Speech bubbles on the left */}
            <div className="absolute left-[-15%] md:left-[-5%] top-[20%] w-[350px] opacity-90 mix-blend-multiply pointer-events-none -z-0">
               {/* Using an inline SVG for the 3D speech bubble illusion */}
               <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160 80 C160 35 125 0 80 0 C35 0 0 35 0 80 C0 97 5 113 14 126 C12 143 0 160 0 160 C0 160 27 158 45 146 C56 151 68 154 80 154 C125 154 160 119 160 80 Z" fill="#E8EBED" />
                  <circle cx="45" cy="80" r="8" fill="#AFB5BB" />
                  <circle cx="80" cy="80" r="8" fill="#AFB5BB" />
                  <circle cx="115" cy="80" r="8" fill="#AFB5BB" />
               </svg>
            </div>
            <div className="absolute left-[0%] md:left-[10%] top-[45%] w-[300px] opacity-90 mix-blend-multiply pointer-events-none z-10 transform scale-x-[-1]">
               <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160 80 C160 35 125 0 80 0 C35 0 0 35 0 80 C0 97 5 113 14 126 C12 143 0 160 0 160 C0 160 27 158 45 146 C56 151 68 154 80 154 C125 154 160 119 160 80 Z" fill="#4B5563" />
                  <circle cx="45" cy="80" r="8" fill="#9CA3AF" />
                  <circle cx="80" cy="80" r="8" fill="#9CA3AF" />
                  <circle cx="115" cy="80" r="8" fill="#9CA3AF" />
               </svg>
            </div>

            <div className="relative z-10 max-w-[1000px] mx-auto px-6">
               <div className="text-center mb-16 max-w-lg mx-auto">
                  <h2 className="text-4xl font-black tracking-tight text-[#1D1C1B] mb-4">More on Sketch Community</h2>
                  <p className="text-lg font-medium text-gray-500 leading-relaxed">We are always looking to do more for our community. From select experts on our Sketch Advocates program to our Community Partners, we keep extending our support.</p>
               </div>

               <div className="flex flex-col md:flex-row gap-8">
                  {/* Advocates Card */}
                  <div className="flex-1">
                     <div className="bg-white rounded-3xl h-[250px] mb-6 flex items-center justify-center p-8 relative overflow-hidden border border-black/5 shadow-sm group cursor-pointer hover:shadow-xl transition">
                        {/* 3 intersecting circles */}
                        <div className="flex -space-x-4">
                           <img className="w-[100px] h-[100px] rounded-full border-[6px] border-white z-0 group-hover:-translate-y-2 group-hover:rotate-[-5deg] transition duration-500 shadow-xl object-cover" src="https://i.pravatar.cc/200?u=11" alt="avatar"/>
                           <img className="w-[120px] h-[120px] rounded-full border-[6px] border-white z-10 transform -translate-y-2 group-hover:-translate-y-6 transition duration-500 shadow-2xl object-cover" src="https://i.pravatar.cc/200?u=22" alt="avatar"/>
                           <img className="w-[100px] h-[100px] rounded-full border-[6px] border-white z-20 group-hover:-translate-y-2 group-hover:rotate-[5deg] transition duration-500 shadow-xl object-cover" src="https://i.pravatar.cc/200?u=33" alt="avatar"/>
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-[#1D1C1B] mb-2">Sketch Advocates</h3>
                     <p className="text-[15px] text-gray-500 font-medium mb-4">Sketch Advocates are talented designers from our community who excel at their craft and help us push digital design further.</p>
                     <a href="#" className="font-bold text-[#1D1C1B] text-sm hover:text-sketch-orange transition">Learn more →</a>
                  </div>

                  {/* Partners Card */}
                  <div className="flex-1">
                     <div className="bg-[#FAFAFA] rounded-3xl h-[250px] mb-6 flex relative overflow-hidden border border-black/5 shadow-inner group cursor-pointer hover:bg-white hover:shadow-xl transition">
                        {/* Floating logos randomly placed */}
                        <div className="absolute top-[20%] left-[10%] bg-white p-3 rounded-full shadow-lg transform group-hover:scale-110 transition border border-gray-100 flex items-center justify-center">
                           <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-black italic">A</div>
                        </div>
                        <div className="absolute top-[10%] left-[40%] bg-white px-4 py-2 rounded shadow-md transform group-hover:-translate-y-2 transition border border-gray-100 italic text-[10px] font-bold text-gray-400">TECH CIRCUS</div>
                        <div className="absolute bottom-[20%] left-[30%] bg-[#E5484D] w-12 h-12 rounded-xl shadow-lg transform group-hover:-rotate-12 transition text-white flex items-center justify-center text-xl font-black">CA</div>
                        <div className="absolute top-[25%] right-[20%] w-14 h-14 bg-gradient-to-br from-blue-500 to-red-500 rounded-3xl shadow-xl transform rotate-12 group-hover:rotate-0 transition"></div>
                        <div className="absolute bottom-[30%] right-[10%] bg-white px-3 py-1 rounded shadow-md transform group-hover:translate-x-2 transition border border-gray-100 flex flex-col items-center">
                           <div className="w-6 h-6 border-b-2 border-purple-500"></div>
                           <span className="text-[8px] font-bold mt-1 text-purple-800 uppercase">UiWomen</span>
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-[#1D1C1B] mb-2">Community Partners</h3>
                     <p className="text-[15px] text-gray-500 font-medium mb-4">Teaming up with community partners, we look for more ways to give back to designers. Check out our lovely partners and get in touch to become one!</p>
                     <a href="#" className="font-bold text-[#1D1C1B] text-sm hover:text-sketch-orange transition">Get in touch →</a>
                  </div>
               </div>
            </div>
         </section>

         {/* Collage Wall & Join Slack */}
         <section className="bg-white overflow-hidden pb-32">
            {/* The massive collage wall - flex chaotic row/grid */}
            <div className="w-full relative h-[400px] md:h-[600px] mb-16 overflow-hidden flex flex-wrap content-start">
               {/* 
                 Simulating a masonry/collage visually without huge data overhead, 
                 just absolute placed blocks spanning the full width
               */}
               <div className="absolute top-[20%] left-[-5%] w-[20%] aspect-square bg-gray-200 shadow-2xl z-10 rotate-6 p-2 bg-white">
                  <img src="https://picsum.photos/400/400?random=11" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[50%] left-[5%] w-[15%] aspect-[3/4] bg-gray-300 shadow-xl z-20 rounded-t-full overflow-hidden border-[8px] border-white">
                  <img src="https://picsum.photos/400/500?random=12" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[10%] left-[20%] w-[35%] aspect-[16/9] shadow-2xl z-30 rounded-3xl overflow-hidden border-[10px] border-white">
                  <img src="https://picsum.photos/800/450?random=13" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[50%] left-[25%] w-[25%] aspect-square shadow-xl z-10 overflow-hidden -rotate-3 p-4 bg-white">
                  <img src="https://picsum.photos/500/500?random=14" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[20%] left-[60%] w-[30%] aspect-[4/3] shadow-2xl z-20 bg-white p-3 rounded-xl rotate-2">
                  <img src="https://picsum.photos/600/450?random=15" className="w-full h-full object-cover rounded-lg"/>
               </div>
               <div className="absolute top-[10%] left-[45%] w-[15%] aspect-square shadow-xl z-0 rounded-full overflow-hidden border-8 border-yellow-300">
                  <img src="https://picsum.photos/300/300?random=16" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[60%] left-[70%] w-[25%] aspect-video shadow-2xl z-30 border-[10px] border-white rounded-lg overflow-hidden -rotate-6">
                  <img src="https://picsum.photos/600/300?random=17" className="w-full h-full object-cover"/>
               </div>
               <div className="absolute top-[80%] left-[55%] w-[10%] aspect-square shadow-lg z-40 bg-pink-100 flex items-center justify-center transform rotate-12">
                  <span className="text-4xl text-pink-500 font-bold">😊</span>
               </div>
               <div className="absolute top-[40%] right-[-5%] w-[15%] aspect-[3/4] shadow-xl border-[5px] border-white bg-gray-200">
                   <img src="https://picsum.photos/300/400?random=18" className="w-full h-full object-cover"/>
               </div>
               {/* Faded background colors or blocks */}
               <div className="absolute top-0 right-[20%] w-[20%] h-[30%] bg-pink-50/50"></div>
            </div>

            <div className="text-center max-w-xl mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-black text-[#1D1C1B] mb-6 leading-tight">Join our Sketch Friends<br/>community on Slack</h2>
               <p className="text-lg text-gray-500 font-medium mb-6">
                  We are working on providing you a community space where you will be able to get the latest news, previews and talk all things Sketch and meet other designers!
               </p>
               <p className="text-lg text-gray-500 font-medium mb-10">
                  In the meantime, stay up to date with all the announcements and news on our newsletter, Beyond the Canvas!
               </p>
               <button className="bg-[#1D1C1B] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-black transition">Sign up</button>
            </div>
         </section>

         {/* Footer */}
         <footer className="border-t border-gray-200 pt-16 pb-8 bg-white">
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
