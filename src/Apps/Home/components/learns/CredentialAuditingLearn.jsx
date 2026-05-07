import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Key, ArrowLeft, ArrowRight, Lock, Hash, Cpu, ShieldCheck
} from "lucide-react";

export function CredentialAuditingLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-pink-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 80% 30%, rgba(236,72,153,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-pink-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Hash className="w-3 h-3 text-pink-400" />
              <span className="text-pink-400 text-[10px] font-black tracking-widest uppercase">Identity Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Credential <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Auditing</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Audit the strength of organizational credentials. Use industrial-grade hash identification and high-speed wordlist generators to validate password policies.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-pink-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-pink-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
               <div className="absolute inset-0 bg-pink-500/10 blur-[100px] rounded-full" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center"
               >
                  <Key className="w-20 h-20 text-pink-500/40" />
               </motion.div>
               <div className="absolute flex flex-col items-center">
                  <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-4" />
                  <span className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase">Cracking Unit Active</span>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              { icon: Cpu, title: "Engine Speed", desc: "Optimized for multi-core processing and GPU utilization." },
              { icon: Hash, title: "Hash ID", desc: "Identify 300+ hash types from MD5 to custom PBKDF2 iterations." },
              { icon: ShieldCheck, title: "Policy Audit", desc: "Simulate credential stuffing to test password reuse policies." }
            ].map((item, i) => (
                <div key={item.title} className="p-8 rounded-[40px] border border-white/5 bg-slate-900/40">
                    <item.icon className="w-8 h-8 text-pink-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
