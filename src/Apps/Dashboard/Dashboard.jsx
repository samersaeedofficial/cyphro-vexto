import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Wifi,
  ScanLine,
  Eye,
  Key,
  ShieldAlert,
  Users,
  Brain,
  Zap,
  Lock,
  VenetianMask,
  FileText,
  Terminal,
  Activity,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Radio,
  Network,
  Database,
  Code2,
  Bug,
  Cpu,
  BarChart3,
  FileSearch,
  Mail,
  Search,
} from "lucide-react";
import { DashboardLayout } from "@/Apps/Dashboard/layout/DashboardLayout";

const MODULE_CARDS = [
  {
    id: "wifi-analyzer",
    label: "WiFi Analyzer",
    icon: Wifi,
    color: "#00d4ff",
    cat: "Network",
  },
  {
    id: "port-scanner",
    label: "Port Scanner",
    icon: ScanLine,
    color: "#00d4ff",
    cat: "Network",
  },
  {
    id: "packet-sniffer",
    label: "Packet Sniffer",
    icon: Radio,
    color: "#00d4ff",
    cat: "Network",
  },
  {
    id: "mitm",
    label: "MitM Attack",
    icon: Network,
    color: "#00d4ff",
    cat: "Network",
  },
  {
    id: "dns-tools",
    label: "DNS Tools",
    icon: Globe,
    color: "#00d4ff",
    cat: "Network",
  },
  {
    id: "phishing",
    label: "Phishing Manager",
    icon: Mail,
    color: "#c084fc",
    cat: "Social Eng",
  },
  {
    id: "social-engineering",
    label: "SE Toolkit",
    icon: Users,
    color: "#c084fc",
    cat: "Social Eng",
  },
  {
    id: "email-spoofing",
    label: "Email Spoofing",
    icon: AlertTriangle,
    color: "#c084fc",
    cat: "Social Eng",
  },
  {
    id: "osint",
    label: "OSINT Framework",
    icon: Eye,
    color: "#facc15",
    cat: "OSINT",
  },
  {
    id: "recon",
    label: "Reconnaissance",
    icon: Search,
    color: "#facc15",
    cat: "OSINT",
  },
  {
    id: "metadata",
    label: "Metadata Extractor",
    icon: FileSearch,
    color: "#facc15",
    cat: "OSINT",
  },
  {
    id: "web-scanner",
    label: "Web Scanner",
    icon: ShieldAlert,
    color: "#fb923c",
    cat: "Web Vuln",
  },
  {
    id: "sql-injection",
    label: "SQL Injection",
    icon: Database,
    color: "#fb923c",
    cat: "Web Vuln",
  },
  {
    id: "xss",
    label: "XSS Suite",
    icon: Code2,
    color: "#fb923c",
    cat: "Web Vuln",
  },
  {
    id: "dir-bruteforce",
    label: "Dir Bruteforcer",
    icon: ScanLine,
    color: "#fb923c",
    cat: "Web Vuln",
  },
  {
    id: "password-cracker",
    label: "Password Cracker",
    icon: Key,
    color: "#f87171",
    cat: "Password",
  },
  {
    id: "password-generator",
    label: "Wordlist Gen",
    icon: FileText,
    color: "#f87171",
    cat: "Password",
  },
  {
    id: "credential-stuffing",
    label: "Credential Stuffing",
    icon: Lock,
    color: "#f87171",
    cat: "Password",
  },
  {
    id: "exploit-db",
    label: "Exploit Database",
    icon: Database,
    color: "#f43f5e",
    cat: "Exploit",
  },
  {
    id: "payload-generator",
    label: "Payload Generator",
    icon: Terminal,
    color: "#f43f5e",
    cat: "Exploit",
  },
  {
    id: "privilege-escalation",
    label: "Priv Escalation",
    icon: Shield,
    color: "#f43f5e",
    cat: "Exploit",
  },
  {
    id: "crypto",
    label: "Cryptography",
    icon: Lock,
    color: "#4ade80",
    cat: "Crypto",
  },
  {
    id: "steganography",
    label: "Steganography",
    icon: FileText,
    color: "#4ade80",
    cat: "Crypto",
  },
  {
    id: "forensics",
    label: "Digital Forensics",
    icon: FileSearch,
    color: "#60a5fa",
    cat: "Forensics",
  },
  {
    id: "malware-analysis",
    label: "Malware Analysis",
    icon: Bug,
    color: "#60a5fa",
    cat: "Forensics",
  },
  {
    id: "reverse-engineering",
    label: "Reverse Engineering",
    icon: Cpu,
    color: "#60a5fa",
    cat: "Forensics",
  },
  {
    id: "log-analyzer",
    label: "Log Analyzer",
    icon: BarChart3,
    color: "#60a5fa",
    cat: "Forensics",
  },
  {
    id: "anonymizer",
    label: "Anonymizer",
    icon: VenetianMask,
    color: "#2dd4bf",
    cat: "Privacy",
  },
  {
    id: "darkweb",
    label: "Dark Web Monitor",
    icon: Globe,
    color: "#2dd4bf",
    cat: "Privacy",
  },
  {
    id: "reporting",
    label: "Report Generator",
    icon: FileText,
    color: "#818cf8",
    cat: "Reporting",
  },
];

const RECENT_ACTIVITY = [
  {
    action: "WiFi scan completed",
    module: "WiFi Analyzer",
    time: "2 min ago",
    status: "success",
    icon: Wifi,
  },
  {
    action: "Port scan: 192.168.1.0/24",
    module: "Port Scanner",
    time: "15 min ago",
    status: "success",
    icon: ScanLine,
  },
  {
    action: "Phishing template created",
    module: "Phishing Manager",
    time: "1 hr ago",
    status: "warning",
    icon: Mail,
  },
  {
    action: "OSINT report generated",
    module: "OSINT Framework",
    time: "3 hr ago",
    status: "success",
    icon: Eye,
  },
  {
    action: "SQL injection test started",
    module: "Web Scanner",
    time: "5 hr ago",
    status: "info",
    icon: Database,
  },
  {
    action: "Hash cracked: MD5",
    module: "Password Cracker",
    time: "Yesterday",
    status: "success",
    icon: Key,
  },
];

const STATS = [
  { label: "Total Modules", value: "30", icon: Terminal, color: "#00d4ff" },
  { label: "Categories", value: "9", icon: Shield, color: "#4ade80" },
  { label: "Recent Scans", value: "6", icon: Activity, color: "#c084fc" },
  { label: "Reports", value: "3", icon: FileText, color: "#facc15" },
];

const statusColors = {
  success: "#4ade80",
  warning: "#facc15",
  info: "#00d4ff",
  error: "#f87171",
};

export function Dashboard() {
  const [activeArsenalTab, setActiveArsenalTab] = React.useState("Network");

  const categories = React.useMemo(() => {
    return ["All", ...new Set(MODULE_CARDS.map(m => m.cat))];
  }, []);

  const filteredModules = React.useMemo(() => {
    if (activeArsenalTab === "All") return MODULE_CARDS;
    return MODULE_CARDS.filter(m => m.cat === activeArsenalTab);
  }, [activeArsenalTab]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Operations <span className="text-blue-500">Dashboard</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            All systems operational — Secure Session Active
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative rounded-3xl p-6 overflow-hidden group transition-all hover:translate-y-[-2px]"
              style={{
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                style={{ background: stat.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    background: `${stat.color}10`,
                    border: `1px solid ${stat.color}25`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div
                className="text-4xl font-black tracking-tighter mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-white/5">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Live Activity Feed</h2>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(15, 23, 42, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          >
            {RECENT_ACTIVITY.map((activity, idx) => {
              const ActivityIcon = activity.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors border-b border-white/5 last:border-0"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${statusColors[activity.status]}10` }}
                  >
                    <ActivityIcon
                      className="w-4 h-4"
                      style={{ color: statusColors[activity.status] }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">
                      {activity.action}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-0.5">
                      {activity.module}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">System Logs</h2>
          </div>
          <div
            className="rounded-3xl p-6 font-mono text-xs overflow-hidden h-full min-h-[300px]"
            style={{
              background: "rgba(5, 8, 18, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="text-emerald-500/80 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              [OK] System Core Initialized
            </div>
            <div className="text-blue-400/80 mb-2">
              [INFO] Listening on port 8080 (0.0.0.0)
            </div>
            <div className="text-slate-500 mb-2">
              [DEBUG] Loading security kernel...
            </div>
            <div className="text-slate-500 mb-2">
              [DEBUG] Establishing encrypted tunnel...
            </div>
            <div className="text-emerald-500/80 mb-2">
              [OK] SSL/TLS 1.3 Handshake Successful
            </div>
            <div className="text-slate-400 animate-pulse">
              [SYSTEM] Ready for operations._
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-slate-700 font-bold uppercase tracking-widest text-[9px]">
              Python backend not connected. UI is ready — connect your backend
              to activate tools.
            </div>
          </div>
        </div>
      </div>

      {/* All Modules Quick Access - Modern Category Filtered View */}
      <div className="pt-16 border-t border-white/5">
        <div className="bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-12 space-y-12 overflow-hidden relative">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] -z-10" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Available <span className="text-blue-500">Arsenal</span></h2>
              <p className="text-slate-500 font-medium text-sm">Strategic security modules categorized for rapid deployment</p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto no-scrollbar max-w-full md:max-w-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveArsenalTab(cat)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeArsenalTab === cat
                    ? 'bg-blue-600 text-white shadow-[0_5px_15px_rgba(37,99,235,0.4)]'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 relative z-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredModules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <motion.div
                    key={mod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <Link href={`/modules/${mod.id}`} className="group relative block h-full">
                      <div
                        className="h-full p-6 rounded-[2rem] transition-all duration-300 hover:translate-y-[-4px] overflow-hidden flex flex-col justify-between"
                        style={{
                          background: "rgba(15, 23, 42, 0.4)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                          minHeight: "140px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${mod.color}30`;
                          e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.background = "rgba(15, 23, 42, 0.4)";
                        }}
                      >
                        <div
                          className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                          style={{ background: mod.color }}
                        />

                        <div>
                          <Icon
                            className="w-6 h-6 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                            style={{ color: mod.color }}
                          />
                          <div className="text-xs font-black text-white leading-tight uppercase tracking-widest truncate">
                            {mod.label}
                          </div>
                        </div>
                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-tighter mt-3">
                          {mod.cat}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
