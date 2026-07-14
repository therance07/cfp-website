import Image from 'next/image';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Calendar, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import Badge          from '@/components/ui/Badge';
import { news } from '@/lib/news';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'fr' ? 'Actualités' : 'News',
    description: locale === 'fr'
      ? 'Suivez les dernières actualités de Congo Food Process : nouveaux produits, export, RSE, croissance.'
      : 'Follow the latest news from Congo Food Process: new products, export, CSR, growth.',
  };
}

const CATEGORY_COLORS: Record<string, 'primary' | 'secondary' | 'outline' | 'success'> = {
  products: 'primary',
  company:  'outline',
  export:   'secondary',
  csr:      'success',
};

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  products: { fr: 'Produits',    en: 'Products' },
  company:  { fr: 'Entreprise',  en: 'Company' },
  export:   { fr: 'Export',      en: 'Export' },
  csr:      { fr: 'RSE',         en: 'CSR' },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function ActualitesPage({ params: { locale } }: { params: { locale: string } }) {
  const t    = useTranslations('news');
  const [featured, ...rest] = news;

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--color-dark)] pt-[80px] pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-3">CFP · Presse & Annonces</p>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight mb-3">{t('title')}</h1>
          <p className="text-white/70 text-lg">{t('subtitle')}</p>
        </div>
      </div>

      <SectionWrapper bg="gray" py="lg">
        {/* Featured article */}
        {featured && (
          <Link
            href={`/actualites/${featured.slug}`}
            className="group block mb-10 bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-strong)] transition-shadow lg:flex"
          >
            <div className="relative h-64 lg:h-auto lg:w-[45%] overflow-hidden">
              <Image
                src={featured.image}
                alt={locale === 'fr' ? featured.title : featured.titleEn}
                fill sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={CATEGORY_COLORS[featured.category]} size="md">
                  {CATEGORY_LABELS[featured.category][locale as 'fr' | 'en']}
                </Badge>
                <Badge variant="cream" size="md">Article à la une</Badge>
              </div>
              <h2 className="font-heading text-[var(--color-dark)] text-2xl md:text-3xl font-black mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {locale === 'fr' ? featured.title : featured.titleEn}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {locale === 'fr' ? featured.excerpt : featured.excerptEn}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} color="currentColor" />
                  {formatDate(featured.date, locale)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} color="currentColor" />
                  {featured.readTime} min
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid reste des articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/actualites/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-strong)] transition-all hover:-translate-y-0.5"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={locale === 'fr' ? article.title : article.titleEn}
                  fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={CATEGORY_COLORS[article.category]} size="sm">
                    {CATEGORY_LABELS[article.category][locale as 'fr' | 'en']}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[var(--color-dark)] font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {locale === 'fr' ? article.title : article.titleEn}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {locale === 'fr' ? article.excerpt : article.excerptEn}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} color="currentColor" />
                    {formatDate(article.date, locale)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} color="currentColor" />
                    {article.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
