import Link from 'next/link';

const links = [
  { href: '/about', label: 'About Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/support', label: 'Support' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-sm text-white/40">
      <nav className="mb-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="hover:text-accent transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <p>© {new Date().getFullYear()} Smart Market Option. All rights reserved.</p>
    </footer>
  );
}
