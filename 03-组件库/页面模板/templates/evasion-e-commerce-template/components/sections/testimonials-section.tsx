import React from "react";
import { PrototypeImage } from "../prototype-image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Alpine 与 Forest 配件将航天级材料与前沿技术结合，
          为不愿在荒野中牺牲品质与性能的探索者而设计。
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <PrototypeImage
          src="/images/3d4046a0-b072-4b07-941f-9141ee3ed4a7.png"
          alt="日出时的山峰"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
