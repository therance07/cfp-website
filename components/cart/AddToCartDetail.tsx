'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCart } from '@/components/cart/CartContext';
import type { ProductCardData } from '@/components/ProductCard';

interface AddToCartDetailProps {
  product: ProductCardData;
}

export default function AddToCartDetail({ product }: AddToCartDetailProps) {
  const t = useTranslations('cart');
  const { addToCart } = useCart();
  const hasVariantes = !!product.variantes && product.variantes.length > 0;

  const [variante, setVariante] = useState<string | null>(
    hasVariantes ? product.variantes![0] : null
  );
  const [quantite, setQuantite] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      produit_id: product.slug,
      nom: product.nameFr,
      prix_unitaire: product.prix,
      variante,
      quantite,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[var(--color-cream)] border-2 border-[var(--color-primary)]/10">
      {hasVariantes && (
        <div>
          <p className="font-semibold text-[var(--color-dark)] text-sm mb-3">{t('choose_variant')}</p>
          <div className="flex flex-wrap gap-2">
            {product.variantes!.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariante(v)}
                aria-pressed={variante === v}
                className={[
                  'px-3 py-1.5 rounded-lg border-2 text-sm font-semibold transition-all',
                  variante === v
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-[var(--color-secondary)]/20 bg-white text-[var(--color-dark)] hover:border-[var(--color-primary)]/40',
                ].join(' ')}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            className="p-2.5 text-[var(--color-dark)] hover:bg-[var(--color-cream)] transition-colors"
            aria-label="-1"
          >
            <Minus size={14} color="currentColor" />
          </button>
          <span className="w-10 text-center font-semibold text-[var(--color-dark)]">{quantite}</span>
          <button
            type="button"
            onClick={() => setQuantite((q) => q + 1)}
            className="p-2.5 text-[var(--color-dark)] hover:bg-[var(--color-cream)] transition-colors"
            aria-label="+1"
          >
            <Plus size={14} color="currentColor" />
          </button>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleAdd}
          className="flex-1"
          leftIcon={added ? <Check size={18} color="currentColor" /> : <ShoppingBag size={18} color="currentColor" />}
        >
          {added ? t('added') : t('add')}
        </Button>
      </div>
    </div>
  );
}
