import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export function GlowCard({ mod, i }) {
  const { isDark } = useTheme();
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
        className="relative p-8 rounded-[28px] cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          background: isDark ? "rgba(15,23,42,0.85)" : "rgba(255, 255, 255, 0.9)",
          border: hovered
            ? `1px solid rgba(${mod.glow},${isDark ? 0.32 : 0.45})`
            : isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(226,232,240,0.9)",
          boxShadow: hovered
            ? isDark
              ? `0 0 32px rgba(${mod.glow},0.12), 0 16px 32px rgba(0,0,0,0.35)`
              : `0 16px 35px -8px rgba(${mod.glow},0.18), 0 4px 15px rgba(0,0,0,0.05)`
            : isDark
              ? "0 4px 24px rgba(0,0,0,0.3)"
              : "0 8px 25px -4px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.02)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Top shimmer line — CSS only */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${mod.glow},0.75), transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "opacity 0.3s, transform 0.35s ease",
          }}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `rgba(${mod.glow},${isDark ? "0.09" : "0.12"})`,
            border: `1px solid rgba(${mod.glow},${isDark ? "0.18" : "0.28"})`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color: mod.color }} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{mod.label}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{mod.desc}</p>

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
