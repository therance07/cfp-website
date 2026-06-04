'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import type { CommandeInsert } from '@/types/supabase';

const CommandeSchema = z.object({
  entreprise:          z.string().min(2),
  contact_nom:         z.string().min(2),
  email:               z.string().email(),
  telephone:           z.string().min(8),
  pays:                z.string().min(2),
  produits_interesses: z.string().min(3),
  quantite_estimee:    z.string().optional(),
  message:             z.string().optional(),
});

export type CommandeFormData = z.infer<typeof CommandeSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitCommande(data: CommandeFormData): Promise<ActionResult> {
  const parsed = CommandeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Données invalides' };
  }

  const insert: CommandeInsert = {
    entreprise:          parsed.data.entreprise,
    contact_nom:         parsed.data.contact_nom,
    email:               parsed.data.email,
    telephone:           parsed.data.telephone,
    pays:                parsed.data.pays,
    produits_interesses: parsed.data.produits_interesses,
    quantite_estimee:    parsed.data.quantite_estimee ?? null,
    message:             parsed.data.message ?? null,
    statut:              'en_attente',
  };

  const { error } = await supabase.from('commandes').insert(insert as never);

  if (error) {
    console.error('Supabase commande error:', error);
    return { success: false, error: "Erreur lors de l'envoi. Veuillez réessayer." };
  }

  return { success: true };
}
