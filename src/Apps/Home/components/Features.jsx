import { motion } from "framer-motion";
import { Shield, Cpu, FileText, Globe, CheckCircle } from "lucide-react";

const FEATURES = [
  { icon: Shield,   title: "100% Ethical",         desc: "Built exclusively for authorized testing with responsible-use guardrails at every step.", color: "#3b82f6" },
  { icon: Cpu,      title: "Python-Powered Core",  desc: "Real Python scripts run under the hood — not wrappers or simulations.",                  color: "#10b981" },
  { icon: FileText, title: "Automated Reports",    desc: "One-click executive and technical PDF reports from your scan results.",                   color: "#a855f7" },
  { icon: Globe,    title: "Unified Workspace",    desc: "Every security tool you need — consolidated into one clean, fast interface.",             color: "#f59e0b" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export function Features() {
  return (
    <section id="platform" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Platform</motion.p>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Engineered for<br />
              <span style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Professional Security</span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-slate-400 text-lg leading-relaxed mb-10">
              We removed the complexity from traditional security toolchains. Clean UI, real results, zero noise.
            </motion.p>
            <motion.ul custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              {["Standardized JSON & PDF reporting","Real-time diagnostic feedback","Cross-platform compatibility","Integrated ethical use guardrails"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(${f.color === "#3b82f6" ? "59,130,246" : f.color === "#10b981" ? "16,185,129" : f.color === "#a855f7" ? "168,85,247" : "245,158,11"},0.08)` }}
                className="p-8 rounded-[28px]"
                style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", transition: "all 0.4s ease" }}
              >
                <f.icon className="w-8 h-8 mb-5" style={{ color: f.color }} />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
