'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Order {
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
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      const saved = localStorage.getItem('royal-ember-orders');
      if (saved) {
        try {
          setOrders(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load orders:', error);
        }
      }
      setIsLoading(false);
    };
    loadOrders();
  }, []);

  const updateStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => 
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('royal-ember-orders', JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-section-title">Orders</h1>
        <p className="text-body-md text-on-surface-variant">
          {orders.length} total orders
        </p>
      </div>

      <Card className="p-4 md:p-6">
        {orders.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-body-lg text-on-surface-variant mb-4">No orders yet</p>
            <p className="text-body-md text-on-surface-variant">
              Orders placed will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="border-b border-secondary/20">
                <tr>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Order ID</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps hidden sm:table-cell">Customer</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Items</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Total</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Status</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps hidden lg:table-cell">Date</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-surface-container/50">
                    <td className="px-2 md:px-4 py-3 text-body-md font-headline-md text-secondary">
                      {order.orderId}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-body-md hidden sm:table-cell">
                      <p>{order.customerName}</p>
                      <p className="text-label-caps text-on-surface-variant">
                        {order.customerPhone}
                      </p>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-body-md">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-2 md:px-4 py-3 text-body-md text-secondary font-headline-md">
                      ${order.total?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-2 md:px-4 py-3">
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => updateStatus(order.orderId, e.target.value as Order['status'])}
                        className="bg-surface-container border border-secondary/20 rounded px-2 py-1 text-body-md text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-body-md text-on-surface-variant hidden lg:table-cell">
                      {order.orderDate}
                    </td>
                    <td className="px-2 md:px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStatus(order.orderId, 'completed')}
                        disabled={order.status === 'completed'}
                      >
                        Complete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}