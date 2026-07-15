import Image from 'next/image';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import MotionDiv from '@/components/ui/MotionDiv';
import { CheckCircle, Microscope, ClipboardCheck, ShieldCheck, FileText, Award } from 'lucide-react';
import SectionWrapper   from '@/components/SectionWrapper';
import SectionTitle     from '@/components/SectionTitle';
import Badge            from '@/components/ui/Badge';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'fr' ? 'Qualité & Certifications' : 'Quality & Certifications',
    description: locale === 'fr'
      ? 'Politique qualité, certifications et contrôles rigoureux de Congo Food Process pour des produits alimentaires sûrs et fiables.'
      : 'Quality policy, certifications and rigorous controls of Congo Food Process for safe and reliable food products.',
  };
}

const TIMELINE = [
  { step: '01', icon: CheckCircle,   title: 'Réception matières premières', desc: 'Contrôle visuel, olfactif et physico-chimique à la réception. Chaque lot est tracé et enregistré. Refus systématique des lots non conformes.', color: '#F26522' },
  { step: '02', icon: ClipboardCheck, title: 'Tri & Nettoyage',              desc: 'Élimination des impuretés, corps étrangers et grains abîmés. Calibrage par taille pour une transformation homogène.', color: '#2E7D1F' },
  { step: '03', icon: Microscope,     title: 'Transformation contrôlée',     desc: 'Température, durée et pression surveillées en temps réel. Paramètres enregistrés pour la traçabilité.', color: '#F26522' },
  { step: '04', icon: Award,          title: 'Contrôle qualité produit fini', desc: 'Analyse organoleptique (goût, texture, couleur, odeur), tests microbiologiques et analyse de la composition.', color: '#2E7D1F' },
  { step: '05', icon: ShieldCheck,    title: 'Conditionnement hygiénique',    desc: 'Zone de conditionnement séparée, emballages hermétiques, étiquetage réglementaire bilingue (FR/EN).', color: '#F26522' },
  { step: '06', icon: FileText,       title: 'Documentation & traçabilité',  desc: 'Numéro de lot, date de fabrication et DLC sur chaque produit. Registre complet disponible pour les acheteurs professionnels.', color: '#2E7D1F' },
];

const CERTIFICATIONS = [
  { name: 'CODEX Alimentarius', body: 'FAO / OMS', status: 'Conforme', desc: 'Normes internationales pour la sécurité et la qualité des denrées alimentaires. CFP respecte les exigences CODEX dans ses processus de transformation.', icon: '🌍' },
  { name: 'HACCP', body: 'Norme internationale', status: 'Conforme', desc: 'Hazard Analysis and Critical Control Points. Système d\'analyse des risques et de maîtrise des points critiques appliqué à toute la chaîne de production.', icon: '🔬' },
  { name: 'ISO 22000', body: 'ISO', status: 'En cours', desc: 'Système de management de la sécurité des denrées alimentaires. Audit externe en cours, certification attendue en 2025.', icon: '📋' },
  { name: 'Produit du Congo', body: 'Gouvernement de la République du Congo', status: 'Obtenu', desc: 'Label officiel de valorisation des produits locaux congolais. Garantit l\'origine et la fabrication nationale.', icon: 'flag' },
];

export default function QualitePage({ params: { locale: _locale } }: { params: { locale: string } }) {
  const t = useTranslations('quality');

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <Image
          src="/images/qualite-certieication.webp"
          alt="Contrôle qualité Congo Food Process"
          fill priority sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-[80px]">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-2">Confiance & Rigueur</p>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight">{t('title')}</h1>
          <p className="text-white/80 text-lg mt-2 max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Politique qualité */}
      <SectionWrapper bg="white" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle tag="Notre engagement" title={t('policy_title')} align="left" className="mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">{t('policy_desc')}</p>
            <p className="text-gray-600 leading-relaxed">
              Chez CFP, chaque employé est formé aux bonnes pratiques d&apos;hygiène alimentaire. La qualité est
              l&apos;affaire de tous, du manutentionnaire à la direction.
            </p>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image
              src="/images/qualite-engagement.webp"
              alt="Engagement qualité et conformité, Congo Food Process"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline processus */}
      <SectionWrapper bg="cream" py="lg">
        <SectionTitle
          tag="Étape par étape"
          title="Notre processus qualité"
          subtitle="De la matière première au produit fini : la qualité contrôlée à chaque étape"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE.map(({ step, icon: Icon, title, desc, color }, i) => (
            <MotionDiv
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '15' }}>
                  <Icon size={20} color={color} />
                </div>
                <span className="font-label text-xs uppercase tracking-widest font-semibold text-gray-400">
                  Étape {step}
                </span>
              </div>
              <h3 className="font-heading font-bold text-[var(--color-dark)] mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* Laboratoire */}
      <SectionWrapper bg="dark" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/controle-interne.webp"
              alt="Arachides triées pour contrôle qualité interne"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="text-white order-1 lg:order-2">
            <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-3">Contrôle interne</p>
            <h2 className="font-heading text-3xl font-black mb-4">{t('lab_title')}</h2>
            <p className="text-white/80 leading-relaxed mb-6">{t('lab_desc')}</p>
            <ul className="flex flex-col gap-3">
              {['Analyses microbiologiques (bactéries, levures, moisissures)', 'Tests organoleptiques (goût, texture, couleur)', 'Contrôles physico-chimiques (pH, humidité, teneur en sel)', 'Traçabilité des lots par numérotation unique'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                  <CheckCircle size={14} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper bg="white" py="lg">
        <SectionTitle
          tag="Nos engagements formels"
          title={t('standards_title')}
          subtitle="CFP s'aligne sur les référentiels internationaux les plus exigeants"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map(({ name, body, status, desc, icon }, i) => (
            <MotionDiv
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="flex-shrink-0">
                {icon === 'flag' ? (
                  <Image src="/images/drapeau-congo.webp" alt="" width={32} height={22} className="rounded-sm object-cover" />
                ) : (
                  <div className="text-3xl">{icon}</div>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-[var(--color-dark)]">{name}</h3>
                  <Badge variant={status === 'En cours' ? 'warning' : 'success'} size="sm">{status}</Badge>
                </div>
                <p className="text-[var(--color-primary)] text-xs font-semibold mb-2">{body}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </SectionWrapper>

      {/* Export compliance */}
      <SectionWrapper bg="cream" py="md">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-3">Pour les acheteurs B2B</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-[var(--color-dark)] mb-4">{t('export_title')}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{t('export_desc')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Fiches techniques produits', 'Certificats d\'analyse', 'Bilan nutritionnel', 'Déclarations d\'ingrédients', 'Documentation douanière'].map((doc) => (
              <span key={doc} className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-[var(--color-dark)] font-medium shadow-sm">
                <FileText size={14} color="var(--color-primary)" />
                {doc}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
