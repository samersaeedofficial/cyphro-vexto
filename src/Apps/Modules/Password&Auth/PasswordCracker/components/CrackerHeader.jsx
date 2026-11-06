import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Play,
  Square,
  Pause,
  RotateCcw,
  Sparkles,
  Cpu,
  Zap,
  ChevronDown,
  ShieldAlert,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { DEMO_PRESETS } from "./hashUtils";

export const CrackerHeader = ({
  status,
  onStartAttack,
  onStopAttack,
  onPauseAttack,
  onResumeAttack,
  onReset,
  onLoadPreset,
  hardwareProfile,
  setHardwareProfile,
  hashCount,
  crackedCount,
}) => {
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [showHwDropdown, setShowHwDropdown] = useState(false);

  const hwOptions = [
    {
      id: "gpu",
      name: "GPU Accelerated (NVIDIA RTX 4090)",
      speed: "Up to 45.2 GH/s",
      badge: "Fastest",
      icon: Zap,
    },
    {
      id: "cpu",
      name: "CPU Multi-Thread (32 Cores AVX-512)",
      speed: "Up to 4.8 MH/s",
      badge: "Standard",
      icon: Cpu,
    },
    {
      id: "cluster",
      name: "Distributed Cloud Cluster (4 Nodes)",
      speed: "Up to 160 GH/s",
      badge: "Enterprise",
      icon: Flame,
    },
  ];

  const currentHw = hwOptions.find((h) => h.id === hardwareProfile) || hwOptions[0];

  return (
    <div className="relative mb-8 pb-6 border-b border-red-500/15">
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 left-10 w-96 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-20 w-80 h-28 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-red-500/25 via-red-600/15 to-transparent border border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.25)] flex items-center justify-center relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Key className="w-8 h-8 text-red-500 relative z-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            {status === "running" && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </motion.div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-slate-100 to-red-300 bg-clip-text text-transparent tracking-tight">
                Password Cracker Pro
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
                v3.4 Core
              </span>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 font-mono mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Advanced Multi-Vector Hash Decryption & Penetration Testing Suite
            </p>
          </div>
        </div>

        {/* Right: Controls & Presets */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Hardware Engine Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowHwDropdown(!showHwDropdown);
                setShowPresetDropdown(false);
              }}
              disabled={status === "running"}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                status === "running"
                  ? "bg-slate-900/60 border-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/60 text-slate-300 hover:border-red-500/40"
              }`}
            >
              <currentHw.icon className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline text-slate-400">Engine:</span>
              <span className="font-mono text-white font-medium truncate max-w-[140px]">
                {currentHw.id.toUpperCase()}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </button>

            <AnimatePresence>
              {showHwDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0c1017] border border-red-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-2 z-50 backdrop-blur-xl"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 font-bold">
                    Compute Hardware
                  </div>
                  {hwOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setHardwareProfile(opt.id);
                        setShowHwDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                        hardwareProfile === opt.id
                          ? "bg-red-500/15 text-white border border-red-500/30"
                          : "hover:bg-slate-800/60 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <opt.icon
                          className={`w-4 h-4 ${
                            hardwareProfile === opt.id
                              ? "text-red-400"
                              : "text-slate-400 group-hover:text-red-400"
                          }`}
                        />
                        <div>
                          <div className="text-xs font-semibold">{opt.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {opt.speed}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {opt.badge}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Demo Preset Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPresetDropdown(!showPresetDropdown);
                setShowHwDropdown(false);
              }}
              disabled={status === "running"}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin-slow" />
              <span>Load Demo Hashes</span>
              <ChevronDown className="w-3 h-3 text-red-400" />
            </button>

            <AnimatePresence>
              {showPresetDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0c1017] border border-red-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-2 z-50 backdrop-blur-xl"
                >
                  <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 font-bold">
                    Instant Demo Test Suites
                  </div>
                  {DEMO_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onLoadPreset(p);
                        setShowPresetDropdown(false);
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-red-300">
                          {p.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                          {p.hashes.length} Hashes
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {p.description}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset Button */}
          {status !== "idle" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onReset}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white transition-all"
              title="Reset Session"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}

          {/* Main Action Attack Button */}
          {status === "idle" || status === "completed" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartAttack}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] border border-red-400/30 flex items-center gap-2.5 transition-all group"
            >
              <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
              <span>Start Attack</span>
            </motion.button>
          ) : status === "running" ? (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPauseAttack}
                className="px-4 py-2.5 rounded-xl font-bold text-sm bg-amber-600/80 hover:bg-amber-600 text-white border border-amber-500/40 shadow-lg shadow-amber-600/20 flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStopAttack}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center gap-2"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onResumeAttack}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </motion.button>
              <button
                onClick={onStopAttack}
                className="px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
