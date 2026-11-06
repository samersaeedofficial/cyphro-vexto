import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Hash,
  Zap,
  Type,
  Database,
  Check,
  Upload,
  AlertTriangle,
  Sliders,
  Sparkles,
  Shield,
  Layers,
  Cpu,
} from "lucide-react";
import { WORDLIST_LIBRARY, RULESET_OPTIONS, KNOWN_RAINBOW_TABLES } from "./hashUtils";

export const AttackConfigPanel = ({
  activeAttackTab,
  setActiveAttackTab,
  dictConfig,
  setDictConfig,
  bfConfig,
  setBfConfig,
  hybridConfig,
  setHybridConfig,
  maskConfig,
  setMaskConfig,
  rainbowConfig,
  setRainbowConfig,
  advConfig,
  setAdvConfig,
  showAdvanced,
  setShowAdvanced,
}) => {
  const tabs = [
    { id: "dictionary", label: "Dictionary", icon: BookOpen },
    { id: "bruteforce", label: "Brute Force", icon: Hash },
    { id: "hybrid", label: "Hybrid Rules", icon: Zap },
    { id: "mask", label: "Mask Attack", icon: Type },
    { id: "rainbow", label: "Rainbow Tables", icon: Database },
  ];

  // Calculate combinations estimate for Brute Force
  const calculateCharsetSize = () => {
    let size = 0;
    if (bfConfig.lower) size += 26;
    if (bfConfig.upper) size += 26;
    if (bfConfig.digits) size += 10;
    if (bfConfig.special) size += 32;
    if (bfConfig.custom) size += bfConfig.custom.length;
    return Math.max(1, size);
  };

  const charsetSize = calculateCharsetSize();
  const combinations = Math.pow(charsetSize, bfConfig.maxLen);

  const formatKeyspace = (num) => {
    if (num >= 1e15) return `~${(num / 1e15).toFixed(1)} × 10¹⁵`;
    if (num >= 1e12) return `~${(num / 1e12).toFixed(1)} × 10¹²`;
    if (num >= 1e9) return `~${(num / 1e9).toFixed(1)} × 10⁹`;
    if (num >= 1e6) return `~${(num / 1e6).toFixed(1)} Million`;
    return `~${Math.round(num).toLocaleString()}`;
  };

  return (
    <div className="rounded-3xl bg-[#0c1017]/90 border border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-5 lg:p-6 backdrop-blur-xl relative overflow-hidden flex flex-col h-full">
      {/* Top red ambient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Attack Vector Configuration
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Choose cracking method & ruleset
            </p>
          </div>
        </div>

        {/* Attack Vector Tabs */}
        <div className="flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto max-w-full custom-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeAttackTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAttackTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "text-white bg-red-600/30 border border-red-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-red-400" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1">
        {/* 1. DICTIONARY ATTACK */}
        {activeAttackTab === "dictionary" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select High-Coverage Wordlist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WORDLIST_LIBRARY.map((w) => {
                  const selected = dictConfig.wordlist === w.id;
                  return (
                    <div
                      key={w.id}
                      onClick={() => setDictConfig({ ...dictConfig, wordlist: w.id })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selected
                          ? "bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          : "bg-[#070a0f] border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                          {selected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          )}
                          {w.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 shrink-0">
                          {w.popularity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                        {w.desc}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/60">
                        <span>{w.words}</span>
                        <span>{w.size}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mutation Ruleset Attachment */}
            <div className="p-4 rounded-2xl bg-[#070a0f] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Attached Hashcat Ruleset (Optional)
                </label>
                <span className="text-[10px] font-mono text-red-400">
                  Increases hit rate by 10x-50x
                </span>
              </div>
              <select
                value={dictConfig.ruleset || "best64.rule"}
                onChange={(e) =>
                  setDictConfig({ ...dictConfig, ruleset: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
              >
                {RULESET_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — ({r.mult})
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* 2. BRUTE FORCE ATTACK */}
        {activeAttackTab === "bruteforce" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Active Character Sets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "lower", label: "Lowercase (a-z)", sub: "26 chars" },
                  { id: "upper", label: "Uppercase (A-Z)", sub: "26 chars" },
                  { id: "digits", label: "Digits (0-9)", sub: "10 chars" },
                  { id: "special", label: "Special (!@#$)", sub: "32 chars" },
                ].map((item) => {
                  const checked = bfConfig[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setBfConfig({ ...bfConfig, [item.id]: !checked })
                      }
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? "bg-red-500/10 border-red-500/50 text-white shadow-sm"
                          : "bg-[#070a0f] border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{item.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            checked
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-slate-700 bg-slate-900"
                          }`}
                        >
                          {checked && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.sub}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Chars */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">
                Custom Characters (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. ? * + = - _ %"
                value={bfConfig.custom || ""}
                onChange={(e) =>
                  setBfConfig({ ...bfConfig, custom: e.target.value })
                }
                className="w-full bg-[#070a0f] border border-slate-800 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
              />
            </div>

            {/* Length Range */}
            <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-[#070a0f] border border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Min Length:</span>
                  <span className="text-red-400 font-bold">{bfConfig.minLen}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={bfConfig.minLen}
                  onChange={(e) =>
                    setBfConfig({
                      ...bfConfig,
                      minLen: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Max Length:</span>
                  <span className="text-red-400 font-bold">{bfConfig.maxLen}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={bfConfig.maxLen}
                  onChange={(e) =>
                    setBfConfig({
                      ...bfConfig,
                      maxLen: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Combinations Keyspace Card */}
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Total Keyspace Combinations:</span>
              <span className="text-red-300 font-black">
                {formatKeyspace(combinations)}
              </span>
            </div>
          </motion.div>
        )}

        {/* 3. HYBRID & MUTATION ATTACK */}
        {activeAttackTab === "hybrid" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Base Seed Wordlist
                </label>
                <select
                  value={hybridConfig.wordlist || "rockyou.txt"}
                  onChange={(e) =>
                    setHybridConfig({ ...hybridConfig, wordlist: e.target.value })
                  }
                  className="w-full bg-[#070a0f] border border-slate-800 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                >
                  <option value="rockyou.txt">rockyou.txt (14.3M words)</option>
                  <option value="seclists-top100k.txt">
                    SecLists Top 100K
                  </option>
                  <option value="darkweb-leaks-2024.txt">
                    DarkWeb Leaks 2024
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Rules Modifier
                </label>
                <select
                  value={hybridConfig.ruleset || "best64.rule"}
                  onChange={(e) =>
                    setHybridConfig({ ...hybridConfig, ruleset: e.target.value })
                  }
                  className="w-full bg-[#070a0f] border border-slate-800 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                >
                  <option value="best64.rule">best64.rule (Standard)</option>
                  <option value="d3ad0ne.rule">d3ad0ne.rule (Complex)</option>
                  <option value="leetspeak.rule">leetspeak.rule (Leet)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#070a0f] border border-slate-800">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
                Dynamic Rule Mutations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: "appendNum",
                    label: "Append Numbers (0-999)",
                    desc: "word → word123",
                  },
                  {
                    id: "prependWords",
                    label: "Prepend Common Words",
                    desc: "admin_word",
                  },
                  {
                    id: "leet",
                    label: "Leet Speak Substitution",
                    desc: "a→@, e→3, i→1",
                  },
                  {
                    id: "caseVar",
                    label: "Case Toggling (Title/Upper)",
                    desc: "Word, WORD, wOrD",
                  },
                ].map((mod) => (
                  <label
                    key={mod.id}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-red-500/30 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={hybridConfig[mod.id] || false}
                      onChange={() =>
                        setHybridConfig({
                          ...hybridConfig,
                          [mod.id]: !hybridConfig[mod.id],
                        })
                      }
                      className="mt-0.5 rounded border-slate-700 bg-slate-950 text-red-500 focus:ring-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {mod.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {mod.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. MASK ATTACK */}
        {activeAttackTab === "mask" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hashcat Mask Pattern
              </label>
              <input
                type="text"
                value={maskConfig.mask || "?u?l?l?l?d?d"}
                onChange={(e) => setMaskConfig({ mask: e.target.value })}
                className="w-full bg-[#070a0f] border border-red-500/40 rounded-xl px-4 py-3 text-base font-mono font-bold text-red-300 text-center tracking-widest outline-none focus:border-red-500"
              />
              <p className="text-center text-[11px] font-mono text-slate-500 mt-1">
                Translates to: 1 Uppercase, 3 Lowercase, 2 Digits (e.g. Pass12)
              </p>
            </div>

            {/* Clickable Token Chips */}
            <div>
              <span className="text-[10px] font-mono text-slate-400 mb-1.5 block">
                Click Token to Append:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {[
                  { code: "?l", label: "Lower (a-z)" },
                  { code: "?u", label: "Upper (A-Z)" },
                  { code: "?d", label: "Digit (0-9)" },
                  { code: "?s", label: "Symbol (!@#)" },
                  { code: "?a", label: "All Chars" },
                  { code: "?h", label: "Hex (0-f)" },
                ].map((t) => (
                  <button
                    key={t.code}
                    onClick={() =>
                      setMaskConfig({
                        mask: (maskConfig.mask || "") + t.code,
                      })
                    }
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-center transition-all group"
                  >
                    <span className="block text-xs font-mono font-bold text-red-400 group-hover:text-red-300">
                      {t.code}
                    </span>
                    <span className="block text-[9px] font-mono text-slate-500">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Common Mask Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-mono text-slate-400">
                Preset Masks:
              </span>
              {[
                { label: "PIN (6-Digit)", mask: "?d?d?d?d?d?d" },
                { label: "Word + Year", mask: "?u?l?l?l?l202?d" },
                { label: "Enterprise 8-Char", mask: "?u?l?l?l?l?d?d?s" },
              ].map((m) => (
                <button
                  key={m.label}
                  onClick={() => setMaskConfig({ mask: m.mask })}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5. RAINBOW TABLE ATTACK */}
        {activeAttackTab === "rainbow" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300">
                  Precomputed Hash Time-Memory Tradeoff
                </h4>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  Rainbow tables yield instant O(1) cracking time for unsalted
                  hashes by trading computational effort for precomputed disk space.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Select Precomputed Table Chain
              </label>
              <div className="space-y-2">
                {KNOWN_RAINBOW_TABLES.map((t) => {
                  const selected = rainbowConfig.table === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setRainbowConfig({ table: t.id })}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selected
                          ? "bg-red-500/10 border-red-500/50 shadow-sm"
                          : "bg-[#070a0f] border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {selected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          )}
                          {t.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          Keyspace: {t.keyspace} • Success: {t.successRate}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-red-400">
                          {t.size}
                        </span>
                        <div className="text-[9px] font-mono text-slate-500">
                          {t.chains} chains
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Advanced Performance & Hardware Accordion */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-red-400" />
            Hardware & Worker Tuning ({advConfig.threads} Threads • {advConfig.ram}MB RAM)
          </span>
          <span className="text-red-400 text-[10px] underline">
            {showAdvanced ? "Hide Tuning" : "Adjust Engine"}
          </span>
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="p-4 rounded-2xl bg-[#070a0f] border border-slate-800 space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Worker Threads:</span>
                      <span className="text-red-400 font-bold">
                        {advConfig.threads} Cores
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="64"
                      value={advConfig.threads}
                      onChange={(e) =>
                        setAdvConfig({
                          ...advConfig,
                          threads: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>RAM Buffer:</span>
                      <span className="text-red-400 font-bold">
                        {advConfig.ram} MB
                      </span>
                    </div>
                    <input
                      type="range"
                      min="512"
                      max="16384"
                      step="512"
                      value={advConfig.ram}
                      onChange={(e) =>
                        setAdvConfig({
                          ...advConfig,
                          ram: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advConfig.caseSensitive}
                      onChange={() =>
                        setAdvConfig({
                          ...advConfig,
                          caseSensitive: !advConfig.caseSensitive,
                        })
                      }
                      className="rounded border-slate-700 bg-slate-950 text-red-500 focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px]">
                      Case-Insensitive Matching
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Salt:</span>
                    <input
                      type="text"
                      placeholder="Auto (detect)"
                      value={advConfig.salt || ""}
                      onChange={(e) =>
                        setAdvConfig({ ...advConfig, salt: e.target.value })
                      }
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 outline-none w-32"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
