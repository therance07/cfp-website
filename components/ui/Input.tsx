'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-[var(--color-dark)]">
            {label}
            {props.required && <span className="text-[var(--color-primary)] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none">{leftAddon}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-[var(--radius-btn)] border bg-white text-[var(--color-text)]',
              'px-4 py-3 text-base font-body transition-all duration-200',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              error
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-200 hover:border-gray-300',
              leftAddon ? 'pl-10' : '',
              rightAddon ? 'pr-10' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-gray-400 pointer-events-none">{rightAddon}</div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 flex items-center gap-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
