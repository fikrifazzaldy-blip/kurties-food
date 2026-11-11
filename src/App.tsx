/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCatalog } from './components/MenuCatalog';
import { CateringCalculator } from './components/CateringCalculator';
import { WhatsAppServiceSection } from './components/WhatsAppServiceSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppOrderForm } from './components/WhatsAppOrderForm';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartItem, MenuItem, CustomerOrder } from './types/catering';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kurties_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kurties_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const handleAddToCart = (item: MenuItem, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((c) => c.item.id === item.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
          notes: notes || next[existingIdx].notes
        };
        return next;
      }
      return [...prev, { item, quantity, notes }];
    });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((c) => (c.item.id === id ? { ...c, quantity: qty } : c))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleQuickOrderWA = (item: MenuItem, quantity: number) => {
    // Add item if not present or ensure it is in the cart, then open order modal
    setCart((prev) => {
      const existingIdx = prev.findIndex((c) => c.item.id === item.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = { ...next[existingIdx], quantity };
        return next;
      }
      return [...prev, { item, quantity }];
    });
    setOrderModalOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('kalkulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (_order: CustomerOrder) => {
    // Keep cart or clean as desired; we keep it clear after successful WhatsApp dispatch
    setCart([]);
    setOrderModalOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4ECE1] selection:bg-[#DEC2A6] selection:text-[#362216]">
      
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenOrderModal={() => setOrderModalOpen(true)}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Menu Catalog Section */}
        <MenuCatalog
          onAddToCart={handleAddToCart}
          onQuickOrderWA={handleQuickOrderWA}
        />

        {/* Interactive Catering Calculator */}
        <CateringCalculator />

        {/* WhatsApp Service Section */}
        <WhatsAppServiceSection
          onOpenOrderModal={() => setOrderModalOpen(true)}
        />

        {/* Location & Delivery Section */}
        <LocationSection />

        {/* Testimonials & FAQs */}
        <TestimonialsFaq
          onOpenOrderModal={() => setOrderModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToOrder={() => setOrderModalOpen(true)}
      />

      {/* WhatsApp Order Modal */}
      <WhatsAppOrderForm
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />

    </div>
  );
}
