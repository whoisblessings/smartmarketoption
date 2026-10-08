'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency } from '@/lib/utils';
import type { Profile, Investment, Package } from '@/lib/types';

const GUEST_PROFILE: Profile = {
  id: 'guest',
  full_name: 'Guest Investor',
  phone: '',
  balance: 12500,
  total_invested: 8000,
  total_earned: 1240,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_admin: false,
};

const GUEST_INVESTMENTS = [
  {
    id: 'g1',
    user_id: 'guest',
    package_id: 'p1',
    amount: 5000,
    interest_rate: 2.2,
    start_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 25 * 86400000).toISOString(),
    status: 'active' as const,
    created_at: new Date().toISOString(),
    packages: { name: 'Growth', daily_rate: 2.2, min_amount: 5000, duration_days: 30 },
  },
  {
    id: 'g2',
    user_id: 'guest',
    package_id: 'p2',
    amount: 3000,
    interest_rate: 1.5,
    start_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 12 * 86400000).toISOString(),
    status: 'active' as const,
    created_at: new Date().toISOString(),
    packages: { name: 'Starter', daily_rate: 1.5, min_amount: 500, duration_days: 14 },
  },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [investments, setInvestments] = useState<(Investment & { packages?: Package })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const guestParam = searchParams.get('guest') === '1';
      const guestCookie = typeof document !== 'undefined' && document.cookie.includes('guest_mode=1');

      const { data: { user } } = await supabase.auth.getUser();

      if (!user && (guestParam || guestCookie)) {
        setIsGuest(true);
        setProfile(GUEST_PROFILE);
        setInvestments(GUEST_INVESTMENTS as any);
        setLoading(false);
        return;
      }

      if (!user) {
        window.location.href = '/auth/login';
        return;
      }

      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(p);

      const { data: inv } = await supabase
        .from('investments')
        .select('*, packages(*)')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);
      setInvestments(inv || []);
      setLoading(false);
    }
    load();
  }, [searchParams]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">
            {isGuest ? 'Exploring as guest' : 'Welcome back'}
          </p>
          <h1 className="text-xl font-bold">{profile?.full_name || 'Investor'}</h1>
        </div>
        {isGuest ? (
          <Link
            href="/auth/register"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-black"
          >
            Sign Up
          </Link>
        ) : (
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20"
          >
            <Icon name="person" className="text-accent" />
          </Link>
        )}
      </header>

      {isGuest && (
        <GlassCard className="mb-4 border border-accent/30 bg-accent/5">
          <p className="text-sm text-white/80">
            You’re viewing a demo dashboard. Create a free account to deposit, invest, and track real returns.
          </p>
          <Link href="/auth/register" className="btn-accent mt-3 inline-block text-sm py-2 px-4">
            Create Free Account
          </Link>
        </GlassCard>
      )}

      {/* Balance card */}
      <GlassCard strong className="mb-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        <p className="text-sm text-white/50">Available Balance</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {formatCurrency(profile?.balance ?? 0)}
        </p>
        <div className="mt-4 flex gap-3">
          <Link href={isGuest ? '/auth/register' : '/wallet?tab=deposit'} className="btn-accent flex-1 text-center text-sm py-2.5">
            Deposit
          </Link>
          <Link href={isGuest ? '/auth/register' : '/wallet?tab=withdraw'} className="btn-ghost flex-1 text-center text-sm py-2.5">
            Withdraw
          </Link>
        </div>
      </GlassCard>

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <GlassCard className="text-center">
          <Icon name="trending_up" className="mx-auto text-accent" size={22} />
          <p className="mt-2 text-lg font-bold">{formatCurrency(profile?.total_invested ?? 0)}</p>
          <p className="text-xs text-white/50">Total Invested</p>
        </GlassCard>
        <GlassCard className="text-center">
          <Icon name="payments" className="mx-auto text-accent" size={22} />
          <p className="mt-2 text-lg font-bold">{formatCurrency(profile?.total_earned ?? 0)}</p>
          <p className="text-xs text-white/50">Total Earned</p>
        </GlassCard>
      </div>

      {/* Active investments */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Active Investments</h2>
        <Link href={isGuest ? '/auth/register' : '/invest'} className="text-sm text-accent">
          Invest more →
        </Link>
      </div>

      {investments.length === 0 ? (
        <GlassCard className="text-center py-10">
          <Icon name="savings" size={40} className="mx-auto text-white/30" />
          <p className="mt-3 text-white/50">No active investments yet</p>
          <Link href={isGuest ? '/auth/register' : '/invest'} className="btn-accent mt-4 inline-block text-sm">
            Browse Packages
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {investments.map((inv) => (
            <GlassCard key={inv.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{(inv as any).packages?.name || 'Package'}</p>
                <p className="text-sm text-white/50">
                  {formatCurrency(inv.amount)} · {inv.interest_rate}% · ends{' '}
                  {new Date(inv.end_date).toLocaleDateString()}
                </p>
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                Active
              </span>
            </GlassCard>
          ))}
        </div>
      )}
    </AppShell>
  );
}
