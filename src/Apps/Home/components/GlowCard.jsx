import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const CARD_BASE = {
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(15,23,42,0.85)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
  willChange: "transform",
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export function GlowCard({ mod, i }) {
  const [hovered, setHovered] = useState(false);
  const Icon = mod.icon;

  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    <Link href={`/info/${mod.id}`}>
      <motion.div
        custom={i}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onHoverStart={onEnter}
        onHoverEnd={onLeave}
        whileHover={{ y: -5, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative p-8 rounded-[28px] cursor-pointer overflow-hidden"
        style={{
          ...CARD_BASE,
          borderColor: hovered ? `rgba(${mod.glow},0.32)` : "rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0 0 32px rgba(${mod.glow},0.12), 0 16px 32px rgba(0,0,0,0.35)`
            : "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
      {/* Top shimmer line — CSS only, no AnimatePresence */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${mod.glow},0.75), transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "opacity 0.3s, transform 0.35s ease",
        }}
      />

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: `rgba(${mod.glow},0.09)`, border: `1px solid rgba(${mod.glow},0.18)` }}
      >
        <Icon className="w-7 h-7" style={{ color: mod.color }} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{mod.label}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>

      <div
        className="flex items-center gap-2 mt-6 text-sm font-semibold"
        style={{
          color: mod.color,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.25s, transform 0.25s ease",
        }}
      >
        Learn more <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
    </Link>
  );
}
