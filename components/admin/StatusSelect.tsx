'use client';

import { useTransition } from 'react';
import { updateCommandeStatut, updatePartenariatStatut } from '@/lib/actions/admin';

type Statut = 'en_attente' | 'en_traitement' | 'confirmee';

const STATUT_LABELS: Record<Statut, string> = {
  en_attente:   'En attente',
  en_traitement:'En traitement',
  confirmee:    'Confirmée',
};

const STATUT_COLORS: Record<Statut, string> = {
  en_attente:    'bg-amber-100 text-amber-700 border-amber-200',
  en_traitement: 'bg-blue-100 text-blue-700 border-blue-200',
  confirmee:     'bg-emerald-100 text-emerald-700 border-emerald-200',
};

interface StatusSelectProps {
  id: string;
  statut: Statut;
  type: 'commande' | 'partenariat';
}

export default function StatusSelect({ id, statut, type }: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatut = e.target.value as Statut;
    startTransition(async () => {
      if (type === 'commande') await updateCommandeStatut(id, newStatut);
      else await updatePartenariatStatut(id, newStatut);
    });
  };

  return (
    <select
      value={statut}
      onChange={handleChange}
      disabled={isPending}
      className={[
        'text-xs font-semibold px-2.5 py-1.5 rounded-full border appearance-none cursor-pointer',
        'transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]',
        'disabled:opacity-50',
        STATUT_COLORS[statut],
      ].join(' ')}
      aria-label="Modifier le statut"
    >
      {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
        <option key={s} value={s}>{STATUT_LABELS[s]}</option>
      ))}
    </select>
  );
}
