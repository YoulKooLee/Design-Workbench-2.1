/**
 * @name GiGi Gen Z 能量饮料官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { ActivationsSection } from './components/activations-section';
import { BentoGrid } from './components/bento-grid';
import ClickSpark from './components/click-spark';
import { FlavorCarousel } from './components/flavor-carousel';
import { Footer } from './components/footer';
import { HeroSection } from './components/hero-section';
import { LenisProvider } from './components/lenis-provider';
import { Navigation } from './components/navigation';
import { SocialSection } from './components/social-section';

export default function GigiEnergyLandingPrototype() {
  return (
    <ClickSpark
      sparkColor="#AFFF00"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
      easing="ease-out"
    >
      <LenisProvider>
        <main className="gigi-energy-prototype min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased">
          <Navigation />
          <HeroSection />
          <FlavorCarousel />
          <BentoGrid />
          <ActivationsSection />
          <SocialSection />
          <Footer />
        </main>
      </LenisProvider>
    </ClickSpark>
  );
}
