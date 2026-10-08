import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { GlassCard } from '@/components/ui/GlassCard';
import { TradingViewTicker } from '@/components/TradingViewTicker';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { SiteFooter } from '@/components/SiteFooter';

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

const investmentPillars = [
  {
    icon: 'account_balance',
    title: 'Diversified approach',
    desc: 'Packages are structured so you can start small and scale up as your capital grows—without locking you into complex products.',
  },
  {
    icon: 'schedule',
    title: 'Fixed, clear timelines',
    desc: 'Each plan has a defined duration and daily rate so you know when returns are expected and when your principal is available again.',
  },
  {
    icon: 'visibility',
    title: 'Full transparency',
    desc: 'See rates, balances, and active investments on your dashboard. No hidden fees in the package summary—what you see is what you track.',
  },
  {
    icon: 'payments',
    title: 'M-Pesa native',
    desc: 'Deposit and withdraw using the payment method millions of Kenyans already trust. STK Push keeps funding fast and familiar.',
  },
];

const marketThemes = [
  {
    title: 'Equities mindset',
    desc: 'Think long-term ownership of value—our packages give you structured exposure-style returns without needing a brokerage terminal.',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf36cc?w=800&q=80',
    alt: 'Stock market board and financial data',
  },
  {
    title: 'Discipline over noise',
    desc: 'Markets move every second. Fixed daily rates help you stick to a plan instead of chasing every headline.',
    image: 'https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=800&q=80',
    alt: 'Trader studying candlestick charts on screen',
  },
  {
    title: 'Mobile-first investing',
    desc: 'Check balances, fund via M-Pesa, and follow active packages from your phone—wherever you are.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    alt: 'Person investing on smartphone',
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
            Invest with confidence. Transparent packages, instant M-Pesa deposits &
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

      {/* Markets & mindset with images */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Think Like an Investor</h2>
        <p className="mb-6 text-sm text-white/50">
          Global markets reward patience and structure. SmartMarket packages are built for that mindset.
        </p>
        <div className="space-y-4">
          {marketThemes.map((theme) => (
            <div key={theme.title} className="overflow-hidden rounded-2xl border border-white/10">
              <div className="relative h-44 w-full">
                <Image
                  src={theme.image}
                  alt={theme.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 512px) 100vw, 512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <p className="absolute bottom-3 left-4 right-4 text-lg font-semibold">{theme.title}</p>
              </div>
              <div className="bg-white/5 px-4 py-3">
                <p className="text-sm text-white/60 leading-relaxed">{theme.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profit Calculator */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Calculate Your Profit</h2>
        <p className="mb-6 text-sm text-white/50">
          Pick a package, set an amount and duration, and see estimated daily and total returns.
        </p>
        <ProfitCalculator />
      </section>

      {/* About investment */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">How SmartMarket Investing Works</h2>
        <p className="mb-6 text-sm text-white/60 leading-relaxed">
          SmartMarket offers fixed-rate investment packages designed for clarity. You choose a
          plan, fund your wallet, and allocate capital for a set period. Returns are calculated
          from the published daily rate for that package so you can plan ahead.
        </p>
        <div className="grid gap-4">
          {investmentPillars.map((p) => (
            <GlassCard key={p.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <Icon name={p.icon} size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-white/60">{p.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Image banner: office / trading floor feel */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="relative h-52 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80"
            alt="Modern financial district skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">Markets never sleep</p>
            <p className="mt-1 text-lg font-bold leading-snug">
              Your capital works on a clear schedule—so you don’t have to watch the tape all day.
            </p>
          </div>
        </div>
      </section>

      {/* Investment education */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Building Wealth Step by Step</h2>
        <p className="mb-6 text-sm text-white/50">
          Practical principles we encourage every investor to follow.
        </p>
        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-semibold mb-2">Start with what you can afford</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              The Starter package begins from KSh 500 so you can learn the flow—deposit, invest,
              track—before committing larger amounts. Never invest money you need for essentials.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-semibold mb-2">Match plan to goal</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Short-term goals may suit Starter or Growth. Larger capital and longer horizons can
              use Premium for higher daily rates. Use the calculator above to compare outcomes
              before you commit.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-semibold mb-2">Track and reinvest deliberately</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Your dashboard shows active investments, balances, and earnings. When a package
              completes, decide whether to withdraw or roll capital into a new plan based on your
              current goals—not impulse.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-semibold mb-2">Understand the model</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Packages use fixed daily rates over a defined period. Estimated profits in the
              calculator are illustrative. Always read package terms in-app and invest only after
              you understand duration, minimums, and how returns are credited.
            </p>
          </GlassCard>
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

      {/* Expanded lifestyle gallery */}
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
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80"
              alt="Candlestick chart on trading screen"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">Read the tape</p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80"
              alt="Counting money and planning investments"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">Plan capital</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl col-span-2">
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
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
              alt="Professional in business attire ready for markets"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-sm font-medium">
              Dress for the goals you are funding
            </p>
          </div>
        </div>
      </section>

      {/* Why fixed packages */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Why Fixed Packages?</h2>
        <p className="mb-6 text-sm text-white/50">
          Not everyone wants leverage, margin calls, or overnight chart watching.
        </p>
        <div className="space-y-3">
          {[
            {
              title: 'Predictable structure',
              body: 'You see the rate and duration before you invest. That makes budgeting and goal-setting simpler than open-ended trading.',
            },
            {
              title: 'Less screen time',
              body: 'Set your package, fund the wallet, and monitor progress on the dashboard—without needing to day-trade.',
            },
            {
              title: 'Clear minimums',
              body: 'From KSh 500 upward, you can match package size to what you actually have available.',
            },
            {
              title: 'Local payment rails',
              body: 'M-Pesa deposits and withdrawals keep funding in a flow you already use every day.',
            },
          ].map((item) => (
            <GlassCard key={item.title}>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Security strip with image */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-40">
            <Image
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80"
              alt="Digital security and encrypted data concept"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>
          <div className="relative -mt-16 px-5 pb-5">
            <h2 className="text-xl font-semibold mb-2">Security you can see</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Encrypted sessions, protected accounts, and transparent transaction history on your
              dashboard. We treat your login and payment details with care—and you should too:
              use a strong password and never share OTPs.
            </p>
            <Link href="/privacy" className="text-sm text-accent hover:underline">
              Read our Privacy Policy →
            </Link>
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

      {/* Who it's for */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Who Is This For?</h2>
        <p className="mb-6 text-sm text-white/50">
          Built for Kenyan investors who want simple, trackable packages—not complicated trading terminals.
        </p>
        <div className="grid gap-3">
          {[
            'First-time investors starting from KSh 500',
            'Savers who prefer fixed rates over open-ended trading',
            'People who want M-Pesa deposits and withdrawals',
            'Anyone who wants a clear dashboard of balance and active plans',
            'Busy professionals who prefer structure over constant chart watching',
          ].map((item) => (
            <GlassCard key={item} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
                <Icon name="check" size={18} className="text-accent" />
              </div>
              <p className="text-sm text-white/70">{item}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Getting started checklist */}
      <section className="mx-auto max-w-lg px-5 py-10">
        <h2 className="mb-2 text-xl font-semibold">Your First Week on SmartMarket</h2>
        <p className="mb-6 text-sm text-white/50">
          A simple checklist to go from curious to invested.
        </p>
        <div className="space-y-3">
          {[
            { n: '1', t: 'Create your account', d: 'Register with email and phone, or explore first as a guest.' },
            { n: '2', t: 'Run the profit calculator', d: 'Compare Starter, Growth, and Premium for the amount you have in mind.' },
            { n: '3', t: 'Fund with M-Pesa', d: 'Use STK Push from the wallet screen—approve the prompt on your phone.' },
            { n: '4', t: 'Pick a package', d: 'Confirm rate, duration, and minimum before you allocate funds.' },
            { n: '5', t: 'Watch the dashboard', d: 'Track balance, invested amount, and active plans in one place.' },
          ].map((s) => (
            <GlassCard key={s.n} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-black font-bold text-sm">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold">{s.t}</h3>
                <p className="mt-0.5 text-sm text-white/60">{s.d}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
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
          <GlassCard>
            <p className="text-sm text-white/70 leading-relaxed">
              “The profit calculator helped me pick Growth over Starter. I knew roughly what I’d earn before I deposited.”
            </p>
            <p className="mt-3 text-xs text-white/40">— Brian O., Kisumu</p>
          </GlassCard>
          <GlassCard>
            <p className="text-sm text-white/70 leading-relaxed">
              “I don’t have time to trade all day. Fixed packages and M-Pesa funding fit how I actually live.”
            </p>
            <p className="mt-3 text-xs text-white/40">— Faith M., Nakuru</p>
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

      {/* Final image CTA */}
      <section className="mx-auto max-w-lg px-5 py-6">
        <div className="relative h-56 overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1633158829875-e5316a73c62f?w=1000&q=80"
            alt="Hands holding coins representing growing savings"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to grow smarter?</h2>
            <p className="text-sm text-white/70 mb-5">
              Create a free account or explore as a guest. No credit card required.
            </p>
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
              <Link href="/auth/register" className="btn-accent text-center">
                Create Account
              </Link>
              <Link href="/dashboard?guest=1" className="btn-ghost text-center">
                Try as Guest
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Extra links */}
      <section className="mx-auto max-w-lg px-5 py-8 text-center text-sm text-white/50">
        <p className="mb-3">Learn more about how we work</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about" className="text-accent hover:underline">
            About Us
          </Link>
          <Link href="/support" className="text-accent hover:underline">
            Support
          </Link>
          <Link href="/terms" className="text-accent hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
