import { Link } from "wouter";
import { Terminal, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "rgba(7, 10, 20, 1)" }}
    >
      <div className="text-center font-mono">
        <div
          className="text-8xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>
        <div className="text-slate-400 text-lg mb-2">Page not found</div>
        <div className="text-slate-600 text-sm mb-8 font-mono">
          <span className="text-cyan-400">$</span> cd{" "}
          <span className="text-yellow-400">/{"{requested_path}"}</span>: No
          such directory
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" data-testid="link-404-home">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all hover:scale-105 cursor-pointer"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff",
              }}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </Link>
          <Link href="/dashboard" data-testid="link-404-dashboard">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all hover:bg-white/5 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#64748b",
              }}
            >
              <Terminal className="w-4 h-4" />
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
