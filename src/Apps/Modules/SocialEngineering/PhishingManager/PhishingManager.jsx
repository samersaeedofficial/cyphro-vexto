// PhishingManager.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Sparkles,
  ExternalLink,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Layers,
  Cpu,
  Globe,
  Lock,
  X,
  TrendingUp,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { FaGoogle, FaMicrosoft, FaApple, FaLinkedin } from "react-icons/fa6";
import { SiFacebook, SiInstagram } from "react-icons/si";
import DeploymentPipeline from "@/features/PhishingAttackCards/FakeLogin/components/DeploymentPipeline";

// Platform cards specification
const PLATFORM_CARDS = [
  {
    id: "google",
    title: "Google Workspace",
    subtitle: "Accounts & Gmail SSO",
    version: "v2.8 Material You",
    category: "Enterprise SSO",
    stats: "94.2%",
    deployments: "1,420 deployments",
    previewUrl: "/template/google-signin",
    isAvailable: true,
    brandColor: "#4285F4",
    accentColor: "from-blue-500 to-cyan-400",
    glowColor: "shadow-blue-500/20",
    borderTheme: "border-blue-500/30 hover:border-blue-500/80",
    selectedBorder: "border-blue-500 ring-2 ring-blue-500/50 shadow-[0_0_25px_rgba(66,133,244,0.3)]",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    icon: <FaGoogle className="w-5 h-5 text-[#4285F4]" />,
    description:
      "Enterprise Google authentication vector replicating the official multi-step login interface with email verification, 2FA challenge, password entry, and passkey fallback.",
    features: [
      "Multi-step credential flow (Email, Pass, 2FA)",
      "Material You design with authentic Google fonts",
      "Passkey challenge & recovery screen options",
      "Full mobile and desktop responsive viewport",
    ],
    renderMock: () => (
      <div className="w-full h-full bg-[#131314] flex flex-col justify-between p-2 rounded-xl border border-zinc-800 shadow-inner relative overflow-hidden select-none">
        {/* Main Google Dark Card */}
        <div className="w-full bg-[#1e1f20] rounded-xl p-2.5 border border-[#444746]/50 shadow-md flex gap-3 flex-1">
          {/* Left Column */}
          <div className="w-1/2 flex flex-col justify-between py-0.5">
            <div>
              {/* Google G Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 mb-1.5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h4 className="text-white font-normal text-[11px] leading-tight tracking-tight">Sign in</h4>
              <p className="text-[#c4c7c5] text-[6.5px] leading-[9px] mt-1 line-clamp-3">
                with your Google Account. This account will be available to other Google apps in the browser.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 flex flex-col justify-between py-0.5">
            <div>
              {/* Input Box */}
              <div className="w-full border border-[#8e918f]/70 rounded-md px-1.5 py-1 bg-transparent">
                <span className="text-[#c4c7c5] text-[7px] block truncate">Email or phone</span>
              </div>
              <span className="text-[#a8c7fa] text-[6.5px] font-medium block mt-1">Forgot email?</span>
              <p className="text-[#c4c7c5] text-[5.5px] leading-[7.5px] mt-1 line-clamp-2">
                Not your computer? Use Guest mode to sign in privately. <span className="text-[#a8c7fa]">Learn more about using Guest mode</span>
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-2 mt-1.5 pt-0.5">
              <span className="text-[#a8c7fa] text-[6.5px] font-medium">Create account</span>
              <div className="bg-[#a8c7fa] text-[#062e6f] font-semibold text-[7px] px-2.5 py-0.5 rounded-full shadow-sm">
                Next
              </div>
            </div>
          </div>
        </div>

        {/* Micro Footer */}
        <div className="flex items-center justify-between px-1 mt-1 text-[#8e918f] text-[5.5px]">
          <span>English (United States) &#9662;</span>
          <div className="flex items-center gap-1.5">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full bg-[#131314] flex flex-col justify-between p-2 rounded-xl border border-zinc-800 shadow-inner relative overflow-hidden select-none">
        {/* Main Google Dark Card */}
        <div className="w-full bg-[#1e1f20] rounded-xl p-2.5 border border-[#444746]/50 shadow-md flex gap-3 flex-1">
          {/* Left Column */}
          <div className="w-1/2 flex flex-col justify-between py-0.5">
            <div>
              {/* Google G Logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 mb-1.5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h4 className="text-white font-normal text-[11px] leading-tight tracking-tight">Sign in</h4>
              <p className="text-[#c4c7c5] text-[6.5px] leading-[9px] mt-1 line-clamp-3">
                with your Google Account. This account will be available to other Google apps in the browser.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 flex flex-col justify-between py-0.5">
            <div>
              {/* Input Box */}
              <div className="w-full border border-[#8e918f]/70 rounded-md px-1.5 py-1 bg-transparent">
                <span className="text-[#c4c7c5] text-[7px] block truncate">Email or phone</span>
              </div>
              <span className="text-[#a8c7fa] text-[6.5px] font-medium block mt-1">Forgot email?</span>
              <p className="text-[#c4c7c5] text-[5.5px] leading-[7.5px] mt-1 line-clamp-2">
                Not your computer? Use Guest mode to sign in privately. <span className="text-[#a8c7fa]">Learn more about using Guest mode</span>
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-2 mt-1.5 pt-0.5">
              <span className="text-[#a8c7fa] text-[6.5px] font-medium">Create account</span>
              <div className="bg-[#a8c7fa] text-[#062e6f] font-semibold text-[7px] px-2.5 py-0.5 rounded-full shadow-sm">
                Next
              </div>
            </div>
          </div>
        </div>

        {/* Micro Footer */}
        <div className="flex items-center justify-between px-1 mt-1 text-[#8e918f] text-[5.5px]">
          <span>English (United States) &#9662;</span>
          <div className="flex items-center gap-1.5">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "microsoft",
    title: "Microsoft 365",
    subtitle: "Azure AD & Office Cloud",
    version: "v3.2 Fluent Cloud",
    category: "Enterprise SSO",
    stats: "91.8%",
    deployments: "980 deployments",
    previewUrl: "/template/microsoft-login",
    isAvailable: true,
    brandColor: "#00a4ef",
    accentColor: "from-sky-500 to-blue-600",
    glowColor: "shadow-sky-500/20",
    borderTheme: "border-sky-500/30 hover:border-sky-500/80",
    selectedBorder: "border-sky-500 ring-2 ring-sky-500/50 shadow-[0_0_25px_rgba(0,164,239,0.3)]",
    badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    iconBg: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
    icon: <FaMicrosoft className="w-5 h-5 text-[#00a4ef]" />,
    description:
      "Authentic corporate identity gateway mirroring Microsoft 365 and Azure Active Directory sign-in portals with Keep-Me-Signed-In (KMSI) modal flow.",
    features: [
      "Customizable corporate tenant domain injection",
      "Dynamic password & security verification stages",
      "Keep Me Signed In (KMSI) interactive prompt",
      "Official Fluent UI typography & design aesthetic",
    ],
    renderMock: () => (
      <div className="w-full h-full bg-[#0d1424] flex flex-col items-center justify-between p-2.5 relative overflow-hidden select-none">
        {/* Main Microsoft Dark Card */}
        <div className="w-full bg-[#182032] rounded-xl p-2.5 border border-[#2b3954]/60 shadow-md flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="grid grid-cols-2 gap-[1.5px]">
                <div className="w-1.5 h-1.5 bg-[#f25f22]" />
                <div className="w-1.5 h-1.5 bg-[#7fba00]" />
                <div className="w-1.5 h-1.5 bg-[#00a4ef]" />
                <div className="w-1.5 h-1.5 bg-[#ffb900]" />
              </div>
              <span className="text-white text-[9px] font-semibold tracking-tight">Microsoft</span>
            </div>
            <h4 className="text-white font-semibold text-[11px] leading-tight">Sign in</h4>
            <div className="w-full border-b border-[#3b4b6e] mt-2 pb-1">
              <span className="text-[#94a3b8] text-[7px] block">Email, phone, or Skype</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[6px]">
              <span className="text-[#38bdf8]">No account? Create one!</span>
              <span className="text-[#38bdf8]">Can't access your account?</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <div className="bg-[#0067b8] text-white font-medium text-[7px] px-3 py-0.5 rounded shadow-sm">
              Next
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 mt-1 text-[#64748b] text-[5.5px]">
          <span>Sign-in options</span>
          <span>Terms of use</span>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full bg-[#0d1424] flex flex-col items-center justify-between p-2.5 relative overflow-hidden select-none">
        <div className="w-full bg-[#182032] rounded-xl p-2.5 border border-[#2b3954]/60 shadow-md flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="grid grid-cols-2 gap-[1.5px]">
                <div className="w-1.5 h-1.5 bg-[#f25f22]" />
                <div className="w-1.5 h-1.5 bg-[#7fba00]" />
                <div className="w-1.5 h-1.5 bg-[#00a4ef]" />
                <div className="w-1.5 h-1.5 bg-[#ffb900]" />
              </div>
              <span className="text-white text-[9px] font-semibold tracking-tight">Microsoft</span>
            </div>
            <h4 className="text-white font-semibold text-[11px] leading-tight">Sign in</h4>
            <div className="w-full border-b border-[#3b4b6e] mt-2 pb-1">
              <span className="text-[#94a3b8] text-[7px] block">Email, phone, or Skype</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[6px]">
              <span className="text-[#38bdf8]">No account? Create one!</span>
              <span className="text-[#38bdf8]">Can't access your account?</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <div className="bg-[#0067b8] text-white font-medium text-[7px] px-3 py-0.5 rounded shadow-sm">
              Next
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 mt-1 text-[#64748b] text-[5.5px]">
          <span>Sign-in options</span>
          <span>Terms of use</span>
        </div>
      </div>
    ),
  },
  {
    id: "facebook",
    title: "Facebook Core",
    subtitle: "Meta Social Login",
    version: "v4.2 Dynamic Suite",
    category: "Social Media",
    stats: "88.6%",
    deployments: "1,140 deployments",
    previewUrl: "/template/facebook-login",
    isAvailable: true,
    brandColor: "#1877f2",
    accentColor: "from-blue-600 to-indigo-600",
    glowColor: "shadow-blue-600/20",
    borderTheme: "border-blue-600/30 hover:border-blue-600/80",
    selectedBorder: "border-blue-600 ring-2 ring-blue-600/50 shadow-[0_0_25px_rgba(24,119,242,0.3)]",
    badgeBg: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20",
    iconBg: "bg-blue-600/10 border-blue-600/30 text-blue-600 dark:text-blue-400",
    icon: <SiFacebook className="w-5 h-5 text-[#1877f2]" />,
    description:
      "Pixel-accurate Meta Facebook desktop and mobile web portal replica featuring localized multi-language footer, instant credential capture, and recovery links.",
    features: [
      "Two-column desktop view & responsive mobile card",
      "Meta single sign-on brand replica",
      "Real-time form validation & password toggle",
      "Multi-region localized language directory",
    ],
    renderMock: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#18191a] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="text-[#1877f2] font-black text-base tracking-tighter mb-1.5 select-none">
            facebook
          </div>
          <div className="w-full max-w-[210px] bg-[#242526] rounded-xl p-2 border border-zinc-700/50 shadow-md space-y-1.5">
            <div className="w-full h-5 border border-zinc-600/70 rounded-md px-1.5 flex items-center bg-[#3a3b3c]/60">
              <span className="text-zinc-400 text-[6.5px]">Email address or phone number</span>
            </div>
            <div className="w-full h-5 border border-zinc-600/70 rounded-md px-1.5 flex items-center bg-[#3a3b3c]/60">
              <span className="text-zinc-400 text-[6.5px]">Password</span>
            </div>
            <div className="w-full h-5 rounded-md flex items-center justify-center bg-[#1877f2] text-white font-bold text-[7.5px] shadow-sm">
              Log in
            </div>
            <div className="text-center">
              <span className="text-[#2e89ff] text-[6px]">Forgotten password?</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 text-zinc-500 text-[5.5px]">
          <span>Meta &copy; 2026</span>
          <div className="flex gap-1.5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#18191a] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="text-[#1877f2] font-black text-base tracking-tighter mb-1.5 select-none">
            facebook
          </div>
          <div className="w-full max-w-[210px] bg-[#242526] rounded-xl p-2 border border-zinc-700/50 shadow-md space-y-1.5">
            <div className="w-full h-5 border border-zinc-600/70 rounded-md px-1.5 flex items-center bg-[#3a3b3c]/60">
              <span className="text-zinc-400 text-[6.5px]">Email address or phone number</span>
            </div>
            <div className="w-full h-5 border border-zinc-600/70 rounded-md px-1.5 flex items-center bg-[#3a3b3c]/60">
              <span className="text-zinc-400 text-[6.5px]">Password</span>
            </div>
            <div className="w-full h-5 rounded-md flex items-center justify-center bg-[#1877f2] text-white font-bold text-[7.5px] shadow-sm">
              Log in
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "Mobile & Web App Auth",
    version: "v5.0 Social Connect",
    category: "Social Media",
    stats: "89.4%",
    deployments: "890 deployments",
    previewUrl: "/template/instagram-login",
    isAvailable: true,
    brandColor: "#ee2a7b",
    accentColor: "from-pink-500 via-rose-500 to-amber-500",
    glowColor: "shadow-pink-500/20",
    borderTheme: "border-pink-500/30 hover:border-pink-500/80",
    selectedBorder: "border-pink-500 ring-2 ring-pink-500/50 shadow-[0_0_25px_rgba(238,42,123,0.3)]",
    badgeBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    iconBg: "bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border-pink-500/30 text-pink-500",
    icon: <SiInstagram className="w-5 h-5 text-[#ee2a7b]" />,
    description:
      "Sleek Instagram direct login screen replica featuring stylish typography, mobile device framing, app store badge links, and Facebook login integration.",
    features: [
      "Classic Instagram serif typography & branding",
      "Phone / username / email multi-input auth",
      "Continue with Facebook sign-in bridge",
      "App Store & Google Play badge triggers",
    ],
    renderMock: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#000000] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] font-serif italic text-base font-black mb-1.5 tracking-tight select-none">
            Instagram
          </div>
          <div className="w-full max-w-[210px] space-y-1.5">
            <div className="w-full h-5 border border-zinc-800 rounded-md px-1.5 flex items-center bg-[#121212]">
              <span className="text-zinc-500 text-[6.5px]">Phone number, username, or email</span>
            </div>
            <div className="w-full h-5 border border-zinc-800 rounded-md px-1.5 flex items-center bg-[#121212]">
              <span className="text-zinc-500 text-[6.5px]">Password</span>
            </div>
            <div className="w-full h-5 rounded-md flex items-center justify-center bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-bold text-[7.5px] shadow-sm">
              Log in
            </div>
            <div className="flex items-center justify-center gap-1 pt-0.5">
              <span className="text-[#385185] dark:text-[#a8c7fa] text-[6px] font-semibold">Log in with Facebook</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center text-zinc-600 text-[5.5px]">
          <span>from Meta</span>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#000000] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] font-serif italic text-base font-black mb-1.5 tracking-tight select-none">
            Instagram
          </div>
          <div className="w-full max-w-[210px] space-y-1.5">
            <div className="w-full h-5 border border-zinc-800 rounded-md px-1.5 flex items-center bg-[#121212]">
              <span className="text-zinc-500 text-[6.5px]">Phone number, username, or email</span>
            </div>
            <div className="w-full h-5 border border-zinc-800 rounded-md px-1.5 flex items-center bg-[#121212]">
              <span className="text-zinc-500 text-[6.5px]">Password</span>
            </div>
            <div className="w-full h-5 rounded-md flex items-center justify-center bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-bold text-[7.5px] shadow-sm">
              Log in
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "apple",
    title: "Apple ID",
    subtitle: "iCloud & Apple SSO",
    version: "v2.1 Cupertino",
    category: "Cloud Identity",
    stats: "92.0%",
    deployments: "720 deployments",
    previewUrl: null,
    isAvailable: false,
    brandColor: "#a3a3a3",
    accentColor: "from-slate-400 to-zinc-600",
    glowColor: "shadow-slate-400/20",
    borderTheme: "border-slate-400/30 hover:border-slate-400/80",
    selectedBorder: "border-slate-400 ring-2 ring-slate-400/50 shadow-[0_0_25px_rgba(163,163,163,0.3)]",
    badgeBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    iconBg: "bg-slate-500/10 border-slate-500/30 text-slate-700 dark:text-slate-200",
    icon: <FaApple className="w-5 h-5 text-slate-800 dark:text-white" />,
    description:
      "Minimalist Apple ID authentication portal simulation featuring Touch ID / Face ID mock dialogue, two-step device verification code, and iCloud modal styling.",
    features: [
      "Cupertino minimalist frosted glass styling",
      "Sign in with Apple ID modal emulation",
      "Six-digit device 2FA verification prompt",
      "Vector staging & configuration preview",
    ],
    renderMock: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#0a0a0c] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="flex items-center gap-1 text-white font-medium text-[10px] mb-2">
            <FaApple className="w-3.5 h-3.5 text-white" />
            <span>Sign in with Apple ID</span>
          </div>
          <div className="w-full max-w-[210px] space-y-1.5">
            <div className="w-full h-6 border border-zinc-700/80 rounded-lg px-2 flex items-center justify-between bg-zinc-900/90">
              <span className="text-zinc-400 text-[7px]">Apple ID</span>
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-700 flex items-center justify-center text-white text-[7px]">
                &rarr;
              </div>
            </div>
            <div className="flex items-center justify-center pt-0.5">
              <span className="text-[#2997ff] text-[6px]">Forgot Apple ID or password?</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 text-zinc-600 text-[5.5px]">
          <span>Apple ID &bull; Privacy</span>
          <span>System Status</span>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full flex flex-col items-center justify-center p-2.5 relative overflow-hidden bg-[#0a0a0c]">
        <div className="text-white font-medium text-xs mb-2 flex items-center gap-1">
          <FaApple className="w-3.5 h-3.5 text-white" /> Sign in with Apple
        </div>
        <div className="w-full space-y-1.5 px-0.5">
          <div className="w-full h-5 border border-zinc-700/60 rounded-lg px-2 flex items-center justify-between bg-zinc-900">
            <div className="w-16 h-1 bg-zinc-500 rounded-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Executive & Corporate SSO",
    version: "v3.0 Talent Hub",
    category: "Enterprise SSO",
    stats: "87.5%",
    deployments: "540 deployments",
    previewUrl: null,
    isAvailable: false,
    brandColor: "#0a66c2",
    accentColor: "from-sky-600 to-blue-700",
    glowColor: "shadow-sky-600/20",
    borderTheme: "border-sky-600/30 hover:border-sky-600/80",
    selectedBorder: "border-sky-600 ring-2 ring-sky-600/50 shadow-[0_0_25px_rgba(10,102,194,0.3)]",
    badgeBg: "bg-sky-600/10 text-sky-600 dark:text-sky-400 border-sky-600/20",
    iconBg: "bg-sky-600/10 border-sky-600/30 text-sky-600 dark:text-sky-400",
    icon: <FaLinkedin className="w-5 h-5 text-[#0a66c2]" />,
    description:
      "Targeted corporate social engineering vector modeled after LinkedIn business portal, with security pin validation and professional profile sync simulation.",
    features: [
      "Corporate B2B identity gateway replication",
      "Executive email & password credential check",
      "Security verification PIN challenge modal",
      "Vector staging & configuration preview",
    ],
    renderMock: () => (
      <div className="w-full h-full flex flex-col items-center justify-between p-2.5 relative overflow-hidden bg-[#0c111c] select-none">
        <div className="w-full flex flex-col items-center justify-center flex-1">
          <div className="text-[#0a66c2] font-black text-sm mb-1.5 tracking-tight select-none">
            Linked<span className="bg-[#0a66c2] text-white px-0.5 rounded-sm">in</span>
          </div>
          <div className="w-full max-w-[210px] space-y-1.5">
            <div className="w-full h-5 border border-zinc-700/60 rounded-md px-1.5 flex items-center bg-[#131b2e]">
              <span className="text-zinc-400 text-[6.5px]">Email or phone</span>
            </div>
            <div className="w-full h-5 border border-zinc-700/60 rounded-md px-1.5 flex items-center bg-[#131b2e]">
              <span className="text-zinc-400 text-[6.5px]">Password</span>
            </div>
            <div className="w-full h-5 rounded-full flex items-center justify-center bg-[#0a66c2] text-white font-bold text-[7.5px] shadow-sm">
              Sign in
            </div>
            <div className="flex items-center justify-between px-0.5 text-[5.5px]">
              <span className="text-[#0a66c2]">Forgot password?</span>
              <span className="text-zinc-400">Join now</span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between px-1 text-zinc-600 text-[5.5px]">
          <span>LinkedIn Corporation &copy; 2026</span>
          <span>User Agreement</span>
        </div>
      </div>
    ),
    htmlSnippet: () => (
      <div className="w-full h-full flex flex-col items-center justify-center p-2.5 relative overflow-hidden bg-[#0c111c]">
        <div className="text-[#0a66c2] font-black text-sm mb-2 tracking-tight select-none">
          Linked<span className="bg-[#0a66c2] text-white px-0.5 rounded-sm">in</span>
        </div>
        <div className="w-full space-y-1.5 px-0.5">
          <div className="w-full h-4.5 border border-zinc-700/60 rounded-md px-1.5 flex items-center bg-[#131b2e]">
            <div className="w-14 h-1 bg-zinc-500 rounded-sm" />
          </div>
        </div>
      </div>
    ),
  },
];

const CATEGORIES = ["All Platforms", "Enterprise SSO", "Social Media", "Cloud Identity"];

const PhishingManager = () => {
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Platforms");
  const [currentStep, setCurrentStep] = useState("selection"); // 'selection' or 'deployment'

  // Filtered platforms
  const filteredPlatforms = useMemo(() => {
    return PLATFORM_CARDS.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === "All Platforms" || card.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const selectedPlatform = useMemo(() => {
    return PLATFORM_CARDS.find((card) => card.id === selectedPlatformId) || null;
  }, [selectedPlatformId]);

  const handleCardClick = (cardId) => {
    setSelectedPlatformId((prev) => (prev === cardId ? null : cardId));
  };

  const handleProceedNext = () => {
    if (!selectedPlatform) return;
    if (!selectedPlatform.isAvailable && !selectedPlatform.previewUrl) {
      alert(
        `Simulation Vector: "${selectedPlatform.title}" is in staging.\nLaunching simulated pipeline.`,
      );
    }
    setCurrentStep("deployment");
  };

  const handleFullPreview = (e, url) => {
    if (e) e.stopPropagation();
    if (!url) {
      alert("This platform template is currently in development staging.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full min-h-screen relative p-4 sm:p-6 lg:p-10 transition-colors duration-300 pb-36 font-sans">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/[0.04] dark:bg-purple-600/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/[0.04] dark:bg-blue-600/[0.07] rounded-full blur-[130px] pointer-events-none" />

      {/* STEP 2: DEPLOYMENT PIPELINE VIEW */}
      {currentStep === "deployment" && selectedPlatform ? (
        <div className="max-w-7xl mx-auto space-y-6 relative z-10 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep("selection")}
                className="p-2.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm cursor-pointer"
                title="Back to Platform Selection"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Deployment Pipeline & Vectors
                  </h1>
                  <span className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-wider rounded-md">
                    Step 2
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 font-medium">
                  Configuring operational parameters for target:{" "}
                  <strong className="text-purple-600 dark:text-purple-400 font-bold">
                    {selectedPlatform.title}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedPlatform.previewUrl && (
                <button
                  type="button"
                  onClick={(e) => handleFullPreview(e, selectedPlatform.previewUrl)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview Screen
                </button>
              )}
            </div>
          </div>

          {/* Deployment Pipeline Component */}
          <DeploymentPipeline
            activeTemplate={selectedPlatform}
            metaVariant="default"
            handleFullPreview={handleFullPreview}
            onBack={() => setCurrentStep("selection")}
          />
        </div>
      ) : (
        /* STEP 1: MODERN PLATFORM SELECTION PAGE */
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Top Modern Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/25 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex items-center justify-center">
                  <Shield className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      Phishing Platform Studio
                    </h1>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg tracking-wider uppercase shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Vectors
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                    Select a platform authentication card below to initiate and configure simulated audits.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
              <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold shadow-sm flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-md shadow-purple-500/50" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Target Vectors:{" "}
                  <strong className="text-slate-900 dark:text-white font-extrabold font-mono text-sm ml-1">
                    {PLATFORM_CARDS.length} Platforms
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 p-3 rounded-2xl shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms, features, or protocols..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30"
                      : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map((platform) => {
              const isSelected = selectedPlatformId === platform.id;

              return (
                <div
                  key={platform.id}
                  onClick={() => handleCardClick(platform.id)}
                  className={`group relative bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border rounded-3xl p-5 cursor-pointer
                            transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                              isSelected
                                ? platform.selectedBorder
                                : `border-slate-200/90 dark:${platform.borderTheme} hover:-translate-y-1`
                            }`}
                >
                  {/* Subtle Accent Glow Overlay */}
                  <div
                    className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br ${platform.accentColor} opacity-10 group-hover:opacity-20 rounded-full blur-2xl pointer-events-none transition-opacity`}
                  />

                  <div>
                    {/* Top Card Info & Header */}
                    <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl ${platform.iconBg} border transition-transform duration-300 group-hover:scale-105 shadow-sm flex items-center justify-center`}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                              {platform.title}
                            </h3>
                            {platform.isAvailable ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Active Vector" />
                            ) : (
                              <span className="px-1.5 py-0.2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[8px] font-bold rounded uppercase">
                                Staging
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                            {platform.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Preview Button */}
                      {platform.previewUrl && (
                        <button
                          type="button"
                          onClick={(e) => handleFullPreview(e, platform.previewUrl)}
                          className="p-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-sm"
                          title="Open Live Spec"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Visual Blueprint Canvas */}
                    <div className="w-full h-36 sm:h-40 rounded-2xl mb-4 overflow-hidden relative border border-slate-200/90 dark:border-white/10 shadow-sm group-hover:border-purple-500/40 transition-all flex items-center justify-center">
                      {platform.renderMock()}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                      {platform.description}
                    </p>

                    {/* Feature Pills */}
                    <div className="space-y-1.5 mb-4">
                      {platform.features.slice(0, 3).map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-zinc-400 font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Metrics & Selection Radio */}
                  <div className="mt-2 pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                        Success: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{platform.stats}</strong>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        {platform.category}
                      </span>
                    </div>

                    {/* Animated Selection Checkmark */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white scale-110 shadow-md shadow-purple-600/30"
                          : "border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-slate-800 text-transparent group-hover:border-purple-400"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          ANIMATED MODERN BOTTOM BAR (TRIGGERED UPON CARD SELECTION)
          ======================================================== */}
      <AnimatePresence>
        {selectedPlatform && currentStep === "selection" && (
          <motion.div
            initial={{ y: 90, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 90, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed bottom-6 inset-x-0 mx-auto w-[92%] max-w-5xl z-50 pointer-events-auto"
          >
            <div className="relative rounded-2xl p-4 sm:p-5 backdrop-blur-2xl bg-white/95 dark:bg-[#0c1020]/95 border border-purple-500/30 dark:border-purple-500/50 shadow-2xl shadow-purple-950/40 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Glowing Accent Top Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              {/* Left Side: Selected Platform Info */}
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div
                  className={`p-3 rounded-2xl ${selectedPlatform.iconBg} border flex-shrink-0 shadow-sm flex items-center justify-center`}
                >
                  {selectedPlatform.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Selected Platform
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {selectedPlatform.version}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white truncate mt-0.5">
                    {selectedPlatform.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    Success Rate:{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                      {selectedPlatform.stats}
                    </strong>{" "}
                    &bull; {selectedPlatform.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Side: Actions (Preview, Deselect, Next Button) */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {selectedPlatform.previewUrl && (
                  <button
                    type="button"
                    onClick={(e) => handleFullPreview(e, selectedPlatform.previewUrl)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-500" />
                    <span>Preview Template</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedPlatformId(null)}
                  className="p-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 transition-all active:scale-95 cursor-pointer"
                  title="Deselect Card"
                >
                  <X className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleProceedNext}
                  className="px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhishingManager;
