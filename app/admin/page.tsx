import type { Metadata } from 'next';
import { MessageSquare, ShoppingCart, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import StatCard   from '@/components/admin/StatCard';
import { getAdminStats, getContacts, getCommandes } from '@/lib/actions/admin';

export const metadata: Metadata = { title: 'Vue d\'ensemble' };

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [stats, recentContacts, recentCommandes] = await Promise.all([
    getAdminStats(),
    getContacts(),
    getCommandes(),
  ]);

  const pendingCommandes = recentCommandes.filter(c => c.statut === 'en_attente');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Vue d&apos;ensemble</h2>
        <p className="text-gray-500 text-sm mt-1">Activité récente de Congo Food Process</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Contacts reçus"    value={stats.contacts}     icon={MessageSquare} color="orange" sub="Total cumulé" />
        <StatCard label="Non lus"           value={stats.unread}       icon={AlertCircle}   color="red"    sub="À traiter" />
        <StatCard label="Commandes B2B"     value={stats.commandes}    icon={ShoppingCart}  color="blue"   sub="Total cumulé" />
        <StatCard label="Partenariats"      value={stats.partenariats} icon={Users}         color="green"  sub="Demandes reçues" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts récents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-heading font-bold text-[var(--color-dark)]">Contacts récents</h3>
            <Link href="/admin/contacts" className="text-xs text-[var(--color-primary)] font-semibold hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-start gap-3 px-5 py-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${c.lu ? 'bg-gray-300' : 'bg-[var(--color-primary)]'}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-[var(--color-dark)] truncate">{c.nom}</p>
                  <p className="text-gray-500 text-xs truncate">{c.email} · {c.objet ?? 'Sans objet'}</p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">
                  {new Date(c.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ))}
            {recentContacts.length === 0 && (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">Aucun contact reçu</p>
            )}
          </div>
        </div>

        {/* Commandes en attente */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-heading font-bold text-[var(--color-dark)]">Commandes en attente</h3>
            <Link href="/admin/commandes" className="text-xs text-[var(--color-primary)] font-semibold hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingCommandes.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-start gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={14} color="var(--color-primary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-[var(--color-dark)] truncate">{c.entreprise}</p>
                  <p className="text-gray-500 text-xs truncate">{c.pays} · {c.produits_interesses}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold flex-shrink-0">
                  En attente
                </span>
              </div>
            ))}
            {pendingCommandes.length === 0 && (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">Aucune commande en attente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
