'use client';

import { motion } from 'framer-motion';

type Align = 'left' | 'center' | 'right';
type Theme = 'dark' | 'light';

interface SectionTitleProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: Align;
  theme?: Theme;
  className?: string;
}

export default function SectionTitle({
  tag,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  theme = 'dark',
  className = '',
}: SectionTitleProps) {
  const alignClass = { left: 'text-left', center: 'text-center mx-auto', right: 'text-right ml-auto' }[align];
  const titleColor = theme === 'dark' ? 'text-[var(--color-dark)]' : 'text-white';
  const subtitleColor = theme === 'dark' ? 'text-gray-600' : 'text-white/80';
  const tagColor = theme === 'dark' ? 'text-[var(--color-primary)]' : 'text-[var(--color-cream)]';

  return (
    <motion.div
      className={`max-w-2xl ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {tag && (
        <p className={`font-label text-xs uppercase tracking-[0.15em] font-semibold mb-2 ${tagColor}`}>
          {tag}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl font-bold leading-tight mb-3 ${titleColor}`}>
        {title}{' '}
        {titleHighlight && (
          <span className="text-[var(--color-primary)]">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
