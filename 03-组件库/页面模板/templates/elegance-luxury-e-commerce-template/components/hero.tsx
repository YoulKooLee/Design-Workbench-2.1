import React from "react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#14110f]">
      {/* Full-bleed background image with a restrained parallax shift */}
      <div
        className="absolute -inset-y-16 inset-x-0 bg-cover bg-center"
        style={{
          transform: `translateY(${scrollY * 0.16}px)`,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1800&h=1200&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[#14110f]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14110f]/35 via-[#14110f]/10 to-[#14110f]/70" />

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 hidden lg:flex justify-between px-12 pointer-events-none">
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
        <div className="w-px h-full bg-white/[0.06]" />
      </div>

      {/* Animated accent line */}
      <div
        className="absolute left-12 top-20 w-px bg-[#c9a962]/40 hidden lg:block animate-in slide-in-from-top duration-1000"
        style={{
          height: "32%",
          animationDelay: "1200ms",
          animationFillMode: "both",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-end">
            {/* Main headline area */}
            <div className="lg:col-span-8 space-y-5 md:space-y-6 lg:space-y-7">
              {/* Season tag */}
              <div
                className="flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: "300ms", animationFillMode: "both" }}
              >
                <div className="w-12 h-px bg-[#c9a962]" />
                <p className="text-xs md:text-sm tracking-[0.28em] md:tracking-[0.4em] uppercase text-white/70">
                  2026 春季系列
                </p>
              </div>

              {/* Main title */}
              <h1
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.9] tracking-normal text-white animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              >
                恒久
                <br />
                <span className="italic text-[#c9a962]">
                  优雅
                </span>
                <br />
                的艺术
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/65 text-base md:text-lg max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "800ms", animationFillMode: "both" }}
              >
                凝结世代匠艺的非凡作品，让传承与卓越在此相遇。
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "1000ms", animationFillMode: "both" }}
              >
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-[#1a1a1a] px-6 py-4 text-xs md:text-sm tracking-[0.14em] uppercase min-h-12 hover:bg-[#c9a962] hover:text-[#1a1a1a] transition-all duration-500 sm:px-8 lg:px-10 sm:tracking-[0.22em]"
                >
                  探索系列
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-3 border border-white/35 text-white px-6 py-4 text-xs md:text-sm tracking-[0.14em] uppercase min-h-12 hover:border-white hover:bg-white/10 transition-all duration-500 backdrop-blur-sm sm:px-8 lg:px-10 sm:tracking-[0.22em]"
                >
                  品牌传承
                </button>
              </div>
            </div>

            {/* Right side - floating card */}
            <div
              className="lg:col-span-4 hidden xl:flex flex-col items-end gap-8 animate-in fade-in slide-in-from-right-8 duration-700"
              style={{ animationDelay: "1100ms", animationFillMode: "both" }}
            >
              {/* Stats card */}
              <div
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 max-w-[280px] w-full"
                style={{
                  boxShadow:
                    "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
                }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">
                  Maison Heritage
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">1847</p>
                    <p className="text-sm text-white/50 mt-1">
                      创立年份
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">47</p>
                    <p className="text-sm text-white/50 mt-1">
                      匠艺大师
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div>
                    <p className="font-serif text-4xl text-[#c9a962]">12k+</p>
                    <p className="text-sm text-white/50 mt-1">独一作品</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent" />
    </section>
  );
}
