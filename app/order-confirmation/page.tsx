'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCart } from '@/lib/useCart';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  specialInstructions: string;
  fulfillmentType: 'delivery' | 'pickup';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  orderDate: string;
}

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'Unknown';
  const { clearCart } = useCart();
  const orderDetails = useMemo<OrderDetails | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedOrder = localStorage.getItem('royal-ember-last-order');
    if (savedOrder) {
      try {
        localStorage.removeItem('royal-ember-last-order');
        return JSON.parse(savedOrder);
      } catch (error) {
        console.error('Failed to load order:', error);
      }
    }
    return null;
  }, []);

  if (orderDetails) {
    clearCart();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-16 bg-surface-container/30">
          <div className="container-max px-margin-mobile md:px-margin-desktop text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-6">
              <svg
                className="w-10 h-10 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-label-caps text-secondary mb-4">ORDER CONFIRMED</p>
            <h1 className="text-section-title mb-4">Thank You for Your Order</h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-4">
              Your order has been confirmed and is being prepared. We&apos;ll send you a confirmation email shortly.
            </p>
            <p className="text-body-md text-secondary font-headline-md">
              Order #{orderDetails?.orderId || orderId}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-headline-md font-headline-md text-secondary mb-4">
                  Order Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-body-md text-on-surface-variant">Date</span>
                    <span className="text-body-md text-on-surface">
                      {orderDetails?.orderDate || new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-md text-on-surface-variant">Type</span>
                    <span className="text-body-md text-on-surface capitalize">
                      {orderDetails?.fulfillmentType || 'delivery'}
                    </span>
                  </div>
                  {orderDetails?.fulfillmentType === 'delivery' && orderDetails?.deliveryAddress && (
                    <div className="flex justify-between">
                      <span className="text-body-md text-on-surface-variant">Address</span>
                      <span className="text-body-md text-on-surface text-right max-w-[200px]">
                        {orderDetails.deliveryAddress}
                      </span>
                    </div>
                  )}
                </div>

                {orderDetails?.items && orderDetails.items.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-secondary/10">
                    <h3 className="text-body-md font-headline-md text-secondary mb-4">Items</h3>
                    <div className="space-y-3">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-body-md text-on-surface-variant">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-body-md text-on-surface">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {orderDetails?.total && (
                  <div className="mt-6 pt-6 border-t border-secondary/10">
                    <div className="flex justify-between">
                      <span className="text-headline-md font-headline-md">Total</span>
                      <span className="text-headline-md font-headline-md text-secondary">
                        ${orderDetails.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-headline-md font-headline-md text-secondary mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-label-caps text-on-surface-variant mb-1">Name</p>
                    <p className="text-body-md text-on-surface">
                      {orderDetails?.customerName || 'Guest'}
                    </p>
                  </div>
                  <div>
                    <p className="text-label-caps text-on-surface-variant mb-1">Email</p>
                    <p className="text-body-md text-on-surface">
                      {orderDetails?.customerEmail || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-label-caps text-on-surface-variant mb-1">Phone</p>
                    <p className="text-body-md text-on-surface">
                      {orderDetails?.customerPhone || 'Not provided'}
                    </p>
                  </div>
                  {orderDetails?.specialInstructions && (
                    <div>
                      <p className="text-label-caps text-on-surface-variant mb-1">Special Instructions</p>
                      <p className="text-body-md text-on-surface">
                        {orderDetails.specialInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="primary"
                onClick={() => router.push('/menu')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}