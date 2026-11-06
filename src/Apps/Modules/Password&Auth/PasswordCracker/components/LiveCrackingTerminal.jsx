import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  Zap,
  CheckCircle2,
  Clock,
  Flame,
  Pause,
  Play,
  Square,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import { formatNumber, formatSpeed, formatTime } from "./hashUtils";

export const LiveCrackingTerminal = ({
  status,
  progress,
  liveFeed,
  activeAttackTab,
  hardwareProfile,
  onPauseAttack,
  onResumeAttack,
  onStopAttack,
}) => {
  const [copiedId, setCopiedId] = useState(null);
  const [simulatedGuess, setSimulatedGuess] = useState("");

  // Matrix stream candidate flickering simulation
  useEffect(() => {
    if (status !== "running") return;
    const sampleWords = [
      "shadow99", "admin2024", "masterpass!", "dragon88", "hunter2",
      "letmein01", "qwerty789", "supersecret", "summer2025", "pass1234",
      "p@ssw0rd", "admin_root", "crypto2026", "firewall#1", "alpha99beta"
    ];

    const interval = setInterval(() => {
      const w = sampleWords[Math.floor(Math.random() * sampleWords.length)];
      const prefix = ["$HEX[", "$RULE[leet]:", "$WORD[", "$MASK[?u?d]:"][
        Math.floor(Math.random() * 4)
      ];
      setSimulatedGuess(`${prefix}${w}]`);
    }, 180);

    return () => clearInterval(interval);
  }, [status]);

  const handleCopy = (pwd, id) => {
    navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="mb-8 rounded-3xl bg-[#090d14] border border-red-500/30 shadow-[0_0_35px_rgba(239,68,68,0.15)] overflow-hidden relative backdrop-blur-xl">
      {/* Top Animated Progress Sweep Line */}
      <div className="w-full h-1.5 bg-slate-900 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
          style={{ width: `${progress.percent || 0}%` }}
          transition={{ ease: "linear", duration: 0.3 }}
        />
        {status === "running" && (
          <div className="absolute inset-0 bg-red-400/30 blur-[2px] animate-pulse" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
        {/* Left Column: Real-Time Telemetry & Speed Dial */}
        <div className="lg:col-span-4 p-5 lg:p-6 flex flex-col justify-between font-mono space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {status === "running"
                    ? "ENGINE ACTIVE: DECRYPTING"
                    : status === "paused"
                      ? "ENGINE PAUSED"
                      : "ATTACK COMPLETE"}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                {hardwareProfile.toUpperCase()}
              </span>
            </div>

            {/* Live Progress Bar and Percent */}
            <div className="mt-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-slate-400">Total Keyspace:</span>
                <span className="text-lg font-black text-white">
                  {(progress.percent || 0).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                  style={{ width: `${progress.percent || 0}%` }}
                />
              </div>
            </div>

            {/* Telemetry Metrics */}
            <div className="mt-5 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Current Hashrate:
                </span>
                <span className="text-amber-400 font-bold">
                  {formatSpeed(progress.speed)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-400" /> Candidates Tested:
                </span>
                <span className="text-white font-medium">
                  {formatNumber(progress.tested)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Elapsed / ETA:
                </span>
                <span className="text-slate-300">
                  {formatTime(progress.elapsed)} / {formatTime(progress.remaining)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Successfully Cracked:
                </span>
                <span className="text-emerald-400 font-black">
                  {progress.cracked} Hashes
                </span>
              </div>
            </div>
          </div>

          {/* Real-time candidate ticker */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 text-[10px] block uppercase mb-1">
              Active Candidate Stream:
            </span>
            <span className="text-red-400 font-bold truncate block">
              {status === "running" ? simulatedGuess : "Pipeline idle"}
            </span>
          </div>

          {/* Quick inline controls */}
          <div className="flex gap-2 pt-2">
            {status === "running" ? (
              <button
                onClick={onPauseAttack}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" /> Pause
              </button>
            ) : status === "paused" ? (
              <button
                onClick={onResumeAttack}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Resume
              </button>
            ) : null}
            <button
              onClick={onStopAttack}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Square className="w-3.5 h-3.5" /> Abort
            </button>
          </div>
        </div>

        {/* Right Column: Live Decryption Stream Table */}
        <div className="lg:col-span-8 p-5 lg:p-6 flex flex-col justify-between h-[360px] bg-[#070a10]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-400" />
              Live Hash Decryption Pipeline
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {liveFeed.length} Cracked Matches
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 my-3 pr-1 custom-scrollbar">
            <AnimatePresence>
              {liveFeed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono transition-all shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                    <span className="text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">
                      {item.hash}
                    </span>
                    <span className="text-emerald-400 font-bold shrink-0">
                      → "{item.password}"
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-slate-500 text-[11px]">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.type}
                    </span>
                    <span>{item.time}</span>
                    <button
                      onClick={() => handleCopy(item.password, item.id)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title="Copy plaintext"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}

              {status === "running" && liveFeed.length === 0 && (
                <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 font-mono text-xs space-y-2">
                  <div className="w-8 h-8 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
                  <p className="text-slate-400">
                    Executing {activeAttackTab} vectors against hashes...
                  </p>
                  <p className="text-[10px] text-slate-600">
                    Candidate mutations in flight. Matches will appear instantaneously.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Security Mode: Local Air-Gapped Simulation</span>
            <span className="text-red-400">Cyphro Decryption Core</span>
          </div>
        </div>
      </div>
    </div>
  );
};
