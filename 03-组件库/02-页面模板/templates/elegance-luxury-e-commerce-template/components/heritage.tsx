import React from "react";
import { Play } from "lucide-react";

export function Heritage() {
  return (
    <section id="heritage" className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left - Content */}
          <div className="space-y-8 lg:pr-12">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60">
                品牌传承
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                一门
                <span className="block italic text-accent">代代相传</span>
                的匠艺
              </h2>
            </div>

            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-lg">
              自 1847 年以来，Maison 始终延续法式手工艺的卓越标准。每一件作品都是传统与现代的对话，也是古老手势与当代视野的交汇。
            </p>

            <div className="grid grid-cols-3 gap-8 py-8 border-y border-primary-foreground/20">
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">178</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  年历史
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">47</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  匠艺大师
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl md:text-5xl text-accent">12k</p>
                <p className="text-sm text-primary-foreground/60 mt-1">
                  独一作品
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 border border-primary-foreground text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              探索品牌故事
            </button>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              {/* Main image */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%282%29-qsHmoJIZtkh9Zw7PIDspOZVh50aE2F.png"
                alt="宫廷场景中的高级定制优雅造型"
                className="w-full h-full object-cover"
              />
              
              {/* Play button overlay */}
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="播放视频"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-background/80 flex items-center justify-center group-hover:bg-background/20 transition-colors duration-300">
                  <Play className="w-8 h-8 text-background ml-1" />
                </div>
              </button>

              {/* Decorative quote */}
              <div className="absolute -bottom-8 left-4 md:-bottom-12 md:-left-12 bg-accent p-6 md:p-8 max-w-[280px]">
                <p className="font-serif text-accent-foreground text-lg md:text-xl italic leading-snug">
                  "卓越不是一时之举，而是一种习惯。"
                </p>
                <p className="text-accent-foreground/70 text-sm mt-3">
                  — Henri Maison，创始人
                </p>
              </div>
            </div>

            {/* Side decoration */}
            <div className="absolute -top-8 -right-4 md:-right-8 w-24 h-24 md:w-32 md:h-32 border border-accent/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
