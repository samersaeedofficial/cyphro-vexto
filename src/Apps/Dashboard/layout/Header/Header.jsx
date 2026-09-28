import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { User, Wifi, WifiOff, Cpu, Shield, Activity } from "lucide-react";
import { CyphroLogoFull } from "@/components/CyphroLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme";
import GlobalSearch from "./GlobalSearch";
import { motion } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const parts = location.split("/").filter(Boolean);
  const currentModule = parts[parts.length - 1] || "dashboard";
  const formattedModule = currentModule
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <header
      className="h-16 fixed top-0 w-full z-50 flex items-center justify-between px-6 transition-colors duration-300"
      style={{
        background: isDark
          ? "linear-gradient(90deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(79, 70, 229, 0.2) 100%)"
          : "linear-gradient(90deg, rgba(240, 246, 255, 0.88) 0%, rgba(255, 255, 255, 0.92) 50%, rgba(245, 243, 255, 0.88) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isDark
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark
          ? "0 4px 30px rgba(0, 0, 0, 0.5)"
          : "0 4px 30px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-300"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.3) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 50%, transparent 100%)",
          boxShadow: isDark ? "0 0 10px rgba(34,211,238,0.2)" : "0 0 10px rgba(59,130,246,0.15)",
        }}
      />

      <div className="flex items-center gap-6 flex-1 min-w-0">
        <Link href="/" className="cursor-pointer group transition-transform hover:scale-105 shrink-0" data-testid="link-home">
          <CyphroLogoFull height={32} isDark={isDark} />
        </Link>

        <div className={`h-4 w-px hidden md:block shrink-0 ${isDark ? "bg-slate-800" : "bg-slate-300"}`} />

        <GlobalSearch />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Connection Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm transition-all duration-500 ${
            isOnline
              ? isDark
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-emerald-50 text-emerald-600 border-emerald-300"
              : isDark
                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                : "bg-rose-50 text-rose-600 border-rose-300"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                System Online
              </span>
            </>
          ) : (
            <>
              <WifiOff size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Offline Mode
              </span>
            </>
          )}
        </motion.div>

        {/* Theme Mode Switcher */}
        <ThemeToggle />

        {/* CPU Interface Status */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-all ${
              isDark
                ? "hover:bg-white/5 hover:border-cyan-500/30 text-cyan-400"
                : "hover:bg-slate-100 hover:border-blue-500/30 text-blue-600"
            }`}
            style={{
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)",
            }}
          >
            <Cpu className="w-4 h-4" />
          </motion.div>

          {/* Hover Interface Status Card */}
          <div className="absolute top-full right-0 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <div 
              className={`min-w-[200px] p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl relative overflow-hidden ${
                isDark
                  ? "border-white/10 text-slate-200"
                  : "border-slate-200 text-slate-800"
              }`}
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.95) 100%)",
                boxShadow: isDark
                  ? "0 20px 40px rgba(0,0,0,0.6)"
                  : "0 20px 40px rgba(0,0,0,0.12)",
              }}
            >
              {/* Decorative background glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-[40px] rounded-full" />
              
              <div className="relative z-10 flex flex-col gap-3">
                <div className={`flex items-center justify-between pb-2 border-b ${isDark ? "border-white/5" : "border-slate-200"}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Interface Status
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-medium uppercase tracking-tighter ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      Current Mode
                    </span>
                    <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${
                      isDark ? "bg-white/5 border-white/5 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}>
                      <Shield size={12} className={isDark ? "text-cyan-400" : "text-blue-600"} />
                      <span className="text-xs font-semibold">Monitor / Managed</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-medium uppercase tracking-tighter ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      Active Interface
                    </span>
                    <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${
                      isDark ? "bg-white/5 border-white/5 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}>
                      <Activity size={12} className="text-emerald-500" />
                      <span className="text-xs font-mono font-medium tracking-tight">wlan0mon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Icon */}
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-all ${
            isDark
              ? "hover:bg-white/5 hover:border-cyan-500/30 text-cyan-400"
              : "hover:bg-slate-100 hover:border-blue-500/30 text-blue-600"
          }`}
          style={{
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)",
          }}
          data-testid="user-menu"
        >
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}

