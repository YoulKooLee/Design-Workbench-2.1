/**
 * @name EVASION 户外电商官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { Header } from './components/header';
import { HeroSection } from './components/sections/hero-section';
import { PhilosophySection } from './components/sections/philosophy-section';
import { FeaturedProductsSection } from './components/sections/featured-products-section';
import { TechnologySection } from './components/sections/technology-section';
import { GallerySection } from './components/sections/gallery-section';
import { CollectionSection } from './components/sections/collection-section';
import { EditorialSection } from './components/sections/editorial-section';
import { TestimonialsSection } from './components/sections/testimonials-section';
import { FooterSection } from './components/sections/footer-section';

export default function EvasionEcommerceTemplate() {
  return (
    <main className="evasion-prototype min-h-screen bg-background font-sans text-foreground antialiased">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection />
      <TechnologySection />
      <GallerySection />
      <CollectionSection />
      <EditorialSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
