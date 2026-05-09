import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Lock, Play, Square, RotateCcw,
  Settings, ChevronDown, CheckCircle, Activity,
  Database, Shield, Key, FileDigit,
  Terminal, History, BarChart3, Download, Copy, Mail, AlertTriangle, Type, Hash, Zap, Book, Check
} from 'lucide-react';

// --- Utility Functions ---
const detectHash = (hash) => {
  const h = hash.trim();
  if (!h) return null;
  if (h.startsWith('$2a$') || h.startsWith('$2b$') || h.startsWith('$2y$')) {
    return { type: 'bcrypt', desc: '($2a$...) - Very Slow', color: 'text-rose-400', border: 'border-rose-400/30', bg: 'bg-rose-400/10' };
  }
  if (h.length === 32 && /^[a-fA-F0-9]+$/.test(h)) {
    return { type: 'MD5', desc: '(32 chars) - Fast Crack', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/10' };
  }
  if (h.length === 40 && /^[a-fA-F0-9]+$/.test(h)) {
    return { type: 'SHA1', desc: '(40 chars) - Medium', color: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10' };
  }
  if (h.length === 64 && /^[a-fA-F0-9]+$/.test(h)) {
    return { type: 'SHA256', desc: '(64 chars) - Slow', color: 'text-indigo-400', border: 'border-indigo-400/30', bg: 'bg-indigo-400/10' };
  }
  if (h.length === 128 && /^[a-fA-F0-9]+$/.test(h)) {
    return { type: 'SHA512', desc: '(128 chars) - Very Slow', color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-400/10' };
  }
  return { type: 'Unknown', desc: 'Format not recognized', color: 'text-slate-400', border: 'border-slate-400/30', bg: 'bg-slate-400/10' };
};

const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

// --- Subcomponents ---
const Card = ({ children, className = "", title, icon: Icon, action, headerAccent = "" }) => (
  <div className={`bg-slate-900/60 border border-slate-700/60 rounded-xl overflow-hidden backdrop-blur-md shadow-xl ${className}`}>
    {(title || Icon || action) && (
      <div className={`px-5 py-4 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/40 relative overflow-hidden`}>
        {headerAccent && <div className={`absolute top-0 left-0 w-full h-1 ${headerAccent}`} />}
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-indigo-400" />}
          {title && <h3 className="font-semibold text-slate-100">{title}</h3>}
        </div>
        {action}
      </div>
    )}
    <div className="p-5">
      {children}
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${active ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
  >
    <Icon className="w-4 h-4" />
    {label}
    {active && (
      <motion.div
        layoutId="activeTabIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);

export default function PasswordCracker() {
  // --- State: Input ---
  const [inputType, setInputType] = useState('direct'); // direct, file
  const [hashes, setHashes] = useState('');
  const [hashStats, setHashStats] = useState({ count: 0, types: {} });
  const [file, setFile] = useState(null);

  // --- State: Attack Config ---
  const [activeAttackTab, setActiveAttackTab] = useState('dictionary');

  const [dictConfig, setDictConfig] = useState({ wordlist: 'rockyou.txt' });

  const [bfConfig, setBfConfig] = useState({
    lower: true, upper: true, digits: true, special: false, custom: '', minLen: 4, maxLen: 8
  });

  const [hybridConfig, setHybridConfig] = useState({
    wordlist: 'rockyou.txt', appendNum: true, prependWords: false, leet: true, caseVar: true
  });

  const [maskConfig, setMaskConfig] = useState({ mask: '?l?l?l?l?d?d' });
  const [rainbowConfig, setRainbowConfig] = useState({ table: 'md5_loweralpha_numeric_1_8' });

  // --- State: Advanced ---
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advConfig, setAdvConfig] = useState({
    threads: 8, ram: 2048, timeout: 60, caseSensitive: false, salt: ''
  });

  // --- State: Execution & Dashboard ---
  const [status, setStatus] = useState('idle'); // idle, running, paused, completed
  const [progress, setProgress] = useState({
    percent: 0, speed: 0, elapsed: 0, remaining: 0, tested: 0, total: 0, cracked: 0, failed: 0
  });
  const [liveFeed, setLiveFeed] = useState([]);
  const [auditLog, setAuditLog] = useState([`[${new Date().toLocaleTimeString()}] System initialized. Ready for tasking.`]);
  const [activeResultTab, setActiveResultTab] = useState('results'); // results, stats, history, log

  const timerRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    if (inputType === 'direct') {
      const lines = hashes.split('\n').map(l => l.trim()).filter(l => l);
      const types = {};
      lines.forEach(h => {
        const t = detectHash(h);
        if (t) {
          types[t.type] = (types[t.type] || 0) + 1;
        }
      });
      setHashStats({ count: lines.length, types });
    }
  }, [hashes, inputType]);

  // --- Handlers ---
  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      alert("File exceeds 10MB limit.");
      return;
    }
    setFile(f);
    // Mock parsing
    setHashStats({ count: 15420, types: { 'MD5': 15000, 'SHA1': 420 } });
    logAudit(`File uploaded: ${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`);
  };

  const logAudit = (msg) => {
    setAuditLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startCracking = () => {
    if (hashStats.count === 0) {
      alert("Please input hashes to crack.");
      return;
    }

    setStatus('running');
    setLiveFeed([]);
    logAudit(`Starting ${activeAttackTab} attack on ${hashStats.count} hashes...`);

    // Calculate mock total based on attack
    let total = 0;
    if (activeAttackTab === 'dictionary') total = 14344392;
    else if (activeAttackTab === 'bruteforce') total = 5000000000;
    else total = 85000000;

    let currentTested = 0;
    let startTime = Date.now();
    let crackedCount = 0;

    const hashList = hashes.split('\n').map(h => h.trim()).filter(h => h);

    timerRef.current = setInterval(() => {
      const speed = Math.floor(Math.random() * 500000) + 800000; // hashes per sec
      currentTested += speed;
      const percent = Math.min(100, (currentTested / total) * 100);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = percent > 0 ? Math.floor((elapsed / percent) * (100 - percent)) : 0;

      // Simulate cracking
      if (Math.random() > 0.95 && crackedCount < hashStats.count) {
        crackedCount++;
        const targetHash = hashList[crackedCount - 1] || '5f4dcc3b5aa765d61d8327deb882cf99';
        const typeInfo = detectHash(targetHash) || { type: 'MD5' };

        setLiveFeed(prev => [{
          id: Date.now(),
          hash: targetHash.length > 16 ? targetHash.substring(0, 16) + '...' : targetHash,
          type: typeInfo.type,
          password: ['password123', 'admin', 'qwerty', 'dragon', 'letmein1'][Math.floor(Math.random() * 5)],
          time: `${(elapsed / 10).toFixed(1)}s`,
          method: activeAttackTab
        }, ...prev]);

        logAudit(`Cracked: ${targetHash.substring(0, 8)}... → Success`);
      }

      if (percent >= 100 || crackedCount === hashStats.count) {
        clearInterval(timerRef.current);
        setStatus('completed');
        logAudit(`Attack completed: ${crackedCount}/${hashStats.count} hashes cracked in ${elapsed}s.`);
        setProgress(p => ({ ...p, percent: 100, tested: total, speed: 0, remaining: 0, cracked: crackedCount }));
      } else {
        setProgress({
          percent, speed, elapsed, remaining, tested: currentTested, total, cracked: crackedCount, failed: 0
        });
      }
    }, 1000);
  };

  const stopCracking = () => {
    clearInterval(timerRef.current);
    setStatus('idle');
    logAudit(`Attack manually stopped by user.`);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 md:p-8 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Lock className="w-8 h-8 text-indigo-500" />
            Password Cracker
          </h1>
          <p className="text-slate-400 mt-1">Advanced multi-algorithm hash decryption suite</p>
        </div>
        <div className="flex gap-3">
          {status === 'idle' || status === 'completed' ? (
            <button
              onClick={startCracking}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Start Attack
            </button>
          ) : (
            <button
              onClick={stopCracking}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-rose-500/20 transition-all active:scale-95"
            >
              <Square className="w-4 h-4" fill="currentColor" />
              Stop Attack
            </button>
          )}
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">

        {/* LEFT COLUMN: Input */}
        <div className="xl:col-span-5 space-y-6">
          <Card title="Hash Input Source" icon={Key} headerAccent="bg-indigo-500">
            <div className="flex border border-slate-700/60 rounded-lg p-1 bg-slate-900/50 mb-4">
              <button
                onClick={() => setInputType('direct')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inputType === 'direct' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Direct Input
              </button>
              <button
                onClick={() => setInputType('file')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inputType === 'file' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                File Upload
              </button>
            </div>

            {inputType === 'direct' ? (
              <div className="space-y-3">
                <textarea
                  value={hashes}
                  onChange={(e) => setHashes(e.target.value)}
                  placeholder="Paste hashes here (one per line)...&#10;Example: 5f4dcc3b5aa765d61d8327deb882cf99"
                  className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm font-mono text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none placeholder:text-slate-600"
                />
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Auto-trimming spaces & newlines</span>
                  <span>{hashStats.count} Hash(es) Detected</span>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-slate-950/50 hover:bg-slate-900 transition-colors">
                <Upload className="w-10 h-10 text-slate-500 mb-3" />
                <p className="text-slate-300 font-medium mb-1">Drag & Drop hash file here</p>
                <p className="text-slate-500 text-sm mb-4">Supports .txt, .csv, .json (Max 10MB)</p>
                <label className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors border border-slate-600">
                  Browse Files
                  <input type="file" className="hidden" accept=".txt,.csv,.json" onChange={handleFileUpload} />
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-md flex items-center gap-3 text-indigo-300 text-sm w-full">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate flex-1 text-left">{file.name}</span>
                    <span className="shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                )}
              </div>
            )}

            {/* Auto-Detection Results */}
            {hashStats.count > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Format Detection</h4>
                <div className="space-y-2">
                  {Object.entries(hashStats.types).map(([type, count]) => {
                    const info = detectHash(type === 'Unknown' ? '' : hashes.split('\n').find(h => detectHash(h)?.type === type) || '') || { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30', desc: '' };
                    return (
                      <div key={type} className={`flex items-center justify-between p-2.5 rounded-lg border ${info.border} ${info.bg}`}>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${info.color}`}>{type}</span>
                          <span className="text-xs text-slate-400">{info.desc}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-300 bg-slate-900/50 px-2 py-1 rounded-full border border-slate-700">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: Attack Settings */}
        <div className="xl:col-span-7 space-y-6">
          <Card title="Attack Configuration" icon={Shield} headerAccent="bg-emerald-500" className="h-full">
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-700/60 pb-1 mb-5">
              {[
                { id: 'dictionary', icon: Book, label: 'Dictionary' },
                { id: 'bruteforce', icon: Hash, label: 'Brute Force' },
                { id: 'hybrid', icon: Zap, label: 'Hybrid' },
                { id: 'mask', icon: Type, label: 'Mask' },
                { id: 'rainbow', icon: Database, label: 'Rainbow Table' }
              ].map(tab => (
                <TabButton
                  key={tab.id} active={activeAttackTab === tab.id}
                  onClick={() => setActiveAttackTab(tab.id)} icon={tab.icon} label={tab.label}
                />
              ))}
            </div>

            <div className="min-h-[280px]">
              {/* Dictionary Attack */}
              {activeAttackTab === 'dictionary' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Wordlist</label>
                    <select
                      value={dictConfig.wordlist} onChange={(e) => setDictConfig({ ...dictConfig, wordlist: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="rockyou.txt">rockyou.txt (14.3M words)</option>
                      <option value="kaonashi.txt">kaonashi.txt (120M words)</option>
                      <option value="crackstation.txt">crackstation.txt (1.4B words)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-lg border border-slate-700/50 text-sm">
                    <FileDigit className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="text-slate-300">Path: <span className="font-mono text-emerald-400">/wordlists/{dictConfig.wordlist}</span></p>
                      <p className="text-slate-500 mt-0.5">Total Words: {dictConfig.wordlist === 'rockyou.txt' ? '14,344,392' : 'Unknown'} • Est. Time: ~2 mins</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 rounded-md transition-colors">
                      <Upload className="w-4 h-4" /> Upload Custom Wordlist
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Brute Force Attack */}
              {activeAttackTab === 'bruteforce' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">Character Set</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'lower', label: 'Lowercase (a-z)' },
                        { id: 'upper', label: 'Uppercase (A-Z)' },
                        { id: 'digits', label: 'Digits (0-9)' },
                        { id: 'special', label: 'Special (!@#$)' }
                      ].map(opt => (
                        <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${bfConfig[opt.id] ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 group-hover:border-slate-400 bg-slate-900'}`}>
                            {bfConfig[opt.id] && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <input type="checkbox" className="hidden" checked={bfConfig[opt.id]} onChange={() => setBfConfig({ ...bfConfig, [opt.id]: !bfConfig[opt.id] })} />
                          <span className="text-sm text-slate-300 group-hover:text-white">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Custom Characters</label>
                    <input
                      type="text" placeholder="e.g. ? * + = -" value={bfConfig.custom} onChange={(e) => setBfConfig({ ...bfConfig, custom: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Min Length: {bfConfig.minLen}</label>
                      <input type="range" min="1" max="15" value={bfConfig.minLen} onChange={(e) => setBfConfig({ ...bfConfig, minLen: parseInt(e.target.value) })} className="w-full accent-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Max Length: {bfConfig.maxLen}</label>
                      <input type="range" min="1" max="15" value={bfConfig.maxLen} onChange={(e) => setBfConfig({ ...bfConfig, maxLen: parseInt(e.target.value) })} className="w-full accent-indigo-500" />
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Combinations:</span>
                    <span className="font-mono text-indigo-300 font-medium">~7.2 × 10^12</span>
                  </div>
                </motion.div>
              )}

              {/* Hybrid Attack */}
              {activeAttackTab === 'hybrid' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Base Wordlist</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                        <option>rockyou.txt</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Ruleset</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                        <option>best64.rule</option>
                        <option>d3ad0ne.rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Quick Rule Modifiers</h4>
                    <div className="space-y-2">
                      {[
                        { id: 'appendNum', label: 'Append numbers (0-999)' },
                        { id: 'prependWords', label: 'Prepend common prefixes' },
                        { id: 'leet', label: 'Leet speak variations (a→@, e→3)' },
                        { id: 'caseVar', label: 'Case toggling (upper/lower/cap)' }
                      ].map(opt => (
                        <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="rounded border-slate-600 text-indigo-500 focus:ring-indigo-500 bg-slate-950" checked={hybridConfig[opt.id]} onChange={() => setHybridConfig({ ...hybridConfig, [opt.id]: !hybridConfig[opt.id] })} />
                          <span className="text-sm text-slate-400 group-hover:text-slate-200">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mask Attack */}
              {activeAttackTab === 'mask' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Custom Mask</label>
                    <input
                      type="text" value={maskConfig.mask} onChange={(e) => setMaskConfig({ mask: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-lg font-mono text-emerald-400 focus:ring-2 focus:ring-indigo-500 outline-none tracking-widest text-center"
                    />
                    <p className="text-center text-xs text-slate-500 mt-2">Example translates to: "pass12"</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {[
                      { code: '?l', desc: 'Lowercase' }, { code: '?u', desc: 'Uppercase' },
                      { code: '?d', desc: 'Digit' }, { code: '?s', desc: 'Special' },
                      { code: '?a', desc: 'All above' }, { code: '?b', desc: 'Binary' }
                    ].map(w => (
                      <div key={w.code} className="bg-slate-900 border border-slate-700 rounded p-2 flex items-center justify-between">
                        <span className="font-mono text-indigo-400 font-bold">{w.code}</span>
                        <span className="text-xs text-slate-400">{w.desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Rainbow Table */}
              {activeAttackTab === 'rainbow' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-500">Storage Warning</h4>
                      <p className="text-xs text-amber-400/70 mt-1">Rainbow tables require significant disk space. Ensure you have at least 200GB free for comprehensive tables.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Pre-computed Table</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                      <option>MD5_loweralpha_numeric_1-8 (42 GB)</option>
                      <option>SHA1_mixalpha_numeric_1-7 (115 GB)</option>
                      <option>NTLM_all_1-8 (89 GB)</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* --- ADVANCED OPTIONS (Collapsible) --- */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors mb-2"
        >
          <Settings className="w-4 h-4" /> Advanced Options
          <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }}><ChevronDown className="w-4 h-4" /></motion.div>
        </button>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-900/60 border border-slate-700/60 rounded-xl backdrop-blur-md mt-2">
                <div className="space-y-4">
                  <div>
                    <label className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Worker Threads</span> <span className="text-indigo-400">{advConfig.threads}</span>
                    </label>
                    <input type="range" min="1" max="32" value={advConfig.threads} onChange={(e) => setAdvConfig({ ...advConfig, threads: e.target.value })} className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>RAM Limit (MB)</span> <span className="text-indigo-400">{advConfig.ram} MB</span>
                    </label>
                    <input type="range" min="512" max="8192" step="512" value={advConfig.ram} onChange={(e) => setAdvConfig({ ...advConfig, ram: e.target.value })} className="w-full accent-indigo-500" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={advConfig.caseSensitive} onChange={() => setAdvConfig({ ...advConfig, caseSensitive: !advConfig.caseSensitive })} className="rounded border-slate-600 bg-slate-950 text-indigo-500 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-300">Case-insensitive matching</span>
                  </label>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Manual Salt (Optional)</label>
                    <input type="text" placeholder="Auto-detect if empty" value={advConfig.salt} onChange={(e) => setAdvConfig({ ...advConfig, salt: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- PROGRESS DASHBOARD (Visible when running/completed) --- */}
      <AnimatePresence>
        {(status === 'running' || status === 'completed') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#0B1120] border border-indigo-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.1)] relative"
          >
            {/* Animated BG sweep */}
            {status === 'running' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-500"
                  animate={{ width: `${progress.percent}%` }}
                  transition={{ ease: "linear", duration: 0.5 }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

              {/* Terminal Stats Box */}
              <div className="lg:col-span-1 border-r border-slate-800/60 p-5 font-mono text-sm">
                <div className="flex items-center gap-2 text-indigo-400 mb-4 font-bold border-b border-slate-800 pb-2">
                  <Terminal className="w-4 h-4" />
                  {status === 'running' ? '🔄 STATUS: Cracking in Progress...' : '✅ STATUS: Attack Completed'}
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between"><span>Progress:</span> <span className="text-white">{progress.percent.toFixed(2)}%</span></div>
                  <div className="flex justify-between"><span>Speed:</span> <span className="text-emerald-400">{formatNumber(progress.speed)} H/s</span></div>
                  <div className="flex justify-between"><span>Elapsed:</span> <span>{formatTime(progress.elapsed)}</span></div>
                  <div className="flex justify-between"><span>Remaining:</span> <span className="text-amber-400">{formatTime(progress.remaining)}</span></div>
                  <div className="flex justify-between"><span>Tested:</span> <span>{formatNumber(progress.tested)}</span></div>
                  <div className="w-full h-px bg-slate-800 my-2"></div>
                  <div className="flex justify-between"><span>Cracked:</span> <span className="text-emerald-500 font-bold">{progress.cracked} hash(es)</span></div>
                  <div className="flex justify-between"><span>Failed:</span> <span className="text-rose-500">{progress.failed}</span></div>
                </div>
              </div>

              {/* Live Feed Table */}
              <div className="lg:col-span-2 bg-slate-950/50 p-5 flex flex-col h-64">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Live Decryption Feed
                </h4>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  <AnimatePresence>
                    {liveFeed.map((item) => (
                      <motion.div
                        key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2.5 bg-slate-900 border border-emerald-500/20 rounded-md text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="font-mono text-slate-400">{item.hash}</span>
                          <span className="text-emerald-400 font-mono font-bold">→ {item.password}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500 font-mono">
                          <span>{item.type}</span>
                          <span>{item.time}</span>
                        </div>
                      </motion.div>
                    ))}
                    {status === 'running' && liveFeed.length === 0 && (
                      <div className="text-center text-slate-500 py-10 font-mono animate-pulse">Awaiting first successful crack...</div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESULTS SECTION --- */}
      <Card className="min-h-[400px]">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-700/60 pb-1 mb-5">
          {[
            { id: 'results', icon: CheckCircle, label: 'Cracked Passwords' },
            { id: 'stats', icon: BarChart3, label: 'Statistics' },
            { id: 'history', icon: History, label: 'Session History' },
            { id: 'log', icon: Terminal, label: 'Audit Log' }
          ].map(tab => (
            <TabButton
              key={tab.id} active={activeResultTab === tab.id}
              onClick={() => setActiveResultTab(tab.id)} icon={tab.icon} label={tab.label}
            />
          ))}
        </div>

        <div>
          {/* Results Table */}
          {activeResultTab === 'results' && (
            <div className="space-y-4">
              <div className="flex justify-end gap-2 mb-2">
                <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors" title="Download TXT"><Download className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors" title="Copy to Clipboard"><Copy className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors" title="Email Results"><Mail className="w-4 h-4" /></button>
              </div>
              <div className="overflow-x-auto border border-slate-700/50 rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700/50">
                    <tr>
                      <th className="p-3 font-medium">#</th>
                      <th className="p-3 font-medium">Hash</th>
                      <th className="p-3 font-medium">Type</th>
                      <th className="p-3 font-medium">Password</th>
                      <th className="p-3 font-medium">Time</th>
                      <th className="p-3 font-medium">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {liveFeed.length > 0 ? liveFeed.map((r, i) => (
                      <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3 text-slate-500">{i + 1}</td>
                        <td className="p-3 font-mono text-slate-300">{r.hash}</td>
                        <td className="p-3 text-slate-400">{r.type}</td>
                        <td className="p-3 font-mono text-emerald-400 font-bold">{r.password}</td>
                        <td className="p-3 text-slate-400">{r.time}</td>
                        <td className="p-3 text-slate-500 capitalize">{r.method}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" className="p-8 text-center text-slate-500">No cracked passwords yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Statistics Placeholder */}
          {activeResultTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-5 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center mb-3 text-2xl font-bold text-white">
                  {progress.total > 0 ? Math.round((progress.cracked / hashStats.count) * 100) : 0}%
                </div>
                <h4 className="text-slate-400 text-sm">Overall Success Rate</h4>
              </div>
              <div className="md:col-span-2 bg-slate-900 border border-slate-700/50 rounded-lg p-5 flex items-center justify-center">
                <div className="text-slate-500 flex items-center gap-2"><Activity className="w-5 h-5" /> Performance Graph (Requires Data)</div>
              </div>
            </div>
          )}

          {/* Session History */}
          {activeResultTab === 'history' && (
            <div className="space-y-3">
              {[
                { date: '2024-05-08 14:30', method: 'Dictionary (rockyou)', hashes: '500', cracked: '482', time: '1m 24s' },
                { date: '2024-05-07 09:15', method: 'Brute Force (Lower, Num)', hashes: '1', cracked: '1', time: '4h 12m' }
              ].map((h, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900 border border-slate-700/50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{h.method}</h4>
                    <p className="text-xs text-slate-500 mt-1">{h.date} • {h.time}</p>
                  </div>
                  <div className="flex items-center gap-6 mt-3 sm:mt-0">
                    <div className="text-right">
                      <p className="text-sm text-emerald-400 font-bold">{h.cracked} / {h.hashes}</p>
                      <p className="text-xs text-slate-500">Cracked</p>
                    </div>
                    <button className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-md transition-colors"><RotateCcw className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Audit Log */}
          {activeResultTab === 'log' && (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs text-slate-400 space-y-1 custom-scrollbar">
              {auditLog.map((log, i) => (
                <div key={i} className={log.includes('Cracked:') ? 'text-emerald-400' : log.includes('stopped') || log.includes('failed') ? 'text-rose-400' : ''}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

    </div>
  );
}
