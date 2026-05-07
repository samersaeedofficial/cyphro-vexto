import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CyphroLogoFull } from "@/components/CyphroLogo";

export function Header({ scrolled }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{
        padding: scrolled ? "10px 20px" : "18px 20px",
        transition: "padding 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <nav
        style={{
          maxWidth: "900px",
          width: "100%",
          borderRadius: "9999px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: scrolled
            ? "rgba(8, 11, 22, 0.88)"
            : "rgba(8, 11, 22, 0.55)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="flex items-center justify-between px-6 h-14">
          {/* Logo */}
          <CyphroLogoFull height={28} />

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[["#modules","Modules"],["#platform","Features"],["#workflow","How it Works"]].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                style={{ transition: "all 0.2s ease" }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                boxShadow: "0 0 16px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Launch Platform
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
