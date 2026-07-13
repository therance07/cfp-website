'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { products } from '@/lib/products';

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  isYear?: boolean;
}

const STATS: StatItem[] = [
  { value: 800,  suffix: ' kg',  label: 'Par jour',           sub: "Capacité de transformation" },
  { value: 2017, label: 'Année de fondation', sub: "Une décennie d'expertise", isYear: true },
  { value: 15,   suffix: '+',   label: 'Employés',            sub: 'Équipe qualifiée locale' },
  { value: products.length, label: 'Gammes',   sub: 'Produits transformés' },
  { value: 10,   suffix: '+',   label: 'Fournisseurs',        sub: 'Partenaires congolais' },
];

export default function StatsSection() {
  return (
    <section
      className="relative overflow-hidden py-12"
      style={{ background: 'linear-gradient(135deg, #1A0F00 0%, #2E1A00 100%)' }}
      aria-label="Chiffres clés CFP"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-primary)]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {STATS.map(({ value, suffix, prefix, label, sub, isYear }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="font-heading text-4xl md:text-5xl font-black text-[var(--color-primary)] mb-1 leading-none">
                {isYear ? (
                  <span>
                    <span className="text-2xl md:text-3xl text-white/60 font-semibold mr-1">Depuis</span>
                    <AnimatedCounter target={value} />
                  </span>
                ) : (
                  <AnimatedCounter
                    target={value}
                    suffix={suffix ?? ''}
                    prefix={prefix ?? ''}
                  />
                )}
              </div>
              <p className="font-label text-xs uppercase tracking-wider text-white font-semibold mb-0.5">
                {label}
              </p>
              <p className="text-white/50 text-xs">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-secondary)]/40" aria-hidden="true" />
    </section>
  );
}
