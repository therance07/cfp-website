'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input       from '@/components/ui/Input';
import Select      from '@/components/ui/Select';
import Textarea    from '@/components/ui/Textarea';
import Button      from '@/components/ui/Button';
import FormFeedback from '@/components/ui/FormFeedback';
import { submitPartenariat } from '@/lib/actions/partenariat';

const Schema = z.object({
  entreprise:        z.string().min(2, 'Requis'),
  contact_nom:       z.string().min(2, 'Requis'),
  email:             z.string().email('Email invalide'),
  telephone:         z.string().min(8, 'Téléphone requis'),
  pays:              z.string().min(2, 'Requis'),
  type_partenariat:  z.string().min(2, 'Requis'),
  zone_distribution: z.string().optional(),
  message:           z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

const TYPE_OPTIONS = [
  { value: 'distributeur_local',    label: 'Distributeur local (Congo)' },
  { value: 'distributeur_regional', label: 'Distributeur régional (Afrique)' },
  { value: 'importateur',           label: 'Importateur international' },
  { value: 'grossiste',             label: 'Grossiste' },
  { value: 'autre',                 label: 'Autre' },
];

export default function PartenariatForm({ locale: _locale }: { locale: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const result = await submitPartenariat(data);
      if (result.success) {
        setStatus('success');
        reset();
      } else {
        setErrorMsg(result.error ?? 'Erreur inconnue');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Une erreur réseau est survenue.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <FormFeedback
        type="success"
        message="Demande reçue ! Notre équipe commerciale vous contacte sous 48h ouvrées."
        whatsappNumber="242065158296"
        whatsappLabel="Accélérer via WhatsApp"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {status === 'error' && (
        <FormFeedback type="error" message={errorMsg} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Nom de l'entreprise"
          required
          placeholder="Ex : Société ABC"
          {...register('entreprise')}
          error={errors.entreprise?.message}
        />
        <Input
          label="Nom du contact"
          required
          placeholder="Prénom Nom"
          {...register('contact_nom')}
          error={errors.contact_nom?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Email professionnel"
          type="email"
          required
          placeholder="email@societe.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Téléphone"
          type="tel"
          required
          placeholder="+242 06 XXX XX XX"
          {...register('telephone')}
          error={errors.telephone?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Pays"
          required
          placeholder="Ex : Congo-Brazzaville"
          {...register('pays')}
          error={errors.pays?.message}
        />
        <Select
          label="Type de partenariat"
          required
          options={TYPE_OPTIONS}
          placeholder="Sélectionner…"
          {...register('type_partenariat')}
          error={errors.type_partenariat?.message}
        />
      </div>

      <Input
        label="Zone de distribution souhaitée"
        placeholder="Ex : Brazzaville, Pointe-Noire, Montréal…"
        {...register('zone_distribution')}
      />

      <Textarea
        label="Informations complémentaires"
        placeholder="Décrivez votre activité, vos attentes, vos volumes estimés…"
        rows={4}
        {...register('message')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={status === 'loading'}
      >
        Soumettre la demande
      </Button>

      <p className="text-xs text-gray-400 text-center">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par l&apos;équipe CFP.
      </p>
    </form>
  );
}
