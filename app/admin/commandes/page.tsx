import type { Metadata } from 'next';
import Link from 'next/link';
import { getCommandes } from '@/lib/actions/admin';
import StatusSelect from '@/components/admin/StatusSelect';
import { formatPrice, formatCommandeProduits } from '@/lib/format';
import type { Commande } from '@/types/supabase';

export const metadata: Metadata = { title: 'Commandes' };
export const dynamic = 'force-dynamic';

type TypeFilter = 'all' | 'B2B' | 'B2C';

const TABS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' });
}

export default async function AdminCommandesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const commandes = await getCommandes();
  const activeTab: TypeFilter = searchParams.type === 'B2B' || searchParams.type === 'B2C' ? searchParams.type : 'all';

  const counts = {
    en_attente:    commandes.filter(c => c.statut === 'en_attente').length,
    en_traitement: commandes.filter(c => c.statut === 'en_traitement').length,
    confirmee:     commandes.filter(c => c.statut === 'confirmee').length,
  };
  const typeCounts = {
    all: commandes.length,
    B2B: commandes.filter(c => c.type === 'B2B').length,
    B2C: commandes.filter(c => c.type === 'B2C').length,
  };

  const visibleCommandes: Commande[] = activeTab === 'all' ? commandes : commandes.filter(c => c.type === activeTab);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Commandes</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          {commandes.length} commande{commandes.length !== 1 ? 's' : ''} ·{' '}
          <span className="text-amber-600">{counts.en_attente} en attente</span> ·{' '}
          <span className="text-blue-600">{counts.en_traitement} en traitement</span> ·{' '}
          <span className="text-emerald-600">{counts.confirmee} confirmée{counts.confirmee !== 1 ? 's' : ''}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
        {TABS.map(({ value, label }) => {
          const active = activeTab === value;
          const href = value === 'all' ? '/admin/commandes' : `/admin/commandes?type=${value}`;
          return (
            <Link
              key={value}
              href={href}
              className={[
                'px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors',
                active
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:text-[var(--color-dark)]',
              ].join(' ')}
            >
              {label} <span className="text-gray-400 font-normal">({typeCounts[value]})</span>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-gray-light)] border-b border-gray-200">
                {['Type', 'Client', 'Contact', 'Détails', 'Montant', 'Date', 'Statut'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-label uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visibleCommandes.map((c) => (
                <tr key={c.id} className="hover:bg-[var(--color-cream)] transition-colors">
                  <td className="px-4 py-3">
                    <span
                      className={[
                        'text-[10px] font-bold px-2 py-0.5 rounded-full',
                        c.type === 'B2C'
                          ? 'bg-[var(--color-dark)]/10 text-[var(--color-dark)]'
                          : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
                      ].join(' ')}
                    >
                      {c.type}
                    </span>
                  </td>

                  {c.type === 'B2C' ? (
                    <>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[var(--color-dark)]">{c.contact_nom}</p>
                        <p className="text-gray-400 text-xs">{c.ville}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.telephone}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[220px]">
                        <p className="truncate text-xs" title={formatCommandeProduits(c.produits)}>
                          {formatCommandeProduits(c.produits)}
                        </p>
                        <p className="text-gray-400 text-[11px] truncate mt-0.5" title={c.adresse_livraison ?? ''}>
                          {c.adresse_livraison}
                        </p>
                        {c.message && (
                          <p className="text-gray-400 text-[11px] italic truncate mt-0.5" title={c.message}>
                            Note : {c.message}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[var(--color-dark)] whitespace-nowrap">
                        {c.montant_total != null ? formatPrice(c.montant_total) : '-'}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[var(--color-dark)]">{c.entreprise}</p>
                        <p className="text-gray-400 text-xs">{c.contact_nom}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.email}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[220px]">
                        <p className="truncate text-xs" title={c.produits_interesses ?? ''}>{c.produits_interesses}</p>
                        <p className="text-gray-400 text-[11px] truncate mt-0.5">
                          {c.pays}{c.quantite_estimee ? ` · ${c.quantite_estimee}` : ''}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">-</td>
                    </>
                  )}

                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {formatDate(c.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={c.id} statut={c.statut} type="commande" />
                  </td>
                </tr>
              ))}
              {visibleCommandes.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Aucune commande reçue</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
