// components/CustomAttackBuilder.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Code,
  Lock,
  CreditCard,
  Globe,
  Shield,
  Zap,
  Sparkles,
  Wand2,
  ChevronDown,
  Coins,
  ShoppingBag,
  Mail,
  Building2,
} from "lucide-react";

const templates = [
  {
    id: "login",
    name: "Login Portal",
    icon: <Lock className="w-3.5 h-3.5" />,
    color: "blue",
  },
  {
    id: "payment",
    name: "Payment Gateway",
    icon: <CreditCard className="w-3.5 h-3.5" />,
    color: "emerald",
  },
  {
    id: "social",
    name: "Social Media",
    icon: <Globe className="w-3.5 h-3.5" />,
    color: "purple",
  },
  {
    id: "corporate",
    name: "Corporate VPN",
    icon: <Shield className="w-3.5 h-3.5" />,
    color: "orange",
  },
  {
    id: "email",
    name: "Email Portal",
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "pink",
  },
];

const targetOptions = [
  {
    value: "banking",
    label: "Banking & Finance",
    icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
  },
  {
    value: "social",
    label: "Social Media",
    icon: <Globe className="w-4 h-4 text-blue-400" />,
  },
  {
    value: "email",
    label: "Email Provider",
    icon: <Mail className="w-4 h-4 text-pink-400" />,
  },
  {
    value: "corporate",
    label: "Corporate Portal",
    icon: <Building2 className="w-4 h-4 text-orange-400" />,
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
  },
  {
    value: "crypto",
    label: "Cryptocurrency",
    icon: <Coins className="w-4 h-4 text-yellow-400" />,
  },
];

const CustomAttackBuilder = () => {
  const [customAttackName, setCustomAttackName] = useState("");
  const [customTarget, setCustomTarget] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = () => {
    if (!customAttackName || !customTarget || !selectedTemplate) {
      alert("Please fill all fields and select a template type");
      return;
    }
    const selectedLabel = targetOptions.find(
      (t) => t.value === customTarget,
    )?.label;
    alert(
      `Custom attack "${customAttackName}" generated successfully for ${selectedLabel}!`,
    );
  };

  const selectedTargetData = targetOptions.find(
    (opt) => opt.value === customTarget,
  );

  const getTemplateColor = (templateId, isSelected) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return "";

    const colors = {
      blue: "border-blue-500/40 bg-blue-500/15 text-blue-400 shadow-md shadow-blue-500/5",
      emerald:
        "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-md shadow-emerald-500/5",
      purple:
        "border-purple-500/40 bg-purple-500/15 text-purple-400 shadow-md shadow-purple-500/5",
      orange:
        "border-orange-500/40 bg-orange-500/15 text-orange-400 shadow-md shadow-orange-500/5",
      pink: "border-pink-500/40 bg-pink-500/15 text-pink-400 shadow-md shadow-pink-500/5",
    };

    return isSelected
      ? colors[template.color]
      : "bg-[#181724] border-gray-700/60 text-gray-400 hover:border-gray-600 hover:text-gray-200";
  };

  return (
    <div className="bg-[#222135] border border-gray-700/50 rounded-[24px] p-6 hover:border-purple-500/30 transition-all duration-200 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/[0.01] rounded-full blur-[60px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-purple-500/15 border border-purple-500/30 rounded-xl">
          <Code className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
            Custom Attack Builder
            <Sparkles className="w-4 h-4 text-purple-400" />
          </h2>
          <p className="text-sm text-gray-300/90 font-medium">
            Configure standalone payloads and clone targeting vectors on demand
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-30">
        <div className="min-h-[76px] relative z-10">
          <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
            Attack Name
          </label>
          <input
            type="text"
            value={customAttackName}
            onChange={(e) => setCustomAttackName(e.target.value)}
            placeholder="e.g., Custom Banking Portal"
            className="w-full bg-[#181724] border border-gray-700/60 rounded-xl px-4 py-2.5 text-white 
                     placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 
                     focus:ring-purple-500/20 transition-all duration-200 text-sm font-medium"
          />
        </div>

        <div className="min-h-[76px] relative z-40" ref={dropdownRef}>
          <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
            Target Platform
          </label>

          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`w-full bg-[#181724] border rounded-xl px-4 py-2.5 text-white 
                     text-sm font-medium flex items-center justify-between transition-all duration-200
                     ${showDropdown ? "border-purple-500/60 ring-1 ring-purple-500/20" : "border-gray-700/60"}`}
          >
            {selectedTargetData ? (
              <span className="flex items-center gap-2.5">
                {selectedTargetData.icon}
                <span>{selectedTargetData.label}</span>
              </span>
            ) : (
              <span className="text-gray-500">Select target platform...</span>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDropdown ? "rotate-180 text-purple-400" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute left-0 right-0 mt-2 bg-[#141322] border border-gray-700 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[999] p-1.5">
              <div className="max-h-60 overflow-y-auto custom-dropdown-scrollbar space-y-0.5">
                {targetOptions.map((option) => {
                  const isSelected = customTarget === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setCustomTarget(option.value);
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg 
                               text-left transition-all duration-150 active:scale-[0.99]
                               ${isSelected ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-400 border border-purple-500/30 font-bold" : "text-gray-300 hover:bg-white/[0.03] hover:text-white border border-transparent"}`}
                    >
                      <div className="flex-shrink-0">{option.icon}</div>
                      <span className="flex-1">{option.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="min-h-[76px] relative z-20">
          <label className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
            Template Type
          </label>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplate(template.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold
                         transition-all duration-150 transform active:scale-95 border
                         ${getTemplateColor(template.id, selectedTemplate === template.id)}`}
              >
                {template.icon}
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 
                 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 text-sm font-bold
                 shadow-lg shadow-purple-500/20 group active:scale-95 relative z-10"
      >
        <Wand2 className="w-4 h-4" />
        Generate Custom Attack
      </button>

      <style>{`
        .custom-dropdown-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-dropdown-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-dropdown-scrollbar::-webkit-scrollbar-thumb { background: #2b2a42; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CustomAttackBuilder;
