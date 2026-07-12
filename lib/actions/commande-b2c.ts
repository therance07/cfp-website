'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import type { CommandeInsert, CommandeProduit } from '@/types/supabase';

const ProduitSchema = z.object({
  produit_id: z.string().min(1),
  nom: z.string().min(1),
  quantite: z.number().int().positive(),
  prix_unitaire: z.number().positive(),
  variante: z.string().nullable(),
});

const CommandeB2CSchema = z.object({
  contact_nom: z.string().min(2),
  telephone: z.string().min(8).regex(/^[0-9+\s()-]+$/),
  ville: z.string().min(2),
  adresse_livraison: z.string().min(5),
  message: z.string().optional(),
  produits: z.array(ProduitSchema).min(1),
  montant_total: z.number().positive(),
});

export type CommandeB2CFormData = z.infer<typeof CommandeB2CSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function submitCommandeB2C(data: CommandeB2CFormData): Promise<ActionResult> {
  const parsed = CommandeB2CSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Données invalides' };
  }

  const insert: CommandeInsert = {
    type: 'B2C',
    contact_nom: parsed.data.contact_nom,
    telephone: parsed.data.telephone,
    ville: parsed.data.ville,
    adresse_livraison: parsed.data.adresse_livraison,
    message: parsed.data.message || null,
    produits: parsed.data.produits as CommandeProduit[],
    montant_total: parsed.data.montant_total,
    entreprise: null,
    email: null,
    pays: null,
    produits_interesses: null,
    statut: 'en_attente',
  };

  const { error } = await supabase.from('commandes').insert(insert as never);

  if (error) {
    console.error('Supabase commande B2C error:', error);
    return { success: false, error: "Erreur lors de l'envoi. Veuillez réessayer." };
  }

  return { success: true };
}
