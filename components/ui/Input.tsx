import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="label-base">{label}</label>}
        <input
          ref={ref}
          className={`input-base ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-error text-sm mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-on-surface-variant text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
