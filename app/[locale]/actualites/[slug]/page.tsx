import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import SectionWrapper from '@/components/SectionWrapper';
import Badge          from '@/components/ui/Badge';
import { getNewsBySlug, news } from '@/lib/news';

interface Props { params: { locale: string; slug: string } }

export async function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const article = getNewsBySlug(slug);
  if (!article) return { title: 'Article introuvable' };
  return {
    title: `${locale === 'fr' ? article.title : article.titleEn} — CFP`,
    description: locale === 'fr' ? article.excerpt : article.excerptEn,
  };
}

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

function renderContent(content: string) {
  return content.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return (
        <h3 key={i} className="font-heading text-[var(--color-dark)] text-xl font-bold mt-6 mb-2">
          {para.replace(/\*\*/g, '')}
        </h3>
      );
    }
    if (para.startsWith('- ')) {
      const items = para.split('\n').map((line) => line.replace(/^- /, ''));
      return (
        <ul key={i} className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 my-3">
          {items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    }
    return (
      <p key={i} className="text-gray-700 leading-relaxed">
        {para.replace(/\*\*(.*?)\*\*/g, '$1')}
      </p>
    );
  });
}

export default async function ArticleDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);

  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const title   = locale === 'fr' ? article.title   : article.titleEn;
  const excerpt = locale === 'fr' ? article.excerpt  : article.excerptEn;
  const content = locale === 'fr' ? article.content  : article.contentEn;
  const catLabel = CATEGORY_LABELS[article.category][locale as 'fr' | 'en'];

  const related = news.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero image */}
      <div className="relative h-80 md:h-[460px] overflow-hidden">
        <Image src={article.image} alt={title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-[var(--color-dark)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8 pt-[80px]">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{catLabel}</Badge>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <Calendar size={13} color="currentColor" />
              {formatDate(article.date, locale)}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <Clock size={13} color="currentColor" />
              {article.readTime} min
            </span>
          </div>
          <h1 className="font-heading text-white text-3xl md:text-4xl font-black leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <SectionWrapper bg="white" py="lg">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-8"
          >
            <ArrowLeft size={14} color="currentColor" />
            Toutes les actualités
          </Link>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8 pb-8 border-b border-gray-100">
            {excerpt}
          </p>

          {/* Content */}
          <div className="flex flex-col gap-4 mb-10">
            {renderContent(content)}
          </div>

          {/* Author + Share */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-label mb-0.5">Publié par</p>
              <p className="font-semibold text-[var(--color-dark)]">{article.author}</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Partager cet article"
            >
              <Share2 size={14} color="currentColor" />
              Partager
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* Articles liés */}
      {related.length > 0 && (
        <SectionWrapper bg="cream" py="md">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-[var(--color-dark)] text-xl mb-6">
              {locale === 'fr' ? 'Sur le même sujet' : 'Related articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group flex gap-4 bg-white rounded-xl p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-strong)] transition-shadow"
                >
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={a.image} alt={locale === 'fr' ? a.title : a.titleEn} fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-dark)] text-sm group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {locale === 'fr' ? a.title : a.titleEn}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(a.date, locale)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
