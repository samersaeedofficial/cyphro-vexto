import { useState } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#0a0f1d] relative overflow-hidden flex flex-col">
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
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
