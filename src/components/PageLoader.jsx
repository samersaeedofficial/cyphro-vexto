import { motion, AnimatePresence } from "framer-motion";

// 1. Defined CSS for the text shimmer effect and background flash
const loaderStyles = `
  @keyframes text-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .animate-text-shimmer {
    background-size: 200% auto;
    animation: text-shimmer 2.5s linear infinite;
  }
`;

// ─── Animated Logo — Deep Modern Glow & Electrical Flash ──────────────────────
function LoaderLogo() {
  const glowId = "loader-glow-filter";

  // Framer Motion variants for rhythmic flashing of internal elements
  const beamVariants = {
    flash: {
      fillOpacity: [0.2, 1, 0.2, 1, 0.2], // Rapid flashing
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 1.5, // Time between surge sequences
        ease: "easeInOut",
      },
    },
  };

  const dotVariants = {
    flash: {
      opacity: [0.15, 1, 0.15],
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 1.7,
        ease: "circOut",
      },
    },
  };

  return (
    // We apply the main breathing glow to the wrapper div using Framer Motion
    <motion.div
      animate={{
        // Combines multiple drop-shadows for a deep, modern, intense neon glow
        filter: [
          "drop-shadow(0 0 15px rgba(59,130,246,0.5)) drop-shadow(0 0 30px rgba(99,102,241,0.3))",
          "drop-shadow(0 0 25px rgba(59,130,246,0.8)) drop-shadow(0 0 50px rgba(99,102,241,0.6))",
          "drop-shadow(0 0 15px rgba(59,130,246,0.5)) drop-shadow(0 0 30px rgba(99,102,241,0.3))",
        ],
      }}
      transition={{
        duration: 2, // Breathing speed
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Static fills - darker, metallic base */}
          <linearGradient id="ll-bg" x1="24" y1="2" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Electric Neon Border */}
          <linearGradient id="ll-border" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
            <stop offset="50%" stopColor="#818cf8" /> {/* Indigo */}
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          {/* Core Beam Gradient - Electric Silver/Blue */}
          <linearGradient id="ll-beam-core" x1="24" y1="14" x2="24" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.8" />
          </linearGradient>

          {/* SVG Glow filter for internal elements */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield body */}
        <path
          d="M24 3 Q41 3 41 14 L41 30 Q41 44 24 46 Q7 44 7 30 L7 14 Q7 3 24 3 Z"
          fill="url(#ll-bg)"
          stroke="url(#ll-border)"
          strokeWidth="1.5"
          style={{ filter: `url(#${glowId})` }} // Sharp inner glow
        />

        {/* ── INTERNAL STRUCTURE — The "Kali" Flashing/Power Surge ── */}
        <g style={{ filter: `url(#${glowId})` }}>
          {/* Left beam */}
          <motion.path
            d="M13.5 14.5 L21 14.5 L25.5 33 L22 33 Z"
            fill="url(#ll-beam-core)"
            variants={beamVariants}
            animate="flash"
            custom={0} // No delay
          />

          {/* Right beam */}
          <motion.path
            d="M34.5 14.5 L27 14.5 L22.5 33 L26 33 Z"
            fill="url(#ll-beam-core)"
            variants={beamVariants}
            animate="flash"
            custom={1} // Slight delay in flash sequence
            transition={{ ...beamVariants.flash.transition, delay: 0.1 }}
          />

          {/* Top connecting nodes */}
          <motion.circle cx="13.5" cy="14.5" r="1.8" fill="#f8fafc" variants={dotVariants} animate="flash" />
          <motion.circle cx="34.5" cy="14.5" r="1.8" fill="#f8fafc" variants={dotVariants} animate="flash" transition={{ ...dotVariants.flash.transition, delay: 0.1 }} />

          {/* Center tip node - the heart */}
          <motion.circle
            cx="24"
            cy="33.5"
            r="2.5"
            fill="#22d3ee"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
              filter: ["blur(1px)", "blur(3px)", "blur(1px)"]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <circle cx="24" cy="33.5" r="1" fill="white" />
        </g>

        {/* Subtle geometric grid overlay inside shield */}
        <path d="M10 18 H38 M12 26 H36 M24 6 V43" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />

      </svg>
    </motion.div>
  );
}

// ─── Wordmark with Modern Shimmer Gradient ──────────────────────────────────
function LoaderWordmark() {
  const textGlow = "0 0 20px rgba(99,102,241,0.4)";

  return (
    <>
      {/* Injecting CSS styles */}
      <style>{loaderStyles}</style>

      <div
        className="flex items-baseline gap-[4px] mt-8"
        style={{ userSelect: "none" }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f8fafc",
            fontFamily: "'Inter','Manrope',sans-serif",
            lineHeight: 1,
            textShadow: textGlow,
          }}
        >
          Cyphro
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          // Apply background gradient and shimmer animation class
          className="animate-text-shimmer"
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: "'Inter','Manrope',sans-serif",
            lineHeight: 1,
            // Electric gradient
            background: "linear-gradient(135deg, #22d3ee 0%, #ffffff 25%, #818cf8 50%, #ffffff 75%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto", // Needed for shimmer
          }}
        >
          Vexto
        </motion.span>
      </div>
    </>
  );
}

// ─── Main Loader overlay with Power Flashes ──────────────────────────────────
export function PageLoader({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#020617", // Deeper dark
            overflow: "hidden",
          }}
        >
          {/* 1. Background Power Surge Flash (Kali Boot style) */}
          <motion.div
            animate={{
              opacity: [0, 0.1, 0, 0.05, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 4, // Occurs every 4 seconds
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, #ffffff 0%, #3b82f6 30%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* 2. Ambient background glow orbs (Higher contrast) */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 600,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 75%)",
                filter: "blur(80px)",
              }}
            />
          </div>

          {/* 3. Tech Dot grid (Subtler) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              opacity: 0.05,
              backgroundImage: "radial-gradient(#60a5fa 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />

          {/* 4. Content */}
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Logo with entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoaderLogo />
            </motion.div>

            {/* Wordmark */}
            <LoaderWordmark />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{
                marginTop: 16,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(148,163,184,0.7)",
                fontFamily: "'Inter',sans-serif",
                textShadow: "0 0 10px rgba(148,163,184,0.3)",
              }}
            >
              Security Intelligence Suite
            </motion.p>

            {/* ── Modern Progress Bar with intense glow ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                marginTop: 64,
                width: 220,
                height: 3, // Slightly thicker
                borderRadius: 99,
                background: "rgba(255,255,255,0.03)",
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                // Using the shimmer CSS here too
                className="animate-text-shimmer"
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background: "linear-gradient(90deg, #22d3ee, #ffffff, #818cf8, #ffffff, #22d3ee)",
                  backgroundSize: "200% auto",
                  // Intense box shadow for the neon line look
                  boxShadow: "0 0 15px #3b82f6, 0 0 5px #ffffff",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}