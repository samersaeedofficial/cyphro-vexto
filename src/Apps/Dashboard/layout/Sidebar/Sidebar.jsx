import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  ScanLine,
  Globe,
  ShieldAlert,
  Mail,
  Users,
  Search,
  Eye,
  FileText,
  Key,
  Lock,
  Code2,
  Brain,
  Bug,
  Cpu,
  Server,
  VenetianMask,
  FileSearch,
  BarChart3,
  ChevronRight,
  Network,
  Zap,
  Database,
  AlertTriangle,
  Terminal,
  Radio,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const MODULES = [
  {
    category: "Network & WiFi",
    icon: Wifi,
    color: "#06b6d4",
    items: [
      { id: "wifi-analyzer", label: "WiFi Analyzer", icon: Wifi },
      { id: "port-scanner", label: "Port Scanner", icon: ScanLine },
      { id: "packet-sniffer", label: "Packet Sniffer", icon: Radio },
      { id: "mitm", label: "MitM Attack", icon: Network },
      { id: "dns-tools", label: "DNS Tools", icon: Globe },
    ],
  },
  {
    category: "Social Engineering",
    icon: Users,
    color: "#a855f7",
    items: [
      { id: "phishing", label: "Phishing Manager", icon: Mail },
      { id: "social-engineering", label: "SE Toolkit", icon: Users },
      { id: "email-spoofing", label: "Email Spoofing", icon: AlertTriangle },
    ],
  },
  {
    category: "OSINT",
    icon: Eye,
    color: "#eab308",
    items: [
      { id: "osint", label: "OSINT Framework", icon: Eye },
      { id: "recon", label: "Reconnaissance", icon: Search },
      { id: "metadata", label: "Metadata Extractor", icon: FileSearch },
    ],
  },
  {
    category: "Web Vulnerabilities",
    icon: ShieldAlert,
    color: "#f97316",
    items: [
      { id: "web-scanner", label: "Web Scanner", icon: ShieldAlert },
      { id: "sql-injection", label: "SQL Injection", icon: Database },
      { id: "xss", label: "XSS Suite", icon: Code2 },
      { id: "dir-bruteforce", label: "Dir Bruteforcer", icon: Server },
    ],
  },
  {
    category: "Password & Auth",
    icon: Key,
    color: "#ef4444",
    items: [
      { id: "password-cracker", label: "Password Cracker", icon: Key },
      { id: "password-generator", label: "Wordlist Gen", icon: FileText },
      { id: "credential-stuffing", label: "Credential Stuffing", icon: Lock },
    ],
  },
  {
    category: "Exploitation",
    icon: Zap,
    color: "#f43f5e",
    items: [
      { id: "exploit-db", label: "Exploit Database", icon: Database },
      { id: "payload-generator", label: "Payload Generator", icon: Terminal },
      { id: "privilege-escalation", label: "Priv Escalation", icon: Shield },
    ],
  },
  {
    category: "Crypto & Stego",
    icon: Lock,
    color: "#22c55e",
    items: [
      { id: "crypto", label: "Cryptography", icon: Lock },
      { id: "steganography", label: "Steganography", icon: FileText },
    ],
  },
  {
    category: "Forensics & Analysis",
    icon: Brain,
    color: "#3b82f6",
    items: [
      { id: "forensics", label: "Digital Forensics", icon: FileSearch },
      { id: "malware-analysis", label: "Malware Analysis", icon: Bug },
      { id: "reverse-engineering", label: "Reverse Engineering", icon: Cpu },
      { id: "log-analyzer", label: "Log Analyzer", icon: BarChart3 },
    ],
  },
  {
    category: "Anonymous & Privacy",
    icon: VenetianMask,
    color: "#14b8a6",
    items: [
      { id: "anonymizer", label: "Anonymizer", icon: VenetianMask },
      { id: "darkweb", label: "Dark Web Monitor", icon: Globe },
    ],
  },
  {
    category: "Reporting",
    icon: FileText,
    color: "#6366f1",
    items: [{ id: "reporting", label: "Report Generator", icon: FileText }],
  },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const [location] = useLocation();
  const [openCategories, setOpenCategories] = useState({});
  const [activePopup, setActivePopup] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [windowSize, setWindowSize] = useState({ h: window.innerHeight, w: window.innerWidth });
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowSize({ h: window.innerHeight, w: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (cat) => {
    setOpenCategories((prev) => ({
      ...prev,
      [cat]: prev[cat] === false ? true : false
    }));
  };

  const handleCategoryClick = (section, e) => {
    if (collapsed) {
      if (activePopup?.category === section.category) {
        setActivePopup(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        
        // High-fidelity dimensions
        const headerHeight = 64; 
        const paddingHeight = 16; 
        const itemHeight = 56; 
        const maxContentHeight = 400; 
        const menuWidth = 256; 
        
        const estimatedContentHeight = Math.min(section.items.length * itemHeight, maxContentHeight);
        const menuHeight = headerHeight + paddingHeight + estimatedContentHeight;
        
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        
        // Calculate the relative position inside the sidebar
        let topPos = rect.top - sidebarRect.top;
        
        // If bottom overflows the viewport, flip it up
        if (rect.top + menuHeight > windowSize.h - 20) {
          topPos = (rect.bottom - sidebarRect.top) - menuHeight;
        }

        // Horizontal positioning (relative to sidebar)
        let leftPos = rect.right - sidebarRect.left + 12;
        if (rect.right + menuWidth > windowSize.w - 20) {
          leftPos = (rect.left - sidebarRect.left) - menuWidth - 12;
        }

        // Safety check for top boundary
        if (topPos + sidebarRect.top < 20) {
          topPos = 20 - sidebarRect.top;
        }
        
        setPopupPos({ top: topPos, left: leftPos });
        setActivePopup(section);
      }
    } else {
      toggleCategory(section.category);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActivePopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!collapsed) setActivePopup(null);
  }, [collapsed]);

  const getActiveModule = () => {
    for (const section of MODULES) {
      const item = section.items.find(i => `/modules/${i.id}` === location);
      if (item) return { ...item, sectionColor: section.color };
    }
    return null;
  };

  const activeModule = getActiveModule();

  return (
    <motion.aside
      ref={sidebarRef}
      initial={false}
      animate={{
        width: collapsed ? 80 : 280,
        opacity: 1
      }}
      className="fixed left-4 top-[4.5rem] bottom-4 z-40 flex flex-col group/sidebar overflow-visible rounded-[1.5rem] overscroll-behavior-none"
      style={{
        background: "rgba(10, 15, 30, 0.65)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Clipping Wrapper to ensure scrollbar follows rounding */}
      <div className="flex-1 flex flex-col overflow-hidden rounded-[1.5rem]">
        {/* Fixed Top Section: Dashboard Link */}
        <div className="px-3 pt-6 pb-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 py-3 rounded-2xl transition-all duration-300 group ${collapsed ? "justify-center px-0" : "px-4"} ${location === "/dashboard"
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
              : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
          >
            <Terminal className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${location === "/dashboard" ? "text-blue-400" : "text-slate-500"}`} />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-black text-[11px] uppercase tracking-[0.2em] whitespace-nowrap"
                >
                  Command Center
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Scrollable content: Modules & Categories */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden pb-8 custom-sidebar overscroll-contain touch-pan-y ${collapsed ? "px-2" : "px-3"}`}>
          <div className="space-y-4">
            {MODULES.map((section) => {
              const SectionIcon = section.icon;
              const isOpen = openCategories[section.category] !== false;

              return (
                <div key={section.category} className="space-y-1 relative">
                  <button
                    onClick={(e) => handleCategoryClick(section, e)}
                    className={`w-full flex items-center gap-3 py-2 rounded-2xl transition-all duration-300 group hover:bg-white/10 ${collapsed ? "justify-center px-0" : "justify-between px-3"} ${collapsed && activePopup?.category === section.category ? "bg-white/10 border-white/20" : ""
                      }`}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <div className={`flex items-center min-w-0 ${collapsed ? "" : "gap-3"}`}>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: `${section.color}08`,
                          border: `1px solid ${section.color}15`
                        }}
                      >
                        <SectionIcon className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: section.color }} />
                      </div>
                      {!collapsed && (
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate group-hover:text-white transition-colors">
                          {section.category}
                        </span>
                      )}
                    </div>
                    {!collapsed && (
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className="flex items-center justify-center w-5 h-5 rounded-lg bg-white/2 border border-white/5"
                      >
                        <ChevronRight className="w-2.5 h-2.5 text-slate-600 group-hover:text-slate-300" />
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {!collapsed && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden space-y-1 pl-4"
                      >
                        {section.items.map((item) => {
                          const ItemIcon = item.icon;
                          const active = location === `/modules/${item.id}`;
                          const themeColor = section.color;

                          return (
                            <Link
                              key={item.id}
                              href={`/modules/${item.id}`}
                              className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group/item overflow-hidden"
                              style={{
                                background: active ? `${themeColor}15` : "transparent",
                                border: `1px solid ${active ? `${themeColor}30` : "transparent"}`,
                                boxShadow: active ? `0 0 15px ${themeColor}15` : "none",
                              }}
                            >
                              {/* Dynamic Glow Background for Active Item */}
                              {active && (
                                <div
                                  className="absolute inset-0 opacity-20 pointer-events-none"
                                  style={{
                                    background: `radial-gradient(circle at center, ${themeColor}, transparent)`,
                                    filter: "blur(10px)",
                                  }}
                                />
                              )}

                              <ItemIcon className={`w-3.5 h-3.5 shrink-0 relative z-10 transition-colors duration-300 ${active ? "" : "text-slate-600 group-hover/item:text-slate-400"}`}
                                style={{ color: active ? themeColor : undefined }}
                              />
                              <span className={`text-xs font-bold truncate relative z-10 transition-colors duration-300 ${active ? "text-white" : "text-slate-500 group-hover/item:text-slate-200"}`}>
                                {item.label}
                              </span>

                              {active && (
                                <div
                                  className="ml-auto w-1 h-1 rounded-full relative z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                  style={{ background: themeColor }}
                                />
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {collapsed && !activePopup && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-full ml-4 px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl"
                    >
                      {section.category}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <div className="p-4 mt-auto border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/btn shadow-lg backdrop-blur-md"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5 text-blue-400 transition-transform group-hover/btn:scale-110" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 text-slate-500 group-hover/btn:text-blue-400 transition-all" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover/btn:text-blue-400">Collapse Panel</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Global Flyout (Rendered outside clipping container to prevent clipping) */}
      <AnimatePresence>
        {collapsed && activePopup && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute w-64 rounded-3xl overflow-hidden z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
            style={{
              top: popupPos.top,
              left: popupPos.left,
              background: "rgba(10, 15, 30, 0.95)",
              backdropFilter: "blur(40px)",
            }}
          >
            <div className="p-4 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${activePopup.color}15`,
                    border: `1px solid ${activePopup.color}20`
                  }}
                >
                  <activePopup.icon className="w-4 h-4" style={{ color: activePopup.color }} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white">
                  {activePopup.category}
                </span>
              </div>
            </div>
            <div 
              className="p-2 overflow-y-auto custom-sidebar"
              style={{ maxHeight: `min(400px, ${windowSize.h - popupPos.top - 100}px)` }}
            >
              {activePopup.items.map((item) => {
                const ItemIcon = item.icon;
                const active = location === `/modules/${item.id}`;
                return (
                  <Link
                    key={item.id}
                    href={`/modules/${item.id}`}
                    onClick={() => setActivePopup(null)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group/item ${active ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/2 flex items-center justify-center border border-white/5 group-hover/item:border-white/10 transition-colors">
                      <ItemIcon className={`w-3.5 h-3.5 ${active ? "" : "text-slate-400"}`} style={{ color: active ? activePopup.color : undefined }} />
                    </div>
                    <span className={`text-[11px] font-bold ${active ? "text-white" : "text-slate-400 group-hover/item:text-slate-200"}`}>
                      {item.label}
                    </span>
                    {active && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-sidebar {
          scrollbar-width: thin;
          overscroll-behavior: contain;
        }
        .custom-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-sidebar::-webkit-scrollbar-track {
          background: transparent;
          margin: 10px 0;
        }
        .custom-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
        }
        .custom-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .custom-sidebar::-webkit-scrollbar-button {
          display: none;
        }
        ${collapsed ? `
        .custom-sidebar::-webkit-scrollbar {
          display: none;
        }
        .custom-sidebar {
          scrollbar-width: none;
        }
        ` : ""}
      `}} />
    </motion.aside>
  );
}
