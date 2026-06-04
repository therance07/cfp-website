import type { Metadata } from 'next';
import { getCommandes } from '@/lib/actions/admin';
import StatusSelect from '@/components/admin/StatusSelect';

export const metadata: Metadata = { title: 'Commandes B2B' };
export const dynamic = 'force-dynamic';

export default async function AdminCommandesPage() {
  const commandes = await getCommandes();

  const counts = {
    en_attente:    commandes.filter(c => c.statut === 'en_attente').length,
    en_traitement: commandes.filter(c => c.statut === 'en_traitement').length,
    confirmee:     commandes.filter(c => c.statut === 'confirmee').length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Commandes B2B</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          {commandes.length} commande{commandes.length !== 1 ? 's' : ''} ·{' '}
          <span className="text-amber-600">{counts.en_attente} en attente</span> ·{' '}
          <span className="text-blue-600">{counts.en_traitement} en traitement</span> ·{' '}
          <span className="text-emerald-600">{counts.confirmee} confirmée{counts.confirmee !== 1 ? 's' : ''}</span>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-gray-light)] border-b border-gray-200">
                {['Entreprise', 'Contact', 'Pays', 'Produits', 'Quantité', 'Date', 'Statut'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-label uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {commandes.map((c) => (
                <tr key={c.id} className="hover:bg-[var(--color-cream)] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[var(--color-dark)]">{c.entreprise}</p>
                    <p className="text-gray-400 text-xs">{c.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.contact_nom}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.pays}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px]">
                    <p className="truncate text-xs">{c.produits_interesses}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{c.quantite_estimee ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={c.id} statut={c.statut} type="commande" />
                  </td>
                </tr>
              ))}
              {commandes.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Aucune commande reçue</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
