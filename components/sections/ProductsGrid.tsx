'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, categories, type CategoryId } from '@/lib/products';

interface ProductsGridProps {
  locale: string;
}

export default function ProductsGrid({ locale }: ProductsGridProps) {
  const [active, setActive] = useState<CategoryId>('all');

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filtrer par catégorie">
        {categories.map(({ id, label, labelEn }) => (
          <button
            key={id}
            role="tab"
            aria-selected={active === id}
            onClick={() => setActive(id)}
            className={[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
              active === id
                ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_12px_rgba(242,101,34,0.3)]'
                : 'bg-white text-[var(--color-dark)] hover:bg-[var(--color-cream)] border border-gray-200',
            ].join(' ')}
          >
            {locale === 'en' ? labelEn : label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <AnimatePresence mode="wait">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <ProductCard product={p} locale={locale} index={i} variant="grid" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Aucun produit dans cette catégorie.
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-8">
        {filtered.length} produit{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
      </p>
    </div>
  );
}
