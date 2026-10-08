'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { GlassCard } from '@/components/ui/GlassCard';
import { Icon } from '@/components/ui/Icon';
import { formatCurrency } from '@/lib/utils';
import type { Profile, Package, Payment, SiteStats } from '@/lib/types';

export default function AdminPage() {
  const [tab, setTab] = useState<'overview' | 'users' | 'packages' | 'payments'>('overview');
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth/login';
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        window.location.href = '/dashboard';
        return;
      }

      await refreshAll();
      setLoading(false);
    }
    load();
  }, []);

  async function refreshAll() {
    const [{ data: u }, { data: p }, { data: pay }, { count: invCount }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('packages').select('*').order('sort_order'),
      supabase.from('payments').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('investments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

    setUsers(u || []);
    setPackages(p || []);
    setPayments(pay || []);

    const totalDeposits = (pay || [])
      .filter((x) => x.type === 'deposit' && x.status === 'completed')
      .reduce((s, x) => s + x.amount, 0);
    const totalWithdrawals = (pay || [])
      .filter((x) => x.type === 'withdrawal' && x.status === 'completed')
      .reduce((s, x) => s + x.amount, 0);

    setStats({
      total_users: (u || []).length,
      total_investments: invCount || 0,
      total_deposits: totalDeposits,
      total_withdrawals: totalWithdrawals,
      active_investments: invCount || 0,
    });
  }

  async function savePackage() {
    if (!editingPkg) return;
    const { error } = await supabase
      .from('packages')
      .update({
        name: editingPkg.name,
        description: editingPkg.description,
        min_amount: editingPkg.min_amount,
        max_amount: editingPkg.max_amount,
        interest_rate: editingPkg.interest_rate,
        duration_days: editingPkg.duration_days,
        is_active: editingPkg.is_active,
        sort_order: editingPkg.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editingPkg.id);

    if (!error) {
      setEditingPkg(null);
      await refreshAll();
    }
  }

  async function toggleUserRole(userId: string, current: string) {
    const newRole = current === 'admin' ? 'user' : 'admin';
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    await refreshAll();
  }

  async function updatePaymentStatus(id: string, status: string) {
    await supabase.from('payments').update({ status }).eq('id', id);
    await refreshAll();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amoled">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amoled pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/10 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="admin_panel_settings" className="text-accent" size={28} />
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-white/50 hover:text-white">
            ← Back to App
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pt-6">
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(['overview', 'users', 'packages', 'payments'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                tab === t ? 'bg-accent text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <GlassCard>
              <Icon name="group" className="text-accent" />
              <p className="mt-2 text-2xl font-bold">{stats.total_users}</p>
              <p className="text-sm text-white/50">Total Users</p>
            </GlassCard>
            <GlassCard>
              <Icon name="trending_up" className="text-accent" />
              <p className="mt-2 text-2xl font-bold">{stats.active_investments}</p>
              <p className="text-sm text-white/50">Active Investments</p>
            </GlassCard>
            <GlassCard>
              <Icon name="arrow_downward" className="text-accent" />
              <p className="mt-2 text-2xl font-bold">{formatCurrency(stats.total_deposits)}</p>
              <p className="text-sm text-white/50">Total Deposits</p>
            </GlassCard>
            <GlassCard>
              <Icon name="arrow_upward" className="text-red-400" />
              <p className="mt-2 text-2xl font-bold">{formatCurrency(stats.total_withdrawals)}</p>
              <p className="text-sm text-white/50">Total Withdrawals</p>
            </GlassCard>
          </div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div className="space-y-3">
            {users.map((u) => (
              <GlassCard key={u.id} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{u.full_name || '—'}</p>
                  <p className="text-sm text-white/50">{u.email}</p>
                  <p className="text-xs text-white/40">{u.phone} · Balance: {formatCurrency(u.balance)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white/50'
                  }`}>
                    {u.role}
                  </span>
                  <button
                    onClick={() => toggleUserRole(u.id, u.role)}
                    className="btn-ghost py-1.5 px-3 text-xs"
                  >
                    Make {u.role === 'admin' ? 'User' : 'Admin'}
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Packages */}
        {tab === 'packages' && (
          <div className="space-y-4">
            {packages.map((pkg) => (
              <GlassCard key={pkg.id}>
                {editingPkg?.id === pkg.id ? (
                  <div className="space-y-3">
                    <input
                      className="input-glass"
                      value={editingPkg.name}
                      onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                      placeholder="Name"
                    />
                    <textarea
                      className="input-glass"
                      value={editingPkg.description || ''}
                      onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/50">Min Amount</label>
                        <input
                          type="number"
                          className="input-glass"
                          value={editingPkg.min_amount}
                          onChange={(e) =>
                            setEditingPkg({ ...editingPkg, min_amount: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/50">Max Amount</label>
                        <input
                          type="number"
                          className="input-glass"
                          value={editingPkg.max_amount || ''}
                          onChange={(e) =>
                            setEditingPkg({
                              ...editingPkg,
                              max_amount: e.target.value ? Number(e.target.value) : null,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/50">Interest Rate %</label>
                        <input
                          type="number"
                          step="0.1"
                          className="input-glass"
                          value={editingPkg.interest_rate}
                          onChange={(e) =>
                            setEditingPkg({ ...editingPkg, interest_rate: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/50">Duration (days)</label>
                        <input
                          type="number"
                          className="input-glass"
                          value={editingPkg.duration_days}
                          onChange={(e) =>
                            setEditingPkg({ ...editingPkg, duration_days: Number(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={editingPkg.is_active}
                        onChange={(e) =>
                          setEditingPkg({ ...editingPkg, is_active: e.target.checked })
                        }
                      />
                      Active
                    </label>
                    <div className="flex gap-2">
                      <button onClick={savePackage} className="btn-accent flex-1 text-sm py-2">
                        Save
                      </button>
                      <button onClick={() => setEditingPkg(null)} className="btn-ghost flex-1 text-sm py-2">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{pkg.name}</p>
                      <p className="text-sm text-white/50">
                        {pkg.interest_rate}% · {pkg.duration_days}d · Min {formatCurrency(pkg.min_amount)}
                        {pkg.max_amount ? ` · Max ${formatCurrency(pkg.max_amount)}` : ''}
                      </p>
                      <p className="text-xs text-white/40 mt-1">{pkg.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        pkg.is_active ? 'text-accent' : 'text-white/30'
                      }`}>
                        {pkg.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => setEditingPkg(pkg)}
                        className="btn-ghost py-1.5 px-3 text-xs"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}

        {/* Payments */}
        {tab === 'payments' && (
          <div className="space-y-2">
            {payments.map((p) => (
              <GlassCard key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="text-sm font-medium capitalize">
                    {p.type} · {formatCurrency(p.amount)}
                  </p>
                  <p className="text-xs text-white/40">
                    {p.phone} · {new Date(p.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                    p.status === 'completed'
                      ? 'bg-accent/15 text-accent'
                      : p.status === 'pending'
                      ? 'bg-yellow-500/15 text-yellow-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}>
                    {p.status}
                  </span>
                  {p.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'completed')}
                        className="text-xs text-accent"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'failed')}
                        className="text-xs text-red-400"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}