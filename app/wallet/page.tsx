'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency } from '@/lib/utils';
import type { Profile, Payment } from '@/lib/types';

function WalletContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'deposit';
  const [tab, setTab] = useState<'deposit' | 'withdraw'>(tabParam as any);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p);
      setPhone(p?.phone || '');

      const { data: pays } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      setPayments(pays || []);
    }
    load();
  }, []);

  async function handleDeposit() {
    const amt = Number(amount);
    if (!amt || amt < 10) {
      setMessage('Minimum deposit is KSh 10');
      return;
    }
    if (!phone || phone.length < 10) {
      setMessage('Enter a valid M-Pesa phone number');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/mpesa/stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt, phone, type: 'deposit' }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'STK push failed');
        setLoading(false);
        return;
      }

      setMessage('STK Push sent! Check your phone to complete payment.');
      setAmount('');
    } catch {
      setMessage('Network error. Try again.');
    }
    setLoading(false);
  }

  async function handleWithdraw() {
    const amt = Number(amount);
    if (!profile || !amt || amt < 50) {
      setMessage('Minimum withdrawal is KSh 50');
      return;
    }
    if (amt > profile.balance) {
      setMessage('Insufficient balance');
      return;
    }

    setLoading(true);
    setMessage('');

    // Create pending withdrawal – admin can approve or auto via B2C later
    const { error } = await supabase.from('payments').insert({
      user_id: profile.id,
      amount: amt,
      type: 'withdrawal',
      method: 'mpesa',
      status: 'pending',
      phone,
      reference: `WD-${Date.now()}`,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    await supabase
      .from('profiles')
      .update({ balance: profile.balance - amt })
      .eq('id', profile.id);

    setMessage('Withdrawal request submitted. Funds will arrive shortly.');
    setAmount('');
    setLoading(false);

    const { data: p } = await supabase.from('profiles').select('*').eq('id', profile.id).single();
    setProfile(p);
  }

  return (
    <AppShell>
      <h1 className="mb-6 text-2xl font-bold">Wallet</h1>

      <GlassCard strong className="mb-6">
        <p className="text-sm text-white/50">Available Balance</p>
        <p className="mt-1 text-3xl font-bold">{formatCurrency(profile?.balance ?? 0)}</p>
      </GlassCard>

      {/* Tabs */}
      <div className="mb-6 flex rounded-xl bg-white/5 p-1">
        <button
          onClick={() => setTab('deposit')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            tab === 'deposit' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setTab('withdraw')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            tab === 'withdraw' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Withdraw
        </button>
      </div>

      <GlassCard className="mb-6">
        <label className="mb-1.5 block text-sm text-white/60">Phone (M-Pesa)</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-glass mb-4"
          placeholder="2547XXXXXXXX"
        />
        <label className="mb-1.5 block text-sm text-white/60">Amount (KES)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-glass mb-4"
          placeholder={tab === 'deposit' ? 'Min 10' : 'Min 50'}
        />

        {message && (
          <p className={`mb-3 text-sm ${
            message.includes('sent') || message.includes('submitted') || message.includes('arrive')
              ? 'text-accent'
              : 'text-red-400'
          }`}>
            {message}
          </p>
        )}

        <button
          onClick={tab === 'deposit' ? handleDeposit : handleWithdraw}
          disabled={loading}
          className="btn-accent w-full disabled:opacity-50"
        >
          {loading
            ? 'Processing…'
            : tab === 'deposit'
            ? 'Deposit via M-Pesa'
            : 'Request Withdrawal'}
        </button>
      </GlassCard>

      <h2 className="mb-3 font-semibold">Recent Transactions</h2>
      {payments.length === 0 ? (
        <p className="text-center text-sm text-white/40 py-6">No transactions yet</p>
      ) : (
        <div className="space-y-2">
          {payments.map((p) => (
            <GlassCard key={p.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  p.type === 'deposit' || p.type === 'return' ? 'bg-accent/15' : 'bg-red-500/15'
                }`}>
                  <Icon
                    name={p.type === 'deposit' || p.type === 'return' ? 'arrow_downward' : 'arrow_upward'}
                    size={18}
                    className={p.type === 'deposit' || p.type === 'return' ? 'text-accent' : 'text-red-400'}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium capitalize">{p.type}</p>
                  <p className="text-xs text-white/40">
                    {new Date(p.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  p.type === 'deposit' || p.type === 'return' ? 'text-accent' : 'text-red-400'
                }`}>
                  {p.type === 'deposit' || p.type === 'return' ? '+' : '-'}
                  {formatCurrency(p.amount)}
                </p>
                <p className="text-xs text-white/40 capitalize">{p.status}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </AppShell>
    }>
      <WalletContent />
    </Suspense>
  );
}