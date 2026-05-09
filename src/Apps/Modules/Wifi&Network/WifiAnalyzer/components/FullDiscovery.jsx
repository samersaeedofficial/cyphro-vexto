import React, { useState, useEffect, memo, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Wifi,
  Signal,
  Search,
  X,
  Lock,
  Target,
  Loader2,
  Clock,
  ArrowDownWideNarrow,
  ChevronDown,
  AlertTriangle,
  RotateCcw,
  Play,
} from "lucide-react";

const FullDiscovery = ({ onBack, onStartAttack }) => {
  const [networks, setNetworks] = useState([]);
  const [isStopping, setIsStopping] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isExitLoading, setIsExitLoading] = useState(false);
  const filterRef = useRef(null);

  // Mock data generation
  const mockNames = ["TP-Link_Secure_Corporate", "Home_5G_Ultra", "Office_Guest_Public", "Cyber_Den", "Dark_Net_Nexus", "Void_Link_Static"];
  const mockBSSIDs = ["BC:24:11:88:FF:02", "E4:95:6E:44:A2:10", "00:AF:91:2C:11:99", "D1:99:32:00:FF:E2"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilters(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      const newNetwork = {
        id: Math.random().toString(36).substr(2, 9),
        ssid: mockNames[Math.floor(Math.random() * mockNames.length)] + " " + (networks.length + 1),
        bssid: mockBSSIDs[Math.floor(Math.random() * mockBSSIDs.length)],
        signal: Math.floor(Math.random() * 60) + 40,
        channel: Math.floor(Math.random() * 11) + 1,
        security: ["WPA2", "WPA3", "Open"][Math.floor(Math.random() * 3)],
        clients: Math.floor(Math.random() * 10),
        timestamp: Date.now()
      };
      setNetworks(prev => [...prev, newNetwork]);
    }, 2000);
    return () => clearInterval(interval);
  }, [networks.length, isScanning]);

  const sortedNetworks = useMemo(() => {
    let result = [...networks];
    switch (sortBy) {
      case 'signal-high': result.sort((a, b) => b.signal - a.signal); break;
      case 'signal-low': result.sort((a, b) => a.signal - b.signal); break;
      case 'alphabetical': result.sort((a, b) => a.ssid.localeCompare(b.ssid)); break;
      default: result;
    }
    return result;
  }, [networks, sortBy]);

  const handleConfirmCancel = () => {
    setIsExitLoading(true);
    setTimeout(() => {
      setShowCancelModal(false);
      onBack();
    }, 2000);
  };

  const getSignalColor = (strength) => {
    if (strength > 75) return "text-emerald-400";
    if (strength > 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="w-full min-h-screen relative space-y-8 animate-in fade-in duration-700">

      {/* Top Navigation & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Active Spectrum Discovery</h2>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase mt-1">
              <span className={`flex h-2 w-2 rounded-full bg-cyan-500 ${isScanning ? 'animate-pulse' : ''}`} />
              {isScanning ? 'Live Scan in progress...' : 'Scan Paused'} | {networks.length} targets found
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={filterRef}>
            <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:text-white transition-all flex items-center gap-2">
              <ArrowDownWideNarrow className="w-4 h-4" />
              Sort By
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full right-0 mt-3 z-[60] w-56 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-3xl border border-white/10 shadow-2xl">
                  {[{ id: 'recent', label: 'Recent First', icon: Clock }, { id: 'signal-high', label: 'Strongest Signal', icon: Signal }, { id: 'signal-low', label: 'Weakest Signal', icon: Signal }, { id: 'alphabetical', label: 'Alphabetical (A-Z)', icon: Search }].map((filter) => (
                    <button key={filter.id} onClick={() => { setSortBy(filter.id); setShowFilters(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${sortBy === filter.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                      <filter.icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setShowCancelModal(true)} className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500/20 transition-all flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel Scan
          </button>

          <button
            disabled={networks.length === 0}
            onClick={() => {
              if (isStopping) {
                setIsStopping(false);
                setIsScanning(true);
                setSelectedNetwork(null);
              } else {
                setIsScanning(false);
                setIsStopping(true);
              }
            }}
            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:grayscale flex items-center gap-2 ${isStopping ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-cyan-600 to-blue-600 text-white shadow-cyan-500/20'}`}
          >
            {isStopping ? <Play className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {isStopping ? "Resume Attack" : "Stop Attack"}
          </button>
        </div>
      </div>

      {/* Discovery Table */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Network SSID</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">BSSID / MAC</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Signal</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Channel</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Clients</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {sortedNetworks.map((net) => (
                  <motion.tr key={net.id} layout={!isScanning} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }} onClick={() => isStopping && setSelectedNetwork(net.id)} className={`border-b border-white/5 cursor-pointer transition-all ${selectedNetwork === net.id ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' : ''}`}>
                    <td className="px-8 py-6"><div className="flex items-center gap-3 max-w-[250px]"><div className={`p-2 rounded-lg bg-white/5 ${selectedNetwork === net.id ? 'text-cyan-400' : 'text-slate-400'}`}><Wifi className="w-4 h-4" /></div><span className={`font-bold transition-colors truncate ${selectedNetwork === net.id ? 'text-cyan-400' : 'text-white'}`}>{net.ssid}</span></div></td>
                    <td className="px-8 py-6 font-mono text-xs text-slate-400">{net.bssid}</td>
                    <td className="px-8 py-6"><div className="flex items-center gap-2"><Signal className={`w-4 h-4 ${getSignalColor(net.signal)}`} /><span className={`font-mono text-sm font-bold ${getSignalColor(net.signal)}`}>{net.signal}%</span></div></td>
                    <td className="px-8 py-6"><span className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-slate-300 border border-white/5">CH {net.channel}</span></td>
                    <td className="px-8 py-6"><div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-slate-500" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{net.security}</span></div></td>
                    <td className="px-8 py-6 text-sm font-bold text-white">{net.clients}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {networks.length === 0 && (
                <tr><td colSpan="6" className="px-8 py-24 text-center"><div className="flex flex-col items-center gap-4"><Loader2 className="w-10 h-10 text-cyan-500 animate-spin" /><p className="text-slate-500 font-mono text-sm animate-pulse">Initializing Global Spectrum Analysis...</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target Selection Overlay */}
      <div className="flex justify-center w-full">
        <AnimatePresence>
          {isStopping && (
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-10 left-0 right-0 z-50 pointer-events-none flex justify-center">
              <div className="w-full max-w-5xl px-4 pointer-events-auto ml-0 md:ml-64 lg:ml-72 transition-all duration-300">
                <div className="bg-slate-900/90 backdrop-blur-3xl border border-cyan-500/30 p-5 px-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-400"><Target className="w-7 h-7" /></div>
                    <div><h4 className="text-xl font-bold text-white tracking-tight">Select Acquisition Target</h4><p className="text-sm text-slate-500 mt-0.5">Click a row in the discovery table to synchronize attack protocol</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => { setIsStopping(false); setSelectedNetwork(null); setIsScanning(true); }} className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 text-xs font-bold hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">Resume Discovery</button>
                    <AnimatePresence>{selectedNetwork && (<motion.button initial={{ opacity: 0, scale: 0.8, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} onClick={() => onStartAttack(networks.find(n => n.id === selectedNetwork))} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_20px_rgba(6,182,212,0.4)] hover:scale-[1.05] active:scale-[0.95] transition-all whitespace-nowrap">Launch Attack</motion.button>)}</AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cancel Confirmation Modal / Loading Overlay */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isExitLoading && setShowCancelModal(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full ${isExitLoading ? 'max-w-xl' : 'max-w-md'} bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500`}
            >
              <AnimatePresence mode="wait">
                {isExitLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-12 flex flex-col items-center text-center space-y-8"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    >
                      <RotateCcw className="w-16 h-16 text-red-500" />
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white tracking-tighter">TERMINATING SCAN</h3>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-red-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Purging Discovery Cache
                        </div>
                        <p className="text-slate-500 text-[10px] font-mono max-w-xs">
                          Securely clearing {networks.length} identified network profiles from memory...
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.8 }}
                        className="h-full bg-gradient-to-r from-red-500 to-amber-500 shadow-[0_0_10px_#ef4444]"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-8 pb-4 flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Abort Discovery?</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Stopping the scan will immediately clear all <span className="text-white font-bold">{networks.length} identified networks</span> from memory. This action cannot be reversed.</p>
                    </div>
                    <div className="p-8 flex flex-col gap-3">
                      <button onClick={handleConfirmCancel} className="w-full py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">Confirm Abort</button>
                      <button onClick={() => setShowCancelModal(false)} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 font-bold hover:text-white transition-all">Cancel & Resume</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(FullDiscovery);
