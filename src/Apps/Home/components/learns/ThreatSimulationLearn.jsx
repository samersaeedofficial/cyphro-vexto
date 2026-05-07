import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Zap, ArrowLeft, ArrowRight, ShieldAlert, Target, Cpu, Terminal
} from "lucide-react";

export function ThreatSimulationLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 70% 20%, rgba(16,185,129,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-emerald-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <ShieldAlert className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 text-[10px] font-black tracking-widest uppercase">Offensive Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Threat <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Simulation</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Think like an adversary. Simulate advanced persistent threats (APT) and validate your infrastructure's resilience against modern lateral movement techniques.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-video max-w-lg mx-auto rounded-[40px] border border-white/5 bg-slate-900/40 p-1 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
               <Target className="w-32 h-32 text-emerald-500/20" />
               <motion.div 
                 animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-1/4 right-1/4"
               >
                  <Zap className="w-10 h-10 text-emerald-400" />
               </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40 space-y-6">
                <h3 className="text-2xl font-bold text-white">Scenario Engineering</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Build complex attack scenarios that test EDR/SIEM detection capabilities. Generate payloads that mirror real-world threat actors to identify blind spots in your defense stack.
                </p>
                <div className="flex flex-wrap gap-3">
                    {["Lateral Movement", "Privilege Escalation", "Persistence Testing"].map(t => (
                        <span key={t} className="px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t}</span>
                    ))}
                </div>
            </div>
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/20 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                    <Terminal className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-white font-bold">Execution Pipeline</h4>
                </div>
                <div className="space-y-4">
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-emerald-500" />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 tracking-tighter">
                        <span>STAGING</span>
                        <span>DEPLOYMENT</span>
                        <span>RECON</span>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
