import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  BarChart3,
  History,
  Terminal,
  Download,
  Copy,
  Check,
  Search,
  Eye,
  EyeOff,
  Filter,
  Trash2,
  RotateCcw,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  Sparkles,
} from "lucide-react";
import { evaluatePasswordStrength } from "./hashUtils";

export const ResultsPanel = ({
  activeResultTab,
  setActiveResultTab,
  liveFeed,
  auditLog,
  sessionHistory,
  onClearLog,
  onRerunHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const toggleReveal = (id) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text, key, msg = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(msg);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  // Export functions
  const handleExportTxt = () => {
    if (liveFeed.length === 0) return;
    const content = liveFeed.map((r) => `${r.rawHash || r.hash}:${r.password}`).join("\n");
    downloadFile(content, "cracked_potfile.txt", "text/plain");
    showToast("Potfile downloaded!");
  };

  const handleExportCsv = () => {
    if (liveFeed.length === 0) return;
    const rows = [
      ["Index", "Hash", "Algorithm", "Plaintext", "Duration", "Method"],
      ...liveFeed.map((r, i) => [
        i + 1,
        r.rawHash || r.hash,
        r.type,
        r.password,
        r.time,
        r.method,
      ]),
    ];
    const csvContent = rows.map((e) => e.join(",")).join("\n");
    downloadFile(csvContent, "cracked_passwords.csv", "text/csv");
    showToast("CSV report exported!");
  };

  const handleExportJson = () => {
    if (liveFeed.length === 0) return;
    const content = JSON.stringify(liveFeed, null, 2);
    downloadFile(content, "cracked_audit_report.json", "application/json");
    showToast("JSON report exported!");
  };

  const downloadFile = (data, filename, type) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filtered feed
  const filteredFeed = liveFeed.filter((item) => {
    const matchesSearch =
      item.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.password.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const availableTypes = ["all", ...new Set(liveFeed.map((i) => i.type))];

  return (
    <div className="rounded-3xl bg-[#0c1017]/90 border border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-5 lg:p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-5 right-5 z-50 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-white" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto max-w-full custom-scrollbar">
          {[
            { id: "results", label: "Cracked Passwords", icon: CheckCircle2, badge: liveFeed.length },
            { id: "analytics", label: "Pattern Analytics", icon: BarChart3 },
            { id: "history", label: "Session History", icon: History },
            { id: "log", label: "Security Audit Log", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeResultTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveResultTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "text-white bg-red-600/30 border border-red-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-red-400" : ""}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500 text-white font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Export Bar for Results */}
        {activeResultTab === "results" && liveFeed.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportTxt}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Download Potfile (.txt)"
            >
              <Download className="w-3.5 h-3.5 text-red-400" />
              <span>POT</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Export JSON"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>JSON</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: Cracked Passwords Table */}
      {activeResultTab === "results" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search hash or plaintext..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070a0f] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white outline-none focus:border-red-500/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <div className="flex gap-1 overflow-x-auto">
                {availableTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all ${
                      filterType === t
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-800/80 rounded-2xl bg-[#070a0f]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Target Hash</th>
                  <th className="p-3.5">Format</th>
                  <th className="p-3.5">Plaintext Password</th>
                  <th className="p-3.5">Entropy</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredFeed.length > 0 ? (
                  filteredFeed.map((item, idx) => {
                    const isRevealed = revealedPasswords[item.id] ?? true;
                    const strength = evaluatePasswordStrength(item.password);

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-900/50 transition-colors group"
                      >
                        <td className="p-3.5 text-slate-500">{idx + 1}</td>
                        <td className="p-3.5 font-bold text-slate-300">
                          <span className="text-slate-400" title={item.rawHash || item.hash}>
                            {item.hash}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-300 border border-red-500/30">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold text-sm">
                              {isRevealed ? item.password : "••••••••"}
                            </span>
                            <button
                              onClick={() => toggleReveal(item.id)}
                              className="text-slate-500 hover:text-slate-300 transition-colors"
                              title={isRevealed ? "Hide Password" : "Show Password"}
                            >
                              {isRevealed ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${strength.bg} ${strength.color}`}
                          >
                            {strength.label}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400">{item.time}</td>
                        <td className="p-3.5 text-slate-400 capitalize">{item.method}</td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() =>
                                handleCopy(
                                  item.password,
                                  `pwd-${item.id}`,
                                  `Password "${item.password}" copied!`
                                )
                              }
                              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                              title="Copy password"
                            >
                              {copiedKey === `pwd-${item.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleCopy(
                                  `${item.rawHash || item.hash}:${item.password}`,
                                  `combo-${item.id}`,
                                  "Hash:Password pair copied!"
                                )
                              }
                              className="px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] transition-all"
                              title="Copy hash:plaintext"
                            >
                              Combo
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Terminal className="w-8 h-8 text-slate-600 mb-1" />
                        <p className="text-slate-400 font-semibold">
                          No cracked hashes in current buffer
                        </p>
                        <p className="text-xs text-slate-600 max-w-sm">
                          Load demo hashes or paste your target hashes, then click "Start Attack" to begin decryption.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* TAB 2: Pattern Analytics */}
      {activeResultTab === "analytics" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#070a0f] border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Decryption Efficiency
              </h4>
              <div className="text-3xl font-black text-white font-mono">
                {liveFeed.length > 0 ? "100%" : "0%"}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Cracked matches within allocated search depth
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070a0f] border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Average Password Length
              </h4>
              <div className="text-3xl font-black text-red-400 font-mono">
                {liveFeed.length > 0
                  ? (
                      liveFeed.reduce((acc, c) => acc + c.password.length, 0) /
                      liveFeed.length
                    ).toFixed(1)
                  : "0"}
                <span className="text-sm font-normal text-slate-400 ml-1">chars</span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Common length spectrum across compromised targets
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#070a0f] border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Fastest Recovered
              </h4>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {liveFeed.length > 0 ? liveFeed[0].time : "0.0s"}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Rapid dictionary lookup latency
              </p>
            </div>
          </div>

          {/* Password Composition breakdown */}
          <div className="p-5 rounded-2xl bg-[#070a0f] border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              Compromised Password Vulnerability Patterns
            </h4>

            <div className="space-y-3">
              {[
                { label: "Dictionary Base Words (e.g. 'password', 'admin')", percent: 85, color: "bg-rose-500" },
                { label: "Appended Sequential Digits (e.g. '123', '2024')", percent: 70, color: "bg-red-500" },
                { label: "Common Leet Speak Substitutions (@ for a, 1 for i)", percent: 45, color: "bg-amber-500" },
                { label: "Shorter than 8 characters (Critical Vulnerability)", percent: 60, color: "bg-purple-500" },
              ].map((pattern) => (
                <div key={pattern.label}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">{pattern.label}</span>
                    <span className="text-slate-400 font-bold">{pattern.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pattern.color}`}
                      style={{ width: `${pattern.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: Session History */}
      {activeResultTab === "history" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {sessionHistory.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#070a0f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="font-bold text-white text-sm">{s.method}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-300 border border-red-500/20">
                    {s.algorithm}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  {s.date} • Duration: {s.duration} • Engine: {s.hardware}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-sm">
                    {s.cracked} / {s.total}
                  </span>
                  <div className="text-[10px] text-slate-500">Cracked ({s.successRate})</div>
                </div>

                <button
                  onClick={() => {
                    onRerunHistory(s);
                    showToast("Session config restored!");
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-800 hover:border-red-500/30 transition-all"
                  title="Restore and re-run attack"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* TAB 4: Security Audit Log */}
      {activeResultTab === "log" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="flex justify-between items-center pb-2">
            <span className="text-xs font-mono text-slate-400">
              System Execution Event Log ({auditLog.length} Events)
            </span>
            <button
              onClick={onClearLog}
              className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Audit Log
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#070a0f] border border-slate-800 h-72 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 custom-scrollbar">
            {auditLog.map((log, idx) => {
              const isCrack = log.includes("Cracked:") || log.includes("Success");
              const isAlert = log.includes("stopped") || log.includes("failed") || log.includes("Error");
              const isStart = log.includes("Starting") || log.includes("initialized");

              return (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    isCrack
                      ? "text-emerald-400 font-bold"
                      : isAlert
                        ? "text-rose-400 font-bold"
                        : isStart
                          ? "text-amber-400"
                          : "text-slate-400"
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
