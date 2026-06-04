'use client';

import { useState, useTransition } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { upsertContenu } from '@/lib/actions/admin';
import Textarea from '@/components/ui/Textarea';
import Button   from '@/components/ui/Button';

interface ContenuEditorProps {
  cle: string;
  initialFr: string;
  initialEn: string;
}

export default function ContenuEditor({ cle, initialFr, initialEn }: ContenuEditorProps) {
  const [fr, setFr]           = useState(initialFr);
  const [en, setEn]           = useState(initialEn);
  const [saved, setSaved]     = useState(false);
  const [isPending, start]    = useTransition();

  const handleSave = () => {
    start(async () => {
      await upsertContenu(cle, fr, en);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Textarea
          label="Français"
          value={fr}
          onChange={e => setFr(e.target.value)}
          rows={3}
          placeholder="Texte en français…"
        />
        <Textarea
          label="English"
          value={en}
          onChange={e => setEn(e.target.value)}
          rows={3}
          placeholder="English text…"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          variant="primary"
          size="sm"
          loading={isPending}
          leftIcon={<Save size={14} color="white" />}
        >
          Enregistrer
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
            <CheckCircle size={14} color="currentColor" />
            Sauvegardé
          </span>
        )}
      </div>
    </div>
  );
}
