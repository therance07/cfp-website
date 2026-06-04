import type { Metadata } from 'next';
import { getPartenariats } from '@/lib/actions/admin';
import StatusSelect from '@/components/admin/StatusSelect';

export const metadata: Metadata = { title: 'Partenariats' };
export const dynamic = 'force-dynamic';

export default async function AdminPartenariatsPage() {
  const partenariats = await getPartenariats();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Demandes de partenariat</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          {partenariats.length} demande{partenariats.length !== 1 ? 's' : ''} reçue{partenariats.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-gray-light)] border-b border-gray-200">
                {['Entreprise', 'Type', 'Zone', 'Pays', 'Contact', 'Date', 'Statut'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-label uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {partenariats.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-cream)] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[var(--color-dark)]">{p.entreprise}</p>
                    <p className="text-gray-400 text-xs">{p.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full font-semibold">
                      {p.type_partenariat}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.zone_distribution ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.pays}</td>
                  <td className="px-4 py-3 text-gray-600">{p.contact_nom}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(p.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={p.id} statut={p.statut} type="partenariat" />
                  </td>
                </tr>
              ))}
              {partenariats.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Aucune demande reçue</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
