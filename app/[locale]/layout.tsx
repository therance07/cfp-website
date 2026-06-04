import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Montserrat, Nunito_Sans, Barlow_Condensed } from 'next/font/google';
import Header        from '@/components/layout/Header';
import Footer        from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import B2BBanner     from '@/components/layout/B2BBanner';
import '../globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  adjustFontFallback: false,
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const locales = ['fr', 'en'] as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: {
      default: 'Congo Food Process — Transformation Agroalimentaire',
      template: '%s | Congo Food Process',
    },
    description: t('subtitle'),
    openGraph: {
      siteName: 'Congo Food Process',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    metadataBase: new URL('https://congofoodprocess.cg'),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${nunitoSans.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <B2BBanner />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
