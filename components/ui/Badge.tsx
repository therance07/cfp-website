import { type HTMLAttributes } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'cream' | 'dark' | 'success' | 'warning';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:  'bg-[var(--color-primary)] text-white',
  secondary:'bg-[var(--color-secondary-light)] text-white',
  outline:  'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent',
  cream:    'bg-[var(--color-cream)] text-[var(--color-dark)]',
  dark:     'bg-[var(--color-dark)] text-white',
  success:  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  warning:  'bg-amber-100 text-amber-700 border border-amber-200',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
};

export default function Badge({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 font-label uppercase tracking-wider rounded-full font-semibold',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
