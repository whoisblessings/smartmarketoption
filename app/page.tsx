import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { GlassCard } from '@/components/ui/GlassCard';

const packagesPreview = [
  {
    name: 'Starter',
    rate: '1.5%',
    period: 'daily',
    min: 'KSh 500',
    color: 'from-emerald-500/20 to-transparent',
  },
  {
    name: 'Growth',
    rate: '2.2%',
    period: 'daily',
    min: 'KSh 5,000',
    color: 'from-accent/30 to-transparent',
    featured: true,
  },
  {
    name: 'Premium',
    rate: '3.0%',
    period: 'daily',
    min: 'KSh 20,000',
    color: 'from-yellow-500/20 to-transparent',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-amoled">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80"
            alt="Market chart"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>

        <div className="relative z-10 mx-auto max-w-lg px-5 pb-12 pt-16">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Icon name="show_chart" size={22} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">SmartMarket</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
            Grow your wealth{' '}
            <span className="text-accent">smartly</span>
          </h1>
          <p className="mb-8 text-base text-white/70 leading-relaxed">
            Invest with confidence. Transparent packages, instant M-Pesa deposits &amp;
            withdrawals, and real-time returns tracking.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/auth/register" className="btn-accent text-center">
              Get Started
            </Link>
            <Link href="/auth/login" className="btn-ghost text-center">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-6 text-xl font-semibold">Why SmartMarket?</h2>
        <div className="grid gap-4">
          {[
            {
              icon: 'security',
              title: 'Secure & Trusted',
              desc: 'Bank-grade security with M-Pesa integration via Safaricom Daraja.',
            },
            {
              icon: 'speed',
              title: 'Instant Deposits',
              desc: 'Fund your wallet in seconds using STK Push. No waiting.',
            },
            {
              icon: 'insights',
              title: 'Transparent Returns',
              desc: 'Clear rates, fixed durations. Track every shilling in real time.',
            },
            {
              icon: 'support_agent',
              title: '24/7 Support',
              desc: 'Our team is always ready to help you succeed.',
            },
          ].map((f) => (
            <GlassCard key={f.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <Icon name={f.icon} size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-white/60">{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Packages preview */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Investment Packages</h2>
        <p className="mb-6 text-sm text-white/50">
          Choose a plan that matches your goals. Rates adjustable by admin.
        </p>
        <div className="grid gap-4">
          {packagesPreview.map((pkg) => (
            <GlassCard
              key={pkg.name}
              className={`relative overflow-hidden ${pkg.featured ? 'ring-1 ring-accent' : ''}`}
            >
              {pkg.featured && (
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-black">
                  POPULAR
                </span>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} pointer-events-none`} />
              <div className="relative">
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-accent">{pkg.rate}</span>
                  <span className="text-sm text-white/50">{pkg.period}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">Min. investment {pkg.min}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <Link
          href="/auth/register"
          className="btn-accent mt-6 block w-full text-center"
        >
          Start Investing Now
        </Link>
      </section>

      {/* Stats bar */}
      <section className="mx-auto max-w-lg px-5 py-8">
        <GlassCard className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-accent">10K+</p>
            <p className="text-xs text-white/50">Investors</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">KSh 50M+</p>
            <p className="text-xs text-white/50">Invested</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">98%</p>
            <p className="text-xs text-white/50">Satisfaction</p>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} Smart Market Option. All rights reserved.</p>
        <p className="mt-1">Powered by Safaricom Daraja &amp; Supabase</p>
      </footer>
    </div>
  );
}