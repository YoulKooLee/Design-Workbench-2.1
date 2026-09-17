/**
 * @name Electric AI 客服落地页
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { FAQ } from './components/faq';
import { FinalCTA } from './components/final-cta';
import { Footer } from './components/footer';
import { Hero } from './components/hero';
import { HowItWorks } from './components/how-it-works';
import { Navbar } from './components/navbar';
import { Pricing } from './components/pricing';
import { Stats } from './components/stats';
import { Testimonials } from './components/testimonials';
import { UseCases } from './components/use-cases';
import { VideoGallery } from './components/video-gallery';
import gradeTexture from './public/grade.png';

export default function ElectricLandingPageTemplate() {
  return (
    <main
      id="top"
      className="electric-landing-page-template dark relative z-0 min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[1500px] w-[1500px] bg-primary"
        style={{
          maskImage: 'radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.75), transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.75), transparent)',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-right-top"
          style={{ backgroundImage: `url(${gradeTexture})` }}
        />
      </div>

      <Navbar />
      <Hero />
      <VideoGallery />
      <HowItWorks />
      <UseCases gradeTexture={gradeTexture} />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
