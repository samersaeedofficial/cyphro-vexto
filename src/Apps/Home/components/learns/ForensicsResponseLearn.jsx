import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Brain, ArrowLeft, ArrowRight, Search, Database, Clock, HardDrive
} from "lucide-react";

export function ForensicsResponseLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 75% 25%, rgba(99,102,241,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-indigo-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span className="text-indigo-400 text-[10px] font-black tracking-widest uppercase">Digital Incident Response</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Forensics & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Response</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Uncover the truth behind every alert. Analyze system memory, reconstruct timelines, and extract forensic artifacts to understand the full scope of a security incident.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto rounded-[64px] border border-white/5 bg-slate-900/40 p-12 flex items-center justify-center">
               <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
               <Brain className="w-40 h-40 text-indigo-500/20" />
               <motion.div 
                 animate={{ opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-indigo-500/5 blur-[80px]" 
               />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/20 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><HardDrive className="w-6 h-6 text-indigo-400" /> Artifact Extraction</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Automatically parse system logs, browser histories, and filesystem changes. Our engine identifies suspicious persistence mechanisms and lateral movement evidence in seconds.
                </p>
            </div>
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Clock className="w-6 h-6 text-indigo-400" /> Timeline Analysis</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Reconstruct the exact sequence of events. Visualize the "who, what, and when" of an attack with high-fidelity event correlation.
                </p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-1 flex-1 bg-indigo-500/20 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
