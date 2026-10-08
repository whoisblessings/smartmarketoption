import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Smart Market Option',
  description: 'How Smart Market Option collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <p className="text-white/50 text-xs">Last updated: October 8, 2026</p>

      <p>
        This Privacy Policy explains how <strong className="text-white">Smart Market Option</strong>{' '}
        (“we”, “us”, “our”) collects, uses, stores, and shares information when you use our
        website and investment platform.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">1. Information we collect</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong className="text-white">Account data</strong> — name, email, phone number, and
          authentication details when you register.
        </li>
        <li>
          <strong className="text-white">Transaction data</strong> — deposits, withdrawals,
          investments, amounts, and related payment references (e.g. M-Pesa).
        </li>
        <li>
          <strong className="text-white">Usage data</strong> — pages visited, device type, and
          approximate technical logs needed to operate and secure the service.
        </li>
        <li>
          <strong className="text-white">Support messages</strong> — information you send when
          contacting support.
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">2. How we use information</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Provide accounts, wallets, packages, and dashboards</li>
        <li>Process payments and verify transactions</li>
        <li>Prevent fraud, abuse, and unauthorized access</li>
        <li>Respond to support requests and improve the product</li>
        <li>Meet legal and regulatory obligations where applicable</li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">3. Sharing of information</h2>
      <p>
        We do not sell your personal information. We may share data with:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Payment providers needed to complete M-Pesa or other transfers</li>
        <li>Infrastructure and hosting providers that process data on our behalf under contract</li>
        <li>Authorities when required by law or to protect rights and safety</li>
      </ul>

      <h2 className="text-lg font-semibold text-white pt-2">4. Cookies and similar tech</h2>
      <p>
        We use cookies and similar technologies for authentication, session management (including
        optional guest mode), and essential site function. You can control cookies through your
        browser settings; disabling some may limit features.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">5. Data security</h2>
      <p>
        We apply reasonable technical and organizational measures to protect account and
        transaction data. No method of transmission or storage is 100% secure; please use a strong
        password and keep login details private.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">6. Data retention</h2>
      <p>
        We retain account and transaction records for as long as needed to provide the service,
        resolve disputes, and comply with legal requirements. You may request account closure
        subject to outstanding obligations.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">7. Your choices</h2>
      <p>
        Depending on applicable law, you may request access, correction, or deletion of certain
        personal data. Contact us via the{' '}
        <a href="/support" className="text-accent hover:underline">
          Support
        </a>{' '}
        page. We may need to verify your identity before fulfilling requests.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">8. Children</h2>
      <p>
        The platform is not directed at individuals under 18. We do not knowingly collect personal
        information from minors.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">9. Changes</h2>
      <p>
        We may update this policy from time to time. The “Last updated” date at the top will
        change when we do. Continued use after changes constitutes acceptance of the revised
        policy where permitted by law.
      </p>

      <h2 className="text-lg font-semibold text-white pt-2">10. Contact</h2>
      <p>
        Privacy questions: use the channels on our{' '}
        <a href="/support" className="text-accent hover:underline">
          Support
        </a>{' '}
        page.
      </p>
    </LegalPageShell>
  );
}
