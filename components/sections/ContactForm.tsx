'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input        from '@/components/ui/Input';
import Textarea     from '@/components/ui/Textarea';
import Button       from '@/components/ui/Button';
import FormFeedback from '@/components/ui/FormFeedback';
import { submitContact } from '@/lib/actions/contact';

const Schema = z.object({
  nom:       z.string().min(2, 'Nom requis'),
  email:     z.string().email('Email invalide'),
  telephone: z.string().optional(),
  objet:     z.string().optional(),
  message:   z.string().min(10, 'Message trop court (10 caractères min.)'),
});

type FormValues = z.infer<typeof Schema>;

export default function ContactForm({ locale: _locale }: { locale: string }) {
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const result = await submitContact(data);
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
        message="Message envoyé ! Nous vous répondrons sous 24h ouvrées."
        whatsappNumber="242065158296"
        whatsappLabel="Discuter sur WhatsApp"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post" className="flex flex-col gap-5" noValidate>
      {status === 'error' && <FormFeedback type="error" message={errorMsg} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nom complet" required placeholder="Prénom Nom" {...register('nom')} error={errors.nom?.message} />
        <Input label="Email" type="email" required placeholder="vous@exemple.com" {...register('email')} error={errors.email?.message} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Téléphone" type="tel" placeholder="+242 06 XXX XX XX" {...register('telephone')} />
        <Input label="Objet" placeholder="Sujet de votre message" {...register('objet')} />
      </div>
      <Textarea label="Message" required placeholder="Décrivez votre demande…" rows={5} {...register('message')} error={errors.message?.message} />
      <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
        Envoyer le message
      </Button>
    </form>
  );
}
