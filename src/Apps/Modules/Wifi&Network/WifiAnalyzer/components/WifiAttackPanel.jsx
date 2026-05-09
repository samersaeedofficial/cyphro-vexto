import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Shield,
  Signal,
  Cpu,
  Users,
  Clock,
  Globe,
  Zap,
  Target,
  ArrowLeft,
  Search,
  Activity,
  Terminal,
  Lock,
  ChevronRight,
  Database,
  Smartphone,
  HardDrive,
  Network,
  Share2,
  Bug,
  Eye,
  ShieldAlert,
  Ghost,
  ShieldOff
} from "lucide-react";

const ATTACK_CATEGORIES = {
  WEP: [
    { id: "arp_replay", name: "ARP Request Replay Attack", icon: Zap, desc: "Captures and replays ARP packets to generate new IVs." },
    { id: "chop_chop", name: "Chop-Chop Attack", icon: Bug, desc: "Decrypts WEP packets without knowing the key." },
    { id: "frag", name: "Fragmentation Attack", icon: HardDrive, desc: "Obtains 1500 bytes of PRGA from a single packet." },
    { id: "hirte", name: "Hirte Attack", icon: Ghost, desc: "Client-side attack using a fragmentation and chop-chop method." },
    { id: "caffe", name: "Caffe Latte Attack", icon: Activity, desc: "Retrieves WEP key from a client without an AP." },
    { id: "fake_auth", name: "Fake Authentication Attack", icon: ShieldAlert, desc: "Authenticates with an AP to allow packet injection." },
  ],
  WPA: [
    { id: "handshake", name: "Handshake Capture (Deauth)", icon: Zap, desc: "Forces clients to reconnect to capture WPA/WPA2 handshake." },
    { id: "pmkid", name: "PMKID Attack", icon: Target, desc: "Clientless attack targeting the Robust Security Network." },
    { id: "dictionary", name: "Dictionary Attack (Wordlist)", icon: Database, desc: "Attempts to crack handshakes using a password list." },
    { id: "evil_twin", name: "Evil Twin Attack", icon: Globe, desc: "Creates a rogue access point to lure victims." },
    { id: "wps_pixie", name: "WPS PIN Attack (Pixie Dust)", icon: Cpu, desc: "Exploits WPS vulnerabilities for instant recovery." },
    { id: "krack", name: "KRACK Attack", icon: Bug, desc: "Key Reinstallation Attack exploiting WPA2 protocol." },
  ],
  Post: [
    { id: "arp_spoof", name: "ARP Spoofing/Poisoning", icon: Share2, desc: "Intercepts traffic between two devices on a network." },
    { id: "dns_spoof", name: "DNS Spoofing", icon: Globe, desc: "Redirects victims to malicious websites by poisoning DNS cache." },
    { id: "ssl_strip", name: "SSL Strip", icon: ShieldOff, desc: "Downgrades HTTPS connections to HTTP for interception." },
    { id: "session_hijack", name: "Session Hijacking", icon: Ghost, desc: "Takes over an active session between client and server." },
    { id: "sniffing", name: "Packet Sniffing", icon: Eye, desc: "Real-time monitoring of unencrypted network traffic." },
    { id: "mitm", name: "Man-in-the-Middle Attack", icon: Terminal, desc: "Full interception and modification of network data." },
  ]
};

const WifiAttackPanel = ({ network, onBack }) => {
  const [activeTab, setActiveTab] = useState("WPA");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for connected clients
  const clients = [
    { mac: "DC:A6:32:11:22:33", ip: "192.168.1.12", hostname: "Samer-iPhone", vendor: "Apple Inc.", packets: "1.2k", status: "Connected" },
    { mac: "00:0C:29:44:55:66", ip: "192.168.1.45", hostname: "Workstation-01", vendor: "VMware, Inc.", packets: "850", status: "Connected" },
    { mac: "B4:F0:B2:77:88:99", ip: "192.168.1.8", hostname: "Smart-TV", vendor: "Samsung Electronics", packets: "3.4k", status: "Disconnected" },
    { mac: "70:85:C2:AA:BB:CC", ip: "192.168.1.101", hostname: "Android-Tab", vendor: "Xiaomi Communications", packets: "520", status: "Connected" },
    { mac: "E8:94:F6:DD:EE:FF", ip: "192.168.1.50", hostname: "Home-PC", vendor: "TP-Link Corporation", packets: "12k", status: "Connected" },
  ];

  const currentTabAttacks = useMemo(() => ATTACK_CATEGORIES[activeTab] || [], [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full space-y-8 will-change-transform"
    >
      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="flex items-start gap-5">
          <button
            onClick={onBack}
            className="mt-1 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
          <div className="space-y-0.5">
            <h1 className="text-4xl font-black text-white tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {network?.ssid || "Target Network"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Primary Target</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{network?.security || "WPA2-PSK"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{network?.vendor || "TP-Link Technologies"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Device Target</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">First Seen</span>
              <span className="text-xs font-bold text-slate-300 font-mono">23:14:02</span>
            </div>
            <div className="w-px h-6 bg-white/5" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Uptime</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">02:45:18</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</span>
              <span className="text-xs font-bold text-emerald-400">Linked</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Network Intelligence Section ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 transform-gpu">
        {/* Core Technical Profile */}
        <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group will-change-[backdrop-filter,transform]">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu className="w-32 h-32 text-white" />
          </div>
          <div className="relative space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2 block">Technical Profile</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">Interface Parameters</h3>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                <Database className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telemetry Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">BSSID / MAC</span>
                </div>
                <span className="font-mono text-sm font-bold text-white tracking-widest truncate">{network?.bssid || "FF:FF:FF:FF:FF:FF"}</span>
              </div>

              <div className="flex flex-col gap-2 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Channel Configuration</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 font-black text-[10px] border border-cyan-500/20 uppercase tracking-widest">CH {network?.channel || 1}</span>
                  <span className="text-xs text-slate-500 font-mono">2.412 GHz</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signal & Performance */}
        <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between group will-change-[backdrop-filter,transform]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] block">Signal Strength</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500">-{100 - (network?.signal || 0)} dBm</span>
                <Signal className="w-3 h-3 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-end justify-between">
                <h4 className="text-5xl font-black text-white">{network?.signal || 0}<span className="text-xl text-slate-500 ml-1">%</span></h4>
                <div className="flex items-end gap-1 mb-1">
                  {[15, 30, 45, 60, 75, 90].map((step, i) => (
                    <div
                      key={step}
                      className={`w-1 rounded-full transition-all duration-500 ${network?.signal >= step ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-white/10'}`}
                      style={{ height: `${(i + 1) * 6}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${network?.signal || 0}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-xs font-bold text-slate-300">{network?.clients || 0} Clients Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Connected Clients Table ───────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
            <Users className="w-5 h-5 text-cyan-400" />
            Connected Clients
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search MAC/IP..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-all w-64"
              />
            </div>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-[2.5rem] overflow-hidden bg-slate-900/40 backdrop-blur-lg border border-white/5 shadow-2xl transform-gpu">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">MAC Address</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">IP Address</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Hostname</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Vendor</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Packets</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, idx) => (
                  <motion.tr
                    key={client.mac}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="border-b border-white/5 transition-colors cursor-default"
                  >
                    <td className="px-8 py-5 font-mono text-xs text-cyan-400/80">{client.mac}</td>
                    <td className="px-8 py-5 font-mono text-xs text-slate-300">{client.ip}</td>
                    <td className="px-8 py-5 font-bold text-white text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                        {client.hostname}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-400">{client.vendor}</td>
                    <td className="px-8 py-5 text-xs font-mono text-slate-300">{client.packets}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${client.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {client.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Attack Categories Section ─────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
            <Target className="w-5 h-5 text-red-500" />
            Attack Vectors
          </h3>
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            {[
              { id: "WEP", label: "WEP Attacks", icon: Lock },
              { id: "WPA", label: "WPA/WPA2", icon: Shield },
              { id: "Post", label: "Post-Connection", icon: Network }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {currentTabAttacks.map((attack, idx) => (
              <motion.div
                key={attack.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                <div className="relative h-full bg-slate-900/40 backdrop-blur-lg border border-white/5 p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all flex flex-col justify-between group-hover:-translate-y-1 transform-gpu will-change-transform">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                        <attack.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{attack.name}</h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">{attack.desc}</p>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all">
                    Initialize vector
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(WifiAttackPanel);
