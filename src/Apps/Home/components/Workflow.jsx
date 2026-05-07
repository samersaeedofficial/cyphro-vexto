import { motion } from "framer-motion";
import { Terminal, Settings, Play, Cpu, ChevronRight } from "lucide-react";

const STEPS = [
  {
    icon: Terminal,
    title: "Clone Repo",
    desc: "Start by cloning the core repository to your local machine.",
    color: "#3b82f6",
    glow: "59,130,246",
    tag: "01"
  },
  {
    icon: Settings,
    title: "Auto Setup",
    desc: "Run the setup engine to configure your environment automatically.",
    color: "#818cf8",
    glow: "129,140,248",
    tag: "02"
  },
  {
    icon: Play,
    title: "Launch UI",
    desc: "Boot the local server and initialize the modern management interface.",
    color: "#10b981",
    glow: "16,185,129",
    tag: "03"
  },
  {
    icon: Cpu,
    title: "Execute",
    desc: "Python runs the heavy logic while you manage from the dashboard.",
    color: "#f59e0b",
    glow: "245,158,11",
    tag: "04"
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StepCard({ step, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative group w-full"
    >
      <div
        className="relative p-6 md:p-8 rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:translate-y-[-4px]"
        style={{
          background: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Subtle background glow */}
        <div 
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl pointer-events-none"
          style={{ background: step.color }}
        />

        <div className="flex flex-col gap-5">
          {/* Top Row: Icon & Large Number */}
          <div className="flex items-center justify-between">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative shadow-lg"
              style={{ 
                background: `rgba(${step.glow}, 0.1)`, 
                border: `1px solid rgba(${step.glow}, 0.2)`,
              }}
            >
              <step.icon className="w-6 h-6" style={{ color: step.color }} />
            </div>
            <span className="text-3xl font-black italic opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 text-white">
              {step.tag}
            </span>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              {step.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Workflow() {
  return (
    <section id="workflow" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400/80 text-[10px] font-black tracking-[0.3em] uppercase italic">Workflow Engine</span>
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Streamlined <span className="text-blue-500">Execution</span>
          </motion.h2>
        </div>

        {/* Desktop-optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Visual Connector for Desktop */}
        <div className="hidden lg:flex justify-center mt-12">
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-600 tracking-widest uppercase">
                <span>Setup</span>
                <ChevronRight className="w-3 h-3 text-slate-800" />
                <span>Initialize</span>
                <ChevronRight className="w-3 h-3 text-slate-800" />
                <span>Execute</span>
            </div>
        </div>
      </div>
    </section>
  );
}
