import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Award, Leaf, Lightbulb, Globe, ArrowRight, Star, CheckCircle, Package, FlaskConical, Truck } from 'lucide-react';
import MotionDiv from '@/components/ui/MotionDiv';
import { Link } from '@/i18n/navigation';
import SectionWrapper from '@/components/SectionWrapper';
import SectionTitle   from '@/components/SectionTitle';
import ProductCard    from '@/components/ProductCard';
import Button         from '@/components/ui/Button';
import Badge          from '@/components/ui/Badge';
import { getFeaturedProducts } from '@/lib/products';
import { testimonials } from '@/lib/testimonials';
import HeroSection    from '@/components/sections/HeroSection';
import StatsSection   from '@/components/sections/StatsSection';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: 'Congo Food Process — Transformation Agroalimentaire',
    description: t('subtitle'),
  };
}

const WHY_CFP = [
  { icon: Award,      keyT: 'quality',    color: '#F26522' },
  { icon: Leaf,       keyT: 'local',      color: '#2E7D1F' },
  { icon: Lightbulb,  keyT: 'innovation', color: '#F26522' },
  { icon: Globe,      keyT: 'export',     color: '#2E7D1F' },
] as const;

const PROCESS_STEPS = [
  { num: '01', icon: Leaf,         keyT: 'step1' },
  { num: '02', icon: CheckCircle,  keyT: 'step2' },
  { num: '03', icon: FlaskConical, keyT: 'step3' },
  { num: '04', icon: Award,        keyT: 'step4' },
  { num: '05', icon: Package,      keyT: 'step5' },
  { num: '06', icon: Truck,        keyT: 'step6' },
] as const;

const CERTS = [
  { label: 'CODEX Alimentarius', desc: 'Normes internationales pour la sécurité des aliments' },
  { label: 'HACCP',              desc: 'Hazard Analysis Critical Control Points — maîtrise des risques' },
  { label: 'ISO 22000',          desc: 'Système de management de la sécurité des denrées alimentaires (en cours)' },
  { label: 'Produit du Congo',   desc: 'Label officiel de valorisation des productions nationales' },
];

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const tw   = useTranslations('why_cfp');
  const tp   = useTranslations('process');
  const tb   = useTranslations('b2b');
  const tprd = useTranslations('products');
  const featured = getFeaturedProducts(4);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <HeroSection locale={locale} />

      {/* ── STATS ────────────────────────────────────── */}
      <StatsSection />

      {/* ── PRODUITS PHARES ──────────────────────────── */}
      <SectionWrapper bg="white" py="lg">
        <SectionTitle
          tag="Nos gammes"
          title={tprd('title')}
          subtitle={tprd('subtitle')}
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} index={i} variant="featured" />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/produits">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight size={18} color="var(--color-primary)" />}>
              {tprd('view_all')}
            </Button>
          </Link>
        </div>
      </SectionWrapper>

      {/* ── POURQUOI CFP ─────────────────────────────── */}
      <SectionWrapper bg="cream" py="lg">
        <SectionTitle
          tag="Nos engagements"
          title={tw('title')}
          subtitle={tw('subtitle')}
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CFP.map(({ icon: Icon, keyT, color }, i) => (
            <MotionDiv
              key={keyT}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-strong)] transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: color + '15' }}
              >
                <Icon size={24} color={color} />
              </div>
              <h3 className="font-heading text-[var(--color-dark)] font-bold mb-2">
                {tw(`${keyT}_title` as Parameters<typeof tw>[0])}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {tw(`${keyT}_desc` as Parameters<typeof tw>[0])}
              </p>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* ── PROCESSUS ────────────────────────────────── */}
      <SectionWrapper bg="dark" py="lg">
        <SectionTitle
          tag="De la graine au produit"
          title={tp('title')}
          subtitle={tp('subtitle')}
          theme="light"
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map(({ num, icon: Icon, keyT }, i) => (
            <MotionDiv
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex gap-4 p-5 rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/40 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <Icon size={20} color="var(--color-primary)" />
                </div>
              </div>
              <div>
                <p className="font-label text-[10px] text-[var(--color-primary)] uppercase tracking-widest mb-1">
                  Étape {num}
                </p>
                <h4 className="font-heading text-white font-bold mb-1 text-sm">
                  {tp(`${keyT}_title` as Parameters<typeof tp>[0])}
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  {tp(`${keyT}_desc` as Parameters<typeof tp>[0])}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* ── B2B ──────────────────────────────────────── */}
      <SectionWrapper bg="green" py="lg">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-white">
            <p className="font-label text-xs uppercase tracking-widest text-white/70 mb-3">
              Professionnels & Importateurs
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 leading-tight">
              {tb('title')}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              {tb('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <Button variant="white" size="lg">
                  {tb('cta')}
                </Button>
              </Link>
              <Link href="/distribution">
                <Button variant="secondary" size="lg"
                  className="border-2 border-white/40 bg-transparent text-white hover:bg-white/15">
                  Voir notre offre export
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/distributeur-importateur.webp"
                alt="Export international Congo Food Process"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2E7D1F]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Badge variant="secondary">Export-ready</Badge>
                <Badge variant="primary">MOQ flexible</Badge>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── TÉMOIGNAGES ──────────────────────────────── */}
      <SectionWrapper bg="cream" py="lg">
        <SectionTitle
          tag="Ils nous font confiance"
          title="Nos partenaires témoignent"
          subtitle="Distributeurs, importateurs et clients — ils partagent leur expérience avec CFP"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <MotionDiv
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--color-primary)" color="var(--color-primary)" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--color-cream)] flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-dark)] text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CERTIFICATIONS ───────────────────────────── */}
      <SectionWrapper bg="white" py="md">
        <SectionTitle
          tag="Qualité & Conformité"
          title="Nos engagements qualité"
          subtitle="Des standards rigoureux pour des produits fiables, du Congo au monde"
          className="mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map(({ label, desc }, i) => (
            <MotionDiv
              key={label}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-5 rounded-xl border-2 border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
                <CheckCircle size={22} color="var(--color-primary)" />
              </div>
              <p className="font-heading font-bold text-[var(--color-dark)] text-sm mb-1">{label}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CTA FINAL ────────────────────────────────── */}
      <SectionWrapper bg="orange" py="lg">
        <div className="text-center text-white max-w-2xl mx-auto">
          <p className="font-label text-xs uppercase tracking-widest text-white/80 mb-3">
            Passez à l&apos;action
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 leading-tight">
            Prêt à commander ou devenir partenaire ?
          </h2>
          <p className="text-white/85 text-lg mb-8 leading-relaxed">
            Contactez notre équipe pour discuter de vos besoins — particulier, distributeur ou importateur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="white" size="lg">
                Passer une commande
              </Button>
            </Link>
            <Link href="/distribution">
              <Button size="lg"
                className="border-2 border-white/50 bg-transparent text-white hover:bg-white/20 inline-flex items-center gap-2 px-8 py-4 text-lg rounded-lg font-semibold transition-all"
              >
                Devenir distributeur
              </Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
