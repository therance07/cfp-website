interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const sizeMap = { sm: 16, md: 24, lg: 40 };

export default function Spinner({ size = 'md', color = 'var(--color-primary)', className = '' }: SpinnerProps) {
  const px = sizeMap[size];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      className={`animate-spin ${className}`}
      aria-label="Chargement…"
      role="status"
    >
      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.25" stroke={color} />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} />
    </svg>
  );
}
