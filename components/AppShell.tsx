'use client';

import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-28">
      <main className="mx-auto max-w-lg px-4 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
