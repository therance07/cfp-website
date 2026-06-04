import { type HTMLAttributes } from 'react';

type CardVariant = 'default' | 'elevated' | 'flat' | 'bordered';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default:  'bg-white shadow-[var(--shadow-card)]',
  elevated: 'bg-white shadow-[var(--shadow-strong)]',
  flat:     'bg-[var(--color-gray-light)]',
  bordered: 'bg-white border border-gray-200',
};

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-[var(--radius-card)] overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)] cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
