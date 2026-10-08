'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency } from '@/lib/utils';
import type { Investment, Payment } from '@/lib/types';

export default function HistoryPage() {
  const [tab, setTab] = useState<'investments' | 'payments'>('investments');
  const [investments, setInvestments] = useState<any[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }

      const [{ data: inv }, { data: pays }] = await Promise.all([
        supabase
          .from('investments')
          .select('*, packages(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
      ]);
      setInvestments(inv || []);
      setPayments(pays || []);
      setLoading(false);
    }
    load();
  }, []);

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
      <h1 className="mb-6 text-2xl font-bold">History</h1>

      <div className="mb-6 flex rounded-xl bg-white/5 p-1">
        <button
          onClick={() => setTab('investments')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            tab === 'investments' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Investments
        </button>
        <button
          onClick={() => setTab('payments')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
            tab === 'payments' ? 'bg-accent text-black' : 'text-white/60'
          }`}
        >
          Payments
        </button>
      </div>

      {tab === 'investments' ? (
        investments.length === 0 ? (
          <p className="py-10 text-center text-white/40">No investments yet</p>
        ) : (
          <div className="space-y-3">
            {investments.map((inv) => (
              <GlassCard key={inv.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{inv.packages?.name || 'Package'}</p>
                    <p className="text-sm text-white/50">
                      {formatCurrency(inv.amount)} → {formatCurrency(inv.expected_return)}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      {new Date(inv.start_date).toLocaleDateString()} –{' '}
                      {new Date(inv.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      inv.status === 'active'
                        ? 'bg-accent/15 text-accent'
                        : inv.status === 'completed'
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        )
      ) : payments.length === 0 ? (
        <p className="py-10 text-center text-white/40">No payments yet</p>
      ) : (
        <div className="space-y-2">
          {payments.map((p) => (
            <GlassCard key={p.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Icon
                  name={p.type === 'deposit' || p.type === 'return' ? 'arrow_downward' : 'arrow_upward'}
                  size={20}
                  className={p.type === 'deposit' || p.type === 'return' ? 'text-accent' : 'text-red-400'}
                />
                <div>
                  <p className="text-sm font-medium capitalize">{p.type}</p>
                  <p className="text-xs text-white/40">{new Date(p.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(p.amount)}</p>
                <p className="text-xs text-white/40 capitalize">{p.status}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </AppShell>
  );
}