import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';
import CfpLogo from '@/components/CfpLogo';

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const NAV_LINKS = [
  { href: '/',             key: 'home' },
  { href: '/produits',     key: 'products' },
  { href: '/a-propos',     key: 'about' },
  { href: '/qualite',      key: 'quality' },
  { href: '/distribution', key: 'distribution' },
  { href: '/actualites',   key: 'news' },
  { href: '/contact',      key: 'contact' },
] as const;

const PRODUCT_LINKS = [
  { href: '/produits/pate-arachide-nature',       label: "Pâte d'arachide nature" },
  { href: '/produits/beurre-cacahouete-nature',   label: 'Beurre de cacahouète nature' },
  { href: '/produits/chips-plantain-salees',      label: 'Chips de plantain' },
  { href: '/produits/arachides-enrobees',         label: 'Arachides enrobées' },
  { href: '/produits/croquettes',                 label: 'Croquettes' },
  { href: '/produits/arachides-salees',           label: 'Arachides salées' },
] as const;

export default function Footer() {
  const t  = useTranslations('footer');
  const tn = useTranslations('nav');

  return (
    <footer className="bg-[var(--color-dark)] text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <CfpLogo variant="light" size="md" className="mb-4" />
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              {t('tagline')}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3" aria-label={t('social_title')}>
              {[
                { href: 'https://facebook.com',  icon: FacebookIcon,  label: 'Facebook' },
                { href: 'https://instagram.com', icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://linkedin.com',  icon: LinkedinIcon,  label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-5 font-semibold">
              {t('nav_title')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Products */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-5 font-semibold">
              {t('products_title')}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-label text-xs uppercase tracking-widest text-[var(--color-primary)] mb-5 font-semibold">
              {t('contact_title')}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">
                  {t('address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} color="var(--color-primary)" className="flex-shrink-0" />
                <a
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} color="var(--color-primary)" className="flex-shrink-0" />
                <a
                  href={`mailto:${t('email')}`}
                  className="text-white/70 hover:text-white text-sm transition-colors break-all"
                >
                  {t('email')}
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/242065158296"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              {/* WhatsApp icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">{t('copyright')}</p>
          <div className="flex items-center gap-1">
            {/* Congo flag */}
            <span className="inline-flex overflow-hidden rounded-sm" style={{ width: 18, height: 12 }}>
              <span style={{ display: 'inline-block', width: 6, height: 12, background: '#009A44' }} />
              <span style={{ display: 'inline-block', width: 6, height: 12, background: '#FBDE4A' }} />
              <span style={{ display: 'inline-block', width: 6, height: 12, background: '#DC241F' }} />
            </span>
            <span className="text-white/40 text-xs ml-1.5">Made in Congo 🇨🇬</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
