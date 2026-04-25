'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React, { useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-secondary text-surface overflow-hidden',
      secondary: 'bg-transparent border border-secondary text-secondary overflow-hidden',
      ghost: 'bg-transparent border border-secondary/50 text-on-surface overflow-hidden',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-xs tracking-wider',
      md: 'px-6 py-2.5 text-sm tracking-wider',
      lg: 'px-8 py-3 text-base tracking-wider',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y, id: Date.now() });
      setTimeout(() => setRipple(null), 600);
      props.onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ 
          scale: disabled || isLoading ? 1 : 1.02,
          y: disabled || isLoading ? 0 : -2,
        }}
        whileTap={{ 
          scale: disabled || isLoading ? 1 : 0.98,
          y: 0,
        }}
        className={`
          relative inline-flex items-center justify-center font-medium rounded-lg
          transition-all duration-200 ease-out shadow-sm
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        <span className={`relative z-10 flex items-center gap-2 ${variant === 'primary' ? 'text-surface' : ''}`}>
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : null}
          {children}
        </span>
        {ripple && (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        <motion.span
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 
            ${variant === 'primary' ? 'via-white/20' : 'via-secondary/10'}`}
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
        {variant === 'primary' && (
          <motion.span
            className="absolute inset-0 rounded-lg"
            initial={{ boxShadow: '0 0 0 0 rgba(233, 195, 73, 0)' }}
            whileHover={{ boxShadow: '0 4px 20px 2px rgba(233, 195, 73, 0.35)' }}
            transition={{ duration: 0.2 }}
          />
        )}
        {variant === 'secondary' && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-secondary"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;