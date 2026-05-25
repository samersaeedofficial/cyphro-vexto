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
import TemplateSelectionPage from "./AttackCardsGrid/components/TemplateSelectionPage"; // Imported Separate Route View

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

  // FIXED: Render separate standalone sub-route page layout view conditionally
  if (currentView === "fake-login-select") {
    return <TemplateSelectionPage onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-[#0d0c16] text-gray-100 transform-gpu animate-in fade-in duration-300\">
      <div className="border-b border-gray-800/60 bg-[#0f0e1a]\">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl shadow-lg shadow-purple-500/5">
              <Shield className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  Social Engineering Shell
                </h1>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black rounded-md tracking-wider uppercase">
                  Live Environment
                </span>
              </div>
              <p className="text-sm text-gray-400 font-medium mt-0.5">
                Deploy simulation frameworks to analyze human vector
                vulnerabilities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="bg-[#131224] border border-gray-800/80 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-inner flex-1 md:flex-initial">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-md shadow-purple-400/50"></span>
              <span className="text-gray-400 text-sm font-semibold">
                Success Rate:{" "}
                <strong className="text-white font-extrabold font-mono">
                  68%
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* PACKAGED CONTAINER FOR CARDS WITH BACKGROUND FIX SEPARATION */}
        <div className="w-full bg-[#1c1b2b] border border-gray-700/40 rounded-[28px] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/[0.01] rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                <Zap className="w-5 h-5 text-purple-400" />
                Attack Templates
              </h2>
              <p className="text-sm text-gray-300/80 mt-0.5 font-medium">
                Choose an optimized pre-built attack vector deployment
              </p>
            </div>
            <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-0.5 group">
              View all templates
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* FIXED: Passing route callback state handler interface trigger properly */}
          <div className="relative z-10">
            <AttackCardsGrid
              attackCards={attackCards}
              onSelectSpecialTemplate={() =>
                setCurrentView("fake-login-select")
              }
            />
          </div>
        </div>

        {/* Custom Attack Builder Component */}
        <CustomAttackBuilder />

        {/* Recent Activity Log Component */}
        <RecentActivityLog />
      </div>
    </div>
  );
};

export default PhishingManager;
