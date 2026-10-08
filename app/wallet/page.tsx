'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency } from '@/lib/utils';
import type { Profile, Payment } from '@/lib/types';

export default function WalletPage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'deposit' | 'withdraw'>(
    (searchParams.get('tab') as 'deposit' | 'withdraw') || 'deposit'
  );
  const [profile, setProfile] = useState<Profile | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p);
      if (p?.phone) setPhone(p.phone);
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

  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt < 10) {
      setMessage('Minimum deposit is $10');
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
      if (!res.ok) throw new Error(data.error || 'Deposit failed');
      setMessage(data.message || 'STK Push sent. Check your phone.');
      setAmount('');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt < 50) {
      setMessage('Minimum withdrawal is $50');
      return;
    }
    if ((profile?.balance ?? 0) < amt) {
      setMessage('Insufficient balance');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from('payments').insert({
        user_id: user.id,
        amount: amt,
        type: 'withdrawal',
        method: 'mpesa',
        status: 'pending',
        phone,
      });
      if (error) throw error;
      setMessage('Withdrawal request submitted. Processing soon.');
      setAmount('');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <h1 className="mb-6 text-xl font-bold">Wallet</h1>

      <GlassCard strong className="mb-6">
        <p className="text-sm text-white/50">Available Balance</p>
        <p className="mt-1 text-3xl font-bold">{formatCurrency(profile?.balance ?? 0)}</p>
      </GlassCard>

      <div className="mb-6 flex gap-2 rounded-xl bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setTab('deposit')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
            tab === 'deposit' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setTab('withdraw')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
            tab === 'withdraw' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Withdraw
        </button>
      </div>

      <form onSubmit={tab === 'deposit' ? handleDeposit : handleWithdraw} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-glass"
            placeholder="0.00"
            min={tab === 'deposit' ? 10 : 50}
            step="1"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">M-Pesa Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-glass"
            placeholder="2547XXXXXXXX"
            required
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes('fail') || message.includes('Insufficient') || message.includes('wrong') ? 'text-red-400' : 'text-accent'}`}>
            {message}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? 'Processing…' : tab === 'deposit' ? 'Deposit' : 'Request Withdrawal'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="mb-3 font-semibold">Recent transactions</h2>
        {payments.length === 0 ? (
          <GlassCard className="text-center py-8 text-white/40 text-sm">No transactions yet</GlassCard>
        ) : (
          <div className="space-y-2">
            {payments.map((p) => (
              <GlassCard key={p.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium capitalize">{p.type}</p>
                  <p className="text-xs text-white/40">{new Date(p.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(p.amount)}</p>
                  <p className="text-xs text-white/40 capitalize">{p.status}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
