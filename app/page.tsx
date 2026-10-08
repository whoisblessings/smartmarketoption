import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { GlassCard } from '@/components/ui/GlassCard';
import { TradingViewTicker } from '@/components/TradingViewTicker';

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

const howItWorks = [
  {
    step: '01',
    title: 'Create Account',
    desc: 'Sign up in seconds or continue as a guest to explore the platform.',
  },
  {
    step: '02',
    title: 'Fund Your Wallet',
    desc: 'Deposit instantly via M-Pesa STK Push. Funds appear in your wallet in seconds.',
  },
  {
    step: '03',
    title: 'Choose a Package',
    desc: 'Pick an investment plan that matches your goals and risk appetite.',
  },
  {
    step: '04',
    title: 'Track & Earn',
    desc: 'Watch your returns grow in real time on a clean, transparent dashboard.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-amoled">
      {/* Live market ticker */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-md">
        <TradingViewTicker />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80"
            alt="Stock market trading chart"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>

        <div className="relative z-10 mx-auto max-w-lg px-5 pb-12 pt-12">
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
          <Link
            href="/dashboard?guest=1"
            className="mt-4 block text-center text-sm text-white/50 hover:text-accent transition-colors"
          >
            Continue as Guest →
          </Link>
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
              desc: 'Bank-grade security with encrypted transactions and protected accounts.',
            },
            {
              icon: 'speed',
              title: 'Instant Deposits',
              desc: 'Fund your wallet in seconds using M-Pesa STK Push. No waiting.',
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

      {/* How it works */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">How It Works</h2>
        <p className="mb-6 text-sm text-white/50">
          Four simple steps to start growing your wealth.
        </p>
        <div className="grid gap-4">
          {howItWorks.map((item) => (
            <GlassCard key={item.step} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">{item.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Trading lifestyle imagery */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Trade & Invest Like a Pro</h2>
        <p className="mb-6 text-sm text-white/50">
          Join thousands of everyday investors building wealth through smart packages.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80"
              alt="Person analyzing stock charts on laptop"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">Analyze markets</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
              alt="Financial charts and growth data"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">Track growth</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="Team reviewing investment performance"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">
              Build wealth with a community of smart investors
            </p>
          </div>
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

      {/* Testimonials-style content */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-6 text-xl font-semibold">What Investors Say</h2>
        <div className="grid gap-4">
          <GlassCard>
            <p className="text-sm text-white/70 leading-relaxed">
              “I started with the Starter package and watched my balance grow daily. The dashboard is clear and deposits land instantly.”
            </p>
            <p className="mt-3 text-xs text-white/40">— James K., Nairobi</p>
          </GlassCard>
          <GlassCard>
            <p className="text-sm text-white/70 leading-relaxed">
              “Transparent rates and real-time tracking. Finally an investment app that doesn’t hide the numbers.”
            </p>
            <p className="mt-3 text-xs text-white/40">— Amina W., Mombasa</p>
          </GlassCard>
        </div>
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

      {/* CTA */}
      <section className="mx-auto max-w-lg px-5 py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to grow smarter?</h2>
        <p className="text-white/60 mb-6 text-sm">
          Create a free account or explore as a guest. No credit card required.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/auth/register" className="btn-accent text-center">
            Create Account
          </Link>
          <Link href="/dashboard?guest=1" className="btn-ghost text-center">
            Try as Guest
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} Smart Market Option. All rights reserved.</p>
      </footer>
    </div>
  );
}
