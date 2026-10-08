'use client';

import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

const PLANS = [
  { name: 'Starter', rate: 1.5, min: 500, duration: 14 },
  { name: 'Growth', rate: 2.2, min: 5000, duration: 30 },
  { name: 'Premium', rate: 3.0, min: 20000, duration: 30 },
] as const;

function formatKsh(n: number) {
  return `KSh ${n.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
}

export function ProfitCalculator() {
  const [planIndex, setPlanIndex] = useState(1);
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(30);

  const plan = PLANS[planIndex];

  const result = useMemo(() => {
    const safeAmount = Math.max(0, amount);
    const safeDays = Math.max(1, Math.min(365, days));
    const dailyProfit = safeAmount * (plan.rate / 100);
    const totalProfit = dailyProfit * safeDays;
    const totalReturn = safeAmount + totalProfit;
    return { dailyProfit, totalProfit, totalReturn, safeDays };
  }, [amount, days, plan.rate]);

  return (
    <GlassCard className="space-y-5">
      <div>
        <h3 className="font-semibold text-lg">Profit Calculator</h3>
        <p className="text-sm text-white/50 mt-1">
          Estimate your returns based on package rate and duration.
        </p>
      </div>

      {/* Plan selector */}
      <div className="flex gap-2">
        {PLANS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setPlanIndex(i);
              if (amount < p.min) setAmount(p.min);
              setDays(p.duration);
            }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
              planIndex === i
                ? 'bg-accent text-black'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {p.name}
            <span className="block text-[10px] opacity-80">{p.rate}% daily</span>
          </button>
        ))}
      </div>

      {/* Amount */}
      <div>
        <label className="mb-1.5 block text-xs text-white/50">Investment amount (KSh)</label>
        <input
          type="number"
          min={plan.min}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
        />
        <p className="mt-1 text-[11px] text-white/40">Min. {formatKsh(plan.min)}</p>
      </div>

      {/* Days */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs text-white/50">Duration (days)</label>
          <span className="text-sm font-medium text-accent">{days} days</span>
        </div>
        <input
          type="range"
          min={1}
          max={90}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full accent-[var(--accent,#22c55e)]"
        />
        <div className="mt-1 flex justify-between text-[10px] text-white/30">
          <span>1 day</span>
          <span>90 days</span>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Daily profit</span>
          <span className="font-semibold text-accent">{formatKsh(result.dailyProfit)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Total profit ({result.safeDays} days)</span>
          <span className="font-semibold text-accent">{formatKsh(result.totalProfit)}</span>
        </div>
        <div className="border-t border-white/10 pt-3 flex justify-between">
          <span className="text-white/80 font-medium">You get back</span>
          <span className="text-xl font-bold text-accent">{formatKsh(result.totalReturn)}</span>
        </div>
      </div>

      <p className="text-[11px] text-white/35 leading-relaxed">
        Estimates use fixed daily rates. Actual returns depend on the package you choose and
        platform terms. Past performance is not a guarantee of future results.
      </p>
    </GlassCard>
  );
}
