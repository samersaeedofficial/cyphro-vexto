import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Key,
  Hash,
  Shield,
  Trash2,
  Copy,
  Check,
  Search,
  Sparkles,
  AlertCircle,
  FileDigit,
} from "lucide-react";
import { detectHash, DEMO_PRESETS } from "./hashUtils";

export const HashInputPanel = ({
  inputType,
  setInputType,
  hashes,
  setHashes,
  hashStats,
  file,
  handleFileUpload,
  onClear,
  onLoadPreset,
}) => {
  const [copied, setCopied] = useState(false);
  const [inspectorHash, setInspectorHash] = useState("");

  const handleCopy = () => {
    if (!hashes) return;
    navigator.clipboard.writeText(hashes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inspectedInfo = inspectorHash.trim() ? detectHash(inspectorHash.trim()) : null;

  return (
    <div className="rounded-3xl bg-[#0c1017]/90 border border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-5 lg:p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Top red ambient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Hash Ingestion & Intelligence
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Auto-detects MD5, SHA, NTLM, Bcrypt, Argon2
            </p>
          </div>
        </div>

        {/* Input Switcher Tabs */}
        <div className="flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          {[
            { id: "direct", label: "Direct Input" },
            { id: "file", label: "File Upload" },
            { id: "inspect", label: "Inspector" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInputType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                inputType === tab.id
                  ? "text-white bg-red-600/30 border border-red-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Direct Input */}
      {inputType === "direct" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Quick preset buttons for instant ease-of-use */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              Quick Samples:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onLoadPreset(DEMO_PRESETS[0])}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition-all flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-red-400" /> Demo 5 Hashes
              </button>
              <button
                onClick={() => onLoadPreset(DEMO_PRESETS[1])}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              >
                NTLM Corporate
              </button>
              <button
                onClick={() => onLoadPreset(DEMO_PRESETS[2])}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              >
                SHA-256 Web
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={hashes}
              onChange={(e) => setHashes(e.target.value)}
              placeholder="Paste hashes here (one per line)...&#10;Examples:&#10;5f4dcc3b5aa765d61d8327deb882cf99&#10;2aae6c35c94fcfb415dbe95f408b9ce91ee846ed&#10;8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
              rows={8}
              className="w-full bg-[#070a0f] border border-slate-800 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40 rounded-2xl p-4 text-xs font-mono text-slate-200 outline-none resize-none transition-all placeholder:text-slate-600 custom-scrollbar shadow-inner"
            />

            {/* Quick Actions overlay on top-right of textarea */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {hashes && (
                <>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
                    title="Copy hashes"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={onClear}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all"
                    title="Clear hashes"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Auto-strips spaces & duplicates
            </span>
            <span className="text-white font-bold bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
              {hashStats.count} Hash(es) Loaded
            </span>
          </div>
        </motion.div>
      )}

      {/* TAB 2: File Upload */}
      {inputType === "file" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="border-2 border-dashed border-red-500/30 hover:border-red-500/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#070a0f]/60 hover:bg-[#070a0f] transition-all group">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Drag & Drop Hash Dump File
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Supports .txt, .hash, .potfile, .csv (Max 20MB)
            </p>

            <label className="px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 cursor-pointer transition-all shadow-md active:scale-95">
              Browse Local Files
              <input
                type="file"
                className="hidden"
                accept=".txt,.hash,.pot,.csv,.json"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {file && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-xs font-mono text-red-300">
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="w-4 h-4 shrink-0 text-red-400" />
                <span className="truncate font-semibold">{file.name}</span>
              </div>
              <span className="text-slate-400 shrink-0">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* TAB 3: Hash Inspector */}
      {inputType === "inspect" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">
              Inspect Single Hash Profile
            </label>
            <div className="relative">
              <input
                type="text"
                value={inspectorHash}
                onChange={(e) => setInspectorHash(e.target.value)}
                placeholder="Paste any single hash (e.g. $2a$12$... or 5f4dcc...)"
                className="w-full bg-[#070a0f] border border-slate-800 focus:border-red-500/50 rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
            </div>
          </div>

          {inspectedInfo ? (
            <div className="p-4 rounded-xl bg-[#070a0f] border border-red-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Identified Algorithm:</span>
                <span className={`font-bold ${inspectedInfo.color}`}>
                  {inspectedInfo.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Full Name:</span>
                <span className="text-slate-200">{inspectedInfo.algorithm}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Hashcat Mode:</span>
                <span className="text-amber-400 font-bold">
                  -m {inspectedInfo.hashcatMode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cracking Feasibility:</span>
                <span className="text-emerald-400">
                  {inspectedInfo.speedRating}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                {inspectedInfo.desc}
              </p>
            </div>
          ) : (
            <div className="p-6 text-center text-xs font-mono text-slate-500 bg-[#070a0f] rounded-xl border border-slate-800">
              Enter a hash above to see its cryptographic signature, Hashcat mode, and cracking difficulty.
            </div>
          )}
        </motion.div>
      )}

      {/* Auto-Detection Format Cards */}
      {hashStats.count > 0 && inputType !== "inspect" && (
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Format Signatures Identified
            </span>
            <span className="text-[10px] font-mono text-red-400">
              {Object.keys(hashStats.types).length} Types Detected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(hashStats.types).map(([type, count]) => {
              const info =
                type === "Unknown"
                  ? {
                      color: "text-slate-400",
                      bg: "bg-slate-500/10",
                      border: "border-slate-500/20",
                      speedRating: "Unknown",
                      hashcatMode: "?",
                    }
                  : detectHash(
                      hashes
                        .split("\n")
                        .find((h) => detectHash(h)?.type === type) || "",
                    ) || {
                      color: "text-red-400",
                      bg: "bg-red-500/10",
                      border: "border-red-500/20",
                      speedRating: "Fast",
                      hashcatMode: "0",
                    };

              return (
                <div
                  key={type}
                  className={`p-3 rounded-xl border ${info.border} ${info.bg} flex items-center justify-between transition-all`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black ${info.color}`}>
                        {type}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900/60 text-slate-400 border border-slate-800">
                        -m {info.hashcatMode}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {info.speedRating}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
