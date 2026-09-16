import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "", compact = false }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme mode"
      className={`relative group flex items-center justify-center cursor-pointer transition-all duration-300 select-none ${
        compact
          ? "w-9 h-9 rounded-xl"
          : "h-9 px-2 sm:px-2.5 rounded-xl gap-2"
      } ${className}`}
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.95) 100%)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark
          ? "0 4px 15px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          : "0 4px 15px -2px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20"
            : "bg-gradient-to-r from-amber-400/20 to-orange-400/20"
        }`}
      />

      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="dark"
              initial={{ y: -12, opacity: 0, rotate: -60, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 12, opacity: 0, rotate: 60, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="flex items-center gap-1.5 text-cyan-400 group-hover:text-cyan-300"
            >
              <div className="relative">
                <Moon className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300 fill-cyan-400/20" />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px]"
                />
              </div>
              {!compact && (
                <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider uppercase text-slate-300 group-hover:text-white transition-colors">
                  Dark
                </span>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ y: -12, opacity: 0, rotate: 60, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 12, opacity: 0, rotate: -60, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="flex items-center gap-1.5 text-amber-500 group-hover:text-amber-600"
            >
              <div className="relative">
                <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 duration-500 fill-amber-400/30" />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Sparkles className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                </motion.span>
              </div>
              {!compact && (
                <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider uppercase text-slate-700 group-hover:text-slate-900 transition-colors">
                  Light
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default ThemeToggle;
