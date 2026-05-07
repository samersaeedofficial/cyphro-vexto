import { useState } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1d] relative overflow-hidden">
      {/* Ambient Background Orbs for 'Lighter' Modern Feel */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <Header />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className="transition-[padding] duration-500 ease-in-out pt-16 relative z-10"
        style={{ paddingLeft: collapsed ? "8rem" : "20.5rem" }}
      >
        <div className="p-8 min-h-[calc(100vh-4rem)]">{children}</div>
      </main>
    </div>
  );
}
