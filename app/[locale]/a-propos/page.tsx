import Image from 'next/image';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Shield, Users, MapPin, Award } from 'lucide-react';
import SectionWrapper   from '@/components/SectionWrapper';
import SectionTitle     from '@/components/SectionTitle';
import MadeInCongoBadge from '@/components/MadeInCongoBadge';
import AnimatedCounter  from '@/components/AnimatedCounter';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'fr' ? 'À Propos — Congo Food Process' : 'About Us — Congo Food Process',
    description: locale === 'fr'
      ? 'Découvrez l\'histoire, la mission et les valeurs de Congo Food Process, fondée en 2017 à Brazzaville.'
      : 'Discover the history, mission and values of Congo Food Process, founded in 2017 in Brazzaville.',
  };
}

const VALUES = [
  { icon: Award,      label: 'Qualité',       desc: 'Chaque produit est soumis à des contrôles stricts avant distribution.' },
  { icon: Shield,     label: 'Transparence',   desc: 'Traçabilité totale de la matière première au produit fini.' },
  { icon: Lightbulb,  label: 'Innovation',     desc: 'R&D continue pour développer des produits adaptés aux marchés locaux et internationaux.' },
  { icon: Heart,      label: 'Éthique',        desc: 'Partenariats équitables avec nos fournisseurs agricoles congolais.' },
  { icon: Users,      label: 'Proximité',      desc: 'Ancrage local fort, emplois prioritairement locaux, impact communautaire réel.' },
  { icon: MapPin,     label: 'Ancrage Congo',  desc: 'Fiers de valoriser les ressources naturelles congolaises pour le monde.' },
];

const TEAM = [
  { name: 'Évariste Mavoungou', role: 'Directeur Général & Co-fondateur', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Clarisse Bitsindou', role: 'Directrice Qualité & Production', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Roland Ngakosso',    role: 'Directeur Commercial & Export',   image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Pélagie Moukengue',  role: 'Responsable RSE & Partenariats', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

export default function AProposPage({ params: { locale: _locale } }: { params: { locale: string } }) {
  const t = useTranslations('about');

  return (
    <>
      {/* Hero */}
      <section className="relative h-80 md:h-[420px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="Équipe Congo Food Process"
          fill priority sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-[80px]">
          <MadeInCongoBadge className="mb-3" />
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight">
            {t('title')}
          </h1>
          <p className="text-white/80 text-lg mt-2 max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* Histoire */}
      <SectionWrapper bg="white" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              tag="Notre genèse"
              title="Une histoire ancrée dans le Congo"
              align="left"
              className="mb-6"
            />
            <p className="text-gray-600 leading-relaxed mb-4">{t('history')}</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Partis de zéro en 2017 avec une première presse artisanale, les fondateurs de CFP ont progressivement
              mécanisé l&apos;atelier, formé une équipe locale et développé une gamme de 7 produits désormais distribués
              à Brazzaville, Pointe-Noire et à l&apos;international.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: 800, suf: ' kg', lbl: 'Capacité/jour' },
                { val: 15,  suf: '+',  lbl: 'Employés' },
                { val: 7,   suf: '',   lbl: 'Gammes' },
              ].map(({ val, suf, lbl }) => (
                <div key={lbl} className="text-center p-4 bg-[var(--color-cream)] rounded-xl">
                  <p className="font-heading text-3xl font-black text-[var(--color-primary)]">
                    <AnimatedCounter target={val} suffix={suf} />
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-label uppercase tracking-wide">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80"
              alt="Usine CFP à Mpila"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Mission */}
      <SectionWrapper bg="dark" py="lg">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-4">
            Notre raison d&apos;être
          </p>
          <h2 className="font-heading text-white text-3xl md:text-4xl font-black mb-6 leading-tight">
            {t('mission_title')}
          </h2>
          <p className="text-white/80 text-xl leading-relaxed">
            &ldquo;{t('mission')}&rdquo;
          </p>
        </div>
      </SectionWrapper>

      {/* Valeurs */}
      <SectionWrapper bg="cream" py="lg">
        <SectionTitle
          tag="Ce qui nous guide"
          title={t('values_title')}
          subtitle="Six principes fondamentaux qui orientent chaque décision chez CFP"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-[var(--shadow-card)]"
            >
              <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={20} color="var(--color-primary)" />
              </div>
              <h3 className="font-heading font-bold text-[var(--color-dark)] mb-2">{label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Équipe */}
      <SectionWrapper bg="white" py="lg">
        <SectionTitle
          tag="Les visages de CFP"
          title={t('team_title')}
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, image }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[var(--color-cream)]">
                <Image src={image} alt={name} fill sizes="128px" className="object-cover" />
              </div>
              <h3 className="font-heading font-bold text-[var(--color-dark)]">{name}</h3>
              <p className="text-[var(--color-primary)] text-sm font-semibold">{role}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Usine */}
      <SectionWrapper bg="green" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="font-label text-xs text-white/70 uppercase tracking-widest mb-3">Zone SIASIC, Mpila</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4">{t('factory_title')}</h2>
            <p className="text-white/80 leading-relaxed mb-6">{t('factory_desc')}</p>
            <ul className="flex flex-col gap-3">
              {['Équipements industriels modernes', 'Laboratoire de contrôle qualité', 'Normes d\'hygiène alimentaire internationales', 'Capacité : 800 kg/jour'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/90 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80"
              alt="Atelier de production CFP"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
