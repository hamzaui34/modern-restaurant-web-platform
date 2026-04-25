'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/admin/StatsCard';

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentType: 'delivery' | 'pickup';
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  orderDate: string;
}

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  status: string;
}

type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  preparing: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const AdminDashboard = () => {
  const [data, setData] = useState({
    revenue: { today: 0, week: 0, month: 0 },
    orders: { today: 0, week: 0, month: 0 },
    reservations: { today: 0, week: 0, month: 0 },
    orderStatus: { pending: 0, preparing: 0, completed: 0, cancelled: 0 },
    recentOrders: [] as Order[],
    upcomingReservations: [] as Reservation[],
    topDishes: [] as { name: string; count: number; revenue: number }[],
    peakHours: [] as { hour: string; count: number }[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const orders = JSON.parse(localStorage.getItem('royal-ember-orders') || '[]');
    const updated = orders.map((o: Order) => 
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem('royal-ember-orders', JSON.stringify(updated));
    loadData();
  };

  const loadData = () => {
    const orders = JSON.parse(localStorage.getItem('royal-ember-orders') || '[]');
    const reservations = JSON.parse(localStorage.getItem('royal-ember-reservations') || '[]');

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayStr = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const weekStr = weekAgo.toISOString().split('T')[0];
    const monthStr = monthAgo.toISOString().split('T')[0];

    const todayOrders = orders.filter((o: Order) => o.orderDate.includes(todayStr.split(',')[0] || ''));
    const weekOrders = orders.filter((o: Order) => new Date(o.orderDate) >= weekAgo);
    const monthOrders = orders.filter((o: Order) => new Date(o.orderDate) >= monthAgo);

    const todayReservations = reservations.filter((r: Reservation) => r.date === today.toISOString().split('T')[0]);
    const weekReservations = reservations.filter((r: Reservation) => new Date(r.date) >= weekAgo);
    const monthReservations = reservations.filter((r: Reservation) => new Date(r.date) >= monthAgo);

    const pending = orders.filter((o: Order) => o.status === 'pending' || !o.status);
    const preparing = orders.filter((o: Order) => o.status === 'preparing');
    const completed = orders.filter((o: Order) => o.status === 'completed');
    const cancelled = orders.filter((o: Order) => o.status === 'cancelled');

    const dishCount: Record<string, { count: number; revenue: number }> = {};
    orders.forEach((o: Order) => {
      o.items?.forEach((item) => {
        if (!dishCount[item.name]) {
          dishCount[item.name] = { count: 0, revenue: 0 };
        }
        dishCount[item.name].count += item.quantity;
        dishCount[item.name].revenue += item.price * item.quantity;
      });
    });
    const topDishes = Object.entries(dishCount)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, data]) => ({ name, ...data }));

    const hourCount: Record<string, number> = {};
    orders.forEach((o: Order) => {
      const hour = new Date().getHours().toString();
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });
    const peakHours = Object.entries(hourCount)
      .map(([hour, count]) => ({ hour: `${hour}:00`, count }))
      .sort((a, b) => b.count - a.count);

    setData({
      revenue: {
        today: todayOrders.reduce((sum: number, o: Order) => sum + (o.total || 0), 0),
        week: weekOrders.reduce((sum: number, o: Order) => sum + (o.total || 0), 0),
        month: monthOrders.reduce((sum: number, o: Order) => sum + (o.total || 0), 0),
      },
      orders: {
        today: todayOrders.length,
        week: weekOrders.length,
        month: monthOrders.length,
      },
      reservations: {
        today: todayReservations.length,
        week: weekReservations.length,
        month: monthReservations.length,
      },
      orderStatus: {
        pending: pending.length,
        preparing: preparing.length,
        completed: completed.length,
        cancelled: cancelled.length,
      },
      recentOrders: orders.slice(0, 8),
      upcomingReservations: reservations.slice(0, 5),
      topDishes,
      peakHours,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const revenue = data.revenue[timeRange];
  const orderCount = data.orders[timeRange];
  const reservationCount = data.reservations[timeRange];

  const conversionRate = useMemo(() => {
    if (orderCount === 0) return 0;
    return Math.round(((data.orderStatus.completed) / orderCount) * 100);
  }, [orderCount, data.orderStatus]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-section-title">Dashboard</h1>
          <p className="text-on-surface-variant mt-1">Business intelligence & analytics</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {(['today', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-secondary text-surface'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCard 
            label={`Revenue (${timeRange})`} 
            value={`$${revenue.toFixed(2)}`} 
            trend={timeRange === 'today' ? undefined : 'up'}
            icon="revenue"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard 
            label={`Orders (${timeRange})`} 
            value={orderCount} 
            trend={timeRange === 'today' ? undefined : 'up'}
            icon="orders"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatsCard 
            label={`Reservations (${timeRange})`} 
            value={reservationCount}
            icon="reservations"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatsCard 
            label="Conversion Rate" 
            value={`${conversionRate}%`}
            icon="conversion"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-secondary mb-6">Recent Orders</h2>
          
          {data.recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-container flex items-center justify-center">
                <svg className="w-8 h-8 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-on-surface-variant">No orders yet</p>
              <p className="text-sm text-on-surface-variant/70 mt-1">Orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between p-4 bg-surface-container/50 rounded-lg hover:bg-surface-container/70 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-on-surface">{order.customerName}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as OrderStatus] || statusColors.pending}`}>
                        {order.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {order.orderDate} • {order.fulfillmentType} • {order.items?.length || 0} items
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-secondary">${order.total?.toFixed(2)}</p>
                    <select
                      value={order.status || 'pending'}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value as OrderStatus)}
                      className="bg-surface-container border border-secondary/20 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-secondary"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-secondary mb-6">Order Status</h2>
          <div className="space-y-4">
            {Object.entries(data.orderStatus).map(([status, count], index) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${statusColors[status as OrderStatus]}`} />
                  <span className="text-sm text-on-surface-variant capitalize">{status}</span>
                </div>
                <span className="font-semibold text-on-surface">{count}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-secondary/10">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Top Selling Dishes</h3>
            {data.topDishes.length === 0 ? (
              <p className="text-sm text-on-surface-variant">No data yet</p>
            ) : (
              <div className="space-y-3">
                {data.topDishes.map((dish, index) => (
                  <div key={dish.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-sm text-on-surface-variant truncate max-w-[120px]">{dish.name}</span>
                    </div>
                    <span className="text-sm text-secondary">${dish.revenue.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-secondary mb-6">Upcoming Reservations</h2>
          {data.upcomingReservations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-on-surface-variant">No reservations yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.upcomingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex justify-between items-center p-4 bg-surface-container/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-on-surface">{reservation.name}</p>
                    <p className="text-sm text-on-surface-variant">
                      {reservation.date} at {reservation.time} • {reservation.guests} guests
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    {reservation.status || 'confirmed'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-secondary mb-6">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container/50 rounded-lg">
              <p className="text-sm text-on-surface-variant mb-1">Avg Order Value</p>
              <p className="text-xl font-semibold text-secondary">
                ${orderCount > 0 ? (revenue / orderCount).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="p-4 bg-surface-container/50 rounded-lg">
              <p className="text-sm text-on-surface-variant mb-1">Pickup vs Delivery</p>
              <p className="text-sm text-on-surface">
                Check orders
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;