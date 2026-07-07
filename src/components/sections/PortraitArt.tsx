/**
 * Abstract portrait illustration for the About card — a stylized
 * silhouette (not a likeness), built from flat shapes in the site's
 * navy / orange / cream palette with a small nod to Sarvam's swirl
 * ornament. Colors are hardcoded rather than theme tokens on purpose:
 * this graphic should look identical in light and dark mode.
 */

const NAVY = "#152341";
const NAVY_SOFT = "#22365c";
const ORANGE = "#ef7b2d";
const CREAM = "#f7eedb";
const TAN = "#cf9f74";

export function PortraitArt() {
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Abstract illustrated avatar"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="portrait-wash" cx="50%" cy="34%" r="60%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.16" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
        <pattern id="portrait-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="13" cy="13" r="1.2" fill={NAVY} opacity="0.1" />
        </pattern>
        <filter id="portrait-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>

      {/* Backdrop */}
      <rect width="400" height="500" fill="url(#portrait-dots)" />
      <rect width="400" height="500" fill="url(#portrait-wash)" />

      {/* Orbit rings */}
      <circle cx="200" cy="205" r="138" fill="none" stroke={ORANGE} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="200" cy="205" r="168" fill="none" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1" />

      {/* Soft glow behind head */}
      <circle cx="200" cy="192" r="110" fill={ORANGE} opacity="0.16" filter="url(#portrait-glow)" />

      {/* Shoulders / blazer */}
      <path
        d="M60 500 L60 420 Q60 375 115 355 L165 322 Q200 308 235 322 L285 355 Q340 375 340 420 L340 500 Z"
        fill={NAVY}
      />
      <path
        d="M165 322 L115 355 Q94 364 82 380 L132 410 Z"
        fill={NAVY_SOFT}
        opacity="0.7"
      />

      {/* Collar / shirt front */}
      <path d="M186 328 L200 415 L214 328 Z" fill={CREAM} />
      {/* Tie */}
      <path d="M195 340 L205 340 L209 415 L191 415 Z" fill={ORANGE} />

      {/* Neck — short, overlaps both the chin above and the blazer below */}
      <rect x="183" y="256" width="34" height="72" rx="10" fill={TAN} />

      {/* Head */}
      <ellipse cx="200" cy="203" rx="58" ry="66" fill={TAN} />

      {/* Hair */}
      <path
        d="M142 188 C142 118 172 96 200 96 C228 96 258 118 258 188 C258 150 228 138 200 140 C172 138 142 150 142 188 Z"
        fill={NAVY}
      />

      {/* Eyes */}
      <ellipse cx="179" cy="206" rx="4" ry="5" fill={NAVY} />
      <ellipse cx="221" cy="206" rx="4" ry="5" fill={NAVY} />

      {/* Brand-echo swirl ornament */}
      <g transform="translate(322,46)" opacity="0.6" fill="none" strokeLinecap="round">
        <path d="M0 6 Q13 1 14 13 Q15 25 3 24 Q-5 23 -5 15" stroke={NAVY} strokeWidth="2.5" />
        <path d="M20 10 Q31 13 27 25 Q23 35 11 32" stroke={ORANGE} strokeWidth="2.5" />
      </g>
    </svg>
  );
}
