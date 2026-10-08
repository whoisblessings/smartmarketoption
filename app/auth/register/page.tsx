'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Icon } from '@/components/ui/Icon';
import { GlassCard } from '@/components/ui/GlassCard';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Profile is created via DB trigger or we insert here
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        phone,
        role: 'user',
        balance: 0,
        total_invested: 0,
        total_earned: 0,
      });
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
          <Icon name="show_chart" size={22} className="text-black" />
        </div>
        <span className="text-xl font-bold">SmartMarket</span>
      </div>

      <GlassCard className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-bold">Create account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-white/60">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-glass"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/60">Phone (M-Pesa)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-glass"
              placeholder="2547XXXXXXXX"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/60">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass"
              placeholder="Min 6 characters"
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-accent w-full disabled:opacity-50">
            {loading ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-accent font-medium">
            Sign In
          </Link>
        </p>
      </GlassCard>

      <Link href="/" className="mt-6 text-sm text-white/40 hover:text-white/60">
        ← Back to home
      </Link>
    </div>
  );
}