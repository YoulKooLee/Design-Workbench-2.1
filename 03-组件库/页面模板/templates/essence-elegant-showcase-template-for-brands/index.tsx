/**
 * @name ESSENCE 高级餐饮品牌展示页
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { Header } from './components/header';
import { HeroSection } from './components/sections/hero';
import { VisionSection } from './components/sections/vision';
import { PhilosophySection } from './components/sections/philosophy';
import { ExperienceSection } from './components/sections/experience';
import { DishesSection } from './components/sections/dishes';
import { ContactSection } from './components/sections/contact';
import { Footer } from './components/footer';

export default function EssenceElegantShowcase() {
  return (
    <main
      id="top"
      className="essence-prototype min-h-screen bg-background font-sans text-foreground antialiased"
    >
      <Header />
      <HeroSection />
      <VisionSection />
      <PhilosophySection />
      <ExperienceSection />
      <DishesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
