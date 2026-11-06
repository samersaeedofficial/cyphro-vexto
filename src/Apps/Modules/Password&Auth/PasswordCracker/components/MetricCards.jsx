import React from "react";
import { motion } from "framer-motion";
import {
  Hash,
  Zap,
  CheckCircle2,
  Clock,
  Activity,
  Layers,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { formatNumber, formatSpeed, formatTime } from "./hashUtils";

export const MetricCards = ({
  status,
  hashStats,
  progress,
  hardwareProfile,
}) => {
  const percent = progress.percent || 0;
  const isCracking = status === "running";

  const cards = [
    {
      id: "hashes",
      label: "TARGET HASHES",
      value: hashStats.count,
      sub:
        hashStats.count > 0
          ? Object.keys(hashStats.types).join(", ") || "Auto-Profiled"
          : "No hash loaded",
      icon: Hash,
      color: "text-red-400",
      accentBg: "bg-red-500/10",
      border: "border-red-500/20",
      glow: "hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    },
    {
      id: "speed",
      label: "COMPUTE HASHRATE",
      value: isCracking ? formatSpeed(progress.speed) : "0.00 H/s",
      sub: isCracking ? `${hardwareProfile.toUpperCase()} Acceleration` : "Engine Standby",
      icon: Zap,
      color: isCracking ? "text-amber-400" : "text-slate-400",
      accentBg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      pulse: isCracking,
    },
    {
      id: "cracked",
      label: "DECRYPTED / CRACKED",
      value: `${progress.cracked} / ${hashStats.count || 0}`,
      sub:
        hashStats.count > 0
          ? `${Math.round((progress.cracked / (hashStats.count || 1)) * 100)}% Success Rate`
          : "0% Cracking Rate",
      icon: CheckCircle2,
      color: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    },
    {
      id: "time",
      label: "ELAPSED / ETA",
      value: formatTime(progress.elapsed),
      sub: isCracking
        ? `ETA: ${formatTime(progress.remaining)}`
        : status === "completed"
          ? "Attack Finished"
          : "Ready for tasking",
      icon: Clock,
      color: "text-rose-400",
      accentBg: "bg-rose-500/10",
      border: "border-rose-500/20",
      glow: "hover:border-rose-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className={`p-5 rounded-2xl bg-[#0d121c]/80 backdrop-blur-md border ${card.border} ${card.glow} transition-all relative overflow-hidden group`}
          >
            {/* Top red sheen line on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                {card.label}
              </span>
              <div
                className={`p-2 rounded-xl ${card.accentBg} ${card.color} border border-white/5 relative`}
              >
                <Icon className="w-4 h-4" />
                {card.pulse && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-black text-white font-mono tracking-tight">
                {card.value}
              </h3>
            </div>

            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 truncate">
              {card.id === "cracked" && progress.cracked > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              )}
              {card.sub}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
