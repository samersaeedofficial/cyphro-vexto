import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CyphroLogoFull } from "@/components/CyphroLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme";

export function Header({ scrolled }) {
  const { isDark } = useTheme();

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
          maxWidth: "960px",
          width: "100%",
          borderRadius: "9999px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: isDark
            ? scrolled
              ? "rgba(8, 11, 22, 0.88)"
              : "rgba(8, 11, 22, 0.55)"
            : scrolled
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(255, 255, 255, 0.75)",
          border: isDark
            ? scrolled
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,0.06)"
            : scrolled
              ? "1px solid rgba(0,0,0,0.1)"
              : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isDark
            ? scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
            : scrolled
              ? "0 8px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"
              : "0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="flex items-center justify-between px-6 h-14 gap-4">
          {/* Logo */}
          <CyphroLogoFull height={28} />

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[["#modules","Modules"],["#platform","Features"],["#workflow","How it Works"]].map(([href, label]) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                style={{ transition: "all 0.2s ease" }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <ThemeToggle compact={true} />

            {/* CTA Button */}
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  boxShadow: "0 0 16px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <span>Launch Platform</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

