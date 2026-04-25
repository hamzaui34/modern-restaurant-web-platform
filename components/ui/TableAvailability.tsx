'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TableAvailability() {
  const [available, setAvailable] = useState(5);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const random = Math.floor(Math.random() * 6) + 3;
    setAvailable(random);
    
    const interval = setInterval(() => {
      setAvailable(prev => {
        const change = Math.random() > 0.5 ? -1 : 1;
        return Math.max(1, Math.min(8, prev + change));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setIsAvailable(hour >= 12 && hour < 22);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container/80 backdrop-blur-sm rounded-full border border-secondary/20"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}
      />
      <span className="text-xs text-on-surface-variant">
        {isAvailable ? (
          <> <span className="text-secondary font-semibold">{available} tables</span> available tonight</>
        ) : (
          <span className="text-on-surface-variant/60">Closed now</span>
        )}
      </span>
    </motion.div>
  );
}