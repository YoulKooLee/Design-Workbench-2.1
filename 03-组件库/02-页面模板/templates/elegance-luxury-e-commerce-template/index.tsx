/**
 * @name ÉLÉGANCE 奢华电商官网
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from "react";
import "./style.css";

import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Collections } from "./components/collections";
import { FeaturedProducts } from "./components/featured-products";
import { Heritage } from "./components/heritage";
import { Personalization } from "./components/personalization";
import { Sustainability } from "./components/sustainability";
import { Press } from "./components/press";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { Journal } from "./components/journal";
import { Newsletter } from "./components/newsletter";
import { Boutiques } from "./components/boutiques";
import { Footer } from "./components/footer";

export default function EleganceLuxuryEcommerceTemplate() {
  return (
    <main className="elegance-luxury-prototype min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />
      <Hero />
      <Collections />
      <FeaturedProducts />
      <Heritage />
      <Personalization />
      <Sustainability />
      <Press />
      <Services />
      <Testimonials />
      <Journal />
      <Boutiques />
      <Newsletter />
      <Footer />
    </main>
  );
}
