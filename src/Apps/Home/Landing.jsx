import { useState, useEffect } from "react";
import { Header } from "./components/Layout/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Workflow } from "./components/Workflow";
import { Arsenal } from "./components/Arsenal";
import { CtaBanner } from "./components/CtaBanner";
import { EthicalNotice } from "./components/EthicalNotice";
import { Footer } from "./components/Layout/Footer";

/* ── Global CSS animations (GPU-composited) ── */
const ANIM_CSS = `
  @keyframes orbFloat {
    0%,100% { transform: scale(1) translateZ(0); opacity: 0.6; }
    50%      { transform: scale(1.14) translateZ(0); opacity: 0.9; }
  }
  @keyframes cvxPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.28; }
  }
  .orb-1 { animation: orbFloat 9s ease-in-out infinite; will-change: transform, opacity; }
  .orb-2 { animation: orbFloat 11s ease-in-out infinite 1.5s; will-change: transform, opacity; }
  .orb-3 { animation: orbFloat 13s ease-in-out infinite 3s; will-change: transform, opacity; }
  .cvx-pulse { animation: cvxPulse 1.8s ease-in-out infinite; will-change: opacity; }
  .cvx-pulse-slow { animation: cvxPulse 2.4s ease-in-out infinite; will-change: opacity; }
`;

if (typeof document !== "undefined" && !document.getElementById("cvx-anim")) {
  const s = document.createElement("style");
  s.id = "cvx-anim";
  s.textContent = ANIM_CSS;
  document.head.appendChild(s);
}

function FloatingOrb({ style, cls }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${cls}`}
      style={{ ...style, transform: "translateZ(0)" }}
    />
  );
}

export function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-200 font-sans overflow-x-hidden selection:bg-blue-500/30">

      {/* ── Background Orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingOrb cls="orb-1" style={{ width: 640, height: 640, top: "-12%", left: "14%", background: "radial-gradient(circle, rgba(59,130,246,0.11) 0%, transparent 68%)", filter: "blur(48px)" }} />
        <FloatingOrb cls="orb-2" style={{ width: 540, height: 540, bottom: "-8%", right: "10%", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 68%)", filter: "blur(48px)" }} />
        <FloatingOrb cls="orb-3" style={{ width: 360, height: 360, top: "50%", left: "-4%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 68%)", filter: "blur(36px)" }} />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 0%, #06090f 70%)" }} />
      </div>

      <Header scrolled={scrolled} />

      <main className="relative z-10 pt-20">
        <Hero />
        <Features />
        <Workflow />
        <Arsenal />
        <CtaBanner />
        <EthicalNotice />
      </main>

      <Footer />
    </div>
  );
}
