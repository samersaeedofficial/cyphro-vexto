import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { User, Wifi, WifiOff } from "lucide-react";
import { CyphroLogoFull } from "@/components/CyphroLogo";
import GlobalSearch from "./GlobalSearch";
import { motion } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
      className="h-16 fixed top-0 w-full z-50 flex items-center justify-between px-6"
      style={{
        background: "linear-gradient(90deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(79, 70, 229, 0.2) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.2)]" />

      <div className="flex items-center gap-6 flex-1 min-w-0">
        <Link href="/" className="cursor-pointer group transition-transform hover:scale-105 shrink-0" data-testid="link-home">
          <CyphroLogoFull height={32} />
        </Link>

        <div className="h-4 w-px bg-slate-800 hidden md:block shrink-0" />

        <GlobalSearch />
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {/* Connection Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 shadow-sm transition-all duration-500 ${
            isOnline
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
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

        {/* User Profile Icon */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-all hover:bg-white/5 hover:border-cyan-500/30"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
          data-testid="user-menu"
        >
          <User className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </header>
  );
}
