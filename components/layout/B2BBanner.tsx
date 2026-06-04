'use client';

import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const B2B_PAGES = ['/produits', '/distribution'];

export default function B2BBanner() {
  const pathname = usePathname();
  const t        = useTranslations('b2b_banner');

  const isVisible = B2B_PAGES.some(
    (page) => pathname === page || pathname.startsWith(page + '/')
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div
            className="bg-[var(--color-primary)] text-white py-3 px-4"
            role="banner"
            aria-label="Bandeau professionnel B2B"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              <p className="font-label text-sm uppercase tracking-wide font-semibold">
                {t('text')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-colors whitespace-nowrap"
              >
                {t('cta')}
                <ArrowRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
