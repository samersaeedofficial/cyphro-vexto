import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Signal,
  Users,
  Search,
  ChevronRight,
  Shield,
  Activity,
  Plus,
  Target,
} from "lucide-react";
import WifiHistory from "./components/WifiHistory";
import AttackModal from "./components/AttackModal";
import FullDiscovery from "./components/FullDiscovery";

// ─── Constants ─────────────────────────────────────────────────────────────
const CURRENT_WIFI = {
  ssid: "Cyphro_Secure_Net",
  strength: 85,
  clients: 12,
  security: "WPA3",
  frequency: "5.0 GHz",
  ip: "192.168.1.105",
  channel: 36,
  uptime: "2d 14h 32m"
};

const WifiAnalyzer = () => {
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard' or 'discovery'
  const [isAttackModalOpen, setIsAttackModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-slate-950/20">
      <AnimatePresence mode="wait">
        {activeView === "dashboard" ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full space-y-12 p-4 md:p-8 lg:p-12 will-change-transform"
          >
            {/* ─── Top Header Section ────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <Wifi className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent tracking-tight">
                    Network Command
                  </h1>
                </div>
                <p className="text-slate-500 font-mono text-xs ml-[3.5rem] tracking-wider uppercase">
                  Strategic Wireless Intelligence & Defense
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <button 
                  onClick={() => setActiveView("discovery")}
                  className="px-6 py-3 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 group"
                >
                  <Search className="w-4 h-4 transition-transform group-hover:scale-105" />
                  Full Discovery
                </button>
                <button 
                  onClick={() => setIsAttackModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.1)] group"
                >
                  <Target className="w-4 h-4" />
                  Launch Targeted Attack
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </button>
              </motion.div>
            </div>

            {/* ─── Active Connection Panel ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group overflow-hidden rounded-[2.5rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-3 block">Primary Interface</span>
                      <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        {CURRENT_WIFI.ssid}
                        <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                      </h2>
                      <div className="flex flex-wrap gap-4 text-slate-400 text-xs font-mono">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5"><Shield className="w-3.5 h-3.5" /> {CURRENT_WIFI.security}</span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5"><Activity className="w-3.5 h-3.5" /> {CURRENT_WIFI.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">Active Clients</div>
                      <div className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-cyan-500/50" />
                        {CURRENT_WIFI.clients}
                      </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-widest">Signal Health</div>
                      <div className="text-2xl font-bold text-white flex items-center gap-2">
                        <Signal className="w-5 h-5 text-cyan-500/50" />
                        {CURRENT_WIFI.strength}%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-colors flex items-center justify-center gap-3 group">
                      Deep Traffic Analysis
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <div className="flex items-center justify-between px-2 text-[10px] font-mono text-slate-500 uppercase">
                      <span>Uptime: {CURRENT_WIFI.uptime}</span>
                      <span>CH: {CURRENT_WIFI.channel}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            <WifiHistory />
          </motion.div>
        ) : (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full p-4 md:p-8 lg:p-12"
          >
            <FullDiscovery 
              onBack={() => setActiveView("dashboard")} 
              onStartAttack={() => setIsAttackModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AttackModal 
        isOpen={isAttackModalOpen} 
        onClose={() => setIsAttackModalOpen(false)} 
      />
    </div>
  );
};

export default memo(WifiAnalyzer);
