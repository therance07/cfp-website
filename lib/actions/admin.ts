'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminServerClient } from '@/lib/supabase/server';
import type { Contact, Commande, Partenariat, ContenuSite } from '@/types/supabase';

/* ── Stats ──────────────────────────────────────────── */

export async function getAdminStats() {
  const supabase = createSupabaseAdminServerClient();
  const [contacts, commandes, partenariats, unread] = await Promise.all([
    supabase.from('contacts').select('id', { count: 'exact', head: true }),
    supabase.from('commandes').select('id', { count: 'exact', head: true }),
    supabase.from('partenariats').select('id', { count: 'exact', head: true }),
    supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('lu', false),
  ]);
  return {
    contacts:    contacts.count    ?? 0,
    commandes:   commandes.count   ?? 0,
    partenariats:partenariats.count ?? 0,
    unread:      unread.count      ?? 0,
  };
}

/* ── Contacts ───────────────────────────────────────── */

export async function getContacts(): Promise<Contact[]> {
  const supabase = createSupabaseAdminServerClient();
  const { data } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  return (data ?? []) as Contact[];
}

export async function markContactLu(id: string, lu: boolean) {
  const supabase = createSupabaseAdminServerClient();
  await supabase.from('contacts').update({ lu } as never).eq('id', id);
  revalidatePath('/admin/contacts');
}

/* ── Commandes ──────────────────────────────────────── */

export async function getCommandes(): Promise<Commande[]> {
  const supabase = createSupabaseAdminServerClient();
  const { data } = await supabase
    .from('commandes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  return (data ?? []) as Commande[];
}

export async function updateCommandeStatut(id: string, statut: Commande['statut']) {
  const supabase = createSupabaseAdminServerClient();
  await supabase.from('commandes').update({ statut } as never).eq('id', id);
  revalidatePath('/admin/commandes');
}

/* ── Partenariats ───────────────────────────────────── */

export async function getPartenariats(): Promise<Partenariat[]> {
  const supabase = createSupabaseAdminServerClient();
  const { data } = await supabase
    .from('partenariats')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  return (data ?? []) as Partenariat[];
}

export async function updatePartenariatStatut(id: string, statut: Partenariat['statut']) {
  const supabase = createSupabaseAdminServerClient();
  await supabase.from('partenariats').update({ statut } as never).eq('id', id);
  revalidatePath('/admin/partenariats');
}

/* ── Contenu site ───────────────────────────────────── */

export async function getContenuSite(): Promise<ContenuSite[]> {
  const supabase = createSupabaseAdminServerClient();
  const { data } = await supabase.from('contenu_site').select('*').order('cle');
  return (data ?? []) as ContenuSite[];
}

export async function upsertContenu(cle: string, valeur_fr: string, valeur_en: string) {
  const supabase = createSupabaseAdminServerClient();
  await supabase.from('contenu_site').upsert({ cle, valeur_fr, valeur_en } as never, { onConflict: 'cle' });
  revalidatePath('/admin/contenu');
}
