'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname    = usePathname();
  const router      = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady]           = useState(false);
  const [userEmail, setUserEmail]   = useState('');

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) { setReady(true); return; }

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin/login'); return; }
      setUserEmail(session.user.email ?? '');
      setReady(true);
    });
  }, [isLoginPage, router]);

  // Login page — no shell
  if (isLoginPage) return <>{children}</>;

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-light)]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 flex-col flex-shrink-0 shadow-xl">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            <AdminSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} color="currentColor" />
            </button>
            <div>
              <h1 className="font-heading font-bold text-[var(--color-dark)] text-sm leading-none">
                Congo Food Process
              </h1>
              <p className="text-gray-400 text-xs mt-0.5">Tableau de bord administrateur</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">{userEmail}</p>
              <p className="text-[10px] text-gray-400 font-label uppercase tracking-wide">Administrateur</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userEmail.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
