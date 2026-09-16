import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Terminal,
  Zap,
  X,
  Command,
  Shield,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/lib/theme";

// ─── Module Search Data ───────────────────────────────────────────────────
const MODULES = [
  // Network
  { id: "wifi-analyzer", title: "WiFi Analyzer", type: "Network", path: "/modules/wifi-analyzer", icon: Terminal, color: "#00d4ff", bg: "rgba(0,212,255,0.1)", accent: "#00d4ff" },
  { id: "port-scanner", title: "Port Scanner", type: "Network", path: "/modules/port-scanner", icon: Terminal, color: "#00d4ff", bg: "rgba(0,212,255,0.1)", accent: "#00d4ff" },
  { id: "packet-sniffer", title: "Packet Sniffer", type: "Network", path: "/modules/packet-sniffer", icon: Terminal, color: "#00d4ff", bg: "rgba(0,212,255,0.1)", accent: "#00d4ff" },
  { id: "mitm", title: "MitM Attack", type: "Network", path: "/modules/mitm", icon: Terminal, color: "#00d4ff", bg: "rgba(0,212,255,0.1)", accent: "#00d4ff" },
  
  // Social Engineering
  { id: "phishing", title: "Phishing Manager", type: "Social Engineering", path: "/modules/phishing", icon: Terminal, color: "#c084fc", bg: "rgba(192,132,252,0.1)", accent: "#c084fc" },
  { id: "social-engineering", title: "SE Toolkit", type: "Social Engineering", path: "/modules/social-engineering", icon: Terminal, color: "#c084fc", bg: "rgba(192,132,252,0.1)", accent: "#c084fc" },
  
  // OSINT
  { id: "osint", title: "OSINT Framework", type: "OSINT", path: "/modules/osint", icon: Terminal, color: "#facc15", bg: "rgba(250,204,21,0.1)", accent: "#facc15" },
  { id: "recon", title: "Reconnaissance", type: "OSINT", path: "/modules/recon", icon: Terminal, color: "#facc15", bg: "rgba(250,204,21,0.1)", accent: "#facc15" },
  
  // Web
  { id: "web-scanner", title: "Web Scanner", type: "Web Vulnerabilities", path: "/modules/web-scanner", icon: Terminal, color: "#fb923c", bg: "rgba(251,146,60,0.1)", accent: "#fb923c" },
  { id: "sql-injection", title: "SQL Injection", type: "Web Vulnerabilities", path: "/modules/sql-injection", icon: Terminal, color: "#fb923c", bg: "rgba(251,146,60,0.1)", accent: "#fb923c" },
  { id: "xss", title: "XSS Suite", type: "Web Vulnerabilities", path: "/modules/xss", icon: Terminal, color: "#fb923c", bg: "rgba(251,146,60,0.1)", accent: "#fb923c" },
  
  // Password
  { id: "password-cracker", title: "Password Cracker", type: "Password", path: "/modules/password-cracker", icon: Terminal, color: "#f87171", bg: "rgba(248,113,113,0.1)", accent: "#f87171" },
  { id: "wordlist-generator", title: "Wordlist Forge", type: "Password", path: "/modules/wordlist-generator", icon: Terminal, color: "#f87171", bg: "rgba(248,113,113,0.1)", accent: "#f87171" },
  
  // Exploit
  { id: "exploit-db", title: "Exploit Database", type: "Exploit", path: "/modules/exploit-db", icon: Terminal, color: "#f43f5e", bg: "rgba(244,63,94,0.1)", accent: "#f43f5e" },
  { id: "payload-generator", title: "Payload Generator", type: "Exploit", path: "/modules/payload-generator", icon: Terminal, color: "#f43f5e", bg: "rgba(244,63,94,0.1)", accent: "#f43f5e" },

  // Forensics
  { id: "forensics", title: "Digital Forensics", type: "Forensics", path: "/modules/forensics", icon: Terminal, color: "#60a5fa", bg: "rgba(96,165,250,0.1)", accent: "#60a5fa" },
  { id: "malware-analysis", title: "Malware Analysis", type: "Forensics", path: "/modules/malware-analysis", icon: Terminal, color: "#60a5fa", bg: "rgba(96,165,250,0.1)", accent: "#60a5fa" },
];

function groupResults(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});
}

function HighlightText({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.substring(0, idx)}
      <span className="text-cyan-400 font-black underline decoration-cyan-500/50">
        {text.substring(idx, idx + query.length)}
      </span>
      {text.substring(idx + query.length)}
    </span>
  );
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [, setLocation] = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const filtered = MODULES.filter(m => 
        m.title.toLowerCase().includes(val.toLowerCase()) || 
        m.type.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  const onSelect = (path) => {
    setLocation(path);
    setIsOpen(false);
    setQuery("");
  };

  const grouped = groupResults(results);

  return (
    <div className="relative flex-1 max-w-md mx-4" ref={wrapperRef}>
      <div className="relative group">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
          isDark ? "text-slate-500 group-focus-within:text-cyan-400" : "text-slate-400 group-focus-within:text-blue-600"
        }`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search arsenal modules..."
          className={`w-full h-10 pl-10 pr-12 rounded-xl text-sm outline-none transition-all font-medium ${
            isDark
              ? "bg-white/5 border border-white/10 text-slate-200 focus:border-cyan-500/50 focus:bg-white/10 placeholder:text-slate-500"
              : "bg-black/[0.03] border border-black/10 text-slate-800 focus:border-blue-500 focus:bg-white placeholder:text-slate-400 shadow-sm"
          }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 group-focus-within:opacity-0 transition-opacity pointer-events-none">
          <Command size={10} className={isDark ? "text-slate-500" : "text-slate-400"} />
          <span className={`text-[10px] font-bold ${isDark ? "text-slate-500" : "text-slate-400"}`}>K</span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className={`absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl backdrop-blur-2xl shadow-2xl z-[100] max-h-[400px] overflow-y-auto overflow-x-hidden ${
              isDark
                ? "bg-[#0f172a]/95 border border-white/10 text-slate-200"
                : "bg-white/95 border border-slate-200 text-slate-800 shadow-slate-300/40"
            }`}
          >
            {results.length > 0 ? (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <div className="px-3 py-1 flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>{category}</span>
                    <div className={`flex-1 h-px ${isDark ? "bg-white/5" : "bg-slate-200"}`} />
                  </div>
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.path)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors group text-left ${
                        isDark ? "hover:bg-white/5" : "hover:bg-slate-100"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isDark ? "bg-white/5 border border-white/10 group-hover:border-cyan-500/30" : "bg-slate-100 border border-slate-200 group-hover:border-blue-400"
                      }`}>
                        <item.icon size={14} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                          <HighlightText text={item.title} query={query} />
                        </div>
                        <div className={`text-[10px] font-medium uppercase tracking-tighter ${isDark ? "text-slate-500" : "text-slate-400"}`}>{item.type}</div>
                      </div>
                      <ArrowRight size={14} className={`${isDark ? "text-slate-600" : "text-slate-400"} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all`} />
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Zap size={24} className={`mx-auto mb-3 ${isDark ? "text-slate-700" : "text-slate-300"}`} />
                <p className={`text-sm font-bold tracking-tight ${isDark ? "text-slate-500" : "text-slate-400"}`}>No modules found matching "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
