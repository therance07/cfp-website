'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import MadeInCongoBadge from './MadeInCongoBadge';
import Badge from './ui/Badge';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/components/cart/CartContext';

export interface ProductCardData {
  slug: string;
  name: string;
  nameFr: string;
  description: string;
  image: string;
  category: string;
  categoryLabel: string;
  conditionnements?: string[];
  variantes?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  prix: number;
  unite: string;
}

interface ProductCardProps {
  product: ProductCardData;
  locale: string;
  index?: number;
  variant?: 'grid' | 'featured';
}

export default function ProductCard({
  product,
  locale,
  index = 0,
  variant = 'grid',
}: ProductCardProps) {
  const href = `/${locale === 'fr' ? '' : locale + '/'}produits/${product.slug}`.replace('//', '/');
  const t = useTranslations('cart');
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      produit_id: product.slug,
      nom: product.nameFr,
      prix_unitaire: product.prix,
      variante: null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 hover:-translate-y-1"
      >
        <Link
          href={href}
          className="flex flex-col flex-1"
          aria-label={`Voir le produit : ${product.nameFr}`}
        >
          <div className="relative h-52 overflow-hidden bg-[var(--color-cream)]">
            <Image
              src={product.image}
              alt={product.nameFr}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <MadeInCongoBadge size="sm" />
              {product.isNew && <Badge variant="primary" size="sm">Nouveau</Badge>}
              {product.isBestSeller && <Badge variant="secondary" size="sm">Bestseller</Badge>}
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-wider mb-1">
              {product.categoryLabel}
            </p>
            <h3 className="font-heading text-[var(--color-dark)] text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {product.nameFr}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {product.description}
            </p>

            {product.conditionnements && product.conditionnements.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.conditionnements.map((c) => (
                  <span key={c} className="text-xs bg-[var(--color-cream)] text-[var(--color-dark)] px-2 py-0.5 rounded-full font-medium">
                    {c}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm font-bold text-[var(--color-dark)] mb-3">
              {formatPrice(product.prix)} <span className="font-normal text-gray-500">/ {product.unite}</span>
            </p>

            <div className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
              <span>Voir le détail</span>
              <ArrowRight size={14} color="var(--color-primary)" />
            </div>
          </div>
        </Link>

        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
          >
            {added ? (
              <>
                <Check size={15} color="currentColor" />
                {t('added')}
              </>
            ) : (
              <>
                <ShoppingBag size={15} color="currentColor" />
                {t('add')}
              </>
            )}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card)] transition-all duration-300"
    >
      <Link
        href={href}
        className="flex flex-col flex-1"
        aria-label={`Voir le produit : ${product.nameFr}`}
      >
        <div className="relative h-44 overflow-hidden bg-[var(--color-cream)]">
          <Image
            src={product.image}
            alt={product.nameFr}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <MadeInCongoBadge size="sm" />
          </div>
          {product.isNew && (
            <div className="absolute top-2 right-2">
              <Badge variant="primary" size="sm">Nouveau</Badge>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <p className="font-label text-[10px] text-[var(--color-primary)] uppercase tracking-wider mb-0.5">
            {product.categoryLabel}
          </p>
          <h3 className="font-heading text-[var(--color-dark)] font-bold mb-1 group-hover:text-[var(--color-primary)] transition-colors">
            {product.nameFr}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 flex-1">{product.description}</p>
          <p className="mt-2 text-sm font-bold text-[var(--color-dark)]">
            {formatPrice(product.prix)} <span className="font-normal text-gray-500">/ {product.unite}</span>
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)]">
            <span>Détail</span>
            <ArrowRight size={12} color="var(--color-primary)" />
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
        >
          {added ? (
            <>
              <Check size={14} color="currentColor" />
              {t('added')}
            </>
          ) : (
            <>
              <ShoppingBag size={14} color="currentColor" />
              {t('add')}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
