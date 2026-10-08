'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { Package, Profile } from '@/lib/types';

export default function InvestPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selected, setSelected] = useState<Package | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [investing, setInvesting] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }

      const [{ data: pkgs }, { data: p }] = await Promise.all([
        supabase.from('packages').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('profiles').select('*').eq('id', user.id).single(),
      ]);
      setPackages(pkgs || []);
      setProfile(p);
      setLoading(false);
    }
    load();
  }, []);

  async function handleInvest() {
    if (!selected || !profile) return;
    const amt = Number(amount);
    if (isNaN(amt) || amt < selected.min_amount) {
      setMessage(`Minimum is ${formatCurrency(selected.min_amount)}`);
      return;
    }
    if (selected.max_amount && amt > selected.max_amount) {
      setMessage(`Maximum is ${formatCurrency(selected.max_amount)}`);
      return;
    }
    if (amt > profile.balance) {
      setMessage('Insufficient balance. Please deposit first.');
      return;
    }

    setInvesting(true);
    setMessage('');

    const expected = amt * (1 + selected.interest_rate / 100);
    const end = new Date();
    end.setDate(end.getDate() + selected.duration_days);

    const { error } = await supabase.from('investments').insert({
      user_id: profile.id,
      package_id: selected.id,
      amount: amt,
      interest_rate: selected.interest_rate,
      expected_return: expected,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: end.toISOString(),
    });

    if (error) {
      setMessage(error.message);
      setInvesting(false);
      return;
    }

    // Deduct balance
    await supabase
      .from('profiles')
      .update({
        balance: profile.balance - amt,
        total_invested: (profile.total_invested || 0) + amt,
      })
      .eq('id', profile.id);

    setMessage('Investment successful!');
    setSelected(null);
    setAmount('');
    setInvesting(false);

    // Refresh profile
    const { data: p } = await supabase.from('profiles').select('*').eq('id', profile.id).single();
    setProfile(p);
  }

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
      <h1 className="mb-6 text-2xl font-bold">Invest</h1>
      <p className="mb-4 text-sm text-white/50">
        Balance: <span className="text-accent font-medium">{formatCurrency(profile?.balance ?? 0)}</span>
      </p>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <GlassCard
            key={pkg.id}
            className={`relative overflow-hidden ${selected?.id === pkg.id ? 'ring-1 ring-accent' : ''}`}
            onClick={() => setSelected(pkg)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <p className="mt-1 text-sm text-white/50">{pkg.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">{formatPercent(pkg.interest_rate)}</p>
                <p className="text-xs text-white/40">{pkg.duration_days} days</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Icon name="payments" size={16} />
                Min {formatCurrency(pkg.min_amount)}
              </span>
              {pkg.max_amount && (
                <span>Max {formatCurrency(pkg.max_amount)}</span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <GlassCard strong className="w-full max-w-sm animate-slide-up">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Invest in {selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-white/50">
                <Icon name="close" />
              </button>
            </div>
            <p className="mb-4 text-sm text-white/50">
              Rate: {formatPercent(selected.interest_rate)} · Duration: {selected.duration_days} days
            </p>
            <label className="mb-1.5 block text-sm text-white/60">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-glass mb-4"
              placeholder={`Min ${selected.min_amount}`}
              min={selected.min_amount}
            />
            {message && (
              <p className={`mb-3 text-sm ${message.includes('success') ? 'text-accent' : 'text-red-400'}`}>
                {message}
              </p>
            )}
            <button
              onClick={handleInvest}
              disabled={investing}
              className="btn-accent w-full disabled:opacity-50"
            >
              {investing ? 'Processing…' : 'Confirm Investment'}
            </button>
          </GlassCard>
        </div>
      )}
    </AppShell>
  );
}