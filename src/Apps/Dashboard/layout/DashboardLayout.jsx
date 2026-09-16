import { useState } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { useTheme } from "@/lib/theme";

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`h-screen w-screen relative overflow-hidden flex flex-col transition-colors duration-300 ${
      isDark ? "bg-[#0a0f1d] text-slate-100" : "bg-[#f4f7fb] text-slate-900"
    }`}>
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-500 ${
          isDark ? "bg-blue-500/5" : "bg-blue-400/10"
        }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-500 ${
          isDark ? "bg-indigo-500/5" : "bg-indigo-400/10"
        }`} />
      </div>

      <Header />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          className="h-full overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out pt-[4.5rem] relative z-10 custom-scrollbar overscroll-behavior-none"
          style={{ 
            marginLeft: collapsed ? "96px" : "296px",
            width: `calc(100% - ${collapsed ? "96px" : "296px"})`
          }}
        >
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

