'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import CfpLogo from '@/components/CfpLogo';
import Button  from '@/components/ui/Button';
import Input   from '@/components/ui/Input';

const Schema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
});
type FormValues = z.infer<typeof Schema>;

function FallbackNotice() {
  const isFallback = useSearchParams().get('fallback') === '1';
  if (!isFallback) return null;
  return (
    <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2">
      <Lock size={14} color="currentColor" />
      La page n&apos;était pas encore prête au moment de l&apos;envoi. Merci de saisir vos identifiants et réessayer.
    </div>
  );
}

export default function AdminLoginPage() {
  const router  = useRouter();
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  // Désactive le submit tant que React n'a pas hydraté, pour éviter la soumission HTML native (GET, identifiants en clair dans l'URL).
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    setLoading(true);
    setError('');
    const supabase = createSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1A0F00 0%, #2E1A00 60%, #1A0F00 100%)' }}
    >
      {/* Geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #F26522 0, #F26522 1px, transparent 0, transparent 50%)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <CfpLogo variant="light" size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="font-heading text-[var(--color-dark)] text-2xl font-black mb-1 text-center">
            Espace Admin
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            Connexion réservée à l&apos;équipe CFP
          </p>

          {!error && (
            <Suspense fallback={null}>
              <FallbackNotice />
            </Suspense>
          )}

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
              <Lock size={14} color="currentColor" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} method="post" className="flex flex-col gap-4" noValidate>
            <Input
              label="Email"
              type="email"
              required
              placeholder="admin@congofoodprocess.com"
              leftAddon={<Mail size={16} color="currentColor" />}
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Mot de passe"
              type={showPwd ? 'text' : 'password'}
              required
              placeholder="••••••••"
              leftAddon={<Lock size={16} color="currentColor" />}
              rightAddon={
                <button type="button" onClick={() => setShowPwd(s => !s)} className="focus:outline-none">
                  {showPwd
                    ? <EyeOff size={16} color="var(--color-primary)" />
                    : <Eye    size={16} color="currentColor" />}
                </button>
              }
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} disabled={!mounted} className="mt-2">
              Se connecter
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Accès restreint | Congo Food Process © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
