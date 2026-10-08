import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Smart Market Option',
  description: 'Terms and conditions for using Smart Market Option investment packages and services.',
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms & Conditions">
      <p className="text-white/50 text-xs">Last updated: October 8, 2026</p>

      <p>
        These Terms &amp; Conditions (“Terms”) govern your use of the{' '}
        <strong className="text-white">Smart Market Option</strong> website and platform. By
        accessing or using the service, you agree to these Terms. If you do not agree, do not use
        the platform.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">1. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally able to enter into contracts. You are
        responsible for providing accurate registration information and keeping credentials secure.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">2. Nature of the service</h2>
      <p>
        Smart Market Option provides digital investment packages with published rates and
        durations, wallet funding (including M-Pesa where available), and account dashboards.
        Package details shown in the app control the offer you accept when you invest. The profit
        calculator on the site is illustrative only and does not guarantee results.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">3. Accounts and guest access</h2>
      <p>
        Registered accounts may deposit, invest, and withdraw subject to verification and platform
        rules. Guest mode is for exploration only and does not create real balances or entitlement
        to funds. We may suspend or terminate accounts for fraud, abuse, or violation of these
        Terms.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">4. Deposits and withdrawals</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Deposits must come from payment methods you are authorized to use.</li>
        <li>Processing times depend on payment partners (e.g. M-Pesa) and internal review.</li>
        <li>Withdrawals may require identity or transaction checks before release.</li>
        <li>We are not responsible for delays caused by third-party payment networks.</li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">5. Investments</h2>
      <p>
        When you invest in a package, you accept the rate, duration, minimums, and other terms
        displayed for that package at the time of investment. Returns are calculated according to
        those terms. Early exit, cancellation, or changes may not be available or may affect
        returns as specified in-product.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">6. Risk disclosure</h2>
      <p>
        All investing involves risk. Past or estimated performance is not a guarantee of future
        results. Only invest funds you can afford to commit for the stated period. You are solely
        responsible for your investment decisions.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">7. Prohibited use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Use the platform for money laundering, fraud, or illegal activity</li>
        <li>Attempt to hack, scrape, or disrupt the service</li>
        <li>Impersonate others or provide false payment or identity information</li>
        <li>Abuse promotions, guest mode, or referral systems if offered</li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">8. Intellectual property</h2>
      <p>
        The SmartMarket name, logo, design, and content are owned by us or our licensors. You may
        not copy or reuse them without permission, except for personal use of the platform as
        intended.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for indirect, incidental, or
        consequential damages arising from use of the platform, payment network failures, or
        investment outcomes. Our total liability related to the service is limited to the fees you
        paid us in the three months preceding the claim, or the amount required by mandatory law.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">10. Indemnity</h2>
      <p>
        You agree to indemnify and hold us harmless from claims arising from your misuse of the
        platform, violation of these Terms, or infringement of third-party rights.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">11. Changes to the service or Terms</h2>
      <p>
        We may modify packages, rates, features, or these Terms. Material changes will be reflected
        by updating the “Last updated” date. Continued use after changes means you accept the
        revised Terms where allowed by law.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">12. Governing law</h2>
      <p>
        These Terms are governed by the laws of Kenya, without regard to conflict-of-law rules,
        unless mandatory local law requires otherwise. Disputes should first be raised via Support;
        unresolved disputes may be brought in competent courts in Kenya.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">13. Contact</h2>
      <p>
        For questions about these Terms, see{' '}
        <a href="/support" className="text-accent hover:underline">
          Support
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
