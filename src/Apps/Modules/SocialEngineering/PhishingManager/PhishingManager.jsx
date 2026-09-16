// PhishingManager.jsx
import React, { useMemo, useState } from "react";
import {
  Shield,
  Plus,
  ChevronRight,
  Zap,
  Globe,
  Smartphone,
  CreditCard,
  Wifi,
  Database,
  Cookie,
} from "lucide-react";
import AttackCardsGrid from "./AttackCardsGrid/AttackCardsGrid";
import CustomAttackBuilder from "./CustomAttackBuilder/CustomAttackBuilder";
import RecentActivityLog from "./RecentActivityLog/RecentActivityLog";
import TemplateSelectionPage from "../../../../features/PhishingAttackCards/FakeLogin/TemplateSelectionPage"; // Imported Separate Route View
import EvilTwinStudio from "./AttackCardsGrid/components/EvilTwinStudio";

const PhishingManager = () => {
  // FIXED: State management handle for separate route page rendering view switching
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard' or 'fake-login-select'

  const attackCards = useMemo(
    () => [
      {
        id: 1,
        title: "Fake Login Page",
        subtitle: "Google/Meta",
        description: "Steal email/pass in simulation",
        icon: <Globe className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        glowColor: "shadow-blue-500/10",
        stats: "1.2k uses",
      },
      {
        id: 2,
        title: "Fake OTP Page",
        subtitle: "2FA Capture",
        description: "Capture 2FA codes",
        icon: <Smartphone className="w-5 h-5" />,
        color: "from-purple-500 to-pink-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        glowColor: "shadow-purple-500/10",
        stats: "840 uses",
      },
      {
        id: 3,
        title: "Credit Card Portal",
        subtitle: "Fintech Mock",
        description: "Simulate checkout gateways",
        icon: <CreditCard className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-400",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        glowColor: "shadow-emerald-500/10",
        stats: "610 uses",
      },
      {
        id: 4,
        title: "Wi-Fi Captive",
        subtitle: "Network Audit",
        description: "Intercept router portals",
        icon: <Wifi className="w-5 h-5" />,
        color: "from-amber-500 to-orange-400",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        glowColor: "shadow-amber-500/10",
        stats: "430 uses",
      },
      {
        id: 5,
        title: "Session Hijacker",
        subtitle: "Cookie Intercept",
        description: "Capture session parameters",
        icon: <Cookie className="w-5 h-5" />,
        color: "from-red-500 to-rose-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        glowColor: "shadow-red-500/10",
        stats: "290 uses",
      },
      {
        id: 6,
        title: "Database Shadow",
        subtitle: "SQL Extraction",
        description: "Mirror mock SQL clusters",
        icon: <Database className="w-5 h-5" />,
        color: "from-indigo-500 to-blue-400",
        bgColor: "bg-indigo-500/10",
        borderColor: "border-indigo-500/20",
        glowColor: "shadow-indigo-500/10",
        stats: "180 uses",
      },
    ],
    [],
  );

  const handleAttackCardNavigation = (cardId) => {
    if (cardId === 1) {
      setCurrentView("fake-login-select");
    } else if (cardId === 4) {
      setCurrentView("evil-twin-studio");
    } else {
      // Temporary placeholder fallback for modules under maintenance
      const targetCard = attackCards.find((c) => c.id === cardId);
      alert(
        `Simulation Mode Active for: ${targetCard?.title}\nLayout routing coming soon.`,
      );
    }
  };

  // FIXED: Render separate standalone sub-route page layout view conditionally
  if (currentView === "fake-login-select") {
    return <TemplateSelectionPage onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "evil-twin-studio") {
    return <EvilTwinStudio />;
  }

  return (
    <div className="w-full min-h-screen transition-colors duration-300">
      <div className="w-full space-y-10 p-4 md:p-8 lg:p-12 will-change-transform">
        {/* ─── Top Header Section (WifiAnalyzer Style) ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Shield className="w-7 h-7 text-purple-600 dark:text-purple-400 animate-pulse" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Social Engineering Shell
              </h1>
              <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg tracking-wider uppercase shadow-sm">
                Live Environment
              </span>
            </div>
            <p className="text-slate-500 font-mono text-xs ml-0 sm:ml-[3.5rem] tracking-wider uppercase">
              Strategic Simulation & Human Vector Analysis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/5 text-slate-700 dark:text-slate-300 font-bold shadow-sm flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 shadow-md shadow-purple-400/50"></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Success Rate:{" "}
                <strong className="text-slate-900 dark:text-white font-extrabold font-mono text-sm">
                  68%
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* ─── Section 1: Attack Templates Container ─── */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Attack Templates
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                Choose an optimized pre-built attack vector deployment
              </p>
            </div>
            <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-0.5 group">
              View all templates
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="relative z-10">
            <AttackCardsGrid
              attackCards={attackCards}
              onSelectSpecialTemplate={handleAttackCardNavigation}
            />
          </div>
        </div>

        {/* ─── Section 2: Custom Attack Builder ─── */}
        <CustomAttackBuilder />

        {/* ─── Section 3: Recent Activity Log ─── */}
        <RecentActivityLog />
      </div>
    </div>
  );
};

export default PhishingManager;

