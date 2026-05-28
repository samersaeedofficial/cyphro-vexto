import React, { useMemo } from "react";
import {
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Globe2,
  Server,
  Wifi,
  KeyRound,
  LogOut,
} from "lucide-react";

export default function EvilTwinStudio() {
  const templates = useMemo(
    () => [
      {
        id: "router_update",
        name: "Firmware Upgrade Portal",
        type: "Hardware Interface",
        desc: "Clean router admin panel simulation designed to analyze hardware access vector boundaries.",
        metric: "Success Rate: 87%",
        tag: "System",
        routeUrl: "/templates/firmware-upgrade",
        icon: Server,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        borderColor: "group-hover:border-purple-500/30",
      },
      {
        id: "isp_login",
        name: "Broadband Portal Wireframe",
        type: "Network Service",
        desc: "Standardized subscriber login portal replication matching localized ISP broadband systems.",
        metric: "Success Rate: 74%",
        tag: "Telecom",
        routeUrl: "/templates/isp-broadband",
        icon: Globe2,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
        borderColor: "group-hover:border-pink-500/30",
      },
      {
        id: "captive_free",
        name: "Premium Guest Wi-Fi Page",
        type: "Venue Hospitality",
        desc: "Sleek network hospitality captive screen tailored for high-end lounges, hotels, or corporate workspaces.",
        metric: "Success Rate: 68%",
        tag: "Commercial",
        routeUrl: "/templates/guest-wifi",
        icon: Wifi,
        glowColor: "group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]",
        borderColor: "group-hover:border-teal-500/30",
      },
    ],
    [],
  );

  const handleRedirect = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleExit = () => {
    // Custom action for exit trigger (e.g., redirecting to primary control node dashboard)
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#f4f4f5] p-6 md:p-12 font-sans antialiased relative overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Premium Ambient Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/[0.15] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/[0.12] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-teal-900/[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Top Left Navigation Action Row */}
      <div className="max-w-6xl mx-auto mb-6 relative z-20 flex justify-start">
        <button
          onClick={handleExit}
          className="group/exit flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-zinc-400 hover:text-rose-400 bg-[#14161f]/60 backdrop-blur-md border border-white/[0.06] hover:border-rose-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] transition-all duration-300 active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5 transition-transform duration-300 group-hover/exit:-translate-x-0.5" />
          <span>Exit Workspace</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Modern Workspace Dashboard Header */}
        <header className="relative mb-14 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#14161f]/50 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.1]">
          {/* Micro-glow highlight inside the header */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left Side: Brand Identity & Typography */}
            <div className="flex items-center gap-4">
              {/* Icon Wrapper with continuous neon drop shadow effect */}
              <div className="flex-shrink-0 p-3 bg-[#1c1e29] border border-white/[0.08] rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-indigo-500/30 transition-colors duration-300">
                <Layers className="w-5 h-5 text-indigo-400 filter drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-lg font-bold tracking-tight text-white sm:text-2xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Wifi Captive
                  </h1>
                  {/* Minimalist Tech Badge */}
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-medium tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    v2.4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-xl">
                  Select a localized blueprint card. Use the external indicator
                  to inspect layout assets in a separate workspace.
                </p>
              </div>
            </div>

            {/* Right Side: Operational Status Node */}
            <div className="flex items-center gap-3 self-start sm:self-center px-4 py-2.5 rounded-xl font-mono text-xs text-zinc-300 bg-[#161822] border border-white/[0.05] shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-zinc-500">Node:</span>
              <span className="text-zinc-200 font-semibold tracking-wide">
                Stable
              </span>
            </div>
          </div>
        </header>

        {/* Spacious Layout Bento Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tmpl) => {
              const IconComponent = tmpl.icon;
              return (
                <div
                  key={tmpl.id}
                  className={`group relative bg-gradient-to-b from-[#14161d] to-[#111217] border border-white/[0.05] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${tmpl.borderColor} ${tmpl.glowColor}`}
                >
                  {/* Absolute subtle background glow inside card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent rounded-2xl pointer-events-none" />

                  <div>
                    {/* Upper Deck: Badges & Redirect Trigger */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#171a22] border border-white/[0.06] rounded-xl text-zinc-400 group-hover:text-indigo-400 transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400">
                            {tmpl.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium tracking-wide text-indigo-400 bg-indigo-500/[0.08] border border-indigo-500/20 px-2.5 py-1 rounded-md">
                          {tmpl.tag}
                        </span>

                        <button
                          onClick={(e) => handleRedirect(e, tmpl.routeUrl)}
                          className="p-2.5 bg-[#171a22] hover:bg-[#1c202a] border border-white/[0.06] hover:border-white/[0.12] rounded-xl text-zinc-400 hover:text-white transition-all shadow-md active:scale-95 group/btn"
                          title="Open Template View in Next Tab"
                        >
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Content Blocks */}
                    <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-wide">
                      {tmpl.name}
                    </h2>
                    <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed font-normal">
                      {tmpl.desc}
                    </p>
                  </div>

                  {/* Lower Section Metadata Footer */}
                  <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-2 bg-[#171a22]/60 px-2.5 py-1 rounded-md border border-white/[0.02]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {tmpl.metric}
                    </span>
                    <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors flex items-center gap-1 text-[11px]">
                      Inspect Configuration
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
