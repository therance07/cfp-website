import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color?: 'orange' | 'green' | 'blue' | 'red';
  sub?: string;
}

const colorMap = {
  orange: { bg: 'bg-[var(--color-primary)]/10', icon: 'var(--color-primary)', border: 'border-[var(--color-primary)]/20' },
  green:  { bg: 'bg-emerald-50',                icon: '#10b981',              border: 'border-emerald-200' },
  blue:   { bg: 'bg-blue-50',                   icon: '#3b82f6',              border: 'border-blue-200' },
  red:    { bg: 'bg-red-50',                    icon: '#ef4444',              border: 'border-red-200' },
};

export default function StatCard({ label, value, icon: Icon, color = 'orange', sub }: StatCardProps) {
  const { bg, icon: iconColor, border } = colorMap[color];
  return (
    <div className={`bg-white rounded-2xl p-6 border ${border} shadow-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon size={22} color={iconColor} />
        </div>
      </div>
      <p className="font-heading text-4xl font-black text-[var(--color-dark)] mb-1">{value}</p>
      <p className="font-semibold text-[var(--color-dark)] text-sm">{label}</p>
      {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}
