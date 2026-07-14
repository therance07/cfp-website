import type { Metadata } from 'next';
import { getContacts } from '@/lib/actions/admin';
import MarkLuButton from '@/components/admin/MarkLuButton';

export const metadata: Metadata = { title: 'Contacts' };
export const dynamic = 'force-dynamic';

export default async function AdminContactsPage() {
  const contacts = await getContacts();
  const unread   = contacts.filter(c => !c.lu).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Contacts</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {contacts.length} message{contacts.length !== 1 ? 's' : ''} reçu{contacts.length !== 1 ? 's' : ''}
            {unread > 0 && ` · ${unread} non lu${unread !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="bg-[var(--color-gray-light)] border-b border-gray-200">
                {['', 'Nom', 'Email', 'Objet', 'Message', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-label uppercase tracking-wider text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map((c) => (
                <tr key={c.id} className={`hover:bg-[var(--color-cream)] transition-colors ${!c.lu ? 'font-semibold' : ''}`}>
                  <td className="px-4 py-3">
                    <div className={`w-2 h-2 rounded-full ${c.lu ? 'bg-gray-200' : 'bg-[var(--color-primary)]'}`} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.nom}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`mailto:${c.email}`} className="text-[var(--color-primary)] hover:underline">{c.email}</a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[140px] truncate">{c.objet ?? '-'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                    <p className="line-clamp-2 text-xs">{c.message}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                    {new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <MarkLuButton id={c.id} lu={c.lu} />
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Aucun contact reçu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
