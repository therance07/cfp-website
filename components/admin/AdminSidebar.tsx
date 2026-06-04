'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, MessageSquare, ShoppingCart, Users, FileEdit, LogOut, X } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import CfpLogo from '@/components/CfpLogo';

const NAV = [
  { href: '/admin',             icon: LayoutDashboard, label: 'Vue d\'ensemble' },
  { href: '/admin/contacts',    icon: MessageSquare,   label: 'Contacts'        },
  { href: '/admin/commandes',   icon: ShoppingCart,    label: 'Commandes B2B'   },
  { href: '/admin/partenariats',icon: Users,           label: 'Partenariats'    },
  { href: '/admin/contenu',     icon: FileEdit,        label: 'Contenu site'    },
] as const;

interface AdminSidebarProps {
  unread?: number;
  onClose?: () => void;
}

export default function AdminSidebar({ unread = 0, onClose }: AdminSidebarProps) {
  const pathname  = usePathname();
  const router    = useRouter();
  const supabase  = createSupabaseBrowserClient();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside
      className="flex flex-col h-full"
      style={{ background: 'linear-gradient(180deg, #1A0F00 0%, #0F0800 100%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <Link href="/" target="_blank" aria-label="Voir le site public">
          <CfpLogo variant="light" size="sm" />
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white p-1">
            <X size={20} color="currentColor" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1" aria-label="Navigation admin">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                active
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_16px_rgba(242,101,34,0.35)]'
                  : 'text-white/70 hover:text-white hover:bg-white/8',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} color="currentColor" />
              <span>{label}</span>
              {href === '/admin/contacts' && unread > 0 && (
                <span className="ml-auto bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut size={18} color="currentColor" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
