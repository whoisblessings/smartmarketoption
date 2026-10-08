import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { SmartLogo } from '@/components/SmartLogo';

export function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amoled">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <SmartLogo size={36} />
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
        <h1 className="mb-8 text-3xl font-bold tracking-tight">{title}</h1>
        <div className="space-y-6 text-sm text-white/70 leading-relaxed">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
