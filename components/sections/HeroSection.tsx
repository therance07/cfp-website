'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import MadeInCongoBadge from '@/components/MadeInCongoBadge';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale: _locale }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Section hero">
      {/* Background image */}
      <Image
        src="/images/hero-arachide.webp"
        alt="Arachides Congo Food Process"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, rgba(26,15,0,0.88) 0%, rgba(26,15,0,0.6) 55%, rgba(46,125,31,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Motif géométrique discret */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #F26522 0, #F26522 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[80px]">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <MadeInCongoBadge size="md" />
            <span className="font-label text-xs text-white/70 uppercase tracking-widest">
              {t('badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-white text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            {t('title')}
            <br />
            <span className="text-[var(--color-primary)]">{t('title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/produits">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} color="white" />}
              >
                {t('cta_products')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                {t('cta_contact')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/50 text-xs font-label uppercase tracking-widest">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color="rgba(255,255,255,0.5)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
