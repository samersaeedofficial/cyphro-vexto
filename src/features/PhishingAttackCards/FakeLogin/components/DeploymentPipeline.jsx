// components/DeploymentPipeline.jsx
import React from "react";
import {
  ExternalLink,
  Monitor,
  Globe,
  Cpu,
  Terminal,
  Radio,
  Network,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";

// Flattened & High-Identity Deployment Vectors Data
const unifiedDeploymentNodes = [
  {
    name: "Free Hosting Cloud Sites",
    description:
      "Deploy audit interface prototypes on generalized community cloud architectures instantly.",
    badge: "Cloud Routing",
    icon: Globe,
    roleTheme:
      "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 hover:border-emerald-400 text-emerald-400",
    glowColor: "shadow-emerald-500/5",
  },
  {
    name: "Evil Twin Framework Simulation",
    description:
      "Analyze interface behavior under access point simulation controls within isolated wireless labs.",
    badge: "Wireless Labs",
    icon: Network,
    roleTheme:
      "from-blue-500/20 to-indigo-500/10 border-blue-500/30 hover:border-blue-400 text-blue-400",
    glowColor: "shadow-blue-500/5",
  },
  {
    name: "DNS Spoofing / ARP Poisoning View",
    description:
      "Evaluate credential transit robustness across simulated localized directory routing arrays.",
    badge: "Network Audit",
    icon: Radio,
    roleTheme:
      "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 hover:border-cyan-400 text-cyan-400",
    glowColor: "shadow-cyan-500/5",
  },
  {
    name: "Local Web Server Framework",
    description:
      "Establish responsive localized testing suites on modern standard loopback network arrays.",
    badge: "Localhost v4/v6",
    icon: Terminal,
    roleTheme:
      "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 hover:border-indigo-400 text-indigo-400",
    glowColor: "shadow-indigo-500/5",
  },
  {
    name: "Matrix QR Generation Setup",
    description:
      "Embed localized evaluation vectors into functional graphic dynamic physical blocks.",
    badge: "Physical Vector",
    icon: QrCode,
    roleTheme:
      "from-purple-500/20 to-pink-500/10 border-purple-500/30 hover:border-purple-400 text-purple-400",
    glowColor: "shadow-purple-500/5",
  },
  {
    name: "USB Hardware Emulation Mock",
    description:
      "Simulate keystroke script deployment architectures within offline diagnostics units.",
    badge: "HID Simulation",
    icon: Cpu,
    roleTheme:
      "from-pink-500/20 to-rose-500/10 border-pink-500/30 hover:border-pink-400 text-pink-400",
    glowColor: "shadow-pink-500/5",
  },
];

class DeploymentPipeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: "",
    };
  }

  handleNodeExecution = (methodName) => {
    alert(
      `Deployment prototype setup initialized for technique: ${methodName}`,
    );
  };

  render() {
    const { activeTemplate, metaVariant, handleFullPreview, onBack } =
      this.props;
    const { redirectUrl } = this.state;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 font-sans text-zinc-200">
        {/* ==========================================
           LEFT ARCHITECTURE: RADAR INFRASTRUCTURE CONFIG
           ========================================== */}
        <div className="lg:col-span-1 space-y-5">
          {/* Active Template Glass-Card */}
          <div className="bg-[#0f1322]/50 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${activeTemplate.accentColor} opacity-[0.04] rounded-full blur-2xl pointer-events-none`}
            />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-mono font-black uppercase rounded">
                  Active Framework
                </span>
                <span className="text-[10px] font-mono text-zinc-500 font-bold">
                  {activeTemplate.version}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-black text-white tracking-tight">
                  {activeTemplate.title}
                </h2>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Component framework is verified. Select any vector node on the
                  right to execute mounting pipelines.
                </p>
              </div>

              {/* Glass-Canvas Integrated Frame Preview */}
              <div className="w-full h-40 bg-[#060810]/90 border border-zinc-850 rounded-xl p-3 flex items-center justify-center relative shadow-inner">
                <div className="absolute top-2 left-2 flex items-center gap-1 opacity-40">
                  <Monitor className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] font-mono text-white uppercase tracking-wider">
                    Blueprint Vector
                  </span>
                </div>
                <div className="w-full h-full max-w-[160px]">
                  {activeTemplate.htmlSnippet(metaVariant)}
                </div>
              </div>

              {/* Functional Matrix Parameters Checklist */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-black tracking-widest text-zinc-500 block">
                  Integration Metrics
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {activeTemplate.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[#121829]/40 border border-zinc-800/40 p-2 rounded-lg text-xs text-zinc-300"
                    >
                      <Cpu className="w-3.5 h-3.5 text-purple-400/80 flex-shrink-0" />
                      <span className="truncate font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="mt-5 pt-4 border-t border-zinc-800/60">
              <button
                type="button"
                onClick={(e) => handleFullPreview(e, activeTemplate.previewUrl)}
                className="w-full py-2.5 bg-[#161c32]/60 hover:bg-[#1d2542] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow"
              >
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                Launch Full Spec Screen
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
           RIGHT ARCHITECTURE: UNIFIED GRID CHANNELS
           ========================================== */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex bg-[#0f1322]/40 border border-zinc-800/80 p-3.5 rounded-2xl items-center justify-between gap-4">
            <div>
              <h3 className="text-md font-black text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Unified Vector Pipelines
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">
                Click any specific target deployment method below to execute
                standard interface mockup audits.
              </p>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-mono font-bold uppercase tracking-widest rounded">
              Direct Trigger System
            </span>
          </div>

          {/* The High-Readability Glass Premium Grid Suite */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unifiedDeploymentNodes.map((node, index) => {
              const IconComp = node.icon;
              return (
                <div
                  key={index}
                  onClick={() => this.handleNodeExecution(node.name)}
                  className={`group relative bg-gradient-to-b ${node.roleTheme} bg-opacity-[0.03] backdrop-blur-md 
                           border rounded-2xl p-4 cursor-pointer shadow-lg transition-all duration-300 
                           hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 ${node.glowColor}`}
                >
                  {/* Internal Glow Mesh */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.01] group-hover:bg-white/[0.03] rounded-full blur-xl pointer-events-none transition-all" />

                  <div className="space-y-2.5">
                    {/* Header Matrix Info */}
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#0a0d18] border border-zinc-800 rounded-lg text-zinc-300 group-hover:text-white transition-colors">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-black tracking-tight text-white group-hover:text-purple-300 transition-colors">
                          {node.name}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono font-black px-1.5 py-0.5 rounded bg-[#060810] text-zinc-400 border border-zinc-800/80 whitespace-nowrap uppercase tracking-wider">
                        {node.badge}
                      </span>
                    </div>

                    {/* Highly Visible Descriptive Framework */}
                    <p className="text-[11px] text-zinc-400 group-hover:text-zinc-300 font-medium leading-relaxed transition-colors">
                      {node.description}
                    </p>
                  </div>

                  {/* Micro-Interaction Status Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/30 text-[9px] text-zinc-500 font-black tracking-wider uppercase">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400/60 group-hover:animate-spin" />
                      Ready to Launch
                    </span>
                    <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-bold">
                      Execute Node &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DeploymentPipeline;
