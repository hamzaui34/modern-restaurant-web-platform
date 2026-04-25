'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCart } from '@/lib/useCart';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeItem, updateQuantity, total, isLoaded } = useCart();
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const handleRemove = (itemId: string) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItem(null);
    }, 300);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 md:py-12 bg-surface-container/30"
        >
          <div className="container-max px-margin-mobile md:px-margin-desktop">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-section-title"
            >
              Your Cart
            </motion.h1>
            {cart.length > 0 && (
              <p className="text-on-surface-variant mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            )}
          </div>
        </motion.section>

        <section className="section pb-12 md:pb-16">
          <div className="container-max px-margin-mobile md:px-margin-desktop">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 md:py-20"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-surface-container flex items-center justify-center">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-headline-md text-on-surface-variant mb-3">Your cart is empty</p>
                <p className="text-on-surface-variant/70 mb-6 md:mb-8">Browse our menu and add some delicious items</p>
                <Button variant="primary" onClick={() => router.push('/menu')}>
                  Browse Menu
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-5">
                          <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-2 sm:gap-0 mb-2 sm:mb-2">
                              <div>
                                <h3 className="font-semibold text-on-surface">{item.name}</h3>
                                <p className="text-sm text-on-surface-variant">${item.price} each</p>
                              </div>
                              <p className="text-lg md:text-xl font-semibold text-secondary">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-3">
                              <div className="flex items-center border border-secondary/20 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-surface-container/50 transition-colors text-lg"
                                >
                                  −
                                </button>
                                <span className="w-10 sm:w-12 text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-surface-container/50 transition-colors text-lg"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-400 hover:text-red-300 text-xs tracking-wider transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-4 md:p-6 sticky top-28">
                      <h2 className="text-lg font-semibold text-on-surface mb-4 md:mb-6">Order Summary</h2>
                      <div className="space-y-3 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-secondary/10">
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">Subtotal</span>
                          <span className="text-on-surface">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">Tax (8%)</span>
                          <span className="text-on-surface">${(total * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">Delivery Fee</span>
                          <span className="text-on-surface">$5.00</span>
                        </div>
                      </div>
                      <div className="flex justify-between mb-4 md:mb-6">
                        <span className="text-base md:text-lg font-semibold">Total</span>
                        <span className="text-base md:text-lg font-semibold text-secondary">
                          ${(total * 1.08 + 5).toFixed(2)}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => router.push('/checkout')}
                        className="w-full py-2.5 md:py-3"
                      >
                        Proceed to Checkout
                      </Button>
                      <p className="text-xs text-center text-on-surface-variant mt-4">
                        Secure checkout • Free cancellation
                      </p>
                    </Card>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}