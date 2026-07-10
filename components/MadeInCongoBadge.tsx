import Image from 'next/image';

interface MadeInCongoBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { flagW: 18, flagH: 12, text: 'text-xs', gap: 'gap-1', px: 'px-2 py-0.5' },
  md: { flagW: 21, flagH: 14, text: 'text-xs', gap: 'gap-1.5', px: 'px-3 py-1' },
  lg: { flagW: 27, flagH: 18, text: 'text-sm', gap: 'gap-2', px: 'px-4 py-1.5' },
};

export default function MadeInCongoBadge({ size = 'md', className = '' }: MadeInCongoBadgeProps) {
  const s = sizeMap[size];
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-label uppercase tracking-wider font-semibold',
        'bg-[var(--color-secondary)] text-white',
        s.gap,
        s.px,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Produit fabriqué au Congo"
    >
      <Image
        src="/images/drapeau-congo.webp"
        alt=""
        width={s.flagW}
        height={s.flagH}
        className="rounded-sm object-cover"
        aria-hidden="true"
      />
      <span className={s.text}>Made in Congo</span>
    </span>
  );
}
