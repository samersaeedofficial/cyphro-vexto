import { motion } from "framer-motion";
import { Shield, Cpu, FileText, Globe, CheckCircle } from "lucide-react";
import { useTheme } from "@/lib/theme";

const FEATURES = [
  { icon: Shield,   title: "100% Ethical",         desc: "Built exclusively for authorized testing with responsible-use guardrails at every step.", color: "#3b82f6", rgb: "59,130,246" },
  { icon: Cpu,      title: "Python-Powered Core",  desc: "Real Python scripts run under the hood — not wrappers or simulations.",                  color: "#10b981", rgb: "16,185,129" },
  { icon: FileText, title: "Automated Reports",    desc: "One-click executive and technical PDF reports from your scan results.",                   color: "#a855f7", rgb: "168,85,247" },
  { icon: Globe,    title: "Unified Workspace",    desc: "Every security tool you need — consolidated into one clean, fast interface.",             color: "#f59e0b", rgb: "245,158,11" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export function Features() {
  const { isDark } = useTheme();

  return (
    <section id="platform" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">Platform</motion.p>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Engineered for<br />
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(90deg, #60a5fa, #a78bfa)"
                    : "linear-gradient(90deg, #2563eb, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Professional Security
              </span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
              We removed the complexity from traditional security toolchains. Clean UI, real results, zero noise.
            </motion.p>
            <motion.ul custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              {["Standardized JSON & PDF reporting","Real-time diagnostic feedback","Cross-platform compatibility","Integrated ethical use guardrails"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
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
                whileHover={{
                  y: -5,
                  boxShadow: isDark
                    ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(${f.rgb},0.12)`
                    : `0 20px 35px -10px rgba(${f.rgb},0.15), 0 4px 15px rgba(0,0,0,0.04)`,
                }}
                className="p-8 rounded-[28px] relative overflow-hidden group transition-all duration-300"
                style={{
                  background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255, 255, 255, 0.9)",
                  border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(226, 232, 240, 0.9)",
                  backdropFilter: "blur(16px)",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 10px 30px -5px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.02)",
                }}
              >
                {/* Top subtle color shine */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: f.color }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: isDark
                      ? `rgba(${f.rgb}, 0.12)`
                      : `rgba(${f.rgb}, 0.1)`,
                    border: `1px solid rgba(${f.rgb}, ${isDark ? 0.25 : 0.3})`,
                  }}
                >
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
