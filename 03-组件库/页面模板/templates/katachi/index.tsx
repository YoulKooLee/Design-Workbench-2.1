/**
 * @name KATACHI 家具品牌官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { CollectionStrip } from './components/collection-strip';
import { FeaturedProducts } from './components/featured-products';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { MaterialsSection } from './components/materials-section';
import { NewsletterSection } from './components/newsletter-section';

export default function KatachiPrototype() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-50 font-sans text-neutral-900 antialiased">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionStrip />
      <MaterialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
