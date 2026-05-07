import { motion } from "framer-motion";
import { Link } from "wouter";
import { Terminal, ArrowRight, ChevronRight } from "lucide-react";

const STATS = [
  { value: "30+", label: "Advanced Tools" },
  { value: "9",   label: "Core Domains"  },
  { value: "0",   label: "Setup Needed"  },
  { value: "100%",label: "Open & Ethical"},
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 cvx-pulse" />
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">Professional Security Suite v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]"
        >
          The Future of{" "}
          <span
            className="relative inline-block pb-4"
            style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 40%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Security Intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-14"
        >
          Cyphro Vexto unifies 30+ professional security tools into one polished, 
          zero-setup platform built for authorized testing at every skill level.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59,130,246,0.4), 0 20px 40px rgba(59,130,246,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-3">
                <Terminal className="w-5 h-5" /> Access Dashboard <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </Link>
          <motion.a
            href="#modules"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl font-semibold text-lg text-slate-300 flex items-center gap-3"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)" }}
          >
            Explore Modules <ChevronRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.4)" }}
              className="flex flex-col items-center py-5 px-4 rounded-2xl"
              style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
            >
              <span className="text-3xl font-black text-white mb-1">{s.value}</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating glow below hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
    </section>
  );
}
