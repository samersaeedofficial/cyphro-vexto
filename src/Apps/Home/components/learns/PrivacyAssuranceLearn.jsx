import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  VenetianMask, ArrowLeft, ArrowRight, ShieldCheck, EyeOff, Globe, Lock
} from "lucide-react";

export function PrivacyAssuranceLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-teal-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 80% 20%, rgba(20,184,166,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-teal-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <EyeOff className="w-3 h-3 text-teal-400" />
              <span className="text-teal-400 text-[10px] font-black tracking-widest uppercase">Operational Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Privacy <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Assurance</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Audit your anonymity. Verify proxy chains, detect browser fingerprinting leaks, and ensure your operational infrastructure maintains strict data isolation standards.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20,184,166,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-teal-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-teal-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto rounded-[40px] border border-white/5 bg-slate-900/40 flex items-center justify-center overflow-hidden">
               <VenetianMask className="w-40 h-40 text-teal-500/20" />
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute inset-0 bg-teal-500/5" 
               />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40 space-y-6">
                <h3 className="text-2xl font-bold text-white">Leak Protection</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Test your connection against DNS leaks, WebRTC vulnerabilities, and proxy bypasses. Our privacy engine ensures your real identity remains hidden under all conditions.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DNS Masking</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Isolation</div>
                </div>
            </div>
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/20 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Lock className="w-6 h-6 text-teal-400" /> Metadata Scrubbing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Automatically strip EXIF data and other identifying metadata from documents and images before they leave your secure environment.
                </p>
            </div>
        </div>
      </main>
    </div>
  );
}
