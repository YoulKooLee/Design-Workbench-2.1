/**
 * @name Apex 企业 SaaS 官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';

import './style.css';

import { BentoGrid } from './components/bento-grid';
import { FinalCTA } from './components/final-cta';
import { Footer } from './components/footer';
import { Hero } from './components/hero';
import { LogoMarquee } from './components/logo-marquee';
import { Navbar } from './components/navbar';
import { Pricing } from './components/pricing';
import { SmoothScroll } from './components/smooth-scroll';

export default function ApexSaasLanding() {
  return (
    <div className="zip-3-prototype dark font-sans antialiased">
      <div className="noise-overlay" aria-hidden="true" />
      <SmoothScroll>
        <main className="min-h-screen bg-zinc-950">
          <Navbar />
          <Hero />
          <LogoMarquee />
          <BentoGrid />
          <Pricing />
          <FinalCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </div>
  );
}
