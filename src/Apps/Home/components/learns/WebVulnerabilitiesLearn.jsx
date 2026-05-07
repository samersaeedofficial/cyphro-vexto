import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ShieldAlert, ArrowLeft, ArrowRight, Zap, Target, Bug, AlertTriangle
} from "lucide-react";

export function WebVulnerabilitiesLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-red-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 65% 35%, rgba(239,68,68,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-red-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <Bug className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-[10px] font-black tracking-widest uppercase">Web Application Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Web <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600">Vulnerabilities</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Identify SQLi, XSS, and broken access controls with our high-precision scanner. Built to detect the OWASP Top 10 with low latency and real-world payloads.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239,68,68,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-red-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto rounded-[48px] border border-white/5 bg-slate-900/40 p-8 flex items-center justify-center overflow-hidden">
               <ShieldAlert className="w-40 h-40 text-red-500/20" />
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 border-2 border-red-500/10 rounded-[48px]" 
               />
               <Target className="w-12 h-12 text-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/20 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Zap className="w-6 h-6 text-red-400" /> Dynamic Analysis</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Our scanner doesn't just look for patterns; it interacts with the target in a safe environment. We simulate real attacker payloads to confirm the existence of vulnerabilities.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-300 tracking-widest uppercase">Injection Tests</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-300 tracking-widest uppercase">XSS Validation</div>
                </div>
            </div>
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-red-400" /> Risk Assessment</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Automatically categorize findings based on CVSS scoring. Get clear, actionable steps for remediation for every confirmed vulnerability.
                </p>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-500 to-rose-500" 
                    />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Low Risk</span>
                    <span className="text-red-400 text-xs">High Severity</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
