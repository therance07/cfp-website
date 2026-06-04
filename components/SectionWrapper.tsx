import { type HTMLAttributes } from 'react';

type BgVariant = 'white' | 'cream' | 'dark' | 'green' | 'orange' | 'gray';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  bg?: BgVariant;
  py?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'article';
  container?: boolean;
}

const bgClasses: Record<BgVariant, string> = {
  white:  'bg-[var(--color-white)]',
  cream:  'bg-[var(--color-cream)]',
  dark:   'bg-[var(--color-dark)]',
  green:  'bg-[var(--color-secondary)]',
  orange: 'bg-[var(--color-primary)]',
  gray:   'bg-[var(--color-gray-light)]',
};

const pyClasses = {
  sm: 'py-10 md:py-14',
  md: 'py-14 md:py-20',
  lg: 'py-20 md:py-28',
  xl: 'py-24 md:py-36',
};

export default function SectionWrapper({
  bg = 'white',
  py = 'md',
  as: Tag = 'section',
  container = true,
  className = '',
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag className={`${bgClasses[bg]} ${pyClasses[py]} ${className}`} {...props}>
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
