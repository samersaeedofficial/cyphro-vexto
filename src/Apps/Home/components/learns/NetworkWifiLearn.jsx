import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Wifi, ArrowLeft, ArrowRight, Shield, Terminal, Zap, Globe, Cpu, Lock
} from "lucide-react";

export function NetworkWifiLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Back Button */}
        <Link href="/">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:text-blue-500" /> Return to Arsenal
          </motion.button>
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 text-[10px] font-black tracking-widest uppercase">Network Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Network & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">WiFi Intelligence</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Go beyond simple scanning. Audit 802.11 protocols, decrypt handshakes, and visualize network topologies with industrial precision.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  Launch Module <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Spinning Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/20" 
              />
              {/* Inner content */}
              <div className="absolute inset-4 rounded-full bg-slate-900/50 backdrop-blur-3xl border border-white/5 flex items-center justify-center">
                <Wifi className="w-32 h-32 text-blue-500/50 animate-pulse" />
                {/* Floating data nodes */}
                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_#3b82f6]" />
                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Shield, title: "WPA3 Ready", desc: "Full support for the latest wireless encryption standards and vulnerabilities." },
            { icon: Globe, title: "Topology Mapping", desc: "Real-time visualization of connected clients and infrastructure layout." },
            { icon: Cpu, title: "GPU Decryption", desc: "Offload handshake cracking to local GPU resources for 10x faster results." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[40px] border border-white/5 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 transition-colors"
            >
              <item.icon className="w-8 h-8 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <section>
              <h2 className="text-3xl font-black text-white mb-6">Strategic Auditing</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our network engine doesn't just scan—it analyzes. By intercepting traffic at the packet level, Cyphro Vexto identifies weak authentication patterns and misconfigured hardware before attackers do.
              </p>
              <ul className="space-y-4">
                {["Target SSID Enumeration", "Client Association Tracking", "Beacon Frame Analysis", "PMKID Capture Engine"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">Operator Note</h4>
              </div>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "Always ensure your wireless interface is set to monitor mode before initializing the scan. The system will automatically attempt to handle channel hopping for comprehensive coverage."
              </p>
            </section>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[48px] border border-white/5 bg-slate-900/40 p-1 overflow-hidden">
               <div className="bg-black/40 rounded-[44px] p-10 font-mono text-sm leading-relaxed">
                  <div className="text-emerald-500 mb-2">[SUCCESS] Interface wlan0 switched to Monitor Mode</div>
                  <div className="text-blue-400 mb-2">[INFO] Scanning frequency range: 2.4GHz / 5GHz</div>
                  <div className="text-slate-500 mb-8 tracking-tighter">................................................</div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-300 font-bold uppercase text-[10px]">BSSID</span>
                      <span className="text-slate-300 font-bold uppercase text-[10px]">Signal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-400">00:11:22:AA:BB:CC</span>
                      <span className="text-emerald-500">-42dBm</span>
                    </div>
                    <div className="flex justify-between opacity-50">
                      <span className="text-blue-400">DD:EE:FF:33:44:55</span>
                      <span className="text-yellow-500">-78dBm</span>
                    </div>
                  </div>
               </div>
            </div>
            {/* Floating glass card overlay */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-3xl border border-white/10 bg-slate-800/80 backdrop-blur-xl shadow-2xl max-w-[240px]">
              <Lock className="w-6 h-6 text-indigo-400 mb-3" />
              <p className="text-xs text-white font-medium leading-relaxed">
                Handshake captured for "CyberRange_01". Ready for local auditing.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
