import Image from 'next/image';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Store, CheckCircle } from 'lucide-react';
import SectionWrapper       from '@/components/SectionWrapper';
import SectionTitle         from '@/components/SectionTitle';
import MadeInCongoBadge     from '@/components/MadeInCongoBadge';
import PartenariatForm      from '@/components/sections/PartenariatForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'fr' ? 'Distribution & Export — Congo Food Process' : 'Distribution & Export — Congo Food Process',
    description: locale === 'fr'
      ? 'Distribution nationale au Congo et export international. Devenez distributeur agréé Congo Food Process.'
      : 'National distribution in Congo and international export. Become an authorised Congo Food Process distributor.',
  };
}

const LOCAL_CHANNELS = [
  { icon: Store, label: 'Supermarchés', desc: 'Présents dans les grandes surfaces de Brazzaville et Pointe-Noire' },
  { icon: Store, label: 'Boutiques partenaires', desc: '50+ boutiques de quartier agréées CFP dans les deux villes' },
  { icon: Store, label: 'Marchés traditionnels', desc: 'Distribution dans les marchés de Brazzaville (Moungali, Bacongo, Makélékélé)' },
  { icon: Store, label: 'Restauration & HoReCa', desc: 'Conditionnements professionnels pour restaurants, hôtels, cantines' },
];

const EXPORT_TARGETS = [
  { region: 'Amérique du Nord', flag: '🇨🇦🇺🇸', detail: 'Communautés africaines, épiceries ethniques, distributeurs spécialisés' },
  { region: 'Europe de l\'Ouest', flag: '🇫🇷🇧🇪', detail: 'Diaspora congolaise, épiceries africaines, circuits bio' },
  { region: 'Afrique de l\'Ouest', flag: '🌍', detail: 'Distributeurs CEDEAO, supermarchés régionaux' },
  { region: 'Afrique centrale', flag: '🇨🇩🇨🇲', detail: 'RDC, Cameroun, Gabon — marchés voisins' },
];

const PARTNER_BENEFITS = [
  'Conditions tarifaires préférentielles dès 10 boîtes/commande',
  'Support marketing : visuels, fiches produits, PLV',
  'Gestionnaire de compte dédié',
  'Livraison flexible : dépôt CFP ou livraison sur site',
  'Accès prioritaire aux nouvelles références',
  'Documentation export complète (pour importateurs)',
];

export default function DistributionPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('distribution');

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt="Distribution Congo Food Process"
          fill priority sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/50 to-transparent" />
        {/* pt réduit : la bannière B2B (toujours visible sur cette page) réserve déjà l'espace du header fixe */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-6">
          <MadeInCongoBadge className="mb-3" />
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight">{t('title')}</h1>
          <p className="text-white/80 text-lg mt-2">{t('subtitle')}</p>
        </div>
      </section>

      {/* Distribution nationale */}
      <SectionWrapper bg="white" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle tag="Congo-Brazzaville" title={t('national_title')} align="left" className="mb-6" />
            <p className="text-gray-600 leading-relaxed mb-8">{t('national_desc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOCAL_CHANNELS.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-3 p-4 bg-[var(--color-cream)] rounded-xl">
                  <div className="w-9 h-9 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={18} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-dark)] text-sm mb-0.5">{label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carte visuelle simplifiée */}
          <div className="relative h-80 rounded-2xl overflow-hidden bg-[var(--color-dark)] flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
              alt="Distribution nationale"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-50"
            />
            <div className="relative z-10 text-center p-6">
              <p className="text-white/60 font-label text-xs uppercase tracking-widest mb-2">Zones couvertes</p>
              {['Brazzaville', 'Pointe-Noire', 'Dolisie (en développement)'].map((city) => (
                <div key={city} className="flex items-center justify-center gap-2 text-white font-semibold py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Export */}
      <SectionWrapper bg="dark" py="lg">
        <SectionTitle
          tag="Marchés internationaux"
          title={t('export_title')}
          subtitle={t('export_desc')}
          theme="light"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPORT_TARGETS.map(({ region, flag, detail }) => (
            <div
              key={region}
              className="p-5 rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/40 hover:bg-white/5 transition-all"
            >
              <div className="text-3xl mb-3">{flag}</div>
              <h3 className="font-heading text-white font-bold mb-2">{region}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'MOQ', value: 'À partir de 50 kg', sub: 'Par référence produit' },
            { label: 'Délai', value: '2-3 semaines', sub: 'Délai de préparation export' },
            { label: 'Incoterms', value: 'EXW / FOB', sub: 'Conditions de livraison' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white/5 rounded-xl p-5 text-center">
              <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-1">{label}</p>
              <p className="font-heading text-white text-xl font-bold">{value}</p>
              <p className="text-white/50 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Avantages partenaires */}
      <SectionWrapper bg="cream" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle tag="Programme partenaires" title={t('partner_title')} align="left" className="mb-6" />
            <p className="text-gray-600 leading-relaxed mb-6">{t('partner_desc')}</p>
            <ul className="flex flex-col gap-3">
              {PARTNER_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} color="var(--color-secondary)" className="flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Partenaires CFP"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Formulaire partenariat */}
      <SectionWrapper bg="white" py="lg">
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            tag="Rejoindre notre réseau"
            title={t('partner_cta')}
            subtitle="Remplissez ce formulaire et notre équipe commerciale vous contacte sous 48h."
            className="mb-10"
          />
          <PartenariatForm locale={locale} />
        </div>
      </SectionWrapper>
    </>
  );
}
