'use client';

import { useTransition } from 'react';
import { markContactLu } from '@/lib/actions/admin';
import { Eye, EyeOff } from 'lucide-react';

export default function MarkLuButton({ id, lu }: { id: string; lu: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => markContactLu(id, !lu))}
      disabled={isPending}
      title={lu ? 'Marquer non lu' : 'Marquer comme lu'}
      className="p-1.5 rounded-lg hover:bg-[var(--color-cream)] transition-colors disabled:opacity-50"
    >
      {lu
        ? <Eye    size={15} color="var(--color-secondary)" />
        : <EyeOff size={15} color="var(--color-primary)"  />}
    </button>
  );
}
