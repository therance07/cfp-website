import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionWrapper from '@/components/SectionWrapper';
import PanierContent from '@/components/cart/PanierContent';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cart' });
  return { title: `${t('title')} — Congo Food Process` };
}

export default async function PanierPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cart' });

  return (
    <>
      {/* Fond sombre : le header est transparent (texte blanc) tant qu'on n'a pas scrollé ;
          sans ce bandeau, le texte blanc serait illisible sur le fond clair de la page */}
      <div className="bg-[var(--color-dark)] pt-[80px] pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-white text-3xl md:text-4xl font-black">{t('title')}</h1>
        </div>
      </div>
      <SectionWrapper bg="cream" py="lg">
        <PanierContent />
      </SectionWrapper>
    </>
  );
}
