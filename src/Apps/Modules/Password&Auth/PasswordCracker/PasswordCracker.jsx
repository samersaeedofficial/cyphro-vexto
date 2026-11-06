import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  Shield,
  Zap,
  Volume2,
  VolumeX,
  HelpCircle,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Hash,
} from "lucide-react";

import { CrackerHeader } from "./components/CrackerHeader";
import { MetricCards } from "./components/MetricCards";
import { HashInputPanel } from "./components/HashInputPanel";
import { AttackConfigPanel } from "./components/AttackConfigPanel";
import { LiveCrackingTerminal } from "./components/LiveCrackingTerminal";
import { ResultsPanel } from "./components/ResultsPanel";
import {
  detectHash,
  DEMO_PRESETS,
  WORDLIST_LIBRARY,
  formatNumber,
} from "./components/hashUtils";

export default function PasswordCracker() {
  // --- Input State ---
  const [inputType, setInputType] = useState("direct"); // "direct", "file", "inspect"
  const [hashes, setHashes] = useState("");
  const [hashStats, setHashStats] = useState({ count: 0, types: {} });
  const [file, setFile] = useState(null);
  const [knownPlaintexts, setKnownPlaintexts] = useState({});

  // --- Attack Config State ---
  const [activeAttackTab, setActiveAttackTab] = useState("dictionary");
  const [dictConfig, setDictConfig] = useState({
    wordlist: "rockyou.txt",
    ruleset: "best64.rule",
  });
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
    ruleset: "best64.rule",
    appendNum: true,
    prependWords: false,
    leet: true,
    caseVar: true,
  });
  const [maskConfig, setMaskConfig] = useState({ mask: "?u?l?l?l?d?d" });
  const [rainbowConfig, setRainbowConfig] = useState({
    table: "md5-alnum-1-8",
  });

  // --- Hardware & Advanced Engine ---
  const [hardwareProfile, setHardwareProfile] = useState("gpu"); // "gpu", "cpu", "cluster"
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advConfig, setAdvConfig] = useState({
    threads: 16,
    ram: 4096,
    timeout: 60,
    caseSensitive: false,
    salt: "",
  });

  // --- Telemetry & Dashboard State ---
  const [status, setStatus] = useState("idle"); // "idle", "running", "paused", "completed"
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
    `[${new Date().toLocaleTimeString()}] Cyphro Decryption Subsystem v3.4 online. Ready for tasking.`,
  ]);
  const [activeResultTab, setActiveResultTab] = useState("results");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // --- Session History ---
  const [sessionHistory, setSessionHistory] = useState([
    {
      date: "2026-11-05 14:20",
      method: "Dictionary Attack (rockyou.txt)",
      algorithm: "MD5 & SHA-1",
      hashes: "5",
      total: 5,
      cracked: 5,
      successRate: "100%",
      duration: "14s",
      hardware: "GPU RTX 4090",
    },
    {
      date: "2026-11-04 18:45",
      method: "Hybrid Mask (?u?l?l?d?d)",
      algorithm: "NTLM",
      hashes: "4",
      total: 4,
      cracked: 3,
      successRate: "75%",
      duration: "2m 10s",
      hardware: "CPU 32-Core",
    },
  ]);

  const timerRef = useRef(null);

  // --- Subtle Cyber Chime Audio ---
  const playCyberChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(784, ctx.currentTime); // G5
      osc.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.1); // E6
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context policy blocked or not supported
    }
  };

  // --- Auto-Detect Hashes ---
  useEffect(() => {
    if (inputType === "direct") {
      const lines = hashes
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const types = {};
      lines.forEach((h) => {
        const t = detectHash(h);
        if (t) {
          types[t.type] = (types[t.type] || 0) + 1;
        }
      });
      setHashStats({ count: lines.length, types });
    }
  }, [hashes, inputType]);

  // Initial load of Quick Demo Preset for immediate out-of-the-box readiness
  useEffect(() => {
    if (!hashes) {
      handleLoadPreset(DEMO_PRESETS[0], false);
    }
  }, []);

  const logAudit = (msg) => {
    setAuditLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev,
    ]);
  };

  // --- Handlers ---
  const handleLoadPreset = (preset, shouldLog = true) => {
    setHashes(preset.hashes.join("\n"));
    setKnownPlaintexts((prev) => ({
      ...prev,
      ...preset.plaintexts,
    }));
    setInputType("direct");
    if (shouldLog) {
      logAudit(`Preset loaded: "${preset.title}" (${preset.hashes.length} target hashes)`);
    }
  };

  const handleClearHashes = () => {
    setHashes("");
    setFile(null);
    setHashStats({ count: 0, types: {} });
    logAudit("Hash buffer cleared.");
  };

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
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      setHashes(lines.join("\n"));
      setInputType("direct");
      logAudit(`File parsed: ${f.name} (${lines.length} hashes detected).`);
    };
    reader.readAsText(f);
  };

  // --- Attack Execution Loop ---
  const startAttack = () => {
    if (hashStats.count === 0) {
      handleLoadPreset(DEMO_PRESETS[0]);
      return;
    }

    setStatus("running");
    setLiveFeed([]);
    logAudit(
      `Starting ${activeAttackTab.toUpperCase()} attack with ${hardwareProfile.toUpperCase()} acceleration on ${hashStats.count} target hashes...`,
    );

    const hashList = hashes
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    // Total keyspace simulation
    let totalKeyspace = 14344392;
    if (activeAttackTab === "bruteforce") totalKeyspace = 2800000000;
    else if (activeAttackTab === "hybrid") totalKeyspace = 45000000;
    else if (activeAttackTab === "mask") totalKeyspace = 8900000;
    else if (activeAttackTab === "rainbow") totalKeyspace = 500000;

    let testedSoFar = 0;
    let crackedSoFar = 0;
    const startTime = Date.now();

    // Base speed depending on hardware engine
    let baseHps = 42500000; // GPU default (42.5 MH/s)
    if (hardwareProfile === "cpu") baseHps = 3800000; // CPU (3.8 MH/s)
    if (hardwareProfile === "cluster") baseHps = 148000000; // Cluster (148 MH/s)

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // Add realistic jitter to speed
      const currentSpeed = Math.floor(baseHps + (Math.random() - 0.5) * (baseHps * 0.15));
      testedSoFar += currentSpeed;

      const elapsedSec = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      const simulatedPercent = Math.min(
        100,
        Math.max(
          (crackedSoFar / hashList.length) * 100,
          (testedSoFar / totalKeyspace) * 100,
        ),
      );

      const remainingSec =
        simulatedPercent > 0 && simulatedPercent < 100
          ? Math.max(0, Math.floor((elapsedSec / simulatedPercent) * (100 - simulatedPercent)))
          : 0;

      // Crack triggers (approx 1 match every 1-2 steps until all cracked)
      if (crackedSoFar < hashList.length && Math.random() > 0.3) {
        const targetHash = hashList[crackedSoFar];
        const info = detectHash(targetHash) || { type: "MD5" };

        // Plaintext resolution
        let decryptedPlaintext =
          knownPlaintexts[targetHash] ||
          ["password", "admin123", "secret", "qwerty123", "letmein", "summer2024", "123456"][
            crackedSoFar % 7
          ];

        crackedSoFar++;
        playCyberChime();

        const newItem = {
          id: Date.now() + Math.random(),
          hash:
            targetHash.length > 20
              ? `${targetHash.substring(0, 10)}...${targetHash.substring(targetHash.length - 8)}`
              : targetHash,
          rawHash: targetHash,
          type: info.type,
          password: decryptedPlaintext,
          time: `${elapsedSec}.${Math.floor(Math.random() * 9)}s`,
          method: activeAttackTab,
        };

        setLiveFeed((prev) => [newItem, ...prev]);
        logAudit(
          `CRACKED: ${newItem.hash} → "${decryptedPlaintext}" (${info.type} in ${newItem.time})`,
        );
      }

      // Check completion
      if (crackedSoFar >= hashList.length || simulatedPercent >= 100) {
        clearInterval(timerRef.current);
        setStatus("completed");
        logAudit(
          `Attack execution concluded: ${crackedSoFar}/${hashList.length} hashes successfully decrypted in ${elapsedSec}s.`,
        );

        setProgress({
          percent: 100,
          speed: 0,
          elapsed: elapsedSec,
          remaining: 0,
          tested: Math.max(testedSoFar, totalKeyspace),
          total: totalKeyspace,
          cracked: crackedSoFar,
          failed: hashList.length - crackedSoFar,
        });

        // Add to session history
        const newSession = {
          date: new Date().toISOString().replace("T", " ").substring(0, 16),
          method: `${activeAttackTab.toUpperCase()} Attack`,
          algorithm: Object.keys(hashStats.types).join(", ") || "Auto-Detect",
          hashes: String(hashList.length),
          total: hashList.length,
          cracked: crackedSoFar,
          successRate: `${Math.round((crackedSoFar / hashList.length) * 100)}%`,
          duration: `${elapsedSec}s`,
          hardware: hardwareProfile.toUpperCase(),
        };
        setSessionHistory((prev) => [newSession, ...prev]);
      } else {
        setProgress({
          percent: simulatedPercent,
          speed: currentSpeed,
          elapsed: elapsedSec,
          remaining: remainingSec,
          tested: testedSoFar,
          total: totalKeyspace,
          cracked: crackedSoFar,
          failed: 0,
        });
      }
    }, 1000);
  };

  const pauseAttack = () => {
    clearInterval(timerRef.current);
    setStatus("paused");
    logAudit("Attack paused by operator.");
  };

  const resumeAttack = () => {
    setStatus("running");
    logAudit("Attack resumed.");
    startAttack();
  };

  const stopAttack = () => {
    clearInterval(timerRef.current);
    setStatus("idle");
    setProgress((p) => ({ ...p, speed: 0 }));
    logAudit("Attack terminated by operator.");
  };

  const resetAll = () => {
    stopAttack();
    setLiveFeed([]);
    setProgress({
      percent: 0,
      speed: 0,
      elapsed: 0,
      remaining: 0,
      tested: 0,
      total: 0,
      cracked: 0,
      failed: 0,
    });
    logAudit("Session environment reset.");
  };

  const handleRerunHistory = (s) => {
    handleLoadPreset(DEMO_PRESETS[0]);
    setTimeout(() => {
      startAttack();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 p-4 md:p-8 lg:p-10 font-sans selection:bg-red-500/30 selection:text-white overflow-x-hidden relative">
      {/* Background Cyber Red Radial Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[300px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid background overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Top Sound & Help Utilities Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-slate-400 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-300 font-bold uppercase tracking-wider">
              CYPHRO SECURITY SUITE
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-red-400">PASSWORD CRACKER</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
              title={soundEnabled ? "Mute crack sound" : "Enable crack sound"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[11px]">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] text-slate-500">Muted</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-[11px]"
            >
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Guide</span>
            </button>
          </div>
        </div>

        {/* 1. Header with Controls */}
        <CrackerHeader
          status={status}
          onStartAttack={startAttack}
          onStopAttack={stopAttack}
          onPauseAttack={pauseAttack}
          onResumeAttack={resumeAttack}
          onReset={resetAll}
          onLoadPreset={handleLoadPreset}
          hardwareProfile={hardwareProfile}
          setHardwareProfile={setHardwareProfile}
          hashCount={hashStats.count}
          crackedCount={progress.cracked}
        />

        {/* 2. Top Metric Cards */}
        <MetricCards
          status={status}
          hashStats={hashStats}
          progress={progress}
          hardwareProfile={hardwareProfile}
        />

        {/* 3. Main Two-Column Workbench */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Hash Input & Cryptographic Profiler */}
          <div className="xl:col-span-5 h-full">
            <HashInputPanel
              inputType={inputType}
              setInputType={setInputType}
              hashes={hashes}
              setHashes={setHashes}
              hashStats={hashStats}
              file={file}
              handleFileUpload={handleFileUpload}
              onClear={handleClearHashes}
              onLoadPreset={handleLoadPreset}
            />
          </div>

          {/* Right Column: Multi-Vector Attack Studio */}
          <div className="xl:col-span-7 h-full">
            <AttackConfigPanel
              activeAttackTab={activeAttackTab}
              setActiveAttackTab={setActiveAttackTab}
              dictConfig={dictConfig}
              setDictConfig={setDictConfig}
              bfConfig={bfConfig}
              setBfConfig={setBfConfig}
              hybridConfig={hybridConfig}
              setHybridConfig={setHybridConfig}
              maskConfig={maskConfig}
              setMaskConfig={setMaskConfig}
              rainbowConfig={rainbowConfig}
              setRainbowConfig={setRainbowConfig}
              advConfig={advConfig}
              setAdvConfig={setAdvConfig}
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
            />
          </div>
        </div>

        {/* 4. Live Command Center (Shows when running, paused, or completed) */}
        {(status === "running" || status === "paused" || status === "completed") && (
          <LiveCrackingTerminal
            status={status}
            progress={progress}
            liveFeed={liveFeed}
            activeAttackTab={activeAttackTab}
            hardwareProfile={hardwareProfile}
            onPauseAttack={pauseAttack}
            onResumeAttack={resumeAttack}
            onStopAttack={stopAttack}
          />
        )}

        {/* 5. Results & Analytics Hub */}
        <ResultsPanel
          activeResultTab={activeResultTab}
          setActiveResultTab={setActiveResultTab}
          liveFeed={liveFeed}
          auditLog={auditLog}
          sessionHistory={sessionHistory}
          onClearLog={() => setAuditLog([])}
          onRerunHistory={handleRerunHistory}
        />
      </div>

      {/* --- Guide / Help Modal --- */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full rounded-3xl bg-[#0c1017] border border-red-500/30 p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Key className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">
                    Password Cracker Pro — Quick User Guide
                  </h3>
                </div>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 my-4 text-xs font-mono text-slate-300 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-red-400 text-sm mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> 1. How to Test in 1 Click
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    Click the <strong className="text-white">"Load Demo Hashes"</strong> button in the top header. Five real hashes (MD5, SHA-1, SHA-256, NTLM) will be automatically loaded into the workstation. Then simply press <strong className="text-white">"Start Attack"</strong>!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-red-400" /> 2. Attack Vectors Explained
                  </h4>
                  <ul className="space-y-2 text-slate-400 mt-2">
                    <li>
                      <strong className="text-slate-200">Dictionary:</strong> Tests millions of human passwords from leaks like RockYou.
                    </li>
                    <li>
                      <strong className="text-slate-200">Brute Force:</strong> Exhaustively checks every possible character combination.
                    </li>
                    <li>
                      <strong className="text-slate-200">Hybrid Rules:</strong> Modifies dictionary words with common numbers, leet speak, and symbols.
                    </li>
                    <li>
                      <strong className="text-slate-200">Mask:</strong> Targets known structural patterns (e.g. ?u?l?l?d?d = Pass12).
                    </li>
                    <li>
                      <strong className="text-slate-200">Rainbow Table:</strong> Uses precomputed lookup tables for instant decryption.
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" /> 3. Exporting & Reporting
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    Once passwords are recovered, use the download buttons in the Results panel to export formatted Potfiles (.txt), Excel CSV reports, or structured JSON data.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all"
                >
                  Got It, Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
