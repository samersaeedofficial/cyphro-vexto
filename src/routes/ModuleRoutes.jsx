import { ModulePage } from "@/Apps/Modules/ModulePage";
import WifiAnalyzer from "@/Apps/Modules/Wifi&Network/WifiAnalyzer/WifiAnalyzer";

export const ModuleRoutes = [
  {
    path: "/modules/wifi-analyzer",
    component: WifiAnalyzer,
  },
  {
    path: "/modules/:id",
    component: ModulePage,
  },
];
