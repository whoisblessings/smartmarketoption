'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { GlassCard } from '@/components/ui/GlassCard';
import { SiteFooter } from '@/components/SiteFooter';

const faqs = [
  {
    q: 'How do I deposit money?',
    a: 'Sign in, open Wallet → Deposit, enter your M-Pesa number and amount, then approve the STK Push prompt on your phone. Funds should appear in your wallet after confirmation.',
  },
  {
    q: 'How do withdrawals work?',
    a: 'From Wallet → Withdraw, enter the amount and destination number. Processing may take a short time depending on network and review. Ensure your details are correct before submitting.',
  },
  {
    q: 'When do I receive investment returns?',
    a: 'Each package has a published daily rate and duration. Returns are tracked according to the package terms you accept when investing. Check Active Investments on your dashboard for end dates.',
  },
  {
    q: 'Can I try the app without registering?',
    a: 'Yes. Use “Continue as Guest” on the home page to explore a demo dashboard. Guest mode does not hold real funds—create an account to deposit and invest.',
  },
  {
    q: 'Is the profit calculator a guarantee?',
    a: 'No. The calculator is an estimate based on selected rate and duration. Actual results follow the package terms in the app at the time you invest.',
  },
  {
    q: 'I didn’t receive an STK Push or deposit.',
    a: 'Confirm your phone number format, network coverage, and that you approved the prompt. If the issue persists, contact support with the approximate time and amount.',
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Client-side placeholder — wire to email/API later
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <div className="min-h-screen bg-amoled">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <Icon name="show_chart" size={20} className="text-black" />
            </div>
            <span className="font-bold tracking-tight">SmartMarket</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-white/50 hover:text-accent transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">Support</h1>
        <p className="mb-8 text-sm text-white/60">
          FAQs, contact options, and help with deposits, investments, and your account.
        </p>

        {/* Contact channels */}
        <div className="mb-10 grid gap-3">
          <GlassCard className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
              <Icon name="mail" size={22} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:support@smartmarketoption.com"
                className="text-sm text-accent hover:underline"
              >
                support@smartmarketoption.com
              </a>
            </div>
          </GlassCard>
          <GlassCard className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
              <Icon name="schedule" size={22} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-sm text-white/60">We aim to respond within 24–48 hours</p>
            </div>
          </GlassCard>
        </div>

        {/* FAQs */}
        <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
        <div className="mb-10 space-y-3">
          {faqs.map((faq, i) => (
            <GlassCard key={faq.q} className="!p-0 overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-sm">{faq.q}</span>
                <Icon
                  name={open === i ? 'expand_less' : 'expand_more'}
                  size={20}
                  className="text-white/40 shrink-0"
                />
              </button>
              {open === i && (
                <p className="border-t border-white/5 px-4 py-3 text-sm text-white/60 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Contact form */}
        <h2 className="mb-4 text-xl font-semibold">Send a message</h2>
        {sent ? (
          <GlassCard className="text-center py-8">
            <Icon name="check_circle" size={40} className="mx-auto text-accent" />
            <p className="mt-3 font-semibold">Message noted</p>
            <p className="mt-1 text-sm text-white/50">
              Thanks for reaching out. For a faster response, also email{' '}
              support@smartmarketoption.com with the same details.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="btn-ghost mt-4 text-sm"
            >
              Send another
            </button>
          </GlassCard>
        ) : (
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-white/50">Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/50">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/50">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent resize-none"
                  placeholder="Describe your issue or question…"
                />
              </div>
              <button type="submit" className="btn-accent w-full text-center">
                Submit
              </button>
            </form>
          </GlassCard>
        )}

        <p className="mt-8 text-center text-xs text-white/40">
          Also see{' '}
          <Link href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="text-accent hover:underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
