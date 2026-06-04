interface CfpLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 28, md: 36, lg: 44 };

export default function CfpLogo({ variant = 'dark', size = 'md', className = '' }: CfpLogoProps) {
  const h = sizeMap[size];
  const textColor = variant === 'light' ? '#FFFFFF' : '#1A0F00';
  const dotColor = '#F26522';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} aria-label="Congo Food Process">
      {/* Icône */}
      <svg width={h} height={h} viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="22" fill="#F26522" />
        {/* Feuille stylisée */}
        <path
          d="M22 10 C22 10 30 16 30 24 C30 30 26.5 33 22 33 C17.5 33 14 30 14 24 C14 16 22 10 22 10Z"
          fill="white"
          opacity="0.9"
        />
        {/* Grain d'arachide */}
        <ellipse cx="22" cy="23" rx="4" ry="5.5" fill="#F26522" />
        <ellipse cx="22" cy="23" rx="2.5" ry="4" fill="white" opacity="0.6" />
        {/* Bande verte en bas */}
        <path
          d="M8 32 Q22 36 36 32 L36 38 Q22 42 8 38 Z"
          fill="#2E7D1F"
          opacity="0.85"
        />
      </svg>

      {/* Texte */}
      <div className="leading-none">
        <div
          className="font-heading font-black tracking-tight"
          style={{
            fontSize: h * 0.42,
            color: dotColor,
            fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
          }}
        >
          CFP
        </div>
        <div
          className="font-label uppercase tracking-widest"
          style={{
            fontSize: h * 0.22,
            color: textColor,
            fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)',
            letterSpacing: '0.12em',
          }}
        >
          Congo Food Process
        </div>
      </div>
    </div>
  );
}
