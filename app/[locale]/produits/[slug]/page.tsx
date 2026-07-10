import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import SectionWrapper    from '@/components/SectionWrapper';
import Button            from '@/components/ui/Button';
import Badge             from '@/components/ui/Badge';
import MadeInCongoBadge  from '@/components/MadeInCongoBadge';
import ProductCard       from '@/components/ProductCard';
import SectionTitle      from '@/components/SectionTitle';
import { getProductBySlug, products } from '@/lib/products';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Produit introuvable' };
  return {
    title: `${product.nameFr} — Congo Food Process`,
    description: product.description,
  };
}

const NUTRITIONAL = [
  { label: 'Valeur énergétique', value: '598 kcal / 2 503 kJ' },
  { label: 'Graisses',           value: '50 g' },
  { label: 'dont saturées',      value: '9 g' },
  { label: 'Glucides',           value: '16 g' },
  { label: 'dont sucres',        value: '5 g' },
  { label: 'Protéines',          value: '26 g' },
  { label: 'Sel',                value: '0.3 g' },
] as const;

const USES = [
  'Tartiner sur du pain ou des crackers',
  'Incorporation dans les sauces traditionnelles',
  'Base pour smoothies et recettes sucrées',
  'Ingredient culinaire professionnel',
  'Snacking nutritif',
];

export default async function ProductDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[var(--color-cream)] border-b border-gray-100 pt-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/produits" className="hover:text-[var(--color-primary)] transition-colors">Produits</Link>
          <span>/</span>
          <span className="text-[var(--color-dark)] font-medium">{product.nameFr}</span>
        </div>
      </div>

      {/* Main product section */}
      <SectionWrapper bg="white" py="md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden bg-[var(--color-cream)]">
              <Image
                src={product.image}
                alt={product.nameFr}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <MadeInCongoBadge />
              {product.isBestSeller && <Badge variant="primary">Bestseller</Badge>}
              {product.isNew && <Badge variant="secondary">Nouveau</Badge>}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
            >
              <ArrowLeft size={14} color="currentColor" />
              Retour aux produits
            </Link>

            <div>
              <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-2">
                {product.categoryLabel}
              </p>
              <h1 className="font-heading text-[var(--color-dark)] text-3xl md:text-4xl font-black mb-4 leading-tight">
                {product.nameFr}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Conditionnements */}
            {product.conditionnements && product.conditionnements.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} color="var(--color-primary)" />
                  <p className="font-semibold text-[var(--color-dark)] text-sm">Conditionnements disponibles</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.conditionnements.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-lg border-2 border-[var(--color-primary)]/20 bg-[var(--color-cream)] text-[var(--color-dark)] text-sm font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Usages */}
            <div>
              <p className="font-semibold text-[var(--color-dark)] text-sm mb-3">Utilisations</p>
              <ul className="flex flex-col gap-2">
                {USES.map((use) => (
                  <li key={use} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} color="var(--color-secondary)" className="flex-shrink-0 mt-0.5" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" fullWidth>
                  Commander ce produit
                </Button>
              </Link>
              <a href="https://wa.me/242065158296" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  fullWidth
                  className="bg-[#25D366] text-white hover:bg-[#20BB5A] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base transition-colors"
                >
                  Demander un tarif
                </Button>
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Valeurs nutritives */}
      <SectionWrapper bg="cream" py="md">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-6">
            Informations nutritionnelles
          </h2>
          <p className="text-gray-500 text-sm mb-4">Valeurs pour 100g de produit (données indicatives)</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
            <div className="bg-[var(--color-dark)] px-6 py-3">
              <p className="text-white font-label text-xs uppercase tracking-wider">Pour 100g</p>
            </div>
            <div className="divide-y divide-gray-100">
              {NUTRITIONAL.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-6 py-3">
                  <span className={`text-sm ${label.startsWith('dont') ? 'text-gray-400 pl-4' : 'text-[var(--color-dark)] font-medium'}`}>
                    {label}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-dark)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Valeurs fictives à titre indicatif. Consultez l&apos;étiquette officielle du produit.</p>
        </div>
      </SectionWrapper>

      {/* Related products */}
      {related.length > 0 && (
        <SectionWrapper bg="white" py="md">
          <SectionTitle
            tag="Dans la même gamme"
            title="Produits similaires"
            align="left"
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} locale={locale} index={i} variant="featured" />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
