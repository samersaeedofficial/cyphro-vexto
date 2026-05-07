import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/ui/feedback";
import { useEffect, useRef, useState } from "react";

import { Landing } from "@/Apps/Home/Landing";
import { Dashboard } from "@/Apps/Dashboard/Dashboard";
import { ModulePage } from "@/Apps/Modules/ModulePage";
import { ModuleInfo } from "@/Apps/Home/components/ModuleInfo";
import NotFound from "@/pages/NotFound";
import { PageLoader } from "@/components/PageLoader";

const queryClient = new QueryClient();

// ─── Route-change loader hook ─────────────────────────────────────────────────
function usePageTransition() {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const switchTimerRef = useRef(null);

  useEffect(() => {
    if (location !== displayLocation) {
      const isLandingSide = (path) => path === "/" || path.startsWith("/info");
      const isAppSide = (path) => path.startsWith("/dashboard") || path.startsWith("/modules");

      // Only trigger loader when moving LandingSide <-> AppSide
      const crossingBoundary = (isLandingSide(displayLocation) && isAppSide(location)) || 
                                (isAppSide(displayLocation) && isLandingSide(location));

      if (crossingBoundary) {
        setLoading(true);
        
        // Delay switch for smooth transition
        clearTimeout(switchTimerRef.current);
        switchTimerRef.current = setTimeout(() => {
          setDisplayLocation(location);
        }, 150);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setLoading(false);
        }, 2100);
      } else {
        // Instant switch for internal navigation
        setDisplayLocation(location);
        setLoading(false);
      }
    }
  }, [location, displayLocation]);

  return { loading, displayLocation };
}

import { DashboardLayout } from "@/Apps/Dashboard/layout/DashboardLayout";

// ─── Router with transition ───────────────────────────────────────────────────
function Router() {
  const { loading, displayLocation } = usePageTransition();

  // Check if we are in the dashboard area
  const isDashboardArea = displayLocation.startsWith("/dashboard") || displayLocation.startsWith("/modules");

  const routes = (
    <Switch location={displayLocation}>
      <Route path="/" component={Landing} />
      <Route path="/info/:id" component={ModuleInfo} />
      
      {/* These routes will be wrapped by DashboardLayout if isDashboardArea is true */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/modules/:id" component={ModulePage} />

      <Route component={NotFound} />
    </Switch>
  );

  return (
    <>
      <PageLoader isVisible={loading} />
      {isDashboardArea ? (
        <DashboardLayout>{routes}</DashboardLayout>
      ) : (
        routes
      )}
    </>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
