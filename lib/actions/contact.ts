'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import type { ContactInsert } from '@/types/supabase';

const ContactSchema = z.object({
  nom:       z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  email:     z.string().email('Adresse email invalide'),
  telephone: z.string().optional(),
  objet:     z.string().optional(),
  message:   z.string().min(10, 'Le message doit comporter au moins 10 caractères'),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitContact(data: ContactFormData): Promise<ActionResult> {
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Données invalides' };
  }

  const insert: ContactInsert = {
    nom:       parsed.data.nom,
    email:     parsed.data.email,
    telephone: parsed.data.telephone ?? null,
    objet:     parsed.data.objet ?? null,
    message:   parsed.data.message,
  };

  const { error } = await supabase.from('contacts').insert(insert as never);

  if (error) {
    console.error('Supabase contact error:', error);
    return { success: false, error: "Erreur lors de l'envoi. Veuillez réessayer." };
  }

  return { success: true };
}
