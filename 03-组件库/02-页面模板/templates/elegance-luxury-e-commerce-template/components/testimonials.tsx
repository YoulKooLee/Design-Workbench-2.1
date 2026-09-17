import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "从第一次触碰起，就能感受到非凡品质。Maison Elegance 的作品已经成为我的日常必需。",
    author: "Isabelle Laurent",
    title: "艺术总监",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    quote:
      "每一个细节都显露出手工艺的温度。正是这种对细节的执着，成就了真正的差别。",
    author: "Alexander Dubois",
    title: "室内建筑师",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    quote:
      "我在 10 年前认识 Maison Elegance。自那以后，它从未让我失望。这是一个兑现承诺的 Maison。",
    author: "Sophie Marchand",
    title: "画廊主理人",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-24">
          {/* Left - Title */}
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              客户评价
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight">
              客户
              <span className="block italic text-accent">如是说</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              近两个世纪以来，我们与客户建立了珍贵而长久的关系。以下是他们的真实感受。
            </p>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={prev}
                className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
                aria-label="上一条客户评价"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
                aria-label="下一条客户评价"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-accent/20" />

            <div className="bg-card p-8 md:p-12 relative">
              <div className="space-y-8">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug text-balance">
                  “{current.quote}”
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <img
                    src={current.image || "/placeholder.svg"}
                    alt={current.author}
                    className="w-14 h-14 object-cover"
                  />
                  <div>
                    <p className="font-medium">{current.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {current.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicator */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={`indicator-${index}-${testimonials[index].id}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-accent w-8"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`查看第 ${index + 1} 条客户评价`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
