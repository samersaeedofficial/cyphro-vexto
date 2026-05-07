import { motion } from "framer-motion";
import { Link } from "wouter";
import { Terminal, ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto relative rounded-[48px] overflow-hidden"
        style={{
          background: "rgba(10,14,25,0.9)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.1), 0 40px 100px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.08)",
        }}
      >
        {/* Multi-color gradient glow orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)", filter: "blur(40px)" }} />
        {/* Gradient top border line */}
        <div className="absolute top-0 left-12 right-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(59,130,246,0.6), transparent)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 px-8 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 cvx-pulse" />
            <span className="text-indigo-300 text-xs font-bold tracking-widest uppercase">Zero Setup Required</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Ready to start?{" "}
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Today.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto mb-12"
          >
            Launch the dashboard and run your first authorized security test in seconds. No installation, no configuration.
          </motion.p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(99,102,241,0.4), 0 20px 60px rgba(59,130,246,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-2xl font-extrabold text-lg text-white inline-flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)", boxShadow: "0 0 40px rgba(99,102,241,0.25)" }}
            >
              <Terminal className="w-5 h-5" /> Get Started Free <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
