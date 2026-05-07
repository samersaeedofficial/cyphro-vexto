import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Users, ArrowLeft, ArrowRight, ShieldAlert, Eye, Brain, Mail, VenetianMask
} from "lucide-react";

export function SocialEngineeringLearn() {
  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(circle at 70% 30%, rgba(168,85,247,0.06) 0%, transparent 50%)" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link href="/">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-xs uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:text-purple-500" /> Return to Arsenal
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <VenetianMask className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400 text-[10px] font-black tracking-widest uppercase">Human Factor</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
              Social <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Engineering</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              The human element is often the weakest link. Audit organizational resilience through advanced phishing simulations and psychological vulnerability assessments.
            </p>
            <Link href="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl bg-purple-600 text-white font-bold flex items-center gap-2"
              >
                Launch Module <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1"
          >
            <div className="relative aspect-video max-w-lg mx-auto rounded-[40px] border border-white/5 bg-slate-900/40 p-6 flex items-center justify-center overflow-hidden">
               {/* Animated eye/focus effect */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-purple-500/10 blur-[80px]" 
               />
               <Brain className="w-40 h-40 text-purple-500/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
                  <Mail className="w-8 h-8 text-purple-400 animate-bounce" />
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <section className="space-y-8">
            <h3 className="text-3xl font-black text-white">Ethical Simulations</h3>
            <p className="text-slate-400 leading-relaxed">
              Our platform allows security teams to create highly convincing phishing templates and monitor interaction rates without ever exposing users to real threats. Data is anonymized to focus on trend analysis rather than individual blame.
            </p>
            <div className="space-y-4">
              {[
                { title: "Campaign Management", desc: "Track open rates, link clicks, and form submissions in real-time." },
                { title: "Psychological Profiling", desc: "Identify which social triggers (urgency, authority) are most effective." }
              ].map(feat => (
                <div key={feat.title} className="p-6 rounded-3xl border border-white/5 bg-slate-900/20">
                  <h4 className="text-white font-bold mb-1">{feat.title}</h4>
                  <p className="text-slate-500 text-sm">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-10 rounded-[48px] border border-white/5 bg-slate-900/40">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-400" /> Awareness Protocol
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold text-xs">01</div>
                <p className="text-sm text-slate-400">Select an authorized target group for assessment.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold text-xs">02</div>
                <p className="text-sm text-slate-400">Customize the bait template and delivery headers.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold text-xs">03</div>
                <p className="text-sm text-slate-400">Launch and monitor the telemetry stream.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
