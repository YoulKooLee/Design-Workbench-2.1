import React from 'react';
import './style.css';

/**
 * High-fidelity vector generation for Share Matrix Nodes
 */
const WhatsAppIcon = () => (
    <div className="w-[38px] h-[38px] bg-[#25D366] rounded-[8.5px] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.18 1.86 5.82L3 22l4.28-.85A9.954 9.954 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.81 14.14c-.2.57-1.15 1.05-1.59 1.1-.42.04-.96.11-3.21-.83-2.69-1.12-4.4-3.86-4.54-4.04-.13-.18-1.08-1.44-1.08-2.75 0-1.31.68-1.96.93-2.22.25-.26.54-.33.72-.33s.36 0 .52.01c.16.01.39-.06.6.45.23.54.77 1.89.84 2.03.07.14.11.31.02.49-.09.18-.13.3-.26.46-.13.15-.28.34-.39.46-.13.14-.26.28-.11.54.15.26.68 1.13 1.45 1.82.99.9 1.84 1.18 2.1 1.31.26.13.41.11.56-.06.15-.18.66-.76.84-1.02.18-.26.36-.22.59-.13.23.09 1.48.7 1.73.83.25.13.41.2.47.31.07.11.07.64-.13 1.21z"/>
        </svg>
    </div>
);

const MessagesIcon = () => (
    <div className="w-[38px] h-[38px] bg-gradient-to-br from-[#4CD964] to-[#25B43B] rounded-[8.5px] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] mt-[1px]">
            <path d="M12,3.5 C5.5,3.5 1.5,8 1.5,13.5 C1.5,16 2.6,18.5 4.5,20 L3.8,22.8 C3.7,23.3 4.2,23.7 4.7,23.5 L8.2,22.4 C9.4,23 10.7,23.2 12,23.5 C18.5,23.5 22.5,19 22.5,13.5 C22.5,8 18.5,3.5 12,3.5 Z" fill="white" />
        </svg>
    </div>
);

const InstagramIcon = () => (
    <div className="w-[38px] h-[38px] rounded-[8.5px] flex items-center justify-center flex-shrink-0 bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#962FBF] shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[24px] h-[24px]" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    </div>
);

const MessengerIcon = () => (
    <div className="w-[38px] h-[38px] bg-[#FAFAFA] rounded-[8.5px] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] ml-[0.5px]">
            <defs>
                <linearGradient id="messengerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00B2FF"/>
                    <stop offset="100%" stopColor="#006AFF"/>
                </linearGradient>
            </defs>
            <path d="M12 2C6.48 2 2 6.13 2 11.23c0 2.89 1.45 5.48 3.73 7.15v3.42c0 .41.44.66.8.46l3.43-1.89c.65.18 1.34.28 2.04.28 5.52 0 10-4.13 10-9.23S17.52 2 12 2zm1.09 12.35l-2.79-2.98-5.46 2.98 6.01-6.39 2.89 2.98 5.36-2.98-6.01 6.39z" fill="url(#messengerGradient)"/>
        </svg>
    </div>
);

const TwitterIcon = () => (
    <div className="w-[38px] h-[38px] bg-[#1DA1F2] rounded-[8.5px] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white mt-[1px]">
            <path d="M23 4.4a9.6 9.6 0 0 1-2.8.8 4.8 4.8 0 0 0 2.2-2.7c-.9.5-2 .9-3 1.1a4.8 4.8 0 0 0-8.2 3.3c0 .4 0 .8.1 1.2-4-.2-7.5-2-9.9-5a4.8 4.8 0 0 0 1.5 6.4 4.8 4.8 0 0 1-2.2-.6v.1a4.8 4.8 0 0 0 3.8 4.7 4.8 4.8 0 0 1-2.1.1 4.8 4.8 0 0 0 4.5 3.3 9.6 9.6 0 0 1-6 2A10 10 0 0 1 0 19.3a13.6 13.6 0 0 0 7.4 2.2c8.9 0 13.7-7.4 13.7-13.7v-.6A9.8 9.8 0 0 0 23 4.4z"/>
        </svg>
    </div>
);

const CopyIcon = () => (
    <div className="w-[38px] h-[38px] bg-[#313133] border border-[#3A3A3D] rounded-[8.5px] flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] ml-[2px] mt-[-2px]" fill="none" stroke="#D1D1D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    </div>
);


/**
 * @name Netflix "Share Action Sheet Modal" - Page 44
 */
export default function ShareActionModal() {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black relative select-none overflow-hidden">
            
            {/* --- PROCEDURAL CINEMATIC BLUR ENGINE --- */}
            {/* Same atmospheric projection logic as Page 43 (Success State) */}
            <div className="absolute inset-0 bg-[#0A0A0A] z-0 pointer-events-none">
                 <div className="absolute top-[23%] left-[10%] w-[80%] h-[35px] bg-[#8B0B0B] opacity-85 blur-[35px] rounded-[50%]"></div>
                 <div className="absolute top-[24%] left-[20%] w-[60%] h-[15px] bg-[#E50914] opacity-55 blur-[25px] rounded-[50%]"></div>
                 
                 <div className="absolute top-[55%] left-[-15%] w-[250px] h-[250px] bg-[#42331c] opacity-40 blur-[60px] rounded-full"></div>
                 <div className="absolute top-[60%] right-[-10%] w-[180px] h-[180px] bg-[#1e2e28] opacity-35 blur-[55px] rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-black/45 backdrop-blur-[35px] z-10 pointer-events-none"></div>


            {/* iOS Status Bar */}
            <div className="absolute top-0 w-full z-50 flex justify-between items-start px-[28px] pt-[8px] pointer-events-none">
                 <span className="text-[14px] font-bold tracking-[0.2px] text-[#FAFAFA] opacity-95 ml-[-4px]">2:58</span>
                 <div className="flex justify-end items-center gap-[5px] opacity-95 mr-[-4px]">
                     <div className="flex gap-[2.5px] items-end h-[11px] mb-[1px]">
                        <div className="w-[3px] h-[4px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[6px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[8.5px] bg-[#FAFAFA] rounded-sm"></div>
                        <div className="w-[3px] h-[11px] bg-[#FAFAFA] rounded-sm"></div>
                     </div>
                     <div className="relative transform scale-[0.80] -mr-1">
                         <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-[#FAFAFA] stroke-[1.2px]">
                             <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
                             <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
                         </svg>
                         <div className="absolute top-[2px] left-[2.5px] h-[8px] w-[15px] bg-[#FAFAFA] rounded-[1.5px]"></div>
                     </div>
                 </div>
            </div>


            {/* Main Action Sheet Content Matrix */}
            <div className="flex-1 flex flex-col justify-center pb-[75px] w-full z-20">
                
                <div className="w-full text-center px-[20px] mb-[32px]">
                    <h2 className="text-[#FAFAFA] text-[17.5px] font-[700] tracking-tight drop-shadow-md">Share to...</h2>
                </div>

                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-[22px] items-start w-[214px]">
                        
                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <WhatsAppIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight">WhatsApp</span>
                        </div>
                        
                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <MessagesIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight">Messages</span>
                        </div>

                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <InstagramIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight">Instagram Stories</span>
                        </div>

                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <MessengerIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight">Messenger</span>
                        </div>

                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <TwitterIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight">Twitter</span>
                        </div>

                        <div className="flex items-center gap-[18px] cursor-pointer active:scale-95 transition-transform origin-left w-full hover:opacity-80">
                            <CopyIcon />
                            <span className="text-[#FAFAFA] font-[600] text-[16px] tracking-tight opacity-90">Copy Link</span>
                        </div>

                    </div>
                </div>
                
                <div className="w-full text-center mt-[40px]">
                    <span className="text-[#8E8E93] text-[16px] font-[600] tracking-tight cursor-pointer hover:text-[#FAFAFA] transition-colors">
                        More Options
                    </span>
                </div>

            </div>


            {/* Dismissal Control Node */}
            <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-[#FAFAFA] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 transition-transform z-30">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#141414]" strokeWidth="1.2" strokeLinecap="butt">
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <line x1="21" y1="3" x2="3" y2="21"></line>
                </svg>
            </div>


            {/* Root OS Handle */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full z-50 pointer-events-none opacity-90 drop-shadow-sm"></div>

        </div>
    );
}
