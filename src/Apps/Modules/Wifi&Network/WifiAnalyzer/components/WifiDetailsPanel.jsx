import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  Shield, 
  Signal, 
  Activity, 
  Cpu, 
  Globe, 
  Target, 
  ArrowLeft, 
  Search, 
  Terminal, 
  Lock, 
  Database, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCcw, 
  Copy, 
  QrCode, 
  Share2, 
  FileText, 
  Download, 
  Upload, 
  Server, 
  Network, 
  Key, 
  ShieldAlert, 
  Eye, 
  Bug, 
  ChevronRight, 
  History, 
  ExternalLink,
  Laptop,
  HardDrive
} from "lucide-react";

const WifiDetailsPanel = ({ network, onBack }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [isScanningDevices, setIsScanningDevices] = useState(false);
  const [devices, setDevices] = useState([]);

  // Mock devices for discovery
  useEffect(() => {
    if (isScanningDevices) {
      const timer = setTimeout(() => {
        setDevices([
          { id: 1, name: "Samer's iPhone", ip: "192.168.1.105", mac: "DE:AD:BE:EF:01:02", vendor: "Apple Inc.", type: "phone", status: "online", lastSeen: "Just now" },
          { id: 2, name: "MacBook Pro M2", ip: "192.168.1.108", mac: "A1:B2:C3:D4:E5:F6", vendor: "Apple Inc.", type: "laptop", status: "online", lastSeen: "2 mins ago" },
          { id: 3, name: "Living Room TV", ip: "192.168.1.22", mac: "88:77:66:55:44:33", vendor: "Samsung Electronics", type: "iot", status: "offline", lastSeen: "1h ago" },
          { id: 4, name: "Workstation-PC", ip: "192.168.1.150", mac: "FF:EE:DD:CC:BB:AA", vendor: "ASUSTek Computer Inc.", type: "laptop", status: "online", lastSeen: "Just now" }
        ]);
        setIsScanningDevices(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanningDevices]);

  const stats = [
    { label: "Link Speed", value: "866 Mbps", icon: Zap, color: "text-amber-400" },
    { label: "Ping (Gateway)", value: "12ms", icon: Activity, color: "text-emerald-400" },
    { label: "Jitter", value: "2ms", icon: RefreshCcw, color: "text-cyan-400" },
    { label: "Active Devices", value: devices.filter(d => d.status === 'online').length || "12", icon: Laptop, color: "text-purple-400" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-8 pb-20"
    >
      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-4 rounded-[1.5rem] bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center group shadow-xl"
          >
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Connected & Secured</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-none">
              {network?.ssid || "Cyphro_Secure_Net"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Interface IP</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">192.168.1.105</span>
          </div>
          <button className="p-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── Top Stats Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 group hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* ─── Main Content Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Network Intelligence */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-3xl bg-slate-900/40 border border-white/5 w-fit backdrop-blur-xl">
            {[
              { id: 'info', label: 'Network Info', icon: Network },
              { id: 'devices', label: 'Connected Devices', icon: Laptop },
              { id: 'security', label: 'Security Analysis', icon: ShieldAlert },
              { id: 'tools', label: 'Advanced Tools', icon: Terminal },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Detailed Info Card */}
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      Infrastructure Parameters
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Gateway IP", value: "192.168.1.1" },
                        { label: "BSSID (MAC)", value: "BC:24:11:88:FF:02" },
                        { label: "Frequency", value: "5.825 GHz (Ch 36)" },
                        { label: "Subnet Mask", value: "255.255.255.0" },
                        { label: "Primary DNS", value: "8.8.8.8" },
                        { label: "MAC Vendor", value: "TP-Link Technologies" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <span className="text-sm font-mono font-bold text-white tracking-wider">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Signal Performance Card */}
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        Live Performance
                      </h3>
                      <div className="space-y-10">
                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Signal Quality</span>
                            <span className="text-2xl font-black text-emerald-400 font-mono">-42 <span className="text-xs text-slate-600">dBm</span></span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: '85%' }} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-cyan-400">
                                <Download className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Download</span>
                             </div>
                             <div className="text-3xl font-black text-white">42.5 <span className="text-xs text-slate-600">MB/s</span></div>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-purple-400">
                                <Upload className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Upload</span>
                             </div>
                             <div className="text-3xl font-black text-white">12.8 <span className="text-xs text-slate-600">MB/s</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Internet Status</span>
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Global Reachable</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'devices' && (
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">LAN Node Discovery</h3>
                      <p className="text-sm text-slate-500 mt-1">Real-time identification of all devices on this segment</p>
                    </div>
                    <button 
                      onClick={() => setIsScanningDevices(true)}
                      disabled={isScanningDevices}
                      className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-3 transition-all disabled:opacity-50"
                    >
                      {isScanningDevices ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      {isScanningDevices ? "Polling Nodes..." : "Refresh Network"}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/[0.02]">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Device Name / Host</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">IP Address</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">MAC / Vendor</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-5"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(devices.length > 0 ? devices : Array(4).fill({})).map((device, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${device.type === 'phone' ? 'text-cyan-400' : 'text-slate-400'}`}>
                                  {device.type === 'phone' ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white">{device.name || "Detecting..."}</div>
                                  <div className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{device.type || "Scanning"}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6 font-mono text-sm font-bold text-slate-300">{device.ip || "..."}</td>
                            <td className="px-8 py-6">
                              <div className="text-xs font-mono text-white">{device.mac || "..."}</div>
                              <div className="text-[10px] text-slate-600 font-bold uppercase">{device.vendor || "..."}</div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-700'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${device.status === 'online' ? 'text-emerald-400' : 'text-slate-600'}`}>
                                  {device.status || "WAITING"}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8">
                      <div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Security Audit</h3>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Protocol Vulnerability Assessment</p>
                      </div>
                      <div className="space-y-4">
                         {[
                           { label: "WPS Vulnerability", status: "Critical", icon: ShieldAlert, color: "text-red-500", desc: "WPS is enabled and vulnerable to Pixie Dust attack." },
                           { label: "Encryption Strength", status: "Secure", icon: Shield, color: "text-emerald-500", desc: "WPA3 Enterprise active. Brute force protection enabled." },
                           { label: "Default Credentials", status: "Risk", icon: Key, color: "text-amber-500", desc: "Common default login pattern detected on port 80." },
                           { label: "Isolation Protocol", status: "Active", icon: Lock, color: "text-emerald-500", desc: "Client isolation prevents internal network scanning." },
                         ].map((item, i) => (
                           <div key={i} className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                              <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-3">
                                    <item.icon className={`w-4 h-4 ${item.color}`} />
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{item.label}</span>
                                 </div>
                                 <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                    item.status === 'Secure' ? 'bg-emerald-500/10 text-emerald-400' : 
                                    item.status === 'Risk' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                                 }`}>{item.status}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">{item.desc}</p>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                         <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin duration-[3s]" />
                         <span className="text-4xl font-black text-white">82<span className="text-lg text-slate-500 font-bold ml-0.5">%</span></span>
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-white tracking-tight">Trust Score</h4>
                         <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Network security is above average, but {network?.ssid} requires port hardening.</p>
                      </div>
                      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:text-white hover:bg-white/10 transition-all">
                        Generate PDF Security Report
                      </button>
                   </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    { label: "Net Scanner", icon: Search, color: "text-cyan-400", desc: "Map LAN nodes" },
                    { label: "Traffic Sniff", icon: Eye, color: "text-purple-400", desc: "Packet capture" },
                    { label: "ARP Spoof", icon: Target, color: "text-red-400", desc: "MITM injection" },
                    { label: "Deauth Node", icon: Zap, color: "text-amber-400", desc: "Kick devices" },
                    { label: "WPS Crack", icon: Key, color: "text-emerald-400", desc: "Pixie Dust" },
                    { label: "Handshake", icon: Lock, color: "text-blue-400", desc: "Auth capture" },
                    { label: "DNS Spoof", icon: Globe, color: "text-cyan-400", desc: "Route redirection" },
                    { label: "Vuln Scan", icon: Bug, color: "text-pink-400", desc: "CVE analysis" },
                    { label: "Port Sweep", icon: Server, color: "text-amber-500", desc: "Service mapping" },
                    { label: "Evil Twin", icon: Smartphone, color: "text-purple-500", desc: "Cloned AP" },
                    { label: "HTTP Hijack", icon: History, color: "text-red-400", desc: "Session capture" },
                    { label: "Shell Probe", icon: Terminal, color: "text-emerald-400", desc: "Backdoor check" },
                  ].map((tool, i) => (
                    <button key={i} className="flex flex-col items-center text-center p-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/[0.03] hover:-translate-y-1 transition-all group">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-4 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                          <tool.icon className={`w-6 h-6 ${tool.color}`} />
                       </div>
                       <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{tool.label}</span>
                       <span className="text-[9px] text-slate-500 font-bold uppercase">{tool.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Sidebar Actions & Details */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Info Card */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8">
            <div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Primary Target Info</span>
               <h3 className="text-2xl font-bold text-white tracking-tight">Access Credentials</h3>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Key className="w-4 h-4 text-emerald-400" />
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Saved Password</span>
                    </div>
                    <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                       <Copy className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="text-xl font-mono font-black text-white tracking-widest">Krypt0-Net!24</div>
              </div>

              <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                 <div className="flex items-center gap-4">
                    <QrCode className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Show Connection QR</span>
                 </div>
                 <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>

              <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                 <div className="flex items-center gap-4">
                    <Share2 className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Export Profile Data</span>
                 </div>
                 <Download className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Router Admin Section */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-purple-400" />
              Gateway Management
            </h3>
            <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/5">
               <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Gateway Interface</div>
               <a href="http://192.168.1.1" target="_blank" className="flex items-center justify-between group">
                  <span className="text-sm font-mono font-black text-cyan-400 group-hover:underline">http://192.168.1.1</span>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white" />
               </a>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Router Model</span>
                 <span className="text-xs font-bold text-white">Archer AX11000</span>
              </div>
              <div className="flex justify-between items-center px-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">FW Version</span>
                 <span className="text-xs font-bold text-white">v1.2.5 build 2024</span>
              </div>
              <div className="flex justify-between items-center px-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Open Ports</span>
                 <span className="text-xs font-black text-red-400">80, 443, 21, 53</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Bottom Floating Actions ───────────────────────────────────────── */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4 ml-0 md:ml-32 lg:ml-36 transition-all duration-300">
        <div className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 p-4 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
           <div className="flex items-center gap-4 pl-4 border-r border-white/10 pr-6 mr-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">System Guard</span>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Protected</span>
              </div>
           </div>
           
           <div className="flex-1 flex items-center justify-around">
              {[
                { label: "Protect Device", icon: Lock, color: "text-emerald-400" },
                { label: "Refresh Info", icon: RefreshCcw, color: "text-cyan-400" },
                { label: "Copy All", icon: Copy, color: "text-slate-400" },
                { label: "PDF Report", icon: FileText, color: "text-purple-400" },
                { label: "Vulnerability", icon: ShieldAlert, color: "text-red-400" },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center gap-1 group">
                   <div className={`p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all ${action.color}`}>
                      <action.icon className="w-4 h-4" />
                   </div>
                   <span className="text-[8px] font-black text-slate-500 group-hover:text-white uppercase tracking-tighter transition-colors">{action.label}</span>
                </button>
              ))}
           </div>

           <button className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500/20 transition-all flex items-center gap-2 ml-4">
              <RefreshCcw className="w-4 h-4" />
              Reset Intel
           </button>
        </div>
      </div>

    </motion.div>
  );
};

export default memo(WifiDetailsPanel);
