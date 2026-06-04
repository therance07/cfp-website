import type { Metadata } from 'next';
import { getContenuSite } from '@/lib/actions/admin';
import ContenuEditor from '@/components/admin/ContenuEditor';

export const metadata: Metadata = { title: 'Contenu site' };
export const dynamic = 'force-dynamic';

const DEFAULT_KEYS = [
  { cle: 'hero_title',        label: 'Titre principal (Hero)' },
  { cle: 'hero_subtitle',     label: 'Sous-titre (Hero)' },
  { cle: 'b2b_cta',          label: 'CTA B2B' },
  { cle: 'footer_tagline',    label: 'Tagline footer' },
  { cle: 'about_mission',     label: 'Mission de l\'entreprise' },
];

export default async function AdminContenuPage() {
  const contenu = await getContenuSite();
  const contenuMap = Object.fromEntries(contenu.map(c => [c.cle, c]));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-black text-[var(--color-dark)]">Contenu du site</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          Modifiez les textes clés sans passer par le code. Changements appliqués immédiatement.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {DEFAULT_KEYS.map(({ cle, label }) => (
          <div key={cle} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="font-label text-xs uppercase tracking-wider text-[var(--color-primary)] mb-1">{cle}</p>
            <h3 className="font-heading font-bold text-[var(--color-dark)] mb-4">{label}</h3>
            <ContenuEditor
              cle={cle}
              initialFr={contenuMap[cle]?.valeur_fr ?? ''}
              initialEn={contenuMap[cle]?.valeur_en ?? ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
