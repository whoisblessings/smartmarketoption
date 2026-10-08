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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('nav-item flex-1 py-1', isActive && 'active')}
            >
              <Icon name={item.icon} size={24} filled={isActive} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}