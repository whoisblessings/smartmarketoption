import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'About Us | Smart Market Option',
  description: 'Learn about Smart Market Option — transparent investment packages with M-Pesa deposits and real-time tracking.',
};

export default function AboutPage() {
  return (
    <LegalPageShell title="About Us">
      <p>
        <strong className="text-white">Smart Market Option</strong> is an investment platform
        built for clarity. We offer fixed-rate packages so you can plan deposits, track balances,
        and see returns without complicated trading tools.
      </p>

      <GlassCard className="!text-white/80">
        <h2 className="text-base font-semibold text-white mb-2">Our mission</h2>
        <p>
          Make everyday investing accessible: transparent rates, instant M-Pesa funding, and a
          dashboard that shows exactly where your money stands.
        </p>
      </GlassCard>

      <h2 className="text-lg font-semibold text-white pt-2">What we offer</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Starter, Growth, and Premium packages with clear daily rates and minimums</li>
        <li>Wallet deposits and withdrawals designed around M-Pesa STK Push</li>
        <li>Real-time style tracking of balance, invested capital, and earnings</li>
        <li>Guest mode so you can explore the dashboard before you register</li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">How we work</h2>
      <p>
        You create an account (or try as a guest), fund your wallet, choose a package that matches
        your goals, and monitor progress from the app. Package rates and durations are shown
        upfront so you can use our profit calculator and decide with confidence.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">Who we serve</h2>
      <p>
        We focus on investors who want simple, trackable packages—especially those who prefer
        M-Pesa and fixed rates over complex trading terminals. Whether you start from a few
        hundred shillings or scale into larger plans, the product is designed to stay readable.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">Contact</h2>
      <p>
        Questions about the platform, your account, or packages? Visit our{' '}
        <a href="/support" className="text-accent hover:underline">
          Support
        </a>{' '}
        page or reach out through the channels listed there. We’re here to help you invest with
        clarity.
      </p>
    </LegalPageShell>
  );
}
