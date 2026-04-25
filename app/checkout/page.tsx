'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useCart } from '@/lib/useCart';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total } = useCart();
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName) newErrors.customerName = 'Name is required';
    if (!formData.customerEmail) newErrors.customerEmail = 'Email is required';
    if (!formData.customerPhone) newErrors.customerPhone = 'Phone is required';
    if (fulfillmentType === 'delivery' && !formData.deliveryAddress) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const orderId = `RE-${Date.now().toString(36).toUpperCase()}`;
      const taxAmount = total * 0.08;
      const deliveryFee = fulfillmentType === 'delivery' ? 5 : 0;
      const finalTotal = total + taxAmount + deliveryFee;

      const orderData = {
        orderId,
        ...formData,
        fulfillmentType,
        items: cart,
        total: finalTotal,
        taxAmount,
        deliveryFee,
        status: 'pending',
        orderDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      localStorage.setItem('royal-ember-last-order', JSON.stringify(orderData));

      const existingOrders = JSON.parse(localStorage.getItem('royal-ember-orders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('royal-ember-orders', JSON.stringify(existingOrders));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(`/order-confirmation?id=${orderId}`);
    } catch (error) {
      console.error('Order failed:', error);
      setErrors({ submit: 'Failed to process order. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-container flex items-center justify-center">
              <svg className="w-12 h-12 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-headline-md text-on-surface-variant mb-3">Your cart is empty</p>
            <p className="text-body-md text-on-surface-variant mb-8">Browse our menu and add some delicious items</p>
            <Button variant="primary" onClick={() => router.push('/menu')}>
              Continue Shopping
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const taxAmount = total * 0.08;
  const deliveryFee = fulfillmentType === 'delivery' ? 5 : 0;
  const finalTotal = total + taxAmount + deliveryFee;

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
              Checkout
            </motion.h1>
          </div>
        </motion.section>

        <section className="section pb-12 md:pb-16">
          <div className="container-max px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-4 md:p-6">
                      <h2 className="text-base md:text-lg font-semibold text-secondary mb-4">How would you like to receive your order?</h2>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <motion.button
                          type="button"
                          onClick={() => setFulfillmentType('delivery')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 md:p-5 rounded-lg border-2 transition-all text-left ${
                            fulfillmentType === 'delivery'
                              ? 'border-secondary bg-secondary/10'
                              : 'border-secondary/20 hover:border-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm md:text-body-md font-semibold">Delivery</p>
                          </div>
                          <p className="text-xs md:text-sm text-on-surface-variant">Delivered to your door</p>
                          <p className="text-label-caps text-secondary mt-2">+$5.00</p>
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setFulfillmentType('pickup')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-5 rounded-lg border-2 transition-all text-left ${
                            fulfillmentType === 'pickup'
                              ? 'border-secondary bg-secondary/10'
                              : 'border-secondary/20 hover:border-secondary/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-body-md font-semibold">Pickup</p>
                          </div>
                          <p className="text-sm text-on-surface-variant">Pick up at restaurant</p>
                          <p className="text-label-caps text-green-500 mt-2">FREE</p>
                        </motion.button>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-secondary mb-4">Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          value={formData.customerName}
                          onChange={(e) =>
                            setFormData({ ...formData, customerName: e.target.value })
                          }
                          error={errors.customerName}
                        />
                        <Input
                          label="Email"
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, customerEmail: e.target.value })
                          }
                          error={errors.customerEmail}
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          value={formData.customerPhone}
                          onChange={(e) =>
                            setFormData({ ...formData, customerPhone: e.target.value })
                          }
                          error={errors.customerPhone}
                        />
                        {fulfillmentType === 'delivery' && (
                          <Input
                            label="Delivery Address"
                            value={formData.deliveryAddress}
                            onChange={(e) =>
                              setFormData({ ...formData, deliveryAddress: e.target.value })
                            }
                            error={errors.deliveryAddress}
                          />
                        )}
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-secondary mb-4">Special Requests</h2>
                      <textarea
                        value={formData.specialInstructions}
                        onChange={(e) =>
                          setFormData({ ...formData, specialInstructions: e.target.value })
                        }
                        placeholder="Any special instructions or dietary restrictions?"
                        className="input-base w-full min-h-24 resize-none"
                      />
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">Secure Checkout</h2>
                          <p className="text-sm text-on-surface-variant">Your data is encrypted and secure</p>
                        </div>
                      </div>
                      <div className="p-4 bg-surface-container/50 rounded-lg">
                        <p className="text-sm text-on-surface-variant mb-2">
                          Demo mode: Use test card for checkout
                        </p>
                        <p className="text-lg text-secondary font-mono">4242 4242 4242 4242</p>
                      </div>
                    </Card>
                  </motion.div>

                  {errors.submit && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                    >
                      {errors.submit}
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button type="submit" variant="primary" isLoading={isLoading} className="w-full py-4 text-base">
                      Place Order • ${finalTotal.toFixed(2)}
                    </Button>
                  </motion.div>
                </form>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="p-6 sticky top-28">
                  <h2 className="text-lg font-semibold text-on-surface mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-secondary/10 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-on-surface-variant">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-on-surface">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Subtotal</span>
                      <span className="text-on-surface">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Tax (8%)</span>
                      <span className="text-on-surface">${taxAmount.toFixed(2)}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-on-surface-variant">Delivery</span>
                        <span className="text-on-surface">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-secondary/20">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-secondary">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-secondary/10">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Free cancellation up to 24h before
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}