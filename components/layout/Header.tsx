'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import CfpLogo from '@/components/CfpLogo';
import Button from '@/components/ui/Button';

const NAV_ITEMS = [
  { href: '/',              key: 'home' },
  { href: '/produits',      key: 'products' },
  { href: '/a-propos',      key: 'about' },
  { href: '/qualite',       key: 'quality' },
  { href: '/distribution',  key: 'distribution' },
  { href: '/actualites',    key: 'news' },
  { href: '/contact',       key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLocale = useCallback(() => {
    const next = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: next });
  }, [locale, pathname, router]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isTransparent = !scrolled && !mobileOpen;
  const logoVariant  = isTransparent ? 'light' : 'dark';
  const linkColor    = isTransparent ? 'text-white/90 hover:text-white' : 'text-[var(--color-dark)] hover:text-[var(--color-primary)]';
  const activeLinkColor = isTransparent ? 'text-white font-bold' : 'text-[var(--color-primary)] font-bold';

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
        ].join(' ')}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">

            {/* Logo */}
            <Link href="/" aria-label="Congo Food Process — Accueil">
              <CfpLogo variant={logoVariant} size="md" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {NAV_ITEMS.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className={[
                    'px-3 py-2 rounded-lg text-sm transition-all duration-200',
                    isActive(href) ? activeLinkColor : linkColor,
                  ].join(' ')}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Locale toggle */}
              <button
                onClick={switchLocale}
                className={[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold',
                  'transition-all duration-200 border',
                  isTransparent
                    ? 'border-white/40 text-white hover:bg-white/15'
                    : 'border-gray-200 text-[var(--color-dark)] hover:bg-[var(--color-cream)]',
                ].join(' ')}
                aria-label={`Passer en ${locale === 'fr' ? 'anglais' : 'français'}`}
              >
                <Globe size={14} color="currentColor" />
                <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              {/* CTA */}
              <Button
                variant={isTransparent ? 'white' : 'primary'}
                size="sm"
                onClick={() => router.push('/contact')}
              >
                {t('cta')}
              </Button>
            </div>

            {/* Mobile: locale + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={switchLocale}
                className={[
                  'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                  isTransparent && !mobileOpen
                    ? 'border-white/40 text-white'
                    : 'border-gray-200 text-[var(--color-dark)]',
                ].join(' ')}
                aria-label={`Passer en ${locale === 'fr' ? 'EN' : 'FR'}`}
              >
                <Globe size={12} color="currentColor" />
                <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className={[
                  'p-2 rounded-lg transition-all',
                  isTransparent && !mobileOpen
                    ? 'text-white hover:bg-white/15'
                    : 'text-[var(--color-dark)] hover:bg-[var(--color-cream)]',
                ].join(' ')}
                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} color="currentColor" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} color="currentColor" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-white pt-[80px] lg:hidden"
          >
            <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Menu mobile">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ href, key }, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05 }}
                  >
                    <Link
                      href={href}
                      className={[
                        'flex items-center px-4 py-3.5 rounded-xl text-base font-semibold transition-all',
                        isActive(href)
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          : 'text-[var(--color-dark)] hover:bg-[var(--color-cream)]',
                      ].join(' ')}
                    >
                      {t(key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile footer */}
            <div className="px-6 py-6 border-t border-gray-100">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => router.push('/contact')}
              >
                {t('cta')}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                +242 06 515 82 96 · contact@congofoodprocess.cg
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
