import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { CyphroLogoFull } from "@/components/CyphroLogo";

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Gradient ambient glow behind footer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -top-20 right-1/4 w-[400px] h-[200px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Main footer body */}
      <div className="relative z-10 px-6 pt-16 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <CyphroLogoFull height={32} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              Professional-grade security intelligence suite for authorized testing and digital forensics.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { label: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                { label: "Twitter/X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "Discord", path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" },
              ].map(({ label, path }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <svg className="w-4 h-4 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Platform</h5>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
            {[["#modules","Security Modules"],["#platform","Core Features"],["#workflow","How It Works"],["#","Release Notes"]].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="text-slate-500 text-sm font-medium hover:text-slate-200 transition-colors flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-3 h-px bg-blue-500 transition-all duration-300 inline-block" />
                {label}
              </a>
            ))}
          </div>

          {/* Security domains */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Domains</h5>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }} />
            {["Network & WiFi","OSINT Intelligence","Web Vulnerabilities","Credential Auditing","Privacy Assurance"].map((item) => (
              <a
                key={item}
                href="#modules"
                className="text-slate-500 text-sm font-medium hover:text-slate-200 transition-colors flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-3 h-px bg-indigo-500 transition-all duration-300 inline-block" />
                {item}
              </a>
            ))}
          </div>

          {/* Legal & status */}
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Legal</h5>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #10b981, transparent)" }} />
            {["Privacy Policy","Terms of Service","Ethical Guidelines","Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-500 text-sm font-medium hover:text-slate-200 transition-colors flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-3 h-px bg-emerald-500 transition-all duration-300 inline-block" />
                {item}
              </a>
            ))}
            {/* Status badge */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl self-start" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 cvx-pulse-slow" />
              <span className="text-emerald-400 text-xs font-bold">All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-medium">
            © 2026 <span className="text-slate-500 font-semibold">Cyphro Vexto</span>. All rights reserved. Built for ethical security professionals.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
            <Lock className="w-3 h-3 text-blue-500" />
            <span className="text-blue-400/70 text-xs font-semibold">Authorized Use Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
