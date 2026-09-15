/**
 * @name Optimus AI 平台官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import { Navigation } from './components/landing/navigation';
import { HeroSection } from './components/landing/hero-section';
import { FeaturesSection } from './components/landing/features-section';
import { HowItWorksSection } from './components/landing/how-it-works-section';
import { InfrastructureSection } from './components/landing/infrastructure-section';
import { MetricsSection } from './components/landing/metrics-section';
import { IntegrationsSection } from './components/landing/integrations-section';
import { SecuritySection } from './components/landing/security-section';
import { DevelopersSection } from './components/landing/developers-section';
import { TestimonialsSection } from './components/landing/testimonials-section';
import { PricingSection } from './components/landing/pricing-section';
import { CtaSection } from './components/landing/cta-section';
import { FooterSection } from './components/landing/footer-section';
import './style.css';

export default function OptimusAiPlatformPrototype() {
  return (
    <main className="optimus-prototype relative min-h-screen overflow-x-hidden noise-overlay font-sans antialiased">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <SecuritySection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
