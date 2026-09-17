import React from "react";
import { Leaf, Heart, Shield, Recycle } from "lucide-react";

const commitments = [
  {
    icon: Leaf,
    title: "负责任采购",
    description:
      "我们只与通过认证、并认同环保责任与公平贸易价值的供应商合作。",
  },
  {
    icon: Heart,
    title: "社会影响",
    description:
      "支持本地匠人社群，并为下一代保存传统手工艺。",
  },
  {
    icon: Shield,
    title: "透明溯源",
    description:
      "从原料源头到完成作品，全程可追溯。每一件作品都讲述负责任的故事。",
  },
  {
    icon: Recycle,
    title: "循环设计",
    description:
      "修护与翻新计划让作品跨越世代，而非只停留一季。",
  },
];

export function Sustainability() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left - Sticky Content */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start space-y-8">
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                我们的承诺
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                共塑
                <span className="block italic text-accent">更好的未来</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              奢华与责任并不相悖。从采购到生产，可持续承诺始终指引我们的每一个决定。
            </p>

            <div className="pt-4">
              <div className="inline-block border-border p-6 space-y-2 bg-white border-none border-0" style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}>
                <p className="font-serif text-3xl text-accent">100%</p>
                <p className="text-sm text-muted-foreground">
                  碳中和运营
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center border border-primary text-primary px-8 py-4 text-sm tracking-[0.2em] uppercase min-h-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              阅读完整报告
            </button>
          </div>

          {/* Right - Commitments Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {commitments.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 lg:p-10 space-y-6 hover:shadow-lg transition-shadow duration-300"
                  style={{ boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" }}
                >
                  <Icon className="w-10 h-10 text-accent" />
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
