interface MadeInCongoBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { flag: 'text-xs', text: 'text-xs', gap: 'gap-1', px: 'px-2 py-0.5' },
  md: { flag: 'text-sm', text: 'text-xs', gap: 'gap-1.5', px: 'px-3 py-1' },
  lg: { flag: 'text-base', text: 'text-sm', gap: 'gap-2', px: 'px-4 py-1.5' },
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
      {/* Drapeau Congo simplifié : vert | jaune | rouge */}
      <span
        className={`inline-flex overflow-hidden rounded-sm ${s.flag}`}
        style={{ lineHeight: 1 }}
        aria-hidden="true"
      >
        <span style={{ display: 'inline-block', width: '0.4em', height: '1em', background: '#009A44' }} />
        <span style={{ display: 'inline-block', width: '0.4em', height: '1em', background: '#FBDE4A' }} />
        <span style={{ display: 'inline-block', width: '0.4em', height: '1em', background: '#DC241F' }} />
      </span>
      <span className={s.text}>Made in Congo</span>
    </span>
  );
}
