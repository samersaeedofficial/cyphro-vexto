import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function EthicalNotice() {
  return (
    <section className="pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(10, 14, 25, 0.85)",
            border: "1px solid rgba(239,68,68,0.15)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(239,68,68,0.05), 0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Gradient top border */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.5), rgba(251,146,60,0.5), transparent)" }} />
          {/* Ambient glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.08) 0%, transparent 70%)", filter: "blur(20px)" }} />

          <div className="relative z-10 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Icon block */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div
                    className="absolute w-full h-full rounded-2xl cvx-pulse-slow"
                    style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.1)" }}
                  />
                  <Shield className="w-7 h-7 relative z-10" style={{ color: "#f87171" }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="font-extrabold text-white text-lg">For Authorized Use Only</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Legal Notice</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Cyphro Vexto is engineered exclusively for <span className="text-slate-200 font-semibold">authorized security testing</span> with explicit written permission from system owners. Unauthorized use is a criminal offence in most jurisdictions. Always obtain proper written authorization before running any tests.
                </p>
              </div>

              {/* Steps */}
              <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 min-w-[180px]">
                {["Get authorization", "Run your tests", "Report findings"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>{i + 1}</div>
                    <span className="text-slate-400 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
