'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice } from '@/lib/format';
import Button from '@/components/ui/Button';
import FormFeedback from '@/components/ui/FormFeedback';
import CommandeB2CForm from '@/components/cart/CommandeB2CForm';

export default function PanierContent() {
  const t = useTranslations('cart');
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (orderConfirmed) {
    return (
      <div className="text-center py-16">
        <FormFeedback
          type="success"
          message={t('order_success')}
          whatsappNumber="242065158296"
          whatsappLabel={t('order_whatsapp_cta')}
        />
        <Link
          href="/produits"
          className="inline-block mt-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          {t('empty_cta')}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white flex items-center justify-center">
          <ShoppingBag size={28} color="var(--color-primary)" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-2">{t('empty_title')}</h1>
        <p className="text-gray-500 mb-6">{t('empty_desc')}</p>
        <Link href="/produits">
          <Button variant="primary">{t('empty_cta')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={`${item.produit_id}-${item.variante ?? 'default'}`}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-xl border border-gray-100 p-4"
          >
            <div className="flex-1">
              <p className="font-semibold text-[var(--color-dark)]">{item.nom}</p>
              {item.variante && <p className="text-sm text-gray-500">{item.variante}</p>}
              <p className="text-sm text-gray-500 mt-1">
                {t('unit_price')} : {formatPrice(item.prix_unitaire)}
              </p>
            </div>

            <div className="flex items-center border-2 border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => updateQuantity(item.produit_id, item.variante, item.quantite - 1)}
                className="p-2 text-[var(--color-dark)] hover:bg-[var(--color-cream)] transition-colors"
                aria-label="-1"
              >
                <Minus size={14} color="currentColor" />
              </button>
              <span className="w-10 text-center font-semibold text-[var(--color-dark)]">{item.quantite}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.produit_id, item.variante, item.quantite + 1)}
                className="p-2 text-[var(--color-dark)] hover:bg-[var(--color-cream)] transition-colors"
                aria-label="+1"
              >
                <Plus size={14} color="currentColor" />
              </button>
            </div>

            <p className="font-bold text-[var(--color-dark)] sm:w-24 sm:text-right">
              {formatPrice(item.prix_unitaire * item.quantite)}
            </p>

            <button
              type="button"
              onClick={() => removeFromCart(item.produit_id, item.variante)}
              className="self-start sm:self-auto p-2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label={t('remove')}
            >
              <Trash2 size={16} color="currentColor" />
            </button>
          </div>
        ))}

        <Link
          href="/produits"
          className="text-sm font-semibold text-[var(--color-primary)] hover:underline mt-2 self-start"
        >
          {t('continue_shopping')}
        </Link>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
          <div className="flex items-center justify-between text-lg font-bold text-[var(--color-dark)]">
            <span>{t('total')}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <CommandeB2CForm onSuccess={() => setOrderConfirmed(true)} />
      </div>
    </div>
  );
}
