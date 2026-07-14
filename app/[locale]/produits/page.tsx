import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionWrapper    from '@/components/SectionWrapper';
import ProductsGrid      from '@/components/sections/ProductsGrid';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: locale === 'fr' ? 'Nos Produits' : 'Our Products',
    description: t('subtitle'),
  };
}

export default async function ProduitsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'products' });

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden" aria-label="Hero Produits">
        <Image
          src="/images/arachide-produit.webp"
          alt="Gamme de produits Congo Food Process"
          fill priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/50 to-transparent" />
        {/* pt réduit : la bannière B2B (toujours visible sur cette page) réserve déjà l'espace du header fixe */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-6">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-2">
            Made in Congo
          </p>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight">
            {t('title')}
          </h1>
          <p className="text-white/80 text-lg mt-2 max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Products grid with filter */}
      <SectionWrapper bg="gray" py="lg">
        <ProductsGrid locale={locale} />
      </SectionWrapper>
    </>
  );
}
