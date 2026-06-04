'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input        from '@/components/ui/Input';
import Select       from '@/components/ui/Select';
import Textarea     from '@/components/ui/Textarea';
import Button       from '@/components/ui/Button';
import FormFeedback from '@/components/ui/FormFeedback';
import { submitCommande } from '@/lib/actions/commande';

const Schema = z.object({
  entreprise:          z.string().min(2, 'Requis'),
  contact_nom:         z.string().min(2, 'Requis'),
  email:               z.string().email('Email invalide'),
  telephone:           z.string().min(8, 'Requis'),
  pays:                z.string().min(2, 'Requis'),
  produits_interesses: z.string().min(3, 'Requis'),
  quantite_estimee:    z.string().optional(),
  message:             z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

const PRODUCT_OPTIONS = [
  { value: 'pate_arachide',   label: 'Pâte d\'arachide nature' },
  { value: 'beurre_lisse',    label: 'Beurre d\'arachide lisse' },
  { value: 'beurre_croustillant', label: 'Beurre d\'arachide croustillant' },
  { value: 'chips_plantain',  label: 'Chips de banane plantain' },
  { value: 'arachides_piment', label: 'Arachides enrobées piment' },
  { value: 'arachides_sucrees', label: 'Arachides caramélisées' },
  { value: 'arachides_salees', label: 'Arachides grillées salées' },
  { value: 'croquettes',      label: 'Croquettes d\'arachide' },
  { value: 'gamme_complete',  label: 'Gamme complète' },
];

export default function CommandeForm({ locale: _locale }: { locale: string }) {
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const result = await submitCommande(data);
      if (result.success) { setStatus('success'); reset(); }
      else { setErrorMsg(result.error ?? 'Erreur'); setStatus('error'); }
    } catch {
      setErrorMsg('Erreur réseau. Réessayez ou contactez-nous sur WhatsApp.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FormFeedback
        type="success"
        message="Demande de commande reçue ! Notre équipe vous contacte sous 48h ouvrées."
        whatsappNumber="242065158296"
        whatsappLabel="Confirmer sur WhatsApp"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {status === 'error' && <FormFeedback type="error" message={errorMsg} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Entreprise" required placeholder="Nom de votre société"
          {...register('entreprise')} error={errors.entreprise?.message}
          className="text-[var(--color-dark)]" />
        <Input label="Contact" required placeholder="Prénom Nom"
          {...register('contact_nom')} error={errors.contact_nom?.message}
          className="text-[var(--color-dark)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Email pro" type="email" required placeholder="email@societe.com"
          {...register('email')} error={errors.email?.message}
          className="text-[var(--color-dark)]" />
        <Input label="Téléphone" type="tel" required placeholder="+XXX XX XX XX XX"
          {...register('telephone')} error={errors.telephone?.message}
          className="text-[var(--color-dark)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Pays" required placeholder="Ex : Canada"
          {...register('pays')} error={errors.pays?.message}
          className="text-[var(--color-dark)]" />
        <Select
          label="Produit(s) souhaité(s)"
          required
          options={PRODUCT_OPTIONS}
          placeholder="Sélectionner…"
          {...register('produits_interesses')}
          error={errors.produits_interesses?.message}
        />
      </div>
      <Input label="Quantité estimée" placeholder="Ex : 200 kg, 500 unités…"
        {...register('quantite_estimee')}
        className="text-[var(--color-dark)]" />
      <Textarea label="Informations complémentaires" placeholder="Fréquence de commande, incoterms souhaités, autres produits…"
        rows={3} {...register('message')}
        className="text-[var(--color-dark)]" />
      <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
        Envoyer la demande
      </Button>
    </form>
  );
}
