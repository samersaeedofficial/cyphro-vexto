import { motion } from "framer-motion";

// ─── Icon Only ───────────────────────────────────────────────────────────────
export function CyphroLogo({ size = 36, className = "", animate = false }) {
  const id = "cvx";

  // Wrapper: if animate=true, add a subtle entrance scale+fade, otherwise render static
  const Wrap = animate ? motion.svg : "svg";
  const wrapProps = animate
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Wrap
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...wrapProps}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="24" y1="2" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1a2444" />
          <stop offset="100%" stopColor="#090d1e" />
        </linearGradient>
        <linearGradient id={`${id}-border`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#818cf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="14" y1="14" x2="24" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="34" y1="14" x2="24" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id={`${id}-tip`} cx="24" cy="34" r="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-shine`} x1="12" y1="8" x2="36" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shield body */}
      <path
        d="M24 3 Q41 3 41 14 L41 30 Q41 44 24 46 Q7 44 7 30 L7 14 Q7 3 24 3 Z"
        fill={`url(#${id}-bg)`}
        stroke={`url(#${id}-border)`}
        strokeWidth="1"
      />
      {/* Inner ring */}
      <path
        d="M24 6.5 Q38 6.5 38 15 L38 30 Q38 41.5 24 43.5 Q10 41.5 10 30 L10 15 Q10 6.5 24 6.5 Z"
        fill="none"
        stroke="rgba(148,163,184,0.06)"
        strokeWidth="0.5"
      />
      {/* Glass shine */}
      <path
        d="M24 6.5 Q38 6.5 38 15 L38 19 Q28 14 10 19 L10 15 Q10 6.5 24 6.5 Z"
        fill={`url(#${id}-shine)`}
      />

      {/* Left beam */}
      <path
        d="M13.5 14.5 L21 14.5 L25.5 33 L22 33 Z"
        fill={`url(#${id}-left)`}
        filter={`url(#${id}-glow)`}
      />
      {/* Right beam */}
      <path
        d="M34.5 14.5 L27 14.5 L22.5 33 L26 33 Z"
        fill={`url(#${id}-right)`}
        filter={`url(#${id}-glow)`}
      />

      {/* Tip glow */}
      <circle cx="24" cy="33.5" r="4.5" fill={`url(#${id}-tip)`} filter={`url(#${id}-glow)`} />

      {/* Pulsing tip dot — CSS animation via SVG animateTransform */}
      <circle cx="24" cy="33.5" r="1.4" fill="#34d399" opacity="0.95">
        <animate attributeName="opacity" values="0.95;0.4;0.95" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Scanning ring — expands outward from tip */}
      <circle cx="24" cy="33.5" r="2" fill="none" stroke="#34d399" strokeWidth="0.6" opacity="0">
        <animate attributeName="r"       values="2;7;2"             dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6"         dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Top accent nodes */}
      <circle cx="13.5" cy="14.5" r="1.5" fill="#60a5fa" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" begin="0s"    repeatCount="indefinite" />
      </circle>
      <circle cx="34.5" cy="14.5" r="1.5" fill="#818cf8" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" begin="1.5s"  repeatCount="indefinite" />
      </circle>

      {/* Connector dash between top nodes */}
      <line x1="15" y1="14.5" x2="33" y2="14.5" stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* Traveling pulse along left beam */}
      <circle cx="0" cy="0" r="1" fill="#60a5fa" opacity="0">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.2s"
          path="M13.5 14.5 L21 14.5 L25.5 33 L22 33" />
        <animate attributeName="opacity" values="0;0.9;0" dur="1.8s" repeatCount="indefinite" begin="0.2s" />
      </circle>

      {/* Traveling pulse along right beam */}
      <circle cx="0" cy="0" r="1" fill="#a5b4fc" opacity="0">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.1s"
          path="M34.5 14.5 L27 14.5 L22.5 33 L26 33" />
        <animate attributeName="opacity" values="0;0.9;0" dur="1.8s" repeatCount="indefinite" begin="1.1s" />
      </circle>

      {/* Side accent dots */}
      <circle cx="8.5"  cy="22" r="0.8" fill="#60a5fa" opacity="0.4" />
      <circle cx="39.5" cy="22" r="0.8" fill="#818cf8" opacity="0.4" />
    </Wrap>
  );
}

// ─── Full Logo (Icon + Wordmark) ─────────────────────────────────────────────
export function CyphroLogoFull({ height = 32, className = "" }) {
  const iconSize = Math.round(height * 1.15);

  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ userSelect: "none" }}>
      {/* Icon with entrance animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
        animate={{ opacity: 1, scale: 1,    rotate: 0  }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <CyphroLogo size={iconSize} />
      </motion.div>

      {/* Wordmark */}
      <div className="flex items-baseline gap-[3px] overflow-hidden">
        {/* "Cyphro" slides in from left */}
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: Math.round(height * 0.54),
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "#f8fafc",
            fontFamily: "'Inter','Manrope',sans-serif",
            lineHeight: 1,
          }}
        >
          Cyphro
        </motion.span>

        {/* "Vexto" slides in slightly later with gradient */}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: Math.round(height * 0.54),
            fontWeight: 600,
            letterSpacing: "-0.01em",
            background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Inter','Manrope',sans-serif",
            lineHeight: 1,
          }}
        >
          Vexto
        </motion.span>
      </div>
    </div>
  );
}
