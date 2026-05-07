import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Wifi, Users, Eye, ShieldAlert, Key, Zap, Lock, Brain, VenetianMask, ArrowRight 
} from "lucide-react";
import { GlowCard } from "./GlowCard";

const MODULES = [
  { id: "network-wifi",           icon: Wifi,         label: "Network & WiFi",       desc: "Real-time packet analysis, WiFi scanning, and MitM simulation.",          color: "#3b82f6", glow: "59,130,246" },
  { id: "social-engineering",     icon: Users,        label: "Social Engineering",    desc: "Phishing campaign builders and awareness simulation frameworks.",           color: "#a855f7", glow: "168,85,247" },
  { id: "osint-intelligence",     icon: Eye,          label: "OSINT Intelligence",    desc: "Deep-web recon, subdomain enumeration and metadata extraction.",            color: "#f59e0b", glow: "245,158,11" },
  { id: "web-vulnerabilities",    icon: ShieldAlert,  label: "Web Vulnerabilities",   desc: "Enterprise OWASP Top 10 detection with live proof-of-concept.",            color: "#ef4444", glow: "239,68,68" },
  { id: "credential-auditing",    icon: Key,          label: "Credential Auditing",   desc: "Hash cracking, wordlist generation and credential stuffing tests.",         color: "#ec4899", glow: "236,72,153" },
  { id: "threat-simulation",      icon: Zap,          label: "Threat Simulation",     desc: "Payload generation and privilege escalation path validation.",              color: "#10b981", glow: "16,185,129" },
  { id: "cryptographic-analysis", icon: Lock,         label: "Cryptographic Analysis",desc: "Cipher analysis, encryption integrity checks and key auditing.",           color: "#06b6d4", glow: "6,182,212" },
  { id: "forensics-response",     icon: Brain,        label: "Forensics & Response",  desc: "Malware behavioural analysis and digital incident investigation.",         color: "#6366f1", glow: "99,102,241" },
  { id: "privacy-assurance",      icon: VenetianMask, label: "Privacy Assurance",     desc: "Tor routing, proxy chaining and OPSEC infrastructure auditing.",           color: "#14b8a6", glow: "20,184,166" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export function Arsenal() {
  return (
    <section id="modules" className="py-32 px-6 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <motion.p custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Arsenal</motion.p>
          <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-6">30+ Tools. 9 Domains.</motion.h2>
          <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-slate-400 max-w-xl mx-auto text-lg">Every tool you need across the full penetration testing lifecycle — from recon to report.</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, i) => <GlowCard key={mod.label} mod={mod} i={i} />)}
        </div>
        <div className="text-center mt-14">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl font-bold text-blue-400 text-sm inline-flex items-center gap-2"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              Open All Modules <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
