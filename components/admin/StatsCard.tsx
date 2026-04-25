'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: 'revenue' | 'orders' | 'reservations' | 'conversion';
  trend?: 'up' | 'down';
}

const iconPaths = {
  revenue: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.337 2.88.91L13 11M9 11V7a3 3 0 016 0v4m0 0v2m0-6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  orders: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9zM9 10v1M15 10v1M7 21h10a2 2 0 002-2v-8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2z',
  reservations: 'M8 7V3m8 4V3m4 6l-4-4-4 4m4-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  conversion: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
};

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          {icon && (
            <svg 
              className="w-5 h-5 text-secondary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPaths[icon]} />
            </svg>
          )}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-1">{label}</p>
      <p className="text-2xl font-semibold text-on-surface">{value}</p>
    </motion.div>
  );
};

export default StatsCard;