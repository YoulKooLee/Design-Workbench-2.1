/**
 * @name Aura 静谧生活电商体验
 *
 * 参考资料：
 * - /rules/ai-studio-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React, { useState } from 'react';
import './style.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import { Product, ViewState } from './types';

export default function AuraQuietLivingPrototype() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 85;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    try {
      window.history.pushState(null, '', `#${targetId}`);
    } catch {
      // Ignore restricted preview environments that block history updates.
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (view.type !== 'home') {
      setView({ type: 'home' });
      setTimeout(() => scrollToSection(targetId), 0);
      return;
    }

    scrollToSection(targetId);
  };

  const addToCart = (product: Product) => {
    setCartItems((items) => [...items, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems((items) => items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && (
        <Navbar
          onNavClick={handleNavClick}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid
              onProductClick={(product) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product });
              }}
            />
            <About />
            <Journal
              onArticleClick={(article) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article });
              }}
            />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail
            product={view.product}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail
            article={view.article}
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
          <Checkout
            items={cartItems}
            onBack={() => setView({ type: 'home' })}
          />
        )}
      </main>

      {view.type !== 'checkout' && <Footer onLinkClick={handleNavClick} />}

      <Assistant />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}
