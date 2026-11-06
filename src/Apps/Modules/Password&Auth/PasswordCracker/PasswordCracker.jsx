import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Book,
  Check,
  CheckCircle,
  ChevronDown,
  Clipboard,
  Copy,
  Database,
  Download,
  FileCode,
  FileDigit,
  FileSpreadsheet,
  FileText,
  Hash,
  History,
  Key,
  Layers,
  Lock,
  Play,
  RotateCcw,
  Settings,
  Shield,
  Sparkles,
  Square,
  Terminal,
  Trash2,
  Type,
  Upload,
  Zap,
} from "lucide-react";

// --- Comprehensive Hash Detection & Intelligence Helper ---
const detectHash = (hashStr) => {
  const h = (hashStr || "").trim();
  if (!h) return null;

  // Bcrypt ($2a$, $2b$, $2y$)
  if (h.startsWith("$2a$") || h.startsWith("$2b$") || h.startsWith("$2y$")) {
    return {
      type: "Bcrypt",
      name: "Bcrypt (Blowfish)",
      mode: "-m 3200",
      bitLength: "184-bit Salted",
      feasibility: "Slow / Heavy Resistance",
      feasibilityLevel: "hard",
      color: "text-rose-400",
      accentBg: "bg-rose-500/10",
      border: "border-rose-500/30",
      pill: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      note: "Adaptive cost salted hashing function resistant to GPU brute-force.",
    };
  }

  // Argon2 ($argon2i$, $argon2id$)
  if (h.startsWith("$argon2id$") || h.startsWith("$argon2i$")) {
    return {
      type: "Argon2",
      name: "Argon2id/i",
      mode: "-m 7300",
      bitLength: "Tunable Memory",
      feasibility: "Memory-Hard / Extreme",
      feasibilityLevel: "hard",
      color: "text-purple-400",
      accentBg: "bg-purple-500/10",
      border: "border-purple-500/30",
      pill: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      note: "PHC winner with memory hardness and side-channel resistance.",
    };
  }

  // Unix SHA-512 / SHA-256 crypt ($6$, $5$)
  if (h.startsWith("$6$")) {
    return {
      type: "SHA512-Crypt",
      name: "Unix sha512crypt",
      mode: "-m 1800",
      bitLength: "512-bit Salted",
      feasibility: "Moderate / Linux Shadow",
      feasibilityLevel: "medium",
      color: "text-cyan-400",
      accentBg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      note: "Standard Linux /etc/shadow salted SHA-512 crypt implementation.",
    };
  }

  // MD5 (32 hex characters)
  if (h.length === 32 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "MD5",
      name: "Message Digest 5",
      mode: "-m 0",
      bitLength: "128-bit Hex",
      feasibility: "Ultra-Fast (Gigahash/sec)",
      feasibilityLevel: "easy",
      color: "text-red-400",
      accentBg: "bg-red-500/10",
      border: "border-red-500/30",
      pill: "bg-red-500/20 text-red-300 border-red-500/30",
      note: "Legacy 128-bit hash. Highly vulnerable to dictionary attacks and rainbow tables.",
    };
  }

  // SHA-1 (40 hex characters)
  if (h.length === 40 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA1",
      name: "Secure Hash 1",
      mode: "-m 100",
      bitLength: "160-bit Hex",
      feasibility: "Fast (Hundreds MH/sec)",
      feasibilityLevel: "easy",
      color: "text-amber-400",
      accentBg: "bg-amber-500/10",
      border: "border-amber-500/30",
      pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      note: "Deprecated 160-bit digest with known theoretical and practical collision vectors.",
    };
  }

  // SHA-256 (64 hex characters)
  if (h.length === 64 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA256",
      name: "Secure Hash 256",
      mode: "-m 1400",
      bitLength: "256-bit Hex",
      feasibility: "Moderate Speed",
      feasibilityLevel: "medium",
      color: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      note: "Current industry standard for web applications, databases, and blockchain.",
    };
  }

  // SHA-512 (128 hex characters)
  if (h.length === 128 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA512",
      name: "Secure Hash 512",
      mode: "-m 1700",
      bitLength: "512-bit Hex",
      feasibility: "Heavy / Resource Intensive",
      feasibilityLevel: "hard",
      color: "text-indigo-400",
      accentBg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      pill: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      note: "Large 512-bit digest offering immense resistance against brute-force keyspaces.",
    };
  }

  return {
    type: "Custom",
    name: "Generic Hex / Custom Format",
    mode: "-m 9999",
    bitLength: `${h.length * 4}-bit Estimated`,
    feasibility: "Unprofiled",
    feasibilityLevel: "neutral",
    color: "text-slate-400",
    accentBg: "bg-slate-800/40",
    border: "border-slate-800",
    pill: "bg-slate-800 text-slate-300 border-slate-700",
    note: "Custom hash format. Verify character length or inspect salt parameters.",
  };
};

const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);

const formatSpeed = (speed) => {
  if (speed >= 1_000_000_000) return `${(speed / 1_000_000_000).toFixed(2)} GH/s`;
  if (speed >= 1_000_000) return `${(speed / 1_000_000).toFixed(2)} MH/s`;
  if (speed >= 1_000) return `${(speed / 1_000).toFixed(1)} KH/s`;
  return `${speed} H/s`;
};

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

// Ready-to-test Demo Hashes
const SAMPLE_HASHES = [
  "5f4dcc3b5aa765d61d8327deb882cf99", // password (MD5)
  "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed", // admin123 (SHA1)
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // admin (SHA256)
  "5d41402abc4b2a76b9719d911017c592", // hello (MD5)
  "329153f560eb3295f3eb24cc8f107ee1", // qwerty123 (NTLM/MD5)
];

const KNOWN_PASSWORDS = {
  "5f4dcc3b5aa765d61d8327deb882cf99": "password",
  "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed": "admin123",
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918": "admin",
  "5d41402abc4b2a76b9719d911017c592": "hello",
  "329153f560eb3295f3eb24cc8f107ee1": "qwerty123",
};

// Supported file formats for upload
const SUPPORTED_EXTENSIONS = [
  { ext: ".txt", label: "Text Wordlists / Hashes" },
  { ext: ".hash", label: "Raw Hash Dumps" },
  { ext: ".pot", label: "Potfiles (.pot / .potfile)" },
  { ext: ".csv", label: "Database CSV Dumps" },
  { ext: ".json", label: "Structured JSON Dumps" },
  { ext: ".shadow", label: "Linux /etc/shadow" },
  { ext: ".sam", label: "Windows SAM / PWDUMP" },
  { ext: ".lst", label: "Password Lists (.lst)" },
  { ext: ".hcmask", label: "Hashcat Mask Rules" },
];

export default function PasswordCracker() {
  // --- Input State ---
  const [inputType, setInputType] = useState("direct"); // "direct", "file"
  const [hashes, setHashes] = useState("");
  const [hashStats, setHashStats] = useState({ count: 0, types: {}, samples: {} });
  const [file, setFile] = useState(null);
  const [fileSummary, setFileSummary] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState("");

  // --- Attack Configuration ---
  const [activeAttackTab, setActiveAttackTab] = useState("dictionary");
  const [dictConfig, setDictConfig] = useState({ wordlist: "rockyou.txt", ruleset: "best64.rule" });
  const [bfConfig, setBfConfig] = useState({
    lower: true,
    upper: true,
    digits: true,
    special: false,
    custom: "",
    minLen: 4,
    maxLen: 8,
  });
  const [hybridConfig, setHybridConfig] = useState({
    wordlist: "rockyou.txt",
    appendNum: true,
    prependWords: false,
    leet: true,
    caseVar: true,
  });
  const [maskConfig, setMaskConfig] = useState({ mask: "?u?l?l?l?d?d" });
  const [rainbowConfig, setRainbowConfig] = useState({ table: "md5_loweralpha_numeric_1_8" });

  // --- Advanced Options ---
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advConfig, setAdvConfig] = useState({
    threads: 8,
    ram: 2048,
    timeout: 60,
    caseSensitive: false,
    salt: "",
  });

  // --- Execution & Results State ---
  const [status, setStatus] = useState("idle"); // "idle", "running", "completed"
  const [progress, setProgress] = useState({
    percent: 0,
    speed: 0,
    elapsed: 0,
    remaining: 0,
    tested: 0,
    total: 0,
    cracked: 0,
    failed: 0,
  });
  const [liveFeed, setLiveFeed] = useState([]);
  const [auditLog, setAuditLog] = useState([
    `[${new Date().toLocaleTimeString()}] Ready. Paste hashes or load demo set.`,
  ]);
  const [activeResultTab, setActiveResultTab] = useState("results");

  const timerRef = useRef(null);

  // Auto-load demo hashes initially for immediate testability
  useEffect(() => {
    if (!hashes) {
      setHashes(SAMPLE_HASHES.join("\n"));
    }
  }, []);

  // Parse lines and compute real-time algorithm profile
  useEffect(() => {
    if (inputType === "direct") {
      const lines = hashes
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const types = {};
      const samples = {};

      lines.forEach((h) => {
        const detected = detectHash(h);
        if (detected) {
          types[detected.type] = (types[detected.type] || 0) + 1;
          if (!samples[detected.type]) {
            samples[detected.type] = h;
          }
        }
      });

      setHashStats({ count: lines.length, types, samples });
    }
  }, [hashes, inputType]);

  const showNotification = (msg) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(""), 2000);
  };

  const logAudit = (msg) => {
    setAuditLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleLoadSample = () => {
    setHashes(SAMPLE_HASHES.join("\n"));
    setInputType("direct");
    showNotification("Demo hashes loaded!");
    logAudit(`Loaded ${SAMPLE_HASHES.length} sample demo hashes.`);
  };

  const handleAppendSpecificHash = (hashVal, typeName) => {
    setHashes((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n${hashVal}` : hashVal;
    });
    showNotification(`Added ${typeName} sample hash!`);
  };

  const handleClearHashes = () => {
    setHashes("");
    setFile(null);
    setFileSummary(null);
    setHashStats({ count: 0, types: {}, samples: {} });
    showNotification("Hashes cleared.");
    logAudit("Hash input cleared.");
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setHashes((prev) => (prev.trim() ? `${prev.trim()}\n${text.trim()}` : text.trim()));
        showNotification("Pasted from clipboard!");
      }
    } catch {
      showNotification("Clipboard access denied. Please paste manually (Ctrl+V).");
    }
  };

  // Smart File Upload Handler supporting diverse formats
  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 20 * 1024 * 1024) {
      alert("File exceeds maximum 20MB limit.");
      return;
    }
    setFile(f);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);

      // Smart extraction for .shadow, .sam, .csv, colon-separated formats
      const extracted = [];
      rawLines.forEach((line) => {
        // Linux /etc/shadow: root:$6$salt$hash:...
        if (line.includes(":") && (line.includes("$6$") || line.includes("$5$") || line.includes("$1$") || line.includes("$2"))) {
          const parts = line.split(":");
          if (parts[1] && parts[1].startsWith("$")) {
            extracted.push(parts[1]);
            return;
          }
        }
        // Windows PWDUMP / SAM: Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
        if (line.includes(":") && line.split(":").length >= 4) {
          const parts = line.split(":");
          if (parts[3] && parts[3].length === 32) {
            extracted.push(parts[3]); // NTLM hash part
            return;
          }
        }
        // CSV with commas
        if (line.includes(",")) {
          const parts = line.split(",").map((p) => p.trim().replace(/['"]/g, ""));
          const hashCandidate = parts.find((p) => [32, 40, 64, 128].includes(p.length) || p.startsWith("$2"));
          if (hashCandidate) {
            extracted.push(hashCandidate);
            return;
          }
        }
        // Default plain hash line
        extracted.push(line);
      });

      const finalHashes = extracted.length > 0 ? extracted : rawLines;
      setHashes(finalHashes.join("\n"));
      setFileSummary({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
        lines: finalHashes.length,
        preview: finalHashes.slice(0, 3),
      });

      setInputType("direct"); // Switch to direct view so user sees the editor populated with parsed hashes
      showNotification(`Uploaded ${f.name} (${finalHashes.length} hashes detected)!`);
      logAudit(`Uploaded file: ${f.name} → Extracted ${finalHashes.length} target hashes.`);
    };
    reader.readAsText(f);
  };

  // Start Attack Simulation
  const startCracking = () => {
    if (hashStats.count === 0) {
      handleLoadSample();
      return;
    }

    setStatus("running");
    setLiveFeed([]);
    logAudit(`Starting ${activeAttackTab.toUpperCase()} attack on ${hashStats.count} target hashes...`);

    const hashList = hashes
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    let total = 14344392;
    if (activeAttackTab === "bruteforce") total = 500000000;
    else if (activeAttackTab === "hybrid") total = 85000000;

    let currentTested = 0;
    const startTime = Date.now();
    let crackedCount = 0;

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const speed = Math.floor(Math.random() * 500000) + 1400000;
      currentTested += speed;
      const elapsed = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      const percent = Math.min(100, Math.max((crackedCount / hashList.length) * 100, (currentTested / total) * 100));
      const remaining = percent > 0 && percent < 100 ? Math.floor((elapsed / percent) * (100 - percent)) : 0;

      // Realistic crack triggering
      if (crackedCount < hashList.length && Math.random() > 0.35) {
        const targetHash = hashList[crackedCount];
        const typeInfo = detectHash(targetHash) || { type: "MD5" };
        const foundPassword =
          KNOWN_PASSWORDS[targetHash] ||
          ["password", "admin123", "secret", "qwerty", "dragon", "123456"][crackedCount % 6];

        crackedCount++;

        const newResult = {
          id: Date.now() + Math.random(),
          hash: targetHash.length > 20 ? `${targetHash.substring(0, 8)}...${targetHash.substring(targetHash.length - 6)}` : targetHash,
          rawHash: targetHash,
          type: typeInfo.type,
          password: foundPassword,
          time: `${elapsed}s`,
          method: activeAttackTab,
        };

        setLiveFeed((prev) => [newResult, ...prev]);
        logAudit(`Cracked: ${newResult.hash} → "${foundPassword}" [${typeInfo.type}]`);
      }

      if (crackedCount >= hashList.length || percent >= 100) {
        clearInterval(timerRef.current);
        setStatus("completed");
        logAudit(`Attack completed: ${crackedCount}/${hashList.length} hashes cracked in ${elapsed}s.`);
        setProgress((p) => ({
          ...p,
          percent: 100,
          speed: 0,
          remaining: 0,
          elapsed,
          cracked: crackedCount,
        }));
      } else {
        setProgress({
          percent,
          speed,
          elapsed,
          remaining,
          tested: currentTested,
          total,
          cracked: crackedCount,
          failed: 0,
        });
      }
    }, 1000);
  };

  const stopCracking = () => {
    clearInterval(timerRef.current);
    setStatus("idle");
    logAudit("Attack stopped by operator.");
  };

  const handleCopyText = (text, msg = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    showNotification(msg);
  };

  const handleExportTxt = () => {
    if (liveFeed.length === 0) return;
    const content = liveFeed.map((r) => `${r.rawHash || r.hash}:${r.password}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cracked_hashes.txt";
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Downloaded cracked_hashes.txt");
  };

  // Line numbers calculation for the editor
  const hashLines = hashes ? hashes.split("\n") : [""];
  const lineNumbers = Array.from({ length: Math.max(1, hashLines.length) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-200 p-4 sm:p-6 md:p-8 font-sans selection:bg-red-500/30 selection:text-white">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-4 py-2 rounded-xl bg-slate-900 border border-red-500/40 text-white text-xs font-mono font-bold shadow-[0_4px_25px_rgba(239,68,68,0.3)] flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOP HEADER BAR --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <Key className="w-6 h-6" />
            </div>
            <span>Password Cracker</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
            High-Performance Multi-Vector Hash Decryption Suite
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Quick Demo Hashes button */}
          <button
            onClick={handleLoadSample}
            disabled={status === "running"}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all active:scale-95 disabled:opacity-50"
            title="Load sample hashes for instant testing"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Load Demo Hashes</span>
          </button>

          {/* Primary Action Button */}
          {status === "idle" || status === "completed" ? (
            <button
              onClick={startCracking}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Attack</span>
            </button>
          ) : (
            <button
              onClick={stopCracking}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>Stop Attack</span>
            </button>
          )}
        </div>
      </div>

      {/* --- TWO-COLUMN WORKBENCH --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: Hash Input Source (5 cols on desktop)            */}
        {/* ============================================================== */}
        <div className="xl:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#0c1017]/95 border border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Card Header with red accent line */}
            <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white tracking-wide">Hash Input Source</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Input raw hashes or upload hash dump files</p>
                </div>
              </div>

              {/* Mode Segmented Switcher */}
              <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setInputType("direct")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    inputType === "direct"
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/60"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Direct Input</span>
                </button>
                <button
                  onClick={() => setInputType("file")}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    inputType === "file"
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700/60"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>File Upload</span>
                </button>
              </div>
            </div>

            <div className="p-5">
              {/* --- OPTION 1: Direct Input (Modern Code-Editor Style) --- */}
              {inputType === "direct" ? (
                <div className="space-y-4">
                  {/* Modern Terminal / Code Editor Container */}
                  <div className="rounded-xl border border-slate-800 bg-[#06090e] shadow-inner overflow-hidden focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/20 transition-all">
                    {/* Editor Toolbar Header */}
                    <div className="px-3.5 py-2 bg-slate-900/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-mono font-bold text-slate-300">
                          RAW HASH STREAM
                        </span>
                      </div>

                      {/* Quick Chips & Actions */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAppendSpecificHash("5f4dcc3b5aa765d61d8327deb882cf99", "MD5")}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 border border-slate-700 transition-colors"
                          title="Append sample MD5 hash"
                        >
                          + MD5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAppendSpecificHash("8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "SHA-256")}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 transition-colors"
                          title="Append sample SHA-256 hash"
                        >
                          + SHA-256
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAppendSpecificHash("329153f560eb3295f3eb24cc8f107ee1", "NTLM")}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 transition-colors"
                          title="Append sample NTLM hash"
                        >
                          + NTLM
                        </button>

                        <div className="w-[1px] h-3.5 bg-slate-800 mx-1" />

                        <button
                          type="button"
                          onClick={handlePasteClipboard}
                          className="p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Paste from clipboard"
                        >
                          <Clipboard className="w-3.5 h-3.5" />
                        </button>

                        {hashes && (
                          <button
                            type="button"
                            onClick={handleClearHashes}
                            className="p-1.5 rounded-md bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Clear all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editor Body with Line Numbers Gutter */}
                    <div className="flex text-xs font-mono min-h-[170px] max-h-[260px] overflow-hidden">
                      {/* Gutter */}
                      <div className="py-3 px-2.5 bg-slate-950/70 select-none text-slate-600 text-right font-mono border-r border-slate-800/60 leading-6 shrink-0 w-10">
                        {lineNumbers.map((num) => (
                          <div key={num} className="text-[11px] font-semibold text-slate-600">
                            {num}
                          </div>
                        ))}
                      </div>

                      {/* Textarea */}
                      <textarea
                        value={hashes}
                        onChange={(e) => setHashes(e.target.value)}
                        placeholder="Paste hashes here (one per line)...&#10;5f4dcc3b5aa765d61d8327deb882cf99&#10;2aae6c35c94fcfb415dbe95f408b9ce91ee846ed&#10;8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
                        rows={7}
                        className="flex-1 p-3 bg-transparent text-xs font-mono text-slate-200 outline-none resize-none leading-6 placeholder:text-slate-600 custom-scrollbar overflow-y-auto"
                      />
                    </div>

                    {/* Editor Footer Status Bar */}
                    <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>UTF-8 • Auto-trim spaces</span>
                      <div className="flex items-center gap-3">
                        <span>{hashLines.length} lines</span>
                        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {hashStats.count} Valid Hash(es)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- OPTION 2: File Upload with Multi-Format Support --- */
                <div className="space-y-4">
                  {/* Drag and Drop Zone */}
                  <div className="border-2 border-dashed border-slate-800 hover:border-red-500/50 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center text-center bg-[#070a0f] hover:bg-[#070a0f]/80 transition-all group">
                    <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Drag & Drop Target Hash File</h4>
                    <p className="text-xs text-slate-400 font-mono mb-4">
                      Max upload limit: 20MB (Supports single & multi-column dumps)
                    </p>

                    <label className="px-4 py-2 rounded-xl font-bold text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 cursor-pointer transition-all shadow-md active:scale-95 mb-4">
                      Browse Local Files
                      <input
                        type="file"
                        className="hidden"
                        accept=".txt,.hash,.hashes,.pot,.potfile,.csv,.tsv,.json,.shadow,.sam,.pwdump,.lst,.hcmask"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {/* Supported Extension Badges */}
                    <div className="w-full pt-3 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2 font-bold tracking-wider">
                        Supported File Types:
                      </span>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {SUPPORTED_EXTENSIONS.map((item) => (
                          <span
                            key={item.ext}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                            title={item.label}
                          >
                            {item.ext}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Uploaded File Details Card */}
                  {fileSummary && (
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-red-500/30 text-xs font-mono space-y-2">
                      <div className="flex items-center justify-between text-slate-200">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="font-bold truncate">{fileSummary.name}</span>
                          <span className="text-slate-500">({fileSummary.size})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shrink-0">
                          {fileSummary.lines} Hashes Parsed
                        </span>
                      </div>

                      {fileSummary.preview && fileSummary.preview.length > 0 && (
                        <div className="p-2 rounded bg-slate-950 text-[10px] text-slate-400 space-y-0.5 border border-slate-800/80">
                          <div className="text-slate-500 text-[9px] uppercase font-bold">Hash Sample Preview:</div>
                          {fileSummary.preview.map((sample, idx) => (
                            <div key={idx} className="truncate text-slate-300">
                              {sample}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* REAL-TIME ALGORITHM DETECTION & CRYPTOGRAPHIC PROFILING CARDS  */}
              {/* ============================================================== */}
              {hashStats.count > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <h4 className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                        Real-Time Algorithm Profiler
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      {Object.keys(hashStats.types).length} Format(s) Detected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {Object.entries(hashStats.types).map(([type, count]) => {
                      const sampleHash = hashStats.samples[type] || "";
                      const info = detectHash(sampleHash) || {
                        type,
                        name: type,
                        mode: "-m ?",
                        bitLength: "Unknown",
                        feasibility: "Standard",
                        feasibilityLevel: "neutral",
                        color: "text-slate-400",
                        accentBg: "bg-slate-800/40",
                        border: "border-slate-800",
                        pill: "bg-slate-800 text-slate-300 border-slate-700",
                        note: "Custom hash format.",
                      };

                      return (
                        <div
                          key={type}
                          className={`p-3.5 rounded-xl border ${info.border} ${info.accentBg} bg-[#070b12] transition-all hover:border-slate-600 shadow-sm`}
                        >
                          {/* Card Top Row */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2.5">
                              <span className={`text-sm font-black font-mono ${info.color}`}>
                                {info.type}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-bold">
                                {info.mode}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                                ({info.name})
                              </span>
                            </div>

                            <span className="text-xs font-mono font-black text-white bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-700 shadow-sm">
                              {count} {count === 1 ? "Hash" : "Hashes"}
                            </span>
                          </div>

                          {/* Card Middle: Bit length & Feasibility */}
                          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 my-1.5 gap-2">
                            <span className="flex items-center gap-1.5">
                              <span className="text-slate-500">Digest:</span>
                              <span className="text-slate-300 font-semibold">{info.bitLength}</span>
                            </span>

                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${info.pill}`}
                            >
                              {info.feasibility}
                            </span>
                          </div>

                          {/* Sample Hash String Preview */}
                          {sampleHash && (
                            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                              <span className="truncate max-w-[240px] sm:max-w-[280px] text-slate-400">
                                Sample: <span className="text-slate-300">{sampleHash.substring(0, 16)}...{sampleHash.substring(sampleHash.length - 8)}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyText(sampleHash, "Sample hash copied!")}
                                className="text-slate-400 hover:text-white transition-colors ml-2"
                                title="Copy sample hash"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Attack Configuration (7 cols on desktop)         */}
        {/* ============================================================== */}
        <div className="xl:col-span-7 space-y-6">
          <div className="rounded-2xl bg-[#0c1017]/95 border border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rose-500 via-red-500 to-rose-600" />
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white tracking-wide">Attack Configuration</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Select decryption strategy & rule mutations</p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Horizontal Attack Mode Tabs */}
              <div className="flex border-b border-slate-800 pb-1 mb-5 overflow-x-auto custom-scrollbar">
                {[
                  { id: "dictionary", icon: Book, label: "Dictionary" },
                  { id: "bruteforce", icon: Hash, label: "Brute Force" },
                  { id: "hybrid", icon: Zap, label: "Hybrid" },
                  { id: "mask", icon: Type, label: "Mask" },
                  { id: "rainbow", icon: Database, label: "Rainbow Table" },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeAttackTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAttackTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all relative whitespace-nowrap ${
                        active
                          ? "text-red-400 bg-red-500/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? "text-red-400" : ""}`} />
                      <span>{tab.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeAttackUnderline"
                          className="absolute bottom-0 left-1 right-1 h-0.5 bg-red-500 rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[220px]">
                {/* 1. Dictionary Attack Tab */}
                {activeAttackTab === "dictionary" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                        Target Wordlist
                      </label>
                      <select
                        value={dictConfig.wordlist}
                        onChange={(e) => setDictConfig({ ...dictConfig, wordlist: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                      >
                        <option value="rockyou.txt">rockyou.txt (14,344,392 words — Standard)</option>
                        <option value="seclists-top100k.txt">SecLists Top 100K (Fast Scan)</option>
                        <option value="darkweb-leaks.txt">DarkWeb Leaks 2024 (8.9M words)</option>
                        <option value="crackstation.txt">CrackStation Human Words (64M words)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
                      <FileDigit className="w-5 h-5 text-red-400 shrink-0" />
                      <div>
                        <p className="text-slate-300">
                          Path: <span className="text-emerald-400">/wordlists/{dictConfig.wordlist}</span>
                        </p>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {dictConfig.wordlist === "rockyou.txt" ? "14.3 Million words • Est. Speed: ~15s" : "High Coverage Wordlist"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                        Mutation Ruleset (Optional)
                      </label>
                      <select
                        value={dictConfig.ruleset}
                        onChange={(e) => setDictConfig({ ...dictConfig, ruleset: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                      >
                        <option value="best64.rule">best64.rule (Hashcat standard mutations)</option>
                        <option value="d3ad0ne.rule">d3ad0ne.rule (Heavy mutations)</option>
                        <option value="leetspeak.rule">leetspeak.rule (@/3/1/0 replacements)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 2. Brute Force Attack Tab */}
                {activeAttackTab === "bruteforce" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                        Character Sets
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "lower", label: "Lowercase (a-z)" },
                          { id: "upper", label: "Uppercase (A-Z)" },
                          { id: "digits", label: "Digits (0-9)" },
                          { id: "special", label: "Special (!@#$)" },
                        ].map((opt) => (
                          <label
                            key={opt.id}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={bfConfig[opt.id]}
                              onChange={() => setBfConfig({ ...bfConfig, [opt.id]: !bfConfig[opt.id] })}
                              className="rounded border-slate-700 bg-slate-900 text-red-500 focus:ring-0"
                            />
                            <span className="text-xs text-slate-300 font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Custom Characters (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ? * + = -"
                        value={bfConfig.custom}
                        onChange={(e) => setBfConfig({ ...bfConfig, custom: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div>
                        <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>Min Length:</span>
                          <span className="text-red-400 font-bold">{bfConfig.minLen}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={bfConfig.minLen}
                          onChange={(e) => setBfConfig({ ...bfConfig, minLen: parseInt(e.target.value) })}
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
                          max="14"
                          value={bfConfig.maxLen}
                          onChange={(e) => setBfConfig({ ...bfConfig, maxLen: parseInt(e.target.value) })}
                          className="w-full accent-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Hybrid Attack Tab */}
                {activeAttackTab === "hybrid" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Base Wordlist</label>
                        <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 outline-none">
                          <option>rockyou.txt</option>
                          <option>seclists-top100k.txt</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Ruleset</label>
                        <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 outline-none">
                          <option>best64.rule</option>
                          <option>d3ad0ne.rule</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <h4 className="text-xs font-mono font-bold text-slate-300 mb-2">Rule Modifiers</h4>
                      {[
                        { id: "appendNum", label: "Append numbers (0-999)" },
                        { id: "prependWords", label: "Prepend common prefixes" },
                        { id: "leet", label: "Leet speak variations (a→@, e→3)" },
                        { id: "caseVar", label: "Case toggling (upper/lower)" },
                      ].map((opt) => (
                        <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={hybridConfig[opt.id]}
                            onChange={() => setHybridConfig({ ...hybridConfig, [opt.id]: !hybridConfig[opt.id] })}
                            className="rounded border-slate-700 bg-slate-900 text-red-500 focus:ring-0"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Mask Attack Tab */}
                {activeAttackTab === "mask" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                        Hashcat Mask Pattern
                      </label>
                      <input
                        type="text"
                        value={maskConfig.mask}
                        onChange={(e) => setMaskConfig({ mask: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/50 rounded-xl p-2.5 text-sm font-mono text-red-300 text-center tracking-widest outline-none"
                      />
                      <p className="text-center text-[11px] font-mono text-slate-500 mt-1">
                        Example: "?u?l?l?l?d?d" translates to "Pass12"
                      </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {[
                        { code: "?l", desc: "Lower" },
                        { code: "?u", desc: "Upper" },
                        { code: "?d", desc: "Digit" },
                        { code: "?s", desc: "Special" },
                        { code: "?a", desc: "All" },
                        { code: "?b", desc: "Binary" },
                      ].map((w) => (
                        <button
                          key={w.code}
                          type="button"
                          onClick={() => setMaskConfig({ mask: maskConfig.mask + w.code })}
                          className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg p-1.5 text-center transition-colors"
                        >
                          <span className="font-mono text-red-400 font-bold text-xs block">{w.code}</span>
                          <span className="text-[10px] text-slate-500">{w.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Rainbow Table Tab */}
                {activeAttackTab === "rainbow" && (
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-400">Precomputed Table Lookup</h4>
                        <p className="text-amber-400/80 text-[11px] mt-0.5">
                          Rainbow tables provide instant O(1) decryption for unsalted hashes.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Select Table Chain
                      </label>
                      <select
                        value={rainbowConfig.table}
                        onChange={(e) => setRainbowConfig({ table: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none"
                      >
                        <option value="md5_loweralpha_numeric_1_8">MD5_loweralpha_numeric_1-8 (42 GB)</option>
                        <option value="sha1_mixalpha_numeric_1_7">SHA1_mixalpha_numeric_1-7 (115 GB)</option>
                        <option value="ntlm_all_1_8">NTLM_all_1-8 (89 GB)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADVANCED ENGINE TUNING (Collapsible) --- */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-2"
        >
          <Settings className="w-3.5 h-3.5 text-red-400" />
          <span>Advanced Performance Options</span>
          <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>Worker Threads:</span>
                      <span className="text-red-400 font-bold">{advConfig.threads}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="32"
                      value={advConfig.threads}
                      onChange={(e) => setAdvConfig({ ...advConfig, threads: parseInt(e.target.value) })}
                      className="w-full accent-red-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>RAM Buffer Limit:</span>
                      <span className="text-red-400 font-bold">{advConfig.ram} MB</span>
                    </div>
                    <input
                      type="range"
                      min="512"
                      max="8192"
                      step="512"
                      value={advConfig.ram}
                      onChange={(e) => setAdvConfig({ ...advConfig, ram: parseInt(e.target.value) })}
                      className="w-full accent-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={advConfig.caseSensitive}
                      onChange={() => setAdvConfig({ ...advConfig, caseSensitive: !advConfig.caseSensitive })}
                      className="rounded border-slate-700 bg-slate-950 text-red-500 focus:ring-0"
                    />
                    <span className="text-xs text-slate-300 font-mono">Case-insensitive matching</span>
                  </label>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Manual Salt (Optional)</label>
                    <input
                      type="text"
                      placeholder="Auto-detect if empty"
                      value={advConfig.salt}
                      onChange={(e) => setAdvConfig({ ...advConfig, salt: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- REAL-TIME CRACKING DASHBOARD (Visible during/after attack) --- */}
      <AnimatePresence>
        {(status === "running" || status === "completed") && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mb-6 rounded-2xl bg-[#0c1017] border border-red-500/30 overflow-hidden shadow-xl relative"
          >
            {/* Top Animated Progress Sweep */}
            <div className="w-full h-1 bg-slate-950 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600"
                style={{ width: `${progress.percent}%` }}
                transition={{ ease: "linear", duration: 0.4 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
              {/* Telemetry Stats Column (5 cols) */}
              <div className="lg:col-span-5 p-5 font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-slate-100">
                    <Terminal className="w-4 h-4 text-red-400" />
                    <span>
                      {status === "running" ? "CRACKING IN PROGRESS..." : "ATTACK FINISHED"}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      status === "running"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {status === "running" ? "ACTIVE" : "COMPLETED"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Keyspace Progress:</span>
                  <span className="text-white font-bold">{progress.percent.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Compute Speed:</span>
                  <span className="text-emerald-400 font-bold">{formatSpeed(progress.speed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Elapsed / ETA:</span>
                  <span className="text-slate-300">
                    {formatTime(progress.elapsed)} / {formatTime(progress.remaining)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tested Candidates:</span>
                  <span className="text-slate-300">{formatNumber(progress.tested)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between">
                  <span className="text-slate-300 font-semibold">Decrypted Matches:</span>
                  <span className="text-emerald-400 font-bold">
                    {progress.cracked} / {hashStats.count} Hashes
                  </span>
                </div>
              </div>

              {/* Live Decryption Feed Column (7 cols) */}
              <div className="lg:col-span-7 p-5 flex flex-col h-56 bg-slate-950/40">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Activity className="w-3.5 h-3.5 text-red-400" /> Live Recovered Plaintexts
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {liveFeed.length} Found
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {liveFeed.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-emerald-500/20 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-slate-400 truncate max-w-[140px] sm:max-w-[200px]">
                          {item.hash}
                        </span>
                        <span className="text-emerald-400 font-bold">→ "{item.password}"</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 shrink-0">
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {item.type}
                        </span>
                        <span>{item.time}</span>
                      </div>
                    </motion.div>
                  ))}

                  {status === "running" && liveFeed.length === 0 && (
                    <div className="flex items-center justify-center h-full text-center text-slate-500 text-xs font-mono">
                      Evaluating candidate mutations... Matches will show instantly.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESULTS & SESSION HISTORY --- */}
      <div className="rounded-2xl bg-[#0c1017]/95 border border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50 flex justify-between items-center relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-rose-600" />
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white tracking-wide">Results & History Hub</h3>
              <p className="text-[11px] text-slate-400 font-mono">Cracked hashes, statistics, and audit records</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex overflow-x-auto border-b border-slate-800 pb-1 mb-4 custom-scrollbar">
            {[
              { id: "results", icon: CheckCircle, label: "Cracked Passwords", badge: liveFeed.length },
              { id: "stats", icon: BarChart3, label: "Statistics" },
              { id: "history", icon: History, label: "Session History" },
              { id: "log", icon: Terminal, label: "Audit Log" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeResultTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveResultTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all relative whitespace-nowrap ${
                    active
                      ? "text-red-400 bg-red-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-red-400" : ""}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-red-500 text-white font-bold ml-1">
                      {tab.badge}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="activeResultUnderline"
                      className="absolute bottom-0 left-1 right-1 h-0.5 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div>
            {/* TAB 1: Cracked Passwords Table */}
            {activeResultTab === "results" && (
              <div className="space-y-3">
                {liveFeed.length > 0 && (
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={handleExportTxt}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      title="Export as TXT file"
                    >
                      <Download className="w-3.5 h-3.5 text-red-400" />
                      <span>Download TXT</span>
                    </button>
                    <button
                      onClick={() => {
                        const allText = liveFeed.map((r) => `${r.rawHash || r.hash}:${r.password}`).join("\n");
                        handleCopyText(allText, "All cracked hashes copied!");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      title="Copy all to clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All</span>
                    </button>
                  </div>
                )}

                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Target Hash</th>
                        <th className="p-3">Format</th>
                        <th className="p-3">Plaintext Password</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Method</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {liveFeed.length > 0 ? (
                        liveFeed.map((r, i) => (
                          <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-3 text-slate-500">{i + 1}</td>
                            <td className="p-3 text-slate-300 font-bold" title={r.rawHash || r.hash}>
                              {r.hash}
                            </td>
                            <td className="p-3 text-slate-400">{r.type}</td>
                            <td className="p-3 text-emerald-400 font-bold text-sm">{r.password}</td>
                            <td className="p-3 text-slate-400">{r.time}</td>
                            <td className="p-3 text-slate-400 capitalize">{r.method}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleCopyText(r.password, `Password "${r.password}" copied!`)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="Copy plaintext password"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-slate-500 font-mono">
                            No cracked hashes yet. Enter hashes and click "Start Attack".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Statistics */}
            {activeResultTab === "stats" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center mb-2 text-xl font-bold text-white font-mono">
                    {hashStats.count > 0 ? Math.round((progress.cracked / hashStats.count) * 100) : 0}%
                  </div>
                  <h4 className="text-slate-400 text-xs font-mono">Overall Success Rate</h4>
                </div>

                <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-center space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Hashes Tested:</span>
                    <span className="font-bold">{hashStats.count}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Successfully Decrypted:</span>
                    <span className="font-bold">{progress.cracked}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Duration:</span>
                    <span>{formatTime(progress.elapsed)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Average Hashrate:</span>
                    <span>{formatSpeed(progress.speed || 1400000)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Session History */}
            {activeResultTab === "history" && (
              <div className="space-y-2.5 font-mono text-xs">
                {[
                  {
                    date: "2026-11-06 14:30",
                    method: "Dictionary (rockyou.txt)",
                    hashes: "5",
                    cracked: "5",
                    time: "12s",
                  },
                  {
                    date: "2026-11-05 09:15",
                    method: "Brute Force (Lower, Num)",
                    hashes: "4",
                    cracked: "3",
                    time: "45s",
                  },
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl gap-2"
                  >
                    <div>
                      <h4 className="font-bold text-slate-200">{h.method}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {h.date} • Duration: {h.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">
                          {h.cracked} / {h.hashes} Cracked
                        </p>
                      </div>
                      <button
                        onClick={handleLoadSample}
                        className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Load this test set"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: Audit Log */}
            {activeResultTab === "log" && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 h-56 overflow-y-auto font-mono text-xs text-slate-400 space-y-1 custom-scrollbar">
                {auditLog.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.includes("Cracked:")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("stopped")
                          ? "text-rose-400"
                          : log.includes("Starting")
                            ? "text-red-400"
                            : ""
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
