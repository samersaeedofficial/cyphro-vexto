// components/TemplateSelectionPage.jsx
import React, { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Check,
  ArrowRight,
  Monitor,
  ShieldCheck,
} from "lucide-react";

// Ultra-Professional High-Fidelity Login Mock Templates Data
const loginTemplates = [
  {
    id: "goog-v2",
    title: "Google Workspace Portal",
    version: "v2.8 (2026 Material You)",
    // CHANGED: Linked directly to your internal static route path string for seamless environment switching
    previewUrl: "/template/google-signin",
    accentColor: "from-blue-500 via-red-500 to-yellow-500",
    glowColor: "shadow-blue-500/10",
    features: [
      "OAuth Flow Sync",
      "Mobile Authenticator CSS Match",
      "Responsive Layout Core",
    ],
    htmlSnippet: (
      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800/80 text-slate-200">
        <div className="flex gap-1 mb-3 transform scale-90">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
        </div>
        <div className="w-16 h-1.5 bg-slate-700 rounded mb-1" />
        <div className="w-24 h-1 bg-slate-800 rounded mb-4" />
        <div className="w-full space-y-2 px-1">
          <div className="w-full h-6 border border-slate-800 rounded px-1.5 flex items-center bg-slate-900/40">
            <div className="w-14 h-1 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-full h-6 border border-slate-800 rounded px-1.5 flex items-center bg-slate-900/40">
            <div className="w-10 h-1 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-full h-6 bg-[#1a73e8] hover:bg-[#155cb8] rounded flex items-center justify-center transition-colors shadow-md">
            <div className="w-12 h-1 bg-white rounded-sm" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "meta-v4",
    title: "Meta Core Interface",
    version: "v4.1 (Dynamic UI Suite)",
    previewUrl: "https://www.facebook.com",
    accentColor: "from-blue-600 to-cyan-500",
    glowColor: "shadow-blue-600/10",
    features: [
      "Fluid Canvas Integration",
      "Session Hook Engine",
      "Multi-Language Shell Support",
    ],
    htmlSnippet: (
      <div className="w-full h-full bg-[#0a0f1d] flex flex-col items-center justify-center p-3 rounded-xl border border-blue-500/10 text-white">
        <div className="text-[#1877f2] font-black text-lg mb-2 tracking-tighter select-none">
          meta
        </div>
        <div className="w-20 h-1 bg-slate-800 rounded mb-4" />
        <div className="w-full space-y-2 px-1">
          <div className="w-full h-6 border border-slate-800/80 rounded px-1.5 flex items-center bg-[#070a14]">
            <div className="w-16 h-1 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-full h-6 border border-slate-800/80 rounded px-1.5 flex items-center bg-[#070a14]">
            <div className="w-12 h-1 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-full h-6 bg-[#1877f2] rounded flex items-center justify-center shadow-lg shadow-blue-500/10">
            <div className="w-10 h-1 bg-white rounded-sm" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ms-365",
    title: "Microsoft 365 Enterprise",
    version: "v1.9 (Cloud Auth Layout)",
    previewUrl: "https://login.microsoftonline.com",
    accentColor: "from-amber-500 to-red-500",
    glowColor: "shadow-amber-500/10",
    features: [
      "Azure Tenant Matching",
      "Company Branding Injection",
      "Device Code CSS Grid",
    ],
    htmlSnippet: (
      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800/80">
        <div className="grid grid-cols-2 gap-0.5 mb-2 transform scale-75">
          <div className="w-2 h-2 bg-[#f25f22]" />
          <div className="w-2 h-2 bg-[#7fba00]" />
          <div className="w-2 h-2 bg-[#00a4ef]" />
          <div className="w-2 h-2 bg-[#ffb900]" />
        </div>
        <div className="w-16 h-1 bg-slate-700 rounded mb-4" />
        <div className="w-full space-y-2 px-1">
          <div className="w-full h-6 border-b border-slate-700 flex items-center bg-transparent px-0.5">
            <div className="w-20 h-1 bg-slate-600 rounded-sm" />
          </div>
          <div className="w-8 h-1 bg-slate-500 rounded-sm ml-auto" />
          <div className="w-14 h-6 bg-[#0067b8] rounded-none flex items-center justify-center ml-auto shadow-md">
            <div className="w-6 h-1 bg-white rounded-sm" />
          </div>
        </div>
      </div>
    ),
  },
];

const TemplateSelectionPage = ({ onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // FIXED: Standard routing redirection logic to trigger internal paths context securely
  const handleFullPreview = (e, url) => {
    e.stopPropagation(); // Event bubble block logic
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#0d0c16] text-gray-100 p-6 transform-gpu animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/60 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 bg-[#161527] border border-gray-700/50 rounded-xl text-gray-400 
                       hover:text-white hover:border-purple-500/40 transition-all duration-200 
                       active:scale-95 group shadow-md"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Fake Login Page
                </h1>
                <span className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase rounded-full tracking-wider">
                  Attack Vectors Matrix
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1 font-medium">
                Select a high-fidelity credential interceptor design to mount on
                your runtime framework.
              </p>
            </div>
          </div>
        </div>

        {/* Core Layout Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {loginTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`group relative bg-[#100f1c] border rounded-[22px] p-5 cursor-pointer
                         transition-all duration-300 flex flex-col justify-between transform-gpu
                         hover:-translate-y-1.5 shadow-xl ${
                           isSelected
                             ? "border-purple-500 bg-[#141226]/90 ring-1 ring-purple-500/30 shadow-purple-500/[0.04]"
                             : "border-gray-800/80 hover:border-gray-700 hover:bg-[#131224]"
                         }`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${template.accentColor} opacity-[0.02] rounded-full blur-2xl`}
                />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-4 relative z-20">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white tracking-wide truncate group-hover:text-purple-300 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-gray-500 mt-0.5">
                        {template.version}
                      </p>
                    </div>

                    {/* REDIRECT ACTION BUTTON */}
                    <button
                      type="button"
                      onClick={(e) => handleFullPreview(e, template.previewUrl)}
                      title="Open full template preview layout in new tab window"
                      className="p-2 bg-[#181729] border border-gray-700/60 rounded-xl text-gray-400 
                               hover:text-purple-400 hover:border-purple-500/40 transition-all duration-150 
                               shadow-inner active:scale-90 group-hover:bg-[#1a192e]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div
                    className="w-full h-44 bg-[#06050b] border border-gray-800/80 rounded-xl p-3 mb-5 
                               flex items-center justify-center group-hover:border-purple-500/20 transition-colors relative shadow-inner"
                  >
                    <div className="absolute top-2 left-2 flex items-center gap-1 opacity-30">
                      <Monitor className="w-3 h-3 text-white" />
                      <span className="text-[9px] font-mono text-white">
                        Live CSS Vector
                      </span>
                    </div>
                    <div className="w-full h-full max-w-[190px] transition-transform duration-300 group-hover:scale-[1.02]">
                      {template.htmlSnippet}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-500 block">
                      Specifications Blueprint
                    </span>
                    <ul className="space-y-1.5">
                      {template.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-300/90 font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 border border-purple-400/50 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Modular Payload
                  </span>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? "bg-purple-600 border-purple-500 text-white scale-110 shadow-md shadow-purple-500/20"
                        : "border-gray-700/60 bg-[#0c0b14] text-transparent group-hover:border-gray-600"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Footer Activation Panel */}
        <div className="bg-[#131224] border border-gray-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl hidden sm:block">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                Target Selected:
                <span
                  className={
                    selectedTemplate
                      ? "text-purple-400 font-extrabold font-mono"
                      : "text-gray-500"
                  }
                >
                  {selectedTemplate
                    ? loginTemplates.find((t) => t.id === selectedTemplate)
                        ?.title
                    : "None Selected"}
                </span>
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Click any card template vector variant configuration schema to
                mount variables.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedTemplate}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg ${
              selectedTemplate
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 active:scale-95 shadow-purple-600/10 cursor-pointer"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40 shadow-none"
            }`}
          >
            Proceed to Pipeline Configuration
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionPage;
