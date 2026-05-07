import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Eye, ArrowLeft, ArrowRight, Search, Globe, Database, Share2
} from "lucide-react";

export function OsintIntelligenceLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-amber-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 75% 25%, rgba(245,158,11,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:text-amber-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Globe className="w-3 h-3 text-amber-400" />
              <span className="text-amber-400 text-[10px] font-black tracking-widest uppercase">Open Source Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              OSINT <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Intelligence</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              The digital world leaves a massive footprint. Our OSINT engine aggregates, correlates, and visualizes public data across 100+ platforms for comprehensive reconnaissance.
            </p>
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.3)" }} whileTap={{ scale: 0.98 }} className="px-8 py-4 rounded-2xl bg-amber-600 text-white font-bold flex items-center gap-2">
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1">
            <div className="relative aspect-square max-w-md mx-auto rounded-full border border-white/5 bg-slate-900/20 p-8 flex items-center justify-center">
               <Eye className="w-48 h-48 text-amber-500/10" />
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t border-amber-500/30 rounded-full" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border-b border-orange-500/20 rounded-full" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 p-10 rounded-[48px] border border-white/5 bg-slate-900/40">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Database className="w-6 h-6 text-amber-400" /> Data Aggregation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    By querying multiple public records, WHOIS databases, and social platforms, we build a 360-degree view of the target. This module is essential for the pre-engagement reconnaissance phase.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {["Subdomain Enumeration", "Social Mapping", "WHOIS Discovery", "Email Correlation"].map(f => (
                        <div key={f} className="text-xs font-bold text-slate-500 py-2 border-b border-white/5">{f}</div>
                    ))}
                </div>
            </div>
            <div className="p-10 rounded-[48px] border border-white/5 bg-slate-900/20">
                <h3 className="text-2xl font-bold text-white mb-6">Search Pattern</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <Share2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <p className="text-sm text-slate-400">Map relationships between different digital identities across platforms.</p>
                    </div>
                    <div className="flex gap-4">
                        <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <p className="text-sm text-slate-400">Perform deep-web searches for historical domain records and cached data.</p>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
