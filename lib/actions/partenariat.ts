'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import type { PartenariatInsert } from '@/types/supabase';

const PartenariatSchema = z.object({
  entreprise:         z.string().min(2),
  contact_nom:        z.string().min(2),
  email:              z.string().email(),
  telephone:          z.string().min(8),
  pays:               z.string().min(2),
  type_partenariat:   z.string().min(2),
  zone_distribution:  z.string().optional(),
  message:            z.string().optional(),
});

export type PartenariatFormData = z.infer<typeof PartenariatSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitPartenariat(data: PartenariatFormData): Promise<ActionResult> {
  const parsed = PartenariatSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Données invalides' };
  }

  const insert: PartenariatInsert = {
    entreprise:        parsed.data.entreprise,
    contact_nom:       parsed.data.contact_nom,
    email:             parsed.data.email,
    telephone:         parsed.data.telephone,
    pays:              parsed.data.pays,
    type_partenariat:  parsed.data.type_partenariat,
    zone_distribution: parsed.data.zone_distribution ?? null,
    message:           parsed.data.message ?? null,
    statut:            'en_attente',
  };

  const { error } = await supabase.from('partenariats').insert(insert as never);

  if (error) {
    console.error('Supabase partenariat error:', error);
    return { success: false, error: "Erreur lors de l'envoi. Veuillez réessayer." };
  }

  return { success: true };
}
