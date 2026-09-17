/**
 * @name Brutalist AI SaaS Landing Page
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';

import './style.css';

import { AboutSection } from './components/about-section';
import { FeatureGrid } from './components/feature-grid';
import { Footer } from './components/footer';
import { GlitchMarquee } from './components/glitch-marquee';
import { HeroSection } from './components/hero-section';
import { Navbar } from './components/navbar';
import { PricingSection } from './components/pricing-section';
import { ThemeProvider } from './components/theme-provider';

export default function BrutalistAISaasLandingPage() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="brutalist-ai-saas-prototype min-h-screen dot-grid-bg font-mono antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <FeatureGrid />
          <AboutSection />
          <PricingSection />
          <GlitchMarquee />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
