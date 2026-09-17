/**
 * @name SIGNAL 实验创意工作室
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import { HeroSection } from './components/hero-section';
import { SignalsSection } from './components/signals-section';
import { WorkSection } from './components/work-section';
import { PrinciplesSection } from './components/principles-section';
import { ColophonSection } from './components/colophon-section';
import { SideNav } from './components/side-nav';
import { SmoothScroll } from './components/smooth-scroll';
import './style.css';

export default function SignalInterfacePrototype() {
  return (
    <SmoothScroll>
      <main className="signal-interface relative min-h-screen overflow-x-hidden bg-background text-foreground font-sans antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <SideNav />
        <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

        <div className="relative z-10">
          <HeroSection />
          <SignalsSection />
          <WorkSection />
          <PrinciplesSection />
          <ColophonSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
