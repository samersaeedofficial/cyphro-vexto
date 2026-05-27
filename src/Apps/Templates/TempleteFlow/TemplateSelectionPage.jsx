// components/TemplateSelectionPage.jsx
import React, { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Check,
  ArrowRight,
  Monitor,
  Sparkles,
  Cpu,
} from "lucide-react";
import DeploymentPipeline from "./components/DeploymentPipeline";

// Brand-Specific Premium Structural Mock Data
const loginTemplates = [
  {
    id: "goog-v2",
    title: "Google Workspace Portal",
    version: "v2.8 (Material You)",
    previewUrl: "/template/google-signin",
    cardBg: "bg-gradient-to-b from-[#1a1f2c] to-[#12141c]",
    borderTheme: "border-[#4285F4]/30 hover:border-[#4285F4]/70",
    selectedBorder:
      "border-[#4285F4] ring-1 ring-[#4285F4]/30 shadow-[0_0_20px_rgba(66,133,244,0.15)]",
    badgeBg: "bg-[#4285F4]/10 text-[#669eff] border-[#4285F4]/20",
    accentGlow: "bg-[#4285F4]/5",
    features: [
      "OAuth Flow Sync Matcher",
      "Mobile Authenticator CSS Align",
      "Responsive Layout Core Container",
    ],
    htmlSnippet: () => (
      <div className="w-full h-full bg-[#181a24] flex flex-col items-center justify-center p-2 rounded-xl border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="w-full h-full bg-[#ffffff] rounded-lg p-2.5 flex gap-2 border border-zinc-200 shadow-md">
          <div className="w-1/2 flex flex-col justify-between py-0.5">
            <div>
              <div className="flex gap-[3px] mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              </div>
              <div className="w-10 h-2 bg-[#202124] rounded-sm mb-1.5" />
              <div className="w-[85%] h-[2px] bg-gray-300 rounded-sm mb-[2px]" />
              <div className="w-[60%] h-[2px] bg-gray-300 rounded-sm" />
            </div>
            <div className="w-6 h-1.5 bg-gray-200 rounded-sm" />
          </div>
          <div className="w-1/2 flex flex-col pt-0.5 justify-between">
            <div className="w-full h-5.5 border border-gray-300 rounded-md flex items-center px-1 bg-gray-50">
              <div className="w-8 h-1 bg-gray-400 rounded-sm" />
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="w-5 h-1 bg-gray-300 rounded-sm" />
              <div className="w-8 h-4 bg-[#1a73e8] rounded-md flex items-center justify-center shadow-sm">
                <div className="w-3 h-0.5 bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "meta-v4",
    title: "Meta Core Interface",
    version: "v4.1 (Dynamic UI Suite)",
    previewUrl: "/template/facebook-login",
    cardBg: "bg-gradient-to-b from-[#141929] to-[#0d101d]",
    borderTheme: "border-[#00f2fe]/20 hover:border-[#bf5af2]/60",
    selectedBorder:
      "border-[#bf5af2] ring-1 ring-[#bf5af2]/30 shadow-[0_0_20px_rgba(191,90,242,0.15)]",
    badgeBg: "bg-[#bf5af2]/10 text-[#dca6ff] border-[#bf5af2]/20",
    accentGlow: "bg-[#bf5af2]/5",
    features: [
      "Fluid Canvas Alignment",
      "Interface Hook Engine",
      "Multi-Language Support Shell",
    ],
    htmlSnippet: (variant) => {
      const isInsta = variant === "instagram";
      return (
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-2.5 rounded-xl border border-zinc-800 relative overflow-hidden bg-[#0c0f1d]`}
        >
          <div
            className={`absolute inset-0 opacity-15 bg-gradient-to-br ${isInsta ? "from-[#ff3040] via-[#b92b27] to-[#1565c0]" : "from-[#1877f2] to-[#00d2ff]"}`}
          />

          {isInsta ? (
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] font-serif italic text-base font-black mb-2 tracking-tight select-none relative z-10">
              Instagram
            </div>
          ) : (
            <div className="text-[#1877f2] font-black text-base mb-2 tracking-tighter select-none relative z-10">
              meta
            </div>
          )}

          <div className="w-full space-y-2 px-0.5 relative z-10">
            <div className="w-full h-5 border border-zinc-700/50 rounded-md px-1.5 flex items-center bg-[#111424]">
              <div className="w-12 h-1 bg-zinc-500 rounded-sm" />
            </div>
            <div className="w-full h-5 border border-zinc-700/50 rounded-md px-1.5 flex items-center bg-[#111424]">
              <div className="w-8 h-1 bg-zinc-500 rounded-sm" />
            </div>
            <div
              className={`w-full h-5 rounded-md flex items-center justify-center shadow-md ${
                isInsta
                  ? "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                  : "bg-[#1877f2]"
              }`}
            >
              <div className="w-6 h-1 bg-white rounded-sm" />
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "ms-365",
    title: "Microsoft 365 Enterprise",
    version: "v1.9 (Cloud Layout)",
    previewUrl: "/template/microsoft-login",
    // Microsoft Theme: Solid enterprise tech clean corporate ambiance slate blue
    cardBg: "bg-gradient-to-b from-[#112233] to-[#0a1420]",
    borderTheme: "border-[#00a4ef]/20 hover:border-[#00a4ef]/60",
    selectedBorder:
      "border-[#00a4ef] ring-1 ring-[#00a4ef]/30 shadow-[0_0_20px_rgba(0,164,239,0.15)]",
    badgeBg: "bg-[#00a4ef]/10 text-[#5cd2ff] border-[#00a4ef]/20",
    accentGlow: "bg-[#00a4ef]/5",
    features: [
      "Tenant Matching Environment",
      "Branding Template Injector",
      "Device Authentication Grid",
    ],
    htmlSnippet: () => (
      <div className="w-full h-full bg-[#0d1b2a] flex flex-col items-center justify-center p-2.5 rounded-xl border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="w-full bg-[#ffffff] rounded-lg p-2.5 flex flex-col items-center shadow-md border border-zinc-200">
          <div className="grid grid-cols-2 gap-[2px] mb-2 transform scale-75">
            <div className="w-2.5 h-2.5 bg-[#f25f22]" />
            <div className="w-2.5 h-2.5 bg-[#7fba00]" />
            <div className="w-2.5 h-2.5 bg-[#00a4ef]" />
            <div className="w-2.5 h-2.5 bg-[#ffb900]" />
          </div>
          <div className="w-full space-y-2 px-0.5">
            <div className="w-full h-5 border-b border-gray-200 flex items-center bg-transparent px-0.5">
              <div className="w-12 h-1 bg-gray-400 rounded-sm" />
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <div className="w-8 h-1 bg-gray-400 rounded-sm" />
              <div className="w-12 h-5 bg-[#0067b8] rounded-md flex items-center justify-center shadow-sm">
                <div className="w-4 h-0.5 bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const TemplateSelectionPage = ({ onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [metaVariant, setMetaVariant] = useState("facebook");
  const [currentStep, setCurrentStep] = useState("selection");

  const handleFullPreview = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getSelectedTemplateData = () => {
    const template = loginTemplates.find((t) => t.id === selectedTemplate);
    if (!template) return null;

    if (template.id === "meta-v4") {
      return {
        ...template,
        title:
          metaVariant === "instagram"
            ? "Instagram Core Interface"
            : "Facebook Core Interface",
        previewUrl:
          metaVariant === "instagram"
            ? "/template/instagram-login"
            : "/template/facebook-login",
      };
    }
    return template;
  };

  const activeTemplate = getSelectedTemplateData();

  return (
    <div className="min-h-screen bg-[#060810] text-zinc-200 p-5 relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Light Static Low-CPU Background Ambient Accents */}
      <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-purple-950/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[30%] h-[30%] bg-blue-950/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* ==========================================
           LIGHTWEIGHT COMPACT HEADER WITH TOP-RIGHT BUTTON
           ========================================== */}
        <div className="bg-[#0e1220] border border-zinc-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={
                currentStep === "configuration"
                  ? () => setCurrentStep("selection")
                  : onBack
              }
              className="p-2.5 bg-[#141b30] border border-zinc-700/60 rounded-xl text-zinc-400 
                       hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200 
                       active:scale-95 flex items-center justify-center shadow"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight">
                  {currentStep === "configuration"
                    ? "Deployment Environment Framework"
                    : "Interface Template Studio"}
                </h1>
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-black uppercase rounded-md tracking-widest flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {currentStep === "configuration" ? "Step 2" : "Step 1"}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-medium max-w-xl">
                {currentStep === "configuration"
                  ? "Map deployment options for your template framework."
                  : "Select an elite component architecture to initiate mockup audits."}
              </p>
            </div>
          </div>

          {/* DYNAMIC TOP-RIGHT NEXT BUTTON */}
          {currentStep === "selection" && (
            <button
              type="button"
              disabled={!selectedTemplate}
              onClick={() => setCurrentStep("configuration")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-200 shadow-md border ${
                selectedTemplate
                  ? "bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 border-transparent text-white active:scale-95 cursor-pointer shadow-purple-600/10"
                  : "bg-zinc-800/40 text-zinc-600 border-zinc-800/60 cursor-not-allowed shadow-none"
              }`}
            >
              Next Core Suite
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ==========================================
           STEP 1: BRAND THEMED COMPACT SELECTION GRID
           ========================================== */}
        {currentStep === "selection" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loginTemplates.map((template) => {
              const isSelected = selectedTemplate === template.id;
              const isMeta = template.id === "meta-v4";

              return (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`group relative ${template.cardBg} border rounded-2xl p-4.5 cursor-pointer
                           transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg ${
                             isSelected
                               ? template.selectedBorder
                               : `${template.borderTheme}`
                           }`}
                >
                  {/* Subtle Accent Glow Overlay */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 ${template.accentGlow} rounded-full blur-xl pointer-events-none`}
                  />

                  <div>
                    {/* Compact Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-3.5 relative z-20">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider font-bold mb-1.5 ${template.badgeBg}`}
                        >
                          <Cpu className="w-2 h-2" />
                          Asset
                        </span>
                        <h3 className="text-sm font-bold text-white tracking-wide truncate transition-colors duration-200">
                          {isMeta && metaVariant === "instagram"
                            ? "Instagram Core Interface"
                            : template.title}
                        </h3>
                        <p className="text-[10px] font-mono text-zinc-500 font-medium">
                          {template.version}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) =>
                          handleFullPreview(
                            e,
                            isMeta && metaVariant === "instagram"
                              ? "/template/instagram-login"
                              : template.previewUrl,
                          )
                        }
                        className="p-2 bg-[#090b11] border border-zinc-800 rounded-lg text-zinc-400 
                                 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200 shadow"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* META SUB-VARIANT SWITCHER */}
                    {isMeta && (
                      <div className="flex bg-[#090c15] p-0.5 rounded-lg border border-zinc-800 gap-1 mb-3.5 relative z-30 shadow-inner">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMetaVariant("facebook");
                            setSelectedTemplate(template.id);
                          }}
                          className={`flex-1 py-1 text-[10px] rounded-md font-black transition-all duration-200 ${
                            metaVariant === "facebook"
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          Facebook
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMetaVariant("instagram");
                            setSelectedTemplate(template.id);
                          }}
                          className={`flex-1 py-1 text-[10px] rounded-md font-black transition-all duration-200 ${
                            metaVariant === "instagram"
                              ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          Instagram
                        </button>
                      </div>
                    )}

                    {/* Compact Low-CPU Live View Canvas */}
                    <div className="w-full h-36 bg-[#080a12] border border-zinc-900 rounded-xl p-3 mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-2 left-2 flex items-center gap-1 opacity-40">
                        <Monitor className="w-2.5 h-2.5 text-zinc-400" />
                        <span className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">
                          Live Canvas
                        </span>
                      </div>
                      <div className="w-full h-full max-w-[170px] flex items-center justify-center">
                        {template.htmlSnippet(metaVariant)}
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500 block">
                        Blueprint Spec
                      </span>
                      <ul className="space-y-1">
                        {template.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium bg-[#090b12]/50 py-1 px-2 rounded-md border border-zinc-800/40"
                          >
                            <div className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Control */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-zinc-600" />
                      Modular Config
                    </span>

                    <div
                      className={`w-5.5 h-5.5 rounded-full flex items-center justify-center border transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white scale-105 shadow"
                          : "border-zinc-700 bg-zinc-900 text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3.5]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ==========================================
           STEP 2: DEPLOYMENT SUITE INJECTION
           ========================================== */}
        {currentStep === "configuration" && activeTemplate && (
          <DeploymentPipeline
            activeTemplate={activeTemplate}
            metaVariant={metaVariant}
            handleFullPreview={handleFullPreview}
            onBack={() => setCurrentStep("selection")}
          />
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;
