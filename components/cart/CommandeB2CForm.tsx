'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import FormFeedback from '@/components/ui/FormFeedback';
import { useCart } from '@/components/cart/CartContext';
import { submitCommandeB2C } from '@/lib/actions/commande-b2c';

interface CommandeB2CFormProps {
  onSuccess: () => void;
}

export default function CommandeB2CForm({ onSuccess }: CommandeB2CFormProps) {
  const t = useTranslations('cart');
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const schema = useMemo(() => z.object({
    contact_nom: z.string().min(2, t('error_required')),
    telephone: z.string().min(8, t('error_required')).regex(/^[0-9+\s()-]+$/, t('error_phone_invalid')),
    ville: z.string().min(2, t('error_required')),
    adresse_livraison: z.string().min(5, t('error_required')),
    message: z.string().optional(),
  }), [t]);

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const result = await submitCommandeB2C({
        contact_nom: data.contact_nom,
        telephone: data.telephone,
        ville: data.ville,
        adresse_livraison: data.adresse_livraison,
        message: data.message || undefined,
        produits: items.map((item) => ({
          produit_id: item.produit_id,
          nom: item.nom,
          quantite: item.quantite,
          prix_unitaire: item.prix_unitaire,
          variante: item.variante,
        })),
        montant_total: total,
      });
      if (result.success) {
        reset();
        clearCart();
        onSuccess();
      } else {
        setErrorMsg(result.error ?? t('error_generic'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('error_network'));
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4"
      noValidate
    >
      <h2 className="font-heading font-bold text-[var(--color-dark)] text-lg">{t('order_form_title')}</h2>
      {status === 'error' && <FormFeedback type="error" message={errorMsg} />}

      <Input
        label={t('order_name')}
        required
        placeholder={t('order_name_placeholder')}
        {...register('contact_nom')}
        error={errors.contact_nom?.message}
      />
      <Input
        label={t('order_phone')}
        type="tel"
        required
        placeholder={t('order_phone_placeholder')}
        {...register('telephone')}
        error={errors.telephone?.message}
      />
      <Input
        label={t('order_city')}
        required
        placeholder={t('order_city_placeholder')}
        {...register('ville')}
        error={errors.ville?.message}
      />
      <Textarea
        label={t('order_address')}
        required
        rows={2}
        placeholder={t('order_address_placeholder')}
        {...register('adresse_livraison')}
        error={errors.adresse_livraison?.message}
      />
      <Textarea
        label={t('order_notes')}
        rows={2}
        placeholder={t('order_notes_placeholder')}
        {...register('message')}
      />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
        {t('order_submit')}
      </Button>
    </form>
  );
}
