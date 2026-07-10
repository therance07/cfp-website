import Image from 'next/image';

interface CfpLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 28, md: 36, lg: 44 };

export default function CfpLogo({ variant: _variant = 'dark', size = 'md', className = '' }: CfpLogoProps) {
  const h = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${className}`} aria-label="Congo Food Process">
      <Image
        src="/images/logo-cfp.png"
        alt="Congo Food Process"
        width={611}
        height={408}
        style={{ height: h, width: 'auto' }}
        priority
      />
    </div>
  );
}
