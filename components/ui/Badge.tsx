import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const variantClasses = {
    default: 'bg-surface-container text-on-surface',
    success: 'bg-green-900/30 text-green-200',
    warning: 'bg-yellow-900/30 text-yellow-200',
    error: 'bg-error-container text-error',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-label-caps ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
