import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Lock, ArrowLeft, ArrowRight, Hash, Cpu, Binary, ShieldCheck
} from "lucide-react";

export function CryptographicAnalysisLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 85% 20%, rgba(6,182,212,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-cyan-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Binary className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase">Data Integrity</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Crypto <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">Analysis</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Validate the mathematical strength of your security. Audit TLS/SSL configurations, analyze cipher integrity, and identify entropy weaknesses in modern cryptographic implementations.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-cyan-600 text-white font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/20">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl border border-white/5 bg-slate-900/40 p-12 flex items-center justify-center">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 180, 270, 360] }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border border-cyan-500/10 rounded-3xl" 
               />
               <Lock className="w-32 h-32 text-cyan-500/20" />
               <div className="grid grid-cols-4 gap-1 absolute inset-0 p-8 opacity-[0.05]">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="text-[10px] font-mono text-cyan-400">{i % 2 === 0 ? '1' : '0'}</div>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40">
                <h3 className="text-2xl font-bold text-white mb-6">Cipher Auditing</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Identify weak key generation patterns and analyze entropy sources. Our mathematical engine detects common misimplementations of AES, RSA, and Elliptic Curve protocols.
                </p>
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-white">256-bit</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Min Standard</span>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-cyan-400">99.9%</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entropy Conf.</span>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                {[
                  { icon: Hash, title: "Digest Integrity", desc: "Verify collision resistance across various hashing algorithms." },
                  { icon: ShieldCheck, title: "TLS Compliance", desc: "Audit server handshakes for modern cipher suite compatibility." }
                ].map(item => (
                    <div key={item.title} className="p-8 rounded-[32px] border border-white/5 bg-slate-900/20">
                        <item.icon className="w-6 h-6 text-cyan-400 mb-4" />
                        <h4 className="text-white font-bold mb-2">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
