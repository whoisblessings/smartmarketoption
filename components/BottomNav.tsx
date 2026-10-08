'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './ui/Icon';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: 'home' },
  { href: '/invest', label: 'Invest', icon: 'trending_up' },
  { href: '/wallet', label: 'Wallet', icon: 'account_balance_wallet' },
  { href: '/history', label: 'History', icon: 'history' },
  { href: '/profile', label: 'Profile', icon: 'person' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-lg px-4 pointer-events-auto">
        <div
          className={cn(
            'flex items-center justify-around gap-0.5',
            'rounded-full border border-white/15',
            'bg-black/70 backdrop-blur-2xl',
            'px-2 py-2',
            'shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]'
          )}
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-item flex-1 min-w-0 rounded-full py-2 px-1 transition-all duration-200',
                  isActive && 'active bg-accent/15'
                )}
              >
                <Icon name={item.icon} size={22} filled={isActive} />
                <span className="text-[10px] font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
