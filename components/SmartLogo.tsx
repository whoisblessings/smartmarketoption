/** Green brand logo inspired by hexagonal S icon — blue → brand green */
export function SmartLogo({
  size = 80,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SmartMarket"
    >
      <defs>
        <linearGradient id="sm-green-dark" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E676" />
          <stop offset="0.45" stopColor="#00C853" />
          <stop offset="1" stopColor="#009624" />
        </linearGradient>
        <linearGradient id="sm-green-mid" x1="30" y1="25" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#69F0AE" />
          <stop offset="0.5" stopColor="#00E676" />
          <stop offset="1" stopColor="#00C853" />
        </linearGradient>
        <linearGradient id="sm-green-light" x1="40" y1="35" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B9F6CA" />
          <stop offset="1" stopColor="#69F0AE" />
        </linearGradient>
        <filter id="sm-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00C853" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer hexagon shell */}
      <path
        d="M60 8 L102 32 L102 88 L60 112 L18 88 L18 32 Z"
        fill="url(#sm-green-dark)"
        filter="url(#sm-soft)"
      />

      {/* Inner facet (lighter) */}
      <path
        d="M60 20 L92 38 L92 82 L60 100 L28 82 L28 38 Z"
        fill="url(#sm-green-mid)"
        opacity="0.95"
      />

      {/* S ribbon — top arm */}
      <path
        d="M38 42 C38 34 48 28 62 28 C78 28 88 36 88 46 C88 54 82 58 70 60 L50 64 C42 66 38 70 38 76 C38 84 48 90 64 90 C78 90 86 84 88 78"
        stroke="url(#sm-green-light)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* S cut highlight for depth */}
      <path
        d="M42 44 C42 38 50 33 62 33 C74 33 82 38 82 46 C82 51 78 54 68 57 L52 61"
        stroke="#E8F5E9"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

/** Compact mark for headers / favicon-style use */
export function SmartLogoMark({
  size = 40,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return <SmartLogo size={size} className={className} />;
}
