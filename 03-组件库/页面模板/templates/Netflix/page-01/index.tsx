import React from 'react';
import { ChevronLeft, Key, Delete } from 'lucide-react';
import './style.css';

/**
 * @name Netflix Sign In (Page 01)
 */
export default function NetflixApp() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white font-sans relative select-none overflow-hidden">
      
      {/* 1. iOS Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[14px] font-bold tracking-tight z-20">
        <div className="flex items-center gap-1">
          <span>2:54</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-90">
          <div className="flex gap-[3px] items-end h-[12px]">
             <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[9px] bg-white rounded-sm"></div>
             <div className="w-[3px] h-[12px] bg-white rounded-sm"></div>
          </div>
          <span className="text-[12px] font-black tracking-tight ml-0.5">4G</span>
          <div className="relative transform scale-90 -mr-1">
            <svg width="25" height="12" viewBox="0 0 25 12" className="fill-none stroke-white stroke-[1.2px]">
              <rect x="1" y="1" width="20" height="10" rx="3" fill="none" />
              <path d="M23 4 V8" strokeLinecap="round" strokeWidth={1.5} />
            </svg>
            <div className="absolute top-[2.5px] left-[2.5px] h-[7px] w-[14px] bg-white rounded-[1.5px]"></div>
          </div>
        </div>
      </div>

      {/* 2. Top Header Navigation */}
      <div className="flex items-center justify-between px-3 h-14 relative z-20">
        <button className="p-2 text-white opacity-90 hover:opacity-100">
          <ChevronLeft size={30} strokeWidth={2} />
        </button>
        {/* Netflix Text Logo Approximation */}
        <span 
          className="text-[#E50914] font-[900] text-[28px] tracking-[-1px] transform scale-y-[1.1] absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          NETFLIX
        </span>
        <button className="font-bold text-[15px] px-2 opacity-95">
          Help
        </button>
      </div>

      {/* 3. Main Form Area (Pushed up slightly by keyboard) */}
      <div className="flex-1 flex flex-col pt-[15vh] px-[5%] z-10">
        
        {/* Email Input */}
        <div className="bg-[#333333] rounded-[5px] h-[64px] flex flex-col justify-center px-4 mb-4 relative overflow-hidden">
          <label className="text-[#8C8C8C] font-semibold text-[13px] absolute top-[10px]">
             Email or phone number
          </label>
          <input 
            type="text" 
            defaultValue="jiho@mobbin.design"
            className="bg-transparent border-none text-white text-[16px] w-full pt-[20px] focus:outline-none placeholder-transparent"
            readOnly
          />
          {/* Fake red squiggly line for iOS spell check simulation */}
          <div className="absolute bottom-[20px] left-[55px] w-[58px] h-[3px] border-b-[2px] border-dotted border-red-500"></div>
        </div>

        {/* Password Input */}
        <div className="bg-[#333333] rounded-[5px] h-[64px] flex flex-col justify-center px-4 mb-6 relative overflow-hidden">
          <label className="text-[#8C8C8C] font-semibold text-[13px] absolute top-[10px]">
             Password
          </label>
          <div className="flex items-center w-full pt-[20px]">
            <input 
              type="password" 
              defaultValue="password123"
              className="bg-transparent border-none text-white text-[24px] tracking-[4px] w-full focus:outline-none font-serif leading-none"
              readOnly
            />
            {/* Fake cursor blinker */}
            <div className="w-[2px] h-[22px] bg-white animate-pulse absolute left-[155px] bottom-[18px]"></div>
          </div>
          
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] font-semibold text-[14px] pt-1">
             SHOW
          </button>
        </div>

        {/* Sign In Button */}
        <button className="bg-[#E50914] text-white font-bold text-[16px] py-[15px] rounded-[5px] w-full active:bg-[#B20710] transition-colors">
          Sign In
        </button>

      </div>

      {/* 4. iOS Keyboard Structure (Symbols mode) */}
      <div className="w-full bg-[#D1D1D6] flex flex-col pb-8 z-30 shadow-[0_-1px_1px_rgba(0,0,0,0.1)]">
        
        {/* Passwords Auto-fill Bar */}
        <div className="h-[44px] flex items-center justify-center border-b border-[#B1B1B6] relative bg-[#D1D1D6]">
           <div className="flex items-center gap-1.5 opacity-90 cursor-pointer active:opacity-60">
             <Key size={18} className="text-black" fill="currentColor" />
             <span className="text-black text-[16px]">Passwords</span>
           </div>
           {/* Dividers */}
           <div className="absolute left-[33%] top-[10px] bottom-[10px] w-[1px] bg-[#B1B1B6]"></div>
           <div className="absolute right-[33%] top-[10px] bottom-[10px] w-[1px] bg-[#B1B1B6]"></div>
        </div>

        {/* Keyboard Keys Area */}
        <div className="px-[3px] pt-2 pb-1 flex flex-col gap-[7px]">
          
          {/* Row 1: Numbers */}
          <div className="flex justify-between px-[2px] gap-[5px]">
            {['1','2','3','4','5','6','7','8','9','0'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[5px] flex items-center justify-center text-[22px] text-black font-normal keyboard-shadow">
                {k}
              </div>
            ))}
          </div>
          
          {/* Row 2: Basic Symbols */}
          <div className="flex justify-between px-[2px] gap-[5px]">
            {['-','/',':',';','(',')','$','&','@','"'].map(k => (
              <div key={k} className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[5px] flex items-center justify-center text-[20px] text-black font-normal keyboard-shadow">
                {k}
              </div>
            ))}
          </div>
          
          {/* Row 3: Extended Symbols & Delete */}
          <div className="flex justify-between px-[2px] gap-[5px]">
            <div className="flex-[1.5] h-[42px] bg-[#ACB3BC] rounded-[5px] flex items-center justify-center text-[16px] text-black keyboard-shadow">
              #+=
            </div>
            {['.',',','?','!','\''].map(k => (
              <div key={k} className="flex-[1.2] h-[42px] bg-[#FCFCFE] rounded-[5px] flex items-center justify-center text-[20px] text-black keyboard-shadow">
                {k}
              </div>
            ))}
            <div className="flex-[1.5] h-[42px] bg-[#ACB3BC] rounded-[5px] flex items-center justify-center keyboard-shadow text-black relative">
               <Delete size={22} fill="currentColor" className="text-black ml-1 relative z-10" />
               <div className="absolute w-3 h-3 bg-black z-20 left-[50%] ml-[-3px] top-[14px]"></div>
               <Delete size={22} fill="#ACB3BC" className="absolute text-[#ACB3BC] ml-1 z-30 transform scale-75" />
            </div>
          </div>
          
          {/* Row 4: Space Bar & Actions */}
          <div className="flex justify-between px-[2px] gap-[5px]">
            <div className="w-[23%] h-[42px] bg-[#ACB3BC] rounded-[5px] flex items-center justify-center text-[16px] text-black keyboard-shadow">
              ABC
            </div>
            <div className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[5px] flex items-center justify-center text-[16px] text-black keyboard-shadow">
              space
            </div>
            <div className="w-[23%] h-[42px] bg-[#ACB3BC] rounded-[5px] flex items-center justify-center text-[16px] text-black keyboard-shadow">
              return
            </div>
          </div>

        </div>

        {/* Global iOS Home Indicator in lower keyboard space */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-40"></div>
        
      </div>

    </div>
  );
}
