'use client';

import { useEffect, useState } from 'react';
import { SmartLogo } from '@/components/SmartLogo';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const minTime = 900;
    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minTime - elapsed);
      window.setTimeout(() => {
        setFade(true);
        window.setTimeout(() => setVisible(false), 420);
      }, wait);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
      // Fallback if load is slow
      const fallback = window.setTimeout(finish, 2500);
      return () => {
        window.removeEventListener('load', finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-400 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={fade}
      role="status"
      aria-label="Loading SmartMarket"
    >
      <div className="relative flex flex-col items-center">
        <div className="preloader-logo-pulse">
          <SmartLogo size={96} />
        </div>
        <p className="mt-6 text-sm font-medium tracking-wide text-white/50">
          Smart<span className="text-accent">Market</span>
        </p>
        <div className="mt-5 h-1 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="preloader-bar h-full rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
