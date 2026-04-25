'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={`glass-card p-4 md:p-6 ${className}`}
      whileHover={{ 
        y: -4,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(233, 195, 73, 0.2)',
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...props}
    >
      {children}
    </motion.div>
  )
);

Card.displayName = 'Card';

export default Card;